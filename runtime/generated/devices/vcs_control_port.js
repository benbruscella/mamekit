import deviceData from './vcs_control_port.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = {};
definition.slot.options["joy"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    return {
        "trigger_w": method_trigger_w
    };
})();
definition.slot.options["pad"].compiledMethods = {};
definition.slot.options["mouse"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    return {
        "trigger_w": method_trigger_w
    };
})();
definition.slot.options["lp"].compiledMethods = {};
definition.slot.options["joybstr"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    return {
        "trigger_w": method_trigger_w
    };
})();
definition.slot.options["wheel"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    return {
        "trigger_w": method_trigger_w
    };
})();
definition.slot.options["keypad"].compiledMethods = {};
definition.slot.options["cx85"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    return {
        "trigger_w": method_trigger_w
    };
})();
definition.slot.options["cx85"].children[0].definition.compiledMethods = (() => {
    function method_perform_scan(runtime, param) {
        const members = runtime.members;
        method_change_output_lines(runtime);
        method_clock_scan_counters(runtime);
        method_detect_keypress(runtime);
    }
    function method_change_output_lines(runtime) {
        const members = runtime.members;
        if (((Number((members.m_next_data ?? runtime.member("m_next_data"))) !== Number((members.m_data ?? runtime.member("m_data")))) ? 1 : 0)) {
            members.m_data = (((members.m_next_data ?? runtime.member("m_next_data"))) & 0xff);
        }
        if (((Number((members.m_next_da ?? runtime.member("m_next_da"))) !== Number((members.m_da ?? runtime.member("m_da")))) ? 1 : 0)) {
            members.m_da = (((members.m_next_da ?? runtime.member("m_next_da"))) ? 1 : 0);
            0;
            runtime.invoke("m_write_da", (((members.m_da ?? runtime.member("m_da"))) ? (1) : (0)));
        }
    }
    function method_clock_scan_counters(runtime) {
        const members = runtime.members;
        if ((((members.m_inhibit ?? runtime.member("m_inhibit"))) ? 0 : 1)) {
            members.m_x = ((((members.m_x) + (1))) | 0);
            members.m_x = ((runtime.andAssign(members.m_x, 3)) | 0);
        }
    }
    function method_detect_keypress(runtime) {
        const members = runtime.members;
        const h_m_max_y = members.m_max_y ?? runtime.member("m_max_y");
        0;
        let data = ((runtime.readIndex((members.m_read_x ?? runtime.member("m_read_x")), (members.m_x ?? runtime.member("m_x")))()) & 0xff);
        if ((members.m_inhibit ?? runtime.member("m_inhibit"))) {
            if ((((data) >>> ((members.m_y ?? runtime.member("m_y")))) & 1)) {
                members.m_inhibit = ((0) ? 1 : 0);
                members.m_next_da = ((0) ? 1 : 0);
                members.m_next_data = ((runtime.invoke("m_tristate_data")) & 0xff);
                0;
            }
        }
        else {
            for (let y = 0; ((Number(y) < Number(h_m_max_y)) ? 1 : 0); y = ((y) + (1))) {
                if ((((((data) >>> (y)) & 1)) ? 0 : 1)) {
                    members.m_inhibit = ((1) ? 1 : 0);
                    members.m_next_da = ((1) ? 1 : 0);
                    members.m_y = ((y) | 0);
                    members.m_next_data = ((((((y) << (2))) | ((members.m_x ?? runtime.member("m_x"))))) & 0xff);
                    0;
                }
            }
        }
    }
    return {
        "perform_scan": method_perform_scan,
        "change_output_lines": method_change_output_lines,
        "clock_scan_counters": method_clock_scan_counters,
        "detect_keypress": method_detect_keypress
    };
})();
definition.slot.options["trakball"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    return {
        "trigger_w": method_trigger_w
    };
})();
export const device = definition;
export default device;
