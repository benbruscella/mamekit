import deviceData from './tia.device.ir.json' with { type: 'json' };
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
    function method_tia_sound_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let chan = ((0) & 0xff);
        switch (offset) {
            case 21:
                {
                    runtime.writeIndex((members.AUDC ?? 0), 0, ((data) & (15)));
                    chan = ((0) & 0xff);
                    break;
                }
            case 22:
                {
                    runtime.writeIndex((members.AUDC ?? 0), 1, ((data) & (15)));
                    chan = ((1) & 0xff);
                    break;
                }
            case 23:
                {
                    runtime.writeIndex((members.AUDF ?? 0), 0, ((data) & (31)));
                    chan = ((0) & 0xff);
                    break;
                }
            case 24:
                {
                    runtime.writeIndex((members.AUDF ?? 0), 1, ((data) & (31)));
                    chan = ((1) & 0xff);
                    break;
                }
            case 25:
                {
                    runtime.writeIndex((members.AUDV ?? 0), 0, ((((data) & (15))) << (10)));
                    chan = ((0) & 0xff);
                    break;
                }
            case 26:
                {
                    runtime.writeIndex((members.AUDV ?? 0), 1, ((((data) & (15))) << (10)));
                    chan = ((1) & 0xff);
                    break;
                }
            default:
                {
                    return;
                }
        }
        let new_val = ((0) & 0xffff);
        if ((((((Number(runtime.readIndex((members.AUDC ?? 0), chan)) === Number(0)) ? 1 : 0)) || (((Number(runtime.readIndex((members.AUDC ?? 0), chan)) === Number(11)) ? 1 : 0))) ? 1 : 0)) {
            new_val = ((0) & 0xffff);
            runtime.writeIndex((members.Outvol ?? 0), chan, runtime.readIndex((members.AUDV ?? 0), chan));
        }
        else {
            new_val = ((((runtime.readIndex((members.AUDF ?? 0), chan)) + (1))) & 0xffff);
            if ((((((Number(((runtime.readIndex((members.AUDC ?? 0), chan)) & (12))) === Number(12)) ? 1 : 0)) && (((Number(runtime.readIndex((members.AUDC ?? 0), chan)) !== Number(15)) ? 1 : 0))) ? 1 : 0)) {
                new_val = ((((new_val) * (3))) & 0xffff);
            }
        }
        if ((((new_val) !== (runtime.readIndex((members.Div_n_max ?? 0), chan))) ? 1 : 0)) {
            runtime.writeIndex((members.Div_n_max ?? 0), chan, new_val);
            if (((((((runtime.readIndex((members.Div_n_cnt ?? 0), chan)) === (0)) ? 1 : 0)) || ((((new_val) === (0)) ? 1 : 0))) ? 1 : 0)) {
                runtime.writeIndex((members.Div_n_cnt ?? 0), chan, new_val);
            }
        }
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        const h_Bit5 = members.Bit5 ?? 0;
        const h_Div31 = members.Div31 ?? 0;
        const h_Bit9 = members.Bit9 ?? 0;
        const h_Bit4 = members.Bit4 ?? 0;
        let audc0 = ((0) & 0xff);
        let audc1 = ((0) & 0xff);
        let div_n_cnt0 = ((0) & 0xff);
        let div_n_cnt1 = ((0) & 0xff);
        let p5_0 = ((0) & 0xff);
        let p5_1 = ((0) & 0xff);
        let audv0 = ((0) << 16 >> 16);
        let audv1 = ((0) << 16 >> 16);
        let outvol_0 = ((0) << 16 >> 16);
        let outvol_1 = ((0) << 16 >> 16);
        audc0 = ((runtime.readIndex((members.AUDC ?? 0), 0)) & 0xff);
        audc1 = ((runtime.readIndex((members.AUDC ?? 0), 1)) & 0xff);
        audv0 = ((runtime.readIndex((members.AUDV ?? 0), 0)) << 16 >> 16);
        audv1 = ((runtime.readIndex((members.AUDV ?? 0), 1)) << 16 >> 16);
        p5_0 = ((runtime.readIndex((members.P5 ?? 0), 0)) & 0xff);
        p5_1 = ((runtime.readIndex((members.P5 ?? 0), 1)) & 0xff);
        outvol_0 = ((runtime.readIndex((members.Outvol ?? 0), 0)) << 16 >> 16);
        outvol_1 = ((runtime.readIndex((members.Outvol ?? 0), 1)) << 16 >> 16);
        div_n_cnt0 = ((runtime.readIndex((members.Div_n_cnt ?? 0), 0)) & 0xff);
        div_n_cnt1 = ((runtime.readIndex((members.Div_n_cnt ?? 0), 1)) & 0xff);
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0);) {
            if ((((div_n_cnt0) > (1)) ? 1 : 0)) {
                div_n_cnt0 = ((((div_n_cnt0) - (1))) & 0xff);
            }
            else {
                if ((((div_n_cnt0) === (1)) ? 1 : 0)) {
                    let prev_bit5 = ((runtime.readIndex(h_Bit5, p5_0)) | 0);
                    div_n_cnt0 = ((runtime.readIndex((members.Div_n_max ?? 0), 0)) & 0xff);
                    p5_0 = ((((p5_0) + (1))) & 0xff);
                    if (((Number(p5_0) === Number(31)) ? 1 : 0)) {
                        p5_0 = ((0) & 0xff);
                    }
                    if ((((((((((((Number(((audc0) & (2))) === Number(0)) ? 1 : 0)) || ((((((Number(((audc0) & (1))) === Number(0)) ? 1 : 0)) && (runtime.readIndex(h_Div31, p5_0))) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((audc0) & (1))) === Number(1)) ? 1 : 0)) && (runtime.readIndex(h_Bit5, p5_0))) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((audc0) & (15))) === Number(15)) ? 1 : 0)) && ((((runtime.readIndex(h_Bit5, p5_0)) !== (prev_bit5)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        if (((audc0) & (4))) {
                            if (((Number(((audc0) & (15))) === Number(15)) ? 1 : 0)) {
                                if ((((runtime.readIndex(h_Bit5, p5_0)) !== (prev_bit5)) ? 1 : 0)) {
                                    runtime.writeIndex((members.Div_3_cnt ?? 0), 0, ((runtime.readIndex((members.Div_3_cnt ?? 0), 0)) - (1)));
                                    if (((runtime.readIndex((members.Div_3_cnt ?? 0), 0)) ? 0 : 1)) {
                                        runtime.writeIndex((members.Div_3_cnt ?? 0), 0, 3);
                                        if (outvol_0) {
                                            outvol_0 = ((0) << 16 >> 16);
                                        }
                                        else {
                                            outvol_0 = ((audv0) << 16 >> 16);
                                        }
                                    }
                                }
                            }
                            else {
                                if (outvol_0) {
                                    outvol_0 = ((0) << 16 >> 16);
                                }
                                else {
                                    outvol_0 = ((audv0) << 16 >> 16);
                                }
                            }
                        }
                        else {
                            if (((audc0) & (8))) {
                                if (((Number(audc0) === Number(8)) ? 1 : 0)) {
                                    runtime.writeIndex((members.P9 ?? 0), 0, ((runtime.readIndex((members.P9 ?? 0), 0)) + (1)));
                                    if (((Number(runtime.readIndex((members.P9 ?? 0), 0)) === Number(511)) ? 1 : 0)) {
                                        runtime.writeIndex((members.P9 ?? 0), 0, 0);
                                    }
                                    if (runtime.readIndex(h_Bit9, runtime.readIndex((members.P9 ?? 0), 0))) {
                                        outvol_0 = ((audv0) << 16 >> 16);
                                    }
                                    else {
                                        outvol_0 = ((0) << 16 >> 16);
                                    }
                                }
                                else {
                                    if (((audc0) & (2))) {
                                        if ((((outvol_0) || (((audc0) & (1)))) ? 1 : 0)) {
                                            outvol_0 = ((0) << 16 >> 16);
                                        }
                                        else {
                                            outvol_0 = ((audv0) << 16 >> 16);
                                        }
                                    }
                                    else {
                                        if (runtime.readIndex(h_Bit5, p5_0)) {
                                            outvol_0 = ((audv0) << 16 >> 16);
                                        }
                                        else {
                                            outvol_0 = ((0) << 16 >> 16);
                                        }
                                    }
                                }
                            }
                            else {
                                runtime.writeIndex((members.P4 ?? 0), 0, ((runtime.readIndex((members.P4 ?? 0), 0)) + (1)));
                                if (((Number(runtime.readIndex((members.P4 ?? 0), 0)) === Number(15)) ? 1 : 0)) {
                                    runtime.writeIndex((members.P4 ?? 0), 0, 0);
                                }
                                if (runtime.readIndex(h_Bit4, runtime.readIndex((members.P4 ?? 0), 0))) {
                                    outvol_0 = ((audv0) << 16 >> 16);
                                }
                                else {
                                    outvol_0 = ((0) << 16 >> 16);
                                }
                            }
                        }
                    }
                }
            }
            if ((((div_n_cnt1) > (1)) ? 1 : 0)) {
                div_n_cnt1 = ((((div_n_cnt1) - (1))) & 0xff);
            }
            else {
                if ((((div_n_cnt1) === (1)) ? 1 : 0)) {
                    let prev_bit5 = ((runtime.readIndex(h_Bit5, p5_1)) | 0);
                    div_n_cnt1 = ((runtime.readIndex((members.Div_n_max ?? 0), 1)) & 0xff);
                    p5_1 = ((((p5_1) + (1))) & 0xff);
                    if (((Number(p5_1) === Number(31)) ? 1 : 0)) {
                        p5_1 = ((0) & 0xff);
                    }
                    if ((((((((((((Number(((audc1) & (2))) === Number(0)) ? 1 : 0)) || ((((((Number(((audc1) & (1))) === Number(0)) ? 1 : 0)) && (runtime.readIndex(h_Div31, p5_1))) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((audc1) & (1))) === Number(1)) ? 1 : 0)) && (runtime.readIndex(h_Bit5, p5_1))) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((audc1) & (15))) === Number(15)) ? 1 : 0)) && ((((runtime.readIndex(h_Bit5, p5_1)) !== (prev_bit5)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        if (((audc1) & (4))) {
                            if (((Number(((audc1) & (15))) === Number(15)) ? 1 : 0)) {
                                if ((((runtime.readIndex(h_Bit5, p5_1)) !== (prev_bit5)) ? 1 : 0)) {
                                    runtime.writeIndex((members.Div_3_cnt ?? 0), 1, ((runtime.readIndex((members.Div_3_cnt ?? 0), 1)) - (1)));
                                    if (((runtime.readIndex((members.Div_3_cnt ?? 0), 1)) ? 0 : 1)) {
                                        runtime.writeIndex((members.Div_3_cnt ?? 0), 1, 3);
                                        if (outvol_1) {
                                            outvol_1 = ((0) << 16 >> 16);
                                        }
                                        else {
                                            outvol_1 = ((audv1) << 16 >> 16);
                                        }
                                    }
                                }
                            }
                            else {
                                if (outvol_1) {
                                    outvol_1 = ((0) << 16 >> 16);
                                }
                                else {
                                    outvol_1 = ((audv1) << 16 >> 16);
                                }
                            }
                        }
                        else {
                            if (((audc1) & (8))) {
                                if (((Number(audc1) === Number(8)) ? 1 : 0)) {
                                    runtime.writeIndex((members.P9 ?? 0), 1, ((runtime.readIndex((members.P9 ?? 0), 1)) + (1)));
                                    if (((Number(runtime.readIndex((members.P9 ?? 0), 1)) === Number(511)) ? 1 : 0)) {
                                        runtime.writeIndex((members.P9 ?? 0), 1, 0);
                                    }
                                    if (runtime.readIndex(h_Bit9, runtime.readIndex((members.P9 ?? 0), 1))) {
                                        outvol_1 = ((audv1) << 16 >> 16);
                                    }
                                    else {
                                        outvol_1 = ((0) << 16 >> 16);
                                    }
                                }
                                else {
                                    if (((audc1) & (2))) {
                                        if ((((outvol_1) || (((audc1) & (1)))) ? 1 : 0)) {
                                            outvol_1 = ((0) << 16 >> 16);
                                        }
                                        else {
                                            outvol_1 = ((audv1) << 16 >> 16);
                                        }
                                    }
                                    else {
                                        if (runtime.readIndex(h_Bit5, p5_1)) {
                                            outvol_1 = ((audv1) << 16 >> 16);
                                        }
                                        else {
                                            outvol_1 = ((0) << 16 >> 16);
                                        }
                                    }
                                }
                            }
                            else {
                                runtime.writeIndex((members.P4 ?? 0), 1, ((runtime.readIndex((members.P4 ?? 0), 1)) + (1)));
                                if (((Number(runtime.readIndex((members.P4 ?? 0), 1)) === Number(15)) ? 1 : 0)) {
                                    runtime.writeIndex((members.P4 ?? 0), 1, 0);
                                }
                                if (runtime.readIndex(h_Bit4, runtime.readIndex((members.P4 ?? 0), 1))) {
                                    outvol_1 = ((audv1) << 16 >> 16);
                                }
                                else {
                                    outvol_1 = ((0) << 16 >> 16);
                                }
                            }
                        }
                    }
                }
            }
            if ((((members.oversampling ?? 0)) ? 0 : 1)) {
                members.Samp_n_cnt = ((((members.Samp_n_cnt) - (256))) & 0xffff);
                if (((((members.Samp_n_cnt ?? 0)) < (256)) ? 1 : 0)) {
                    members.Samp_n_cnt = ((((members.Samp_n_cnt) + ((members.Samp_n_max ?? 0)))) & 0xffff);
                    (__deref_sound_stream_update(runtime, stream).put_int?.(0, (__t1 = sampindex, sampindex = ((((sampindex) + (1))) | 0), __t1), ((outvol_0) + (outvol_1)), 32768) ?? 0);
                }
            }
            else {
                do {
                    members.Samp_n_cnt = ((((members.Samp_n_cnt) - (256))) & 0xffff);
                    (__deref_sound_stream_update(runtime, stream).put_int?.(0, (__t2 = sampindex, sampindex = ((((sampindex) + (1))) | 0), __t2), ((outvol_0) + (outvol_1)), 32768) ?? 0);
                } while ((((((((members.Samp_n_cnt ?? 0)) >= (256)) ? 1 : 0)) && (((Number(sampindex) < Number((__t3 = __deref_sound_stream_update(runtime, stream), typeof __t3.samples === 'function' ? __t3.samples() : typeof __t3.samples === 'number' || typeof __t3.samples === 'boolean' ? __t3.samples : runtime.container(stream, "samples")))) ? 1 : 0))) ? 1 : 0));
                if (((((members.Samp_n_cnt ?? 0)) < (256)) ? 1 : 0)) {
                    members.Samp_n_cnt = ((((members.Samp_n_cnt) + ((members.Samp_n_max ?? 0)))) & 0xffff);
                }
            }
        }
        runtime.writeIndex((members.P5 ?? 0), 0, p5_0);
        runtime.writeIndex((members.P5 ?? 0), 1, p5_1);
        runtime.writeIndex((members.Outvol ?? 0), 0, outvol_0);
        runtime.writeIndex((members.Outvol ?? 0), 1, outvol_1);
        runtime.writeIndex((members.Div_n_cnt ?? 0), 0, div_n_cnt0);
        runtime.writeIndex((members.Div_n_cnt ?? 0), 1, div_n_cnt1);
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
    function method_poly_init(runtime, poly, size, f0, f1) {
        const members = runtime.members;
        let mask = ((((((1) << (size))) - (1))) | 0);
        let x = ((mask) | 0);
        for (let i = ((0) | 0); (((i) < (mask)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let bit0 = ((((((((size) - (f0))) ? (runtime.shiftRight(x, ((size) - (f0)))) : (x))) & (1))) | 0);
            let bit1 = ((((((((size) - (f1))) ? (runtime.shiftRight(x, ((size) - (f1)))) : (x))) & (1))) | 0);
            runtime.writeIndex(poly, i, ((x) & (1)));
            x = ((((runtime.shiftRight(x, 1)) | (((((bit0) ^ (bit1))) << (((size) - (1))))))) | 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "tia_sound_w": method_tia_sound_w,
        "sound_stream_update": method_sound_stream_update,
        "poly_init": method_poly_init
    };
    return __methodTable;
})();
export const device = definition;
export default device;
