import deviceData from './generic_latch_8.device.ir.json' with { type: 'json' };
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
    function method_init_callback(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_data_pending_cb"];
        (__L0 ? __L0(Number((((members.m_latch_written ?? 0)) ? (1) : (0)))) : typeof members.m_data_pending_cb === 'function' ? members.m_data_pending_cb((((members.m_latch_written ?? 0)) ? (1) : (0))) : runtime.invoke("m_data_pending_cb", (((members.m_latch_written ?? 0)) ? (1) : (0))));
    }
    function method_pending_r(runtime) {
        const members = runtime.members;
        return (((((members.m_latch_written ?? 0)) ? (1) : (0))) | 0);
    }
    function method_set_latch_written(runtime, latch_written) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_data_pending_cb"];
        if (((Number((members.m_latch_written ?? 0)) !== Number(latch_written)) ? 1 : 0)) {
            members.m_latch_written = ((latch_written) ? 1 : 0);
            (__L0 ? __L0(Number(((latch_written) ? (1) : (0)))) : typeof members.m_data_pending_cb === 'function' ? members.m_data_pending_cb(((latch_written) ? (1) : (0))) : runtime.invoke("m_data_pending_cb", ((latch_written) ? (1) : (0))));
        }
    }
    function method_data_pending_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_data_pending_callback(runtime, members.m_data_pending_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_data_pending_cb, "bind"));
    }
    function __deref_data_pending_callback(runtime, p) {
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
    function method_set_separate_acknowledge(runtime, ack) {
        const members = runtime.members;
        members.m_separate_acknowledge = ((ack) ? 1 : 0);
    }
    function method_has_separate_acknowledge(runtime) {
        const members = runtime.members;
        return (members.m_separate_acknowledge ?? 0);
    }
    function method_is_latch_written(runtime) {
        const members = runtime.members;
        return (members.m_latch_written ?? 0);
    }
    function method_generic_latch_base_device__data_pending_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_generic_latch_base_device__data_pending_callback(runtime, members.m_data_pending_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_data_pending_cb, "bind"));
    }
    function __deref_generic_latch_base_device__data_pending_callback(runtime, p) {
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
    function method_generic_latch_base_device__set_separate_acknowledge(runtime, ack) {
        const members = runtime.members;
        members.m_separate_acknowledge = ((ack) ? 1 : 0);
    }
    function method_generic_latch_base_device__has_separate_acknowledge(runtime) {
        const members = runtime.members;
        return (members.m_separate_acknowledge ?? 0);
    }
    function method_generic_latch_base_device__is_latch_written(runtime) {
        const members = runtime.members;
        return (members.m_latch_written ?? 0);
    }
    function method_write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("sync_callback", data);
    }
    function method_preset_w(runtime, data = 255) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_latched_value = ((data) & 0xff);
    }
    function method_preset(runtime, state) {
        const members = runtime.members;
        members.m_latched_value = ((255) & 0xff);
    }
    function method_clear(runtime, state) {
        const members = runtime.members;
        members.m_latched_value = ((0) & 0xff);
    }
    function method_sync_callback(runtime, param) {
        const members = runtime.members;
        let value = ((param) & 0xff);
        if ((((method_is_latch_written(runtime)) && (((((members.m_latched_value ?? 0)) !== (value)) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
        members.m_latched_value = ((value) & 0xff);
        method_set_latch_written(runtime, 1);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "init_callback": method_init_callback,
        "pending_r": method_pending_r,
        "set_latch_written": method_set_latch_written,
        "data_pending_callback": method_data_pending_callback,
        "set_separate_acknowledge": method_set_separate_acknowledge,
        "has_separate_acknowledge": method_has_separate_acknowledge,
        "is_latch_written": method_is_latch_written,
        "generic_latch_base_device::data_pending_callback": method_generic_latch_base_device__data_pending_callback,
        "generic_latch_base_device::set_separate_acknowledge": method_generic_latch_base_device__set_separate_acknowledge,
        "generic_latch_base_device::has_separate_acknowledge": method_generic_latch_base_device__has_separate_acknowledge,
        "generic_latch_base_device::is_latch_written": method_generic_latch_base_device__is_latch_written,
        "write": method_write,
        "preset_w": method_preset_w,
        "preset": method_preset,
        "clear": method_clear,
        "sync_callback": method_sync_callback
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_data_pending_cb"];
export const device = definition;
export default device;
