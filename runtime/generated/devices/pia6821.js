import deviceData from './pia6821.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_port_a_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let ret = ((method_get_in_a_value(runtime)) & 0xff);
        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            members.m_irq_a1 = ((0) ? 1 : 0);
            members.m_irq_a2 = ((0) ? 1 : 0);
            method_update_interrupts(runtime);
            if ((((method_c2_output(runtime, (members.m_ctl_a ?? 0))) && (method_c2_strobe_mode(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0)) {
                if ((members.m_out_ca2 ?? 0)) {
                    method_set_out_ca2(runtime, 0);
                }
                if (method_strobe_e_reset(runtime, (members.m_ctl_a ?? 0))) {
                    method_set_out_ca2(runtime, 1);
                }
            }
            0;
        }
        return ((ret) & 0xff);
    }
    function method_get_in_a_value(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let port_a_data = ((0) & 0xff);
        let ret = ((0) & 0xff);
        if ((((typeof (runtime.dereference(members.m_in_a_handler)).isunset === 'function' ? (runtime.dereference(members.m_in_a_handler)).isunset() : typeof (runtime.dereference(members.m_in_a_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_in_a_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_in_a_handler)).isunset : runtime.container(members.m_in_a_handler, "isunset"))) ? 0 : 1)) {
            port_a_data = (((__l["m_in_a_handler"] ? __l["m_in_a_handler"](Number(0)) : typeof members.m_in_a_handler === 'function' ? members.m_in_a_handler(0) : runtime.invoke("m_in_a_handler", 0))) & 0xff);
        }
        else {
            if ((members.m_in_a_pushed ?? 0)) {
                port_a_data = (((members.m_in_a ?? 0)) & 0xff);
            }
            else {
                port_a_data = ((255) & 0xff);
                if ((((((((((members.m_logged_port_a_not_connected ?? 0)) ? 0 : 1)) && (((Number((members.m_ddr_a ?? 0)) !== Number(255)) ? 1 : 0))) ? 1 : 0)) && ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    0;
                    members.m_logged_port_a_not_connected = ((1) ? 1 : 0);
                }
            }
        }
        ret = (((((((((~(members.m_ddr_a ?? 0))) & (port_a_data))) | ((((((members.m_ddr_a ?? 0)) & ((members.m_out_a ?? 0)))) & ((~(members.m_a_input_overrides_output_mask ?? 0))))))) | ((((((members.m_ddr_a ?? 0)) & (port_a_data))) & ((members.m_a_input_overrides_output_mask ?? 0)))))) & 0xff);
        return ((ret) & 0xff);
    }
    function method_update_interrupts(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let new_state = (((((((((members.m_irq_a1 ?? 0)) && (method_irq1_enabled(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0)) || (((((members.m_irq_a2 ?? 0)) && (method_irq2_enabled(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0))) ? 1 : 0)) | 0);
        if (((Number(new_state) !== Number((members.m_irq_a_state ?? 0))) ? 1 : 0)) {
            members.m_irq_a_state = ((new_state) & 0xff);
            (__l["m_irqa_handler"] ? __l["m_irqa_handler"](Number((((members.m_irq_a_state ?? 0)) ? (1) : (0)))) : typeof members.m_irqa_handler === 'function' ? members.m_irqa_handler((((members.m_irq_a_state ?? 0)) ? (1) : (0))) : runtime.invoke("m_irqa_handler", (((members.m_irq_a_state ?? 0)) ? (1) : (0))));
        }
        new_state = (((((((((members.m_irq_b1 ?? 0)) && (method_irq1_enabled(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0)) || (((((members.m_irq_b2 ?? 0)) && (method_irq2_enabled(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0))) ? 1 : 0)) | 0);
        if (((Number(new_state) !== Number((members.m_irq_b_state ?? 0))) ? 1 : 0)) {
            members.m_irq_b_state = ((new_state) & 0xff);
            (__l["m_irqb_handler"] ? __l["m_irqb_handler"](Number((((members.m_irq_b_state ?? 0)) ? (1) : (0)))) : typeof members.m_irqb_handler === 'function' ? members.m_irqb_handler((((members.m_irq_b_state ?? 0)) ? (1) : (0))) : runtime.invoke("m_irqb_handler", (((members.m_irq_b_state ?? 0)) ? (1) : (0))));
        }
    }
    function method_irq1_enabled(runtime, c) {
        const members = runtime.members;
        return (((((c) >>> (0)) & 1)) ? 1 : 0);
    }
    function method_irq2_enabled(runtime, c) {
        const members = runtime.members;
        return (((((c) >>> (3)) & 1)) ? 1 : 0);
    }
    function method_c2_output(runtime, c) {
        const members = runtime.members;
        return (((((c) >>> (5)) & 1)) ? 1 : 0);
    }
    function method_c2_strobe_mode(runtime, c) {
        const members = runtime.members;
        return (((((((c) >>> (4)) & 1)) ? 1 : 0)) ? 0 : 1);
    }
    function method_set_out_ca2(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_out_ca2 = ((data) & 0xff);
        if ((((typeof (runtime.dereference(members.m_ca2_handler)).isunset === 'function' ? (runtime.dereference(members.m_ca2_handler)).isunset() : typeof (runtime.dereference(members.m_ca2_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_ca2_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_ca2_handler)).isunset : runtime.container(members.m_ca2_handler, "isunset"))) ? 0 : 1)) {
            (__l["m_ca2_handler"] ? __l["m_ca2_handler"](Number((members.m_out_ca2 ?? 0))) : typeof members.m_ca2_handler === 'function' ? members.m_ca2_handler((members.m_out_ca2 ?? 0)) : runtime.invoke("m_ca2_handler", (members.m_out_ca2 ?? 0)));
        }
        else {
            if ((members.m_out_ca2_needs_pulled ?? 0)) {
                0;
            }
            members.m_out_ca2_needs_pulled = ((1) ? 1 : 0);
        }
    }
    function method_strobe_e_reset(runtime, c) {
        const members = runtime.members;
        return (((((c) >>> (3)) & 1)) ? 1 : 0);
    }
    function method_ddr_a_r(runtime) {
        const members = runtime.members;
        let ret = (((members.m_ddr_a ?? 0)) & 0xff);
        0;
        return ((ret) & 0xff);
    }
    function method_port_b_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let ret = ((method_get_in_b_value(runtime)) & 0xff);
        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            if ((((((((members.m_irq_b1 ?? 0)) && (method_c2_strobe_mode(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0)) && (method_strobe_c1_reset(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0)) {
                method_set_out_cb2(runtime, 1);
            }
            members.m_irq_b1 = ((0) ? 1 : 0);
            members.m_irq_b2 = ((0) ? 1 : 0);
            method_update_interrupts(runtime);
            0;
        }
        return ((ret) & 0xff);
    }
    function method_get_in_b_value(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let ret = ((0) & 0xff);
        if (((Number((members.m_ddr_b ?? 0)) === Number(255)) ? 1 : 0)) {
            ret = (((members.m_out_b ?? 0)) & 0xff);
        }
        else {
            let port_b_data = ((0) & 0xff);
            if ((((typeof (runtime.dereference(members.m_in_b_handler)).isunset === 'function' ? (runtime.dereference(members.m_in_b_handler)).isunset() : typeof (runtime.dereference(members.m_in_b_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_in_b_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_in_b_handler)).isunset : runtime.container(members.m_in_b_handler, "isunset"))) ? 0 : 1)) {
                port_b_data = (((__l["m_in_b_handler"] ? __l["m_in_b_handler"](Number(0)) : typeof members.m_in_b_handler === 'function' ? members.m_in_b_handler(0) : runtime.invoke("m_in_b_handler", 0))) & 0xff);
            }
            else {
                if ((members.m_in_b_pushed ?? 0)) {
                    port_b_data = (((members.m_in_b ?? 0)) & 0xff);
                }
                else {
                    if ((((((((((members.m_logged_port_b_not_connected ?? 0)) ? 0 : 1)) && (((Number((members.m_ddr_b ?? 0)) !== Number(255)) ? 1 : 0))) ? 1 : 0)) && ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                        0;
                        members.m_logged_port_b_not_connected = ((1) ? 1 : 0);
                    }
                    port_b_data = ((0) & 0xff);
                }
            }
            ret = (((((((members.m_out_b ?? 0)) & ((members.m_ddr_b ?? 0)))) | (((port_b_data) & ((~(members.m_ddr_b ?? 0))))))) & 0xff);
        }
        return ((ret) & 0xff);
    }
    function method_strobe_c1_reset(runtime, c) {
        const members = runtime.members;
        return (((((((c) >>> (3)) & 1)) ? 1 : 0)) ? 0 : 1);
    }
    function method_set_out_cb2(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let z = ((method_cb2_output_z(runtime)) | 0);
        if ((((((Number(data) !== Number((members.m_out_cb2 ?? 0))) ? 1 : 0)) || (((Number(z) !== Number((members.m_last_out_cb2_z ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            members.m_out_cb2 = ((data) & 0xff);
            members.m_last_out_cb2_z = ((z) & 0xff);
            if ((((typeof (runtime.dereference(members.m_cb2_handler)).isunset === 'function' ? (runtime.dereference(members.m_cb2_handler)).isunset() : typeof (runtime.dereference(members.m_cb2_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_cb2_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_cb2_handler)).isunset : runtime.container(members.m_cb2_handler, "isunset"))) ? 0 : 1)) {
                (__l["m_cb2_handler"] ? __l["m_cb2_handler"](Number((members.m_out_cb2 ?? 0))) : typeof members.m_cb2_handler === 'function' ? members.m_cb2_handler((members.m_out_cb2 ?? 0)) : runtime.invoke("m_cb2_handler", (members.m_out_cb2 ?? 0)));
            }
            else {
                if ((members.m_out_cb2_needs_pulled ?? 0)) {
                    0;
                }
                members.m_out_cb2_needs_pulled = ((1) ? 1 : 0);
            }
        }
    }
    function method_cb2_output_z(runtime) {
        const members = runtime.members;
        return ((method_c2_output(runtime, (members.m_ctl_b ?? 0))) ? 0 : 1);
    }
    function method_ddr_b_r(runtime) {
        const members = runtime.members;
        let ret = (((members.m_ddr_b ?? 0)) & 0xff);
        0;
        return ((ret) & 0xff);
    }
    function method_control_a_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let ret = ((0) & 0xff);
        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            if ((((typeof (runtime.dereference(members.m_in_ca1_handler)).isunset === 'function' ? (runtime.dereference(members.m_in_ca1_handler)).isunset() : typeof (runtime.dereference(members.m_in_ca1_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_in_ca1_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_in_ca1_handler)).isunset : runtime.container(members.m_in_ca1_handler, "isunset"))) ? 0 : 1)) {
                method_ca1_w(runtime, (__l["m_in_ca1_handler"] ? __l["m_in_ca1_handler"]() : typeof members.m_in_ca1_handler === 'function' ? members.m_in_ca1_handler() : runtime.invoke("m_in_ca1_handler")));
            }
            else {
                if (((((((members.m_logged_ca1_not_connected ?? 0)) ? 0 : 1)) && ((((members.m_in_ca1_pushed ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    0;
                    members.m_logged_ca1_not_connected = ((1) ? 1 : 0);
                }
            }
            if ((((typeof (runtime.dereference(members.m_in_ca2_handler)).isunset === 'function' ? (runtime.dereference(members.m_in_ca2_handler)).isunset() : typeof (runtime.dereference(members.m_in_ca2_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_in_ca2_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_in_ca2_handler)).isunset : runtime.container(members.m_in_ca2_handler, "isunset"))) ? 0 : 1)) {
                method_ca2_w(runtime, (__l["m_in_ca2_handler"] ? __l["m_in_ca2_handler"]() : typeof members.m_in_ca2_handler === 'function' ? members.m_in_ca2_handler() : runtime.invoke("m_in_ca2_handler")));
            }
            else {
                if ((((((((((members.m_logged_ca2_not_connected ?? 0)) ? 0 : 1)) && (method_c2_input(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0)) && ((((members.m_in_ca2_pushed ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    0;
                    members.m_logged_ca2_not_connected = ((1) ? 1 : 0);
                }
            }
        }
        ret = (((members.m_ctl_a ?? 0)) & 0xff);
        if ((members.m_irq_a1 ?? 0)) {
            ret = ((((ret) | (128))) & 0xff);
        }
        if (((((members.m_irq_a2 ?? 0)) && (method_c2_input(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0)) {
            ret = ((((ret) | (64))) & 0xff);
        }
        0;
        return ((ret) & 0xff);
    }
    function method_ca1_w(runtime, state) {
        const members = runtime.members;
        0;
        if ((((((Number((members.m_in_ca1 ?? 0)) !== Number(state)) ? 1 : 0)) && (((((((state) && (method_c1_low_to_high(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0)) || ((((((state) ? 0 : 1)) && (method_c1_high_to_low(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            0;
            members.m_irq_a1 = ((1) ? 1 : 0);
            method_update_interrupts(runtime);
            if ((((((((((method_c2_output(runtime, (members.m_ctl_a ?? 0))) && (method_c2_strobe_mode(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0)) && (method_strobe_c1_reset(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0)) && ((((members.m_out_ca2 ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                method_set_out_ca2(runtime, 1);
            }
        }
        members.m_in_ca1 = ((state) & 0xff);
        members.m_in_ca1_pushed = ((1) ? 1 : 0);
    }
    function method_c1_low_to_high(runtime, c) {
        const members = runtime.members;
        return (((((c) >>> (1)) & 1)) ? 1 : 0);
    }
    function method_c1_high_to_low(runtime, c) {
        const members = runtime.members;
        return (((((((c) >>> (1)) & 1)) ? 1 : 0)) ? 0 : 1);
    }
    function method_ca2_w(runtime, state) {
        const members = runtime.members;
        0;
        if (((((((method_c2_input(runtime, (members.m_ctl_a ?? 0))) && (((Number((members.m_in_ca2 ?? 0)) !== Number(state)) ? 1 : 0))) ? 1 : 0)) && (((((((state) && (method_c2_low_to_high(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0)) || ((((((state) ? 0 : 1)) && (method_c2_high_to_low(runtime, (members.m_ctl_a ?? 0)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            0;
            members.m_irq_a2 = ((1) ? 1 : 0);
            method_update_interrupts(runtime);
        }
        members.m_in_ca2 = ((state) & 0xff);
        members.m_in_ca2_pushed = ((1) ? 1 : 0);
    }
    function method_c2_input(runtime, c) {
        const members = runtime.members;
        return (((((((c) >>> (5)) & 1)) ? 1 : 0)) ? 0 : 1);
    }
    function method_c2_low_to_high(runtime, c) {
        const members = runtime.members;
        return (((((c) >>> (4)) & 1)) ? 1 : 0);
    }
    function method_c2_high_to_low(runtime, c) {
        const members = runtime.members;
        return (((((((c) >>> (4)) & 1)) ? 1 : 0)) ? 0 : 1);
    }
    function method_control_b_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let ret = ((0) & 0xff);
        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            if ((((typeof (runtime.dereference(members.m_in_cb1_handler)).isunset === 'function' ? (runtime.dereference(members.m_in_cb1_handler)).isunset() : typeof (runtime.dereference(members.m_in_cb1_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_in_cb1_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_in_cb1_handler)).isunset : runtime.container(members.m_in_cb1_handler, "isunset"))) ? 0 : 1)) {
                method_cb1_w(runtime, (__l["m_in_cb1_handler"] ? __l["m_in_cb1_handler"]() : typeof members.m_in_cb1_handler === 'function' ? members.m_in_cb1_handler() : runtime.invoke("m_in_cb1_handler")));
            }
            else {
                if (((((((members.m_logged_cb1_not_connected ?? 0)) ? 0 : 1)) && ((((members.m_in_cb1_pushed ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    0;
                    members.m_logged_cb1_not_connected = ((1) ? 1 : 0);
                }
            }
            if ((((((((((members.m_logged_cb2_not_connected ?? 0)) ? 0 : 1)) && (method_c2_input(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0)) && ((((members.m_in_cb2_pushed ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                0;
                members.m_logged_cb2_not_connected = ((1) ? 1 : 0);
            }
        }
        ret = (((members.m_ctl_b ?? 0)) & 0xff);
        if ((members.m_irq_b1 ?? 0)) {
            ret = ((((ret) | (128))) & 0xff);
        }
        if (((((members.m_irq_b2 ?? 0)) && (method_c2_input(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0)) {
            ret = ((((ret) | (64))) & 0xff);
        }
        0;
        return ((ret) & 0xff);
    }
    function method_cb1_w(runtime, state) {
        const members = runtime.members;
        0;
        if ((((((Number((members.m_in_cb1 ?? 0)) !== Number(state)) ? 1 : 0)) && (((((((state) && (method_c1_low_to_high(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0)) || ((((((state) ? 0 : 1)) && (method_c1_high_to_low(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            0;
            members.m_irq_b1 = ((1) ? 1 : 0);
            method_update_interrupts(runtime);
        }
        members.m_in_cb1 = ((state) & 0xff);
        members.m_in_cb1_pushed = ((1) ? 1 : 0);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        let ret = ((0) & 0xff);
        switch (((offset) & (3))) {
            default:
                {
                    ret = ((((method_output_selected(runtime, (members.m_ctl_a ?? 0))) ? (method_port_a_r(runtime)) : (method_ddr_a_r(runtime)))) & 0xff);
                    break;
                }
            case 1:
                {
                    ret = ((method_control_a_r(runtime)) & 0xff);
                    break;
                }
            case 2:
                {
                    ret = ((((method_output_selected(runtime, (members.m_ctl_b ?? 0))) ? (method_port_b_r(runtime)) : (method_ddr_b_r(runtime)))) & 0xff);
                    break;
                }
            case 3:
                {
                    ret = ((method_control_b_r(runtime)) & 0xff);
                    break;
                }
        }
        return ((ret) & 0xff);
    }
    function method_output_selected(runtime, c) {
        const members = runtime.members;
        return (((((c) >>> (2)) & 1)) ? 1 : 0);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        switch (((offset) & (3))) {
            default:
                {
                    if (method_output_selected(runtime, (members.m_ctl_a ?? 0))) {
                        method_port_a_w(runtime, data);
                    }
                    else {
                        method_ddr_a_w(runtime, data);
                    }
                    break;
                }
            case 1:
                {
                    method_control_a_w(runtime, data);
                    break;
                }
            case 2:
                {
                    if (method_output_selected(runtime, (members.m_ctl_b ?? 0))) {
                        method_port_b_w(runtime, data);
                    }
                    else {
                        method_ddr_b_w(runtime, data);
                    }
                    break;
                }
            case 3:
                {
                    method_control_b_w(runtime, data);
                    break;
                }
        }
    }
    function method_port_a_w(runtime, data) {
        const members = runtime.members;
        members.m_out_a = ((data) & 0xff);
        0;
        method_send_to_out_a_func(runtime, "port A write");
    }
    function method_send_to_out_a_func(runtime, message) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let data = ((method_get_out_a_value(runtime)) & 0xff);
        0;
        if ((((typeof (runtime.dereference(members.m_out_a_handler)).isunset === 'function' ? (runtime.dereference(members.m_out_a_handler)).isunset() : typeof (runtime.dereference(members.m_out_a_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_out_a_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_out_a_handler)).isunset : runtime.container(members.m_out_a_handler, "isunset"))) ? 0 : 1)) {
            (__l["m_out_a_handler"] ? __l["m_out_a_handler"](Number(0), Number(data)) : typeof members.m_out_a_handler === 'function' ? members.m_out_a_handler(0, data) : runtime.invoke("m_out_a_handler", 0, data));
        }
        else {
            if ((members.m_out_a_needs_pulled ?? 0)) {
                0;
            }
            members.m_out_a_needs_pulled = ((1) ? 1 : 0);
        }
    }
    function method_get_out_a_value(runtime) {
        const members = runtime.members;
        let ret = ((0) & 0xff);
        if (((Number((members.m_ddr_a ?? 0)) === Number(255)) ? 1 : 0)) {
            ret = (((members.m_out_a ?? 0)) & 0xff);
        }
        else {
            ret = (((((((members.m_out_a ?? 0)) & ((members.m_ddr_a ?? 0)))) | (((method_get_in_a_value(runtime)) & ((~(members.m_ddr_a ?? 0))))))) & 0xff);
        }
        return ((ret) & 0xff);
    }
    function method_ddr_a_w(runtime, data) {
        const members = runtime.members;
        0;
        if (((Number((members.m_ddr_a ?? 0)) !== Number(data)) ? 1 : 0)) {
            members.m_ddr_a = ((data) & 0xff);
            members.m_logged_port_a_not_connected = ((0) ? 1 : 0);
            method_send_to_out_a_func(runtime, "port A write due to DDR change");
        }
    }
    function method_control_a_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        data = ((((data) & (63))) & 0xff);
        0;
        0;
        0;
        0;
        let ca2_was_output = ((method_c2_output(runtime, (members.m_ctl_a ?? 0))) ? 1 : 0);
        members.m_ctl_a = ((data) & 0xff);
        if (method_c2_output(runtime, (members.m_ctl_a ?? 0))) {
            if (method_c2_set_mode(runtime, (members.m_ctl_a ?? 0))) {
                let set = ((method_c2_set(runtime, (members.m_ctl_a ?? 0))) ? 1 : 0);
                0;
                if ((((((ca2_was_output) ? 0 : 1)) || (((Number((members.m_out_ca2 ?? 0)) !== Number(set)) ? 1 : 0))) ? 1 : 0)) {
                    method_set_out_ca2(runtime, set);
                }
            }
            else {
                0;
                if ((((((ca2_was_output) ? 0 : 1)) || ((((members.m_out_ca2 ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    method_set_out_ca2(runtime, 1);
                }
            }
        }
        else {
            if (ca2_was_output) {
                0;
                if ((((typeof (runtime.dereference(members.m_ca2_handler)).isunset === 'function' ? (runtime.dereference(members.m_ca2_handler)).isunset() : typeof (runtime.dereference(members.m_ca2_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_ca2_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_ca2_handler)).isunset : runtime.container(members.m_ca2_handler, "isunset"))) ? 0 : 1)) {
                    (__l["m_ca2_handler"] ? __l["m_ca2_handler"](Number(1)) : typeof members.m_ca2_handler === 'function' ? members.m_ca2_handler(1) : runtime.invoke("m_ca2_handler", 1));
                }
            }
        }
        method_update_interrupts(runtime);
    }
    function method_c2_set_mode(runtime, c) {
        const members = runtime.members;
        return (((((c) >>> (4)) & 1)) ? 1 : 0);
    }
    function method_c2_set(runtime, c) {
        const members = runtime.members;
        return (((((c) >>> (3)) & 1)) ? 1 : 0);
    }
    function method_port_b_w(runtime, data) {
        const members = runtime.members;
        members.m_out_b = ((data) & 0xff);
        method_send_to_out_b_func(runtime, "port B write");
        if (method_c2_strobe_mode(runtime, (members.m_ctl_b ?? 0))) {
            method_set_out_cb2(runtime, 0);
            if (method_strobe_e_reset(runtime, (members.m_ctl_b ?? 0))) {
                method_set_out_cb2(runtime, 1);
            }
        }
    }
    function method_send_to_out_b_func(runtime, message) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let data = ((method_get_out_b_value(runtime)) & 0xff);
        0;
        if ((((typeof (runtime.dereference(members.m_out_b_handler)).isunset === 'function' ? (runtime.dereference(members.m_out_b_handler)).isunset() : typeof (runtime.dereference(members.m_out_b_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_out_b_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_out_b_handler)).isunset : runtime.container(members.m_out_b_handler, "isunset"))) ? 0 : 1)) {
            (__l["m_out_b_handler"] ? __l["m_out_b_handler"](Number(0), Number(data), Number((members.m_ddr_b ?? 0))) : typeof members.m_out_b_handler === 'function' ? members.m_out_b_handler(0, data, (members.m_ddr_b ?? 0)) : runtime.invoke("m_out_b_handler", 0, data, (members.m_ddr_b ?? 0)));
        }
        else {
            if ((members.m_out_b_needs_pulled ?? 0)) {
                0;
            }
            members.m_out_b_needs_pulled = ((1) ? 1 : 0);
        }
    }
    function method_get_out_b_value(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let ret = (((((members.m_out_b ?? 0)) & ((members.m_ddr_b ?? 0)))) & 0xff);
        if ((((((Number((members.m_ddr_b ?? 0)) !== Number(255)) ? 1 : 0)) && ((((typeof (runtime.dereference(members.m_ts_b_handler)).isunset === 'function' ? (runtime.dereference(members.m_ts_b_handler)).isunset() : typeof (runtime.dereference(members.m_ts_b_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_ts_b_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_ts_b_handler)).isunset : runtime.container(members.m_ts_b_handler, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
            ret = ((((ret) | ((((__l["m_ts_b_handler"] ? __l["m_ts_b_handler"]() : typeof members.m_ts_b_handler === 'function' ? members.m_ts_b_handler() : runtime.invoke("m_ts_b_handler"))) & ((~(members.m_ddr_b ?? 0))))))) & 0xff);
        }
        return ((ret) & 0xff);
    }
    function method_ddr_b_w(runtime, data) {
        const members = runtime.members;
        0;
        if (((Number((members.m_ddr_b ?? 0)) !== Number(data)) ? 1 : 0)) {
            members.m_ddr_b = ((data) & 0xff);
            members.m_logged_port_b_not_connected = ((0) ? 1 : 0);
            method_send_to_out_b_func(runtime, "port B write due to DDR change");
        }
    }
    function method_control_b_w(runtime, data) {
        const members = runtime.members;
        data = ((((data) & (63))) & 0xff);
        0;
        0;
        0;
        0;
        members.m_ctl_b = ((data) & 0xff);
        let temp = ((0) ? 1 : 0);
        if (method_c2_set_mode(runtime, (members.m_ctl_b ?? 0))) {
            temp = ((method_c2_set(runtime, (members.m_ctl_b ?? 0))) ? 1 : 0);
            0;
        }
        else {
            0;
            temp = ((1) ? 1 : 0);
        }
        method_set_out_cb2(runtime, temp);
        method_update_interrupts(runtime);
    }
    function method_cb2_w(runtime, state) {
        const members = runtime.members;
        0;
        if (((((((method_c2_input(runtime, (members.m_ctl_b ?? 0))) && (((Number((members.m_in_cb2 ?? 0)) !== Number(state)) ? 1 : 0))) ? 1 : 0)) && (((((((state) && (method_c2_low_to_high(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0)) || ((((((state) ? 0 : 1)) && (method_c2_high_to_low(runtime, (members.m_ctl_b ?? 0)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            0;
            members.m_irq_b2 = ((1) ? 1 : 0);
            method_update_interrupts(runtime);
        }
        members.m_in_cb2 = ((state) & 0xff);
        members.m_in_cb2_pushed = ((1) ? 1 : 0);
    }
    function method_read_alt(runtime, offset) {
        const members = runtime.members;
        return ((method_read(runtime, ((((((offset) << (1))) & (2))) | (((runtime.shiftRight(offset, 1)) & (1)))))) & 0xff);
    }
    function method_write_alt(runtime, offset, data) {
        const members = runtime.members;
        method_write(runtime, ((((((offset) << (1))) & (2))) | (((runtime.shiftRight(offset, 1)) & (1)))), data);
    }
    function method_pa0_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 0, state);
    }
    function method_write_porta_line(runtime, line, state) {
        const members = runtime.members;
        let mask = ((((1) << (line))) & 0xff);
        if (state) {
            method_set_a_input(runtime, (((members.m_in_a ?? 0)) | (mask)));
        }
        else {
            method_set_a_input(runtime, (((members.m_in_a ?? 0)) & ((~mask))));
        }
    }
    function method_set_a_input(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((typeof (runtime.dereference(members.m_in_a_handler)).isunset === 'function' ? (runtime.dereference(members.m_in_a_handler)).isunset() : typeof (runtime.dereference(members.m_in_a_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_in_a_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_in_a_handler)).isunset : runtime.container(members.m_in_a_handler, "isunset"))) ? 0 : 1)) {
            (__l["__throw"] ? __l["__throw"]((__l["emu_fatalerror"] ? __l["emu_fatalerror"]("pia6821_device::set_a_input() called when m_in_a_handler set") : runtime.macro("emu_fatalerror", "pia6821_device::set_a_input() called when m_in_a_handler set"))) : runtime.macro("__throw", (__l["emu_fatalerror"] ? __l["emu_fatalerror"]("pia6821_device::set_a_input() called when m_in_a_handler set") : runtime.macro("emu_fatalerror", "pia6821_device::set_a_input() called when m_in_a_handler set"))));
        }
        0;
        members.m_in_a = ((data) & 0xff);
        members.m_in_a_pushed = ((1) ? 1 : 0);
    }
    function method_pa1_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 1, state);
    }
    function method_pa2_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 2, state);
    }
    function method_pa3_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 3, state);
    }
    function method_pa4_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 4, state);
    }
    function method_pa5_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 5, state);
    }
    function method_pa6_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 6, state);
    }
    function method_pa7_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 7, state);
    }
    function method_pb0_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 0, state);
    }
    function method_write_portb_line(runtime, line, state) {
        const members = runtime.members;
        let mask = ((((1) << (line))) & 0xff);
        if (state) {
            method_portb_w(runtime, (((members.m_in_b ?? 0)) | (mask)));
        }
        else {
            method_portb_w(runtime, (((members.m_in_b ?? 0)) & ((~mask))));
        }
    }
    function method_portb_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((typeof (runtime.dereference(members.m_in_b_handler)).isunset === 'function' ? (runtime.dereference(members.m_in_b_handler)).isunset() : typeof (runtime.dereference(members.m_in_b_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_in_b_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_in_b_handler)).isunset : runtime.container(members.m_in_b_handler, "isunset"))) ? 0 : 1)) {
            (__l["__throw"] ? __l["__throw"]((__l["emu_fatalerror"] ? __l["emu_fatalerror"]("pia6821_device::portb_w() called when in_b_func implemented") : runtime.macro("emu_fatalerror", "pia6821_device::portb_w() called when in_b_func implemented"))) : runtime.macro("__throw", (__l["emu_fatalerror"] ? __l["emu_fatalerror"]("pia6821_device::portb_w() called when in_b_func implemented") : runtime.macro("emu_fatalerror", "pia6821_device::portb_w() called when in_b_func implemented"))));
        }
        0;
        members.m_in_b = ((data) & 0xff);
        members.m_in_b_pushed = ((1) ? 1 : 0);
    }
    function method_pb1_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 1, state);
    }
    function method_pb2_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 2, state);
    }
    function method_pb3_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 3, state);
    }
    function method_pb4_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 4, state);
    }
    function method_pb5_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 5, state);
    }
    function method_pb6_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 6, state);
    }
    function method_pb7_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 7, state);
    }
    function method_pia6821_device__read_alt(runtime, offset) {
        const members = runtime.members;
        return ((method_read(runtime, ((((((offset) << (1))) & (2))) | (((runtime.shiftRight(offset, 1)) & (1)))))) & 0xff);
    }
    function method_pia6821_device__write_alt(runtime, offset, data) {
        const members = runtime.members;
        method_write(runtime, ((((((offset) << (1))) & (2))) | (((runtime.shiftRight(offset, 1)) & (1)))), data);
    }
    function method_pia6821_device__pa0_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 0, state);
    }
    function method_pia6821_device__pa1_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 1, state);
    }
    function method_pia6821_device__pa2_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 2, state);
    }
    function method_pia6821_device__pa3_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 3, state);
    }
    function method_pia6821_device__pa4_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 4, state);
    }
    function method_pia6821_device__pa5_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 5, state);
    }
    function method_pia6821_device__pa6_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 6, state);
    }
    function method_pia6821_device__pa7_w(runtime, state) {
        const members = runtime.members;
        method_write_porta_line(runtime, 7, state);
    }
    function method_pia6821_device__pb0_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 0, state);
    }
    function method_pia6821_device__pb1_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 1, state);
    }
    function method_pia6821_device__pb2_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 2, state);
    }
    function method_pia6821_device__pb3_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 3, state);
    }
    function method_pia6821_device__pb4_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 4, state);
    }
    function method_pia6821_device__pb5_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 5, state);
    }
    function method_pia6821_device__pb6_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 6, state);
    }
    function method_pia6821_device__pb7_w(runtime, state) {
        const members = runtime.members;
        method_write_portb_line(runtime, 7, state);
    }
    return {
        "port_a_r": method_port_a_r,
        "get_in_a_value": method_get_in_a_value,
        "update_interrupts": method_update_interrupts,
        "irq1_enabled": method_irq1_enabled,
        "irq2_enabled": method_irq2_enabled,
        "c2_output": method_c2_output,
        "c2_strobe_mode": method_c2_strobe_mode,
        "set_out_ca2": method_set_out_ca2,
        "strobe_e_reset": method_strobe_e_reset,
        "ddr_a_r": method_ddr_a_r,
        "port_b_r": method_port_b_r,
        "get_in_b_value": method_get_in_b_value,
        "strobe_c1_reset": method_strobe_c1_reset,
        "set_out_cb2": method_set_out_cb2,
        "cb2_output_z": method_cb2_output_z,
        "ddr_b_r": method_ddr_b_r,
        "control_a_r": method_control_a_r,
        "ca1_w": method_ca1_w,
        "c1_low_to_high": method_c1_low_to_high,
        "c1_high_to_low": method_c1_high_to_low,
        "ca2_w": method_ca2_w,
        "c2_input": method_c2_input,
        "c2_low_to_high": method_c2_low_to_high,
        "c2_high_to_low": method_c2_high_to_low,
        "control_b_r": method_control_b_r,
        "cb1_w": method_cb1_w,
        "read": method_read,
        "output_selected": method_output_selected,
        "write": method_write,
        "port_a_w": method_port_a_w,
        "send_to_out_a_func": method_send_to_out_a_func,
        "get_out_a_value": method_get_out_a_value,
        "ddr_a_w": method_ddr_a_w,
        "control_a_w": method_control_a_w,
        "c2_set_mode": method_c2_set_mode,
        "c2_set": method_c2_set,
        "port_b_w": method_port_b_w,
        "send_to_out_b_func": method_send_to_out_b_func,
        "get_out_b_value": method_get_out_b_value,
        "ddr_b_w": method_ddr_b_w,
        "control_b_w": method_control_b_w,
        "cb2_w": method_cb2_w,
        "read_alt": method_read_alt,
        "write_alt": method_write_alt,
        "pa0_w": method_pa0_w,
        "write_porta_line": method_write_porta_line,
        "set_a_input": method_set_a_input,
        "pa1_w": method_pa1_w,
        "pa2_w": method_pa2_w,
        "pa3_w": method_pa3_w,
        "pa4_w": method_pa4_w,
        "pa5_w": method_pa5_w,
        "pa6_w": method_pa6_w,
        "pa7_w": method_pa7_w,
        "pb0_w": method_pb0_w,
        "write_portb_line": method_write_portb_line,
        "portb_w": method_portb_w,
        "pb1_w": method_pb1_w,
        "pb2_w": method_pb2_w,
        "pb3_w": method_pb3_w,
        "pb4_w": method_pb4_w,
        "pb5_w": method_pb5_w,
        "pb6_w": method_pb6_w,
        "pb7_w": method_pb7_w,
        "pia6821_device::read_alt": method_pia6821_device__read_alt,
        "pia6821_device::write_alt": method_pia6821_device__write_alt,
        "pia6821_device::pa0_w": method_pia6821_device__pa0_w,
        "pia6821_device::pa1_w": method_pia6821_device__pa1_w,
        "pia6821_device::pa2_w": method_pia6821_device__pa2_w,
        "pia6821_device::pa3_w": method_pia6821_device__pa3_w,
        "pia6821_device::pa4_w": method_pia6821_device__pa4_w,
        "pia6821_device::pa5_w": method_pia6821_device__pa5_w,
        "pia6821_device::pa6_w": method_pia6821_device__pa6_w,
        "pia6821_device::pa7_w": method_pia6821_device__pa7_w,
        "pia6821_device::pb0_w": method_pia6821_device__pb0_w,
        "pia6821_device::pb1_w": method_pia6821_device__pb1_w,
        "pia6821_device::pb2_w": method_pia6821_device__pb2_w,
        "pia6821_device::pb3_w": method_pia6821_device__pb3_w,
        "pia6821_device::pb4_w": method_pia6821_device__pb4_w,
        "pia6821_device::pb5_w": method_pia6821_device__pb5_w,
        "pia6821_device::pb6_w": method_pia6821_device__pb6_w,
        "pia6821_device::pb7_w": method_pia6821_device__pb7_w
    };
})();
definition.compiledMethodLinks = ["__throw", "emu_fatalerror", "m_ca2_handler", "m_cb2_handler", "m_in_a_handler", "m_in_b_handler", "m_in_ca1_handler", "m_in_ca2_handler", "m_in_cb1_handler", "m_irqa_handler", "m_irqb_handler", "m_out_a_handler", "m_out_b_handler", "m_ts_b_handler", "machine", "machine().side_effects_disabled"];
export const device = definition;
export default device;
