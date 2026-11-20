import deviceData from './rst_neg_buffer.device.ir.json' with { type: 'json' };
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
    function method_sync_set_input(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_int_cb"];
        if (((((members.m_input_buffer ?? 0)) === (0)) ? 1 : 0)) {
            members.m_input_buffer = ((param) & 0xff);
            (__L0 ? __L0(Number(1)) : typeof members.m_int_cb === 'function' ? members.m_int_cb(1) : runtime.invoke("m_int_cb", 1));
        }
        else {
            members.m_input_buffer = ((((members.m_input_buffer) | (param))) & 0xff);
        }
    }
    function method_sync_clear_input(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_int_cb"];
        if (((((members.m_input_buffer ?? 0)) === (param)) ? 1 : 0)) {
            members.m_input_buffer = ((0) & 0xff);
            (__L0 ? __L0(Number(0)) : typeof members.m_int_cb === 'function' ? members.m_int_cb(0) : runtime.invoke("m_int_cb", 0));
        }
        else {
            members.m_input_buffer = ((((members.m_input_buffer) & ((~param)))) & 0xff);
        }
    }
    function method_int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_int_callback(runtime, members.m_int_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_int_cb, "bind"));
    }
    function __deref_int_callback(runtime, p) {
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
    function method_rst_buffer_device__int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_rst_buffer_device__int_callback(runtime, members.m_int_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_int_cb, "bind"));
    }
    function __deref_rst_buffer_device__int_callback(runtime, p) {
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
    function method_rst30_w(runtime, state) {
        const members = runtime.members;
        method_sync_input(runtime, state, 8);
    }
    function method_sync_input(runtime, state, mask) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        if (state) {
            runtime.synchronize("sync_set_input", mask);
        }
        else {
            runtime.synchronize("sync_clear_input", mask);
        }
    }
    function method_rst28_w(runtime, state) {
        const members = runtime.members;
        method_sync_input(runtime, state, 16);
    }
    function method_rst18_w(runtime, state) {
        const members = runtime.members;
        method_sync_input(runtime, state, 32);
    }
    function method_get_vector(runtime) {
        const members = runtime.members;
        return ((((255) ^ ((members.m_input_buffer ?? 0)))) & 0xff);
    }
    function method_rst_neg_buffer_device__rst30_w(runtime, state) {
        const members = runtime.members;
        method_sync_input(runtime, state, 8);
    }
    function method_rst_neg_buffer_device__rst28_w(runtime, state) {
        const members = runtime.members;
        method_sync_input(runtime, state, 16);
    }
    function method_rst_neg_buffer_device__rst18_w(runtime, state) {
        const members = runtime.members;
        method_sync_input(runtime, state, 32);
    }
    function method_rst_neg_buffer_device__get_vector(runtime) {
        const members = runtime.members;
        return ((((255) ^ ((members.m_input_buffer ?? 0)))) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "sync_set_input": method_sync_set_input,
        "sync_clear_input": method_sync_clear_input,
        "int_callback": method_int_callback,
        "rst_buffer_device::int_callback": method_rst_buffer_device__int_callback,
        "rst30_w": method_rst30_w,
        "sync_input": method_sync_input,
        "rst28_w": method_rst28_w,
        "rst18_w": method_rst18_w,
        "get_vector": method_get_vector,
        "rst_neg_buffer_device::rst30_w": method_rst_neg_buffer_device__rst30_w,
        "rst_neg_buffer_device::rst28_w": method_rst_neg_buffer_device__rst28_w,
        "rst_neg_buffer_device::rst18_w": method_rst_neg_buffer_device__rst18_w,
        "rst_neg_buffer_device::get_vector": method_rst_neg_buffer_device__get_vector
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_int_cb"];
export const device = definition;
export default device;
