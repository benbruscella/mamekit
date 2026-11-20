import deviceData from './cassette.device.ir.json' with { type: 'json' };
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
    function method_update(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        let cur_time = (typeof ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : (__deref_update(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_double?.() ?? 0));
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            let new_position = (((members.m_position ?? 0)) + (((((((cur_time) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
            switch ((((members.m_state ?? 0)) & (3))) {
                case 2:
                    {
                        (__deref_update(runtime, members.m_cassette).put_sample?.((members.m_channel ?? 0), (members.m_position ?? 0), ((new_position) - ((members.m_position ?? 0))), (members.m_value ?? 0)) ?? 0);
                        break;
                    }
                case 1:
                    {
                        if ((members.m_cassette ?? 0)) {
                            (__deref_update(runtime, members.m_cassette).get_sample?.((members.m_channel ?? 0), new_position, 0, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_value ?? 0), set: (value) => { members.m_value = ((value) | 0); } }), offset: 0 })) ?? 0);
                            let length = method_get_length(runtime);
                            if ((((new_position) > (length)) ? 1 : 0)) {
                                members.m_state = (((((members.m_state ?? 0)) & (-4))) | (0));
                                new_position = length;
                            }
                            else {
                                if ((((new_position) < (0)) ? 1 : 0)) {
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
    function __deref_update(runtime, p) {
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
        let __t0;
        let info = (__t0 = __deref_get_length(runtime, members.m_cassette), typeof __t0.get_info === 'function' ? __t0.get_info() : typeof __t0.get_info === 'number' || typeof __t0.get_info === 'boolean' ? __t0.get_info : runtime.container(members.m_cassette, "get_info"));
        return ((info.sample_count) / (info.sample_frequency));
    }
    function __deref_get_length(runtime, p) {
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
        const __L0 = __l["std::clamp"];
        if ((((((Number((((members.m_state ?? 0)) & (3))) === Number(2)) ? 1 : 0)) && (((((members.m_value ?? 0)) !== (value)) ? 1 : 0))) ? 1 : 0)) {
            method_update(runtime);
            value = (__L0 ? __L0(value, (-1), 1) : runtime.macro("std::clamp", value, (-1), 1));
            members.m_value = ((((((value) * (2147483647))) | 0)) | 0);
        }
    }
    function method_get_position(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        let position = (members.m_position ?? 0);
        if ((((((method_is_stopped(runtime)) ? 0 : 1)) && (method_motor_on(runtime))) ? 1 : 0)) {
            position = ((position) + ((((((((typeof ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : (__deref_get_position(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_double?.() ?? 0))) - ((members.m_position_time ?? 0)))) * ((members.m_speed ?? 0)))) * ((members.m_direction ?? 0)))));
        }
        return position;
    }
    function __deref_get_position(runtime, p) {
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
        const __L0 = __l["std::clamp"];
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
        members.m_position = (__L0 ? __L0(time, 0, length) : runtime.macro("std::clamp", time, 0, length));
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().sample_rate"], __L2 = __l["stream_alloc"], __L3 = __l["NAME"], __L4 = __l["save_item"];
        const h_m_default_state = members.m_default_state ?? 0;
        const h_m_stereo = members.m_stereo ?? 0;
        members.m_cassette = 0;
        members.m_state = h_m_default_state;
        members.m_value = ((0) | 0);
        (__L2 ? __L2(0, ((h_m_stereo) ? (2) : (1)), ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, ((h_m_stereo) ? (2) : (1)), ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        (__L4 ? __L4((__L3 ? __L3((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_position_time ?? 0)) : runtime.macro("NAME", (members.m_position_time ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_value ?? 0)) : runtime.macro("NAME", (members.m_value ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_channel ?? 0)) : runtime.macro("NAME", (members.m_channel ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_speed ?? 0)) : runtime.macro("NAME", (members.m_speed ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_direction ?? 0)) : runtime.macro("NAME", (members.m_direction ?? 0)))));
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
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        const h_m_default_state = members.m_default_state ?? 0;
        if (((image) ? 0 : 1)) {
            return;
        }
        members.m_cassette = image;
        method_change_state(runtime, h_m_default_state, 3);
        members.m_position = 0;
        members.m_position_time = (typeof ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) : (__deref_mount_image(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_double?.() ?? 0));
        members.m_channel = ((0) | 0);
        members.m_speed = 1;
        members.m_direction = ((1) | 0);
    }
    function __deref_mount_image(runtime, p) {
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
        const __L0 = __l["exists"], __L1 = __l["get_image"];
        let __t0, __t1, __t2, __t3;
        let state = ((method_get_state(runtime)) & (15));
        if (((((__L0 ? __L0() : runtime.macro("exists"))) && (((Number(state) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
            let samples = (((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples"))) | 0);
            let cassette = (__L1 ? __L1() : runtime.macro("get_image"));
            let cassette$s = undefined, cassette$o = 0;
            if (ArrayBuffer.isView(cassette) || Array.isArray(cassette))
                cassette$s = cassette;
            else if (cassette !== null && typeof cassette === 'object' && cassette.generatedPointer === true && cassette.path === undefined && cassette.target === undefined && (ArrayBuffer.isView(cassette.source) || Array.isArray(cassette.source))) {
                cassette$s = cassette.source;
                cassette$o = cassette.offset;
            }
            let time_index = method_get_position(runtime);
            let duration = ((samples) / ((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.sample_rate === 'function' ? __t1.sample_rate() : typeof __t1.sample_rate === 'number' || typeof __t1.sample_rate === 'boolean' ? __t1.sample_rate : runtime.container(stream, "sample_rate"))));
            if (((Number((members.m_samples).length) < Number(samples)) ? 1 : 0)) {
                (members.m_samples = runtime.resize(members.m_samples, samples));
            }
            let info = (__t2 = __deref_sound_stream_update(runtime, cassette), typeof __t2.get_info === 'function' ? __t2.get_info() : typeof __t2.get_info === 'number' || typeof __t2.get_info === 'boolean' ? __t2.get_info : runtime.container(cassette, "get_info"));
            for (let ch = ((0) | 0); ((Number(ch) < Number((__t3 = __deref_sound_stream_update(runtime, stream), typeof __t3.output_count === 'function' ? __t3.output_count() : typeof __t3.output_count === 'number' || typeof __t3.output_count === 'boolean' ? __t3.output_count : runtime.container(stream, "output_count")))) ? 1 : 0); ch = ((((ch) + (1))) | 0)) {
                if (((Number(ch) < Number(info.channels)) ? 1 : 0)) {
                    (__deref_sound_stream_update(runtime, cassette).get_samples?.(ch, time_index, duration, samples, 2, __addr_sound_stream_update(runtime, (members.m_samples ?? 0), 0), 2) ?? 0);
                }
                else {
                    (__deref_sound_stream_update(runtime, cassette).get_samples?.(0, time_index, duration, samples, 2, __addr_sound_stream_update(runtime, (members.m_samples ?? 0), 0), 2) ?? 0);
                }
                for (let sampindex = ((0) | 0); (((sampindex) < (samples)) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                    (__deref_sound_stream_update(runtime, stream).put_int?.(ch, sampindex, runtime.readIndex((members.m_samples ?? 0), sampindex), 32768) ?? 0);
                }
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
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
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
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "exists", "get_image", "machine", "machine().sample_rate", "machine().time", "save_item", "std::clamp", "stream_alloc"];
definition.imageFormats[0].definition.compiledMethods = (() => {
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
    const cppScratch_wavfile_process_file_header = new Uint8Array(Math.max(0, Number(12)));
    const cppScratch_wavfile_process_tag_header = new Uint8Array(Math.max(0, Number(8)));
    const cppScratch_wavfile_process_format_tag = new Uint8Array(Math.max(0, Number(16)));
    function method_wavfile_process(runtime, cassette, opts, read_waveform) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["memcmp"], __L1 = __l["get_u32le"], __L2 = __l["get_u16le"];
        let __t0;
        const h_magic1 = members.magic1 ?? 0;
        const h_magic2 = members.magic2 ?? 0;
        const h_format_tag_id = members.format_tag_id ?? 0;
        const h_data_tag_id = members.data_tag_id ?? 0;
        let file_header = cppScratch_wavfile_process_file_header.fill(0);
        let tag_header = cppScratch_wavfile_process_tag_header.fill(0);
        let format_tag = cppScratch_wavfile_process_format_tag.fill(0);
        let stated_size = ((0) >>> 0);
        let file_size = 0;
        let tag_size = ((0) >>> 0);
        let tag_samples = ((0) >>> 0);
        let offset = 0;
        let format_specified = ((0) ? 1 : 0);
        let format_type = ((0) & 0xffff);
        let bytes_per_second = ((0) >>> 0);
        let waveform_flags = ((0) | 0);
        (__deref_wavfile_process(runtime, cassette).image_read?.(file_header, 0, ((file_header)?.byteLength ?? 1)) ?? 0);
        offset = ((file_header)?.byteLength ?? 1);
        if ((__L0 ? __L0(({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 0 }), h_magic1, 4))) {
            return 4;
        }
        if ((__L0 ? __L0(({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: file_header, offset: 8 }), h_magic2, 4))) {
            return 4;
        }
        stated_size = ((__add_wavfile_process(runtime, (__L1 ? __L1(({ generatedPointer: true, source: file_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: file_header, offset: 4 }))), 8)) >>> 0);
        file_size = (__t0 = __deref_wavfile_process(runtime, cassette), typeof __t0.image_size === 'function' ? __t0.image_size() : typeof __t0.image_size === 'number' || typeof __t0.image_size === 'boolean' ? __t0.image_size : runtime.container(cassette, "image_size"));
        if (((Number(stated_size) > Number(file_size)) ? 1 : 0)) {
            stated_size = ((((file_size) >>> 0)) >>> 0);
        }
        while (((Number(offset) < Number(stated_size)) ? 1 : 0)) {
            (__deref_wavfile_process(runtime, cassette).image_read?.(tag_header, offset, ((tag_header)?.byteLength ?? 1)) ?? 0);
            tag_size = (((__L1 ? __L1(({ generatedPointer: true, source: tag_header, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: tag_header, offset: 4 })))) >>> 0);
            offset = ((offset) + (((tag_header)?.byteLength ?? 1)));
            if ((((__L0 ? __L0(tag_header, h_format_tag_id, 4) : runtime.macro("memcmp", tag_header, h_format_tag_id, 4))) ? 0 : 1)) {
                if ((((format_specified) || (((Number(tag_size) < Number(((format_tag)?.byteLength ?? 1))) ? 1 : 0))) ? 1 : 0)) {
                    return 4;
                }
                format_specified = ((1) ? 1 : 0);
                (__deref_wavfile_process(runtime, cassette).image_read?.(format_tag, offset, ((format_tag)?.byteLength ?? 1)) ?? 0);
                format_type = (((__L2 ? __L2(({ generatedPointer: true, source: format_tag, offset: 0 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 0 })))) & 0xffff);
                __deref_wavfile_process(runtime, opts).channels = (__L2 ? __L2(({ generatedPointer: true, source: format_tag, offset: 2 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 2 })));
                __deref_wavfile_process(runtime, opts).sample_frequency = (__L1 ? __L1(({ generatedPointer: true, source: format_tag, offset: 4 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 4 })));
                bytes_per_second = (((__L1 ? __L1(({ generatedPointer: true, source: format_tag, offset: 8 })) : runtime.macro("get_u32le", ({ generatedPointer: true, source: format_tag, offset: 8 })))) >>> 0);
                __deref_wavfile_process(runtime, opts).bits_per_sample = (__L2 ? __L2(({ generatedPointer: true, source: format_tag, offset: 14 })) : runtime.macro("get_u16le", ({ generatedPointer: true, source: format_tag, offset: 14 })));
                if (((Number(format_type) !== Number(1)) ? 1 : 0)) {
                    return 4;
                }
                if (((Number(runtime.divide(((((__deref_wavfile_process(runtime, opts).sample_frequency) * (__deref_wavfile_process(runtime, opts).bits_per_sample))) * (__deref_wavfile_process(runtime, opts).channels)), 8)) !== Number(bytes_per_second)) ? 1 : 0)) {
                    return 4;
                }
                switch (__deref_wavfile_process(runtime, opts).bits_per_sample) {
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
                if ((((__L0 ? __L0(tag_header, h_data_tag_id, 4) : runtime.macro("memcmp", tag_header, h_data_tag_id, 4))) ? 0 : 1)) {
                    if (((format_specified) ? 0 : 1)) {
                        return 4;
                    }
                    if (read_waveform) {
                        tag_samples = ((runtime.divide(runtime.divide(tag_size, runtime.divide(__deref_wavfile_process(runtime, opts).bits_per_sample, 8)), __deref_wavfile_process(runtime, opts).channels)) >>> 0);
                        (__deref_wavfile_process(runtime, cassette).read_samples?.(__deref_wavfile_process(runtime, opts).channels, 0, ((tag_samples) / (__deref_wavfile_process(runtime, opts).sample_frequency)), tag_samples, offset, waveform_flags) ?? 0);
                    }
                }
                else {
                }
            }
            offset = ((offset) + (tag_size));
        }
        return 0;
    }
    function __add_wavfile_process(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_wavfile_process(runtime, p) {
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
        "wavfile_process": method_wavfile_process
    };
    return __methodTable;
})();
definition.imageFormats[0].definition.compiledMethodLinks = ["get_u16le", "get_u32le", "memcmp"];
definition.imageFormats[1].definition.compiledMethods = (() => {
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
        const __L0 = __l["get_u16le"], __L1 = __l["get_u24le"], __L2 = __l["get_u32le"], __L3 = __l["util::BIT"];
        let current_block = ((0) | 0);
        let size = ((0) | 0);
        members.wave_data = ((-23198) << 16 >> 16);
        let loopcount = ((0) | 0);
        let loopoffset = ((0) | 0);
        while ((((current_block) < ((members.block_count ?? 0))) ? 1 : 0)) {
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
            let cur_block$s = undefined, cur_block$o = 0;
            if (ArrayBuffer.isView(cur_block) || Array.isArray(cur_block))
                cur_block$s = cur_block;
            else if (cur_block !== null && typeof cur_block === 'object' && cur_block.generatedPointer === true && cur_block.path === undefined && cur_block.target === undefined && (ArrayBuffer.isView(cur_block.source) || Array.isArray(cur_block.source))) {
                cur_block$s = cur_block.source;
                cur_block$o = cur_block.offset;
            }
            let block_type = (((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (0)] ?? 0) : runtime.readIndex(cur_block, 0))) & 0xff);
            let tstates = ((0) & 0xffff);
            switch (block_type) {
                case 16:
                    {
                        pause_time = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 1)))) | 0);
                        data_size = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 3)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 3)))) >>> 0);
                        pilot_length = ((((((Number((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (5)] ?? 0) : runtime.readIndex(cur_block, 5))) < Number(128)) ? 1 : 0)) ? (8063) : (3223))) | 0);
                        size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, __addr_tzx_cas_do_work(runtime, cur_block, 5), pause_time, data_size, 2168, pilot_length, 667, 735, 855, 1710, 8)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 17:
                    {
                        pilot = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 1)))) | 0);
                        sync1 = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 3)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 3)))) | 0);
                        sync2 = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 5)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 5)))) | 0);
                        bit0 = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 7)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 7)))) | 0);
                        bit1 = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 9)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 9)))) | 0);
                        pilot_length = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 11)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 11)))) | 0);
                        bits_in_last_byte = (((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (13)] ?? 0) : runtime.readIndex(cur_block, 13))) | 0);
                        pause_time = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 14)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 14)))) | 0);
                        data_size = (((__L1 ? __L1(__addr_tzx_cas_do_work(runtime, cur_block, 16)) : runtime.macro("get_u24le", __addr_tzx_cas_do_work(runtime, cur_block, 16)))) >>> 0);
                        size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, __addr_tzx_cas_do_work(runtime, cur_block, 19), pause_time, data_size, pilot, pilot_length, sync1, sync2, bit0, bit1, bits_in_last_byte)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 18:
                    {
                        pilot = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 1)))) | 0);
                        pilot_length = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 3)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 3)))) | 0);
                        size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, cur_block, 0, 0, pilot, pilot_length, 0, 0, 0, 0, 0)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 19:
                    {
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (1)] ?? 0) : runtime.readIndex(cur_block, 1)))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                            pilot = ((__add_tzx_cas_do_work(runtime, (cur_block$s !== undefined ? (cur_block$s[cur_block$o + (__add_tzx_cas_do_work(runtime, 2, ((2) * (data_size))))] ?? 0) : runtime.readIndex(cur_block, __add_tzx_cas_do_work(runtime, 2, ((2) * (data_size))))), (((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (__add_tzx_cas_do_work(runtime, 3, ((2) * (data_size))))] ?? 0) : runtime.readIndex(cur_block, __add_tzx_cas_do_work(runtime, 3, ((2) * (data_size)))))) << (8)))) | 0);
                            size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, cur_block, 0, 0, pilot, 1, 0, 0, 0, 0, 0)))) | 0);
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 20:
                    {
                        bit0 = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 1)))) | 0);
                        bit1 = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 3)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 3)))) | 0);
                        bits_in_last_byte = (((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (5)] ?? 0) : runtime.readIndex(cur_block, 5))) | 0);
                        pause_time = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 6)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 6)))) | 0);
                        data_size = (((__L1 ? __L1(__addr_tzx_cas_do_work(runtime, cur_block, 8)) : runtime.macro("get_u24le", __addr_tzx_cas_do_work(runtime, cur_block, 8)))) >>> 0);
                        size = ((((size) + (method_tzx_cas_handle_block(runtime, buffer, __addr_tzx_cas_do_work(runtime, cur_block, 11), pause_time, data_size, 0, 0, 0, 0, bit0, bit1, bits_in_last_byte)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 32:
                    {
                        pause_time = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 1)))) | 0);
                        if ((((pause_time) === (0)) ? 1 : 0)) {
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
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (1)] ?? 0) : runtime.readIndex(cur_block, 1)))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 49:
                    {
                        method_ascii_block_common_log(runtime, "Message Block", block_type);
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (2)] ?? 0) : runtime.readIndex(cur_block, 2)))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                            if (((Number((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (((3) + (data_size)))] ?? 0) : runtime.readIndex(cur_block, ((3) + (data_size))))) === Number(13)) ? 1 : 0)) {
                            }
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 50:
                    {
                        method_ascii_block_common_log(runtime, "Archive Info Block", block_type);
                        total_size = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 1)))) | 0);
                        text_size = ((0) | 0);
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (3)] ?? 0) : runtime.readIndex(cur_block, 3)))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                            if (((Number((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (((4) + (text_size)))] ?? 0) : runtime.readIndex(cur_block, ((4) + (text_size))))) < Number(9)) ? 1 : 0)) {
                            }
                            else {
                            }
                            for (i = ((0) | 0); ((Number(i) < Number((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (__add_tzx_cas_do_work(runtime, ((4) + (text_size)), 1))] ?? 0) : runtime.readIndex(cur_block, __add_tzx_cas_do_work(runtime, ((4) + (text_size)), 1))))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            }
                            text_size = ((((text_size) + (((2) + (i))))) | 0);
                        }
                        if ((((text_size) !== (total_size)) ? 1 : 0)) {
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 51:
                    {
                        method_ascii_block_common_log(runtime, "Hardware Type Block", block_type);
                        for (data_size = ((0) >>> 0); ((Number(data_size) < Number((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (1)] ?? 0) : runtime.readIndex(cur_block, 1)))) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                        }
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 53:
                    {
                        method_ascii_block_common_log(runtime, "Custom Info Block", block_type);
                        for (data_size = ((0) >>> 0); (((data_size) < (16)) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
                        }
                        text_size = (((__L2 ? __L2(__addr_tzx_cas_do_work(runtime, cur_block, 17)) : runtime.macro("get_u32le", __addr_tzx_cas_do_work(runtime, cur_block, 17)))) | 0);
                        for (data_size = ((0) >>> 0); (((data_size) < (text_size)) ? 1 : 0); data_size = ((((data_size) + (1))) >>> 0)) {
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
                        loopcount = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 1)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        loopoffset = ((current_block) | 0);
                        break;
                    }
                case 37:
                    {
                        if ((((loopcount) > (0)) ? 1 : 0)) {
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
                        tstates = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 1)))) & 0xffff);
                        pause_time = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 3)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 3)))) | 0);
                        bits_in_last_byte = (((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (5)] ?? 0) : runtime.readIndex(cur_block, 5))) | 0);
                        data_size = (((__L1 ? __L1(__addr_tzx_cas_do_work(runtime, cur_block, 6)) : runtime.macro("get_u24le", __addr_tzx_cas_do_work(runtime, cur_block, 6)))) >>> 0);
                        size = ((((size) + (method_tzx_handle_direct(runtime, buffer, __addr_tzx_cas_do_work(runtime, cur_block, 9), pause_time, data_size, tstates, bits_in_last_byte)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 24:
                    {
                        /* printf: no effect */
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 25:
                    {
                        data_size = (((__L2 ? __L2(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u32le", __addr_tzx_cas_do_work(runtime, cur_block, 1)))) >>> 0);
                        pause_time = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 5)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 5)))) | 0);
                        let totp = (((__L2 ? __L2(__addr_tzx_cas_do_work(runtime, cur_block, 7)) : runtime.macro("get_u32le", __addr_tzx_cas_do_work(runtime, cur_block, 7)))) >>> 0);
                        let npp = (((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (11)] ?? 0) : runtime.readIndex(cur_block, 11))) | 0);
                        let asp = (((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (12)] ?? 0) : runtime.readIndex(cur_block, 12))) | 0);
                        if (((((((asp) === (0)) ? 1 : 0)) && ((((totp) > (0)) ? 1 : 0))) ? 1 : 0)) {
                            asp = ((256) | 0);
                        }
                        let totd = (((__L2 ? __L2(__addr_tzx_cas_do_work(runtime, cur_block, 13)) : runtime.macro("get_u32le", __addr_tzx_cas_do_work(runtime, cur_block, 13)))) >>> 0);
                        let npd = (((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (17)] ?? 0) : runtime.readIndex(cur_block, 17))) | 0);
                        let asd = (((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (18)] ?? 0) : runtime.readIndex(cur_block, 18))) | 0);
                        if (((((((asd) === (0)) ? 1 : 0)) && ((((totd) > (0)) ? 1 : 0))) ? 1 : 0)) {
                            asd = ((256) | 0);
                        }
                        size = ((((size) + (method_tzx_handle_generalized(runtime, buffer, __addr_tzx_cas_do_work(runtime, cur_block, 19), pause_time, data_size, totp, npp, asp, totd, npd, asd)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
                case 75:
                    {
                        data_size = ((runtime.subtract((__L2 ? __L2(__addr_tzx_cas_do_work(runtime, cur_block, 1)) : runtime.macro("get_u32le", __addr_tzx_cas_do_work(runtime, cur_block, 1))), 12)) >>> 0);
                        pause_time = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 5)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 5)))) | 0);
                        pilot = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 7)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 7)))) | 0);
                        pilot_length = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 9)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 9)))) | 0);
                        let zero = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 11)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 11)))) & 0xffff);
                        let one = (((__L0 ? __L0(__addr_tzx_cas_do_work(runtime, cur_block, 13)) : runtime.macro("get_u16le", __addr_tzx_cas_do_work(runtime, cur_block, 13)))) & 0xffff);
                        bit0 = ((((runtime.shiftRight((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (15)] ?? 0) : runtime.readIndex(cur_block, 15)), 4)) ? (runtime.shiftRight((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (15)] ?? 0) : runtime.readIndex(cur_block, 15)), 4)) : (16))) | 0);
                        bit1 = (((((((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (15)] ?? 0) : runtime.readIndex(cur_block, 15))) & (15))) ? ((((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (15)] ?? 0) : runtime.readIndex(cur_block, 15))) & (15))) : (16))) | 0);
                        let leading_num = (((__L3 ? __L3((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 6, 2) : runtime.macro("util::BIT", (cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 6, 2))) & 0xff);
                        let leading_bit = (((__L3 ? __L3((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 5) : runtime.macro("util::BIT", (cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 5))) ? 1 : 0);
                        let trailing_num = (((__L3 ? __L3((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 3, 2) : runtime.macro("util::BIT", (cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 3, 2))) & 0xff);
                        let trailing_bit = (((__L3 ? __L3((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 2) : runtime.macro("util::BIT", (cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 2))) ? 1 : 0);
                        let msb = (((__L3 ? __L3((cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 0) : runtime.macro("util::BIT", (cur_block$s !== undefined ? (cur_block$s[cur_block$o + (16)] ?? 0) : runtime.readIndex(cur_block, 16)), 0))) ? 1 : 0);
                        members.wave_data = ((0) << 16 >> 16);
                        size = ((((size) + (method_tzx_handle_4b(runtime, buffer, __addr_tzx_cas_do_work(runtime, cur_block, 17), data_size, pause_time, pilot, pilot_length, zero, one, bit0, bit1, leading_num, leading_bit, trailing_num, trailing_bit, msb)))) | 0);
                        current_block = ((((current_block) + (1))) | 0);
                        break;
                    }
            }
        }
        size = ((((size) + (method_pause_one_millisec(runtime, buffer)))) | 0);
        return size;
    }
    function __add_tzx_cas_do_work(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_tzx_cas_do_work(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
        for (; (((pilot_length) > (0)) ? 1 : 0); pilot_length = ((((pilot_length) - (1))) | 0)) {
            method_tzx_output_wave(runtime, buffer, pilot_samples);
            size = ((((size) + (pilot_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if ((((sync1_samples) > (0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync1_samples);
            size = ((((size) + (sync1_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if ((((sync2_samples) > (0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync2_samples);
            size = ((((size) + (sync2_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        for (data_index = ((0) | 0); (((data_index) < (data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let byte = ((runtime.readIndex(bytes, data_index)) & 0xff);
            let bits_to_go = ((((((Number(data_index) === Number(((data_size) - (1)))) ? 1 : 0)) ? (bits_in_last_byte) : (8))) | 0);
            for (; (((bits_to_go) > (0)) ? 1 : 0); byte = ((((byte) << (1))) & 0xff), bits_to_go = ((((bits_to_go) - (1))) | 0)) {
                let bit_samples = ((((((byte) & (128))) ? (bit1_samples) : (bit0_samples))) | 0);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
            }
        }
        if ((((pause) > (0)) ? 1 : 0)) {
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
        return ((((__add_tcycles_to_samplecount(runtime, 0.5, ((((44100) / (3500000))) * (tcycles)))) * ((members.t_scale ?? 0)))) | 0);
    }
    function __add_tcycles_to_samplecount(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_tzx_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; (((length) > (0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(__deref_tzx_output_wave(runtime, buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, __add_tzx_output_wave(runtime, __deref_tzx_output_wave(runtime, buffer), 1));
        }
    }
    function __add_tzx_output_wave(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_tzx_output_wave(runtime, p) {
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
        block_type = ((block_type) & 0xff);
    }
    function method_tzx_handle_direct(runtime, buffer, bytes, pause, data_size, tstates, bits_in_last_byte) {
        const members = runtime.members;
        let size = ((0) | 0);
        let samples = ((method_tcycles_to_samplecount(runtime, tstates)) | 0);
        for (let data_index = ((0) | 0); (((data_index) < (data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let byte = ((runtime.readIndex(bytes, data_index)) & 0xff);
            let bits_to_go = ((((((Number(data_index) === Number(((data_size) - (1)))) ? 1 : 0)) ? (bits_in_last_byte) : (8))) | 0);
            for (; (((bits_to_go) > (0)) ? 1 : 0); byte = ((((byte) << (1))) & 0xff), bits_to_go = ((((bits_to_go) - (1))) | 0)) {
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
        if ((((pause) > (0)) ? 1 : 0)) {
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
        const __L0 = __l["get_u16le"], __L1 = __l["compute_log2"];
        let size = ((0) | 0);
        if ((((totp) > (0)) ? 1 : 0)) {
            let symtable = bytes;
            let table2 = __addr_tzx_handle_generalized(runtime, symtable, ((__add_tzx_handle_generalized(runtime, ((2) * (npp)), 1)) * (asp)));
            for (let i = ((0) | 0); ((Number(i) < Number(((totp) * (3)))) ? 1 : 0); i = ((((i) + (3))) | 0)) {
                let symbol = ((runtime.readIndex(table2, ((i) + (0)))) & 0xff);
                let repetitions = (((__L0 ? __L0(__addr_tzx_handle_generalized(runtime, table2, ((i) + (1)))) : runtime.macro("get_u16le", __addr_tzx_handle_generalized(runtime, table2, ((i) + (1)))))) & 0xffff);
                for (let j = ((0) | 0); (((j) < (repetitions)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    size = ((((size) + (method_tzx_handle_symbol(runtime, buffer, symtable, symbol, npp)))) | 0);
                }
            }
            bytes = __add_tzx_handle_generalized(runtime, bytes, __add_tzx_handle_generalized(runtime, ((__add_tzx_handle_generalized(runtime, ((2) * (npp)), 1)) * (asp)), ((totp) * (3))));
        }
        if ((((totd) > (0)) ? 1 : 0)) {
            let symtable = bytes;
            let table2 = __addr_tzx_handle_generalized(runtime, bytes, ((__add_tzx_handle_generalized(runtime, ((2) * (npd)), 1)) * (asd)));
            let NB = ((Math.ceil(Number((__L1 ? __L1(asd) : runtime.macro("compute_log2", asd))))) | 0);
            let stream_bit = ((0) & 0xff);
            let stream_byte = ((0) >>> 0);
            for (let i = ((0) | 0); (((i) < (totd)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let symbol = ((0) & 0xff);
                for (let j = ((0) | 0); (((j) < (NB)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    symbol = ((((symbol) | (((method_stream_get_bit(runtime, table2, ({ generatedLValue: true, get: () => stream_bit, set: (value) => { stream_bit = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => stream_byte, set: (value) => { stream_byte = ((value) >>> 0); } }))) << (j))))) & 0xff);
                }
                size = ((((size) + (method_tzx_handle_symbol(runtime, buffer, symtable, symbol, npd)))) | 0);
            }
        }
        if ((((pause) > (0)) ? 1 : 0)) {
            size = ((((size) + (method_pause_one_millisec(runtime, buffer)))) | 0);
            let rest_pause_samples = ((method_millisec_to_samplecount(runtime, ((pause) - (1)))) | 0);
            members.wave_data = ((-23198) << 16 >> 16);
            method_tzx_output_wave(runtime, buffer, rest_pause_samples);
            size = ((((size) + (rest_pause_samples))) | 0);
        }
        return size;
    }
    function __add_tzx_handle_generalized(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_tzx_handle_generalized(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_tzx_handle_symbol(runtime, buffer, symtable, symbol, maxp) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_u16le"];
        symbol = ((symbol) & 0xff);
        let size = ((0) | 0);
        let cursymb = __addr_tzx_handle_symbol(runtime, symtable, ((__add_tzx_handle_symbol(runtime, ((2) * (maxp)), 1)) * (symbol)));
        let cursymb$s = undefined, cursymb$o = 0;
        if (ArrayBuffer.isView(cursymb) || Array.isArray(cursymb))
            cursymb$s = cursymb;
        else if (cursymb !== null && typeof cursymb === 'object' && cursymb.generatedPointer === true && cursymb.path === undefined && cursymb.target === undefined && (ArrayBuffer.isView(cursymb.source) || Array.isArray(cursymb.source))) {
            cursymb$s = cursymb.source;
            cursymb$o = cursymb.offset;
        }
        let starttype = (((cursymb$s !== undefined ? (cursymb$s[cursymb$o + (0)] ?? 0) : runtime.readIndex(cursymb, 0))) & 0xff);
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
                    /* printf: no effect */
                }
        }
        for (let i = ((0) | 0); (((i) < (maxp)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let pulse_length = (((__L0 ? __L0(__addr_tzx_handle_symbol(runtime, cursymb, __add_tzx_handle_symbol(runtime, 1, ((i) * (2))))) : runtime.macro("get_u16le", __addr_tzx_handle_symbol(runtime, cursymb, __add_tzx_handle_symbol(runtime, 1, ((i) * (2))))))) & 0xffff);
            if ((((pulse_length) !== (0)) ? 1 : 0)) {
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
    function __add_tzx_handle_symbol(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_tzx_handle_symbol(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
        const __L0 = __l["util::BITSWAP"];
        pause_ms = ((pause_ms) & 0xffff);
        pilot = ((pilot) & 0xffff);
        pilot_num = ((pilot_num) & 0xffff);
        zero = ((zero) & 0xffff);
        one = ((one) & 0xffff);
        num_0 = ((num_0) & 0xff);
        num_1 = ((num_1) & 0xff);
        leading_num = ((leading_num) & 0xff);
        trailing_num = ((trailing_num) & 0xff);
        let pilot_samples = ((method_tcycles_to_samplecount(runtime, pilot)) | 0);
        let bit0_samples = ((method_tcycles_to_samplecount(runtime, zero)) | 0);
        let bit1_samples = ((method_tcycles_to_samplecount(runtime, one)) | 0);
        let size = ((0) | 0);
        for (; (((pilot_num) > (0)) ? 1 : 0); pilot_num = ((((pilot_num) - (1))) & 0xffff)) {
            method_tzx_output_wave(runtime, buffer, pilot_samples);
            size = ((((size) + (pilot_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        let data_common = ((0) & 0xffff);
        for (let i = ((leading_num) & 0xff); (((i) > (0)) ? 1 : 0); i = ((((i) - (1))) & 0xff)) {
            data_common = ((((data_common) << (1))) & 0xffff);
            data_common = ((((data_common) | (leading_bit))) & 0xffff);
        }
        data_common = ((((data_common) << (8))) & 0xffff);
        for (let i = ((trailing_num) & 0xff); (((i) > (0)) ? 1 : 0); i = ((((i) - (1))) & 0xff)) {
            data_common = ((((data_common) << (1))) & 0xffff);
            data_common = ((((data_common) | (trailing_bit))) & 0xffff);
        }
        for (let data_index = ((0) | 0); (((data_index) < (data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let data = ((data_common) & 0xffff);
            data = ((((data) | (((((msb) ? (runtime.readIndex(bytes, data_index)) : ((__L0 ? __L0(runtime.readIndex(bytes, data_index), 0, 1, 2, 3, 4, 5, 6, 7) : runtime.macro("util::BITSWAP", runtime.readIndex(bytes, data_index), 0, 1, 2, 3, 4, 5, 6, 7))))) << (trailing_num))))) & 0xffff);
            for (let mask = ((((1) << (((((leading_num) + (7))) + (trailing_num))))) & 0xffff); (((mask) > (0)) ? 1 : 0); mask = ((((mask) >>> (1))) & 0xffff)) {
                let bit = ((((data) & (mask))) ? 1 : 0);
                let bit_samples = ((((bit) ? (bit1_samples) : (bit0_samples))) | 0);
                for (let i = ((((bit) ? (num_1) : (num_0))) & 0xff); (((i) > (0)) ? 1 : 0); i = ((((i) - (1))) & 0xff)) {
                    method_tzx_output_wave(runtime, buffer, bit_samples);
                    size = ((((size) + (bit_samples))) | 0);
                    method_toggle_wave_data(runtime);
                }
            }
        }
        if ((((pause_ms) > (0)) ? 1 : 0)) {
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
        const __L0 = __l["memcmp"];
        const h_TZX_HEADER = members.TZX_HEADER ?? 0;
        let __goto_cleanup = ((0) | 0);
        while (1) {
            let size = ((0) | 0);
            if ((((caslen) < (10)) ? 1 : 0)) {
                __goto_cleanup = ((1) | 0);
                break;
            }
            if ((__L0 ? __L0(casdata, h_TZX_HEADER, 8) : runtime.macro("memcmp", casdata, h_TZX_HEADER, 8))) {
                __goto_cleanup = ((1) | 0);
                break;
            }
            if (((Number(runtime.readIndex(casdata, 8)) > Number(1)) ? 1 : 0)) {
                __goto_cleanup = ((1) | 0);
                break;
            }
            runtime.invoke("tzx_cas_get_blocks", casdata, caslen);
            if (((((members.block_count ?? 0)) === (0)) ? 1 : 0)) {
                __goto_cleanup = ((1) | 0);
                break;
            }
            size = ((method_tzx_cas_do_work(runtime, 0)) | 0);
            return size;
            break;
        }
        return -1;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
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
    return __methodTable;
})();
definition.imageFormats[1].definition.compiledMethodLinks = ["compute_log2", "get_u16le", "get_u24le", "get_u32le", "memcmp", "util::BIT", "util::BITSWAP"];
definition.imageFormats[2].definition.compiledMethods = (() => {
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
    function method_tap_cas_fill_wave(runtime, buffer, length, bytes, bytes_length) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_u16le"];
        let p = buffer;
        let size = ((0) | 0);
        let block = ((0) | 0);
        while ((((bytes_length) > (2)) ? 1 : 0)) {
            let data_size = (((__L0 ? __L0(__addr_tap_cas_fill_wave(runtime, bytes, 0)) : runtime.macro("get_u16le", __addr_tap_cas_fill_wave(runtime, bytes, 0)))) | 0);
            bytes = __add_tap_cas_fill_wave(runtime, bytes, 2);
            bytes_length = ((((bytes_length) - (2))) | 0);
            if ((((bytes_length) < (data_size)) ? 1 : 0)) {
                /* osd_printf_warning: no effect */
                data_size = ((bytes_length) | 0);
            }
            bytes_length = ((((bytes_length) - (data_size))) | 0);
            let pilot_length = ((((((Number(runtime.readIndex(bytes, 0)) === Number(0)) ? 1 : 0)) ? (8063) : (3223))) | 0);
            size = ((((size) + (method_tzx_cas_handle_block(runtime, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => p, set: (value) => { p = value; } }), offset: 0 }), bytes, 1000, data_size, 2168, pilot_length, 667, 735, 855, 1710, 8)))) | 0);
            bytes = __add_tap_cas_fill_wave(runtime, bytes, data_size);
            block = ((((block) + (1))) | 0);
        }
        return size;
    }
    function __add_tap_cas_fill_wave(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_tap_cas_fill_wave(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
        for (; (((pilot_length) > (0)) ? 1 : 0); pilot_length = ((((pilot_length) - (1))) | 0)) {
            method_tzx_output_wave(runtime, buffer, pilot_samples);
            size = ((((size) + (pilot_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if ((((sync1_samples) > (0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync1_samples);
            size = ((((size) + (sync1_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if ((((sync2_samples) > (0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync2_samples);
            size = ((((size) + (sync2_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        for (data_index = ((0) | 0); (((data_index) < (data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let byte = ((runtime.readIndex(bytes, data_index)) & 0xff);
            let bits_to_go = ((((((Number(data_index) === Number(((data_size) - (1)))) ? 1 : 0)) ? (bits_in_last_byte) : (8))) | 0);
            for (; (((bits_to_go) > (0)) ? 1 : 0); byte = ((((byte) << (1))) & 0xff), bits_to_go = ((((bits_to_go) - (1))) | 0)) {
                let bit_samples = ((((((byte) & (128))) ? (bit1_samples) : (bit0_samples))) | 0);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
            }
        }
        if ((((pause) > (0)) ? 1 : 0)) {
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
        return ((((__add_tcycles_to_samplecount(runtime, 0.5, ((((44100) / (3500000))) * (tcycles)))) * (h_t_scale))) | 0);
    }
    function __add_tcycles_to_samplecount(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_tzx_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; (((length) > (0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(__deref_tzx_output_wave(runtime, buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, __add_tzx_output_wave(runtime, __deref_tzx_output_wave(runtime, buffer), 1));
        }
    }
    function __add_tzx_output_wave(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_tzx_output_wave(runtime, p) {
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
        const __L0 = __l["get_u16le"];
        let size = ((0) | 0);
        let p = casdata;
        while ((((caslen) > (2)) ? 1 : 0)) {
            let data_size = (((__L0 ? __L0(__addr_tap_cas_to_wav_size(runtime, p, 0)) : runtime.macro("get_u16le", __addr_tap_cas_to_wav_size(runtime, p, 0)))) | 0);
            p = __add_tap_cas_to_wav_size(runtime, p, 2);
            caslen = ((((caslen) - (2))) | 0);
            if ((((caslen) < (data_size)) ? 1 : 0)) {
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
            if ((((check) !== (checksum)) ? 1 : 0)) {
                /* osd_printf_warning: no effect */
            }
            p = __add_tap_cas_to_wav_size(runtime, p, data_size);
        }
        return size;
    }
    function __add_tap_cas_to_wav_size(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_tap_cas_to_wav_size(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "tap_cas_fill_wave": method_tap_cas_fill_wave,
        "tzx_cas_handle_block": method_tzx_cas_handle_block,
        "tcycles_to_samplecount": method_tcycles_to_samplecount,
        "tzx_output_wave": method_tzx_output_wave,
        "toggle_wave_data": method_toggle_wave_data,
        "pause_one_millisec": method_pause_one_millisec,
        "millisec_to_samplecount": method_millisec_to_samplecount,
        "tap_cas_to_wav_size": method_tap_cas_to_wav_size
    };
    return __methodTable;
})();
definition.imageFormats[2].definition.compiledMethodLinks = ["get_u16le"];
definition.imageFormats[3].definition.compiledMethods = (() => {
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
    function method_tap_cas_fill_wave(runtime, buffer, length, bytes, bytes_length) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_u16le"];
        let p = buffer;
        let size = ((0) | 0);
        let block = ((0) | 0);
        while ((((bytes_length) > (2)) ? 1 : 0)) {
            let data_size = (((__L0 ? __L0(__addr_tap_cas_fill_wave(runtime, bytes, 0)) : runtime.macro("get_u16le", __addr_tap_cas_fill_wave(runtime, bytes, 0)))) | 0);
            bytes = __add_tap_cas_fill_wave(runtime, bytes, 2);
            bytes_length = ((((bytes_length) - (2))) | 0);
            if ((((bytes_length) < (data_size)) ? 1 : 0)) {
                /* osd_printf_warning: no effect */
                data_size = ((bytes_length) | 0);
            }
            bytes_length = ((((bytes_length) - (data_size))) | 0);
            let pilot_length = ((((((Number(runtime.readIndex(bytes, 0)) === Number(0)) ? 1 : 0)) ? (8063) : (3223))) | 0);
            size = ((((size) + (method_tzx_cas_handle_block(runtime, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => p, set: (value) => { p = value; } }), offset: 0 }), bytes, 1000, data_size, 2168, pilot_length, 667, 735, 855, 1710, 8)))) | 0);
            bytes = __add_tap_cas_fill_wave(runtime, bytes, data_size);
            block = ((((block) + (1))) | 0);
        }
        return size;
    }
    function __add_tap_cas_fill_wave(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_tap_cas_fill_wave(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
        for (; (((pilot_length) > (0)) ? 1 : 0); pilot_length = ((((pilot_length) - (1))) | 0)) {
            method_tzx_output_wave(runtime, buffer, pilot_samples);
            size = ((((size) + (pilot_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if ((((sync1_samples) > (0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync1_samples);
            size = ((((size) + (sync1_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        if ((((sync2_samples) > (0)) ? 1 : 0)) {
            method_tzx_output_wave(runtime, buffer, sync2_samples);
            size = ((((size) + (sync2_samples))) | 0);
            method_toggle_wave_data(runtime);
        }
        for (data_index = ((0) | 0); (((data_index) < (data_size)) ? 1 : 0); data_index = ((((data_index) + (1))) | 0)) {
            let byte = ((runtime.readIndex(bytes, data_index)) & 0xff);
            let bits_to_go = ((((((Number(data_index) === Number(((data_size) - (1)))) ? 1 : 0)) ? (bits_in_last_byte) : (8))) | 0);
            for (; (((bits_to_go) > (0)) ? 1 : 0); byte = ((((byte) << (1))) & 0xff), bits_to_go = ((((bits_to_go) - (1))) | 0)) {
                let bit_samples = ((((((byte) & (128))) ? (bit1_samples) : (bit0_samples))) | 0);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
                method_tzx_output_wave(runtime, buffer, bit_samples);
                size = ((((size) + (bit_samples))) | 0);
                method_toggle_wave_data(runtime);
            }
        }
        if ((((pause) > (0)) ? 1 : 0)) {
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
        return ((((__add_tcycles_to_samplecount(runtime, 0.5, ((((44100) / (3500000))) * (tcycles)))) * (h_t_scale))) | 0);
    }
    function __add_tcycles_to_samplecount(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_tzx_output_wave(runtime, buffer, length) {
        const members = runtime.members;
        if (((buffer) ? 0 : 1)) {
            return;
        }
        for (; (((length) > (0)) ? 1 : 0); length = ((((length) - (1))) | 0)) {
            runtime.pointerStore(__deref_tzx_output_wave(runtime, buffer), (members.wave_data ?? 0));
            runtime.pointerStore(buffer, __add_tzx_output_wave(runtime, __deref_tzx_output_wave(runtime, buffer), 1));
        }
    }
    function __add_tzx_output_wave(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_tzx_output_wave(runtime, p) {
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
        const __L0 = __l["get_u16le"];
        let size = ((0) | 0);
        let p = casdata;
        while ((((caslen) > (2)) ? 1 : 0)) {
            let data_size = (((__L0 ? __L0(__addr_tap_cas_to_wav_size(runtime, p, 0)) : runtime.macro("get_u16le", __addr_tap_cas_to_wav_size(runtime, p, 0)))) | 0);
            p = __add_tap_cas_to_wav_size(runtime, p, 2);
            caslen = ((((caslen) - (2))) | 0);
            if ((((caslen) < (data_size)) ? 1 : 0)) {
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
            if ((((check) !== (checksum)) ? 1 : 0)) {
                /* osd_printf_warning: no effect */
            }
            p = __add_tap_cas_to_wav_size(runtime, p, data_size);
        }
        return size;
    }
    function __add_tap_cas_to_wav_size(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_tap_cas_to_wav_size(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "tap_cas_fill_wave": method_tap_cas_fill_wave,
        "tzx_cas_handle_block": method_tzx_cas_handle_block,
        "tcycles_to_samplecount": method_tcycles_to_samplecount,
        "tzx_output_wave": method_tzx_output_wave,
        "toggle_wave_data": method_toggle_wave_data,
        "pause_one_millisec": method_pause_one_millisec,
        "millisec_to_samplecount": method_millisec_to_samplecount,
        "tap_cas_to_wav_size": method_tap_cas_to_wav_size
    };
    return __methodTable;
})();
definition.imageFormats[3].definition.compiledMethodLinks = ["get_u16le"];
export const device = definition;
export default device;
