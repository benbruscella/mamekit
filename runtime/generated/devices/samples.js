import deviceData from './samples.device.ir.json' with { type: 'json' };
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
    const cppScratch_read_sample_buf = new Uint8Array(Math.max(0, Number(4)));
    function method_start(runtime, channel, samplenum, loop = 0) {
        const members = runtime.members;
        let __t0;
        channel = ((channel) & 0xff);
        if (((members.m_sample).length === 0 ? 1 : 0)) {
            return;
        }
        let chan = runtime.readIndex((members.m_channel ?? 0), channel);
        (__t0 = __deref_start(runtime, chan.stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(chan.stream, "update"));
        let sample = runtime.readIndex((members.m_sample ?? 0), samplenum);
        chan.source = ((((Number((sample.data).length) > Number(0)) ? 1 : 0)) ? (__addr_start(runtime, sample.data, 0)) : (0));
        chan.source_num = (((((((chan.source_len) > (0)) ? 1 : 0)) ? (samplenum) : (-1))) | 0);
        chan.source_len = (((sample.data).length) >>> 0);
        chan.pos = 0;
        chan.basefreq = ((sample.frequency) >>> 0);
        chan.curfreq = ((sample.frequency) >>> 0);
        chan.loop = ((loop) ? 1 : 0);
        (__deref_start(runtime, chan.stream).set_sample_rate?.(sample.frequency) ?? 0);
    }
    function __addr_start(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_start(runtime, p) {
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
    function method_start_raw(runtime, channel, sampledata, samples, frequency, loop = 0) {
        const members = runtime.members;
        let __t0;
        channel = ((channel) & 0xff);
        let chan = runtime.readIndex((members.m_channel ?? 0), channel);
        (__t0 = __deref_start_raw(runtime, chan.stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(chan.stream, "update"));
        chan.source = sampledata;
        chan.source_num = ((-1) | 0);
        chan.source_len = ((samples) >>> 0);
        chan.pos = 0;
        chan.basefreq = ((frequency) >>> 0);
        chan.curfreq = ((frequency) >>> 0);
        chan.loop = ((loop) ? 1 : 0);
        (__deref_start_raw(runtime, chan.stream).set_sample_rate?.(frequency) ?? 0);
    }
    function __deref_start_raw(runtime, p) {
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
    function method_set_frequency(runtime, channel, frequency) {
        const members = runtime.members;
        let __t0;
        channel = ((channel) & 0xff);
        let chan = runtime.readIndex((members.m_channel ?? 0), channel);
        (__t0 = __deref_set_frequency(runtime, chan.stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(chan.stream, "update"));
        chan.curfreq = ((frequency) >>> 0);
    }
    function __deref_set_frequency(runtime, p) {
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
    function method_set_volume(runtime, channel, volume) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["set_output_gain"];
        channel = ((channel) & 0xff);
        (__L0 ? __L0(channel, volume) : runtime.macro("set_output_gain", channel, volume));
    }
    function method_pause(runtime, channel, pause = 1) {
        const members = runtime.members;
        let __t0;
        channel = ((channel) & 0xff);
        let chan = runtime.readIndex((members.m_channel ?? 0), channel);
        (__t0 = __deref_pause(runtime, chan.stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(chan.stream, "update"));
        chan.paused = ((pause) ? 1 : 0);
    }
    function __deref_pause(runtime, p) {
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
    function method_stop(runtime, channel) {
        const members = runtime.members;
        let __t0;
        channel = ((channel) & 0xff);
        let chan = runtime.readIndex((members.m_channel ?? 0), channel);
        (__t0 = __deref_stop(runtime, chan.stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(chan.stream, "update"));
        chan.source = 0;
        chan.source_num = ((-1) | 0);
    }
    function __deref_stop(runtime, p) {
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
    function method_stop_all(runtime) {
        const members = runtime.members;
        for (let channel = ((0) & 0xff); (((channel) < ((members.m_channels ?? 0))) ? 1 : 0); channel = ((((channel) + (1))) & 0xff)) {
            method_stop(runtime, channel);
        }
    }
    function method_base_frequency(runtime, channel) {
        const members = runtime.members;
        channel = ((channel) & 0xff);
        return ((runtime.readIndex((members.m_channel ?? 0), channel).basefreq) >>> 0);
    }
    function method_playing(runtime, channel) {
        const members = runtime.members;
        let __t0;
        channel = ((channel) & 0xff);
        let chan = runtime.readIndex((members.m_channel ?? 0), channel);
        (__t0 = __deref_playing(runtime, chan.stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(chan.stream, "update"));
        return ((chan.source) ? 1 : 0);
    }
    function __deref_playing(runtime, p) {
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
        const __L0 = __l["machine"], __L1 = __l["machine().sample_rate"], __L2 = __l["stream_alloc"], __L3 = __l["NAME"], __L4 = __l["save_item"];
        runtime.invoke("load_samples");
        (members.m_channel = runtime.resize(members.m_channel, (members.m_channels ?? 0)));
        for (let channel = ((0) | 0); (((channel) < ((members.m_channels ?? 0))) ? 1 : 0); channel = ((((channel) + (1))) | 0)) {
            let rate = ((((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) >>> 0);
            let chan = runtime.readIndex((members.m_channel ?? 0), channel);
            chan.stream = (__L2 ? __L2(0, 1, rate) : runtime.macro("stream_alloc", 0, 1, rate));
            chan.source = 0;
            chan.source_num = ((-1) | 0);
            chan.pos = 0;
            chan.basefreq = ((rate) >>> 0);
            chan.curfreq = ((rate) >>> 0);
            chan.loop = ((0) ? 1 : 0);
            chan.paused = ((0) ? 1 : 0);
            (__L4 ? __L4((__L3 ? __L3(chan.source_num) : runtime.macro("NAME", chan.source_num)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.source_num) : runtime.macro("NAME", chan.source_num)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.source_len) : runtime.macro("NAME", chan.source_len)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.source_len) : runtime.macro("NAME", chan.source_len)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.pos) : runtime.macro("NAME", chan.pos)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.pos) : runtime.macro("NAME", chan.pos)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.basefreq) : runtime.macro("NAME", chan.basefreq)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.basefreq) : runtime.macro("NAME", chan.basefreq)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.curfreq) : runtime.macro("NAME", chan.curfreq)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.curfreq) : runtime.macro("NAME", chan.curfreq)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.loop) : runtime.macro("NAME", chan.loop)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.loop) : runtime.macro("NAME", chan.loop)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.paused) : runtime.macro("NAME", chan.paused)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.paused) : runtime.macro("NAME", chan.paused)), channel));
        }
    }
    function method_read_sample(runtime, file, sample) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["osd_printf_warning"], __L1 = __l["memcmp"];
        let __t0, __t1;
        let buf = cppScratch_read_sample_buf.fill(0);
        let offset = (((__deref_read_sample(runtime, file).read?.(buf, 4) ?? 0)) >>> 0);
        if ((((offset) < (4)) ? 1 : 0)) {
            (__L0 ? __L0("Unable to read %s, 0-byte file?\n", (__t0 = __deref_read_sample(runtime, file), typeof __t0.filename === 'function' ? __t0.filename() : typeof __t0.filename === 'number' || typeof __t0.filename === 'boolean' ? __t0.filename : runtime.container(file, "filename"))) : runtime.macro("osd_printf_warning", "Unable to read %s, 0-byte file?\n", (__t0 = __deref_read_sample(runtime, file), typeof __t0.filename === 'function' ? __t0.filename() : typeof __t0.filename === 'number' || typeof __t0.filename === 'boolean' ? __t0.filename : runtime.container(file, "filename"))));
            return 0;
        }
        if (((Number((__L1 ? __L1(__addr_read_sample(runtime, buf, 0), "RIFF", 4) : runtime.macro("memcmp", __addr_read_sample(runtime, buf, 0), "RIFF", 4))) === Number(0)) ? 1 : 0)) {
            return runtime.invoke("read_wav_sample", file, sample);
        }
        else {
            if (((Number((__L1 ? __L1(__addr_read_sample(runtime, buf, 0), "fLaC", 4) : runtime.macro("memcmp", __addr_read_sample(runtime, buf, 0), "fLaC", 4))) === Number(0)) ? 1 : 0)) {
                return method_read_flac_sample(runtime, file, sample);
            }
        }
        (__L0 ? __L0("Unable to read %s, corrupt file?\n", (__t1 = __deref_read_sample(runtime, file), typeof __t1.filename === 'function' ? __t1.filename() : typeof __t1.filename === 'number' || typeof __t1.filename === 'boolean' ? __t1.filename : runtime.container(file, "filename"))) : runtime.macro("osd_printf_warning", "Unable to read %s, corrupt file?\n", (__t1 = __deref_read_sample(runtime, file), typeof __t1.filename === 'function' ? __t1.filename() : typeof __t1.filename === 'number' || typeof __t1.filename === 'boolean' ? __t1.filename : runtime.container(file, "filename"))));
        return 0;
    }
    function __addr_read_sample(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_read_sample(runtime, p) {
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
    function method_little_endianize_int32(runtime, x) {
        const members = runtime.members;
        return ((x) >>> 0);
    }
    function method_little_endianize_int16(runtime, x) {
        const members = runtime.members;
        x = ((x) & 0xffff);
        return ((x) & 0xffff);
    }
    function method_read_flac_sample(runtime, file, sample) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["flac_decoder"];
        let __t0, __t1, __t2, __t3, __t4;
        (__deref_read_flac_sample(runtime, file).seek?.(0, 0) ?? 0);
        let decoder = (__L0 ? __L0(file) : runtime.macro("flac_decoder", file));
        sample.frequency = (((__t0 = __deref_read_flac_sample(runtime, decoder), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(decoder, "sample_rate"))) >>> 0);
        if (((Number((__t1 = __deref_read_flac_sample(runtime, decoder), typeof __t1.channels === 'function' ? __t1.channels() : typeof __t1.channels === 'number' || typeof __t1.channels === 'boolean' ? __t1.channels : runtime.container(decoder, "channels"))) !== Number(1)) ? 1 : 0)) {
            return 0;
        }
        if (((Number((__t2 = __deref_read_flac_sample(runtime, decoder), typeof __t2.bits_per_sample === 'function' ? __t2.bits_per_sample() : typeof __t2.bits_per_sample === 'number' || typeof __t2.bits_per_sample === 'boolean' ? __t2.bits_per_sample : runtime.container(decoder, "bits_per_sample"))) !== Number(16)) ? 1 : 0)) {
            return 0;
        }
        runtime.resize(sample.data, (__t3 = __deref_read_flac_sample(runtime, decoder), typeof __t3.total_samples === 'function' ? __t3.total_samples() : typeof __t3.total_samples === 'number' || typeof __t3.total_samples === 'boolean' ? __t3.total_samples : runtime.container(decoder, "total_samples")));
        if ((((__deref_read_flac_sample(runtime, decoder).decode_interleaved?.(__addr_read_flac_sample(runtime, sample.data, 0), (sample.data).length) ?? 0)) ? 0 : 1)) {
            return 0;
        }
        (__t4 = __deref_read_flac_sample(runtime, decoder), typeof __t4.finish === 'function' ? __t4.finish() : typeof __t4.finish === 'number' || typeof __t4.finish === 'boolean' ? __t4.finish : runtime.container(decoder, "finish"));
        return 1;
    }
    function __addr_read_flac_sample(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_read_flac_sample(runtime, p) {
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
        method_stop_all(runtime);
    }
    function method_device_post_load(runtime) {
        const members = runtime.members;
        for (let channel = ((0) | 0); (((channel) < ((members.m_channels ?? 0))) ? 1 : 0); channel = ((((channel) + (1))) | 0)) {
            let chan = runtime.readIndex((members.m_channel ?? 0), channel);
            if (((((((chan.source_num) >= (0)) ? 1 : 0)) && (((Number(chan.source_num) < Number((members.m_sample).length)) ? 1 : 0))) ? 1 : 0)) {
                let sample = runtime.readIndex((members.m_sample ?? 0), chan.source_num);
                chan.source = __addr_device_post_load(runtime, sample.data, 0);
                chan.source_len = (((sample.data).length) >>> 0);
                chan.basefreq = ((sample.frequency) >>> 0);
                if (((sample.data).length === 0 ? 1 : 0)) {
                    chan.source_num = ((-1) | 0);
                }
            }
            let endpos = chan.source_len;
            if ((((((chan.source) ? 1 : 0)) && ((((chan.pos) >= (endpos)) ? 1 : 0))) ? 1 : 0)) {
                if (chan.loop) {
                    let posfloor = Math.floor(Number(chan.pos));
                    chan.pos = ((chan.pos) - (posfloor));
                    chan.pos = ((chan.pos) + (((((posfloor) | 0)) % (chan.source_len))));
                }
                else {
                    chan.source = 0;
                    chan.source_num = ((-1) | 0);
                }
            }
            if (((chan.source) ? 1 : 0)) {
                (__deref_device_post_load(runtime, chan.stream).set_sample_rate?.(chan.basefreq) ?? 0);
            }
        }
    }
    function __addr_device_post_load(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_device_post_load(runtime, p) {
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
        let __t0, __t1, __t2;
        let sample_scale = ((1) / (32768));
        for (let channel = ((0) | 0); (((channel) < ((members.m_channels ?? 0))) ? 1 : 0); channel = ((((channel) + (1))) | 0)) {
            if ((runtime.same(stream, runtime.readIndex((members.m_channel ?? 0), channel).stream) ? 1 : 0)) {
                let chan = runtime.readIndex((members.m_channel ?? 0), channel);
                if ((((((chan.source) ? 1 : 0)) && (((chan.paused) ? 0 : 1))) ? 1 : 0)) {
                    let step = ((chan.curfreq) / ((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(stream, "sample_rate"))));
                    let endpos = chan.source_len;
                    let sample = chan.source;
                    let sample$s = undefined, sample$o = 0;
                    if (ArrayBuffer.isView(sample) || Array.isArray(sample))
                        sample$s = sample;
                    else if (sample !== null && typeof sample === 'object' && sample.generatedPointer === true && sample.path === undefined && sample.target === undefined && (ArrayBuffer.isView(sample.source) || Array.isArray(sample.source))) {
                        sample$s = sample.source;
                        sample$o = sample.offset;
                    }
                    for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                        let pos_floor = Math.floor(Number(chan.pos));
                        let frac = ((chan.pos) - (pos_floor));
                        let ipos = ((((pos_floor) | 0)) | 0);
                        let sample1 = (sample$s !== undefined ? (sample$s[sample$o + ((__t2 = ipos, ipos = ((((ipos) + (1))) | 0), __t2))] ?? 0) : runtime.readIndex(sample, (__t2 = ipos, ipos = ((((ipos) + (1))) | 0), __t2)));
                        let sample2 = (sample$s !== undefined ? (sample$s[sample$o + (((ipos) % (chan.source_len)))] ?? 0) : runtime.readIndex(sample, ((ipos) % (chan.source_len))));
                        (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, ((sample_scale) * (__add_sound_stream_update(runtime, ((((1) - (frac))) * (sample1)), ((frac) * (sample2)))))) ?? 0);
                        chan.pos = ((chan.pos) + (step));
                        if ((((chan.pos) >= (endpos)) ? 1 : 0)) {
                            if (chan.loop) {
                                chan.pos = ((chan.pos) - (endpos));
                            }
                            else {
                                chan.source = 0;
                                chan.source_num = ((-1) | 0);
                                break;
                            }
                        }
                    }
                }
                break;
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
    function method_set_channels(runtime, channels) {
        const members = runtime.members;
        channels = ((channels) & 0xff);
        members.m_channels = ((channels) & 0xff);
    }
    function method_channels(runtime) {
        const members = runtime.members;
        return (((members.m_channels ?? 0)) & 0xff);
    }
    function method_samples(runtime) {
        const members = runtime.members;
        return (members.m_sample).length;
    }
    function method_samples_device__set_channels(runtime, channels) {
        const members = runtime.members;
        channels = ((channels) & 0xff);
        members.m_channels = ((channels) & 0xff);
    }
    function method_samples_device__channels(runtime) {
        const members = runtime.members;
        return (((members.m_channels ?? 0)) & 0xff);
    }
    function method_samples_device__samples(runtime) {
        const members = runtime.members;
        return (members.m_sample).length;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "start": method_start,
        "start_raw": method_start_raw,
        "set_frequency": method_set_frequency,
        "set_volume": method_set_volume,
        "pause": method_pause,
        "stop": method_stop,
        "stop_all": method_stop_all,
        "base_frequency": method_base_frequency,
        "playing": method_playing,
        "device_start": method_device_start,
        "read_sample": method_read_sample,
        "little_endianize_int32": method_little_endianize_int32,
        "little_endianize_int16": method_little_endianize_int16,
        "read_flac_sample": method_read_flac_sample,
        "device_reset": method_device_reset,
        "device_post_load": method_device_post_load,
        "sound_stream_update": method_sound_stream_update,
        "set_channels": method_set_channels,
        "channels": method_channels,
        "samples": method_samples,
        "samples_device::set_channels": method_samples_device__set_channels,
        "samples_device::channels": method_samples_device__channels,
        "samples_device::samples": method_samples_device__samples
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "flac_decoder", "machine", "machine().sample_rate", "memcmp", "osd_printf_warning", "save_item", "set_output_gain", "stream_alloc"];
definition.allocations["samples_iterator"].compiledMethods = (() => {
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
    function method_samples_iterator(runtime, device) {
        const members = runtime.members;
    }
    function method_altbasename(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        return (((((((((__t0 = __deref_altbasename(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names"))) && (runtime.readIndex((__t1 = __deref_altbasename(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), 0))) ? 1 : 0)) && (((Number(runtime.readIndex(runtime.readIndex((__t2 = __deref_altbasename(runtime, members.m_samples), typeof __t2.names === 'function' ? __t2.names() : typeof __t2.names === 'number' || typeof __t2.names === 'boolean' ? __t2.names : runtime.container(members.m_samples, "names")), 0), 0)) === Number(42)) ? 1 : 0))) ? 1 : 0)) ? (__addr_altbasename(runtime, runtime.readIndex((__t3 = __deref_altbasename(runtime, members.m_samples), typeof __t3.names === 'function' ? __t3.names() : typeof __t3.names === 'number' || typeof __t3.names === 'boolean' ? __t3.names : runtime.container(members.m_samples, "names")), 0), 1)) : (0));
    }
    function __addr_altbasename(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_altbasename(runtime, p) {
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
    function method_first(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4;
        if (((((((__t0 = __deref_first(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names"))) ? 0 : 1)) || (((runtime.readIndex((__t1 = __deref_first(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), 0)) ? 0 : 1))) ? 1 : 0)) {
            return 0;
        }
        members.m_current = ((0) | 0);
        if (((Number(runtime.readIndex(runtime.readIndex((__t2 = __deref_first(runtime, members.m_samples), typeof __t2.names === 'function' ? __t2.names() : typeof __t2.names === 'number' || typeof __t2.names === 'boolean' ? __t2.names : runtime.container(members.m_samples, "names")), 0), 0)) === Number(42)) ? 1 : 0)) {
            members.m_current = ((((members.m_current) + (1))) | 0);
        }
        return runtime.readIndex((__t3 = __deref_first(runtime, members.m_samples), typeof __t3.names === 'function' ? __t3.names() : typeof __t3.names === 'number' || typeof __t3.names === 'boolean' ? __t3.names : runtime.container(members.m_samples, "names")), (__t4 = (members.m_current ?? 0), members.m_current = ((((members.m_current) + (1))) | 0), __t4));
    }
    function __deref_first(runtime, p) {
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
    function method_next(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        if ((((((Number((members.m_current ?? 0)) === Number(-1)) ? 1 : 0)) || (((runtime.readIndex((__t0 = __deref_next(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names")), (members.m_current ?? 0))) ? 0 : 1))) ? 1 : 0)) {
            return 0;
        }
        return runtime.readIndex((__t1 = __deref_next(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), (__t2 = (members.m_current ?? 0), members.m_current = ((((members.m_current) + (1))) | 0), __t2));
    }
    function __deref_next(runtime, p) {
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
    function method_count(runtime) {
        const members = runtime.members;
        let save = (((members.m_current ?? 0)) | 0);
        let result = ((0) | 0);
        for (let scan = method_first(runtime); scan; scan = method_next(runtime)) {
            result = ((((result) + (1))) | 0);
        }
        members.m_current = ((save) | 0);
        return ((result) | 0);
    }
    function method_samples_iterator__samples_iterator(runtime, device) {
        const members = runtime.members;
    }
    function method_samples_iterator__altbasename(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        return (((((((((__t0 = __deref_samples_iterator__altbasename(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names"))) && (runtime.readIndex((__t1 = __deref_samples_iterator__altbasename(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), 0))) ? 1 : 0)) && (((Number(runtime.readIndex(runtime.readIndex((__t2 = __deref_samples_iterator__altbasename(runtime, members.m_samples), typeof __t2.names === 'function' ? __t2.names() : typeof __t2.names === 'number' || typeof __t2.names === 'boolean' ? __t2.names : runtime.container(members.m_samples, "names")), 0), 0)) === Number(42)) ? 1 : 0))) ? 1 : 0)) ? (__addr_samples_iterator__altbasename(runtime, runtime.readIndex((__t3 = __deref_samples_iterator__altbasename(runtime, members.m_samples), typeof __t3.names === 'function' ? __t3.names() : typeof __t3.names === 'number' || typeof __t3.names === 'boolean' ? __t3.names : runtime.container(members.m_samples, "names")), 0), 1)) : (0));
    }
    function __addr_samples_iterator__altbasename(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_samples_iterator__altbasename(runtime, p) {
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
    function method_samples_iterator__first(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4;
        if (((((((__t0 = __deref_samples_iterator__first(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names"))) ? 0 : 1)) || (((runtime.readIndex((__t1 = __deref_samples_iterator__first(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), 0)) ? 0 : 1))) ? 1 : 0)) {
            return 0;
        }
        members.m_current = ((0) | 0);
        if (((Number(runtime.readIndex(runtime.readIndex((__t2 = __deref_samples_iterator__first(runtime, members.m_samples), typeof __t2.names === 'function' ? __t2.names() : typeof __t2.names === 'number' || typeof __t2.names === 'boolean' ? __t2.names : runtime.container(members.m_samples, "names")), 0), 0)) === Number(42)) ? 1 : 0)) {
            members.m_current = ((((members.m_current) + (1))) | 0);
        }
        return runtime.readIndex((__t3 = __deref_samples_iterator__first(runtime, members.m_samples), typeof __t3.names === 'function' ? __t3.names() : typeof __t3.names === 'number' || typeof __t3.names === 'boolean' ? __t3.names : runtime.container(members.m_samples, "names")), (__t4 = (members.m_current ?? 0), members.m_current = ((((members.m_current) + (1))) | 0), __t4));
    }
    function __deref_samples_iterator__first(runtime, p) {
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
    function method_samples_iterator__next(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        if ((((((Number((members.m_current ?? 0)) === Number(-1)) ? 1 : 0)) || (((runtime.readIndex((__t0 = __deref_samples_iterator__next(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names")), (members.m_current ?? 0))) ? 0 : 1))) ? 1 : 0)) {
            return 0;
        }
        return runtime.readIndex((__t1 = __deref_samples_iterator__next(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), (__t2 = (members.m_current ?? 0), members.m_current = ((((members.m_current) + (1))) | 0), __t2));
    }
    function __deref_samples_iterator__next(runtime, p) {
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
    function method_samples_iterator__count(runtime) {
        const members = runtime.members;
        let save = (((members.m_current ?? 0)) | 0);
        let result = ((0) | 0);
        for (let scan = method_first(runtime); scan; scan = method_next(runtime)) {
            result = ((((result) + (1))) | 0);
        }
        members.m_current = ((save) | 0);
        return ((result) | 0);
    }
    function method___construct(runtime, device) {
        const members = runtime.members;
        members.m_samples = device;
        members.m_current = ((-1) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "samples_iterator": method_samples_iterator,
        "altbasename": method_altbasename,
        "first": method_first,
        "next": method_next,
        "count": method_count,
        "samples_iterator::samples_iterator": method_samples_iterator__samples_iterator,
        "samples_iterator::altbasename": method_samples_iterator__altbasename,
        "samples_iterator::first": method_samples_iterator__first,
        "samples_iterator::next": method_samples_iterator__next,
        "samples_iterator::count": method_samples_iterator__count,
        "__construct": method___construct
    };
    return __methodTable;
})();
export const device = definition;
export default device;
