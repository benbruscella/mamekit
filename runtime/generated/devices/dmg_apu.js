import deviceData from './dmg_apu.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_sound_r(runtime, offset) {
        const members = runtime.members;
        const h_m_snd_control = members.m_snd_control ?? runtime.member("m_snd_control");
        const h_m_snd = members.m_snd ?? runtime.member("m_snd");
        if ((((((Number(offset) >= Number(32)) ? 1 : 0)) && (((Number(offset) <= Number(47)) ? 1 : 0))) ? 1 : 0)) {
            return method_wave_r(runtime, ((offset) - (32)));
        }
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
        if (h_m_snd_control.on) {
            if (((Number(offset) === Number(22)) ? 1 : 0)) {
                return ((((((((((((runtime.readIndex((members.m_snd_regs ?? runtime.member("m_snd_regs")), 22)) & (240))) | (((runtime.readIndex(h_m_snd, 0).on) ? (1) : (0))))) | (((runtime.readIndex(h_m_snd, 1).on) ? (2) : (0))))) | (((runtime.readIndex(h_m_snd, 2).on) ? (4) : (0))))) | (((runtime.readIndex(h_m_snd, 3).on) ? (8) : (0))))) | (112));
            }
            return ((runtime.readIndex((members.m_snd_regs ?? runtime.member("m_snd_regs")), offset)) | (([128, 63, 0, 255, 191, 255, 63, 0, 255, 191, 127, 255, 159, 255, 191, 255, 255, 0, 0, 191, 0, 0, 112, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][(((((offset) & (63))) % 64) + 64) % 64] ?? 0)));
        }
        else {
            return ([128, 63, 0, 255, 191, 255, 63, 0, 255, 191, 127, 255, 159, 255, 191, 255, 255, 0, 0, 191, 0, 0, 112, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0][(((((offset) & (63))) % 64) + 64) % 64] ?? 0);
        }
    }
    function method_wave_r(runtime, offset) {
        const members = runtime.members;
        const h_m_snd = members.m_snd ?? runtime.member("m_snd");
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
        if (runtime.readIndex(h_m_snd, 2).on) {
            return ((runtime.readIndex(h_m_snd, 2).sample_reading) ? (runtime.readIndex(runtime.readIndex((members.m_wave_ram ?? runtime.member("m_wave_ram")), 0), runtime.divide(runtime.readIndex(h_m_snd, 2).offset, 2))) : (255));
        }
        return runtime.readIndex(runtime.readIndex((members.m_wave_ram ?? runtime.member("m_wave_ram")), 0), offset);
    }
    function method_update_state(runtime) {
        const members = runtime.members;
        const h_m_snd_control = members.m_snd_control ?? runtime.member("m_snd_control");
        const h_m_snd = members.m_snd ?? runtime.member("m_snd");
        let now = (runtime.calls["machine().time"]?.() ?? 0);
        if (((Number(now) <= Number((members.m_last_updated ?? runtime.member("m_last_updated")))) ? 1 : 0)) {
            return;
        }
        if (h_m_snd_control.on) {
            let cycles = (runtime.calls["attotime_to_clocks"] ? runtime.calls["attotime_to_clocks"](((now) - ((members.m_last_updated ?? runtime.member("m_last_updated"))))) : runtime.macro("attotime_to_clocks", ((now) - ((members.m_last_updated ?? runtime.member("m_last_updated"))))));
            let old_cycles = h_m_snd_control.cycles;
            h_m_snd_control.cycles = ((((h_m_snd_control.cycles) + (cycles))) >>> 0);
            if (((Number(runtime.divide(old_cycles, 8192)) !== Number(runtime.divide(h_m_snd_control.cycles, 8192))) ? 1 : 0)) {
                let cycles_current_frame = ((8192) - (((old_cycles) & (((8192) - (1))))));
                method_update_square_channel(runtime, runtime.readIndex(h_m_snd, 0), cycles_current_frame);
                method_update_square_channel(runtime, runtime.readIndex(h_m_snd, 1), cycles_current_frame);
                method_update_wave_channel(runtime, runtime.readIndex(h_m_snd, 2), cycles_current_frame);
                method_update_noise_channel(runtime, runtime.readIndex(h_m_snd, 3), cycles_current_frame);
                cycles = ((cycles) - (cycles_current_frame));
                switch (((runtime.divide(h_m_snd_control.cycles, 8192)) & (7))) {
                    case 0:
                        {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 0));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 1));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 2));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 3));
                            break;
                        }
                    case 2:
                        {
                            method_tick_sweep(runtime, runtime.readIndex(h_m_snd, 0));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 0));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 1));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 2));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 3));
                            break;
                        }
                    case 4:
                        {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 0));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 1));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 2));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 3));
                            break;
                        }
                    case 6:
                        {
                            method_tick_sweep(runtime, runtime.readIndex(h_m_snd, 0));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 0));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 1));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 2));
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 3));
                            break;
                        }
                    case 7:
                        {
                            method_tick_envelope(runtime, runtime.readIndex(h_m_snd, 0));
                            method_tick_envelope(runtime, runtime.readIndex(h_m_snd, 1));
                            method_tick_envelope(runtime, runtime.readIndex(h_m_snd, 3));
                            break;
                        }
                }
            }
            method_update_square_channel(runtime, runtime.readIndex(h_m_snd, 0), cycles);
            method_update_square_channel(runtime, runtime.readIndex(h_m_snd, 1), cycles);
            method_update_wave_channel(runtime, runtime.readIndex(h_m_snd, 2), cycles);
            method_update_noise_channel(runtime, runtime.readIndex(h_m_snd, 3), cycles);
        }
        members.m_last_updated = now;
    }
    function method_update_square_channel(runtime, snd, cycles) {
        const members = runtime.members;
        if (snd.on) {
            snd.cycles_left = ((((snd.cycles_left) + (cycles))) | 0);
            if (((Number(snd.cycles_left) <= Number(0)) ? 1 : 0)) {
                return;
            }
            cycles = ((snd.cycles_left) >>> (2));
            snd.cycles_left = ((runtime.andAssign(snd.cycles_left, 3)) | 0);
            let distance = ((((2048) - (snd.frequency_counter))) & 0xffff);
            if (((Number(cycles) >= Number(distance)) ? 1 : 0)) {
                cycles = ((cycles) - (distance));
                distance = ((((2048) - (snd.frequency))) & 0xffff);
                let counter = runtime.add(1, runtime.divide(cycles, distance));
                snd.duty_count = ((((((snd.duty_count) + (counter))) & (7))) >>> 0);
                snd.signal = (((((([128, 129, 225, 126][(((snd.duty) % 4) + 4) % 4] ?? 0)) >>> (snd.duty_count)) & 1)) << 24 >> 24);
                snd.frequency_counter = ((((snd.frequency) + (((cycles) % (distance))))) & 0xffff);
            }
            else {
                snd.frequency_counter = ((((snd.frequency_counter) + (cycles))) & 0xffff);
            }
        }
    }
    function method_update_wave_channel(runtime, snd, cycles) {
        const members = runtime.members;
        if (snd.on) {
            snd.cycles_left = ((((snd.cycles_left) + (cycles))) | 0);
            let level = ((((snd.level) & (3))) & 0xff);
            while (((Number(snd.cycles_left) >= Number(2)) ? 1 : 0)) {
                snd.cycles_left = ((((snd.cycles_left) - (2))) | 0);
                snd.frequency_counter = ((((((snd.frequency_counter) + (1))) & (2047))) & 0xffff);
                snd.sample_reading = ((0) & 0xff);
                if (((Number(snd.frequency_counter) === Number(2047)) ? 1 : 0)) {
                    snd.offset = ((((((snd.offset) + (1))) & (31))) & 0xff);
                }
                if (((Number(snd.frequency_counter) === Number(0)) ? 1 : 0)) {
                    snd.sample_reading = ((1) & 0xff);
                    snd.current_sample = ((runtime.readIndex(runtime.readIndex((members.m_wave_ram ?? runtime.member("m_wave_ram")), 0), runtime.divide(snd.offset, 2))) << 24 >> 24);
                    if (((((snd.offset) & (1))) ? 0 : 1)) {
                        snd.current_sample = ((((snd.current_sample) >>> (4))) << 24 >> 24);
                    }
                    snd.current_sample = ((runtime.andAssign(snd.current_sample, 15)) << 24 >> 24);
                    snd.frequency_counter = ((snd.frequency) & 0xffff);
                }
            }
            snd.signal = ((((level) ? (((snd.current_sample) >>> (((level) - (1))))) : (0))) << 24 >> 24);
        }
    }
    function method_update_noise_channel(runtime, snd, cycles) {
        const members = runtime.members;
        snd.cycles_left = ((((snd.cycles_left) + (cycles))) | 0);
        let period = method_noise_period_cycles(runtime);
        while (((Number(snd.cycles_left) >= Number(period)) ? 1 : 0)) {
            snd.cycles_left = ((((snd.cycles_left) - (period))) | 0);
            let feedback = ((((((((snd.noise_lfsr) >>> (1))) ^ (snd.noise_lfsr))) & (1))) & 0xffff);
            snd.noise_lfsr = ((((((snd.noise_lfsr) >>> (1))) | (((feedback) << (14))))) & 0xffff);
            if (snd.noise_short) {
                snd.noise_lfsr = ((((((snd.noise_lfsr) & ((~((1) << (6)))))) | (((feedback) << (6))))) & 0xffff);
            }
            snd.signal = ((((((~snd.noise_lfsr)) >>> (0)) & 1)) << 24 >> 24);
        }
    }
    function method_noise_period_cycles(runtime) {
        const members = runtime.members;
        const h_m_snd = members.m_snd ?? runtime.member("m_snd");
        return ((([8, 16, 32, 48, 64, 80, 96, 112][(((((runtime.readIndex(h_m_snd, 3).reg[3]) & (7))) % 8) + 8) % 8] ?? 0)) << (((runtime.readIndex(h_m_snd, 3).reg[3]) >>> (4))));
    }
    function method_tick_length(runtime, snd) {
        const members = runtime.members;
        if (snd.length_enabled) {
            snd.length = ((((((snd.length) + (1))) & (snd.length_mask))) & 0xff);
            if (((Number(snd.length) === Number(0)) ? 1 : 0)) {
                snd.on = ((0) & 0xff);
                snd.length_counting = ((0) & 0xff);
            }
        }
    }
    function method_tick_sweep(runtime, snd) {
        const members = runtime.members;
        snd.sweep_count = ((((((snd.sweep_count) - (1))) & (7))) & 0xff);
        if (((Number(snd.sweep_count) === Number(0)) ? 1 : 0)) {
            snd.sweep_count = ((snd.sweep_time) & 0xff);
            if ((((snd.sweep_enabled) && (((Number(snd.sweep_time) > Number(0)) ? 1 : 0))) ? 1 : 0)) {
                method_apply_next_sweep(runtime, snd);
                method_calculate_next_sweep(runtime, snd);
            }
        }
    }
    function method_apply_next_sweep(runtime, snd) {
        const members = runtime.members;
        let new_frequency = ((method_calculate_next_sweep(runtime, snd)) | 0);
        if ((((snd.on) && (((Number(snd.sweep_shift) > Number(0)) ? 1 : 0))) ? 1 : 0)) {
            snd.frequency = ((new_frequency) & 0xffff);
            snd.frequency_shadow = ((snd.frequency) & 0xffff);
            snd.reg[3] = ((snd.frequency) & (255));
            snd.reg[4] = ((((snd.reg[4]) & ((~7)))) | (((((snd.frequency) >>> (8))) & (7))));
        }
    }
    function method_calculate_next_sweep(runtime, snd) {
        const members = runtime.members;
        snd.sweep_neg_mode_used = ((((Number(snd.sweep_direction) < Number(0)) ? 1 : 0)) & 0xff);
        let new_frequency = ((((snd.frequency_shadow) + (((snd.sweep_direction) * (((snd.frequency_shadow) >>> (snd.sweep_shift))))))) | 0);
        if (((Number(new_frequency) > Number(2047)) ? 1 : 0)) {
            snd.on = ((0) & 0xff);
        }
        return new_frequency;
    }
    function method_tick_envelope(runtime, snd) {
        const members = runtime.members;
        if (snd.envelope_enabled) {
            snd.envelope_count = ((((((snd.envelope_count) - (1))) & (7))) & 0xff);
            if (((Number(snd.envelope_count) === Number(0)) ? 1 : 0)) {
                snd.envelope_count = ((snd.envelope_time) & 0xff);
                if (snd.envelope_count) {
                    let new_envelope_value = ((((snd.envelope_value) + (snd.envelope_direction))) << 24 >> 24);
                    if ((((((Number(new_envelope_value) >= Number(0)) ? 1 : 0)) && (((Number(new_envelope_value) <= Number(15)) ? 1 : 0))) ? 1 : 0)) {
                        snd.envelope_value = ((new_envelope_value) << 24 >> 24);
                    }
                    else {
                        snd.envelope_enabled = ((0) & 0xff);
                    }
                }
            }
        }
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const h_m_snd = members.m_snd ?? runtime.member("m_snd");
        const h_m_snd_control = members.m_snd_control ?? runtime.member("m_snd_control");
        for (let sampindex = 0; ((Number(sampindex) < Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((sampindex) + (1))) {
            let sample = ((0) | 0);
            let left = ((0) | 0);
            let right = ((0) | 0);
            if (runtime.readIndex(h_m_snd, 0).on) {
                sample = ((method_convert_output(runtime, ((runtime.readIndex(h_m_snd, 0).signal) * (runtime.readIndex(h_m_snd, 0).envelope_value)))) | 0);
                if (h_m_snd_control.chan_left[0]) {
                    left = ((((left) + (sample))) | 0);
                }
                if (h_m_snd_control.chan_right[0]) {
                    right = ((((right) + (sample))) | 0);
                }
            }
            if (runtime.readIndex(h_m_snd, 1).on) {
                sample = ((method_convert_output(runtime, ((runtime.readIndex(h_m_snd, 1).signal) * (runtime.readIndex(h_m_snd, 1).envelope_value)))) | 0);
                if (h_m_snd_control.chan_left[1]) {
                    left = ((((left) + (sample))) | 0);
                }
                if (h_m_snd_control.chan_right[1]) {
                    right = ((((right) + (sample))) | 0);
                }
            }
            if (runtime.readIndex(h_m_snd, 2).on) {
                sample = ((method_convert_output(runtime, runtime.readIndex(h_m_snd, 2).signal)) | 0);
                if (h_m_snd_control.chan_left[2]) {
                    left = ((((left) + (sample))) | 0);
                }
                if (h_m_snd_control.chan_right[2]) {
                    right = ((((right) + (sample))) | 0);
                }
            }
            if (runtime.readIndex(h_m_snd, 3).on) {
                sample = ((method_convert_output(runtime, ((runtime.readIndex(h_m_snd, 3).signal) * (runtime.readIndex(h_m_snd, 3).envelope_value)))) | 0);
                if (h_m_snd_control.chan_left[3]) {
                    left = ((((left) + (sample))) | 0);
                }
                if (h_m_snd_control.chan_right[3]) {
                    right = ((((right) + (sample))) | 0);
                }
            }
            left = ((((left) * (((1) + (h_m_snd_control.vol_left))))) | 0);
            right = ((((right) * (((1) + (h_m_snd_control.vol_right))))) | 0);
            ((runtime.dereference(stream)).put_int?.(0, sampindex, left, ((((15) * (4))) * (runtime.add(1, 7)))) ?? 0);
            ((runtime.dereference(stream)).put_int?.(1, sampindex, right, ((((15) * (4))) * (runtime.add(1, 7)))) ?? 0);
        }
    }
    function method_convert_output(runtime, sample) {
        const members = runtime.members;
        return ((15) - (((sample) * (2))));
    }
    function method_timer_callback(runtime, param) {
        const members = runtime.members;
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
    }
    function method_wave_w(runtime, offset, data) {
        const members = runtime.members;
        const h_m_snd = members.m_snd ?? runtime.member("m_snd");
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
        if (runtime.readIndex(h_m_snd, 2).on) {
            if (runtime.readIndex(h_m_snd, 2).sample_reading) {
                runtime.writeIndex(runtime.readIndex((members.m_wave_ram ?? runtime.member("m_wave_ram")), 0), runtime.divide(runtime.readIndex(h_m_snd, 2).offset, 2), data);
            }
        }
        else {
            runtime.writeIndex(runtime.readIndex((members.m_wave_ram ?? runtime.member("m_wave_ram")), 0), offset, data);
        }
    }
    function method_sound_w(runtime, offset, data) {
        const members = runtime.members;
        const h_m_snd_control = members.m_snd_control ?? runtime.member("m_snd_control");
        (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
        if ((((((((((((((((((h_m_snd_control.on) ? 0 : 1)) && (((Number(offset) !== Number(22)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) !== Number(1)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) !== Number(6)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) !== Number(11)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) !== Number(16)) ? 1 : 0))) ? 1 : 0)) {
            return;
        }
        method_sound_w_internal(runtime, offset, data);
    }
    function method_sound_w_internal(runtime, offset, data) {
        const members = runtime.members;
        const h_m_snd_control = members.m_snd_control ?? runtime.member("m_snd_control");
        const h_m_snd = members.m_snd ?? runtime.member("m_snd");
        let old_data = ((runtime.readIndex((members.m_snd_regs ?? runtime.member("m_snd_regs")), offset)) & 0xff);
        if (h_m_snd_control.on) {
            runtime.writeIndex(runtime.writableMember("m_snd_regs"), offset, data);
        }
        switch (offset) {
            case 0:
                {
                    runtime.readIndex(h_m_snd, 0).reg[0] = data;
                    runtime.readIndex(h_m_snd, 0).sweep_shift = ((((data) & (7))) & 0xff);
                    runtime.readIndex(h_m_snd, 0).sweep_direction = (((((((data) >>> (3)) & 1)) ? ((-1)) : (1))) | 0);
                    runtime.readIndex(h_m_snd, 0).sweep_time = ((((((data) & (112))) >>> (4))) & 0xff);
                    if ((((((((((old_data) >>> (3)) & 1)) && (((((~data)) >>> (3)) & 1))) ? 1 : 0)) && (runtime.readIndex(h_m_snd, 0).sweep_neg_mode_used)) ? 1 : 0)) {
                        runtime.readIndex(h_m_snd, 0).on = ((0) & 0xff);
                    }
                    break;
                }
            case 1:
                {
                    runtime.readIndex(h_m_snd, 0).reg[1] = data;
                    if (h_m_snd_control.on) {
                        runtime.readIndex(h_m_snd, 0).duty = ((((((data) & (192))) >>> (6))) << 24 >> 24);
                    }
                    runtime.readIndex(h_m_snd, 0).length = ((((data) & (63))) & 0xff);
                    runtime.readIndex(h_m_snd, 0).length_counting = ((1) & 0xff);
                    break;
                }
            case 2:
                {
                    runtime.readIndex(h_m_snd, 0).reg[2] = data;
                    runtime.readIndex(h_m_snd, 0).envelope_value = ((((data) >>> (4))) << 24 >> 24);
                    runtime.readIndex(h_m_snd, 0).envelope_direction = (((((((data) >>> (3)) & 1)) ? (1) : ((-1)))) << 24 >> 24);
                    runtime.readIndex(h_m_snd, 0).envelope_time = ((((data) & (7))) & 0xff);
                    if (((method_dac_enabled(runtime, runtime.readIndex(h_m_snd, 0))) ? 0 : 1)) {
                        runtime.readIndex(h_m_snd, 0).on = ((0) & 0xff);
                    }
                    break;
                }
            case 3:
                {
                    runtime.readIndex(h_m_snd, 0).reg[3] = data;
                    if (((runtime.readIndex(h_m_snd, 0).sweep_enabled) ? 0 : 1)) {
                        runtime.readIndex(h_m_snd, 0).frequency = ((((((((runtime.readIndex(h_m_snd, 0).reg[4]) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 0).reg[3]))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    runtime.readIndex(h_m_snd, 0).reg[4] = data;
                    let length_was_enabled = ((runtime.readIndex(h_m_snd, 0).length_enabled) ? 1 : 0);
                    runtime.readIndex(h_m_snd, 0).length_enabled = (((((data) >>> (6)) & 1)) & 0xff);
                    runtime.readIndex(h_m_snd, 0).frequency = ((((((((runtime.readIndex((members.m_snd_regs ?? runtime.member("m_snd_regs")), 4)) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 0).reg[3]))) & 0xffff);
                    if (((((((((length_was_enabled) ? 0 : 1)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) && (runtime.readIndex(h_m_snd, 0).length_counting)) ? 1 : 0)) {
                        if (runtime.readIndex(h_m_snd, 0).length_enabled) {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 0));
                        }
                    }
                    if ((((data) >>> (7)) & 1)) {
                        runtime.readIndex(h_m_snd, 0).on = ((1) & 0xff);
                        runtime.readIndex(h_m_snd, 0).envelope_enabled = ((1) & 0xff);
                        runtime.readIndex(h_m_snd, 0).envelope_value = ((((runtime.readIndex(h_m_snd, 0).reg[2]) >>> (4))) << 24 >> 24);
                        runtime.readIndex(h_m_snd, 0).envelope_count = ((runtime.readIndex(h_m_snd, 0).envelope_time) & 0xff);
                        runtime.readIndex(h_m_snd, 0).sweep_count = ((runtime.readIndex(h_m_snd, 0).sweep_time) & 0xff);
                        runtime.readIndex(h_m_snd, 0).sweep_neg_mode_used = ((0) & 0xff);
                        runtime.readIndex(h_m_snd, 0).signal = ((0) << 24 >> 24);
                        runtime.readIndex(h_m_snd, 0).length_counting = ((1) & 0xff);
                        runtime.readIndex(h_m_snd, 0).frequency = ((((((((runtime.readIndex(h_m_snd, 0).reg[4]) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 0).reg[3]))) & 0xffff);
                        runtime.readIndex(h_m_snd, 0).frequency_counter = ((runtime.readIndex(h_m_snd, 0).frequency) & 0xffff);
                        runtime.readIndex(h_m_snd, 0).frequency_shadow = ((runtime.readIndex(h_m_snd, 0).frequency) & 0xffff);
                        runtime.readIndex(h_m_snd, 0).cycles_left = ((0) | 0);
                        runtime.readIndex(h_m_snd, 0).duty_count = ((0) >>> 0);
                        runtime.readIndex(h_m_snd, 0).sweep_enabled = (((((((Number(runtime.readIndex(h_m_snd, 0).sweep_shift) !== Number(0)) ? 1 : 0)) || (((Number(runtime.readIndex(h_m_snd, 0).sweep_time) !== Number(0)) ? 1 : 0))) ? 1 : 0)) & 0xff);
                        if (((method_dac_enabled(runtime, runtime.readIndex(h_m_snd, 0))) ? 0 : 1)) {
                            runtime.readIndex(h_m_snd, 0).on = ((0) & 0xff);
                        }
                        if (((Number(runtime.readIndex(h_m_snd, 0).sweep_shift) > Number(0)) ? 1 : 0)) {
                            method_calculate_next_sweep(runtime, runtime.readIndex(h_m_snd, 0));
                        }
                        if (((((((((Number(runtime.readIndex(h_m_snd, 0).length) === Number(0)) ? 1 : 0)) && (runtime.readIndex(h_m_snd, 0).length_enabled)) ? 1 : 0)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 0));
                        }
                    }
                    else {
                        if (((runtime.readIndex(h_m_snd, 0).sweep_enabled) ? 0 : 1)) {
                            runtime.readIndex(h_m_snd, 0).frequency = ((((((((runtime.readIndex(h_m_snd, 0).reg[4]) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 0).reg[3]))) & 0xffff);
                        }
                    }
                    break;
                }
            case 6:
                {
                    runtime.readIndex(h_m_snd, 1).reg[1] = data;
                    if (h_m_snd_control.on) {
                        runtime.readIndex(h_m_snd, 1).duty = ((((((data) & (192))) >>> (6))) << 24 >> 24);
                    }
                    runtime.readIndex(h_m_snd, 1).length = ((((data) & (63))) & 0xff);
                    runtime.readIndex(h_m_snd, 1).length_counting = ((1) & 0xff);
                    break;
                }
            case 7:
                {
                    runtime.readIndex(h_m_snd, 1).reg[2] = data;
                    runtime.readIndex(h_m_snd, 1).envelope_value = ((((data) >>> (4))) << 24 >> 24);
                    runtime.readIndex(h_m_snd, 1).envelope_direction = (((((((data) >>> (3)) & 1)) ? (1) : ((-1)))) << 24 >> 24);
                    runtime.readIndex(h_m_snd, 1).envelope_time = ((((data) & (7))) & 0xff);
                    if (((method_dac_enabled(runtime, runtime.readIndex(h_m_snd, 1))) ? 0 : 1)) {
                        runtime.readIndex(h_m_snd, 1).on = ((0) & 0xff);
                    }
                    break;
                }
            case 8:
                {
                    runtime.readIndex(h_m_snd, 1).reg[3] = data;
                    runtime.readIndex(h_m_snd, 1).frequency = ((((((((runtime.readIndex(h_m_snd, 1).reg[4]) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 1).reg[3]))) & 0xffff);
                    break;
                }
            case 9:
                {
                    runtime.readIndex(h_m_snd, 1).reg[4] = data;
                    let length_was_enabled = ((runtime.readIndex(h_m_snd, 1).length_enabled) ? 1 : 0);
                    runtime.readIndex(h_m_snd, 1).length_enabled = (((((data) >>> (6)) & 1)) & 0xff);
                    if (((((((((length_was_enabled) ? 0 : 1)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) && (runtime.readIndex(h_m_snd, 1).length_counting)) ? 1 : 0)) {
                        if (runtime.readIndex(h_m_snd, 1).length_enabled) {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 1));
                        }
                    }
                    if ((((data) >>> (7)) & 1)) {
                        runtime.readIndex(h_m_snd, 1).on = ((1) & 0xff);
                        runtime.readIndex(h_m_snd, 1).envelope_enabled = ((1) & 0xff);
                        runtime.readIndex(h_m_snd, 1).envelope_value = ((((runtime.readIndex(h_m_snd, 1).reg[2]) >>> (4))) << 24 >> 24);
                        runtime.readIndex(h_m_snd, 1).envelope_count = ((runtime.readIndex(h_m_snd, 1).envelope_time) & 0xff);
                        runtime.readIndex(h_m_snd, 1).frequency = ((((((((runtime.readIndex(h_m_snd, 1).reg[4]) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 1).reg[3]))) & 0xffff);
                        runtime.readIndex(h_m_snd, 1).frequency_counter = ((runtime.readIndex(h_m_snd, 1).frequency) & 0xffff);
                        runtime.readIndex(h_m_snd, 1).cycles_left = ((0) | 0);
                        runtime.readIndex(h_m_snd, 1).duty_count = ((0) >>> 0);
                        runtime.readIndex(h_m_snd, 1).signal = ((0) << 24 >> 24);
                        runtime.readIndex(h_m_snd, 1).length_counting = ((1) & 0xff);
                        if (((method_dac_enabled(runtime, runtime.readIndex(h_m_snd, 1))) ? 0 : 1)) {
                            runtime.readIndex(h_m_snd, 1).on = ((0) & 0xff);
                        }
                        if (((((((((Number(runtime.readIndex(h_m_snd, 1).length) === Number(0)) ? 1 : 0)) && (runtime.readIndex(h_m_snd, 1).length_enabled)) ? 1 : 0)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 1));
                        }
                    }
                    else {
                        runtime.readIndex(h_m_snd, 1).frequency = ((((((((runtime.readIndex(h_m_snd, 1).reg[4]) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 1).reg[3]))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    runtime.readIndex(h_m_snd, 2).reg[0] = data;
                    runtime.readIndex(h_m_snd, 2).size = (((((data) >>> (5)) & 1)) & 0xff);
                    runtime.readIndex(h_m_snd, 2).bank = (((((data) >>> (6)) & 1)) & 0xff);
                    if (((method_dac_enabled(runtime, runtime.readIndex(h_m_snd, 2))) ? 0 : 1)) {
                        runtime.readIndex(h_m_snd, 2).on = ((0) & 0xff);
                    }
                    break;
                }
            case 11:
                {
                    runtime.readIndex(h_m_snd, 2).reg[1] = data;
                    runtime.readIndex(h_m_snd, 2).length = ((data) & 0xff);
                    runtime.readIndex(h_m_snd, 2).length_counting = ((1) & 0xff);
                    break;
                }
            case 12:
                {
                    runtime.readIndex(h_m_snd, 2).reg[2] = data;
                    runtime.readIndex(h_m_snd, 2).level = ((((((data) & (224))) >>> (5))) & 0xff);
                    break;
                }
            case 13:
                {
                    runtime.readIndex(h_m_snd, 2).reg[3] = data;
                    runtime.readIndex(h_m_snd, 2).frequency = ((((((((runtime.readIndex(h_m_snd, 2).reg[4]) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 2).reg[3]))) & 0xffff);
                    break;
                }
            case 14:
                {
                    runtime.readIndex(h_m_snd, 2).reg[4] = data;
                    let length_was_enabled = ((runtime.readIndex(h_m_snd, 2).length_enabled) ? 1 : 0);
                    runtime.readIndex(h_m_snd, 2).length_enabled = (((((data) >>> (6)) & 1)) & 0xff);
                    if (((((((((length_was_enabled) ? 0 : 1)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) && (runtime.readIndex(h_m_snd, 2).length_counting)) ? 1 : 0)) {
                        if (runtime.readIndex(h_m_snd, 2).length_enabled) {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 2));
                        }
                    }
                    if ((((data) >>> (7)) & 1)) {
                        if ((((runtime.readIndex(h_m_snd, 2).on) && (((Number(runtime.readIndex(h_m_snd, 2).frequency_counter) === Number(2047)) ? 1 : 0))) ? 1 : 0)) {
                            method_corrupt_wave_ram(runtime);
                        }
                        runtime.readIndex(h_m_snd, 2).on = ((1) & 0xff);
                        runtime.readIndex(h_m_snd, 2).offset = ((0) & 0xff);
                        runtime.readIndex(h_m_snd, 2).duty = ((1) << 24 >> 24);
                        runtime.readIndex(h_m_snd, 2).duty_count = ((0) >>> 0);
                        runtime.readIndex(h_m_snd, 2).length_counting = ((1) & 0xff);
                        runtime.readIndex(h_m_snd, 2).frequency = ((((((((runtime.readIndex(h_m_snd, 2).reg[4]) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 2).reg[3]))) & 0xffff);
                        runtime.readIndex(h_m_snd, 2).frequency_counter = ((runtime.readIndex(h_m_snd, 2).frequency) & 0xffff);
                        runtime.readIndex(h_m_snd, 2).cycles_left = (((-6)) | 0);
                        runtime.readIndex(h_m_snd, 2).current_sample = ((0) << 24 >> 24);
                        runtime.readIndex(h_m_snd, 2).sample_reading = ((0) & 0xff);
                        if (((method_dac_enabled(runtime, runtime.readIndex(h_m_snd, 2))) ? 0 : 1)) {
                            runtime.readIndex(h_m_snd, 2).on = ((0) & 0xff);
                        }
                        if (((((((((Number(runtime.readIndex(h_m_snd, 2).length) === Number(0)) ? 1 : 0)) && (runtime.readIndex(h_m_snd, 2).length_enabled)) ? 1 : 0)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 2));
                        }
                    }
                    else {
                        runtime.readIndex(h_m_snd, 2).frequency = ((((((((runtime.readIndex(h_m_snd, 2).reg[4]) & (7))) << (8))) | (runtime.readIndex(h_m_snd, 2).reg[3]))) & 0xffff);
                    }
                    break;
                }
            case 16:
                {
                    runtime.readIndex(h_m_snd, 3).reg[1] = data;
                    runtime.readIndex(h_m_snd, 3).length = ((((data) & (63))) & 0xff);
                    runtime.readIndex(h_m_snd, 3).length_counting = ((1) & 0xff);
                    break;
                }
            case 17:
                {
                    runtime.readIndex(h_m_snd, 3).reg[2] = data;
                    runtime.readIndex(h_m_snd, 3).envelope_value = ((((data) >>> (4))) << 24 >> 24);
                    runtime.readIndex(h_m_snd, 3).envelope_direction = (((((((data) >>> (3)) & 1)) ? (1) : ((-1)))) << 24 >> 24);
                    runtime.readIndex(h_m_snd, 3).envelope_time = ((((data) & (7))) & 0xff);
                    if (((method_dac_enabled(runtime, runtime.readIndex(h_m_snd, 3))) ? 0 : 1)) {
                        runtime.readIndex(h_m_snd, 3).on = ((0) & 0xff);
                    }
                    break;
                }
            case 18:
                {
                    runtime.readIndex(h_m_snd, 3).reg[3] = data;
                    runtime.readIndex(h_m_snd, 3).noise_short = (((((data) >>> (3)) & 1)) & 0xff);
                    break;
                }
            case 19:
                {
                    runtime.readIndex(h_m_snd, 3).reg[4] = data;
                    let length_was_enabled = ((runtime.readIndex(h_m_snd, 3).length_enabled) ? 1 : 0);
                    runtime.readIndex(h_m_snd, 3).length_enabled = (((((data) >>> (6)) & 1)) & 0xff);
                    if (((((((((length_was_enabled) ? 0 : 1)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) && (runtime.readIndex(h_m_snd, 3).length_counting)) ? 1 : 0)) {
                        if (runtime.readIndex(h_m_snd, 3).length_enabled) {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 3));
                        }
                    }
                    if ((((data) >>> (7)) & 1)) {
                        runtime.readIndex(h_m_snd, 3).on = ((1) & 0xff);
                        runtime.readIndex(h_m_snd, 3).envelope_enabled = ((1) & 0xff);
                        runtime.readIndex(h_m_snd, 3).envelope_value = ((((runtime.readIndex(h_m_snd, 3).reg[2]) >>> (4))) << 24 >> 24);
                        runtime.readIndex(h_m_snd, 3).envelope_count = ((runtime.readIndex(h_m_snd, 3).envelope_time) & 0xff);
                        runtime.readIndex(h_m_snd, 3).frequency_counter = ((0) & 0xffff);
                        runtime.readIndex(h_m_snd, 3).cycles_left = ((method_noise_period_cycles(runtime)) | 0);
                        runtime.readIndex(h_m_snd, 3).signal = ((0) << 24 >> 24);
                        runtime.readIndex(h_m_snd, 3).noise_lfsr = ((32767) & 0xffff);
                        runtime.readIndex(h_m_snd, 3).length_counting = ((1) & 0xff);
                        if (((method_dac_enabled(runtime, runtime.readIndex(h_m_snd, 3))) ? 0 : 1)) {
                            runtime.readIndex(h_m_snd, 3).on = ((0) & 0xff);
                        }
                        if (((((((((Number(runtime.readIndex(h_m_snd, 3).length) === Number(0)) ? 1 : 0)) && (runtime.readIndex(h_m_snd, 3).length_enabled)) ? 1 : 0)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) {
                            method_tick_length(runtime, runtime.readIndex(h_m_snd, 3));
                        }
                    }
                    break;
                }
            case 20:
                {
                    h_m_snd_control.vol_left = ((((data) & (7))) & 0xff);
                    h_m_snd_control.vol_right = ((((((data) & (112))) >>> (4))) & 0xff);
                    break;
                }
            case 21:
                {
                    h_m_snd_control.chan_right[0] = (((data) >>> (0)) & 1);
                    h_m_snd_control.chan_left[0] = (((data) >>> (4)) & 1);
                    h_m_snd_control.chan_right[1] = (((data) >>> (1)) & 1);
                    h_m_snd_control.chan_left[1] = (((data) >>> (5)) & 1);
                    h_m_snd_control.chan_right[2] = (((data) >>> (2)) & 1);
                    h_m_snd_control.chan_left[2] = (((data) >>> (6)) & 1);
                    h_m_snd_control.chan_right[3] = (((data) >>> (3)) & 1);
                    h_m_snd_control.chan_left[3] = (((data) >>> (7)) & 1);
                    break;
                }
            case 22:
                {
                    if (((((~data)) >>> (7)) & 1)) {
                        method_apu_power_off(runtime);
                    }
                    else {
                        if (((h_m_snd_control.on) ? 0 : 1)) {
                            h_m_snd_control.cycles = ((((h_m_snd_control.cycles) | (((7) * (8192))))) >>> 0);
                        }
                    }
                    h_m_snd_control.on = (((((data) >>> (7)) & 1)) & 0xff);
                    runtime.writeIndex(runtime.writableMember("m_snd_regs"), 22, ((data) & (128)));
                    break;
                }
            case 32:
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
                {
                    method_wave_w(runtime, ((offset) - (32)), data);
                    break;
                }
        }
    }
    function method_dac_enabled(runtime, snd) {
        const members = runtime.members;
        return ((((Number(snd.channel) !== Number(3)) ? 1 : 0)) ? (((snd.reg[2]) & (248))) : (((snd.reg[0]) & (128))));
    }
    function method_corrupt_wave_ram(runtime) {
        const members = runtime.members;
        const h_m_snd = members.m_snd ?? runtime.member("m_snd");
        if (((Number(runtime.readIndex(h_m_snd, 2).offset) < Number(4)) ? 1 : 0)) {
            runtime.writeIndex(runtime.readIndex((members.m_wave_ram ?? runtime.member("m_wave_ram")), 0), 0, runtime.readIndex(runtime.readIndex((members.m_wave_ram ?? runtime.member("m_wave_ram")), 0), runtime.divide(runtime.readIndex(h_m_snd, 2).offset, 2)));
        }
        else {
            for (let i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
                runtime.writeIndex(runtime.readIndex((members.m_wave_ram ?? runtime.member("m_wave_ram")), 0), i, runtime.readIndex(runtime.readIndex((members.m_wave_ram ?? runtime.member("m_wave_ram")), 0), ((((runtime.divide(runtime.readIndex(h_m_snd, 2).offset, 2)) & ((~3)))) + (i))));
            }
        }
    }
    function method_apu_power_off(runtime) {
        const members = runtime.members;
        const h_m_snd = members.m_snd ?? runtime.member("m_snd");
        const h_m_snd_control = members.m_snd_control ?? runtime.member("m_snd_control");
        method_sound_w_internal(runtime, 0, 0);
        runtime.readIndex(h_m_snd, 0).duty = ((0) << 24 >> 24);
        runtime.writeIndex(runtime.writableMember("m_snd_regs"), 1, 0);
        method_sound_w_internal(runtime, 2, 0);
        method_sound_w_internal(runtime, 3, 0);
        method_sound_w_internal(runtime, 4, 0);
        runtime.readIndex(h_m_snd, 0).frequency_shadow = ((0) & 0xffff);
        runtime.readIndex(h_m_snd, 0).length_counting = ((0) & 0xff);
        runtime.readIndex(h_m_snd, 0).sweep_neg_mode_used = ((0) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_snd_regs"), 6, 0);
        method_sound_w_internal(runtime, 7, 0);
        method_sound_w_internal(runtime, 8, 0);
        method_sound_w_internal(runtime, 9, 0);
        runtime.readIndex(h_m_snd, 1).length_counting = ((0) & 0xff);
        method_sound_w_internal(runtime, 10, 0);
        method_sound_w_internal(runtime, 12, 0);
        method_sound_w_internal(runtime, 13, 0);
        method_sound_w_internal(runtime, 14, 0);
        runtime.readIndex(h_m_snd, 2).length_counting = ((0) & 0xff);
        runtime.readIndex(h_m_snd, 2).current_sample = ((0) << 24 >> 24);
        runtime.writeIndex(runtime.writableMember("m_snd_regs"), 16, 0);
        method_sound_w_internal(runtime, 17, 0);
        method_sound_w_internal(runtime, 18, 0);
        method_sound_w_internal(runtime, 19, 0);
        runtime.readIndex(h_m_snd, 3).length_counting = ((0) & 0xff);
        runtime.readIndex(h_m_snd, 3).cycles_left = ((method_noise_period_cycles(runtime)) | 0);
        runtime.readIndex(h_m_snd, 0).on = ((0) & 0xff);
        runtime.readIndex(h_m_snd, 1).on = ((0) & 0xff);
        runtime.readIndex(h_m_snd, 2).on = ((0) & 0xff);
        runtime.readIndex(h_m_snd, 3).on = ((0) & 0xff);
        h_m_snd_control.wave_ram_locked = ((0) & 0xff);
        for (let i = runtime.add(19, 1); ((Number(i) < Number(22)) ? 1 : 0); i = ((i) + (1))) {
            method_sound_w_internal(runtime, i, 0);
        }
    }
    return {
        "sound_r": method_sound_r,
        "wave_r": method_wave_r,
        "update_state": method_update_state,
        "update_square_channel": method_update_square_channel,
        "update_wave_channel": method_update_wave_channel,
        "update_noise_channel": method_update_noise_channel,
        "noise_period_cycles": method_noise_period_cycles,
        "tick_length": method_tick_length,
        "tick_sweep": method_tick_sweep,
        "apply_next_sweep": method_apply_next_sweep,
        "calculate_next_sweep": method_calculate_next_sweep,
        "tick_envelope": method_tick_envelope,
        "sound_stream_update": method_sound_stream_update,
        "convert_output": method_convert_output,
        "timer_callback": method_timer_callback,
        "wave_w": method_wave_w,
        "sound_w": method_sound_w,
        "sound_w_internal": method_sound_w_internal,
        "dac_enabled": method_dac_enabled,
        "corrupt_wave_ram": method_corrupt_wave_ram,
        "apu_power_off": method_apu_power_off
    };
})();
export const device = definition;
export default device;
