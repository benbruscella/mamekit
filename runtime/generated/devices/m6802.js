import deviceData from './m6802.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
    const __mame_table_1 = [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8];
    function method_illegl1(runtime) {
        const members = runtime.members;
        0;
    }
    function method_illegl2(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        0;
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
    }
    function method_illegl3(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        0;
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
    }
    function method_nop(runtime) {
        const members = runtime.members;
    }
    function method_tap(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        members.m_cc = ((h_m_d.b.h) & 0xff);
        method_execute_one(runtime);
        method_check_irq_lines(runtime);
    }
    function method_execute_one(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["CALL_METHOD"];
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ppc = members.m_ppc ?? 0;
        const h_m_insn = members.m_insn ?? 0;
        const h_m_cycles = members.m_cycles ?? 0;
        (h_m_ppc.d = (h_m_pc).d);
        /* debugger_instruction_hook: no effect */
        let ireg = (((__deref_execute_one(runtime, members.m_copcodes).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        ((__method) => __method ? __method(runtime) : (__L0 ? __L0(runtime.readIndex(h_m_insn, ireg)) : runtime.macro("CALL_METHOD", runtime.readIndex(h_m_insn, ireg))))((cppMethodAt(h_m_insn, ireg) ?? __methodTable[runtime.readIndex(h_m_insn, ireg)]));
        method_increment_counter(runtime, runtime.readIndex(h_m_cycles, ireg));
    }
    function __deref_execute_one(runtime, p) {
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
    function method_increment_counter(runtime, amount) {
        const members = runtime.members;
        members.m_icount = ((((members.m_icount) - (amount))) | 0);
    }
    function method_check_irq_lines(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["standard_irq_callback"];
        const h_m_pc = members.m_pc ?? 0;
        if ((members.m_nmi_pending ?? 0)) {
            members.m_wai_state = ((((members.m_wai_state) & (-17))) & 0xff);
            members.m_nmi_pending = ((0) & 0xff);
            method_enter_interrupt(runtime, "NMI", 65532);
        }
        else {
            if (method_check_irq1_enabled(runtime)) {
                members.m_wai_state = ((((members.m_wai_state) & (-17))) & 0xff);
                if ((((((members.m_cc ?? 0)) & (16))) ? 0 : 1)) {
                    (__L0 ? __L0(0, h_m_pc.w.l) : runtime.macro("standard_irq_callback", 0, h_m_pc.w.l));
                    method_enter_interrupt(runtime, "IRQ1", 65528);
                }
            }
            else {
                method_check_irq2(runtime);
            }
        }
    }
    function method_enter_interrupt(runtime, message, irq_vector) {
        const members = runtime.members;
        irq_vector = ((irq_vector) & 0xffff);
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_d = members.m_d ?? 0;
        let cycles_to_eat = ((0) | 0);
        0;
        if ((((members.m_wai_state ?? 0)) & (8))) {
            cycles_to_eat = ((4) | 0);
            members.m_wai_state = ((((members.m_wai_state) & (-9))) & 0xff);
        }
        else {
            (__deref_enter_interrupt(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.l) ?? 0);
            h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
            (__deref_enter_interrupt(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.h) ?? 0);
            h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
            (__deref_enter_interrupt(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_x.b.l) ?? 0);
            h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
            (__deref_enter_interrupt(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_x.b.h) ?? 0);
            h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
            (__deref_enter_interrupt(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_d.b.h) ?? 0);
            h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
            (__deref_enter_interrupt(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_d.b.l) ?? 0);
            h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
            (__deref_enter_interrupt(runtime, members.m_program).write_byte?.(h_m_s.d, (members.m_cc ?? 0)) ?? 0);
            h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
            cycles_to_eat = ((12) | 0);
        }
        members.m_cc = ((((members.m_cc) | (16))) & 0xff);
        h_m_pc.d = ((method_RM16(runtime, irq_vector)) >>> 0);
        method_increment_counter(runtime, cycles_to_eat);
    }
    function __deref_enter_interrupt(runtime, p) {
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
    function method_RM16(runtime, Addr) {
        const members = runtime.members;
        let result = (((((__deref_RM16(runtime, members.m_program).read_byte?.(Addr) ?? 0)) << (8))) >>> 0);
        return ((((result) | ((__deref_RM16(runtime, members.m_program).read_byte?.(((((Addr) + (1))) & (65535))) ?? 0)))) >>> 0);
    }
    function __deref_RM16(runtime, p) {
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
    function method_check_irq1_enabled(runtime) {
        const members = runtime.members;
        const h_m_irq_state = members.m_irq_state ?? 0;
        return ((Number(h_m_irq_state[0]) !== Number(0)) ? 1 : 0);
    }
    function method_check_irq2(runtime) {
        const members = runtime.members;
    }
    function method_tpa(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.h = (((members.m_cc ?? 0)) & 0xff);
    }
    function method_inx(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        h_m_x.w.l = ((((h_m_x.w.l) + (1))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (251))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function method_dex(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        h_m_x.w.l = ((((h_m_x.w.l) - (1))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (251))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function method_clv(runtime) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) & (253))) & 0xff);
    }
    function method_sev(runtime) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) | (2))) & 0xff);
    }
    function method_clc(runtime) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) & (254))) & 0xff);
    }
    function method_sec(runtime) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
    }
    function method_cli(runtime) {
        const members = runtime.members;
        let i = (((((members.m_cc ?? 0)) & (16))) & 0xff);
        members.m_cc = ((((members.m_cc) & (-17))) & 0xff);
        if (i) {
            method_execute_one(runtime);
        }
        method_check_irq_lines(runtime);
    }
    function method_sei(runtime) {
        const members = runtime.members;
        members.m_cc = ((((members.m_cc) | (16))) & 0xff);
    }
    function method_sba(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        t = ((((h_m_d.b.h) - (h_m_d.b.l))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (128)), 4)))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (h_m_d.b.l))) ^ (t))) ^ (((t) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((t) & 0xff);
    }
    function method_cba(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        t = ((((h_m_d.b.h) - (h_m_d.b.l))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (128)), 4)))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (h_m_d.b.l))) ^ (t))) ^ (((t) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (256)), 8)))) & 0xff);
    }
    function method_tab(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.l = ((h_m_d.b.h) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function method_tba(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.h = ((h_m_d.b.l) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function method_daa(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let msn = ((0) & 0xff);
        let lsn = ((0) & 0xff);
        let t = ((0) & 0xffff);
        let cf = ((0) & 0xffff);
        msn = ((((h_m_d.b.h) & (240))) & 0xff);
        lsn = ((((h_m_d.b.h) & (15))) & 0xff);
        if (((((((lsn) > (9)) ? 1 : 0)) || ((((members.m_cc ?? 0)) & (32)))) ? 1 : 0)) {
            cf = ((((cf) | (6))) & 0xffff);
        }
        if (((((((msn) > (128)) ? 1 : 0)) && ((((lsn) > (9)) ? 1 : 0))) ? 1 : 0)) {
            cf = ((((cf) | (96))) & 0xffff);
        }
        if (((((((msn) > (144)) ? 1 : 0)) || ((((members.m_cc ?? 0)) & (1)))) ? 1 : 0)) {
            cf = ((((cf) | (96))) & 0xffff);
        }
        t = ((((cf) + (h_m_d.b.h))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((t) & 0xff)) & (128)), 4)))) & 0xff);
        if (((((((t) & 0xff)) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((t) & 0xff);
    }
    function method_aba(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        t = ((((h_m_d.b.h) + (h_m_d.b.l))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (128)), 4)))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (h_m_d.b.l))) ^ (t))) ^ (((t) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.h) ^ (h_m_d.b.l))) ^ (t))) & (16))) << (1))))) & 0xff);
        h_m_d.b.h = ((t) & 0xff);
    }
    function method_bra(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bra(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if (1) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bra(runtime, p) {
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
    function method_brn(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_brn(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
    }
    function __deref_brn(runtime, p) {
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
    function method_bhi(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bhi(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((((members.m_cc ?? 0)) & (5))) ? 0 : 1)) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bhi(runtime, p) {
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
    function method_bls(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bls(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((members.m_cc ?? 0)) & (5))) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bls(runtime, p) {
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
    function method_bcc(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bcc(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((((members.m_cc ?? 0)) & (1))) ? 0 : 1)) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bcc(runtime, p) {
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
    function method_bcs(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bcs(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((members.m_cc ?? 0)) & (1))) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bcs(runtime, p) {
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
    function method_bne(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bne(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((((members.m_cc ?? 0)) & (4))) ? 0 : 1)) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bne(runtime, p) {
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
    function method_beq(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_beq(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((members.m_cc ?? 0)) & (4))) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_beq(runtime, p) {
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
    function method_bvc(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bvc(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((((members.m_cc ?? 0)) & (2))) ? 0 : 1)) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bvc(runtime, p) {
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
    function method_bvs(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bvs(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((members.m_cc ?? 0)) & (2))) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bvs(runtime, p) {
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
    function method_bpl(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bpl(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((((members.m_cc ?? 0)) & (8))) ? 0 : 1)) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bpl(runtime, p) {
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
    function method_bmi(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bmi(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((members.m_cc ?? 0)) & (8))) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bmi(runtime, p) {
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
    function method_bge(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bge(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (2))) << (2))))) ? 0 : 1)) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bge(runtime, p) {
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
    function method_blt(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_blt(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (2))) << (2))))) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_blt(runtime, p) {
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
    function method_bgt(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bgt(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if (((((((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (2))) << (2))))) || ((((members.m_cc ?? 0)) & (4)))) ? 1 : 0)) ? 0 : 1)) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_bgt(runtime, p) {
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
    function method_ble(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_ble(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        if (((((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (2))) << (2))))) || ((((members.m_cc ?? 0)) & (4)))) ? 1 : 0)) {
            h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
        }
    }
    function __deref_ble(runtime, p) {
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
    function method_tsx(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_x = members.m_x ?? 0;
        h_m_x.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
    }
    function method_ins(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
    }
    function method_pula(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_d.b.h = (((__deref_pula(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)) & 0xff);
    }
    function __deref_pula(runtime, p) {
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
    function method_pulb(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_d.b.l = (((__deref_pulb(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)) & 0xff);
    }
    function __deref_pulb(runtime, p) {
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
    function method_des(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
    }
    function method_txs(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_s = members.m_s ?? 0;
        h_m_s.w.l = ((((h_m_x.w.l) - (1))) & 0xffff);
    }
    function method_psha(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_d = members.m_d ?? 0;
        (__deref_psha(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_d.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
    }
    function __deref_psha(runtime, p) {
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
    function method_pshb(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_d = members.m_d ?? 0;
        (__deref_pshb(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_d.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
    }
    function __deref_pshb(runtime, p) {
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
    function method_rts(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_pc.d = (((((__deref_rts(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)) << (8))) >>> 0);
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_pc.d = ((((h_m_pc.d) | ((__deref_rts(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)))) >>> 0);
    }
    function __deref_rts(runtime, p) {
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
    function method_rti(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_d = members.m_d ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        members.m_cc = (((__deref_rti(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)) & 0xff);
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_d.b.l = (((__deref_rti(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)) & 0xff);
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_d.b.h = (((__deref_rti(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)) & 0xff);
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_x.d = (((((__deref_rti(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)) << (8))) >>> 0);
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_x.d = ((((h_m_x.d) | ((__deref_rti(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)))) >>> 0);
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_pc.d = (((((__deref_rti(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)) << (8))) >>> 0);
        h_m_s.w.l = ((((h_m_s.w.l) + (1))) & 0xffff);
        h_m_pc.d = ((((h_m_pc.d) | ((__deref_rti(runtime, members.m_program).read_byte?.(h_m_s.d) ?? 0)))) >>> 0);
        method_check_irq_lines(runtime);
    }
    function __deref_rti(runtime, p) {
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
    function method_wai(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_d = members.m_d ?? 0;
        members.m_wai_state = ((((members.m_wai_state) | (8))) & 0xff);
        (__deref_wai(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_wai(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_wai(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_x.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_wai(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_x.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_wai(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_d.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_wai(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_d.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_wai(runtime, members.m_program).write_byte?.(h_m_s.d, (members.m_cc ?? 0)) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        method_check_irq_lines(runtime);
        if ((((members.m_wai_state ?? 0)) & (8))) {
            method_eat_cycles(runtime);
        }
    }
    function __deref_wai(runtime, p) {
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
    function method_eat_cycles(runtime) {
        const members = runtime.members;
        if (((((members.m_icount ?? 0)) > (0)) ? 1 : 0)) {
            method_increment_counter(runtime, (members.m_icount ?? 0));
        }
    }
    function method_swi(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_d = members.m_d ?? 0;
        (__deref_swi(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_swi(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_swi(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_x.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_swi(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_x.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_swi(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_d.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_swi(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_d.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_swi(runtime, members.m_program).write_byte?.(h_m_s.d, (members.m_cc ?? 0)) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        members.m_cc = ((((members.m_cc) | (16))) & 0xff);
        h_m_pc.d = ((method_RM16(runtime, 65530)) >>> 0);
    }
    function __deref_swi(runtime, p) {
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
    function method_nega(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let r = ((0) & 0xffff);
        r = (((-h_m_d.b.h)) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((0) ^ (h_m_d.b.h))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function method_coma(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.h = (((~h_m_d.b.h)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
    }
    function method_lsra(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((h_m_d.b.h) & (1))))) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) >>> (1))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
    }
    function method_rora(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let r = ((0) & 0xff);
        r = (((((((members.m_cc ?? 0)) & (1))) << (7))) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((h_m_d.b.h) & (1))))) & 0xff);
        r = ((((r) | (((h_m_d.b.h) >>> (1))))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
        h_m_d.b.h = ((r) & 0xff);
    }
    function method_asra(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((h_m_d.b.h) & (1))))) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) >>> (1))) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) | (((((h_m_d.b.h) & (64))) << (1))))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
    }
    function method_asla(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let r = ((0) & 0xffff);
        r = ((((h_m_d.b.h) << (1))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (h_m_d.b.h))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function method_rola(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = ((h_m_d.b.h) & 0xffff);
        r = (((((members.m_cc ?? 0)) & (1))) & 0xffff);
        r = ((((r) | (((t) << (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((t) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function method_deca(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.h = ((((h_m_d.b.h) - (1))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | ((__mame_table_0[(((((h_m_d.b.h) & (255))) % 256) + 256) % 256] ?? 0)))) & 0xff);
    }
    function method_inca(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.h = ((((h_m_d.b.h) + (1))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | ((__mame_table_1[(((((h_m_d.b.h) & (255))) % 256) + 256) % 256] ?? 0)))) & 0xff);
    }
    function method_tsta(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function method_clra(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.h = ((0) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (4))) & 0xff);
    }
    function method_negb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let r = ((0) & 0xffff);
        r = (((-h_m_d.b.l)) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((0) ^ (h_m_d.b.l))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function method_comb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.l = (((~h_m_d.b.l)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
    }
    function method_lsrb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((h_m_d.b.l) & (1))))) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) >>> (1))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
    }
    function method_rorb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let r = ((0) & 0xff);
        r = (((((((members.m_cc ?? 0)) & (1))) << (7))) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((h_m_d.b.l) & (1))))) & 0xff);
        r = ((((r) | (((h_m_d.b.l) >>> (1))))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
        h_m_d.b.l = ((r) & 0xff);
    }
    function method_asrb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((h_m_d.b.l) & (1))))) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) >>> (1))) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) | (((((h_m_d.b.l) & (64))) << (1))))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
    }
    function method_aslb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let r = ((0) & 0xffff);
        r = ((((h_m_d.b.l) << (1))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (h_m_d.b.l))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function method_rolb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = ((h_m_d.b.l) & 0xffff);
        r = (((((members.m_cc ?? 0)) & (1))) & 0xffff);
        r = ((((r) | (((t) << (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((t) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function method_decb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.l = ((((h_m_d.b.l) - (1))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | ((__mame_table_0[(((((h_m_d.b.l) & (255))) % 256) + 256) % 256] ?? 0)))) & 0xff);
    }
    function method_incb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.l = ((((h_m_d.b.l) + (1))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | ((__mame_table_1[(((((h_m_d.b.l) & (255))) % 256) + 256) % 256] ?? 0)))) & 0xff);
    }
    function method_tstb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function method_clrb(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.l = ((0) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (4))) & 0xff);
    }
    function method_neg_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let r = ((0) & 0xffff);
        let t = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_neg_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_neg_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = (((-t)) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((0) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        (__deref_neg_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, r) ?? 0);
    }
    function __deref_neg_ix(runtime, p) {
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
    function method_com_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_com_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_com_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        t = (((~t)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (128)), 4)))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        (__deref_com_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_com_ix(runtime, p) {
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
    function method_lsr_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_lsr_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_lsr_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((t) & (1))))) & 0xff);
        t = ((((t) >>> (1))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
        (__deref_lsr_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_lsr_ix(runtime, p) {
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
    function method_ror_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_ror_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_ror_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        r = (((((((members.m_cc ?? 0)) & (1))) << (7))) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((t) & (1))))) & 0xff);
        r = ((((r) | (((t) >>> (1))))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
        (__deref_ror_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, r) ?? 0);
    }
    function __deref_ror_ix(runtime, p) {
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
    function method_asr_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_asr_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_asr_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((t) & (1))))) & 0xff);
        t = ((((t) >>> (1))) & 0xff);
        t = ((((t) | (((((t) & (64))) << (1))))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (128)), 4)))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
        (__deref_asr_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_asr_ix(runtime, p) {
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
    function method_asl_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_asl_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_asl_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((t) << (1))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((t) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        (__deref_asl_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, r) ?? 0);
    }
    function __deref_asl_ix(runtime, p) {
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
    function method_rol_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_rol_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_rol_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = (((((members.m_cc ?? 0)) & (1))) & 0xffff);
        r = ((((r) | (((t) << (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((t) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        (__deref_rol_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, r) ?? 0);
    }
    function __deref_rol_ix(runtime, p) {
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
    function method_dec_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_dec_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_dec_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        t = ((((t) - (1))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | ((__mame_table_0[(((((t) & (255))) % 256) + 256) % 256] ?? 0)))) & 0xff);
        (__deref_dec_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_dec_ix(runtime, p) {
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
    function method_inc_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_inc_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_inc_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        t = ((((t) + (1))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | ((__mame_table_1[(((((t) & (255))) % 256) + 256) % 256] ?? 0)))) & 0xff);
        (__deref_inc_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_inc_ix(runtime, p) {
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
    function method_tst_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_tst_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_tst_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (128)), 4)))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_tst_ix(runtime, p) {
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
    function method_jmp_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_jmp_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_pc.w.l = ((h_m_ea.w.l) & 0xffff);
    }
    function __deref_jmp_ix(runtime, p) {
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
    function method_clr_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_clr_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        (__deref_clr_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0);
        (__deref_clr_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, 0) ?? 0);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (4))) & 0xff);
    }
    function __deref_clr_ix(runtime, p) {
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
    function method_neg_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let r = ((0) & 0xffff);
        let t = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_neg_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_neg_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_neg_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = (((-t)) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((0) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        (__deref_neg_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, r) ?? 0);
    }
    function __deref_neg_ex(runtime, p) {
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
    function method_com_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_com_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_com_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_com_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        t = (((~t)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (128)), 4)))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        (__deref_com_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_com_ex(runtime, p) {
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
    function method_lsr_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_lsr_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_lsr_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_lsr_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((t) & (1))))) & 0xff);
        t = ((((t) >>> (1))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
        (__deref_lsr_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_lsr_ex(runtime, p) {
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
    function method_ror_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_ror_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_ror_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_ror_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        r = (((((((members.m_cc ?? 0)) & (1))) << (7))) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((t) & (1))))) & 0xff);
        r = ((((r) | (((t) >>> (1))))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
        (__deref_ror_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, r) ?? 0);
    }
    function __deref_ror_ex(runtime, p) {
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
    function method_asr_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_asr_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_asr_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_asr_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((t) & (1))))) & 0xff);
        t = ((((t) >>> (1))) & 0xff);
        t = ((((t) | (((((t) & (64))) << (1))))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (128)), 4)))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        if ((((((members.m_cc ?? 0)) & (8))) ^ ((((((members.m_cc ?? 0)) & (1))) << (3))))) {
            members.m_cc = ((((members.m_cc) | (2))) & 0xff);
        }
        (__deref_asr_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_asr_ex(runtime, p) {
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
    function method_asl_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_asl_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_asl_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_asl_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((t) << (1))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((t) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        (__deref_asl_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, r) ?? 0);
    }
    function __deref_asl_ex(runtime, p) {
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
    function method_rol_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_rol_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_rol_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_rol_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = (((((members.m_cc ?? 0)) & (1))) & 0xffff);
        r = ((((r) | (((t) << (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((t) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        (__deref_rol_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, r) ?? 0);
    }
    function __deref_rol_ex(runtime, p) {
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
    function method_dec_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_dec_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_dec_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_dec_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        t = ((((t) - (1))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | ((__mame_table_0[(((((t) & (255))) % 256) + 256) % 256] ?? 0)))) & 0xff);
        (__deref_dec_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_dec_ex(runtime, p) {
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
    function method_inc_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_inc_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_inc_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_inc_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        t = ((((t) + (1))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | ((__mame_table_1[(((((t) & (255))) % 256) + 256) % 256] ?? 0)))) & 0xff);
        (__deref_inc_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, t) ?? 0);
    }
    function __deref_inc_ex(runtime, p) {
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
    function method_tst_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_tst_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_tst_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_tst_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((t) & (128)), 4)))) & 0xff);
        if (((((t) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_tst_ex(runtime, p) {
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
    function method_jmp_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        h_m_ea.d = (((((((__deref_jmp_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_jmp_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        h_m_pc.w.l = ((h_m_ea.w.l) & 0xffff);
    }
    function __deref_jmp_ex(runtime, p) {
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
    function method_clr_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        h_m_ea.d = (((((((__deref_clr_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_clr_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        (__deref_clr_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0);
        (__deref_clr_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, 0) ?? 0);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (4))) & 0xff);
    }
    function __deref_clr_ex(runtime, p) {
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
    function method_suba_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_suba_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((h_m_d.b.h) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_suba_im(runtime, p) {
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
    function method_cmpa_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_cmpa_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((h_m_d.b.h) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
    }
    function __deref_cmpa_im(runtime, p) {
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
    function method_sbca_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_sbca_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((((h_m_d.b.h) - (t))) - ((((members.m_cc ?? 0)) & (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_sbca_im(runtime, p) {
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
    function method_anda_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_anda_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.h = ((((h_m_d.b.h) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_anda_im(runtime, p) {
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
    function method_bita_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        t = (((__deref_bita_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((h_m_d.b.h) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_bita_im(runtime, p) {
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
    function method_lda_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.h = (((__deref_lda_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_lda_im(runtime, p) {
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
    function method_sta_im(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_d = members.m_d ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.w.l = (((__t0 = h_m_pc.w.l, h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff), __t0)) & 0xffff);
        (__deref_sta_im(runtime, members.m_program).write_byte?.(h_m_ea.d, h_m_d.b.h) ?? 0);
    }
    function __deref_sta_im(runtime, p) {
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
    function method_eora_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_eora_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.h = ((((h_m_d.b.h) ^ (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_eora_im(runtime, p) {
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
    function method_adca_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_adca_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((__add_adca_im(runtime, ((h_m_d.b.h) + (t)), (((members.m_cc ?? 0)) & (1)))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __add_adca_im(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_adca_im(runtime, p) {
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
    function method_ora_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_ora_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.h = ((((h_m_d.b.h) | (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ora_im(runtime, p) {
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
    function method_adda_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_adda_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((h_m_d.b.h) + (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_adda_im(runtime, p) {
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
    function method_cmpx_im(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["PAIR_VALUE"];
        const h_m_pc = members.m_pc ?? 0;
        const h_m_x = members.m_x ?? 0;
        let r = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        let d = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        let b = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        b.d = (((((((__deref_cmpx_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_cmpx_im(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        d.d = ((h_m_x.w.l) >>> 0);
        r.w.l = ((((d.b.h) - (b.b.h))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r.b.l) & (128)), 4)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((d.b.h) ^ (b.b.h))) ^ (r.w.l))) ^ (((r.w.l) >>> (1))))) & (128)), 6)))) & 0xff);
        r.d = ((((d.d) - (b.d))) >>> 0);
        if (((((r.d) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_cmpx_im(runtime, p) {
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
    function method_bsr(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_s = members.m_s ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_bsr(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        (__deref_bsr(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_bsr(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (((((((t) & (128))) ? (((t) | (65280))) : (t))) << 16 >> 16)))) & 0xffff);
    }
    function __deref_bsr(runtime, p) {
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
    function method_lds_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_s = members.m_s ?? 0;
        h_m_s.d = (((((((__deref_lds_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_lds_im(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_s.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_s.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_lds_im(runtime, p) {
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
    function method_sts_im(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_s.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_s.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.w.l = ((h_m_pc.w.l) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        method_WM16(runtime, h_m_ea.d, h_m_s);
    }
    function method_WM16(runtime, Addr, p) {
        const members = runtime.members;
        const __pointee_p = __deref_WM16(runtime, p);
        (__deref_WM16(runtime, members.m_program).write_byte?.(Addr, __pointee_p.b.h) ?? 0);
        (__deref_WM16(runtime, members.m_program).write_byte?.(((((Addr) + (1))) & (65535)), __pointee_p.b.l) ?? 0);
    }
    function __deref_WM16(runtime, p) {
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
    function method_suba_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_suba_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_suba_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.h) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_suba_di(runtime, p) {
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
    function method_cmpa_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_cmpa_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_cmpa_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.h) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
    }
    function __deref_cmpa_di(runtime, p) {
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
    function method_sbca_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_sbca_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_sbca_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((((h_m_d.b.h) - (t))) - ((((members.m_cc ?? 0)) & (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_sbca_di(runtime, p) {
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
    function method_anda_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((__deref_anda_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_anda_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_anda_di(runtime, p) {
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
    function method_bita_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        h_m_ea.d = (((__deref_bita_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_bita_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        r = ((((h_m_d.b.h) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_bita_di(runtime, p) {
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
    function method_lda_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_ea.d = (((__deref_lda_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.h = (((__deref_lda_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_lda_di(runtime, p) {
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
    function method_sta_di(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.d = (((__deref_sta_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        (__deref_sta_di(runtime, members.m_program).write_byte?.(h_m_ea.d, h_m_d.b.h) ?? 0);
    }
    function __deref_sta_di(runtime, p) {
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
    function method_eora_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((__deref_eora_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_eora_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) ^ (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_eora_di(runtime, p) {
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
    function method_adca_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_adca_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_adca_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((__add_adca_di(runtime, ((h_m_d.b.h) + (t)), (((members.m_cc ?? 0)) & (1)))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __add_adca_di(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_adca_di(runtime, p) {
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
    function method_ora_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((__deref_ora_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_ora_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) | (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ora_di(runtime, p) {
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
    function method_adda_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_adda_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_adda_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.h) + (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_adda_di(runtime, p) {
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
    function method_cmpx_di(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["PAIR_VALUE"];
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_x = members.m_x ?? 0;
        let r = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        let d = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        let b = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        h_m_ea.d = (((__deref_cmpx_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        b.d = ((method_RM16(runtime, h_m_ea.d)) >>> 0);
        d.d = ((h_m_x.w.l) >>> 0);
        r.w.l = ((((d.b.h) - (b.b.h))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r.b.l) & (128)), 4)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((d.b.h) ^ (b.b.h))) ^ (r.w.l))) ^ (((r.w.l) >>> (1))))) & (128)), 6)))) & 0xff);
        r.d = ((((d.d) - (b.d))) >>> 0);
        if (((((r.d) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_cmpx_di(runtime, p) {
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
    function method_jsr_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_s = members.m_s ?? 0;
        h_m_ea.d = (((__deref_jsr_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        (__deref_jsr_di(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_jsr_di(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        h_m_pc.w.l = ((h_m_ea.w.l) & 0xffff);
    }
    function __deref_jsr_di(runtime, p) {
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
    function method_lds_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_s = members.m_s ?? 0;
        h_m_ea.d = (((__deref_lds_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_s.d = ((method_RM16(runtime, h_m_ea.d)) >>> 0);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_s.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_s.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_lds_di(runtime, p) {
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
    function method_sts_di(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_s.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_s.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.d = (((__deref_sts_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        method_WM16(runtime, h_m_ea.d, h_m_s);
    }
    function __deref_sts_di(runtime, p) {
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
    function method_suba_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_suba_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_suba_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.h) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_suba_ix(runtime, p) {
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
    function method_cmpa_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_cmpa_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_cmpa_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.h) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
    }
    function __deref_cmpa_ix(runtime, p) {
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
    function method_sbca_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_sbca_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_sbca_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((((h_m_d.b.h) - (t))) - ((((members.m_cc ?? 0)) & (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_sbca_ix(runtime, p) {
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
    function method_anda_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_anda_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_anda_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_anda_ix(runtime, p) {
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
    function method_bita_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_bita_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_bita_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        r = ((((h_m_d.b.h) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_bita_ix(runtime, p) {
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
    function method_lda_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_lda_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.h = (((__deref_lda_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_lda_ix(runtime, p) {
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
    function method_sta_ix(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_sta_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        (__deref_sta_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, h_m_d.b.h) ?? 0);
    }
    function __deref_sta_ix(runtime, p) {
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
    function method_eora_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_eora_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_eora_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) ^ (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_eora_ix(runtime, p) {
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
    function method_adca_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_adca_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_adca_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((__add_adca_ix(runtime, ((h_m_d.b.h) + (t)), (((members.m_cc ?? 0)) & (1)))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __add_adca_ix(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_adca_ix(runtime, p) {
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
    function method_ora_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_ora_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_ora_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) | (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ora_ix(runtime, p) {
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
    function method_adda_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_adda_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_adda_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.h) + (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_adda_ix(runtime, p) {
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
    function method_cmpx_ix(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["PAIR_VALUE"];
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let r = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        let d = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        let b = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_cmpx_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        b.d = ((method_RM16(runtime, h_m_ea.d)) >>> 0);
        d.d = ((h_m_x.w.l) >>> 0);
        r.w.l = ((((d.b.h) - (b.b.h))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r.b.l) & (128)), 4)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((d.b.h) ^ (b.b.h))) ^ (r.w.l))) ^ (((r.w.l) >>> (1))))) & (128)), 6)))) & 0xff);
        r.d = ((((d.d) - (b.d))) >>> 0);
        if (((((r.d) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_cmpx_ix(runtime, p) {
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
    function method_jsr_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_s = members.m_s ?? 0;
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_jsr_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        (__deref_jsr_ix(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_jsr_ix(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        h_m_pc.w.l = ((h_m_ea.w.l) & 0xffff);
    }
    function __deref_jsr_ix(runtime, p) {
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
    function method_lds_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_s = members.m_s ?? 0;
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_lds_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_s.d = ((method_RM16(runtime, h_m_ea.d)) >>> 0);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_s.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_s.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_lds_ix(runtime, p) {
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
    function method_sts_ix(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_s.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_s.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_sts_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        method_WM16(runtime, h_m_ea.d, h_m_s);
    }
    function __deref_sts_ix(runtime, p) {
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
    function method_suba_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_suba_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_suba_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_suba_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.h) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_suba_ex(runtime, p) {
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
    function method_cmpa_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_cmpa_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_cmpa_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_cmpa_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.h) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
    }
    function __deref_cmpa_ex(runtime, p) {
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
    function method_sbca_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_sbca_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_sbca_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_sbca_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((((h_m_d.b.h) - (t))) - ((((members.m_cc ?? 0)) & (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_sbca_ex(runtime, p) {
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
    function method_anda_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_anda_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_anda_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_anda_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_anda_ex(runtime, p) {
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
    function method_bita_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_bita_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_bita_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_bita_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        r = ((((h_m_d.b.h) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_bita_ex(runtime, p) {
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
    function method_lda_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_ea.d = (((((((__deref_lda_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_lda_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        h_m_d.b.h = (((__deref_lda_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_lda_ex(runtime, p) {
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
    function method_sta_ex(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.d = (((((((__deref_sta_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_sta_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        (__deref_sta_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, h_m_d.b.h) ?? 0);
    }
    function __deref_sta_ex(runtime, p) {
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
    function method_eora_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_eora_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_eora_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_eora_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) ^ (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_eora_ex(runtime, p) {
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
    function method_adca_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_adca_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_adca_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_adca_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((__add_adca_ex(runtime, ((h_m_d.b.h) + (t)), (((members.m_cc ?? 0)) & (1)))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __add_adca_ex(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_adca_ex(runtime, p) {
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
    function method_ora_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_ora_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_ora_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_ora_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.h = ((((h_m_d.b.h) | (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.h) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.h) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ora_ex(runtime, p) {
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
    function method_adda_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_adda_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_adda_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_adda_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.h) + (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.h) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.h) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.h = ((r) & 0xff);
    }
    function __deref_adda_ex(runtime, p) {
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
    function method_cmpx_ex(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["PAIR_VALUE"];
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_x = members.m_x ?? 0;
        let r = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        let d = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        let b = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        h_m_ea.d = (((((((__deref_cmpx_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_cmpx_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        b.d = ((method_RM16(runtime, h_m_ea.d)) >>> 0);
        d.d = ((h_m_x.w.l) >>> 0);
        r.w.l = ((((d.b.h) - (b.b.h))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r.b.l) & (128)), 4)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((d.b.h) ^ (b.b.h))) ^ (r.w.l))) ^ (((r.w.l) >>> (1))))) & (128)), 6)))) & 0xff);
        r.d = ((((d.d) - (b.d))) >>> 0);
        if (((((r.d) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_cmpx_ex(runtime, p) {
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
    function method_jsr_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_s = members.m_s ?? 0;
        h_m_ea.d = (((((((__deref_jsr_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_jsr_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        (__deref_jsr_ex(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.l) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        (__deref_jsr_ex(runtime, members.m_program).write_byte?.(h_m_s.d, h_m_pc.b.h) ?? 0);
        h_m_s.w.l = ((((h_m_s.w.l) - (1))) & 0xffff);
        h_m_pc.w.l = ((h_m_ea.w.l) & 0xffff);
    }
    function __deref_jsr_ex(runtime, p) {
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
    function method_lds_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_s = members.m_s ?? 0;
        h_m_ea.d = (((((((__deref_lds_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_lds_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        h_m_s.d = ((method_RM16(runtime, h_m_ea.d)) >>> 0);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_s.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_s.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_lds_ex(runtime, p) {
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
    function method_sts_ex(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_s.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_s.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.d = (((((((__deref_sts_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_sts_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        method_WM16(runtime, h_m_ea.d, h_m_s);
    }
    function __deref_sts_ex(runtime, p) {
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
    function method_subb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_subb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((h_m_d.b.l) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_subb_im(runtime, p) {
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
    function method_cmpb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_cmpb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((h_m_d.b.l) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
    }
    function __deref_cmpb_im(runtime, p) {
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
    function method_sbcb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_sbcb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((((h_m_d.b.l) - (t))) - ((((members.m_cc ?? 0)) & (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_sbcb_im(runtime, p) {
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
    function method_andb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_andb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.l = ((((h_m_d.b.l) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_andb_im(runtime, p) {
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
    function method_bitb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        t = (((__deref_bitb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((h_m_d.b.l) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_bitb_im(runtime, p) {
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
    function method_ldb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.l = (((__deref_ldb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ldb_im(runtime, p) {
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
    function method_stb_im(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_d = members.m_d ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.w.l = (((__t0 = h_m_pc.w.l, h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff), __t0)) & 0xffff);
        (__deref_stb_im(runtime, members.m_program).write_byte?.(h_m_ea.d, h_m_d.b.l) ?? 0);
    }
    function __deref_stb_im(runtime, p) {
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
    function method_eorb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_eorb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.l = ((((h_m_d.b.l) ^ (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_eorb_im(runtime, p) {
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
    function method_adcb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_adcb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((__add_adcb_im(runtime, ((h_m_d.b.l) + (t)), (((members.m_cc ?? 0)) & (1)))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __add_adcb_im(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_adcb_im(runtime, p) {
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
    function method_orb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        t = (((__deref_orb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.l = ((((h_m_d.b.l) | (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_orb_im(runtime, p) {
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
    function method_addb_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        t = (((__deref_addb_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        r = ((((h_m_d.b.l) + (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_addb_im(runtime, p) {
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
    function method_ldx_im(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_x = members.m_x ?? 0;
        h_m_x.d = (((((((__deref_ldx_im(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_ldx_im(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_x.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ldx_im(runtime, p) {
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
    function method_stx_im(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_x.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.w.l = ((h_m_pc.w.l) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        method_WM16(runtime, h_m_ea.d, h_m_x);
    }
    function method_subb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_subb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_subb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.l) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_subb_di(runtime, p) {
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
    function method_cmpb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_cmpb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_cmpb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.l) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
    }
    function __deref_cmpb_di(runtime, p) {
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
    function method_sbcb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_sbcb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_sbcb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((((h_m_d.b.l) - (t))) - ((((members.m_cc ?? 0)) & (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_sbcb_di(runtime, p) {
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
    function method_andb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((__deref_andb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_andb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_andb_di(runtime, p) {
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
    function method_bitb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        h_m_ea.d = (((__deref_bitb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_bitb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        r = ((((h_m_d.b.l) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_bitb_di(runtime, p) {
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
    function method_ldb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_ea.d = (((__deref_ldb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.l = (((__deref_ldb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ldb_di(runtime, p) {
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
    function method_stb_di(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.d = (((__deref_stb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        (__deref_stb_di(runtime, members.m_program).write_byte?.(h_m_ea.d, h_m_d.b.l) ?? 0);
    }
    function __deref_stb_di(runtime, p) {
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
    function method_eorb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((__deref_eorb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_eorb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) ^ (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_eorb_di(runtime, p) {
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
    function method_adcb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_adcb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_adcb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((__add_adcb_di(runtime, ((h_m_d.b.l) + (t)), (((members.m_cc ?? 0)) & (1)))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __add_adcb_di(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_adcb_di(runtime, p) {
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
    function method_orb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((__deref_orb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_orb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) | (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_orb_di(runtime, p) {
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
    function method_addb_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((__deref_addb_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_addb_di(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.l) + (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_addb_di(runtime, p) {
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
    function method_ldx_di(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_x = members.m_x ?? 0;
        h_m_ea.d = (((__deref_ldx_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_x.d = ((method_RM16(runtime, h_m_ea.d)) >>> 0);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_x.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ldx_di(runtime, p) {
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
    function method_stx_di(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_x.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.d = (((__deref_stx_di(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        method_WM16(runtime, h_m_ea.d, h_m_x);
    }
    function __deref_stx_di(runtime, p) {
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
    function method_subb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_subb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_subb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.l) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_subb_ix(runtime, p) {
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
    function method_cmpb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_cmpb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_cmpb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.l) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
    }
    function __deref_cmpb_ix(runtime, p) {
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
    function method_sbcb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_sbcb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_sbcb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((((h_m_d.b.l) - (t))) - ((((members.m_cc ?? 0)) & (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_sbcb_ix(runtime, p) {
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
    function method_andb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_andb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_andb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_andb_ix(runtime, p) {
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
    function method_bitb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_bitb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_bitb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        r = ((((h_m_d.b.l) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_bitb_ix(runtime, p) {
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
    function method_ldb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_ldb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_d.b.l = (((__deref_ldb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ldb_ix(runtime, p) {
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
    function method_stb_ix(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_stb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        (__deref_stb_ix(runtime, members.m_program).write_byte?.(h_m_ea.d, h_m_d.b.l) ?? 0);
    }
    function __deref_stb_ix(runtime, p) {
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
    function method_eorb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_eorb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_eorb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) ^ (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_eorb_ix(runtime, p) {
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
    function method_adcb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_adcb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_adcb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((__add_adcb_ix(runtime, ((h_m_d.b.l) + (t)), (((members.m_cc ?? 0)) & (1)))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __add_adcb_ix(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_adcb_ix(runtime, p) {
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
    function method_orb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_orb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_orb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) | (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_orb_ix(runtime, p) {
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
    function method_addb_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_addb_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        t = (((__deref_addb_ix(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.l) + (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_addb_ix(runtime, p) {
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
    function method_ldx_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_ldx_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        h_m_x.d = ((method_RM16(runtime, h_m_ea.d)) >>> 0);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_x.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ldx_ix(runtime, p) {
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
    function method_stx_ix(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_x.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.w.l = ((((h_m_x.w.l) + ((((__deref_stx_ix(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) & 0xff)))) & 0xffff);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (1))) & 0xffff);
        method_WM16(runtime, h_m_ea.d, h_m_x);
    }
    function __deref_stx_ix(runtime, p) {
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
    function method_subb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_subb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_subb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_subb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.l) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_subb_ex(runtime, p) {
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
    function method_cmpb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_cmpb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_cmpb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_cmpb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.l) - (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
    }
    function __deref_cmpb_ex(runtime, p) {
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
    function method_sbcb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_sbcb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_sbcb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_sbcb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((((h_m_d.b.l) - (t))) - ((((members.m_cc ?? 0)) & (1))))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (240))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_sbcb_ex(runtime, p) {
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
    function method_andb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_andb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_andb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_andb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_andb_ex(runtime, p) {
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
    function method_bitb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        let r = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_bitb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_bitb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_bitb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        r = ((((h_m_d.b.l) & (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_bitb_ex(runtime, p) {
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
    function method_ldb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        h_m_ea.d = (((((((__deref_ldb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_ldb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        h_m_d.b.l = (((__deref_ldb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ldb_ex(runtime, p) {
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
    function method_stb_ex(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.d = (((((((__deref_stb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_stb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        (__deref_stb_ex(runtime, members.m_program).write_byte?.(h_m_ea.d, h_m_d.b.l) ?? 0);
    }
    function __deref_stb_ex(runtime, p) {
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
    function method_eorb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_eorb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_eorb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_eorb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) ^ (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_eorb_ex(runtime, p) {
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
    function method_adcb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_adcb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_adcb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_adcb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((__add_adcb_ex(runtime, ((h_m_d.b.l) + (t)), (((members.m_cc ?? 0)) & (1)))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __add_adcb_ex(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_adcb_ex(runtime, p) {
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
    function method_orb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xff);
        h_m_ea.d = (((((((__deref_orb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_orb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_orb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xff);
        h_m_d.b.l = ((((h_m_d.b.l) | (t))) & 0xff);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_d.b.l) & (128)), 4)))) & 0xff);
        if (((((h_m_d.b.l) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_orb_ex(runtime, p) {
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
    function method_addb_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_d = members.m_d ?? 0;
        let t = ((0) & 0xffff);
        let r = ((0) & 0xffff);
        h_m_ea.d = (((((((__deref_addb_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_addb_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        t = (((__deref_addb_ex(runtime, members.m_program).read_byte?.(h_m_ea.d) ?? 0)) & 0xffff);
        r = ((((h_m_d.b.l) + (t))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (208))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (128)), 4)))) & 0xff);
        if (((((r) & 0xff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((((((((h_m_d.b.l) ^ (t))) ^ (r))) ^ (((r) >>> (1))))) & (128)), 6)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((r) & (256)), 8)))) & 0xff);
        members.m_cc = ((((members.m_cc) | (((((((((h_m_d.b.l) ^ (t))) ^ (r))) & (16))) << (1))))) & 0xff);
        h_m_d.b.l = ((r) & 0xff);
    }
    function __deref_addb_ex(runtime, p) {
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
    function method_ldx_ex(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        const h_m_x = members.m_x ?? 0;
        h_m_ea.d = (((((((__deref_ldx_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_ldx_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        h_m_x.d = ((method_RM16(runtime, h_m_ea.d)) >>> 0);
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_x.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
    }
    function __deref_ldx_ex(runtime, p) {
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
    function method_stx_ex(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        members.m_cc = ((((members.m_cc) & (241))) & 0xff);
        members.m_cc = ((((members.m_cc) | (runtime.shiftRight(((h_m_x.w.l) & (32768)), 12)))) & 0xff);
        if (((((h_m_x.w.l) & 0xffff)) ? 0 : 1)) {
            members.m_cc = ((((members.m_cc) | (4))) & 0xff);
        }
        h_m_ea.d = (((((((__deref_stx_ex(runtime, members.m_cprogram).read_byte?.(h_m_pc.d) ?? 0)) << (8))) | ((__deref_stx_ex(runtime, members.m_cprogram).read_byte?.(((((h_m_pc.d) + (1))) & (65535))) ?? 0)))) >>> 0);
        h_m_pc.w.l = ((((h_m_pc.w.l) + (2))) & 0xffff);
        method_WM16(runtime, h_m_ea.d, h_m_x);
    }
    function __deref_stx_ex(runtime, p) {
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
    function method_execute_set_input(runtime, irqline, state) {
        const members = runtime.members;
        const h_m_irq_state = members.m_irq_state ?? 0;
        switch (irqline) {
            case -1:
                {
                    if (((((((members.m_nmi_state ?? 0)) ? 0 : 1)) && (((Number(state) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_nmi_pending = ((1) & 0xff);
                    }
                    members.m_nmi_state = ((state) & 0xff);
                    break;
                }
            default:
                {
                    h_m_irq_state[irqline] = state;
                    break;
                }
        }
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        method_check_irq_lines(runtime);
        method_cleanup_counters(runtime);
        do {
            if ((((members.m_wai_state ?? 0)) & (24))) {
                /* debugger_wait_hook: no effect */
                method_eat_cycles(runtime);
            }
            else {
                method_execute_one(runtime);
            }
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function method_cleanup_counters(runtime) {
        const members = runtime.members;
    }
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((12) >>> 0);
    }
    function method_execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method_m6800_cpu_device__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_m6800_cpu_device__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((12) >>> 0);
    }
    function method_m6800_cpu_device__execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method_set_ram_enable(runtime, re) {
        const members = runtime.members;
        members.m_ram_enable = ((re) ? 1 : 0);
    }
    function method_execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 4), 1), 4);
    }
    function method_execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 4);
    }
    function method_m6802_cpu_device__set_ram_enable(runtime, re) {
        const members = runtime.members;
        members.m_ram_enable = ((re) ? 1 : 0);
    }
    function method_m6802_cpu_device__execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 4), 1), 4);
    }
    function method_m6802_cpu_device__execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 4);
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        return h_m_d.b.h;
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.h = ((value) & 0xff);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        return h_m_d.b.l;
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        const h_m_d = members.m_d ?? 0;
        h_m_d.b.l = ((value) & 0xff);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        return h_m_pc.w.l;
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        h_m_pc.w.l = ((value) & 0xffff);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        return h_m_s.w.l;
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        h_m_s.w.l = ((value) & 0xffff);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        return h_m_x.w.l;
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        h_m_x.w.l = ((value) & 0xffff);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        return (members.m_cc ?? 0);
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        members.m_cc = ((value) & 0xff);
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        return (members.m_wai_state ?? 0);
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        members.m_wai_state = ((value) & 0xff);
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        return h_m_pc.w.l;
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        h_m_pc.w.l = ((value) & 0xffff);
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        return h_m_pc.w.l;
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        const h_m_pc = members.m_pc ?? 0;
        h_m_pc.w.l = ((value) & 0xffff);
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        return (members.m_cc ?? 0);
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        members.m_cc = ((value) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "illegl1": method_illegl1,
        "illegl2": method_illegl2,
        "illegl3": method_illegl3,
        "nop": method_nop,
        "tap": method_tap,
        "execute_one": method_execute_one,
        "increment_counter": method_increment_counter,
        "check_irq_lines": method_check_irq_lines,
        "enter_interrupt": method_enter_interrupt,
        "RM16": method_RM16,
        "check_irq1_enabled": method_check_irq1_enabled,
        "check_irq2": method_check_irq2,
        "tpa": method_tpa,
        "inx": method_inx,
        "dex": method_dex,
        "clv": method_clv,
        "sev": method_sev,
        "clc": method_clc,
        "sec": method_sec,
        "cli": method_cli,
        "sei": method_sei,
        "sba": method_sba,
        "cba": method_cba,
        "tab": method_tab,
        "tba": method_tba,
        "daa": method_daa,
        "aba": method_aba,
        "bra": method_bra,
        "brn": method_brn,
        "bhi": method_bhi,
        "bls": method_bls,
        "bcc": method_bcc,
        "bcs": method_bcs,
        "bne": method_bne,
        "beq": method_beq,
        "bvc": method_bvc,
        "bvs": method_bvs,
        "bpl": method_bpl,
        "bmi": method_bmi,
        "bge": method_bge,
        "blt": method_blt,
        "bgt": method_bgt,
        "ble": method_ble,
        "tsx": method_tsx,
        "ins": method_ins,
        "pula": method_pula,
        "pulb": method_pulb,
        "des": method_des,
        "txs": method_txs,
        "psha": method_psha,
        "pshb": method_pshb,
        "rts": method_rts,
        "rti": method_rti,
        "wai": method_wai,
        "eat_cycles": method_eat_cycles,
        "swi": method_swi,
        "nega": method_nega,
        "coma": method_coma,
        "lsra": method_lsra,
        "rora": method_rora,
        "asra": method_asra,
        "asla": method_asla,
        "rola": method_rola,
        "deca": method_deca,
        "inca": method_inca,
        "tsta": method_tsta,
        "clra": method_clra,
        "negb": method_negb,
        "comb": method_comb,
        "lsrb": method_lsrb,
        "rorb": method_rorb,
        "asrb": method_asrb,
        "aslb": method_aslb,
        "rolb": method_rolb,
        "decb": method_decb,
        "incb": method_incb,
        "tstb": method_tstb,
        "clrb": method_clrb,
        "neg_ix": method_neg_ix,
        "com_ix": method_com_ix,
        "lsr_ix": method_lsr_ix,
        "ror_ix": method_ror_ix,
        "asr_ix": method_asr_ix,
        "asl_ix": method_asl_ix,
        "rol_ix": method_rol_ix,
        "dec_ix": method_dec_ix,
        "inc_ix": method_inc_ix,
        "tst_ix": method_tst_ix,
        "jmp_ix": method_jmp_ix,
        "clr_ix": method_clr_ix,
        "neg_ex": method_neg_ex,
        "com_ex": method_com_ex,
        "lsr_ex": method_lsr_ex,
        "ror_ex": method_ror_ex,
        "asr_ex": method_asr_ex,
        "asl_ex": method_asl_ex,
        "rol_ex": method_rol_ex,
        "dec_ex": method_dec_ex,
        "inc_ex": method_inc_ex,
        "tst_ex": method_tst_ex,
        "jmp_ex": method_jmp_ex,
        "clr_ex": method_clr_ex,
        "suba_im": method_suba_im,
        "cmpa_im": method_cmpa_im,
        "sbca_im": method_sbca_im,
        "anda_im": method_anda_im,
        "bita_im": method_bita_im,
        "lda_im": method_lda_im,
        "sta_im": method_sta_im,
        "eora_im": method_eora_im,
        "adca_im": method_adca_im,
        "ora_im": method_ora_im,
        "adda_im": method_adda_im,
        "cmpx_im": method_cmpx_im,
        "bsr": method_bsr,
        "lds_im": method_lds_im,
        "sts_im": method_sts_im,
        "WM16": method_WM16,
        "suba_di": method_suba_di,
        "cmpa_di": method_cmpa_di,
        "sbca_di": method_sbca_di,
        "anda_di": method_anda_di,
        "bita_di": method_bita_di,
        "lda_di": method_lda_di,
        "sta_di": method_sta_di,
        "eora_di": method_eora_di,
        "adca_di": method_adca_di,
        "ora_di": method_ora_di,
        "adda_di": method_adda_di,
        "cmpx_di": method_cmpx_di,
        "jsr_di": method_jsr_di,
        "lds_di": method_lds_di,
        "sts_di": method_sts_di,
        "suba_ix": method_suba_ix,
        "cmpa_ix": method_cmpa_ix,
        "sbca_ix": method_sbca_ix,
        "anda_ix": method_anda_ix,
        "bita_ix": method_bita_ix,
        "lda_ix": method_lda_ix,
        "sta_ix": method_sta_ix,
        "eora_ix": method_eora_ix,
        "adca_ix": method_adca_ix,
        "ora_ix": method_ora_ix,
        "adda_ix": method_adda_ix,
        "cmpx_ix": method_cmpx_ix,
        "jsr_ix": method_jsr_ix,
        "lds_ix": method_lds_ix,
        "sts_ix": method_sts_ix,
        "suba_ex": method_suba_ex,
        "cmpa_ex": method_cmpa_ex,
        "sbca_ex": method_sbca_ex,
        "anda_ex": method_anda_ex,
        "bita_ex": method_bita_ex,
        "lda_ex": method_lda_ex,
        "sta_ex": method_sta_ex,
        "eora_ex": method_eora_ex,
        "adca_ex": method_adca_ex,
        "ora_ex": method_ora_ex,
        "adda_ex": method_adda_ex,
        "cmpx_ex": method_cmpx_ex,
        "jsr_ex": method_jsr_ex,
        "lds_ex": method_lds_ex,
        "sts_ex": method_sts_ex,
        "subb_im": method_subb_im,
        "cmpb_im": method_cmpb_im,
        "sbcb_im": method_sbcb_im,
        "andb_im": method_andb_im,
        "bitb_im": method_bitb_im,
        "ldb_im": method_ldb_im,
        "stb_im": method_stb_im,
        "eorb_im": method_eorb_im,
        "adcb_im": method_adcb_im,
        "orb_im": method_orb_im,
        "addb_im": method_addb_im,
        "ldx_im": method_ldx_im,
        "stx_im": method_stx_im,
        "subb_di": method_subb_di,
        "cmpb_di": method_cmpb_di,
        "sbcb_di": method_sbcb_di,
        "andb_di": method_andb_di,
        "bitb_di": method_bitb_di,
        "ldb_di": method_ldb_di,
        "stb_di": method_stb_di,
        "eorb_di": method_eorb_di,
        "adcb_di": method_adcb_di,
        "orb_di": method_orb_di,
        "addb_di": method_addb_di,
        "ldx_di": method_ldx_di,
        "stx_di": method_stx_di,
        "subb_ix": method_subb_ix,
        "cmpb_ix": method_cmpb_ix,
        "sbcb_ix": method_sbcb_ix,
        "andb_ix": method_andb_ix,
        "bitb_ix": method_bitb_ix,
        "ldb_ix": method_ldb_ix,
        "stb_ix": method_stb_ix,
        "eorb_ix": method_eorb_ix,
        "adcb_ix": method_adcb_ix,
        "orb_ix": method_orb_ix,
        "addb_ix": method_addb_ix,
        "ldx_ix": method_ldx_ix,
        "stx_ix": method_stx_ix,
        "subb_ex": method_subb_ex,
        "cmpb_ex": method_cmpb_ex,
        "sbcb_ex": method_sbcb_ex,
        "andb_ex": method_andb_ex,
        "bitb_ex": method_bitb_ex,
        "ldb_ex": method_ldb_ex,
        "stb_ex": method_stb_ex,
        "eorb_ex": method_eorb_ex,
        "adcb_ex": method_adcb_ex,
        "orb_ex": method_orb_ex,
        "addb_ex": method_addb_ex,
        "ldx_ex": method_ldx_ex,
        "stx_ex": method_stx_ex,
        "execute_set_input": method_execute_set_input,
        "execute_run": method_execute_run,
        "cleanup_counters": method_cleanup_counters,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "execute_input_edge_triggered": method_execute_input_edge_triggered,
        "m6800_cpu_device::execute_min_cycles": method_m6800_cpu_device__execute_min_cycles,
        "m6800_cpu_device::execute_max_cycles": method_m6800_cpu_device__execute_max_cycles,
        "m6800_cpu_device::execute_input_edge_triggered": method_m6800_cpu_device__execute_input_edge_triggered,
        "set_ram_enable": method_set_ram_enable,
        "execute_clocks_to_cycles": method_execute_clocks_to_cycles,
        "execute_cycles_to_clocks": method_execute_cycles_to_clocks,
        "m6802_cpu_device::set_ram_enable": method_m6802_cpu_device__set_ram_enable,
        "m6802_cpu_device::execute_clocks_to_cycles": method_m6802_cpu_device__execute_clocks_to_cycles,
        "m6802_cpu_device::execute_cycles_to_clocks": method_m6802_cpu_device__execute_cycles_to_clocks,
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
        "__state_write_9": method___state_write_9
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["CALL_METHOD", "PAIR_VALUE", "standard_irq_callback"];
export const device = definition;
export default device;
