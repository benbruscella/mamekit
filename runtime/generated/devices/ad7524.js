import deviceData from './ad7524.device.ir.json' with { type: 'json' };
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
    function method_set_value(runtime, value) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_set_value(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_curval = runtime.readIndex((members.m_value_map ?? 0), ((value) & (runtime.subtract((members.m_value_map).length, 1))));
    }
    function __deref_set_value(runtime, p) {
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
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["CALL_METHOD"], __L1 = __l["get_sound_requested_inputs_mask"], __L2 = __l["stream_alloc"], __L3 = __l["NAME"], __L4 = __l["save_item"];
        const h_m_mapper = members.m_mapper ?? 0;
        const h_m_gain = members.m_gain ?? 0;
        for (let code = ((0) | 0); ((Number(code) < Number((members.m_value_map).length)) ? 1 : 0); code = ((((code) + (1))) | 0)) {
            runtime.writeIndex(runtime.writableMember("m_value_map"), code, ((((__method) => __method ? __method(runtime, code, 8) : (__L0 ? __L0(h_m_mapper, code, 8) : runtime.macro("CALL_METHOD", h_m_mapper, code, 8)))(__methodTable[h_m_mapper])) * (h_m_gain)));
        }
        let inputs = ((((((Number((__L1 ? __L1() : runtime.macro("get_sound_requested_inputs_mask"))) === Number(0)) ? 1 : 0)) ? (0) : (2))) | 0);
        members.m_stream = (__L2 ? __L2(inputs, 1, 1536000) : runtime.macro("stream_alloc", inputs, 1, 1536000));
        (__L4 ? __L4((__L3 ? __L3((members.m_curval ?? 0)) : runtime.macro("NAME", (members.m_curval ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_curval ?? 0)) : runtime.macro("NAME", (members.m_curval ?? 0)))));
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_sound_requested_inputs_mask"];
        let __t0, __t1, __t2, __t3;
        if (((Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.input_count === 'function' ? __t0.input_count() : typeof __t0.input_count === 'number' || typeof __t0.input_count === 'boolean' ? __t0.input_count : runtime.container(stream, "input_count"))) === Number(0)) ? 1 : 0)) {
            (__deref_sound_stream_update(runtime, stream).fill?.(0, (((members.m_range_min ?? 0)) + ((((members.m_curval ?? 0)) * ((((members.m_range_max ?? 0)) - ((members.m_range_min ?? 0)))))))) ?? 0);
            return;
        }
        if (((((((__L0 ? __L0() : runtime.macro("get_sound_requested_inputs_mask"))) >>> (1)) & 1)) ? 0 : 1)) {
            for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, (((members.m_range_min ?? 0)) + ((((members.m_curval ?? 0)) * ((((__deref_sound_stream_update(runtime, stream).get?.(0, sampindex) ?? 0)) - ((members.m_range_min ?? 0)))))))) ?? 0);
            }
        }
        else {
            if (((((((__L0 ? __L0() : runtime.macro("get_sound_requested_inputs_mask"))) >>> (0)) & 1)) ? 0 : 1)) {
                for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t2 = __deref_sound_stream_update(runtime, stream), typeof __t2.samples === 'function' ? __t2.samples() : typeof __t2.samples === 'number' || typeof __t2.samples === 'boolean' ? __t2.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                    (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, __add_sound_stream_update(runtime, (__deref_sound_stream_update(runtime, stream).get?.(1, sampindex) ?? 0), (((members.m_curval ?? 0)) * ((((members.m_range_max ?? 0)) - ((__deref_sound_stream_update(runtime, stream).get?.(1, sampindex) ?? 0))))))) ?? 0);
                }
            }
            else {
                for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t3 = __deref_sound_stream_update(runtime, stream), typeof __t3.samples === 'function' ? __t3.samples() : typeof __t3.samples === 'number' || typeof __t3.samples === 'boolean' ? __t3.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                    (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, __add_sound_stream_update(runtime, (__deref_sound_stream_update(runtime, stream).get?.(1, sampindex) ?? 0), (((members.m_curval ?? 0)) * (runtime.subtract((__deref_sound_stream_update(runtime, stream).get?.(0, sampindex) ?? 0), (__deref_sound_stream_update(runtime, stream).get?.(1, sampindex) ?? 0)))))) ?? 0);
                }
            }
        }
    }
    function __add_sound_stream_update(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method_dac_device_base__set_value(runtime, value) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_dac_device_base__set_value(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_curval = runtime.readIndex((members.m_value_map ?? 0), ((value) & (runtime.subtract((members.m_value_map).length, 1))));
    }
    function __deref_dac_device_base__set_value(runtime, p) {
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
    function method_dac_device_base__set_output_range(runtime, range_min, range_max) {
        const members = runtime.members;
        members.m_range_min = range_min;
        members.m_range_max = range_max;
        return (members.this ?? 0);
    }
    function method_dac_byte_device_base(runtime, mconfig, type, tag, owner, clock, bits, mapper, gain) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
    }
    function method_write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_write(runtime, (members.this ?? 0)).set_value?.(data) ?? 0);
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
    function method_data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_data_w(runtime, (members.this ?? 0)).set_value?.(data) ?? 0);
    }
    function __deref_data_w(runtime, p) {
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
    function method_dac_byte_device_base__dac_byte_device_base(runtime, mconfig, type, tag, owner, clock, bits, mapper, gain) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
    }
    function method_dac_byte_device_base__write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_dac_byte_device_base__write(runtime, (members.this ?? 0)).set_value?.(data) ?? 0);
    }
    function __deref_dac_byte_device_base__write(runtime, p) {
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
    function method_dac_byte_device_base__data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_dac_byte_device_base__data_w(runtime, (members.this ?? 0)).set_value?.(data) ?? 0);
    }
    function __deref_dac_byte_device_base__data_w(runtime, p) {
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
    function method_ad7524_device(runtime, mconfig, tag, owner, clock = 0) {
        const members = runtime.members;
    }
    function method_dac_mapper_unsigned(runtime, input, bits) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
        let scale = ((1) / ((((((bits) > (1)) ? 1 : 0)) ? (((1) << (bits))) : (1))));
        input = ((((input) & (((((1) << (bits))) - (1))))) >>> 0);
        return ((input) * (scale));
    }
    function method_dac_mapper_signed(runtime, input, bits) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
        return method_dac_mapper_unsigned(runtime, ((input) ^ (((1) << (((bits) - (1)))))), bits);
    }
    function method_dac_mapper_ones_complement(runtime, input, bits) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
        if ((((input) >>> (((bits) - (1)))) & 1)) {
            return ((0.5) - (((0.5) * (method_dac_mapper_unsigned(runtime, (~input), ((bits) - (1)))))));
        }
        else {
            return __add_dac_mapper_ones_complement(runtime, 0.5, ((0.5) * (method_dac_mapper_unsigned(runtime, input, ((bits) - (1))))));
        }
    }
    function __add_dac_mapper_ones_complement(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_set_output_range_(runtime, range_min, range_max, __assigned) {
        const members = runtime.members;
        members.m_range_min = range_min;
        members.m_range_max = range_max;
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method_dac_device_base__set_output_range_(runtime, range_min, range_max, __assigned) {
        const members = runtime.members;
        members.m_range_min = range_min;
        members.m_range_max = range_max;
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method_set_output_range__2(runtime, range_min, range_max) {
        const members = runtime.members;
        members.m_range_min = range_min;
        members.m_range_max = range_max;
        return (members.this ?? 0);
    }
    function method_set_output_range__1(runtime, vref) {
        const members = runtime.members;
        return method_set_output_range__2(runtime, (-vref), vref);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "set_value": method_set_value,
        "device_start": method_device_start,
        "sound_stream_update": method_sound_stream_update,
        "dac_device_base::set_value": method_dac_device_base__set_value,
        "dac_device_base::set_output_range": method_dac_device_base__set_output_range,
        "dac_byte_device_base": method_dac_byte_device_base,
        "write": method_write,
        "data_w": method_data_w,
        "dac_byte_device_base::dac_byte_device_base": method_dac_byte_device_base__dac_byte_device_base,
        "dac_byte_device_base::write": method_dac_byte_device_base__write,
        "dac_byte_device_base::data_w": method_dac_byte_device_base__data_w,
        "ad7524_device": method_ad7524_device,
        "dac_mapper_unsigned": method_dac_mapper_unsigned,
        "dac_mapper_signed": method_dac_mapper_signed,
        "dac_mapper_ones_complement": method_dac_mapper_ones_complement,
        "set_output_range=": method_set_output_range_,
        "dac_device_base::set_output_range=": method_dac_device_base__set_output_range_,
        "set_output_range__2": method_set_output_range__2,
        "set_output_range__1": method_set_output_range__1
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["CALL_METHOD", "NAME", "get_sound_requested_inputs_mask", "save_item", "stream_alloc"];
export const device = definition;
export default device;
