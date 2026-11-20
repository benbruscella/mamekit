import deviceData from './ttl74181.device.ir.json' with { type: 'json' };
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
    function method_mode_w(runtime, state) {
        const members = runtime.members;
        if (((((members.m_m ?? 0)) !== (state)) ? 1 : 0)) {
            members.m_m = ((state) | 0);
            method_update(runtime);
        }
    }
    function method_update(runtime) {
        const members = runtime.members;
        let a0 = ((((((members.m_a ?? 0)) >>> (0)) & 1)) | 0);
        let a1 = ((((((members.m_a ?? 0)) >>> (1)) & 1)) | 0);
        let a2 = ((((((members.m_a ?? 0)) >>> (2)) & 1)) | 0);
        let a3 = ((((((members.m_a ?? 0)) >>> (3)) & 1)) | 0);
        let b0 = ((((((members.m_b ?? 0)) >>> (0)) & 1)) | 0);
        let b1 = ((((((members.m_b ?? 0)) >>> (1)) & 1)) | 0);
        let b2 = ((((((members.m_b ?? 0)) >>> (2)) & 1)) | 0);
        let b3 = ((((((members.m_b ?? 0)) >>> (3)) & 1)) | 0);
        let s0 = ((((((members.m_s ?? 0)) >>> (0)) & 1)) | 0);
        let s1 = ((((((members.m_s ?? 0)) >>> (1)) & 1)) | 0);
        let s2 = ((((((members.m_s ?? 0)) >>> (2)) & 1)) | 0);
        let s3 = ((((((members.m_s ?? 0)) >>> (3)) & 1)) | 0);
        let mp = (((((members.m_m ?? 0)) ? 0 : 1)) | 0);
        let ap0 = ((((((((a0) | (((b0) & (s0))))) | (((s1) & ((~b0)))))) ? 0 : 1)) | 0);
        let bp0 = ((((((((((((b0) ? 0 : 1)) & (s2))) & (a0))) | (((((a0) & (b0))) & (s3))))) ? 0 : 1)) | 0);
        let ap1 = ((((((((a1) | (((b1) & (s0))))) | (((s1) & ((~b1)))))) ? 0 : 1)) | 0);
        let bp1 = ((((((((((((b1) ? 0 : 1)) & (s2))) & (a1))) | (((((a1) & (b1))) & (s3))))) ? 0 : 1)) | 0);
        let ap2 = ((((((((a2) | (((b2) & (s0))))) | (((s1) & ((~b2)))))) ? 0 : 1)) | 0);
        let bp2 = ((((((((((((b2) ? 0 : 1)) & (s2))) & (a2))) | (((((a2) & (b2))) & (s3))))) ? 0 : 1)) | 0);
        let ap3 = ((((((((a3) | (((b3) & (s0))))) | (((s1) & ((~b3)))))) ? 0 : 1)) | 0);
        let bp3 = ((((((((((((b3) ? 0 : 1)) & (s2))) & (a3))) | (((((a3) & (b3))) & (s3))))) ? 0 : 1)) | 0);
        let fp0 = (((((((((members.m_c ?? 0)) & (mp))) ? 0 : 1)) ^ (((((ap0) ? 0 : 1)) & (bp0))))) | 0);
        let fp1 = ((((((((((mp) & (ap0))) | (((((mp) & (bp0))) & ((members.m_c ?? 0)))))) ? 0 : 1)) ^ (((((ap1) ? 0 : 1)) & (bp1))))) | 0);
        let fp2 = ((((((((((((mp) & (ap1))) | (((((mp) & (ap0))) & (bp1))))) | (((((((mp) & ((members.m_c ?? 0)))) & (bp0))) & (bp1))))) ? 0 : 1)) ^ (((((ap2) ? 0 : 1)) & (bp2))))) | 0);
        let fp3 = ((((((((((((((mp) & (ap2))) | (((((mp) & (ap1))) & (bp2))))) | (((((((mp) & (ap0))) & (bp1))) & (bp2))))) | (((((((((mp) & ((members.m_c ?? 0)))) & (bp0))) & (bp1))) & (bp2))))) ? 0 : 1)) ^ (((((ap3) ? 0 : 1)) & (bp3))))) | 0);
        members.m_f = ((((((((fp0) | (((fp1) << (1))))) | (((fp2) << (2))))) | (((fp3) << (3))))) & 0xff);
        members.m_equals = ((((((((fp0) & (fp1))) & (fp2))) & (fp3))) | 0);
        members.m_p = ((((((((((bp0) & (bp1))) & (bp2))) & (bp3))) ? 0 : 1)) | 0);
        members.m_g = ((((((((((((((((ap0) & (bp1))) & (bp2))) & (bp3))) | (((((ap1) & (bp2))) & (bp3))))) | (((ap2) & (bp3))))) | (ap3))) ? 0 : 1)) | 0);
        members.m_cn = (((((((((((((((members.m_c ?? 0)) & (bp0))) & (bp1))) & (bp2))) & (bp3))) ? 0 : 1)) | ((members.m_g ?? 0)))) | 0);
    }
    function method_carry_w(runtime, state) {
        const members = runtime.members;
        if (((((members.m_c ?? 0)) !== (state)) ? 1 : 0)) {
            members.m_c = ((state) | 0);
            method_update(runtime);
        }
    }
    function method_function_r(runtime) {
        const members = runtime.members;
        return (((members.m_f ?? 0)) & 0xff);
    }
    function method_carry_r(runtime) {
        const members = runtime.members;
        return (((members.m_cn ?? 0)) | 0);
    }
    function method_generate_r(runtime) {
        const members = runtime.members;
        return (((members.m_g ?? 0)) | 0);
    }
    function method_propagate_r(runtime) {
        const members = runtime.members;
        return (((members.m_p ?? 0)) | 0);
    }
    function method_equals_r(runtime) {
        const members = runtime.members;
        return (((members.m_equals ?? 0)) | 0);
    }
    function method_ttl74181_device__function_r(runtime) {
        const members = runtime.members;
        return (((members.m_f ?? 0)) & 0xff);
    }
    function method_ttl74181_device__carry_r(runtime) {
        const members = runtime.members;
        return (((members.m_cn ?? 0)) | 0);
    }
    function method_ttl74181_device__generate_r(runtime) {
        const members = runtime.members;
        return (((members.m_g ?? 0)) | 0);
    }
    function method_ttl74181_device__propagate_r(runtime) {
        const members = runtime.members;
        return (((members.m_p ?? 0)) | 0);
    }
    function method_ttl74181_device__equals_r(runtime) {
        const members = runtime.members;
        return (((members.m_equals ?? 0)) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "mode_w": method_mode_w,
        "update": method_update,
        "carry_w": method_carry_w,
        "function_r": method_function_r,
        "carry_r": method_carry_r,
        "generate_r": method_generate_r,
        "propagate_r": method_propagate_r,
        "equals_r": method_equals_r,
        "ttl74181_device::function_r": method_ttl74181_device__function_r,
        "ttl74181_device::carry_r": method_ttl74181_device__carry_r,
        "ttl74181_device::generate_r": method_ttl74181_device__generate_r,
        "ttl74181_device::propagate_r": method_ttl74181_device__propagate_r,
        "ttl74181_device::equals_r": method_ttl74181_device__equals_r
    };
    return __methodTable;
})();
export const device = definition;
export default device;
