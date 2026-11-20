import deviceData from './filter_biquad.device.ir.json' with { type: 'json' };
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
    function method_setup_raw(runtime, a1, a2, b0, b1, b2) {
        const members = runtime.members;
        members.m_type = 9;
        members.m_a1 = a1;
        members.m_a2 = a2;
        members.m_b0 = b0;
        members.m_b1 = b1;
        members.m_b2 = b2;
        return (members.this ?? 0);
    }
    function method_modify_raw(runtime, a1, a2, b0, b1, b2) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_modify_raw(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_type = 9;
        members.m_a1 = a1;
        members.m_a2 = a2;
        members.m_b0 = b0;
        members.m_b1 = b1;
        members.m_b2 = b2;
        method_recalc(runtime);
    }
    function __deref_modify_raw(runtime, p) {
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
        let __t0, __t1, __t2, __t3;
        0;
        if (((Number((members.m_type ?? 0)) === Number(9)) ? 1 : 0)) {
            return;
        }
        0;
        0;
        0;
        if (((Number((members.m_fc ?? 0)) >= Number((((__t0 = __deref_recalc(runtime, members.m_stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(members.m_stream, "sample_rate"))) / (2)))) ? 1 : 0)) {
            switch ((members.m_type ?? 0)) {
                default:
                    {
                        members.m_b0 = 1;
                        break;
                    }
                case 1:
                case 10:
                case 3:
                case 4:
                case 6:
                case 8:
                    {
                        members.m_b0 = 0;
                        break;
                    }
            }
            members.m_a1 = (members.m_a2 = 0);
            members.m_b1 = (members.m_b2 = 0);
            0;
            0;
        }
        else {
            let MGain = Math.abs(Number((members.m_gain ?? 0)));
            let DBGain = ((Math.log10(Number(MGain))) * (20));
            let AMGain = Math.pow(Number(10), Number(((Math.abs(Number(DBGain))) / (20))));
            let K = Math.tan(Number(((((3.141592653589793) * ((members.m_fc ?? 0)))) / ((__t1 = __deref_recalc(runtime, members.m_stream), typeof __t1.sample_rate === 'function' ? __t1.sample_rate() : typeof __t1.sample_rate === 'number' || typeof __t1.sample_rate === 'boolean' ? __t1.sample_rate : runtime.container(members.m_stream, "sample_rate"))))));
            let Ksquared = ((K) * (K));
            let KoverQ = ((K) / ((members.m_q ?? 0)));
            let normal = ((1) / (((((1) + (KoverQ))) + (Ksquared))));
            switch ((members.m_type ?? 0)) {
                case 0:
                    {
                        members.m_a1 = Math.exp(Number((((((-2)) * (3.141592653589793))) * ((((members.m_fc ?? 0)) / ((__t2 = __deref_recalc(runtime, members.m_stream), typeof __t2.sample_rate === 'function' ? __t2.sample_rate() : typeof __t2.sample_rate === 'number' || typeof __t2.sample_rate === 'boolean' ? __t2.sample_rate : runtime.container(members.m_stream, "sample_rate"))))))));
                        members.m_b0 = ((1) - ((members.m_a1 ?? 0)));
                        members.m_a1 = (-(members.m_a1 ?? 0));
                        members.m_b1 = (members.m_b2 = (members.m_a2 = 0));
                        break;
                    }
                case 1:
                    {
                        members.m_a1 = (-Math.exp(Number((((((-2)) * (3.141592653589793))) * (((0.5) - ((((members.m_fc ?? 0)) / ((__t3 = __deref_recalc(runtime, members.m_stream), typeof __t3.sample_rate === 'function' ? __t3.sample_rate() : typeof __t3.sample_rate === 'number' || typeof __t3.sample_rate === 'boolean' ? __t3.sample_rate : runtime.container(members.m_stream, "sample_rate")))))))))));
                        members.m_b0 = ((1) + ((members.m_a1 ?? 0)));
                        members.m_a1 = (-(members.m_a1 ?? 0));
                        members.m_b1 = (members.m_b2 = (members.m_a2 = 0));
                        break;
                    }
                case 10:
                    {
                        normal = ((1) / (((K) + (1))));
                        members.m_b0 = normal;
                        members.m_b1 = (-normal);
                        members.m_a1 = ((((K) - (1))) * (normal));
                        members.m_b2 = (members.m_a2 = 0);
                        break;
                    }
                case 2:
                    {
                        members.m_b0 = ((Ksquared) * (normal));
                        members.m_b1 = ((2) * ((members.m_b0 ?? 0)));
                        members.m_b2 = ((1) * ((members.m_b0 ?? 0)));
                        members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                        members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        break;
                    }
                case 3:
                    {
                        members.m_b0 = ((1) * (normal));
                        members.m_b1 = (((-2)) * ((members.m_b0 ?? 0)));
                        members.m_b2 = ((1) * ((members.m_b0 ?? 0)));
                        members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                        members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        break;
                    }
                case 4:
                    {
                        members.m_b0 = ((KoverQ) * (normal));
                        members.m_b1 = 0;
                        members.m_b2 = (((-1)) * ((members.m_b0 ?? 0)));
                        members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                        members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        break;
                    }
                case 5:
                    {
                        members.m_b0 = ((((1) + (Ksquared))) * (normal));
                        members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                        members.m_b2 = ((1) * ((members.m_b0 ?? 0)));
                        members.m_a1 = ((1) * ((members.m_b1 ?? 0)));
                        members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        break;
                    }
                case 6:
                    {
                        if ((((DBGain) >= (0)) ? 1 : 0)) {
                            members.m_b0 = ((((__add_recalc(runtime, 1, ((AMGain) * (KoverQ)))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_b2 = ((((((1) - (((AMGain) * (KoverQ))))) + (Ksquared))) * (normal));
                            members.m_a1 = ((1) * ((members.m_b1 ?? 0)));
                            members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        }
                        else {
                            normal = ((1) / (((__add_recalc(runtime, 1, ((AMGain) * (KoverQ)))) + (Ksquared))));
                            members.m_b0 = ((((((1) + (KoverQ))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_b2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                            members.m_a1 = ((1) * ((members.m_b1 ?? 0)));
                            members.m_a2 = ((((((1) - (((AMGain) * (KoverQ))))) + (Ksquared))) * (normal));
                        }
                        break;
                    }
                case 7:
                    {
                        if ((((DBGain) >= (0)) ? 1 : 0)) {
                            normal = ((1) / (((__add_recalc(runtime, 1, ((1.4142135623730951) * (K)))) + (Ksquared))));
                            members.m_b0 = ((__add_recalc(runtime, __add_recalc(runtime, 1, ((Math.sqrt(Number(((2) * (AMGain))))) * (K))), ((AMGain) * (Ksquared)))) * (normal));
                            members.m_b1 = ((((2) * (((((AMGain) * (Ksquared))) - (1))))) * (normal));
                            members.m_b2 = ((__add_recalc(runtime, ((1) - (((Math.sqrt(Number(((2) * (AMGain))))) * (K)))), ((AMGain) * (Ksquared)))) * (normal));
                            members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_a2 = ((((((1) - (((1.4142135623730951) * (K))))) + (Ksquared))) * (normal));
                        }
                        else {
                            normal = ((1) / (__add_recalc(runtime, __add_recalc(runtime, 1, ((Math.sqrt(Number(((2) * (AMGain))))) * (K))), ((AMGain) * (Ksquared)))));
                            members.m_b0 = ((((__add_recalc(runtime, 1, ((1.4142135623730951) * (K)))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_b2 = ((((((1) - (((1.4142135623730951) * (K))))) + (Ksquared))) * (normal));
                            members.m_a1 = ((((2) * (((((AMGain) * (Ksquared))) - (1))))) * (normal));
                            members.m_a2 = ((__add_recalc(runtime, ((1) - (((Math.sqrt(Number(((2) * (AMGain))))) * (K)))), ((AMGain) * (Ksquared)))) * (normal));
                        }
                        break;
                    }
                case 8:
                    {
                        if ((((DBGain) >= (0)) ? 1 : 0)) {
                            normal = ((1) / (((__add_recalc(runtime, 1, ((1.4142135623730951) * (K)))) + (Ksquared))));
                            members.m_b0 = ((((((AMGain) + (((Math.sqrt(Number(((2) * (AMGain))))) * (K))))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (AMGain))))) * (normal));
                            members.m_b2 = ((((((AMGain) - (((Math.sqrt(Number(((2) * (AMGain))))) * (K))))) + (Ksquared))) * (normal));
                            members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_a2 = ((((((1) - (((1.4142135623730951) * (K))))) + (Ksquared))) * (normal));
                        }
                        else {
                            normal = ((1) / (((((AMGain) + (((Math.sqrt(Number(((2) * (AMGain))))) * (K))))) + (Ksquared))));
                            members.m_b0 = ((((__add_recalc(runtime, 1, ((1.4142135623730951) * (K)))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_b2 = ((((((1) - (((1.4142135623730951) * (K))))) + (Ksquared))) * (normal));
                            members.m_a1 = ((((2) * (((Ksquared) - (AMGain))))) * (normal));
                            members.m_a2 = ((((((AMGain) - (((Math.sqrt(Number(((2) * (AMGain))))) * (K))))) + (Ksquared))) * (normal));
                        }
                        break;
                    }
                default:
                    {
                        (__L0 ? __L0("filter_biquad_device::recalc() - Invalid filter type!") : runtime.macro("fatalerror", "filter_biquad_device::recalc() - Invalid filter type!"));
                        break;
                    }
            }
            0;
            0;
            0;
            0;
            0;
            0;
            0;
            0;
            0;
        }
        if (((((((((Number((members.m_type ?? 0)) !== Number(6)) ? 1 : 0)) && (((Number((members.m_type ?? 0)) !== Number(7)) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_type ?? 0)) !== Number(8)) ? 1 : 0))) ? 1 : 0)) {
            members.m_b0 = ((members.m_b0) * ((members.m_gain ?? 0)));
            members.m_b1 = ((members.m_b1) * ((members.m_gain ?? 0)));
            members.m_b2 = ((members.m_b2) * ((members.m_gain ?? 0)));
            0;
            0;
            0;
        }
    }
    function __add_recalc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method_opamp_sk_lphp_calc(runtime, type, r1, r2, r3, r4, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"], __L1 = __l["fatalerror"];
        let r = (__L0 ? __L0("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        if (((((((((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((r3) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((r4) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L1 ? __L1("filter_biquad_device::opamp_sk_lphp_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, r3: %f, r4: %f, c1: %f, c2: %f", r1, r2, r3, r4, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::opamp_sk_lphp_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, r3: %f, r4: %f, c1: %f, c2: %f", r1, r2, r3, r4, c1, c2));
        }
        r.type = type;
        r.gain = __add_opamp_sk_lphp_calc(runtime, 1, ((r4) / (r3)));
        r.fc = ((1) / (((((2) * (3.141592653589793))) * (Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))))))));
        if (((Number(type) === Number(2)) ? 1 : 0)) {
            r.q = ((Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))))) / (__add_opamp_sk_lphp_calc(runtime, __add_opamp_sk_lphp_calc(runtime, ((r1) * (c2)), ((r2) * (c2))), ((((r1) * (c1))) * (((1) - (r.gain)))))));
        }
        else {
            if (((Number(type) === Number(3)) ? 1 : 0)) {
                r.q = ((Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))))) / (__add_opamp_sk_lphp_calc(runtime, __add_opamp_sk_lphp_calc(runtime, ((r1) * (c2)), ((r1) * (c1))), ((((r2) * (c2))) * (((1) - (r.gain)))))));
            }
            else {
                r.q = ((1.4142135623730951) / (2));
            }
        }
        return r;
    }
    function __add_opamp_sk_lphp_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_filter_biquad_device__opamp_sk_lphp_calc(runtime, type, r1, r2, r3, r4, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"], __L1 = __l["fatalerror"];
        let r = (__L0 ? __L0("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        if (((((((((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((r3) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((r4) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L1 ? __L1("filter_biquad_device::opamp_sk_lphp_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, r3: %f, r4: %f, c1: %f, c2: %f", r1, r2, r3, r4, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::opamp_sk_lphp_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, r3: %f, r4: %f, c1: %f, c2: %f", r1, r2, r3, r4, c1, c2));
        }
        r.type = type;
        r.gain = __add_filter_biquad_device__opamp_sk_lphp_calc(runtime, 1, ((r4) / (r3)));
        r.fc = ((1) / (((((2) * (3.141592653589793))) * (Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))))))));
        if (((Number(type) === Number(2)) ? 1 : 0)) {
            r.q = ((Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))))) / (__add_filter_biquad_device__opamp_sk_lphp_calc(runtime, __add_filter_biquad_device__opamp_sk_lphp_calc(runtime, ((r1) * (c2)), ((r2) * (c2))), ((((r1) * (c1))) * (((1) - (r.gain)))))));
        }
        else {
            if (((Number(type) === Number(3)) ? 1 : 0)) {
                r.q = ((Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))))) / (__add_filter_biquad_device__opamp_sk_lphp_calc(runtime, __add_filter_biquad_device__opamp_sk_lphp_calc(runtime, ((r1) * (c2)), ((r1) * (c1))), ((((r2) * (c2))) * (((1) - (r.gain)))))));
            }
            else {
                r.q = ((1.4142135623730951) / (2));
            }
        }
        return r;
    }
    function __add_filter_biquad_device__opamp_sk_lphp_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opamp_sk_lowpass_setup(runtime, r1, r2, r3, r4, c1, c2) {
        const members = runtime.members;
        let p = method_opamp_sk_lphp_calc(runtime, 2, r1, r2, r3, r4, c1, c2);
        return method_setup__1(runtime, p);
    }
    function method_setup__1(runtime, p) {
        const members = runtime.members;
        members.m_type = p.type;
        members.m_fc = p.fc;
        members.m_q = p.q;
        members.m_gain = p.gain;
        return (members.this ?? 0);
    }
    function method_opamp_sk_lowpass_modify(runtime, r1, r2, r3, r4, c1, c2) {
        const members = runtime.members;
        let p = method_opamp_sk_lphp_calc(runtime, 2, r1, r2, r3, r4, c1, c2);
        method_modify__1(runtime, p);
    }
    function method_modify__1(runtime, p) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_modify__1(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_type = p.type;
        members.m_fc = p.fc;
        members.m_q = p.q;
        members.m_gain = p.gain;
        method_recalc(runtime);
    }
    function __deref_modify__1(runtime, p) {
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
    function method_opamp_sk_highpass_setup(runtime, r1, r2, r3, r4, c1, c2) {
        const members = runtime.members;
        let p = method_opamp_sk_lphp_calc(runtime, 3, r1, r2, r3, r4, c1, c2);
        return method_setup__1(runtime, p);
    }
    function method_opamp_sk_highpass_modify(runtime, r1, r2, r3, r4, c1, c2) {
        const members = runtime.members;
        let p = method_opamp_sk_lphp_calc(runtime, 3, r1, r2, r3, r4, c1, c2);
        method_modify__1(runtime, p);
    }
    function method_opamp_mfb_lowpass_setup(runtime, r1, r2, r3, c1, c2) {
        const members = runtime.members;
        let p = method_opamp_mfb_lowpass_calc(runtime, r1, r2, r3, c1, c2);
        return method_setup__1(runtime, p);
    }
    function method_opamp_mfb_lowpass_calc(runtime, r1, r2, r3, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"], __L1 = __l["fatalerror"];
        let r = (__L0 ? __L0("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        if (((((((((((((r1) === (0)) ? 1 : 0)) || (((((((r2) === (0)) ? 1 : 0)) && ((((c1) !== (0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) || ((((r3) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L1 ? __L1("filter_biquad_device::opamp_mfb_lowpass_calc() - only c1 can be 0 (and if c1 is 0, r2 can also be 0); parameters were: r1: %f, r2: %f, r3: %f, c1: %f, c2: %f", r1, r2, r3, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::opamp_mfb_lowpass_calc() - only c1 can be 0 (and if c1 is 0, r2 can also be 0); parameters were: r1: %f, r2: %f, r3: %f, c1: %f, c2: %f", r1, r2, r3, c1, c2));
        }
        r.gain = (((-r3)) / (r1));
        r.q = ((1.4142135623730951) / (2));
        if ((((c1) === (0)) ? 1 : 0)) {
            r.fc = ((((r1) * (r3))) / (((((((((2) * (3.141592653589793))) * (__add_opamp_mfb_lowpass_calc(runtime, __add_opamp_mfb_lowpass_calc(runtime, ((r1) * (r2)), ((r1) * (r3))), ((r2) * (r3)))))) * (r3))) * (c2))));
            r.type = 0;
        }
        else {
            r.fc = ((1) / (((((2) * (3.141592653589793))) * (Math.sqrt(Number(((((((r2) * (r3))) * (c1))) * (c2))))))));
            r.q = ((Math.sqrt(Number(((((((r2) * (r3))) * (c1))) * (c2))))) / (__add_opamp_mfb_lowpass_calc(runtime, __add_opamp_mfb_lowpass_calc(runtime, ((r3) * (c2)), ((r2) * (c2))), ((((r2) * (c2))) * ((-r.gain))))));
            r.type = 2;
        }
        0;
        return r;
    }
    function __add_opamp_mfb_lowpass_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opamp_mfb_lowpass_modify(runtime, r1, r2, r3, c1, c2) {
        const members = runtime.members;
        let p = method_opamp_mfb_lowpass_calc(runtime, r1, r2, r3, c1, c2);
        method_modify__1(runtime, p);
    }
    function method_filter_biquad_device__opamp_mfb_lowpass_calc(runtime, r1, r2, r3, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"], __L1 = __l["fatalerror"];
        let r = (__L0 ? __L0("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        if (((((((((((((r1) === (0)) ? 1 : 0)) || (((((((r2) === (0)) ? 1 : 0)) && ((((c1) !== (0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) || ((((r3) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L1 ? __L1("filter_biquad_device::opamp_mfb_lowpass_calc() - only c1 can be 0 (and if c1 is 0, r2 can also be 0); parameters were: r1: %f, r2: %f, r3: %f, c1: %f, c2: %f", r1, r2, r3, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::opamp_mfb_lowpass_calc() - only c1 can be 0 (and if c1 is 0, r2 can also be 0); parameters were: r1: %f, r2: %f, r3: %f, c1: %f, c2: %f", r1, r2, r3, c1, c2));
        }
        r.gain = (((-r3)) / (r1));
        r.q = ((1.4142135623730951) / (2));
        if ((((c1) === (0)) ? 1 : 0)) {
            r.fc = ((((r1) * (r3))) / (((((((((2) * (3.141592653589793))) * (__add_filter_biquad_device__opamp_mfb_lowpass_calc(runtime, __add_filter_biquad_device__opamp_mfb_lowpass_calc(runtime, ((r1) * (r2)), ((r1) * (r3))), ((r2) * (r3)))))) * (r3))) * (c2))));
            r.type = 0;
        }
        else {
            r.fc = ((1) / (((((2) * (3.141592653589793))) * (Math.sqrt(Number(((((((r2) * (r3))) * (c1))) * (c2))))))));
            r.q = ((Math.sqrt(Number(((((((r2) * (r3))) * (c1))) * (c2))))) / (__add_filter_biquad_device__opamp_mfb_lowpass_calc(runtime, __add_filter_biquad_device__opamp_mfb_lowpass_calc(runtime, ((r3) * (c2)), ((r2) * (c2))), ((((r2) * (c2))) * ((-r.gain))))));
            r.type = 2;
        }
        0;
        return r;
    }
    function __add_filter_biquad_device__opamp_mfb_lowpass_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opamp_mfb_bandpass_setup(runtime, r1, r2, r3, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        if ((((((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((r3) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0("filter_biquad_device::opamp_mfb_bandpass_setup() - no parameters can be 0; parameters were: r1: %f, r2: %f, r3: %f, c1: %f, c2: %f", r1, r2, r3, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::opamp_mfb_bandpass_setup() - no parameters can be 0; parameters were: r1: %f, r2: %f, r3: %f, c1: %f, c2: %f", r1, r2, r3, c1, c2));
        }
        let r_in = ((1) / (__add_opamp_mfb_bandpass_setup(runtime, ((1) / (r1)), ((1) / (r2)))));
        let gain = ((((r3) / (r1))) * ((((-c2)) / (((c1) + (c2))))));
        let q = ((Math.sqrt(Number(((((((r3) / (r_in))) * (c1))) * (c2))))) / (((c1) + (c2))));
        let fc = ((1) / (((((2) * (3.141592653589793))) * (Math.sqrt(Number(((((((r_in) * (r3))) * (c1))) * (c2))))))));
        0;
        return method_setup__4(runtime, 4, fc, q, gain);
    }
    function __add_opamp_mfb_bandpass_setup(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_setup__4(runtime, type, fc, q, gain) {
        const members = runtime.members;
        members.m_type = type;
        members.m_fc = fc;
        members.m_q = q;
        members.m_gain = gain;
        return (members.this ?? 0);
    }
    function method_filter_biquad_device__opamp_mfb_bandpass_setup(runtime, r1, r2, r3, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        if ((((((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((r3) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0("filter_biquad_device::opamp_mfb_bandpass_setup() - no parameters can be 0; parameters were: r1: %f, r2: %f, r3: %f, c1: %f, c2: %f", r1, r2, r3, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::opamp_mfb_bandpass_setup() - no parameters can be 0; parameters were: r1: %f, r2: %f, r3: %f, c1: %f, c2: %f", r1, r2, r3, c1, c2));
        }
        let r_in = ((1) / (__add_filter_biquad_device__opamp_mfb_bandpass_setup(runtime, ((1) / (r1)), ((1) / (r2)))));
        let gain = ((((r3) / (r1))) * ((((-c2)) / (((c1) + (c2))))));
        let q = ((Math.sqrt(Number(((((((r3) / (r_in))) * (c1))) * (c2))))) / (((c1) + (c2))));
        let fc = ((1) / (((((2) * (3.141592653589793))) * (Math.sqrt(Number(((((((r_in) * (r3))) * (c1))) * (c2))))))));
        0;
        return method_setup__4(runtime, 4, fc, q, gain);
    }
    function __add_filter_biquad_device__opamp_mfb_bandpass_setup(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opamp_mfb_highpass_setup(runtime, r1, r2, c1, c2, c3) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        if ((((((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c3) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0("filter_biquad_device::opamp_mfb_highpass_setup() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f, c3: %f", r1, r2, c1, c2, c3) : runtime.macro("fatalerror", "filter_biquad_device::opamp_mfb_highpass_setup() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f, c3: %f", r1, r2, c1, c2, c3));
        }
        let gain = (((-c1)) / (c3));
        let fc = ((1) / (((((2) * (3.141592653589793))) * (Math.sqrt(Number(((((((c2) * (c3))) * (r1))) * (r2))))))));
        let q = ((Math.sqrt(Number(((((((c2) * (c3))) * (r1))) * (r2))))) / (__add_opamp_mfb_highpass_setup(runtime, __add_opamp_mfb_highpass_setup(runtime, ((c2) * (r1)), ((c3) * (r1))), ((((c3) * (r1))) * ((-gain))))));
        0;
        return method_setup__4(runtime, 3, fc, q, gain);
    }
    function __add_opamp_mfb_highpass_setup(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_filter_biquad_device__opamp_mfb_highpass_setup(runtime, r1, r2, c1, c2, c3) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        if ((((((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c3) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0("filter_biquad_device::opamp_mfb_highpass_setup() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f, c3: %f", r1, r2, c1, c2, c3) : runtime.macro("fatalerror", "filter_biquad_device::opamp_mfb_highpass_setup() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f, c3: %f", r1, r2, c1, c2, c3));
        }
        let gain = (((-c1)) / (c3));
        let fc = ((1) / (((((2) * (3.141592653589793))) * (Math.sqrt(Number(((((((c2) * (c3))) * (r1))) * (r2))))))));
        let q = ((Math.sqrt(Number(((((((c2) * (c3))) * (r1))) * (r2))))) / (__add_filter_biquad_device__opamp_mfb_highpass_setup(runtime, __add_filter_biquad_device__opamp_mfb_highpass_setup(runtime, ((c2) * (r1)), ((c3) * (r1))), ((((c3) * (r1))) * ((-gain))))));
        0;
        return method_setup__4(runtime, 3, fc, q, gain);
    }
    function __add_filter_biquad_device__opamp_mfb_highpass_setup(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opamp_diff_bandpass_setup(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        let p = method_opamp_diff_bandpass_calc(runtime, r1, r2, c1, c2);
        return method_setup__1(runtime, p);
    }
    function method_opamp_diff_bandpass_calc(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"], __L1 = __l["fatalerror"];
        let r = (__L0 ? __L0("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        if (((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L1 ? __L1("filter_biquad_device::opamp_diff_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::opamp_diff_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2));
        }
        r.gain = (((-r2)) / (r1));
        let f1 = ((1) / (((((((2) * (3.141592653589793))) * (r1))) * (c1))));
        let f2 = ((1) / (((((((2) * (3.141592653589793))) * (r2))) * (c2))));
        let fct = ((__add_opamp_diff_bandpass_calc(runtime, Math.log10(Number(f1)), Math.log10(Number(f2)))) / (2));
        r.fc = Math.pow(Number(10), Number(fct));
        r.q = ((r.fc) / (((f2) - (f1))));
        r.type = 4;
        0;
        return r;
    }
    function __add_opamp_diff_bandpass_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opamp_diff_bandpass_modify(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        let p = method_opamp_diff_bandpass_calc(runtime, r1, r2, c1, c2);
        method_modify__1(runtime, p);
    }
    function method_filter_biquad_device__opamp_diff_bandpass_calc(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"], __L1 = __l["fatalerror"];
        let r = (__L0 ? __L0("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        if (((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L1 ? __L1("filter_biquad_device::opamp_diff_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::opamp_diff_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2));
        }
        r.gain = (((-r2)) / (r1));
        let f1 = ((1) / (((((((2) * (3.141592653589793))) * (r1))) * (c1))));
        let f2 = ((1) / (((((((2) * (3.141592653589793))) * (r2))) * (c2))));
        let fct = ((__add_filter_biquad_device__opamp_diff_bandpass_calc(runtime, Math.log10(Number(f1)), Math.log10(Number(f2)))) / (2));
        r.fc = Math.pow(Number(10), Number(fct));
        r.q = ((r.fc) / (((f2) - (f1))));
        r.type = 4;
        0;
        return r;
    }
    function __add_filter_biquad_device__opamp_diff_bandpass_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_rc_rr_bandpass_setup(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        return method_setup__1(runtime, method_rc_rr_bandpass_calc(runtime, r1, r2, c1, c2));
    }
    function method_rc_rr_bandpass_calc(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"], __L1 = __l["STRUCT_OF"];
        if (((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0("filter_biquad_device::rc_rr_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::rc_rr_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2));
        }
        let x = Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))));
        let y = __add_rc_rr_bandpass_calc(runtime, __add_rc_rr_bandpass_calc(runtime, ((r1) * (c1)), ((r2) * (c2))), ((r2) * (c1)));
        let z = ((r2) * (c1));
        let p = (__L1 ? __L1("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        p.type = 4;
        p.fc = ((1) / (((((2) * (3.141592653589793))) * (x))));
        p.q = ((x) / (y));
        p.gain = ((z) / (y));
        0;
        return p;
    }
    function __add_rc_rr_bandpass_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_rc_rr_bandpass_modify(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        method_modify__1(runtime, method_rc_rr_bandpass_calc(runtime, r1, r2, c1, c2));
    }
    function method_filter_biquad_device__rc_rr_bandpass_calc(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"], __L1 = __l["STRUCT_OF"];
        if (((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0("filter_biquad_device::rc_rr_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::rc_rr_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2));
        }
        let x = Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))));
        let y = __add_filter_biquad_device__rc_rr_bandpass_calc(runtime, __add_filter_biquad_device__rc_rr_bandpass_calc(runtime, ((r1) * (c1)), ((r2) * (c2))), ((r2) * (c1)));
        let z = ((r2) * (c1));
        let p = (__L1 ? __L1("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        p.type = 4;
        p.fc = ((1) / (((((2) * (3.141592653589793))) * (x))));
        p.q = ((x) / (y));
        p.gain = ((z) / (y));
        0;
        return p;
    }
    function __add_filter_biquad_device__rc_rr_bandpass_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_rc_cc_bandpass_setup(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        return method_setup__1(runtime, method_rc_cc_bandpass_calc(runtime, r1, r2, c1, c2));
    }
    function method_rc_cc_bandpass_calc(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"], __L1 = __l["STRUCT_OF"];
        if (((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0("filter_biquad_device::rc_cc_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::rc_cc_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2));
        }
        let x = Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))));
        let y = __add_rc_cc_bandpass_calc(runtime, __add_rc_cc_bandpass_calc(runtime, ((r1) * (c1)), ((r2) * (c2))), ((r1) * (c2)));
        let z = ((r2) * (c2));
        let p = (__L1 ? __L1("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        p.type = 4;
        p.fc = ((1) / (((((2) * (3.141592653589793))) * (x))));
        p.q = ((x) / (y));
        p.gain = ((z) / (y));
        0;
        return p;
    }
    function __add_rc_cc_bandpass_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_rc_cc_bandpass_modify(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        method_modify__1(runtime, method_rc_cc_bandpass_calc(runtime, r1, r2, c1, c2));
    }
    function method_filter_biquad_device__rc_cc_bandpass_calc(runtime, r1, r2, c1, c2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"], __L1 = __l["STRUCT_OF"];
        if (((((((((((((r1) === (0)) ? 1 : 0)) || ((((r2) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c1) === (0)) ? 1 : 0))) ? 1 : 0)) || ((((c2) === (0)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0("filter_biquad_device::rc_cc_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2) : runtime.macro("fatalerror", "filter_biquad_device::rc_cc_bandpass_calc() - no parameters can be 0; parameters were: r1: %f, r2: %f, c1: %f, c2: %f", r1, r2, c1, c2));
        }
        let x = Math.sqrt(Number(((((((r1) * (r2))) * (c1))) * (c2))));
        let y = __add_filter_biquad_device__rc_cc_bandpass_calc(runtime, __add_filter_biquad_device__rc_cc_bandpass_calc(runtime, ((r1) * (c1)), ((r2) * (c2))), ((r1) * (c2)));
        let z = ((r2) * (c2));
        let p = (__L1 ? __L1("biquad_params") : runtime.macro("STRUCT_OF", "biquad_params"));
        p.type = 4;
        p.fc = ((1) / (((((2) * (3.141592653589793))) * (x))));
        p.q = ((x) / (y));
        p.gain = ((z) / (y));
        0;
        return p;
    }
    function __add_filter_biquad_device__rc_cc_bandpass_calc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        if (((Number((members.m_last_sample_rate ?? 0)) !== Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(stream, "sample_rate")))) ? 1 : 0)) {
            method_recalc(runtime);
            members.m_last_sample_rate = (((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.sample_rate === 'function' ? __t1.sample_rate() : typeof __t1.sample_rate === 'number' || typeof __t1.sample_rate === 'boolean' ? __t1.sample_rate : runtime.container(stream, "sample_rate"))) | 0);
        }
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t2 = __deref_sound_stream_update(runtime, stream), typeof __t2.samples === 'function' ? __t2.samples() : typeof __t2.samples === 'number' || typeof __t2.samples === 'boolean' ? __t2.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            members.m_input = (__deref_sound_stream_update(runtime, stream).get?.(0, sampindex) ?? 0);
            method_step(runtime);
            (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, (members.m_output ?? 0)) ?? 0);
        }
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
    function method_step(runtime) {
        const members = runtime.members;
        members.m_w2 = (members.m_w1 ?? 0);
        members.m_w1 = (members.m_w0 ?? 0);
        members.m_w0 = ((__add_step(runtime, (((-(members.m_a1 ?? 0))) * ((members.m_w1 ?? 0))), (((-(members.m_a2 ?? 0))) * ((members.m_w2 ?? 0))))) + ((members.m_input ?? 0)));
        members.m_output = __add_step(runtime, __add_step(runtime, (((members.m_b0 ?? 0)) * ((members.m_w0 ?? 0))), (((members.m_b1 ?? 0)) * ((members.m_w1 ?? 0)))), (((members.m_b2 ?? 0)) * ((members.m_w2 ?? 0))));
    }
    function __add_step(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_filter_biquad_device__recalc(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        let __t0, __t1, __t2, __t3;
        0;
        if (((Number((members.m_type ?? 0)) === Number(9)) ? 1 : 0)) {
            return;
        }
        0;
        0;
        0;
        if (((Number((members.m_fc ?? 0)) >= Number((((__t0 = __deref_filter_biquad_device__recalc(runtime, members.m_stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(members.m_stream, "sample_rate"))) / (2)))) ? 1 : 0)) {
            switch ((members.m_type ?? 0)) {
                default:
                    {
                        members.m_b0 = 1;
                        break;
                    }
                case 1:
                case 10:
                case 3:
                case 4:
                case 6:
                case 8:
                    {
                        members.m_b0 = 0;
                        break;
                    }
            }
            members.m_a1 = (members.m_a2 = 0);
            members.m_b1 = (members.m_b2 = 0);
            0;
            0;
        }
        else {
            let MGain = Math.abs(Number((members.m_gain ?? 0)));
            let DBGain = ((Math.log10(Number(MGain))) * (20));
            let AMGain = Math.pow(Number(10), Number(((Math.abs(Number(DBGain))) / (20))));
            let K = Math.tan(Number(((((3.141592653589793) * ((members.m_fc ?? 0)))) / ((__t1 = __deref_filter_biquad_device__recalc(runtime, members.m_stream), typeof __t1.sample_rate === 'function' ? __t1.sample_rate() : typeof __t1.sample_rate === 'number' || typeof __t1.sample_rate === 'boolean' ? __t1.sample_rate : runtime.container(members.m_stream, "sample_rate"))))));
            let Ksquared = ((K) * (K));
            let KoverQ = ((K) / ((members.m_q ?? 0)));
            let normal = ((1) / (((((1) + (KoverQ))) + (Ksquared))));
            switch ((members.m_type ?? 0)) {
                case 0:
                    {
                        members.m_a1 = Math.exp(Number((((((-2)) * (3.141592653589793))) * ((((members.m_fc ?? 0)) / ((__t2 = __deref_filter_biquad_device__recalc(runtime, members.m_stream), typeof __t2.sample_rate === 'function' ? __t2.sample_rate() : typeof __t2.sample_rate === 'number' || typeof __t2.sample_rate === 'boolean' ? __t2.sample_rate : runtime.container(members.m_stream, "sample_rate"))))))));
                        members.m_b0 = ((1) - ((members.m_a1 ?? 0)));
                        members.m_a1 = (-(members.m_a1 ?? 0));
                        members.m_b1 = (members.m_b2 = (members.m_a2 = 0));
                        break;
                    }
                case 1:
                    {
                        members.m_a1 = (-Math.exp(Number((((((-2)) * (3.141592653589793))) * (((0.5) - ((((members.m_fc ?? 0)) / ((__t3 = __deref_filter_biquad_device__recalc(runtime, members.m_stream), typeof __t3.sample_rate === 'function' ? __t3.sample_rate() : typeof __t3.sample_rate === 'number' || typeof __t3.sample_rate === 'boolean' ? __t3.sample_rate : runtime.container(members.m_stream, "sample_rate")))))))))));
                        members.m_b0 = ((1) + ((members.m_a1 ?? 0)));
                        members.m_a1 = (-(members.m_a1 ?? 0));
                        members.m_b1 = (members.m_b2 = (members.m_a2 = 0));
                        break;
                    }
                case 10:
                    {
                        normal = ((1) / (((K) + (1))));
                        members.m_b0 = normal;
                        members.m_b1 = (-normal);
                        members.m_a1 = ((((K) - (1))) * (normal));
                        members.m_b2 = (members.m_a2 = 0);
                        break;
                    }
                case 2:
                    {
                        members.m_b0 = ((Ksquared) * (normal));
                        members.m_b1 = ((2) * ((members.m_b0 ?? 0)));
                        members.m_b2 = ((1) * ((members.m_b0 ?? 0)));
                        members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                        members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        break;
                    }
                case 3:
                    {
                        members.m_b0 = ((1) * (normal));
                        members.m_b1 = (((-2)) * ((members.m_b0 ?? 0)));
                        members.m_b2 = ((1) * ((members.m_b0 ?? 0)));
                        members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                        members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        break;
                    }
                case 4:
                    {
                        members.m_b0 = ((KoverQ) * (normal));
                        members.m_b1 = 0;
                        members.m_b2 = (((-1)) * ((members.m_b0 ?? 0)));
                        members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                        members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        break;
                    }
                case 5:
                    {
                        members.m_b0 = ((((1) + (Ksquared))) * (normal));
                        members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                        members.m_b2 = ((1) * ((members.m_b0 ?? 0)));
                        members.m_a1 = ((1) * ((members.m_b1 ?? 0)));
                        members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        break;
                    }
                case 6:
                    {
                        if ((((DBGain) >= (0)) ? 1 : 0)) {
                            members.m_b0 = ((((__add_filter_biquad_device__recalc(runtime, 1, ((AMGain) * (KoverQ)))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_b2 = ((((((1) - (((AMGain) * (KoverQ))))) + (Ksquared))) * (normal));
                            members.m_a1 = ((1) * ((members.m_b1 ?? 0)));
                            members.m_a2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                        }
                        else {
                            normal = ((1) / (((__add_filter_biquad_device__recalc(runtime, 1, ((AMGain) * (KoverQ)))) + (Ksquared))));
                            members.m_b0 = ((((((1) + (KoverQ))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_b2 = ((((((1) - (KoverQ))) + (Ksquared))) * (normal));
                            members.m_a1 = ((1) * ((members.m_b1 ?? 0)));
                            members.m_a2 = ((((((1) - (((AMGain) * (KoverQ))))) + (Ksquared))) * (normal));
                        }
                        break;
                    }
                case 7:
                    {
                        if ((((DBGain) >= (0)) ? 1 : 0)) {
                            normal = ((1) / (((__add_filter_biquad_device__recalc(runtime, 1, ((1.4142135623730951) * (K)))) + (Ksquared))));
                            members.m_b0 = ((__add_filter_biquad_device__recalc(runtime, __add_filter_biquad_device__recalc(runtime, 1, ((Math.sqrt(Number(((2) * (AMGain))))) * (K))), ((AMGain) * (Ksquared)))) * (normal));
                            members.m_b1 = ((((2) * (((((AMGain) * (Ksquared))) - (1))))) * (normal));
                            members.m_b2 = ((__add_filter_biquad_device__recalc(runtime, ((1) - (((Math.sqrt(Number(((2) * (AMGain))))) * (K)))), ((AMGain) * (Ksquared)))) * (normal));
                            members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_a2 = ((((((1) - (((1.4142135623730951) * (K))))) + (Ksquared))) * (normal));
                        }
                        else {
                            normal = ((1) / (__add_filter_biquad_device__recalc(runtime, __add_filter_biquad_device__recalc(runtime, 1, ((Math.sqrt(Number(((2) * (AMGain))))) * (K))), ((AMGain) * (Ksquared)))));
                            members.m_b0 = ((((__add_filter_biquad_device__recalc(runtime, 1, ((1.4142135623730951) * (K)))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_b2 = ((((((1) - (((1.4142135623730951) * (K))))) + (Ksquared))) * (normal));
                            members.m_a1 = ((((2) * (((((AMGain) * (Ksquared))) - (1))))) * (normal));
                            members.m_a2 = ((__add_filter_biquad_device__recalc(runtime, ((1) - (((Math.sqrt(Number(((2) * (AMGain))))) * (K)))), ((AMGain) * (Ksquared)))) * (normal));
                        }
                        break;
                    }
                case 8:
                    {
                        if ((((DBGain) >= (0)) ? 1 : 0)) {
                            normal = ((1) / (((__add_filter_biquad_device__recalc(runtime, 1, ((1.4142135623730951) * (K)))) + (Ksquared))));
                            members.m_b0 = ((((((AMGain) + (((Math.sqrt(Number(((2) * (AMGain))))) * (K))))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (AMGain))))) * (normal));
                            members.m_b2 = ((((((AMGain) - (((Math.sqrt(Number(((2) * (AMGain))))) * (K))))) + (Ksquared))) * (normal));
                            members.m_a1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_a2 = ((((((1) - (((1.4142135623730951) * (K))))) + (Ksquared))) * (normal));
                        }
                        else {
                            normal = ((1) / (((((AMGain) + (((Math.sqrt(Number(((2) * (AMGain))))) * (K))))) + (Ksquared))));
                            members.m_b0 = ((((__add_filter_biquad_device__recalc(runtime, 1, ((1.4142135623730951) * (K)))) + (Ksquared))) * (normal));
                            members.m_b1 = ((((2) * (((Ksquared) - (1))))) * (normal));
                            members.m_b2 = ((((((1) - (((1.4142135623730951) * (K))))) + (Ksquared))) * (normal));
                            members.m_a1 = ((((2) * (((Ksquared) - (AMGain))))) * (normal));
                            members.m_a2 = ((((((AMGain) - (((Math.sqrt(Number(((2) * (AMGain))))) * (K))))) + (Ksquared))) * (normal));
                        }
                        break;
                    }
                default:
                    {
                        (__L0 ? __L0("filter_biquad_device::recalc() - Invalid filter type!") : runtime.macro("fatalerror", "filter_biquad_device::recalc() - Invalid filter type!"));
                        break;
                    }
            }
            0;
            0;
            0;
            0;
            0;
            0;
            0;
            0;
            0;
        }
        if (((((((((Number((members.m_type ?? 0)) !== Number(6)) ? 1 : 0)) && (((Number((members.m_type ?? 0)) !== Number(7)) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_type ?? 0)) !== Number(8)) ? 1 : 0))) ? 1 : 0)) {
            members.m_b0 = ((members.m_b0) * ((members.m_gain ?? 0)));
            members.m_b1 = ((members.m_b1) * ((members.m_gain ?? 0)));
            members.m_b2 = ((members.m_b2) * ((members.m_gain ?? 0)));
            0;
            0;
            0;
        }
    }
    function __add_filter_biquad_device__recalc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_filter_biquad_device__recalc(runtime, p) {
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
    function method_setup_(runtime, type, fc, q, gain, __assigned) {
        const members = runtime.members;
        members.m_type = type;
        members.m_fc = fc;
        members.m_q = q;
        members.m_gain = gain;
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method_setup_raw_(runtime, a1, a2, b0, b1, b2, __assigned) {
        const members = runtime.members;
        members.m_type = 9;
        members.m_a1 = a1;
        members.m_a2 = a2;
        members.m_b0 = b0;
        members.m_b1 = b1;
        members.m_b2 = b2;
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method_modify__4(runtime, type, fc, q, gain) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_modify__4(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_type = type;
        members.m_fc = fc;
        members.m_q = q;
        members.m_gain = gain;
        method_recalc(runtime);
    }
    function __deref_modify__4(runtime, p) {
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
        "setup_raw": method_setup_raw,
        "modify_raw": method_modify_raw,
        "recalc": method_recalc,
        "opamp_sk_lphp_calc": method_opamp_sk_lphp_calc,
        "filter_biquad_device::opamp_sk_lphp_calc": method_filter_biquad_device__opamp_sk_lphp_calc,
        "opamp_sk_lowpass_setup": method_opamp_sk_lowpass_setup,
        "setup__1": method_setup__1,
        "opamp_sk_lowpass_modify": method_opamp_sk_lowpass_modify,
        "modify__1": method_modify__1,
        "opamp_sk_highpass_setup": method_opamp_sk_highpass_setup,
        "opamp_sk_highpass_modify": method_opamp_sk_highpass_modify,
        "opamp_mfb_lowpass_setup": method_opamp_mfb_lowpass_setup,
        "opamp_mfb_lowpass_calc": method_opamp_mfb_lowpass_calc,
        "opamp_mfb_lowpass_modify": method_opamp_mfb_lowpass_modify,
        "filter_biquad_device::opamp_mfb_lowpass_calc": method_filter_biquad_device__opamp_mfb_lowpass_calc,
        "opamp_mfb_bandpass_setup": method_opamp_mfb_bandpass_setup,
        "setup__4": method_setup__4,
        "filter_biquad_device::opamp_mfb_bandpass_setup": method_filter_biquad_device__opamp_mfb_bandpass_setup,
        "opamp_mfb_highpass_setup": method_opamp_mfb_highpass_setup,
        "filter_biquad_device::opamp_mfb_highpass_setup": method_filter_biquad_device__opamp_mfb_highpass_setup,
        "opamp_diff_bandpass_setup": method_opamp_diff_bandpass_setup,
        "opamp_diff_bandpass_calc": method_opamp_diff_bandpass_calc,
        "opamp_diff_bandpass_modify": method_opamp_diff_bandpass_modify,
        "filter_biquad_device::opamp_diff_bandpass_calc": method_filter_biquad_device__opamp_diff_bandpass_calc,
        "rc_rr_bandpass_setup": method_rc_rr_bandpass_setup,
        "rc_rr_bandpass_calc": method_rc_rr_bandpass_calc,
        "rc_rr_bandpass_modify": method_rc_rr_bandpass_modify,
        "filter_biquad_device::rc_rr_bandpass_calc": method_filter_biquad_device__rc_rr_bandpass_calc,
        "rc_cc_bandpass_setup": method_rc_cc_bandpass_setup,
        "rc_cc_bandpass_calc": method_rc_cc_bandpass_calc,
        "rc_cc_bandpass_modify": method_rc_cc_bandpass_modify,
        "filter_biquad_device::rc_cc_bandpass_calc": method_filter_biquad_device__rc_cc_bandpass_calc,
        "sound_stream_update": method_sound_stream_update,
        "step": method_step,
        "filter_biquad_device::recalc": method_filter_biquad_device__recalc,
        "setup=": method_setup_,
        "setup_raw=": method_setup_raw_,
        "modify__4": method_modify__4
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["STRUCT_OF", "fatalerror"];
export const device = definition;
export default device;
