import deviceData from './ym2149.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [2147483648, 3221225472, 4026531840, 4278190080, 4294901760, 4294967040, 4294967280, 4294967292, 4294967294];
    const cppScratch_build_single_table_temp = new Float64Array(new Uint8Array(Math.max(0, Number(32))));
    function method_mix_3D(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_tone = members.m_tone ?? 0;
        const h_m_envelope = members.m_envelope ?? 0;
        const h_m_feature = members.m_feature ?? 0;
        const h_m_vol_enabled = members.m_vol_enabled ?? 0;
        let indx = ((0) | 0);
        for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
            let tone = __addr_mix_3D(runtime, h_m_tone, chan);
            let __pointee_tone = __deref_mix_3D(runtime, tone);
            if (((Number(method_tone_envelope(runtime, tone)) !== Number(0)) ? 1 : 0)) {
                let envelope = __addr_mix_3D(runtime, h_m_envelope, method_get_envelope_chan(runtime, chan));
                let __pointee_envelope = __deref_mix_3D(runtime, envelope);
                let env_volume = ((__pointee_envelope.volume) >>> 0);
                let env_mask = ((((1) << (((chan) + (15))))) >>> 0);
                if (((h_m_feature) & (8))) {
                    if (((method_is_expanded_mode(runtime)) ? 0 : 1)) {
                        env_volume = ((((env_volume) >>> (1))) >>> 0);
                        env_mask = ((0) >>> 0);
                    }
                }
                if (((h_m_feature) & (4))) {
                    indx = ((((indx) | (((env_mask) | (((h_m_vol_enabled[chan]) ? (((((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) << (((chan) * (5))))) : (0))))))) | 0);
                }
                else {
                    indx = ((((indx) | (((env_mask) | (((h_m_vol_enabled[chan]) ? (((env_volume) << (((chan) * (5))))) : (0))))))) | 0);
                }
            }
            else {
                let tone_mask = ((((method_is_expanded_mode(runtime)) ? (((1) << (((chan) + (15))))) : (0))) >>> 0);
                indx = ((((indx) | (((tone_mask) | (((h_m_vol_enabled[chan]) ? (((method_tone_volume(runtime, tone)) << (((chan) * (5))))) : (0))))))) | 0);
            }
        }
        return (__t0 = (members.m_vol3d_table ?? 0), ArrayBuffer.isView(__t0) ? (__t0[indx] ?? 0) : runtime.readIndex(__t0, indx));
    }
    function __addr_mix_3D(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_mix_3D(runtime, p) {
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
    function method_tone_envelope(runtime, tone) {
        const members = runtime.members;
        const __pointee_tone = __deref_tone_envelope(runtime, tone);
        const h_m_feature = members.m_feature ?? 0;
        return ((((((__pointee_tone.volume) >>> (((method_is_expanded_mode(runtime)) ? (5) : (4))))) & (((((h_m_feature) & (4))) ? (3) : (1))))) & 0xff);
    }
    function __deref_tone_envelope(runtime, p) {
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
    function method_is_expanded_mode(runtime) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        return (((((h_m_feature) & (8))) && (((Number((((members.m_mode ?? 0)) & (14))) === Number(10)) ? 1 : 0))) ? 1 : 0);
    }
    function method_get_envelope_chan(runtime, chan) {
        const members = runtime.members;
        return ((((method_is_expanded_mode(runtime)) ? (chan) : (0))) & 0xff);
    }
    function method_tone_volume(runtime, tone) {
        const members = runtime.members;
        const __pointee_tone = __deref_tone_volume(runtime, tone);
        return ((((__pointee_tone.volume) & (((method_is_expanded_mode(runtime)) ? (31) : (15))))) & 0xff);
    }
    function __deref_tone_volume(runtime, p) {
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
    function method_ay8910_write_reg(runtime, r, v) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_port_a_write_cb"], __L1 = __l["m_port_b_write_cb"];
        let __t0, __t1, __t2, __t3;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_tone = members.m_tone ?? 0;
        const h_m_envelope = members.m_envelope ?? 0;
        const h_m_feature = members.m_feature ?? 0;
        if (((Number(((r) & (15))) === Number(13)) ? 1 : 0)) {
            r = ((((r) & (15))) | 0);
        }
        h_m_regs[r] = v;
        let coarse = ((0) & 0xff);
        switch (r) {
            case 0:
            case 1:
                {
                    coarse = ((((h_m_regs[1]) & (((method_is_expanded_mode(runtime)) ? (255) : (15))))) & 0xff);
                    (__deref_ay8910_write_reg(runtime, h_m_tone[0]).set_period?.(h_m_regs[0], coarse) ?? 0);
                    break;
                }
            case 2:
            case 3:
                {
                    coarse = ((((h_m_regs[3]) & (((method_is_expanded_mode(runtime)) ? (255) : (15))))) & 0xff);
                    (__deref_ay8910_write_reg(runtime, h_m_tone[1]).set_period?.(h_m_regs[2], coarse) ?? 0);
                    break;
                }
            case 4:
            case 5:
                {
                    coarse = ((((h_m_regs[5]) & (((method_is_expanded_mode(runtime)) ? (255) : (15))))) & 0xff);
                    (__deref_ay8910_write_reg(runtime, h_m_tone[2]).set_period?.(h_m_regs[4], coarse) ?? 0);
                    break;
                }
            case 6:
                {
                    break;
                }
            case 8:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_tone[0]).set_volume?.(h_m_regs[8]) ?? 0);
                    break;
                }
            case 9:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_tone[1]).set_volume?.(h_m_regs[9]) ?? 0);
                    break;
                }
            case 10:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_tone[2]).set_volume?.(h_m_regs[10]) ?? 0);
                    break;
                }
            case 12:
            case 11:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_envelope[0]).set_period?.(h_m_regs[11], h_m_regs[12]) ?? 0);
                    break;
                }
            case 7:
                {
                    if (1) {
                        let enable = ((((h_m_regs[7]) & (64))) & 0xff);
                        if (((Number(enable) !== Number((((members.m_last_enable ?? 0)) & (64)))) ? 1 : 0)) {
                            if ((((__t0 = __deref_ay8910_write_reg(runtime, members.m_port_a_write_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_port_a_write_cb, "isunset"))) ? 0 : 1)) {
                                (__L0 ? __L0(Number(0), Number(((enable) ? (h_m_regs[14]) : (255))), Number(((enable) ? (255) : (0)))) : typeof members.m_port_a_write_cb === 'function' ? members.m_port_a_write_cb(0, ((enable) ? (h_m_regs[14]) : (255)), ((enable) ? (255) : (0))) : runtime.invoke("m_port_a_write_cb", 0, ((enable) ? (h_m_regs[14]) : (255)), ((enable) ? (255) : (0))));
                            }
                        }
                    }
                    if (1) {
                        let enable = ((((h_m_regs[7]) & (128))) & 0xff);
                        if (((Number(enable) !== Number((((members.m_last_enable ?? 0)) & (128)))) ? 1 : 0)) {
                            if ((((__t1 = __deref_ay8910_write_reg(runtime, members.m_port_b_write_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_port_b_write_cb, "isunset"))) ? 0 : 1)) {
                                (__L1 ? __L1(Number(0), Number(((enable) ? (h_m_regs[15]) : (255))), Number(((enable) ? (255) : (0)))) : typeof members.m_port_b_write_cb === 'function' ? members.m_port_b_write_cb(0, ((enable) ? (h_m_regs[15]) : (255)), ((enable) ? (255) : (0))) : runtime.invoke("m_port_b_write_cb", 0, ((enable) ? (h_m_regs[15]) : (255)), ((enable) ? (255) : (0))));
                            }
                        }
                    }
                    members.m_last_enable = ((h_m_regs[7]) & 0xff);
                    break;
                }
            case 13:
                {
                    if (((h_m_feature) & (8))) {
                        let old_mode = (((members.m_mode ?? 0)) & 0xff);
                        members.m_mode = ((((runtime.shiftRight(v, 4)) & (15))) & 0xff);
                        if ((((old_mode) !== ((members.m_mode ?? 0))) ? 1 : 0)) {
                            if (((((Number(((old_mode) & (14))) === Number(10)) ? 1 : 0)) ^ (((Number((((members.m_mode ?? 0)) & (14))) === Number(10)) ? 1 : 0)))) {
                                for (let i = ((0) | 0); ((Number(i) < Number(13)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                    method_ay8910_write_reg(runtime, i, 0);
                                    method_ay8910_write_reg(runtime, ((i) + (16)), 0);
                                }
                            }
                            else {
                                if ((((members.m_mode ?? 0)) & (15))) {
                                    0;
                                }
                            }
                        }
                    }
                    (__deref_ay8910_write_reg(runtime, h_m_envelope[0]).set_shape?.(h_m_regs[13], (members.m_env_step_mask ?? 0)) ?? 0);
                    break;
                }
            case 14:
                {
                    if (((h_m_regs[7]) & (64))) {
                        if ((((__t2 = __deref_ay8910_write_reg(runtime, members.m_port_a_write_cb), typeof __t2.isunset === 'function' ? __t2.isunset() : typeof __t2.isunset === 'number' || typeof __t2.isunset === 'boolean' ? __t2.isunset : runtime.container(members.m_port_a_write_cb, "isunset"))) ? 0 : 1)) {
                            (__L0 ? __L0(Number(h_m_regs[14])) : typeof members.m_port_a_write_cb === 'function' ? members.m_port_a_write_cb(h_m_regs[14]) : runtime.invoke("m_port_a_write_cb", h_m_regs[14]));
                        }
                        else {
                            0;
                        }
                    }
                    else {
                        0;
                    }
                    break;
                }
            case 15:
                {
                    if (((h_m_regs[7]) & (128))) {
                        if ((((__t3 = __deref_ay8910_write_reg(runtime, members.m_port_b_write_cb), typeof __t3.isunset === 'function' ? __t3.isunset() : typeof __t3.isunset === 'number' || typeof __t3.isunset === 'boolean' ? __t3.isunset : runtime.container(members.m_port_b_write_cb, "isunset"))) ? 0 : 1)) {
                            (__L1 ? __L1(Number(h_m_regs[15])) : typeof members.m_port_b_write_cb === 'function' ? members.m_port_b_write_cb(h_m_regs[15]) : runtime.invoke("m_port_b_write_cb", h_m_regs[15]));
                        }
                        else {
                            0;
                        }
                    }
                    else {
                        0;
                    }
                    break;
                }
            case 16:
            case 17:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_envelope[1]).set_period?.(h_m_regs[16], h_m_regs[17]) ?? 0);
                    break;
                }
            case 18:
            case 19:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_envelope[2]).set_period?.(h_m_regs[18], h_m_regs[19]) ?? 0);
                    break;
                }
            case 20:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_envelope[1]).set_shape?.(h_m_regs[20], (members.m_env_step_mask ?? 0)) ?? 0);
                    break;
                }
            case 21:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_envelope[2]).set_shape?.(h_m_regs[21], (members.m_env_step_mask ?? 0)) ?? 0);
                    break;
                }
            case 22:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_tone[0]).set_duty?.(h_m_regs[22]) ?? 0);
                    break;
                }
            case 23:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_tone[1]).set_duty?.(h_m_regs[23]) ?? 0);
                    break;
                }
            case 24:
                {
                    (__deref_ay8910_write_reg(runtime, h_m_tone[2]).set_duty?.(h_m_regs[24]) ?? 0);
                    break;
                }
            case 25:
            case 26:
                {
                    break;
                }
            default:
                {
                    h_m_regs[r] = 0;
                    break;
                }
        }
    }
    function __deref_ay8910_write_reg(runtime, p) {
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
        const h_m_tone = members.m_tone ?? 0;
        const h_m_vol_enabled = members.m_vol_enabled ?? 0;
        const h_m_envelope = members.m_envelope ?? 0;
        const h_m_feature = members.m_feature ?? 0;
        const h_m_vol_table = members.m_vol_table ?? 0;
        const h_m_env_table = members.m_env_table ?? 0;
        let tone = 0;
        let __pointee_tone = __deref_sound_stream_update(runtime, tone);
        let envelope = 0;
        let __pointee_envelope = __deref_sound_stream_update(runtime, envelope);
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                tone = __addr_sound_stream_update(runtime, h_m_tone, chan);
                __pointee_tone = __deref_sound_stream_update(runtime, tone);
                let period = ((cppMax(+(1), +(__pointee_tone.period))) | 0);
                __pointee_tone.count = ((((__pointee_tone.count) + (((method_is_expanded_mode(runtime)) ? (16) : (1))))) | 0);
                while ((((__pointee_tone.count) >= (period)) ? 1 : 0)) {
                    __pointee_tone.duty_cycle = ((((((__pointee_tone.duty_cycle) - (1))) & (31))) & 0xff);
                    __pointee_tone.output = ((((method_is_expanded_mode(runtime)) ? (((((__mame_table_0[(((method_tone_duty(runtime, tone)) % 9) + 9) % 9] ?? 0)) >>> (__pointee_tone.duty_cycle)) & 1)) : ((((__pointee_tone.duty_cycle) >>> (0)) & 1)))) & 0xff);
                    __pointee_tone.count = ((((__pointee_tone.count) - (period))) | 0);
                }
            }
            if (((Number((members.m_count_noise = ((((members.m_count_noise) + (1))) << 16 >> 16))) >= Number(method_noise_period(runtime))) ? 1 : 0)) {
                members.m_count_noise = ((0) << 16 >> 16);
                members.m_prescale_noise = ((((members.m_prescale_noise) ^ (1))) & 0xff);
                if (method_is_expanded_mode(runtime)) {
                    if (((Number((members.m_noise_value = ((((members.m_noise_value) + (1))) << 16 >> 16))) >= Number((((((((members.m_rng ?? 0)) & 0xff)) & (method_noise_and(runtime)))) | (method_noise_or(runtime))))) ? 1 : 0)) {
                        members.m_noise_value = ((0) << 16 >> 16);
                        members.m_noise_out = ((((members.m_noise_out) ^ (1))) & 0xff);
                        method_noise_rng_tick(runtime);
                    }
                }
                else {
                    if ((((members.m_prescale_noise ?? 0)) ? 0 : 1)) {
                        method_noise_rng_tick(runtime);
                    }
                }
            }
            for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                tone = __addr_sound_stream_update(runtime, h_m_tone, chan);
                __pointee_tone = __deref_sound_stream_update(runtime, tone);
                h_m_vol_enabled[chan] = ((((__pointee_tone.output) | (method_tone_enable(runtime, chan)))) & (((method_noise_output(runtime)) | (method_noise_enable(runtime, chan)))));
            }
            for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                envelope = __addr_sound_stream_update(runtime, h_m_envelope, chan);
                __pointee_envelope = __deref_sound_stream_update(runtime, envelope);
                if ((((__pointee_envelope.holding) === (0)) ? 1 : 0)) {
                    let period = ((((__pointee_envelope.period) * ((members.m_step ?? 0)))) >>> 0);
                    if (((Number((__pointee_envelope.count = ((((__pointee_envelope.count) + (1))) | 0))) >= Number(period)) ? 1 : 0)) {
                        __pointee_envelope.count = ((0) | 0);
                        __pointee_envelope.step = ((((__pointee_envelope.step) - (1))) << 24 >> 24);
                        if ((((__pointee_envelope.step) < (0)) ? 1 : 0)) {
                            if (__pointee_envelope.hold) {
                                if (__pointee_envelope.alternate) {
                                    __pointee_envelope.attack = ((((__pointee_envelope.attack) ^ ((members.m_env_step_mask ?? 0)))) & 0xff);
                                }
                                __pointee_envelope.holding = ((1) & 0xff);
                                __pointee_envelope.step = ((0) << 24 >> 24);
                            }
                            else {
                                if ((((__pointee_envelope.alternate) && (((__pointee_envelope.step) & ((((members.m_env_step_mask ?? 0)) + (1)))))) ? 1 : 0)) {
                                    __pointee_envelope.attack = ((((__pointee_envelope.attack) ^ ((members.m_env_step_mask ?? 0)))) & 0xff);
                                }
                                __pointee_envelope.step = ((((__pointee_envelope.step) & ((members.m_env_step_mask ?? 0)))) << 24 >> 24);
                            }
                        }
                    }
                }
                __pointee_envelope.volume = ((((__pointee_envelope.step) ^ (__pointee_envelope.attack))) >>> 0);
            }
            if (((((members.m_streams ?? 0)) === (3)) ? 1 : 0)) {
                for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                    tone = __addr_sound_stream_update(runtime, h_m_tone, chan);
                    __pointee_tone = __deref_sound_stream_update(runtime, tone);
                    if (((Number(method_tone_envelope(runtime, tone)) !== Number(0)) ? 1 : 0)) {
                        envelope = __addr_sound_stream_update(runtime, h_m_envelope, method_get_envelope_chan(runtime, chan));
                        __pointee_envelope = __deref_sound_stream_update(runtime, envelope);
                        let env_volume = ((__pointee_envelope.volume) >>> 0);
                        if (((h_m_feature) & (8))) {
                            if (((method_is_expanded_mode(runtime)) ? 0 : 1)) {
                                env_volume = ((((env_volume) >>> (1))) >>> 0);
                                if (((h_m_feature) & (4))) {
                                    (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_vol_table[chan], ((h_m_vol_enabled[chan]) ? (((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) : (0)))) ?? 0);
                                }
                                else {
                                    (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_vol_table[chan], ((h_m_vol_enabled[chan]) ? (env_volume) : (0)))) ?? 0);
                                }
                            }
                            else {
                                if (((h_m_feature) & (4))) {
                                    (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) : (0)))) ?? 0);
                                }
                                else {
                                    (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (env_volume) : (0)))) ?? 0);
                                }
                            }
                        }
                        else {
                            if (((h_m_feature) & (4))) {
                                (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) : (0)))) ?? 0);
                            }
                            else {
                                (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (env_volume) : (0)))) ?? 0);
                            }
                        }
                    }
                    else {
                        if (method_is_expanded_mode(runtime)) {
                            (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_env_table[chan], ((h_m_vol_enabled[chan]) ? (method_tone_volume(runtime, tone)) : (0)))) ?? 0);
                        }
                        else {
                            (__deref_sound_stream_update(runtime, stream).put?.(chan, sampindex, runtime.readIndex(h_m_vol_table[chan], ((h_m_vol_enabled[chan]) ? (method_tone_volume(runtime, tone)) : (0)))) ?? 0);
                        }
                    }
                }
            }
            else {
                (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, method_mix_3D(runtime)) ?? 0);
            }
        }
    }
    function __addr_sound_stream_update(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
    function method_tone_duty(runtime, tone) {
        const members = runtime.members;
        const __pointee_tone = __deref_tone_duty(runtime, tone);
        return ((((method_is_expanded_mode(runtime)) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
    }
    function __deref_tone_duty(runtime, p) {
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
    function method_noise_period(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((method_is_expanded_mode(runtime)) ? (((h_m_regs[6]) & (255))) : (((h_m_regs[6]) & (31))))) & 0xff);
    }
    function method_noise_and(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[25]) & (255))) & 0xff);
    }
    function method_noise_or(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[26]) & (255))) & 0xff);
    }
    function method_noise_rng_tick(runtime) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        if (((h_m_feature) & (8))) {
            members.m_rng = (((((((members.m_rng ?? 0)) >>> (1))) | (((((((((members.m_rng ?? 0)) >>> (0)) & 1)) ^ (((((members.m_rng ?? 0)) >>> (2)) & 1)))) << (16))))) >>> 0);
        }
        else {
            members.m_rng = (((((((members.m_rng ?? 0)) >>> (1))) | (((((((((members.m_rng ?? 0)) >>> (0)) & 1)) ^ (((((members.m_rng ?? 0)) >>> (3)) & 1)))) << (16))))) >>> 0);
        }
    }
    function method_tone_enable(runtime, chan) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return (((h_m_regs[7]) >>> (chan)) & 1);
    }
    function method_noise_output(runtime) {
        const members = runtime.members;
        return ((((method_is_expanded_mode(runtime)) ? ((((members.m_noise_out ?? 0)) & (1))) : ((((members.m_rng ?? 0)) & (1))))) & 0xff);
    }
    function method_noise_enable(runtime, chan) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return (((h_m_regs[7]) >>> (((3) + (chan)))) & 1);
    }
    function method_build_mixer_table(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        const h_ay8910_mosfet_param = members.ay8910_mosfet_param ?? 0;
        const h_m_res_load = members.m_res_load ?? 0;
        const h_m_vol_table = members.m_vol_table ?? 0;
        const h_m_env_table = members.m_env_table ?? 0;
        let normalize = ((0) | 0);
        if (((Number((((members.m_flags ?? 0)) & (1))) !== Number(0)) ? 1 : 0)) {
            0;
            normalize = ((1) | 0);
        }
        if (((Number((((members.m_flags ?? 0)) & (8))) !== Number(0)) ? 1 : 0)) {
            if (((Number((members.m_type ?? 0)) !== Number(0)) ? 1 : 0)) {
                (__L0 ? __L0("AY8910_RESISTOR_OUTPUT currently only supported for AY8910 devices.") : runtime.macro("fatalerror", "AY8910_RESISTOR_OUTPUT currently only supported for AY8910 devices."));
            }
            for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                method_build_mosfet_resistor_table(runtime, h_ay8910_mosfet_param, h_m_res_load[chan], h_m_vol_table[chan]);
                method_build_mosfet_resistor_table(runtime, h_ay8910_mosfet_param, h_m_res_load[chan], h_m_env_table[chan]);
            }
        }
        else {
            if (((Number((members.m_streams ?? 0)) === Number(3)) ? 1 : 0)) {
                for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                    method_build_single_table(runtime, h_m_res_load[chan], (members.m_par ?? 0), normalize, h_m_vol_table[chan], (members.m_zero_is_off ?? 0));
                    method_build_single_table(runtime, h_m_res_load[chan], (members.m_par_env ?? 0), normalize, h_m_env_table[chan], 0);
                }
            }
            else {
                method_build_3D_table(runtime, h_m_res_load[0], (members.m_par ?? 0), (members.m_par_env ?? 0), normalize, 3, (members.m_zero_is_off ?? 0), (members.m_vol3d_table ?? 0));
            }
        }
    }
    function method_build_mosfet_resistor_table(runtime, par, rd, tab) {
        const members = runtime.members;
        for (let j = ((0) | 0); ((Number(j) < Number(par.m_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            let Vd = 5;
            let Vg = runtime.subtract(par.m_Vg, par.m_Vth);
            let kn = ((runtime.readIndex(par.m_Kn, j)) / (1000000));
            let p2 = ((((1) / (((((2) * (kn))) * (rd))))) + (Vg));
            let Vs = ((p2) - (Math.sqrt(Number(((((p2) * (p2))) - (((Vg) * (Vg))))))));
            let res = ((rd) * (((((Vd) / (Vs))) - (1))));
            runtime.writeIndex(tab, j, res);
        }
    }
    function method_build_single_table(runtime, rl, par, normalize, tab, zero_is_off) {
        const members = runtime.members;
        let rt = 0;
        let rw = 0;
        let temp = cppScratch_build_single_table_temp.fill(0);
        let min = 10;
        let max = 0;
        for (let j = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            rt = __add_build_single_table(runtime, ((1) / (__deref_build_single_table(runtime, par).r_down)), ((1) / (rl)));
            rw = ((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)));
            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)))));
            if ((((((zero_is_off) && ((((j) === (0)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
                rw = ((rw) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
                rt = ((rt) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
            }
            temp[j] = ((rw) / (rt));
            if (((Number((temp[j] ?? 0)) < Number(min)) ? 1 : 0)) {
                min = (temp[j] ?? 0);
            }
            if (((Number((temp[j] ?? 0)) > Number(max)) ? 1 : 0)) {
                max = (temp[j] ?? 0);
            }
        }
        if (normalize) {
            for (let j = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                runtime.writeIndex(tab, j, ((((1) * ((((((((temp[j] ?? 0)) - (min))) / (((max) - (min))))) - (0.25))))) * (0.5)));
            }
        }
        else {
            for (let j = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                runtime.writeIndex(tab, j, ((1) * ((temp[j] ?? 0))));
            }
        }
    }
    function __add_build_single_table(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_build_single_table(runtime, p) {
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
    function method_build_3D_table(runtime, rl, par, par_env, normalize, factor, zero_is_off, tab) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["VECTOR_OF"];
        let min = 10;
        let max = 0;
        let temp = (__L0 ? __L0("double", 262144, 0) : runtime.macro("VECTOR_OF", "double", 262144, 0));
        for (let e = ((0) | 0); (((e) < (8)) ? 1 : 0); e = ((((e) + (1))) | 0)) {
            let par_ch1 = ((((e) & (1))) ? (par_env) : (par));
            let par_ch1$s = undefined, par_ch1$o = 0;
            if (ArrayBuffer.isView(par_ch1) || Array.isArray(par_ch1))
                par_ch1$s = par_ch1;
            else if (par_ch1 !== null && typeof par_ch1 === 'object' && par_ch1.generatedPointer === true && par_ch1.path === undefined && par_ch1.target === undefined && (ArrayBuffer.isView(par_ch1.source) || Array.isArray(par_ch1.source))) {
                par_ch1$s = par_ch1.source;
                par_ch1$o = par_ch1.offset;
            }
            let par_ch2 = ((((e) & (2))) ? (par_env) : (par));
            let par_ch2$s = undefined, par_ch2$o = 0;
            if (ArrayBuffer.isView(par_ch2) || Array.isArray(par_ch2))
                par_ch2$s = par_ch2;
            else if (par_ch2 !== null && typeof par_ch2 === 'object' && par_ch2.generatedPointer === true && par_ch2.path === undefined && par_ch2.target === undefined && (ArrayBuffer.isView(par_ch2.source) || Array.isArray(par_ch2.source))) {
                par_ch2$s = par_ch2.source;
                par_ch2$o = par_ch2.offset;
            }
            let par_ch3 = ((((e) & (4))) ? (par_env) : (par));
            let par_ch3$s = undefined, par_ch3$o = 0;
            if (ArrayBuffer.isView(par_ch3) || Array.isArray(par_ch3))
                par_ch3$s = par_ch3;
            else if (par_ch3 !== null && typeof par_ch3 === 'object' && par_ch3.generatedPointer === true && par_ch3.path === undefined && par_ch3.target === undefined && (ArrayBuffer.isView(par_ch3.source) || Array.isArray(par_ch3.source))) {
                par_ch3$s = par_ch3.source;
                par_ch3$o = par_ch3.offset;
            }
            for (let j1 = ((0) | 0); ((Number(j1) < Number(__deref_build_3D_table(runtime, par_ch1).res_count)) ? 1 : 0); j1 = ((((j1) + (1))) | 0)) {
                for (let j2 = ((0) | 0); ((Number(j2) < Number(__deref_build_3D_table(runtime, par_ch2).res_count)) ? 1 : 0); j2 = ((((j2) + (1))) | 0)) {
                    for (let j3 = ((0) | 0); ((Number(j3) < Number(__deref_build_3D_table(runtime, par_ch3).res_count)) ? 1 : 0); j3 = ((((j3) + (1))) | 0)) {
                        let n = 0;
                        if (zero_is_off) {
                            n = ((((((((j1) !== (0)) ? 1 : 0)) || (((e) & (1)))) ? 1 : 0)) ? (1) : (0));
                            n = ((n) + (((((((((j2) !== (0)) ? 1 : 0)) || (((e) & (2)))) ? 1 : 0)) ? (1) : (0))));
                            n = ((n) + (((((((((j3) !== (0)) ? 1 : 0)) || (((e) & (4)))) ? 1 : 0)) ? (1) : (0))));
                        }
                        else {
                            n = 3;
                        }
                        let rt = __add_build_3D_table(runtime, __add_build_3D_table(runtime, ((n) / (__deref_build_3D_table(runtime, par).r_up)), ((3) / (__deref_build_3D_table(runtime, par).r_down))), ((1) / (rl)));
                        let rw = ((n) / (__deref_build_3D_table(runtime, par).r_up));
                        rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
                        rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
                        rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
                        rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
                        rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
                        rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
                        let indx = ((((((((((e) << (15))) | (((j3) << (10))))) | (((j2) << (5))))) | (j1))) | 0);
                        runtime.writeIndex(temp, indx, ((rw) / (rt)));
                        if (((Number(runtime.readIndex(temp, indx)) < Number(min)) ? 1 : 0)) {
                            min = runtime.readIndex(temp, indx);
                        }
                        if (((Number(runtime.readIndex(temp, indx)) > Number(max)) ? 1 : 0)) {
                            max = runtime.readIndex(temp, indx);
                        }
                    }
                }
            }
        }
        if (normalize) {
            for (let j = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                runtime.writeIndex(tab, j, ((((1) * (((((runtime.readIndex(temp, j)) - (min))) / (((max) - (min))))))) * (factor)));
            }
        }
        else {
            for (let j = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                runtime.writeIndex(tab, j, ((1) * (runtime.readIndex(temp, j))));
            }
        }
    }
    function __add_build_3D_table(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_build_3D_table(runtime, p) {
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
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["tag"], __L2 = __l["name"], __L3 = __l["fatalerror"], __L4 = __l["stream_alloc"];
        let __t0, __t1, __t2, __t3;
        const h_m_ioports = members.m_ioports ?? 0;
        let master_clock = (((__L0 ? __L0() : runtime.macro("clock"))) | 0);
        if (((((((h_m_ioports) < (1)) ? 1 : 0)) && (((((((__t0 = __deref_device_start(runtime, members.m_port_a_read_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_port_a_read_cb, "isunset"))) && ((__t1 = __deref_device_start(runtime, members.m_port_a_write_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_port_a_write_cb, "isunset")))) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) {
            (__L3 ? __L3("Device '%s' is a %s and has no port A!", (__L1 ? __L1() : runtime.macro("tag")), (__L2 ? __L2() : runtime.macro("name"))) : runtime.macro("fatalerror", "Device '%s' is a %s and has no port A!", (__L1 ? __L1() : runtime.macro("tag")), (__L2 ? __L2() : runtime.macro("name"))));
        }
        if (((((((h_m_ioports) < (2)) ? 1 : 0)) && (((((((__t2 = __deref_device_start(runtime, members.m_port_b_read_cb), typeof __t2.isunset === 'function' ? __t2.isunset() : typeof __t2.isunset === 'number' || typeof __t2.isunset === 'boolean' ? __t2.isunset : runtime.container(members.m_port_b_read_cb, "isunset"))) && ((__t3 = __deref_device_start(runtime, members.m_port_b_write_cb), typeof __t3.isunset === 'function' ? __t3.isunset() : typeof __t3.isunset === 'number' || typeof __t3.isunset === 'boolean' ? __t3.isunset : runtime.container(members.m_port_b_write_cb, "isunset")))) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) {
            (__L3 ? __L3("Device '%s' is a %s and has no port B!", (__L1 ? __L1() : runtime.macro("tag")), (__L2 ? __L2() : runtime.macro("name"))) : runtime.macro("fatalerror", "Device '%s' is a %s and has no port B!", (__L1 ? __L1() : runtime.macro("tag")), (__L2 ? __L2() : runtime.macro("name"))));
        }
        if (((Number((((members.m_flags ?? 0)) & (2))) !== Number(0)) ? 1 : 0)) {
            0;
            members.m_streams = ((1) | 0);
        }
        members.m_vol3d_table = new Float64Array(Math.max(0, Number(262144)));
        method_build_mixer_table(runtime);
        members.m_channel = (__L4 ? __L4(0, (members.m_streams ?? 0), runtime.divide(master_clock, 8)) : runtime.macro("stream_alloc", 0, (members.m_streams ?? 0), runtime.divide(master_clock, 8)));
        method_ay_set_clock(runtime, master_clock);
        runtime.invoke("ay8910_statesave");
    }
    function __deref_device_start(runtime, p) {
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
    function method_ay_set_clock(runtime, clock) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        if (((((((((h_m_feature) & (1))) && ((((members.m_flags ?? 0)) & (16)))) ? 1 : 0)) || (((h_m_feature) & (2)))) ? 1 : 0)) {
            (__deref_ay_set_clock(runtime, members.m_channel).set_sample_rate?.(runtime.divide(clock, 16)) ?? 0);
        }
        else {
            (__deref_ay_set_clock(runtime, members.m_channel).set_sample_rate?.(runtime.divide(clock, 8)) ?? 0);
        }
    }
    function __deref_ay_set_clock(runtime, p) {
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
    function method_ay8910_reset_ym(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_tone = members.m_tone ?? 0;
        const h_m_envelope = members.m_envelope ?? 0;
        members.m_active = ((0) ? 1 : 0);
        members.m_register_latch = ((0) & 0xff);
        members.m_rng = ((1) >>> 0);
        members.m_noise_out = ((0) & 0xff);
        members.m_mode = ((0) & 0xff);
        for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
            (__t0 = __deref_ay8910_reset_ym(runtime, h_m_tone[chan]), typeof __t0.reset === 'function' ? (__t0.reset() ?? 0) : runtime.container(h_m_tone[chan], "reset"));
            (__t1 = __deref_ay8910_reset_ym(runtime, h_m_envelope[chan]), typeof __t1.reset === 'function' ? (__t1.reset() ?? 0) : runtime.container(h_m_envelope[chan], "reset"));
        }
        members.m_noise_value = ((0) << 16 >> 16);
        members.m_count_noise = ((0) << 16 >> 16);
        members.m_prescale_noise = ((0) & 0xff);
        members.m_last_enable = ((192) & 0xff);
        for (let i = ((0) | 0); ((Number(i) < Number(14)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            method_ay8910_write_reg(runtime, i, 0);
        }
        members.m_ready = ((1) | 0);
    }
    function __deref_ay8910_reset_ym(runtime, p) {
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
    function method_device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        method_ay_set_clock(runtime, (__L0 ? __L0() : runtime.macro("clock")));
    }
    function method_ay8910_write_ym(runtime, addr, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        if (((addr) & (1))) {
            if ((members.m_active ?? 0)) {
                let register_latch = (((((members.m_register_latch ?? 0)) + (method_get_register_bank(runtime)))) & 0xff);
                if ((((((Number((members.m_register_latch ?? 0)) === Number(13)) ? 1 : 0)) || ((((h_m_regs[register_latch]) !== (data)) ? 1 : 0))) ? 1 : 0)) {
                    (__t0 = __deref_ay8910_write_ym(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
                }
                method_ay8910_write_reg(runtime, register_latch, data);
            }
        }
        else {
            members.m_active = ((((Number(((data) >>> (4))) === Number(0)) ? 1 : 0)) ? 1 : 0);
            if ((members.m_active ?? 0)) {
                members.m_register_latch = ((((data) & (15))) & 0xff);
            }
            else {
                0;
            }
        }
    }
    function __deref_ay8910_write_ym(runtime, p) {
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
    function method_get_register_bank(runtime) {
        const members = runtime.members;
        return ((((method_is_expanded_mode(runtime)) ? ((((((members.m_mode ?? 0)) & (1))) << (4))) : (0))) & 0xff);
    }
    function method_ay8910_read_ym(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["type"], __L1 = __l["m_port_a_read_cb"], __L2 = __l["m_port_b_read_cb"];
        let __t0, __t1;
        const h_m_regs = members.m_regs ?? 0;
        let chip_type = (__L0 ? __L0() : runtime.macro("type"));
        let r = (((((members.m_register_latch ?? 0)) + (method_get_register_bank(runtime)))) & 0xff);
        if ((((members.m_active ?? 0)) ? 0 : 1)) {
            return 255;
        }
        if (((Number(((r) & (15))) === Number(13)) ? 1 : 0)) {
            r = ((((r) & (15))) & 0xff);
        }
        switch (r) {
            case 14:
                {
                    if (((h_m_regs[7]) & (64))) {
                        0;
                    }
                    if ((((__t0 = __deref_ay8910_read_ym(runtime, members.m_port_a_read_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_port_a_read_cb, "isunset"))) ? 0 : 1)) {
                        h_m_regs[14] = (__L1 ? __L1() : typeof members.m_port_a_read_cb === 'function' ? members.m_port_a_read_cb() : runtime.invoke("m_port_a_read_cb"));
                    }
                    else {
                        0;
                    }
                    break;
                }
            case 15:
                {
                    if (((h_m_regs[7]) & (128))) {
                        0;
                    }
                    if ((((__t1 = __deref_ay8910_read_ym(runtime, members.m_port_b_read_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_port_b_read_cb, "isunset"))) ? 0 : 1)) {
                        h_m_regs[15] = (__L2 ? __L2() : typeof members.m_port_b_read_cb === 'function' ? members.m_port_b_read_cb() : runtime.invoke("m_port_b_read_cb"));
                    }
                    else {
                        0;
                    }
                    break;
                }
        }
        if (((Number(chip_type) === Number(2748346829)) ? 1 : 0)) {
            let mask = [255, 15, 255, 15, 255, 15, 31, 255, 31, 31, 31, 255, 255, 15, 255, 255];
            return ((h_m_regs[r]) & ((mask[r] ?? 0)));
        }
        else {
            if (((Number(chip_type) === Number(2681236353)) ? 1 : 0)) {
                let mask = [255, 15, 255, 15, 255, 15, 31, 255, 63, 63, 63, 255, 255, 15, 255, 255];
                return ((h_m_regs[r]) & ((mask[r] ?? 0)));
            }
            else {
                return h_m_regs[r];
            }
        }
    }
    function __deref_ay8910_read_ym(runtime, p) {
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
    function method_device_reset(runtime) {
        const members = runtime.members;
        method_ay8910_reset_ym(runtime);
    }
    function method_address_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_ay8910_write_ym(runtime, 0, data);
    }
    function method_data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_ay8910_write_ym(runtime, 1, data);
    }
    function method_write_bc1_bc2(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        switch (((offset) & (3))) {
            case 0:
                {
                    method_address_w(runtime, data);
                    break;
                }
            case 1:
                {
                    break;
                }
            case 2:
                {
                    method_data_w(runtime, data);
                    break;
                }
            case 3:
                {
                    method_address_w(runtime, data);
                    break;
                }
        }
    }
    function method_set_pin26_low_w(runtime, data = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        data = ((data) & 0xff);
        const h_m_feature = members.m_feature ?? 0;
        if ((((((h_m_feature) & (1))) && ((((((members.m_flags ?? 0)) & (16))) ? 0 : 1))) ? 1 : 0)) {
            members.m_flags = ((((members.m_flags) | (16))) | 0);
            method_ay_set_clock(runtime, (__L0 ? __L0() : runtime.macro("clock")));
        }
    }
    function method_set_pin26_high_w(runtime, data = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        data = ((data) & 0xff);
        const h_m_feature = members.m_feature ?? 0;
        if ((((((h_m_feature) & (1))) && ((((members.m_flags ?? 0)) & (16)))) ? 1 : 0)) {
            members.m_flags = ((((members.m_flags) & (-17))) | 0);
            method_ay_set_clock(runtime, (__L0 ? __L0() : runtime.macro("clock")));
        }
    }
    function method_set_type(runtime, psg_type) {
        const members = runtime.members;
        const h_ay8910_param = members.ay8910_param ?? 0;
        const h_ym2149_param = members.ym2149_param ?? 0;
        const h_ym2149_param_env = members.ym2149_param_env ?? 0;
        members.m_type = psg_type;
        if (((Number(psg_type) === Number(0)) ? 1 : 0)) {
            members.m_env_step_mask = ((15) & 0xff);
            members.m_step = ((2) | 0);
            members.m_zero_is_off = ((1) | 0);
            members.m_par = h_ay8910_param;
            members.m_par_env = h_ay8910_param;
        }
        else {
            members.m_env_step_mask = ((31) & 0xff);
            members.m_step = ((1) | 0);
            members.m_zero_is_off = ((0) | 0);
            members.m_par = h_ym2149_param;
            members.m_par_env = h_ym2149_param_env;
        }
    }
    function method_set_flags(runtime, flags) {
        const members = runtime.members;
        members.m_flags = ((flags) | 0);
    }
    function method_set_psg_type(runtime, psg_type) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        if (((((h_m_feature) & (8))) ? 0 : 1)) {
            method_set_type(runtime, psg_type);
        }
    }
    function method_set_resistors_load(runtime, res_load0, res_load1, res_load2) {
        const members = runtime.members;
        const h_m_res_load = members.m_res_load ?? 0;
        h_m_res_load[0] = res_load0;
        h_m_res_load[1] = res_load1;
        h_m_res_load[2] = res_load2;
    }
    function method_port_a_read_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
    }
    function __deref_port_a_read_callback(runtime, p) {
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
    function method_port_b_read_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
    }
    function __deref_port_b_read_callback(runtime, p) {
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
    function method_port_a_write_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
    }
    function __deref_port_a_write_callback(runtime, p) {
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
    function method_port_b_write_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
    }
    function __deref_port_b_write_callback(runtime, p) {
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
    function method_data_r(runtime) {
        const members = runtime.members;
        return ((method_ay8910_read_ym(runtime)) & 0xff);
    }
    function method_reset_w(runtime, data = 0) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_ay8910_reset_ym(runtime);
    }
    function method_data_address_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_ay8910_write_ym(runtime, (((~offset)) & (1)), data);
    }
    function method_address_data_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_ay8910_write_ym(runtime, ((offset) & (1)), data);
    }
    function method_ay8910_device__set_flags(runtime, flags) {
        const members = runtime.members;
        members.m_flags = ((flags) | 0);
    }
    function method_ay8910_device__set_psg_type(runtime, psg_type) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        if (((((h_m_feature) & (8))) ? 0 : 1)) {
            method_set_type(runtime, psg_type);
        }
    }
    function method_ay8910_device__set_resistors_load(runtime, res_load0, res_load1, res_load2) {
        const members = runtime.members;
        const h_m_res_load = members.m_res_load ?? 0;
        h_m_res_load[0] = res_load0;
        h_m_res_load[1] = res_load1;
        h_m_res_load[2] = res_load2;
    }
    function method_ay8910_device__port_a_read_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ay8910_device__port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
    }
    function __deref_ay8910_device__port_a_read_callback(runtime, p) {
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
    function method_ay8910_device__port_b_read_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ay8910_device__port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
    }
    function __deref_ay8910_device__port_b_read_callback(runtime, p) {
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
    function method_ay8910_device__port_a_write_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ay8910_device__port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
    }
    function __deref_ay8910_device__port_a_write_callback(runtime, p) {
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
    function method_ay8910_device__port_b_write_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ay8910_device__port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
    }
    function __deref_ay8910_device__port_b_write_callback(runtime, p) {
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
    function method_ay8910_device__data_r(runtime) {
        const members = runtime.members;
        return ((method_ay8910_read_ym(runtime)) & 0xff);
    }
    function method_ay8910_device__reset_w(runtime, data = 0) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_ay8910_reset_ym(runtime);
    }
    function method_ay8910_device__data_address_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_ay8910_write_ym(runtime, (((~offset)) & (1)), data);
    }
    function method_ay8910_device__address_data_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_ay8910_write_ym(runtime, ((offset) & (1)), data);
    }
    function method_ay8910_device__noise_rng_tick(runtime) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        if (((h_m_feature) & (8))) {
            members.m_rng = (((((((members.m_rng ?? 0)) >>> (1))) | (((((((((members.m_rng ?? 0)) >>> (0)) & 1)) ^ (((((members.m_rng ?? 0)) >>> (2)) & 1)))) << (16))))) >>> 0);
        }
        else {
            members.m_rng = (((((((members.m_rng ?? 0)) >>> (1))) | (((((((((members.m_rng ?? 0)) >>> (0)) & 1)) ^ (((((members.m_rng ?? 0)) >>> (3)) & 1)))) << (16))))) >>> 0);
        }
    }
    function method_ay8910_device__tone_enable(runtime, chan) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return (((h_m_regs[7]) >>> (chan)) & 1);
    }
    function method_ay8910_device__tone_volume(runtime, tone) {
        const members = runtime.members;
        const __pointee_tone = __deref_ay8910_device__tone_volume(runtime, tone);
        return ((((__pointee_tone.volume) & (((method_is_expanded_mode(runtime)) ? (31) : (15))))) & 0xff);
    }
    function __deref_ay8910_device__tone_volume(runtime, p) {
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
    function method_ay8910_device__tone_envelope(runtime, tone) {
        const members = runtime.members;
        const __pointee_tone = __deref_ay8910_device__tone_envelope(runtime, tone);
        const h_m_feature = members.m_feature ?? 0;
        return ((((((__pointee_tone.volume) >>> (((method_is_expanded_mode(runtime)) ? (5) : (4))))) & (((((h_m_feature) & (4))) ? (3) : (1))))) & 0xff);
    }
    function __deref_ay8910_device__tone_envelope(runtime, p) {
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
    function method_ay8910_device__tone_duty(runtime, tone) {
        const members = runtime.members;
        const __pointee_tone = __deref_ay8910_device__tone_duty(runtime, tone);
        return ((((method_is_expanded_mode(runtime)) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
    }
    function __deref_ay8910_device__tone_duty(runtime, p) {
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
    function method_ay8910_device__get_envelope_chan(runtime, chan) {
        const members = runtime.members;
        return ((((method_is_expanded_mode(runtime)) ? (chan) : (0))) & 0xff);
    }
    function method_ay8910_device__noise_enable(runtime, chan) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return (((h_m_regs[7]) >>> (((3) + (chan)))) & 1);
    }
    function method_ay8910_device__noise_period(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((method_is_expanded_mode(runtime)) ? (((h_m_regs[6]) & (255))) : (((h_m_regs[6]) & (31))))) & 0xff);
    }
    function method_ay8910_device__noise_output(runtime) {
        const members = runtime.members;
        return ((((method_is_expanded_mode(runtime)) ? ((((members.m_noise_out ?? 0)) & (1))) : ((((members.m_rng ?? 0)) & (1))))) & 0xff);
    }
    function method_ay8910_device__is_expanded_mode(runtime) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        return (((((h_m_feature) & (8))) && (((Number((((members.m_mode ?? 0)) & (14))) === Number(10)) ? 1 : 0))) ? 1 : 0);
    }
    function method_ay8910_device__get_register_bank(runtime) {
        const members = runtime.members;
        return ((((method_is_expanded_mode(runtime)) ? ((((((members.m_mode ?? 0)) & (1))) << (4))) : (0))) & 0xff);
    }
    function method_ay8910_device__noise_and(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[25]) & (255))) & 0xff);
    }
    function method_ay8910_device__noise_or(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[26]) & (255))) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "mix_3D": method_mix_3D,
        "tone_envelope": method_tone_envelope,
        "is_expanded_mode": method_is_expanded_mode,
        "get_envelope_chan": method_get_envelope_chan,
        "tone_volume": method_tone_volume,
        "ay8910_write_reg": method_ay8910_write_reg,
        "sound_stream_update": method_sound_stream_update,
        "tone_duty": method_tone_duty,
        "noise_period": method_noise_period,
        "noise_and": method_noise_and,
        "noise_or": method_noise_or,
        "noise_rng_tick": method_noise_rng_tick,
        "tone_enable": method_tone_enable,
        "noise_output": method_noise_output,
        "noise_enable": method_noise_enable,
        "build_mixer_table": method_build_mixer_table,
        "build_mosfet_resistor_table": method_build_mosfet_resistor_table,
        "build_single_table": method_build_single_table,
        "build_3D_table": method_build_3D_table,
        "device_start": method_device_start,
        "ay_set_clock": method_ay_set_clock,
        "ay8910_reset_ym": method_ay8910_reset_ym,
        "device_clock_changed": method_device_clock_changed,
        "ay8910_write_ym": method_ay8910_write_ym,
        "get_register_bank": method_get_register_bank,
        "ay8910_read_ym": method_ay8910_read_ym,
        "device_reset": method_device_reset,
        "address_w": method_address_w,
        "data_w": method_data_w,
        "write_bc1_bc2": method_write_bc1_bc2,
        "set_pin26_low_w": method_set_pin26_low_w,
        "set_pin26_high_w": method_set_pin26_high_w,
        "set_type": method_set_type,
        "set_flags": method_set_flags,
        "set_psg_type": method_set_psg_type,
        "set_resistors_load": method_set_resistors_load,
        "port_a_read_callback": method_port_a_read_callback,
        "port_b_read_callback": method_port_b_read_callback,
        "port_a_write_callback": method_port_a_write_callback,
        "port_b_write_callback": method_port_b_write_callback,
        "data_r": method_data_r,
        "reset_w": method_reset_w,
        "data_address_w": method_data_address_w,
        "address_data_w": method_address_data_w,
        "ay8910_device::set_flags": method_ay8910_device__set_flags,
        "ay8910_device::set_psg_type": method_ay8910_device__set_psg_type,
        "ay8910_device::set_resistors_load": method_ay8910_device__set_resistors_load,
        "ay8910_device::port_a_read_callback": method_ay8910_device__port_a_read_callback,
        "ay8910_device::port_b_read_callback": method_ay8910_device__port_b_read_callback,
        "ay8910_device::port_a_write_callback": method_ay8910_device__port_a_write_callback,
        "ay8910_device::port_b_write_callback": method_ay8910_device__port_b_write_callback,
        "ay8910_device::data_r": method_ay8910_device__data_r,
        "ay8910_device::reset_w": method_ay8910_device__reset_w,
        "ay8910_device::data_address_w": method_ay8910_device__data_address_w,
        "ay8910_device::address_data_w": method_ay8910_device__address_data_w,
        "ay8910_device::noise_rng_tick": method_ay8910_device__noise_rng_tick,
        "ay8910_device::tone_enable": method_ay8910_device__tone_enable,
        "ay8910_device::tone_volume": method_ay8910_device__tone_volume,
        "ay8910_device::tone_envelope": method_ay8910_device__tone_envelope,
        "ay8910_device::tone_duty": method_ay8910_device__tone_duty,
        "ay8910_device::get_envelope_chan": method_ay8910_device__get_envelope_chan,
        "ay8910_device::noise_enable": method_ay8910_device__noise_enable,
        "ay8910_device::noise_period": method_ay8910_device__noise_period,
        "ay8910_device::noise_output": method_ay8910_device__noise_output,
        "ay8910_device::is_expanded_mode": method_ay8910_device__is_expanded_mode,
        "ay8910_device::get_register_bank": method_ay8910_device__get_register_bank,
        "ay8910_device::noise_and": method_ay8910_device__noise_and,
        "ay8910_device::noise_or": method_ay8910_device__noise_or
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["VECTOR_OF", "clock", "fatalerror", "m_port_a_read_cb", "m_port_a_write_cb", "m_port_b_read_cb", "m_port_b_write_cb", "name", "stream_alloc", "tag", "type"];
definition.compiledStructMethods = {
    "tone_t": (() => {
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
        const cppScratch_build_single_table_temp = new Float64Array(new Uint8Array(Math.max(0, Number(32))));
        function method_reset(runtime) {
            const members = runtime.members;
            members.period = ((0) >>> 0);
            members.volume = ((0) & 0xff);
            members.duty = ((0) & 0xff);
            members.count = ((0) | 0);
            members.duty_cycle = ((0) & 0xff);
            members.output = ((0) & 0xff);
        }
        function method_set_period(runtime, fine, coarse) {
            const members = runtime.members;
            fine = ((fine) & 0xff);
            coarse = ((coarse) & 0xff);
            members.period = ((((fine) | (((coarse) << (8))))) >>> 0);
        }
        function method_set_volume(runtime, val) {
            const members = runtime.members;
            val = ((val) & 0xff);
            members.volume = ((val) & 0xff);
        }
        function method_set_duty(runtime, val) {
            const members = runtime.members;
            val = ((val) & 0xff);
            members.duty = ((val) & 0xff);
        }
        function method_tone_duty(runtime, tone) {
            const members = runtime.members;
            const __pointee_tone = __deref_tone_duty(runtime, tone);
            return ((((runtime.invoke("is_expanded_mode")) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
        }
        function __deref_tone_duty(runtime, p) {
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
        function method_get_envelope_chan(runtime, chan) {
            const members = runtime.members;
            return ((((runtime.invoke("is_expanded_mode")) ? (chan) : (0))) & 0xff);
        }
        function method_tone_volume(runtime, tone) {
            const members = runtime.members;
            const __pointee_tone = __deref_tone_volume(runtime, tone);
            return ((((__pointee_tone.volume) & (((runtime.invoke("is_expanded_mode")) ? (31) : (15))))) & 0xff);
        }
        function __deref_tone_volume(runtime, p) {
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
        function method_build_mosfet_resistor_table(runtime, par, rd, tab) {
            const members = runtime.members;
            for (let j = ((0) | 0); ((Number(j) < Number(par.m_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                let Vd = 5;
                let Vg = runtime.subtract(par.m_Vg, par.m_Vth);
                let kn = ((runtime.readIndex(par.m_Kn, j)) / (1000000));
                let p2 = ((((1) / (((((2) * (kn))) * (rd))))) + (Vg));
                let Vs = ((p2) - (Math.sqrt(Number(((((p2) * (p2))) - (((Vg) * (Vg))))))));
                let res = ((rd) * (((((Vd) / (Vs))) - (1))));
                runtime.writeIndex(tab, j, res);
            }
        }
        function method_build_single_table(runtime, rl, par, normalize, tab, zero_is_off) {
            const members = runtime.members;
            let rt = 0;
            let rw = 0;
            let temp = cppScratch_build_single_table_temp.fill(0);
            let min = 10;
            let max = 0;
            for (let j = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                rt = __add_build_single_table(runtime, ((1) / (__deref_build_single_table(runtime, par).r_down)), ((1) / (rl)));
                rw = ((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)));
                rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)))));
                if ((((((zero_is_off) && ((((j) === (0)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
                    rw = ((rw) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
                    rt = ((rt) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
                }
                temp[j] = ((rw) / (rt));
                if (((Number((temp[j] ?? 0)) < Number(min)) ? 1 : 0)) {
                    min = (temp[j] ?? 0);
                }
                if (((Number((temp[j] ?? 0)) > Number(max)) ? 1 : 0)) {
                    max = (temp[j] ?? 0);
                }
            }
            if (normalize) {
                for (let j = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    runtime.writeIndex(tab, j, ((((1) * ((((((((temp[j] ?? 0)) - (min))) / (((max) - (min))))) - (0.25))))) * (0.5)));
                }
            }
            else {
                for (let j = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    runtime.writeIndex(tab, j, ((1) * ((temp[j] ?? 0))));
                }
            }
        }
        function __add_build_single_table(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function __deref_build_single_table(runtime, p) {
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
        function method_build_3D_table(runtime, rl, par, par_env, normalize, factor, zero_is_off, tab) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["VECTOR_OF"];
            let min = 10;
            let max = 0;
            let temp = (__L0 ? __L0("double", 262144, 0) : runtime.macro("VECTOR_OF", "double", 262144, 0));
            for (let e = ((0) | 0); (((e) < (8)) ? 1 : 0); e = ((((e) + (1))) | 0)) {
                let par_ch1 = ((((e) & (1))) ? (par_env) : (par));
                let par_ch1$s = undefined, par_ch1$o = 0;
                if (ArrayBuffer.isView(par_ch1) || Array.isArray(par_ch1))
                    par_ch1$s = par_ch1;
                else if (par_ch1 !== null && typeof par_ch1 === 'object' && par_ch1.generatedPointer === true && par_ch1.path === undefined && par_ch1.target === undefined && (ArrayBuffer.isView(par_ch1.source) || Array.isArray(par_ch1.source))) {
                    par_ch1$s = par_ch1.source;
                    par_ch1$o = par_ch1.offset;
                }
                let par_ch2 = ((((e) & (2))) ? (par_env) : (par));
                let par_ch2$s = undefined, par_ch2$o = 0;
                if (ArrayBuffer.isView(par_ch2) || Array.isArray(par_ch2))
                    par_ch2$s = par_ch2;
                else if (par_ch2 !== null && typeof par_ch2 === 'object' && par_ch2.generatedPointer === true && par_ch2.path === undefined && par_ch2.target === undefined && (ArrayBuffer.isView(par_ch2.source) || Array.isArray(par_ch2.source))) {
                    par_ch2$s = par_ch2.source;
                    par_ch2$o = par_ch2.offset;
                }
                let par_ch3 = ((((e) & (4))) ? (par_env) : (par));
                let par_ch3$s = undefined, par_ch3$o = 0;
                if (ArrayBuffer.isView(par_ch3) || Array.isArray(par_ch3))
                    par_ch3$s = par_ch3;
                else if (par_ch3 !== null && typeof par_ch3 === 'object' && par_ch3.generatedPointer === true && par_ch3.path === undefined && par_ch3.target === undefined && (ArrayBuffer.isView(par_ch3.source) || Array.isArray(par_ch3.source))) {
                    par_ch3$s = par_ch3.source;
                    par_ch3$o = par_ch3.offset;
                }
                for (let j1 = ((0) | 0); ((Number(j1) < Number(__deref_build_3D_table(runtime, par_ch1).res_count)) ? 1 : 0); j1 = ((((j1) + (1))) | 0)) {
                    for (let j2 = ((0) | 0); ((Number(j2) < Number(__deref_build_3D_table(runtime, par_ch2).res_count)) ? 1 : 0); j2 = ((((j2) + (1))) | 0)) {
                        for (let j3 = ((0) | 0); ((Number(j3) < Number(__deref_build_3D_table(runtime, par_ch3).res_count)) ? 1 : 0); j3 = ((((j3) + (1))) | 0)) {
                            let n = 0;
                            if (zero_is_off) {
                                n = ((((((((j1) !== (0)) ? 1 : 0)) || (((e) & (1)))) ? 1 : 0)) ? (1) : (0));
                                n = ((n) + (((((((((j2) !== (0)) ? 1 : 0)) || (((e) & (2)))) ? 1 : 0)) ? (1) : (0))));
                                n = ((n) + (((((((((j3) !== (0)) ? 1 : 0)) || (((e) & (4)))) ? 1 : 0)) ? (1) : (0))));
                            }
                            else {
                                n = 3;
                            }
                            let rt = __add_build_3D_table(runtime, __add_build_3D_table(runtime, ((n) / (__deref_build_3D_table(runtime, par).r_up)), ((3) / (__deref_build_3D_table(runtime, par).r_down))), ((1) / (rl)));
                            let rw = ((n) / (__deref_build_3D_table(runtime, par).r_up));
                            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
                            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
                            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
                            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
                            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
                            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
                            let indx = ((((((((((e) << (15))) | (((j3) << (10))))) | (((j2) << (5))))) | (j1))) | 0);
                            runtime.writeIndex(temp, indx, ((rw) / (rt)));
                            if (((Number(runtime.readIndex(temp, indx)) < Number(min)) ? 1 : 0)) {
                                min = runtime.readIndex(temp, indx);
                            }
                            if (((Number(runtime.readIndex(temp, indx)) > Number(max)) ? 1 : 0)) {
                                max = runtime.readIndex(temp, indx);
                            }
                        }
                    }
                }
            }
            if (normalize) {
                for (let j = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    runtime.writeIndex(tab, j, ((((1) * (((((runtime.readIndex(temp, j)) - (min))) / (((max) - (min))))))) * (factor)));
                }
            }
            else {
                for (let j = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    runtime.writeIndex(tab, j, ((1) * (runtime.readIndex(temp, j))));
                }
            }
        }
        function __add_build_3D_table(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function __deref_build_3D_table(runtime, p) {
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
        function method_write_bc1_bc2(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            switch (((offset) & (3))) {
                case 0:
                    {
                        method_address_w(runtime, data);
                        break;
                    }
                case 1:
                    {
                        break;
                    }
                case 2:
                    {
                        method_data_w(runtime, data);
                        break;
                    }
                case 3:
                    {
                        method_address_w(runtime, data);
                        break;
                    }
            }
        }
        function method_address_w(runtime, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", 0, data);
        }
        function method_data_w(runtime, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", 1, data);
        }
        function method_port_a_read_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
        }
        function __deref_port_a_read_callback(runtime, p) {
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
        function method_port_b_read_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
        }
        function __deref_port_b_read_callback(runtime, p) {
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
        function method_port_a_write_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
        }
        function __deref_port_a_write_callback(runtime, p) {
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
        function method_port_b_write_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
        }
        function __deref_port_b_write_callback(runtime, p) {
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
        function method_data_r(runtime) {
            const members = runtime.members;
            return ((runtime.invoke("ay8910_read_ym")) & 0xff);
        }
        function method_data_address_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", (((~offset)) & (1)), data);
        }
        function method_address_data_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", ((offset) & (1)), data);
        }
        function method_ay8910_device__port_a_read_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ay8910_device__port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
        }
        function __deref_ay8910_device__port_a_read_callback(runtime, p) {
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
        function method_ay8910_device__port_b_read_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ay8910_device__port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
        }
        function __deref_ay8910_device__port_b_read_callback(runtime, p) {
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
        function method_ay8910_device__port_a_write_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ay8910_device__port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
        }
        function __deref_ay8910_device__port_a_write_callback(runtime, p) {
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
        function method_ay8910_device__port_b_write_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ay8910_device__port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
        }
        function __deref_ay8910_device__port_b_write_callback(runtime, p) {
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
        function method_ay8910_device__data_r(runtime) {
            const members = runtime.members;
            return ((runtime.invoke("ay8910_read_ym")) & 0xff);
        }
        function method_ay8910_device__data_address_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", (((~offset)) & (1)), data);
        }
        function method_ay8910_device__address_data_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", ((offset) & (1)), data);
        }
        function method_ay8910_device__tone_volume(runtime, tone) {
            const members = runtime.members;
            const __pointee_tone = __deref_ay8910_device__tone_volume(runtime, tone);
            return ((((__pointee_tone.volume) & (((runtime.invoke("is_expanded_mode")) ? (31) : (15))))) & 0xff);
        }
        function __deref_ay8910_device__tone_volume(runtime, p) {
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
        function method_ay8910_device__tone_duty(runtime, tone) {
            const members = runtime.members;
            const __pointee_tone = __deref_ay8910_device__tone_duty(runtime, tone);
            return ((((runtime.invoke("is_expanded_mode")) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
        }
        function __deref_ay8910_device__tone_duty(runtime, p) {
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
        function method_ay8910_device__get_envelope_chan(runtime, chan) {
            const members = runtime.members;
            return ((((runtime.invoke("is_expanded_mode")) ? (chan) : (0))) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "reset": method_reset,
            "set_period": method_set_period,
            "set_volume": method_set_volume,
            "set_duty": method_set_duty,
            "tone_duty": method_tone_duty,
            "get_envelope_chan": method_get_envelope_chan,
            "tone_volume": method_tone_volume,
            "build_mosfet_resistor_table": method_build_mosfet_resistor_table,
            "build_single_table": method_build_single_table,
            "build_3D_table": method_build_3D_table,
            "write_bc1_bc2": method_write_bc1_bc2,
            "address_w": method_address_w,
            "data_w": method_data_w,
            "port_a_read_callback": method_port_a_read_callback,
            "port_b_read_callback": method_port_b_read_callback,
            "port_a_write_callback": method_port_a_write_callback,
            "port_b_write_callback": method_port_b_write_callback,
            "data_r": method_data_r,
            "data_address_w": method_data_address_w,
            "address_data_w": method_address_data_w,
            "ay8910_device::port_a_read_callback": method_ay8910_device__port_a_read_callback,
            "ay8910_device::port_b_read_callback": method_ay8910_device__port_b_read_callback,
            "ay8910_device::port_a_write_callback": method_ay8910_device__port_a_write_callback,
            "ay8910_device::port_b_write_callback": method_ay8910_device__port_b_write_callback,
            "ay8910_device::data_r": method_ay8910_device__data_r,
            "ay8910_device::data_address_w": method_ay8910_device__data_address_w,
            "ay8910_device::address_data_w": method_ay8910_device__address_data_w,
            "ay8910_device::tone_volume": method_ay8910_device__tone_volume,
            "ay8910_device::tone_duty": method_ay8910_device__tone_duty,
            "ay8910_device::get_envelope_chan": method_ay8910_device__get_envelope_chan
        };
        return __methodTable;
    })(),
    "envelope_t": (() => {
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
        const cppScratch_build_single_table_temp = new Float64Array(new Uint8Array(Math.max(0, Number(32))));
        function method_reset(runtime) {
            const members = runtime.members;
            members.period = ((0) >>> 0);
            members.count = ((0) | 0);
            members.step = ((0) << 24 >> 24);
            members.volume = ((0) >>> 0);
            members.hold = ((0) & 0xff);
            members.alternate = ((0) & 0xff);
            members.attack = ((0) & 0xff);
            members.holding = ((0) & 0xff);
        }
        function method_set_period(runtime, fine, coarse) {
            const members = runtime.members;
            fine = ((fine) & 0xff);
            coarse = ((coarse) & 0xff);
            members.period = ((((fine) | (((coarse) << (8))))) >>> 0);
        }
        function method_set_shape(runtime, shape, mask) {
            const members = runtime.members;
            shape = ((shape) & 0xff);
            mask = ((mask) & 0xff);
            members.attack = ((((((shape) & (4))) ? (mask) : (0))) & 0xff);
            if (((Number(((shape) & (8))) === Number(0)) ? 1 : 0)) {
                members.hold = ((1) & 0xff);
                members.alternate = (((members.attack ?? 0)) & 0xff);
            }
            else {
                members.hold = ((((shape) & (1))) & 0xff);
                members.alternate = ((((shape) & (2))) & 0xff);
            }
            members.step = ((mask) << 24 >> 24);
            members.holding = ((0) & 0xff);
            members.volume = (((((members.step ?? 0)) ^ ((members.attack ?? 0)))) >>> 0);
        }
        function method_tone_duty(runtime, tone) {
            const members = runtime.members;
            const __pointee_tone = __deref_tone_duty(runtime, tone);
            return ((((runtime.invoke("is_expanded_mode")) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
        }
        function __deref_tone_duty(runtime, p) {
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
        function method_get_envelope_chan(runtime, chan) {
            const members = runtime.members;
            return ((((runtime.invoke("is_expanded_mode")) ? (chan) : (0))) & 0xff);
        }
        function method_tone_volume(runtime, tone) {
            const members = runtime.members;
            const __pointee_tone = __deref_tone_volume(runtime, tone);
            return ((((__pointee_tone.volume) & (((runtime.invoke("is_expanded_mode")) ? (31) : (15))))) & 0xff);
        }
        function __deref_tone_volume(runtime, p) {
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
        function method_build_mosfet_resistor_table(runtime, par, rd, tab) {
            const members = runtime.members;
            for (let j = ((0) | 0); ((Number(j) < Number(par.m_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                let Vd = 5;
                let Vg = runtime.subtract(par.m_Vg, par.m_Vth);
                let kn = ((runtime.readIndex(par.m_Kn, j)) / (1000000));
                let p2 = ((((1) / (((((2) * (kn))) * (rd))))) + (Vg));
                let Vs = ((p2) - (Math.sqrt(Number(((((p2) * (p2))) - (((Vg) * (Vg))))))));
                let res = ((rd) * (((((Vd) / (Vs))) - (1))));
                runtime.writeIndex(tab, j, res);
            }
        }
        function method_build_single_table(runtime, rl, par, normalize, tab, zero_is_off) {
            const members = runtime.members;
            let rt = 0;
            let rw = 0;
            let temp = cppScratch_build_single_table_temp.fill(0);
            let min = 10;
            let max = 0;
            for (let j = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                rt = __add_build_single_table(runtime, ((1) / (__deref_build_single_table(runtime, par).r_down)), ((1) / (rl)));
                rw = ((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)));
                rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_single_table(runtime, par).res, j)))));
                if ((((((zero_is_off) && ((((j) === (0)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
                    rw = ((rw) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
                    rt = ((rt) + (((1) / (__deref_build_single_table(runtime, par).r_up))));
                }
                temp[j] = ((rw) / (rt));
                if (((Number((temp[j] ?? 0)) < Number(min)) ? 1 : 0)) {
                    min = (temp[j] ?? 0);
                }
                if (((Number((temp[j] ?? 0)) > Number(max)) ? 1 : 0)) {
                    max = (temp[j] ?? 0);
                }
            }
            if (normalize) {
                for (let j = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    runtime.writeIndex(tab, j, ((((1) * ((((((((temp[j] ?? 0)) - (min))) / (((max) - (min))))) - (0.25))))) * (0.5)));
                }
            }
            else {
                for (let j = ((0) | 0); ((Number(j) < Number(__deref_build_single_table(runtime, par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    runtime.writeIndex(tab, j, ((1) * ((temp[j] ?? 0))));
                }
            }
        }
        function __add_build_single_table(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function __deref_build_single_table(runtime, p) {
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
        function method_build_3D_table(runtime, rl, par, par_env, normalize, factor, zero_is_off, tab) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["VECTOR_OF"];
            let min = 10;
            let max = 0;
            let temp = (__L0 ? __L0("double", 262144, 0) : runtime.macro("VECTOR_OF", "double", 262144, 0));
            for (let e = ((0) | 0); (((e) < (8)) ? 1 : 0); e = ((((e) + (1))) | 0)) {
                let par_ch1 = ((((e) & (1))) ? (par_env) : (par));
                let par_ch1$s = undefined, par_ch1$o = 0;
                if (ArrayBuffer.isView(par_ch1) || Array.isArray(par_ch1))
                    par_ch1$s = par_ch1;
                else if (par_ch1 !== null && typeof par_ch1 === 'object' && par_ch1.generatedPointer === true && par_ch1.path === undefined && par_ch1.target === undefined && (ArrayBuffer.isView(par_ch1.source) || Array.isArray(par_ch1.source))) {
                    par_ch1$s = par_ch1.source;
                    par_ch1$o = par_ch1.offset;
                }
                let par_ch2 = ((((e) & (2))) ? (par_env) : (par));
                let par_ch2$s = undefined, par_ch2$o = 0;
                if (ArrayBuffer.isView(par_ch2) || Array.isArray(par_ch2))
                    par_ch2$s = par_ch2;
                else if (par_ch2 !== null && typeof par_ch2 === 'object' && par_ch2.generatedPointer === true && par_ch2.path === undefined && par_ch2.target === undefined && (ArrayBuffer.isView(par_ch2.source) || Array.isArray(par_ch2.source))) {
                    par_ch2$s = par_ch2.source;
                    par_ch2$o = par_ch2.offset;
                }
                let par_ch3 = ((((e) & (4))) ? (par_env) : (par));
                let par_ch3$s = undefined, par_ch3$o = 0;
                if (ArrayBuffer.isView(par_ch3) || Array.isArray(par_ch3))
                    par_ch3$s = par_ch3;
                else if (par_ch3 !== null && typeof par_ch3 === 'object' && par_ch3.generatedPointer === true && par_ch3.path === undefined && par_ch3.target === undefined && (ArrayBuffer.isView(par_ch3.source) || Array.isArray(par_ch3.source))) {
                    par_ch3$s = par_ch3.source;
                    par_ch3$o = par_ch3.offset;
                }
                for (let j1 = ((0) | 0); ((Number(j1) < Number(__deref_build_3D_table(runtime, par_ch1).res_count)) ? 1 : 0); j1 = ((((j1) + (1))) | 0)) {
                    for (let j2 = ((0) | 0); ((Number(j2) < Number(__deref_build_3D_table(runtime, par_ch2).res_count)) ? 1 : 0); j2 = ((((j2) + (1))) | 0)) {
                        for (let j3 = ((0) | 0); ((Number(j3) < Number(__deref_build_3D_table(runtime, par_ch3).res_count)) ? 1 : 0); j3 = ((((j3) + (1))) | 0)) {
                            let n = 0;
                            if (zero_is_off) {
                                n = ((((((((j1) !== (0)) ? 1 : 0)) || (((e) & (1)))) ? 1 : 0)) ? (1) : (0));
                                n = ((n) + (((((((((j2) !== (0)) ? 1 : 0)) || (((e) & (2)))) ? 1 : 0)) ? (1) : (0))));
                                n = ((n) + (((((((((j3) !== (0)) ? 1 : 0)) || (((e) & (4)))) ? 1 : 0)) ? (1) : (0))));
                            }
                            else {
                                n = 3;
                            }
                            let rt = __add_build_3D_table(runtime, __add_build_3D_table(runtime, ((n) / (__deref_build_3D_table(runtime, par).r_up)), ((3) / (__deref_build_3D_table(runtime, par).r_down))), ((1) / (rl)));
                            let rw = ((n) / (__deref_build_3D_table(runtime, par).r_up));
                            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
                            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch1).res, j1)))));
                            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
                            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch2).res, j2)))));
                            rw = ((rw) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
                            rt = ((rt) + (((1) / (runtime.readIndex(__deref_build_3D_table(runtime, par_ch3).res, j3)))));
                            let indx = ((((((((((e) << (15))) | (((j3) << (10))))) | (((j2) << (5))))) | (j1))) | 0);
                            runtime.writeIndex(temp, indx, ((rw) / (rt)));
                            if (((Number(runtime.readIndex(temp, indx)) < Number(min)) ? 1 : 0)) {
                                min = runtime.readIndex(temp, indx);
                            }
                            if (((Number(runtime.readIndex(temp, indx)) > Number(max)) ? 1 : 0)) {
                                max = runtime.readIndex(temp, indx);
                            }
                        }
                    }
                }
            }
            if (normalize) {
                for (let j = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    runtime.writeIndex(tab, j, ((((1) * (((((runtime.readIndex(temp, j)) - (min))) / (((max) - (min))))))) * (factor)));
                }
            }
            else {
                for (let j = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    runtime.writeIndex(tab, j, ((1) * (runtime.readIndex(temp, j))));
                }
            }
        }
        function __add_build_3D_table(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function __deref_build_3D_table(runtime, p) {
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
        function method_write_bc1_bc2(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            switch (((offset) & (3))) {
                case 0:
                    {
                        method_address_w(runtime, data);
                        break;
                    }
                case 1:
                    {
                        break;
                    }
                case 2:
                    {
                        method_data_w(runtime, data);
                        break;
                    }
                case 3:
                    {
                        method_address_w(runtime, data);
                        break;
                    }
            }
        }
        function method_address_w(runtime, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", 0, data);
        }
        function method_data_w(runtime, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", 1, data);
        }
        function method_port_a_read_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
        }
        function __deref_port_a_read_callback(runtime, p) {
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
        function method_port_b_read_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
        }
        function __deref_port_b_read_callback(runtime, p) {
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
        function method_port_a_write_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
        }
        function __deref_port_a_write_callback(runtime, p) {
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
        function method_port_b_write_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
        }
        function __deref_port_b_write_callback(runtime, p) {
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
        function method_data_r(runtime) {
            const members = runtime.members;
            return ((runtime.invoke("ay8910_read_ym")) & 0xff);
        }
        function method_data_address_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", (((~offset)) & (1)), data);
        }
        function method_address_data_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", ((offset) & (1)), data);
        }
        function method_ay8910_device__port_a_read_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ay8910_device__port_a_read_callback(runtime, members.m_port_a_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_read_cb, "bind"));
        }
        function __deref_ay8910_device__port_a_read_callback(runtime, p) {
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
        function method_ay8910_device__port_b_read_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ay8910_device__port_b_read_callback(runtime, members.m_port_b_read_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_read_cb, "bind"));
        }
        function __deref_ay8910_device__port_b_read_callback(runtime, p) {
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
        function method_ay8910_device__port_a_write_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ay8910_device__port_a_write_callback(runtime, members.m_port_a_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_a_write_cb, "bind"));
        }
        function __deref_ay8910_device__port_a_write_callback(runtime, p) {
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
        function method_ay8910_device__port_b_write_callback(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ay8910_device__port_b_write_callback(runtime, members.m_port_b_write_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_b_write_cb, "bind"));
        }
        function __deref_ay8910_device__port_b_write_callback(runtime, p) {
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
        function method_ay8910_device__data_r(runtime) {
            const members = runtime.members;
            return ((runtime.invoke("ay8910_read_ym")) & 0xff);
        }
        function method_ay8910_device__data_address_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", (((~offset)) & (1)), data);
        }
        function method_ay8910_device__address_data_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.invoke("ay8910_write_ym", ((offset) & (1)), data);
        }
        function method_ay8910_device__tone_volume(runtime, tone) {
            const members = runtime.members;
            const __pointee_tone = __deref_ay8910_device__tone_volume(runtime, tone);
            return ((((__pointee_tone.volume) & (((runtime.invoke("is_expanded_mode")) ? (31) : (15))))) & 0xff);
        }
        function __deref_ay8910_device__tone_volume(runtime, p) {
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
        function method_ay8910_device__tone_duty(runtime, tone) {
            const members = runtime.members;
            const __pointee_tone = __deref_ay8910_device__tone_duty(runtime, tone);
            return ((((runtime.invoke("is_expanded_mode")) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
        }
        function __deref_ay8910_device__tone_duty(runtime, p) {
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
        function method_ay8910_device__get_envelope_chan(runtime, chan) {
            const members = runtime.members;
            return ((((runtime.invoke("is_expanded_mode")) ? (chan) : (0))) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "reset": method_reset,
            "set_period": method_set_period,
            "set_shape": method_set_shape,
            "tone_duty": method_tone_duty,
            "get_envelope_chan": method_get_envelope_chan,
            "tone_volume": method_tone_volume,
            "build_mosfet_resistor_table": method_build_mosfet_resistor_table,
            "build_single_table": method_build_single_table,
            "build_3D_table": method_build_3D_table,
            "write_bc1_bc2": method_write_bc1_bc2,
            "address_w": method_address_w,
            "data_w": method_data_w,
            "port_a_read_callback": method_port_a_read_callback,
            "port_b_read_callback": method_port_b_read_callback,
            "port_a_write_callback": method_port_a_write_callback,
            "port_b_write_callback": method_port_b_write_callback,
            "data_r": method_data_r,
            "data_address_w": method_data_address_w,
            "address_data_w": method_address_data_w,
            "ay8910_device::port_a_read_callback": method_ay8910_device__port_a_read_callback,
            "ay8910_device::port_b_read_callback": method_ay8910_device__port_b_read_callback,
            "ay8910_device::port_a_write_callback": method_ay8910_device__port_a_write_callback,
            "ay8910_device::port_b_write_callback": method_ay8910_device__port_b_write_callback,
            "ay8910_device::data_r": method_ay8910_device__data_r,
            "ay8910_device::data_address_w": method_ay8910_device__data_address_w,
            "ay8910_device::address_data_w": method_ay8910_device__address_data_w,
            "ay8910_device::tone_volume": method_ay8910_device__tone_volume,
            "ay8910_device::tone_duty": method_ay8910_device__tone_duty,
            "ay8910_device::get_envelope_chan": method_ay8910_device__get_envelope_chan
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
