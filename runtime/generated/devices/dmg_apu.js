import deviceData from './dmg_apu.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    const cppMin = (a, b) => (b < a ? b : a);
    const cppMax = (a, b) => (a < b ? b : a);
    // An aggregate initializer's struct, marked as one (execute.ts's
    // isGeneratedStruct) through its prototype: like generatedStruct's
    // non-enumerable marker, field walks and spreads never see it, and a
    // literal with a prototype costs nothing next to defineProperty.
    const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
    // CALL_METHOD through a table of method names: each entry's emitted method,
    // resolved once and again only if that entry's name changes (see the
    // CALL_METHOD emission). The last table is held, as a core keeps one until
    // its mode changes.
    const cppDispatch = new WeakMap();
    let cppLastTable, cppLastEntry;
    const cppMethodAt = (table, index) => {
        if (!Array.isArray(table))
            return undefined;
        let entry = table === cppLastTable ? cppLastEntry : undefined;
        if (!entry) {
            entry = cppDispatch.get(table);
            if (!entry)
                cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
            cppLastTable = table;
            cppLastEntry = entry;
        }
        const name = table[index];
        if (entry.names[index] === name && name !== undefined)
            return entry.methods[index];
        entry.names[index] = name;
        return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
    };
    // execute.ts's clearGeneratedStruct, field names read once per struct.
    const cppUnionElements = Symbol.for('mamekit.unionElements');
    const cppStructKeys = new WeakMap();
    const cppClearStruct = (target, value) => {
        let keys = cppStructKeys.get(target);
        if (!keys)
            cppStructKeys.set(target, keys = Object.keys(target));
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const field = target[key];
            if (ArrayBuffer.isView(field) || Array.isArray(field))
                field.fill(value);
            else if (field && typeof field === 'object')
                cppClearStruct(field, value);
            else
                target[key] = value;
        }
    };
    // memset: typed memory fills in place; a plain array of numbers is set
    // element by element (as the interpreter's fillGeneratedMemory writes it,
    // count elements from 0); an array holding structs, or a pointer into a
    // plain array, goes to the interpreter's rule, which clears each struct.
    const cppMemset = (runtime, target, value, count) => {
        const bytes = Number(count);
        if (Array.isArray(target)) {
            for (let index = 0; index < bytes; index++) {
                const element = target[index];
                if (element !== null && typeof element === 'object') {
                    // A struct element is cleared field by field (cppClearStruct);
                    // anything else array-like takes the interpreter's rule.
                    if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
                        return runtime.macro("memset", target, value, bytes);
                    }
                    cppClearStruct(element, value);
                    continue;
                }
                target[index] = value;
            }
            return target;
        }
        if (Array.isArray(target?.source))
            return runtime.macro("memset", target, value, bytes);
        if (target?.generatedPointer) {
            const width = target.source.BYTES_PER_ELEMENT ?? 1;
            target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
            return target;
        }
        target.fill(value, 0, bytes);
        return target;
    };
    // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
    // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
    // execute.ts's wide operators answer them (a shift of 64 or more is 0).
    const cppLo64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
    const cppHi64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
    const cppShl64Lo = (lo, hi, s) => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
    const cppShl64Hi = (lo, hi, s) => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
    const cppShr64Lo = (lo, hi, s) => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
    const cppShr64Hi = (lo, hi, s) => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
    const cppStringText = (value) => typeof value === 'string' ? value
        : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
            : value === undefined || value === null ? '' : String(value);
    const __mame_table_0 = [8, 16, 32, 48, 64, 80, 96, 112];
    const __mame_table_1 = [128, 63, 0, 255, 191, 255, 63, 0, 255, 191, 127, 255, 159, 255, 191, 255, 255, 0, 0, 191, 0, 0, 112, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const __mame_table_2 = [128, 129, 225, 126];
    function method_tick_length(runtime, snd) {
        const members = runtime.members;
        if (snd.length_enabled) {
            snd.length = ((((((snd.length) + (1))) & (snd.length_mask))) & 0xff);
            if ((((snd.length) === (0)) ? 1 : 0)) {
                snd.on = ((0) ? 1 : 0);
                snd.length_counting = ((0) ? 1 : 0);
            }
        }
    }
    function method_tick_envelope(runtime, snd) {
        const members = runtime.members;
        if (snd.envelope_enabled) {
            snd.envelope_count = ((((((snd.envelope_count) - (1))) & (7))) & 0xff);
            if ((((snd.envelope_count) === (0)) ? 1 : 0)) {
                snd.envelope_count = ((snd.envelope_time) & 0xff);
                if (snd.envelope_count) {
                    let new_envelope_value = ((((snd.envelope_value) + (snd.envelope_direction))) << 24 >> 24);
                    if (((((((new_envelope_value) >= (0)) ? 1 : 0)) && ((((new_envelope_value) <= (15)) ? 1 : 0))) ? 1 : 0)) {
                        snd.envelope_value = ((new_envelope_value) << 24 >> 24);
                    }
                    else {
                        snd.envelope_enabled = ((0) ? 1 : 0);
                    }
                }
            }
        }
    }
    function method_dac_enabled(runtime, snd) {
        const members = runtime.members;
        return (((((snd.channel) !== (3)) ? 1 : 0)) ? (((snd.reg[2]) & (248))) : (((snd.reg[0]) & (128))));
    }
    function method_noise_period_cycles(runtime) {
        const members = runtime.members;
        const h_m_snd = members.m_snd ?? 0;
        return (((__mame_table_0[(((((h_m_snd[3].reg[3]) & (7))) % 8) + 8) % 8] ?? 0)) << (((h_m_snd[3].reg[3]) >>> (4))));
    }
    function method_sound_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        const h_m_snd_control = members.m_snd_control ?? 0;
        const h_m_snd_regs = members.m_snd_regs ?? 0;
        const h_m_snd = members.m_snd ?? 0;
        if ((((((Number(offset) >= Number(32)) ? 1 : 0)) && (((Number(offset) <= Number(47)) ? 1 : 0))) ? 1 : 0)) {
            return ((method_wave_r(runtime, ((offset) - (32)))) & 0xff);
        }
        (__t0 = __deref_sound_r(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
        if (h_m_snd_control.on) {
            if (((Number(offset) === Number(22)) ? 1 : 0)) {
                return ((((((((((((((h_m_snd_regs[22]) & (240))) | (((h_m_snd[0].on) ? (1) : (0))))) | (((h_m_snd[1].on) ? (2) : (0))))) | (((h_m_snd[2].on) ? (4) : (0))))) | (((h_m_snd[3].on) ? (8) : (0))))) | (112))) & 0xff);
            }
            return ((((h_m_snd_regs[offset]) | ((__mame_table_1[(((((offset) & (63))) % 64) + 64) % 64] ?? 0)))) & 0xff);
        }
        else {
            return (((__mame_table_1[(((((offset) & (63))) % 64) + 64) % 64] ?? 0)) & 0xff);
        }
    }
    function __deref_sound_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_wave_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        const h_m_snd = members.m_snd ?? 0;
        const h_m_wave_ram = members.m_wave_ram ?? 0;
        (__t0 = __deref_wave_r(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
        if (h_m_snd[2].on) {
            return ((((h_m_snd[2].sample_reading) ? (runtime.readIndex(h_m_wave_ram[0], runtime.divide(h_m_snd[2].offset, 2))) : (255))) & 0xff);
        }
        return ((runtime.readIndex(h_m_wave_ram[0], offset)) & 0xff);
    }
    function __deref_wave_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_update_state(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["attotime_to_clocks"];
        const h_m_snd_control = members.m_snd_control ?? 0;
        const h_m_snd = members.m_snd ?? 0;
        let now = ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
        if (((Number(now) <= Number((members.m_last_updated ?? 0))) ? 1 : 0)) {
            return;
        }
        if (h_m_snd_control.on) {
            let cycles = (__L2 ? __L2(((now) - ((members.m_last_updated ?? 0)))) : runtime.macro("attotime_to_clocks", ((now) - ((members.m_last_updated ?? 0)))));
            let old_cycles = h_m_snd_control.cycles;
            h_m_snd_control.cycles = ((h_m_snd_control.cycles) + (cycles));
            if (((Number(runtime.wide("/", old_cycles, 8192)) !== Number(runtime.divide(h_m_snd_control.cycles, 8192))) ? 1 : 0)) {
                let cycles_current_frame = runtime.wide("-", 8192, runtime.wide("&", old_cycles, 8191));
                method_update_square_channel(runtime, h_m_snd[0], cycles_current_frame);
                method_update_square_channel(runtime, h_m_snd[1], cycles_current_frame);
                method_update_wave_channel(runtime, h_m_snd[2], cycles_current_frame);
                method_update_noise_channel(runtime, h_m_snd[3], cycles_current_frame);
                cycles = runtime.wide("-", cycles, cycles_current_frame);
                switch (((runtime.divide(h_m_snd_control.cycles, 8192)) & (7))) {
                    case 0:
                        {
                            method_tick_length(runtime, h_m_snd[0]);
                            method_tick_length(runtime, h_m_snd[1]);
                            method_tick_length(runtime, h_m_snd[2]);
                            method_tick_length(runtime, h_m_snd[3]);
                            break;
                        }
                    case 2:
                        {
                            method_tick_sweep(runtime, h_m_snd[0]);
                            method_tick_length(runtime, h_m_snd[0]);
                            method_tick_length(runtime, h_m_snd[1]);
                            method_tick_length(runtime, h_m_snd[2]);
                            method_tick_length(runtime, h_m_snd[3]);
                            break;
                        }
                    case 4:
                        {
                            method_tick_length(runtime, h_m_snd[0]);
                            method_tick_length(runtime, h_m_snd[1]);
                            method_tick_length(runtime, h_m_snd[2]);
                            method_tick_length(runtime, h_m_snd[3]);
                            break;
                        }
                    case 6:
                        {
                            method_tick_sweep(runtime, h_m_snd[0]);
                            method_tick_length(runtime, h_m_snd[0]);
                            method_tick_length(runtime, h_m_snd[1]);
                            method_tick_length(runtime, h_m_snd[2]);
                            method_tick_length(runtime, h_m_snd[3]);
                            break;
                        }
                    case 7:
                        {
                            method_tick_envelope(runtime, h_m_snd[0]);
                            method_tick_envelope(runtime, h_m_snd[1]);
                            method_tick_envelope(runtime, h_m_snd[3]);
                            break;
                        }
                }
            }
            method_update_square_channel(runtime, h_m_snd[0], cycles);
            method_update_square_channel(runtime, h_m_snd[1], cycles);
            method_update_wave_channel(runtime, h_m_snd[2], cycles);
            method_update_noise_channel(runtime, h_m_snd[3], cycles);
        }
        members.m_last_updated = now;
    }
    function method_update_square_channel(runtime, snd, cycles) {
        const members = runtime.members;
        if (snd.on) {
            snd.cycles_left = ((snd.cycles_left) + (cycles));
            if (((Number(snd.cycles_left) <= Number(0)) ? 1 : 0)) {
                return;
            }
            cycles = runtime.shiftRight(snd.cycles_left, 2);
            snd.cycles_left = runtime.andAssign(snd.cycles_left, 3);
            let distance = ((((2048) - (snd.frequency_counter))) & 0xffff);
            if (runtime.wide(">=", cycles, ((distance) & 0xffff))) {
                cycles = runtime.wide("-", cycles, distance);
                distance = ((((2048) - (snd.frequency))) & 0xffff);
                let counter = runtime.wide("+", 1, runtime.wide("/", cycles, ((distance) & 0xffff)));
                snd.duty_count = ((runtime.low32(runtime.wide("&", runtime.wide("+", snd.duty_count, counter), 7))) >>> 0);
                snd.signal = ((((((__mame_table_2[((snd.duty) & 3)] ?? 0)) >>> (snd.duty_count)) & 1)) << 24 >> 24);
                snd.frequency_counter = ((runtime.low32(runtime.wide("+", snd.frequency, runtime.wide("%", cycles, ((distance) & 0xffff))))) & 0xffff);
            }
            else {
                snd.frequency_counter = ((((snd.frequency_counter) + (cycles))) & 0xffff);
            }
        }
    }
    function method_update_wave_channel(runtime, snd, cycles) {
        const members = runtime.members;
        const h_m_wave_ram = members.m_wave_ram ?? 0;
        if (snd.on) {
            snd.cycles_left = ((snd.cycles_left) + (cycles));
            let level = ((((snd.level) & (3))) & 0xff);
            while (((Number(snd.cycles_left) >= Number(2)) ? 1 : 0)) {
                snd.cycles_left = ((snd.cycles_left) - (2));
                snd.frequency_counter = ((((((snd.frequency_counter) + (1))) & (2047))) & 0xffff);
                snd.sample_reading = ((0) ? 1 : 0);
                if ((((snd.frequency_counter) === (2047)) ? 1 : 0)) {
                    snd.offset = ((((((snd.offset) + (1))) & (31))) & 0xff);
                }
                if ((((snd.frequency_counter) === (0)) ? 1 : 0)) {
                    snd.sample_reading = ((1) ? 1 : 0);
                    snd.current_sample = ((runtime.readIndex(h_m_wave_ram[0], runtime.divide(snd.offset, 2))) << 24 >> 24);
                    if (((((snd.offset) & (1))) ? 0 : 1)) {
                        snd.current_sample = ((((snd.current_sample) >> (4))) << 24 >> 24);
                    }
                    snd.current_sample = ((((snd.current_sample) & (15))) << 24 >> 24);
                    snd.frequency_counter = ((snd.frequency) & 0xffff);
                }
            }
            snd.signal = ((((level) ? (runtime.shiftRight(snd.current_sample, ((level) - (1)))) : (0))) << 24 >> 24);
        }
    }
    function method_update_noise_channel(runtime, snd, cycles) {
        const members = runtime.members;
        snd.cycles_left = ((snd.cycles_left) + (cycles));
        let period = method_noise_period_cycles(runtime);
        while (runtime.wide(">=", snd.cycles_left, period)) {
            snd.cycles_left = ((snd.cycles_left) - (period));
            let feedback = ((((((((snd.noise_lfsr) >>> (1))) ^ (snd.noise_lfsr))) & (1))) & 0xffff);
            snd.noise_lfsr = ((((((snd.noise_lfsr) >>> (1))) | (((feedback) << (14))))) & 0xffff);
            if (snd.noise_short) {
                snd.noise_lfsr = ((((((snd.noise_lfsr) & (-65))) | (((feedback) << (6))))) & 0xffff);
            }
            snd.signal = ((((((~snd.noise_lfsr)) >>> (0)) & 1)) << 24 >> 24);
        }
    }
    function method_tick_sweep(runtime, snd) {
        const members = runtime.members;
        snd.sweep_count = ((((((snd.sweep_count) - (1))) & (7))) & 0xff);
        if ((((snd.sweep_count) === (0)) ? 1 : 0)) {
            snd.sweep_count = ((snd.sweep_time) & 0xff);
            if ((((snd.sweep_enabled) && ((((snd.sweep_time) > (0)) ? 1 : 0))) ? 1 : 0)) {
                method_apply_next_sweep(runtime, snd);
                method_calculate_next_sweep(runtime, snd);
            }
        }
    }
    function method_apply_next_sweep(runtime, snd) {
        const members = runtime.members;
        let new_frequency = ((method_calculate_next_sweep(runtime, snd)) | 0);
        if ((((snd.on) && ((((snd.sweep_shift) > (0)) ? 1 : 0))) ? 1 : 0)) {
            snd.frequency = ((new_frequency) & 0xffff);
            snd.frequency_shadow = ((snd.frequency) & 0xffff);
            snd.reg[3] = ((snd.frequency) & (255));
            snd.reg[4] = ((((snd.reg[4]) & (-8))) | (((((snd.frequency) >>> (8))) & (7))));
        }
    }
    function method_calculate_next_sweep(runtime, snd) {
        const members = runtime.members;
        snd.sweep_neg_mode_used = (((((snd.sweep_direction) < (0)) ? 1 : 0)) ? 1 : 0);
        let new_frequency = ((((snd.frequency_shadow) + (((snd.sweep_direction) * (((snd.frequency_shadow) >>> (snd.sweep_shift))))))) | 0);
        if ((((new_frequency) > (2047)) ? 1 : 0)) {
            snd.on = ((0) ? 1 : 0);
        }
        return ((new_frequency) | 0);
    }
    function method_sound_w_internal(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_snd_regs = members.m_snd_regs ?? 0;
        const h_m_snd_control = members.m_snd_control ?? 0;
        const h_m_snd = members.m_snd ?? 0;
        let old_data = ((h_m_snd_regs[offset]) & 0xff);
        if (h_m_snd_control.on) {
            h_m_snd_regs[offset] = data;
        }
        switch (offset) {
            case 0:
                {
                    h_m_snd[0].reg[0] = data;
                    h_m_snd[0].sweep_shift = ((((data) & (7))) & 0xff);
                    h_m_snd[0].sweep_direction = (((((((data) >>> (3)) & 1)) ? (-1) : (1))) | 0);
                    h_m_snd[0].sweep_time = ((runtime.shiftRight(((data) & (112)), 4)) & 0xff);
                    if ((((((((((old_data) >>> (3)) & 1)) && (((((~data)) >>> (3)) & 1))) ? 1 : 0)) && (h_m_snd[0].sweep_neg_mode_used)) ? 1 : 0)) {
                        h_m_snd[0].on = ((0) ? 1 : 0);
                    }
                    break;
                }
            case 1:
                {
                    h_m_snd[0].reg[1] = data;
                    if (h_m_snd_control.on) {
                        h_m_snd[0].duty = ((runtime.shiftRight(((data) & (192)), 6)) << 24 >> 24);
                    }
                    h_m_snd[0].length = ((((data) & (63))) & 0xff);
                    h_m_snd[0].length_counting = ((1) ? 1 : 0);
                    break;
                }
            case 2:
                {
                    h_m_snd[0].reg[2] = data;
                    h_m_snd[0].envelope_value = ((((data) >>> (4))) << 24 >> 24);
                    h_m_snd[0].envelope_direction = (((((((data) >>> (3)) & 1)) ? (1) : (-1))) << 24 >> 24);
                    h_m_snd[0].envelope_time = ((((data) & (7))) & 0xff);
                    if (((method_dac_enabled(runtime, h_m_snd[0])) ? 0 : 1)) {
                        h_m_snd[0].on = ((0) ? 1 : 0);
                    }
                    break;
                }
            case 3:
                {
                    h_m_snd[0].reg[3] = data;
                    if (((h_m_snd[0].sweep_enabled) ? 0 : 1)) {
                        h_m_snd[0].frequency = ((((((((h_m_snd[0].reg[4]) & (7))) << (8))) | (h_m_snd[0].reg[3]))) & 0xffff);
                    }
                    break;
                }
            case 4:
                {
                    h_m_snd[0].reg[4] = data;
                    let length_was_enabled = ((h_m_snd[0].length_enabled) ? 1 : 0);
                    h_m_snd[0].length_enabled = (((((data) >>> (6)) & 1)) ? 1 : 0);
                    h_m_snd[0].frequency = ((((((((h_m_snd_regs[4]) & (7))) << (8))) | (h_m_snd[0].reg[3]))) & 0xffff);
                    if (((((((((length_was_enabled) ? 0 : 1)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) && (h_m_snd[0].length_counting)) ? 1 : 0)) {
                        if (h_m_snd[0].length_enabled) {
                            method_tick_length(runtime, h_m_snd[0]);
                        }
                    }
                    if ((((data) >>> (7)) & 1)) {
                        h_m_snd[0].on = ((1) ? 1 : 0);
                        h_m_snd[0].envelope_enabled = ((1) ? 1 : 0);
                        h_m_snd[0].envelope_value = ((((h_m_snd[0].reg[2]) >>> (4))) << 24 >> 24);
                        h_m_snd[0].envelope_count = ((h_m_snd[0].envelope_time) & 0xff);
                        h_m_snd[0].sweep_count = ((h_m_snd[0].sweep_time) & 0xff);
                        h_m_snd[0].sweep_neg_mode_used = ((0) ? 1 : 0);
                        h_m_snd[0].signal = ((0) << 24 >> 24);
                        h_m_snd[0].length_counting = ((1) ? 1 : 0);
                        h_m_snd[0].frequency = ((((((((h_m_snd[0].reg[4]) & (7))) << (8))) | (h_m_snd[0].reg[3]))) & 0xffff);
                        h_m_snd[0].frequency_counter = ((h_m_snd[0].frequency) & 0xffff);
                        h_m_snd[0].frequency_shadow = ((h_m_snd[0].frequency) & 0xffff);
                        h_m_snd[0].cycles_left = 0;
                        h_m_snd[0].duty_count = ((0) >>> 0);
                        h_m_snd[0].sweep_enabled = ((((((((h_m_snd[0].sweep_shift) !== (0)) ? 1 : 0)) || ((((h_m_snd[0].sweep_time) !== (0)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
                        if (((method_dac_enabled(runtime, h_m_snd[0])) ? 0 : 1)) {
                            h_m_snd[0].on = ((0) ? 1 : 0);
                        }
                        if ((((h_m_snd[0].sweep_shift) > (0)) ? 1 : 0)) {
                            method_calculate_next_sweep(runtime, h_m_snd[0]);
                        }
                        if ((((((((((h_m_snd[0].length) === (0)) ? 1 : 0)) && (h_m_snd[0].length_enabled)) ? 1 : 0)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) {
                            method_tick_length(runtime, h_m_snd[0]);
                        }
                    }
                    else {
                        if (((h_m_snd[0].sweep_enabled) ? 0 : 1)) {
                            h_m_snd[0].frequency = ((((((((h_m_snd[0].reg[4]) & (7))) << (8))) | (h_m_snd[0].reg[3]))) & 0xffff);
                        }
                    }
                    break;
                }
            case 6:
                {
                    h_m_snd[1].reg[1] = data;
                    if (h_m_snd_control.on) {
                        h_m_snd[1].duty = ((runtime.shiftRight(((data) & (192)), 6)) << 24 >> 24);
                    }
                    h_m_snd[1].length = ((((data) & (63))) & 0xff);
                    h_m_snd[1].length_counting = ((1) ? 1 : 0);
                    break;
                }
            case 7:
                {
                    h_m_snd[1].reg[2] = data;
                    h_m_snd[1].envelope_value = ((((data) >>> (4))) << 24 >> 24);
                    h_m_snd[1].envelope_direction = (((((((data) >>> (3)) & 1)) ? (1) : (-1))) << 24 >> 24);
                    h_m_snd[1].envelope_time = ((((data) & (7))) & 0xff);
                    if (((method_dac_enabled(runtime, h_m_snd[1])) ? 0 : 1)) {
                        h_m_snd[1].on = ((0) ? 1 : 0);
                    }
                    break;
                }
            case 8:
                {
                    h_m_snd[1].reg[3] = data;
                    h_m_snd[1].frequency = ((((((((h_m_snd[1].reg[4]) & (7))) << (8))) | (h_m_snd[1].reg[3]))) & 0xffff);
                    break;
                }
            case 9:
                {
                    h_m_snd[1].reg[4] = data;
                    let length_was_enabled__1 = ((h_m_snd[1].length_enabled) ? 1 : 0);
                    h_m_snd[1].length_enabled = (((((data) >>> (6)) & 1)) ? 1 : 0);
                    if (((((((((length_was_enabled__1) ? 0 : 1)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) && (h_m_snd[1].length_counting)) ? 1 : 0)) {
                        if (h_m_snd[1].length_enabled) {
                            method_tick_length(runtime, h_m_snd[1]);
                        }
                    }
                    if ((((data) >>> (7)) & 1)) {
                        h_m_snd[1].on = ((1) ? 1 : 0);
                        h_m_snd[1].envelope_enabled = ((1) ? 1 : 0);
                        h_m_snd[1].envelope_value = ((((h_m_snd[1].reg[2]) >>> (4))) << 24 >> 24);
                        h_m_snd[1].envelope_count = ((h_m_snd[1].envelope_time) & 0xff);
                        h_m_snd[1].frequency = ((((((((h_m_snd[1].reg[4]) & (7))) << (8))) | (h_m_snd[1].reg[3]))) & 0xffff);
                        h_m_snd[1].frequency_counter = ((h_m_snd[1].frequency) & 0xffff);
                        h_m_snd[1].cycles_left = 0;
                        h_m_snd[1].duty_count = ((0) >>> 0);
                        h_m_snd[1].signal = ((0) << 24 >> 24);
                        h_m_snd[1].length_counting = ((1) ? 1 : 0);
                        if (((method_dac_enabled(runtime, h_m_snd[1])) ? 0 : 1)) {
                            h_m_snd[1].on = ((0) ? 1 : 0);
                        }
                        if ((((((((((h_m_snd[1].length) === (0)) ? 1 : 0)) && (h_m_snd[1].length_enabled)) ? 1 : 0)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) {
                            method_tick_length(runtime, h_m_snd[1]);
                        }
                    }
                    else {
                        h_m_snd[1].frequency = ((((((((h_m_snd[1].reg[4]) & (7))) << (8))) | (h_m_snd[1].reg[3]))) & 0xffff);
                    }
                    break;
                }
            case 10:
                {
                    h_m_snd[2].reg[0] = data;
                    h_m_snd[2].size = (((((data) >>> (5)) & 1)) & 0xff);
                    h_m_snd[2].bank = (((((data) >>> (6)) & 1)) & 0xff);
                    if (((method_dac_enabled(runtime, h_m_snd[2])) ? 0 : 1)) {
                        h_m_snd[2].on = ((0) ? 1 : 0);
                    }
                    break;
                }
            case 11:
                {
                    h_m_snd[2].reg[1] = data;
                    h_m_snd[2].length = ((data) & 0xff);
                    h_m_snd[2].length_counting = ((1) ? 1 : 0);
                    break;
                }
            case 12:
                {
                    h_m_snd[2].reg[2] = data;
                    h_m_snd[2].level = ((runtime.shiftRight(((data) & (224)), 5)) & 0xff);
                    break;
                }
            case 13:
                {
                    h_m_snd[2].reg[3] = data;
                    h_m_snd[2].frequency = ((((((((h_m_snd[2].reg[4]) & (7))) << (8))) | (h_m_snd[2].reg[3]))) & 0xffff);
                    break;
                }
            case 14:
                {
                    h_m_snd[2].reg[4] = data;
                    let length_was_enabled__2 = ((h_m_snd[2].length_enabled) ? 1 : 0);
                    h_m_snd[2].length_enabled = (((((data) >>> (6)) & 1)) ? 1 : 0);
                    if (((((((((length_was_enabled__2) ? 0 : 1)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) && (h_m_snd[2].length_counting)) ? 1 : 0)) {
                        if (h_m_snd[2].length_enabled) {
                            method_tick_length(runtime, h_m_snd[2]);
                        }
                    }
                    if ((((data) >>> (7)) & 1)) {
                        if ((((h_m_snd[2].on) && ((((h_m_snd[2].frequency_counter) === (2047)) ? 1 : 0))) ? 1 : 0)) {
                            method_corrupt_wave_ram(runtime);
                        }
                        h_m_snd[2].on = ((1) ? 1 : 0);
                        h_m_snd[2].offset = ((0) & 0xff);
                        h_m_snd[2].duty = ((1) << 24 >> 24);
                        h_m_snd[2].duty_count = ((0) >>> 0);
                        h_m_snd[2].length_counting = ((1) ? 1 : 0);
                        h_m_snd[2].frequency = ((((((((h_m_snd[2].reg[4]) & (7))) << (8))) | (h_m_snd[2].reg[3]))) & 0xffff);
                        h_m_snd[2].frequency_counter = ((h_m_snd[2].frequency) & 0xffff);
                        h_m_snd[2].cycles_left = -6;
                        h_m_snd[2].current_sample = ((0) << 24 >> 24);
                        h_m_snd[2].sample_reading = ((0) ? 1 : 0);
                        if (((method_dac_enabled(runtime, h_m_snd[2])) ? 0 : 1)) {
                            h_m_snd[2].on = ((0) ? 1 : 0);
                        }
                        if ((((((((((h_m_snd[2].length) === (0)) ? 1 : 0)) && (h_m_snd[2].length_enabled)) ? 1 : 0)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) {
                            method_tick_length(runtime, h_m_snd[2]);
                        }
                    }
                    else {
                        h_m_snd[2].frequency = ((((((((h_m_snd[2].reg[4]) & (7))) << (8))) | (h_m_snd[2].reg[3]))) & 0xffff);
                    }
                    break;
                }
            case 16:
                {
                    h_m_snd[3].reg[1] = data;
                    h_m_snd[3].length = ((((data) & (63))) & 0xff);
                    h_m_snd[3].length_counting = ((1) ? 1 : 0);
                    break;
                }
            case 17:
                {
                    h_m_snd[3].reg[2] = data;
                    h_m_snd[3].envelope_value = ((((data) >>> (4))) << 24 >> 24);
                    h_m_snd[3].envelope_direction = (((((((data) >>> (3)) & 1)) ? (1) : (-1))) << 24 >> 24);
                    h_m_snd[3].envelope_time = ((((data) & (7))) & 0xff);
                    if (((method_dac_enabled(runtime, h_m_snd[3])) ? 0 : 1)) {
                        h_m_snd[3].on = ((0) ? 1 : 0);
                    }
                    break;
                }
            case 18:
                {
                    h_m_snd[3].reg[3] = data;
                    h_m_snd[3].noise_short = (((((data) >>> (3)) & 1)) ? 1 : 0);
                    break;
                }
            case 19:
                {
                    h_m_snd[3].reg[4] = data;
                    let length_was_enabled__3 = ((h_m_snd[3].length_enabled) ? 1 : 0);
                    h_m_snd[3].length_enabled = (((((data) >>> (6)) & 1)) ? 1 : 0);
                    if (((((((((length_was_enabled__3) ? 0 : 1)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) && (h_m_snd[3].length_counting)) ? 1 : 0)) {
                        if (h_m_snd[3].length_enabled) {
                            method_tick_length(runtime, h_m_snd[3]);
                        }
                    }
                    if ((((data) >>> (7)) & 1)) {
                        h_m_snd[3].on = ((1) ? 1 : 0);
                        h_m_snd[3].envelope_enabled = ((1) ? 1 : 0);
                        h_m_snd[3].envelope_value = ((((h_m_snd[3].reg[2]) >>> (4))) << 24 >> 24);
                        h_m_snd[3].envelope_count = ((h_m_snd[3].envelope_time) & 0xff);
                        h_m_snd[3].frequency_counter = ((0) & 0xffff);
                        h_m_snd[3].cycles_left = method_noise_period_cycles(runtime);
                        h_m_snd[3].signal = ((0) << 24 >> 24);
                        h_m_snd[3].noise_lfsr = ((32767) & 0xffff);
                        h_m_snd[3].length_counting = ((1) ? 1 : 0);
                        if (((method_dac_enabled(runtime, h_m_snd[3])) ? 0 : 1)) {
                            h_m_snd[3].on = ((0) ? 1 : 0);
                        }
                        if ((((((((((h_m_snd[3].length) === (0)) ? 1 : 0)) && (h_m_snd[3].length_enabled)) ? 1 : 0)) && (((((h_m_snd_control.cycles) & (8192))) ? 0 : 1))) ? 1 : 0)) {
                            method_tick_length(runtime, h_m_snd[3]);
                        }
                    }
                    break;
                }
            case 20:
                {
                    h_m_snd_control.vol_left = ((((data) & (7))) & 0xff);
                    h_m_snd_control.vol_right = ((runtime.shiftRight(((data) & (112)), 4)) & 0xff);
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
                            h_m_snd_control.cycles = ((h_m_snd_control.cycles) | (57344));
                        }
                    }
                    h_m_snd_control.on = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    h_m_snd_regs[22] = ((data) & (128));
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
    function method_corrupt_wave_ram(runtime) {
        const members = runtime.members;
        const h_m_snd = members.m_snd ?? 0;
        const h_m_wave_ram = members.m_wave_ram ?? 0;
        if ((((h_m_snd[2].offset) < (4)) ? 1 : 0)) {
            runtime.writeIndex(h_m_wave_ram[0], 0, runtime.readIndex(h_m_wave_ram[0], runtime.divide(h_m_snd[2].offset, 2)));
        }
        else {
            for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                runtime.writeIndex(h_m_wave_ram[0], i, runtime.readIndex(h_m_wave_ram[0], ((((runtime.divide(h_m_snd[2].offset, 2)) & (-4))) + (i))));
            }
        }
    }
    function method_apu_power_off(runtime) {
        const members = runtime.members;
        const h_m_snd = members.m_snd ?? 0;
        const h_m_snd_regs = members.m_snd_regs ?? 0;
        const h_m_snd_control = members.m_snd_control ?? 0;
        method_sound_w_internal(runtime, 0, 0);
        h_m_snd[0].duty = ((0) << 24 >> 24);
        h_m_snd_regs[1] = 0;
        method_sound_w_internal(runtime, 2, 0);
        method_sound_w_internal(runtime, 3, 0);
        method_sound_w_internal(runtime, 4, 0);
        h_m_snd[0].frequency_shadow = ((0) & 0xffff);
        h_m_snd[0].length_counting = ((0) ? 1 : 0);
        h_m_snd[0].sweep_neg_mode_used = ((0) ? 1 : 0);
        h_m_snd_regs[6] = 0;
        method_sound_w_internal(runtime, 7, 0);
        method_sound_w_internal(runtime, 8, 0);
        method_sound_w_internal(runtime, 9, 0);
        h_m_snd[1].length_counting = ((0) ? 1 : 0);
        method_sound_w_internal(runtime, 10, 0);
        method_sound_w_internal(runtime, 12, 0);
        method_sound_w_internal(runtime, 13, 0);
        method_sound_w_internal(runtime, 14, 0);
        h_m_snd[2].length_counting = ((0) ? 1 : 0);
        h_m_snd[2].current_sample = ((0) << 24 >> 24);
        h_m_snd_regs[16] = 0;
        method_sound_w_internal(runtime, 17, 0);
        method_sound_w_internal(runtime, 18, 0);
        method_sound_w_internal(runtime, 19, 0);
        h_m_snd[3].length_counting = ((0) ? 1 : 0);
        h_m_snd[3].cycles_left = method_noise_period_cycles(runtime);
        h_m_snd[0].on = ((0) ? 1 : 0);
        h_m_snd[1].on = ((0) ? 1 : 0);
        h_m_snd[2].on = ((0) ? 1 : 0);
        h_m_snd[3].on = ((0) ? 1 : 0);
        h_m_snd_control.wave_ram_locked = ((0) ? 1 : 0);
        for (let i = ((20) | 0); ((Number(i) < Number(22)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            method_sound_w_internal(runtime, i, 0);
        }
    }
    function method_wave_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        const h_m_snd = members.m_snd ?? 0;
        const h_m_wave_ram = members.m_wave_ram ?? 0;
        (__t0 = __deref_wave_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
        if (h_m_snd[2].on) {
            if (h_m_snd[2].sample_reading) {
                runtime.writeIndex(h_m_wave_ram[0], runtime.divide(h_m_snd[2].offset, 2), data);
            }
        }
        else {
            runtime.writeIndex(h_m_wave_ram[0], offset, data);
        }
    }
    function __deref_wave_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0;
        const h_m_snd = members.m_snd ?? 0;
        const h_m_snd_control = members.m_snd_control ?? 0;
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            let sample = ((0) | 0);
            let left = ((0) | 0);
            let right = ((0) | 0);
            if (h_m_snd[0].on) {
                sample = ((method_convert_output(runtime, ((h_m_snd[0].signal) * (h_m_snd[0].envelope_value)))) | 0);
                if (h_m_snd_control.chan_left[0]) {
                    left = ((((left) + (sample))) | 0);
                }
                if (h_m_snd_control.chan_right[0]) {
                    right = ((((right) + (sample))) | 0);
                }
            }
            if (h_m_snd[1].on) {
                sample = ((method_convert_output(runtime, ((h_m_snd[1].signal) * (h_m_snd[1].envelope_value)))) | 0);
                if (h_m_snd_control.chan_left[1]) {
                    left = ((((left) + (sample))) | 0);
                }
                if (h_m_snd_control.chan_right[1]) {
                    right = ((((right) + (sample))) | 0);
                }
            }
            if (h_m_snd[2].on) {
                sample = ((method_convert_output(runtime, h_m_snd[2].signal)) | 0);
                if (h_m_snd_control.chan_left[2]) {
                    left = ((((left) + (sample))) | 0);
                }
                if (h_m_snd_control.chan_right[2]) {
                    right = ((((right) + (sample))) | 0);
                }
            }
            if (h_m_snd[3].on) {
                sample = ((method_convert_output(runtime, ((h_m_snd[3].signal) * (h_m_snd[3].envelope_value)))) | 0);
                if (h_m_snd_control.chan_left[3]) {
                    left = ((((left) + (sample))) | 0);
                }
                if (h_m_snd_control.chan_right[3]) {
                    right = ((((right) + (sample))) | 0);
                }
            }
            left = ((((left) * (((1) + (h_m_snd_control.vol_left))))) | 0);
            right = ((((right) * (((1) + (h_m_snd_control.vol_right))))) | 0);
            (__deref_sound_stream_update(runtime, stream).put_int?.(0, sampindex, left, 480) ?? 0);
            (__deref_sound_stream_update(runtime, stream).put_int?.(1, sampindex, right, 480) ?? 0);
        }
    }
    function __deref_sound_stream_update(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_convert_output(runtime, sample) {
        const members = runtime.members;
        return ((15) - (((sample) * (2))));
    }
    function method_timer_callback(runtime, param) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_timer_callback(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
    }
    function __deref_timer_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_sound_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        const h_m_snd_control = members.m_snd_control ?? 0;
        (__t0 = __deref_sound_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        method_update_state(runtime);
        if ((((((((((((((((((h_m_snd_control.on) ? 0 : 1)) && (((Number(offset) !== Number(22)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) !== Number(1)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) !== Number(6)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) !== Number(11)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) !== Number(16)) ? 1 : 0))) ? 1 : 0)) {
            return;
        }
        method_sound_w_internal(runtime, offset, data);
    }
    function __deref_sound_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "tick_length": method_tick_length,
        "tick_envelope": method_tick_envelope,
        "dac_enabled": method_dac_enabled,
        "noise_period_cycles": method_noise_period_cycles,
        "sound_r": method_sound_r,
        "wave_r": method_wave_r,
        "update_state": method_update_state,
        "update_square_channel": method_update_square_channel,
        "update_wave_channel": method_update_wave_channel,
        "update_noise_channel": method_update_noise_channel,
        "tick_sweep": method_tick_sweep,
        "apply_next_sweep": method_apply_next_sweep,
        "calculate_next_sweep": method_calculate_next_sweep,
        "sound_w_internal": method_sound_w_internal,
        "corrupt_wave_ram": method_corrupt_wave_ram,
        "apu_power_off": method_apu_power_off,
        "wave_w": method_wave_w,
        "sound_stream_update": method_sound_stream_update,
        "convert_output": method_convert_output,
        "timer_callback": method_timer_callback,
        "sound_w": method_sound_w
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["attotime_to_clocks", "machine", "machine().time"];
export const device = definition;
export default device;
