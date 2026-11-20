import deviceData from './pls100.device.ir.json' with { type: 'json' };
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
        method_set_num_inputs(runtime, 16);
        method_set_num_outputs(runtime, 8);
        method_set_num_terms(runtime, 48);
        if (runtime.wide("==", (members.m_input_mask ?? 0), 0)) {
            members.m_input_mask = runtime.wide("-", runtime.wide("<<", 1, (members.m_inputs ?? 0)), 1);
        }
        members.m_input_mask = runtime.wide("|", runtime.wide("<<", (members.m_input_mask ?? 0), 32), (members.m_input_mask ?? 0));
        members.m_cache_size = ((((1) << (((((Number((members.m_inputs ?? 0)) > Number(20)) ? 1 : 0)) ? (20) : ((members.m_inputs ?? 0)))))) | 0);
        (members.m_cache = runtime.resize(members.m_cache, (members.m_cache_size ?? 0)));
        method_reinit(runtime);
    }
    function method_set_num_inputs(runtime, i) {
        const members = runtime.members;
        members.m_inputs = ((i) >>> 0);
    }
    function method_set_num_outputs(runtime, o) {
        const members = runtime.members;
        members.m_outputs = ((o) >>> 0);
    }
    function method_set_num_terms(runtime, t) {
        const members = runtime.members;
        members.m_terms = ((t) >>> 0);
    }
    function method_reinit(runtime) {
        const members = runtime.members;
        const h_m_cache2 = members.m_cache2 ?? 0;
        let result = ((method_parse_fusemap(runtime)) | 0);
        members.m_cache2_ptr = ((0) & 0xff);
        for (let __range0 = h_m_cache2, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            runtime.writeIndex(__range0, __range0_index, 2147483648);
        }
        let csize = (((members.m_cache_size ?? 0)) | 0);
        members.m_cache_size = ((0) | 0);
        for (let i = ((0) | 0); (((i) < (csize)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.writeIndex(runtime.writableMember("m_cache"), i, method_read(runtime, i));
        }
        members.m_cache_size = ((csize) | 0);
        return ((Number(result) === Number(0)) ? 1 : 0);
    }
    function method_parse_fusemap(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        const h_m_term = members.m_term ?? 0;
        let result = ((0) | 0);
        let fusenum = ((0) >>> 0);
        for (let p = ((0) | 0); (((p) < ((members.m_terms ?? 0))) ? 1 : 0); p = ((((p) + (1))) | 0)) {
            let term = __addr_parse_fusemap(runtime, h_m_term, p);
            let __pointee_term = __deref_parse_fusemap(runtime, term);
            __pointee_term.and_mask = 0;
            for (let i = ((0) | 0); (((i) < ((members.m_inputs ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                __pointee_term.and_mask = runtime.wide("|", __pointee_term.and_mask, runtime.wide("<<", runtime.invoke("jed_get_fuse", (__t0 = fusenum, fusenum = ((((fusenum) + (1))) >>> 0), __t0)), ((i) + (32))));
                __pointee_term.and_mask = runtime.wide("|", __pointee_term.and_mask, runtime.wide("<<", runtime.invoke("jed_get_fuse", (__t1 = fusenum, fusenum = ((((fusenum) + (1))) >>> 0), __t1)), i));
            }
            __pointee_term.or_mask = 0;
            for (let f = ((0) | 0); (((f) < ((members.m_outputs ?? 0))) ? 1 : 0); f = ((((f) + (1))) | 0)) {
                __pointee_term.or_mask = runtime.wide("|", __pointee_term.or_mask, ((((runtime.invoke("jed_get_fuse", (__t2 = fusenum, fusenum = ((((fusenum) + (1))) >>> 0), __t2))) ? 0 : 1)) << (f)));
            }
            __pointee_term.or_mask = runtime.wide("<<", __pointee_term.or_mask, 32);
            0;
        }
        members.m_xor = 0;
        for (let f = ((0) | 0); (((f) < ((members.m_outputs ?? 0))) ? 1 : 0); f = ((((f) + (1))) | 0)) {
            members.m_xor = runtime.wide("|", (members.m_xor ?? 0), ((runtime.invoke("jed_get_fuse", (__t3 = fusenum, fusenum = ((((fusenum) + (1))) >>> 0), __t3))) << (f)));
        }
        members.m_xor = runtime.wide("<<", (members.m_xor ?? 0), 32);
        0;
        return ((result) | 0);
    }
    function __addr_parse_fusemap(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_parse_fusemap(runtime, p) {
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
    function method_read(runtime, input) {
        const members = runtime.members;
        const h_m_cache2 = members.m_cache2 ?? 0;
        const h_m_term = members.m_term ?? 0;
        if ((((input) < ((members.m_cache_size ?? 0))) ? 1 : 0)) {
            return ((runtime.readIndex((members.m_cache ?? 0), input)) >>> 0);
        }
        for (let __range0 = h_m_cache2, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            if ((((((__range0_item) >>> 0)) === (input)) ? 1 : 0)) {
                return ((runtime.low32(runtime.wide(">>", __range0_item, 32))) >>> 0);
            }
        }
        let inputs = runtime.wide("&", runtime.wide("|", runtime.wide("<<", runtime.wide("^", ((input) >>> 0), 18446744073709551615n), 32), input), (members.m_input_mask ?? 0));
        let s = 0;
        for (let i = ((0) | 0); (((i) < ((members.m_terms ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let term = __addr_read(runtime, h_m_term, i);
            let __pointee_term = __deref_read(runtime, term);
            if (runtime.wide("==", runtime.wide("|", __pointee_term.and_mask, inputs), (members.m_input_mask ?? 0))) {
                s = runtime.wide("|", s, __pointee_term.or_mask);
            }
        }
        s = runtime.wide("^", s, (members.m_xor ?? 0));
        h_m_cache2[(members.m_cache2_ptr ?? 0)] = runtime.wide("|", s, ((input) >>> 0));
        let __mame_assignment_128 = 7;
        members.m_cache2_ptr = ((((members.m_cache2_ptr) + (1))) & 0xff);
        members.m_cache2_ptr = ((((members.m_cache2_ptr) & (__mame_assignment_128))) & 0xff);
        return ((runtime.low32(runtime.wide(">>", s, 32))) >>> 0);
    }
    function __addr_read(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
    function method_set_inputmask(runtime, mask) {
        const members = runtime.members;
        members.m_input_mask = mask;
    }
    function method_set_format(runtime, format) {
        const members = runtime.members;
        members.m_format = format;
    }
    function method_inputs(runtime) {
        const members = runtime.members;
        return (((members.m_inputs ?? 0)) >>> 0);
    }
    function method_outputs(runtime) {
        const members = runtime.members;
        return (((members.m_outputs ?? 0)) >>> 0);
    }
    function method_pla_device__set_num_inputs(runtime, i) {
        const members = runtime.members;
        members.m_inputs = ((i) >>> 0);
    }
    function method_pla_device__set_num_outputs(runtime, o) {
        const members = runtime.members;
        members.m_outputs = ((o) >>> 0);
    }
    function method_pla_device__set_num_terms(runtime, t) {
        const members = runtime.members;
        members.m_terms = ((t) >>> 0);
    }
    function method_pla_device__set_inputmask(runtime, mask) {
        const members = runtime.members;
        members.m_input_mask = mask;
    }
    function method_pla_device__set_format(runtime, format) {
        const members = runtime.members;
        members.m_format = format;
    }
    function method_pla_device__inputs(runtime) {
        const members = runtime.members;
        return (((members.m_inputs ?? 0)) >>> 0);
    }
    function method_pla_device__outputs(runtime) {
        const members = runtime.members;
        return (((members.m_outputs ?? 0)) >>> 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "set_num_inputs": method_set_num_inputs,
        "set_num_outputs": method_set_num_outputs,
        "set_num_terms": method_set_num_terms,
        "reinit": method_reinit,
        "parse_fusemap": method_parse_fusemap,
        "read": method_read,
        "set_inputmask": method_set_inputmask,
        "set_format": method_set_format,
        "inputs": method_inputs,
        "outputs": method_outputs,
        "pla_device::set_num_inputs": method_pla_device__set_num_inputs,
        "pla_device::set_num_outputs": method_pla_device__set_num_outputs,
        "pla_device::set_num_terms": method_pla_device__set_num_terms,
        "pla_device::set_inputmask": method_pla_device__set_inputmask,
        "pla_device::set_format": method_pla_device__set_format,
        "pla_device::inputs": method_pla_device__inputs,
        "pla_device::outputs": method_pla_device__outputs
    };
    return __methodTable;
})();
export const device = definition;
export default device;
