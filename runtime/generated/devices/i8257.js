import deviceData from './i8257.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_is_request_active(runtime, channel) {
        const members = runtime.members;
        return (((((((members.m_request ?? 0)) >>> (channel)) & 1)) && (((((members.m_transfer_mode ?? 0)) >>> (channel)) & 1))) ? 1 : 0);
    }
    function method_set_hreq(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        if (((Number((members.m_hreq ?? 0)) !== Number(state)) ? 1 : 0)) {
            (__l["m_out_hrq_cb"] ? __l["m_out_hrq_cb"](Number(state)) : typeof members.m_out_hrq_cb === 'function' ? members.m_out_hrq_cb(state) : runtime.invoke("m_out_hrq_cb", state));
            members.m_hreq = ((state) | 0);
            (__l["abort_timeslice"] ? __l["abort_timeslice"]() : runtime.macro("abort_timeslice"));
        }
    }
    function method_set_tc(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        if (((Number((members.m_tc ?? 0)) !== Number(state)) ? 1 : 0)) {
            (__l["m_out_tc_cb"] ? __l["m_out_tc_cb"](Number(state)) : typeof members.m_out_tc_cb === 'function' ? members.m_out_tc_cb(state) : runtime.invoke("m_out_tc_cb", state));
            members.m_tc = ((state) ? 1 : 0);
        }
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        members.m_state = ((0) | 0);
        members.m_transfer_mode = ((0) & 0xff);
        members.m_status = ((0) & 0xff);
        members.m_msb = ((0) | 0);
        members.m_current_channel = ((-1) | 0);
        members.m_last_channel = ((3) | 0);
        members.m_hreq = ((-1) | 0);
        members.m_tc = ((0) ? 1 : 0);
        for (let channel = ((0) | 0); ((Number(channel) < Number(4)) ? 1 : 0); channel = ((((channel) + (1))) | 0)) {
            h_m_channel[channel].m_address = ((0) & 0xffff);
            h_m_channel[channel].m_count = ((0) & 0xffff);
            h_m_channel[channel].m_mode = ((0) & 0xff);
        }
        method_set_hreq(runtime, 0);
        method_set_dack(runtime);
    }
    function method_set_dack(runtime) {
        const members = runtime.members;
        0;
        for (let ch = ((0) | 0); ((Number(ch) < Number(4)) ? 1 : 0); ch = ((((ch) + (1))) | 0)) {
            (members.m_out_dack_cb ?? 0)[ch](((Number((members.m_current_channel ?? 0)) !== Number(ch)) ? 1 : 0));
        }
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        do {
            switch ((members.m_state ?? 0)) {
                case 0:
                    {
                        method_set_tc(runtime, 0);
                        if (method_next_channel(runtime)) {
                            members.m_state = ((1) | 0);
                        }
                        else {
                            members.m_icount = ((0) | 0);
                        }
                        break;
                    }
                case 1:
                    {
                        method_set_hreq(runtime, 1);
                        if ((members.m_hack ?? 0)) {
                            members.m_state = ((2) | 0);
                        }
                        else {
                            members.m_icount = ((0) | 0);
                        }
                        break;
                    }
                case 2:
                    {
                        method_set_tc(runtime, 0);
                        members.m_state = ((3) | 0);
                        break;
                    }
                case 3:
                    {
                        method_set_dack(runtime);
                        members.m_state = ((4) | 0);
                        break;
                    }
                case 4:
                    {
                        method_dma_read(runtime);
                        if (((((members.m_transfer_mode ?? 0)) >>> (5)) & 1)) {
                            method_dma_write(runtime);
                        }
                        if ((members.m_ready ?? 0)) {
                            members.m_state = ((6) | 0);
                            if ((((((Number(h_m_channel[(members.m_current_channel ?? 0)].m_count) === Number(0)) ? 1 : 0)) && (((Number(h_m_channel[(members.m_current_channel ?? 0)].m_mode) !== Number(2)) ? 1 : 0))) ? 1 : 0)) {
                                method_set_tc(runtime, 1);
                            }
                        }
                        else {
                            members.m_state = ((5) | 0);
                        }
                        break;
                    }
                case 5:
                    {
                        if ((members.m_ready ?? 0)) {
                            members.m_state = ((6) | 0);
                            if ((((((Number(h_m_channel[(members.m_current_channel ?? 0)].m_count) === Number(0)) ? 1 : 0)) && (((Number(h_m_channel[(members.m_current_channel ?? 0)].m_mode) !== Number(2)) ? 1 : 0))) ? 1 : 0)) {
                                method_set_tc(runtime, 1);
                            }
                        }
                        break;
                    }
                case 6:
                    {
                        if (((((((members.m_transfer_mode ?? 0)) >>> (5)) & 1)) ? 0 : 1)) {
                            method_dma_write(runtime);
                        }
                        if ((((((Number(h_m_channel[(members.m_current_channel ?? 0)].m_count) === Number(0)) ? 1 : 0)) && (((Number(h_m_channel[(members.m_current_channel ?? 0)].m_mode) === Number(2)) ? 1 : 0))) ? 1 : 0)) {
                            method_set_tc(runtime, 1);
                        }
                        method_advance(runtime);
                        if (((((members.m_hack ?? 0)) && (method_next_channel(runtime))) ? 1 : 0)) {
                            members.m_state = ((2) | 0);
                        }
                        else {
                            method_set_hreq(runtime, 0);
                            members.m_current_channel = ((-1) | 0);
                            members.m_state = ((0) | 0);
                            method_set_dack(runtime);
                        }
                        break;
                    }
            }
            members.m_icount = ((((members.m_icount) - (1))) | 0);
        } while (((Number((members.m_icount ?? 0)) > Number(0)) ? 1 : 0));
    }
    function method_next_channel(runtime) {
        const members = runtime.members;
        for (let step = ((0) | 0); ((Number(step) < Number(4)) ? 1 : 0); step = ((((step) + (1))) | 0)) {
            let channel = ((((((((members.m_transfer_mode ?? 0)) >>> (4)) & 1)) ? (((runtime.add((((members.m_last_channel ?? 0)) + (step)), 1)) & (3))) : (step))) | 0);
            if (method_is_request_active(runtime, channel)) {
                members.m_current_channel = ((channel) | 0);
                members.m_last_channel = ((channel) | 0);
                return 1;
            }
        }
        return 0;
    }
    function method_dma_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_channel = members.m_channel ?? 0;
        let offset = h_m_channel[(members.m_current_channel ?? 0)].m_address;
        switch (h_m_channel[(members.m_current_channel ?? 0)].m_mode) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    members.m_temp = (((members.m_in_ior_cb ?? 0)[(members.m_current_channel ?? 0)](offset)) & 0xff);
                    break;
                }
            case 2:
                {
                    members.m_temp = (((__l["m_in_memr_cb"] ? __l["m_in_memr_cb"](Number(offset)) : typeof members.m_in_memr_cb === 'function' ? members.m_in_memr_cb(offset) : runtime.invoke("m_in_memr_cb", offset))) & 0xff);
                    break;
                }
        }
    }
    function method_dma_write(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_channel = members.m_channel ?? 0;
        let offset = h_m_channel[(members.m_current_channel ?? 0)].m_address;
        switch (h_m_channel[(members.m_current_channel ?? 0)].m_mode) {
            case 0:
                {
                    (members.m_verify_cb ?? 0)[(members.m_current_channel ?? 0)](offset);
                    break;
                }
            case 1:
                {
                    (__l["m_out_memw_cb"] ? __l["m_out_memw_cb"](Number(offset), Number((members.m_temp ?? 0))) : typeof members.m_out_memw_cb === 'function' ? members.m_out_memw_cb(offset, (members.m_temp ?? 0)) : runtime.invoke("m_out_memw_cb", offset, (members.m_temp ?? 0)));
                    break;
                }
            case 2:
                {
                    (members.m_out_iow_cb ?? 0)[(members.m_current_channel ?? 0)](offset, (members.m_temp ?? 0));
                    break;
                }
        }
    }
    function method_advance(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        let tc = (((members.m_tc ?? 0)) ? 1 : 0);
        let al = (((((((((members.m_transfer_mode ?? 0)) >>> (7)) & 1)) && (((Number((members.m_current_channel ?? 0)) === Number(2)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        method_set_tc(runtime, 0);
        if (tc) {
            members.m_status = ((((members.m_status) | (((1) << ((members.m_current_channel ?? 0)))))) & 0xff);
            if (al) {
                h_m_channel[2].m_address = ((h_m_channel[3].m_address) & 0xffff);
                h_m_channel[2].m_count = ((h_m_channel[3].m_count) & 0xffff);
                h_m_channel[2].m_mode = ((h_m_channel[3].m_mode) & 0xff);
            }
            else {
                if (((((members.m_transfer_mode ?? 0)) >>> (6)) & 1)) {
                    members.m_transfer_mode = ((((members.m_transfer_mode) & ((~((1) << ((members.m_current_channel ?? 0))))))) & 0xff);
                }
            }
        }
        if ((((((al) && (tc)) ? 1 : 0)) ? 0 : 1)) {
            h_m_channel[(members.m_current_channel ?? 0)].m_count = ((((h_m_channel[(members.m_current_channel ?? 0)].m_count) - (1))) & 0xffff);
            h_m_channel[(members.m_current_channel ?? 0)].m_count = ((((h_m_channel[(members.m_current_channel ?? 0)].m_count) & (16383))) & 0xffff);
            h_m_channel[(members.m_current_channel ?? 0)].m_address = ((((h_m_channel[(members.m_current_channel ?? 0)].m_address) + (1))) & 0xffff);
        }
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_channel = members.m_channel ?? 0;
        0;
        let data = ((0) & 0xff);
        if ((((((offset) >>> (3)) & 1)) ? 0 : 1)) {
            let channel = ((((((offset) >>> (1))) & (3))) | 0);
            switch (((offset) & (1))) {
                case 0:
                    {
                        if ((members.m_msb ?? 0)) {
                            data = ((((h_m_channel[channel].m_address) >>> (8))) & 0xff);
                        }
                        else {
                            data = ((((h_m_channel[channel].m_address) & (255))) & 0xff);
                        }
                        break;
                    }
                case 1:
                    {
                        if ((members.m_msb ?? 0)) {
                            data = ((((h_m_channel[channel].m_count) >>> (8))) & 0xff);
                            if (((((members.m_reverse_rw ?? 0)) && (h_m_channel[channel].m_mode)) ? 1 : 0)) {
                                data = ((((data) | (((((Number(h_m_channel[channel].m_mode) === Number(1)) ? 1 : 0)) ? (128) : (64))))) & 0xff);
                            }
                            else {
                                data = ((((data) | (((h_m_channel[channel].m_mode) << (6))))) & 0xff);
                            }
                        }
                        else {
                            data = ((((h_m_channel[channel].m_count) & (255))) & 0xff);
                        }
                        break;
                    }
            }
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                members.m_msb = (((((members.m_msb ?? 0)) ? 0 : 1)) | 0);
            }
        }
        else {
            if (((Number(offset) === Number(8)) ? 1 : 0)) {
                data = (((members.m_status ?? 0)) & 0xff);
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_status = ((((members.m_status) & (240))) & 0xff);
                }
            }
        }
        return ((data) & 0xff);
    }
    function method_hlda_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        members.m_hack = ((state) | 0);
        (__l["trigger"] ? __l["trigger"](1) : runtime.macro("trigger", 1));
    }
    function method_ready_w(runtime, state) {
        const members = runtime.members;
        0;
        members.m_ready = ((state) | 0);
    }
    function method_dreq0_w(runtime, state) {
        const members = runtime.members;
        0;
        method_dma_request(runtime, 0, state);
    }
    function method_dma_request(runtime, channel, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        if (state) {
            members.m_request = ((((members.m_request) | (((1) << (channel))))) & 0xff);
        }
        else {
            members.m_request = ((((members.m_request) & ((~((1) << (channel)))))) & 0xff);
        }
        (__l["trigger"] ? __l["trigger"](1) : runtime.macro("trigger", 1));
    }
    function method_dreq1_w(runtime, state) {
        const members = runtime.members;
        0;
        method_dma_request(runtime, 1, state);
    }
    function method_dreq2_w(runtime, state) {
        const members = runtime.members;
        0;
        method_dma_request(runtime, 2, state);
    }
    function method_dreq3_w(runtime, state) {
        const members = runtime.members;
        0;
        method_dma_request(runtime, 3, state);
    }
    function method_out_hrq_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_out_hrq_cb)).bind === 'function' ? (runtime.dereference(members.m_out_hrq_cb)).bind() : typeof (runtime.dereference(members.m_out_hrq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_hrq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_hrq_cb)).bind : runtime.container(members.m_out_hrq_cb, "bind"));
    }
    function method_out_tc_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_out_tc_cb)).bind === 'function' ? (runtime.dereference(members.m_out_tc_cb)).bind() : typeof (runtime.dereference(members.m_out_tc_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_tc_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_tc_cb)).bind : runtime.container(members.m_out_tc_cb, "bind"));
    }
    function method_in_memr_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_in_memr_cb)).bind === 'function' ? (runtime.dereference(members.m_in_memr_cb)).bind() : typeof (runtime.dereference(members.m_in_memr_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_memr_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_memr_cb)).bind : runtime.container(members.m_in_memr_cb, "bind"));
    }
    function method_out_memw_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_out_memw_cb)).bind === 'function' ? (runtime.dereference(members.m_out_memw_cb)).bind() : typeof (runtime.dereference(members.m_out_memw_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_memw_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_memw_cb)).bind : runtime.container(members.m_out_memw_cb, "bind"));
    }
    function method_set_reverse_rw_mode(runtime, flag) {
        const members = runtime.members;
        members.m_reverse_rw = ((flag) ? 1 : 0);
    }
    function method_i8257_device__out_hrq_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_out_hrq_cb)).bind === 'function' ? (runtime.dereference(members.m_out_hrq_cb)).bind() : typeof (runtime.dereference(members.m_out_hrq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_hrq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_hrq_cb)).bind : runtime.container(members.m_out_hrq_cb, "bind"));
    }
    function method_i8257_device__out_tc_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_out_tc_cb)).bind === 'function' ? (runtime.dereference(members.m_out_tc_cb)).bind() : typeof (runtime.dereference(members.m_out_tc_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_tc_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_tc_cb)).bind : runtime.container(members.m_out_tc_cb, "bind"));
    }
    function method_i8257_device__in_memr_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_in_memr_cb)).bind === 'function' ? (runtime.dereference(members.m_in_memr_cb)).bind() : typeof (runtime.dereference(members.m_in_memr_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_memr_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_memr_cb)).bind : runtime.container(members.m_in_memr_cb, "bind"));
    }
    function method_i8257_device__out_memw_cb(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_out_memw_cb)).bind === 'function' ? (runtime.dereference(members.m_out_memw_cb)).bind() : typeof (runtime.dereference(members.m_out_memw_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_memw_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_memw_cb)).bind : runtime.container(members.m_out_memw_cb, "bind"));
    }
    function method_i8257_device__set_reverse_rw_mode(runtime, flag) {
        const members = runtime.members;
        members.m_reverse_rw = ((flag) ? 1 : 0);
    }
    return {
        "is_request_active": method_is_request_active,
        "set_hreq": method_set_hreq,
        "set_tc": method_set_tc,
        "device_reset": method_device_reset,
        "set_dack": method_set_dack,
        "execute_run": method_execute_run,
        "next_channel": method_next_channel,
        "dma_read": method_dma_read,
        "dma_write": method_dma_write,
        "advance": method_advance,
        "read": method_read,
        "hlda_w": method_hlda_w,
        "ready_w": method_ready_w,
        "dreq0_w": method_dreq0_w,
        "dma_request": method_dma_request,
        "dreq1_w": method_dreq1_w,
        "dreq2_w": method_dreq2_w,
        "dreq3_w": method_dreq3_w,
        "out_hrq_cb": method_out_hrq_cb,
        "out_tc_cb": method_out_tc_cb,
        "in_memr_cb": method_in_memr_cb,
        "out_memw_cb": method_out_memw_cb,
        "set_reverse_rw_mode": method_set_reverse_rw_mode,
        "i8257_device::out_hrq_cb": method_i8257_device__out_hrq_cb,
        "i8257_device::out_tc_cb": method_i8257_device__out_tc_cb,
        "i8257_device::in_memr_cb": method_i8257_device__in_memr_cb,
        "i8257_device::out_memw_cb": method_i8257_device__out_memw_cb,
        "i8257_device::set_reverse_rw_mode": method_i8257_device__set_reverse_rw_mode
    };
})();
definition.compiledMethodLinks = ["abort_timeslice", "m_in_memr_cb", "m_out_hrq_cb", "m_out_memw_cb", "m_out_tc_cb", "machine", "machine().side_effects_disabled", "trigger"];
export const device = definition;
export default device;
