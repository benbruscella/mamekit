import deviceData from './tms320c10.device.ir.json' with { type: 'json' };
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
    function method_opcodes_7F(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        (__L0 ? __L0("Should never get here!\n") : runtime.macro("fatalerror", "Should never get here!\n"));
    }
    function method_illegal(runtime) {
        const members = runtime.members;
        0;
    }
    function method_abst(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        if ((((((h_m_ACC.d) | 0)) < (0)) ? 1 : 0)) {
            h_m_ACC.d = (((-h_m_ACC.d)) >>> 0);
            if (((((((members.m_STR ?? 0)) & (16384))) && ((((h_m_ACC.d) === (2147483648)) ? 1 : 0))) ? 1 : 0)) {
                h_m_ACC.d = ((((h_m_ACC.d) - (1))) >>> 0);
            }
        }
    }
    function method_add_sh(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        method_getdata(runtime, ((h_m_opcode.b.h) & (15)), 1);
        h_m_ACC.d = ((((h_m_ACC.d) + (h_m_ALU.d))) >>> 0);
        method_CALCULATE_ADD_OVERFLOW(runtime, h_m_ALU.d);
    }
    function method_getdata(runtime, shift, signext) {
        const members = runtime.members;
        shift = ((shift) & 0xff);
        signext = ((signext) & 0xff);
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_AR = members.m_AR ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        if (((h_m_opcode.b.l) & (128))) {
            members.m_memaccess = ((((h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)]) & (255))) & 0xffff);
        }
        else {
            members.m_memaccess = (((((((((members.m_STR ?? 0)) & (1))) << (7))) | (((h_m_opcode.b.l) & (127))))) & 0xffff);
        }
        h_m_ALU.d = (((((__deref_getdata(runtime, members.m_data).read_word?.((members.m_memaccess ?? 0)) ?? 0)) & 0xffff)) >>> 0);
        if (signext) {
            h_m_ALU.d = ((((h_m_ALU.d) << 16 >> 16)) >>> 0);
        }
        h_m_ALU.d = ((((h_m_ALU.d) << (shift))) >>> 0);
        if (((h_m_opcode.b.l) & (128))) {
            method_UPDATE_AR(runtime);
            method_UPDATE_ARP(runtime);
        }
    }
    function __deref_getdata(runtime, p) {
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
    function method_UPDATE_AR(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_AR = members.m_AR ?? 0;
        if (((h_m_opcode.b.l) & (48))) {
            let tmpAR = ((h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)]) & 0xffff);
            if (((h_m_opcode.b.l) & (32))) {
                tmpAR = ((((tmpAR) + (1))) & 0xffff);
            }
            if (((h_m_opcode.b.l) & (16))) {
                tmpAR = ((((tmpAR) - (1))) & 0xffff);
            }
            h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)] = ((((h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)]) & (65024))) | (((tmpAR) & (511))));
        }
    }
    function method_UPDATE_ARP(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        if ((((~h_m_opcode.b.l)) & (8))) {
            if (((h_m_opcode.b.l) & (1))) {
                method_SET_FLAG(runtime, 256);
            }
            else {
                method_CLR(runtime, 256);
            }
        }
    }
    function method_SET_FLAG(runtime, flag) {
        const members = runtime.members;
        flag = ((flag) & 0xffff);
        members.m_STR = ((((members.m_STR) | (flag))) & 0xffff);
        members.m_STR = ((((members.m_STR) | (7934))) & 0xffff);
    }
    function method_CLR(runtime, flag) {
        const members = runtime.members;
        flag = ((flag) & 0xffff);
        members.m_STR = ((((members.m_STR) & ((~flag)))) & 0xffff);
        members.m_STR = ((((members.m_STR) | (7934))) & 0xffff);
    }
    function method_CALCULATE_ADD_OVERFLOW(runtime, addval) {
        const members = runtime.members;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        if (((((((((~((h_m_oldacc.d) ^ (addval)))) & (((h_m_oldacc.d) ^ (h_m_ACC.d))))) | 0)) < (0)) ? 1 : 0)) {
            method_SET_FLAG(runtime, 32768);
            if ((((members.m_STR ?? 0)) & (16384))) {
                h_m_ACC.d = (((((((((h_m_oldacc.d) | 0)) < (0)) ? 1 : 0)) ? (2147483648) : (2147483647))) >>> 0);
            }
        }
    }
    function method_addh(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        method_getdata(runtime, 0, 0);
        h_m_ACC.w.h = ((((h_m_ACC.w.h) + (h_m_ALU.w.l))) & 0xffff);
        if (((((((((~((h_m_oldacc.w.h) ^ (h_m_ALU.w.h)))) & (((h_m_oldacc.w.h) ^ (h_m_ACC.w.h))))) << 16 >> 16)) < (0)) ? 1 : 0)) {
            method_SET_FLAG(runtime, 32768);
            if ((((members.m_STR ?? 0)) & (16384))) {
                h_m_ACC.w.h = (((((((((h_m_oldacc.w.h) << 16 >> 16)) < (0)) ? 1 : 0)) ? (32768) : (32767))) & 0xffff);
            }
        }
    }
    function method_adds(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        method_getdata(runtime, 0, 0);
        h_m_ACC.d = ((((h_m_ACC.d) + (h_m_ALU.d))) >>> 0);
        method_CALCULATE_ADD_OVERFLOW(runtime, h_m_ALU.d);
    }
    function method_and_(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        method_getdata(runtime, 0, 0);
        h_m_ACC.d = ((((h_m_ACC.d) & (h_m_ALU.d))) >>> 0);
    }
    function method_apac(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_Preg = members.m_Preg ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        h_m_ACC.d = ((((h_m_ACC.d) + (h_m_Preg.d))) >>> 0);
        method_CALCULATE_ADD_OVERFLOW(runtime, h_m_Preg.d);
    }
    function method_br(runtime) {
        const members = runtime.members;
        members.m_PC = (((__deref_br(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
    }
    function __deref_br(runtime, p) {
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
    function method_banz(runtime) {
        const members = runtime.members;
        const h_m_AR = members.m_AR ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        if (((h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)]) & (511))) {
            members.m_PC = (((__deref_banz(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
            members.m_icount = ((((members.m_icount) - (method_add_branch_cycle(runtime)))) | 0);
        }
        else {
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        }
        h_m_ALU.w.l = ((h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)]) & 0xffff);
        h_m_ALU.w.l = ((((h_m_ALU.w.l) - (1))) & 0xffff);
        h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)] = ((((h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)]) & (65024))) | (((h_m_ALU.w.l) & (511))));
    }
    function __deref_banz(runtime, p) {
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
    function method_add_branch_cycle(runtime) {
        const members = runtime.members;
        const h_s_opcode_main = members.s_opcode_main ?? 0;
        const h_m_opcode = members.m_opcode ?? 0;
        return ((h_s_opcode_main[h_m_opcode.b.h].cycles) | 0);
    }
    function method_bgez(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        if ((((((h_m_ACC.d) | 0)) >= (0)) ? 1 : 0)) {
            members.m_PC = (((__deref_bgez(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
            members.m_icount = ((((members.m_icount) - (method_add_branch_cycle(runtime)))) | 0);
        }
        else {
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        }
    }
    function __deref_bgez(runtime, p) {
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
    function method_bgz(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        if ((((((h_m_ACC.d) | 0)) > (0)) ? 1 : 0)) {
            members.m_PC = (((__deref_bgz(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
            members.m_icount = ((((members.m_icount) - (method_add_branch_cycle(runtime)))) | 0);
        }
        else {
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        }
    }
    function __deref_bgz(runtime, p) {
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
    function method_bioz(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_bio_in"];
        if (((Number((__L0 ? __L0() : typeof members.m_bio_in === 'function' ? members.m_bio_in() : runtime.invoke("m_bio_in"))) !== Number(0)) ? 1 : 0)) {
            members.m_PC = (((__deref_bioz(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
            members.m_icount = ((((members.m_icount) - (method_add_branch_cycle(runtime)))) | 0);
        }
        else {
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        }
    }
    function __deref_bioz(runtime, p) {
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
    function method_blez(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        if ((((((h_m_ACC.d) | 0)) <= (0)) ? 1 : 0)) {
            members.m_PC = (((__deref_blez(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
            members.m_icount = ((((members.m_icount) - (method_add_branch_cycle(runtime)))) | 0);
        }
        else {
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        }
    }
    function __deref_blez(runtime, p) {
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
    function method_blz(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        if ((((((h_m_ACC.d) | 0)) < (0)) ? 1 : 0)) {
            members.m_PC = (((__deref_blz(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
            members.m_icount = ((((members.m_icount) - (method_add_branch_cycle(runtime)))) | 0);
        }
        else {
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        }
    }
    function __deref_blz(runtime, p) {
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
    function method_bnz(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        if ((((h_m_ACC.d) !== (0)) ? 1 : 0)) {
            members.m_PC = (((__deref_bnz(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
            members.m_icount = ((((members.m_icount) - (method_add_branch_cycle(runtime)))) | 0);
        }
        else {
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        }
    }
    function __deref_bnz(runtime, p) {
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
    function method_bv(runtime) {
        const members = runtime.members;
        if ((((members.m_STR ?? 0)) & (32768))) {
            method_CLR(runtime, 32768);
            members.m_PC = (((__deref_bv(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
            members.m_icount = ((((members.m_icount) - (method_add_branch_cycle(runtime)))) | 0);
        }
        else {
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        }
    }
    function __deref_bv(runtime, p) {
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
    function method_bz(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        if ((((h_m_ACC.d) === (0)) ? 1 : 0)) {
            members.m_PC = (((__deref_bz(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) & 0xffff);
            members.m_icount = ((((members.m_icount) - (method_add_branch_cycle(runtime)))) | 0);
        }
        else {
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        }
    }
    function __deref_bz(runtime, p) {
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
    function method_cala(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_addr_mask = members.m_addr_mask ?? 0;
        method_PUSH_STACK(runtime, (members.m_PC ?? 0));
        members.m_PC = ((((h_m_ACC.w.l) & (h_m_addr_mask))) & 0xffff);
    }
    function method_PUSH_STACK(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        const h_m_STACK = members.m_STACK ?? 0;
        const h_m_addr_mask = members.m_addr_mask ?? 0;
        h_m_STACK[0] = h_m_STACK[1];
        h_m_STACK[1] = h_m_STACK[2];
        h_m_STACK[2] = h_m_STACK[3];
        h_m_STACK[3] = ((data) & (h_m_addr_mask));
    }
    function method_call(runtime) {
        const members = runtime.members;
        members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
        method_PUSH_STACK(runtime, (members.m_PC ?? 0));
        members.m_PC = (((__deref_call(runtime, members.m_cache).read_word?.((((members.m_PC ?? 0)) - (1))) ?? 0)) & 0xffff);
    }
    function __deref_call(runtime, p) {
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
    function method_dint(runtime) {
        const members = runtime.members;
        method_SET_FLAG(runtime, 8192);
    }
    function method_dmov(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        method_getdata(runtime, 0, 0);
        (__deref_dmov(runtime, members.m_data).write_word?.((((members.m_memaccess ?? 0)) + (1)), h_m_ALU.w.l) ?? 0);
    }
    function __deref_dmov(runtime, p) {
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
    function method_eint(runtime) {
        const members = runtime.members;
        method_CLR(runtime, 8192);
    }
    function method_in_p(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        h_m_ALU.w.l = (((__deref_in_p(runtime, members.m_io).read_word?.(((h_m_opcode.b.h) & (7))) ?? 0)) & 0xffff);
        method_putdata(runtime, h_m_ALU.w.l);
    }
    function __deref_in_p(runtime, p) {
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
    function method_putdata(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_AR = members.m_AR ?? 0;
        if (((h_m_opcode.b.l) & (128))) {
            members.m_memaccess = ((((h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)]) & (255))) & 0xffff);
        }
        else {
            members.m_memaccess = (((((((((members.m_STR ?? 0)) & (1))) << (7))) | (((h_m_opcode.b.l) & (127))))) & 0xffff);
        }
        if (((h_m_opcode.b.l) & (128))) {
            method_UPDATE_AR(runtime);
            method_UPDATE_ARP(runtime);
        }
        (__deref_putdata(runtime, members.m_data).write_word?.((members.m_memaccess ?? 0), data) ?? 0);
    }
    function __deref_putdata(runtime, p) {
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
    function method_lac_sh(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        method_getdata(runtime, ((h_m_opcode.b.h) & (15)), 1);
        h_m_ACC.d = ((h_m_ALU.d) >>> 0);
    }
    function method_lack(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        h_m_ACC.d = ((h_m_opcode.b.l) >>> 0);
    }
    function method_lar_ar0(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_AR = members.m_AR ?? 0;
        method_getdata(runtime, 0, 0);
        h_m_AR[0] = h_m_ALU.w.l;
    }
    function method_lar_ar1(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_AR = members.m_AR ?? 0;
        method_getdata(runtime, 0, 0);
        h_m_AR[1] = h_m_ALU.w.l;
    }
    function method_lark_ar0(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_AR = members.m_AR ?? 0;
        h_m_AR[0] = h_m_opcode.b.l;
    }
    function method_lark_ar1(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_AR = members.m_AR ?? 0;
        h_m_AR[1] = h_m_opcode.b.l;
    }
    function method_larp_mar(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        if (((h_m_opcode.b.l) & (128))) {
            method_UPDATE_AR(runtime);
            method_UPDATE_ARP(runtime);
        }
    }
    function method_ldp(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        method_getdata(runtime, 0, 0);
        if (((h_m_ALU.d) & (1))) {
            method_SET_FLAG(runtime, 1);
        }
        else {
            method_CLR(runtime, 1);
        }
    }
    function method_ldpk(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        if (((h_m_opcode.b.l) & (1))) {
            method_SET_FLAG(runtime, 1);
        }
        else {
            method_CLR(runtime, 1);
        }
    }
    function method_lst(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        if (((h_m_opcode.b.l) & (128))) {
            h_m_opcode.b.l = ((((h_m_opcode.b.l) | (8))) & 0xff);
        }
        method_getdata(runtime, 0, 0);
        h_m_ALU.w.l = ((((h_m_ALU.w.l) & (-8193))) & 0xffff);
        members.m_STR = ((((members.m_STR) & (8192))) & 0xffff);
        members.m_STR = ((((members.m_STR) | (h_m_ALU.w.l))) & 0xffff);
        members.m_STR = ((((members.m_STR) | (7934))) & 0xffff);
    }
    function method_lt(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        method_getdata(runtime, 0, 0);
        members.m_Treg = ((h_m_ALU.w.l) & 0xffff);
    }
    function method_lta(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_Preg = members.m_Preg ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        method_getdata(runtime, 0, 0);
        members.m_Treg = ((h_m_ALU.w.l) & 0xffff);
        h_m_ACC.d = ((((h_m_ACC.d) + (h_m_Preg.d))) >>> 0);
        method_CALCULATE_ADD_OVERFLOW(runtime, h_m_Preg.d);
    }
    function method_ltd(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_Preg = members.m_Preg ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        method_getdata(runtime, 0, 0);
        members.m_Treg = ((h_m_ALU.w.l) & 0xffff);
        (__deref_ltd(runtime, members.m_data).write_word?.((((members.m_memaccess ?? 0)) + (1)), h_m_ALU.w.l) ?? 0);
        h_m_ACC.d = ((((h_m_ACC.d) + (h_m_Preg.d))) >>> 0);
        method_CALCULATE_ADD_OVERFLOW(runtime, h_m_Preg.d);
    }
    function __deref_ltd(runtime, p) {
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
    function method_mpy(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_Preg = members.m_Preg ?? 0;
        method_getdata(runtime, 0, 0);
        h_m_Preg.d = ((((((h_m_ALU.w.l) << 16 >> 16)) * ((((members.m_Treg ?? 0)) << 16 >> 16)))) >>> 0);
        if ((((h_m_Preg.d) === (1073741824)) ? 1 : 0)) {
            h_m_Preg.d = ((3221225472) >>> 0);
        }
    }
    function method_mpyk(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_Preg = members.m_Preg ?? 0;
        h_m_Preg.d = (((((((members.m_Treg ?? 0)) << 16 >> 16)) * (runtime.shiftRight(((((h_m_opcode.w.l) << (3))) << 16 >> 16), 3)))) >>> 0);
    }
    function method_nop(runtime) {
        const members = runtime.members;
    }
    function method_or_(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        method_getdata(runtime, 0, 0);
        h_m_ACC.w.l = ((((h_m_ACC.w.l) | (h_m_ALU.w.l))) & 0xffff);
    }
    function method_out_p(runtime) {
        const members = runtime.members;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        method_getdata(runtime, 0, 0);
        (__deref_out_p(runtime, members.m_io).write_word?.(((h_m_opcode.b.h) & (7)), h_m_ALU.w.l) ?? 0);
    }
    function __deref_out_p(runtime, p) {
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
    function method_pac(runtime) {
        const members = runtime.members;
        const h_m_Preg = members.m_Preg ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        h_m_ACC.d = ((h_m_Preg.d) >>> 0);
    }
    function method_pop(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        h_m_ACC.w.l = ((method_POP_STACK(runtime)) & 0xffff);
        h_m_ACC.w.h = ((0) & 0xffff);
    }
    function method_POP_STACK(runtime) {
        const members = runtime.members;
        const h_m_STACK = members.m_STACK ?? 0;
        const h_m_addr_mask = members.m_addr_mask ?? 0;
        let data = ((h_m_STACK[3]) & 0xffff);
        h_m_STACK[3] = h_m_STACK[2];
        h_m_STACK[2] = h_m_STACK[1];
        h_m_STACK[1] = h_m_STACK[0];
        return ((((data) & (h_m_addr_mask))) & 0xffff);
    }
    function method_push(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        method_PUSH_STACK(runtime, h_m_ACC.w.l);
    }
    function method_ret(runtime) {
        const members = runtime.members;
        members.m_PC = ((method_POP_STACK(runtime)) & 0xffff);
    }
    function method_rovm(runtime) {
        const members = runtime.members;
        method_CLR(runtime, 16384);
    }
    function method_sach_sh(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        h_m_ALU.d = ((((h_m_ACC.d) << (((h_m_opcode.b.h) & (7))))) >>> 0);
        method_putdata(runtime, h_m_ALU.w.h);
    }
    function method_sacl(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        method_putdata(runtime, h_m_ACC.w.l);
    }
    function method_sar_ar0(runtime) {
        const members = runtime.members;
        method_putdata_sar(runtime, 0);
    }
    function method_putdata_sar(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_AR = members.m_AR ?? 0;
        if (((h_m_opcode.b.l) & (128))) {
            members.m_memaccess = ((((h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)]) & (255))) & 0xffff);
        }
        else {
            members.m_memaccess = (((((((((members.m_STR ?? 0)) & (1))) << (7))) | (((h_m_opcode.b.l) & (127))))) & 0xffff);
        }
        if (((h_m_opcode.b.l) & (128))) {
            method_UPDATE_AR(runtime);
            method_UPDATE_ARP(runtime);
        }
        (__deref_putdata_sar(runtime, members.m_data).write_word?.((members.m_memaccess ?? 0), h_m_AR[data]) ?? 0);
    }
    function __deref_putdata_sar(runtime, p) {
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
    function method_sar_ar1(runtime) {
        const members = runtime.members;
        method_putdata_sar(runtime, 1);
    }
    function method_sovm(runtime) {
        const members = runtime.members;
        method_SET_FLAG(runtime, 16384);
    }
    function method_spac(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_Preg = members.m_Preg ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        h_m_ACC.d = ((((h_m_ACC.d) - (h_m_Preg.d))) >>> 0);
        method_CALCULATE_SUB_OVERFLOW(runtime, h_m_Preg.d);
    }
    function method_CALCULATE_SUB_OVERFLOW(runtime, subval) {
        const members = runtime.members;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        if ((((((((((h_m_oldacc.d) ^ (subval))) & (((h_m_oldacc.d) ^ (h_m_ACC.d))))) | 0)) < (0)) ? 1 : 0)) {
            method_SET_FLAG(runtime, 32768);
            if ((((members.m_STR ?? 0)) & (16384))) {
                h_m_ACC.d = (((((((((h_m_oldacc.d) | 0)) < (0)) ? 1 : 0)) ? (2147483648) : (2147483647))) >>> 0);
            }
        }
    }
    function method_sst(runtime) {
        const members = runtime.members;
        method_putdata_sst(runtime, (members.m_STR ?? 0));
    }
    function method_putdata_sst(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_AR = members.m_AR ?? 0;
        if (((h_m_opcode.b.l) & (128))) {
            members.m_memaccess = ((((h_m_AR[runtime.shiftRight((((members.m_STR ?? 0)) & (256)), 8)]) & (255))) & 0xffff);
        }
        else {
            members.m_memaccess = ((((128) | (h_m_opcode.b.l))) & 0xffff);
        }
        if (((h_m_opcode.b.l) & (128))) {
            method_UPDATE_AR(runtime);
        }
        (__deref_putdata_sst(runtime, members.m_data).write_word?.((members.m_memaccess ?? 0), data) ?? 0);
    }
    function __deref_putdata_sst(runtime, p) {
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
    function method_sub_sh(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_opcode = members.m_opcode ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        method_getdata(runtime, ((h_m_opcode.b.h) & (15)), 1);
        h_m_ACC.d = ((((h_m_ACC.d) - (h_m_ALU.d))) >>> 0);
        method_CALCULATE_SUB_OVERFLOW(runtime, h_m_ALU.d);
    }
    function method_subc(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        method_getdata(runtime, 15, 0);
        h_m_ALU.d = ((((((h_m_ACC.d) | 0)) - (h_m_ALU.d))) >>> 0);
        if ((((((((((h_m_oldacc.d) ^ (h_m_ALU.d))) & (((h_m_oldacc.d) ^ (h_m_ACC.d))))) | 0)) < (0)) ? 1 : 0)) {
            method_SET_FLAG(runtime, 32768);
        }
        if ((((((h_m_ALU.d) | 0)) >= (0)) ? 1 : 0)) {
            h_m_ACC.d = ((__add_subc(runtime, ((h_m_ALU.d) << (1)), 1)) >>> 0);
        }
        else {
            h_m_ACC.d = ((((h_m_ACC.d) << (1))) >>> 0);
        }
    }
    function __add_subc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_subh(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        method_getdata(runtime, 16, 0);
        h_m_ACC.d = ((((h_m_ACC.d) - (h_m_ALU.d))) >>> 0);
        method_CALCULATE_SUB_OVERFLOW(runtime, h_m_ALU.d);
    }
    function method_subs(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_oldacc = members.m_oldacc ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        h_m_oldacc.d = ((h_m_ACC.d) >>> 0);
        method_getdata(runtime, 0, 0);
        h_m_ACC.d = ((((h_m_ACC.d) - (h_m_ALU.d))) >>> 0);
        method_CALCULATE_SUB_OVERFLOW(runtime, h_m_ALU.d);
    }
    function method_tblr(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_addr_mask = members.m_addr_mask ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_STACK = members.m_STACK ?? 0;
        h_m_ALU.d = (((__deref_tblr(runtime, members.m_program).read_word?.(((h_m_ACC.w.l) & (h_m_addr_mask))) ?? 0)) >>> 0);
        method_putdata(runtime, h_m_ALU.w.l);
        h_m_STACK[0] = h_m_STACK[1];
    }
    function __deref_tblr(runtime, p) {
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
    function method_tblw(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        const h_m_addr_mask = members.m_addr_mask ?? 0;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_STACK = members.m_STACK ?? 0;
        method_getdata(runtime, 0, 0);
        (__deref_tblw(runtime, members.m_program).write_word?.(((h_m_ACC.w.l) & (h_m_addr_mask)), h_m_ALU.w.l) ?? 0);
        h_m_STACK[0] = h_m_STACK[1];
    }
    function __deref_tblw(runtime, p) {
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
    function method_xor_(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        method_getdata(runtime, 0, 0);
        h_m_ACC.w.l = ((((h_m_ACC.w.l) ^ (h_m_ALU.w.l))) & 0xffff);
    }
    function method_zac(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        h_m_ACC.d = ((0) >>> 0);
    }
    function method_zalh(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        method_getdata(runtime, 0, 0);
        h_m_ACC.w.h = ((h_m_ALU.w.l) & 0xffff);
        h_m_ACC.w.l = ((0) & 0xffff);
    }
    function method_zals(runtime) {
        const members = runtime.members;
        const h_m_ALU = members.m_ALU ?? 0;
        const h_m_ACC = members.m_ACC ?? 0;
        method_getdata(runtime, 0, 0);
        h_m_ACC.w.l = ((h_m_ALU.w.l) & 0xffff);
        h_m_ACC.w.h = ((0) & 0xffff);
    }
    function method_execute_set_input(runtime, irqline, state) {
        const members = runtime.members;
        if (((Number(state) === Number(1)) ? 1 : 0)) {
            members.m_INTF = ((((members.m_INTF) | (2147483648))) | 0);
        }
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["CALL_METHOD"];
        const h_m_opcode = members.m_opcode ?? 0;
        const h_s_opcode_main = members.s_opcode_main ?? 0;
        const h_s_opcode_7F = members.s_opcode_7F ?? 0;
        do {
            if ((members.m_INTF ?? 0)) {
                if ((((((((((h_m_opcode.b.h) !== (109)) ? 1 : 0)) && (((Number(((h_m_opcode.b.h) & (224))) !== Number(128)) ? 1 : 0))) ? 1 : 0)) && ((((h_m_opcode.w.l) !== (32642)) ? 1 : 0))) ? 1 : 0)) {
                    members.m_icount = ((((members.m_icount) - (method_Ext_IRQ(runtime)))) | 0);
                }
            }
            members.m_PREVPC = (((members.m_PC ?? 0)) & 0xffff);
            /* debugger_instruction_hook: no effect */
            h_m_opcode.d = (((__deref_execute_run(runtime, members.m_cache).read_word?.((members.m_PC ?? 0)) ?? 0)) >>> 0);
            members.m_PC = ((((members.m_PC) + (1))) & 0xffff);
            if ((((h_m_opcode.b.h) !== (127)) ? 1 : 0)) {
                members.m_icount = ((((members.m_icount) - (h_s_opcode_main[h_m_opcode.b.h].cycles))) | 0);
                ((__method) => __method ? __method(runtime) : (__L0 ? __L0(h_s_opcode_main[h_m_opcode.b.h].function) : runtime.macro("CALL_METHOD", h_s_opcode_main[h_m_opcode.b.h].function)))(__methodTable[h_s_opcode_main[h_m_opcode.b.h].function]);
            }
            else {
                members.m_icount = ((((members.m_icount) - (h_s_opcode_7F[((h_m_opcode.b.l) & (31))].cycles))) | 0);
                ((__method) => __method ? __method(runtime) : (__L0 ? __L0(h_s_opcode_7F[((h_m_opcode.b.l) & (31))].function) : runtime.macro("CALL_METHOD", h_s_opcode_7F[((h_m_opcode.b.l) & (31))].function)))(__methodTable[h_s_opcode_7F[((h_m_opcode.b.l) & (31))].function]);
            }
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function __deref_execute_run(runtime, p) {
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
    function method_Ext_IRQ(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["standard_irq_callback"];
        const h_s_opcode_7F = members.s_opcode_7F ?? 0;
        if (((Number((((members.m_STR ?? 0)) & (8192))) === Number(0)) ? 1 : 0)) {
            (__L0 ? __L0(0, (members.m_PC ?? 0)) : runtime.macro("standard_irq_callback", 0, (members.m_PC ?? 0)));
            members.m_INTF = ((0) | 0);
            method_SET_FLAG(runtime, 8192);
            method_PUSH_STACK(runtime, (members.m_PC ?? 0));
            members.m_PC = ((2) & 0xffff);
            return ((((h_s_opcode_7F[28].cycles) + (h_s_opcode_7F[1].cycles))) | 0);
        }
        return ((0) | 0);
    }
    function method_bio(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_bio(runtime, members.m_bio_in), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_bio_in, "bind"));
    }
    function __deref_bio(runtime, p) {
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
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((3) >>> 0);
    }
    function method_execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 4), 1), 4);
    }
    function method_execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 4);
    }
    function method_tms320c1x_device_base__bio(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms320c1x_device_base__bio(runtime, members.m_bio_in), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_bio_in, "bind"));
    }
    function __deref_tms320c1x_device_base__bio(runtime, p) {
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
    function method_tms320c1x_device_base__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_tms320c1x_device_base__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((3) >>> 0);
    }
    function method_tms320c1x_device_base__execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 4), 1), 4);
    }
    function method_tms320c1x_device_base__execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 4);
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
        return (members.m_STR ?? 0);
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        members.m_STR = ((value) & 0xffff);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        return h_m_ACC.d;
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        const h_m_ACC = members.m_ACC ?? 0;
        h_m_ACC.d = ((value) >>> 0);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        const h_m_Preg = members.m_Preg ?? 0;
        return h_m_Preg.d;
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        const h_m_Preg = members.m_Preg ?? 0;
        h_m_Preg.d = ((value) >>> 0);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        return (members.m_Treg ?? 0);
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        members.m_Treg = ((value) & 0xffff);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        const h_m_AR = members.m_AR ?? 0;
        return h_m_AR[0];
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        const h_m_AR = members.m_AR ?? 0;
        h_m_AR[0] = value;
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        const h_m_AR = members.m_AR ?? 0;
        return h_m_AR[1];
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        const h_m_AR = members.m_AR ?? 0;
        h_m_AR[1] = value;
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        const h_m_STACK = members.m_STACK ?? 0;
        return h_m_STACK[0];
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        const h_m_STACK = members.m_STACK ?? 0;
        h_m_STACK[0] = value;
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        const h_m_STACK = members.m_STACK ?? 0;
        return h_m_STACK[1];
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        const h_m_STACK = members.m_STACK ?? 0;
        h_m_STACK[1] = value;
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        const h_m_STACK = members.m_STACK ?? 0;
        return h_m_STACK[2];
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        const h_m_STACK = members.m_STACK ?? 0;
        h_m_STACK[2] = value;
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        const h_m_STACK = members.m_STACK ?? 0;
        return h_m_STACK[3];
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        const h_m_STACK = members.m_STACK ?? 0;
        h_m_STACK[3] = value;
    }
    function method___state_read_11(runtime) {
        const members = runtime.members;
        return (members.m_PC ?? 0);
    }
    function method___state_write_11(runtime, value) {
        const members = runtime.members;
        members.m_PC = ((value) & 0xffff);
    }
    function method___state_read_12(runtime) {
        const members = runtime.members;
        return (members.m_PREVPC ?? 0);
    }
    function method___state_write_12(runtime, value) {
        const members = runtime.members;
        members.m_PREVPC = ((value) & 0xffff);
    }
    function method___state_read_13(runtime) {
        const members = runtime.members;
        return (members.m_STR ?? 0);
    }
    function method___state_write_13(runtime, value) {
        const members = runtime.members;
        members.m_STR = ((value) & 0xffff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "opcodes_7F": method_opcodes_7F,
        "illegal": method_illegal,
        "abst": method_abst,
        "add_sh": method_add_sh,
        "getdata": method_getdata,
        "UPDATE_AR": method_UPDATE_AR,
        "UPDATE_ARP": method_UPDATE_ARP,
        "SET_FLAG": method_SET_FLAG,
        "CLR": method_CLR,
        "CALCULATE_ADD_OVERFLOW": method_CALCULATE_ADD_OVERFLOW,
        "addh": method_addh,
        "adds": method_adds,
        "and_": method_and_,
        "apac": method_apac,
        "br": method_br,
        "banz": method_banz,
        "add_branch_cycle": method_add_branch_cycle,
        "bgez": method_bgez,
        "bgz": method_bgz,
        "bioz": method_bioz,
        "blez": method_blez,
        "blz": method_blz,
        "bnz": method_bnz,
        "bv": method_bv,
        "bz": method_bz,
        "cala": method_cala,
        "PUSH_STACK": method_PUSH_STACK,
        "call": method_call,
        "dint": method_dint,
        "dmov": method_dmov,
        "eint": method_eint,
        "in_p": method_in_p,
        "putdata": method_putdata,
        "lac_sh": method_lac_sh,
        "lack": method_lack,
        "lar_ar0": method_lar_ar0,
        "lar_ar1": method_lar_ar1,
        "lark_ar0": method_lark_ar0,
        "lark_ar1": method_lark_ar1,
        "larp_mar": method_larp_mar,
        "ldp": method_ldp,
        "ldpk": method_ldpk,
        "lst": method_lst,
        "lt": method_lt,
        "lta": method_lta,
        "ltd": method_ltd,
        "mpy": method_mpy,
        "mpyk": method_mpyk,
        "nop": method_nop,
        "or_": method_or_,
        "out_p": method_out_p,
        "pac": method_pac,
        "pop": method_pop,
        "POP_STACK": method_POP_STACK,
        "push": method_push,
        "ret": method_ret,
        "rovm": method_rovm,
        "sach_sh": method_sach_sh,
        "sacl": method_sacl,
        "sar_ar0": method_sar_ar0,
        "putdata_sar": method_putdata_sar,
        "sar_ar1": method_sar_ar1,
        "sovm": method_sovm,
        "spac": method_spac,
        "CALCULATE_SUB_OVERFLOW": method_CALCULATE_SUB_OVERFLOW,
        "sst": method_sst,
        "putdata_sst": method_putdata_sst,
        "sub_sh": method_sub_sh,
        "subc": method_subc,
        "subh": method_subh,
        "subs": method_subs,
        "tblr": method_tblr,
        "tblw": method_tblw,
        "xor_": method_xor_,
        "zac": method_zac,
        "zalh": method_zalh,
        "zals": method_zals,
        "execute_set_input": method_execute_set_input,
        "execute_run": method_execute_run,
        "Ext_IRQ": method_Ext_IRQ,
        "bio": method_bio,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "execute_clocks_to_cycles": method_execute_clocks_to_cycles,
        "execute_cycles_to_clocks": method_execute_cycles_to_clocks,
        "tms320c1x_device_base::bio": method_tms320c1x_device_base__bio,
        "tms320c1x_device_base::execute_min_cycles": method_tms320c1x_device_base__execute_min_cycles,
        "tms320c1x_device_base::execute_max_cycles": method_tms320c1x_device_base__execute_max_cycles,
        "tms320c1x_device_base::execute_clocks_to_cycles": method_tms320c1x_device_base__execute_clocks_to_cycles,
        "tms320c1x_device_base::execute_cycles_to_clocks": method_tms320c1x_device_base__execute_cycles_to_clocks,
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
        "__state_write_13": method___state_write_13
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["CALL_METHOD", "fatalerror", "m_bio_in", "standard_irq_callback"];
export const device = definition;
export default device;
