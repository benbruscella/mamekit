import deviceData from './vcs_control_port.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_trigger_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_trigger)).bind === 'function' ? (runtime.dereference(members.m_write_trigger)).bind() : typeof (runtime.dereference(members.m_write_trigger)).bind === 'number' || typeof (runtime.dereference(members.m_write_trigger)).bind === 'boolean' ? (runtime.dereference(members.m_write_trigger)).bind : runtime.container(members.m_write_trigger, "bind"));
    }
    function method_exists(runtime) {
        const members = runtime.members;
        return (((members.m_device ?? 0)) ? 1 : 0);
    }
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_trigger"] ? __l["m_write_trigger"](Number(state)) : typeof members.m_write_trigger === 'function' ? members.m_write_trigger(state) : runtime.invoke("m_write_trigger", state));
    }
    function method_vcs_control_port_device__trigger_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_trigger)).bind === 'function' ? (runtime.dereference(members.m_write_trigger)).bind() : typeof (runtime.dereference(members.m_write_trigger)).bind === 'number' || typeof (runtime.dereference(members.m_write_trigger)).bind === 'boolean' ? (runtime.dereference(members.m_write_trigger)).bind : runtime.container(members.m_write_trigger, "bind"));
    }
    function method_vcs_control_port_device__exists(runtime) {
        const members = runtime.members;
        return (((members.m_device ?? 0)) ? 1 : 0);
    }
    function method_vcs_control_port_device__trigger_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_trigger"] ? __l["m_write_trigger"](Number(state)) : typeof members.m_write_trigger === 'function' ? members.m_write_trigger(state) : runtime.invoke("m_write_trigger", state));
    }
    return {
        "trigger_wr_callback": method_trigger_wr_callback,
        "exists": method_exists,
        "trigger_w": method_trigger_w,
        "vcs_control_port_device::trigger_wr_callback": method_vcs_control_port_device__trigger_wr_callback,
        "vcs_control_port_device::exists": method_vcs_control_port_device__exists,
        "vcs_control_port_device::trigger_w": method_vcs_control_port_device__trigger_w
    };
})();
definition.compiledMethodLinks = ["m_write_trigger"];
definition.slot.options["joy"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_joy)).read === 'function' ? (runtime.dereference(members.m_joy)).read() : typeof (runtime.dereference(members.m_joy)).read === 'number' || typeof (runtime.dereference(members.m_joy)).read === 'boolean' ? (runtime.dereference(members.m_joy)).read : runtime.container(members.m_joy, "read"))) & 0xff);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    return {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y
    };
})();
definition.slot.options["pad"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        const h_m_reverse_players = members.m_reverse_players ?? 0;
        let data = (((typeof (runtime.dereference(members.m_joy)).read === 'function' ? (runtime.dereference(members.m_joy)).read() : typeof (runtime.dereference(members.m_joy)).read === 'number' || typeof (runtime.dereference(members.m_joy)).read === 'boolean' ? (runtime.dereference(members.m_joy)).read : runtime.container(members.m_joy, "read"))) & 0xff);
        return ((((h_m_reverse_players) ? (((((data) >>> (7)) & 1) << 7 | (((data) >>> (6)) & 1) << 6 | (((data) >>> (5)) & 1) << 5 | (((data) >>> (4)) & 1) << 4 | (((data) >>> (2)) & 1) << 3 | (((data) >>> (3)) & 1) << 2 | (((data) >>> (1)) & 1) << 1 | (((data) >>> (0)) & 1) << 0)) : (data))) & 0xff);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        const h_m_reverse_players = members.m_reverse_players ?? 0;
        return ((((h_m_reverse_players) ? ((typeof (runtime.dereference(members.m_poty)).read === 'function' ? (runtime.dereference(members.m_poty)).read() : typeof (runtime.dereference(members.m_poty)).read === 'number' || typeof (runtime.dereference(members.m_poty)).read === 'boolean' ? (runtime.dereference(members.m_poty)).read : runtime.container(members.m_poty, "read"))) : ((typeof (runtime.dereference(members.m_potx)).read === 'function' ? (runtime.dereference(members.m_potx)).read() : typeof (runtime.dereference(members.m_potx)).read === 'number' || typeof (runtime.dereference(members.m_potx)).read === 'boolean' ? (runtime.dereference(members.m_potx)).read : runtime.container(members.m_potx, "read"))))) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        const h_m_reverse_players = members.m_reverse_players ?? 0;
        return ((((h_m_reverse_players) ? ((typeof (runtime.dereference(members.m_potx)).read === 'function' ? (runtime.dereference(members.m_potx)).read() : typeof (runtime.dereference(members.m_potx)).read === 'number' || typeof (runtime.dereference(members.m_potx)).read === 'boolean' ? (runtime.dereference(members.m_potx)).read : runtime.container(members.m_potx, "read"))) : ((typeof (runtime.dereference(members.m_poty)).read === 'function' ? (runtime.dereference(members.m_poty)).read() : typeof (runtime.dereference(members.m_poty)).read === 'number' || typeof (runtime.dereference(members.m_poty)).read === 'boolean' ? (runtime.dereference(members.m_poty)).read : runtime.container(members.m_poty, "read"))))) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_reverse_players(runtime, device) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["downcast"] ? __l["downcast"](runtime.dereference(device)) : runtime.macro("downcast", runtime.dereference(device))).m_reverse_players = 1;
    }
    function method_vcs_paddles_device__reverse_players(runtime, device) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["downcast"] ? __l["downcast"](runtime.dereference(device)) : runtime.macro("downcast", runtime.dereference(device))).m_reverse_players = 1;
    }
    function method_vcs_paddles_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_paddles_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    return {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "reverse_players": method_reverse_players,
        "vcs_paddles_device::reverse_players": method_vcs_paddles_device__reverse_players,
        "vcs_paddles_device::has_pot_x": method_vcs_paddles_device__has_pot_x,
        "vcs_paddles_device::has_pot_y": method_vcs_paddles_device__has_pot_y
    };
})();
definition.slot.options["pad"].compiledMethodLinks = ["downcast"];
definition.slot.options["mouse"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_joy)).read === 'function' ? (runtime.dereference(members.m_joy)).read() : typeof (runtime.dereference(members.m_joy)).read === 'number' || typeof (runtime.dereference(members.m_joy)).read === 'boolean' ? (runtime.dereference(members.m_joy)).read : runtime.container(members.m_joy, "read"))) & 0xff);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return (((((typeof (runtime.dereference(members.m_potx)).read === 'function' ? (runtime.dereference(members.m_potx)).read() : typeof (runtime.dereference(members.m_potx)).read === 'number' || typeof (runtime.dereference(members.m_potx)).read === 'boolean' ? (runtime.dereference(members.m_potx)).read : runtime.container(members.m_potx, "read"))) << (1))) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return (((((typeof (runtime.dereference(members.m_poty)).read === 'function' ? (runtime.dereference(members.m_poty)).read() : typeof (runtime.dereference(members.m_poty)).read === 'number' || typeof (runtime.dereference(members.m_poty)).read === 'boolean' ? (runtime.dereference(members.m_poty)).read : runtime.container(members.m_poty, "read"))) << (1))) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_vcs_mouse_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_mouse_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    return {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "vcs_mouse_device::has_pot_x": method_vcs_mouse_device__has_pot_x,
        "vcs_mouse_device::has_pot_y": method_vcs_mouse_device__has_pot_y
    };
})();
definition.slot.options["lp"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_joy)).read === 'function' ? (runtime.dereference(members.m_joy)).read() : typeof (runtime.dereference(members.m_joy)).read === 'number' || typeof (runtime.dereference(members.m_joy)).read === 'boolean' ? (runtime.dereference(members.m_joy)).read : runtime.container(members.m_joy, "read"))) & 0xff);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_trigger(runtime, field, param, oldval, newval) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(newval) ?? 0);
    }
    return {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "trigger": method_trigger
    };
})();
definition.slot.options["joybstr"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_joy)).read === 'function' ? (runtime.dereference(members.m_joy)).read() : typeof (runtime.dereference(members.m_joy)).read === 'number' || typeof (runtime.dereference(members.m_joy)).read === 'boolean' ? (runtime.dereference(members.m_joy)).read : runtime.container(members.m_joy, "read"))) & 0xff);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_potx)).read === 'function' ? (runtime.dereference(members.m_potx)).read() : typeof (runtime.dereference(members.m_potx)).read === 'number' || typeof (runtime.dereference(members.m_potx)).read === 'boolean' ? (runtime.dereference(members.m_potx)).read : runtime.container(members.m_potx, "read"))) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_poty)).read === 'function' ? (runtime.dereference(members.m_poty)).read() : typeof (runtime.dereference(members.m_poty)).read === 'number' || typeof (runtime.dereference(members.m_poty)).read === 'boolean' ? (runtime.dereference(members.m_poty)).read : runtime.container(members.m_poty, "read"))) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_vcs_joystick_booster_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_joystick_booster_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    return {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "vcs_joystick_booster_device::has_pot_x": method_vcs_joystick_booster_device__has_pot_x,
        "vcs_joystick_booster_device::has_pot_y": method_vcs_joystick_booster_device__has_pot_y
    };
})();
definition.slot.options["wheel"].compiledMethods = (() => {
    const __mame_table_0 = [0, 2, 3, 1];
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        return (((((typeof (runtime.dereference(members.m_joy)).read === 'function' ? (runtime.dereference(members.m_joy)).read() : typeof (runtime.dereference(members.m_joy)).read === 'number' || typeof (runtime.dereference(members.m_joy)).read === 'boolean' ? (runtime.dereference(members.m_joy)).read : runtime.container(members.m_joy, "read"))) | ((__mame_table_0[(((((((typeof (runtime.dereference(members.m_wheel)).read === 'function' ? (runtime.dereference(members.m_wheel)).read() : typeof (runtime.dereference(members.m_wheel)).read === 'number' || typeof (runtime.dereference(members.m_wheel)).read === 'boolean' ? (runtime.dereference(members.m_wheel)).read : runtime.container(members.m_wheel, "read"))) >>> (3)) & ((1 << (2)) - 1))) % 4) + 4) % 4] ?? 0)))) & 0xff);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    return {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y
    };
})();
definition.slot.options["keypad"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        return (((~method_read_keys(runtime, 2))) & 0xff);
    }
    function method_read_keys(runtime, col) {
        const members = runtime.members;
        let val = ((0) & 0xff);
        for (let row = ((0) | 0); ((Number(row) < Number(4)) ? 1 : 0); row = ((((row) + (1))) | 0)) {
            if (((((((members.m_row ?? 0)) >>> (row)) & 1)) ? 0 : 1)) {
                if (((((((typeof (runtime.dereference(members.m_keypad)).read === 'function' ? (runtime.dereference(members.m_keypad)).read() : typeof (runtime.dereference(members.m_keypad)).read === 'number' || typeof (runtime.dereference(members.m_keypad)).read === 'boolean' ? (runtime.dereference(members.m_keypad)).read : runtime.container(members.m_keypad, "read"))) >>> (((((3) * (row))) + (col)))) & 1)) ? 0 : 1)) {
                    val = ((255) & 0xff);
                }
                break;
            }
        }
        return val;
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((method_read_keys(runtime, 0)) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((method_read_keys(runtime, 1)) & 0xff);
    }
    function method_vcs_joy_w(runtime, data) {
        const members = runtime.members;
        members.m_row = ((((data) & (15))) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_vcs_keypad_device__vcs_joy_r(runtime) {
        const members = runtime.members;
        return (((~method_read_keys(runtime, 2))) & 0xff);
    }
    function method_vcs_keypad_device__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((method_read_keys(runtime, 0)) & 0xff);
    }
    function method_vcs_keypad_device__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((method_read_keys(runtime, 1)) & 0xff);
    }
    function method_vcs_keypad_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_keypad_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 1;
    }
    return {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "read_keys": method_read_keys,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "vcs_joy_w": method_vcs_joy_w,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "vcs_keypad_device::vcs_joy_r": method_vcs_keypad_device__vcs_joy_r,
        "vcs_keypad_device::vcs_pot_x_r": method_vcs_keypad_device__vcs_pot_x_r,
        "vcs_keypad_device::vcs_pot_y_r": method_vcs_keypad_device__vcs_pot_y_r,
        "vcs_keypad_device::has_pot_x": method_vcs_keypad_device__has_pot_x,
        "vcs_keypad_device::has_pot_y": method_vcs_keypad_device__has_pot_y
    };
})();
definition.slot.options["cx85"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (((((((~(__l["m_encoder.read"] ? __l["m_encoder.read"]() : ((members.m_encoder)?.read?.() ?? 0)))) & (15))) | ((((__l["m_encoder.da_r"] ? __l["m_encoder.da_r"]() : ((members.m_encoder)?.da_r?.() ?? 0))) ? (0) : (32))))) & 0xff);
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return ((((((((__l["m_encoder.read"] ? __l["m_encoder.read"]() : ((members.m_encoder)?.read?.() ?? 0))) >>> (4)) & 1)) ? (255) : (0))) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_atari_cx85_device__has_pot_x(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_atari_cx85_device__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    return {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "atari_cx85_device::has_pot_x": method_atari_cx85_device__has_pot_x,
        "atari_cx85_device::has_pot_y": method_atari_cx85_device__has_pot_y
    };
})();
definition.slot.options["cx85"].compiledMethodLinks = ["m_encoder.da_r", "m_encoder.read"];
definition.slot.options["cx85"].children[0].definition.compiledMethods = (() => {
    function method_perform_scan(runtime, param) {
        const members = runtime.members;
        method_change_output_lines(runtime);
        method_clock_scan_counters(runtime);
        method_detect_keypress(runtime);
    }
    function method_change_output_lines(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_next_data ?? 0)) !== Number((members.m_data ?? 0))) ? 1 : 0)) {
            members.m_data = (((members.m_next_data ?? 0)) & 0xff);
        }
        if (((Number((members.m_next_da ?? 0)) !== Number((members.m_da ?? 0))) ? 1 : 0)) {
            members.m_da = (((members.m_next_da ?? 0)) ? 1 : 0);
            0;
            (__l["m_write_da"] ? __l["m_write_da"](Number((((members.m_da ?? 0)) ? (1) : (0)))) : typeof members.m_write_da === 'function' ? members.m_write_da((((members.m_da ?? 0)) ? (1) : (0))) : runtime.invoke("m_write_da", (((members.m_da ?? 0)) ? (1) : (0))));
        }
    }
    function method_clock_scan_counters(runtime) {
        const members = runtime.members;
        if ((((members.m_inhibit ?? 0)) ? 0 : 1)) {
            members.m_x = ((((members.m_x) + (1))) | 0);
            members.m_x = ((((members.m_x) & (3))) | 0);
        }
    }
    function method_detect_keypress(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        let data = ((runtime.readIndex((members.m_read_x ?? 0), (members.m_x ?? 0))()) & 0xff);
        if ((members.m_inhibit ?? 0)) {
            if ((((data) >>> ((members.m_y ?? 0))) & 1)) {
                members.m_inhibit = ((0) ? 1 : 0);
                members.m_next_da = ((0) ? 1 : 0);
                members.m_next_data = (((__l["m_tristate_data"] ? __l["m_tristate_data"]() : typeof members.m_tristate_data === 'function' ? members.m_tristate_data() : runtime.invoke("m_tristate_data"))) & 0xff);
                0;
            }
        }
        else {
            for (let y = ((0) | 0); ((Number(y) < Number(5)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                if ((((((data) >>> (y)) & 1)) ? 0 : 1)) {
                    members.m_inhibit = ((1) ? 1 : 0);
                    members.m_next_da = ((1) ? 1 : 0);
                    members.m_y = ((y) | 0);
                    members.m_next_data = ((((((y) << (2))) | ((members.m_x ?? 0)))) & 0xff);
                    0;
                }
            }
        }
    }
    function method_set_cap_osc(runtime, value) {
        const members = runtime.members;
        members.m_cap_osc = value;
    }
    function method_set_cap_debounce(runtime, value) {
        const members = runtime.members;
        members.m_cap_debounce = value;
    }
    function method_da_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_da)).bind === 'function' ? (runtime.dereference(members.m_write_da)).bind() : typeof (runtime.dereference(members.m_write_da)).bind === 'number' || typeof (runtime.dereference(members.m_write_da)).bind === 'boolean' ? (runtime.dereference(members.m_write_da)).bind : runtime.container(members.m_write_da, "bind"));
    }
    function method_x1_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 0), "bind"));
    }
    function method_x2_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 1), "bind"));
    }
    function method_x3_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 2), "bind"));
    }
    function method_x4_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 3), "bind"));
    }
    function method_data_tri_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_tristate_data)).bind === 'function' ? (runtime.dereference(members.m_tristate_data)).bind() : typeof (runtime.dereference(members.m_tristate_data)).bind === 'number' || typeof (runtime.dereference(members.m_tristate_data)).bind === 'boolean' ? (runtime.dereference(members.m_tristate_data)).bind : runtime.container(members.m_tristate_data, "bind"));
    }
    function method_da_r(runtime) {
        const members = runtime.members;
        return (members.m_da ?? 0);
    }
    function method_mm74c922_device__set_cap_osc(runtime, value) {
        const members = runtime.members;
        members.m_cap_osc = value;
    }
    function method_mm74c922_device__set_cap_debounce(runtime, value) {
        const members = runtime.members;
        members.m_cap_debounce = value;
    }
    function method_mm74c922_device__da_wr_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_da)).bind === 'function' ? (runtime.dereference(members.m_write_da)).bind() : typeof (runtime.dereference(members.m_write_da)).bind === 'number' || typeof (runtime.dereference(members.m_write_da)).bind === 'boolean' ? (runtime.dereference(members.m_write_da)).bind : runtime.container(members.m_write_da, "bind"));
    }
    function method_mm74c922_device__x1_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 0))).bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 0), "bind"));
    }
    function method_mm74c922_device__x2_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 1))).bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 1), "bind"));
    }
    function method_mm74c922_device__x3_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 2))).bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 2), "bind"));
    }
    function method_mm74c922_device__x4_rd_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind === 'function' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind() : typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind === 'number' || typeof (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind === 'boolean' ? (runtime.dereference(runtime.readIndex((members.m_read_x ?? 0), 3))).bind : runtime.container(runtime.readIndex((members.m_read_x ?? 0), 3), "bind"));
    }
    function method_mm74c922_device__data_tri_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_tristate_data)).bind === 'function' ? (runtime.dereference(members.m_tristate_data)).bind() : typeof (runtime.dereference(members.m_tristate_data)).bind === 'number' || typeof (runtime.dereference(members.m_tristate_data)).bind === 'boolean' ? (runtime.dereference(members.m_tristate_data)).bind : runtime.container(members.m_tristate_data, "bind"));
    }
    function method_mm74c922_device__da_r(runtime) {
        const members = runtime.members;
        return (members.m_da ?? 0);
    }
    return {
        "perform_scan": method_perform_scan,
        "change_output_lines": method_change_output_lines,
        "clock_scan_counters": method_clock_scan_counters,
        "detect_keypress": method_detect_keypress,
        "set_cap_osc": method_set_cap_osc,
        "set_cap_debounce": method_set_cap_debounce,
        "da_wr_callback": method_da_wr_callback,
        "x1_rd_callback": method_x1_rd_callback,
        "x2_rd_callback": method_x2_rd_callback,
        "x3_rd_callback": method_x3_rd_callback,
        "x4_rd_callback": method_x4_rd_callback,
        "data_tri_callback": method_data_tri_callback,
        "da_r": method_da_r,
        "mm74c922_device::set_cap_osc": method_mm74c922_device__set_cap_osc,
        "mm74c922_device::set_cap_debounce": method_mm74c922_device__set_cap_debounce,
        "mm74c922_device::da_wr_callback": method_mm74c922_device__da_wr_callback,
        "mm74c922_device::x1_rd_callback": method_mm74c922_device__x1_rd_callback,
        "mm74c922_device::x2_rd_callback": method_mm74c922_device__x2_rd_callback,
        "mm74c922_device::x3_rd_callback": method_mm74c922_device__x3_rd_callback,
        "mm74c922_device::x4_rd_callback": method_mm74c922_device__x4_rd_callback,
        "mm74c922_device::data_tri_callback": method_mm74c922_device__data_tri_callback,
        "mm74c922_device::da_r": method_mm74c922_device__da_r
    };
})();
definition.slot.options["cx85"].children[0].definition.compiledMethodLinks = ["m_tristate_data", "m_write_da"];
definition.slot.options["trakball"].compiledMethods = (() => {
    function method_trigger_w(runtime, state) {
        const members = runtime.members;
        ((runtime.dereference(members.m_port)).trigger_w?.(state) ?? 0);
    }
    function method_vcs_joy_r(runtime) {
        const members = runtime.members;
        const h_m_last_direction = members.m_last_direction ?? 0;
        const h_m_last_pos = members.m_last_pos ?? 0;
        let vcs_joy_return = ((0) & 0xff);
        for (let axis = ((0) | 0); ((Number(axis) < Number(2)) ? 1 : 0); axis = ((((axis) + (1))) | 0)) {
            method_trakball_pos_and_dir_upd(runtime, axis);
        }
        vcs_joy_return = (((((((((((typeof (runtime.dereference(members.m_trakballb)).read === 'function' ? (runtime.dereference(members.m_trakballb)).read() : typeof (runtime.dereference(members.m_trakballb)).read === 'number' || typeof (runtime.dereference(members.m_trakballb)).read === 'boolean' ? (runtime.dereference(members.m_trakballb)).read : runtime.container(members.m_trakballb, "read"))) | (((h_m_last_direction[0]) ? (1) : (0))))) | (((((h_m_last_pos[0]) & (2))) ? (2) : (0))))) | (((h_m_last_direction[1]) ? (4) : (0))))) | (((((h_m_last_pos[1]) & (2))) ? (8) : (0))))) & 0xff);
        return ((vcs_joy_return) & 0xff);
    }
    function method_trakball_pos_and_dir_upd(runtime, axis) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_trakballxy = members.m_trakballxy ?? 0;
        const h_m_last_pos = members.m_last_pos ?? 0;
        const h_m_last_direction = members.m_last_direction ?? 0;
        let diff_pos = ((0) | 0);
        let cur_pos = ((0) | 0);
        cur_pos = ((((runtime.dereference(runtime.readIndex(h_m_trakballxy, axis))).read?.() ?? runtime.container(runtime.readIndex(h_m_trakballxy, axis), "read"))) | 0);
        if (((Number(h_m_last_pos[axis]) === Number(4294967295)) ? 1 : 0)) {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                h_m_last_pos[axis] = cur_pos;
            }
        }
        diff_pos = ((((cur_pos) - (h_m_last_pos[axis]))) | 0);
        if (((Number(diff_pos) > Number(127)) ? 1 : 0)) {
            diff_pos = ((((diff_pos) - (256))) | 0);
        }
        else {
            if (((Number(diff_pos) < Number(-128)) ? 1 : 0)) {
                diff_pos = ((((diff_pos) + (256))) | 0);
            }
        }
        if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            h_m_last_pos[axis] = cur_pos;
            if (diff_pos) {
                h_m_last_direction[axis] = ((Number(diff_pos) > Number(0)) ? 1 : 0);
            }
        }
    }
    function method_vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__vcs_joy_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_x_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__vcs_pot_y_r(runtime) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_vcs_control_port_interface__has_pot_x(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_vcs_control_port_interface__has_pot_y(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_trakball_moved(runtime, field, param, oldval, newval) {
        const members = runtime.members;
        let axis = ((((param) | 0)) | 0);
        method_trakball_pos_and_dir_upd(runtime, axis);
    }
    return {
        "trigger_w": method_trigger_w,
        "vcs_joy_r": method_vcs_joy_r,
        "trakball_pos_and_dir_upd": method_trakball_pos_and_dir_upd,
        "vcs_pot_x_r": method_vcs_pot_x_r,
        "vcs_pot_y_r": method_vcs_pot_y_r,
        "has_pot_x": method_has_pot_x,
        "has_pot_y": method_has_pot_y,
        "device_vcs_control_port_interface::vcs_joy_r": method_device_vcs_control_port_interface__vcs_joy_r,
        "device_vcs_control_port_interface::vcs_pot_x_r": method_device_vcs_control_port_interface__vcs_pot_x_r,
        "device_vcs_control_port_interface::vcs_pot_y_r": method_device_vcs_control_port_interface__vcs_pot_y_r,
        "device_vcs_control_port_interface::has_pot_x": method_device_vcs_control_port_interface__has_pot_x,
        "device_vcs_control_port_interface::has_pot_y": method_device_vcs_control_port_interface__has_pot_y,
        "trakball_moved": method_trakball_moved
    };
})();
definition.slot.options["trakball"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
export const device = definition;
export default device;
