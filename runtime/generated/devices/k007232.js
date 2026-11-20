import deviceData from './k007232.device.ir.json' with { type: 'json' };
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
    const cppScratch_start_filebuf = new Uint8Array(Math.max(0, Number(256)));
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_port_write_handler"];
        let __t0;
        data = ((data) & 0xff);
        const h_m_wreg = members.m_wreg ?? 0;
        const h_m_channel = members.m_channel ?? 0;
        (__t0 = __deref_write(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        h_m_wreg[offset] = data;
        if ((((offset) === (12)) ? 1 : 0)) {
            (__L0 ? __L0(Number(0), Number(data)) : typeof members.m_port_write_handler === 'function' ? members.m_port_write_handler(0, data) : runtime.invoke("m_port_write_handler", 0, data));
        }
        else {
            if ((((offset) === (13)) ? 1 : 0)) {
            }
            else {
                if ((((offset) < (12)) ? 1 : 0)) {
                    let channel = h_m_channel[(((((offset) >= (6)) ? 1 : 0)) ? (1) : (0))];
                    let reg_index = (((((((offset) >= (6)) ? 1 : 0)) ? (6) : (0))) | 0);
                    switch (((offset) - (reg_index))) {
                        case 0:
                        case 1:
                            {
                                channel.step = (((((((((h_m_wreg[((reg_index) + (1))]) >>> (0)) & ((1 << (4)) - 1))) << (8))) | (h_m_wreg[reg_index]))) & 0xffff);
                                break;
                            }
                        case 2:
                        case 3:
                        case 4:
                            {
                                channel.start = (((((((((((h_m_wreg[((reg_index) + (4))]) >>> (0)) & 1)) << (16))) | (((h_m_wreg[((reg_index) + (3))]) << (8))))) | (h_m_wreg[((reg_index) + (2))]))) >>> 0);
                                break;
                            }
                        case 5:
                            {
                                method_start(runtime, ((reg_index) ? (1) : (0)));
                                break;
                            }
                    }
                }
            }
        }
    }
    function __deref_write(runtime, p) {
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
    function method_start(runtime, ch) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["snprintf"], __L1 = __l["util::wav_open"], __L2 = __l["util::wav_add_data_16"];
        let __t0;
        const h_m_channel = members.m_channel ?? 0;
        let channel = h_m_channel[ch];
        if ((((channel.start) < ((members.m_pcmlimit ?? 0))) ? 1 : 0)) {
            channel.play = ((1) ? 1 : 0);
            channel.addr = ((channel.start) >>> 0);
            channel.counter = ((4096) | 0);
            if (0) {
                let filebuf = cppScratch_start_filebuf.fill(0);
                (__L0 ? __L0(filebuf, 256, "pcm%08x.wav", channel.start) : runtime.macro("snprintf", filebuf, 256, "pcm%08x.wav", channel.start));
                let file = (__L1 ? __L1(filebuf, (__t0 = __deref_start(runtime, members.m_stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(members.m_stream, "sample_rate")), 1) : runtime.macro("util::wav_open", filebuf, (__t0 = __deref_start(runtime, members.m_stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(members.m_stream, "sample_rate")), 1));
                if (file) {
                    let addr = ((channel.start) >>> 0);
                    while (((((((addr) < ((members.m_pcmlimit ?? 0))) ? 1 : 0)) && ((((((method_read_sample(runtime, ch, addr)) >>> (7)) & 1)) ? 0 : 1))) ? 1 : 0)) {
                        let out = ((((((((method_read_sample(runtime, ch, addr)) & (127))) - (64))) << (7))) << 16 >> 16);
                        (__L2 ? __L2(__deref_start(runtime, file), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => out, set: (value) => { out = ((value) << 16 >> 16); } }), offset: 0 }), 1) : runtime.macro("util::wav_add_data_16", __deref_start(runtime, file), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => out, set: (value) => { out = ((value) << 16 >> 16); } }), offset: 0 }), 1));
                        addr = ((((addr) + (1))) >>> 0);
                    }
                }
            }
        }
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
    function method_read_sample(runtime, channel, addr) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        members.m_bank = ((h_m_channel[channel].bank) >>> 0);
        return (((__deref_read_sample(runtime, members.m_cache).read_byte?.(((addr) & (131071))) ?? 0)) & 0xff);
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
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0;
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if (((((((offset) === (5)) ? 1 : 0)) || ((((offset) === (11)) ? 1 : 0))) ? 1 : 0)) {
                (__t0 = __deref_read(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
                method_start(runtime, (((((offset) === (11)) ? 1 : 0)) ? (1) : (0)));
            }
        }
        return ((0) & 0xff);
    }
    function __deref_read(runtime, p) {
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
        let __t0, __t1;
        const h_m_channel = members.m_channel ?? 0;
        const h_m_wreg = members.m_wreg ?? 0;
        for (let j = ((0) | 0); ((Number(j) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            let lsum = ((0) | 0);
            let rsum = ((0) | 0);
            for (let i = ((0) | 0); (((i) < (2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let channel = h_m_channel[i];
                if (channel.play) {
                    let vol_a = ((((channel.vol[0]) * (2))) | 0);
                    let vol_b = ((((channel.vol[1]) * (2))) | 0);
                    let addr = ((((channel.addr) & (131071))) >>> 0);
                    while ((((channel.counter) <= (channel.step)) ? 1 : 0)) {
                        if (((((((addr) >= ((members.m_pcmlimit ?? 0))) ? 1 : 0)) || ((((method_read_sample(runtime, i, (__t1 = addr, addr = ((((addr) + (1))) >>> 0), __t1))) >>> (7)) & 1))) ? 1 : 0)) {
                            if ((((h_m_wreg[13]) >>> (i)) & 1)) {
                                addr = ((channel.start) >>> 0);
                            }
                            else {
                                channel.play = ((0) ? 1 : 0);
                                break;
                            }
                        }
                        channel.counter = ((((channel.counter) + (((4096) - (channel.step))))) | 0);
                    }
                    channel.addr = ((addr) >>> 0);
                    if (((channel.play) ? 0 : 1)) {
                        break;
                    }
                    channel.counter = ((((channel.counter) - (32))) | 0);
                    let out = ((((((method_read_sample(runtime, i, addr)) & (127))) - (64))) | 0);
                    lsum = ((((lsum) + (((out) * (vol_a))))) | 0);
                    rsum = ((((rsum) + (((out) * (vol_b))))) | 0);
                }
            }
            (__deref_sound_stream_update(runtime, stream).put_int?.(0, j, lsum, 32768) ?? 0);
            (__deref_sound_stream_update(runtime, stream).put_int?.(1, j, rsum, 32768) ?? 0);
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
    function method_port_write(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_port_write(runtime, members.m_port_write_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_write_handler, "bind"));
    }
    function __deref_port_write(runtime, p) {
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
    function method_read_rom_default(runtime, offset) {
        const members = runtime.members;
        const h_m_rom = members.m_rom ?? 0;
        return ((runtime.readIndex(h_m_rom, (((((members.m_bank ?? 0)) + (((offset) & (131071))))) & (runtime.subtract((members.m_rom).length, 1))))) & 0xff);
    }
    function method_k007232_device__port_write(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k007232_device__port_write(runtime, members.m_port_write_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_port_write_handler, "bind"));
    }
    function __deref_k007232_device__port_write(runtime, p) {
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
    function method_k007232_device__read_rom_default(runtime, offset) {
        const members = runtime.members;
        const h_m_rom = members.m_rom ?? 0;
        return ((runtime.readIndex(h_m_rom, (((((members.m_bank ?? 0)) + (((offset) & (131071))))) & (runtime.subtract((members.m_rom).length, 1))))) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "write": method_write,
        "start": method_start,
        "read_sample": method_read_sample,
        "read": method_read,
        "sound_stream_update": method_sound_stream_update,
        "port_write": method_port_write,
        "read_rom_default": method_read_rom_default,
        "k007232_device::port_write": method_k007232_device__port_write,
        "k007232_device::read_rom_default": method_k007232_device__read_rom_default
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_port_write_handler", "machine", "machine().side_effects_disabled", "snprintf", "util::wav_add_data_16", "util::wav_open"];
export const device = definition;
export default device;
