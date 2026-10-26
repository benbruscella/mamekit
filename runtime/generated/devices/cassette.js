import deviceData from './cassette.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
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
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let state = ((method_get_state(runtime)) & (15));
        if (((((__l["exists"] ? __l["exists"]() : runtime.macro("exists"))) && (((Number(state) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
            let samples = (((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples"))) | 0);
            let cassette = (__l["get_image"] ? __l["get_image"]() : runtime.macro("get_image"));
            let time_index = method_get_position(runtime);
            let duration = ((samples) / ((typeof (runtime.dereference(stream)).sample_rate === 'function' ? (runtime.dereference(stream)).sample_rate() : typeof (runtime.dereference(stream)).sample_rate === 'number' || typeof (runtime.dereference(stream)).sample_rate === 'boolean' ? (runtime.dereference(stream)).sample_rate : runtime.container(stream, "sample_rate"))));
            if (((Number((members.m_samples).length) < Number(samples)) ? 1 : 0)) {
                (members.m_samples = runtime.resize(members.m_samples, samples));
            }
            let info = (typeof (runtime.dereference(cassette)).get_info === 'function' ? (runtime.dereference(cassette)).get_info() : typeof (runtime.dereference(cassette)).get_info === 'number' || typeof (runtime.dereference(cassette)).get_info === 'boolean' ? (runtime.dereference(cassette)).get_info : runtime.container(cassette, "get_info"));
            for (let ch = ((0) | 0); ((Number(ch) < Number((typeof (runtime.dereference(stream)).output_count === 'function' ? (runtime.dereference(stream)).output_count() : typeof (runtime.dereference(stream)).output_count === 'number' || typeof (runtime.dereference(stream)).output_count === 'boolean' ? (runtime.dereference(stream)).output_count : runtime.container(stream, "output_count")))) ? 1 : 0); ch = ((((ch) + (1))) | 0)) {
                if (((Number(ch) < Number(info.channels)) ? 1 : 0)) {
                    ((runtime.dereference(cassette)).get_samples?.(ch, time_index, duration, samples, 2, runtime.addressOf((members.m_samples ?? 0), 0), 2) ?? 0);
                }
                else {
                    ((runtime.dereference(cassette)).get_samples?.(0, time_index, duration, samples, 2, runtime.addressOf((members.m_samples ?? 0), 0), 2) ?? 0);
                }
                for (let sampindex = ((0) | 0); ((Number(sampindex) < Number(samples)) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                    ((runtime.dereference(stream)).put_int?.(ch, sampindex, runtime.readIndex((members.m_samples ?? 0), sampindex), 32768) ?? 0);
                }
            }
        }
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
        "mount_image": method_mount_image,
        "sound_stream_update": method_sound_stream_update
    };
})();
definition.compiledMethodLinks = ["NAME", "exists", "get_image", "machine", "machine().sample_rate", "machine().time", "save_item", "std::clamp", "stream_alloc"];
definition.imageFormats[0].definition.compiledMethods = (() => {
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
definition.imageFormats[0].definition.compiledMethodLinks = ["get_u16le", "get_u32le", "memcmp"];
definition.imageFormats[1].definition.compiledMethods = (() => {
    function method_tzx_cas_fill_wave(runtime, buffer, length, bytes, int) {
        const members = runtime.members;
        let p = buffer;
        let size = ((0) | 0);
        members.t_scale = 1;
        size = ((method_tzx_cas_do_work(runtime, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => p, set: (value) => { p = value; } }), offset: 0 }))) | 0);
        return size;
    }
    function method_tzx_cas_do_work(runtime, buffer) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let current_block = ((0) | 0);
        let size = ((0) | 0);
        members.wave_data = ((-23198) << 16 >> 16);
        let loopcount = ((0) | 0);
        let loopoffset = ((0) | 0);
        while (((Number(current_block) < Number((members.block_count ?? 0))) ? 1 : 0)) {
            let pause_time = ((0) | 0);
            let data_size = ((0) >>> 0);
            let text_size = ((0) | 0);
            let total_size = ((0) | 0);
            let i = ((0) | 0);
            let pilot = ((0) | 0);
            let pilot_length = ((0) | 0);
            let sync1 = ((0) | 0);
            let sync2 = ((0) | 0);
            let bit0 = ((0) | 0);
            let bit1 = ((0) | 0);
            let bits_in_last_byte = ((0) | 0);
            let cur_block = runtime.readIndex((members.blocks ?? 0), current_block);
            let block_type = ((runtime.readIndex(cur_block, 0)) & 0xff);
            let tstates = ((0) & 0xffff);
            switch (block_type) {
                case 16:
                    {
                        pause_time = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 1)))) | 0);
                        data_size = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 3)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 3)))) >>> 0);
                        pilot_length = ((((((Number(runtime.readIndex(cur_block, 5)) < Number(128)) ? 1 : 0)) ? (8063) : (3223))) | 0);
                        size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, runtime.addressOf(cur_block, 5), pause_time, data_size, 2168, pilot_length, 667, 735, 855, 1710, 8)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 17:
                    {
                        pilot = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 1)))) | 0);
                        sync1 = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 3)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 3)))) | 0);
                        sync2 = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 5)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 5)))) | 0);
                        bit0 = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 7)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 7)))) | 0);
                        bit1 = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 9)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 9)))) | 0);
                        pilot_length = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 11)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 11)))) | 0);
                        bits_in_last_byte = ((runtime.readIndex(cur_block, 13)) | 0);
                        pause_time = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 14)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 14)))) | 0);
                        data_size = (((__l["get_u24le"] ? __l["get_u24le"](runtime.addressOf(cur_block, 16)) : runtime.macro("get_u24le", runtime.addressOf(cur_block, 16)))) >>> 0);
                        size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, runtime.addressOf(cur_block, 19), pause_time, data_size, pilot, pilot_length, sync1, sync2, bit0, bit1, bits_in_last_byte)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 18:
                    {
                        pilot = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 1)))) | 0);
                        pilot_length = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 3)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 3)))) | 0);
                        size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, cur_block, 0, 0, pilot, pilot_length, 0, 0, 0, 0, 0)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 19:
                    {
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number(runtime.readIndex(cur_block, 1))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                            pilot = ((runtime.add(runtime.readIndex(cur_block, runtime.add(2, ((2) * (data_size)))), ((runtime.readIndex(cur_block, runtime.add(3, ((2) * (data_size))))) << (8)))) | 0);
                            size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, cur_block, 0, 0, pilot, 1, 0, 0, 0, 0, 0)))) | 0);
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 20:
                    {
                        bit0 = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 1)))) | 0);
                        bit1 = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 3)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 3)))) | 0);
                        bits_in_last_byte = ((runtime.readIndex(cur_block, 5)) | 0);
                        pause_time = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 6)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 6)))) | 0);
                        data_size = (((__l["get_u24le"] ? __l["get_u24le"](runtime.addressOf(cur_block, 8)) : runtime.macro("get_u24le", runtime.addressOf(cur_block, 8)))) >>> 0);
                        size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, runtime.addressOf(cur_block, 11), pause_time, data_size, 0, 0, 0, 0, bit0, bit1, bits_in_last_byte)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 32:
                    {
                        pause_time = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 1)))) | 0);
                        if (((Number(pause_time) === Number(0)) ? 1 : 0)) {
                            pause_time = ((5000) | 0);
                        }
                        size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, cur_block, pause_time, 0, 0, 0, 0, 0, 0, 0, 0)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 22:
                case 23:
                case 52:
                case 64:
                    {
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 48:
                    {
                        method_ascii_block_common_log(runtime, "Text Description Block", block_type);
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number(runtime.readIndex(cur_block, 1))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 49:
                    {
                        method_ascii_block_common_log(runtime, "Message Block", block_type);
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number(runtime.readIndex(cur_block, 2))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                            if (((Number(runtime.readIndex(cur_block, ((3) + (data_size)))) === Number(13)) ? 1 : 0)) {
                            }
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 50:
                    {
                        method_ascii_block_common_log(runtime, "Archive Info Block", block_type);
                        total_size = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 1)))) | 0);
                        text_size = ((0) | 0);
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number(runtime.readIndex(cur_block, 3))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                            if (((Number(runtime.readIndex(cur_block, ((4) + (text_size)))) < Number(9)) ? 1 : 0)) {
                            }
                            else {
                            }
                            for (i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(cur_block, runtime.add(((4) + (text_size)), 1)))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            }
                            text_size = ((((text_size) + (((2) + (i))))) | 0);
                        }
                        if (((Number(text_size) !== Number(total_size)) ? 1 : 0)) {
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 51:
                    {
                        method_ascii_block_common_log(runtime, "Hardware Type Block", block_type);
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number(runtime.readIndex(cur_block, 1))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 53:
                    {
                        method_ascii_block_common_log(runtime, "Custom Info Block", block_type);
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number(16)) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                        }
                        text_size = (((__l["get_u32le"] ? __l["get_u32le"](runtime.addressOf(cur_block, 17)) : runtime.macro("get_u32le", runtime.addressOf(cur_block, 17)))) | 0);
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number(text_size)) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 90:
                    {
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 36:
                    {
                        loopcount = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 1)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        loopoffset = ((current_block) | 0);
                        break;
                    }
                case 37:
                    {
                        if (((Number(loopcount) > Number(0)) ? 1 : 0)) {
                            current_block = ((loopoffset) | 0);
                            loopcount = ((((loopcount) - (1))) | 0);
                        }
                        else {
                            current_block = ((((current_block) + (1))) | 0);
                        }
                        break;
                    }
                default:
                    {
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 21:
                    {
                        tstates = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 1)))) & 0xffff);
                        pause_time = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 3)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 3)))) | 0);
                        bits_in_last_byte = ((runtime.readIndex(cur_block, 5)) | 0);
                        data_size = (((__l["get_u24le"] ? __l["get_u24le"](runtime.addressOf(cur_block, 6)) : runtime.macro("get_u24le", runtime.addressOf(cur_block, 6)))) >>> 0);
                        size = ((((size) + (method_tzx_handle_direct(runtime, buffer, runtime.addressOf(cur_block, 9), pause_time, data_size, tstates, bits_in_last_byte)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 24:
                    {
                        (__l["printf"] ? __l["printf"]("Unsupported block type (0x15 - CSW Recording) encountered.\n") : runtime.macro("printf", "Unsupported block type (0x15 - CSW Recording) encountered.\n"));
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 25:
                    {
                        data_size = (((__l["get_u32le"] ? __l["get_u32le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u32le", runtime.addressOf(cur_block, 1)))) >>> 0);
                        pause_time = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 5)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 5)))) | 0);
                        let totp = (((__l["get_u32le"] ? __l["get_u32le"](runtime.addressOf(cur_block, 7)) : runtime.macro("get_u32le", runtime.addressOf(cur_block, 7)))) >>> 0);
                        let npp = ((runtime.readIndex(cur_block, 11)) | 0);
                        let asp = ((runtime.readIndex(cur_block, 12)) | 0);
                        if ((((((Number(asp) === Number(0)) ? 1 : 0)) && (((Number(totp) > Number(0)) ? 1 : 0))) ? 1 : 0)) {
                            asp = ((256) | 0);
                        }
                        let totd = (((__l["get_u32le"] ? __l["get_u32le"](runtime.addressOf(cur_block, 13)) : runtime.macro("get_u32le", runtime.addressOf(cur_block, 13)))) >>> 0);
                        let npd = ((runtime.readIndex(cur_block, 17)) | 0);
                        let asd = ((runtime.readIndex(cur_block, 18)) | 0);
                        if ((((((Number(asd) === Number(0)) ? 1 : 0)) && (((Number(totd) > Number(0)) ? 1 : 0))) ? 1 : 0)) {
                            asd = ((256) | 0);
                        }
                        size = ((((size) + (method_tzx_handle_generalized(runtime, buffer, runtime.addressOf(cur_block, 19), pause_time, data_size, totp, npp, asp, totd, npd, asd)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 75:
                    {
                        data_size = ((runtime.subtract((__l["get_u32le"] ? __l["get_u32le"](runtime.addressOf(cur_block, 1)) : runtime.macro("get_u32le", runtime.addressOf(cur_block, 1))), 12)) >>> 0);
                        pause_time = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 5)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 5)))) | 0);
                        pilot = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 7)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 7)))) | 0);
                        pilot_length = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 9)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 9)))) | 0);
                        let zero = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 11)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 11)))) & 0xffff);
                        let one = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cur_block, 13)) : runtime.macro("get_u16le", runtime.addressOf(cur_block, 13)))) & 0xffff);
                        bit0 = ((((runtime.shiftRight(runtime.readIndex(cur_block, 15), 4)) ? (runtime.shiftRight(runtime.readIndex(cur_block, 15), 4)) : (16))) | 0);
                        bit1 = ((((((runtime.readIndex(cur_block, 15)) & (15))) ? (((runtime.readIndex(cur_block, 15)) & (15))) : (16))) | 0);
                        let leading_num = (((__l["util::BIT"] ? __l["util::BIT"](runtime.readIndex(cur_block, 16), 6, 2) : runtime.macro("util::BIT", runtime.readIndex(cur_block, 16), 6, 2))) & 0xff);
                        let leading_bit = (((__l["util::BIT"] ? __l["util::BIT"](runtime.readIndex(cur_block, 16), 5) : runtime.macro("util::BIT", runtime.readIndex(cur_block, 16), 5))) ? 1 : 0);
                        let trailing_num = (((__l["util::BIT"] ? __l["util::BIT"](runtime.readIndex(cur_block, 16), 3, 2) : runtime.macro("util::BIT", runtime.readIndex(cur_block, 16), 3, 2))) & 0xff);
                        let trailing_bit = (((__l["util::BIT"] ? __l["util::BIT"](runtime.readIndex(cur_block, 16), 2) : runtime.macro("util::BIT", runtime.readIndex(cur_block, 16), 2))) ? 1 : 0);
                        let msb = (((__l["util::BIT"] ? __l["util::BIT"](runtime.readIndex(cur_block, 16), 0) : runtime.macro("util::BIT", runtime.readIndex(cur_block, 16), 0))) ? 1 : 0);
                        members.wave_data = ((0) << 16 >> 16);
                        size = ((((size) + (method_tzx_handle_4b(runtime, buffer, runtime.addressOf(cur_block, 17), data_size, pause_time, pilot, pilot_length, zero, one, bit0, bit1, leading_num, leading_bit, trailing_num, trailing_bit, msb)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
            }
        }
        size = ((((size) + (method_pause_one_millisec(runtime, buffer)))) | 0);
        return size;
    }
    function method_tzx_cas_handle_block(runtime, buffer, bytes, pause, data_size, pilot, pilot_length, sync1, sync2, bit0, bit1, bits_in_last_byte) {
        const members = runtime.members;
        let pilot_samples = ((method_tcycles_to_samplecount(runtime, pilot)) | 0);
        let sync1_samples = ((method_tcycles_to_samplecount(runtime, sync1)) | 0);
        let sync2_samples = ((method_tcycles_to_samplecount(runtime, sync2)) | 0);
        let bit0_samples = ((method_tcycles_to_samplecount(runtime, bit0)) | 0);
        let bit1_samples = ((method_tcycles_to_samplecount(runtime, bit1)) | 0);
        let data_index = ((0) | 0);
        let size = ((0) | 0);
        for (; ((Number(pilot_length) > Number(0)) ? 1 : 0); pilot_length = ((((pilot_length) - (1))) | 0)) {
            method_tzx_output_wave(runtime, buffer, pilot_samples);
            size = ((((size) + (pilot_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if (((Number(sync1_samples) > Number(0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync1_samples);
            size = ((((size) + (sync1_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if (((Number(sync2_samples) > Number(0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync2_samples);
            size = ((((size) + (sync2_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        for (data_index = ((0) | 0); ((Number(data_index) < Number(data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let byte = ((runtime.readIndex(bytes, data_index)) & 0xff);
            let bits_to_go = ((((((Number(data_index) === Number(((data_size) - (1)))) ? 1 : 0)) ? (bits_in_last_byte) : (8))) | 0);
            for (; ((Number(bits_to_go) > Number(0)) ? 1 : 0); byte = ((((byte) << (1))) & 0xff), bits_to_go = ((((bits_to_go) - (1))) | 0)) {
                let bit_samples = ((((((byte) & (128))) ? (bit1_samples) : (bit0_samples))) | 0);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
            }
        }
        if (((Number(pause) > Number(0)) ? 1 : 0)) {
            size = ((((size) + (method_pause_one_millisec(runtime, buffer)))) | 0);
            let rest_pause_samples = ((method_millisec_to_samplecount(runtime, ((pause) - (1)))) | 0);
            members.wave_data = ((-23198) << 16 >> 16);
            method_tzx_output_wave(runtime, buffer, rest_pause_samples);
            size = ((((size) + (rest_pause_samples))) | 0);
        }
        return size;
    }
    function method_tcycles_to_samplecount(runtime, tcycles) {
        const members = runtime.members;
        return ((((runtime.add(0.5, ((((44100) / (3500000))) * (tcycles)))) * ((members.t_scale ?? 0)))) | 0);
    }
    function method_tzx_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; ((Number(length) > Number(0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(runtime.dereference(buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, runtime.add(runtime.dereference(buffer), 1));
        }
    }
    function method_toggle_wave_data(runtime) {
        const members = runtime.members;
        if (((Number((members.wave_data ?? 0)) === Number(-23198)) ? 1 : 0)) {
            members.wave_data = ((23198) << 16 >> 16);
        }
        else {
            members.wave_data = ((-23198) << 16 >> 16);
        }
    }
    function method_pause_one_millisec(runtime, buffer) {
        const members = runtime.members;
        let pause_samples = ((method_millisec_to_samplecount(runtime, 1)) | 0);
        method_tzx_output_wave(runtime, buffer, pause_samples);
        return pause_samples;
    }
    function method_millisec_to_samplecount(runtime, millisec) {
        const members = runtime.members;
        return ((((millisec) * (((44100) / (1000))))) | 0);
    }
    function method_ascii_block_common_log(runtime, block_type_string, block_type) {
        const members = runtime.members;
    }
    function method_tzx_handle_direct(runtime, buffer, bytes, pause, data_size, tstates, bits_in_last_byte) {
        const members = runtime.members;
        let size = ((0) | 0);
        let samples = ((method_tcycles_to_samplecount(runtime, tstates)) | 0);
        for (let data_index = ((0) | 0); ((Number(data_index) < Number(data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let byte = ((runtime.readIndex(bytes, data_index)) & 0xff);
            let bits_to_go = ((((((Number(data_index) === Number(((data_size) - (1)))) ? 1 : 0)) ? (bits_in_last_byte) : (8))) | 0);
            for (; ((Number(bits_to_go) > Number(0)) ? 1 : 0); byte = ((((byte) << (1))) & 0xff), bits_to_go = ((((bits_to_go) - (1))) | 0)) {
                if (((byte) & (128))) {
                    members.wave_data = ((23198) << 16 >> 16);
                }
                else {
                    members.wave_data = ((-23198) << 16 >> 16);
                }
                method_tzx_output_wave(runtime, buffer, samples);
                size = ((((size) + (samples))) | 0);
            }
        }
        if (((Number(pause) > Number(0)) ? 1 : 0)) {
            size = ((((size) + (method_pause_one_millisec(runtime, buffer)))) | 0);
            let rest_pause_samples = ((method_millisec_to_samplecount(runtime, ((pause) - (1)))) | 0);
            members.wave_data = ((-23198) << 16 >> 16);
            method_tzx_output_wave(runtime, buffer, rest_pause_samples);
            size = ((((size) + (rest_pause_samples))) | 0);
        }
        return size;
    }
    function method_tzx_handle_generalized(runtime, buffer, bytes, pause, data_size, totp, npp, asp, totd, npd, asd) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let size = ((0) | 0);
        if (((Number(totp) > Number(0)) ? 1 : 0)) {
            let symtable = bytes;
            let table2 = runtime.addressOf(symtable, ((runtime.add(((2) * (npp)), 1)) * (asp)));
            for (let i = ((0) | 0); ((Number(i) < Number(((totp) * (3)))) ? 1 : 0); i = ((((i) + (3))) | 0)) {
                let symbol = ((runtime.readIndex(table2, ((i) + (0)))) & 0xff);
                let repetitions = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(table2, ((i) + (1)))) : runtime.macro("get_u16le", runtime.addressOf(table2, ((i) + (1)))))) & 0xffff);
                for (let j = ((0) | 0); ((Number(j) < Number(repetitions)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    size = ((((size) + (method_tzx_handle_symbol(runtime, buffer, symtable, symbol, npp)))) | 0);
                }
            }
            bytes = runtime.add(bytes, runtime.add(((runtime.add(((2) * (npp)), 1)) * (asp)), ((totp) * (3))));
        }
        if (((Number(totd) > Number(0)) ? 1 : 0)) {
            let symtable = bytes;
            let table2 = runtime.addressOf(bytes, ((runtime.add(((2) * (npd)), 1)) * (asd)));
            let NB = ((Math.ceil(Number((__l["compute_log2"] ? __l["compute_log2"](asd) : runtime.macro("compute_log2", asd))))) | 0);
            let stream_bit = ((0) & 0xff);
            let stream_byte = ((0) >>> 0);
            for (let i = ((0) | 0); ((Number(i) < Number(totd)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let symbol = ((0) & 0xff);
                for (let j = ((0) | 0); ((Number(j) < Number(NB)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    symbol = ((((symbol) | (((method_stream_get_bit(runtime, table2, ({ generatedLValue: true, get: () => stream_bit, set: (value) => { stream_bit = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => stream_byte, set: (value) => { stream_byte = ((value) >>> 0); } }))) << (j))))) & 0xff);
                }
                size = ((((size) + (method_tzx_handle_symbol(runtime, buffer, symtable, symbol, npd)))) | 0);
            }
        }
        if (((Number(pause) > Number(0)) ? 1 : 0)) {
            size = ((((size) + (method_pause_one_millisec(runtime, buffer)))) | 0);
            let rest_pause_samples = ((method_millisec_to_samplecount(runtime, ((pause) - (1)))) | 0);
            members.wave_data = ((-23198) << 16 >> 16);
            method_tzx_output_wave(runtime, buffer, rest_pause_samples);
            size = ((((size) + (rest_pause_samples))) | 0);
        }
        return size;
    }
    function method_tzx_handle_symbol(runtime, buffer, symtable, symbol, maxp) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let size = ((0) | 0);
        let cursymb = runtime.addressOf(symtable, ((runtime.add(((2) * (maxp)), 1)) * (symbol)));
        let starttype = ((runtime.readIndex(cursymb, 0)) & 0xff);
        switch (starttype) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    method_toggle_wave_data(runtime);
                    break;
                }
            case 2:
                {
                    members.wave_data = ((-23198) << 16 >> 16);
                    break;
                }
            case 3:
                {
                    members.wave_data = ((23198) << 16 >> 16);
                    break;
                }
            default:
                {
                    (__l["printf"] ? __l["printf"]("SYMDEF invalid - bad starting polarity") : runtime.macro("printf", "SYMDEF invalid - bad starting polarity"));
                }
        }
        for (let i = ((0) | 0); ((Number(i) < Number(maxp)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let pulse_length = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(cursymb, runtime.add(1, ((i) * (2))))) : runtime.macro("get_u16le", runtime.addressOf(cursymb, runtime.add(1, ((i) * (2))))))) & 0xffff);
            if (((Number(pulse_length) !== Number(0)) ? 1 : 0)) {
                let samples = ((method_tcycles_to_samplecount(runtime, pulse_length)) | 0);
                method_tzx_output_wave(runtime, buffer, samples);
                size = ((((size) + (samples))) | 0);
                method_toggle_wave_data(runtime);
            }
            else {
                break;
            }
        }
        return size;
    }
    function method_stream_get_bit(runtime, bytes, stream_bit, stream_byte) {
        const members = runtime.members;
        let retbit = ((0) & 0xff);
        let byte = ((runtime.readIndex(bytes, stream_byte.get())) & 0xff);
        byte = ((((byte) << (stream_bit.get()))) & 0xff);
        if (((byte) & (128))) {
            retbit = ((1) & 0xff);
        }
        stream_bit.set(((((stream_bit.get()) + (1))) & 0xff));
        if (((Number(stream_bit.get()) === Number(8)) ? 1 : 0)) {
            stream_bit.set(((0) & 0xff));
            stream_byte.set(((((stream_byte.get()) + (1))) >>> 0));
        }
        return retbit;
    }
    function method_tzx_handle_4b(runtime, buffer, bytes, data_size, pause_ms, pilot, pilot_num, zero, one, num_0, num_1, leading_num, leading_bit, trailing_num, trailing_bit, msb) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let pilot_samples = ((method_tcycles_to_samplecount(runtime, pilot)) | 0);
        let bit0_samples = ((method_tcycles_to_samplecount(runtime, zero)) | 0);
        let bit1_samples = ((method_tcycles_to_samplecount(runtime, one)) | 0);
        let size = ((0) | 0);
        for (; ((Number(pilot_num) > Number(0)) ? 1 : 0); pilot_num = ((((pilot_num) - (1))) & 0xffff)) {
            method_tzx_output_wave(runtime, buffer, pilot_samples);
            size = ((((size) + (pilot_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        let data_common = ((0) & 0xffff);
        for (let i = ((leading_num) & 0xff); ((Number(i) > Number(0)) ? 1 : 0); i = ((((i) - (1))) & 0xff)) {
            data_common = ((((data_common) << (1))) & 0xffff);
            data_common = ((((data_common) | (leading_bit))) & 0xffff);
        }
        data_common = ((((data_common) << (8))) & 0xffff);
        for (let i = ((trailing_num) & 0xff); ((Number(i) > Number(0)) ? 1 : 0); i = ((((i) - (1))) & 0xff)) {
            data_common = ((((data_common) << (1))) & 0xffff);
            data_common = ((((data_common) | (trailing_bit))) & 0xffff);
        }
        for (let data_index = ((0) | 0); ((Number(data_index) < Number(data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let data = ((data_common) & 0xffff);
            data = ((((data) | (((((msb) ? (runtime.readIndex(bytes, data_index)) : ((__l["util::BITSWAP"] ? __l["util::BITSWAP"](runtime.readIndex(bytes, data_index), 0, 1, 2, 3, 4, 5, 6, 7) : runtime.macro("util::BITSWAP", runtime.readIndex(bytes, data_index), 0, 1, 2, 3, 4, 5, 6, 7))))) << (trailing_num))))) & 0xffff);
            for (let mask = ((((1) << (((((leading_num) + (7))) + (trailing_num))))) & 0xffff); ((Number(mask) > Number(0)) ? 1 : 0); mask = ((runtime.shiftRight(mask, 1)) & 0xffff)) {
                let bit = ((((data) & (mask))) ? 1 : 0);
                let bit_samples = ((((bit) ? (bit1_samples) : (bit0_samples))) | 0);
                for (let i = ((((bit) ? (num_1) : (num_0))) & 0xff); ((Number(i) > Number(0)) ? 1 : 0); i = ((((i) - (1))) & 0xff)) {
                    method_tzx_output_wave(runtime, buffer, bit_samples);
                    size = ((((size) + (bit_samples))) | 0);
                    method_toggle_wave_data(runtime);
                }
            }
        }
        if (((Number(pause_ms) > Number(0)) ? 1 : 0)) {
            size = ((((size) + (method_pause_one_millisec(runtime, buffer)))) | 0);
            let rest_pause_samples = ((method_millisec_to_samplecount(runtime, ((pause_ms) - (1)))) | 0);
            members.wave_data = ((0) << 16 >> 16);
            method_tzx_output_wave(runtime, buffer, rest_pause_samples);
            size = ((((size) + (rest_pause_samples))) | 0);
        }
        return size;
    }
    function method_tzx_cas_to_wav_size(runtime, casdata, caslen) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_TZX_HEADER = members.TZX_HEADER ?? 0;
        let __goto_cleanup = ((0) | 0);
        while (1) {
            let size = ((0) | 0);
            if (((Number(caslen) < Number(10)) ? 1 : 0)) {
                __goto_cleanup = ((1) | 0);
                break;
            }
            if ((__l["memcmp"] ? __l["memcmp"](casdata, h_TZX_HEADER, 8) : runtime.macro("memcmp", casdata, h_TZX_HEADER, 8))) {
                __goto_cleanup = ((1) | 0);
                break;
            }
            if (((Number(runtime.readIndex(casdata, 8)) > Number(1)) ? 1 : 0)) {
                __goto_cleanup = ((1) | 0);
                break;
            }
            runtime.invoke("tzx_cas_get_blocks", casdata, caslen);
            if (((Number((members.block_count ?? 0)) === Number(0)) ? 1 : 0)) {
                __goto_cleanup = ((1) | 0);
                break;
            }
            size = ((method_tzx_cas_do_work(runtime, 0)) | 0);
            return size;
            break;
        }
        return -1;
    }
    return {
        "tzx_cas_fill_wave": method_tzx_cas_fill_wave,
        "tzx_cas_do_work": method_tzx_cas_do_work,
        "tzx_cas_handle_block": method_tzx_cas_handle_block,
        "tcycles_to_samplecount": method_tcycles_to_samplecount,
        "tzx_output_wave": method_tzx_output_wave,
        "toggle_wave_data": method_toggle_wave_data,
        "pause_one_millisec": method_pause_one_millisec,
        "millisec_to_samplecount": method_millisec_to_samplecount,
        "ascii_block_common_log": method_ascii_block_common_log,
        "tzx_handle_direct": method_tzx_handle_direct,
        "tzx_handle_generalized": method_tzx_handle_generalized,
        "tzx_handle_symbol": method_tzx_handle_symbol,
        "tzx_handle_4b": method_tzx_handle_4b,
        "tzx_cas_to_wav_size": method_tzx_cas_to_wav_size
    };
})();
definition.imageFormats[1].definition.compiledMethodLinks = ["compute_log2", "get_u16le", "get_u24le", "get_u32le", "memcmp", "printf", "util::BIT", "util::BITSWAP"];
definition.imageFormats[2].definition.compiledMethods = (() => {
    function method_tap_cas_fill_wave(runtime, buffer, length, bytes, bytes_length) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let p = buffer;
        let size = ((0) | 0);
        let block = ((0) | 0);
        while (((Number(bytes_length) > Number(2)) ? 1 : 0)) {
            let data_size = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(bytes, 0)) : runtime.macro("get_u16le", runtime.addressOf(bytes, 0)))) | 0);
            bytes = runtime.add(bytes, 2);
            bytes_length = ((((bytes_length) - (2))) | 0);
            if (((Number(bytes_length) < Number(data_size)) ? 1 : 0)) {
                (__l["osd_printf_warning"] ? __l["osd_printf_warning"]("BAD Image: block #%d required %d byte(s), but only %d available\n", block, data_size, bytes_length) : runtime.macro("osd_printf_warning", "BAD Image: block #%d required %d byte(s), but only %d available\n", block, data_size, bytes_length));
                data_size = ((bytes_length) | 0);
            }
            bytes_length = ((((bytes_length) - (data_size))) | 0);
            let pilot_length = ((((((Number(runtime.readIndex(bytes, 0)) === Number(0)) ? 1 : 0)) ? (8063) : (3223))) | 0);
            size = ((((size) + (method_tzx_cas_handle_block(runtime, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => p, set: (value) => { p = value; } }), offset: 0 }), bytes, 1000, data_size, 2168, pilot_length, 667, 735, 855, 1710, 8)))) | 0);
            bytes = runtime.add(bytes, data_size);
            block = ((((block) + (1))) | 0);
        }
        return size;
    }
    function method_tzx_cas_handle_block(runtime, buffer, bytes, pause, data_size, pilot, pilot_length, sync1, sync2, bit0, bit1, bits_in_last_byte) {
        const members = runtime.members;
        let pilot_samples = ((method_tcycles_to_samplecount(runtime, pilot)) | 0);
        let sync1_samples = ((method_tcycles_to_samplecount(runtime, sync1)) | 0);
        let sync2_samples = ((method_tcycles_to_samplecount(runtime, sync2)) | 0);
        let bit0_samples = ((method_tcycles_to_samplecount(runtime, bit0)) | 0);
        let bit1_samples = ((method_tcycles_to_samplecount(runtime, bit1)) | 0);
        let data_index = ((0) | 0);
        let size = ((0) | 0);
        for (; ((Number(pilot_length) > Number(0)) ? 1 : 0); pilot_length = ((((pilot_length) - (1))) | 0)) {
            method_tzx_output_wave(runtime, buffer, pilot_samples);
            size = ((((size) + (pilot_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if (((Number(sync1_samples) > Number(0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync1_samples);
            size = ((((size) + (sync1_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if (((Number(sync2_samples) > Number(0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync2_samples);
            size = ((((size) + (sync2_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        for (data_index = ((0) | 0); ((Number(data_index) < Number(data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let byte = ((runtime.readIndex(bytes, data_index)) & 0xff);
            let bits_to_go = ((((((Number(data_index) === Number(((data_size) - (1)))) ? 1 : 0)) ? (bits_in_last_byte) : (8))) | 0);
            for (; ((Number(bits_to_go) > Number(0)) ? 1 : 0); byte = ((((byte) << (1))) & 0xff), bits_to_go = ((((bits_to_go) - (1))) | 0)) {
                let bit_samples = ((((((byte) & (128))) ? (bit1_samples) : (bit0_samples))) | 0);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
            }
        }
        if (((Number(pause) > Number(0)) ? 1 : 0)) {
            size = ((((size) + (method_pause_one_millisec(runtime, buffer)))) | 0);
            let rest_pause_samples = ((method_millisec_to_samplecount(runtime, ((pause) - (1)))) | 0);
            members.wave_data = ((-23198) << 16 >> 16);
            method_tzx_output_wave(runtime, buffer, rest_pause_samples);
            size = ((((size) + (rest_pause_samples))) | 0);
        }
        return size;
    }
    function method_tcycles_to_samplecount(runtime, tcycles) {
        const members = runtime.members;
        const h_t_scale = members.t_scale ?? 0;
        return ((((runtime.add(0.5, ((((44100) / (3500000))) * (tcycles)))) * (h_t_scale))) | 0);
    }
    function method_tzx_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; ((Number(length) > Number(0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(runtime.dereference(buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, runtime.add(runtime.dereference(buffer), 1));
        }
    }
    function method_toggle_wave_data(runtime) {
        const members = runtime.members;
        if (((Number((members.wave_data ?? 0)) === Number(-23198)) ? 1 : 0)) {
            members.wave_data = ((23198) << 16 >> 16);
        }
        else {
            members.wave_data = ((-23198) << 16 >> 16);
        }
    }
    function method_pause_one_millisec(runtime, buffer) {
        const members = runtime.members;
        let pause_samples = ((method_millisec_to_samplecount(runtime, 1)) | 0);
        method_tzx_output_wave(runtime, buffer, pause_samples);
        return pause_samples;
    }
    function method_millisec_to_samplecount(runtime, millisec) {
        const members = runtime.members;
        return ((((millisec) * (((44100) / (1000))))) | 0);
    }
    function method_tap_cas_to_wav_size(runtime, casdata, caslen) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let size = ((0) | 0);
        let p = casdata;
        while (((Number(caslen) > Number(2)) ? 1 : 0)) {
            let data_size = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(p, 0)) : runtime.macro("get_u16le", runtime.addressOf(p, 0)))) | 0);
            p = runtime.add(p, 2);
            caslen = ((((caslen) - (2))) | 0);
            if (((Number(caslen) < Number(data_size)) ? 1 : 0)) {
                data_size = ((caslen) | 0);
            }
            caslen = ((((caslen) - (data_size))) | 0);
            let pilot_length = ((((((Number(runtime.readIndex(p, 0)) === Number(0)) ? 1 : 0)) ? (8063) : (3223))) | 0);
            size = ((((size) + (method_tzx_cas_handle_block(runtime, 0, p, 1000, data_size, 2168, pilot_length, 667, 735, 855, 1710, 8)))) | 0);
            let checksum = ((runtime.readIndex(p, ((data_size) - (1)))) & 0xff);
            let check = ((0) & 0xff);
            for (let i = ((0) | 0); ((Number(i) < Number(((data_size) - (1)))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                check = ((((check) ^ (runtime.readIndex(p, i)))) & 0xff);
            }
            if (((Number(check) !== Number(checksum)) ? 1 : 0)) {
                (__l["osd_printf_warning"] ? __l["osd_printf_warning"]("tap_cas_to_wav_size: wrong checksum 0x%X\n", check) : runtime.macro("osd_printf_warning", "tap_cas_to_wav_size: wrong checksum 0x%X\n", check));
            }
            p = runtime.add(p, data_size);
        }
        return size;
    }
    return {
        "tap_cas_fill_wave": method_tap_cas_fill_wave,
        "tzx_cas_handle_block": method_tzx_cas_handle_block,
        "tcycles_to_samplecount": method_tcycles_to_samplecount,
        "tzx_output_wave": method_tzx_output_wave,
        "toggle_wave_data": method_toggle_wave_data,
        "pause_one_millisec": method_pause_one_millisec,
        "millisec_to_samplecount": method_millisec_to_samplecount,
        "tap_cas_to_wav_size": method_tap_cas_to_wav_size
    };
})();
definition.imageFormats[2].definition.compiledMethodLinks = ["get_u16le", "osd_printf_warning"];
definition.imageFormats[3].definition.compiledMethods = (() => {
    function method_tap_cas_fill_wave(runtime, buffer, length, bytes, bytes_length) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let p = buffer;
        let size = ((0) | 0);
        let block = ((0) | 0);
        while (((Number(bytes_length) > Number(2)) ? 1 : 0)) {
            let data_size = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(bytes, 0)) : runtime.macro("get_u16le", runtime.addressOf(bytes, 0)))) | 0);
            bytes = runtime.add(bytes, 2);
            bytes_length = ((((bytes_length) - (2))) | 0);
            if (((Number(bytes_length) < Number(data_size)) ? 1 : 0)) {
                (__l["osd_printf_warning"] ? __l["osd_printf_warning"]("BAD Image: block #%d required %d byte(s), but only %d available\n", block, data_size, bytes_length) : runtime.macro("osd_printf_warning", "BAD Image: block #%d required %d byte(s), but only %d available\n", block, data_size, bytes_length));
                data_size = ((bytes_length) | 0);
            }
            bytes_length = ((((bytes_length) - (data_size))) | 0);
            let pilot_length = ((((((Number(runtime.readIndex(bytes, 0)) === Number(0)) ? 1 : 0)) ? (8063) : (3223))) | 0);
            size = ((((size) + (method_tzx_cas_handle_block(runtime, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => p, set: (value) => { p = value; } }), offset: 0 }), bytes, 1000, data_size, 2168, pilot_length, 667, 735, 855, 1710, 8)))) | 0);
            bytes = runtime.add(bytes, data_size);
            block = ((((block) + (1))) | 0);
        }
        return size;
    }
    function method_tzx_cas_handle_block(runtime, buffer, bytes, pause, data_size, pilot, pilot_length, sync1, sync2, bit0, bit1, bits_in_last_byte) {
        const members = runtime.members;
        let pilot_samples = ((method_tcycles_to_samplecount(runtime, pilot)) | 0);
        let sync1_samples = ((method_tcycles_to_samplecount(runtime, sync1)) | 0);
        let sync2_samples = ((method_tcycles_to_samplecount(runtime, sync2)) | 0);
        let bit0_samples = ((method_tcycles_to_samplecount(runtime, bit0)) | 0);
        let bit1_samples = ((method_tcycles_to_samplecount(runtime, bit1)) | 0);
        let data_index = ((0) | 0);
        let size = ((0) | 0);
        for (; ((Number(pilot_length) > Number(0)) ? 1 : 0); pilot_length = ((((pilot_length) - (1))) | 0)) {
            method_tzx_output_wave(runtime, buffer, pilot_samples);
            size = ((((size) + (pilot_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if (((Number(sync1_samples) > Number(0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync1_samples);
            size = ((((size) + (sync1_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if (((Number(sync2_samples) > Number(0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync2_samples);
            size = ((((size) + (sync2_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        for (data_index = ((0) | 0); ((Number(data_index) < Number(data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let byte = ((runtime.readIndex(bytes, data_index)) & 0xff);
            let bits_to_go = ((((((Number(data_index) === Number(((data_size) - (1)))) ? 1 : 0)) ? (bits_in_last_byte) : (8))) | 0);
            for (; ((Number(bits_to_go) > Number(0)) ? 1 : 0); byte = ((((byte) << (1))) & 0xff), bits_to_go = ((((bits_to_go) - (1))) | 0)) {
                let bit_samples = ((((((byte) & (128))) ? (bit1_samples) : (bit0_samples))) | 0);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
            }
        }
        if (((Number(pause) > Number(0)) ? 1 : 0)) {
            size = ((((size) + (method_pause_one_millisec(runtime, buffer)))) | 0);
            let rest_pause_samples = ((method_millisec_to_samplecount(runtime, ((pause) - (1)))) | 0);
            members.wave_data = ((-23198) << 16 >> 16);
            method_tzx_output_wave(runtime, buffer, rest_pause_samples);
            size = ((((size) + (rest_pause_samples))) | 0);
        }
        return size;
    }
    function method_tcycles_to_samplecount(runtime, tcycles) {
        const members = runtime.members;
        const h_t_scale = members.t_scale ?? 0;
        return ((((runtime.add(0.5, ((((44100) / (3500000))) * (tcycles)))) * (h_t_scale))) | 0);
    }
    function method_tzx_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; ((Number(length) > Number(0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(runtime.dereference(buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, runtime.add(runtime.dereference(buffer), 1));
        }
    }
    function method_toggle_wave_data(runtime) {
        const members = runtime.members;
        if (((Number((members.wave_data ?? 0)) === Number(-23198)) ? 1 : 0)) {
            members.wave_data = ((23198) << 16 >> 16);
        }
        else {
            members.wave_data = ((-23198) << 16 >> 16);
        }
    }
    function method_pause_one_millisec(runtime, buffer) {
        const members = runtime.members;
        let pause_samples = ((method_millisec_to_samplecount(runtime, 1)) | 0);
        method_tzx_output_wave(runtime, buffer, pause_samples);
        return pause_samples;
    }
    function method_millisec_to_samplecount(runtime, millisec) {
        const members = runtime.members;
        return ((((millisec) * (((44100) / (1000))))) | 0);
    }
    function method_tap_cas_to_wav_size(runtime, casdata, caslen) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let size = ((0) | 0);
        let p = casdata;
        while (((Number(caslen) > Number(2)) ? 1 : 0)) {
            let data_size = (((__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf(p, 0)) : runtime.macro("get_u16le", runtime.addressOf(p, 0)))) | 0);
            p = runtime.add(p, 2);
            caslen = ((((caslen) - (2))) | 0);
            if (((Number(caslen) < Number(data_size)) ? 1 : 0)) {
                data_size = ((caslen) | 0);
            }
            caslen = ((((caslen) - (data_size))) | 0);
            let pilot_length = ((((((Number(runtime.readIndex(p, 0)) === Number(0)) ? 1 : 0)) ? (8063) : (3223))) | 0);
            size = ((((size) + (method_tzx_cas_handle_block(runtime, 0, p, 1000, data_size, 2168, pilot_length, 667, 735, 855, 1710, 8)))) | 0);
            let checksum = ((runtime.readIndex(p, ((data_size) - (1)))) & 0xff);
            let check = ((0) & 0xff);
            for (let i = ((0) | 0); ((Number(i) < Number(((data_size) - (1)))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                check = ((((check) ^ (runtime.readIndex(p, i)))) & 0xff);
            }
            if (((Number(check) !== Number(checksum)) ? 1 : 0)) {
                (__l["osd_printf_warning"] ? __l["osd_printf_warning"]("tap_cas_to_wav_size: wrong checksum 0x%X\n", check) : runtime.macro("osd_printf_warning", "tap_cas_to_wav_size: wrong checksum 0x%X\n", check));
            }
            p = runtime.add(p, data_size);
        }
        return size;
    }
    return {
        "tap_cas_fill_wave": method_tap_cas_fill_wave,
        "tzx_cas_handle_block": method_tzx_cas_handle_block,
        "tcycles_to_samplecount": method_tcycles_to_samplecount,
        "tzx_output_wave": method_tzx_output_wave,
        "toggle_wave_data": method_toggle_wave_data,
        "pause_one_millisec": method_pause_one_millisec,
        "millisec_to_samplecount": method_millisec_to_samplecount,
        "tap_cas_to_wav_size": method_tap_cas_to_wav_size
    };
})();
definition.imageFormats[3].definition.compiledMethodLinks = ["get_u16le", "osd_printf_warning"];
export const device = definition;
export default device;
