import deviceData from './lr35902.device.ir.json' with { type: 'json' };
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
    function method_execute_run(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_incdec16_func"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16, __t17, __t18, __t19, __t20, __t21, __t22, __t23, __t24, __t25, __t26, __t27, __t28, __t29, __t30, __t31, __t32, __t33, __t34, __t35, __t36, __t37, __t38, __t39, __t40, __t41;
        do {
            if (((((members.m_dma_cycles_to_burn ?? 0)) > (0)) ? 1 : 0)) {
                if (((((members.m_dma_cycles_to_burn ?? 0)) < (4)) ? 1 : 0)) {
                    method_cycles_passed(runtime, (members.m_dma_cycles_to_burn ?? 0));
                    members.m_dma_cycles_to_burn = ((0) >>> 0);
                }
                else {
                    method_cycles_passed(runtime, 4);
                    members.m_dma_cycles_to_burn = ((((members.m_dma_cycles_to_burn) - (4))) >>> 0);
                }
            }
            else {
                if ((members.m_execution_state ?? 0)) {
                    let x = ((0) & 0xff);
                    switch ((members.m_op ?? 0)) {
                        case 0:
                            {
                                break;
                            }
                        case 1:
                            {
                                members.m_C = ((method_mem_read_byte(runtime, (__t0 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t0))) & 0xff);
                                members.m_B = ((method_mem_read_byte(runtime, (__t1 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t1))) & 0xff);
                                break;
                            }
                        case 2:
                            {
                                method_mem_write_byte(runtime, (((((members.m_B ?? 0)) << (8))) | ((members.m_C ?? 0))), (members.m_A ?? 0));
                                break;
                            }
                        case 3:
                            {
                                let r = (((((((members.m_B ?? 0)) << (8))) | ((members.m_C ?? 0)))) & 0xffff);
                                if (((Number((members.m_C = ((((members.m_C) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_B = ((((members.m_B) + (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r) << (16))) | ((((members.m_B ?? 0)) << (8))))) | ((members.m_C ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r) << (16))) | ((((members.m_B ?? 0)) << (8))))) | ((members.m_C ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r) << (16))) | ((((members.m_B ?? 0)) << (8))))) | ((members.m_C ?? 0)))));
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 4:
                            {
                                let r__1 = ((0) & 0xff);
                                let f = ((0) & 0xff);
                                members.m_B = ((((members.m_B) + (1))) & 0xff);
                                r__1 = (((members.m_B ?? 0)) & 0xff);
                                f = (((((((members.m_F ?? 0)) & (16))) & 0xff)) & 0xff);
                                if ((((r__1) === (0)) ? 1 : 0)) {
                                    f = ((((f) | (128))) & 0xff);
                                }
                                if (((Number(((r__1) & (15))) === Number(0)) ? 1 : 0)) {
                                    f = ((((f) | (32))) & 0xff);
                                }
                                members.m_F = ((f) & 0xff);
                                break;
                            }
                        case 5:
                            {
                                let r__2 = ((0) & 0xff);
                                let f__1 = ((0) & 0xff);
                                members.m_B = ((((members.m_B) - (1))) & 0xff);
                                r__2 = (((members.m_B ?? 0)) & 0xff);
                                f__1 = (((((((((members.m_F ?? 0)) & (16))) | (64))) & 0xff)) & 0xff);
                                if ((((r__2) === (0)) ? 1 : 0)) {
                                    f__1 = ((((f__1) | (128))) & 0xff);
                                }
                                if (((Number(((r__2) & (15))) === Number(15)) ? 1 : 0)) {
                                    f__1 = ((((f__1) | (32))) & 0xff);
                                }
                                members.m_F = ((f__1) & 0xff);
                                break;
                            }
                        case 6:
                            {
                                members.m_B = ((method_mem_read_byte(runtime, (__t2 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t2))) & 0xff);
                                break;
                            }
                        case 7:
                            {
                                members.m_A = (((((((((members.m_A ?? 0)) << (1))) | ((((members.m_A ?? 0)) >>> (7))))) & 0xff)) & 0xff);
                                if ((((members.m_A ?? 0)) & (1))) {
                                    members.m_F = ((16) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 8:
                            {
                                method_mem_write_word(runtime, method_mem_read_word(runtime, (members.m_PC ?? 0)), (members.m_SP ?? 0));
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                break;
                            }
                        case 9:
                            {
                                let r1 = ((0) >>> 0);
                                let r2 = ((0) >>> 0);
                                let f__2 = ((0) & 0xff);
                                r1 = ((__add_execute_run(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (((((members.m_B ?? 0)) << (8))) | ((members.m_C ?? 0))))) >>> 0);
                                r2 = ((__add_execute_run(runtime, (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & (4095)), (((((((members.m_B ?? 0)) << (8))) | ((members.m_C ?? 0)))) & (4095)))) >>> 0);
                                f__2 = (((((((members.m_F ?? 0)) & (128))) & 0xff)) & 0xff);
                                if ((((r1) > (65535)) ? 1 : 0)) {
                                    f__2 = ((((f__2) | (16))) & 0xff);
                                }
                                if ((((r2) > (4095)) ? 1 : 0)) {
                                    f__2 = ((((f__2) | (32))) & 0xff);
                                }
                                members.m_L = ((r1) & 0xff);
                                members.m_H = ((((r1) >>> (8))) & 0xff);
                                members.m_F = ((f__2) & 0xff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 10:
                            {
                                members.m_A = ((method_mem_read_byte(runtime, (((((members.m_B ?? 0)) << (8))) | ((members.m_C ?? 0))))) & 0xff);
                                break;
                            }
                        case 11:
                            {
                                let r__3 = (((((((members.m_B ?? 0)) << (8))) | ((members.m_C ?? 0)))) & 0xffff);
                                if (((Number((members.m_C = ((((members.m_C) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                                    members.m_B = ((((members.m_B) - (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r__3) << (16))) | ((((members.m_B ?? 0)) << (8))))) | ((members.m_C ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r__3) << (16))) | ((((members.m_B ?? 0)) << (8))))) | ((members.m_C ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r__3) << (16))) | ((((members.m_B ?? 0)) << (8))))) | ((members.m_C ?? 0)))));
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 12:
                            {
                                let r__4 = ((0) & 0xff);
                                let f__3 = ((0) & 0xff);
                                members.m_C = ((((members.m_C) + (1))) & 0xff);
                                r__4 = (((members.m_C ?? 0)) & 0xff);
                                f__3 = (((((((members.m_F ?? 0)) & (16))) & 0xff)) & 0xff);
                                if ((((r__4) === (0)) ? 1 : 0)) {
                                    f__3 = ((((f__3) | (128))) & 0xff);
                                }
                                if (((Number(((r__4) & (15))) === Number(0)) ? 1 : 0)) {
                                    f__3 = ((((f__3) | (32))) & 0xff);
                                }
                                members.m_F = ((f__3) & 0xff);
                                break;
                            }
                        case 13:
                            {
                                let r__5 = ((0) & 0xff);
                                let f__4 = ((0) & 0xff);
                                members.m_C = ((((members.m_C) - (1))) & 0xff);
                                r__5 = (((members.m_C ?? 0)) & 0xff);
                                f__4 = (((((((((members.m_F ?? 0)) & (16))) | (64))) & 0xff)) & 0xff);
                                if ((((r__5) === (0)) ? 1 : 0)) {
                                    f__4 = ((((f__4) | (128))) & 0xff);
                                }
                                if (((Number(((r__5) & (15))) === Number(15)) ? 1 : 0)) {
                                    f__4 = ((((f__4) | (32))) & 0xff);
                                }
                                members.m_F = ((f__4) & 0xff);
                                break;
                            }
                        case 14:
                            {
                                members.m_C = ((method_mem_read_byte(runtime, (__t3 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t3))) & 0xff);
                                break;
                            }
                        case 15:
                            {
                                members.m_A = (((((((((members.m_A ?? 0)) >>> (1))) | ((((members.m_A ?? 0)) << (7))))) & 0xff)) & 0xff);
                                members.m_F = ((0) & 0xff);
                                if ((((members.m_A ?? 0)) & (128))) {
                                    members.m_F = ((((members.m_F) | (16))) & 0xff);
                                }
                                break;
                            }
                        case 16:
                            {
                                method_mem_read_byte(runtime, (__t4 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t4));
                                if ((members.m_gb_speed_change_pending ?? 0)) {
                                    if (((((members.m_gb_speed ?? 0)) === (1)) ? 1 : 0)) {
                                        let cycles = ((5963784) >>> 0);
                                        do {
                                            method_cycles_passed(runtime, 128);
                                            cycles = ((((cycles) - (128))) >>> 0);
                                        } while ((((cycles) > (128)) ? 1 : 0));
                                        method_cycles_passed(runtime, cycles);
                                    }
                                    members.m_gb_speed = ((((((((members.m_gb_speed ?? 0)) === (1)) ? 1 : 0)) ? (2) : (1))) | 0);
                                }
                                members.m_gb_speed_change_pending = ((0) | 0);
                                break;
                            }
                        case 17:
                            {
                                members.m_E = ((method_mem_read_byte(runtime, (__t5 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t5))) & 0xff);
                                members.m_D = ((method_mem_read_byte(runtime, (__t6 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t6))) & 0xff);
                                break;
                            }
                        case 18:
                            {
                                method_mem_write_byte(runtime, (((((members.m_D ?? 0)) << (8))) | ((members.m_E ?? 0))), (members.m_A ?? 0));
                                break;
                            }
                        case 19:
                            {
                                let r__6 = (((((((members.m_D ?? 0)) << (8))) | ((members.m_E ?? 0)))) & 0xffff);
                                if (((Number((members.m_E = ((((members.m_E) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_D = ((((members.m_D) + (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r__6) << (16))) | ((((members.m_D ?? 0)) << (8))))) | ((members.m_E ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r__6) << (16))) | ((((members.m_D ?? 0)) << (8))))) | ((members.m_E ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r__6) << (16))) | ((((members.m_D ?? 0)) << (8))))) | ((members.m_E ?? 0)))));
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 20:
                            {
                                let r__7 = ((0) & 0xff);
                                let f__5 = ((0) & 0xff);
                                members.m_D = ((((members.m_D) + (1))) & 0xff);
                                r__7 = (((members.m_D ?? 0)) & 0xff);
                                f__5 = (((((((members.m_F ?? 0)) & (16))) & 0xff)) & 0xff);
                                if ((((r__7) === (0)) ? 1 : 0)) {
                                    f__5 = ((((f__5) | (128))) & 0xff);
                                }
                                if (((Number(((r__7) & (15))) === Number(0)) ? 1 : 0)) {
                                    f__5 = ((((f__5) | (32))) & 0xff);
                                }
                                members.m_F = ((f__5) & 0xff);
                                break;
                            }
                        case 21:
                            {
                                let r__8 = ((0) & 0xff);
                                let f__6 = ((0) & 0xff);
                                members.m_D = ((((members.m_D) - (1))) & 0xff);
                                r__8 = (((members.m_D ?? 0)) & 0xff);
                                f__6 = (((((((((members.m_F ?? 0)) & (16))) | (64))) & 0xff)) & 0xff);
                                if ((((r__8) === (0)) ? 1 : 0)) {
                                    f__6 = ((((f__6) | (128))) & 0xff);
                                }
                                if (((Number(((r__8) & (15))) === Number(15)) ? 1 : 0)) {
                                    f__6 = ((((f__6) | (32))) & 0xff);
                                }
                                members.m_F = ((f__6) & 0xff);
                                break;
                            }
                        case 22:
                            {
                                members.m_D = ((method_mem_read_byte(runtime, (__t7 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t7))) & 0xff);
                                break;
                            }
                        case 23:
                            {
                                x = (((((((members.m_A ?? 0)) & (128))) ? (16) : (0))) & 0xff);
                                members.m_A = (((((((((members.m_A ?? 0)) << (1))) | ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                                members.m_F = ((x) & 0xff);
                                break;
                            }
                        case 24:
                            {
                                let offset = ((0) << 24 >> 24);
                                offset = ((method_mem_read_byte(runtime, (__t8 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t8))) << 24 >> 24);
                                members.m_PC = ((((members.m_PC) + (offset))) & 0xffff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 25:
                            {
                                let r1__1 = ((0) >>> 0);
                                let r2__1 = ((0) >>> 0);
                                let f__7 = ((0) & 0xff);
                                r1__1 = ((__add_execute_run(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (((((members.m_D ?? 0)) << (8))) | ((members.m_E ?? 0))))) >>> 0);
                                r2__1 = ((__add_execute_run(runtime, (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & (4095)), (((((((members.m_D ?? 0)) << (8))) | ((members.m_E ?? 0)))) & (4095)))) >>> 0);
                                f__7 = (((((((members.m_F ?? 0)) & (128))) & 0xff)) & 0xff);
                                if ((((r1__1) > (65535)) ? 1 : 0)) {
                                    f__7 = ((((f__7) | (16))) & 0xff);
                                }
                                if ((((r2__1) > (4095)) ? 1 : 0)) {
                                    f__7 = ((((f__7) | (32))) & 0xff);
                                }
                                members.m_L = ((r1__1) & 0xff);
                                members.m_H = ((((r1__1) >>> (8))) & 0xff);
                                members.m_F = ((f__7) & 0xff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 26:
                            {
                                members.m_A = ((method_mem_read_byte(runtime, (((((members.m_D ?? 0)) << (8))) | ((members.m_E ?? 0))))) & 0xff);
                                break;
                            }
                        case 27:
                            {
                                let r__9 = (((((((members.m_D ?? 0)) << (8))) | ((members.m_E ?? 0)))) & 0xffff);
                                if (((Number((members.m_E = ((((members.m_E) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                                    members.m_D = ((((members.m_D) - (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r__9) << (16))) | ((((members.m_D ?? 0)) << (8))))) | ((members.m_E ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r__9) << (16))) | ((((members.m_D ?? 0)) << (8))))) | ((members.m_E ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r__9) << (16))) | ((((members.m_D ?? 0)) << (8))))) | ((members.m_E ?? 0)))));
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 28:
                            {
                                let r__10 = ((0) & 0xff);
                                let f__8 = ((0) & 0xff);
                                members.m_E = ((((members.m_E) + (1))) & 0xff);
                                r__10 = (((members.m_E ?? 0)) & 0xff);
                                f__8 = (((((((members.m_F ?? 0)) & (16))) & 0xff)) & 0xff);
                                if ((((r__10) === (0)) ? 1 : 0)) {
                                    f__8 = ((((f__8) | (128))) & 0xff);
                                }
                                if (((Number(((r__10) & (15))) === Number(0)) ? 1 : 0)) {
                                    f__8 = ((((f__8) | (32))) & 0xff);
                                }
                                members.m_F = ((f__8) & 0xff);
                                break;
                            }
                        case 29:
                            {
                                let r__11 = ((0) & 0xff);
                                let f__9 = ((0) & 0xff);
                                members.m_E = ((((members.m_E) - (1))) & 0xff);
                                r__11 = (((members.m_E ?? 0)) & 0xff);
                                f__9 = (((((((((members.m_F ?? 0)) & (16))) | (64))) & 0xff)) & 0xff);
                                if ((((r__11) === (0)) ? 1 : 0)) {
                                    f__9 = ((((f__9) | (128))) & 0xff);
                                }
                                if (((Number(((r__11) & (15))) === Number(15)) ? 1 : 0)) {
                                    f__9 = ((((f__9) | (32))) & 0xff);
                                }
                                members.m_F = ((f__9) & 0xff);
                                break;
                            }
                        case 30:
                            {
                                members.m_E = ((method_mem_read_byte(runtime, (__t9 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t9))) & 0xff);
                                break;
                            }
                        case 31:
                            {
                                x = (((((((members.m_A ?? 0)) & (1))) ? (16) : (0))) & 0xff);
                                members.m_A = (((((((((members.m_A ?? 0)) >>> (1))) | ((((((members.m_F ?? 0)) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                                members.m_F = ((x) & 0xff);
                                break;
                            }
                        case 32:
                            {
                                let offset__1 = ((method_mem_read_byte(runtime, (__t10 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t10))) << 24 >> 24);
                                if ((((((members.m_F ?? 0)) & (128))) ? 0 : 1)) {
                                    members.m_PC = ((((members.m_PC) + (offset__1))) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 33:
                            {
                                members.m_L = ((method_mem_read_byte(runtime, (__t11 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t11))) & 0xff);
                                members.m_H = ((method_mem_read_byte(runtime, (__t12 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t12))) & 0xff);
                                break;
                            }
                        case 34:
                            {
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (members.m_A ?? 0));
                                let r__12 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                if (((Number((members.m_L = ((((members.m_L) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_H = ((((members.m_H) + (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r__12) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r__12) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r__12) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))));
                                break;
                            }
                        case 35:
                            {
                                let r__13 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                if (((Number((members.m_L = ((((members.m_L) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_H = ((((members.m_H) + (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r__13) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r__13) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r__13) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))));
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 36:
                            {
                                let r__14 = ((0) & 0xff);
                                let f__10 = ((0) & 0xff);
                                members.m_H = ((((members.m_H) + (1))) & 0xff);
                                r__14 = (((members.m_H ?? 0)) & 0xff);
                                f__10 = (((((((members.m_F ?? 0)) & (16))) & 0xff)) & 0xff);
                                if ((((r__14) === (0)) ? 1 : 0)) {
                                    f__10 = ((((f__10) | (128))) & 0xff);
                                }
                                if (((Number(((r__14) & (15))) === Number(0)) ? 1 : 0)) {
                                    f__10 = ((((f__10) | (32))) & 0xff);
                                }
                                members.m_F = ((f__10) & 0xff);
                                break;
                            }
                        case 37:
                            {
                                let r__15 = ((0) & 0xff);
                                let f__11 = ((0) & 0xff);
                                members.m_H = ((((members.m_H) - (1))) & 0xff);
                                r__15 = (((members.m_H ?? 0)) & 0xff);
                                f__11 = (((((((((members.m_F ?? 0)) & (16))) | (64))) & 0xff)) & 0xff);
                                if ((((r__15) === (0)) ? 1 : 0)) {
                                    f__11 = ((((f__11) | (128))) & 0xff);
                                }
                                if (((Number(((r__15) & (15))) === Number(15)) ? 1 : 0)) {
                                    f__11 = ((((f__11) | (32))) & 0xff);
                                }
                                members.m_F = ((f__11) & 0xff);
                                break;
                            }
                        case 38:
                            {
                                members.m_H = ((method_mem_read_byte(runtime, (__t13 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t13))) & 0xff);
                                break;
                            }
                        case 39:
                            {
                                let tmp = (((members.m_A ?? 0)) | 0);
                                if ((((((members.m_F ?? 0)) & (64))) ? 0 : 1)) {
                                    if (((((((members.m_F ?? 0)) & (32))) || (((Number(((tmp) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
                                        tmp = ((((tmp) + (6))) | 0);
                                    }
                                    if (((((((members.m_F ?? 0)) & (16))) || ((((tmp) > (159)) ? 1 : 0))) ? 1 : 0)) {
                                        tmp = ((((tmp) + (96))) | 0);
                                    }
                                }
                                else {
                                    if ((((members.m_F ?? 0)) & (32))) {
                                        tmp = ((((tmp) - (6))) | 0);
                                        if ((((((members.m_F ?? 0)) & (16))) ? 0 : 1)) {
                                            tmp = ((((tmp) & (255))) | 0);
                                        }
                                    }
                                    if ((((members.m_F ?? 0)) & (16))) {
                                        tmp = ((((tmp) - (96))) | 0);
                                    }
                                }
                                members.m_F = ((((members.m_F) & (-161))) & 0xff);
                                if (((tmp) & (256))) {
                                    members.m_F = ((((members.m_F) | (16))) & 0xff);
                                }
                                members.m_A = ((((tmp) & (255))) & 0xff);
                                if ((((members.m_A ?? 0)) ? 0 : 1)) {
                                    members.m_F = ((((members.m_F) | (128))) & 0xff);
                                }
                                break;
                            }
                        case 40:
                            {
                                let offset__2 = ((method_mem_read_byte(runtime, (__t14 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t14))) << 24 >> 24);
                                if ((((members.m_F ?? 0)) & (128))) {
                                    members.m_PC = ((((members.m_PC) + (offset__2))) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 41:
                            {
                                let r1__2 = ((0) >>> 0);
                                let r2__2 = ((0) >>> 0);
                                let f__12 = ((0) & 0xff);
                                r1__2 = ((__add_execute_run(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) >>> 0);
                                r2__2 = ((__add_execute_run(runtime, (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & (4095)), (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & (4095)))) >>> 0);
                                f__12 = (((((((members.m_F ?? 0)) & (128))) & 0xff)) & 0xff);
                                if ((((r1__2) > (65535)) ? 1 : 0)) {
                                    f__12 = ((((f__12) | (16))) & 0xff);
                                }
                                if ((((r2__2) > (4095)) ? 1 : 0)) {
                                    f__12 = ((((f__12) | (32))) & 0xff);
                                }
                                members.m_L = ((r1__2) & 0xff);
                                members.m_H = ((((r1__2) >>> (8))) & 0xff);
                                members.m_F = ((f__12) & 0xff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 42:
                            {
                                members.m_A = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                let r__16 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                if (((Number((members.m_L = ((((members.m_L) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_H = ((((members.m_H) + (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r__16) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r__16) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r__16) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))));
                                break;
                            }
                        case 43:
                            {
                                let r__17 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                if (((Number((members.m_L = ((((members.m_L) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                                    members.m_H = ((((members.m_H) - (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r__17) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r__17) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r__17) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))));
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 44:
                            {
                                let r__18 = ((0) & 0xff);
                                let f__13 = ((0) & 0xff);
                                members.m_L = ((((members.m_L) + (1))) & 0xff);
                                r__18 = (((members.m_L ?? 0)) & 0xff);
                                f__13 = (((((((members.m_F ?? 0)) & (16))) & 0xff)) & 0xff);
                                if ((((r__18) === (0)) ? 1 : 0)) {
                                    f__13 = ((((f__13) | (128))) & 0xff);
                                }
                                if (((Number(((r__18) & (15))) === Number(0)) ? 1 : 0)) {
                                    f__13 = ((((f__13) | (32))) & 0xff);
                                }
                                members.m_F = ((f__13) & 0xff);
                                break;
                            }
                        case 45:
                            {
                                let r__19 = ((0) & 0xff);
                                let f__14 = ((0) & 0xff);
                                members.m_L = ((((members.m_L) - (1))) & 0xff);
                                r__19 = (((members.m_L ?? 0)) & 0xff);
                                f__14 = (((((((((members.m_F ?? 0)) & (16))) | (64))) & 0xff)) & 0xff);
                                if ((((r__19) === (0)) ? 1 : 0)) {
                                    f__14 = ((((f__14) | (128))) & 0xff);
                                }
                                if (((Number(((r__19) & (15))) === Number(15)) ? 1 : 0)) {
                                    f__14 = ((((f__14) | (32))) & 0xff);
                                }
                                members.m_F = ((f__14) & 0xff);
                                break;
                            }
                        case 46:
                            {
                                members.m_L = ((method_mem_read_byte(runtime, (__t15 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t15))) & 0xff);
                                break;
                            }
                        case 47:
                            {
                                members.m_A = (((~(members.m_A ?? 0))) & 0xff);
                                members.m_F = ((((members.m_F) | (96))) & 0xff);
                                break;
                            }
                        case 48:
                            {
                                let offset__3 = ((method_mem_read_byte(runtime, (__t16 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t16))) << 24 >> 24);
                                if ((((((members.m_F ?? 0)) & (16))) ? 0 : 1)) {
                                    members.m_PC = ((((members.m_PC) + (offset__3))) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 49:
                            {
                                members.m_SP = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                break;
                            }
                        case 50:
                            {
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (members.m_A ?? 0));
                                let r__20 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                if (((Number((members.m_L = ((((members.m_L) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                                    members.m_H = ((((members.m_H) - (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r__20) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r__20) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r__20) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))));
                                break;
                            }
                        case 51:
                            {
                                members.m_SP = ((((members.m_SP) + (1))) & 0xffff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 52:
                            {
                                let addr = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                let r__21 = ((0) & 0xff);
                                let f__15 = ((0) & 0xff);
                                f__15 = (((((((members.m_F ?? 0)) & (16))) & 0xff)) & 0xff);
                                r__21 = ((method_mem_read_byte(runtime, addr)) & 0xff);
                                r__21 = ((((r__21) + (1))) & 0xff);
                                method_mem_write_byte(runtime, addr, r__21);
                                if ((((r__21) === (0)) ? 1 : 0)) {
                                    f__15 = ((((f__15) | (128))) & 0xff);
                                }
                                if (((Number(((r__21) & (15))) === Number(0)) ? 1 : 0)) {
                                    f__15 = ((((f__15) | (32))) & 0xff);
                                }
                                members.m_F = ((f__15) & 0xff);
                                break;
                            }
                        case 53:
                            {
                                let addr__1 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                let r__22 = ((0) & 0xff);
                                let f__16 = ((0) & 0xff);
                                f__16 = (((((((((members.m_F ?? 0)) & (16))) | (64))) & 0xff)) & 0xff);
                                r__22 = ((method_mem_read_byte(runtime, addr__1)) & 0xff);
                                r__22 = ((((r__22) - (1))) & 0xff);
                                method_mem_write_byte(runtime, addr__1, r__22);
                                if ((((r__22) === (0)) ? 1 : 0)) {
                                    f__16 = ((((f__16) | (128))) & 0xff);
                                }
                                if (((Number(((r__22) & (15))) === Number(15)) ? 1 : 0)) {
                                    f__16 = ((((f__16) | (32))) & 0xff);
                                }
                                members.m_F = ((f__16) & 0xff);
                                break;
                            }
                        case 54:
                            {
                                let v = ((method_mem_read_byte(runtime, (__t17 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t17))) & 0xff);
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), v);
                                break;
                            }
                        case 55:
                            {
                                members.m_F = (((((((((members.m_F ?? 0)) & (128))) | (16))) & 0xff)) & 0xff);
                                break;
                            }
                        case 56:
                            {
                                let offset__4 = ((method_mem_read_byte(runtime, (__t18 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t18))) << 24 >> 24);
                                if ((((members.m_F ?? 0)) & (16))) {
                                    members.m_PC = ((((members.m_PC) + (offset__4))) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 57:
                            {
                                let r1__3 = ((0) >>> 0);
                                let r2__3 = ((0) >>> 0);
                                let f__17 = ((0) & 0xff);
                                r1__3 = (((((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) + ((members.m_SP ?? 0)))) >>> 0);
                                r2__3 = ((__add_execute_run(runtime, (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & (4095)), (((members.m_SP ?? 0)) & (4095)))) >>> 0);
                                f__17 = (((((((members.m_F ?? 0)) & (128))) & 0xff)) & 0xff);
                                if ((((r1__3) > (65535)) ? 1 : 0)) {
                                    f__17 = ((((f__17) | (16))) & 0xff);
                                }
                                if ((((r2__3) > (4095)) ? 1 : 0)) {
                                    f__17 = ((((f__17) | (32))) & 0xff);
                                }
                                members.m_L = ((r1__3) & 0xff);
                                members.m_H = ((((r1__3) >>> (8))) & 0xff);
                                members.m_F = ((f__17) & 0xff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 58:
                            {
                                members.m_A = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                let r__23 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                if (((Number((members.m_L = ((((members.m_L) - (1))) & 0xff))) === Number(255)) ? 1 : 0)) {
                                    members.m_H = ((((members.m_H) - (1))) & 0xff);
                                }
                                (__L0 ? __L0(Number(((((((r__23) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0))))) : typeof members.m_incdec16_func === 'function' ? members.m_incdec16_func(((((((r__23) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))) : runtime.invoke("m_incdec16_func", ((((((r__23) << (16))) | ((((members.m_H ?? 0)) << (8))))) | ((members.m_L ?? 0)))));
                                break;
                            }
                        case 59:
                            {
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 60:
                            {
                                let r__24 = ((0) & 0xff);
                                let f__18 = ((0) & 0xff);
                                members.m_A = ((((members.m_A) + (1))) & 0xff);
                                r__24 = (((members.m_A ?? 0)) & 0xff);
                                f__18 = (((((((members.m_F ?? 0)) & (16))) & 0xff)) & 0xff);
                                if ((((r__24) === (0)) ? 1 : 0)) {
                                    f__18 = ((((f__18) | (128))) & 0xff);
                                }
                                if (((Number(((r__24) & (15))) === Number(0)) ? 1 : 0)) {
                                    f__18 = ((((f__18) | (32))) & 0xff);
                                }
                                members.m_F = ((f__18) & 0xff);
                                break;
                            }
                        case 61:
                            {
                                let r__25 = ((0) & 0xff);
                                let f__19 = ((0) & 0xff);
                                members.m_A = ((((members.m_A) - (1))) & 0xff);
                                r__25 = (((members.m_A ?? 0)) & 0xff);
                                f__19 = (((((((((members.m_F ?? 0)) & (16))) | (64))) & 0xff)) & 0xff);
                                if ((((r__25) === (0)) ? 1 : 0)) {
                                    f__19 = ((((f__19) | (128))) & 0xff);
                                }
                                if (((Number(((r__25) & (15))) === Number(15)) ? 1 : 0)) {
                                    f__19 = ((((f__19) | (32))) & 0xff);
                                }
                                members.m_F = ((f__19) & 0xff);
                                break;
                            }
                        case 62:
                            {
                                members.m_A = ((method_mem_read_byte(runtime, (__t19 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t19))) & 0xff);
                                break;
                            }
                        case 63:
                            {
                                members.m_F = (((((((((members.m_F ?? 0)) & (128))) | ((((((members.m_F ?? 0)) & (16))) ? (0) : (16))))) & 0xff)) & 0xff);
                                break;
                            }
                        case 64:
                            {
                                break;
                            }
                        case 65:
                            {
                                members.m_B = (((members.m_C ?? 0)) & 0xff);
                                break;
                            }
                        case 66:
                            {
                                members.m_B = (((members.m_D ?? 0)) & 0xff);
                                break;
                            }
                        case 67:
                            {
                                members.m_B = (((members.m_E ?? 0)) & 0xff);
                                break;
                            }
                        case 68:
                            {
                                members.m_B = (((members.m_H ?? 0)) & 0xff);
                                break;
                            }
                        case 69:
                            {
                                members.m_B = (((members.m_L ?? 0)) & 0xff);
                                break;
                            }
                        case 70:
                            {
                                members.m_B = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                break;
                            }
                        case 71:
                            {
                                members.m_B = (((members.m_A ?? 0)) & 0xff);
                                break;
                            }
                        case 72:
                            {
                                members.m_C = (((members.m_B ?? 0)) & 0xff);
                                break;
                            }
                        case 73:
                            {
                                break;
                            }
                        case 74:
                            {
                                members.m_C = (((members.m_D ?? 0)) & 0xff);
                                break;
                            }
                        case 75:
                            {
                                members.m_C = (((members.m_E ?? 0)) & 0xff);
                                break;
                            }
                        case 76:
                            {
                                members.m_C = (((members.m_H ?? 0)) & 0xff);
                                break;
                            }
                        case 77:
                            {
                                members.m_C = (((members.m_L ?? 0)) & 0xff);
                                break;
                            }
                        case 78:
                            {
                                members.m_C = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                break;
                            }
                        case 79:
                            {
                                members.m_C = (((members.m_A ?? 0)) & 0xff);
                                break;
                            }
                        case 80:
                            {
                                members.m_D = (((members.m_B ?? 0)) & 0xff);
                                break;
                            }
                        case 81:
                            {
                                members.m_D = (((members.m_C ?? 0)) & 0xff);
                                break;
                            }
                        case 82:
                            {
                                break;
                            }
                        case 83:
                            {
                                members.m_D = (((members.m_E ?? 0)) & 0xff);
                                break;
                            }
                        case 84:
                            {
                                members.m_D = (((members.m_H ?? 0)) & 0xff);
                                break;
                            }
                        case 85:
                            {
                                members.m_D = (((members.m_L ?? 0)) & 0xff);
                                break;
                            }
                        case 86:
                            {
                                members.m_D = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                break;
                            }
                        case 87:
                            {
                                members.m_D = (((members.m_A ?? 0)) & 0xff);
                                break;
                            }
                        case 88:
                            {
                                members.m_E = (((members.m_B ?? 0)) & 0xff);
                                break;
                            }
                        case 89:
                            {
                                members.m_E = (((members.m_C ?? 0)) & 0xff);
                                break;
                            }
                        case 90:
                            {
                                members.m_E = (((members.m_D ?? 0)) & 0xff);
                                break;
                            }
                        case 91:
                            {
                                break;
                            }
                        case 92:
                            {
                                members.m_E = (((members.m_H ?? 0)) & 0xff);
                                break;
                            }
                        case 93:
                            {
                                members.m_E = (((members.m_L ?? 0)) & 0xff);
                                break;
                            }
                        case 94:
                            {
                                members.m_E = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                break;
                            }
                        case 95:
                            {
                                members.m_E = (((members.m_A ?? 0)) & 0xff);
                                break;
                            }
                        case 96:
                            {
                                members.m_H = (((members.m_B ?? 0)) & 0xff);
                                break;
                            }
                        case 97:
                            {
                                members.m_H = (((members.m_C ?? 0)) & 0xff);
                                break;
                            }
                        case 98:
                            {
                                members.m_H = (((members.m_D ?? 0)) & 0xff);
                                break;
                            }
                        case 99:
                            {
                                members.m_H = (((members.m_E ?? 0)) & 0xff);
                                break;
                            }
                        case 100:
                            {
                                break;
                            }
                        case 101:
                            {
                                members.m_H = (((members.m_L ?? 0)) & 0xff);
                                break;
                            }
                        case 102:
                            {
                                members.m_H = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                break;
                            }
                        case 103:
                            {
                                members.m_H = (((members.m_A ?? 0)) & 0xff);
                                break;
                            }
                        case 104:
                            {
                                members.m_L = (((members.m_B ?? 0)) & 0xff);
                                break;
                            }
                        case 105:
                            {
                                members.m_L = (((members.m_C ?? 0)) & 0xff);
                                break;
                            }
                        case 106:
                            {
                                members.m_L = (((members.m_D ?? 0)) & 0xff);
                                break;
                            }
                        case 107:
                            {
                                members.m_L = (((members.m_E ?? 0)) & 0xff);
                                break;
                            }
                        case 108:
                            {
                                members.m_L = (((members.m_H ?? 0)) & 0xff);
                                break;
                            }
                        case 109:
                            {
                                break;
                            }
                        case 110:
                            {
                                members.m_L = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                break;
                            }
                        case 111:
                            {
                                members.m_L = (((members.m_A ?? 0)) & 0xff);
                                break;
                            }
                        case 112:
                            {
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (members.m_B ?? 0));
                                break;
                            }
                        case 113:
                            {
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (members.m_C ?? 0));
                                break;
                            }
                        case 114:
                            {
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (members.m_D ?? 0));
                                break;
                            }
                        case 115:
                            {
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (members.m_E ?? 0));
                                break;
                            }
                        case 116:
                            {
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (members.m_H ?? 0));
                                break;
                            }
                        case 117:
                            {
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (members.m_L ?? 0));
                                break;
                            }
                        case 118:
                            {
                                members.m_enable = ((((members.m_enable) | (2))) | 0);
                                members.m_entering_halt = ((1) ? 1 : 0);
                                members.m_op = ((method_mem_read_byte(runtime, (members.m_PC ?? 0))) & 0xff);
                                members.m_PC = ((((members.m_PC) - (1))) & 0xffff);
                                break;
                            }
                        case 119:
                            {
                                method_mem_write_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))), (members.m_A ?? 0));
                                break;
                            }
                        case 120:
                            {
                                members.m_A = (((members.m_B ?? 0)) & 0xff);
                                break;
                            }
                        case 121:
                            {
                                members.m_A = (((members.m_C ?? 0)) & 0xff);
                                break;
                            }
                        case 122:
                            {
                                members.m_A = (((members.m_D ?? 0)) & 0xff);
                                break;
                            }
                        case 123:
                            {
                                members.m_A = (((members.m_E ?? 0)) & 0xff);
                                break;
                            }
                        case 124:
                            {
                                members.m_A = (((members.m_H ?? 0)) & 0xff);
                                break;
                            }
                        case 125:
                            {
                                members.m_A = (((members.m_L ?? 0)) & 0xff);
                                break;
                            }
                        case 126:
                            {
                                members.m_A = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                break;
                            }
                        case 127:
                            {
                                break;
                            }
                        case 128:
                            {
                                let r1__4 = ((0) & 0xffff);
                                let r2__4 = ((0) & 0xffff);
                                let f__20 = ((0) & 0xff);
                                r1__4 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_B ?? 0)) & (15)))) & 0xffff)) & 0xffff);
                                r2__4 = (((((((members.m_A ?? 0)) + ((members.m_B ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__4) & 0xff)) & 0xff);
                                if ((((((r2__4) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__20 = ((128) & 0xff);
                                }
                                else {
                                    f__20 = ((0) & 0xff);
                                }
                                if ((((r2__4) > (255)) ? 1 : 0)) {
                                    f__20 = ((((f__20) | (16))) & 0xff);
                                }
                                if ((((r1__4) > (15)) ? 1 : 0)) {
                                    f__20 = ((((f__20) | (32))) & 0xff);
                                }
                                members.m_F = ((f__20) & 0xff);
                                break;
                            }
                        case 129:
                            {
                                let r1__5 = ((0) & 0xffff);
                                let r2__5 = ((0) & 0xffff);
                                let f__21 = ((0) & 0xff);
                                r1__5 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_C ?? 0)) & (15)))) & 0xffff)) & 0xffff);
                                r2__5 = (((((((members.m_A ?? 0)) + ((members.m_C ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__5) & 0xff)) & 0xff);
                                if ((((((r2__5) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__21 = ((128) & 0xff);
                                }
                                else {
                                    f__21 = ((0) & 0xff);
                                }
                                if ((((r2__5) > (255)) ? 1 : 0)) {
                                    f__21 = ((((f__21) | (16))) & 0xff);
                                }
                                if ((((r1__5) > (15)) ? 1 : 0)) {
                                    f__21 = ((((f__21) | (32))) & 0xff);
                                }
                                members.m_F = ((f__21) & 0xff);
                                break;
                            }
                        case 130:
                            {
                                let r1__6 = ((0) & 0xffff);
                                let r2__6 = ((0) & 0xffff);
                                let f__22 = ((0) & 0xff);
                                r1__6 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_D ?? 0)) & (15)))) & 0xffff)) & 0xffff);
                                r2__6 = (((((((members.m_A ?? 0)) + ((members.m_D ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__6) & 0xff)) & 0xff);
                                if ((((((r2__6) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__22 = ((128) & 0xff);
                                }
                                else {
                                    f__22 = ((0) & 0xff);
                                }
                                if ((((r2__6) > (255)) ? 1 : 0)) {
                                    f__22 = ((((f__22) | (16))) & 0xff);
                                }
                                if ((((r1__6) > (15)) ? 1 : 0)) {
                                    f__22 = ((((f__22) | (32))) & 0xff);
                                }
                                members.m_F = ((f__22) & 0xff);
                                break;
                            }
                        case 131:
                            {
                                let r1__7 = ((0) & 0xffff);
                                let r2__7 = ((0) & 0xffff);
                                let f__23 = ((0) & 0xff);
                                r1__7 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_E ?? 0)) & (15)))) & 0xffff)) & 0xffff);
                                r2__7 = (((((((members.m_A ?? 0)) + ((members.m_E ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__7) & 0xff)) & 0xff);
                                if ((((((r2__7) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__23 = ((128) & 0xff);
                                }
                                else {
                                    f__23 = ((0) & 0xff);
                                }
                                if ((((r2__7) > (255)) ? 1 : 0)) {
                                    f__23 = ((((f__23) | (16))) & 0xff);
                                }
                                if ((((r1__7) > (15)) ? 1 : 0)) {
                                    f__23 = ((((f__23) | (32))) & 0xff);
                                }
                                members.m_F = ((f__23) & 0xff);
                                break;
                            }
                        case 132:
                            {
                                let r1__8 = ((0) & 0xffff);
                                let r2__8 = ((0) & 0xffff);
                                let f__24 = ((0) & 0xff);
                                r1__8 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_H ?? 0)) & (15)))) & 0xffff)) & 0xffff);
                                r2__8 = (((((((members.m_A ?? 0)) + ((members.m_H ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__8) & 0xff)) & 0xff);
                                if ((((((r2__8) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__24 = ((128) & 0xff);
                                }
                                else {
                                    f__24 = ((0) & 0xff);
                                }
                                if ((((r2__8) > (255)) ? 1 : 0)) {
                                    f__24 = ((((f__24) | (16))) & 0xff);
                                }
                                if ((((r1__8) > (15)) ? 1 : 0)) {
                                    f__24 = ((((f__24) | (32))) & 0xff);
                                }
                                members.m_F = ((f__24) & 0xff);
                                break;
                            }
                        case 133:
                            {
                                let r1__9 = ((0) & 0xffff);
                                let r2__9 = ((0) & 0xffff);
                                let f__25 = ((0) & 0xff);
                                r1__9 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_L ?? 0)) & (15)))) & 0xffff)) & 0xffff);
                                r2__9 = (((((((members.m_A ?? 0)) + ((members.m_L ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__9) & 0xff)) & 0xff);
                                if ((((((r2__9) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__25 = ((128) & 0xff);
                                }
                                else {
                                    f__25 = ((0) & 0xff);
                                }
                                if ((((r2__9) > (255)) ? 1 : 0)) {
                                    f__25 = ((((f__25) | (16))) & 0xff);
                                }
                                if ((((r1__9) > (15)) ? 1 : 0)) {
                                    f__25 = ((((f__25) | (32))) & 0xff);
                                }
                                members.m_F = ((f__25) & 0xff);
                                break;
                            }
                        case 134:
                            {
                                x = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                let r1__10 = ((0) & 0xffff);
                                let r2__10 = ((0) & 0xffff);
                                let f__26 = ((0) & 0xff);
                                r1__10 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), ((x) & (15)))) & 0xffff)) & 0xffff);
                                r2__10 = (((((((members.m_A ?? 0)) + (x))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__10) & 0xff)) & 0xff);
                                if ((((((r2__10) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__26 = ((128) & 0xff);
                                }
                                else {
                                    f__26 = ((0) & 0xff);
                                }
                                if ((((r2__10) > (255)) ? 1 : 0)) {
                                    f__26 = ((((f__26) | (16))) & 0xff);
                                }
                                if ((((r1__10) > (15)) ? 1 : 0)) {
                                    f__26 = ((((f__26) | (32))) & 0xff);
                                }
                                members.m_F = ((f__26) & 0xff);
                                break;
                            }
                        case 135:
                            {
                                let r1__11 = ((0) & 0xffff);
                                let r2__11 = ((0) & 0xffff);
                                let f__27 = ((0) & 0xff);
                                r1__11 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_A ?? 0)) & (15)))) & 0xffff)) & 0xffff);
                                r2__11 = (((((((members.m_A ?? 0)) + ((members.m_A ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__11) & 0xff)) & 0xff);
                                if ((((((r2__11) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__27 = ((128) & 0xff);
                                }
                                else {
                                    f__27 = ((0) & 0xff);
                                }
                                if ((((r2__11) > (255)) ? 1 : 0)) {
                                    f__27 = ((((f__27) | (16))) & 0xff);
                                }
                                if ((((r1__11) > (15)) ? 1 : 0)) {
                                    f__27 = ((((f__27) | (32))) & 0xff);
                                }
                                members.m_F = ((f__27) & 0xff);
                                break;
                            }
                        case 136:
                            {
                                let r1__12 = ((0) & 0xffff);
                                let r2__12 = ((0) & 0xffff);
                                let f__28 = ((0) & 0xff);
                                r1__12 = ((((__add_execute_run(runtime, __add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_B ?? 0)) & (15))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                r2__12 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) + ((members.m_B ?? 0))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                if (((Number((members.m_A = ((((r2__12) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    f__28 = ((128) & 0xff);
                                }
                                else {
                                    f__28 = ((0) & 0xff);
                                }
                                if ((((r2__12) > (255)) ? 1 : 0)) {
                                    f__28 = ((((f__28) | (16))) & 0xff);
                                }
                                if ((((r1__12) > (15)) ? 1 : 0)) {
                                    f__28 = ((((f__28) | (32))) & 0xff);
                                }
                                members.m_F = ((f__28) & 0xff);
                                break;
                            }
                        case 137:
                            {
                                let r1__13 = ((0) & 0xffff);
                                let r2__13 = ((0) & 0xffff);
                                let f__29 = ((0) & 0xff);
                                r1__13 = ((((__add_execute_run(runtime, __add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_C ?? 0)) & (15))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                r2__13 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) + ((members.m_C ?? 0))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                if (((Number((members.m_A = ((((r2__13) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    f__29 = ((128) & 0xff);
                                }
                                else {
                                    f__29 = ((0) & 0xff);
                                }
                                if ((((r2__13) > (255)) ? 1 : 0)) {
                                    f__29 = ((((f__29) | (16))) & 0xff);
                                }
                                if ((((r1__13) > (15)) ? 1 : 0)) {
                                    f__29 = ((((f__29) | (32))) & 0xff);
                                }
                                members.m_F = ((f__29) & 0xff);
                                break;
                            }
                        case 138:
                            {
                                let r1__14 = ((0) & 0xffff);
                                let r2__14 = ((0) & 0xffff);
                                let f__30 = ((0) & 0xff);
                                r1__14 = ((((__add_execute_run(runtime, __add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_D ?? 0)) & (15))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                r2__14 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) + ((members.m_D ?? 0))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                if (((Number((members.m_A = ((((r2__14) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    f__30 = ((128) & 0xff);
                                }
                                else {
                                    f__30 = ((0) & 0xff);
                                }
                                if ((((r2__14) > (255)) ? 1 : 0)) {
                                    f__30 = ((((f__30) | (16))) & 0xff);
                                }
                                if ((((r1__14) > (15)) ? 1 : 0)) {
                                    f__30 = ((((f__30) | (32))) & 0xff);
                                }
                                members.m_F = ((f__30) & 0xff);
                                break;
                            }
                        case 139:
                            {
                                let r1__15 = ((0) & 0xffff);
                                let r2__15 = ((0) & 0xffff);
                                let f__31 = ((0) & 0xff);
                                r1__15 = ((((__add_execute_run(runtime, __add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_E ?? 0)) & (15))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                r2__15 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) + ((members.m_E ?? 0))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                if (((Number((members.m_A = ((((r2__15) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    f__31 = ((128) & 0xff);
                                }
                                else {
                                    f__31 = ((0) & 0xff);
                                }
                                if ((((r2__15) > (255)) ? 1 : 0)) {
                                    f__31 = ((((f__31) | (16))) & 0xff);
                                }
                                if ((((r1__15) > (15)) ? 1 : 0)) {
                                    f__31 = ((((f__31) | (32))) & 0xff);
                                }
                                members.m_F = ((f__31) & 0xff);
                                break;
                            }
                        case 140:
                            {
                                let r1__16 = ((0) & 0xffff);
                                let r2__16 = ((0) & 0xffff);
                                let f__32 = ((0) & 0xff);
                                r1__16 = ((((__add_execute_run(runtime, __add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_H ?? 0)) & (15))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                r2__16 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) + ((members.m_H ?? 0))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                if (((Number((members.m_A = ((((r2__16) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    f__32 = ((128) & 0xff);
                                }
                                else {
                                    f__32 = ((0) & 0xff);
                                }
                                if ((((r2__16) > (255)) ? 1 : 0)) {
                                    f__32 = ((((f__32) | (16))) & 0xff);
                                }
                                if ((((r1__16) > (15)) ? 1 : 0)) {
                                    f__32 = ((((f__32) | (32))) & 0xff);
                                }
                                members.m_F = ((f__32) & 0xff);
                                break;
                            }
                        case 141:
                            {
                                let r1__17 = ((0) & 0xffff);
                                let r2__17 = ((0) & 0xffff);
                                let f__33 = ((0) & 0xff);
                                r1__17 = ((((__add_execute_run(runtime, __add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_L ?? 0)) & (15))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                r2__17 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) + ((members.m_L ?? 0))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                if (((Number((members.m_A = ((((r2__17) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    f__33 = ((128) & 0xff);
                                }
                                else {
                                    f__33 = ((0) & 0xff);
                                }
                                if ((((r2__17) > (255)) ? 1 : 0)) {
                                    f__33 = ((((f__33) | (16))) & 0xff);
                                }
                                if ((((r1__17) > (15)) ? 1 : 0)) {
                                    f__33 = ((((f__33) | (32))) & 0xff);
                                }
                                members.m_F = ((f__33) & 0xff);
                                break;
                            }
                        case 142:
                            {
                                x = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                let r1__18 = ((0) & 0xffff);
                                let r2__18 = ((0) & 0xffff);
                                let f__34 = ((0) & 0xff);
                                r1__18 = ((((__add_execute_run(runtime, __add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), ((x) & (15))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                r2__18 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) + (x)), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                if (((Number((members.m_A = ((((r2__18) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    f__34 = ((128) & 0xff);
                                }
                                else {
                                    f__34 = ((0) & 0xff);
                                }
                                if ((((r2__18) > (255)) ? 1 : 0)) {
                                    f__34 = ((((f__34) | (16))) & 0xff);
                                }
                                if ((((r1__18) > (15)) ? 1 : 0)) {
                                    f__34 = ((((f__34) | (32))) & 0xff);
                                }
                                members.m_F = ((f__34) & 0xff);
                                break;
                            }
                        case 143:
                            {
                                let r1__19 = ((0) & 0xffff);
                                let r2__19 = ((0) & 0xffff);
                                let f__35 = ((0) & 0xff);
                                r1__19 = ((((__add_execute_run(runtime, __add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), (((members.m_A ?? 0)) & (15))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                r2__19 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) + ((members.m_A ?? 0))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                if (((Number((members.m_A = ((((r2__19) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    f__35 = ((128) & 0xff);
                                }
                                else {
                                    f__35 = ((0) & 0xff);
                                }
                                if ((((r2__19) > (255)) ? 1 : 0)) {
                                    f__35 = ((((f__35) | (16))) & 0xff);
                                }
                                if ((((r1__19) > (15)) ? 1 : 0)) {
                                    f__35 = ((((f__35) | (32))) & 0xff);
                                }
                                members.m_F = ((f__35) & 0xff);
                                break;
                            }
                        case 144:
                            {
                                let r1__20 = ((0) & 0xffff);
                                let r2__20 = ((0) & 0xffff);
                                let f__36 = ((0) & 0xff);
                                r1__20 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_B ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__20 = (((((((members.m_A ?? 0)) - ((members.m_B ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__20) & 0xff)) & 0xff);
                                if ((((((r2__20) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__36 = ((192) & 0xff);
                                }
                                else {
                                    f__36 = ((64) & 0xff);
                                }
                                if ((((r2__20) > (255)) ? 1 : 0)) {
                                    f__36 = ((((f__36) | (16))) & 0xff);
                                }
                                if ((((r1__20) > (15)) ? 1 : 0)) {
                                    f__36 = ((((f__36) | (32))) & 0xff);
                                }
                                members.m_F = ((f__36) & 0xff);
                                break;
                            }
                        case 145:
                            {
                                let r1__21 = ((0) & 0xffff);
                                let r2__21 = ((0) & 0xffff);
                                let f__37 = ((0) & 0xff);
                                r1__21 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_C ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__21 = (((((((members.m_A ?? 0)) - ((members.m_C ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__21) & 0xff)) & 0xff);
                                if ((((((r2__21) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__37 = ((192) & 0xff);
                                }
                                else {
                                    f__37 = ((64) & 0xff);
                                }
                                if ((((r2__21) > (255)) ? 1 : 0)) {
                                    f__37 = ((((f__37) | (16))) & 0xff);
                                }
                                if ((((r1__21) > (15)) ? 1 : 0)) {
                                    f__37 = ((((f__37) | (32))) & 0xff);
                                }
                                members.m_F = ((f__37) & 0xff);
                                break;
                            }
                        case 146:
                            {
                                let r1__22 = ((0) & 0xffff);
                                let r2__22 = ((0) & 0xffff);
                                let f__38 = ((0) & 0xff);
                                r1__22 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_D ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__22 = (((((((members.m_A ?? 0)) - ((members.m_D ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__22) & 0xff)) & 0xff);
                                if ((((((r2__22) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__38 = ((192) & 0xff);
                                }
                                else {
                                    f__38 = ((64) & 0xff);
                                }
                                if ((((r2__22) > (255)) ? 1 : 0)) {
                                    f__38 = ((((f__38) | (16))) & 0xff);
                                }
                                if ((((r1__22) > (15)) ? 1 : 0)) {
                                    f__38 = ((((f__38) | (32))) & 0xff);
                                }
                                members.m_F = ((f__38) & 0xff);
                                break;
                            }
                        case 147:
                            {
                                let r1__23 = ((0) & 0xffff);
                                let r2__23 = ((0) & 0xffff);
                                let f__39 = ((0) & 0xff);
                                r1__23 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_E ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__23 = (((((((members.m_A ?? 0)) - ((members.m_E ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__23) & 0xff)) & 0xff);
                                if ((((((r2__23) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__39 = ((192) & 0xff);
                                }
                                else {
                                    f__39 = ((64) & 0xff);
                                }
                                if ((((r2__23) > (255)) ? 1 : 0)) {
                                    f__39 = ((((f__39) | (16))) & 0xff);
                                }
                                if ((((r1__23) > (15)) ? 1 : 0)) {
                                    f__39 = ((((f__39) | (32))) & 0xff);
                                }
                                members.m_F = ((f__39) & 0xff);
                                break;
                            }
                        case 148:
                            {
                                let r1__24 = ((0) & 0xffff);
                                let r2__24 = ((0) & 0xffff);
                                let f__40 = ((0) & 0xff);
                                r1__24 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_H ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__24 = (((((((members.m_A ?? 0)) - ((members.m_H ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__24) & 0xff)) & 0xff);
                                if ((((((r2__24) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__40 = ((192) & 0xff);
                                }
                                else {
                                    f__40 = ((64) & 0xff);
                                }
                                if ((((r2__24) > (255)) ? 1 : 0)) {
                                    f__40 = ((((f__40) | (16))) & 0xff);
                                }
                                if ((((r1__24) > (15)) ? 1 : 0)) {
                                    f__40 = ((((f__40) | (32))) & 0xff);
                                }
                                members.m_F = ((f__40) & 0xff);
                                break;
                            }
                        case 149:
                            {
                                let r1__25 = ((0) & 0xffff);
                                let r2__25 = ((0) & 0xffff);
                                let f__41 = ((0) & 0xff);
                                r1__25 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_L ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__25 = (((((((members.m_A ?? 0)) - ((members.m_L ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__25) & 0xff)) & 0xff);
                                if ((((((r2__25) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__41 = ((192) & 0xff);
                                }
                                else {
                                    f__41 = ((64) & 0xff);
                                }
                                if ((((r2__25) > (255)) ? 1 : 0)) {
                                    f__41 = ((((f__41) | (16))) & 0xff);
                                }
                                if ((((r1__25) > (15)) ? 1 : 0)) {
                                    f__41 = ((((f__41) | (32))) & 0xff);
                                }
                                members.m_F = ((f__41) & 0xff);
                                break;
                            }
                        case 150:
                            {
                                x = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                let r1__26 = ((0) & 0xffff);
                                let r2__26 = ((0) & 0xffff);
                                let f__42 = ((0) & 0xff);
                                r1__26 = (((((((((members.m_A ?? 0)) & (15))) - (((x) & (15))))) & 0xffff)) & 0xffff);
                                r2__26 = (((((((members.m_A ?? 0)) - (x))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__26) & 0xff)) & 0xff);
                                if ((((((r2__26) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__42 = ((192) & 0xff);
                                }
                                else {
                                    f__42 = ((64) & 0xff);
                                }
                                if ((((r2__26) > (255)) ? 1 : 0)) {
                                    f__42 = ((((f__42) | (16))) & 0xff);
                                }
                                if ((((r1__26) > (15)) ? 1 : 0)) {
                                    f__42 = ((((f__42) | (32))) & 0xff);
                                }
                                members.m_F = ((f__42) & 0xff);
                                break;
                            }
                        case 151:
                            {
                                let r1__27 = ((0) & 0xffff);
                                let r2__27 = ((0) & 0xffff);
                                let f__43 = ((0) & 0xff);
                                r1__27 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_A ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__27 = (((((((members.m_A ?? 0)) - ((members.m_A ?? 0)))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__27) & 0xff)) & 0xff);
                                if ((((((r2__27) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__43 = ((192) & 0xff);
                                }
                                else {
                                    f__43 = ((64) & 0xff);
                                }
                                if ((((r2__27) > (255)) ? 1 : 0)) {
                                    f__43 = ((((f__43) | (16))) & 0xff);
                                }
                                if ((((r1__27) > (15)) ? 1 : 0)) {
                                    f__43 = ((((f__43) | (32))) & 0xff);
                                }
                                members.m_F = ((f__43) & 0xff);
                                break;
                            }
                        case 152:
                            {
                                let r1__28 = ((0) & 0xffff);
                                let r2__28 = ((0) & 0xffff);
                                let f__44 = ((0) & 0xff);
                                r1__28 = (((((((((((members.m_A ?? 0)) & (15))) - ((((members.m_B ?? 0)) & (15))))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                r2__28 = (((((((((members.m_A ?? 0)) - ((members.m_B ?? 0)))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__28) & 0xff)) & 0xff);
                                if ((((((r2__28) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__44 = ((192) & 0xff);
                                }
                                else {
                                    f__44 = ((64) & 0xff);
                                }
                                if ((((r2__28) > (255)) ? 1 : 0)) {
                                    f__44 = ((((f__44) | (16))) & 0xff);
                                }
                                if ((((r1__28) > (15)) ? 1 : 0)) {
                                    f__44 = ((((f__44) | (32))) & 0xff);
                                }
                                members.m_F = ((f__44) & 0xff);
                                break;
                            }
                        case 153:
                            {
                                let r1__29 = ((0) & 0xffff);
                                let r2__29 = ((0) & 0xffff);
                                let f__45 = ((0) & 0xff);
                                r1__29 = (((((((((((members.m_A ?? 0)) & (15))) - ((((members.m_C ?? 0)) & (15))))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                r2__29 = (((((((((members.m_A ?? 0)) - ((members.m_C ?? 0)))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__29) & 0xff)) & 0xff);
                                if ((((((r2__29) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__45 = ((192) & 0xff);
                                }
                                else {
                                    f__45 = ((64) & 0xff);
                                }
                                if ((((r2__29) > (255)) ? 1 : 0)) {
                                    f__45 = ((((f__45) | (16))) & 0xff);
                                }
                                if ((((r1__29) > (15)) ? 1 : 0)) {
                                    f__45 = ((((f__45) | (32))) & 0xff);
                                }
                                members.m_F = ((f__45) & 0xff);
                                break;
                            }
                        case 154:
                            {
                                let r1__30 = ((0) & 0xffff);
                                let r2__30 = ((0) & 0xffff);
                                let f__46 = ((0) & 0xff);
                                r1__30 = (((((((((((members.m_A ?? 0)) & (15))) - ((((members.m_D ?? 0)) & (15))))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                r2__30 = (((((((((members.m_A ?? 0)) - ((members.m_D ?? 0)))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__30) & 0xff)) & 0xff);
                                if ((((((r2__30) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__46 = ((192) & 0xff);
                                }
                                else {
                                    f__46 = ((64) & 0xff);
                                }
                                if ((((r2__30) > (255)) ? 1 : 0)) {
                                    f__46 = ((((f__46) | (16))) & 0xff);
                                }
                                if ((((r1__30) > (15)) ? 1 : 0)) {
                                    f__46 = ((((f__46) | (32))) & 0xff);
                                }
                                members.m_F = ((f__46) & 0xff);
                                break;
                            }
                        case 155:
                            {
                                let r1__31 = ((0) & 0xffff);
                                let r2__31 = ((0) & 0xffff);
                                let f__47 = ((0) & 0xff);
                                r1__31 = (((((((((((members.m_A ?? 0)) & (15))) - ((((members.m_E ?? 0)) & (15))))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                r2__31 = (((((((((members.m_A ?? 0)) - ((members.m_E ?? 0)))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__31) & 0xff)) & 0xff);
                                if ((((((r2__31) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__47 = ((192) & 0xff);
                                }
                                else {
                                    f__47 = ((64) & 0xff);
                                }
                                if ((((r2__31) > (255)) ? 1 : 0)) {
                                    f__47 = ((((f__47) | (16))) & 0xff);
                                }
                                if ((((r1__31) > (15)) ? 1 : 0)) {
                                    f__47 = ((((f__47) | (32))) & 0xff);
                                }
                                members.m_F = ((f__47) & 0xff);
                                break;
                            }
                        case 156:
                            {
                                let r1__32 = ((0) & 0xffff);
                                let r2__32 = ((0) & 0xffff);
                                let f__48 = ((0) & 0xff);
                                r1__32 = (((((((((((members.m_A ?? 0)) & (15))) - ((((members.m_H ?? 0)) & (15))))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                r2__32 = (((((((((members.m_A ?? 0)) - ((members.m_H ?? 0)))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__32) & 0xff)) & 0xff);
                                if ((((((r2__32) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__48 = ((192) & 0xff);
                                }
                                else {
                                    f__48 = ((64) & 0xff);
                                }
                                if ((((r2__32) > (255)) ? 1 : 0)) {
                                    f__48 = ((((f__48) | (16))) & 0xff);
                                }
                                if ((((r1__32) > (15)) ? 1 : 0)) {
                                    f__48 = ((((f__48) | (32))) & 0xff);
                                }
                                members.m_F = ((f__48) & 0xff);
                                break;
                            }
                        case 157:
                            {
                                let r1__33 = ((0) & 0xffff);
                                let r2__33 = ((0) & 0xffff);
                                let f__49 = ((0) & 0xff);
                                r1__33 = (((((((((((members.m_A ?? 0)) & (15))) - ((((members.m_L ?? 0)) & (15))))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                r2__33 = (((((((((members.m_A ?? 0)) - ((members.m_L ?? 0)))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__33) & 0xff)) & 0xff);
                                if ((((((r2__33) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__49 = ((192) & 0xff);
                                }
                                else {
                                    f__49 = ((64) & 0xff);
                                }
                                if ((((r2__33) > (255)) ? 1 : 0)) {
                                    f__49 = ((((f__49) | (16))) & 0xff);
                                }
                                if ((((r1__33) > (15)) ? 1 : 0)) {
                                    f__49 = ((((f__49) | (32))) & 0xff);
                                }
                                members.m_F = ((f__49) & 0xff);
                                break;
                            }
                        case 158:
                            {
                                x = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                let r1__34 = ((0) & 0xffff);
                                let r2__34 = ((0) & 0xffff);
                                let f__50 = ((0) & 0xff);
                                r1__34 = (((((((((((members.m_A ?? 0)) & (15))) - (((x) & (15))))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                r2__34 = (((((((((members.m_A ?? 0)) - (x))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__34) & 0xff)) & 0xff);
                                if ((((((r2__34) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__50 = ((192) & 0xff);
                                }
                                else {
                                    f__50 = ((64) & 0xff);
                                }
                                if ((((r2__34) > (255)) ? 1 : 0)) {
                                    f__50 = ((((f__50) | (16))) & 0xff);
                                }
                                if ((((r1__34) > (15)) ? 1 : 0)) {
                                    f__50 = ((((f__50) | (32))) & 0xff);
                                }
                                members.m_F = ((f__50) & 0xff);
                                break;
                            }
                        case 159:
                            {
                                let r1__35 = ((0) & 0xffff);
                                let r2__35 = ((0) & 0xffff);
                                let f__51 = ((0) & 0xff);
                                r1__35 = (((((((((((members.m_A ?? 0)) & (15))) - ((((members.m_A ?? 0)) & (15))))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                r2__35 = (((((((((members.m_A ?? 0)) - ((members.m_A ?? 0)))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__35) & 0xff)) & 0xff);
                                if ((((((r2__35) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__51 = ((192) & 0xff);
                                }
                                else {
                                    f__51 = ((64) & 0xff);
                                }
                                if ((((r2__35) > (255)) ? 1 : 0)) {
                                    f__51 = ((((f__51) | (16))) & 0xff);
                                }
                                if ((((r1__35) > (15)) ? 1 : 0)) {
                                    f__51 = ((((f__51) | (32))) & 0xff);
                                }
                                members.m_F = ((f__51) & 0xff);
                                break;
                            }
                        case 160:
                            {
                                if (((Number((members.m_A = ((((members.m_A) & ((members.m_B ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((160) & 0xff);
                                }
                                else {
                                    members.m_F = ((32) & 0xff);
                                }
                                break;
                            }
                        case 161:
                            {
                                if (((Number((members.m_A = ((((members.m_A) & ((members.m_C ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((160) & 0xff);
                                }
                                else {
                                    members.m_F = ((32) & 0xff);
                                }
                                break;
                            }
                        case 162:
                            {
                                if (((Number((members.m_A = ((((members.m_A) & ((members.m_D ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((160) & 0xff);
                                }
                                else {
                                    members.m_F = ((32) & 0xff);
                                }
                                break;
                            }
                        case 163:
                            {
                                if (((Number((members.m_A = ((((members.m_A) & ((members.m_E ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((160) & 0xff);
                                }
                                else {
                                    members.m_F = ((32) & 0xff);
                                }
                                break;
                            }
                        case 164:
                            {
                                if (((Number((members.m_A = ((((members.m_A) & ((members.m_H ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((160) & 0xff);
                                }
                                else {
                                    members.m_F = ((32) & 0xff);
                                }
                                break;
                            }
                        case 165:
                            {
                                if (((Number((members.m_A = ((((members.m_A) & ((members.m_L ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((160) & 0xff);
                                }
                                else {
                                    members.m_F = ((32) & 0xff);
                                }
                                break;
                            }
                        case 166:
                            {
                                x = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                if (((Number((members.m_A = ((((members.m_A) & (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((160) & 0xff);
                                }
                                else {
                                    members.m_F = ((32) & 0xff);
                                }
                                break;
                            }
                        case 167:
                            {
                                members.m_F = ((((((((members.m_A ?? 0)) === (0)) ? 1 : 0)) ? (160) : (32))) & 0xff);
                                break;
                            }
                        case 168:
                            {
                                if (((Number((members.m_A = ((((members.m_A) ^ ((members.m_B ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 169:
                            {
                                if (((Number((members.m_A = ((((members.m_A) ^ ((members.m_C ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 170:
                            {
                                if (((Number((members.m_A = ((((members.m_A) ^ ((members.m_D ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 171:
                            {
                                if (((Number((members.m_A = ((((members.m_A) ^ ((members.m_E ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 172:
                            {
                                if (((Number((members.m_A = ((((members.m_A) ^ ((members.m_H ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 173:
                            {
                                if (((Number((members.m_A = ((((members.m_A) ^ ((members.m_L ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 174:
                            {
                                x = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                if (((Number((members.m_A = ((((members.m_A) ^ (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 175:
                            {
                                if (((Number((members.m_A = ((((members.m_A) ^ ((members.m_A ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 176:
                            {
                                if (((Number((members.m_A = ((((members.m_A) | ((members.m_B ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 177:
                            {
                                if (((Number((members.m_A = ((((members.m_A) | ((members.m_C ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 178:
                            {
                                if (((Number((members.m_A = ((((members.m_A) | ((members.m_D ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 179:
                            {
                                if (((Number((members.m_A = ((((members.m_A) | ((members.m_E ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 180:
                            {
                                if (((Number((members.m_A = ((((members.m_A) | ((members.m_H ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 181:
                            {
                                if (((Number((members.m_A = ((((members.m_A) | ((members.m_L ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 182:
                            {
                                x = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                if (((Number((members.m_A = ((((members.m_A) | (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 183:
                            {
                                if (((Number((members.m_A = ((((members.m_A) | ((members.m_A ?? 0)))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 184:
                            {
                                let r1__36 = ((0) & 0xffff);
                                let r2__36 = ((0) & 0xffff);
                                let f__52 = ((0) & 0xff);
                                r1__36 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_B ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__36 = (((((((members.m_A ?? 0)) - ((members.m_B ?? 0)))) & 0xffff)) & 0xffff);
                                if ((((((r2__36) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__52 = ((192) & 0xff);
                                }
                                else {
                                    f__52 = ((64) & 0xff);
                                }
                                if ((((r2__36) > (255)) ? 1 : 0)) {
                                    f__52 = ((((f__52) | (16))) & 0xff);
                                }
                                if ((((r1__36) > (15)) ? 1 : 0)) {
                                    f__52 = ((((f__52) | (32))) & 0xff);
                                }
                                members.m_F = ((f__52) & 0xff);
                                break;
                            }
                        case 185:
                            {
                                let r1__37 = ((0) & 0xffff);
                                let r2__37 = ((0) & 0xffff);
                                let f__53 = ((0) & 0xff);
                                r1__37 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_C ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__37 = (((((((members.m_A ?? 0)) - ((members.m_C ?? 0)))) & 0xffff)) & 0xffff);
                                if ((((((r2__37) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__53 = ((192) & 0xff);
                                }
                                else {
                                    f__53 = ((64) & 0xff);
                                }
                                if ((((r2__37) > (255)) ? 1 : 0)) {
                                    f__53 = ((((f__53) | (16))) & 0xff);
                                }
                                if ((((r1__37) > (15)) ? 1 : 0)) {
                                    f__53 = ((((f__53) | (32))) & 0xff);
                                }
                                members.m_F = ((f__53) & 0xff);
                                break;
                            }
                        case 186:
                            {
                                let r1__38 = ((0) & 0xffff);
                                let r2__38 = ((0) & 0xffff);
                                let f__54 = ((0) & 0xff);
                                r1__38 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_D ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__38 = (((((((members.m_A ?? 0)) - ((members.m_D ?? 0)))) & 0xffff)) & 0xffff);
                                if ((((((r2__38) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__54 = ((192) & 0xff);
                                }
                                else {
                                    f__54 = ((64) & 0xff);
                                }
                                if ((((r2__38) > (255)) ? 1 : 0)) {
                                    f__54 = ((((f__54) | (16))) & 0xff);
                                }
                                if ((((r1__38) > (15)) ? 1 : 0)) {
                                    f__54 = ((((f__54) | (32))) & 0xff);
                                }
                                members.m_F = ((f__54) & 0xff);
                                break;
                            }
                        case 187:
                            {
                                let r1__39 = ((0) & 0xffff);
                                let r2__39 = ((0) & 0xffff);
                                let f__55 = ((0) & 0xff);
                                r1__39 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_E ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__39 = (((((((members.m_A ?? 0)) - ((members.m_E ?? 0)))) & 0xffff)) & 0xffff);
                                if ((((((r2__39) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__55 = ((192) & 0xff);
                                }
                                else {
                                    f__55 = ((64) & 0xff);
                                }
                                if ((((r2__39) > (255)) ? 1 : 0)) {
                                    f__55 = ((((f__55) | (16))) & 0xff);
                                }
                                if ((((r1__39) > (15)) ? 1 : 0)) {
                                    f__55 = ((((f__55) | (32))) & 0xff);
                                }
                                members.m_F = ((f__55) & 0xff);
                                break;
                            }
                        case 188:
                            {
                                let r1__40 = ((0) & 0xffff);
                                let r2__40 = ((0) & 0xffff);
                                let f__56 = ((0) & 0xff);
                                r1__40 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_H ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__40 = (((((((members.m_A ?? 0)) - ((members.m_H ?? 0)))) & 0xffff)) & 0xffff);
                                if ((((((r2__40) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__56 = ((192) & 0xff);
                                }
                                else {
                                    f__56 = ((64) & 0xff);
                                }
                                if ((((r2__40) > (255)) ? 1 : 0)) {
                                    f__56 = ((((f__56) | (16))) & 0xff);
                                }
                                if ((((r1__40) > (15)) ? 1 : 0)) {
                                    f__56 = ((((f__56) | (32))) & 0xff);
                                }
                                members.m_F = ((f__56) & 0xff);
                                break;
                            }
                        case 189:
                            {
                                let r1__41 = ((0) & 0xffff);
                                let r2__41 = ((0) & 0xffff);
                                let f__57 = ((0) & 0xff);
                                r1__41 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_L ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__41 = (((((((members.m_A ?? 0)) - ((members.m_L ?? 0)))) & 0xffff)) & 0xffff);
                                if ((((((r2__41) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__57 = ((192) & 0xff);
                                }
                                else {
                                    f__57 = ((64) & 0xff);
                                }
                                if ((((r2__41) > (255)) ? 1 : 0)) {
                                    f__57 = ((((f__57) | (16))) & 0xff);
                                }
                                if ((((r1__41) > (15)) ? 1 : 0)) {
                                    f__57 = ((((f__57) | (32))) & 0xff);
                                }
                                members.m_F = ((f__57) & 0xff);
                                break;
                            }
                        case 190:
                            {
                                x = ((method_mem_read_byte(runtime, (((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0))))) & 0xff);
                                let r1__42 = ((0) & 0xffff);
                                let r2__42 = ((0) & 0xffff);
                                let f__58 = ((0) & 0xff);
                                r1__42 = (((((((((members.m_A ?? 0)) & (15))) - (((x) & (15))))) & 0xffff)) & 0xffff);
                                r2__42 = (((((((members.m_A ?? 0)) - (x))) & 0xffff)) & 0xffff);
                                if ((((((r2__42) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__58 = ((192) & 0xff);
                                }
                                else {
                                    f__58 = ((64) & 0xff);
                                }
                                if ((((r2__42) > (255)) ? 1 : 0)) {
                                    f__58 = ((((f__58) | (16))) & 0xff);
                                }
                                if ((((r1__42) > (15)) ? 1 : 0)) {
                                    f__58 = ((((f__58) | (32))) & 0xff);
                                }
                                members.m_F = ((f__58) & 0xff);
                                break;
                            }
                        case 191:
                            {
                                let r1__43 = ((0) & 0xffff);
                                let r2__43 = ((0) & 0xffff);
                                let f__59 = ((0) & 0xff);
                                r1__43 = (((((((((members.m_A ?? 0)) & (15))) - ((((members.m_A ?? 0)) & (15))))) & 0xffff)) & 0xffff);
                                r2__43 = (((((((members.m_A ?? 0)) - ((members.m_A ?? 0)))) & 0xffff)) & 0xffff);
                                if ((((((r2__43) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__59 = ((192) & 0xff);
                                }
                                else {
                                    f__59 = ((64) & 0xff);
                                }
                                if ((((r2__43) > (255)) ? 1 : 0)) {
                                    f__59 = ((((f__59) | (16))) & 0xff);
                                }
                                if ((((r1__43) > (15)) ? 1 : 0)) {
                                    f__59 = ((((f__59) | (32))) & 0xff);
                                }
                                members.m_F = ((f__59) & 0xff);
                                break;
                            }
                        case 192:
                            {
                                method_cycles_passed(runtime, 4);
                                if ((((((members.m_F ?? 0)) & (128))) ? 0 : 1)) {
                                    members.m_PC = ((method_mem_read_word(runtime, (members.m_SP ?? 0))) & 0xffff);
                                    members.m_SP = ((((members.m_SP) + (2))) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 193:
                            {
                                members.m_C = ((method_mem_read_byte(runtime, (__t20 = (members.m_SP ?? 0), members.m_SP = ((((members.m_SP) + (1))) & 0xffff), __t20))) & 0xff);
                                members.m_B = ((method_mem_read_byte(runtime, (__t21 = (members.m_SP ?? 0), members.m_SP = ((((members.m_SP) + (1))) & 0xffff), __t21))) & 0xff);
                                break;
                            }
                        case 194:
                            {
                                let addr__2 = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                if ((((((members.m_F ?? 0)) & (128))) ? 0 : 1)) {
                                    members.m_PC = ((addr__2) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 195:
                            {
                                members.m_PC = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 196:
                            {
                                let addr__3 = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                if ((((((members.m_F ?? 0)) & (128))) ? 0 : 1)) {
                                    method_cycles_passed(runtime, 4);
                                    members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                    method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                    members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                    method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                    members.m_PC = ((addr__3) & 0xffff);
                                }
                                break;
                            }
                        case 197:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (members.m_B ?? 0));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (members.m_C ?? 0));
                                break;
                            }
                        case 198:
                            {
                                x = ((method_mem_read_byte(runtime, (__t22 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t22))) & 0xff);
                                let r1__44 = ((0) & 0xffff);
                                let r2__44 = ((0) & 0xffff);
                                let f__60 = ((0) & 0xff);
                                r1__44 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), ((x) & (15)))) & 0xffff)) & 0xffff);
                                r2__44 = (((((((members.m_A ?? 0)) + (x))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__44) & 0xff)) & 0xff);
                                if ((((((r2__44) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__60 = ((128) & 0xff);
                                }
                                else {
                                    f__60 = ((0) & 0xff);
                                }
                                if ((((r2__44) > (255)) ? 1 : 0)) {
                                    f__60 = ((((f__60) | (16))) & 0xff);
                                }
                                if ((((r1__44) > (15)) ? 1 : 0)) {
                                    f__60 = ((((f__60) | (32))) & 0xff);
                                }
                                members.m_F = ((f__60) & 0xff);
                                break;
                            }
                        case 199:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                members.m_PC = ((0) & 0xffff);
                                break;
                            }
                        case 200:
                            {
                                method_cycles_passed(runtime, 4);
                                if ((((members.m_F ?? 0)) & (128))) {
                                    members.m_PC = ((method_mem_read_word(runtime, (members.m_SP ?? 0))) & 0xffff);
                                    members.m_SP = ((((members.m_SP) + (2))) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 201:
                            {
                                members.m_PC = ((method_mem_read_word(runtime, (members.m_SP ?? 0))) & 0xffff);
                                members.m_SP = ((((members.m_SP) + (2))) & 0xffff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 202:
                            {
                                let addr__4 = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                if ((((members.m_F ?? 0)) & (128))) {
                                    members.m_PC = ((addr__4) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 203:
                            {
                                x = ((method_mem_read_byte(runtime, (__t23 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t23))) & 0xff);
                                switch (x) {
                                    case 0:
                                        {
                                            let f__61 = ((0) & 0xff);
                                            members.m_B = (((((((((members.m_B ?? 0)) << (1))) | ((((members.m_B ?? 0)) >>> (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_B ?? 0)) & (1))) {
                                                f__61 = ((16) & 0xff);
                                            }
                                            else {
                                                f__61 = ((0) & 0xff);
                                            }
                                            if (((((members.m_B ?? 0)) === (0)) ? 1 : 0)) {
                                                f__61 = ((((f__61) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__61) & 0xff);
                                            break;
                                        }
                                    case 1:
                                        {
                                            let f__62 = ((0) & 0xff);
                                            members.m_C = (((((((((members.m_C ?? 0)) << (1))) | ((((members.m_C ?? 0)) >>> (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_C ?? 0)) & (1))) {
                                                f__62 = ((16) & 0xff);
                                            }
                                            else {
                                                f__62 = ((0) & 0xff);
                                            }
                                            if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                                                f__62 = ((((f__62) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__62) & 0xff);
                                            break;
                                        }
                                    case 2:
                                        {
                                            let f__63 = ((0) & 0xff);
                                            members.m_D = (((((((((members.m_D ?? 0)) << (1))) | ((((members.m_D ?? 0)) >>> (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_D ?? 0)) & (1))) {
                                                f__63 = ((16) & 0xff);
                                            }
                                            else {
                                                f__63 = ((0) & 0xff);
                                            }
                                            if (((((members.m_D ?? 0)) === (0)) ? 1 : 0)) {
                                                f__63 = ((((f__63) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__63) & 0xff);
                                            break;
                                        }
                                    case 3:
                                        {
                                            let f__64 = ((0) & 0xff);
                                            members.m_E = (((((((((members.m_E ?? 0)) << (1))) | ((((members.m_E ?? 0)) >>> (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_E ?? 0)) & (1))) {
                                                f__64 = ((16) & 0xff);
                                            }
                                            else {
                                                f__64 = ((0) & 0xff);
                                            }
                                            if (((((members.m_E ?? 0)) === (0)) ? 1 : 0)) {
                                                f__64 = ((((f__64) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__64) & 0xff);
                                            break;
                                        }
                                    case 4:
                                        {
                                            let f__65 = ((0) & 0xff);
                                            members.m_H = (((((((((members.m_H ?? 0)) << (1))) | ((((members.m_H ?? 0)) >>> (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_H ?? 0)) & (1))) {
                                                f__65 = ((16) & 0xff);
                                            }
                                            else {
                                                f__65 = ((0) & 0xff);
                                            }
                                            if (((((members.m_H ?? 0)) === (0)) ? 1 : 0)) {
                                                f__65 = ((((f__65) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__65) & 0xff);
                                            break;
                                        }
                                    case 5:
                                        {
                                            let f__66 = ((0) & 0xff);
                                            members.m_L = (((((((((members.m_L ?? 0)) << (1))) | ((((members.m_L ?? 0)) >>> (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_L ?? 0)) & (1))) {
                                                f__66 = ((16) & 0xff);
                                            }
                                            else {
                                                f__66 = ((0) & 0xff);
                                            }
                                            if (((((members.m_L ?? 0)) === (0)) ? 1 : 0)) {
                                                f__66 = ((((f__66) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__66) & 0xff);
                                            break;
                                        }
                                    case 6:
                                        {
                                            let addr__5 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__5)) & 0xff);
                                            let f__67 = ((0) & 0xff);
                                            x = ((((((((x) << (1))) | (((x) >>> (7))))) & 0xff)) & 0xff);
                                            if (((x) & (1))) {
                                                f__67 = ((16) & 0xff);
                                            }
                                            else {
                                                f__67 = ((0) & 0xff);
                                            }
                                            if ((((x) === (0)) ? 1 : 0)) {
                                                f__67 = ((((f__67) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__67) & 0xff);
                                            method_mem_write_byte(runtime, addr__5, x);
                                            break;
                                        }
                                    case 7:
                                        {
                                            let f__68 = ((0) & 0xff);
                                            members.m_A = (((((((((members.m_A ?? 0)) << (1))) | ((((members.m_A ?? 0)) >>> (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_A ?? 0)) & (1))) {
                                                f__68 = ((16) & 0xff);
                                            }
                                            else {
                                                f__68 = ((0) & 0xff);
                                            }
                                            if (((((members.m_A ?? 0)) === (0)) ? 1 : 0)) {
                                                f__68 = ((((f__68) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__68) & 0xff);
                                            break;
                                        }
                                    case 8:
                                        {
                                            let f__69 = ((0) & 0xff);
                                            members.m_B = (((((((((members.m_B ?? 0)) >>> (1))) | ((((members.m_B ?? 0)) << (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_B ?? 0)) & (128))) {
                                                f__69 = ((16) & 0xff);
                                            }
                                            else {
                                                f__69 = ((0) & 0xff);
                                            }
                                            if (((((members.m_B ?? 0)) === (0)) ? 1 : 0)) {
                                                f__69 = ((((f__69) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__69) & 0xff);
                                            break;
                                        }
                                    case 9:
                                        {
                                            let f__70 = ((0) & 0xff);
                                            members.m_C = (((((((((members.m_C ?? 0)) >>> (1))) | ((((members.m_C ?? 0)) << (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_C ?? 0)) & (128))) {
                                                f__70 = ((16) & 0xff);
                                            }
                                            else {
                                                f__70 = ((0) & 0xff);
                                            }
                                            if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                                                f__70 = ((((f__70) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__70) & 0xff);
                                            break;
                                        }
                                    case 10:
                                        {
                                            let f__71 = ((0) & 0xff);
                                            members.m_D = (((((((((members.m_D ?? 0)) >>> (1))) | ((((members.m_D ?? 0)) << (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_D ?? 0)) & (128))) {
                                                f__71 = ((16) & 0xff);
                                            }
                                            else {
                                                f__71 = ((0) & 0xff);
                                            }
                                            if (((((members.m_D ?? 0)) === (0)) ? 1 : 0)) {
                                                f__71 = ((((f__71) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__71) & 0xff);
                                            break;
                                        }
                                    case 11:
                                        {
                                            let f__72 = ((0) & 0xff);
                                            members.m_E = (((((((((members.m_E ?? 0)) >>> (1))) | ((((members.m_E ?? 0)) << (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_E ?? 0)) & (128))) {
                                                f__72 = ((16) & 0xff);
                                            }
                                            else {
                                                f__72 = ((0) & 0xff);
                                            }
                                            if (((((members.m_E ?? 0)) === (0)) ? 1 : 0)) {
                                                f__72 = ((((f__72) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__72) & 0xff);
                                            break;
                                        }
                                    case 12:
                                        {
                                            let f__73 = ((0) & 0xff);
                                            members.m_H = (((((((((members.m_H ?? 0)) >>> (1))) | ((((members.m_H ?? 0)) << (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_H ?? 0)) & (128))) {
                                                f__73 = ((16) & 0xff);
                                            }
                                            else {
                                                f__73 = ((0) & 0xff);
                                            }
                                            if (((((members.m_H ?? 0)) === (0)) ? 1 : 0)) {
                                                f__73 = ((((f__73) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__73) & 0xff);
                                            break;
                                        }
                                    case 13:
                                        {
                                            let f__74 = ((0) & 0xff);
                                            members.m_L = (((((((((members.m_L ?? 0)) >>> (1))) | ((((members.m_L ?? 0)) << (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_L ?? 0)) & (128))) {
                                                f__74 = ((16) & 0xff);
                                            }
                                            else {
                                                f__74 = ((0) & 0xff);
                                            }
                                            if (((((members.m_L ?? 0)) === (0)) ? 1 : 0)) {
                                                f__74 = ((((f__74) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__74) & 0xff);
                                            break;
                                        }
                                    case 14:
                                        {
                                            let addr__6 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__6)) & 0xff);
                                            let f__75 = ((0) & 0xff);
                                            x = ((((((((x) >>> (1))) | (((x) << (7))))) & 0xff)) & 0xff);
                                            if (((x) & (128))) {
                                                f__75 = ((16) & 0xff);
                                            }
                                            else {
                                                f__75 = ((0) & 0xff);
                                            }
                                            if ((((x) === (0)) ? 1 : 0)) {
                                                f__75 = ((((f__75) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__75) & 0xff);
                                            method_mem_write_byte(runtime, addr__6, x);
                                            break;
                                        }
                                    case 15:
                                        {
                                            let f__76 = ((0) & 0xff);
                                            members.m_A = (((((((((members.m_A ?? 0)) >>> (1))) | ((((members.m_A ?? 0)) << (7))))) & 0xff)) & 0xff);
                                            if ((((members.m_A ?? 0)) & (128))) {
                                                f__76 = ((16) & 0xff);
                                            }
                                            else {
                                                f__76 = ((0) & 0xff);
                                            }
                                            if (((((members.m_A ?? 0)) === (0)) ? 1 : 0)) {
                                                f__76 = ((((f__76) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__76) & 0xff);
                                            break;
                                        }
                                    case 16:
                                        {
                                            let r__26 = ((0) & 0xff);
                                            r__26 = (((((((members.m_B ?? 0)) & (128))) ? (16) : (0))) & 0xff);
                                            members.m_B = (((((((((members.m_B ?? 0)) << (1))) | ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_B ?? 0)) === (0)) ? 1 : 0)) {
                                                r__26 = ((((r__26) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__26) & 0xff);
                                            break;
                                        }
                                    case 17:
                                        {
                                            let r__27 = ((0) & 0xff);
                                            r__27 = (((((((members.m_C ?? 0)) & (128))) ? (16) : (0))) & 0xff);
                                            members.m_C = (((((((((members.m_C ?? 0)) << (1))) | ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                                                r__27 = ((((r__27) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__27) & 0xff);
                                            break;
                                        }
                                    case 18:
                                        {
                                            let r__28 = ((0) & 0xff);
                                            r__28 = (((((((members.m_D ?? 0)) & (128))) ? (16) : (0))) & 0xff);
                                            members.m_D = (((((((((members.m_D ?? 0)) << (1))) | ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_D ?? 0)) === (0)) ? 1 : 0)) {
                                                r__28 = ((((r__28) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__28) & 0xff);
                                            break;
                                        }
                                    case 19:
                                        {
                                            let r__29 = ((0) & 0xff);
                                            r__29 = (((((((members.m_E ?? 0)) & (128))) ? (16) : (0))) & 0xff);
                                            members.m_E = (((((((((members.m_E ?? 0)) << (1))) | ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_E ?? 0)) === (0)) ? 1 : 0)) {
                                                r__29 = ((((r__29) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__29) & 0xff);
                                            break;
                                        }
                                    case 20:
                                        {
                                            let r__30 = ((0) & 0xff);
                                            r__30 = (((((((members.m_H ?? 0)) & (128))) ? (16) : (0))) & 0xff);
                                            members.m_H = (((((((((members.m_H ?? 0)) << (1))) | ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_H ?? 0)) === (0)) ? 1 : 0)) {
                                                r__30 = ((((r__30) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__30) & 0xff);
                                            break;
                                        }
                                    case 21:
                                        {
                                            let r__31 = ((0) & 0xff);
                                            r__31 = (((((((members.m_L ?? 0)) & (128))) ? (16) : (0))) & 0xff);
                                            members.m_L = (((((((((members.m_L ?? 0)) << (1))) | ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_L ?? 0)) === (0)) ? 1 : 0)) {
                                                r__31 = ((((r__31) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__31) & 0xff);
                                            break;
                                        }
                                    case 22:
                                        {
                                            let addr__7 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__7)) & 0xff);
                                            let r__32 = ((0) & 0xff);
                                            r__32 = ((((((x) & (128))) ? (16) : (0))) & 0xff);
                                            x = ((((((((x) << (1))) | ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                                            if ((((x) === (0)) ? 1 : 0)) {
                                                r__32 = ((((r__32) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__32) & 0xff);
                                            method_mem_write_byte(runtime, addr__7, x);
                                            break;
                                        }
                                    case 23:
                                        {
                                            let r__33 = ((0) & 0xff);
                                            r__33 = (((((((members.m_A ?? 0)) & (128))) ? (16) : (0))) & 0xff);
                                            members.m_A = (((((((((members.m_A ?? 0)) << (1))) | ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_A ?? 0)) === (0)) ? 1 : 0)) {
                                                r__33 = ((((r__33) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__33) & 0xff);
                                            break;
                                        }
                                    case 24:
                                        {
                                            let r__34 = ((0) & 0xff);
                                            r__34 = (((((((members.m_B ?? 0)) & (1))) ? (16) : (0))) & 0xff);
                                            members.m_B = (((((((((members.m_B ?? 0)) >>> (1))) | ((((((members.m_F ?? 0)) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_B ?? 0)) === (0)) ? 1 : 0)) {
                                                r__34 = ((((r__34) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__34) & 0xff);
                                            break;
                                        }
                                    case 25:
                                        {
                                            let r__35 = ((0) & 0xff);
                                            r__35 = (((((((members.m_C ?? 0)) & (1))) ? (16) : (0))) & 0xff);
                                            members.m_C = (((((((((members.m_C ?? 0)) >>> (1))) | ((((((members.m_F ?? 0)) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                                                r__35 = ((((r__35) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__35) & 0xff);
                                            break;
                                        }
                                    case 26:
                                        {
                                            let r__36 = ((0) & 0xff);
                                            r__36 = (((((((members.m_D ?? 0)) & (1))) ? (16) : (0))) & 0xff);
                                            members.m_D = (((((((((members.m_D ?? 0)) >>> (1))) | ((((((members.m_F ?? 0)) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_D ?? 0)) === (0)) ? 1 : 0)) {
                                                r__36 = ((((r__36) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__36) & 0xff);
                                            break;
                                        }
                                    case 27:
                                        {
                                            let r__37 = ((0) & 0xff);
                                            r__37 = (((((((members.m_E ?? 0)) & (1))) ? (16) : (0))) & 0xff);
                                            members.m_E = (((((((((members.m_E ?? 0)) >>> (1))) | ((((((members.m_F ?? 0)) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_E ?? 0)) === (0)) ? 1 : 0)) {
                                                r__37 = ((((r__37) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__37) & 0xff);
                                            break;
                                        }
                                    case 28:
                                        {
                                            let r__38 = ((0) & 0xff);
                                            r__38 = (((((((members.m_H ?? 0)) & (1))) ? (16) : (0))) & 0xff);
                                            members.m_H = (((((((((members.m_H ?? 0)) >>> (1))) | ((((((members.m_F ?? 0)) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_H ?? 0)) === (0)) ? 1 : 0)) {
                                                r__38 = ((((r__38) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__38) & 0xff);
                                            break;
                                        }
                                    case 29:
                                        {
                                            let r__39 = ((0) & 0xff);
                                            r__39 = (((((((members.m_L ?? 0)) & (1))) ? (16) : (0))) & 0xff);
                                            members.m_L = (((((((((members.m_L ?? 0)) >>> (1))) | ((((((members.m_F ?? 0)) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_L ?? 0)) === (0)) ? 1 : 0)) {
                                                r__39 = ((((r__39) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__39) & 0xff);
                                            break;
                                        }
                                    case 30:
                                        {
                                            let addr__8 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__8)) & 0xff);
                                            let r__40 = ((0) & 0xff);
                                            r__40 = ((((((x) & (1))) ? (16) : (0))) & 0xff);
                                            x = ((((((((x) >>> (1))) | ((((((members.m_F ?? 0)) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                                            if ((((x) === (0)) ? 1 : 0)) {
                                                r__40 = ((((r__40) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__40) & 0xff);
                                            method_mem_write_byte(runtime, addr__8, x);
                                            break;
                                        }
                                    case 31:
                                        {
                                            let r__41 = ((0) & 0xff);
                                            r__41 = (((((((members.m_A ?? 0)) & (1))) ? (16) : (0))) & 0xff);
                                            members.m_A = (((((((((members.m_A ?? 0)) >>> (1))) | ((((((members.m_F ?? 0)) & (16))) ? (128) : (0))))) & 0xff)) & 0xff);
                                            if (((((members.m_A ?? 0)) === (0)) ? 1 : 0)) {
                                                r__41 = ((((r__41) | (128))) & 0xff);
                                            }
                                            members.m_F = ((r__41) & 0xff);
                                            break;
                                        }
                                    case 32:
                                        {
                                            let f__77 = ((0) & 0xff);
                                            if ((((members.m_B ?? 0)) & (128))) {
                                                f__77 = ((16) & 0xff);
                                            }
                                            else {
                                                f__77 = ((0) & 0xff);
                                            }
                                            members.m_B = ((((members.m_B) << (1))) & 0xff);
                                            if (((((members.m_B ?? 0)) === (0)) ? 1 : 0)) {
                                                f__77 = ((((f__77) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__77) & 0xff);
                                            break;
                                        }
                                    case 33:
                                        {
                                            let f__78 = ((0) & 0xff);
                                            if ((((members.m_C ?? 0)) & (128))) {
                                                f__78 = ((16) & 0xff);
                                            }
                                            else {
                                                f__78 = ((0) & 0xff);
                                            }
                                            members.m_C = ((((members.m_C) << (1))) & 0xff);
                                            if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                                                f__78 = ((((f__78) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__78) & 0xff);
                                            break;
                                        }
                                    case 34:
                                        {
                                            let f__79 = ((0) & 0xff);
                                            if ((((members.m_D ?? 0)) & (128))) {
                                                f__79 = ((16) & 0xff);
                                            }
                                            else {
                                                f__79 = ((0) & 0xff);
                                            }
                                            members.m_D = ((((members.m_D) << (1))) & 0xff);
                                            if (((((members.m_D ?? 0)) === (0)) ? 1 : 0)) {
                                                f__79 = ((((f__79) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__79) & 0xff);
                                            break;
                                        }
                                    case 35:
                                        {
                                            let f__80 = ((0) & 0xff);
                                            if ((((members.m_E ?? 0)) & (128))) {
                                                f__80 = ((16) & 0xff);
                                            }
                                            else {
                                                f__80 = ((0) & 0xff);
                                            }
                                            members.m_E = ((((members.m_E) << (1))) & 0xff);
                                            if (((((members.m_E ?? 0)) === (0)) ? 1 : 0)) {
                                                f__80 = ((((f__80) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__80) & 0xff);
                                            break;
                                        }
                                    case 36:
                                        {
                                            let f__81 = ((0) & 0xff);
                                            if ((((members.m_H ?? 0)) & (128))) {
                                                f__81 = ((16) & 0xff);
                                            }
                                            else {
                                                f__81 = ((0) & 0xff);
                                            }
                                            members.m_H = ((((members.m_H) << (1))) & 0xff);
                                            if (((((members.m_H ?? 0)) === (0)) ? 1 : 0)) {
                                                f__81 = ((((f__81) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__81) & 0xff);
                                            break;
                                        }
                                    case 37:
                                        {
                                            let f__82 = ((0) & 0xff);
                                            if ((((members.m_L ?? 0)) & (128))) {
                                                f__82 = ((16) & 0xff);
                                            }
                                            else {
                                                f__82 = ((0) & 0xff);
                                            }
                                            members.m_L = ((((members.m_L) << (1))) & 0xff);
                                            if (((((members.m_L ?? 0)) === (0)) ? 1 : 0)) {
                                                f__82 = ((((f__82) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__82) & 0xff);
                                            break;
                                        }
                                    case 38:
                                        {
                                            let addr__9 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__9)) & 0xff);
                                            let f__83 = ((0) & 0xff);
                                            if (((x) & (128))) {
                                                f__83 = ((16) & 0xff);
                                            }
                                            else {
                                                f__83 = ((0) & 0xff);
                                            }
                                            x = ((((x) << (1))) & 0xff);
                                            if ((((x) === (0)) ? 1 : 0)) {
                                                f__83 = ((((f__83) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__83) & 0xff);
                                            method_mem_write_byte(runtime, addr__9, x);
                                            break;
                                        }
                                    case 39:
                                        {
                                            let f__84 = ((0) & 0xff);
                                            if ((((members.m_A ?? 0)) & (128))) {
                                                f__84 = ((16) & 0xff);
                                            }
                                            else {
                                                f__84 = ((0) & 0xff);
                                            }
                                            members.m_A = ((((members.m_A) << (1))) & 0xff);
                                            if (((((members.m_A ?? 0)) === (0)) ? 1 : 0)) {
                                                f__84 = ((((f__84) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__84) & 0xff);
                                            break;
                                        }
                                    case 40:
                                        {
                                            let f__85 = ((0) & 0xff);
                                            if ((((members.m_B ?? 0)) & (1))) {
                                                f__85 = ((16) & 0xff);
                                            }
                                            else {
                                                f__85 = ((0) & 0xff);
                                            }
                                            members.m_B = ((((runtime.shiftRight((((members.m_B ?? 0)) << 24 >> 24), 1)) & 0xff)) & 0xff);
                                            if (((((members.m_B ?? 0)) === (0)) ? 1 : 0)) {
                                                f__85 = ((((f__85) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__85) & 0xff);
                                            break;
                                        }
                                    case 41:
                                        {
                                            let f__86 = ((0) & 0xff);
                                            if ((((members.m_C ?? 0)) & (1))) {
                                                f__86 = ((16) & 0xff);
                                            }
                                            else {
                                                f__86 = ((0) & 0xff);
                                            }
                                            members.m_C = ((((runtime.shiftRight((((members.m_C ?? 0)) << 24 >> 24), 1)) & 0xff)) & 0xff);
                                            if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                                                f__86 = ((((f__86) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__86) & 0xff);
                                            break;
                                        }
                                    case 42:
                                        {
                                            let f__87 = ((0) & 0xff);
                                            if ((((members.m_D ?? 0)) & (1))) {
                                                f__87 = ((16) & 0xff);
                                            }
                                            else {
                                                f__87 = ((0) & 0xff);
                                            }
                                            members.m_D = ((((runtime.shiftRight((((members.m_D ?? 0)) << 24 >> 24), 1)) & 0xff)) & 0xff);
                                            if (((((members.m_D ?? 0)) === (0)) ? 1 : 0)) {
                                                f__87 = ((((f__87) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__87) & 0xff);
                                            break;
                                        }
                                    case 43:
                                        {
                                            let f__88 = ((0) & 0xff);
                                            if ((((members.m_E ?? 0)) & (1))) {
                                                f__88 = ((16) & 0xff);
                                            }
                                            else {
                                                f__88 = ((0) & 0xff);
                                            }
                                            members.m_E = ((((runtime.shiftRight((((members.m_E ?? 0)) << 24 >> 24), 1)) & 0xff)) & 0xff);
                                            if (((((members.m_E ?? 0)) === (0)) ? 1 : 0)) {
                                                f__88 = ((((f__88) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__88) & 0xff);
                                            break;
                                        }
                                    case 44:
                                        {
                                            let f__89 = ((0) & 0xff);
                                            if ((((members.m_H ?? 0)) & (1))) {
                                                f__89 = ((16) & 0xff);
                                            }
                                            else {
                                                f__89 = ((0) & 0xff);
                                            }
                                            members.m_H = ((((runtime.shiftRight((((members.m_H ?? 0)) << 24 >> 24), 1)) & 0xff)) & 0xff);
                                            if (((((members.m_H ?? 0)) === (0)) ? 1 : 0)) {
                                                f__89 = ((((f__89) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__89) & 0xff);
                                            break;
                                        }
                                    case 45:
                                        {
                                            let f__90 = ((0) & 0xff);
                                            if ((((members.m_L ?? 0)) & (1))) {
                                                f__90 = ((16) & 0xff);
                                            }
                                            else {
                                                f__90 = ((0) & 0xff);
                                            }
                                            members.m_L = ((((runtime.shiftRight((((members.m_L ?? 0)) << 24 >> 24), 1)) & 0xff)) & 0xff);
                                            if (((((members.m_L ?? 0)) === (0)) ? 1 : 0)) {
                                                f__90 = ((((f__90) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__90) & 0xff);
                                            break;
                                        }
                                    case 46:
                                        {
                                            let addr__10 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__10)) & 0xff);
                                            let f__91 = ((0) & 0xff);
                                            if (((x) & (1))) {
                                                f__91 = ((16) & 0xff);
                                            }
                                            else {
                                                f__91 = ((0) & 0xff);
                                            }
                                            x = ((((runtime.shiftRight(((x) << 24 >> 24), 1)) & 0xff)) & 0xff);
                                            if ((((x) === (0)) ? 1 : 0)) {
                                                f__91 = ((((f__91) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__91) & 0xff);
                                            method_mem_write_byte(runtime, addr__10, x);
                                            break;
                                        }
                                    case 47:
                                        {
                                            let f__92 = ((0) & 0xff);
                                            if ((((members.m_A ?? 0)) & (1))) {
                                                f__92 = ((16) & 0xff);
                                            }
                                            else {
                                                f__92 = ((0) & 0xff);
                                            }
                                            members.m_A = ((((runtime.shiftRight((((members.m_A ?? 0)) << 24 >> 24), 1)) & 0xff)) & 0xff);
                                            if (((((members.m_A ?? 0)) === (0)) ? 1 : 0)) {
                                                f__92 = ((((f__92) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__92) & 0xff);
                                            break;
                                        }
                                    case 48:
                                        {
                                            members.m_B = (((((((((members.m_B ?? 0)) >>> (4))) | ((((members.m_B ?? 0)) << (4))))) & 0xff)) & 0xff);
                                            if (((((members.m_B ?? 0)) === (0)) ? 1 : 0)) {
                                                members.m_F = ((128) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((0) & 0xff);
                                            }
                                            break;
                                        }
                                    case 49:
                                        {
                                            members.m_C = (((((((((members.m_C ?? 0)) >>> (4))) | ((((members.m_C ?? 0)) << (4))))) & 0xff)) & 0xff);
                                            if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                                                members.m_F = ((128) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((0) & 0xff);
                                            }
                                            break;
                                        }
                                    case 50:
                                        {
                                            members.m_D = (((((((((members.m_D ?? 0)) >>> (4))) | ((((members.m_D ?? 0)) << (4))))) & 0xff)) & 0xff);
                                            if (((((members.m_D ?? 0)) === (0)) ? 1 : 0)) {
                                                members.m_F = ((128) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((0) & 0xff);
                                            }
                                            break;
                                        }
                                    case 51:
                                        {
                                            members.m_E = (((((((((members.m_E ?? 0)) >>> (4))) | ((((members.m_E ?? 0)) << (4))))) & 0xff)) & 0xff);
                                            if (((((members.m_E ?? 0)) === (0)) ? 1 : 0)) {
                                                members.m_F = ((128) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((0) & 0xff);
                                            }
                                            break;
                                        }
                                    case 52:
                                        {
                                            members.m_H = (((((((((members.m_H ?? 0)) >>> (4))) | ((((members.m_H ?? 0)) << (4))))) & 0xff)) & 0xff);
                                            if (((((members.m_H ?? 0)) === (0)) ? 1 : 0)) {
                                                members.m_F = ((128) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((0) & 0xff);
                                            }
                                            break;
                                        }
                                    case 53:
                                        {
                                            members.m_L = (((((((((members.m_L ?? 0)) >>> (4))) | ((((members.m_L ?? 0)) << (4))))) & 0xff)) & 0xff);
                                            if (((((members.m_L ?? 0)) === (0)) ? 1 : 0)) {
                                                members.m_F = ((128) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((0) & 0xff);
                                            }
                                            break;
                                        }
                                    case 54:
                                        {
                                            let addr__11 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__11)) & 0xff);
                                            x = ((((((((x) >>> (4))) | (((x) << (4))))) & 0xff)) & 0xff);
                                            if ((((x) === (0)) ? 1 : 0)) {
                                                members.m_F = ((128) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((0) & 0xff);
                                            }
                                            method_mem_write_byte(runtime, addr__11, x);
                                            break;
                                        }
                                    case 55:
                                        {
                                            members.m_A = (((((((((members.m_A ?? 0)) >>> (4))) | ((((members.m_A ?? 0)) << (4))))) & 0xff)) & 0xff);
                                            if (((((members.m_A ?? 0)) === (0)) ? 1 : 0)) {
                                                members.m_F = ((128) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((0) & 0xff);
                                            }
                                            break;
                                        }
                                    case 56:
                                        {
                                            let f__93 = ((0) & 0xff);
                                            if ((((members.m_B ?? 0)) & (1))) {
                                                f__93 = ((16) & 0xff);
                                            }
                                            else {
                                                f__93 = ((0) & 0xff);
                                            }
                                            members.m_B = ((((members.m_B) >>> (1))) & 0xff);
                                            if (((((members.m_B ?? 0)) === (0)) ? 1 : 0)) {
                                                f__93 = ((((f__93) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__93) & 0xff);
                                            break;
                                        }
                                    case 57:
                                        {
                                            let f__94 = ((0) & 0xff);
                                            if ((((members.m_C ?? 0)) & (1))) {
                                                f__94 = ((16) & 0xff);
                                            }
                                            else {
                                                f__94 = ((0) & 0xff);
                                            }
                                            members.m_C = ((((members.m_C) >>> (1))) & 0xff);
                                            if (((((members.m_C ?? 0)) === (0)) ? 1 : 0)) {
                                                f__94 = ((((f__94) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__94) & 0xff);
                                            break;
                                        }
                                    case 58:
                                        {
                                            let f__95 = ((0) & 0xff);
                                            if ((((members.m_D ?? 0)) & (1))) {
                                                f__95 = ((16) & 0xff);
                                            }
                                            else {
                                                f__95 = ((0) & 0xff);
                                            }
                                            members.m_D = ((((members.m_D) >>> (1))) & 0xff);
                                            if (((((members.m_D ?? 0)) === (0)) ? 1 : 0)) {
                                                f__95 = ((((f__95) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__95) & 0xff);
                                            break;
                                        }
                                    case 59:
                                        {
                                            let f__96 = ((0) & 0xff);
                                            if ((((members.m_E ?? 0)) & (1))) {
                                                f__96 = ((16) & 0xff);
                                            }
                                            else {
                                                f__96 = ((0) & 0xff);
                                            }
                                            members.m_E = ((((members.m_E) >>> (1))) & 0xff);
                                            if (((((members.m_E ?? 0)) === (0)) ? 1 : 0)) {
                                                f__96 = ((((f__96) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__96) & 0xff);
                                            break;
                                        }
                                    case 60:
                                        {
                                            let f__97 = ((0) & 0xff);
                                            if ((((members.m_H ?? 0)) & (1))) {
                                                f__97 = ((16) & 0xff);
                                            }
                                            else {
                                                f__97 = ((0) & 0xff);
                                            }
                                            members.m_H = ((((members.m_H) >>> (1))) & 0xff);
                                            if (((((members.m_H ?? 0)) === (0)) ? 1 : 0)) {
                                                f__97 = ((((f__97) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__97) & 0xff);
                                            break;
                                        }
                                    case 61:
                                        {
                                            let f__98 = ((0) & 0xff);
                                            if ((((members.m_L ?? 0)) & (1))) {
                                                f__98 = ((16) & 0xff);
                                            }
                                            else {
                                                f__98 = ((0) & 0xff);
                                            }
                                            members.m_L = ((((members.m_L) >>> (1))) & 0xff);
                                            if (((((members.m_L ?? 0)) === (0)) ? 1 : 0)) {
                                                f__98 = ((((f__98) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__98) & 0xff);
                                            break;
                                        }
                                    case 62:
                                        {
                                            let addr__12 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__12)) & 0xff);
                                            let f__99 = ((0) & 0xff);
                                            if (((x) & (1))) {
                                                f__99 = ((16) & 0xff);
                                            }
                                            else {
                                                f__99 = ((0) & 0xff);
                                            }
                                            x = ((((x) >>> (1))) & 0xff);
                                            if ((((x) === (0)) ? 1 : 0)) {
                                                f__99 = ((((f__99) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__99) & 0xff);
                                            method_mem_write_byte(runtime, addr__12, x);
                                            break;
                                        }
                                    case 63:
                                        {
                                            let f__100 = ((0) & 0xff);
                                            if ((((members.m_A ?? 0)) & (1))) {
                                                f__100 = ((16) & 0xff);
                                            }
                                            else {
                                                f__100 = ((0) & 0xff);
                                            }
                                            members.m_A = ((((members.m_A) >>> (1))) & 0xff);
                                            if (((((members.m_A ?? 0)) === (0)) ? 1 : 0)) {
                                                f__100 = ((((f__100) | (128))) & 0xff);
                                            }
                                            members.m_F = ((f__100) & 0xff);
                                            break;
                                        }
                                    case 64:
                                        {
                                            if ((((members.m_B ?? 0)) & (1))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 65:
                                        {
                                            if ((((members.m_C ?? 0)) & (1))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 66:
                                        {
                                            if ((((members.m_D ?? 0)) & (1))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 67:
                                        {
                                            if ((((members.m_E ?? 0)) & (1))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 68:
                                        {
                                            if ((((members.m_H ?? 0)) & (1))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 69:
                                        {
                                            if ((((members.m_L ?? 0)) & (1))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 70:
                                        {
                                            let addr__13 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__13)) & 0xff);
                                            if (((x) & (1))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 71:
                                        {
                                            if ((((members.m_A ?? 0)) & (1))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 72:
                                        {
                                            if ((((members.m_B ?? 0)) & (2))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 73:
                                        {
                                            if ((((members.m_C ?? 0)) & (2))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 74:
                                        {
                                            if ((((members.m_D ?? 0)) & (2))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 75:
                                        {
                                            if ((((members.m_E ?? 0)) & (2))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 76:
                                        {
                                            if ((((members.m_H ?? 0)) & (2))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 77:
                                        {
                                            if ((((members.m_L ?? 0)) & (2))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 78:
                                        {
                                            let addr__14 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__14)) & 0xff);
                                            if (((x) & (2))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 79:
                                        {
                                            if ((((members.m_A ?? 0)) & (2))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 80:
                                        {
                                            if ((((members.m_B ?? 0)) & (4))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 81:
                                        {
                                            if ((((members.m_C ?? 0)) & (4))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 82:
                                        {
                                            if ((((members.m_D ?? 0)) & (4))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 83:
                                        {
                                            if ((((members.m_E ?? 0)) & (4))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 84:
                                        {
                                            if ((((members.m_H ?? 0)) & (4))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 85:
                                        {
                                            if ((((members.m_L ?? 0)) & (4))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 86:
                                        {
                                            let addr__15 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__15)) & 0xff);
                                            if (((x) & (4))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 87:
                                        {
                                            if ((((members.m_A ?? 0)) & (4))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 88:
                                        {
                                            if ((((members.m_B ?? 0)) & (8))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 89:
                                        {
                                            if ((((members.m_C ?? 0)) & (8))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 90:
                                        {
                                            if ((((members.m_D ?? 0)) & (8))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 91:
                                        {
                                            if ((((members.m_E ?? 0)) & (8))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 92:
                                        {
                                            if ((((members.m_H ?? 0)) & (8))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 93:
                                        {
                                            if ((((members.m_L ?? 0)) & (8))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 94:
                                        {
                                            let addr__16 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__16)) & 0xff);
                                            if (((x) & (8))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 95:
                                        {
                                            if ((((members.m_A ?? 0)) & (8))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 96:
                                        {
                                            if ((((members.m_B ?? 0)) & (16))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 97:
                                        {
                                            if ((((members.m_C ?? 0)) & (16))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 98:
                                        {
                                            if ((((members.m_D ?? 0)) & (16))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 99:
                                        {
                                            if ((((members.m_E ?? 0)) & (16))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 100:
                                        {
                                            if ((((members.m_H ?? 0)) & (16))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 101:
                                        {
                                            if ((((members.m_L ?? 0)) & (16))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 102:
                                        {
                                            let addr__17 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__17)) & 0xff);
                                            if (((x) & (16))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 103:
                                        {
                                            if ((((members.m_A ?? 0)) & (16))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 104:
                                        {
                                            if ((((members.m_B ?? 0)) & (32))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 105:
                                        {
                                            if ((((members.m_C ?? 0)) & (32))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 106:
                                        {
                                            if ((((members.m_D ?? 0)) & (32))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 107:
                                        {
                                            if ((((members.m_E ?? 0)) & (32))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 108:
                                        {
                                            if ((((members.m_H ?? 0)) & (32))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 109:
                                        {
                                            if ((((members.m_L ?? 0)) & (32))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 110:
                                        {
                                            let addr__18 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__18)) & 0xff);
                                            if (((x) & (32))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 111:
                                        {
                                            if ((((members.m_A ?? 0)) & (32))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 112:
                                        {
                                            if ((((members.m_B ?? 0)) & (64))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 113:
                                        {
                                            if ((((members.m_C ?? 0)) & (64))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 114:
                                        {
                                            if ((((members.m_D ?? 0)) & (64))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 115:
                                        {
                                            if ((((members.m_E ?? 0)) & (64))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 116:
                                        {
                                            if ((((members.m_H ?? 0)) & (64))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 117:
                                        {
                                            if ((((members.m_L ?? 0)) & (64))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 118:
                                        {
                                            let addr__19 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__19)) & 0xff);
                                            if (((x) & (64))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 119:
                                        {
                                            if ((((members.m_A ?? 0)) & (64))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 120:
                                        {
                                            if ((((members.m_B ?? 0)) & (128))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 121:
                                        {
                                            if ((((members.m_C ?? 0)) & (128))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 122:
                                        {
                                            if ((((members.m_D ?? 0)) & (128))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 123:
                                        {
                                            if ((((members.m_E ?? 0)) & (128))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 124:
                                        {
                                            if ((((members.m_H ?? 0)) & (128))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 125:
                                        {
                                            if ((((members.m_L ?? 0)) & (128))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 126:
                                        {
                                            let addr__20 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__20)) & 0xff);
                                            if (((x) & (128))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 127:
                                        {
                                            if ((((members.m_A ?? 0)) & (128))) {
                                                members.m_F = ((((((32) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            else {
                                                members.m_F = ((((((160) | ((((members.m_F ?? 0)) & (16))))) & 0xff)) & 0xff);
                                            }
                                            break;
                                        }
                                    case 128:
                                        {
                                            members.m_B = ((((members.m_B) & (-2))) & 0xff);
                                            break;
                                        }
                                    case 129:
                                        {
                                            members.m_C = ((((members.m_C) & (-2))) & 0xff);
                                            break;
                                        }
                                    case 130:
                                        {
                                            members.m_D = ((((members.m_D) & (-2))) & 0xff);
                                            break;
                                        }
                                    case 131:
                                        {
                                            members.m_E = ((((members.m_E) & (-2))) & 0xff);
                                            break;
                                        }
                                    case 132:
                                        {
                                            members.m_H = ((((members.m_H) & (-2))) & 0xff);
                                            break;
                                        }
                                    case 133:
                                        {
                                            members.m_L = ((((members.m_L) & (-2))) & 0xff);
                                            break;
                                        }
                                    case 134:
                                        {
                                            let addr__21 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__21)) & 0xff);
                                            x = ((((x) & (-2))) & 0xff);
                                            method_mem_write_byte(runtime, addr__21, x);
                                            break;
                                        }
                                    case 135:
                                        {
                                            members.m_A = ((((members.m_A) & (-2))) & 0xff);
                                            break;
                                        }
                                    case 136:
                                        {
                                            members.m_B = ((((members.m_B) & (-3))) & 0xff);
                                            break;
                                        }
                                    case 137:
                                        {
                                            members.m_C = ((((members.m_C) & (-3))) & 0xff);
                                            break;
                                        }
                                    case 138:
                                        {
                                            members.m_D = ((((members.m_D) & (-3))) & 0xff);
                                            break;
                                        }
                                    case 139:
                                        {
                                            members.m_E = ((((members.m_E) & (-3))) & 0xff);
                                            break;
                                        }
                                    case 140:
                                        {
                                            members.m_H = ((((members.m_H) & (-3))) & 0xff);
                                            break;
                                        }
                                    case 141:
                                        {
                                            members.m_L = ((((members.m_L) & (-3))) & 0xff);
                                            break;
                                        }
                                    case 142:
                                        {
                                            let addr__22 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__22)) & 0xff);
                                            x = ((((x) & (-3))) & 0xff);
                                            method_mem_write_byte(runtime, addr__22, x);
                                            break;
                                        }
                                    case 143:
                                        {
                                            members.m_A = ((((members.m_A) & (-3))) & 0xff);
                                            break;
                                        }
                                    case 144:
                                        {
                                            members.m_B = ((((members.m_B) & (-5))) & 0xff);
                                            break;
                                        }
                                    case 145:
                                        {
                                            members.m_C = ((((members.m_C) & (-5))) & 0xff);
                                            break;
                                        }
                                    case 146:
                                        {
                                            members.m_D = ((((members.m_D) & (-5))) & 0xff);
                                            break;
                                        }
                                    case 147:
                                        {
                                            members.m_E = ((((members.m_E) & (-5))) & 0xff);
                                            break;
                                        }
                                    case 148:
                                        {
                                            members.m_H = ((((members.m_H) & (-5))) & 0xff);
                                            break;
                                        }
                                    case 149:
                                        {
                                            members.m_L = ((((members.m_L) & (-5))) & 0xff);
                                            break;
                                        }
                                    case 150:
                                        {
                                            let addr__23 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__23)) & 0xff);
                                            x = ((((x) & (-5))) & 0xff);
                                            method_mem_write_byte(runtime, addr__23, x);
                                            break;
                                        }
                                    case 151:
                                        {
                                            members.m_A = ((((members.m_A) & (-5))) & 0xff);
                                            break;
                                        }
                                    case 152:
                                        {
                                            members.m_B = ((((members.m_B) & (-9))) & 0xff);
                                            break;
                                        }
                                    case 153:
                                        {
                                            members.m_C = ((((members.m_C) & (-9))) & 0xff);
                                            break;
                                        }
                                    case 154:
                                        {
                                            members.m_D = ((((members.m_D) & (-9))) & 0xff);
                                            break;
                                        }
                                    case 155:
                                        {
                                            members.m_E = ((((members.m_E) & (-9))) & 0xff);
                                            break;
                                        }
                                    case 156:
                                        {
                                            members.m_H = ((((members.m_H) & (-9))) & 0xff);
                                            break;
                                        }
                                    case 157:
                                        {
                                            members.m_L = ((((members.m_L) & (-9))) & 0xff);
                                            break;
                                        }
                                    case 158:
                                        {
                                            let addr__24 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__24)) & 0xff);
                                            x = ((((x) & (-9))) & 0xff);
                                            method_mem_write_byte(runtime, addr__24, x);
                                            break;
                                        }
                                    case 159:
                                        {
                                            members.m_A = ((((members.m_A) & (-9))) & 0xff);
                                            break;
                                        }
                                    case 160:
                                        {
                                            members.m_B = ((((members.m_B) & (-17))) & 0xff);
                                            break;
                                        }
                                    case 161:
                                        {
                                            members.m_C = ((((members.m_C) & (-17))) & 0xff);
                                            break;
                                        }
                                    case 162:
                                        {
                                            members.m_D = ((((members.m_D) & (-17))) & 0xff);
                                            break;
                                        }
                                    case 163:
                                        {
                                            members.m_E = ((((members.m_E) & (-17))) & 0xff);
                                            break;
                                        }
                                    case 164:
                                        {
                                            members.m_H = ((((members.m_H) & (-17))) & 0xff);
                                            break;
                                        }
                                    case 165:
                                        {
                                            members.m_L = ((((members.m_L) & (-17))) & 0xff);
                                            break;
                                        }
                                    case 166:
                                        {
                                            let addr__25 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__25)) & 0xff);
                                            x = ((((x) & (-17))) & 0xff);
                                            method_mem_write_byte(runtime, addr__25, x);
                                            break;
                                        }
                                    case 167:
                                        {
                                            members.m_A = ((((members.m_A) & (-17))) & 0xff);
                                            break;
                                        }
                                    case 168:
                                        {
                                            members.m_B = ((((members.m_B) & (-33))) & 0xff);
                                            break;
                                        }
                                    case 169:
                                        {
                                            members.m_C = ((((members.m_C) & (-33))) & 0xff);
                                            break;
                                        }
                                    case 170:
                                        {
                                            members.m_D = ((((members.m_D) & (-33))) & 0xff);
                                            break;
                                        }
                                    case 171:
                                        {
                                            members.m_E = ((((members.m_E) & (-33))) & 0xff);
                                            break;
                                        }
                                    case 172:
                                        {
                                            members.m_H = ((((members.m_H) & (-33))) & 0xff);
                                            break;
                                        }
                                    case 173:
                                        {
                                            members.m_L = ((((members.m_L) & (-33))) & 0xff);
                                            break;
                                        }
                                    case 174:
                                        {
                                            let addr__26 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__26)) & 0xff);
                                            x = ((((x) & (-33))) & 0xff);
                                            method_mem_write_byte(runtime, addr__26, x);
                                            break;
                                        }
                                    case 175:
                                        {
                                            members.m_A = ((((members.m_A) & (-33))) & 0xff);
                                            break;
                                        }
                                    case 176:
                                        {
                                            members.m_B = ((((members.m_B) & (-65))) & 0xff);
                                            break;
                                        }
                                    case 177:
                                        {
                                            members.m_C = ((((members.m_C) & (-65))) & 0xff);
                                            break;
                                        }
                                    case 178:
                                        {
                                            members.m_D = ((((members.m_D) & (-65))) & 0xff);
                                            break;
                                        }
                                    case 179:
                                        {
                                            members.m_E = ((((members.m_E) & (-65))) & 0xff);
                                            break;
                                        }
                                    case 180:
                                        {
                                            members.m_H = ((((members.m_H) & (-65))) & 0xff);
                                            break;
                                        }
                                    case 181:
                                        {
                                            members.m_L = ((((members.m_L) & (-65))) & 0xff);
                                            break;
                                        }
                                    case 182:
                                        {
                                            let addr__27 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__27)) & 0xff);
                                            x = ((((x) & (-65))) & 0xff);
                                            method_mem_write_byte(runtime, addr__27, x);
                                            break;
                                        }
                                    case 183:
                                        {
                                            members.m_A = ((((members.m_A) & (-65))) & 0xff);
                                            break;
                                        }
                                    case 184:
                                        {
                                            members.m_B = ((((members.m_B) & (-129))) & 0xff);
                                            break;
                                        }
                                    case 185:
                                        {
                                            members.m_C = ((((members.m_C) & (-129))) & 0xff);
                                            break;
                                        }
                                    case 186:
                                        {
                                            members.m_D = ((((members.m_D) & (-129))) & 0xff);
                                            break;
                                        }
                                    case 187:
                                        {
                                            members.m_E = ((((members.m_E) & (-129))) & 0xff);
                                            break;
                                        }
                                    case 188:
                                        {
                                            members.m_H = ((((members.m_H) & (-129))) & 0xff);
                                            break;
                                        }
                                    case 189:
                                        {
                                            members.m_L = ((((members.m_L) & (-129))) & 0xff);
                                            break;
                                        }
                                    case 190:
                                        {
                                            let addr__28 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__28)) & 0xff);
                                            x = ((((x) & (-129))) & 0xff);
                                            method_mem_write_byte(runtime, addr__28, x);
                                            break;
                                        }
                                    case 191:
                                        {
                                            members.m_A = ((((members.m_A) & (-129))) & 0xff);
                                            break;
                                        }
                                    case 192:
                                        {
                                            members.m_B = ((((members.m_B) | (1))) & 0xff);
                                            break;
                                        }
                                    case 193:
                                        {
                                            members.m_C = ((((members.m_C) | (1))) & 0xff);
                                            break;
                                        }
                                    case 194:
                                        {
                                            members.m_D = ((((members.m_D) | (1))) & 0xff);
                                            break;
                                        }
                                    case 195:
                                        {
                                            members.m_E = ((((members.m_E) | (1))) & 0xff);
                                            break;
                                        }
                                    case 196:
                                        {
                                            members.m_H = ((((members.m_H) | (1))) & 0xff);
                                            break;
                                        }
                                    case 197:
                                        {
                                            members.m_L = ((((members.m_L) | (1))) & 0xff);
                                            break;
                                        }
                                    case 198:
                                        {
                                            let addr__29 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__29)) & 0xff);
                                            x = ((((x) | (1))) & 0xff);
                                            method_mem_write_byte(runtime, addr__29, x);
                                            break;
                                        }
                                    case 199:
                                        {
                                            members.m_A = ((((members.m_A) | (1))) & 0xff);
                                            break;
                                        }
                                    case 200:
                                        {
                                            members.m_B = ((((members.m_B) | (2))) & 0xff);
                                            break;
                                        }
                                    case 201:
                                        {
                                            members.m_C = ((((members.m_C) | (2))) & 0xff);
                                            break;
                                        }
                                    case 202:
                                        {
                                            members.m_D = ((((members.m_D) | (2))) & 0xff);
                                            break;
                                        }
                                    case 203:
                                        {
                                            members.m_E = ((((members.m_E) | (2))) & 0xff);
                                            break;
                                        }
                                    case 204:
                                        {
                                            members.m_H = ((((members.m_H) | (2))) & 0xff);
                                            break;
                                        }
                                    case 205:
                                        {
                                            members.m_L = ((((members.m_L) | (2))) & 0xff);
                                            break;
                                        }
                                    case 206:
                                        {
                                            let addr__30 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__30)) & 0xff);
                                            x = ((((x) | (2))) & 0xff);
                                            method_mem_write_byte(runtime, addr__30, x);
                                            break;
                                        }
                                    case 207:
                                        {
                                            members.m_A = ((((members.m_A) | (2))) & 0xff);
                                            break;
                                        }
                                    case 208:
                                        {
                                            members.m_B = ((((members.m_B) | (4))) & 0xff);
                                            break;
                                        }
                                    case 209:
                                        {
                                            members.m_C = ((((members.m_C) | (4))) & 0xff);
                                            break;
                                        }
                                    case 210:
                                        {
                                            members.m_D = ((((members.m_D) | (4))) & 0xff);
                                            break;
                                        }
                                    case 211:
                                        {
                                            members.m_E = ((((members.m_E) | (4))) & 0xff);
                                            break;
                                        }
                                    case 212:
                                        {
                                            members.m_H = ((((members.m_H) | (4))) & 0xff);
                                            break;
                                        }
                                    case 213:
                                        {
                                            members.m_L = ((((members.m_L) | (4))) & 0xff);
                                            break;
                                        }
                                    case 214:
                                        {
                                            let addr__31 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__31)) & 0xff);
                                            x = ((((x) | (4))) & 0xff);
                                            method_mem_write_byte(runtime, addr__31, x);
                                            break;
                                        }
                                    case 215:
                                        {
                                            members.m_A = ((((members.m_A) | (4))) & 0xff);
                                            break;
                                        }
                                    case 216:
                                        {
                                            members.m_B = ((((members.m_B) | (8))) & 0xff);
                                            break;
                                        }
                                    case 217:
                                        {
                                            members.m_C = ((((members.m_C) | (8))) & 0xff);
                                            break;
                                        }
                                    case 218:
                                        {
                                            members.m_D = ((((members.m_D) | (8))) & 0xff);
                                            break;
                                        }
                                    case 219:
                                        {
                                            members.m_E = ((((members.m_E) | (8))) & 0xff);
                                            break;
                                        }
                                    case 220:
                                        {
                                            members.m_H = ((((members.m_H) | (8))) & 0xff);
                                            break;
                                        }
                                    case 221:
                                        {
                                            members.m_L = ((((members.m_L) | (8))) & 0xff);
                                            break;
                                        }
                                    case 222:
                                        {
                                            let addr__32 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__32)) & 0xff);
                                            x = ((((x) | (8))) & 0xff);
                                            method_mem_write_byte(runtime, addr__32, x);
                                            break;
                                        }
                                    case 223:
                                        {
                                            members.m_A = ((((members.m_A) | (8))) & 0xff);
                                            break;
                                        }
                                    case 224:
                                        {
                                            members.m_B = ((((members.m_B) | (16))) & 0xff);
                                            break;
                                        }
                                    case 225:
                                        {
                                            members.m_C = ((((members.m_C) | (16))) & 0xff);
                                            break;
                                        }
                                    case 226:
                                        {
                                            members.m_D = ((((members.m_D) | (16))) & 0xff);
                                            break;
                                        }
                                    case 227:
                                        {
                                            members.m_E = ((((members.m_E) | (16))) & 0xff);
                                            break;
                                        }
                                    case 228:
                                        {
                                            members.m_H = ((((members.m_H) | (16))) & 0xff);
                                            break;
                                        }
                                    case 229:
                                        {
                                            members.m_L = ((((members.m_L) | (16))) & 0xff);
                                            break;
                                        }
                                    case 230:
                                        {
                                            let addr__33 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__33)) & 0xff);
                                            x = ((((x) | (16))) & 0xff);
                                            method_mem_write_byte(runtime, addr__33, x);
                                            break;
                                        }
                                    case 231:
                                        {
                                            members.m_A = ((((members.m_A) | (16))) & 0xff);
                                            break;
                                        }
                                    case 232:
                                        {
                                            members.m_B = ((((members.m_B) | (32))) & 0xff);
                                            break;
                                        }
                                    case 233:
                                        {
                                            members.m_C = ((((members.m_C) | (32))) & 0xff);
                                            break;
                                        }
                                    case 234:
                                        {
                                            members.m_D = ((((members.m_D) | (32))) & 0xff);
                                            break;
                                        }
                                    case 235:
                                        {
                                            members.m_E = ((((members.m_E) | (32))) & 0xff);
                                            break;
                                        }
                                    case 236:
                                        {
                                            members.m_H = ((((members.m_H) | (32))) & 0xff);
                                            break;
                                        }
                                    case 237:
                                        {
                                            members.m_L = ((((members.m_L) | (32))) & 0xff);
                                            break;
                                        }
                                    case 238:
                                        {
                                            let addr__34 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__34)) & 0xff);
                                            x = ((((x) | (32))) & 0xff);
                                            method_mem_write_byte(runtime, addr__34, x);
                                            break;
                                        }
                                    case 239:
                                        {
                                            members.m_A = ((((members.m_A) | (32))) & 0xff);
                                            break;
                                        }
                                    case 240:
                                        {
                                            members.m_B = ((((members.m_B) | (64))) & 0xff);
                                            break;
                                        }
                                    case 241:
                                        {
                                            members.m_C = ((((members.m_C) | (64))) & 0xff);
                                            break;
                                        }
                                    case 242:
                                        {
                                            members.m_D = ((((members.m_D) | (64))) & 0xff);
                                            break;
                                        }
                                    case 243:
                                        {
                                            members.m_E = ((((members.m_E) | (64))) & 0xff);
                                            break;
                                        }
                                    case 244:
                                        {
                                            members.m_H = ((((members.m_H) | (64))) & 0xff);
                                            break;
                                        }
                                    case 245:
                                        {
                                            members.m_L = ((((members.m_L) | (64))) & 0xff);
                                            break;
                                        }
                                    case 246:
                                        {
                                            let addr__35 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__35)) & 0xff);
                                            x = ((((x) | (64))) & 0xff);
                                            method_mem_write_byte(runtime, addr__35, x);
                                            break;
                                        }
                                    case 247:
                                        {
                                            members.m_A = ((((members.m_A) | (64))) & 0xff);
                                            break;
                                        }
                                    case 248:
                                        {
                                            members.m_B = ((((members.m_B) | (128))) & 0xff);
                                            break;
                                        }
                                    case 249:
                                        {
                                            members.m_C = ((((members.m_C) | (128))) & 0xff);
                                            break;
                                        }
                                    case 250:
                                        {
                                            members.m_D = ((((members.m_D) | (128))) & 0xff);
                                            break;
                                        }
                                    case 251:
                                        {
                                            members.m_E = ((((members.m_E) | (128))) & 0xff);
                                            break;
                                        }
                                    case 252:
                                        {
                                            members.m_H = ((((members.m_H) | (128))) & 0xff);
                                            break;
                                        }
                                    case 253:
                                        {
                                            members.m_L = ((((members.m_L) | (128))) & 0xff);
                                            break;
                                        }
                                    case 254:
                                        {
                                            let addr__36 = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                            x = ((method_mem_read_byte(runtime, addr__36)) & 0xff);
                                            x = ((((x) | (128))) & 0xff);
                                            method_mem_write_byte(runtime, addr__36, x);
                                            break;
                                        }
                                    case 255:
                                        {
                                            members.m_A = ((((members.m_A) | (128))) & 0xff);
                                            break;
                                        }
                                }
                                break;
                            }
                        case 204:
                            {
                                let addr__37 = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                if ((((members.m_F ?? 0)) & (128))) {
                                    method_cycles_passed(runtime, 4);
                                    members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                    method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                    members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                    method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                    members.m_PC = ((addr__37) & 0xffff);
                                }
                                break;
                            }
                        case 205:
                            {
                                let addr__38 = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                members.m_PC = ((addr__38) & 0xffff);
                                break;
                            }
                        case 206:
                            {
                                x = ((method_mem_read_byte(runtime, (__t24 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t24))) & 0xff);
                                let r1__45 = ((0) & 0xffff);
                                let r2__45 = ((0) & 0xffff);
                                let f__101 = ((0) & 0xff);
                                r1__45 = ((((__add_execute_run(runtime, __add_execute_run(runtime, (((members.m_A ?? 0)) & (15)), ((x) & (15))), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                r2__45 = ((((__add_execute_run(runtime, (((members.m_A ?? 0)) + (x)), (((((members.m_F ?? 0)) & (16))) ? (1) : (0)))) & 0xffff)) & 0xffff);
                                if (((Number((members.m_A = ((((r2__45) & 0xff)) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    f__101 = ((128) & 0xff);
                                }
                                else {
                                    f__101 = ((0) & 0xff);
                                }
                                if ((((r2__45) > (255)) ? 1 : 0)) {
                                    f__101 = ((((f__101) | (16))) & 0xff);
                                }
                                if ((((r1__45) > (15)) ? 1 : 0)) {
                                    f__101 = ((((f__101) | (32))) & 0xff);
                                }
                                members.m_F = ((f__101) & 0xff);
                                break;
                            }
                        case 207:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                members.m_PC = ((8) & 0xffff);
                                break;
                            }
                        case 208:
                            {
                                method_cycles_passed(runtime, 4);
                                if ((((((members.m_F ?? 0)) & (16))) ? 0 : 1)) {
                                    members.m_PC = ((method_mem_read_word(runtime, (members.m_SP ?? 0))) & 0xffff);
                                    members.m_SP = ((((members.m_SP) + (2))) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 209:
                            {
                                members.m_E = ((method_mem_read_byte(runtime, (__t25 = (members.m_SP ?? 0), members.m_SP = ((((members.m_SP) + (1))) & 0xffff), __t25))) & 0xff);
                                members.m_D = ((method_mem_read_byte(runtime, (__t26 = (members.m_SP ?? 0), members.m_SP = ((((members.m_SP) + (1))) & 0xffff), __t26))) & 0xff);
                                break;
                            }
                        case 210:
                            {
                                let addr__39 = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                if ((((((members.m_F ?? 0)) & (16))) ? 0 : 1)) {
                                    members.m_PC = ((addr__39) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 212:
                            {
                                let addr__40 = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                if ((((((members.m_F ?? 0)) & (16))) ? 0 : 1)) {
                                    method_cycles_passed(runtime, 4);
                                    members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                    method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                    members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                    method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                    members.m_PC = ((addr__40) & 0xffff);
                                }
                                break;
                            }
                        case 213:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (members.m_D ?? 0));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (members.m_E ?? 0));
                                break;
                            }
                        case 214:
                            {
                                x = ((method_mem_read_byte(runtime, (__t27 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t27))) & 0xff);
                                let r1__46 = ((0) & 0xffff);
                                let r2__46 = ((0) & 0xffff);
                                let f__102 = ((0) & 0xff);
                                r1__46 = (((((((((members.m_A ?? 0)) & (15))) - (((x) & (15))))) & 0xffff)) & 0xffff);
                                r2__46 = (((((((members.m_A ?? 0)) - (x))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__46) & 0xff)) & 0xff);
                                if ((((((r2__46) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__102 = ((192) & 0xff);
                                }
                                else {
                                    f__102 = ((64) & 0xff);
                                }
                                if ((((r2__46) > (255)) ? 1 : 0)) {
                                    f__102 = ((((f__102) | (16))) & 0xff);
                                }
                                if ((((r1__46) > (15)) ? 1 : 0)) {
                                    f__102 = ((((f__102) | (32))) & 0xff);
                                }
                                members.m_F = ((f__102) & 0xff);
                                break;
                            }
                        case 215:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                members.m_PC = ((16) & 0xffff);
                                break;
                            }
                        case 216:
                            {
                                method_cycles_passed(runtime, 4);
                                if ((((members.m_F ?? 0)) & (16))) {
                                    members.m_PC = ((method_mem_read_word(runtime, (members.m_SP ?? 0))) & 0xffff);
                                    members.m_SP = ((((members.m_SP) + (2))) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 217:
                            {
                                members.m_PC = ((method_mem_read_word(runtime, (members.m_SP ?? 0))) & 0xffff);
                                members.m_SP = ((((members.m_SP) + (2))) & 0xffff);
                                members.m_enable = ((((members.m_enable) | (1))) | 0);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 218:
                            {
                                let addr__41 = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                if ((((members.m_F ?? 0)) & (16))) {
                                    members.m_PC = ((addr__41) & 0xffff);
                                    method_cycles_passed(runtime, 4);
                                }
                                break;
                            }
                        case 220:
                            {
                                let addr__42 = ((method_mem_read_word(runtime, (members.m_PC ?? 0))) & 0xffff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                if ((((members.m_F ?? 0)) & (16))) {
                                    method_cycles_passed(runtime, 4);
                                    members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                    method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                    members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                    method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                    members.m_PC = ((addr__42) & 0xffff);
                                }
                                break;
                            }
                        case 222:
                            {
                                x = ((method_mem_read_byte(runtime, (__t28 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t28))) & 0xff);
                                let r1__47 = ((0) & 0xffff);
                                let r2__47 = ((0) & 0xffff);
                                let f__103 = ((0) & 0xff);
                                r1__47 = (((((((((((members.m_A ?? 0)) & (15))) - (((x) & (15))))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                r2__47 = (((((((((members.m_A ?? 0)) - (x))) - ((((((members.m_F ?? 0)) & (16))) ? (1) : (0))))) & 0xffff)) & 0xffff);
                                members.m_A = ((((r2__47) & 0xff)) & 0xff);
                                if ((((((r2__47) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__103 = ((192) & 0xff);
                                }
                                else {
                                    f__103 = ((64) & 0xff);
                                }
                                if ((((r2__47) > (255)) ? 1 : 0)) {
                                    f__103 = ((((f__103) | (16))) & 0xff);
                                }
                                if ((((r1__47) > (15)) ? 1 : 0)) {
                                    f__103 = ((((f__103) | (32))) & 0xff);
                                }
                                members.m_F = ((f__103) & 0xff);
                                break;
                            }
                        case 223:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                members.m_PC = ((24) & 0xffff);
                                break;
                            }
                        case 224:
                            {
                                let v__1 = ((method_mem_read_byte(runtime, (__t29 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t29))) & 0xff);
                                method_mem_write_byte(runtime, ((65280) + (v__1)), (members.m_A ?? 0));
                                break;
                            }
                        case 225:
                            {
                                members.m_L = ((method_mem_read_byte(runtime, (__t30 = (members.m_SP ?? 0), members.m_SP = ((((members.m_SP) + (1))) & 0xffff), __t30))) & 0xff);
                                members.m_H = ((method_mem_read_byte(runtime, (__t31 = (members.m_SP ?? 0), members.m_SP = ((((members.m_SP) + (1))) & 0xffff), __t31))) & 0xff);
                                break;
                            }
                        case 226:
                            {
                                method_mem_write_byte(runtime, ((65280) + ((members.m_C ?? 0))), (members.m_A ?? 0));
                                break;
                            }
                        case 229:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (members.m_H ?? 0));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (members.m_L ?? 0));
                                break;
                            }
                        case 230:
                            {
                                x = ((method_mem_read_byte(runtime, (__t32 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t32))) & 0xff);
                                if (((Number((members.m_A = ((((members.m_A) & (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((160) & 0xff);
                                }
                                else {
                                    members.m_F = ((32) & 0xff);
                                }
                                break;
                            }
                        case 231:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                members.m_PC = ((32) & 0xffff);
                                break;
                            }
                        case 232:
                            {
                                let n = ((0) | 0);
                                n = ((((method_mem_read_byte(runtime, (__t33 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t33))) << 24 >> 24)) | 0);
                                if (((Number((((((members.m_SP ?? 0)) & (255))) + (((((n) & (255))) & 0xff)))) > Number(255)) ? 1 : 0)) {
                                    members.m_F = ((16) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                if (((Number(__add_execute_run(runtime, (((members.m_SP ?? 0)) & (15)), ((n) & (15)))) > Number(15)) ? 1 : 0)) {
                                    members.m_F = ((((members.m_F) | (32))) & 0xff);
                                }
                                members.m_SP = (((((((members.m_SP ?? 0)) + (n))) & 0xffff)) & 0xffff);
                                method_cycles_passed(runtime, 8);
                                break;
                            }
                        case 233:
                            {
                                members.m_PC = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                break;
                            }
                        case 234:
                            {
                                method_mem_write_byte(runtime, method_mem_read_word(runtime, (members.m_PC ?? 0)), (members.m_A ?? 0));
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                break;
                            }
                        case 238:
                            {
                                x = ((method_mem_read_byte(runtime, (__t34 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t34))) & 0xff);
                                if (((Number((members.m_A = ((((members.m_A) ^ (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 239:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                members.m_PC = ((40) & 0xffff);
                                break;
                            }
                        case 240:
                            {
                                let v__2 = ((method_mem_read_byte(runtime, (__t35 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t35))) & 0xff);
                                members.m_A = ((method_mem_read_byte(runtime, ((65280) + (v__2)))) & 0xff);
                                break;
                            }
                        case 241:
                            {
                                members.m_F = ((method_mem_read_byte(runtime, (__t36 = (members.m_SP ?? 0), members.m_SP = ((((members.m_SP) + (1))) & 0xffff), __t36))) & 0xff);
                                members.m_A = ((method_mem_read_byte(runtime, (__t37 = (members.m_SP ?? 0), members.m_SP = ((((members.m_SP) + (1))) & 0xffff), __t37))) & 0xff);
                                members.m_F = ((((members.m_F) & (240))) & 0xff);
                                break;
                            }
                        case 242:
                            {
                                members.m_A = ((method_mem_read_byte(runtime, ((65280) + ((members.m_C ?? 0))))) & 0xff);
                                break;
                            }
                        case 243:
                            {
                                members.m_handle_ei_delay = ((0) ? 1 : 0);
                                members.m_enable = ((((members.m_enable) & (-2))) | 0);
                                break;
                            }
                        case 245:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_F = ((((members.m_F) & (240))) & 0xff);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (members.m_A ?? 0));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (members.m_F ?? 0));
                                break;
                            }
                        case 246:
                            {
                                x = ((method_mem_read_byte(runtime, (__t38 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t38))) & 0xff);
                                if (((Number((members.m_A = ((((members.m_A) | (x))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                    members.m_F = ((128) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                break;
                            }
                        case 247:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                members.m_PC = ((48) & 0xffff);
                                break;
                            }
                        case 248:
                            {
                                let n__1 = ((0) | 0);
                                n__1 = ((((method_mem_read_byte(runtime, (__t39 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t39))) << 24 >> 24)) | 0);
                                if (((Number((((((members.m_SP ?? 0)) & (255))) + (((((n__1) & (255))) & 0xff)))) > Number(255)) ? 1 : 0)) {
                                    members.m_F = ((16) & 0xff);
                                }
                                else {
                                    members.m_F = ((0) & 0xff);
                                }
                                if (((Number(__add_execute_run(runtime, (((members.m_SP ?? 0)) & (15)), ((n__1) & (15)))) > Number(15)) ? 1 : 0)) {
                                    members.m_F = ((((members.m_F) | (32))) & 0xff);
                                }
                                let res = (((((members.m_SP ?? 0)) + (n__1))) & 0xffff);
                                members.m_L = ((((res) & (255))) & 0xff);
                                members.m_H = ((((res) >>> (8))) & 0xff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 249:
                            {
                                members.m_SP = (((((((members.m_H ?? 0)) << (8))) | ((members.m_L ?? 0)))) & 0xffff);
                                method_cycles_passed(runtime, 4);
                                break;
                            }
                        case 250:
                            {
                                members.m_A = ((method_mem_read_byte(runtime, method_mem_read_word(runtime, (members.m_PC ?? 0)))) & 0xff);
                                members.m_PC = ((((members.m_PC) + (2))) & 0xffff);
                                break;
                            }
                        case 251:
                            {
                                members.m_enable = ((((members.m_enable) | (1))) | 0);
                                members.m_handle_ei_delay = ((1) ? 1 : 0);
                                break;
                            }
                        case 254:
                            {
                                x = ((method_mem_read_byte(runtime, (__t40 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t40))) & 0xff);
                                let r1__48 = ((0) & 0xffff);
                                let r2__48 = ((0) & 0xffff);
                                let f__104 = ((0) & 0xff);
                                r1__48 = (((((((((members.m_A ?? 0)) & (15))) - (((x) & (15))))) & 0xffff)) & 0xffff);
                                r2__48 = (((((((members.m_A ?? 0)) - (x))) & 0xffff)) & 0xffff);
                                if ((((((r2__48) & 0xff)) === (0)) ? 1 : 0)) {
                                    f__104 = ((192) & 0xff);
                                }
                                else {
                                    f__104 = ((64) & 0xff);
                                }
                                if ((((r2__48) > (255)) ? 1 : 0)) {
                                    f__104 = ((((f__104) | (16))) & 0xff);
                                }
                                if ((((r1__48) > (15)) ? 1 : 0)) {
                                    f__104 = ((((f__104) | (32))) & 0xff);
                                }
                                members.m_F = ((f__104) & 0xff);
                                break;
                            }
                        case 255:
                            {
                                method_cycles_passed(runtime, 4);
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) >>> (8)));
                                members.m_SP = ((((members.m_SP) - (1))) & 0xffff);
                                method_mem_write_byte(runtime, (members.m_SP ?? 0), (((members.m_PC ?? 0)) & (255)));
                                members.m_PC = ((56) & 0xffff);
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                }
                else {
                    let was_halted = (((((members.m_enable ?? 0)) & (2))) ? 1 : 0);
                    method_check_interrupts(runtime);
                    if ((((members.m_enable ?? 0)) & (2))) {
                        /* debugger_wait_hook: no effect */
                        method_cycles_passed(runtime, (((members.m_has_halt_bug ?? 0)) ? (2) : (4)));
                        members.m_execution_state = ((1) | 0);
                        members.m_entering_halt = ((0) ? 1 : 0);
                    }
                    else {
                        /* debugger_instruction_hook: no effect */
                        if (was_halted) {
                            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
                        }
                        else {
                            members.m_op = ((method_mem_read_byte(runtime, (__t41 = (members.m_PC ?? 0), members.m_PC = ((((members.m_PC) + (1))) & 0xffff), __t41))) & 0xff);
                        }
                    }
                }
                members.m_execution_state = ((((members.m_execution_state) ^ (1))) | 0);
            }
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function __add_execute_run(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_cycles_passed(runtime, cycles) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_timer_func"];
        cycles = ((cycles) & 0xff);
        members.m_icount = ((((members.m_icount) - (runtime.divide(cycles, (members.m_gb_speed ?? 0))))) | 0);
        (__L0 ? __L0(Number(cycles)) : typeof members.m_timer_func === 'function' ? members.m_timer_func(cycles) : runtime.invoke("m_timer_func", cycles));
    }
    function method_mem_read_byte(runtime, addr) {
        const members = runtime.members;
        addr = ((addr) & 0xffff);
        let data = (((__deref_mem_read_byte(runtime, members.m_program).read_byte?.(addr) ?? 0)) & 0xff);
        method_cycles_passed(runtime, 4);
        return ((data) & 0xff);
    }
    function __deref_mem_read_byte(runtime, p) {
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
    function method_mem_write_byte(runtime, addr, data) {
        const members = runtime.members;
        addr = ((addr) & 0xffff);
        data = ((data) & 0xff);
        (__deref_mem_write_byte(runtime, members.m_program).write_byte?.(addr, data) ?? 0);
        method_cycles_passed(runtime, 4);
    }
    function __deref_mem_write_byte(runtime, p) {
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
    function method_mem_write_word(runtime, addr, data) {
        const members = runtime.members;
        addr = ((addr) & 0xffff);
        data = ((data) & 0xffff);
        method_mem_write_byte(runtime, addr, ((data) & (255)));
        method_mem_write_byte(runtime, ((addr) + (1)), ((data) >>> (8)));
    }
    function method_mem_read_word(runtime, addr) {
        const members = runtime.members;
        addr = ((addr) & 0xffff);
        let data = ((method_mem_read_byte(runtime, addr)) & 0xffff);
        data = ((((data) | (((method_mem_read_byte(runtime, ((addr) + (1)))) << (8))))) & 0xffff);
        return ((data) & 0xffff);
    }
    function method_check_interrupts(runtime) {
        const members = runtime.members;
        let irq = (((((members.m_IE ?? 0)) & ((members.m_IF ?? 0)))) & 0xff);
        if ((members.m_handle_ei_delay ?? 0)) {
            members.m_handle_ei_delay = ((0) ? 1 : 0);
            return;
        }
        if (irq) {
            let irqline = ((0) | 0);
            let was_halted = (((((members.m_enable ?? 0)) & (2))) ? 1 : 0);
            for (; (((irqline) < (5)) ? 1 : 0); irqline = ((((irqline) + (1))) | 0)) {
                if (((irq) & (((1) << (irqline))))) {
                    if ((((members.m_enable ?? 0)) & (2))) {
                        members.m_enable = ((((members.m_enable) & (-3))) | 0);
                        members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
                        if ((members.m_has_halt_bug ?? 0)) {
                            if ((((((members.m_enable ?? 0)) & (1))) ? 0 : 1)) {
                                members.m_PC = ((((members.m_PC) - (1))) & 0xffff);
                            }
                            if ((((((((((irqline) === (1)) ? 1 : 0)) && ((((((members.m_IF ?? 0)) & (1))) ? 0 : 1))) ? 1 : 0)) || ((((irqline) === (2)) ? 1 : 0))) ? 1 : 0)) {
                                method_cycles_passed(runtime, 4);
                                if ((((irqline) === (2)) ? 1 : 0)) {
                                    method_cycles_passed(runtime, 2);
                                }
                            }
                        }
                        else {
                            method_cycles_passed(runtime, 4);
                            if (((((((((members.m_enable ?? 0)) & (1))) ? 0 : 1)) && ((((members.m_entering_halt ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                                method_cycles_passed(runtime, 4);
                            }
                        }
                    }
                    if ((((members.m_enable ?? 0)) & (1))) {
                        members.m_enable = ((((members.m_enable) & (-2))) | 0);
                        members.m_IF = ((((members.m_IF) & ((~((1) << (irqline)))))) & 0xff);
                        method_cycles_passed(runtime, 12);
                        members.m_SP = ((((members.m_SP) - (2))) & 0xffff);
                        method_mem_write_word(runtime, (members.m_SP ?? 0), (members.m_PC ?? 0));
                        members.m_PC = ((__add_check_interrupts(runtime, 64, ((irqline) * (8)))) & 0xffff);
                        if (was_halted) {
                            members.m_op = ((method_mem_read_byte(runtime, (members.m_PC ?? 0))) & 0xff);
                        }
                        return;
                    }
                }
            }
        }
    }
    function __add_check_interrupts(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_execute_set_input(runtime, inptnum, state) {
        const members = runtime.members;
        members.m_irq_state = ((state) | 0);
        if (((Number(state) === Number(1)) ? 1 : 0)) {
            members.m_IF = ((((members.m_IF) | (((1) << (inptnum))))) & 0xff);
        }
        else {
            members.m_IF = ((((members.m_IF) & ((~((1) << (inptnum)))))) & 0xff);
        }
    }
    function method_get_speed(runtime) {
        const members = runtime.members;
        return ((((((126) | ((((((members.m_gb_speed ?? 0)) - (1))) << (7))))) | ((members.m_gb_speed_change_pending ?? 0)))) & 0xff);
    }
    function method_set_speed(runtime, speed_request) {
        const members = runtime.members;
        speed_request = ((speed_request) & 0xff);
        members.m_gb_speed_change_pending = ((((speed_request) & (1))) | 0);
    }
    function method_timer_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_timer_cb(runtime, members.m_timer_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_timer_func, "bind"));
    }
    function __deref_timer_cb(runtime, p) {
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
    function method_incdec16_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_incdec16_cb(runtime, members.m_incdec16_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_incdec16_func, "bind"));
    }
    function __deref_incdec16_cb(runtime, p) {
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
    function method_set_halt_bug(runtime, has_halt_bug) {
        const members = runtime.members;
        members.m_has_halt_bug = ((has_halt_bug) ? 1 : 0);
    }
    function method_get_ie(runtime) {
        const members = runtime.members;
        return (((members.m_IE ?? 0)) & 0xff);
    }
    function method_set_ie(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_IE = ((data) & 0xff);
    }
    function method_get_if(runtime) {
        const members = runtime.members;
        return (((members.m_IF ?? 0)) & 0xff);
    }
    function method_set_if(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_IF = ((data) & 0xff);
    }
    function method_dma_cycles_to_burn(runtime, cycles_to_burn) {
        const members = runtime.members;
        cycles_to_burn = ((cycles_to_burn) & 0xffff);
        members.m_dma_cycles_to_burn = ((((members.m_dma_cycles_to_burn) + (cycles_to_burn))) >>> 0);
    }
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((16) >>> 0);
    }
    function method_lr35902_cpu_device__timer_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_lr35902_cpu_device__timer_cb(runtime, members.m_timer_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_timer_func, "bind"));
    }
    function __deref_lr35902_cpu_device__timer_cb(runtime, p) {
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
    function method_lr35902_cpu_device__incdec16_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_lr35902_cpu_device__incdec16_cb(runtime, members.m_incdec16_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_incdec16_func, "bind"));
    }
    function __deref_lr35902_cpu_device__incdec16_cb(runtime, p) {
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
    function method_lr35902_cpu_device__set_halt_bug(runtime, has_halt_bug) {
        const members = runtime.members;
        members.m_has_halt_bug = ((has_halt_bug) ? 1 : 0);
    }
    function method_lr35902_cpu_device__get_ie(runtime) {
        const members = runtime.members;
        return (((members.m_IE ?? 0)) & 0xff);
    }
    function method_lr35902_cpu_device__set_ie(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_IE = ((data) & 0xff);
    }
    function method_lr35902_cpu_device__get_if(runtime) {
        const members = runtime.members;
        return (((members.m_IF ?? 0)) & 0xff);
    }
    function method_lr35902_cpu_device__set_if(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_IF = ((data) & 0xff);
    }
    function method_lr35902_cpu_device__dma_cycles_to_burn(runtime, cycles_to_burn) {
        const members = runtime.members;
        cycles_to_burn = ((cycles_to_burn) & 0xffff);
        members.m_dma_cycles_to_burn = ((((members.m_dma_cycles_to_burn) + (cycles_to_burn))) >>> 0);
    }
    function method_lr35902_cpu_device__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_lr35902_cpu_device__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((16) >>> 0);
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        return (members.m_PC ?? 0);
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        members.m_PC = ((value) & 0xffff);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        return (members.m_SP ?? 0);
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        members.m_SP = ((value) & 0xffff);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        return (members.m_A ?? 0);
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        members.m_A = ((value) & 0xff);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        return (members.m_F ?? 0);
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        members.m_F = ((value) & 0xff);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        return (members.m_B ?? 0);
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        members.m_B = ((value) & 0xff);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        return (members.m_C ?? 0);
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        members.m_C = ((value) & 0xff);
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        return (members.m_D ?? 0);
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        members.m_D = ((value) & 0xff);
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        return (members.m_E ?? 0);
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        members.m_E = ((value) & 0xff);
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        return (members.m_H ?? 0);
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        members.m_H = ((value) & 0xff);
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        return (members.m_L ?? 0);
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        members.m_L = ((value) & 0xff);
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        return (members.m_enable ?? 0);
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        members.m_enable = ((value) | 0);
    }
    function method___state_read_11(runtime) {
        const members = runtime.members;
        return (members.m_IE ?? 0);
    }
    function method___state_write_11(runtime, value) {
        const members = runtime.members;
        members.m_IE = ((value) & 0xff);
    }
    function method___state_read_12(runtime) {
        const members = runtime.members;
        return (members.m_IF ?? 0);
    }
    function method___state_write_12(runtime, value) {
        const members = runtime.members;
        members.m_IF = ((value) & 0xff);
    }
    function method___state_read_13(runtime) {
        const members = runtime.members;
        return (members.m_PC ?? 0);
    }
    function method___state_write_13(runtime, value) {
        const members = runtime.members;
        members.m_PC = ((value) & 0xffff);
    }
    function method___state_read_14(runtime) {
        const members = runtime.members;
        return (members.m_PC ?? 0);
    }
    function method___state_write_14(runtime, value) {
        const members = runtime.members;
        members.m_PC = ((value) & 0xffff);
    }
    function method___state_read_15(runtime) {
        const members = runtime.members;
        return (members.m_F ?? 0);
    }
    function method___state_write_15(runtime, value) {
        const members = runtime.members;
        members.m_F = ((value) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "execute_run": method_execute_run,
        "cycles_passed": method_cycles_passed,
        "mem_read_byte": method_mem_read_byte,
        "mem_write_byte": method_mem_write_byte,
        "mem_write_word": method_mem_write_word,
        "mem_read_word": method_mem_read_word,
        "check_interrupts": method_check_interrupts,
        "execute_set_input": method_execute_set_input,
        "get_speed": method_get_speed,
        "set_speed": method_set_speed,
        "timer_cb": method_timer_cb,
        "incdec16_cb": method_incdec16_cb,
        "set_halt_bug": method_set_halt_bug,
        "get_ie": method_get_ie,
        "set_ie": method_set_ie,
        "get_if": method_get_if,
        "set_if": method_set_if,
        "dma_cycles_to_burn": method_dma_cycles_to_burn,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "lr35902_cpu_device::timer_cb": method_lr35902_cpu_device__timer_cb,
        "lr35902_cpu_device::incdec16_cb": method_lr35902_cpu_device__incdec16_cb,
        "lr35902_cpu_device::set_halt_bug": method_lr35902_cpu_device__set_halt_bug,
        "lr35902_cpu_device::get_ie": method_lr35902_cpu_device__get_ie,
        "lr35902_cpu_device::set_ie": method_lr35902_cpu_device__set_ie,
        "lr35902_cpu_device::get_if": method_lr35902_cpu_device__get_if,
        "lr35902_cpu_device::set_if": method_lr35902_cpu_device__set_if,
        "lr35902_cpu_device::dma_cycles_to_burn": method_lr35902_cpu_device__dma_cycles_to_burn,
        "lr35902_cpu_device::execute_min_cycles": method_lr35902_cpu_device__execute_min_cycles,
        "lr35902_cpu_device::execute_max_cycles": method_lr35902_cpu_device__execute_max_cycles,
        "__state_read_0": method___state_read_0,
        "__state_write_0": method___state_write_0,
        "__state_read_1": method___state_read_1,
        "__state_write_1": method___state_write_1,
        "__state_read_2": method___state_read_2,
        "__state_write_2": method___state_write_2,
        "__state_read_3": method___state_read_3,
        "__state_write_3": method___state_write_3,
        "__state_read_4": method___state_read_4,
        "__state_write_4": method___state_write_4,
        "__state_read_5": method___state_read_5,
        "__state_write_5": method___state_write_5,
        "__state_read_6": method___state_read_6,
        "__state_write_6": method___state_write_6,
        "__state_read_7": method___state_read_7,
        "__state_write_7": method___state_write_7,
        "__state_read_8": method___state_read_8,
        "__state_write_8": method___state_write_8,
        "__state_read_9": method___state_read_9,
        "__state_write_9": method___state_write_9,
        "__state_read_10": method___state_read_10,
        "__state_write_10": method___state_write_10,
        "__state_read_11": method___state_read_11,
        "__state_write_11": method___state_write_11,
        "__state_read_12": method___state_read_12,
        "__state_write_12": method___state_write_12,
        "__state_read_13": method___state_read_13,
        "__state_write_13": method___state_write_13,
        "__state_read_14": method___state_read_14,
        "__state_write_14": method___state_write_14,
        "__state_read_15": method___state_read_15,
        "__state_write_15": method___state_write_15
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_incdec16_func", "m_timer_func"];
export const device = definition;
export default device;
