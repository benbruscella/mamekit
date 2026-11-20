import deviceData from './adc0804.device.ir.json' with { type: 'json' };
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
    function method_set_interrupt(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_intr_callback"];
        if (((Number((members.m_intr_active ?? 0)) !== Number(state)) ? 1 : 0)) {
            members.m_intr_active = ((state) ? 1 : 0);
            (__L0 ? __L0(Number(((state) ? (1) : (0)))) : typeof members.m_intr_callback === 'function' ? members.m_intr_callback(((state) ? (1) : (0))) : runtime.invoke("m_intr_callback", ((state) ? (1) : (0))));
        }
    }
    function method_rd_w(runtime, state) {
        const members = runtime.members;
        if ((((((state) ? 0 : 1)) && ((((members.m_rd_active ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_rd_active = ((1) ? 1 : 0);
            method_set_interrupt(runtime, 0);
        }
        else {
            if ((((state) && ((members.m_rd_active ?? 0))) ? 1 : 0)) {
                members.m_rd_active = ((0) ? 1 : 0);
            }
        }
    }
    function method_wr_w(runtime, state) {
        const members = runtime.members;
        if ((((((state) ? 0 : 1)) && ((((members.m_wr_active ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_wr_active = ((1) ? 1 : 0);
            method_set_interrupt(runtime, 0);
        }
        else {
            if ((((state) && ((members.m_wr_active ?? 0))) ? 1 : 0)) {
                members.m_wr_active = ((0) ? 1 : 0);
                method_conversion_start(runtime);
            }
        }
    }
    function method_conversion_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clocks_to_attotime"];
        let __t0;
        if ((((__t0 = __deref_conversion_start(runtime, members.m_timer), typeof __t0.enabled === 'function' ? __t0.enabled() : typeof __t0.enabled === 'number' || typeof __t0.enabled === 'boolean' ? __t0.enabled : runtime.container(members.m_timer, "enabled"))) ? 0 : 1)) {
            (__deref_conversion_start(runtime, members.m_timer).adjust?.(((((Number((members.m_fclk_rc ?? 0)) !== Number(0)) ? 1 : 0)) ? ((((members.m_fclk_rc ?? 0)) * (74))) : ((__L0 ? __L0(74) : runtime.macro("clocks_to_attotime", 74))))) ?? 0);
        }
        else {
            0;
        }
    }
    function __deref_conversion_start(runtime, p) {
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
    function method_conversion_done(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_vin_callback"];
        members.m_result = (((__L0 ? __L0() : typeof members.m_vin_callback === 'function' ? members.m_vin_callback() : runtime.invoke("m_vin_callback"))) & 0xff);
        if (((((((members.m_rd_active ?? 0)) ? 0 : 1)) && ((((members.m_wr_active ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            method_set_interrupt(runtime, 1);
        }
    }
    function method_vin_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_vin_callback(runtime, members.m_vin_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vin_callback, "bind"));
    }
    function __deref_vin_callback(runtime, p) {
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
        return (__t0 = __deref_intr_callback(runtime, members.m_intr_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_intr_callback, "bind"));
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
    function method_set_rd_mode(runtime, mode) {
        const members = runtime.members;
        members.m_rd_mode = mode;
    }
    function method_intr_r(runtime) {
        const members = runtime.members;
        return (((((members.m_intr_active ?? 0)) ? (0) : (1))) | 0);
    }
    function method_adc0804_device__vin_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_adc0804_device__vin_callback(runtime, members.m_vin_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vin_callback, "bind"));
    }
    function __deref_adc0804_device__vin_callback(runtime, p) {
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
    function method_adc0804_device__intr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_adc0804_device__intr_callback(runtime, members.m_intr_callback), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_intr_callback, "bind"));
    }
    function __deref_adc0804_device__intr_callback(runtime, p) {
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
    function method_adc0804_device__set_rd_mode(runtime, mode) {
        const members = runtime.members;
        members.m_rd_mode = mode;
    }
    function method_adc0804_device__intr_r(runtime) {
        const members = runtime.members;
        return (((((members.m_intr_active ?? 0)) ? (0) : (1))) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "set_interrupt": method_set_interrupt,
        "rd_w": method_rd_w,
        "wr_w": method_wr_w,
        "conversion_start": method_conversion_start,
        "conversion_done": method_conversion_done,
        "vin_callback": method_vin_callback,
        "intr_callback": method_intr_callback,
        "set_rd_mode": method_set_rd_mode,
        "intr_r": method_intr_r,
        "adc0804_device::vin_callback": method_adc0804_device__vin_callback,
        "adc0804_device::intr_callback": method_adc0804_device__intr_callback,
        "adc0804_device::set_rd_mode": method_adc0804_device__set_rd_mode,
        "adc0804_device::intr_r": method_adc0804_device__intr_r
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["clocks_to_attotime", "m_intr_callback", "m_vin_callback"];
export const device = definition;
export default device;
