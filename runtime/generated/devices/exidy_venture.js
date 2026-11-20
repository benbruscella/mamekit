import deviceData from './exidy_venture.device.ir.json' with { type: 'json' };
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
    function method_sh6840_apply_clock(runtime, t, clocks) {
        const members = runtime.members;
        let __t0;
        if (((__deref_sh6840_apply_clock(runtime, t).cr) & (4))) {
            while (((Number(clocks) > Number(__deref_sh6840_apply_clock(runtime, t).counter.b.l)) ? 1 : 0)) {
                clocks = ((((clocks) - (__add_sh6840_apply_clock(runtime, __deref_sh6840_apply_clock(runtime, t).counter.b.l, 1)))) | 0);
                __deref_sh6840_apply_clock(runtime, t).counter.b.l = __deref_sh6840_apply_clock(runtime, t).timer;
                if ((((__t0 = __deref_sh6840_apply_clock(runtime, t).counter.b.h, __deref_sh6840_apply_clock(runtime, t).counter.b.h = runtime.subtract(__deref_sh6840_apply_clock(runtime, t).counter.b.h, 1), __t0)) ? 0 : 1)) {
                    __deref_sh6840_apply_clock(runtime, t).state = 0;
                    __deref_sh6840_apply_clock(runtime, t).counter.w = __deref_sh6840_apply_clock(runtime, t).timer;
                }
                else {
                    if (((__deref_sh6840_apply_clock(runtime, t).counter.b.h) ? 0 : 1)) {
                        __deref_sh6840_apply_clock(runtime, t).state = 1;
                        __deref_sh6840_apply_clock(runtime, t).clocks = __add_sh6840_apply_clock(runtime, __deref_sh6840_apply_clock(runtime, t).clocks, 1);
                    }
                }
            }
            __deref_sh6840_apply_clock(runtime, t).counter.b.l = runtime.subtract(__deref_sh6840_apply_clock(runtime, t).counter.b.l, clocks);
        }
        else {
            while (((Number(clocks) > Number(__deref_sh6840_apply_clock(runtime, t).counter.w)) ? 1 : 0)) {
                clocks = ((((clocks) - (__add_sh6840_apply_clock(runtime, __deref_sh6840_apply_clock(runtime, t).counter.w, 1)))) | 0);
                __deref_sh6840_apply_clock(runtime, t).state = ((__deref_sh6840_apply_clock(runtime, t).state) ^ (1));
                __deref_sh6840_apply_clock(runtime, t).clocks = __add_sh6840_apply_clock(runtime, __deref_sh6840_apply_clock(runtime, t).clocks, __deref_sh6840_apply_clock(runtime, t).state);
                __deref_sh6840_apply_clock(runtime, t).counter.w = __deref_sh6840_apply_clock(runtime, t).timer;
            }
            __deref_sh6840_apply_clock(runtime, t).counter.w = runtime.subtract(__deref_sh6840_apply_clock(runtime, t).counter.w, clocks);
        }
    }
    function __add_sh6840_apply_clock(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_sh6840_apply_clock(runtime, p) {
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
    function method_sh6840_update_noise(runtime, clocks) {
        const members = runtime.members;
        let newxor = ((0) >>> 0);
        let noise_clocks = ((0) | 0);
        for (let i = ((0) | 0); (((i) < (clocks)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            newxor = ((runtime.shiftRight((((members.m_sh6840_LFSR_3 ?? 0)) ^ ((members.m_sh6840_LFSR_2 ?? 0))), 31)) >>> 0);
            members.m_sh6840_LFSR_3 = ((((members.m_sh6840_LFSR_3) << (1))) >>> 0);
            members.m_sh6840_LFSR_3 = ((((members.m_sh6840_LFSR_3) | ((((members.m_sh6840_LFSR_2 ?? 0)) >>> (31))))) >>> 0);
            members.m_sh6840_LFSR_2 = ((((members.m_sh6840_LFSR_2) << (1))) >>> 0);
            members.m_sh6840_LFSR_2 = ((((members.m_sh6840_LFSR_2) | ((((members.m_sh6840_LFSR_1 ?? 0)) >>> (31))))) >>> 0);
            members.m_sh6840_LFSR_1 = ((((members.m_sh6840_LFSR_1) << (1))) >>> 0);
            members.m_sh6840_LFSR_1 = ((((members.m_sh6840_LFSR_1) | ((((members.m_sh6840_LFSR_0 ?? 0)) >>> (31))))) >>> 0);
            members.m_sh6840_LFSR_0 = ((((members.m_sh6840_LFSR_0) << (1))) >>> 0);
            members.m_sh6840_LFSR_0 = ((((members.m_sh6840_LFSR_0) | (((newxor) ^ ((members.m_sh6840_LFSR_oldxor ?? 0)))))) >>> 0);
            members.m_sh6840_LFSR_oldxor = ((newxor) & 0xff);
            if (((Number((((members.m_sh6840_LFSR_2 ?? 0)) & (3))) === Number(1)) ? 1 : 0)) {
                noise_clocks = ((((noise_clocks) + (1))) | 0);
            }
        }
        return ((noise_clocks) | 0);
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"], __L1 = __l["save_item"], __L2 = __l["m_pit.write_gate0"], __L3 = __l["m_pit.write_gate1"], __L4 = __l["m_pit.write_gate2"];
        runtime.invoke("exidy_sound_device::device_start");
        (__L1 ? __L1((__L0 ? __L0((members.m_pit_out ?? 0)) : runtime.macro("NAME", (members.m_pit_out ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_pit_out ?? 0)) : runtime.macro("NAME", (members.m_pit_out ?? 0)))));
        members.m_pit_out = ((0) & 0xff);
        (__L2 ? __L2(1) : ((members.m_pit)?.write_gate0?.(1) ?? 0));
        (__L3 ? __L3(1) : ((members.m_pit)?.write_gate1?.(1) ?? 0));
        (__L4 ? __L4(1) : ((members.m_pit)?.write_gate2?.(1) ?? 0));
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const h_m_sh6840_timer = members.m_sh6840_timer ?? 0;
        const h_m_sh6840_volume = members.m_sh6840_volume ?? 0;
        for (let __range0 = h_m_sh6840_timer, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            __range0_item.cr = 0;
            __range0_item.state = 0;
            __range0_item.leftovers = 0;
            __range0_item.timer = 0;
            __range0_item.clocks = 0;
            __range0_item.counter.w = 0;
        }
        members.m_sh6840_MSB_latch = ((0) & 0xff);
        members.m_sh6840_LSB_latch = ((0) & 0xff);
        h_m_sh6840_volume[0] = 0;
        h_m_sh6840_volume[1] = 0;
        h_m_sh6840_volume[2] = 0;
        members.m_sh6840_clock_count = ((0) >>> 0);
        members.m_sfxctrl = ((0) & 0xff);
        members.m_sh6840_LFSR_oldxor = ((0) & 0xff);
        members.m_sh6840_LFSR_0 = ((4294967295) >>> 0);
        members.m_sh6840_LFSR_1 = ((4294967295) >>> 0);
        members.m_sh6840_LFSR_2 = ((4294967295) >>> 0);
        members.m_sh6840_LFSR_3 = ((4294967295) >>> 0);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0;
        const h_m_sh6840_timer = members.m_sh6840_timer ?? 0;
        const h_m_sh6840_volume = members.m_sh6840_volume ?? 0;
        let sh6840_timer = h_m_sh6840_timer;
        let sh6840_timer$s = undefined, sh6840_timer$o = 0;
        if (ArrayBuffer.isView(sh6840_timer) || Array.isArray(sh6840_timer))
            sh6840_timer$s = sh6840_timer;
        else if (sh6840_timer !== null && typeof sh6840_timer === 'object' && sh6840_timer.generatedPointer === true && sh6840_timer.path === undefined && sh6840_timer.target === undefined && (ArrayBuffer.isView(sh6840_timer.source) || Array.isArray(sh6840_timer.source))) {
            sh6840_timer$s = sh6840_timer.source;
            sh6840_timer$o = sh6840_timer.offset;
        }
        let noisy = ((((Number((((((((sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (0)] ?? 0) : runtime.readIndex(sh6840_timer, 0)).cr) & ((sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (1)] ?? 0) : runtime.readIndex(sh6840_timer, 1)).cr))) & ((sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (2)] ?? 0) : runtime.readIndex(sh6840_timer, 2)).cr))) & (2))) === Number(0)) ? 1 : 0)) ? 1 : 0);
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            let t = 0;
            let __pointee_t = __deref_sound_stream_update(runtime, t);
            let clocks = ((0) | 0);
            let sample = ((0) | 0);
            members.m_sh6840_clock_count = ((((members.m_sh6840_clock_count) + ((members.m_sh6840_clocks_per_sample ?? 0)))) >>> 0);
            let clocks_this_sample = (((((members.m_sh6840_clock_count ?? 0)) >>> (24))) | 0);
            members.m_sh6840_clock_count = ((((members.m_sh6840_clock_count) & (16777215))) >>> 0);
            if (((Number((((sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (0)] ?? 0) : runtime.readIndex(sh6840_timer, 0)).cr) & (1))) === Number(0)) ? 1 : 0)) {
                let noise_clocks_this_sample = ((0) | 0);
                let chan0_clocks = ((0) >>> 0);
                if ((((noisy) && ((((((members.m_sfxctrl ?? 0)) & (1))) ? 0 : 1))) ? 1 : 0)) {
                    noise_clocks_this_sample = ((method_sh6840_update_noise(runtime, clocks_this_sample)) | 0);
                }
                t = __addr_sound_stream_update(runtime, sh6840_timer, 0);
                __pointee_t = __deref_sound_stream_update(runtime, t);
                chan0_clocks = ((__pointee_t.clocks) >>> 0);
                clocks = ((((((__pointee_t.cr) & (2))) ? (clocks_this_sample) : (noise_clocks_this_sample))) | 0);
                method_sh6840_apply_clock(runtime, t, clocks);
                if (((((((__pointee_t.state) && ((((((members.m_sfxctrl ?? 0)) & (2))) ? 0 : 1))) ? 1 : 0)) && (((__pointee_t.cr) & (128)))) ? 1 : 0)) {
                    sample = ((((sample) + (h_m_sh6840_volume[0]))) | 0);
                }
                if ((((noisy) && ((((members.m_sfxctrl ?? 0)) & (1)))) ? 1 : 0)) {
                    noise_clocks_this_sample = ((method_sh6840_update_noise(runtime, ((__pointee_t.clocks) - (chan0_clocks)))) | 0);
                }
                t = __addr_sound_stream_update(runtime, sh6840_timer, 1);
                __pointee_t = __deref_sound_stream_update(runtime, t);
                clocks = ((((((__pointee_t.cr) & (2))) ? (clocks_this_sample) : (noise_clocks_this_sample))) | 0);
                method_sh6840_apply_clock(runtime, t, clocks);
                if ((((__pointee_t.state) && (((__pointee_t.cr) & (128)))) ? 1 : 0)) {
                    sample = ((((sample) + (h_m_sh6840_volume[1]))) | 0);
                }
                t = __addr_sound_stream_update(runtime, sh6840_timer, 2);
                __pointee_t = __deref_sound_stream_update(runtime, t);
                clocks = ((((((__pointee_t.cr) & (2))) ? (clocks_this_sample) : (noise_clocks_this_sample))) | 0);
                if (((__pointee_t.cr) & (1))) {
                    clocks = ((((clocks) + (__pointee_t.leftovers))) | 0);
                    __pointee_t.leftovers = ((((clocks) % (8))) & 0xff);
                    clocks = ((((clocks) / (8))) | 0);
                }
                method_sh6840_apply_clock(runtime, t, clocks);
                if ((((__pointee_t.state) && (((__pointee_t.cr) & (128)))) ? 1 : 0)) {
                    sample = ((((sample) + (h_m_sh6840_volume[2]))) | 0);
                }
            }
            sample = ((((sample) + (method_generate_music_sample(runtime)))) | 0);
            (__deref_sound_stream_update(runtime, stream).put_int?.(0, sampindex, sample, 32768) ?? 0);
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
    function method_generate_music_sample(runtime) {
        const members = runtime.members;
        let sample = ((0) | 0);
        if (((((members.m_pit_out ?? 0)) >>> (0)) & 1)) {
            sample = ((((sample) + (5461.166666666667))) | 0);
        }
        if (((((members.m_pit_out ?? 0)) >>> (1)) & 1)) {
            sample = ((((sample) + (5461.166666666667))) | 0);
        }
        if (((((members.m_pit_out ?? 0)) >>> (2)) & 1)) {
            sample = ((((sample) + (5461.166666666667))) | 0);
        }
        return ((sample) | 0);
    }
    function method_sh6840_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0;
        const h_m_sh6840_timer = members.m_sh6840_timer ?? 0;
        (__t0 = __deref_sh6840_r(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        switch (offset) {
            case 0:
                {
                    return ((0) & 0xff);
                }
            case 1:
                {
                    0;
                    return ((0) & 0xff);
                }
            case 2:
            case 4:
            case 6:
                {
                    if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        members.m_sh6840_LSB_latch = ((h_m_sh6840_timer[((((offset) >>> (1))) - (1))].counter.b.l) & 0xff);
                    }
                    return ((h_m_sh6840_timer[((((offset) >>> (1))) - (1))].counter.b.h) & 0xff);
                }
            default:
                {
                    return (((members.m_sh6840_LSB_latch ?? 0)) & 0xff);
                }
        }
    }
    function __deref_sh6840_r(runtime, p) {
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
    function method_sh6840_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        let __t0;
        data = ((data) & 0xff);
        const h_m_sh6840_timer = members.m_sh6840_timer ?? 0;
        let sh6840_timer = h_m_sh6840_timer;
        let sh6840_timer$s = undefined, sh6840_timer$o = 0;
        if (ArrayBuffer.isView(sh6840_timer) || Array.isArray(sh6840_timer))
            sh6840_timer$s = sh6840_timer;
        else if (sh6840_timer !== null && typeof sh6840_timer === 'object' && sh6840_timer.generatedPointer === true && sh6840_timer.path === undefined && sh6840_timer.target === undefined && (ArrayBuffer.isView(sh6840_timer.source) || Array.isArray(sh6840_timer.source))) {
            sh6840_timer$s = sh6840_timer.source;
            sh6840_timer$o = sh6840_timer.offset;
        }
        (__t0 = __deref_sh6840_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        switch (offset) {
            case 0:
                {
                    if ((((sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (1)] ?? 0) : runtime.readIndex(sh6840_timer, 1)).cr) & (1))) {
                        (sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (0)] ?? 0) : runtime.readIndex(sh6840_timer, 0)).cr = data;
                    }
                    else {
                        (sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (2)] ?? 0) : runtime.readIndex(sh6840_timer, 2)).cr = data;
                    }
                    if (((Number(((((data) >>> (3))) & (5))) !== Number(0)) ? 1 : 0)) {
                        (__L0 ? __L0("exidy_sh6840_w - channel %d configured for mode %d\n", (((((sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (1)] ?? 0) : runtime.readIndex(sh6840_timer, 1)).cr) & (1))) ? (0) : (2)), ((((data) >>> (3))) & (7))) : runtime.macro("fatalerror", "exidy_sh6840_w - channel %d configured for mode %d\n", (((((sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (1)] ?? 0) : runtime.readIndex(sh6840_timer, 1)).cr) & (1))) ? (0) : (2)), ((((data) >>> (3))) & (7))));
                    }
                    break;
                }
            case 1:
                {
                    (sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (1)] ?? 0) : runtime.readIndex(sh6840_timer, 1)).cr = data;
                    if (((Number(((((data) >>> (3))) & (5))) !== Number(0)) ? 1 : 0)) {
                        (__L0 ? __L0("exidy_sh6840_w - channel 1 configured for mode %d\n", ((((data) >>> (3))) & (7))) : runtime.macro("fatalerror", "exidy_sh6840_w - channel 1 configured for mode %d\n", ((((data) >>> (3))) & (7))));
                    }
                    break;
                }
            case 2:
            case 4:
            case 6:
                {
                    members.m_sh6840_MSB_latch = ((data) & 0xff);
                    break;
                }
            case 3:
            case 5:
            case 7:
                {
                    let ch = ((runtime.divide(((offset) - (3)), 2)) | 0);
                    (sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (ch)] ?? 0) : runtime.readIndex(sh6840_timer, ch)).timer = (((((members.m_sh6840_MSB_latch ?? 0)) << (8))) | (((data) & (255))));
                    if ((((((sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (ch)] ?? 0) : runtime.readIndex(sh6840_timer, ch)).cr) & (16))) ? 0 : 1)) {
                        (sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (ch)] ?? 0) : runtime.readIndex(sh6840_timer, ch)).counter.w = (sh6840_timer$s !== undefined ? (sh6840_timer$s[sh6840_timer$o + (ch)] ?? 0) : runtime.readIndex(sh6840_timer, ch)).timer;
                    }
                    break;
                }
        }
    }
    function __deref_sh6840_w(runtime, p) {
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
    function method_sfxctrl_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        const h_m_sh6840_volume = members.m_sh6840_volume ?? 0;
        (__t0 = __deref_sfxctrl_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        switch (offset) {
            case 0:
                {
                    members.m_sfxctrl = ((data) & 0xff);
                    break;
                }
            case 1:
            case 2:
            case 3:
                {
                    h_m_sh6840_volume[((offset) - (1))] = runtime.divide(((((data) & (7))) * (5461.166666666667)), 7);
                    break;
                }
        }
    }
    function __deref_sfxctrl_w(runtime, p) {
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
    function method_exidy_sound_device__generate_music_sample(runtime) {
        const members = runtime.members;
        return ((0) | 0);
    }
    function method_sh8253_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pit.write"];
        let __t0;
        data = ((data) & 0xff);
        (__t0 = __deref_sh8253_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        (__L0 ? __L0(offset, data) : ((members.m_pit)?.write?.(offset, data) ?? 0));
    }
    function __deref_sh8253_w(runtime, p) {
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
    function method_pit_out_0(runtime, state) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_pit_out_0(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        if (state) {
            members.m_pit_out = ((((members.m_pit_out) | (((((1) & 0xff)) << (0))))) & 0xff);
        }
        else {
            members.m_pit_out = ((((members.m_pit_out) & ((~((((1) & 0xff)) << (0)))))) & 0xff);
        }
    }
    function __deref_pit_out_0(runtime, p) {
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
    function method_pit_out_1(runtime, state) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_pit_out_1(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        if (state) {
            members.m_pit_out = ((((members.m_pit_out) | (((((1) & 0xff)) << (1))))) & 0xff);
        }
        else {
            members.m_pit_out = ((((members.m_pit_out) & ((~((((1) & 0xff)) << (1)))))) & 0xff);
        }
    }
    function __deref_pit_out_1(runtime, p) {
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
    function method_pit_out_2(runtime, state) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_pit_out_2(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        if (state) {
            members.m_pit_out = ((((members.m_pit_out) | (((((1) & 0xff)) << (2))))) & 0xff);
        }
        else {
            members.m_pit_out = ((((members.m_pit_out) & ((~((((1) & 0xff)) << (2)))))) & 0xff);
        }
    }
    function __deref_pit_out_2(runtime, p) {
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
    function method_filter_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        0;
    }
    function method_pa_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pa_callback(runtime, members.m_pa_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_pa_callback, "bind"));
    }
    function __deref_pa_callback(runtime, p) {
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
    function method_pb_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pb_callback(runtime, members.m_pb_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_pb_callback, "bind"));
    }
    function __deref_pb_callback(runtime, p) {
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
    function method_ca2_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ca2_callback(runtime, members.m_ca2_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_ca2_callback, "bind"));
    }
    function __deref_ca2_callback(runtime, p) {
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
    function method_cb2_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cb2_callback(runtime, members.m_cb2_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_cb2_callback, "bind"));
    }
    function __deref_cb2_callback(runtime, p) {
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
    function method_pa_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pia.porta_w"];
        data = ((data) & 0xff);
        (__L0 ? __L0(data) : ((members.m_pia)?.porta_w?.(data) ?? 0));
    }
    function method_pb_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pia.portb_w"];
        data = ((data) & 0xff);
        (__L0 ? __L0(data) : ((members.m_pia)?.portb_w?.(data) ?? 0));
    }
    function method_ca_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pia.ca1_w"];
        (__L0 ? __L0(state) : ((members.m_pia)?.ca1_w?.(state) ?? 0));
    }
    function method_cb_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pia.cb1_w"];
        (__L0 ? __L0(state) : ((members.m_pia)?.cb1_w?.(state) ?? 0));
    }
    function method_pia_pa_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pa_callback"];
        data = ((data) & 0xff);
        (__L0 ? __L0(Number(data)) : typeof members.m_pa_callback === 'function' ? members.m_pa_callback(data) : runtime.invoke("m_pa_callback", data));
    }
    function method_pia_pb_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pb_callback"];
        data = ((data) & 0xff);
        (__L0 ? __L0(Number(data)) : typeof members.m_pb_callback === 'function' ? members.m_pb_callback(data) : runtime.invoke("m_pb_callback", data));
    }
    function method_pia_ca2_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_ca2_callback"];
        (__L0 ? __L0(Number(state)) : typeof members.m_ca2_callback === 'function' ? members.m_ca2_callback(state) : runtime.invoke("m_ca2_callback", state));
    }
    function method_pia_cb2_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cb2_callback"];
        (__L0 ? __L0(Number(state)) : typeof members.m_cb2_callback === 'function' ? members.m_cb2_callback(state) : runtime.invoke("m_cb2_callback", state));
    }
    function method_venture_sound_device__pa_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_venture_sound_device__pa_callback(runtime, members.m_pa_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_pa_callback, "bind"));
    }
    function __deref_venture_sound_device__pa_callback(runtime, p) {
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
    function method_venture_sound_device__pb_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_venture_sound_device__pb_callback(runtime, members.m_pb_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_pb_callback, "bind"));
    }
    function __deref_venture_sound_device__pb_callback(runtime, p) {
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
    function method_venture_sound_device__ca2_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_venture_sound_device__ca2_callback(runtime, members.m_ca2_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_ca2_callback, "bind"));
    }
    function __deref_venture_sound_device__ca2_callback(runtime, p) {
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
    function method_venture_sound_device__cb2_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_venture_sound_device__cb2_callback(runtime, members.m_cb2_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_cb2_callback, "bind"));
    }
    function __deref_venture_sound_device__cb2_callback(runtime, p) {
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
    function method_venture_sound_device__pa_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pia.porta_w"];
        data = ((data) & 0xff);
        (__L0 ? __L0(data) : ((members.m_pia)?.porta_w?.(data) ?? 0));
    }
    function method_venture_sound_device__pb_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pia.portb_w"];
        data = ((data) & 0xff);
        (__L0 ? __L0(data) : ((members.m_pia)?.portb_w?.(data) ?? 0));
    }
    function method_venture_sound_device__ca_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pia.ca1_w"];
        (__L0 ? __L0(state) : ((members.m_pia)?.ca1_w?.(state) ?? 0));
    }
    function method_venture_sound_device__cb_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pia.cb1_w"];
        (__L0 ? __L0(state) : ((members.m_pia)?.cb1_w?.(state) ?? 0));
    }
    function method_venture_sound_device__pia_pa_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pa_callback"];
        data = ((data) & 0xff);
        (__L0 ? __L0(Number(data)) : typeof members.m_pa_callback === 'function' ? members.m_pa_callback(data) : runtime.invoke("m_pa_callback", data));
    }
    function method_venture_sound_device__pia_pb_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pb_callback"];
        data = ((data) & 0xff);
        (__L0 ? __L0(Number(data)) : typeof members.m_pb_callback === 'function' ? members.m_pb_callback(data) : runtime.invoke("m_pb_callback", data));
    }
    function method_venture_sound_device__pia_ca2_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_ca2_callback"];
        (__L0 ? __L0(Number(state)) : typeof members.m_ca2_callback === 'function' ? members.m_ca2_callback(state) : runtime.invoke("m_ca2_callback", state));
    }
    function method_venture_sound_device__pia_cb2_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cb2_callback"];
        (__L0 ? __L0(Number(state)) : typeof members.m_cb2_callback === 'function' ? members.m_cb2_callback(state) : runtime.invoke("m_cb2_callback", state));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "sh6840_apply_clock": method_sh6840_apply_clock,
        "sh6840_update_noise": method_sh6840_update_noise,
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "sound_stream_update": method_sound_stream_update,
        "generate_music_sample": method_generate_music_sample,
        "sh6840_r": method_sh6840_r,
        "sh6840_w": method_sh6840_w,
        "sfxctrl_w": method_sfxctrl_w,
        "exidy_sound_device::generate_music_sample": method_exidy_sound_device__generate_music_sample,
        "sh8253_w": method_sh8253_w,
        "pit_out_0": method_pit_out_0,
        "pit_out_1": method_pit_out_1,
        "pit_out_2": method_pit_out_2,
        "filter_w": method_filter_w,
        "pa_callback": method_pa_callback,
        "pb_callback": method_pb_callback,
        "ca2_callback": method_ca2_callback,
        "cb2_callback": method_cb2_callback,
        "pa_w": method_pa_w,
        "pb_w": method_pb_w,
        "ca_w": method_ca_w,
        "cb_w": method_cb_w,
        "pia_pa_w": method_pia_pa_w,
        "pia_pb_w": method_pia_pb_w,
        "pia_ca2_w": method_pia_ca2_w,
        "pia_cb2_w": method_pia_cb2_w,
        "venture_sound_device::pa_callback": method_venture_sound_device__pa_callback,
        "venture_sound_device::pb_callback": method_venture_sound_device__pb_callback,
        "venture_sound_device::ca2_callback": method_venture_sound_device__ca2_callback,
        "venture_sound_device::cb2_callback": method_venture_sound_device__cb2_callback,
        "venture_sound_device::pa_w": method_venture_sound_device__pa_w,
        "venture_sound_device::pb_w": method_venture_sound_device__pb_w,
        "venture_sound_device::ca_w": method_venture_sound_device__ca_w,
        "venture_sound_device::cb_w": method_venture_sound_device__cb_w,
        "venture_sound_device::pia_pa_w": method_venture_sound_device__pia_pa_w,
        "venture_sound_device::pia_pb_w": method_venture_sound_device__pia_pb_w,
        "venture_sound_device::pia_ca2_w": method_venture_sound_device__pia_ca2_w,
        "venture_sound_device::pia_cb2_w": method_venture_sound_device__pia_cb2_w
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "fatalerror", "m_ca2_callback", "m_cb2_callback", "m_pa_callback", "m_pb_callback", "m_pia.ca1_w", "m_pia.cb1_w", "m_pia.porta_w", "m_pia.portb_w", "m_pit.write", "m_pit.write_gate0", "m_pit.write_gate1", "m_pit.write_gate2", "machine", "machine().side_effects_disabled", "save_item"];
export const device = definition;
export default device;
