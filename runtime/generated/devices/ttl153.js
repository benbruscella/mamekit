import deviceData from './ttl153.device.ir.json' with { type: 'json' };
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
    function method_s0_w(runtime, state) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        h_m_s[0] = ((state) ? 1 : 0);
        method_update_a(runtime);
        method_update_b(runtime);
    }
    function method_update_a(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_za_cb"];
        const h_m_ia = members.m_ia ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_z = members.m_z ?? 0;
        let za = ((0) ? 1 : 0);
        za = ((((za) | (((((((h_m_ia[0]) && (((h_m_s[1]) ? 0 : 1))) ? 1 : 0)) && (((h_m_s[0]) ? 0 : 1))) ? 1 : 0)))) ? 1 : 0);
        za = ((((za) | (((((((h_m_ia[1]) && (((h_m_s[1]) ? 0 : 1))) ? 1 : 0)) && (h_m_s[0])) ? 1 : 0)))) ? 1 : 0);
        za = ((((za) | (((((((h_m_ia[2]) && (h_m_s[1])) ? 1 : 0)) && (((h_m_s[0]) ? 0 : 1))) ? 1 : 0)))) ? 1 : 0);
        za = ((((za) | (((((((h_m_ia[3]) && (h_m_s[1])) ? 1 : 0)) && (h_m_s[0])) ? 1 : 0)))) ? 1 : 0);
        if (((Number(za) !== Number(h_m_z[0])) ? 1 : 0)) {
            (__L0 ? __L0(Number(((za) ? (1) : (0)))) : typeof members.m_za_cb === 'function' ? members.m_za_cb(((za) ? (1) : (0))) : runtime.invoke("m_za_cb", ((za) ? (1) : (0))));
        }
        h_m_z[0] = za;
    }
    function method_update_b(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_zb_cb"];
        const h_m_ib = members.m_ib ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_z = members.m_z ?? 0;
        let zb = ((0) ? 1 : 0);
        zb = ((((zb) | (((((((h_m_ib[0]) && (((h_m_s[1]) ? 0 : 1))) ? 1 : 0)) && (((h_m_s[0]) ? 0 : 1))) ? 1 : 0)))) ? 1 : 0);
        zb = ((((zb) | (((((((h_m_ib[1]) && (((h_m_s[1]) ? 0 : 1))) ? 1 : 0)) && (h_m_s[0])) ? 1 : 0)))) ? 1 : 0);
        zb = ((((zb) | (((((((h_m_ib[2]) && (h_m_s[1])) ? 1 : 0)) && (((h_m_s[0]) ? 0 : 1))) ? 1 : 0)))) ? 1 : 0);
        zb = ((((zb) | (((((((h_m_ib[3]) && (h_m_s[1])) ? 1 : 0)) && (h_m_s[0])) ? 1 : 0)))) ? 1 : 0);
        if (((Number(zb) !== Number(h_m_z[1])) ? 1 : 0)) {
            (__L0 ? __L0(Number(((zb) ? (1) : (0)))) : typeof members.m_zb_cb === 'function' ? members.m_zb_cb(((zb) ? (1) : (0))) : runtime.invoke("m_zb_cb", ((zb) ? (1) : (0))));
        }
        h_m_z[1] = zb;
    }
    function method_s1_w(runtime, state) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        h_m_s[1] = ((state) ? 1 : 0);
        method_update_a(runtime);
        method_update_b(runtime);
    }
    function method_i0a_w(runtime, state) {
        const members = runtime.members;
        const h_m_ia = members.m_ia ?? 0;
        h_m_ia[0] = ((state) ? 1 : 0);
        method_update_a(runtime);
    }
    function method_i1a_w(runtime, state) {
        const members = runtime.members;
        const h_m_ia = members.m_ia ?? 0;
        h_m_ia[1] = ((state) ? 1 : 0);
        method_update_a(runtime);
    }
    function method_i2a_w(runtime, state) {
        const members = runtime.members;
        const h_m_ia = members.m_ia ?? 0;
        h_m_ia[2] = ((state) ? 1 : 0);
        method_update_a(runtime);
    }
    function method_i3a_w(runtime, state) {
        const members = runtime.members;
        const h_m_ia = members.m_ia ?? 0;
        h_m_ia[3] = ((state) ? 1 : 0);
        method_update_a(runtime);
    }
    function method_i0b_w(runtime, state) {
        const members = runtime.members;
        const h_m_ib = members.m_ib ?? 0;
        h_m_ib[0] = ((state) ? 1 : 0);
        method_update_b(runtime);
    }
    function method_i1b_w(runtime, state) {
        const members = runtime.members;
        const h_m_ib = members.m_ib ?? 0;
        h_m_ib[1] = ((state) ? 1 : 0);
        method_update_b(runtime);
    }
    function method_i2b_w(runtime, state) {
        const members = runtime.members;
        const h_m_ib = members.m_ib ?? 0;
        h_m_ib[2] = ((state) ? 1 : 0);
        method_update_b(runtime);
    }
    function method_i3b_w(runtime, state) {
        const members = runtime.members;
        const h_m_ib = members.m_ib ?? 0;
        h_m_ib[3] = ((state) ? 1 : 0);
        method_update_b(runtime);
    }
    function method_za_r(runtime) {
        const members = runtime.members;
        const h_m_z = members.m_z ?? 0;
        return ((((h_m_z[0]) ? (1) : (0))) | 0);
    }
    function method_zb_r(runtime) {
        const members = runtime.members;
        const h_m_z = members.m_z ?? 0;
        return ((((h_m_z[1]) ? (1) : (0))) | 0);
    }
    function method_za_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_za_cb(runtime, members.m_za_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_za_cb, "bind"));
    }
    function __deref_za_cb(runtime, p) {
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
    function method_zb_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_zb_cb(runtime, members.m_zb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_zb_cb, "bind"));
    }
    function __deref_zb_cb(runtime, p) {
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
    function method_ttl153_device__za_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ttl153_device__za_cb(runtime, members.m_za_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_za_cb, "bind"));
    }
    function __deref_ttl153_device__za_cb(runtime, p) {
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
    function method_ttl153_device__zb_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ttl153_device__zb_cb(runtime, members.m_zb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_zb_cb, "bind"));
    }
    function __deref_ttl153_device__zb_cb(runtime, p) {
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
        "s0_w": method_s0_w,
        "update_a": method_update_a,
        "update_b": method_update_b,
        "s1_w": method_s1_w,
        "i0a_w": method_i0a_w,
        "i1a_w": method_i1a_w,
        "i2a_w": method_i2a_w,
        "i3a_w": method_i3a_w,
        "i0b_w": method_i0b_w,
        "i1b_w": method_i1b_w,
        "i2b_w": method_i2b_w,
        "i3b_w": method_i3b_w,
        "za_r": method_za_r,
        "zb_r": method_zb_r,
        "za_cb": method_za_cb,
        "zb_cb": method_zb_cb,
        "ttl153_device::za_cb": method_ttl153_device__za_cb,
        "ttl153_device::zb_cb": method_ttl153_device__zb_cb
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_za_cb", "m_zb_cb"];
export const device = definition;
export default device;
