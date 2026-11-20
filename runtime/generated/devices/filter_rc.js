import deviceData from './filter_rc.device.ir.json' with { type: 'json' };
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
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        let memory = (members.m_memory ?? 0);
        if (((Number((members.m_last_sample_rate ?? 0)) !== Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(stream, "sample_rate")))) ? 1 : 0)) {
            method_recalc(runtime);
            members.m_last_sample_rate = (((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.sample_rate === 'function' ? __t1.sample_rate() : typeof __t1.sample_rate === 'number' || typeof __t1.sample_rate === 'boolean' ? __t1.sample_rate : runtime.container(stream, "sample_rate"))) | 0);
        }
        switch ((members.m_type ?? 0)) {
            case 0:
            case 2:
                {
                    for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t2 = __deref_sound_stream_update(runtime, stream), typeof __t2.samples === 'function' ? __t2.samples() : typeof __t2.samples === 'number' || typeof __t2.samples === 'boolean' ? __t2.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                        memory = ((memory) + ((((((__deref_sound_stream_update(runtime, stream).get?.(0, sampindex) ?? 0)) - (memory))) * ((members.m_k ?? 0)))));
                        (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, memory) ?? 0);
                    }
                    break;
                }
            case 3:
            case 4:
                {
                    for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t3 = __deref_sound_stream_update(runtime, stream), typeof __t3.samples === 'function' ? __t3.samples() : typeof __t3.samples === 'number' || typeof __t3.samples === 'boolean' ? __t3.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                        (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, (((__deref_sound_stream_update(runtime, stream).get?.(0, sampindex) ?? 0)) - (memory))) ?? 0);
                        memory = ((memory) + ((((((__deref_sound_stream_update(runtime, stream).get?.(0, sampindex) ?? 0)) - (memory))) * ((members.m_k ?? 0)))));
                    }
                    break;
                }
        }
        members.m_memory = memory;
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
    function method_recalc(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        let __t0;
        let Req = 0;
        switch ((members.m_type ?? 0)) {
            case 0:
                {
                    if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                        members.m_k = 1;
                        members.m_memory = 0;
                        return;
                    }
                    Req = (((((members.m_R1 ?? 0)) * ((((members.m_R2 ?? 0)) + ((members.m_R3 ?? 0)))))) / ((((((members.m_R1 ?? 0)) + ((members.m_R2 ?? 0)))) + ((members.m_R3 ?? 0)))));
                    break;
                }
            case 2:
                {
                    if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                        members.m_k = 1;
                        members.m_memory = 0;
                        return;
                    }
                    Req = (members.m_R1 ?? 0);
                    break;
                }
            case 3:
            case 4:
                {
                    if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                        members.m_k = 0;
                        members.m_memory = 0;
                        return;
                    }
                    Req = (members.m_R1 ?? 0);
                    break;
                }
            default:
                {
                    (__L0 ? __L0("filter_rc_setRC: Wrong filter type %d\n", (members.m_type ?? 0)) : runtime.macro("fatalerror", "filter_rc_setRC: Wrong filter type %d\n", (members.m_type ?? 0)));
                }
        }
        members.m_k = runtime.subtract(1, Math.exp(Number(((((-1) / (((Req) * ((members.m_C ?? 0)))))) / ((__t0 = __deref_recalc(runtime, members.m_stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(members.m_stream, "sample_rate")))))));
    }
    function __deref_recalc(runtime, p) {
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
    function method_set_rc(runtime, type, R1, R2, R3, C) {
        const members = runtime.members;
        members.m_type = ((type) | 0);
        members.m_R1 = R1;
        members.m_R2 = R2;
        members.m_R3 = R3;
        members.m_C = C;
        return (members.this ?? 0);
    }
    function method_set_lowpass(runtime, R, C) {
        const members = runtime.members;
        members.m_type = ((2) | 0);
        members.m_R1 = R;
        members.m_R2 = 0;
        members.m_R3 = 0;
        members.m_C = C;
        return (members.this ?? 0);
    }
    function method_filter_rc_set_RC(runtime, type, R1, R2, R3, C) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_filter_rc_set_RC(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        method_set_rc(runtime, type, R1, R2, R3, C);
        members.m_last_sample_rate = ((0) | 0);
        return (members.this ?? 0);
    }
    function __deref_filter_rc_set_RC(runtime, p) {
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
    function method_set_ac(runtime) {
        const members = runtime.members;
        return method_set_rc(runtime, 4, method_RES_K(runtime, 10), 0, 0, method_CAP_U(runtime, 1));
    }
    function method_RES_K(runtime, res) {
        const members = runtime.members;
        return ((res) * (1000));
    }
    function method_CAP_U(runtime, cap) {
        const members = runtime.members;
        return ((cap) * (0.000001));
    }
    function method_filter_rc_device__set_rc(runtime, type, R1, R2, R3, C) {
        const members = runtime.members;
        members.m_type = ((type) | 0);
        members.m_R1 = R1;
        members.m_R2 = R2;
        members.m_R3 = R3;
        members.m_C = C;
        return (members.this ?? 0);
    }
    function method_filter_rc_device__set_lowpass(runtime, R, C) {
        const members = runtime.members;
        members.m_type = ((2) | 0);
        members.m_R1 = R;
        members.m_R2 = 0;
        members.m_R3 = 0;
        members.m_C = C;
        return (members.this ?? 0);
    }
    function method_filter_rc_device__filter_rc_set_RC(runtime, type, R1, R2, R3, C) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_filter_rc_device__filter_rc_set_RC(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        method_set_rc(runtime, type, R1, R2, R3, C);
        members.m_last_sample_rate = ((0) | 0);
        return (members.this ?? 0);
    }
    function __deref_filter_rc_device__filter_rc_set_RC(runtime, p) {
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
    function method_filter_rc_device__set_ac(runtime) {
        const members = runtime.members;
        return method_set_rc(runtime, 4, method_RES_K(runtime, 10), 0, 0, method_CAP_U(runtime, 1));
    }
    function method_set_rc_(runtime, type, R1, R2, R3, C, __assigned) {
        const members = runtime.members;
        members.m_type = ((type) | 0);
        members.m_R1 = R1;
        members.m_R2 = R2;
        members.m_R3 = R3;
        members.m_C = C;
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method_set_lowpass_(runtime, R, C, __assigned) {
        const members = runtime.members;
        members.m_type = ((2) | 0);
        members.m_R1 = R;
        members.m_R2 = 0;
        members.m_R3 = 0;
        members.m_C = C;
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method_filter_rc_set_RC_(runtime, type, R1, R2, R3, C, __assigned) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_filter_rc_set_RC_(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        method_set_rc(runtime, type, R1, R2, R3, C);
        members.m_last_sample_rate = ((0) | 0);
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function __deref_filter_rc_set_RC_(runtime, p) {
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
    function method_filter_rc_device__set_rc_(runtime, type, R1, R2, R3, C, __assigned) {
        const members = runtime.members;
        members.m_type = ((type) | 0);
        members.m_R1 = R1;
        members.m_R2 = R2;
        members.m_R3 = R3;
        members.m_C = C;
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method_filter_rc_device__set_lowpass_(runtime, R, C, __assigned) {
        const members = runtime.members;
        members.m_type = ((2) | 0);
        members.m_R1 = R;
        members.m_R2 = 0;
        members.m_R3 = 0;
        members.m_C = C;
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method_filter_rc_device__filter_rc_set_RC_(runtime, type, R1, R2, R3, C, __assigned) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_filter_rc_device__filter_rc_set_RC_(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        method_set_rc(runtime, type, R1, R2, R3, C);
        members.m_last_sample_rate = ((0) | 0);
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function __deref_filter_rc_device__filter_rc_set_RC_(runtime, p) {
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
        "sound_stream_update": method_sound_stream_update,
        "recalc": method_recalc,
        "set_rc": method_set_rc,
        "set_lowpass": method_set_lowpass,
        "filter_rc_set_RC": method_filter_rc_set_RC,
        "set_ac": method_set_ac,
        "RES_K": method_RES_K,
        "CAP_U": method_CAP_U,
        "filter_rc_device::set_rc": method_filter_rc_device__set_rc,
        "filter_rc_device::set_lowpass": method_filter_rc_device__set_lowpass,
        "filter_rc_device::filter_rc_set_RC": method_filter_rc_device__filter_rc_set_RC,
        "filter_rc_device::set_ac": method_filter_rc_device__set_ac,
        "set_rc=": method_set_rc_,
        "set_lowpass=": method_set_lowpass_,
        "filter_rc_set_RC=": method_filter_rc_set_RC_,
        "filter_rc_device::set_rc=": method_filter_rc_device__set_rc_,
        "filter_rc_device::set_lowpass=": method_filter_rc_device__set_lowpass_,
        "filter_rc_device::filter_rc_set_RC=": method_filter_rc_device__filter_rc_set_RC_
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["fatalerror"];
export const device = definition;
export default device;
