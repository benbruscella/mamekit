import deviceData from './mathbox.device.ir.json' with { type: 'json' };
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
    function method_go_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_reg = members.m_reg ?? 0;
        let mb_temp = ((0) | 0);
        let mb_q = ((0) << 16 >> 16);
        let msb = ((0) | 0);
        0;
        let __switch_step_048_step_0bf = ((offset) | 0);
        if ((((__switch_step_048_step_0bf) >= (32)) ? 1 : 0)) {
            __switch_step_048_step_0bf = ((-1) | 0);
        }
        while (1) {
            switch (__switch_step_048_step_0bf) {
                case 0:
                    {
                        members.m_result = (((h_m_reg[0] = ((((h_m_reg[0]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 1:
                    {
                        members.m_result = (((h_m_reg[0] = ((((h_m_reg[0]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 2:
                    {
                        members.m_result = (((h_m_reg[1] = ((((h_m_reg[1]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 3:
                    {
                        members.m_result = (((h_m_reg[1] = ((((h_m_reg[1]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 4:
                    {
                        members.m_result = (((h_m_reg[2] = ((((h_m_reg[2]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 5:
                    {
                        members.m_result = (((h_m_reg[2] = ((((h_m_reg[2]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 6:
                    {
                        members.m_result = (((h_m_reg[3] = ((((h_m_reg[3]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 7:
                    {
                        members.m_result = (((h_m_reg[3] = ((((h_m_reg[3]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 8:
                    {
                        members.m_result = (((h_m_reg[4] = ((((h_m_reg[4]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 9:
                    {
                        members.m_result = (((h_m_reg[4] = ((((h_m_reg[4]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 10:
                    {
                        members.m_result = (((h_m_reg[5] = ((((h_m_reg[5]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 12:
                    {
                        members.m_result = (((h_m_reg[6] = data)) << 16 >> 16);
                        break;
                    }
                case 21:
                    {
                        members.m_result = (((h_m_reg[7] = ((((h_m_reg[7]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 22:
                    {
                        members.m_result = (((h_m_reg[7] = ((((h_m_reg[7]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 26:
                    {
                        members.m_result = (((h_m_reg[8] = ((((h_m_reg[8]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 27:
                    {
                        members.m_result = (((h_m_reg[8] = ((((h_m_reg[8]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 13:
                    {
                        members.m_result = (((h_m_reg[10] = ((((h_m_reg[10]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 14:
                    {
                        members.m_result = (((h_m_reg[10] = ((((h_m_reg[10]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 15:
                    {
                        members.m_result = (((h_m_reg[11] = ((((h_m_reg[11]) & (65280))) | (data)))) << 16 >> 16);
                        break;
                    }
                case 16:
                    {
                        members.m_result = (((h_m_reg[11] = ((((h_m_reg[11]) & (255))) | (((data) << (8)))))) << 16 >> 16);
                        break;
                    }
                case 23:
                    {
                        members.m_result = ((h_m_reg[7]) << 16 >> 16);
                        break;
                    }
                case 25:
                    {
                        members.m_result = ((h_m_reg[8]) << 16 >> 16);
                        break;
                    }
                case 24:
                    {
                        members.m_result = ((h_m_reg[9]) << 16 >> 16);
                        break;
                    }
                case 11:
                    {
                        h_m_reg[5] = ((((h_m_reg[5]) & (255))) | (((data) << (8))));
                        h_m_reg[15] = ((65535) << 16 >> 16);
                        h_m_reg[4] = ((h_m_reg[4]) - (h_m_reg[2]));
                        h_m_reg[5] = ((h_m_reg[5]) - (h_m_reg[3]));
                    }
                case 32:
                    {
                        mb_temp = ((((((h_m_reg[0]) | 0)) * (((h_m_reg[4]) | 0)))) | 0);
                        h_m_reg[12] = runtime.shiftRight(mb_temp, 16);
                        h_m_reg[14] = ((mb_temp) & (65535));
                        mb_temp = (((((((-h_m_reg[1])) | 0)) * (((h_m_reg[5]) | 0)))) | 0);
                        h_m_reg[7] = runtime.shiftRight(mb_temp, 16);
                        mb_q = ((((mb_temp) & (65535))) << 16 >> 16);
                        h_m_reg[7] = ((h_m_reg[7]) + (h_m_reg[12]));
                        h_m_reg[14] = ((runtime.shiftRight(h_m_reg[14], 1)) & (32767));
                        h_m_reg[12] = ((runtime.shiftRight(mb_q, 1)) & (32767));
                        mb_q = ((((h_m_reg[12]) + (h_m_reg[14]))) << 16 >> 16);
                        if ((((mb_q) < (0)) ? 1 : 0)) {
                            h_m_reg[7] = ((h_m_reg[7]) + (1));
                        }
                        members.m_result = ((h_m_reg[7]) << 16 >> 16);
                        if ((((h_m_reg[15]) < (0)) ? 1 : 0)) {
                            break;
                        }
                        h_m_reg[7] = ((h_m_reg[7]) + (h_m_reg[2]));
                    }
                case 18:
                    {
                        mb_temp = ((((((h_m_reg[1]) | 0)) * (((h_m_reg[4]) | 0)))) | 0);
                        h_m_reg[12] = runtime.shiftRight(mb_temp, 16);
                        h_m_reg[9] = ((mb_temp) & (65535));
                        mb_temp = ((((((h_m_reg[0]) | 0)) * (((h_m_reg[5]) | 0)))) | 0);
                        h_m_reg[8] = runtime.shiftRight(mb_temp, 16);
                        mb_q = ((((mb_temp) & (65535))) << 16 >> 16);
                        h_m_reg[8] = ((h_m_reg[8]) + (h_m_reg[12]));
                        h_m_reg[9] = ((runtime.shiftRight(h_m_reg[9], 1)) & (32767));
                        h_m_reg[12] = ((runtime.shiftRight(mb_q, 1)) & (32767));
                        h_m_reg[9] = ((h_m_reg[9]) + (h_m_reg[12]));
                        if ((((h_m_reg[9]) < (0)) ? 1 : 0)) {
                            h_m_reg[8] = ((h_m_reg[8]) + (1));
                        }
                        h_m_reg[9] = ((h_m_reg[9]) << (1));
                        members.m_result = ((h_m_reg[8]) << 16 >> 16);
                        if ((((h_m_reg[15]) < (0)) ? 1 : 0)) {
                            break;
                        }
                        h_m_reg[8] = ((h_m_reg[8]) + (h_m_reg[3]));
                        h_m_reg[9] = runtime.andAssign(h_m_reg[9], 65280);
                    }
                case 19:
                    {
                        0;
                        h_m_reg[12] = h_m_reg[9];
                        mb_q = ((h_m_reg[8]) << 16 >> 16);
                        __switch_step_048_step_0bf = ((33) | 0);
                        continue;
                    }
                case 20:
                    {
                        h_m_reg[12] = h_m_reg[10];
                        mb_q = ((h_m_reg[11]) << 16 >> 16);
                    }
                case 33:
                    {
                        h_m_reg[14] = ((h_m_reg[7]) ^ (mb_q));
                        h_m_reg[13] = mb_q;
                        if ((((mb_q) >= (0)) ? 1 : 0)) {
                            mb_q = ((h_m_reg[12]) << 16 >> 16);
                        }
                        else {
                            h_m_reg[13] = (((-mb_q)) - (1));
                            mb_q = (((((-h_m_reg[12])) - (1))) << 16 >> 16);
                            if (((((((mb_q) < (0)) ? 1 : 0)) && (((Number(((mb_q) + (1))) < Number(0)) ? 1 : 0))) ? 1 : 0)) {
                                h_m_reg[13] = ((h_m_reg[13]) + (1));
                            }
                            mb_q = ((((mb_q) + (1))) << 16 >> 16);
                        }
                        if ((((h_m_reg[7]) >= (0)) ? 1 : 0)) {
                            h_m_reg[12] = h_m_reg[7];
                        }
                        else {
                            h_m_reg[12] = (-h_m_reg[7]);
                        }
                        h_m_reg[15] = h_m_reg[6];
                        do {
                            h_m_reg[13] = ((h_m_reg[13]) - (h_m_reg[12]));
                            msb = ((((Number(((mb_q) & (32768))) !== Number(0)) ? 1 : 0)) | 0);
                            mb_q = ((((mb_q) << (1))) << 16 >> 16);
                            if ((((h_m_reg[13]) >= (0)) ? 1 : 0)) {
                                mb_q = ((((mb_q) + (1))) << 16 >> 16);
                            }
                            else {
                                h_m_reg[13] = ((h_m_reg[13]) + (h_m_reg[12]));
                            }
                            h_m_reg[13] = ((h_m_reg[13]) << (1));
                            h_m_reg[13] = ((h_m_reg[13]) + (msb));
                        } while (((Number((h_m_reg[15] = ((h_m_reg[15]) - (1)))) >= Number(0)) ? 1 : 0));
                        if ((((h_m_reg[14]) >= (0)) ? 1 : 0)) {
                            members.m_result = ((mb_q) << 16 >> 16);
                        }
                        else {
                            members.m_result = (((-mb_q)) << 16 >> 16);
                        }
                        break;
                    }
                case 17:
                    {
                        h_m_reg[5] = ((((h_m_reg[5]) & (255))) | (((data) << (8))));
                        h_m_reg[15] = 0;
                        __switch_step_048_step_0bf = ((32) | 0);
                        continue;
                    }
                case 28:
                    {
                        h_m_reg[5] = ((((h_m_reg[5]) & (255))) | (((data) << (8))));
                        do {
                            h_m_reg[14] = runtime.shiftRight(((h_m_reg[4]) + (h_m_reg[7])), 1);
                            h_m_reg[15] = runtime.shiftRight(((h_m_reg[5]) + (h_m_reg[8])), 1);
                            if ((((((((((h_m_reg[11]) < (h_m_reg[14])) ? 1 : 0)) && ((((h_m_reg[15]) < (h_m_reg[14])) ? 1 : 0))) ? 1 : 0)) && (((Number(((h_m_reg[14]) + (h_m_reg[15]))) >= Number(0)) ? 1 : 0))) ? 1 : 0)) {
                                h_m_reg[7] = h_m_reg[14];
                                h_m_reg[8] = h_m_reg[15];
                            }
                            else {
                                h_m_reg[4] = h_m_reg[14];
                                h_m_reg[5] = h_m_reg[15];
                            }
                        } while (((Number((h_m_reg[6] = ((h_m_reg[6]) - (1)))) >= Number(0)) ? 1 : 0));
                        members.m_result = ((h_m_reg[8]) << 16 >> 16);
                        break;
                    }
                case 29:
                    {
                        h_m_reg[3] = ((((h_m_reg[3]) & (255))) | (((data) << (8))));
                        h_m_reg[2] = ((h_m_reg[2]) - (h_m_reg[0]));
                        if ((((h_m_reg[2]) < (0)) ? 1 : 0)) {
                            h_m_reg[2] = (-h_m_reg[2]);
                        }
                        h_m_reg[3] = ((h_m_reg[3]) - (h_m_reg[1]));
                        if ((((h_m_reg[3]) < (0)) ? 1 : 0)) {
                            h_m_reg[3] = (-h_m_reg[3]);
                        }
                    }
                case 30:
                    {
                        if ((((h_m_reg[3]) >= (h_m_reg[2])) ? 1 : 0)) {
                            h_m_reg[12] = h_m_reg[2];
                            h_m_reg[13] = h_m_reg[3];
                        }
                        else {
                            h_m_reg[13] = h_m_reg[2];
                            h_m_reg[12] = h_m_reg[3];
                        }
                        h_m_reg[12] = runtime.shiftRight(h_m_reg[12], 2);
                        h_m_reg[13] = ((h_m_reg[13]) + (h_m_reg[12]));
                        h_m_reg[12] = runtime.shiftRight(h_m_reg[12], 1);
                        members.m_result = (((h_m_reg[13] = ((h_m_reg[12]) + (h_m_reg[13])))) << 16 >> 16);
                        break;
                    }
                case 31:
                    {
                        0;
                        break;
                    }
            }
            break;
        }
        0;
    }
    function method_status_r(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_lo_r(runtime) {
        const members = runtime.members;
        return (((((members.m_result ?? 0)) & (255))) & 0xff);
    }
    function method_hi_r(runtime) {
        const members = runtime.members;
        return ((((runtime.shiftRight((members.m_result ?? 0), 8)) & (255))) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "go_w": method_go_w,
        "status_r": method_status_r,
        "lo_r": method_lo_r,
        "hi_r": method_hi_r
    };
    return __methodTable;
})();
export const device = definition;
export default device;
