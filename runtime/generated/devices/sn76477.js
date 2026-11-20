import deviceData from './sn76477.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.01, 0.03, 0.11, 0.15, 0.19, 0.21, 0.23, 0.26, 0.29, 0.31, 0.33, 0.36, 0.38, 0.41, 0.43, 0.46, 0.49, 0.52, 0.54, 0.57, 0.6, 0.62, 0.65, 0.68, 0.7, 0.73, 0.76, 0.8, 0.82, 0.84, 0.87, 0.9, 0.93, 0.96, 0.98, 1];
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().sample_rate"], __L2 = __l["stream_alloc"], __L3 = __l["clock"];
        members.m_channel = (__L2 ? __L2(0, 1, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, 1, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        if (((Number((__L3 ? __L3() : runtime.macro("clock"))) > Number(0)) ? 1 : 0)) {
            members.m_our_sample_rate = (((__L3 ? __L3() : runtime.macro("clock"))) | 0);
        }
        else {
            members.m_our_sample_rate = ((((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) | 0);
        }
        method_intialize_noise(runtime);
        method_mixer_a_w(runtime, (members.m_mixer_a ?? 0));
        method_mixer_b_w(runtime, (members.m_mixer_b ?? 0));
        method_mixer_c_w(runtime, (members.m_mixer_c ?? 0));
        method_envelope_1_w(runtime, (members.m_envelope_1 ?? 0));
        method_envelope_2_w(runtime, (members.m_envelope_2 ?? 0));
        members.m_one_shot_cap_voltage = 0;
        members.m_slf_cap_voltage = 0.33;
        members.m_vco_cap_voltage = 0.33;
        members.m_noise_filter_cap_voltage = 0;
        members.m_attack_decay_cap_voltage = 0;
        method_state_save_register(runtime);
        method_log_complete_state(runtime);
        if (0) {
            method_open_wav_file(runtime);
        }
    }
    function method_intialize_noise(runtime) {
        const members = runtime.members;
        members.m_rng = ((0) >>> 0);
    }
    function method_mixer_a_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        if (((Number(state) !== Number((((((members.m_mixer_mode ?? 0)) >>> (0))) & (1)))) ? 1 : 0)) {
            (__t0 = __deref_mixer_a_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_mixer_mode = (((((((members.m_mixer_mode ?? 0)) & (-2))) | (state))) >>> 0);
            method_log_mixer_mode(runtime);
        }
    }
    function __deref_mixer_a_w(runtime, p) {
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
    function method_log_mixer_mode(runtime) {
        const members = runtime.members;
        if ((((members.__static_log_mixer_mode_desc__initialised ?? 0)) ? 0 : 1)) {
            members.__static_log_mixer_mode_desc = ["VCO", "SLF", "Noise", "VCO/Noise", "SLF/Noise", "SLF/VCO/Noise", "SLF/VCO", "Inhibit"];
            members.__static_log_mixer_mode_desc__initialised = 1;
        }
        let desc = (members.__static_log_mixer_mode_desc ?? 0);
        0;
    }
    function method_mixer_b_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        if (((Number(state) !== Number((((((members.m_mixer_mode ?? 0)) >>> (1))) & (1)))) ? 1 : 0)) {
            (__t0 = __deref_mixer_b_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_mixer_mode = (((((((members.m_mixer_mode ?? 0)) & (-3))) | (((state) << (1))))) >>> 0);
            method_log_mixer_mode(runtime);
        }
    }
    function __deref_mixer_b_w(runtime, p) {
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
    function method_mixer_c_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        if (((Number(state) !== Number((((((members.m_mixer_mode ?? 0)) >>> (2))) & (1)))) ? 1 : 0)) {
            (__t0 = __deref_mixer_c_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_mixer_mode = (((((((members.m_mixer_mode ?? 0)) & (-5))) | (((state) << (2))))) >>> 0);
            method_log_mixer_mode(runtime);
        }
    }
    function __deref_mixer_c_w(runtime, p) {
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
    function method_envelope_1_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        if (((Number(state) !== Number((((((members.m_envelope_mode ?? 0)) >>> (0))) & (1)))) ? 1 : 0)) {
            (__t0 = __deref_envelope_1_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_envelope_mode = (((((((members.m_envelope_mode ?? 0)) & (-2))) | (state))) >>> 0);
            method_log_envelope_mode(runtime);
        }
    }
    function __deref_envelope_1_w(runtime, p) {
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
    function method_log_envelope_mode(runtime) {
        const members = runtime.members;
        if ((((members.__static_log_envelope_mode_desc__initialised ?? 0)) ? 0 : 1)) {
            members.__static_log_envelope_mode_desc = ["VCO", "One-Shot", "Mixer Only", "VCO with Alternating Polarity"];
            members.__static_log_envelope_mode_desc__initialised = 1;
        }
        let desc = (members.__static_log_envelope_mode_desc ?? 0);
        0;
    }
    function method_envelope_2_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        if (((Number(state) !== Number((((((members.m_envelope_mode ?? 0)) >>> (1))) & (1)))) ? 1 : 0)) {
            (__t0 = __deref_envelope_2_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_envelope_mode = (((((((members.m_envelope_mode ?? 0)) & (-3))) | (((state) << (1))))) >>> 0);
            method_log_envelope_mode(runtime);
        }
    }
    function __deref_envelope_2_w(runtime, p) {
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
    function method_state_save_register(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"], __L1 = __l["save_item"];
        (__L1 ? __L1((__L0 ? __L0((members.m_enable ?? 0)) : runtime.macro("NAME", (members.m_enable ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_enable ?? 0)) : runtime.macro("NAME", (members.m_enable ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_envelope_mode ?? 0)) : runtime.macro("NAME", (members.m_envelope_mode ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_envelope_mode ?? 0)) : runtime.macro("NAME", (members.m_envelope_mode ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_vco_mode ?? 0)) : runtime.macro("NAME", (members.m_vco_mode ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_vco_mode ?? 0)) : runtime.macro("NAME", (members.m_vco_mode ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_mixer_mode ?? 0)) : runtime.macro("NAME", (members.m_mixer_mode ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_mixer_mode ?? 0)) : runtime.macro("NAME", (members.m_mixer_mode ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_one_shot_res ?? 0)) : runtime.macro("NAME", (members.m_one_shot_res ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_one_shot_res ?? 0)) : runtime.macro("NAME", (members.m_one_shot_res ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_one_shot_cap ?? 0)) : runtime.macro("NAME", (members.m_one_shot_cap ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_one_shot_cap ?? 0)) : runtime.macro("NAME", (members.m_one_shot_cap ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_one_shot_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_one_shot_cap_voltage_ext ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_one_shot_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_one_shot_cap_voltage_ext ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_slf_res ?? 0)) : runtime.macro("NAME", (members.m_slf_res ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_slf_res ?? 0)) : runtime.macro("NAME", (members.m_slf_res ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_slf_cap ?? 0)) : runtime.macro("NAME", (members.m_slf_cap ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_slf_cap ?? 0)) : runtime.macro("NAME", (members.m_slf_cap ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_slf_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_slf_cap_voltage_ext ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_slf_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_slf_cap_voltage_ext ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_vco_voltage ?? 0)) : runtime.macro("NAME", (members.m_vco_voltage ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_vco_voltage ?? 0)) : runtime.macro("NAME", (members.m_vco_voltage ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_vco_res ?? 0)) : runtime.macro("NAME", (members.m_vco_res ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_vco_res ?? 0)) : runtime.macro("NAME", (members.m_vco_res ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_vco_cap ?? 0)) : runtime.macro("NAME", (members.m_vco_cap ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_vco_cap ?? 0)) : runtime.macro("NAME", (members.m_vco_cap ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_vco_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_vco_cap_voltage_ext ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_vco_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_vco_cap_voltage_ext ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_noise_clock_res ?? 0)) : runtime.macro("NAME", (members.m_noise_clock_res ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_noise_clock_res ?? 0)) : runtime.macro("NAME", (members.m_noise_clock_res ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_noise_clock_ext ?? 0)) : runtime.macro("NAME", (members.m_noise_clock_ext ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_noise_clock_ext ?? 0)) : runtime.macro("NAME", (members.m_noise_clock_ext ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_noise_clock ?? 0)) : runtime.macro("NAME", (members.m_noise_clock ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_noise_clock ?? 0)) : runtime.macro("NAME", (members.m_noise_clock ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_noise_filter_res ?? 0)) : runtime.macro("NAME", (members.m_noise_filter_res ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_noise_filter_res ?? 0)) : runtime.macro("NAME", (members.m_noise_filter_res ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_noise_filter_cap ?? 0)) : runtime.macro("NAME", (members.m_noise_filter_cap ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_noise_filter_cap ?? 0)) : runtime.macro("NAME", (members.m_noise_filter_cap ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_noise_filter_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_noise_filter_cap_voltage_ext ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_noise_filter_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_noise_filter_cap_voltage_ext ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_attack_res ?? 0)) : runtime.macro("NAME", (members.m_attack_res ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_attack_res ?? 0)) : runtime.macro("NAME", (members.m_attack_res ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_decay_res ?? 0)) : runtime.macro("NAME", (members.m_decay_res ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_decay_res ?? 0)) : runtime.macro("NAME", (members.m_decay_res ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_attack_decay_cap ?? 0)) : runtime.macro("NAME", (members.m_attack_decay_cap ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_attack_decay_cap ?? 0)) : runtime.macro("NAME", (members.m_attack_decay_cap ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_attack_decay_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_attack_decay_cap_voltage_ext ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_attack_decay_cap_voltage_ext ?? 0)) : runtime.macro("NAME", (members.m_attack_decay_cap_voltage_ext ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_amplitude_res ?? 0)) : runtime.macro("NAME", (members.m_amplitude_res ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_amplitude_res ?? 0)) : runtime.macro("NAME", (members.m_amplitude_res ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_feedback_res ?? 0)) : runtime.macro("NAME", (members.m_feedback_res ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_feedback_res ?? 0)) : runtime.macro("NAME", (members.m_feedback_res ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_pitch_voltage ?? 0)) : runtime.macro("NAME", (members.m_pitch_voltage ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_pitch_voltage ?? 0)) : runtime.macro("NAME", (members.m_pitch_voltage ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_one_shot_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_one_shot_cap_voltage ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_one_shot_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_one_shot_cap_voltage ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_one_shot_running_ff ?? 0)) : runtime.macro("NAME", (members.m_one_shot_running_ff ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_one_shot_running_ff ?? 0)) : runtime.macro("NAME", (members.m_one_shot_running_ff ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_slf_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_slf_cap_voltage ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_slf_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_slf_cap_voltage ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_slf_out_ff ?? 0)) : runtime.macro("NAME", (members.m_slf_out_ff ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_slf_out_ff ?? 0)) : runtime.macro("NAME", (members.m_slf_out_ff ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_vco_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_vco_cap_voltage ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_vco_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_vco_cap_voltage ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_vco_out_ff ?? 0)) : runtime.macro("NAME", (members.m_vco_out_ff ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_vco_out_ff ?? 0)) : runtime.macro("NAME", (members.m_vco_out_ff ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_vco_alt_pos_edge_ff ?? 0)) : runtime.macro("NAME", (members.m_vco_alt_pos_edge_ff ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_vco_alt_pos_edge_ff ?? 0)) : runtime.macro("NAME", (members.m_vco_alt_pos_edge_ff ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_noise_filter_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_noise_filter_cap_voltage ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_noise_filter_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_noise_filter_cap_voltage ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_real_noise_bit_ff ?? 0)) : runtime.macro("NAME", (members.m_real_noise_bit_ff ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_real_noise_bit_ff ?? 0)) : runtime.macro("NAME", (members.m_real_noise_bit_ff ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_filtered_noise_bit_ff ?? 0)) : runtime.macro("NAME", (members.m_filtered_noise_bit_ff ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_filtered_noise_bit_ff ?? 0)) : runtime.macro("NAME", (members.m_filtered_noise_bit_ff ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_noise_gen_count ?? 0)) : runtime.macro("NAME", (members.m_noise_gen_count ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_noise_gen_count ?? 0)) : runtime.macro("NAME", (members.m_noise_gen_count ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_attack_decay_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_attack_decay_cap_voltage ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_attack_decay_cap_voltage ?? 0)) : runtime.macro("NAME", (members.m_attack_decay_cap_voltage ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_rng ?? 0)) : runtime.macro("NAME", (members.m_rng ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_rng ?? 0)) : runtime.macro("NAME", (members.m_rng ?? 0)))));
    }
    function method_log_complete_state(runtime) {
        const members = runtime.members;
        method_log_enable_line(runtime);
        method_log_mixer_mode(runtime);
        method_log_envelope_mode(runtime);
        method_log_vco_mode(runtime);
        method_log_one_shot_time(runtime);
        method_log_slf_freq(runtime);
        method_log_vco_freq(runtime);
        method_log_vco_ext_voltage(runtime);
        method_log_vco_pitch_voltage(runtime);
        method_log_vco_duty_cycle(runtime);
        method_log_noise_filter_freq(runtime);
        method_log_noise_gen_freq(runtime);
        method_log_attack_time(runtime);
        method_log_decay_time(runtime);
        method_log_voltage_out(runtime);
    }
    function method_log_enable_line(runtime) {
        const members = runtime.members;
        if ((((members.__static_log_enable_line_desc__initialised ?? 0)) ? 0 : 1)) {
            members.__static_log_enable_line_desc = ["Enabled", "Inhibited"];
            members.__static_log_enable_line_desc__initialised = 1;
        }
        let desc = (members.__static_log_enable_line_desc ?? 0);
        0;
    }
    function method_log_vco_mode(runtime) {
        const members = runtime.members;
        if ((((members.__static_log_vco_mode_desc__initialised ?? 0)) ? 0 : 1)) {
            members.__static_log_vco_mode_desc = ["External (Pin 16)", "Internal (SLF)"];
            members.__static_log_vco_mode_desc__initialised = 1;
        }
        let desc = (members.__static_log_vco_mode_desc ?? 0);
        0;
    }
    function method_log_one_shot_time(runtime) {
        const members = runtime.members;
        if ((((members.m_one_shot_cap_voltage_ext ?? 0)) ? 0 : 1)) {
            if (((Number(method_compute_one_shot_cap_charging_rate(runtime)) > Number(0)) ? 1 : 0)) {
                0;
            }
            else {
                0;
            }
        }
        else {
            0;
        }
    }
    function method_compute_one_shot_cap_charging_rate(runtime) {
        const members = runtime.members;
        let ret = 0;
        if ((((((((members.m_one_shot_res ?? 0)) > (0)) ? 1 : 0)) && (((((members.m_one_shot_cap ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((2.5) / (__add_compute_one_shot_cap_charging_rate(runtime, ((((0.8024) * ((members.m_one_shot_res ?? 0)))) * ((members.m_one_shot_cap ?? 0))), 0.002079)));
        }
        else {
            if (((((members.m_one_shot_cap ?? 0)) > (0)) ? 1 : 0)) {
                ret = (+1e-30);
            }
            else {
                if (((((members.m_one_shot_res ?? 0)) > (0)) ? 1 : 0)) {
                    ret = (+1e+30);
                }
            }
        }
        return ret;
    }
    function __add_compute_one_shot_cap_charging_rate(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_log_slf_freq(runtime) {
        const members = runtime.members;
        if ((((members.m_slf_cap_voltage_ext ?? 0)) ? 0 : 1)) {
            if (((Number(method_compute_slf_cap_charging_rate(runtime)) > Number(0)) ? 1 : 0)) {
                let charging_time = ((((1) / (method_compute_slf_cap_charging_rate(runtime)))) * (2.04));
                let discharging_time = ((((1) / (method_compute_slf_cap_discharging_rate(runtime)))) * (2.04));
                0;
            }
            else {
                0;
            }
        }
        else {
            0;
        }
    }
    function method_compute_slf_cap_charging_rate(runtime) {
        const members = runtime.members;
        let ret = 0;
        if ((((((((members.m_slf_res ?? 0)) > (0)) ? 1 : 0)) && (((((members.m_slf_cap ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((2.04) / (__add_compute_slf_cap_charging_rate(runtime, ((((0.5885) * ((members.m_slf_res ?? 0)))) * ((members.m_slf_cap ?? 0))), 0.0013)));
        }
        return ret;
    }
    function __add_compute_slf_cap_charging_rate(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_compute_slf_cap_discharging_rate(runtime) {
        const members = runtime.members;
        let ret = 0;
        if ((((((((members.m_slf_res ?? 0)) > (0)) ? 1 : 0)) && (((((members.m_slf_cap ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((2.04) / (__add_compute_slf_cap_discharging_rate(runtime, ((((0.5413) * ((members.m_slf_res ?? 0)))) * ((members.m_slf_cap ?? 0))), 0.001343)));
        }
        return ret;
    }
    function __add_compute_slf_cap_discharging_rate(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_log_vco_freq(runtime) {
        const members = runtime.members;
        if ((((members.m_vco_cap_voltage_ext ?? 0)) ? 0 : 1)) {
            if (((Number(method_compute_vco_cap_charging_discharging_rate(runtime)) > Number(0)) ? 1 : 0)) {
                let min_freq = ((method_compute_vco_cap_charging_discharging_rate(runtime)) / (((2) * (2.39))));
                let max_freq = ((method_compute_vco_cap_charging_discharging_rate(runtime)) / (((2) * (0.35))));
                0;
            }
            else {
                0;
            }
        }
        else {
            0;
        }
    }
    function method_compute_vco_cap_charging_discharging_rate(runtime) {
        const members = runtime.members;
        let ret = 0;
        if ((((((((members.m_vco_res ?? 0)) > (0)) ? 1 : 0)) && (((((members.m_vco_cap ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((((((0.64) * (2))) * (2.39))) / ((((members.m_vco_res ?? 0)) * ((members.m_vco_cap ?? 0)))));
        }
        return ret;
    }
    function method_log_vco_ext_voltage(runtime) {
        const members = runtime.members;
        if (((Number((members.m_vco_voltage ?? 0)) <= Number(2.35)) ? 1 : 0)) {
            let min_freq = ((method_compute_vco_cap_charging_discharging_rate(runtime)) / (((2) * (2.39))));
            let max_freq = ((method_compute_vco_cap_charging_discharging_rate(runtime)) / (((2) * (0.35))));
            0;
        }
        else {
            0;
        }
    }
    function method_log_vco_pitch_voltage(runtime) {
        const members = runtime.members;
        0;
    }
    function method_log_vco_duty_cycle(runtime) {
        const members = runtime.members;
        0;
    }
    function method_log_noise_filter_freq(runtime) {
        const members = runtime.members;
        if ((((members.m_noise_filter_cap_voltage_ext ?? 0)) ? 0 : 1)) {
            let charging_rate = method_compute_noise_filter_cap_charging_rate(runtime);
            if ((((charging_rate) > (0)) ? 1 : 0)) {
                if ((((charging_rate) < (1000000)) ? 1 : 0)) {
                    let charging_time = ((((1) / (charging_rate))) * (5));
                    let discharging_time = ((((1) / (charging_rate))) * (5));
                    0;
                }
                else {
                    0;
                }
            }
            else {
                0;
            }
        }
        else {
            0;
        }
    }
    function method_compute_noise_filter_cap_charging_rate(runtime) {
        const members = runtime.members;
        let ret = 0;
        if ((((((((members.m_noise_filter_res ?? 0)) > (0)) ? 1 : 0)) && (((((members.m_noise_filter_cap ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((5) / (__add_compute_noise_filter_cap_charging_rate(runtime, ((((0.1571) * ((members.m_noise_filter_res ?? 0)))) * ((members.m_noise_filter_cap ?? 0))), 0.0000143)));
        }
        else {
            if (((((members.m_noise_filter_cap ?? 0)) > (0)) ? 1 : 0)) {
                ret = (+1e-30);
            }
            else {
                if (((((members.m_noise_filter_res ?? 0)) > (0)) ? 1 : 0)) {
                    ret = (+1e+30);
                }
            }
        }
        return ret;
    }
    function __add_compute_noise_filter_cap_charging_rate(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_log_noise_gen_freq(runtime) {
        const members = runtime.members;
        if ((members.m_noise_clock_ext ?? 0)) {
            0;
        }
        else {
            if (((Number(method_compute_noise_gen_freq(runtime)) > Number(0)) ? 1 : 0)) {
                0;
            }
            else {
                0;
            }
        }
    }
    function method_compute_noise_gen_freq(runtime) {
        const members = runtime.members;
        let ret = ((0) >>> 0);
        if ((((((Number((members.m_noise_clock_res ?? 0)) >= Number(10000)) ? 1 : 0)) && (((Number((members.m_noise_clock_res ?? 0)) <= Number(3300000)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((((339100000) * (Math.pow(Number((members.m_noise_clock_res ?? 0)), Number((-0.8849)))))) >>> 0);
        }
        return ((ret) >>> 0);
    }
    function method_log_attack_time(runtime) {
        const members = runtime.members;
        if ((((members.m_attack_decay_cap_voltage_ext ?? 0)) ? 0 : 1)) {
            if (((Number(method_compute_attack_decay_cap_charging_rate(runtime)) > Number(0)) ? 1 : 0)) {
                0;
            }
            else {
                0;
            }
        }
        else {
            0;
        }
    }
    function method_compute_attack_decay_cap_charging_rate(runtime) {
        const members = runtime.members;
        let ret = 0;
        if ((((((((members.m_attack_res ?? 0)) > (0)) ? 1 : 0)) && (((((members.m_attack_decay_cap ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((4.44) / ((((members.m_attack_res ?? 0)) * ((members.m_attack_decay_cap ?? 0)))));
        }
        else {
            if (((((members.m_attack_decay_cap ?? 0)) > (0)) ? 1 : 0)) {
                ret = (+1e-30);
            }
            else {
                if (((((members.m_attack_res ?? 0)) > (0)) ? 1 : 0)) {
                    ret = (+1e+30);
                }
            }
        }
        return ret;
    }
    function method_log_decay_time(runtime) {
        const members = runtime.members;
        if ((((members.m_attack_decay_cap_voltage_ext ?? 0)) ? 0 : 1)) {
            if (((Number(method_compute_attack_decay_cap_discharging_rate(runtime)) > Number(0)) ? 1 : 0)) {
                0;
            }
            else {
                0;
            }
        }
        else {
            0;
        }
    }
    function method_compute_attack_decay_cap_discharging_rate(runtime) {
        const members = runtime.members;
        let ret = 0;
        if ((((((((members.m_decay_res ?? 0)) > (0)) ? 1 : 0)) && (((((members.m_attack_decay_cap ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((4.44) / ((((members.m_decay_res ?? 0)) * ((members.m_attack_decay_cap ?? 0)))));
        }
        else {
            if (((((members.m_attack_decay_cap ?? 0)) > (0)) ? 1 : 0)) {
                ret = (+1e-30);
            }
            else {
                if (((((members.m_attack_res ?? 0)) > (0)) ? 1 : 0)) {
                    ret = (+1e+30);
                }
            }
        }
        return ret;
    }
    function method_log_voltage_out(runtime) {
        const members = runtime.members;
        0;
    }
    function method_open_wav_file(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["tag"], __L1 = __l["std::replace"], __L2 = __l["util::string_format"], __L3 = __l["util::wav_open"];
        let s = (__L0 ? __L0() : runtime.macro("tag"));
        (__L1 ? __L1(runtime.stringMethod(s, "begin"), runtime.stringMethod(s, "end"), 58, 95) : runtime.macro("std::replace", runtime.stringMethod(s, "begin"), runtime.stringMethod(s, "end"), 58, 95));
        let wav_file_name = (__L2 ? __L2("sn76477_%s.wav", s) : runtime.macro("util::string_format", "sn76477_%s.wav", s));
        members.m_file = (__L3 ? __L3(wav_file_name, (members.m_our_sample_rate ?? 0), 2) : runtime.macro("util::wav_open", wav_file_name, (members.m_our_sample_rate ?? 0), 2));
        0;
    }
    function method_device_stop(runtime) {
        const members = runtime.members;
        if (0) {
            method_close_wav_file(runtime);
        }
    }
    function method_close_wav_file(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_close_wav_file(runtime, members.m_file), typeof __t0.reset === 'function' ? __t0.reset() : typeof __t0.reset === 'number' || typeof __t0.reset === 'boolean' ? __t0.reset : runtime.container(members.m_file, "reset"));
    }
    function __deref_close_wav_file(runtime, p) {
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
    function method_compute_one_shot_cap_discharging_rate(runtime) {
        const members = runtime.members;
        let ret = 0;
        if ((((((((members.m_one_shot_res ?? 0)) > (0)) ? 1 : 0)) && (((((members.m_one_shot_cap ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((2.5) / (__add_compute_one_shot_cap_discharging_rate(runtime, ((854.7) * ((members.m_one_shot_cap ?? 0))), 0.00001795)));
        }
        else {
            if (((((members.m_one_shot_res ?? 0)) > (0)) ? 1 : 0)) {
                ret = (+1e+30);
            }
        }
        return ret;
    }
    function __add_compute_one_shot_cap_discharging_rate(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_compute_vco_duty_cycle(runtime) {
        const members = runtime.members;
        let ret = 0.5;
        if ((((((((members.m_vco_voltage ?? 0)) > (0)) ? 1 : 0)) && (((Number((members.m_pitch_voltage ?? 0)) !== Number(5)) ? 1 : 0))) ? 1 : 0)) {
            ret = method_max(runtime, ((0.5) * ((((members.m_pitch_voltage ?? 0)) / ((members.m_vco_voltage ?? 0))))), ((18) / (100)));
            ret = method_min(runtime, ret, 1);
        }
        return ret;
    }
    function method_max(runtime, a, b) {
        const members = runtime.members;
        return (((((a) > (b)) ? 1 : 0)) ? (a) : (b));
    }
    function method_min(runtime, a, b) {
        const members = runtime.members;
        return (((((a) < (b)) ? 1 : 0)) ? (a) : (b));
    }
    function method_compute_noise_filter_cap_discharging_rate(runtime) {
        const members = runtime.members;
        let ret = 0;
        if ((((((((members.m_noise_filter_res ?? 0)) > (0)) ? 1 : 0)) && (((((members.m_noise_filter_cap ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
            ret = ((5) / (__add_compute_noise_filter_cap_discharging_rate(runtime, ((((0.1331) * ((members.m_noise_filter_res ?? 0)))) * ((members.m_noise_filter_cap ?? 0))), 0.00001734)));
        }
        else {
            if (((((members.m_noise_filter_cap ?? 0)) > (0)) ? 1 : 0)) {
                ret = (+1e-30);
            }
            else {
                if (((((members.m_noise_filter_res ?? 0)) > (0)) ? 1 : 0)) {
                    ret = (+1e+30);
                }
            }
        }
        return ret;
    }
    function __add_compute_noise_filter_cap_discharging_rate(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_compute_center_to_peak_voltage_out(runtime) {
        const members = runtime.members;
        let ret = 0;
        if (((((members.m_amplitude_res ?? 0)) > (0)) ? 1 : 0)) {
            ret = __add_compute_center_to_peak_voltage_out(runtime, ((3.818) * ((((members.m_feedback_res ?? 0)) / ((members.m_amplitude_res ?? 0))))), 0.03);
        }
        return ret;
    }
    function __add_compute_center_to_peak_voltage_out(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_add_wav_data(runtime, data_l, data_r) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["util::wav_add_data_16lr"];
        data_l = ((data_l) << 16 >> 16);
        data_r = ((data_r) << 16 >> 16);
        (__L0 ? __L0(__deref_add_wav_data(runtime, (members.m_file ?? 0)), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => data_l, set: (value) => { data_l = ((value) << 16 >> 16); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => data_r, set: (value) => { data_r = ((value) << 16 >> 16); } }), offset: 0 }), 1) : runtime.macro("util::wav_add_data_16lr", __deref_add_wav_data(runtime, (members.m_file ?? 0)), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => data_l, set: (value) => { data_l = ((value) << 16 >> 16); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => data_r, set: (value) => { data_r = ((value) << 16 >> 16); } }), offset: 0 }), 1));
    }
    function __deref_add_wav_data(runtime, p) {
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
    function method_generate_next_real_noise_bit(runtime) {
        const members = runtime.members;
        let out = (((((((((members.m_rng ?? 0)) >>> (28))) & (1))) ^ ((((((members.m_rng ?? 0)) >>> (0))) & (1))))) >>> 0);
        if (((Number((((members.m_rng ?? 0)) & (268435487))) === Number(0)) ? 1 : 0)) {
            out = ((1) >>> 0);
        }
        members.m_rng = (((((((members.m_rng ?? 0)) >>> (1))) | (((out) << (30))))) >>> 0);
        return ((out) >>> 0);
    }
    function method_enable_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        if ((((state) !== ((members.m_enable ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_enable_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_enable = ((state) >>> 0);
            if ((((members.m_enable ?? 0)) ? 0 : 1)) {
                members.m_attack_decay_cap_voltage = 0;
                members.m_one_shot_running_ff = ((1) >>> 0);
            }
            method_log_enable_line(runtime);
        }
    }
    function __deref_enable_w(runtime, p) {
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
    function method_vco_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        if ((((state) !== ((members.m_vco_mode ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_vco_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_vco_mode = ((state) >>> 0);
            method_log_vco_mode(runtime);
        }
    }
    function __deref_vco_w(runtime, p) {
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
    function method_one_shot_res_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if (((Number(data) !== Number(-1)) ? 1 : 0)) {
        }
        if ((((data) !== ((members.m_one_shot_res ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_one_shot_res_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_one_shot_res = data;
            method_log_one_shot_time(runtime);
        }
    }
    function __deref_one_shot_res_w(runtime, p) {
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
    function method_one_shot_cap_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if ((((data) !== ((members.m_one_shot_cap ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_one_shot_cap_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_one_shot_cap = data;
            method_log_one_shot_time(runtime);
        }
    }
    function __deref_one_shot_cap_w(runtime, p) {
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
    function method_one_shot_cap_voltage_w(runtime, data) {
        const members = runtime.members;
        let __t0, __t1;
        if (((Number(data) === Number(-1)) ? 1 : 0)) {
            if ((members.m_one_shot_cap_voltage_ext ?? 0)) {
                (__t0 = __deref_one_shot_cap_voltage_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
                members.m_one_shot_cap_voltage_ext = ((0) >>> 0);
                method_log_one_shot_time(runtime);
            }
        }
        else {
            if (((((((members.m_one_shot_cap_voltage_ext ?? 0)) ? 0 : 1)) || ((((data) !== ((members.m_one_shot_cap_voltage ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                (__t1 = __deref_one_shot_cap_voltage_w(runtime, members.m_channel), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container(members.m_channel, "update"));
                members.m_one_shot_cap_voltage_ext = ((1) >>> 0);
                members.m_one_shot_cap_voltage = data;
                method_log_one_shot_time(runtime);
            }
        }
    }
    function __deref_one_shot_cap_voltage_w(runtime, p) {
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
    function method_slf_res_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if (((Number(data) !== Number(-1)) ? 1 : 0)) {
        }
        if ((((data) !== ((members.m_slf_res ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_slf_res_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_slf_res = data;
            method_log_slf_freq(runtime);
        }
    }
    function __deref_slf_res_w(runtime, p) {
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
    function method_slf_cap_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if ((((data) !== ((members.m_slf_cap ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_slf_cap_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_slf_cap = data;
            method_log_slf_freq(runtime);
        }
    }
    function __deref_slf_cap_w(runtime, p) {
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
    function method_slf_cap_voltage_w(runtime, data) {
        const members = runtime.members;
        let __t0, __t1;
        if (((Number(data) === Number(-1)) ? 1 : 0)) {
            if ((members.m_slf_cap_voltage_ext ?? 0)) {
                (__t0 = __deref_slf_cap_voltage_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
                members.m_slf_cap_voltage_ext = ((0) >>> 0);
                method_log_slf_freq(runtime);
            }
        }
        else {
            if (((((((members.m_slf_cap_voltage_ext ?? 0)) ? 0 : 1)) || ((((data) !== ((members.m_slf_cap_voltage ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                (__t1 = __deref_slf_cap_voltage_w(runtime, members.m_channel), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container(members.m_channel, "update"));
                members.m_slf_cap_voltage_ext = ((1) >>> 0);
                members.m_slf_cap_voltage = data;
                method_log_slf_freq(runtime);
            }
        }
    }
    function __deref_slf_cap_voltage_w(runtime, p) {
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
    function method_vco_res_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if (((Number(data) !== Number(-1)) ? 1 : 0)) {
        }
        if ((((data) !== ((members.m_vco_res ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_vco_res_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_vco_res = data;
            method_log_vco_freq(runtime);
        }
    }
    function __deref_vco_res_w(runtime, p) {
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
    function method_vco_cap_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if ((((data) !== ((members.m_vco_cap ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_vco_cap_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_vco_cap = data;
            method_log_vco_freq(runtime);
        }
    }
    function __deref_vco_cap_w(runtime, p) {
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
    function method_vco_cap_voltage_w(runtime, data) {
        const members = runtime.members;
        let __t0, __t1;
        if (((Number(data) === Number(-1)) ? 1 : 0)) {
            if ((members.m_vco_cap_voltage_ext ?? 0)) {
                (__t0 = __deref_vco_cap_voltage_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
                members.m_vco_cap_voltage_ext = ((0) >>> 0);
                method_log_vco_freq(runtime);
            }
        }
        else {
            if (((((((members.m_vco_cap_voltage_ext ?? 0)) ? 0 : 1)) || ((((data) !== ((members.m_vco_cap_voltage ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                (__t1 = __deref_vco_cap_voltage_w(runtime, members.m_channel), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container(members.m_channel, "update"));
                members.m_vco_cap_voltage_ext = ((1) >>> 0);
                members.m_vco_cap_voltage = data;
                method_log_vco_freq(runtime);
            }
        }
    }
    function __deref_vco_cap_voltage_w(runtime, p) {
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
    function method_vco_voltage_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if ((((data) !== ((members.m_vco_voltage ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_vco_voltage_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_vco_voltage = data;
            method_log_vco_ext_voltage(runtime);
            method_log_vco_duty_cycle(runtime);
        }
    }
    function __deref_vco_voltage_w(runtime, p) {
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
    function method_pitch_voltage_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if ((((data) !== ((members.m_pitch_voltage ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_pitch_voltage_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_pitch_voltage = data;
            method_log_vco_pitch_voltage(runtime);
            method_log_vco_duty_cycle(runtime);
        }
    }
    function __deref_pitch_voltage_w(runtime, p) {
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
    function method_noise_clock_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        if ((((state) !== ((members.m_noise_clock ?? 0))) ? 1 : 0)) {
            members.m_noise_clock = ((state) >>> 0);
            if (((((members.m_noise_clock ?? 0)) && ((members.m_noise_clock_ext ?? 0))) ? 1 : 0)) {
                (__t0 = __deref_noise_clock_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
                members.m_real_noise_bit_ff = ((method_generate_next_real_noise_bit(runtime)) >>> 0);
            }
        }
    }
    function __deref_noise_clock_w(runtime, p) {
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
    function method_noise_clock_res_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if (((Number(data) !== Number(-1)) ? 1 : 0)) {
        }
        if ((((((((((data) === (0)) ? 1 : 0)) && ((((members.m_noise_clock_ext ?? 0)) ? 0 : 1))) ? 1 : 0)) || (((((((data) !== (0)) ? 1 : 0)) && ((((data) !== ((members.m_noise_clock_res ?? 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            (__t0 = __deref_noise_clock_res_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            if ((((data) === (0)) ? 1 : 0)) {
                members.m_noise_clock_ext = ((1) >>> 0);
            }
            else {
                members.m_noise_clock_ext = ((0) >>> 0);
                members.m_noise_clock_res = data;
            }
            method_log_noise_gen_freq(runtime);
        }
    }
    function __deref_noise_clock_res_w(runtime, p) {
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
    function method_noise_filter_res_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if (((Number(data) !== Number(-1)) ? 1 : 0)) {
        }
        if ((((data) !== ((members.m_noise_filter_res ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_noise_filter_res_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_noise_filter_res = data;
            method_log_noise_filter_freq(runtime);
        }
    }
    function __deref_noise_filter_res_w(runtime, p) {
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
    function method_noise_filter_cap_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if ((((data) !== ((members.m_noise_filter_cap ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_noise_filter_cap_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_noise_filter_cap = data;
            method_log_noise_filter_freq(runtime);
        }
    }
    function __deref_noise_filter_cap_w(runtime, p) {
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
    function method_noise_filter_cap_voltage_w(runtime, data) {
        const members = runtime.members;
        let __t0, __t1;
        if (((Number(data) === Number(-1)) ? 1 : 0)) {
            if ((members.m_noise_filter_cap_voltage_ext ?? 0)) {
                (__t0 = __deref_noise_filter_cap_voltage_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
                members.m_noise_filter_cap_voltage_ext = ((0) >>> 0);
                method_log_noise_filter_freq(runtime);
            }
        }
        else {
            if (((((((members.m_noise_filter_cap_voltage_ext ?? 0)) ? 0 : 1)) || ((((data) !== ((members.m_noise_filter_cap_voltage ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                (__t1 = __deref_noise_filter_cap_voltage_w(runtime, members.m_channel), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container(members.m_channel, "update"));
                members.m_noise_filter_cap_voltage_ext = ((1) >>> 0);
                members.m_noise_filter_cap_voltage = data;
                method_log_noise_filter_freq(runtime);
            }
        }
    }
    function __deref_noise_filter_cap_voltage_w(runtime, p) {
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
    function method_attack_res_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if (((Number(data) !== Number(-1)) ? 1 : 0)) {
        }
        if ((((data) !== ((members.m_attack_res ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_attack_res_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_attack_res = data;
            method_log_attack_time(runtime);
        }
    }
    function __deref_attack_res_w(runtime, p) {
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
    function method_decay_res_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if (((Number(data) !== Number(-1)) ? 1 : 0)) {
        }
        if ((((data) !== ((members.m_decay_res ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_decay_res_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_decay_res = data;
            method_log_decay_time(runtime);
        }
    }
    function __deref_decay_res_w(runtime, p) {
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
    function method_attack_decay_cap_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if ((((data) !== ((members.m_attack_decay_cap ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_attack_decay_cap_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_attack_decay_cap = data;
            method_log_attack_time(runtime);
            method_log_decay_time(runtime);
        }
    }
    function __deref_attack_decay_cap_w(runtime, p) {
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
    function method_attack_decay_cap_voltage_w(runtime, data) {
        const members = runtime.members;
        let __t0, __t1;
        if (((Number(data) === Number(-1)) ? 1 : 0)) {
            if ((members.m_attack_decay_cap_voltage_ext ?? 0)) {
                (__t0 = __deref_attack_decay_cap_voltage_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
                members.m_attack_decay_cap_voltage_ext = ((0) >>> 0);
                method_log_attack_time(runtime);
                method_log_decay_time(runtime);
            }
        }
        else {
            if (((((((members.m_attack_decay_cap_voltage_ext ?? 0)) ? 0 : 1)) || ((((data) !== ((members.m_attack_decay_cap_voltage ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                (__t1 = __deref_attack_decay_cap_voltage_w(runtime, members.m_channel), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container(members.m_channel, "update"));
                members.m_attack_decay_cap_voltage_ext = ((1) >>> 0);
                members.m_attack_decay_cap_voltage = data;
                method_log_attack_time(runtime);
                method_log_decay_time(runtime);
            }
        }
    }
    function __deref_attack_decay_cap_voltage_w(runtime, p) {
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
    function method_amplitude_res_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if (((Number(data) !== Number(-1)) ? 1 : 0)) {
        }
        if ((((data) !== ((members.m_amplitude_res ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_amplitude_res_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_amplitude_res = data;
            method_log_voltage_out(runtime);
        }
    }
    function __deref_amplitude_res_w(runtime, p) {
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
    function method_feedback_res_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        if (((Number(data) !== Number(-1)) ? 1 : 0)) {
        }
        if ((((data) !== ((members.m_feedback_res ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_feedback_res_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_feedback_res = data;
            method_log_voltage_out(runtime);
        }
    }
    function __deref_feedback_res_w(runtime, p) {
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
        let one_shot_cap_charging_step = 0;
        let one_shot_cap_discharging_step = 0;
        let slf_cap_charging_step = 0;
        let slf_cap_discharging_step = 0;
        let vco_duty_cycle_multiplier = 0;
        let vco_cap_charging_step = 0;
        let vco_cap_discharging_step = 0;
        let vco_cap_voltage_max = 0;
        let noise_gen_freq = ((0) >>> 0);
        let noise_filter_cap_charging_step = 0;
        let noise_filter_cap_discharging_step = 0;
        let attack_decay_cap_charging_step = 0;
        let attack_decay_cap_discharging_step = 0;
        let attack_decay_cap_charging = ((0) | 0);
        let voltage_out = 0;
        let center_to_peak_voltage_out = 0;
        one_shot_cap_charging_step = ((method_compute_one_shot_cap_charging_rate(runtime)) / ((members.m_our_sample_rate ?? 0)));
        one_shot_cap_discharging_step = ((method_compute_one_shot_cap_discharging_rate(runtime)) / ((members.m_our_sample_rate ?? 0)));
        slf_cap_charging_step = ((method_compute_slf_cap_charging_rate(runtime)) / ((members.m_our_sample_rate ?? 0)));
        slf_cap_discharging_step = ((method_compute_slf_cap_discharging_rate(runtime)) / ((members.m_our_sample_rate ?? 0)));
        vco_duty_cycle_multiplier = ((runtime.subtract(1, method_compute_vco_duty_cycle(runtime))) * (2));
        vco_cap_charging_step = ((((method_compute_vco_cap_charging_discharging_rate(runtime)) / (vco_duty_cycle_multiplier))) / ((members.m_our_sample_rate ?? 0)));
        vco_cap_discharging_step = ((((method_compute_vco_cap_charging_discharging_rate(runtime)) * (vco_duty_cycle_multiplier))) / ((members.m_our_sample_rate ?? 0)));
        noise_filter_cap_charging_step = ((method_compute_noise_filter_cap_charging_rate(runtime)) / ((members.m_our_sample_rate ?? 0)));
        noise_filter_cap_discharging_step = ((method_compute_noise_filter_cap_discharging_rate(runtime)) / ((members.m_our_sample_rate ?? 0)));
        noise_gen_freq = ((method_compute_noise_gen_freq(runtime)) >>> 0);
        attack_decay_cap_charging_step = ((method_compute_attack_decay_cap_charging_rate(runtime)) / ((members.m_our_sample_rate ?? 0)));
        attack_decay_cap_discharging_step = ((method_compute_attack_decay_cap_discharging_rate(runtime)) / ((members.m_our_sample_rate ?? 0)));
        center_to_peak_voltage_out = method_compute_center_to_peak_voltage_out(runtime);
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            if ((((members.m_one_shot_cap_voltage_ext ?? 0)) ? 0 : 1)) {
                if ((members.m_one_shot_running_ff ?? 0)) {
                    members.m_one_shot_cap_voltage = method_min(runtime, (((members.m_one_shot_cap_voltage ?? 0)) + (one_shot_cap_charging_step)), 2.5);
                }
                else {
                    members.m_one_shot_cap_voltage = method_max(runtime, (((members.m_one_shot_cap_voltage ?? 0)) - (one_shot_cap_discharging_step)), 0);
                }
            }
            if (((Number((members.m_one_shot_cap_voltage ?? 0)) >= Number(2.5)) ? 1 : 0)) {
                members.m_one_shot_running_ff = ((0) >>> 0);
            }
            if ((((members.m_slf_cap_voltage_ext ?? 0)) ? 0 : 1)) {
                if ((((members.m_slf_out_ff ?? 0)) ? 0 : 1)) {
                    members.m_slf_cap_voltage = method_min(runtime, (((members.m_slf_cap_voltage ?? 0)) + (slf_cap_charging_step)), 2.37);
                }
                else {
                    members.m_slf_cap_voltage = method_max(runtime, (((members.m_slf_cap_voltage ?? 0)) - (slf_cap_discharging_step)), 0.33);
                }
            }
            if (((Number((members.m_slf_cap_voltage ?? 0)) >= Number(2.37)) ? 1 : 0)) {
                members.m_slf_out_ff = ((1) >>> 0);
            }
            else {
                if (((Number((members.m_slf_cap_voltage ?? 0)) <= Number(0.33)) ? 1 : 0)) {
                    members.m_slf_out_ff = ((0) >>> 0);
                }
            }
            if ((members.m_vco_mode ?? 0)) {
                vco_cap_voltage_max = (((members.m_slf_cap_voltage ?? 0)) + (0.35));
            }
            else {
                vco_cap_voltage_max = (((members.m_vco_voltage ?? 0)) + (0.35));
            }
            if ((((members.m_vco_cap_voltage_ext ?? 0)) ? 0 : 1)) {
                if ((((members.m_vco_out_ff ?? 0)) ? 0 : 1)) {
                    members.m_vco_cap_voltage = method_min(runtime, (((members.m_vco_cap_voltage ?? 0)) + (vco_cap_charging_step)), vco_cap_voltage_max);
                }
                else {
                    members.m_vco_cap_voltage = method_max(runtime, (((members.m_vco_cap_voltage ?? 0)) - (vco_cap_discharging_step)), 0.33);
                }
            }
            if (((((members.m_vco_cap_voltage ?? 0)) >= (vco_cap_voltage_max)) ? 1 : 0)) {
                if ((((members.m_vco_out_ff ?? 0)) ? 0 : 1)) {
                    members.m_vco_alt_pos_edge_ff = (((((members.m_vco_alt_pos_edge_ff ?? 0)) ? 0 : 1)) >>> 0);
                }
                members.m_vco_out_ff = ((1) >>> 0);
            }
            else {
                if (((Number((members.m_vco_cap_voltage ?? 0)) <= Number(0.33)) ? 1 : 0)) {
                    members.m_vco_out_ff = ((0) >>> 0);
                }
            }
            while (((((((members.m_noise_clock_ext ?? 0)) ? 0 : 1)) && (((((members.m_noise_gen_count ?? 0)) <= (noise_gen_freq)) ? 1 : 0))) ? 1 : 0)) {
                members.m_noise_gen_count = (((((members.m_noise_gen_count ?? 0)) + ((members.m_our_sample_rate ?? 0)))) >>> 0);
                members.m_real_noise_bit_ff = ((method_generate_next_real_noise_bit(runtime)) >>> 0);
            }
            members.m_noise_gen_count = (((((members.m_noise_gen_count ?? 0)) - (noise_gen_freq))) >>> 0);
            if ((((members.m_noise_filter_cap_voltage_ext ?? 0)) ? 0 : 1)) {
                if ((members.m_real_noise_bit_ff ?? 0)) {
                    members.m_noise_filter_cap_voltage = method_min(runtime, (((members.m_noise_filter_cap_voltage ?? 0)) + (noise_filter_cap_charging_step)), 5);
                }
                else {
                    members.m_noise_filter_cap_voltage = method_max(runtime, (((members.m_noise_filter_cap_voltage ?? 0)) - (noise_filter_cap_discharging_step)), 0);
                }
            }
            if (((Number((members.m_noise_filter_cap_voltage ?? 0)) >= Number(3.35)) ? 1 : 0)) {
                members.m_filtered_noise_bit_ff = ((0) >>> 0);
            }
            else {
                if (((Number((members.m_noise_filter_cap_voltage ?? 0)) <= Number(0.74)) ? 1 : 0)) {
                    members.m_filtered_noise_bit_ff = ((1) >>> 0);
                }
            }
            switch ((members.m_envelope_mode ?? 0)) {
                case 0:
                    {
                        attack_decay_cap_charging = (((members.m_vco_out_ff ?? 0)) | 0);
                        break;
                    }
                case 1:
                    {
                        attack_decay_cap_charging = (((members.m_one_shot_running_ff ?? 0)) | 0);
                        break;
                    }
                default:
                    {
                        attack_decay_cap_charging = ((1) | 0);
                        break;
                    }
                case 3:
                    {
                        attack_decay_cap_charging = ((((((members.m_vco_out_ff ?? 0)) && ((members.m_vco_alt_pos_edge_ff ?? 0))) ? 1 : 0)) | 0);
                        break;
                    }
            }
            if ((((members.m_attack_decay_cap_voltage_ext ?? 0)) ? 0 : 1)) {
                if (attack_decay_cap_charging) {
                    if ((((attack_decay_cap_charging_step) > (0)) ? 1 : 0)) {
                        members.m_attack_decay_cap_voltage = method_min(runtime, (((members.m_attack_decay_cap_voltage ?? 0)) + (attack_decay_cap_charging_step)), 4.44);
                    }
                    else {
                        members.m_attack_decay_cap_voltage = 4.44;
                    }
                }
                else {
                    if ((((attack_decay_cap_discharging_step) > (0)) ? 1 : 0)) {
                        members.m_attack_decay_cap_voltage = method_max(runtime, (((members.m_attack_decay_cap_voltage ?? 0)) - (attack_decay_cap_discharging_step)), 0);
                    }
                    else {
                        members.m_attack_decay_cap_voltage = 0;
                    }
                }
            }
            if (((((((members.m_enable ?? 0)) ? 0 : 1)) && (((Number((members.m_vco_cap_voltage ?? 0)) <= Number(2.72)) ? 1 : 0))) ? 1 : 0)) {
                let out = ((0) >>> 0);
                switch ((members.m_mixer_mode ?? 0)) {
                    case 0:
                        {
                            out = (((members.m_vco_out_ff ?? 0)) >>> 0);
                            break;
                        }
                    case 1:
                        {
                            out = (((members.m_slf_out_ff ?? 0)) >>> 0);
                            break;
                        }
                    case 2:
                        {
                            out = (((members.m_filtered_noise_bit_ff ?? 0)) >>> 0);
                            break;
                        }
                    case 3:
                        {
                            out = (((((members.m_vco_out_ff ?? 0)) & ((members.m_filtered_noise_bit_ff ?? 0)))) >>> 0);
                            break;
                        }
                    case 4:
                        {
                            out = (((((members.m_slf_out_ff ?? 0)) & ((members.m_filtered_noise_bit_ff ?? 0)))) >>> 0);
                            break;
                        }
                    case 5:
                        {
                            out = (((((((members.m_vco_out_ff ?? 0)) & ((members.m_slf_out_ff ?? 0)))) & ((members.m_filtered_noise_bit_ff ?? 0)))) >>> 0);
                            break;
                        }
                    case 6:
                        {
                            out = (((((members.m_vco_out_ff ?? 0)) & ((members.m_slf_out_ff ?? 0)))) >>> 0);
                            break;
                        }
                    default:
                        {
                            out = ((0) >>> 0);
                            break;
                        }
                }
                if (out) {
                    voltage_out = __add_sound_stream_update(runtime, 2.57, ((center_to_peak_voltage_out) * ((__mame_table_0[((((((((members.m_attack_decay_cap_voltage ?? 0)) * (10))) | 0)) % 45) + 45) % 45] ?? 0))));
                    voltage_out = method_min(runtime, voltage_out, 3.51);
                }
                else {
                    voltage_out = __add_sound_stream_update(runtime, 2.57, ((center_to_peak_voltage_out) * (([0, 0, 0, 0, 0, 0, 0, 0, 0, (-0.01), (-0.02), (-0.09), (-0.13), (-0.15), (-0.17), (-0.19), (-0.22), (-0.24), (-0.26), (-0.28), (-0.3), (-0.32), (-0.34), (-0.37), (-0.39), (-0.41), (-0.44), (-0.46), (-0.48), (-0.51), (-0.53), (-0.56), (-0.58), (-0.6), (-0.62), (-0.65), (-0.67), (-0.69), (-0.72), (-0.74), (-0.76), (-0.78), (-0.81), (-0.84), (-0.85)][((((((((members.m_attack_decay_cap_voltage ?? 0)) * (10))) | 0)) % 45) + 45) % 45] ?? 0))));
                    voltage_out = method_max(runtime, voltage_out, 0.715);
                }
            }
            else {
                voltage_out = 2.57;
            }
            (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, ((((((voltage_out) - (0.715))) / (((2.57) - (0.715))))) - (1))) ?? 0);
            if ((((0) && (((((((members.m_enable ?? 0)) ? 0 : 1)) || (1)) ? 1 : 0))) ? 1 : 0)) {
                let log_data_l = ((0) << 16 >> 16);
                let log_data_r = ((0) << 16 >> 16);
                switch (0) {
                    case 0:
                        {
                            log_data_l = ((((1000) * (voltage_out))) << 16 >> 16);
                            break;
                        }
                    case 1:
                        {
                            log_data_l = ((((1000) * ((members.m_enable ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 2:
                        {
                            log_data_l = ((((1000) * ((members.m_one_shot_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 3:
                        {
                            log_data_l = ((((1000) * ((members.m_attack_decay_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 4:
                        {
                            log_data_l = ((((1000) * ((members.m_slf_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 5:
                        {
                            log_data_l = ((((1000) * ((members.m_vco_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 6:
                        {
                            log_data_l = ((((1000) * ((members.m_noise_filter_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                }
                switch (3) {
                    case 0:
                        {
                            log_data_r = ((((1000) * (voltage_out))) << 16 >> 16);
                            break;
                        }
                    case 1:
                        {
                            log_data_r = ((((1000) * ((members.m_enable ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 2:
                        {
                            log_data_r = ((((1000) * ((members.m_one_shot_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 3:
                        {
                            log_data_r = ((((1000) * ((members.m_attack_decay_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 4:
                        {
                            log_data_r = ((((1000) * ((members.m_slf_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 5:
                        {
                            log_data_r = ((((1000) * ((members.m_vco_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                    case 6:
                        {
                            log_data_r = ((((1000) * ((members.m_noise_filter_cap_voltage ?? 0)))) << 16 >> 16);
                            break;
                        }
                }
                method_add_wav_data(runtime, log_data_l, log_data_r);
            }
        }
    }
    function __add_sound_stream_update(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method_set_noise_params(runtime, clock_res, filter_res, filter_cap) {
        const members = runtime.members;
        members.m_noise_clock_res = clock_res;
        members.m_noise_filter_res = filter_res;
        members.m_noise_filter_cap = filter_cap;
    }
    function method_set_decay_res(runtime, decay_res) {
        const members = runtime.members;
        members.m_decay_res = decay_res;
    }
    function method_set_attack_params(runtime, decay_cap, res) {
        const members = runtime.members;
        members.m_attack_decay_cap = decay_cap;
        members.m_attack_res = res;
    }
    function method_set_amp_res(runtime, amp_res) {
        const members = runtime.members;
        members.m_amplitude_res = amp_res;
    }
    function method_set_feedback_res(runtime, feedback_res) {
        const members = runtime.members;
        members.m_feedback_res = feedback_res;
    }
    function method_set_vco_params(runtime, volt, cap, res) {
        const members = runtime.members;
        members.m_vco_voltage = volt;
        members.m_vco_cap = cap;
        members.m_vco_res = res;
    }
    function method_set_pitch_voltage(runtime, volt) {
        const members = runtime.members;
        members.m_pitch_voltage = volt;
    }
    function method_set_slf_params(runtime, cap, res) {
        const members = runtime.members;
        members.m_slf_cap = cap;
        members.m_slf_res = res;
    }
    function method_set_oneshot_params(runtime, cap, res) {
        const members = runtime.members;
        members.m_one_shot_cap = cap;
        members.m_one_shot_res = res;
    }
    function method_set_vco_mode(runtime, mode) {
        const members = runtime.members;
        members.m_vco_mode = ((mode) >>> 0);
    }
    function method_set_mixer_params(runtime, a, b, c) {
        const members = runtime.members;
        members.m_mixer_a = ((a) >>> 0);
        members.m_mixer_b = ((b) >>> 0);
        members.m_mixer_c = ((c) >>> 0);
    }
    function method_set_envelope_params(runtime, env1, env2) {
        const members = runtime.members;
        members.m_envelope_1 = ((env1) >>> 0);
        members.m_envelope_2 = ((env2) >>> 0);
    }
    function method_set_enable(runtime, enable) {
        const members = runtime.members;
        members.m_enable = ((enable) >>> 0);
    }
    function method_sn76477_device__set_noise_params(runtime, clock_res, filter_res, filter_cap) {
        const members = runtime.members;
        members.m_noise_clock_res = clock_res;
        members.m_noise_filter_res = filter_res;
        members.m_noise_filter_cap = filter_cap;
    }
    function method_sn76477_device__set_decay_res(runtime, decay_res) {
        const members = runtime.members;
        members.m_decay_res = decay_res;
    }
    function method_sn76477_device__set_attack_params(runtime, decay_cap, res) {
        const members = runtime.members;
        members.m_attack_decay_cap = decay_cap;
        members.m_attack_res = res;
    }
    function method_sn76477_device__set_amp_res(runtime, amp_res) {
        const members = runtime.members;
        members.m_amplitude_res = amp_res;
    }
    function method_sn76477_device__set_feedback_res(runtime, feedback_res) {
        const members = runtime.members;
        members.m_feedback_res = feedback_res;
    }
    function method_sn76477_device__set_vco_params(runtime, volt, cap, res) {
        const members = runtime.members;
        members.m_vco_voltage = volt;
        members.m_vco_cap = cap;
        members.m_vco_res = res;
    }
    function method_sn76477_device__set_pitch_voltage(runtime, volt) {
        const members = runtime.members;
        members.m_pitch_voltage = volt;
    }
    function method_sn76477_device__set_slf_params(runtime, cap, res) {
        const members = runtime.members;
        members.m_slf_cap = cap;
        members.m_slf_res = res;
    }
    function method_sn76477_device__set_oneshot_params(runtime, cap, res) {
        const members = runtime.members;
        members.m_one_shot_cap = cap;
        members.m_one_shot_res = res;
    }
    function method_sn76477_device__set_vco_mode(runtime, mode) {
        const members = runtime.members;
        members.m_vco_mode = ((mode) >>> 0);
    }
    function method_sn76477_device__set_mixer_params(runtime, a, b, c) {
        const members = runtime.members;
        members.m_mixer_a = ((a) >>> 0);
        members.m_mixer_b = ((b) >>> 0);
        members.m_mixer_c = ((c) >>> 0);
    }
    function method_sn76477_device__set_envelope_params(runtime, env1, env2) {
        const members = runtime.members;
        members.m_envelope_1 = ((env1) >>> 0);
        members.m_envelope_2 = ((env2) >>> 0);
    }
    function method_sn76477_device__set_enable(runtime, enable) {
        const members = runtime.members;
        members.m_enable = ((enable) >>> 0);
    }
    function method_CAP_N(runtime, cap) {
        const members = runtime.members;
        return ((cap) * (1e-9));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "intialize_noise": method_intialize_noise,
        "mixer_a_w": method_mixer_a_w,
        "log_mixer_mode": method_log_mixer_mode,
        "mixer_b_w": method_mixer_b_w,
        "mixer_c_w": method_mixer_c_w,
        "envelope_1_w": method_envelope_1_w,
        "log_envelope_mode": method_log_envelope_mode,
        "envelope_2_w": method_envelope_2_w,
        "state_save_register": method_state_save_register,
        "log_complete_state": method_log_complete_state,
        "log_enable_line": method_log_enable_line,
        "log_vco_mode": method_log_vco_mode,
        "log_one_shot_time": method_log_one_shot_time,
        "compute_one_shot_cap_charging_rate": method_compute_one_shot_cap_charging_rate,
        "log_slf_freq": method_log_slf_freq,
        "compute_slf_cap_charging_rate": method_compute_slf_cap_charging_rate,
        "compute_slf_cap_discharging_rate": method_compute_slf_cap_discharging_rate,
        "log_vco_freq": method_log_vco_freq,
        "compute_vco_cap_charging_discharging_rate": method_compute_vco_cap_charging_discharging_rate,
        "log_vco_ext_voltage": method_log_vco_ext_voltage,
        "log_vco_pitch_voltage": method_log_vco_pitch_voltage,
        "log_vco_duty_cycle": method_log_vco_duty_cycle,
        "log_noise_filter_freq": method_log_noise_filter_freq,
        "compute_noise_filter_cap_charging_rate": method_compute_noise_filter_cap_charging_rate,
        "log_noise_gen_freq": method_log_noise_gen_freq,
        "compute_noise_gen_freq": method_compute_noise_gen_freq,
        "log_attack_time": method_log_attack_time,
        "compute_attack_decay_cap_charging_rate": method_compute_attack_decay_cap_charging_rate,
        "log_decay_time": method_log_decay_time,
        "compute_attack_decay_cap_discharging_rate": method_compute_attack_decay_cap_discharging_rate,
        "log_voltage_out": method_log_voltage_out,
        "open_wav_file": method_open_wav_file,
        "device_stop": method_device_stop,
        "close_wav_file": method_close_wav_file,
        "compute_one_shot_cap_discharging_rate": method_compute_one_shot_cap_discharging_rate,
        "compute_vco_duty_cycle": method_compute_vco_duty_cycle,
        "max": method_max,
        "min": method_min,
        "compute_noise_filter_cap_discharging_rate": method_compute_noise_filter_cap_discharging_rate,
        "compute_center_to_peak_voltage_out": method_compute_center_to_peak_voltage_out,
        "add_wav_data": method_add_wav_data,
        "generate_next_real_noise_bit": method_generate_next_real_noise_bit,
        "enable_w": method_enable_w,
        "vco_w": method_vco_w,
        "one_shot_res_w": method_one_shot_res_w,
        "one_shot_cap_w": method_one_shot_cap_w,
        "one_shot_cap_voltage_w": method_one_shot_cap_voltage_w,
        "slf_res_w": method_slf_res_w,
        "slf_cap_w": method_slf_cap_w,
        "slf_cap_voltage_w": method_slf_cap_voltage_w,
        "vco_res_w": method_vco_res_w,
        "vco_cap_w": method_vco_cap_w,
        "vco_cap_voltage_w": method_vco_cap_voltage_w,
        "vco_voltage_w": method_vco_voltage_w,
        "pitch_voltage_w": method_pitch_voltage_w,
        "noise_clock_w": method_noise_clock_w,
        "noise_clock_res_w": method_noise_clock_res_w,
        "noise_filter_res_w": method_noise_filter_res_w,
        "noise_filter_cap_w": method_noise_filter_cap_w,
        "noise_filter_cap_voltage_w": method_noise_filter_cap_voltage_w,
        "attack_res_w": method_attack_res_w,
        "decay_res_w": method_decay_res_w,
        "attack_decay_cap_w": method_attack_decay_cap_w,
        "attack_decay_cap_voltage_w": method_attack_decay_cap_voltage_w,
        "amplitude_res_w": method_amplitude_res_w,
        "feedback_res_w": method_feedback_res_w,
        "sound_stream_update": method_sound_stream_update,
        "set_noise_params": method_set_noise_params,
        "set_decay_res": method_set_decay_res,
        "set_attack_params": method_set_attack_params,
        "set_amp_res": method_set_amp_res,
        "set_feedback_res": method_set_feedback_res,
        "set_vco_params": method_set_vco_params,
        "set_pitch_voltage": method_set_pitch_voltage,
        "set_slf_params": method_set_slf_params,
        "set_oneshot_params": method_set_oneshot_params,
        "set_vco_mode": method_set_vco_mode,
        "set_mixer_params": method_set_mixer_params,
        "set_envelope_params": method_set_envelope_params,
        "set_enable": method_set_enable,
        "sn76477_device::set_noise_params": method_sn76477_device__set_noise_params,
        "sn76477_device::set_decay_res": method_sn76477_device__set_decay_res,
        "sn76477_device::set_attack_params": method_sn76477_device__set_attack_params,
        "sn76477_device::set_amp_res": method_sn76477_device__set_amp_res,
        "sn76477_device::set_feedback_res": method_sn76477_device__set_feedback_res,
        "sn76477_device::set_vco_params": method_sn76477_device__set_vco_params,
        "sn76477_device::set_pitch_voltage": method_sn76477_device__set_pitch_voltage,
        "sn76477_device::set_slf_params": method_sn76477_device__set_slf_params,
        "sn76477_device::set_oneshot_params": method_sn76477_device__set_oneshot_params,
        "sn76477_device::set_vco_mode": method_sn76477_device__set_vco_mode,
        "sn76477_device::set_mixer_params": method_sn76477_device__set_mixer_params,
        "sn76477_device::set_envelope_params": method_sn76477_device__set_envelope_params,
        "sn76477_device::set_enable": method_sn76477_device__set_enable,
        "CAP_N": method_CAP_N
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "clock", "machine", "machine().sample_rate", "save_item", "std::replace", "stream_alloc", "tag", "util::string_format", "util::wav_add_data_16lr", "util::wav_open"];
export const device = definition;
export default device;
