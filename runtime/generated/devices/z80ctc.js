import deviceData from './z80ctc.device.ir.json' with { type: 'json' };
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
    function method_read(runtime, offset) {
        const members = runtime.members;
        let __t0;
        const h_m_channel = members.m_channel ?? 0;
        return (((__t0 = __deref_read(runtime, h_m_channel[((offset) & (3))]), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(h_m_channel[((offset) & (3))], "read"))) & 0xff);
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
        data = ((data) & 0xff);
        const h_m_channel = members.m_channel ?? 0;
        (__deref_write(runtime, h_m_channel[((offset) & (3))]).write?.(data) ?? 0);
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
    function method_trg0(runtime, state) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        (__deref_trg0(runtime, h_m_channel[0]).trigger?.((((state) !== (0)) ? 1 : 0)) ?? 0);
    }
    function __deref_trg0(runtime, p) {
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
    function method_trg1(runtime, state) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        (__deref_trg1(runtime, h_m_channel[1]).trigger?.((((state) !== (0)) ? 1 : 0)) ?? 0);
    }
    function __deref_trg1(runtime, p) {
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
    function method_trg2(runtime, state) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        (__deref_trg2(runtime, h_m_channel[2]).trigger?.((((state) !== (0)) ? 1 : 0)) ?? 0);
    }
    function __deref_trg2(runtime, p) {
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
    function method_trg3(runtime, state) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        (__deref_trg3(runtime, h_m_channel[3]).trigger?.((((state) !== (0)) ? 1 : 0)) ?? 0);
    }
    function __deref_trg3(runtime, p) {
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
    function method_intr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_intr_callback(runtime, members.m_intr_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_intr_cb, "bind"));
    }
    function __deref_intr_callback(runtime, p) {
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
    function method_zc_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_zc_callback_0(runtime, (members.m_zc_cb ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_zc_cb ?? 0)[0], "bind"));
    }
    function __deref_zc_callback_0(runtime, p) {
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
    function method_get_channel_constant(runtime, ch) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return ((h_m_channel[ch].m_tconst) & 0xffff);
    }
    function method_channel_int_state(runtime, ch) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return ((h_m_channel[ch].m_int_state) & 0xff);
    }
    function method_channel_mode(runtime, ch) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return ((h_m_channel[ch].m_mode) & 0xff);
    }
    function method_channel_config(runtime, ch) {
        const members = runtime.members;
        let __t0;
        const h_m_channel = members.m_channel ?? 0;
        return __deref_channel_config(runtime, (__t0 = __deref_channel_config(runtime, h_m_channel[ch]), typeof __t0.lookup === 'function' ? (__t0.lookup() ?? 0) : runtime.container(h_m_channel[ch], "lookup")));
    }
    function __deref_channel_config(runtime, p) {
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
    function method_z80ctc_device__intr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80ctc_device__intr_callback(runtime, members.m_intr_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_intr_cb, "bind"));
    }
    function __deref_z80ctc_device__intr_callback(runtime, p) {
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
    function method_z80ctc_device__zc_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80ctc_device__zc_callback_0(runtime, (members.m_zc_cb ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_zc_cb ?? 0)[0], "bind"));
    }
    function __deref_z80ctc_device__zc_callback_0(runtime, p) {
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
    function method_z80ctc_device__get_channel_constant(runtime, ch) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return ((h_m_channel[ch].m_tconst) & 0xffff);
    }
    function method_z80ctc_device__channel_int_state(runtime, ch) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return ((h_m_channel[ch].m_int_state) & 0xff);
    }
    function method_z80ctc_device__channel_mode(runtime, ch) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return ((h_m_channel[ch].m_mode) & 0xff);
    }
    function method_z80ctc_device__channel_config(runtime, ch) {
        const members = runtime.members;
        let __t0;
        const h_m_channel = members.m_channel ?? 0;
        return __deref_z80ctc_device__channel_config(runtime, (__t0 = __deref_z80ctc_device__channel_config(runtime, h_m_channel[ch]), typeof __t0.lookup === 'function' ? (__t0.lookup() ?? 0) : runtime.container(h_m_channel[ch], "lookup")));
    }
    function __deref_z80ctc_device__channel_config(runtime, p) {
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
        "read": method_read,
        "write": method_write,
        "trg0": method_trg0,
        "trg1": method_trg1,
        "trg2": method_trg2,
        "trg3": method_trg3,
        "intr_callback": method_intr_callback,
        "zc_callback_0": method_zc_callback_0,
        "get_channel_constant": method_get_channel_constant,
        "channel_int_state": method_channel_int_state,
        "channel_mode": method_channel_mode,
        "channel_config": method_channel_config,
        "z80ctc_device::intr_callback": method_z80ctc_device__intr_callback,
        "z80ctc_device::zc_callback_0": method_z80ctc_device__zc_callback_0,
        "z80ctc_device::get_channel_constant": method_z80ctc_device__get_channel_constant,
        "z80ctc_device::channel_int_state": method_z80ctc_device__channel_int_state,
        "z80ctc_device::channel_mode": method_z80ctc_device__channel_mode,
        "z80ctc_device::channel_config": method_z80ctc_device__channel_config
    };
    return __methodTable;
})();
definition.children[0].definition.compiledMethods = (() => {
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
    function method_timer_callback(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_device.interrupt_check"], __L1 = __l["m_device.clocks_to_attotime"];
        const h_m_device = members.m_device ?? 0;
        const h_m_index = members.m_index ?? 0;
        if ((((members.m_mode ?? 0)) & (256))) {
            let curperiod = method_period(runtime);
            0;
            (__deref_timer_callback(runtime, members.m_timer).adjust?.(curperiod, 0, curperiod) ?? 0);
            members.m_mode = ((((members.m_mode) & (-257))) & 0xffff);
            return;
        }
        if (((Number((((members.m_mode ?? 0)) & (128))) === Number(128)) ? 1 : 0)) {
            members.m_int_state = ((((members.m_int_state) | (1))) & 0xff);
            0;
            (__L0 ? __L0() : ((members.m_device)?.interrupt_check?.() ?? 0));
        }
        runtime.readIndex(h_m_device.m_zc_cb, h_m_index)(1);
        (__deref_timer_callback(runtime, members.m_zc_to_timer).adjust?.((__L1 ? __L1(1) : ((members.m_device)?.clocks_to_attotime?.(1) ?? 0))) ?? 0);
        members.m_down = (((members.m_tconst ?? 0)) & 0xffff);
    }
    function __deref_timer_callback(runtime, p) {
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
    function method_period(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clocks_to_attotime"], __L1 = __l["m_device.clocks_to_attotime"];
        if (((Number((((members.m_mode ?? 0)) & (2))) === Number(2)) ? 1 : 0)) {
            return Infinity;
        }
        if (((Number((((members.m_mode ?? 0)) & (64))) === Number(64)) ? 1 : 0)) {
            return (__L0 ? __L0((members.m_tconst ?? 0)) : runtime.macro("clocks_to_attotime", (members.m_tconst ?? 0)));
        }
        let period = (__L1 ? __L1(((((Number((((members.m_mode ?? 0)) & (32))) === Number(0)) ? 1 : 0)) ? (16) : (256))) : ((members.m_device)?.clocks_to_attotime?.(((((Number((((members.m_mode ?? 0)) & (32))) === Number(0)) ? 1 : 0)) ? (16) : (256))) ?? 0));
        return ((period) * ((members.m_tconst ?? 0)));
    }
    function method_zc_to_callback(runtime, param) {
        const members = runtime.members;
        const h_m_device = members.m_device ?? 0;
        const h_m_index = members.m_index ?? 0;
        runtime.readIndex(h_m_device.m_zc_cb, h_m_index)(0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "timer_callback": method_timer_callback,
        "period": method_period,
        "zc_to_callback": method_zc_to_callback
    };
    return __methodTable;
})();
definition.children[0].definition.compiledMethodLinks = ["clocks_to_attotime", "m_device.clocks_to_attotime", "m_device.interrupt_check"];
export const device = definition;
export default device;
