import deviceData from './upd7759.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [0, 0, 1, 2, 3, 5, 7, 10, 0, 0, -1, -2, -3, -5, -7, -10, 0, 1, 2, 3, 4, 6, 8, 13, 0, -1, -2, -3, -4, -6, -8, -13, 0, 1, 2, 4, 5, 7, 10, 15, 0, -1, -2, -4, -5, -7, -10, -15, 0, 1, 3, 4, 6, 9, 13, 19, 0, -1, -3, -4, -6, -9, -13, -19, 0, 2, 3, 5, 8, 11, 15, 23, 0, -2, -3, -5, -8, -11, -15, -23, 0, 2, 4, 7, 10, 14, 19, 29, 0, -2, -4, -7, -10, -14, -19, -29, 0, 3, 5, 8, 12, 16, 22, 33, 0, -3, -5, -8, -12, -16, -22, -33, 1, 4, 7, 10, 15, 20, 29, 43, -1, -4, -7, -10, -15, -20, -29, -43, 1, 4, 8, 13, 18, 25, 35, 53, -1, -4, -8, -13, -18, -25, -35, -53, 1, 6, 10, 16, 22, 31, 43, 64, -1, -6, -10, -16, -22, -31, -43, -64, 2, 7, 12, 19, 27, 37, 51, 76, -2, -7, -12, -19, -27, -37, -51, -76, 2, 9, 16, 24, 34, 46, 64, 96, -2, -9, -16, -24, -34, -46, -64, -96, 3, 11, 19, 29, 41, 57, 79, 117, -3, -11, -19, -29, -41, -57, -79, -117, 4, 13, 24, 36, 50, 69, 96, 143, -4, -13, -24, -36, -50, -69, -96, -143, 4, 16, 29, 44, 62, 85, 118, 175, -4, -16, -29, -44, -62, -85, -118, -175, 6, 20, 36, 54, 76, 104, 144, 214, -6, -20, -36, -54, -76, -104, -144, -214];
    const __mame_table_1 = [-1, -1, 0, 0, 1, 2, 2, 3, -1, -1, 0, 0, 1, 2, 2, 3];
    function method_reset_w(runtime, state) {
        const members = runtime.members;
        runtime.synchronize("internal_reset_w", state);
    }
    function method_start_w(runtime, state) {
        const members = runtime.members;
        runtime.synchronize("internal_start_w", state);
    }
    function method_internal_start_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_internal_start_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        let oldstart = (((members.m_start ?? 0)) & 0xff);
        members.m_start = (((((state) !== (0)) ? 1 : 0)) & 0xff);
        0;
        if (((((((((((((((Number((members.m_state ?? 0)) === Number(0)) ? 1 : 0)) && (((Number((members.m_mode ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) && (oldstart)) ? 1 : 0)) && ((((members.m_start ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((members.m_reset ?? 0))) ? 1 : 0)) {
            members.m_state = ((2) << 24 >> 24);
        }
    }
    function __deref_internal_start_w(runtime, p) {
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
    function method_port_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("internal_port_w", data);
    }
    function method_busy_r(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_busy_r(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        return ((((Number((members.m_state ?? 0)) === Number(0)) ? 1 : 0)) | 0);
    }
    function __deref_busy_r(runtime, p) {
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
        let sample_scale = ((128) / (32768));
        let sample = (((members.m_sample ?? 0)) * (sample_scale));
        let clocks_left = (((members.m_clocks_left ?? 0)) | 0);
        let step = (((members.m_step ?? 0)) >>> 0);
        let pos = (((members.m_pos ?? 0)) >>> 0);
        let index = ((0) >>> 0);
        if (((Number((members.m_state ?? 0)) !== Number(0)) ? 1 : 0)) {
            for (; ((Number(index) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                (__deref_sound_stream_update(runtime, stream).put?.(0, index, sample) ?? 0);
                pos = ((((pos) + (step))) >>> 0);
                while ((((((Number((members.m_mode ?? 0)) === Number(1)) ? 1 : 0)) && (((Number(pos) >= Number(1048576)) ? 1 : 0))) ? 1 : 0)) {
                    let clocks_this_time = ((((pos) >>> (20))) | 0);
                    if ((((clocks_this_time) > (clocks_left)) ? 1 : 0)) {
                        clocks_this_time = ((clocks_left) | 0);
                    }
                    pos = ((((pos) - (((clocks_this_time) * (1048576))))) >>> 0);
                    clocks_left = ((((clocks_left) - (clocks_this_time))) | 0);
                    if ((((clocks_left) === (0)) ? 1 : 0)) {
                        method_advance_state(runtime);
                        if (((Number((members.m_state ?? 0)) === Number(0)) ? 1 : 0)) {
                            break;
                        }
                        clocks_left = (((members.m_clocks_left ?? 0)) | 0);
                        sample = (((members.m_sample ?? 0)) * (sample_scale));
                    }
                }
            }
        }
        for (; ((Number(index) < Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
            (__deref_sound_stream_update(runtime, stream).put?.(0, index, 0) ?? 0);
        }
        members.m_clocks_left = ((clocks_left) | 0);
        members.m_pos = ((pos) >>> 0);
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
    function method_advance_state(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["read_byte"];
        let __t0, __t1, __t2;
        switch ((members.m_state ?? 0)) {
            case 0:
                {
                    members.m_clocks_left = ((4) | 0);
                    break;
                }
            case 1:
                {
                    members.m_drq = ((0) & 0xff);
                    members.m_clocks_left = (((members.m_post_drq_clocks ?? 0)) | 0);
                    members.m_state = (((members.m_post_drq_state ?? 0)) << 24 >> 24);
                    break;
                }
            case 2:
                {
                    members.m_req_sample = ((((((Number((members.m_mode ?? 0)) === Number(1)) ? 1 : 0)) ? ((members.m_fifo_in ?? 0)) : (16))) & 0xff);
                    0;
                    members.m_clocks_left = ((((70) + ((members.m_start_delay ?? 0)))) | 0);
                    members.m_state = ((3) << 24 >> 24);
                    break;
                }
            case 3:
                {
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((44) | 0);
                    members.m_state = ((4) << 24 >> 24);
                    break;
                }
            case 4:
                {
                    members.m_last_sample = ((((((Number((members.m_mode ?? 0)) === Number(1)) ? 1 : 0)) ? ((__L0 ? __L0(0) : runtime.macro("read_byte", 0))) : ((members.m_fifo_in ?? 0)))) & 0xff);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((28) | 0);
                    members.m_state = ((((((((members.m_req_sample ?? 0)) > ((members.m_last_sample ?? 0))) ? 1 : 0)) ? (0) : (5))) << 24 >> 24);
                    break;
                }
            case 5:
                {
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((32) | 0);
                    members.m_state = ((6) << 24 >> 24);
                    break;
                }
            case 6:
                {
                    members.m_offset = ((((((((Number((members.m_mode ?? 0)) === Number(1)) ? 1 : 0)) ? ((__L0 ? __L0(__add_advance_state(runtime, (((members.m_req_sample ?? 0)) * (2)), 5)) : runtime.macro("read_byte", __add_advance_state(runtime, (((members.m_req_sample ?? 0)) * (2)), 5)))) : ((members.m_fifo_in ?? 0)))) << (((8) + ((members.m_sample_offset_shift ?? 0)))))) >>> 0);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((44) | 0);
                    members.m_state = ((7) << 24 >> 24);
                    break;
                }
            case 7:
                {
                    members.m_offset = ((((members.m_offset) | (((((((Number((members.m_mode ?? 0)) === Number(1)) ? 1 : 0)) ? ((__L0 ? __L0(__add_advance_state(runtime, (((members.m_req_sample ?? 0)) * (2)), 6)) : runtime.macro("read_byte", __add_advance_state(runtime, (((members.m_req_sample ?? 0)) * (2)), 6)))) : ((members.m_fifo_in ?? 0)))) << ((members.m_sample_offset_shift ?? 0)))))) >>> 0);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((36) | 0);
                    members.m_state = ((8) << 24 >> 24);
                    break;
                }
            case 8:
                {
                    members.m_offset = ((((members.m_offset) + (1))) >>> 0);
                    members.m_first_valid_header = ((0) & 0xff);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((36) | 0);
                    members.m_state = ((9) << 24 >> 24);
                    break;
                }
            case 9:
                {
                    if ((members.m_repeat_count ?? 0)) {
                        members.m_repeat_count = ((((members.m_repeat_count) - (1))) & 0xff);
                        members.m_offset = (((members.m_repeat_offset ?? 0)) >>> 0);
                    }
                    members.m_block_header = ((((((Number((members.m_mode ?? 0)) === Number(1)) ? 1 : 0)) ? ((__L0 ? __L0((__t0 = (members.m_offset ?? 0), members.m_offset = ((((members.m_offset) + (1))) >>> 0), __t0)) : runtime.macro("read_byte", (__t0 = (members.m_offset ?? 0), members.m_offset = ((((members.m_offset) + (1))) >>> 0), __t0)))) : ((members.m_fifo_in ?? 0)))) & 0xff);
                    0;
                    members.m_drq = ((1) & 0xff);
                    switch ((((members.m_block_header ?? 0)) & (192))) {
                        case 0:
                            {
                                members.m_clocks_left = ((((1024) * (__add_advance_state(runtime, (((members.m_block_header ?? 0)) & (63)), 1)))) | 0);
                                members.m_state = (((((((((((members.m_block_header ?? 0)) === (0)) ? 1 : 0)) && ((members.m_first_valid_header ?? 0))) ? 1 : 0)) ? (0) : (9))) << 24 >> 24);
                                members.m_sample = ((0) << 16 >> 16);
                                members.m_adpcm_state = ((0) << 24 >> 24);
                                break;
                            }
                        case 64:
                            {
                                members.m_sample_rate = ((__add_advance_state(runtime, (((members.m_block_header ?? 0)) & (63)), 1)) & 0xff);
                                members.m_nibbles_left = ((256) & 0xffff);
                                members.m_clocks_left = ((36) | 0);
                                members.m_state = ((11) << 24 >> 24);
                                break;
                            }
                        case 128:
                            {
                                members.m_sample_rate = ((__add_advance_state(runtime, (((members.m_block_header ?? 0)) & (63)), 1)) & 0xff);
                                members.m_clocks_left = ((36) | 0);
                                members.m_state = ((10) << 24 >> 24);
                                break;
                            }
                        case 192:
                            {
                                members.m_repeat_count = ((__add_advance_state(runtime, (((members.m_block_header ?? 0)) & (7)), 1)) & 0xff);
                                members.m_repeat_offset = (((members.m_offset ?? 0)) >>> 0);
                                members.m_clocks_left = ((36) | 0);
                                members.m_state = ((9) << 24 >> 24);
                                break;
                            }
                    }
                    if (((((members.m_block_header ?? 0)) !== (0)) ? 1 : 0)) {
                        members.m_first_valid_header = ((1) & 0xff);
                    }
                    break;
                }
            case 10:
                {
                    members.m_nibbles_left = ((__add_advance_state(runtime, ((((Number((members.m_mode ?? 0)) === Number(1)) ? 1 : 0)) ? ((__L0 ? __L0((__t1 = (members.m_offset ?? 0), members.m_offset = ((((members.m_offset) + (1))) >>> 0), __t1)) : runtime.macro("read_byte", (__t1 = (members.m_offset ?? 0), members.m_offset = ((((members.m_offset) + (1))) >>> 0), __t1)))) : ((members.m_fifo_in ?? 0))), 1)) & 0xffff);
                    0;
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = ((36) | 0);
                    members.m_state = ((11) << 24 >> 24);
                    break;
                }
            case 11:
                {
                    members.m_adpcm_data = ((((((Number((members.m_mode ?? 0)) === Number(1)) ? 1 : 0)) ? ((__L0 ? __L0((__t2 = (members.m_offset ?? 0), members.m_offset = ((((members.m_offset) + (1))) >>> 0), __t2)) : runtime.macro("read_byte", (__t2 = (members.m_offset ?? 0), members.m_offset = ((((members.m_offset) + (1))) >>> 0), __t2)))) : ((members.m_fifo_in ?? 0)))) & 0xff);
                    method_update_adpcm(runtime, (((members.m_adpcm_data ?? 0)) >>> (4)));
                    members.m_drq = ((1) & 0xff);
                    members.m_clocks_left = (((((members.m_sample_rate ?? 0)) * (4))) | 0);
                    if (((Number((members.m_nibbles_left = ((((members.m_nibbles_left) - (1))) & 0xffff))) === Number(0)) ? 1 : 0)) {
                        members.m_state = ((9) << 24 >> 24);
                    }
                    else {
                        members.m_state = ((12) << 24 >> 24);
                    }
                    break;
                }
            case 12:
                {
                    method_update_adpcm(runtime, (((members.m_adpcm_data ?? 0)) & (15)));
                    members.m_clocks_left = (((((members.m_sample_rate ?? 0)) * (4))) | 0);
                    if (((Number((members.m_nibbles_left = ((((members.m_nibbles_left) - (1))) & 0xffff))) === Number(0)) ? 1 : 0)) {
                        members.m_state = ((9) << 24 >> 24);
                    }
                    else {
                        members.m_state = ((11) << 24 >> 24);
                    }
                    break;
                }
        }
        if ((members.m_drq ?? 0)) {
            members.m_post_drq_state = (((members.m_state ?? 0)) << 24 >> 24);
            members.m_post_drq_clocks = (((((members.m_clocks_left ?? 0)) - (21))) | 0);
            members.m_state = ((1) << 24 >> 24);
            members.m_clocks_left = ((21) | 0);
        }
    }
    function __add_advance_state(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_update_adpcm(runtime, data) {
        const members = runtime.members;
        members.m_sample = ((((members.m_sample) + ((__mame_table_0[((((((((members.m_adpcm_state ?? 0)) * (16))) + (data))) % 256) + 256) % 256] ?? 0)))) << 16 >> 16);
        members.m_adpcm_state = ((((members.m_adpcm_state) + ((__mame_table_1[((data) & 15)] ?? 0)))) << 24 >> 24);
        if (((((members.m_adpcm_state ?? 0)) < (0)) ? 1 : 0)) {
            members.m_adpcm_state = ((0) << 24 >> 24);
        }
        else {
            if (((((members.m_adpcm_state ?? 0)) > (15)) ? 1 : 0)) {
                members.m_adpcm_state = ((15) << 24 >> 24);
            }
        }
    }
    function method_internal_reset_w(runtime, param) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_internal_reset_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        let oldreset = (((members.m_reset ?? 0)) & 0xff);
        members.m_reset = (((((param) !== (0)) ? 1 : 0)) & 0xff);
        if ((((oldreset) && ((((members.m_reset ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            method_device_reset(runtime);
        }
    }
    function __deref_internal_reset_w(runtime, p) {
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
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_drqcallback"];
        method_upd775x_device__device_reset(runtime);
        (__deref_device_reset(runtime, members.m_timer).adjust?.(Infinity) ?? 0);
        if ((members.m_drq ?? 0)) {
            members.m_drq = ((0) & 0xff);
            (__L0 ? __L0(Number((members.m_drq ?? 0))) : typeof members.m_drqcallback === 'function' ? members.m_drqcallback((members.m_drq ?? 0)) : runtime.invoke("m_drqcallback", (members.m_drq ?? 0)));
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
    function method_upd775x_device__device_reset(runtime) {
        const members = runtime.members;
        members.m_pos = ((0) >>> 0);
        members.m_state = ((0) << 24 >> 24);
        members.m_clocks_left = ((0) | 0);
        members.m_nibbles_left = ((0) & 0xffff);
        members.m_repeat_count = ((0) & 0xff);
        members.m_post_drq_state = ((0) << 24 >> 24);
        members.m_post_drq_clocks = ((0) | 0);
        members.m_req_sample = ((0) & 0xff);
        members.m_last_sample = ((0) & 0xff);
        members.m_block_header = ((0) & 0xff);
        members.m_sample_rate = ((0) & 0xff);
        members.m_first_valid_header = ((0) & 0xff);
        members.m_offset = ((0) >>> 0);
        members.m_repeat_offset = ((0) >>> 0);
        members.m_adpcm_state = ((0) << 24 >> 24);
        members.m_adpcm_data = ((0) & 0xff);
        members.m_sample = ((0) << 16 >> 16);
        members.m_mode = ((1) | 0);
    }
    function method_internal_port_w(runtime, param) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_internal_port_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        members.m_fifo_in = ((param) & 0xff);
    }
    function __deref_internal_port_w(runtime, p) {
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
    function method_set_start_delay(runtime, data) {
        const members = runtime.members;
        members.m_start_delay = ((data) >>> 0);
    }
    function method_upd775x_device__set_start_delay(runtime, data) {
        const members = runtime.members;
        members.m_start_delay = ((data) >>> 0);
    }
    function method_md_w(runtime, state) {
        const members = runtime.members;
        runtime.synchronize("internal_md_w", state);
    }
    function method_drq_update(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_drqcallback"];
        let __t0;
        (__t0 = __deref_drq_update(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        let olddrq = (((members.m_drq ?? 0)) & 0xff);
        let old_state = (((members.m_state ?? 0)) | 0);
        method_advance_state(runtime);
        0;
        if ((((olddrq) !== ((members.m_drq ?? 0))) ? 1 : 0)) {
            0;
            (__L0 ? __L0(Number((members.m_drq ?? 0))) : typeof members.m_drqcallback === 'function' ? members.m_drqcallback((members.m_drq ?? 0)) : runtime.invoke("m_drqcallback", (members.m_drq ?? 0)));
        }
        if ((((((Number((members.m_state ?? 0)) !== Number(0)) ? 1 : 0)) || (((Number(old_state) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
            (__deref_drq_update(runtime, members.m_timer).adjust?.((((members.m_clock_period ?? 0)) * ((members.m_clocks_left ?? 0)))) ?? 0);
        }
    }
    function __deref_drq_update(runtime, p) {
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
    function method_internal_md_w(runtime, param) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_internal_md_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        let old_md = (((members.m_md ?? 0)) & 0xff);
        members.m_md = (((((param) !== (0)) ? 1 : 0)) | 0);
        0;
        if ((((((Number((members.m_state ?? 0)) === Number(0)) ? 1 : 0)) && ((members.m_reset ?? 0))) ? 1 : 0)) {
            if ((((old_md) && ((((members.m_md ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                members.m_mode = ((0) | 0);
                members.m_state = ((2) << 24 >> 24);
                (__deref_internal_md_w(runtime, members.m_timer).adjust?.(0) ?? 0);
            }
            else {
                if ((((((old_md) ? 0 : 1)) && ((members.m_md ?? 0))) ? 1 : 0)) {
                    members.m_mode = ((1) | 0);
                }
            }
        }
    }
    function __deref_internal_md_w(runtime, p) {
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
    function method_drq(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_drq(runtime, members.m_drqcallback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_drqcallback, "bind"));
    }
    function __deref_drq(runtime, p) {
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
    function method_upd7759_device__drq(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_upd7759_device__drq(runtime, members.m_drqcallback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_drqcallback, "bind"));
    }
    function __deref_upd7759_device__drq(runtime, p) {
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
        "reset_w": method_reset_w,
        "start_w": method_start_w,
        "internal_start_w": method_internal_start_w,
        "port_w": method_port_w,
        "busy_r": method_busy_r,
        "sound_stream_update": method_sound_stream_update,
        "advance_state": method_advance_state,
        "update_adpcm": method_update_adpcm,
        "internal_reset_w": method_internal_reset_w,
        "device_reset": method_device_reset,
        "upd775x_device::device_reset": method_upd775x_device__device_reset,
        "internal_port_w": method_internal_port_w,
        "set_start_delay": method_set_start_delay,
        "upd775x_device::set_start_delay": method_upd775x_device__set_start_delay,
        "md_w": method_md_w,
        "drq_update": method_drq_update,
        "internal_md_w": method_internal_md_w,
        "drq": method_drq,
        "upd7759_device::drq": method_upd7759_device__drq
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_drqcallback", "read_byte"];
export const device = definition;
export default device;
