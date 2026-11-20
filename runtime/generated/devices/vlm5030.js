import deviceData from './vlm5030.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [40, 30, 20, 20, 40, 60, 50, 50];
    const cppScratch_sound_stream_update_u = new Int32Array(new Uint8Array(Math.max(0, Number(11))));
    function method_bsy_r(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_bsy_r(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        return (((members.m_pin_BSY ?? 0)) | 0);
    }
    function __deref_bsy_r(runtime, p) {
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
    function method_data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_latch_data = ((data) & 0xff);
    }
    function method_rst_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        state = ((((state) ? (1) : (0))) | 0);
        if (((((members.m_pin_RST ?? 0)) !== (state)) ? 1 : 0)) {
            (__t0 = __deref_rst_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_pin_RST = ((state) & 0xff);
            if (((state) ? 0 : 1)) {
                method_setup_parameter(runtime, (members.m_latch_data ?? 0));
            }
            else {
                if ((members.m_pin_BSY ?? 0)) {
                    method_device_reset(runtime);
                }
            }
        }
    }
    function __deref_rst_w(runtime, p) {
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
    function method_setup_parameter(runtime, param) {
        const members = runtime.members;
        param = ((param) & 0xff);
        members.m_parameter = ((param) & 0xff);
        if (((param) & (2))) {
            members.m_interp_step = ((4) & 0xff);
        }
        else {
            if (((param) & (1))) {
                members.m_interp_step = ((2) & 0xff);
            }
            else {
                members.m_interp_step = ((1) & 0xff);
            }
        }
        members.m_frame_size = (((__mame_table_0[(((((((param) >>> (3))) & (7))) % 8) + 8) % 8] ?? 0)) | 0);
        if (((param) & (128))) {
            members.m_pitch_offset = ((-8) | 0);
        }
        else {
            if (((param) & (64))) {
                members.m_pitch_offset = ((8) | 0);
            }
            else {
                members.m_pitch_offset = ((0) | 0);
            }
        }
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const h_m_old_k = members.m_old_k ?? 0;
        const h_m_new_k = members.m_new_k ?? 0;
        const h_m_current_k = members.m_current_k ?? 0;
        const h_m_target_k = members.m_target_k ?? 0;
        const h_m_x = members.m_x ?? 0;
        members.m_phase = ((0) & 0xff);
        members.m_address = ((0) & 0xffff);
        members.m_vcu_addr_h = ((0) & 0xffff);
        members.m_pin_BSY = ((0) & 0xff);
        members.m_old_energy = (((members.m_old_pitch = ((0) & 0xff))) & 0xffff);
        members.m_new_energy = (((members.m_new_pitch = ((0) & 0xff))) & 0xffff);
        members.m_current_energy = (((members.m_current_pitch = ((0) >>> 0))) >>> 0);
        members.m_target_energy = (((members.m_target_pitch = ((0) & 0xff))) & 0xffff);
        cppMemset(runtime, h_m_old_k, 0, 20);
        cppMemset(runtime, h_m_new_k, 0, 20);
        cppMemset(runtime, h_m_current_k, 0, 10);
        cppMemset(runtime, h_m_target_k, 0, 20);
        members.m_interp_count = (((members.m_sample_count = (((members.m_pitch_count = ((0) & 0xff))) & 0xff))) & 0xff);
        cppMemset(runtime, h_m_x, 0, 40);
        method_setup_parameter(runtime, 0);
    }
    function method_vcu_w(runtime, state) {
        const members = runtime.members;
        members.m_pin_VCU = ((((state) ? (1) : (0))) & 0xff);
    }
    function method_st_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["read_byte"];
        let __t0;
        state = ((((state) ? (1) : (0))) | 0);
        if (((((members.m_pin_ST ?? 0)) !== (state)) ? 1 : 0)) {
            (__t0 = __deref_st_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
            members.m_pin_ST = ((state) & 0xff);
            if (((state) ? 0 : 1)) {
                if ((members.m_pin_VCU ?? 0)) {
                    members.m_vcu_addr_h = ((__add_st_w(runtime, (((((members.m_latch_data ?? 0)) | 0)) << (8)), 1)) & 0xffff);
                }
                else {
                    if ((members.m_vcu_addr_h ?? 0)) {
                        members.m_address = (((((((members.m_vcu_addr_h ?? 0)) & (65280))) + ((members.m_latch_data ?? 0)))) & 0xffff);
                        members.m_vcu_addr_h = ((0) & 0xffff);
                    }
                    else {
                        let table = ((__add_st_w(runtime, (((members.m_latch_data ?? 0)) & (254)), (((((((members.m_latch_data ?? 0)) | 0)) & (1))) << (8)))) | 0);
                        members.m_address = (((((((__L0 ? __L0(table) : runtime.macro("read_byte", table))) << (8))) | ((__L0 ? __L0(((table) + (1))) : runtime.macro("read_byte", ((table) + (1))))))) & 0xffff);
                    }
                    members.m_sample_count = (((members.m_frame_size ?? 0)) & 0xff);
                    members.m_interp_count = ((4) & 0xff);
                    members.m_phase = ((4) & 0xff);
                }
            }
            else {
                members.m_phase = ((2) & 0xff);
                members.m_sample_count = ((1) & 0xff);
                members.m_pin_BSY = ((1) & 0xff);
            }
        }
    }
    function __add_st_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_st_w(runtime, p) {
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
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().rand"];
        let __t0, __t1, __t2, __t3, __t4;
        const h_m_old_k = members.m_old_k ?? 0;
        const h_m_current_k = members.m_current_k ?? 0;
        const h_m_target_k = members.m_target_k ?? 0;
        const h_m_new_k = members.m_new_k ?? 0;
        const h_m_x = members.m_x ?? 0;
        let __goto_phase_stop = ((0) | 0);
        while (1) {
            if ((((((Number((members.m_phase ?? 0)) === Number(4)) ? 1 : 0)) || (((Number((members.m_phase ?? 0)) === Number(5)) ? 1 : 0))) ? 1 : 0)) {
                let u = cppScratch_sound_stream_update_u.fill(0);
                for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                    let current_val = ((0) | 0);
                    if (((((members.m_sample_count ?? 0)) === (0)) ? 1 : 0)) {
                        if (((Number((members.m_phase ?? 0)) === Number(5)) ? 1 : 0)) {
                            members.m_phase = ((6) & 0xff);
                            members.m_sample_count = ((1) & 0xff);
                            __goto_phase_stop = ((1) | 0);
                            break;
                        }
                        members.m_sample_count = (((members.m_frame_size ?? 0)) & 0xff);
                        if (((((members.m_interp_count ?? 0)) === (0)) ? 1 : 0)) {
                            members.m_interp_count = ((method_parse_frame(runtime)) & 0xff);
                            if (((((members.m_interp_count ?? 0)) === (0)) ? 1 : 0)) {
                                members.m_interp_count = ((4) & 0xff);
                                members.m_sample_count = (((members.m_frame_size ?? 0)) & 0xff);
                                members.m_phase = ((5) & 0xff);
                            }
                            members.m_current_energy = (((members.m_old_energy ?? 0)) >>> 0);
                            members.m_current_pitch = (((members.m_old_pitch ?? 0)) >>> 0);
                            for (let i = ((0) | 0); (((i) <= (9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                h_m_current_k[i] = h_m_old_k[i];
                            }
                            if (((Number((members.m_current_energy ?? 0)) === Number(0)) ? 1 : 0)) {
                                members.m_target_energy = ((0) & 0xffff);
                                members.m_target_pitch = (((members.m_current_pitch ?? 0)) & 0xff);
                                for (let i = ((0) | 0); (((i) <= (9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                    h_m_target_k[i] = h_m_current_k[i];
                                }
                            }
                            else {
                                members.m_target_energy = (((members.m_new_energy ?? 0)) & 0xffff);
                                members.m_target_pitch = (((members.m_new_pitch ?? 0)) & 0xff);
                                for (let i = ((0) | 0); (((i) <= (9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                    h_m_target_k[i] = h_m_new_k[i];
                                }
                            }
                        }
                        members.m_interp_count = ((((members.m_interp_count) - ((members.m_interp_step ?? 0)))) & 0xff);
                        let interp_effect = ((((4) - ((((members.m_interp_count ?? 0)) % (4))))) | 0);
                        members.m_current_energy = (((((members.m_old_energy ?? 0)) + (runtime.divide((((((members.m_target_energy ?? 0)) - ((members.m_old_energy ?? 0)))) * (interp_effect)), 4)))) >>> 0);
                        if (((((members.m_old_pitch ?? 0)) > (1)) ? 1 : 0)) {
                            members.m_current_pitch = (((((members.m_old_pitch ?? 0)) + (runtime.divide((((((members.m_target_pitch ?? 0)) - ((members.m_old_pitch ?? 0)))) * (interp_effect)), 4)))) >>> 0);
                        }
                        for (let i = ((0) | 0); (((i) <= (9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            h_m_current_k[i] = ((h_m_old_k[i]) + (runtime.divide(((((h_m_target_k[i]) - (h_m_old_k[i]))) * (interp_effect)), 4)));
                        }
                    }
                    if (((((members.m_old_energy ?? 0)) === (0)) ? 1 : 0)) {
                        current_val = ((0) | 0);
                    }
                    else {
                        if (((((members.m_old_pitch ?? 0)) <= (1)) ? 1 : 0)) {
                            current_val = ((((((((__L1 ?? globalThis.mamekitMissingCall?.("machine().rand"))?.() ?? 0)) & (1))) ? ((members.m_current_energy ?? 0)) : ((-(members.m_current_energy ?? 0))))) | 0);
                        }
                        else {
                            current_val = ((((((((members.m_pitch_count ?? 0)) === (0)) ? 1 : 0)) ? ((members.m_current_energy ?? 0)) : (0))) | 0);
                        }
                    }
                    u[10] = current_val;
                    for (let i = ((9) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                        u[i] = (((u[((i) + (1))] ?? 0)) - (runtime.divide((((-h_m_current_k[i])) * (h_m_x[i])), 512)));
                    }
                    for (let i = ((9) | 0); (((i) >= (1)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                        h_m_x[i] = ((h_m_x[((i) - (1))]) + (runtime.divide((((-h_m_current_k[((i) - (1))])) * ((u[((i) - (1))] ?? 0))), 512)));
                    }
                    h_m_x[0] = (u[0] ?? 0);
                    (__deref_sound_stream_update(runtime, stream).put_int_clamp?.(0, sampindex, (u[0] ?? 0), 512) ?? 0);
                    members.m_sample_count = ((((members.m_sample_count) - (1))) & 0xff);
                    members.m_pitch_count = ((((members.m_pitch_count) + (1))) & 0xff);
                    if (((Number((members.m_pitch_count ?? 0)) >= Number((members.m_current_pitch ?? 0))) ? 1 : 0)) {
                        members.m_pitch_count = ((0) & 0xff);
                    }
                }
                if (__goto_phase_stop) {
                    break;
                }
            }
            break;
        }
        switch ((members.m_phase ?? 0)) {
            case 2:
                {
                    if (((Number((members.m_sample_count ?? 0)) <= Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0)) {
                        members.m_sample_count = ((0) & 0xff);
                        members.m_phase = ((3) & 0xff);
                    }
                    else {
                        members.m_sample_count = ((((members.m_sample_count) - ((__t2 = __deref_sound_stream_update(runtime, stream), typeof __t2.samples === 'function' ? __t2.samples() : typeof __t2.samples === 'number' || typeof __t2.samples === 'boolean' ? __t2.samples : runtime.container(stream, "samples"))))) & 0xff);
                    }
                    break;
                }
            case 6:
                {
                    if (((Number((members.m_sample_count ?? 0)) <= Number((__t3 = __deref_sound_stream_update(runtime, stream), typeof __t3.samples === 'function' ? __t3.samples() : typeof __t3.samples === 'number' || typeof __t3.samples === 'boolean' ? __t3.samples : runtime.container(stream, "samples")))) ? 1 : 0)) {
                        members.m_sample_count = ((0) & 0xff);
                        members.m_pin_BSY = ((0) & 0xff);
                        members.m_phase = ((1) & 0xff);
                    }
                    else {
                        members.m_sample_count = ((((members.m_sample_count) - ((__t4 = __deref_sound_stream_update(runtime, stream), typeof __t4.samples === 'function' ? __t4.samples() : typeof __t4.samples === 'number' || typeof __t4.samples === 'boolean' ? __t4.samples : runtime.container(stream, "samples"))))) & 0xff);
                    }
                }
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
    function method_parse_frame(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["read_byte"];
        const h_m_new_k = members.m_new_k ?? 0;
        const h_m_old_k = members.m_old_k ?? 0;
        members.m_old_energy = (((members.m_new_energy ?? 0)) & 0xffff);
        members.m_old_pitch = (((members.m_new_pitch ?? 0)) & 0xff);
        for (let i = ((0) | 0); (((i) <= (9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_old_k[i] = h_m_new_k[i];
        }
        let cmd = (((__L0 ? __L0((members.m_address ?? 0)) : runtime.macro("read_byte", (members.m_address ?? 0)))) & 0xff);
        if (((cmd) & (1))) {
            members.m_new_energy = (((members.m_new_pitch = ((0) & 0xff))) & 0xffff);
            for (let i = ((0) | 0); (((i) <= (9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                h_m_new_k[i] = 0;
            }
            members.m_address = ((((members.m_address) + (1))) & 0xffff);
            if (((cmd) & (2))) {
                return ((0) | 0);
            }
            else {
                let nums = ((((__add_parse_frame(runtime, ((cmd) >>> (2)), 1)) * (2))) | 0);
                return ((((nums) * (4))) | 0);
            }
        }
        members.m_new_pitch = ((__deref_parse_frame(runtime, (members.m_coeff ?? 0)).pitchtable[method_get_bits(runtime, 1, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).pitch_bits)]) & 0xff);
        if (((((members.m_new_pitch ?? 0)) > (0)) ? 1 : 0)) {
            members.m_new_pitch = ((((members.m_new_pitch) + ((members.m_pitch_offset ?? 0)))) & 0xff);
        }
        members.m_new_energy = ((__deref_parse_frame(runtime, (members.m_coeff ?? 0)).energytable[method_get_bits(runtime, 6, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).energy_bits)]) & 0xffff);
        h_m_new_k[9] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[9], method_get_bits(runtime, 11, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[9]));
        h_m_new_k[8] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[8], method_get_bits(runtime, 14, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[8]));
        h_m_new_k[7] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[7], method_get_bits(runtime, 17, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[7]));
        h_m_new_k[6] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[6], method_get_bits(runtime, 20, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[6]));
        h_m_new_k[5] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[5], method_get_bits(runtime, 23, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[5]));
        h_m_new_k[4] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[4], method_get_bits(runtime, 26, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[4]));
        h_m_new_k[3] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[3], method_get_bits(runtime, 29, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[3]));
        h_m_new_k[2] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[2], method_get_bits(runtime, 33, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[2]));
        h_m_new_k[1] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[1], method_get_bits(runtime, 37, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[1]));
        h_m_new_k[0] = runtime.readIndex(__deref_parse_frame(runtime, (members.m_coeff ?? 0)).ktable[0], method_get_bits(runtime, 42, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[0]));
        members.m_address = ((((members.m_address) + (6))) & 0xffff);
        0;
        return ((4) | 0);
    }
    function __add_parse_frame(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_parse_frame(runtime, p) {
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
    function method_get_bits(runtime, sbit, bits) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["read_byte"];
        let offset = (((((members.m_address ?? 0)) + (runtime.shiftRight(sbit, 3)))) | 0);
        let data = (((((__L0 ? __L0(offset) : runtime.macro("read_byte", offset))) | ((((__L0 ? __L0(((offset) + (1))) : runtime.macro("read_byte", ((offset) + (1))))) << (8))))) | 0);
        data = ((((data) >> (((sbit) & (7))))) | 0);
        data = ((((data) & (runtime.shiftRight(255, ((8) - (bits)))))) | 0);
        return ((data) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "bsy_r": method_bsy_r,
        "data_w": method_data_w,
        "rst_w": method_rst_w,
        "setup_parameter": method_setup_parameter,
        "device_reset": method_device_reset,
        "vcu_w": method_vcu_w,
        "st_w": method_st_w,
        "sound_stream_update": method_sound_stream_update,
        "parse_frame": method_parse_frame,
        "get_bits": method_get_bits
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["machine", "machine().rand", "read_byte"];
export const device = definition;
export default device;
