import deviceData from './okim6295.device.ir.json' with { type: 'json' };
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
    function method_device_validity_check(runtime, valid) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["osd_printf_error"];
        if ((((((Number(0) !== Number((members.m_pin7_state ?? 0))) ? 1 : 0)) && (((Number(1) !== Number((members.m_pin7_state ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0("Initial pin 7 state not configured\n") : runtime.macro("osd_printf_error", "Initial pin 7 state not configured\n"));
        }
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["stream_alloc"], __L2 = __l["NAME"], __L3 = __l["save_item"];
        const h_m_voice = members.m_voice ?? 0;
        if ((((((Number(0) !== Number((members.m_pin7_state ?? 0))) ? 1 : 0)) && (((Number(1) !== Number((members.m_pin7_state ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            members.m_pin7_state = ((0) & 0xff);
        }
        let divisor = (((((members.m_pin7_state ?? 0)) ? (132) : (165))) | 0);
        members.m_stream = (__L1 ? __L1(0, 1, runtime.divide((__L0 ? __L0() : runtime.macro("clock")), divisor)) : runtime.macro("stream_alloc", 0, 1, runtime.divide((__L0 ? __L0() : runtime.macro("clock")), divisor)));
        (__L3 ? __L3((__L2 ? __L2((members.m_command ?? 0)) : runtime.macro("NAME", (members.m_command ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_command ?? 0)) : runtime.macro("NAME", (members.m_command ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_pin7_state ?? 0)) : runtime.macro("NAME", (members.m_pin7_state ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_pin7_state ?? 0)) : runtime.macro("NAME", (members.m_pin7_state ?? 0)))));
        for (let voicenum = ((0) | 0); ((Number(voicenum) < Number(4)) ? 1 : 0); voicenum = ((((voicenum) + (1))) | 0)) {
            (__L3 ? __L3((__L2 ? __L2(h_m_voice[voicenum].$members.m_playing) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_playing)), voicenum) : runtime.macro("save_item", (__L2 ? __L2(h_m_voice[voicenum].$members.m_playing) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_playing)), voicenum));
            (__L3 ? __L3((__L2 ? __L2(h_m_voice[voicenum].$members.m_sample) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_sample)), voicenum) : runtime.macro("save_item", (__L2 ? __L2(h_m_voice[voicenum].$members.m_sample) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_sample)), voicenum));
            (__L3 ? __L3((__L2 ? __L2(h_m_voice[voicenum].$members.m_count) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_count)), voicenum) : runtime.macro("save_item", (__L2 ? __L2(h_m_voice[voicenum].$members.m_count) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_count)), voicenum));
            (__L3 ? __L3((__L2 ? __L2(h_m_voice[voicenum].$members.m_adpcm.m_signal) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_adpcm.m_signal)), voicenum) : runtime.macro("save_item", (__L2 ? __L2(h_m_voice[voicenum].$members.m_adpcm.m_signal) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_adpcm.m_signal)), voicenum));
            (__L3 ? __L3((__L2 ? __L2(h_m_voice[voicenum].$members.m_adpcm.m_step) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_adpcm.m_step)), voicenum) : runtime.macro("save_item", (__L2 ? __L2(h_m_voice[voicenum].$members.m_adpcm.m_step) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_adpcm.m_step)), voicenum));
            (__L3 ? __L3((__L2 ? __L2(h_m_voice[voicenum].$members.m_volume) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_volume)), voicenum) : runtime.macro("save_item", (__L2 ? __L2(h_m_voice[voicenum].$members.m_volume) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_volume)), voicenum));
            (__L3 ? __L3((__L2 ? __L2(h_m_voice[voicenum].$members.m_base_offset) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_base_offset)), voicenum) : runtime.macro("save_item", (__L2 ? __L2(h_m_voice[voicenum].$members.m_base_offset) : runtime.macro("NAME", h_m_voice[voicenum].$members.m_base_offset)), voicenum));
        }
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_voice = members.m_voice ?? 0;
        (__t0 = __deref_device_reset(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        for (let __range0 = h_m_voice, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            __range0_item.m_playing = 0;
        }
    }
    function __deref_device_reset(runtime, p) {
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
    function method_device_post_load(runtime) {
        const members = runtime.members;
        method_device_clock_changed(runtime);
    }
    function method_device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        let divisor = (((((members.m_pin7_state ?? 0)) ? (132) : (165))) | 0);
        (__deref_device_clock_changed(runtime, members.m_stream).set_sample_rate?.(runtime.divide((__L0 ? __L0() : runtime.macro("clock")), divisor)) ?? 0);
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
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const h_m_voice = members.m_voice ?? 0;
        for (let __range0 = h_m_voice, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            (__deref_sound_stream_update(runtime, __range0_item).generate_adpcm?.((members.this ?? 0), stream) ?? 0);
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
    function method_rom_bank_pre_change(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_rom_bank_pre_change(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
    }
    function __deref_rom_bank_pre_change(runtime, p) {
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
    function method_set_pin7(runtime, pin7) {
        const members = runtime.members;
        members.m_pin7_state = ((((pin7) ? (1) : (0))) & 0xff);
        method_device_clock_changed(runtime);
    }
    function method_read(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_voice = members.m_voice ?? 0;
        let result = ((240) & 0xff);
        (__t0 = __deref_read(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        for (let voicenum = ((0) | 0); ((Number(voicenum) < Number(4)) ? 1 : 0); voicenum = ((((voicenum) + (1))) | 0)) {
            if (h_m_voice[voicenum].$members.m_playing) {
                result = ((((result) | (((1) << (voicenum))))) & 0xff);
            }
        }
        return ((result) & 0xff);
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
    function method_write(runtime, command) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["read_byte"];
        let __t0, __t1, __t2;
        command = ((command) & 0xff);
        const h_m_voice = members.m_voice ?? 0;
        if (((Number((members.m_command ?? 0)) !== Number(-1)) ? 1 : 0)) {
            let voicemask = ((((command) >>> (4))) | 0);
            (__t0 = __deref_write(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
            for (let voicenum = ((0) | 0); ((Number(voicenum) < Number(4)) ? 1 : 0); voicenum = ((((voicenum) + (1))) | 0), voicemask = ((((voicemask) >> (1))) | 0)) {
                if (((voicemask) & (1))) {
                    let voice = h_m_voice[voicenum];
                    if (((voice.m_playing) ? 0 : 1)) {
                        let base = (((members.m_command ?? 0)) * (8));
                        let start = (((__L0 ? __L0(((base) + (0))) : runtime.macro("read_byte", ((base) + (0))))) << (16));
                        start = ((start) | ((((__L0 ? __L0(((base) + (1))) : runtime.macro("read_byte", ((base) + (1))))) << (8))));
                        start = ((start) | ((((__L0 ? __L0(((base) + (2))) : runtime.macro("read_byte", ((base) + (2))))) << (0))));
                        start = ((start) & (262143));
                        let stop = (((__L0 ? __L0(((base) + (3))) : runtime.macro("read_byte", ((base) + (3))))) << (16));
                        stop = ((stop) | ((((__L0 ? __L0(((base) + (4))) : runtime.macro("read_byte", ((base) + (4))))) << (8))));
                        stop = ((stop) | ((((__L0 ? __L0(((base) + (5))) : runtime.macro("read_byte", ((base) + (5))))) << (0))));
                        stop = ((stop) & (262143));
                        if ((((start) < (stop)) ? 1 : 0)) {
                            voice.m_playing = 1;
                            voice.m_base_offset = start;
                            voice.m_sample = 0;
                            voice.m_count = ((2) * (__add_write(runtime, ((stop) - (start)), 1)));
                            (__t1 = __deref_write(runtime, voice.m_adpcm), typeof __t1.reset === 'function' ? __t1.reset() : typeof __t1.reset === 'number' || typeof __t1.reset === 'boolean' ? __t1.reset : runtime.container(voice.m_adpcm, "reset"));
                            voice.m_volume = ([((32) / (32)), ((22) / (32)), ((16) / (32)), ((11) / (32)), ((8) / (32)), ((6) / (32)), ((4) / (32)), ((3) / (32)), ((2) / (32)), ((0) / (32)), ((0) / (32)), ((0) / (32)), ((0) / (32)), ((0) / (32)), ((0) / (32)), ((0) / (32))][(((((command) & (15))) % 16) + 16) % 16] ?? 0);
                        }
                        else {
                            0;
                        }
                    }
                    else {
                        0;
                    }
                }
            }
            members.m_command = ((-1) | 0);
        }
        else {
            if (((command) & (128))) {
                members.m_command = ((((command) & (127))) | 0);
            }
            else {
                (__t2 = __deref_write(runtime, members.m_stream), typeof __t2.update === 'function' ? __t2.update() : typeof __t2.update === 'number' || typeof __t2.update === 'boolean' ? __t2.update : runtime.container(members.m_stream, "update"));
                let voicemask = ((((command) >>> (3))) | 0);
                for (let voicenum = ((0) | 0); ((Number(voicenum) < Number(4)) ? 1 : 0); voicenum = ((((voicenum) + (1))) | 0), voicemask = ((((voicemask) >> (1))) | 0)) {
                    if (((voicemask) & (1))) {
                        h_m_voice[voicenum].$members.m_playing = ((0) ? 1 : 0);
                    }
                }
            }
        }
    }
    function __add_write(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method_config_pin7(runtime, pin7) {
        const members = runtime.members;
        members.m_pin7_state = ((pin7) & 0xff);
    }
    function method_okim6295_device__config_pin7(runtime, pin7) {
        const members = runtime.members;
        members.m_pin7_state = ((pin7) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_validity_check": method_device_validity_check,
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "device_post_load": method_device_post_load,
        "device_clock_changed": method_device_clock_changed,
        "sound_stream_update": method_sound_stream_update,
        "rom_bank_pre_change": method_rom_bank_pre_change,
        "set_pin7": method_set_pin7,
        "read": method_read,
        "write": method_write,
        "config_pin7": method_config_pin7,
        "okim6295_device::config_pin7": method_okim6295_device__config_pin7
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "clock", "osd_printf_error", "read_byte", "save_item", "stream_alloc"];
definition.allocations["okim_voice"].compiledMethods = (() => {
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
    function method_generate_adpcm(runtime, rom, stream) {
        const members = runtime.members;
        let __t0;
        if ((((members.m_playing ?? 0)) ? 0 : 1)) {
            return;
        }
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_generate_adpcm(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            let nibble = ((runtime.shiftRight((__deref_generate_adpcm(runtime, rom).read_byte?.((((members.m_base_offset ?? 0)) + (runtime.divide((members.m_sample ?? 0), 2)))) ?? 0), (((((((members.m_sample ?? 0)) & (1))) << (2))) ^ (4)))) | 0);
            (__deref_generate_adpcm(runtime, stream).add_int?.(0, sampindex, (((members.m_adpcm.clock?.(nibble) ?? 0)) * ((members.m_volume ?? 0))), 2048) ?? 0);
            if (((Number((members.m_sample = ((((members.m_sample) + (1))) >>> 0))) >= Number((members.m_count ?? 0))) ? 1 : 0)) {
                members.m_playing = ((0) ? 1 : 0);
                break;
            }
        }
    }
    function __deref_generate_adpcm(runtime, p) {
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
    function method___construct(runtime) {
        const members = runtime.members;
        members.m_playing = ((0) ? 1 : 0);
        members.m_base_offset = 0;
        members.m_sample = ((0) >>> 0);
        members.m_count = ((0) >>> 0);
        members.m_volume = 0;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "generate_adpcm": method_generate_adpcm,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["okim_voice"].allocations["oki_adpcm_state"].compiledMethods = (() => {
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
    const __mame_table_0 = [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, -1, 0, 0, 0, -1, 0, 0, 1, -1, 0, 1, 0, -1, 0, 1, 1, -1, 1, 0, 0, -1, 1, 0, 1, -1, 1, 1, 0, -1, 1, 1, 1];
    const __mame_table_1 = [-1, -1, -1, -1, 2, 4, 6, 8];
    function method_oki_adpcm_state(runtime) {
        const members = runtime.members;
        method_compute_tables(runtime);
        method_reset(runtime);
    }
    function method_compute_tables(runtime) {
        const members = runtime.members;
        const h_s_diff_lookup = members.s_diff_lookup ?? 0;
        if ((members.s_tables_computed ?? 0)) {
            return;
        }
        members.s_tables_computed = ((1) ? 1 : 0);
        for (let step = ((0) | 0); (((step) <= (48)) ? 1 : 0); step = ((((step) + (1))) | 0)) {
            let stepval = ((Math.floor(Number(((16) * (Math.pow(Number(((11) / (10))), Number(step))))))) | 0);
            for (let nib = ((0) | 0); (((nib) < (16)) ? 1 : 0); nib = ((((nib) + (1))) | 0)) {
                h_s_diff_lookup[((((step) * (16))) + (nib))] = (((__mame_table_0[(((__add_compute_tables(runtime, ((nib) * (4)), 0)) % 64) + 64) % 64] ?? 0)) * (__add_compute_tables(runtime, __add_compute_tables(runtime, __add_compute_tables(runtime, ((stepval) * ((__mame_table_0[(((__add_compute_tables(runtime, ((nib) * (4)), 1)) % 64) + 64) % 64] ?? 0))), ((runtime.divide(stepval, 2)) * ((__mame_table_0[(((__add_compute_tables(runtime, ((nib) * (4)), 2)) % 64) + 64) % 64] ?? 0)))), ((runtime.divide(stepval, 4)) * ((__mame_table_0[(((__add_compute_tables(runtime, ((nib) * (4)), 3)) % 64) + 64) % 64] ?? 0)))), runtime.divide(stepval, 8))));
            }
        }
    }
    function __add_compute_tables(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_reset(runtime) {
        const members = runtime.members;
        members.m_signal = (((members.m_loop_signal = ((0) | 0))) | 0);
        members.m_step = (((members.m_loop_step = ((0) | 0))) | 0);
        members.m_saved = ((0) ? 1 : 0);
    }
    function method_output(runtime) {
        const members = runtime.members;
        return (((members.m_signal ?? 0)) << 16 >> 16);
    }
    function method_clock(runtime, nibble) {
        const members = runtime.members;
        nibble = ((nibble) & 0xff);
        const h_s_diff_lookup = members.s_diff_lookup ?? 0;
        members.m_signal = ((((members.m_signal) + (h_s_diff_lookup[__add_clock(runtime, (((members.m_step ?? 0)) * (16)), ((nibble) & (15)))]))) | 0);
        if (((((members.m_signal ?? 0)) > (2047)) ? 1 : 0)) {
            members.m_signal = ((2047) | 0);
        }
        else {
            if (((Number((members.m_signal ?? 0)) < Number(-2048)) ? 1 : 0)) {
                members.m_signal = ((-2048) | 0);
            }
        }
        members.m_step = ((((members.m_step) + ((__mame_table_1[(((((nibble) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
        if (((((members.m_step ?? 0)) > (48)) ? 1 : 0)) {
            members.m_step = ((48) | 0);
        }
        else {
            if (((((members.m_step ?? 0)) < (0)) ? 1 : 0)) {
                members.m_step = ((0) | 0);
            }
        }
        return (((members.m_signal ?? 0)) << 16 >> 16);
    }
    function __add_clock(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_save(runtime) {
        const members = runtime.members;
        if ((((members.m_saved ?? 0)) ? 0 : 1)) {
            members.m_loop_signal = (((members.m_signal ?? 0)) | 0);
            members.m_loop_step = (((members.m_step ?? 0)) | 0);
            members.m_saved = ((1) ? 1 : 0);
        }
    }
    function method_restore(runtime) {
        const members = runtime.members;
        members.m_signal = (((members.m_loop_signal ?? 0)) | 0);
        members.m_step = (((members.m_loop_step ?? 0)) | 0);
    }
    function method_oki_adpcm_state__oki_adpcm_state(runtime) {
        const members = runtime.members;
        method_compute_tables(runtime);
        method_reset(runtime);
    }
    function method_oki_adpcm_state__output(runtime) {
        const members = runtime.members;
        return (((members.m_signal ?? 0)) << 16 >> 16);
    }
    function method___construct(runtime) {
        const members = runtime.members;
        method_compute_tables(runtime);
        method_reset(runtime);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "oki_adpcm_state": method_oki_adpcm_state,
        "compute_tables": method_compute_tables,
        "reset": method_reset,
        "output": method_output,
        "clock": method_clock,
        "save": method_save,
        "restore": method_restore,
        "oki_adpcm_state::oki_adpcm_state": method_oki_adpcm_state__oki_adpcm_state,
        "oki_adpcm_state::output": method_oki_adpcm_state__output,
        "__construct": method___construct
    };
    return __methodTable;
})();
export const device = definition;
export default device;
