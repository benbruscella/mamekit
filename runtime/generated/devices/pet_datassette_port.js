import deviceData from './pet_datassette_port.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_cart = (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
    }
    function method_read(runtime) {
        const members = runtime.members;
        let state = ((1) | 0);
        if ((((members.m_cart ?? 0)) ? 1 : 0)) {
            state = (((members.m_cart.datassette_read?.() ?? 0)) | 0);
        }
        return state;
    }
    function method_write(runtime, state) {
        const members = runtime.members;
        if ((((members.m_cart ?? 0)) ? 1 : 0)) {
            (members.m_cart.datassette_write?.(state) ?? 0);
        }
    }
    function method_sense_r(runtime) {
        const members = runtime.members;
        let state = ((1) | 0);
        if ((((members.m_cart ?? 0)) ? 1 : 0)) {
            state = (((members.m_cart.datassette_sense?.() ?? 0)) | 0);
        }
        return state;
    }
    function method_motor_w(runtime, state) {
        const members = runtime.members;
        if ((((members.m_cart ?? 0)) ? 1 : 0)) {
            (members.m_cart.datassette_motor?.(state) ?? 0);
        }
    }
    function method_read_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_read_handler"] ? __l["m_read_handler"](Number(state)) : typeof members.m_read_handler === 'function' ? members.m_read_handler(state) : runtime.invoke("m_read_handler", state));
    }
    function method_pet_datassette_port_device(runtime, mconfig, tag, owner, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_read_handler(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_read_handler)).bind === 'function' ? (runtime.dereference(members.m_read_handler)).bind() : typeof (runtime.dereference(members.m_read_handler)).bind === 'number' || typeof (runtime.dereference(members.m_read_handler)).bind === 'boolean' ? (runtime.dereference(members.m_read_handler)).bind : runtime.container(members.m_read_handler, "bind"));
    }
    function method_pet_datassette_port_device__pet_datassette_port_device(runtime, mconfig, tag, owner, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_pet_datassette_port_device__read_handler(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_read_handler)).bind === 'function' ? (runtime.dereference(members.m_read_handler)).bind() : typeof (runtime.dereference(members.m_read_handler)).bind === 'number' || typeof (runtime.dereference(members.m_read_handler)).bind === 'boolean' ? (runtime.dereference(members.m_read_handler)).bind : runtime.container(members.m_read_handler, "bind"));
    }
    return {
        "device_start": method_device_start,
        "read": method_read,
        "write": method_write,
        "sense_r": method_sense_r,
        "motor_w": method_motor_w,
        "read_w": method_read_w,
        "pet_datassette_port_device": method_pet_datassette_port_device,
        "read_handler": method_read_handler,
        "pet_datassette_port_device::pet_datassette_port_device": method_pet_datassette_port_device__pet_datassette_port_device,
        "pet_datassette_port_device::read_handler": method_pet_datassette_port_device__read_handler
    };
})();
definition.compiledMethodLinks = ["get_card_device", "m_read_handler", "set_options", "std::forward"];
definition.slot.options["c2n"].compiledMethods = (() => {
    function method_datassette_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return ((((Number((__l["m_cassette.input"] ? __l["m_cassette.input"]() : ((members.m_cassette)?.input?.() ?? 0))) > Number((+0))) ? 1 : 0)) ? (1) : (0));
    }
    function method_datassette_write(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_cassette.output"] ? __l["m_cassette.output"](((state) ? (-11599) : (11599))) : ((members.m_cassette)?.output?.(((state) ? (-11599) : (11599))) ?? 0));
    }
    function method_datassette_sense(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return ((Number((((__l["m_cassette.get_state"] ? __l["m_cassette.get_state"]() : ((members.m_cassette)?.get_state?.() ?? 0))) & (3))) === Number(0)) ? 1 : 0);
    }
    function method_datassette_motor(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((state) ? 0 : 1)) {
            (__l["m_cassette.change_state"] ? __l["m_cassette.change_state"](0, 4) : ((members.m_cassette)?.change_state?.(0, 4) ?? 0));
            members.m_motor = ((1) ? 1 : 0);
        }
        else {
            (__l["m_cassette.change_state"] ? __l["m_cassette.change_state"](4, 4) : ((members.m_cassette)?.change_state?.(4, 4) ?? 0));
            members.m_motor = ((0) ? 1 : 0);
        }
        ((runtime.dereference(members.m_slot)).read_w?.(method_datassette_read(runtime)) ?? 0);
    }
    function method_device_pet_datassette_port_interface__datassette_read(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_pet_datassette_port_interface__datassette_write(runtime, state) {
        const members = runtime.members;
    }
    function method_device_pet_datassette_port_interface__datassette_sense(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_pet_datassette_port_interface__datassette_motor(runtime, state) {
        const members = runtime.members;
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        ((runtime.dereference(members.m_read_timer)).adjust?.((__l["attotime::from_hz"] ? __l["attotime::from_hz"](44100) : runtime.macro("attotime::from_hz", 44100)), 0, (__l["attotime::from_hz"] ? __l["attotime::from_hz"](44100) : runtime.macro("attotime::from_hz", 44100))) ?? 0);
    }
    function method_read_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_motor ?? 0)) {
            ((runtime.dereference(members.m_slot)).read_w?.(method_datassette_read(runtime)) ?? 0);
        }
    }
    return {
        "datassette_read": method_datassette_read,
        "datassette_write": method_datassette_write,
        "datassette_sense": method_datassette_sense,
        "datassette_motor": method_datassette_motor,
        "device_pet_datassette_port_interface::datassette_read": method_device_pet_datassette_port_interface__datassette_read,
        "device_pet_datassette_port_interface::datassette_write": method_device_pet_datassette_port_interface__datassette_write,
        "device_pet_datassette_port_interface::datassette_sense": method_device_pet_datassette_port_interface__datassette_sense,
        "device_pet_datassette_port_interface::datassette_motor": method_device_pet_datassette_port_interface__datassette_motor,
        "device_start": method_device_start,
        "read_tick": method_read_tick
    };
})();
definition.slot.options["c2n"].compiledMethodLinks = ["attotime::from_hz", "m_cassette.change_state", "m_cassette.get_state", "m_cassette.input", "m_cassette.output"];
definition.slot.options["c2n"].children[0].definition.compiledMethods = (() => {
    function method_update(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let cur_time = (typeof ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : ((runtime.dereference(((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))).as_double?.() ?? 0));
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            let new_position = (((members.m_position ?? 0)) + (((((((cur_time) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
            switch ((((members.m_state ?? 0)) & (3))) {
                case 2:
                    {
                        ((runtime.dereference(members.m_cassette)).put_sample?.((members.m_channel ?? 0), (members.m_position ?? 0), ((new_position) - ((members.m_position ?? 0))), (members.m_value ?? 0)) ?? 0);
                        break;
                    }
                case 1:
                    {
                        if ((members.m_cassette ?? 0)) {
                            ((runtime.dereference(members.m_cassette)).get_sample?.((members.m_channel ?? 0), new_position, 0, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_value ?? 0), set: (value) => { members.m_value = ((value) | 0); } }), offset: 0 })) ?? 0);
                            let length = method_get_length(runtime);
                            if (((Number(new_position) > Number(length)) ? 1 : 0)) {
                                members.m_state = (((((members.m_state ?? 0)) & (-4))) | (0));
                                new_position = length;
                            }
                            else {
                                if (((Number(new_position) < Number(0)) ? 1 : 0)) {
                                    members.m_state = (((((members.m_state ?? 0)) & (-4))) | (0));
                                    new_position = 0;
                                }
                            }
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            members.m_position = new_position;
        }
        members.m_position_time = cur_time;
    }
    function method_is_stopped(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(0)) ? 1 : 0);
    }
    function method_motor_on(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (4))) === Number(0)) ? 1 : 0);
    }
    function method_get_length(runtime) {
        const members = runtime.members;
        let info = (typeof (runtime.dereference(members.m_cassette)).get_info === 'function' ? (runtime.dereference(members.m_cassette)).get_info() : typeof (runtime.dereference(members.m_cassette)).get_info === 'number' || typeof (runtime.dereference(members.m_cassette)).get_info === 'boolean' ? (runtime.dereference(members.m_cassette)).get_info : runtime.container(members.m_cassette, "get_info"));
        return ((info.sample_count) / (info.sample_frequency));
    }
    function method_change_state(runtime, state, mask) {
        const members = runtime.members;
        let new_state = 0;
        new_state = (members.m_state ?? 0);
        new_state = runtime.andAssign(new_state, (~mask));
        new_state = ((new_state) | (((state) & (mask))));
        if (((Number(new_state) !== Number((members.m_state ?? 0))) ? 1 : 0)) {
            method_update(runtime);
            members.m_state = new_state;
        }
    }
    function method_input(runtime) {
        const members = runtime.members;
        method_update(runtime);
        let value = (((members.m_value ?? 0)) / (2147483647));
        0;
        return value;
    }
    function method_output(runtime, value) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((((Number((((members.m_state ?? 0)) & (3))) === Number(2)) ? 1 : 0)) && (((Number((members.m_value ?? 0)) !== Number(value)) ? 1 : 0))) ? 1 : 0)) {
            method_update(runtime);
            value = (__l["std::clamp"] ? __l["std::clamp"](value, (-1), 1) : runtime.macro("std::clamp", value, (-1), 1));
            members.m_value = ((((((value) * (2147483647))) | 0)) | 0);
        }
    }
    function method_get_position(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let position = (members.m_position ?? 0);
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            position = ((position) + ((((((((typeof ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : ((runtime.dereference(((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))).as_double?.() ?? 0))) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
        }
        return position;
    }
    function method_set_channel(runtime, channel) {
        const members = runtime.members;
        members.m_channel = ((channel) | 0);
    }
    function method_set_speed(runtime, speed) {
        const members = runtime.members;
        members.m_speed = speed;
    }
    function method_go_forward(runtime) {
        const members = runtime.members;
        members.m_direction = ((1) | 0);
    }
    function method_go_reverse(runtime) {
        const members = runtime.members;
        members.m_direction = ((-1) | 0);
    }
    function method_seek(runtime, time, origin) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        method_update(runtime);
        let length = method_get_length(runtime);
        switch (origin) {
            case 0:
                {
                    break;
                }
            case 2:
                {
                    time = ((time) + (length));
                    break;
                }
            case 1:
                {
                    time = ((time) + (method_get_position(runtime)));
                    break;
                }
        }
        members.m_position = (__l["std::clamp"] ? __l["std::clamp"](time, 0, length) : runtime.macro("std::clamp", time, 0, length));
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_default_state = members.m_default_state ?? 0;
        const h_m_stereo = members.m_stereo ?? 0;
        members.m_cassette = 0;
        members.m_state = h_m_default_state;
        members.m_value = ((0) | 0);
        (__l["stream_alloc"] ? __l["stream_alloc"](0, ((h_m_stereo) ? (2) : (1)), ((__l["machine().sample_rate"] ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, ((h_m_stereo) ? (2) : (1)), ((__l["machine().sample_rate"] ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))));
    }
    function method_get_state(runtime) {
        const members = runtime.members;
        return (members.m_state ?? 0);
    }
    function method_is_playing(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(1)) ? 1 : 0);
    }
    function method_is_recording(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(2)) ? 1 : 0);
    }
    function method_set_motor(runtime, state) {
        const members = runtime.members;
        method_change_state(runtime, ((state) ? (0) : (4)), 4);
    }
    function method_set_speaker(runtime, state) {
        const members = runtime.members;
        method_change_state(runtime, ((state) ? (0) : (8)), 8);
    }
    function method_speaker_on(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (8))) === Number(0)) ? 1 : 0);
    }
    function method_mount_image(runtime, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_default_state = members.m_default_state ?? 0;
        if (((image) ? 0 : 1)) {
            return;
        }
        members.m_cassette = image;
        method_change_state(runtime, h_m_default_state, 3);
        members.m_position = 0;
        members.m_position_time = (typeof ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : ((runtime.dereference(((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))).as_double?.() ?? 0));
        members.m_channel = ((0) | 0);
        members.m_speed = 1;
        members.m_direction = ((1) | 0);
    }
    return {
        "update": method_update,
        "is_stopped": method_is_stopped,
        "motor_on": method_motor_on,
        "get_length": method_get_length,
        "change_state": method_change_state,
        "input": method_input,
        "output": method_output,
        "get_position": method_get_position,
        "set_channel": method_set_channel,
        "set_speed": method_set_speed,
        "go_forward": method_go_forward,
        "go_reverse": method_go_reverse,
        "seek": method_seek,
        "device_start": method_device_start,
        "get_state": method_get_state,
        "is_playing": method_is_playing,
        "is_recording": method_is_recording,
        "set_motor": method_set_motor,
        "set_speaker": method_set_speaker,
        "speaker_on": method_speaker_on,
        "mount_image": method_mount_image
    };
})();
definition.slot.options["c2n"].children[0].definition.compiledMethodLinks = ["NAME", "machine", "machine().sample_rate", "machine().time", "save_item", "std::clamp", "stream_alloc"];
definition.slot.options["c2n"].children[0].definition.imageFormats[0].definition.compiledMethods = (() => {
    function method_tap_data_to_samplecount(runtime, data, frequency) {
        const members = runtime.members;
        return ((((0.5) * (((((44100) / (frequency))) * (((data) + (0.5))))))) | 0);
    }
    function method_toggle_wave_data(runtime) {
        const members = runtime.members;
        members.wave_data = ((((((Number((members.wave_data ?? 0)) === Number(11599)) ? 1 : 0)) ? (-11599) : (11599))) << 16 >> 16);
    }
    function method_cbm_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; ((Number(length) > Number(0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(runtime.dereference(buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, runtime.add(runtime.dereference(buffer), 1));
        }
    }
    function method_cbm_tap_do_work(runtime, buffer, length, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let i = ((0) | 0);
        let j = ((0) | 0);
        let size = ((0) | 0);
        let version = ((0) | 0);
        let system = ((0) | 0);
        let video_standard = ((0) | 0);
        let tap_frequency = ((0) | 0);
        let byte_samples = ((0) | 0);
        let over_pulse_bytes = [0, 0, 0];
        let over_pulse_length = ((0) | 0);
        if ((((((data) ? 0 : 1)) || (((Number(length) <= Number(20)) ? 1 : 0))) ? 1 : 0)) {
            return -1;
        }
        version = ((runtime.readIndex(data, 12)) | 0);
        system = ((runtime.readIndex(data, 13)) | 0);
        video_standard = ((runtime.readIndex(data, 14)) | 0);
        if (((((buffer) ? 0 : 1)) ? 0 : 1)) {
            0;
            0;
            0;
            0;
        }
        if ((((((Number(version) < Number(0)) ? 1 : 0)) || (((Number(version) > Number(2)) ? 1 : 0))) ? 1 : 0)) {
            0;
            return -1;
        }
        switch (system) {
            case 1:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (127841) : (138551))) | 0);
                    break;
                }
            case 2:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (111860) : (110840))) | 0);
                    break;
                }
            default:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (127841) : (123156))) | 0);
                    break;
                }
        }
        for (i = ((20) | 0); ((Number(i) < Number(length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let byte = ((runtime.readIndex(data, i)) & 0xff);
            if (((version) ? 0 : 1)) {
                if (((Number(byte) !== Number(0)) ? 1 : 0)) {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, byte, tap_frequency)) | 0);
                }
                else {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, 882, tap_frequency)) | 0);
                }
            }
            if (version) {
                if ((((((Number(byte) !== Number(0)) ? 1 : 0)) && (((j) ? 0 : 1))) ? 1 : 0)) {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, byte, tap_frequency)) | 0);
                }
                else {
                    if (((Number(((((length) - (i))) + (j))) >= Number(4)) ? 1 : 0)) {
                        if (((Number(j) > Number(0)) ? 1 : 0)) {
                            runtime.writeIndex(over_pulse_bytes, ((j) - (1)), byte);
                            j = ((((j) + (1))) | 0);
                            if (((Number(j) >= Number(4)) ? 1 : 0)) {
                                over_pulse_length = ((runtime.shiftRight((__l["get_u24le"] ? __l["get_u24le"](over_pulse_bytes) : runtime.macro("get_u24le", over_pulse_bytes)), 3)) | 0);
                                byte_samples = ((method_tap_data_to_samplecount(runtime, over_pulse_length, tap_frequency)) | 0);
                                j = ((0) | 0);
                            }
                        }
                        else {
                            j = ((((j) + (1))) | 0);
                            0;
                            0;
                            0;
                        }
                    }
                    else {
                        j = ((1) | 0);
                    }
                }
            }
            if (((Number(j) === Number(0)) ? 1 : 0)) {
                method_cbm_output_wave(runtime, buffer, byte_samples);
                size = ((((size) + (byte_samples))) | 0);
                method_toggle_wave_data(runtime);
                if (((Number(version) < Number(2)) ? 1 : 0)) {
                    method_cbm_output_wave(runtime, buffer, byte_samples);
                    size = ((((size) + (byte_samples))) | 0);
                    method_toggle_wave_data(runtime);
                }
            }
        }
        return size;
    }
    function method_cbm_tap_to_wav_size(runtime, tapdata, taplen) {
        const members = runtime.members;
        let size = ((method_cbm_tap_do_work(runtime, 0, taplen, tapdata)) | 0);
        members.len = ((taplen) | 0);
        return size;
    }
    function method_cbm_tap_fill_wave(runtime, buffer, length, bytes, int) {
        const members = runtime.members;
        let p = buffer;
        return method_cbm_tap_do_work(runtime, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => p, set: (value) => { p = value; } }), offset: 0 }), (members.len ?? 0), bytes);
    }
    return {
        "tap_data_to_samplecount": method_tap_data_to_samplecount,
        "toggle_wave_data": method_toggle_wave_data,
        "cbm_output_wave": method_cbm_output_wave,
        "cbm_tap_do_work": method_cbm_tap_do_work,
        "cbm_tap_to_wav_size": method_cbm_tap_to_wav_size,
        "cbm_tap_fill_wave": method_cbm_tap_fill_wave
    };
})();
definition.slot.options["c2n"].children[0].definition.imageFormats[0].definition.compiledMethodLinks = ["get_u24le"];
definition.slot.options["c2n"].children[0].definition.imageFormats[1].definition.compiledMethods = (() => {
    function method_wavfile_process(runtime, cassette, opts, read_waveform) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_magic1 = members.magic1 ?? 0;
        const h_magic2 = members.magic2 ?? 0;
        const h_format_tag_id = members.format_tag_id ?? 0;
        const h_data_tag_id = members.data_tag_id ?? 0;
        let file_header = new Uint8Array(Math.max(0, Number(12)));
        let tag_header = new Uint8Array(Math.max(0, Number(8)));
        let format_tag = new Uint8Array(Math.max(0, Number(16)));
        let stated_size = ((0) >>> 0);
        let file_size = 0;
        let tag_size = ((0) >>> 0);
        let tag_samples = ((0) >>> 0);
        let offset = 0;
        let format_specified = ((0) ? 1 : 0);
        let format_type = ((0) & 0xffff);
        let bytes_per_second = ((0) >>> 0);
        let waveform_flags = ((0) | 0);
        ((runtime.dereference(cassette)).image_read?.(file_header, 0, ((file_header)?.byteLength ?? 1)) ?? 0);
        offset = ((file_header)?.byteLength ?? 1);
        if ((__l["memcmp"] ? __l["memcmp"](({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4))) {
            return 4;
        }
        if ((__l["memcmp"] ? __l["memcmp"](({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4))) {
            return 4;
        }
        stated_size = ((runtime.add((__l["get_u32le"] ? __l["get_u32le"](({ generatedPointer: true, source: file_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: file_header, offset: 4 }))), 8)) >>> 0);
        file_size = (typeof (runtime.dereference(cassette)).image_size === 'function' ? (runtime.dereference(cassette)).image_size() : typeof (runtime.dereference(cassette)).image_size === 'number' || typeof (runtime.dereference(cassette)).image_size === 'boolean' ? (runtime.dereference(cassette)).image_size : runtime.container(cassette, "image_size"));
        if (((Number(stated_size) > Number(file_size)) ? 1 : 0)) {
            stated_size = ((((file_size) >>> 0)) >>> 0);
        }
        while (((Number(offset) < Number(stated_size)) ? 1 : 0)) {
            ((runtime.dereference(cassette)).image_read?.(tag_header, offset, ((tag_header)?.byteLength ?? 1)) ?? 0);
            tag_size = (((__l["get_u32le"] ? __l["get_u32le"](({ generatedPointer: true, source: tag_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: tag_header, offset: 4 })))) >>> 0);
            offset = ((offset) + (((tag_header)?.byteLength ?? 1)));
            if ((((__l["memcmp"] ? __l["memcmp"](tag_header, h_format_tag_id, 4) : runtime.macro("memcmp", tag_header, h_format_tag_id, 4))) ? 0 : 1)) {
                if ((((format_specified) || (((Number(tag_size) < Number(((format_tag)?.byteLength ?? 1))) ? 1 : 0))) ? 1 : 0)) {
                    return 4;
                }
                format_specified = ((1) ? 1 : 0);
                ((runtime.dereference(cassette)).image_read?.(format_tag, offset, ((format_tag)?.byteLength ?? 1)) ?? 0);
                format_type = (((__l["get_u16le"] ? __l["get_u16le"](({ generatedPointer: true, source: format_tag, offset: 0 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 0 })))) & 0xffff);
                runtime.dereference(opts).channels = (__l["get_u16le"] ? __l["get_u16le"](({ generatedPointer: true, source: format_tag, offset: 2 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 2 })));
                runtime.dereference(opts).sample_frequency = (__l["get_u32le"] ? __l["get_u32le"](({ generatedPointer: true, source: format_tag, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 4 })));
                bytes_per_second = (((__l["get_u32le"] ? __l["get_u32le"](({ generatedPointer: true, source: format_tag, offset: 8 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 8 })))) >>> 0);
                runtime.dereference(opts).bits_per_sample = (__l["get_u16le"] ? __l["get_u16le"](({ generatedPointer: true, source: format_tag, offset: 14 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 14 })));
                if (((Number(format_type) !== Number(1)) ? 1 : 0)) {
                    return 4;
                }
                if (((Number(runtime.divide(((((runtime.dereference(opts).sample_frequency) * (runtime.dereference(opts).bits_per_sample))) * (runtime.dereference(opts).channels)), 8)) !== Number(bytes_per_second)) ? 1 : 0)) {
                    return 4;
                }
                switch (runtime.dereference(opts).bits_per_sample) {
                    case 8:
                        {
                            waveform_flags = ((8) | 0);
                            break;
                        }
                    case 16:
                        {
                            waveform_flags = ((2) | 0);
                            break;
                        }
                    case 32:
                        {
                            waveform_flags = ((4) | 0);
                            break;
                        }
                    default:
                        {
                            return 4;
                        }
                }
            }
            else {
                if ((((__l["memcmp"] ? __l["memcmp"](tag_header, h_data_tag_id, 4) : runtime.macro("memcmp", tag_header, h_data_tag_id, 4))) ? 0 : 1)) {
                    if (((format_specified) ? 0 : 1)) {
                        return 4;
                    }
                    if (read_waveform) {
                        tag_samples = ((runtime.divide(runtime.divide(tag_size, runtime.divide(runtime.dereference(opts).bits_per_sample, 8)), runtime.dereference(opts).channels)) >>> 0);
                        ((runtime.dereference(cassette)).read_samples?.(runtime.dereference(opts).channels, 0, ((tag_samples) / (runtime.dereference(opts).sample_frequency)), tag_samples, offset, waveform_flags) ?? 0);
                    }
                }
                else {
                }
            }
            offset = ((offset) + (tag_size));
        }
        return 0;
    }
    return {
        "wavfile_process": method_wavfile_process
    };
})();
definition.slot.options["c2n"].children[0].definition.imageFormats[1].definition.compiledMethodLinks = ["get_u16le", "get_u32le", "memcmp"];
definition.slot.options["c1530"].compiledMethods = (() => {
    function method_datassette_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return ((((Number((__l["m_cassette.input"] ? __l["m_cassette.input"]() : ((members.m_cassette)?.input?.() ?? 0))) > Number((+0))) ? 1 : 0)) ? (1) : (0));
    }
    function method_datassette_write(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_cassette.output"] ? __l["m_cassette.output"](((state) ? (-11599) : (11599))) : ((members.m_cassette)?.output?.(((state) ? (-11599) : (11599))) ?? 0));
    }
    function method_datassette_sense(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return ((Number((((__l["m_cassette.get_state"] ? __l["m_cassette.get_state"]() : ((members.m_cassette)?.get_state?.() ?? 0))) & (3))) === Number(0)) ? 1 : 0);
    }
    function method_datassette_motor(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((state) ? 0 : 1)) {
            (__l["m_cassette.change_state"] ? __l["m_cassette.change_state"](0, 4) : ((members.m_cassette)?.change_state?.(0, 4) ?? 0));
            members.m_motor = ((1) ? 1 : 0);
        }
        else {
            (__l["m_cassette.change_state"] ? __l["m_cassette.change_state"](4, 4) : ((members.m_cassette)?.change_state?.(4, 4) ?? 0));
            members.m_motor = ((0) ? 1 : 0);
        }
        ((runtime.dereference(members.m_slot)).read_w?.(method_datassette_read(runtime)) ?? 0);
    }
    function method_device_pet_datassette_port_interface__datassette_read(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_pet_datassette_port_interface__datassette_write(runtime, state) {
        const members = runtime.members;
    }
    function method_device_pet_datassette_port_interface__datassette_sense(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_pet_datassette_port_interface__datassette_motor(runtime, state) {
        const members = runtime.members;
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        ((runtime.dereference(members.m_read_timer)).adjust?.((__l["attotime::from_hz"] ? __l["attotime::from_hz"](44100) : runtime.macro("attotime::from_hz", 44100)), 0, (__l["attotime::from_hz"] ? __l["attotime::from_hz"](44100) : runtime.macro("attotime::from_hz", 44100))) ?? 0);
    }
    function method_read_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_motor ?? 0)) {
            ((runtime.dereference(members.m_slot)).read_w?.(method_datassette_read(runtime)) ?? 0);
        }
    }
    return {
        "datassette_read": method_datassette_read,
        "datassette_write": method_datassette_write,
        "datassette_sense": method_datassette_sense,
        "datassette_motor": method_datassette_motor,
        "device_pet_datassette_port_interface::datassette_read": method_device_pet_datassette_port_interface__datassette_read,
        "device_pet_datassette_port_interface::datassette_write": method_device_pet_datassette_port_interface__datassette_write,
        "device_pet_datassette_port_interface::datassette_sense": method_device_pet_datassette_port_interface__datassette_sense,
        "device_pet_datassette_port_interface::datassette_motor": method_device_pet_datassette_port_interface__datassette_motor,
        "device_start": method_device_start,
        "read_tick": method_read_tick
    };
})();
definition.slot.options["c1530"].compiledMethodLinks = ["attotime::from_hz", "m_cassette.change_state", "m_cassette.get_state", "m_cassette.input", "m_cassette.output"];
definition.slot.options["c1530"].children[0].definition.compiledMethods = (() => {
    function method_update(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let cur_time = (typeof ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : ((runtime.dereference(((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))).as_double?.() ?? 0));
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            let new_position = (((members.m_position ?? 0)) + (((((((cur_time) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
            switch ((((members.m_state ?? 0)) & (3))) {
                case 2:
                    {
                        ((runtime.dereference(members.m_cassette)).put_sample?.((members.m_channel ?? 0), (members.m_position ?? 0), ((new_position) - ((members.m_position ?? 0))), (members.m_value ?? 0)) ?? 0);
                        break;
                    }
                case 1:
                    {
                        if ((members.m_cassette ?? 0)) {
                            ((runtime.dereference(members.m_cassette)).get_sample?.((members.m_channel ?? 0), new_position, 0, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_value ?? 0), set: (value) => { members.m_value = ((value) | 0); } }), offset: 0 })) ?? 0);
                            let length = method_get_length(runtime);
                            if (((Number(new_position) > Number(length)) ? 1 : 0)) {
                                members.m_state = (((((members.m_state ?? 0)) & (-4))) | (0));
                                new_position = length;
                            }
                            else {
                                if (((Number(new_position) < Number(0)) ? 1 : 0)) {
                                    members.m_state = (((((members.m_state ?? 0)) & (-4))) | (0));
                                    new_position = 0;
                                }
                            }
                        }
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
            members.m_position = new_position;
        }
        members.m_position_time = cur_time;
    }
    function method_is_stopped(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(0)) ? 1 : 0);
    }
    function method_motor_on(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (4))) === Number(0)) ? 1 : 0);
    }
    function method_get_length(runtime) {
        const members = runtime.members;
        let info = (typeof (runtime.dereference(members.m_cassette)).get_info === 'function' ? (runtime.dereference(members.m_cassette)).get_info() : typeof (runtime.dereference(members.m_cassette)).get_info === 'number' || typeof (runtime.dereference(members.m_cassette)).get_info === 'boolean' ? (runtime.dereference(members.m_cassette)).get_info : runtime.container(members.m_cassette, "get_info"));
        return ((info.sample_count) / (info.sample_frequency));
    }
    function method_change_state(runtime, state, mask) {
        const members = runtime.members;
        let new_state = 0;
        new_state = (members.m_state ?? 0);
        new_state = runtime.andAssign(new_state, (~mask));
        new_state = ((new_state) | (((state) & (mask))));
        if (((Number(new_state) !== Number((members.m_state ?? 0))) ? 1 : 0)) {
            method_update(runtime);
            members.m_state = new_state;
        }
    }
    function method_input(runtime) {
        const members = runtime.members;
        method_update(runtime);
        let value = (((members.m_value ?? 0)) / (2147483647));
        0;
        return value;
    }
    function method_output(runtime, value) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((((Number((((members.m_state ?? 0)) & (3))) === Number(2)) ? 1 : 0)) && (((Number((members.m_value ?? 0)) !== Number(value)) ? 1 : 0))) ? 1 : 0)) {
            method_update(runtime);
            value = (__l["std::clamp"] ? __l["std::clamp"](value, (-1), 1) : runtime.macro("std::clamp", value, (-1), 1));
            members.m_value = ((((((value) * (2147483647))) | 0)) | 0);
        }
    }
    function method_get_position(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let position = (members.m_position ?? 0);
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            position = ((position) + ((((((((typeof ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : ((runtime.dereference(((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))).as_double?.() ?? 0))) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
        }
        return position;
    }
    function method_set_channel(runtime, channel) {
        const members = runtime.members;
        members.m_channel = ((channel) | 0);
    }
    function method_set_speed(runtime, speed) {
        const members = runtime.members;
        members.m_speed = speed;
    }
    function method_go_forward(runtime) {
        const members = runtime.members;
        members.m_direction = ((1) | 0);
    }
    function method_go_reverse(runtime) {
        const members = runtime.members;
        members.m_direction = ((-1) | 0);
    }
    function method_seek(runtime, time, origin) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        method_update(runtime);
        let length = method_get_length(runtime);
        switch (origin) {
            case 0:
                {
                    break;
                }
            case 2:
                {
                    time = ((time) + (length));
                    break;
                }
            case 1:
                {
                    time = ((time) + (method_get_position(runtime)));
                    break;
                }
        }
        members.m_position = (__l["std::clamp"] ? __l["std::clamp"](time, 0, length) : runtime.macro("std::clamp", time, 0, length));
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_default_state = members.m_default_state ?? 0;
        const h_m_stereo = members.m_stereo ?? 0;
        members.m_cassette = 0;
        members.m_state = h_m_default_state;
        members.m_value = ((0) | 0);
        (__l["stream_alloc"] ? __l["stream_alloc"](0, ((h_m_stereo) ? (2) : (1)), ((__l["machine().sample_rate"] ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, ((h_m_stereo) ? (2) : (1)), ((__l["machine().sample_rate"] ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))));
    }
    function method_get_state(runtime) {
        const members = runtime.members;
        return (members.m_state ?? 0);
    }
    function method_is_playing(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(1)) ? 1 : 0);
    }
    function method_is_recording(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (3))) === Number(2)) ? 1 : 0);
    }
    function method_set_motor(runtime, state) {
        const members = runtime.members;
        method_change_state(runtime, ((state) ? (0) : (4)), 4);
    }
    function method_set_speaker(runtime, state) {
        const members = runtime.members;
        method_change_state(runtime, ((state) ? (0) : (8)), 8);
    }
    function method_speaker_on(runtime) {
        const members = runtime.members;
        return ((Number((((members.m_state ?? 0)) & (8))) === Number(0)) ? 1 : 0);
    }
    function method_mount_image(runtime, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_default_state = members.m_default_state ?? 0;
        if (((image) ? 0 : 1)) {
            return;
        }
        members.m_cassette = image;
        method_change_state(runtime, h_m_default_state, 3);
        members.m_position = 0;
        members.m_position_time = (typeof ((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : ((runtime.dereference(((__l["machine().time"] ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))).as_double?.() ?? 0));
        members.m_channel = ((0) | 0);
        members.m_speed = 1;
        members.m_direction = ((1) | 0);
    }
    return {
        "update": method_update,
        "is_stopped": method_is_stopped,
        "motor_on": method_motor_on,
        "get_length": method_get_length,
        "change_state": method_change_state,
        "input": method_input,
        "output": method_output,
        "get_position": method_get_position,
        "set_channel": method_set_channel,
        "set_speed": method_set_speed,
        "go_forward": method_go_forward,
        "go_reverse": method_go_reverse,
        "seek": method_seek,
        "device_start": method_device_start,
        "get_state": method_get_state,
        "is_playing": method_is_playing,
        "is_recording": method_is_recording,
        "set_motor": method_set_motor,
        "set_speaker": method_set_speaker,
        "speaker_on": method_speaker_on,
        "mount_image": method_mount_image
    };
})();
definition.slot.options["c1530"].children[0].definition.compiledMethodLinks = ["NAME", "machine", "machine().sample_rate", "machine().time", "save_item", "std::clamp", "stream_alloc"];
definition.slot.options["c1530"].children[0].definition.imageFormats[0].definition.compiledMethods = (() => {
    function method_tap_data_to_samplecount(runtime, data, frequency) {
        const members = runtime.members;
        return ((((0.5) * (((((44100) / (frequency))) * (((data) + (0.5))))))) | 0);
    }
    function method_toggle_wave_data(runtime) {
        const members = runtime.members;
        members.wave_data = ((((((Number((members.wave_data ?? 0)) === Number(11599)) ? 1 : 0)) ? (-11599) : (11599))) << 16 >> 16);
    }
    function method_cbm_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; ((Number(length) > Number(0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(runtime.dereference(buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, runtime.add(runtime.dereference(buffer), 1));
        }
    }
    function method_cbm_tap_do_work(runtime, buffer, length, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let i = ((0) | 0);
        let j = ((0) | 0);
        let size = ((0) | 0);
        let version = ((0) | 0);
        let system = ((0) | 0);
        let video_standard = ((0) | 0);
        let tap_frequency = ((0) | 0);
        let byte_samples = ((0) | 0);
        let over_pulse_bytes = [0, 0, 0];
        let over_pulse_length = ((0) | 0);
        if ((((((data) ? 0 : 1)) || (((Number(length) <= Number(20)) ? 1 : 0))) ? 1 : 0)) {
            return -1;
        }
        version = ((runtime.readIndex(data, 12)) | 0);
        system = ((runtime.readIndex(data, 13)) | 0);
        video_standard = ((runtime.readIndex(data, 14)) | 0);
        if (((((buffer) ? 0 : 1)) ? 0 : 1)) {
            0;
            0;
            0;
            0;
        }
        if ((((((Number(version) < Number(0)) ? 1 : 0)) || (((Number(version) > Number(2)) ? 1 : 0))) ? 1 : 0)) {
            0;
            return -1;
        }
        switch (system) {
            case 1:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (127841) : (138551))) | 0);
                    break;
                }
            case 2:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (111860) : (110840))) | 0);
                    break;
                }
            default:
                {
                    tap_frequency = ((((((Number(video_standard) === Number(1)) ? 1 : 0)) ? (127841) : (123156))) | 0);
                    break;
                }
        }
        for (i = ((20) | 0); ((Number(i) < Number(length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let byte = ((runtime.readIndex(data, i)) & 0xff);
            if (((version) ? 0 : 1)) {
                if (((Number(byte) !== Number(0)) ? 1 : 0)) {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, byte, tap_frequency)) | 0);
                }
                else {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, 882, tap_frequency)) | 0);
                }
            }
            if (version) {
                if ((((((Number(byte) !== Number(0)) ? 1 : 0)) && (((j) ? 0 : 1))) ? 1 : 0)) {
                    byte_samples = ((method_tap_data_to_samplecount(runtime, byte, tap_frequency)) | 0);
                }
                else {
                    if (((Number(((((length) - (i))) + (j))) >= Number(4)) ? 1 : 0)) {
                        if (((Number(j) > Number(0)) ? 1 : 0)) {
                            runtime.writeIndex(over_pulse_bytes, ((j) - (1)), byte);
                            j = ((((j) + (1))) | 0);
                            if (((Number(j) >= Number(4)) ? 1 : 0)) {
                                over_pulse_length = ((runtime.shiftRight((__l["get_u24le"] ? __l["get_u24le"](over_pulse_bytes) : runtime.macro("get_u24le", over_pulse_bytes)), 3)) | 0);
                                byte_samples = ((method_tap_data_to_samplecount(runtime, over_pulse_length, tap_frequency)) | 0);
                                j = ((0) | 0);
                            }
                        }
                        else {
                            j = ((((j) + (1))) | 0);
                            0;
                            0;
                            0;
                        }
                    }
                    else {
                        j = ((1) | 0);
                    }
                }
            }
            if (((Number(j) === Number(0)) ? 1 : 0)) {
                method_cbm_output_wave(runtime, buffer, byte_samples);
                size = ((((size) + (byte_samples))) | 0);
                method_toggle_wave_data(runtime);
                if (((Number(version) < Number(2)) ? 1 : 0)) {
                    method_cbm_output_wave(runtime, buffer, byte_samples);
                    size = ((((size) + (byte_samples))) | 0);
                    method_toggle_wave_data(runtime);
                }
            }
        }
        return size;
    }
    function method_cbm_tap_to_wav_size(runtime, tapdata, taplen) {
        const members = runtime.members;
        let size = ((method_cbm_tap_do_work(runtime, 0, taplen, tapdata)) | 0);
        members.len = ((taplen) | 0);
        return size;
    }
    function method_cbm_tap_fill_wave(runtime, buffer, length, bytes, int) {
        const members = runtime.members;
        let p = buffer;
        return method_cbm_tap_do_work(runtime, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => p, set: (value) => { p = value; } }), offset: 0 }), (members.len ?? 0), bytes);
    }
    return {
        "tap_data_to_samplecount": method_tap_data_to_samplecount,
        "toggle_wave_data": method_toggle_wave_data,
        "cbm_output_wave": method_cbm_output_wave,
        "cbm_tap_do_work": method_cbm_tap_do_work,
        "cbm_tap_to_wav_size": method_cbm_tap_to_wav_size,
        "cbm_tap_fill_wave": method_cbm_tap_fill_wave
    };
})();
definition.slot.options["c1530"].children[0].definition.imageFormats[0].definition.compiledMethodLinks = ["get_u24le"];
definition.slot.options["c1530"].children[0].definition.imageFormats[1].definition.compiledMethods = (() => {
    function method_wavfile_process(runtime, cassette, opts, read_waveform) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_magic1 = members.magic1 ?? 0;
        const h_magic2 = members.magic2 ?? 0;
        const h_format_tag_id = members.format_tag_id ?? 0;
        const h_data_tag_id = members.data_tag_id ?? 0;
        let file_header = new Uint8Array(Math.max(0, Number(12)));
        let tag_header = new Uint8Array(Math.max(0, Number(8)));
        let format_tag = new Uint8Array(Math.max(0, Number(16)));
        let stated_size = ((0) >>> 0);
        let file_size = 0;
        let tag_size = ((0) >>> 0);
        let tag_samples = ((0) >>> 0);
        let offset = 0;
        let format_specified = ((0) ? 1 : 0);
        let format_type = ((0) & 0xffff);
        let bytes_per_second = ((0) >>> 0);
        let waveform_flags = ((0) | 0);
        ((runtime.dereference(cassette)).image_read?.(file_header, 0, ((file_header)?.byteLength ?? 1)) ?? 0);
        offset = ((file_header)?.byteLength ?? 1);
        if ((__l["memcmp"] ? __l["memcmp"](({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4))) {
            return 4;
        }
        if ((__l["memcmp"] ? __l["memcmp"](({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4))) {
            return 4;
        }
        stated_size = ((runtime.add((__l["get_u32le"] ? __l["get_u32le"](({ generatedPointer: true, source: file_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: file_header, offset: 4 }))), 8)) >>> 0);
        file_size = (typeof (runtime.dereference(cassette)).image_size === 'function' ? (runtime.dereference(cassette)).image_size() : typeof (runtime.dereference(cassette)).image_size === 'number' || typeof (runtime.dereference(cassette)).image_size === 'boolean' ? (runtime.dereference(cassette)).image_size : runtime.container(cassette, "image_size"));
        if (((Number(stated_size) > Number(file_size)) ? 1 : 0)) {
            stated_size = ((((file_size) >>> 0)) >>> 0);
        }
        while (((Number(offset) < Number(stated_size)) ? 1 : 0)) {
            ((runtime.dereference(cassette)).image_read?.(tag_header, offset, ((tag_header)?.byteLength ?? 1)) ?? 0);
            tag_size = (((__l["get_u32le"] ? __l["get_u32le"](({ generatedPointer: true, source: tag_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: tag_header, offset: 4 })))) >>> 0);
            offset = ((offset) + (((tag_header)?.byteLength ?? 1)));
            if ((((__l["memcmp"] ? __l["memcmp"](tag_header, h_format_tag_id, 4) : runtime.macro("memcmp", tag_header, h_format_tag_id, 4))) ? 0 : 1)) {
                if ((((format_specified) || (((Number(tag_size) < Number(((format_tag)?.byteLength ?? 1))) ? 1 : 0))) ? 1 : 0)) {
                    return 4;
                }
                format_specified = ((1) ? 1 : 0);
                ((runtime.dereference(cassette)).image_read?.(format_tag, offset, ((format_tag)?.byteLength ?? 1)) ?? 0);
                format_type = (((__l["get_u16le"] ? __l["get_u16le"](({ generatedPointer: true, source: format_tag, offset: 0 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 0 })))) & 0xffff);
                runtime.dereference(opts).channels = (__l["get_u16le"] ? __l["get_u16le"](({ generatedPointer: true, source: format_tag, offset: 2 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 2 })));
                runtime.dereference(opts).sample_frequency = (__l["get_u32le"] ? __l["get_u32le"](({ generatedPointer: true, source: format_tag, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 4 })));
                bytes_per_second = (((__l["get_u32le"] ? __l["get_u32le"](({ generatedPointer: true, source: format_tag, offset: 8 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 8 })))) >>> 0);
                runtime.dereference(opts).bits_per_sample = (__l["get_u16le"] ? __l["get_u16le"](({ generatedPointer: true, source: format_tag, offset: 14 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 14 })));
                if (((Number(format_type) !== Number(1)) ? 1 : 0)) {
                    return 4;
                }
                if (((Number(runtime.divide(((((runtime.dereference(opts).sample_frequency) * (runtime.dereference(opts).bits_per_sample))) * (runtime.dereference(opts).channels)), 8)) !== Number(bytes_per_second)) ? 1 : 0)) {
                    return 4;
                }
                switch (runtime.dereference(opts).bits_per_sample) {
                    case 8:
                        {
                            waveform_flags = ((8) | 0);
                            break;
                        }
                    case 16:
                        {
                            waveform_flags = ((2) | 0);
                            break;
                        }
                    case 32:
                        {
                            waveform_flags = ((4) | 0);
                            break;
                        }
                    default:
                        {
                            return 4;
                        }
                }
            }
            else {
                if ((((__l["memcmp"] ? __l["memcmp"](tag_header, h_data_tag_id, 4) : runtime.macro("memcmp", tag_header, h_data_tag_id, 4))) ? 0 : 1)) {
                    if (((format_specified) ? 0 : 1)) {
                        return 4;
                    }
                    if (read_waveform) {
                        tag_samples = ((runtime.divide(runtime.divide(tag_size, runtime.divide(runtime.dereference(opts).bits_per_sample, 8)), runtime.dereference(opts).channels)) >>> 0);
                        ((runtime.dereference(cassette)).read_samples?.(runtime.dereference(opts).channels, 0, ((tag_samples) / (runtime.dereference(opts).sample_frequency)), tag_samples, offset, waveform_flags) ?? 0);
                    }
                }
                else {
                }
            }
            offset = ((offset) + (tag_size));
        }
        return 0;
    }
    return {
        "wavfile_process": method_wavfile_process
    };
})();
definition.slot.options["c1530"].children[0].definition.imageFormats[1].definition.compiledMethodLinks = ["get_u16le", "get_u32le", "memcmp"];
export const device = definition;
export default device;
