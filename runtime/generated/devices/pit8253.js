import deviceData from './pit8253.device.ir.json' with { type: 'json' };
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
        const h_m_counter = members.m_counter ?? 0;
        offset = ((offset) & (3));
        0;
        if ((((offset) === (3)) ? 1 : 0)) {
            return ((0) & 0xff);
        }
        else {
            return (((__t0 = __deref_read(runtime, h_m_counter[offset]), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(h_m_counter[offset], "read"))) & 0xff);
        }
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
        const h_m_counter = members.m_counter ?? 0;
        offset = ((offset) & (3));
        0;
        if ((((offset) === (3)) ? 1 : 0)) {
            let timer = ((((((data) >>> (6))) & (3))) | 0);
            if ((((timer) === (3)) ? 1 : 0)) {
                method_readback_command(runtime, data);
            }
            else {
                (__deref_write(runtime, h_m_counter[timer]).control_w?.(data) ?? 0);
            }
        }
        else {
            (__deref_write(runtime, h_m_counter[offset]).count_w?.(data) ?? 0);
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
    function method_readback_command(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_out_handler_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_handler_0(runtime, (members.m_out_handler ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_out_handler ?? 0)[0], "bind"));
    }
    function __deref_out_handler_0(runtime, p) {
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
    function method_out_handler_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_handler_1(runtime, (members.m_out_handler ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_out_handler ?? 0)[1], "bind"));
    }
    function __deref_out_handler_1(runtime, p) {
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
    function method_out_handler_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_handler_2(runtime, (members.m_out_handler ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_out_handler ?? 0)[2], "bind"));
    }
    function __deref_out_handler_2(runtime, p) {
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
    function method_write_gate0(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_write_gate0(runtime, h_m_counter[0]).gate_w?.(state) ?? 0);
    }
    function __deref_write_gate0(runtime, p) {
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
    function method_write_gate1(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_write_gate1(runtime, h_m_counter[1]).gate_w?.(state) ?? 0);
    }
    function __deref_write_gate1(runtime, p) {
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
    function method_write_gate2(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_write_gate2(runtime, h_m_counter[2]).gate_w?.(state) ?? 0);
    }
    function __deref_write_gate2(runtime, p) {
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
    function method_write_clk0(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_write_clk0(runtime, h_m_counter[0]).set_clock_signal?.(state) ?? 0);
    }
    function __deref_write_clk0(runtime, p) {
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
    function method_write_clk1(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_write_clk1(runtime, h_m_counter[1]).set_clock_signal?.(state) ?? 0);
    }
    function __deref_write_clk1(runtime, p) {
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
    function method_write_clk2(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_write_clk2(runtime, h_m_counter[2]).set_clock_signal?.(state) ?? 0);
    }
    function __deref_write_clk2(runtime, p) {
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
    function method_pit8253_device__set_clk_0(runtime, clk) {
        const members = runtime.members;
        const h_m_clk = members.m_clk ?? 0;
        h_m_clk[0] = clk;
    }
    function method_pit8253_device__set_clk_1(runtime, clk) {
        const members = runtime.members;
        const h_m_clk = members.m_clk ?? 0;
        h_m_clk[1] = clk;
    }
    function method_pit8253_device__set_clk_2(runtime, clk) {
        const members = runtime.members;
        const h_m_clk = members.m_clk ?? 0;
        h_m_clk[2] = clk;
    }
    function method_pit8253_device__out_handler_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pit8253_device__out_handler_0(runtime, (members.m_out_handler ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_out_handler ?? 0)[0], "bind"));
    }
    function __deref_pit8253_device__out_handler_0(runtime, p) {
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
    function method_pit8253_device__out_handler_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pit8253_device__out_handler_1(runtime, (members.m_out_handler ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_out_handler ?? 0)[1], "bind"));
    }
    function __deref_pit8253_device__out_handler_1(runtime, p) {
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
    function method_pit8253_device__out_handler_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pit8253_device__out_handler_2(runtime, (members.m_out_handler ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_out_handler ?? 0)[2], "bind"));
    }
    function __deref_pit8253_device__out_handler_2(runtime, p) {
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
    function method_pit8253_device__write_gate0(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_pit8253_device__write_gate0(runtime, h_m_counter[0]).gate_w?.(state) ?? 0);
    }
    function __deref_pit8253_device__write_gate0(runtime, p) {
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
    function method_pit8253_device__write_gate1(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_pit8253_device__write_gate1(runtime, h_m_counter[1]).gate_w?.(state) ?? 0);
    }
    function __deref_pit8253_device__write_gate1(runtime, p) {
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
    function method_pit8253_device__write_gate2(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_pit8253_device__write_gate2(runtime, h_m_counter[2]).gate_w?.(state) ?? 0);
    }
    function __deref_pit8253_device__write_gate2(runtime, p) {
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
    function method_pit8253_device__write_clk0(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_pit8253_device__write_clk0(runtime, h_m_counter[0]).set_clock_signal?.(state) ?? 0);
    }
    function __deref_pit8253_device__write_clk0(runtime, p) {
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
    function method_pit8253_device__write_clk1(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_pit8253_device__write_clk1(runtime, h_m_counter[1]).set_clock_signal?.(state) ?? 0);
    }
    function __deref_pit8253_device__write_clk1(runtime, p) {
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
    function method_pit8253_device__write_clk2(runtime, state) {
        const members = runtime.members;
        const h_m_counter = members.m_counter ?? 0;
        (__deref_pit8253_device__write_clk2(runtime, h_m_counter[2]).set_clock_signal?.(state) ?? 0);
    }
    function __deref_pit8253_device__write_clk2(runtime, p) {
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
        "readback_command": method_readback_command,
        "out_handler_0": method_out_handler_0,
        "out_handler_1": method_out_handler_1,
        "out_handler_2": method_out_handler_2,
        "write_gate0": method_write_gate0,
        "write_gate1": method_write_gate1,
        "write_gate2": method_write_gate2,
        "write_clk0": method_write_clk0,
        "write_clk1": method_write_clk1,
        "write_clk2": method_write_clk2,
        "pit8253_device::set_clk_0": method_pit8253_device__set_clk_0,
        "pit8253_device::set_clk_1": method_pit8253_device__set_clk_1,
        "pit8253_device::set_clk_2": method_pit8253_device__set_clk_2,
        "pit8253_device::out_handler_0": method_pit8253_device__out_handler_0,
        "pit8253_device::out_handler_1": method_pit8253_device__out_handler_1,
        "pit8253_device::out_handler_2": method_pit8253_device__out_handler_2,
        "pit8253_device::write_gate0": method_pit8253_device__write_gate0,
        "pit8253_device::write_gate1": method_pit8253_device__write_gate1,
        "pit8253_device::write_gate2": method_pit8253_device__write_gate2,
        "pit8253_device::write_clk0": method_pit8253_device__write_clk0,
        "pit8253_device::write_clk1": method_pit8253_device__write_clk1,
        "pit8253_device::write_clk2": method_pit8253_device__write_clk2
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
    function method_simulate(runtime, elapsed_cycles) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["owner"], __L1 = __l["downcast"];
        let adjusted_value = ((0) >>> 0);
        let bcd = (((((((members.m_control ?? 0)) >>> (0))) & (1))) | 0);
        let mode = (((((((members.m_control ?? 0)) >>> (1))) & ((((((members.m_control ?? 0)) & (4))) ? (3) : (7))))) | 0);
        if ((((members.__static_simulate_CYCLES_NEVER__initialised ?? 0)) ? 0 : 1)) {
            members.__static_simulate_CYCLES_NEVER = 4294967295;
            members.__static_simulate_CYCLES_NEVER__initialised = 1;
        }
        let cycles_to_output = ((0) >>> 0);
        0;
        switch (mode) {
            case 0:
                {
                    if (((((members.m_phase ?? 0)) === (0)) ? 1 : 0)) {
                        cycles_to_output = (((members.__static_simulate_CYCLES_NEVER ?? 0)) >>> 0);
                    }
                    else {
                        if ((((runtime.wide(">=", elapsed_cycles, 0)) && (((((members.m_phase ?? 0)) === (1)) ? 1 : 0))) ? 1 : 0)) {
                            if (runtime.wide(">", elapsed_cycles, 0)) {
                                elapsed_cycles = runtime.wide("-", elapsed_cycles, 1);
                                members.m_phase = ((2) | 0);
                            }
                            method_load_counter_value(runtime);
                        }
                        if (((((members.m_gate ?? 0)) === (0)) ? 1 : 0)) {
                            cycles_to_output = (((members.__static_simulate_CYCLES_NEVER ?? 0)) >>> 0);
                        }
                        else {
                            if (((((members.m_phase ?? 0)) === (2)) ? 1 : 0)) {
                                adjusted_value = ((method_adjusted_count(runtime)) >>> 0);
                                if (runtime.wide(">=", elapsed_cycles, ((adjusted_value) >>> 0))) {
                                    elapsed_cycles = runtime.wide("-", elapsed_cycles, adjusted_value);
                                    members.m_phase = ((3) | 0);
                                    members.m_value = ((0) & 0xffff);
                                    method_set_output(runtime, 1);
                                }
                            }
                            method_decrease_counter_value(runtime, elapsed_cycles);
                            switch ((members.m_phase ?? 0)) {
                                case 1:
                                    {
                                        cycles_to_output = ((1) >>> 0);
                                        break;
                                    }
                                case 2:
                                    {
                                        cycles_to_output = ((method_adjusted_count(runtime)) >>> 0);
                                        break;
                                    }
                                case 3:
                                    {
                                        cycles_to_output = ((method_adjusted_count(runtime)) >>> 0);
                                        break;
                                    }
                            }
                        }
                    }
                    break;
                }
            case 1:
                {
                    if ((((runtime.wide(">=", elapsed_cycles, 0)) && (((((members.m_phase ?? 0)) === (1)) ? 1 : 0))) ? 1 : 0)) {
                        if (runtime.wide(">", elapsed_cycles, 0)) {
                            elapsed_cycles = runtime.wide("-", elapsed_cycles, 1);
                            members.m_phase = ((2) | 0);
                        }
                        method_load_counter_value(runtime);
                        method_set_output(runtime, 0);
                    }
                    if (((((members.m_phase ?? 0)) === (2)) ? 1 : 0)) {
                        adjusted_value = ((method_adjusted_count(runtime)) >>> 0);
                        if (runtime.wide(">=", elapsed_cycles, ((adjusted_value) >>> 0))) {
                            members.m_phase = ((3) | 0);
                            method_set_output(runtime, 1);
                        }
                    }
                    method_decrease_counter_value(runtime, elapsed_cycles);
                    switch ((members.m_phase ?? 0)) {
                        case 1:
                            {
                                cycles_to_output = ((1) >>> 0);
                                break;
                            }
                        case 2:
                            {
                                cycles_to_output = ((method_adjusted_count(runtime)) >>> 0);
                                break;
                            }
                        default:
                            {
                                cycles_to_output = (((members.__static_simulate_CYCLES_NEVER ?? 0)) >>> 0);
                                break;
                            }
                    }
                    break;
                }
            case 2:
                {
                    if ((((((((members.m_gate ?? 0)) === (0)) ? 1 : 0)) || (((((members.m_phase ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
                        method_set_output(runtime, 1);
                        cycles_to_output = (((members.__static_simulate_CYCLES_NEVER ?? 0)) >>> 0);
                    }
                    else {
                        if ((((runtime.wide(">=", elapsed_cycles, 0)) && (((((members.m_phase ?? 0)) === (1)) ? 1 : 0))) ? 1 : 0)) {
                            if (runtime.wide(">", elapsed_cycles, 0)) {
                                elapsed_cycles = runtime.wide("-", elapsed_cycles, 1);
                                members.m_phase = ((2) | 0);
                            }
                            method_load_counter_value(runtime);
                        }
                        adjusted_value = ((method_adjusted_count(runtime)) >>> 0);
                        do {
                            if (((((members.m_phase ?? 0)) === (2)) ? 1 : 0)) {
                                if (runtime.wide(">=", runtime.wide("+", elapsed_cycles, 1), ((adjusted_value) >>> 0))) {
                                    members.m_phase = ((3) | 0);
                                    method_set_output(runtime, 0);
                                }
                            }
                            if ((((runtime.wide(">=", elapsed_cycles, ((adjusted_value) >>> 0))) && (((((members.m_phase ?? 0)) === (3)) ? 1 : 0))) ? 1 : 0)) {
                                elapsed_cycles = runtime.wide("-", elapsed_cycles, adjusted_value);
                                members.m_phase = ((2) | 0);
                                method_load_counter_value(runtime);
                                adjusted_value = ((method_adjusted_count(runtime)) >>> 0);
                                method_set_output(runtime, 1);
                            }
                        } while (runtime.wide(">=", elapsed_cycles, ((adjusted_value) >>> 0)));
                        method_decrease_counter_value(runtime, elapsed_cycles);
                        switch ((members.m_phase ?? 0)) {
                            case 1:
                                {
                                    cycles_to_output = ((1) >>> 0);
                                    break;
                                }
                            default:
                                {
                                    cycles_to_output = ((((((((members.m_value ?? 0)) === (1)) ? 1 : 0)) ? (1) : (runtime.subtract(method_adjusted_count(runtime), 1)))) >>> 0);
                                    break;
                                }
                        }
                    }
                    break;
                }
            case 3:
                {
                    if ((((((((members.m_gate ?? 0)) === (0)) ? 1 : 0)) || (((((members.m_phase ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
                        method_set_output(runtime, 1);
                        cycles_to_output = (((members.__static_simulate_CYCLES_NEVER ?? 0)) >>> 0);
                        if (((Number((__L1 ? __L1((__L0 ? __L0() : runtime.macro("owner"))) : runtime.macro("downcast", (__L0 ? __L0() : runtime.macro("owner")))).m_type) === Number(2)) ? 1 : 0)) {
                            method_load_counter_value(runtime);
                        }
                    }
                    else {
                        if ((((runtime.wide(">=", elapsed_cycles, 0)) && (((((members.m_phase ?? 0)) === (1)) ? 1 : 0))) ? 1 : 0)) {
                            if (runtime.wide(">", elapsed_cycles, 0)) {
                                elapsed_cycles = runtime.wide("-", elapsed_cycles, 1);
                                members.m_phase = ((2) | 0);
                            }
                            method_load_counter_value(runtime);
                        }
                        if (runtime.wide(">", elapsed_cycles, 0)) {
                            adjusted_value = ((method_adjusted_count(runtime)) >>> 0);
                            do {
                                if ((((((((members.m_phase ?? 0)) === (2)) ? 1 : 0)) && (runtime.wide(">=", elapsed_cycles, runtime.shiftRight(((adjusted_value) + (1)), 1)))) ? 1 : 0)) {
                                    elapsed_cycles = runtime.wide("-", elapsed_cycles, runtime.shiftRight(((adjusted_value) + (1)), 1));
                                    members.m_phase = ((3) | 0);
                                    method_load_counter_value(runtime);
                                    adjusted_value = ((method_adjusted_count(runtime)) >>> 0);
                                    method_set_output(runtime, 0);
                                }
                                if ((((((((members.m_phase ?? 0)) === (3)) ? 1 : 0)) && (runtime.wide(">=", elapsed_cycles, ((adjusted_value) >>> (1))))) ? 1 : 0)) {
                                    elapsed_cycles = runtime.wide("-", elapsed_cycles, ((adjusted_value) >>> (1)));
                                    members.m_phase = ((2) | 0);
                                    method_load_counter_value(runtime);
                                    adjusted_value = ((method_adjusted_count(runtime)) >>> 0);
                                    method_set_output(runtime, 1);
                                }
                            } while (((((((((((members.m_phase ?? 0)) === (2)) ? 1 : 0)) && (runtime.wide(">=", elapsed_cycles, runtime.shiftRight(((adjusted_value) + (1)), 1)))) ? 1 : 0)) || ((((((((members.m_phase ?? 0)) === (3)) ? 1 : 0)) && (runtime.wide(">=", elapsed_cycles, ((adjusted_value) >>> (1))))) ? 1 : 0))) ? 1 : 0));
                            method_decrease_counter_value(runtime, runtime.wide("*", elapsed_cycles, 2));
                            switch ((members.m_phase ?? 0)) {
                                case 1:
                                    {
                                        cycles_to_output = ((1) >>> 0);
                                        break;
                                    }
                                case 2:
                                    {
                                        cycles_to_output = ((runtime.shiftRight(__add_simulate(runtime, method_adjusted_count(runtime), 1), 1)) >>> 0);
                                        break;
                                    }
                                case 3:
                                    {
                                        cycles_to_output = ((runtime.shiftRight(method_adjusted_count(runtime), 1)) >>> 0);
                                        break;
                                    }
                            }
                        }
                    }
                    break;
                }
            case 4:
            case 5:
                {
                    if ((((((((members.m_gate ?? 0)) === (0)) ? 1 : 0)) && ((((mode) === (4)) ? 1 : 0))) ? 1 : 0)) {
                        cycles_to_output = (((members.__static_simulate_CYCLES_NEVER ?? 0)) >>> 0);
                    }
                    else {
                        if ((((runtime.wide(">=", elapsed_cycles, 0)) && (((((members.m_phase ?? 0)) === (1)) ? 1 : 0))) ? 1 : 0)) {
                            if (runtime.wide(">", elapsed_cycles, 0)) {
                                elapsed_cycles = runtime.wide("-", elapsed_cycles, 1);
                                members.m_phase = ((2) | 0);
                            }
                            method_load_counter_value(runtime);
                        }
                        if ((((((((members.m_value ?? 0)) === (0)) ? 1 : 0)) && (((((members.m_phase ?? 0)) === (2)) ? 1 : 0))) ? 1 : 0)) {
                            adjusted_value = ((0) >>> 0);
                        }
                        else {
                            adjusted_value = ((method_adjusted_count(runtime)) >>> 0);
                        }
                        if ((((((((members.m_phase ?? 0)) === (2)) ? 1 : 0)) && (runtime.wide(">=", elapsed_cycles, ((adjusted_value) >>> 0)))) ? 1 : 0)) {
                            elapsed_cycles = runtime.wide("-", elapsed_cycles, adjusted_value);
                            members.m_phase = ((3) | 0);
                            members.m_value = ((0) & 0xffff);
                            method_set_output(runtime, 0);
                        }
                        if ((((runtime.wide(">", elapsed_cycles, 0)) && (((((members.m_phase ?? 0)) === (3)) ? 1 : 0))) ? 1 : 0)) {
                            elapsed_cycles = runtime.wide("-", elapsed_cycles, 1);
                            members.m_phase = ((0) | 0);
                            method_decrease_counter_value(runtime, 1);
                            method_set_output(runtime, 1);
                        }
                        method_decrease_counter_value(runtime, elapsed_cycles);
                        switch ((members.m_phase ?? 0)) {
                            case 1:
                                {
                                    cycles_to_output = ((1) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    cycles_to_output = ((method_adjusted_count(runtime)) >>> 0);
                                    break;
                                }
                            case 3:
                                {
                                    cycles_to_output = ((1) >>> 0);
                                    break;
                                }
                        }
                    }
                    break;
                }
        }
        if (((((((cycles_to_output) === ((members.__static_simulate_CYCLES_NEVER ?? 0))) ? 1 : 0)) || (((((members.m_clockin ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
            method_adjust_timer(runtime, Infinity);
        }
        else {
            method_adjust_timer(runtime, runtime.attotimeBinary("+", (members.m_last_updated ?? 0), runtime.attotimeBinary("*", cycles_to_output, (members.m_clock_period ?? 0))));
        }
        0;
    }
    function __add_simulate(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_load_counter_value(runtime) {
        const members = runtime.members;
        members.m_value = (((members.m_count ?? 0)) & 0xffff);
        members.m_null_count = ((0) | 0);
    }
    function method_adjusted_count(runtime) {
        const members = runtime.members;
        let val = (((members.m_value ?? 0)) & 0xffff);
        if ((((((((members.m_control ?? 0)) >>> (0))) & (1))) ? 0 : 1)) {
            return (((((((val) === (0)) ? 1 : 0)) ? (65536) : (val))) >>> 0);
        }
        else {
            if ((((val) === (0)) ? 1 : 0)) {
                return ((10000) >>> 0);
            }
        }
        return ((__add_adjusted_count(runtime, __add_adjusted_count(runtime, __add_adjusted_count(runtime, ((((((val) >>> (12))) & (15))) * (1000)), ((((((val) >>> (8))) & (15))) * (100))), ((((((val) >>> (4))) & (15))) * (10))), ((val) & (15)))) >>> 0);
    }
    function __add_adjusted_count(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_set_output(runtime, output) {
        const members = runtime.members;
        if ((((output) !== ((members.m_output ?? 0))) ? 1 : 0)) {
            members.m_output = ((output) | 0);
            method_flush_output(runtime);
        }
    }
    function method_flush_output(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["owner"], __L1 = __l["downcast"];
        const h_m_index = members.m_index ?? 0;
        let new_output = (((members.m_output ?? 0)) | 0);
        if (((((members.m_clockin ?? 0)) === (0)) ? 1 : 0)) {
            let mode = (((((((members.m_control ?? 0)) >>> (1))) & ((((((members.m_control ?? 0)) & (4))) ? (3) : (7))))) | 0);
            if ((((((((((mode) === (2)) ? 1 : 0)) || ((((mode) === (3)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_gate_input ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
                new_output = ((1) | 0);
            }
        }
        if ((((new_output) !== ((members.m_output_pin ?? 0))) ? 1 : 0)) {
            0;
            members.m_output_pin = ((new_output) | 0);
            runtime.readIndex((__L1 ? __L1((__L0 ? __L0() : runtime.macro("owner"))) : runtime.macro("downcast", (__L0 ? __L0() : runtime.macro("owner")))).m_out_handler, h_m_index)(new_output);
        }
    }
    function method_decrease_counter_value(runtime, cycles) {
        const members = runtime.members;
        if (((Number((((((members.m_control ?? 0)) >>> (0))) & (1))) === Number(0)) ? 1 : 0)) {
            members.m_value = ((((members.m_value) - (runtime.wide("&", cycles, 65535)))) & 0xffff);
            return;
        }
        let units = (((((members.m_value ?? 0)) & (15))) & 0xff);
        let tens = (((((((members.m_value ?? 0)) >>> (4))) & (15))) & 0xff);
        let hundreds = (((((((members.m_value ?? 0)) >>> (8))) & (15))) & 0xff);
        let thousands = (((((((members.m_value ?? 0)) >>> (12))) & (15))) & 0xff);
        if (runtime.wide("<=", cycles, ((units) & 0xff))) {
            units = ((((units) - (cycles))) & 0xff);
        }
        else {
            cycles = runtime.wide("-", cycles, units);
            units = ((runtime.low32(runtime.wide("%", runtime.wide("-", 10, runtime.wide("%", cycles, 10)), 10))) & 0xff);
            cycles = runtime.wide("/", runtime.wide("+", cycles, 9), 10);
            if (runtime.wide("<=", cycles, ((tens) & 0xff))) {
                tens = ((((tens) - (cycles))) & 0xff);
            }
            else {
                cycles = runtime.wide("-", cycles, tens);
                tens = ((runtime.low32(runtime.wide("%", runtime.wide("-", 10, runtime.wide("%", cycles, 10)), 10))) & 0xff);
                cycles = runtime.wide("/", runtime.wide("+", cycles, 9), 10);
                if (runtime.wide("<=", cycles, ((hundreds) & 0xff))) {
                    hundreds = ((((hundreds) - (cycles))) & 0xff);
                }
                else {
                    cycles = runtime.wide("-", cycles, hundreds);
                    hundreds = ((runtime.low32(runtime.wide("%", runtime.wide("-", 10, runtime.wide("%", cycles, 10)), 10))) & 0xff);
                    cycles = runtime.wide("/", runtime.wide("+", cycles, 9), 10);
                    thousands = ((runtime.low32(runtime.wide("%", runtime.wide("-", ((10) + (thousands)), runtime.wide("%", cycles, 10)), 10))) & 0xff);
                }
            }
        }
        members.m_value = ((((((((((thousands) << (12))) | (((hundreds) << (8))))) | (((tens) << (4))))) | (units))) & 0xffff);
    }
    function method_adjust_timer(runtime, target) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        members.m_next_update = target;
        (__deref_adjust_timer(runtime, members.m_update_timer).adjust?.(runtime.attotimeBinary("-", target, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))) ?? 0);
    }
    function __deref_adjust_timer(runtime, p) {
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
    function method_update(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        let now = ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
        let elapsed_cycles = 0;
        if (((((members.m_clockin ?? 0)) !== (0)) ? 1 : 0)) {
            if (runtime.attotimeBinary(">", now, (members.m_last_updated ?? 0))) {
                let elapsed_time = runtime.attotimeBinary("-", now, (members.m_last_updated ?? 0));
                if (((Number(runtime.attotimeField((members.m_clock_period ?? 0), "m_seconds")) !== Number(0)) ? 1 : 0)) {
                    while (runtime.attotimeBinary(">=", elapsed_time, (members.m_clock_period ?? 0))) {
                        elapsed_cycles = runtime.wide("+", elapsed_cycles, 1);
                        elapsed_time = runtime.attotimeBinary("-", elapsed_time, (members.m_clock_period ?? 0));
                    }
                }
                else {
                    elapsed_cycles = runtime.wide("/", runtime.attotimeField(elapsed_time, "m_attoseconds"), runtime.attotimeField((members.m_clock_period ?? 0), "m_attoseconds"));
                    if (((Number(runtime.attotimeField(elapsed_time, "m_seconds")) !== Number(0)) ? 1 : 0)) {
                        elapsed_time = runtime.withAttotimeField(elapsed_time, "m_attoseconds", runtime.wide("-", runtime.attotimeField(elapsed_time, "m_attoseconds"), runtime.wide("*", elapsed_cycles, runtime.attotimeField((members.m_clock_period ?? 0), "m_attoseconds"))));
                        let cycles_per_second = runtime.wide("/", 1000000000000000000, runtime.attotimeField((members.m_clock_period ?? 0), "m_attoseconds"));
                        elapsed_cycles = runtime.wide("+", elapsed_cycles, runtime.wide("*", cycles_per_second, runtime.attotimeField(elapsed_time, "m_seconds")));
                        let remainder_per_second = runtime.wide("-", 1000000000000000000, runtime.wide("*", cycles_per_second, runtime.attotimeField((members.m_clock_period ?? 0), "m_attoseconds")));
                        elapsed_time = runtime.withAttotimeField(elapsed_time, "m_attoseconds", runtime.wide("+", runtime.attotimeField(elapsed_time, "m_attoseconds"), runtime.wide("*", runtime.attotimeField(elapsed_time, "m_seconds"), remainder_per_second)));
                        elapsed_cycles = runtime.wide("+", elapsed_cycles, runtime.wide("/", runtime.attotimeField(elapsed_time, "m_attoseconds"), runtime.attotimeField((members.m_clock_period ?? 0), "m_attoseconds")));
                    }
                }
                0;
                members.m_last_updated = runtime.attotimeBinary("+", (members.m_last_updated ?? 0), runtime.attotimeBinary("*", elapsed_cycles, (members.m_clock_period ?? 0)));
            }
        }
        else {
            members.m_last_updated = now;
        }
        if (runtime.wide(">", elapsed_cycles, 0)) {
            method_simulate(runtime, elapsed_cycles);
        }
        else {
            if (((((members.m_clockin ?? 0)) !== (0)) ? 1 : 0)) {
                method_adjust_timer(runtime, runtime.attotimeBinary("+", (members.m_last_updated ?? 0), (members.m_clock_period ?? 0)));
            }
        }
    }
    function method_update_tick(runtime, param) {
        const members = runtime.members;
        method_update(runtime);
    }
    function method_control_w_deferred(runtime, param) {
        const members = runtime.members;
        method_update(runtime);
        let data = ((((param) & 0xff)) & 0xff);
        if (((Number(((((data) >>> (4))) & (3))) === Number(0)) ? 1 : 0)) {
            0;
            method_readback(runtime, 1);
        }
        else {
            0;
            members.m_control = ((((data) & (63))) & 0xff);
            members.m_null_count = ((1) | 0);
            members.m_wmsb = (((members.m_rmsb = ((0) ? 1 : 0))) ? 1 : 0);
            members.m_phase = ((0) | 0);
            method_set_output(runtime, (((((((members.m_control ?? 0)) >>> (1))) & ((((((members.m_control ?? 0)) & (4))) ? (3) : (7))))) ? (1) : (0)));
        }
    }
    function method_readback(runtime, command) {
        const members = runtime.members;
        method_update(runtime);
        if (((Number(((command) & (1))) === Number(0)) ? 1 : 0)) {
            if ((((members.m_latched_status ?? 0)) ? 0 : 1)) {
                members.m_status = (((((((((members.m_control ?? 0)) & (63))) | (((((((members.m_output ?? 0)) !== (0)) ? 1 : 0)) ? (128) : (0))))) | ((((members.m_null_count ?? 0)) ? (64) : (0))))) & 0xff);
                members.m_latched_status = ((1) | 0);
            }
        }
        if ((((((Number(((command) & (2))) === Number(0)) ? 1 : 0)) && ((((members.m_rmsb ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            if (((((members.m_latched_count ?? 0)) === (0)) ? 1 : 0)) {
                let value = ((method_masked_value(runtime)) & 0xffff);
                switch ((((((members.m_control ?? 0)) >>> (4))) & (3))) {
                    case 0:
                        {
                            break;
                        }
                    case 1:
                        {
                            members.m_latch = ((((((((value) << (8))) & (65280))) | (((value) & (255))))) & 0xffff);
                            members.m_latched_count = ((1) | 0);
                            break;
                        }
                    case 2:
                        {
                            members.m_latch = ((((((value) & (65280))) | (((((value) >>> (8))) & (255))))) & 0xffff);
                            members.m_latched_count = ((1) | 0);
                            break;
                        }
                    case 3:
                        {
                            members.m_latch = ((value) & 0xffff);
                            members.m_latched_count = ((2) | 0);
                            break;
                        }
                }
            }
        }
    }
    function method_masked_value(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["owner"], __L1 = __l["downcast"];
        if ((((((Number((((((members.m_control ?? 0)) >>> (1))) & ((((((members.m_control ?? 0)) & (4))) ? (3) : (7))))) === Number(3)) ? 1 : 0)) && (((Number((__L1 ? __L1((__L0 ? __L0() : runtime.macro("owner"))) : runtime.macro("downcast", (__L0 ? __L0() : runtime.macro("owner")))).m_type) !== Number(2)) ? 1 : 0))) ? 1 : 0)) {
            return (((((members.m_value ?? 0)) & (65534))) & 0xffff);
        }
        return (((members.m_value ?? 0)) & 0xffff);
    }
    function method_count_w_deferred(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        method_update(runtime);
        let data = ((((param) & 0xff)) & 0xff);
        let middle_of_a_cycle = (((((runtime.attotimeBinary(">", ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0), (members.m_last_updated ?? 0))) && (((((members.m_clockin ?? 0)) !== (0)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        switch ((((((members.m_control ?? 0)) >>> (4))) & (3))) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    if (middle_of_a_cycle) {
                        members.m_last_updated = runtime.attotimeBinary("+", (members.m_last_updated ?? 0), (members.m_clock_period ?? 0));
                    }
                    method_load_count(runtime, data);
                    if (((((members.m_clockin ?? 0)) !== (0)) ? 1 : 0)) {
                        method_simulate(runtime, 0);
                    }
                    if (((Number((((((members.m_control ?? 0)) >>> (1))) & ((((((members.m_control ?? 0)) & (4))) ? (3) : (7))))) === Number(0)) ? 1 : 0)) {
                        method_set_output(runtime, 0);
                    }
                    break;
                }
            case 2:
                {
                    if (middle_of_a_cycle) {
                        members.m_last_updated = runtime.attotimeBinary("+", (members.m_last_updated ?? 0), (members.m_clock_period ?? 0));
                    }
                    method_load_count(runtime, ((data) << (8)));
                    if (((((members.m_clockin ?? 0)) !== (0)) ? 1 : 0)) {
                        method_simulate(runtime, 0);
                    }
                    if (((Number((((((members.m_control ?? 0)) >>> (1))) & ((((((members.m_control ?? 0)) & (4))) ? (3) : (7))))) === Number(0)) ? 1 : 0)) {
                        method_set_output(runtime, 0);
                    }
                    break;
                }
            case 3:
                {
                    if ((members.m_wmsb ?? 0)) {
                        if (middle_of_a_cycle) {
                            members.m_last_updated = runtime.attotimeBinary("+", (members.m_last_updated ?? 0), (members.m_clock_period ?? 0));
                        }
                        method_load_count(runtime, (((members.m_lowcount ?? 0)) | (((data) << (8)))));
                        if (((((members.m_clockin ?? 0)) !== (0)) ? 1 : 0)) {
                            method_simulate(runtime, 0);
                        }
                    }
                    else {
                        members.m_lowcount = ((data) & 0xff);
                        if (((Number((((((members.m_control ?? 0)) >>> (1))) & ((((((members.m_control ?? 0)) & (4))) ? (3) : (7))))) === Number(0)) ? 1 : 0)) {
                            members.m_phase = ((0) | 0);
                            method_set_output(runtime, 0);
                        }
                    }
                    members.m_wmsb = (((((members.m_wmsb ?? 0)) ? 0 : 1)) ? 1 : 0);
                    break;
                }
        }
    }
    function method_load_count(runtime, newcount) {
        const members = runtime.members;
        newcount = ((newcount) & 0xffff);
        let mode = (((((((members.m_control ?? 0)) >>> (1))) & ((((((members.m_control ?? 0)) & (4))) ? (3) : (7))))) | 0);
        0;
        if ((((newcount) === (1)) ? 1 : 0)) {
            if ((((mode) === (2)) ? 1 : 0)) {
                newcount = ((2) & 0xffff);
            }
            if ((((mode) === (3)) ? 1 : 0)) {
                newcount = ((0) & 0xffff);
            }
        }
        members.m_count = ((newcount) & 0xffff);
        if (((((((mode) === (2)) ? 1 : 0)) || ((((mode) === (3)) ? 1 : 0))) ? 1 : 0)) {
            if (((((members.m_phase ?? 0)) === (0)) ? 1 : 0)) {
                members.m_phase = ((1) | 0);
            }
        }
        else {
            if (((((((mode) === (0)) ? 1 : 0)) || ((((mode) === (4)) ? 1 : 0))) ? 1 : 0)) {
                members.m_phase = ((1) | 0);
            }
        }
    }
    function method_gate_w_deferred(runtime, param) {
        const members = runtime.members;
        method_update(runtime);
        let state = ((param) | 0);
        0;
        if ((((state) !== ((members.m_gate_input ?? 0))) ? 1 : 0)) {
            method_update(runtime);
            members.m_gate_input = ((state) | 0);
            if (((((members.m_clockin ?? 0)) !== (0)) ? 1 : 0)) {
                members.m_gate = ((state) | 0);
            }
            if (((((((state) !== (0)) ? 1 : 0)) && (method_edge_sensitive_gate(runtime))) ? 1 : 0)) {
                if (((((members.m_clockin ?? 0)) !== (0)) ? 1 : 0)) {
                    members.m_phase = ((1) | 0);
                }
                else {
                    members.m_gate_rose = ((1) | 0);
                }
            }
            if (((((members.m_clockin ?? 0)) === (0)) ? 1 : 0)) {
                method_flush_output(runtime);
            }
            method_update(runtime);
        }
    }
    function method_edge_sensitive_gate(runtime) {
        const members = runtime.members;
        let mode = (((((((members.m_control ?? 0)) >>> (1))) & ((((((members.m_control ?? 0)) & (4))) ? (3) : (7))))) | 0);
        return ((((((((((((mode) === (1)) ? 1 : 0)) || ((((mode) === (2)) ? 1 : 0))) ? 1 : 0)) || (((((((mode) === (3)) ? 1 : 0)) && (((((members.m_clockin ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) || ((((mode) === (5)) ? 1 : 0))) ? 1 : 0);
    }
    function method_set_clock_signal_deferred(runtime, param) {
        const members = runtime.members;
        let state = ((param) | 0);
        0;
        if (((((((members.m_clock_signal ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) {
            members.m_gate = (((members.m_gate_input ?? 0)) | 0);
            if ((members.m_gate_rose ?? 0)) {
                if (method_edge_sensitive_gate(runtime)) {
                    members.m_phase = ((1) | 0);
                }
                members.m_gate_rose = ((0) | 0);
            }
        }
        if (((((members.m_clock_signal ?? 0)) && (((state) ? 0 : 1))) ? 1 : 0)) {
            method_simulate(runtime, 1);
        }
        members.m_clock_signal = ((state) | 0);
    }
    function method_control_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("control_w_deferred", data);
    }
    function method_count_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("count_w_deferred", data);
    }
    function method_gate_w(runtime, state) {
        const members = runtime.members;
        runtime.synchronize("gate_w_deferred", state);
    }
    function method_set_clock_signal(runtime, state) {
        const members = runtime.members;
        runtime.synchronize("set_clock_signal_deferred", state);
    }
    function method_pit_counter_device__control_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("control_w_deferred", data);
    }
    function method_pit_counter_device__count_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("count_w_deferred", data);
    }
    function method_pit_counter_device__gate_w(runtime, state) {
        const members = runtime.members;
        runtime.synchronize("gate_w_deferred", state);
    }
    function method_pit_counter_device__set_clock_signal(runtime, state) {
        const members = runtime.members;
        runtime.synchronize("set_clock_signal_deferred", state);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "simulate": method_simulate,
        "load_counter_value": method_load_counter_value,
        "adjusted_count": method_adjusted_count,
        "set_output": method_set_output,
        "flush_output": method_flush_output,
        "decrease_counter_value": method_decrease_counter_value,
        "adjust_timer": method_adjust_timer,
        "update": method_update,
        "update_tick": method_update_tick,
        "control_w_deferred": method_control_w_deferred,
        "readback": method_readback,
        "masked_value": method_masked_value,
        "count_w_deferred": method_count_w_deferred,
        "load_count": method_load_count,
        "gate_w_deferred": method_gate_w_deferred,
        "edge_sensitive_gate": method_edge_sensitive_gate,
        "set_clock_signal_deferred": method_set_clock_signal_deferred,
        "control_w": method_control_w,
        "count_w": method_count_w,
        "gate_w": method_gate_w,
        "set_clock_signal": method_set_clock_signal,
        "pit_counter_device::control_w": method_pit_counter_device__control_w,
        "pit_counter_device::count_w": method_pit_counter_device__count_w,
        "pit_counter_device::gate_w": method_pit_counter_device__gate_w,
        "pit_counter_device::set_clock_signal": method_pit_counter_device__set_clock_signal
    };
    return __methodTable;
})();
definition.children[0].definition.compiledMethodLinks = ["downcast", "machine", "machine().time", "owner"];
export const device = definition;
export default device;
