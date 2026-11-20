import deviceData from './k053260.device.ir.json' with { type: 'json' };
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
    function method_main_read(runtime, offset) {
        const members = runtime.members;
        const h_m_portdata = members.m_portdata ?? 0;
        return ((h_m_portdata[__add_main_read(runtime, 2, ((offset) & (1)))]) & 0xff);
    }
    function __add_main_read(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_main_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_portdata = members.m_portdata ?? 0;
        h_m_portdata[((offset) & (1))] = data;
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0;
        const h_m_portdata = members.m_portdata ?? 0;
        const h_m_voice = members.m_voice ?? 0;
        offset = ((offset) & (63));
        let ret = ((0) & 0xff);
        switch (offset) {
            case 0:
            case 1:
                {
                    ret = ((h_m_portdata[offset]) & 0xff);
                    break;
                }
            case 41:
                {
                    (__t0 = __deref_read(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
                    for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        ret = ((((ret) | ((((h_m_voice[i].playing?.() ?? 0)) << (i))))) & 0xff);
                    }
                    break;
                }
            case 46:
                {
                    if ((((members.m_mode ?? 0)) & (1))) {
                        ret = (((h_m_voice[0].read_rom?.(((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) ?? 0)) & 0xff);
                    }
                    else {
                        0;
                    }
                    break;
                }
            default:
                {
                    0;
                }
        }
        return ((ret) & 0xff);
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
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        const h_m_voice = members.m_voice ?? 0;
        const h_m_portdata = members.m_portdata ?? 0;
        offset = ((offset) & (63));
        (__t0 = __deref_write(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        if (((((((offset) >= (8)) ? 1 : 0)) && ((((offset) <= (39)) ? 1 : 0))) ? 1 : 0)) {
            (h_m_voice[runtime.divide(((offset) - (8)), 8)].set_register?.(offset, data) ?? 0);
            return;
        }
        switch (offset) {
            case 2:
            case 3:
                {
                    h_m_portdata[offset] = data;
                    break;
                }
            case 40:
                {
                    let rising_edge = ((((data) & ((~(members.m_keyon ?? 0))))) & 0xff);
                    for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        (h_m_voice[i].set_reverse?.((((data) >>> (((i) | (4)))) & 1)) ?? 0);
                        if ((((rising_edge) >>> (i)) & 1)) {
                            (h_m_voice[i].key_on?.() ?? 0);
                        }
                        else {
                            if ((((((data) >>> (i)) & 1)) ? 0 : 1)) {
                                (h_m_voice[i].key_off?.() ?? 0);
                            }
                        }
                    }
                    members.m_keyon = ((data) & 0xff);
                    break;
                }
            case 42:
                {
                    for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        (h_m_voice[i].set_loop?.((((data) >>> (i)) & 1)) ?? 0);
                        (h_m_voice[i].set_kadpcm?.((((data) >>> (((i) | (4)))) & 1)) ?? 0);
                    }
                    break;
                }
            case 44:
                {
                    (h_m_voice[0].set_pan?.(data) ?? 0);
                    (h_m_voice[1].set_pan?.(((data) >>> (3))) ?? 0);
                    break;
                }
            case 45:
                {
                    (h_m_voice[2].set_pan?.(data) ?? 0);
                    (h_m_voice[3].set_pan?.(((data) >>> (3))) ?? 0);
                    break;
                }
            case 47:
                {
                    members.m_mode = ((data) & 0xff);
                    break;
                }
            default:
                {
                    0;
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
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_voice = members.m_voice ?? 0;
        if ((((members.m_mode ?? 0)) & (2))) {
            for (let j = ((0) | 0); ((Number(j) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                let buffer = new Int32Array([0, 0]);
                for (let __range0 = h_m_voice, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                    const __range0_item = runtime.readIndex(__range0, __range0_index);
                    if ((__t1 = __deref_sound_stream_update(runtime, __range0_item), typeof __t1.playing === 'function' ? (__t1.playing() ?? 0) : runtime.container(__range0_item, "playing"))) {
                        (__deref_sound_stream_update(runtime, __range0_item).play?.(buffer) ?? 0);
                    }
                }
                (__deref_sound_stream_update(runtime, stream).put_int_clamp?.(0, j, (buffer[0] ?? 0), 32768) ?? 0);
                (__deref_sound_stream_update(runtime, stream).put_int_clamp?.(1, j, (buffer[1] ?? 0), 32768) ?? 0);
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
    function method_update_state_outputs(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sh1_cb"], __L1 = __l["m_sh2_cb"];
        let __t0, __t1, __t2, __t3;
        switch ((members.m_timer_state ?? 0)) {
            case 0:
                {
                    if ((((__t0 = __deref_update_state_outputs(runtime, members.m_sh1_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_sh1_cb, "isunset"))) ? 0 : 1)) {
                        (__L0 ? __L0(Number(1)) : typeof members.m_sh1_cb === 'function' ? members.m_sh1_cb(1) : runtime.invoke("m_sh1_cb", 1));
                    }
                    break;
                }
            case 1:
                {
                    if ((((__t1 = __deref_update_state_outputs(runtime, members.m_sh1_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_sh1_cb, "isunset"))) ? 0 : 1)) {
                        (__L0 ? __L0(Number(0)) : typeof members.m_sh1_cb === 'function' ? members.m_sh1_cb(0) : runtime.invoke("m_sh1_cb", 0));
                    }
                    method_tim2_count(runtime);
                    break;
                }
            case 2:
                {
                    if ((((__t2 = __deref_update_state_outputs(runtime, members.m_sh2_cb), typeof __t2.isunset === 'function' ? __t2.isunset() : typeof __t2.isunset === 'number' || typeof __t2.isunset === 'boolean' ? __t2.isunset : runtime.container(members.m_sh2_cb, "isunset"))) ? 0 : 1)) {
                        (__L1 ? __L1(Number(1)) : typeof members.m_sh2_cb === 'function' ? members.m_sh2_cb(1) : runtime.invoke("m_sh2_cb", 1));
                    }
                    break;
                }
            case 3:
                {
                    if ((((__t3 = __deref_update_state_outputs(runtime, members.m_sh2_cb), typeof __t3.isunset === 'function' ? __t3.isunset() : typeof __t3.isunset === 'number' || typeof __t3.isunset === 'boolean' ? __t3.isunset : runtime.container(members.m_sh2_cb, "isunset"))) ? 0 : 1)) {
                        (__L1 ? __L1(Number(0)) : typeof members.m_sh2_cb === 'function' ? members.m_sh2_cb(0) : runtime.invoke("m_sh2_cb", 0));
                    }
                    break;
                }
        }
        members.m_timer_state = (((((((members.m_timer_state ?? 0)) + (1))) & (3))) >>> 0);
    }
    function __deref_update_state_outputs(runtime, p) {
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
    function method_tim2_count(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_tim2_cb"];
        members.m_tim2_count = ((((members.m_tim2_count) + (1))) >>> 0);
        if (((((members.m_tim2_count ?? 0)) >= (112)) ? 1 : 0)) {
            members.m_tim2_count = ((0) >>> 0);
            (__L0 ? __L0(Number(1)) : typeof members.m_tim2_cb === 'function' ? members.m_tim2_cb(1) : runtime.invoke("m_tim2_cb", 1));
        }
        else {
            if (((((members.m_tim2_count ?? 0)) === (1)) ? 1 : 0)) {
                (__L0 ? __L0(Number(0)) : typeof members.m_tim2_cb === 'function' ? members.m_tim2_cb(0) : runtime.invoke("m_tim2_cb", 0));
            }
        }
    }
    function method_sh1_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_sh1_cb(runtime, members.m_sh1_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_sh1_cb, "bind"));
    }
    function __deref_sh1_cb(runtime, p) {
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
    function method_sh2_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_sh2_cb(runtime, members.m_sh2_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_sh2_cb, "bind"));
    }
    function __deref_sh2_cb(runtime, p) {
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
    function method_tim2_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tim2_cb(runtime, members.m_tim2_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tim2_cb, "bind"));
    }
    function __deref_tim2_cb(runtime, p) {
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
    function method_k053260_device__sh1_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k053260_device__sh1_cb(runtime, members.m_sh1_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_sh1_cb, "bind"));
    }
    function __deref_k053260_device__sh1_cb(runtime, p) {
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
    function method_k053260_device__sh2_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k053260_device__sh2_cb(runtime, members.m_sh2_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_sh2_cb, "bind"));
    }
    function __deref_k053260_device__sh2_cb(runtime, p) {
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
    function method_k053260_device__tim2_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_k053260_device__tim2_cb(runtime, members.m_tim2_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tim2_cb, "bind"));
    }
    function __deref_k053260_device__tim2_cb(runtime, p) {
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
        "main_read": method_main_read,
        "main_write": method_main_write,
        "read": method_read,
        "write": method_write,
        "sound_stream_update": method_sound_stream_update,
        "update_state_outputs": method_update_state_outputs,
        "tim2_count": method_tim2_count,
        "sh1_cb": method_sh1_cb,
        "sh2_cb": method_sh2_cb,
        "tim2_cb": method_tim2_cb,
        "k053260_device::sh1_cb": method_k053260_device__sh1_cb,
        "k053260_device::sh2_cb": method_k053260_device__sh2_cb,
        "k053260_device::tim2_cb": method_k053260_device__tim2_cb
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_sh1_cb", "m_sh2_cb", "m_tim2_cb", "machine", "machine().side_effects_disabled"];
definition.allocations["KDSC_Voice"].compiledMethods = (() => {
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
    const __mame_table_0 = [0, 0, 65536, 0, 59870, 26656, 53684, 37950, 46341, 46341, 37950, 53684, 26656, 59870, 0, 65536];
    function method_voice_start(runtime, index) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"];
        const h_m_pan_volume = members.m_pan_volume ?? 0;
        method_voice_reset(runtime);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_position ?? 0)) : runtime.macro("NAME", (members.m_position ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0(h_m_pan_volume) : runtime.macro("NAME", h_m_pan_volume)), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_counter ?? 0)) : runtime.macro("NAME", (members.m_counter ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_output ?? 0)) : runtime.macro("NAME", (members.m_output ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_playing ?? 0)) : runtime.macro("NAME", (members.m_playing ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_start ?? 0)) : runtime.macro("NAME", (members.m_start ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_length ?? 0)) : runtime.macro("NAME", (members.m_length ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_pitch ?? 0)) : runtime.macro("NAME", (members.m_pitch ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_volume ?? 0)) : runtime.macro("NAME", (members.m_volume ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_pan ?? 0)) : runtime.macro("NAME", (members.m_pan ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_loop ?? 0)) : runtime.macro("NAME", (members.m_loop ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_kadpcm ?? 0)) : runtime.macro("NAME", (members.m_kadpcm ?? 0))), index) ?? 0);
        (__deref_voice_start(runtime, members.m_device).save_item?.((__L0 ? __L0((members.m_reverse ?? 0)) : runtime.macro("NAME", (members.m_reverse ?? 0))), index) ?? 0);
    }
    function __deref_voice_start(runtime, p) {
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
    function method_voice_reset(runtime) {
        const members = runtime.members;
        members.m_position = ((0) >>> 0);
        members.m_counter = ((0) & 0xffff);
        members.m_output = ((0) << 24 >> 24);
        members.m_playing = ((0) ? 1 : 0);
        members.m_start = ((0) >>> 0);
        members.m_length = ((0) & 0xffff);
        members.m_pitch = ((0) & 0xffff);
        members.m_volume = ((0) & 0xff);
        members.m_pan = ((0) & 0xff);
        members.m_loop = ((0) ? 1 : 0);
        members.m_kadpcm = ((0) ? 1 : 0);
        members.m_reverse = ((0) ? 1 : 0);
        method_update_pan_volume(runtime);
    }
    function method_update_pan_volume(runtime) {
        const members = runtime.members;
        const h_m_pan_volume = members.m_pan_volume ?? 0;
        h_m_pan_volume[0] = (((members.m_volume ?? 0)) * ((__mame_table_0[(((__add_update_pan_volume(runtime, (((members.m_pan ?? 0)) * (2)), 0)) % 16) + 16) % 16] ?? 0)));
        h_m_pan_volume[1] = (((members.m_volume ?? 0)) * ((__mame_table_0[(((__add_update_pan_volume(runtime, (((members.m_pan ?? 0)) * (2)), 1)) % 16) + 16) % 16] ?? 0)));
    }
    function __add_update_pan_volume(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_set_register(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        switch (((offset) & (7))) {
            case 0:
                {
                    members.m_pitch = (((((((members.m_pitch ?? 0)) & (3840))) | (data))) & 0xffff);
                    break;
                }
            case 1:
                {
                    members.m_pitch = (((((((members.m_pitch ?? 0)) & (255))) | (((((data) << (8))) & (3840))))) & 0xffff);
                    break;
                }
            case 2:
                {
                    members.m_length = (((((((members.m_length ?? 0)) & (65280))) | (data))) & 0xffff);
                    break;
                }
            case 3:
                {
                    members.m_length = (((((((members.m_length ?? 0)) & (255))) | (((data) << (8))))) & 0xffff);
                    break;
                }
            case 4:
                {
                    members.m_start = (((((((members.m_start ?? 0)) & (2096896))) | (data))) >>> 0);
                    break;
                }
            case 5:
                {
                    members.m_start = (((((((members.m_start ?? 0)) & (2031871))) | (((data) << (8))))) >>> 0);
                    break;
                }
            case 6:
                {
                    members.m_start = (((((((members.m_start ?? 0)) & (65535))) | (((((data) << (16))) & (2031616))))) >>> 0);
                    break;
                }
            case 7:
                {
                    members.m_volume = ((((data) & (127))) & 0xff);
                    method_update_pan_volume(runtime);
                }
        }
    }
    function method_set_loop(runtime, state) {
        const members = runtime.members;
        members.m_loop = ((((state) ? 1 : 0)) ? 1 : 0);
    }
    function method_set_kadpcm(runtime, state) {
        const members = runtime.members;
        members.m_kadpcm = ((((state) ? 1 : 0)) ? 1 : 0);
    }
    function method_set_reverse(runtime, state) {
        const members = runtime.members;
        members.m_reverse = ((((state) ? 1 : 0)) ? 1 : 0);
    }
    function method_set_pan(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_pan = ((((data) & (7))) & 0xff);
        method_update_pan_volume(runtime);
    }
    function method_key_on(runtime) {
        const members = runtime.members;
        members.m_position = (((((members.m_kadpcm ?? 0)) ? (1) : (0))) >>> 0);
        members.m_counter = ((4032) & 0xffff);
        members.m_output = ((0) << 24 >> 24);
        members.m_playing = ((1) ? 1 : 0);
        if (0) {
            0;
        }
    }
    function method_key_off(runtime) {
        const members = runtime.members;
        members.m_position = ((0) >>> 0);
        members.m_output = ((0) << 24 >> 24);
        members.m_playing = ((0) ? 1 : 0);
    }
    function method_play(runtime, outputs) {
        const members = runtime.members;
        const h_m_pan_volume = members.m_pan_volume ?? 0;
        members.m_counter = ((((members.m_counter) + (64))) & 0xffff);
        while (((((members.m_counter ?? 0)) >= (4096)) ? 1 : 0)) {
            members.m_counter = (((((((members.m_counter ?? 0)) - (4096))) + ((members.m_pitch ?? 0)))) & 0xffff);
            let bytepos = ((runtime.shiftRight((members.m_position = ((((members.m_position) + (1))) >>> 0)), (((members.m_kadpcm ?? 0)) ? (1) : (0)))) >>> 0);
            if ((((bytepos) > ((members.m_length ?? 0))) ? 1 : 0)) {
                if ((members.m_loop ?? 0)) {
                    members.m_position = (((members.m_output = (((bytepos = ((0) >>> 0))) << 24 >> 24))) >>> 0);
                }
                else {
                    members.m_playing = ((0) ? 1 : 0);
                    return;
                }
            }
            let romdata = (((__deref_play(runtime, members.m_device).read_byte?.((((members.m_start ?? 0)) + ((((members.m_reverse ?? 0)) ? ((-bytepos)) : ((+bytepos)))))) ?? 0)) & 0xff);
            if ((members.m_kadpcm ?? 0)) {
                if ((((members.m_position ?? 0)) & (1))) {
                    romdata = ((((romdata) >>> (4))) & 0xff);
                }
                if ((((members.__static_play_kadpcm_table__initialised ?? 0)) ? 0 : 1)) {
                    members.__static_play_kadpcm_table = [0, 1, 2, 4, 8, 16, 32, 64, -128, -64, -32, -16, -8, -4, -2, -1];
                    members.__static_play_kadpcm_table__initialised = 1;
                }
                let kadpcm_table = (members.__static_play_kadpcm_table ?? 0);
                members.m_output = ((((members.m_output) + (runtime.readIndex(kadpcm_table, ((romdata) & (15)))))) << 24 >> 24);
            }
            else {
                members.m_output = ((romdata) << 24 >> 24);
            }
        }
        runtime.writeIndex(outputs, 0, ((runtime.readIndex(outputs, 0)) + (runtime.shiftRight((((members.m_output ?? 0)) * (h_m_pan_volume[0])), 15))));
        runtime.writeIndex(outputs, 1, ((runtime.readIndex(outputs, 1)) + (runtime.shiftRight((((members.m_output ?? 0)) * (h_m_pan_volume[1])), 15))));
    }
    function __deref_play(runtime, p) {
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
    function method_read_rom(runtime, side_effects) {
        const members = runtime.members;
        let offs = (((((members.m_start ?? 0)) + ((members.m_position ?? 0)))) >>> 0);
        if (side_effects) {
            members.m_position = (((((((members.m_position ?? 0)) + (1))) & (65535))) >>> 0);
        }
        return (((__deref_read_rom(runtime, members.m_device).read_byte?.(offs) ?? 0)) & 0xff);
    }
    function __deref_read_rom(runtime, p) {
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
    function method_playing(runtime) {
        const members = runtime.members;
        return (members.m_playing ?? 0);
    }
    function method_k053260_device__KDSC_Voice__playing(runtime) {
        const members = runtime.members;
        return (members.m_playing ?? 0);
    }
    function method___construct(runtime, device) {
        const members = runtime.members;
        const h_m_pan_volume = members.m_pan_volume ?? 0;
        members.m_device = device;
        h_m_pan_volume[0] = 0;
        h_m_pan_volume[1] = 0;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "voice_start": method_voice_start,
        "voice_reset": method_voice_reset,
        "update_pan_volume": method_update_pan_volume,
        "set_register": method_set_register,
        "set_loop": method_set_loop,
        "set_kadpcm": method_set_kadpcm,
        "set_reverse": method_set_reverse,
        "set_pan": method_set_pan,
        "key_on": method_key_on,
        "key_off": method_key_off,
        "play": method_play,
        "read_rom": method_read_rom,
        "playing": method_playing,
        "k053260_device::KDSC_Voice::playing": method_k053260_device__KDSC_Voice__playing,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["KDSC_Voice"].compiledMethodLinks = ["NAME"];
export const device = definition;
export default device;
