import deviceData from './polepos_wsg.device.ir.json' with { type: 'json' };
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
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["stream_alloc"], __L1 = __l["NAME"], __L2 = __l["save_pointer"];
        runtime.invoke("namco_audio_device::device_start");
        members.m_stream = (__L0 ? __L0(0, 4, 192000) : runtime.macro("stream_alloc", 0, 4, 192000));
        members.m_soundregs = new Uint8Array(Math.max(0, Number(64)));
        (__L2 ? __L2((__L1 ? __L1((members.m_soundregs ?? 0)) : runtime.macro("NAME", (members.m_soundregs ?? 0))), 64) : runtime.macro("save_pointer", (__L1 ? __L1((members.m_soundregs ?? 0)) : runtime.macro("NAME", (members.m_soundregs ?? 0))), 64));
    }
    function method_device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        let clock_multiple = ((0) | 0);
        members.m_namco_clock = (((__L0 ? __L0() : runtime.macro("clock"))) | 0);
        for (clock_multiple = ((0) | 0); ((Number((members.m_namco_clock ?? 0)) < Number(192000)) ? 1 : 0); clock_multiple = ((((clock_multiple) + (1))) | 0)) {
            members.m_namco_clock = ((((members.m_namco_clock) * (2))) | 0);
        }
        members.m_f_fracbits = ((((clock_multiple) + (15))) | 0);
        members.m_sample_rate = (((members.m_namco_clock ?? 0)) | 0);
        0;
        (__deref_device_clock_changed(runtime, members.m_stream).set_sample_rate?.((members.m_sample_rate ?? 0)) ?? 0);
    }
    function __deref_device_clock_changed(runtime, p) {
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
    function method_waveform_r(runtime, pos) {
        const members = runtime.members;
        pos = ((pos) & 0xffff);
        if (1) {
            return (((((((__deref_waveform_r(runtime, members.m_data).read_byte?.(((pos) & (255))) ?? 0)) & (15))) - (8))) | 0);
        }
    }
    function __deref_waveform_r(runtime, p) {
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
    function method_namco_update_one(runtime, stream, output, select, volume, counter, freq) {
        const members = runtime.members;
        let __t0;
        select = ((select) & 0xffff);
        select = ((((select) << (5))) & 0xffff);
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_namco_update_one(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            let waveform = ((method_waveform_r(runtime, ((select) + (method_waveform_position(runtime, counter))))) | 0);
            (__deref_namco_update_one(runtime, stream).add_int?.(output, sampindex, ((waveform) * (volume)), 1024) ?? 0);
            counter = ((((counter) + (freq))) >>> 0);
        }
        return ((counter) >>> 0);
    }
    function __deref_namco_update_one(runtime, p) {
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
    function method_waveform_position(runtime, n) {
        const members = runtime.members;
        return ((((runtime.shiftRight(n, (members.m_f_fracbits ?? 0))) & (31))) & 0xff);
    }
    function method_sound_enable_w(runtime, state) {
        const members = runtime.members;
        members.m_sound_enable = ((state) ? 1 : 0);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const h_m_channel_list = members.m_channel_list ?? 0;
        if ((((members.m_sound_enable ?? 0)) ? 0 : 1)) {
            return;
        }
        for (let __range0 = h_m_channel_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            let flv = ((runtime.readIndex(__range0_item.volume, 0)) | 0);
            let frv = ((runtime.readIndex(__range0_item.volume, 1)) | 0);
            let rlv = ((runtime.readIndex(__range0_item.volume, 2)) | 0);
            let rrv = ((runtime.readIndex(__range0_item.volume, 3)) | 0);
            let c = ((__range0_item.counter) >>> 0);
            if (flv) {
                c = ((method_namco_update_one(runtime, stream, 0, __range0_item.waveform_select, flv, __range0_item.counter, __range0_item.frequency)) >>> 0);
            }
            if (frv) {
                c = ((method_namco_update_one(runtime, stream, 1, __range0_item.waveform_select, frv, __range0_item.counter, __range0_item.frequency)) >>> 0);
            }
            if (rlv) {
                c = ((method_namco_update_one(runtime, stream, 2, __range0_item.waveform_select, rlv, __range0_item.counter, __range0_item.frequency)) >>> 0);
            }
            if (rrv) {
                c = ((method_namco_update_one(runtime, stream, 3, __range0_item.waveform_select, rrv, __range0_item.counter, __range0_item.frequency)) >>> 0);
            }
            __range0_item.counter = c;
        }
    }
    function method_namco_audio_device__sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const h_m_channel_list = members.m_channel_list ?? 0;
        if ((((members.m_sound_enable ?? 0)) ? 0 : 1)) {
            return;
        }
        for (let __range0 = h_m_channel_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            let v = ((runtime.readIndex(__range0_item.volume, 0)) | 0);
            if (v) {
                __range0_item.counter = method_namco_update_one(runtime, stream, 0, __range0_item.waveform_select, v, __range0_item.counter, __range0_item.frequency);
            }
        }
    }
    function method_namco_audio_device__waveform_position(runtime, n) {
        const members = runtime.members;
        return ((((runtime.shiftRight(n, (members.m_f_fracbits ?? 0))) & (31))) & 0xff);
    }
    function method_polepos_sound_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_soundregs ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xff);
    }
    function method_polepos_sound_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9;
        data = ((data) & 0xff);
        const h_m_channel_list = members.m_channel_list ?? 0;
        if (((Number((__t0 = (members.m_soundregs ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) === Number(data)) ? 1 : 0)) {
            return;
        }
        (__t1 = __deref_polepos_sound_w(runtime, members.m_stream), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container(members.m_stream, "update"));
        ((__t2 = members.m_soundregs) && ArrayBuffer.isView(__t2) ? (__t2[offset] = data) : runtime.writeIndex(runtime.writableMember("m_soundregs"), offset, data));
        let ch = ((runtime.shiftRight(((offset) & (31)), 2)) | 0);
        let voice = h_m_channel_list[ch];
        switch (((offset) & (35))) {
            case 0:
            case 1:
                {
                    voice.frequency = (((__t3 = (members.m_soundregs ?? 0), ArrayBuffer.isView(__t3) ? (__t3[__add_polepos_sound_w(runtime, ((ch) * (4)), 0)] ?? 0) : runtime.readIndex(__t3, __add_polepos_sound_w(runtime, ((ch) * (4)), 0)))) >>> 0);
                    voice.frequency = ((((voice.frequency) + ((((__t4 = (members.m_soundregs ?? 0), ArrayBuffer.isView(__t4) ? (__t4[__add_polepos_sound_w(runtime, ((ch) * (4)), 1)] ?? 0) : runtime.readIndex(__t4, __add_polepos_sound_w(runtime, ((ch) * (4)), 1)))) << (8))))) >>> 0);
                    break;
                }
            case 35:
                {
                    voice.waveform_select = ((((data) & (7))) & 0xffff);
                }
            case 2:
            case 3:
                {
                    voice.volume[0] = runtime.shiftRight((__t5 = (members.m_soundregs ?? 0), ArrayBuffer.isView(__t5) ? (__t5[__add_polepos_sound_w(runtime, ((ch) * (4)), 3)] ?? 0) : runtime.readIndex(__t5, __add_polepos_sound_w(runtime, ((ch) * (4)), 3))), 4);
                    voice.volume[1] = (((__t6 = (members.m_soundregs ?? 0), ArrayBuffer.isView(__t6) ? (__t6[__add_polepos_sound_w(runtime, ((ch) * (4)), 3)] ?? 0) : runtime.readIndex(__t6, __add_polepos_sound_w(runtime, ((ch) * (4)), 3)))) & (15));
                    voice.volume[2] = runtime.shiftRight((__t7 = (members.m_soundregs ?? 0), ArrayBuffer.isView(__t7) ? (__t7[__add_polepos_sound_w(runtime, ((ch) * (4)), 35)] ?? 0) : runtime.readIndex(__t7, __add_polepos_sound_w(runtime, ((ch) * (4)), 35))), 4);
                    voice.volume[3] = runtime.shiftRight((__t8 = (members.m_soundregs ?? 0), ArrayBuffer.isView(__t8) ? (__t8[__add_polepos_sound_w(runtime, ((ch) * (4)), 2)] ?? 0) : runtime.readIndex(__t8, __add_polepos_sound_w(runtime, ((ch) * (4)), 2))), 4);
                    if ((((__t9 = (members.m_soundregs ?? 0), ArrayBuffer.isView(__t9) ? (__t9[__add_polepos_sound_w(runtime, ((ch) * (4)), 35)] ?? 0) : runtime.readIndex(__t9, __add_polepos_sound_w(runtime, ((ch) * (4)), 35)))) & (8))) {
                        voice.volume[0] = (voice.volume[1] = (voice.volume[2] = (voice.volume[3] = 0)));
                    }
                    break;
                }
        }
    }
    function __add_polepos_sound_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_polepos_sound_w(runtime, p) {
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
        "device_start": method_device_start,
        "device_clock_changed": method_device_clock_changed,
        "waveform_r": method_waveform_r,
        "namco_update_one": method_namco_update_one,
        "waveform_position": method_waveform_position,
        "sound_enable_w": method_sound_enable_w,
        "sound_stream_update": method_sound_stream_update,
        "namco_audio_device::sound_stream_update": method_namco_audio_device__sound_stream_update,
        "namco_audio_device::waveform_position": method_namco_audio_device__waveform_position,
        "polepos_sound_r": method_polepos_sound_r,
        "polepos_sound_w": method_polepos_sound_w
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "clock", "save_pointer", "stream_alloc"];
export const device = definition;
export default device;
