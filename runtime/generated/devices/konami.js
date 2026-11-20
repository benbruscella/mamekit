import deviceData from './konami.device.ir.json' with { type: 'json' };
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
    function method_is_register_addressing_mode(runtime) {
        const members = runtime.members;
        return (((((Number((members.m_addressing_mode ?? 0)) !== Number(0)) ? 1 : 0)) && (((Number((members.m_addressing_mode ?? 0)) !== Number(1)) ? 1 : 0))) ? 1 : 0);
    }
    function method_interrupt_vector_read(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_interrupt_vector_read(runtime, members.m_vector_read_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vector_read_func, "bind"));
    }
    function __deref_interrupt_vector_read(runtime, p) {
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
    function method_sync_acknowledge_write(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_sync_acknowledge_write(runtime, members.m_syncack_write_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_syncack_write_func, "bind"));
    }
    function __deref_sync_acknowledge_write(runtime, p) {
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
    function method_execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method_is_6809(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_eat(runtime, cycles) {
        const members = runtime.members;
        members.m_icount = ((((members.m_icount) - (cycles))) | 0);
    }
    function method_push_state(runtime, state) {
        const members = runtime.members;
        state = ((state) & 0xffff);
        members.m_state = (((((((members.m_state ?? 0)) << (9))) | (state))) >>> 0);
    }
    function method_set_ea_h(runtime, ea_h) {
        const members = runtime.members;
        ea_h = ((ea_h) & 0xff);
        const h_m_ea = members.m_ea ?? 0;
        h_m_ea.b.h = ((ea_h) & 0xff);
    }
    function method_regop8(runtime) {
        const members = runtime.members;
        return __deref_regop8(runtime, (members.m_reg8 ?? 0));
    }
    function __deref_regop8(runtime, p) {
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
    function method_regop16(runtime) {
        const members = runtime.members;
        return __deref_regop16(runtime, (members.m_reg16 ?? 0));
    }
    function __deref_regop16(runtime, p) {
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
    function method_is_register_register_op_16_bit(runtime) {
        const members = runtime.members;
        return (((members.m_reg16 ?? 0)) ? 1 : 0);
    }
    function method_add8_sets_h(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_hd6309_native_mode(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_cond_hi(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (5))) ? 0 : 1);
    }
    function method_cond_cc(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (1))) ? 0 : 1);
    }
    function method_cond_ne(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (4))) ? 0 : 1);
    }
    function method_cond_vc(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (2))) ? 0 : 1);
    }
    function method_cond_pl(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (8))) ? 0 : 1);
    }
    function method_cond_ge(runtime) {
        const members = runtime.members;
        return ((Number((((((members.m_cc ?? 0)) & (8))) ? (1) : (0))) === Number((((((members.m_cc ?? 0)) & (2))) ? (1) : (0)))) ? 1 : 0);
    }
    function method_cond_gt(runtime) {
        const members = runtime.members;
        return (((method_cond_ge(runtime)) && ((((((members.m_cc ?? 0)) & (4))) ? 0 : 1))) ? 1 : 0);
    }
    function method_set_cond(runtime, cond) {
        const members = runtime.members;
        members.m_cond = ((cond) ? 1 : 0);
    }
    function method_branch_taken(runtime) {
        const members = runtime.members;
        return (members.m_cond ?? 0);
    }
    function method_firq_saves_entire_state(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_partial_state_registers(runtime) {
        const members = runtime.members;
        return ((129) & 0xffff);
    }
    function method_entire_state_registers(runtime) {
        const members = runtime.members;
        return ((255) & 0xffff);
    }
    function method_is_ea_addressing_mode(runtime) {
        const members = runtime.members;
        return ((Number((members.m_addressing_mode ?? 0)) === Number(1)) ? 1 : 0);
    }
    function method_m6809_base_device__is_register_addressing_mode(runtime) {
        const members = runtime.members;
        return (((((Number((members.m_addressing_mode ?? 0)) !== Number(0)) ? 1 : 0)) && (((Number((members.m_addressing_mode ?? 0)) !== Number(1)) ? 1 : 0))) ? 1 : 0);
    }
    function method_state_import(runtime, entry) {
        const members = runtime.members;
        let __t0;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ppc = members.m_ppc ?? 0;
        switch ((__t0 = __deref_state_import(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case (members.M6809_PC ?? 0):
                {
                    h_m_ppc.w = ((h_m_pc.w) & 0xffff);
                    break;
                }
            case -2:
                {
                    h_m_pc.w = ((h_m_ppc.w) & 0xffff);
                    break;
                }
        }
    }
    function __deref_state_import(runtime, p) {
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
    function method_execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        const h_m_clock_divider = members.m_clock_divider ?? 0;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, ((h_m_clock_divider) | 0)), 1), ((h_m_clock_divider) | 0));
    }
    function method_execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        const h_m_clock_divider = members.m_clock_divider ?? 0;
        return runtime.wide("*", cycles, ((h_m_clock_divider) | 0));
    }
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((19) >>> 0);
    }
    function method_execute_set_input(runtime, inputnum, state) {
        const members = runtime.members;
        0;
        switch (inputnum) {
            case -1:
                {
                    members.m_nmi_asserted = ((((((members.m_nmi_asserted ?? 0)) || (((((((((Number(state) !== Number(0)) ? 1 : 0)) && ((((members.m_nmi_line ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((members.m_lds_encountered ?? 0))) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
                    members.m_nmi_line = ((((Number(state) !== Number(0)) ? 1 : 0)) ? 1 : 0);
                    break;
                }
            case 1:
                {
                    members.m_firq_line = ((((Number(state) !== Number(0)) ? 1 : 0)) ? 1 : 0);
                    break;
                }
            case 0:
                {
                    members.m_irq_line = ((((Number(state) !== Number(0)) ? 1 : 0)) ? 1 : 0);
                    break;
                }
        }
    }
    function method_inputnum_string(runtime, inputnum) {
        const members = runtime.members;
        switch (inputnum) {
            case -1:
                {
                    return "NMI";
                }
            case 1:
                {
                    return "FIRQ";
                }
            case 0:
                {
                    return "IRQ";
                }
            default:
                {
                    return "???";
                }
        }
    }
    function method_execute_one(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"], __L1 = __l["standard_irq_callback"], __L2 = __l["m_syncack_write_func"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16, __t17, __t18, __t19, __t20, __t21, __t22, __t23, __t24;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ppc = members.m_ppc ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_q = members.m_q ?? 0;
        const h_m_temp = members.m_temp ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let __switch_0_selected_0 = ((0) | 0);
        let __switch_0_selected_258 = ((0) | 0);
        let param = ((0) & 0xff);
        let reg = ((0) & 0xffff);
        let __switch_0 = ((method_pop_state(runtime)) | 0);
        if ((((__switch_0) >= (254)) ? 1 : 0)) {
            __switch_0 = ((-1) | 0);
        }
        while (1) {
            switch (__switch_0) {
                case 0:
                    {
                        __switch_0 = ((254) | 0);
                        continue;
                    }
                case 1:
                    {
                        __switch_0 = ((271) | 0);
                        continue;
                    }
                case 2:
                    {
                        __switch_0 = ((255) | 0);
                        continue;
                    }
                case 3:
                    {
                        __switch_0 = ((388) | 0);
                        continue;
                    }
                case 4:
                    {
                        __switch_0 = ((389) | 0);
                        continue;
                    }
                case 5:
                    {
                        __switch_0 = ((341) | 0);
                        continue;
                    }
                case 6:
                    {
                        __switch_0 = ((331) | 0);
                        continue;
                    }
                case 7:
                    {
                        __switch_0 = ((329) | 0);
                        continue;
                    }
                case 8:
                    {
                        __switch_0 = ((323) | 0);
                        continue;
                    }
                case 9:
                    {
                        __switch_0 = ((325) | 0);
                        continue;
                    }
                case 10:
                    {
                        __switch_0 = ((326) | 0);
                        continue;
                    }
                case 11:
                    {
                        __switch_0 = ((327) | 0);
                        continue;
                    }
                case 12:
                    {
                        __switch_0 = ((328) | 0);
                        continue;
                    }
                case 13:
                    {
                        __switch_0 = ((330) | 0);
                        continue;
                    }
                case 14:
                    {
                        __switch_0 = ((324) | 0);
                        continue;
                    }
                case 15:
                    {
                        __switch_0 = ((422) | 0);
                        continue;
                    }
                case 16:
                    {
                        __switch_0 = ((345) | 0);
                        continue;
                    }
                case 17:
                    {
                        __switch_0 = ((342) | 0);
                        continue;
                    }
                case 18:
                    {
                        __switch_0 = ((338) | 0);
                        continue;
                    }
                case 19:
                    {
                        __switch_0 = ((332) | 0);
                        continue;
                    }
                case 20:
                    {
                        __switch_0 = ((335) | 0);
                        continue;
                    }
                case 21:
                    {
                        __switch_0 = ((346) | 0);
                        continue;
                    }
                case 22:
                    {
                        __switch_0 = ((296) | 0);
                        continue;
                    }
                case 23:
                    {
                        __switch_0 = ((277) | 0);
                        continue;
                    }
                case 24:
                    {
                        __switch_0 = ((275) | 0);
                        continue;
                    }
                case 25:
                    {
                        __switch_0 = ((291) | 0);
                        continue;
                    }
                case 26:
                    {
                        __switch_0 = ((289) | 0);
                        continue;
                    }
                case 27:
                    {
                        __switch_0 = ((293) | 0);
                        continue;
                    }
                case 28:
                    {
                        __switch_0 = ((279) | 0);
                        continue;
                    }
                case 29:
                    {
                        __switch_0 = ((281) | 0);
                        continue;
                    }
                case 30:
                    {
                        __switch_0 = ((283) | 0);
                        continue;
                    }
                case 31:
                    {
                        __switch_0 = ((285) | 0);
                        continue;
                    }
                case 32:
                    {
                        __switch_0 = ((287) | 0);
                        continue;
                    }
                case 33:
                    {
                        __switch_0 = ((299) | 0);
                        continue;
                    }
                case 34:
                    {
                        __switch_0 = ((303) | 0);
                        continue;
                    }
                case 35:
                    {
                        __switch_0 = ((307) | 0);
                        continue;
                    }
                case 36:
                    {
                        __switch_0 = ((311) | 0);
                        continue;
                    }
                case 37:
                    {
                        __switch_0 = ((315) | 0);
                        continue;
                    }
                case 38:
                    {
                        __switch_0 = ((295) | 0);
                        continue;
                    }
                case 39:
                    {
                        __switch_0 = ((370) | 0);
                        continue;
                    }
                case 40:
                    {
                        __switch_0 = ((463) | 0);
                        continue;
                    }
                case 41:
                    {
                        __switch_0 = ((434) | 0);
                        continue;
                    }
                case 42:
                    {
                        __switch_0 = ((464) | 0);
                        continue;
                    }
                case 43:
                    {
                        __switch_0 = ((450) | 0);
                        continue;
                    }
                case 44:
                    {
                        __switch_0 = ((465) | 0);
                        continue;
                    }
                case 45:
                    {
                        __switch_0 = ((442) | 0);
                        continue;
                    }
                case 46:
                    {
                        __switch_0 = ((466) | 0);
                        continue;
                    }
                case 47:
                    {
                        __switch_0 = ((438) | 0);
                        continue;
                    }
                case 48:
                    {
                        __switch_0 = ((467) | 0);
                        continue;
                    }
                case 49:
                    {
                        __switch_0 = ((446) | 0);
                        continue;
                    }
                case 50:
                    {
                        __switch_0 = ((322) | 0);
                        continue;
                    }
                case 51:
                    {
                        __switch_0 = ((298) | 0);
                        continue;
                    }
                case 52:
                    {
                        __switch_0 = ((320) | 0);
                        continue;
                    }
                case 53:
                    {
                        __switch_0 = ((319) | 0);
                        continue;
                    }
                case 54:
                    {
                        __switch_0 = ((321) | 0);
                        continue;
                    }
                case 55:
                    {
                        __switch_0 = ((257) | 0);
                        continue;
                    }
                case 56:
                    {
                        __switch_0 = ((258) | 0);
                        continue;
                    }
                case 57:
                    {
                        __switch_0 = ((259) | 0);
                        continue;
                    }
                case 58:
                    {
                        __switch_0 = ((260) | 0);
                        continue;
                    }
                case 59:
                    {
                        __switch_0 = ((262) | 0);
                        continue;
                    }
                case 60:
                    {
                        __switch_0 = ((263) | 0);
                        continue;
                    }
                case 61:
                    {
                        __switch_0 = ((264) | 0);
                        continue;
                    }
                case 62:
                    {
                        __switch_0 = ((265) | 0);
                        continue;
                    }
                case 63:
                    {
                        __switch_0 = ((267) | 0);
                        continue;
                    }
                case 64:
                    {
                        __switch_0 = ((268) | 0);
                        continue;
                    }
                case 65:
                    {
                        __switch_0 = ((269) | 0);
                        continue;
                    }
                case 66:
                    {
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 67:
                    {
                        __switch_0 = ((272) | 0);
                        continue;
                    }
                case 68:
                    {
                        __switch_0 = ((273) | 0);
                        continue;
                    }
                case 69:
                    {
                        __switch_0 = ((274) | 0);
                        continue;
                    }
                case 70:
                    {
                        __switch_0 = ((276) | 0);
                        continue;
                    }
                case 71:
                    {
                        __switch_0 = ((468) | 0);
                        continue;
                    }
                case 72:
                    {
                        __switch_0 = ((278) | 0);
                        continue;
                    }
                case 73:
                    {
                        __switch_0 = ((469) | 0);
                        continue;
                    }
                case 74:
                    {
                        __switch_0 = ((280) | 0);
                        continue;
                    }
                case 75:
                    {
                        __switch_0 = ((470) | 0);
                        continue;
                    }
                case 76:
                    {
                        __switch_0 = ((282) | 0);
                        continue;
                    }
                case 77:
                    {
                        __switch_0 = ((471) | 0);
                        continue;
                    }
                case 78:
                    {
                        __switch_0 = ((284) | 0);
                        continue;
                    }
                case 79:
                    {
                        __switch_0 = ((472) | 0);
                        continue;
                    }
                case 80:
                    {
                        __switch_0 = ((286) | 0);
                        continue;
                    }
                case 81:
                    {
                        __switch_0 = ((473) | 0);
                        continue;
                    }
                case 82:
                    {
                        __switch_0 = ((288) | 0);
                        continue;
                    }
                case 83:
                    {
                        __switch_0 = ((474) | 0);
                        continue;
                    }
                case 84:
                    {
                        __switch_0 = ((290) | 0);
                        continue;
                    }
                case 85:
                    {
                        __switch_0 = ((475) | 0);
                        continue;
                    }
                case 86:
                    {
                        __switch_0 = ((292) | 0);
                        continue;
                    }
                case 87:
                    {
                        __switch_0 = ((476) | 0);
                        continue;
                    }
                case 88:
                    {
                        __switch_0 = ((294) | 0);
                        continue;
                    }
                case 89:
                    {
                        __switch_0 = ((477) | 0);
                        continue;
                    }
                case 90:
                    {
                        __switch_0 = ((478) | 0);
                        continue;
                    }
                case 91:
                    {
                        __switch_0 = ((297) | 0);
                        continue;
                    }
                case 92:
                    {
                        __switch_0 = ((479) | 0);
                        continue;
                    }
                case 93:
                    {
                        __switch_0 = ((480) | 0);
                        continue;
                    }
                case 94:
                    {
                        __switch_0 = ((300) | 0);
                        continue;
                    }
                case 95:
                    {
                        __switch_0 = ((301) | 0);
                        continue;
                    }
                case 96:
                    {
                        __switch_0 = ((481) | 0);
                        continue;
                    }
                case 97:
                    {
                        __switch_0 = ((302) | 0);
                        continue;
                    }
                case 98:
                    {
                        __switch_0 = ((304) | 0);
                        continue;
                    }
                case 99:
                    {
                        __switch_0 = ((305) | 0);
                        continue;
                    }
                case 100:
                    {
                        __switch_0 = ((482) | 0);
                        continue;
                    }
                case 101:
                    {
                        __switch_0 = ((306) | 0);
                        continue;
                    }
                case 102:
                    {
                        __switch_0 = ((308) | 0);
                        continue;
                    }
                case 103:
                    {
                        __switch_0 = ((309) | 0);
                        continue;
                    }
                case 104:
                    {
                        __switch_0 = ((483) | 0);
                        continue;
                    }
                case 105:
                    {
                        __switch_0 = ((310) | 0);
                        continue;
                    }
                case 106:
                    {
                        __switch_0 = ((312) | 0);
                        continue;
                    }
                case 107:
                    {
                        __switch_0 = ((313) | 0);
                        continue;
                    }
                case 108:
                    {
                        __switch_0 = ((484) | 0);
                        continue;
                    }
                case 109:
                    {
                        __switch_0 = ((314) | 0);
                        continue;
                    }
                case 110:
                    {
                        __switch_0 = ((316) | 0);
                        continue;
                    }
                case 111:
                    {
                        __switch_0 = ((317) | 0);
                        continue;
                    }
                case 112:
                    {
                        __switch_0 = ((485) | 0);
                        continue;
                    }
                case 113:
                    {
                        __switch_0 = ((318) | 0);
                        continue;
                    }
                case 114:
                    {
                        __switch_0 = ((486) | 0);
                        continue;
                    }
                case 115:
                    {
                        __switch_0 = ((487) | 0);
                        continue;
                    }
                case 116:
                    {
                        __switch_0 = ((488) | 0);
                        continue;
                    }
                case 117:
                    {
                        __switch_0 = ((489) | 0);
                        continue;
                    }
                case 118:
                    {
                        __switch_0 = ((490) | 0);
                        continue;
                    }
                case 119:
                    {
                        __switch_0 = ((333) | 0);
                        continue;
                    }
                case 120:
                    {
                        __switch_0 = ((334) | 0);
                        continue;
                    }
                case 121:
                    {
                        __switch_0 = ((491) | 0);
                        continue;
                    }
                case 122:
                    {
                        __switch_0 = ((336) | 0);
                        continue;
                    }
                case 123:
                    {
                        __switch_0 = ((337) | 0);
                        continue;
                    }
                case 124:
                    {
                        __switch_0 = ((492) | 0);
                        continue;
                    }
                case 125:
                    {
                        __switch_0 = ((339) | 0);
                        continue;
                    }
                case 126:
                    {
                        __switch_0 = ((340) | 0);
                        continue;
                    }
                case 127:
                    {
                        __switch_0 = ((493) | 0);
                        continue;
                    }
                case 128:
                    {
                        __switch_0 = ((343) | 0);
                        continue;
                    }
                case 129:
                    {
                        __switch_0 = ((344) | 0);
                        continue;
                    }
                case 130:
                    {
                        __switch_0 = ((347) | 0);
                        continue;
                    }
                case 131:
                    {
                        __switch_0 = ((348) | 0);
                        continue;
                    }
                case 132:
                    {
                        __switch_0 = ((494) | 0);
                        continue;
                    }
                case 133:
                    {
                        __switch_0 = ((351) | 0);
                        continue;
                    }
                case 134:
                    {
                        __switch_0 = ((495) | 0);
                        continue;
                    }
                case 135:
                    {
                        __switch_0 = ((496) | 0);
                        continue;
                    }
                case 136:
                    {
                        __switch_0 = ((497) | 0);
                        continue;
                    }
                case 137:
                    {
                        __switch_0 = ((498) | 0);
                        continue;
                    }
                case 138:
                    {
                        __switch_0 = ((499) | 0);
                        continue;
                    }
                case 139:
                    {
                        __switch_0 = ((357) | 0);
                        continue;
                    }
                case 140:
                    {
                        __switch_0 = ((358) | 0);
                        continue;
                    }
                case 141:
                    {
                        __switch_0 = ((360) | 0);
                        continue;
                    }
                case 142:
                    {
                        __switch_0 = ((361) | 0);
                        continue;
                    }
                case 143:
                    {
                        __switch_0 = ((362) | 0);
                        continue;
                    }
                case 144:
                    {
                        __switch_0 = ((500) | 0);
                        continue;
                    }
                case 145:
                    {
                        __switch_0 = ((364) | 0);
                        continue;
                    }
                case 146:
                    {
                        __switch_0 = ((365) | 0);
                        continue;
                    }
                case 147:
                    {
                        __switch_0 = ((367) | 0);
                        continue;
                    }
                case 148:
                    {
                        __switch_0 = ((368) | 0);
                        continue;
                    }
                case 149:
                    {
                        __switch_0 = ((369) | 0);
                        continue;
                    }
                case 150:
                    {
                        __switch_0 = ((371) | 0);
                        continue;
                    }
                case 151:
                    {
                        __switch_0 = ((372) | 0);
                        continue;
                    }
                case 152:
                    {
                        __switch_0 = ((374) | 0);
                        continue;
                    }
                case 153:
                    {
                        __switch_0 = ((375) | 0);
                        continue;
                    }
                case 154:
                    {
                        __switch_0 = ((501) | 0);
                        continue;
                    }
                case 155:
                    {
                        __switch_0 = ((502) | 0);
                        continue;
                    }
                case 156:
                    {
                        __switch_0 = ((503) | 0);
                        continue;
                    }
                case 157:
                    {
                        __switch_0 = ((379) | 0);
                        continue;
                    }
                case 158:
                    {
                        __switch_0 = ((381) | 0);
                        continue;
                    }
                case 159:
                    {
                        __switch_0 = ((382) | 0);
                        continue;
                    }
                case 160:
                    {
                        __switch_0 = ((384) | 0);
                        continue;
                    }
                case 161:
                    {
                        __switch_0 = ((385) | 0);
                        continue;
                    }
                case 162:
                    {
                        __switch_0 = ((386) | 0);
                        continue;
                    }
                case 163:
                    {
                        __switch_0 = ((387) | 0);
                        continue;
                    }
                case 164:
                    {
                        __switch_0 = ((504) | 0);
                        continue;
                    }
                case 165:
                    {
                        __switch_0 = ((391) | 0);
                        continue;
                    }
                case 166:
                    {
                        __switch_0 = ((392) | 0);
                        continue;
                    }
                case 167:
                    {
                        __switch_0 = ((505) | 0);
                        continue;
                    }
                case 168:
                    {
                        __switch_0 = ((394) | 0);
                        continue;
                    }
                case 169:
                    {
                        __switch_0 = ((395) | 0);
                        continue;
                    }
                case 170:
                    {
                        __switch_0 = ((397) | 0);
                        continue;
                    }
                case 171:
                    {
                        __switch_0 = ((398) | 0);
                        continue;
                    }
                case 172:
                    {
                        __switch_0 = ((506) | 0);
                        continue;
                    }
                case 173:
                    {
                        __switch_0 = ((400) | 0);
                        continue;
                    }
                case 174:
                    {
                        __switch_0 = ((401) | 0);
                        continue;
                    }
                case 175:
                    {
                        __switch_0 = ((403) | 0);
                        continue;
                    }
                case 176:
                    {
                        __switch_0 = ((404) | 0);
                        continue;
                    }
                case 177:
                    {
                        __switch_0 = ((405) | 0);
                        continue;
                    }
                case 178:
                    {
                        __switch_0 = ((409) | 0);
                        continue;
                    }
                case 179:
                    {
                        __switch_0 = ((410) | 0);
                        continue;
                    }
                case 180:
                    {
                        __switch_0 = ((411) | 0);
                        continue;
                    }
                case 181:
                    {
                        __switch_0 = ((413) | 0);
                        continue;
                    }
                case 182:
                    {
                        __switch_0 = ((507) | 0);
                        continue;
                    }
                case 183:
                    {
                        __switch_0 = ((415) | 0);
                        continue;
                    }
                case 184:
                    {
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 185:
                    {
                        __switch_0 = ((508) | 0);
                        continue;
                    }
                case 186:
                    {
                        __switch_0 = ((509) | 0);
                        continue;
                    }
                case 187:
                    {
                        __switch_0 = ((510) | 0);
                        continue;
                    }
                case 188:
                    {
                        __switch_0 = ((511) | 0);
                        continue;
                    }
                case 189:
                    {
                        __switch_0 = ((512) | 0);
                        continue;
                    }
                case 190:
                    {
                        __switch_0 = ((513) | 0);
                        continue;
                    }
                case 191:
                    {
                        __switch_0 = ((514) | 0);
                        continue;
                    }
                case 192:
                    {
                        __switch_0 = ((515) | 0);
                        continue;
                    }
                case 193:
                    {
                        __switch_0 = ((516) | 0);
                        continue;
                    }
                case 194:
                    {
                        __switch_0 = ((517) | 0);
                        continue;
                    }
                case 195:
                    {
                        __switch_0 = ((518) | 0);
                        continue;
                    }
                case 196:
                    {
                        __switch_0 = ((519) | 0);
                        continue;
                    }
                case 197:
                    {
                        __switch_0 = ((520) | 0);
                        continue;
                    }
                case 198:
                    {
                        __switch_0 = ((521) | 0);
                        continue;
                    }
                case 199:
                    {
                        __switch_0 = ((522) | 0);
                        continue;
                    }
                case 200:
                    {
                        __switch_0 = ((523) | 0);
                        continue;
                    }
                case 201:
                    {
                        __switch_0 = ((524) | 0);
                        continue;
                    }
                case 202:
                    {
                        __switch_0 = ((525) | 0);
                        continue;
                    }
                case 203:
                    {
                        __switch_0 = ((526) | 0);
                        continue;
                    }
                case 204:
                    {
                        __switch_0 = ((527) | 0);
                        continue;
                    }
                case 205:
                    {
                        __switch_0 = ((528) | 0);
                        continue;
                    }
                case 206:
                    {
                        __switch_0 = ((529) | 0);
                        continue;
                    }
                case 207:
                    {
                        __switch_0 = ((530) | 0);
                        continue;
                    }
                case 208:
                    {
                        __switch_0 = ((531) | 0);
                        continue;
                    }
                case 209:
                    {
                        __switch_0 = ((532) | 0);
                        continue;
                    }
                case 210:
                    {
                        __switch_0 = ((420) | 0);
                        continue;
                    }
                case 211:
                    {
                        __switch_0 = ((533) | 0);
                        continue;
                    }
                case 212:
                    {
                        __switch_0 = ((534) | 0);
                        continue;
                    }
                case 213:
                    {
                        __switch_0 = ((535) | 0);
                        continue;
                    }
                case 214:
                    {
                        __switch_0 = ((536) | 0);
                        continue;
                    }
                case 215:
                    {
                        __switch_0 = ((537) | 0);
                        continue;
                    }
                case 216:
                    {
                        __switch_0 = ((538) | 0);
                        continue;
                    }
                case 217:
                    {
                        __switch_0 = ((539) | 0);
                        continue;
                    }
                case 218:
                    {
                        __switch_0 = ((540) | 0);
                        continue;
                    }
                case 219:
                    {
                        __switch_0 = ((425) | 0);
                        continue;
                    }
                case 220:
                    {
                        __switch_0 = ((426) | 0);
                        continue;
                    }
                case 221:
                    {
                        __switch_0 = ((541) | 0);
                        continue;
                    }
                case 222:
                    {
                        __switch_0 = ((542) | 0);
                        continue;
                    }
                case 223:
                    {
                        __switch_0 = ((543) | 0);
                        continue;
                    }
                case 224:
                    {
                        __switch_0 = ((544) | 0);
                        continue;
                    }
                case 225:
                    {
                        __switch_0 = ((545) | 0);
                        continue;
                    }
                case 226:
                    {
                        __switch_0 = ((546) | 0);
                        continue;
                    }
                case 227:
                    {
                        __switch_0 = ((547) | 0);
                        continue;
                    }
                case 228:
                    {
                        __switch_0 = ((431) | 0);
                        continue;
                    }
                case 229:
                    {
                        __switch_0 = ((433) | 0);
                        continue;
                    }
                case 230:
                    {
                        __switch_0 = ((435) | 0);
                        continue;
                    }
                case 231:
                    {
                        __switch_0 = ((436) | 0);
                        continue;
                    }
                case 232:
                    {
                        __switch_0 = ((548) | 0);
                        continue;
                    }
                case 233:
                    {
                        __switch_0 = ((437) | 0);
                        continue;
                    }
                case 234:
                    {
                        __switch_0 = ((439) | 0);
                        continue;
                    }
                case 235:
                    {
                        __switch_0 = ((440) | 0);
                        continue;
                    }
                case 236:
                    {
                        __switch_0 = ((549) | 0);
                        continue;
                    }
                case 237:
                    {
                        __switch_0 = ((441) | 0);
                        continue;
                    }
                case 238:
                    {
                        __switch_0 = ((443) | 0);
                        continue;
                    }
                case 239:
                    {
                        __switch_0 = ((444) | 0);
                        continue;
                    }
                case 240:
                    {
                        __switch_0 = ((550) | 0);
                        continue;
                    }
                case 241:
                    {
                        __switch_0 = ((445) | 0);
                        continue;
                    }
                case 242:
                    {
                        __switch_0 = ((447) | 0);
                        continue;
                    }
                case 243:
                    {
                        __switch_0 = ((448) | 0);
                        continue;
                    }
                case 244:
                    {
                        __switch_0 = ((551) | 0);
                        continue;
                    }
                case 245:
                    {
                        __switch_0 = ((449) | 0);
                        continue;
                    }
                case 246:
                    {
                        __switch_0 = ((451) | 0);
                        continue;
                    }
                case 247:
                    {
                        __switch_0 = ((452) | 0);
                        continue;
                    }
                case 248:
                    {
                        __switch_0 = ((552) | 0);
                        continue;
                    }
                case 249:
                    {
                        __switch_0 = ((453) | 0);
                        continue;
                    }
                case 250:
                    {
                        __switch_0 = ((455) | 0);
                        continue;
                    }
                case 251:
                    {
                        __switch_0 = ((457) | 0);
                        continue;
                    }
                case 252:
                    {
                        __switch_0 = ((458) | 0);
                        continue;
                    }
                case 253:
                    {
                        __switch_0 = ((459) | 0);
                        continue;
                    }
                default:
                    {
                        (__L0 ? __L0("Unexpected state") : runtime.macro("fatalerror", "Unexpected state"));
                        break;
                    }
                case 254:
                    {
                        switch (method_get_pending_interrupt(runtime)) {
                            case 65532:
                                {
                                    __switch_0 = ((256) | 0);
                                    continue;
                                }
                            case 65526:
                                {
                                    __switch_0 = ((261) | 0);
                                    continue;
                                }
                            case 65528:
                                {
                                    __switch_0 = ((266) | 0);
                                    continue;
                                }
                        }
                        (h_m_ppc.w = (h_m_pc).w);
                        /* debugger_instruction_hook: no effect */
                        members.m_opcode = ((method_read_opcode__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 2);
                            return;
                        }
                    }
                case 255:
                    {
                        __switch_0_selected_0 = (((members.m_opcode ?? 0)) | 0);
                        if ((((__switch_0_selected_0) === (8)) ? 1 : 0)) {
                            __switch_0 = ((553) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (9)) ? 1 : 0)) {
                            __switch_0 = ((554) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (10)) ? 1 : 0)) {
                            __switch_0 = ((555) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (11)) ? 1 : 0)) {
                            __switch_0 = ((556) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (12)) ? 1 : 0)) {
                            __switch_0 = ((557) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (13)) ? 1 : 0)) {
                            __switch_0 = ((558) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (14)) ? 1 : 0)) {
                            __switch_0 = ((559) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (15)) ? 1 : 0)) {
                            __switch_0 = ((560) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (16)) ? 1 : 0)) {
                            __switch_0 = ((561) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (17)) ? 1 : 0)) {
                            __switch_0 = ((562) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (18)) ? 1 : 0)) {
                            __switch_0 = ((563) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (19)) ? 1 : 0)) {
                            __switch_0 = ((564) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (20)) ? 1 : 0)) {
                            __switch_0 = ((565) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (21)) ? 1 : 0)) {
                            __switch_0 = ((566) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (22)) ? 1 : 0)) {
                            __switch_0 = ((567) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (23)) ? 1 : 0)) {
                            __switch_0 = ((568) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (24)) ? 1 : 0)) {
                            __switch_0 = ((569) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (25)) ? 1 : 0)) {
                            __switch_0 = ((570) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (26)) ? 1 : 0)) {
                            __switch_0 = ((571) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (27)) ? 1 : 0)) {
                            __switch_0 = ((572) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (28)) ? 1 : 0)) {
                            __switch_0 = ((573) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (29)) ? 1 : 0)) {
                            __switch_0 = ((574) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (30)) ? 1 : 0)) {
                            __switch_0 = ((575) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (31)) ? 1 : 0)) {
                            __switch_0 = ((576) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (32)) ? 1 : 0)) {
                            __switch_0 = ((577) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (33)) ? 1 : 0)) {
                            __switch_0 = ((578) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (34)) ? 1 : 0)) {
                            __switch_0 = ((579) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (35)) ? 1 : 0)) {
                            __switch_0 = ((580) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (36)) ? 1 : 0)) {
                            __switch_0 = ((581) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (37)) ? 1 : 0)) {
                            __switch_0 = ((582) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (38)) ? 1 : 0)) {
                            __switch_0 = ((583) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (39)) ? 1 : 0)) {
                            __switch_0 = ((584) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (40)) ? 1 : 0)) {
                            __switch_0 = ((585) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (41)) ? 1 : 0)) {
                            __switch_0 = ((586) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (42)) ? 1 : 0)) {
                            __switch_0 = ((587) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (43)) ? 1 : 0)) {
                            __switch_0 = ((588) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (44)) ? 1 : 0)) {
                            __switch_0 = ((589) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (45)) ? 1 : 0)) {
                            __switch_0 = ((590) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (46)) ? 1 : 0)) {
                            __switch_0 = ((591) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (47)) ? 1 : 0)) {
                            __switch_0 = ((592) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (48)) ? 1 : 0)) {
                            __switch_0 = ((593) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (49)) ? 1 : 0)) {
                            __switch_0 = ((594) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (50)) ? 1 : 0)) {
                            __switch_0 = ((595) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (51)) ? 1 : 0)) {
                            __switch_0 = ((596) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (52)) ? 1 : 0)) {
                            __switch_0 = ((597) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (53)) ? 1 : 0)) {
                            __switch_0 = ((598) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (54)) ? 1 : 0)) {
                            __switch_0 = ((599) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (55)) ? 1 : 0)) {
                            __switch_0 = ((600) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (56)) ? 1 : 0)) {
                            __switch_0 = ((601) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (57)) ? 1 : 0)) {
                            __switch_0 = ((602) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (58)) ? 1 : 0)) {
                            __switch_0 = ((603) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (59)) ? 1 : 0)) {
                            __switch_0 = ((604) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (60)) ? 1 : 0)) {
                            __switch_0 = ((605) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (61)) ? 1 : 0)) {
                            __switch_0 = ((606) | 0);
                            continue;
                        }
                        if (((((((__switch_0_selected_0) === (62)) ? 1 : 0)) || ((((__switch_0_selected_0) === (63)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((607) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (64)) ? 1 : 0)) {
                            __switch_0 = ((608) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (65)) ? 1 : 0)) {
                            __switch_0 = ((609) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (66)) ? 1 : 0)) {
                            __switch_0 = ((610) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (67)) ? 1 : 0)) {
                            __switch_0 = ((611) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (68)) ? 1 : 0)) {
                            __switch_0 = ((612) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (69)) ? 1 : 0)) {
                            __switch_0 = ((613) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (70)) ? 1 : 0)) {
                            __switch_0 = ((614) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (71)) ? 1 : 0)) {
                            __switch_0 = ((615) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (72)) ? 1 : 0)) {
                            __switch_0 = ((616) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (73)) ? 1 : 0)) {
                            __switch_0 = ((617) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (74)) ? 1 : 0)) {
                            __switch_0 = ((618) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (75)) ? 1 : 0)) {
                            __switch_0 = ((619) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (76)) ? 1 : 0)) {
                            __switch_0 = ((620) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (77)) ? 1 : 0)) {
                            __switch_0 = ((621) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (78)) ? 1 : 0)) {
                            __switch_0 = ((622) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (79)) ? 1 : 0)) {
                            __switch_0 = ((623) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (80)) ? 1 : 0)) {
                            __switch_0 = ((624) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (81)) ? 1 : 0)) {
                            __switch_0 = ((625) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (82)) ? 1 : 0)) {
                            __switch_0 = ((626) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (83)) ? 1 : 0)) {
                            __switch_0 = ((627) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (84)) ? 1 : 0)) {
                            __switch_0 = ((628) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (85)) ? 1 : 0)) {
                            __switch_0 = ((629) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (86)) ? 1 : 0)) {
                            __switch_0 = ((630) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (87)) ? 1 : 0)) {
                            __switch_0 = ((631) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (88)) ? 1 : 0)) {
                            __switch_0 = ((632) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (89)) ? 1 : 0)) {
                            __switch_0 = ((633) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (90)) ? 1 : 0)) {
                            __switch_0 = ((634) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (91)) ? 1 : 0)) {
                            __switch_0 = ((635) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (92)) ? 1 : 0)) {
                            __switch_0 = ((636) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (96)) ? 1 : 0)) {
                            __switch_0 = ((637) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (97)) ? 1 : 0)) {
                            __switch_0 = ((638) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (98)) ? 1 : 0)) {
                            __switch_0 = ((639) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (99)) ? 1 : 0)) {
                            __switch_0 = ((640) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (100)) ? 1 : 0)) {
                            __switch_0 = ((641) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (101)) ? 1 : 0)) {
                            __switch_0 = ((642) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (102)) ? 1 : 0)) {
                            __switch_0 = ((643) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (103)) ? 1 : 0)) {
                            __switch_0 = ((644) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (104)) ? 1 : 0)) {
                            __switch_0 = ((645) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (105)) ? 1 : 0)) {
                            __switch_0 = ((646) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (106)) ? 1 : 0)) {
                            __switch_0 = ((647) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (107)) ? 1 : 0)) {
                            __switch_0 = ((648) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (108)) ? 1 : 0)) {
                            __switch_0 = ((649) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (109)) ? 1 : 0)) {
                            __switch_0 = ((650) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (110)) ? 1 : 0)) {
                            __switch_0 = ((651) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (111)) ? 1 : 0)) {
                            __switch_0 = ((652) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (112)) ? 1 : 0)) {
                            __switch_0 = ((653) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (113)) ? 1 : 0)) {
                            __switch_0 = ((654) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (114)) ? 1 : 0)) {
                            __switch_0 = ((655) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (115)) ? 1 : 0)) {
                            __switch_0 = ((656) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (116)) ? 1 : 0)) {
                            __switch_0 = ((657) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (117)) ? 1 : 0)) {
                            __switch_0 = ((658) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (118)) ? 1 : 0)) {
                            __switch_0 = ((659) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (119)) ? 1 : 0)) {
                            __switch_0 = ((660) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (120)) ? 1 : 0)) {
                            __switch_0 = ((661) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (121)) ? 1 : 0)) {
                            __switch_0 = ((662) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (122)) ? 1 : 0)) {
                            __switch_0 = ((663) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (123)) ? 1 : 0)) {
                            __switch_0 = ((664) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (124)) ? 1 : 0)) {
                            __switch_0 = ((665) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (125)) ? 1 : 0)) {
                            __switch_0 = ((666) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (126)) ? 1 : 0)) {
                            __switch_0 = ((667) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (127)) ? 1 : 0)) {
                            __switch_0 = ((668) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (128)) ? 1 : 0)) {
                            __switch_0 = ((669) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (129)) ? 1 : 0)) {
                            __switch_0 = ((670) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (130)) ? 1 : 0)) {
                            __switch_0 = ((671) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (131)) ? 1 : 0)) {
                            __switch_0 = ((672) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (132)) ? 1 : 0)) {
                            __switch_0 = ((673) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (133)) ? 1 : 0)) {
                            __switch_0 = ((674) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (134)) ? 1 : 0)) {
                            __switch_0 = ((675) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (135)) ? 1 : 0)) {
                            __switch_0 = ((676) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (136)) ? 1 : 0)) {
                            __switch_0 = ((677) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (137)) ? 1 : 0)) {
                            __switch_0 = ((678) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (138)) ? 1 : 0)) {
                            __switch_0 = ((679) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (139)) ? 1 : 0)) {
                            __switch_0 = ((680) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (140)) ? 1 : 0)) {
                            __switch_0 = ((681) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (141)) ? 1 : 0)) {
                            __switch_0 = ((682) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (142)) ? 1 : 0)) {
                            __switch_0 = ((683) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (143)) ? 1 : 0)) {
                            __switch_0 = ((684) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (144)) ? 1 : 0)) {
                            __switch_0 = ((685) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (145)) ? 1 : 0)) {
                            __switch_0 = ((686) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (146)) ? 1 : 0)) {
                            __switch_0 = ((687) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (147)) ? 1 : 0)) {
                            __switch_0 = ((688) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (148)) ? 1 : 0)) {
                            __switch_0 = ((689) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (149)) ? 1 : 0)) {
                            __switch_0 = ((690) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (150)) ? 1 : 0)) {
                            __switch_0 = ((691) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (151)) ? 1 : 0)) {
                            __switch_0 = ((692) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (152)) ? 1 : 0)) {
                            __switch_0 = ((693) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (153)) ? 1 : 0)) {
                            __switch_0 = ((694) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (154)) ? 1 : 0)) {
                            __switch_0 = ((695) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (155)) ? 1 : 0)) {
                            __switch_0 = ((696) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (156)) ? 1 : 0)) {
                            __switch_0 = ((697) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (157)) ? 1 : 0)) {
                            __switch_0 = ((698) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (158)) ? 1 : 0)) {
                            __switch_0 = ((699) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (159)) ? 1 : 0)) {
                            __switch_0 = ((700) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (160)) ? 1 : 0)) {
                            __switch_0 = ((701) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (161)) ? 1 : 0)) {
                            __switch_0 = ((702) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (162)) ? 1 : 0)) {
                            __switch_0 = ((703) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (163)) ? 1 : 0)) {
                            __switch_0 = ((704) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (164)) ? 1 : 0)) {
                            __switch_0 = ((705) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (165)) ? 1 : 0)) {
                            __switch_0 = ((706) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (166)) ? 1 : 0)) {
                            __switch_0 = ((707) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (167)) ? 1 : 0)) {
                            __switch_0 = ((708) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (168)) ? 1 : 0)) {
                            __switch_0 = ((709) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (169)) ? 1 : 0)) {
                            __switch_0 = ((710) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (170)) ? 1 : 0)) {
                            __switch_0 = ((711) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (171)) ? 1 : 0)) {
                            __switch_0 = ((712) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (172)) ? 1 : 0)) {
                            __switch_0 = ((713) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (173)) ? 1 : 0)) {
                            __switch_0 = ((714) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (174)) ? 1 : 0)) {
                            __switch_0 = ((715) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (176)) ? 1 : 0)) {
                            __switch_0 = ((716) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (177)) ? 1 : 0)) {
                            __switch_0 = ((717) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (178)) ? 1 : 0)) {
                            __switch_0 = ((718) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (179)) ? 1 : 0)) {
                            __switch_0 = ((719) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (180)) ? 1 : 0)) {
                            __switch_0 = ((720) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (181)) ? 1 : 0)) {
                            __switch_0 = ((721) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (182)) ? 1 : 0)) {
                            __switch_0 = ((722) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (183)) ? 1 : 0)) {
                            __switch_0 = ((723) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (184)) ? 1 : 0)) {
                            __switch_0 = ((724) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (185)) ? 1 : 0)) {
                            __switch_0 = ((725) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (186)) ? 1 : 0)) {
                            __switch_0 = ((726) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (187)) ? 1 : 0)) {
                            __switch_0 = ((727) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (188)) ? 1 : 0)) {
                            __switch_0 = ((728) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (189)) ? 1 : 0)) {
                            __switch_0 = ((729) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (190)) ? 1 : 0)) {
                            __switch_0 = ((730) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (191)) ? 1 : 0)) {
                            __switch_0 = ((731) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (192)) ? 1 : 0)) {
                            __switch_0 = ((732) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (193)) ? 1 : 0)) {
                            __switch_0 = ((733) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (194)) ? 1 : 0)) {
                            __switch_0 = ((734) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (195)) ? 1 : 0)) {
                            __switch_0 = ((735) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (196)) ? 1 : 0)) {
                            __switch_0 = ((736) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (197)) ? 1 : 0)) {
                            __switch_0 = ((737) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (198)) ? 1 : 0)) {
                            __switch_0 = ((738) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (199)) ? 1 : 0)) {
                            __switch_0 = ((739) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (200)) ? 1 : 0)) {
                            __switch_0 = ((740) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (201)) ? 1 : 0)) {
                            __switch_0 = ((741) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (202)) ? 1 : 0)) {
                            __switch_0 = ((742) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (203)) ? 1 : 0)) {
                            __switch_0 = ((743) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (204)) ? 1 : 0)) {
                            __switch_0 = ((744) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (205)) ? 1 : 0)) {
                            __switch_0 = ((745) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (206)) ? 1 : 0)) {
                            __switch_0 = ((746) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (207)) ? 1 : 0)) {
                            __switch_0 = ((747) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_0) === (208)) ? 1 : 0)) {
                            __switch_0 = ((748) | 0);
                            continue;
                        }
                        __switch_0 = ((749) | 0);
                        continue;
                    }
                case 553:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                        method_push_state(runtime, 3);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 554:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                        method_push_state(runtime, 3);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 555:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        method_push_state(runtime, 4);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 556:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        method_push_state(runtime, 4);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 557:
                    {
                        __switch_0 = ((390) | 0);
                        continue;
                    }
                case 558:
                    {
                        __switch_0 = ((396) | 0);
                        continue;
                    }
                case 559:
                    {
                        __switch_0 = ((393) | 0);
                        continue;
                    }
                case 560:
                    {
                        __switch_0 = ((399) | 0);
                        continue;
                    }
                case 561:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((341) | 0);
                        continue;
                    }
                case 562:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((341) | 0);
                        continue;
                    }
                case 563:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 5);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 564:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 5);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 565:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((331) | 0);
                        continue;
                    }
                case 566:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((331) | 0);
                        continue;
                    }
                case 567:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 6);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 568:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 6);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 569:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((329) | 0);
                        continue;
                    }
                case 570:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((329) | 0);
                        continue;
                    }
                case 571:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 7);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 572:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 7);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 573:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((323) | 0);
                        continue;
                    }
                case 574:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((323) | 0);
                        continue;
                    }
                case 575:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 8);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 576:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 8);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 577:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((325) | 0);
                        continue;
                    }
                case 578:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((325) | 0);
                        continue;
                    }
                case 579:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 9);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 580:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 9);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 581:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((326) | 0);
                        continue;
                    }
                case 582:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((326) | 0);
                        continue;
                    }
                case 583:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 10);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 584:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 10);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 585:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((327) | 0);
                        continue;
                    }
                case 586:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((327) | 0);
                        continue;
                    }
                case 587:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 11);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 588:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 11);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 589:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((328) | 0);
                        continue;
                    }
                case 590:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((328) | 0);
                        continue;
                    }
                case 591:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 12);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 592:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 12);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 593:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((330) | 0);
                        continue;
                    }
                case 594:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((330) | 0);
                        continue;
                    }
                case 595:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 13);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 596:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 13);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 597:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_set_imm(runtime);
                        __switch_0 = ((324) | 0);
                        continue;
                    }
                case 598:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_set_imm(runtime);
                        __switch_0 = ((324) | 0);
                        continue;
                    }
                case 599:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 14);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 600:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 14);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 601:
                    {
                        method_set_imm(runtime);
                        __switch_0 = ((422) | 0);
                        continue;
                    }
                case 602:
                    {
                        method_push_state(runtime, 15);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 603:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                        method_push_state(runtime, 16);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 604:
                    {
                        method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                        method_push_state(runtime, 16);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 605:
                    {
                        method_set_imm(runtime);
                        __switch_0 = ((354) | 0);
                        continue;
                    }
                case 606:
                    {
                        method_set_imm(runtime);
                        __switch_0 = ((353) | 0);
                        continue;
                    }
                case 607:
                    {
                        __switch_0 = ((421) | 0);
                        continue;
                    }
                case 608:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                        method_set_imm(runtime);
                        __switch_0 = ((342) | 0);
                        continue;
                    }
                case 609:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                        method_push_state(runtime, 17);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 610:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                        method_set_imm(runtime);
                        __switch_0 = ((342) | 0);
                        continue;
                    }
                case 611:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                        method_push_state(runtime, 17);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 612:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                        method_set_imm(runtime);
                        __switch_0 = ((342) | 0);
                        continue;
                    }
                case 613:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                        method_push_state(runtime, 17);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 614:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        method_set_imm(runtime);
                        __switch_0 = ((342) | 0);
                        continue;
                    }
                case 615:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        method_push_state(runtime, 17);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 616:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        method_set_imm(runtime);
                        __switch_0 = ((342) | 0);
                        continue;
                    }
                case 617:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        method_push_state(runtime, 17);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 618:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                        method_set_imm(runtime);
                        __switch_0 = ((338) | 0);
                        continue;
                    }
                case 619:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                        method_push_state(runtime, 18);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 620:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                        method_set_imm(runtime);
                        __switch_0 = ((338) | 0);
                        continue;
                    }
                case 621:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                        method_push_state(runtime, 18);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 622:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                        method_set_imm(runtime);
                        __switch_0 = ((338) | 0);
                        continue;
                    }
                case 623:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                        method_push_state(runtime, 18);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 624:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        method_set_imm(runtime);
                        __switch_0 = ((338) | 0);
                        continue;
                    }
                case 625:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        method_push_state(runtime, 18);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 626:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        method_set_imm(runtime);
                        __switch_0 = ((338) | 0);
                        continue;
                    }
                case 627:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        method_push_state(runtime, 18);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 628:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                        method_set_imm(runtime);
                        __switch_0 = ((332) | 0);
                        continue;
                    }
                case 629:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                        method_push_state(runtime, 19);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 630:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                        method_set_imm(runtime);
                        __switch_0 = ((335) | 0);
                        continue;
                    }
                case 631:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                        method_push_state(runtime, 20);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 632:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                        method_push_state(runtime, 21);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 633:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                        method_push_state(runtime, 21);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 634:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                        method_push_state(runtime, 21);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 635:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        method_push_state(runtime, 21);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 636:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        method_push_state(runtime, 21);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 637:
                    {
                        method_set_cond(runtime, 1);
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 638:
                    {
                        method_set_cond(runtime, method_cond_hi(runtime));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 639:
                    {
                        method_set_cond(runtime, method_cond_cc(runtime));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 640:
                    {
                        method_set_cond(runtime, method_cond_ne(runtime));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 641:
                    {
                        method_set_cond(runtime, method_cond_vc(runtime));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 642:
                    {
                        method_set_cond(runtime, method_cond_pl(runtime));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 643:
                    {
                        method_set_cond(runtime, method_cond_ge(runtime));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 644:
                    {
                        method_set_cond(runtime, method_cond_gt(runtime));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 645:
                    {
                        method_set_cond(runtime, 1);
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 646:
                    {
                        method_set_cond(runtime, method_cond_hi(runtime));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 647:
                    {
                        method_set_cond(runtime, method_cond_cc(runtime));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 648:
                    {
                        method_set_cond(runtime, method_cond_ne(runtime));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 649:
                    {
                        method_set_cond(runtime, method_cond_vc(runtime));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 650:
                    {
                        method_set_cond(runtime, method_cond_pl(runtime));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 651:
                    {
                        method_set_cond(runtime, method_cond_ge(runtime));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 652:
                    {
                        method_set_cond(runtime, method_cond_gt(runtime));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 653:
                    {
                        method_set_cond(runtime, 0);
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 654:
                    {
                        method_set_cond(runtime, ((method_cond_hi(runtime)) ? 0 : 1));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 655:
                    {
                        method_set_cond(runtime, ((method_cond_cc(runtime)) ? 0 : 1));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 656:
                    {
                        method_set_cond(runtime, ((method_cond_ne(runtime)) ? 0 : 1));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 657:
                    {
                        method_set_cond(runtime, ((method_cond_vc(runtime)) ? 0 : 1));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 658:
                    {
                        method_set_cond(runtime, ((method_cond_pl(runtime)) ? 0 : 1));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 659:
                    {
                        method_set_cond(runtime, ((method_cond_ge(runtime)) ? 0 : 1));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 660:
                    {
                        method_set_cond(runtime, ((method_cond_gt(runtime)) ? 0 : 1));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 661:
                    {
                        method_set_cond(runtime, 0);
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 662:
                    {
                        method_set_cond(runtime, ((method_cond_hi(runtime)) ? 0 : 1));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 663:
                    {
                        method_set_cond(runtime, ((method_cond_cc(runtime)) ? 0 : 1));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 664:
                    {
                        method_set_cond(runtime, ((method_cond_ne(runtime)) ? 0 : 1));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 665:
                    {
                        method_set_cond(runtime, ((method_cond_vc(runtime)) ? 0 : 1));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 666:
                    {
                        method_set_cond(runtime, ((method_cond_pl(runtime)) ? 0 : 1));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 667:
                    {
                        method_set_cond(runtime, ((method_cond_ge(runtime)) ? 0 : 1));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 668:
                    {
                        method_set_cond(runtime, ((method_cond_gt(runtime)) ? 0 : 1));
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 669:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((296) | 0);
                        continue;
                    }
                case 670:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((296) | 0);
                        continue;
                    }
                case 671:
                    {
                        method_push_state(runtime, 22);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 672:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((277) | 0);
                        continue;
                    }
                case 673:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((277) | 0);
                        continue;
                    }
                case 674:
                    {
                        method_push_state(runtime, 23);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 675:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((275) | 0);
                        continue;
                    }
                case 676:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((275) | 0);
                        continue;
                    }
                case 677:
                    {
                        method_push_state(runtime, 24);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 678:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((291) | 0);
                        continue;
                    }
                case 679:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((291) | 0);
                        continue;
                    }
                case 680:
                    {
                        method_push_state(runtime, 25);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 681:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((289) | 0);
                        continue;
                    }
                case 682:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((289) | 0);
                        continue;
                    }
                case 683:
                    {
                        method_push_state(runtime, 26);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 684:
                    {
                        __switch_0 = ((376) | 0);
                        continue;
                    }
                case 685:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((293) | 0);
                        continue;
                    }
                case 686:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((293) | 0);
                        continue;
                    }
                case 687:
                    {
                        method_push_state(runtime, 27);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 688:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((279) | 0);
                        continue;
                    }
                case 689:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((279) | 0);
                        continue;
                    }
                case 690:
                    {
                        method_push_state(runtime, 28);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 691:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((281) | 0);
                        continue;
                    }
                case 692:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((281) | 0);
                        continue;
                    }
                case 693:
                    {
                        method_push_state(runtime, 29);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 694:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((283) | 0);
                        continue;
                    }
                case 695:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((283) | 0);
                        continue;
                    }
                case 696:
                    {
                        method_push_state(runtime, 30);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 697:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((285) | 0);
                        continue;
                    }
                case 698:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((285) | 0);
                        continue;
                    }
                case 699:
                    {
                        method_push_state(runtime, 31);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 700:
                    {
                        __switch_0 = ((380) | 0);
                        continue;
                    }
                case 701:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((287) | 0);
                        continue;
                    }
                case 702:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((287) | 0);
                        continue;
                    }
                case 703:
                    {
                        method_push_state(runtime, 32);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 704:
                    {
                        method_push_state(runtime, 33);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 705:
                    {
                        method_push_state(runtime, 34);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 706:
                    {
                        method_push_state(runtime, 35);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 707:
                    {
                        method_push_state(runtime, 36);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 708:
                    {
                        method_push_state(runtime, 37);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 709:
                    {
                        method_push_state(runtime, 38);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 710:
                    {
                        method_push_state(runtime, 39);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 711:
                    {
                        __switch_0 = ((363) | 0);
                        continue;
                    }
                case 712:
                    {
                        __switch_0 = ((366) | 0);
                        continue;
                    }
                case 713:
                    {
                        __switch_0 = ((430) | 0);
                        continue;
                    }
                case 714:
                    {
                        __switch_0 = ((432) | 0);
                        continue;
                    }
                case 715:
                    {
                        __switch_0 = ((349) | 0);
                        continue;
                    }
                case 716:
                    {
                        __switch_0 = ((377) | 0);
                        continue;
                    }
                case 717:
                    {
                        __switch_0 = ((352) | 0);
                        continue;
                    }
                case 718:
                    {
                        __switch_0 = ((355) | 0);
                        continue;
                    }
                case 719:
                    {
                        __switch_0 = ((378) | 0);
                        continue;
                    }
                case 720:
                    {
                        __switch_0 = ((460) | 0);
                        continue;
                    }
                case 721:
                    {
                        __switch_0 = ((461) | 0);
                        continue;
                    }
                case 722:
                    {
                        __switch_0 = ((427) | 0);
                        continue;
                    }
                case 723:
                    {
                        __switch_0 = ((424) | 0);
                        continue;
                    }
                case 724:
                    {
                        method_push_state(runtime, 40);
                        __switch_0 = ((423) | 0);
                        continue;
                    }
                case 463:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((434) | 0);
                        continue;
                    }
                case 725:
                    {
                        method_push_state(runtime, 41);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 726:
                    {
                        method_push_state(runtime, 42);
                        __switch_0 = ((423) | 0);
                        continue;
                    }
                case 464:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((450) | 0);
                        continue;
                    }
                case 727:
                    {
                        method_push_state(runtime, 43);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 728:
                    {
                        method_push_state(runtime, 44);
                        __switch_0 = ((423) | 0);
                        continue;
                    }
                case 465:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((442) | 0);
                        continue;
                    }
                case 729:
                    {
                        method_push_state(runtime, 45);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 730:
                    {
                        method_push_state(runtime, 46);
                        __switch_0 = ((423) | 0);
                        continue;
                    }
                case 466:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((438) | 0);
                        continue;
                    }
                case 731:
                    {
                        method_push_state(runtime, 47);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 732:
                    {
                        method_push_state(runtime, 48);
                        __switch_0 = ((423) | 0);
                        continue;
                    }
                case 467:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((446) | 0);
                        continue;
                    }
                case 733:
                    {
                        method_push_state(runtime, 49);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 734:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((322) | 0);
                        continue;
                    }
                case 735:
                    {
                        method_push_state(runtime, 50);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 736:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((298) | 0);
                        continue;
                    }
                case 737:
                    {
                        method_push_state(runtime, 51);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 738:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((320) | 0);
                        continue;
                    }
                case 739:
                    {
                        method_push_state(runtime, 52);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 740:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((319) | 0);
                        continue;
                    }
                case 741:
                    {
                        method_push_state(runtime, 53);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 742:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((321) | 0);
                        continue;
                    }
                case 743:
                    {
                        method_push_state(runtime, 54);
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 744:
                    {
                        method_set_a(runtime);
                        __switch_0 = ((454) | 0);
                        continue;
                    }
                case 745:
                    {
                        method_set_b(runtime);
                        __switch_0 = ((454) | 0);
                        continue;
                    }
                case 746:
                    {
                        method_set_d(runtime);
                        __switch_0 = ((456) | 0);
                        continue;
                    }
                case 747:
                    {
                        __switch_0 = ((428) | 0);
                        continue;
                    }
                case 748:
                    {
                        __switch_0 = ((429) | 0);
                        continue;
                    }
                case 749:
                    {
                        __switch_0 = ((462) | 0);
                        continue;
                    }
                case 750:
                    {
                        return;
                    }
                case 256:
                    {
                        members.m_nmi_asserted = ((0) ? 1 : 0);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 55);
                            return;
                        }
                    }
                case 257:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 56);
                            return;
                        }
                    }
                case 258:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 57);
                            return;
                        }
                    }
                case 259:
                    {
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_push_state(runtime, 58);
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 260:
                    {
                        members.m_cc = ((((members.m_cc) | (80))) & 0xff);
                        method_set_ea(runtime, 65532);
                        (__L1 ? __L1(-1, h_m_pc.w) : runtime.macro("standard_irq_callback", -1, h_m_pc.w));
                        __switch_0 = ((271) | 0);
                        continue;
                    }
                case 261:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 59);
                            return;
                        }
                    }
                case 262:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 60);
                            return;
                        }
                    }
                case 263:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 61);
                            return;
                        }
                    }
                case 264:
                    {
                        if (method_firq_saves_entire_state(runtime)) {
                            members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                            h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        }
                        else {
                            members.m_cc = ((((members.m_cc) & (-129))) & 0xff);
                            h_m_temp.w = ((method_partial_state_registers(runtime)) & 0xffff);
                        }
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        method_push_state(runtime, 62);
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 265:
                    {
                        members.m_cc = ((((members.m_cc) | (80))) & 0xff);
                        method_set_ea(runtime, 65526);
                        (__L1 ? __L1(1, h_m_pc.w) : runtime.macro("standard_irq_callback", 1, h_m_pc.w));
                        __switch_0 = ((271) | 0);
                        continue;
                    }
                case 266:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 63);
                            return;
                        }
                    }
                case 267:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 64);
                            return;
                        }
                    }
                case 268:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 65);
                            return;
                        }
                    }
                case 269:
                    {
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_push_state(runtime, 66);
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 270:
                    {
                        members.m_cc = ((((members.m_cc) | (16))) & 0xff);
                        method_set_ea(runtime, 65528);
                        (__L1 ? __L1(0, h_m_pc.w) : runtime.macro("standard_irq_callback", 0, h_m_pc.w));
                        __switch_0 = ((271) | 0);
                        continue;
                    }
                case 271:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 67);
                            return;
                        }
                    }
                case 272:
                    {
                        h_m_pc.b.h = ((method_read_vector(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 68);
                            return;
                        }
                    }
                case 273:
                    {
                        h_m_pc.b.l = ((method_read_vector(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 69);
                            return;
                        }
                    }
                case 274:
                    {
                        method_dummy_vma(runtime, 1);
                        return;
                    }
                case 275:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 70);
                            return;
                        }
                    }
                case 276:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 15, ((0) & 0xff), h_m_temp.b.l, (-h_m_temp.b.l))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((751) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 71);
                            return;
                        }
                    }
                case 468:
                    {
                    }
                case 751:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 277:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 72);
                            return;
                        }
                    }
                case 278:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__2(runtime, 12, (((~h_m_temp.b.l)) & 0xff))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((752) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 73);
                            return;
                        }
                    }
                case 469:
                    {
                    }
                case 752:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 279:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 74);
                            return;
                        }
                    }
                case 280:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__2(runtime, 12, ((h_m_temp.b.l) >>> (1)))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((753) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 75);
                            return;
                        }
                    }
                case 470:
                    {
                    }
                case 753:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 281:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 76);
                            return;
                        }
                    }
                case 282:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__2(runtime, 12, method_rotate_right__T_uint8_t(runtime, h_m_temp.b.l))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((754) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 77);
                            return;
                        }
                    }
                case 471:
                    {
                    }
                case 754:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 283:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 78);
                            return;
                        }
                    }
                case 284:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__2(runtime, 12, runtime.shiftRight(((h_m_temp.b.l) << 24 >> 24), 1))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((755) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 79);
                            return;
                        }
                    }
                case 472:
                    {
                    }
                case 755:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 285:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 80);
                            return;
                        }
                    }
                case 286:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 15, h_m_temp.b.l, h_m_temp.b.l, ((h_m_temp.b.l) << (1)))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((756) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 81);
                            return;
                        }
                    }
                case 473:
                    {
                    }
                case 756:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 287:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 82);
                            return;
                        }
                    }
                case 288:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 14, h_m_temp.b.l, h_m_temp.b.l, method_rotate_left__T_uint8_t(runtime, h_m_temp.b.l))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((757) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 83);
                            return;
                        }
                    }
                case 474:
                    {
                    }
                case 757:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 289:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 84);
                            return;
                        }
                    }
                case 290:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 14, h_m_temp.b.l, 1, ((h_m_temp.b.l) - (1)))) & 0xff);
                        if ((((((((method_hd6309_native_mode(runtime)) ? 0 : 1)) || (((method_is_register_addressing_mode(runtime)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((758) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 85);
                            return;
                        }
                    }
                case 475:
                    {
                    }
                case 758:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 291:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 86);
                            return;
                        }
                    }
                case 292:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 14, h_m_temp.b.l, 1, ((h_m_temp.b.l) + (1)))) & 0xff);
                        if ((((((((method_hd6309_native_mode(runtime)) ? 0 : 1)) || (((method_is_register_addressing_mode(runtime)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((759) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 87);
                            return;
                        }
                    }
                case 476:
                    {
                    }
                case 759:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 293:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 88);
                            return;
                        }
                    }
                case 294:
                    {
                        method_set_flags__T_uint8_t__2(runtime, 14, h_m_temp.b.l);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((760) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 89);
                            return;
                        }
                    }
                case 477:
                    {
                    }
                case 760:
                    {
                        if (((((method_is_register_addressing_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((761) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 90);
                            return;
                        }
                    }
                case 478:
                    {
                    }
                case 761:
                    {
                        return;
                    }
                case 295:
                    {
                        h_m_pc.w = ((h_m_ea.w) & 0xffff);
                        return;
                    }
                case 296:
                    {
                        method_read_operand__0(runtime);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 91);
                            return;
                        }
                    }
                case 297:
                    {
                        members.m_cc = ((((members.m_cc) & (-16))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (4))) & 0xff);
                        if ((((((((method_hd6309_native_mode(runtime)) ? 0 : 1)) || (((method_is_register_addressing_mode(runtime)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((762) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 92);
                            return;
                        }
                    }
                case 479:
                    {
                    }
                case 762:
                    {
                        method_write_operand__1(runtime, 0);
                        return;
                    }
                case 298:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, ((0) & 0xffff), h_m_temp.w, (-h_m_temp.w))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((763) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 93);
                            return;
                        }
                    }
                case 480:
                    {
                    }
                case 763:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 299:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 94);
                            return;
                        }
                    }
                case 300:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 95);
                            return;
                        }
                    }
                case 301:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 12, ((h_m_temp.w) >>> (1)))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((764) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 96);
                            return;
                        }
                    }
                case 481:
                    {
                    }
                case 764:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 97);
                            return;
                        }
                    }
                case 302:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 303:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 98);
                            return;
                        }
                    }
                case 304:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 99);
                            return;
                        }
                    }
                case 305:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 12, method_rotate_right__T_uint16_t(runtime, h_m_temp.w))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((765) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 100);
                            return;
                        }
                    }
                case 482:
                    {
                    }
                case 765:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 101);
                            return;
                        }
                    }
                case 306:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 307:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 102);
                            return;
                        }
                    }
                case 308:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 103);
                            return;
                        }
                    }
                case 309:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 12, runtime.shiftRight(((h_m_temp.w) << 16 >> 16), 1))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((766) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 104);
                            return;
                        }
                    }
                case 483:
                    {
                    }
                case 766:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 105);
                            return;
                        }
                    }
                case 310:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 311:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 106);
                            return;
                        }
                    }
                case 312:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 107);
                            return;
                        }
                    }
                case 313:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, h_m_temp.w, h_m_temp.w, ((h_m_temp.w) << (1)))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((767) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 108);
                            return;
                        }
                    }
                case 484:
                    {
                    }
                case 767:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 109);
                            return;
                        }
                    }
                case 314:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 315:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 110);
                            return;
                        }
                    }
                case 316:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 111);
                            return;
                        }
                    }
                case 317:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 14, method_rotate_left__T_uint16_t(runtime, h_m_temp.w))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((768) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 112);
                            return;
                        }
                    }
                case 485:
                    {
                    }
                case 768:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 113);
                            return;
                        }
                    }
                case 318:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 319:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, h_m_temp.w, 1, ((h_m_temp.w) - (1)))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((769) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 114);
                            return;
                        }
                    }
                case 486:
                    {
                    }
                case 769:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 320:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, h_m_temp.w, 1, ((h_m_temp.w) + (1)))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((770) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 115);
                            return;
                        }
                    }
                case 487:
                    {
                    }
                case 770:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 321:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        method_set_flags__T_uint16_t__2(runtime, 14, h_m_temp.w);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((771) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 116);
                            return;
                        }
                    }
                case 488:
                    {
                    }
                case 771:
                    {
                        if (((((method_is_register_addressing_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((772) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 117);
                            return;
                        }
                    }
                case 489:
                    {
                    }
                case 772:
                    {
                        return;
                    }
                case 322:
                    {
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((773) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 118);
                            return;
                        }
                    }
                case 490:
                    {
                    }
                case 773:
                    {
                        members.m_cc = ((((members.m_cc) & (-16))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (4))) & 0xff);
                        method_write_operand__2(runtime, 0, 0);
                        method_write_operand__2(runtime, 1, 0);
                        return;
                    }
                case 323:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 15, method_regop8(runtime), h_m_temp.b.l, ((method_regop8(runtime)) - (h_m_temp.b.l))));
                        return;
                    }
                case 324:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_set_flags__T_uint8_t__4(runtime, 15, method_regop8(runtime), h_m_temp.b.l, ((method_regop8(runtime)) - (h_m_temp.b.l)));
                        return;
                    }
                case 325:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 15, method_regop8(runtime), h_m_temp.b.l, ((((method_regop8(runtime)) - (h_m_temp.b.l))) - ((((((members.m_cc ?? 0)) & (1))) ? (1) : (0))))));
                        return;
                    }
                case 326:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 12, ((0) & 0xff), method_regop8(runtime), ((method_regop8(runtime)) & (method_read_operand__0(runtime)))));
                        return;
                    }
                case 327:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        method_set_flags__T_uint8_t__4(runtime, 12, ((0) & 0xff), method_regop8(runtime), ((method_regop8(runtime)) & (method_read_operand__0(runtime))));
                        return;
                    }
                case 328:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 12, ((0) & 0xff), method_regop8(runtime), ((method_regop8(runtime)) ^ (method_read_operand__0(runtime)))));
                        return;
                    }
                case 329:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, ((method_add8_sets_h(runtime)) ? (47) : (15)), method_regop8(runtime), h_m_temp.b.l, __add_execute_one(runtime, ((method_regop8(runtime)) + (h_m_temp.b.l)), (((((members.m_cc ?? 0)) & (1))) ? (1) : (0)))));
                        return;
                    }
                case 330:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 12, ((0) & 0xff), method_regop8(runtime), ((method_regop8(runtime)) | (method_read_operand__0(runtime)))));
                        return;
                    }
                case 331:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, ((method_add8_sets_h(runtime)) ? (47) : (15)), method_regop8(runtime), h_m_temp.b.l, ((method_regop8(runtime)) + (h_m_temp.b.l))));
                        return;
                    }
                case 332:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 119);
                            return;
                        }
                    }
                case 333:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 120);
                            return;
                        }
                    }
                case 334:
                    {
                        method_regop16(runtime).w = method_set_flags__T_uint16_t__4(runtime, 15, method_regop16(runtime).w, h_m_temp.w, ((method_regop16(runtime).w) + (h_m_temp.w)));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((774) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 121);
                            return;
                        }
                    }
                case 491:
                    {
                    }
                case 774:
                    {
                        return;
                    }
                case 335:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 122);
                            return;
                        }
                    }
                case 336:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 123);
                            return;
                        }
                    }
                case 337:
                    {
                        method_regop16(runtime).w = method_set_flags__T_uint16_t__4(runtime, 15, method_regop16(runtime).w, h_m_temp.w, ((method_regop16(runtime).w) - (h_m_temp.w)));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((775) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 124);
                            return;
                        }
                    }
                case 492:
                    {
                    }
                case 775:
                    {
                        return;
                    }
                case 338:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 125);
                            return;
                        }
                    }
                case 339:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 126);
                            return;
                        }
                    }
                case 340:
                    {
                        method_set_flags__T_uint16_t__4(runtime, 15, method_regop16(runtime).w, h_m_temp.w, ((method_regop16(runtime).w) - (h_m_temp.w)));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((776) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 127);
                            return;
                        }
                    }
                case 493:
                    {
                    }
                case 776:
                    {
                        return;
                    }
                case 341:
                    {
                        method_regop8_(runtime, method_read_operand__0(runtime));
                        method_set_flags__T_uint8_t__2(runtime, 14, method_regop8(runtime));
                        return;
                    }
                case 342:
                    {
                        method_regop16(runtime).b.h = method_read_operand__1(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 128);
                            return;
                        }
                    }
                case 343:
                    {
                        method_regop16(runtime).b.l = method_read_operand__1(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 129);
                            return;
                        }
                    }
                case 344:
                    {
                        method_set_flags__T_uint16_t__2(runtime, 14, method_regop16(runtime).w);
                        if ((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) {
                            members.m_lds_encountered = ((1) ? 1 : 0);
                        }
                        return;
                    }
                case 345:
                    {
                        method_write_ea(runtime, method_set_flags__T_uint8_t__2(runtime, 14, method_regop8(runtime)));
                        return;
                    }
                case 346:
                    {
                        method_write_operand__2(runtime, 0, method_regop16(runtime).b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 130);
                            return;
                        }
                    }
                case 347:
                    {
                        method_write_operand__2(runtime, 1, method_regop16(runtime).b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 131);
                            return;
                        }
                    }
                case 348:
                    {
                        method_set_flags__T_uint16_t__2(runtime, 14, method_regop16(runtime).w);
                        return;
                    }
                case 349:
                    {
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((777) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 132);
                            return;
                        }
                    }
                case 494:
                    {
                    }
                case 777:
                    {
                        return;
                    }
                case 350:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 133);
                            return;
                        }
                    }
                case 351:
                    {
                        (__L2 ? __L2(Number(1)) : typeof members.m_syncack_write_func === 'function' ? members.m_syncack_write_func(1) : runtime.invoke("m_syncack_write_func", 1));
                    }
                case 778:
                    {
                        if ((((((((((((members.m_nmi_asserted ?? 0)) ? 0 : 1)) && ((((members.m_firq_line ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((((members.m_irq_line ?? 0)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((779) | 0);
                            continue;
                        }
                        method_eat_remaining(runtime);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 134);
                            return;
                        }
                    }
                case 495:
                    {
                        __switch_0 = ((778) | 0);
                        continue;
                    }
                case 779:
                    {
                        (__L2 ? __L2(Number(0)) : typeof members.m_syncack_write_func === 'function' ? members.m_syncack_write_func(0) : runtime.invoke("m_syncack_write_func", 0));
                        method_eat(runtime, 1);
                        return;
                    }
                case 352:
                    {
                        method_daa(runtime);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((780) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 135);
                            return;
                        }
                    }
                case 496:
                    {
                    }
                case 780:
                    {
                        return;
                    }
                case 353:
                    {
                        members.m_cc = ((((members.m_cc) | (method_read_operand__0(runtime)))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((781) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 136);
                            return;
                        }
                    }
                case 497:
                    {
                    }
                case 781:
                    {
                        return;
                    }
                case 354:
                    {
                        members.m_cc = ((((members.m_cc) & (method_read_operand__0(runtime)))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((782) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 137);
                            return;
                        }
                    }
                case 498:
                    {
                    }
                case 782:
                    {
                        return;
                    }
                case 355:
                    {
                        h_m_q.r.d = method_set_flags__T_uint16_t__2(runtime, 12, ((h_m_q.r.b) << 24 >> 24));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((783) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 138);
                            return;
                        }
                    }
                case 499:
                    {
                    }
                case 783:
                    {
                        return;
                    }
                case 356:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 139);
                            return;
                        }
                    }
                case 357:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 140);
                            return;
                        }
                    }
                case 358:
                    {
                        if (method_branch_taken(runtime)) {
                            h_m_pc.w = ((((h_m_pc.w) + (((h_m_temp.b.l) << 24 >> 24)))) & 0xffff);
                        }
                        return;
                    }
                case 359:
                    {
                        h_m_temp.b.h = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 141);
                            return;
                        }
                    }
                case 360:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 142);
                            return;
                        }
                    }
                case 361:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 143);
                            return;
                        }
                    }
                case 362:
                    {
                        if (((method_branch_taken(runtime)) ? 0 : 1)) {
                            __switch_0 = ((784) | 0);
                            continue;
                        }
                        h_m_pc.w = ((((h_m_pc.w) + (h_m_temp.w))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((785) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 144);
                            return;
                        }
                    }
                case 500:
                    {
                    }
                case 785:
                    {
                    }
                case 784:
                    {
                        return;
                    }
                case 363:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 145);
                            return;
                        }
                    }
                case 364:
                    {
                        h_m_ea.w = ((((h_m_pc.w) + (((h_m_temp.b.l) << 24 >> 24)))) & 0xffff);
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (2) : (3)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 146);
                            return;
                        }
                    }
                case 365:
                    {
                        __switch_0 = ((373) | 0);
                        continue;
                    }
                case 366:
                    {
                        h_m_temp.b.h = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 147);
                            return;
                        }
                    }
                case 367:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 148);
                            return;
                        }
                    }
                case 368:
                    {
                        h_m_ea.w = ((((h_m_pc.w) + (((h_m_temp.w) << 16 >> 16)))) & 0xffff);
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (2) : (4)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 149);
                            return;
                        }
                    }
                case 369:
                    {
                        __switch_0 = ((373) | 0);
                        continue;
                    }
                case 370:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 150);
                            return;
                        }
                    }
                case 371:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 151);
                            return;
                        }
                    }
                case 372:
                    {
                        __switch_0 = ((373) | 0);
                        continue;
                    }
                case 373:
                    {
                        method_write_memory(runtime, (h_m_s.w = ((((h_m_s.w) - (1))) & 0xffff)), h_m_pc.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 152);
                            return;
                        }
                    }
                case 374:
                    {
                        method_write_memory(runtime, (h_m_s.w = ((((h_m_s.w) - (1))) & 0xffff)), h_m_pc.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 153);
                            return;
                        }
                    }
                case 375:
                    {
                        h_m_pc.w = ((h_m_ea.w) & 0xffff);
                        return;
                    }
                case 376:
                    {
                        h_m_temp.w = ((128) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((786) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 154);
                            return;
                        }
                    }
                case 501:
                    {
                    }
                case 786:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        __switch_0 = ((418) | 0);
                        continue;
                    }
                case 377:
                    {
                        h_m_x.w = ((((h_m_x.w) + (h_m_q.r.b))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((787) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 155);
                            return;
                        }
                    }
                case 502:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 156);
                            return;
                        }
                    }
                case 503:
                    {
                    }
                case 787:
                    {
                        return;
                    }
                case 378:
                    {
                        method_mul(runtime);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 157);
                            return;
                        }
                    }
                case 379:
                    {
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (8) : (9)));
                        return;
                    }
                case 380:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 158);
                            return;
                        }
                    }
                case 381:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        members.m_cc = ((method_read_memory(runtime, (__t0 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t0))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 159);
                            return;
                        }
                    }
                case 382:
                    {
                        h_m_temp.w = (((((((((members.m_cc ?? 0)) & (128))) ? (method_entire_state_registers(runtime)) : (method_partial_state_registers(runtime)))) & (-2))) & 0xffff);
                        __switch_0 = ((418) | 0);
                        continue;
                    }
                case 383:
                    {
                        members.m_cc = ((((members.m_cc) & (method_read_opcode_arg__0(runtime)))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 160);
                            return;
                        }
                    }
                case 384:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 161);
                            return;
                        }
                    }
                case 385:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 162);
                            return;
                        }
                    }
                case 386:
                    {
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_push_state(runtime, 163);
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 387:
                    {
                    }
                case 788:
                    {
                        if (((((Number((h_m_ea.w = ((method_get_pending_interrupt(runtime)) & 0xffff))) === Number(0)) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((789) | 0);
                            continue;
                        }
                        method_eat_remaining(runtime);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 164);
                            return;
                        }
                    }
                case 504:
                    {
                        __switch_0 = ((788) | 0);
                        continue;
                    }
                case 789:
                    {
                        if ((members.m_nmi_asserted ?? 0)) {
                            members.m_nmi_asserted = ((0) ? 1 : 0);
                        }
                        method_set_ea(runtime, h_m_ea.w);
                        members.m_cc = ((((members.m_cc) | (((16) | (((((Number(h_m_ea.w) !== Number(65528)) ? 1 : 0)) ? (64) : (0))))))) & 0xff);
                        switch (h_m_ea.w) {
                            case 65532:
                                {
                                    (__L1 ? __L1(-1, h_m_pc.w) : runtime.macro("standard_irq_callback", -1, h_m_pc.w));
                                    break;
                                }
                            case 65526:
                                {
                                    (__L1 ? __L1(1, h_m_pc.w) : runtime.macro("standard_irq_callback", 1, h_m_pc.w));
                                    break;
                                }
                            case 65528:
                                {
                                    (__L1 ? __L1(0, h_m_pc.w) : runtime.macro("standard_irq_callback", 0, h_m_pc.w));
                                    break;
                                }
                            default:
                                {
                                    break;
                                }
                        }
                        __switch_0 = ((271) | 0);
                        continue;
                    }
                case 388:
                    {
                        method_regop16(runtime).w = method_set_flags__T_uint16_t__2(runtime, 4, h_m_ea.w);
                        method_dummy_vma(runtime, 1);
                        return;
                    }
                case 389:
                    {
                        if ((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) {
                            members.m_lds_encountered = ((1) ? 1 : 0);
                        }
                        method_regop16(runtime).w = h_m_ea.w;
                        method_dummy_vma(runtime, 1);
                        return;
                    }
                case 390:
                    {
                        h_m_temp.w = ((method_read_opcode_arg__0(runtime)) & 0xffff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 165);
                            return;
                        }
                    }
                case 391:
                    {
                        method_dummy_vma(runtime, 2);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 166);
                            return;
                        }
                    }
                case 392:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((790) | 0);
                            continue;
                        }
                        method_read_memory(runtime, method_regop16(runtime).w);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 167);
                            return;
                        }
                    }
                case 505:
                    {
                    }
                case 790:
                    {
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 393:
                    {
                        h_m_temp.w = ((method_read_opcode_arg__0(runtime)) & 0xffff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 168);
                            return;
                        }
                    }
                case 394:
                    {
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (1) : (2)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 169);
                            return;
                        }
                    }
                case 395:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        __switch_0 = ((418) | 0);
                        continue;
                    }
                case 396:
                    {
                        h_m_temp.w = ((method_read_opcode_arg__0(runtime)) & 0xffff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 170);
                            return;
                        }
                    }
                case 397:
                    {
                        method_dummy_vma(runtime, 2);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 171);
                            return;
                        }
                    }
                case 398:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((791) | 0);
                            continue;
                        }
                        method_read_memory(runtime, method_regop16(runtime).w);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 172);
                            return;
                        }
                    }
                case 506:
                    {
                    }
                case 791:
                    {
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 399:
                    {
                        h_m_temp.w = ((method_read_opcode_arg__0(runtime)) & 0xffff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 173);
                            return;
                        }
                    }
                case 400:
                    {
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (1) : (2)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 174);
                            return;
                        }
                    }
                case 401:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        __switch_0 = ((418) | 0);
                        continue;
                    }
                case 402:
                    {
                        method_set_ea(runtime, 65530);
                        /* debugger_exception_hook: no effect */
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 175);
                            return;
                        }
                    }
                case 403:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 176);
                            return;
                        }
                    }
                case 404:
                    {
                        method_push_state(runtime, 177);
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 405:
                    {
                        members.m_cc = ((((members.m_cc) | (80))) & 0xff);
                        __switch_0 = ((271) | 0);
                        continue;
                    }
                case 406:
                    {
                        method_set_ea(runtime, 65524);
                        /* debugger_exception_hook: no effect */
                        __switch_0 = ((408) | 0);
                        continue;
                    }
                case 407:
                    {
                        method_set_ea(runtime, 65522);
                        /* debugger_exception_hook: no effect */
                        __switch_0 = ((408) | 0);
                        continue;
                    }
                case 408:
                    {
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 178);
                            return;
                        }
                    }
                case 409:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 179);
                            return;
                        }
                    }
                case 410:
                    {
                        method_push_state(runtime, 180);
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 411:
                    {
                        __switch_0 = ((271) | 0);
                        continue;
                    }
                case 412:
                    {
                        method_set_ea(runtime, (((((((members.m_dp ?? 0)) & 0xffff)) << (8))) | (method_read_opcode_arg__0(runtime))));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 181);
                            return;
                        }
                    }
                case 413:
                    {
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((792) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 182);
                            return;
                        }
                    }
                case 507:
                    {
                    }
                case 792:
                    {
                        return;
                    }
                case 414:
                    {
                        method_set_ea_h(runtime, method_read_opcode_arg__0(runtime));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 183);
                            return;
                        }
                    }
                case 415:
                    {
                        method_set_ea_l(runtime, method_read_opcode_arg__0(runtime));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 184);
                            return;
                        }
                    }
                case 416:
                    {
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((793) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 185);
                            return;
                        }
                    }
                case 508:
                    {
                    }
                case 793:
                    {
                        return;
                    }
                case 417:
                    {
                        if (((((h_m_temp.w) & (128))) ? 0 : 1)) {
                            __switch_0 = ((794) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_pc.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 186);
                            return;
                        }
                    }
                case 509:
                    {
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_pc.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 187);
                            return;
                        }
                    }
                case 510:
                    {
                        method_nop(runtime);
                    }
                case 794:
                    {
                        if (((((h_m_temp.w) & (64))) ? 0 : 1)) {
                            __switch_0 = ((795) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), (((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) ? (h_m_u.b.l) : (h_m_s.b.l)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 188);
                            return;
                        }
                    }
                case 511:
                    {
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), (((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) ? (h_m_u.b.h) : (h_m_s.b.h)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 189);
                            return;
                        }
                    }
                case 512:
                    {
                        method_nop(runtime);
                    }
                case 795:
                    {
                        if (((((h_m_temp.w) & (32))) ? 0 : 1)) {
                            __switch_0 = ((796) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_y.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 190);
                            return;
                        }
                    }
                case 513:
                    {
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_y.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 191);
                            return;
                        }
                    }
                case 514:
                    {
                        method_nop(runtime);
                    }
                case 796:
                    {
                        if (((((h_m_temp.w) & (16))) ? 0 : 1)) {
                            __switch_0 = ((797) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_x.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 192);
                            return;
                        }
                    }
                case 515:
                    {
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_x.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 193);
                            return;
                        }
                    }
                case 516:
                    {
                        method_nop(runtime);
                    }
                case 797:
                    {
                        if (((((h_m_temp.w) & (8))) ? 0 : 1)) {
                            __switch_0 = ((798) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), (members.m_dp ?? 0));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 194);
                            return;
                        }
                    }
                case 517:
                    {
                        method_nop(runtime);
                    }
                case 798:
                    {
                        if (((((h_m_temp.w) & (4))) ? 0 : 1)) {
                            __switch_0 = ((799) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_q.r.b);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 195);
                            return;
                        }
                    }
                case 518:
                    {
                        method_nop(runtime);
                    }
                case 799:
                    {
                        if (((((h_m_temp.w) & (2))) ? 0 : 1)) {
                            __switch_0 = ((800) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_q.r.a);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 196);
                            return;
                        }
                    }
                case 519:
                    {
                        method_nop(runtime);
                    }
                case 800:
                    {
                        if (((((h_m_temp.w) & (1))) ? 0 : 1)) {
                            __switch_0 = ((801) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), (members.m_cc ?? 0));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 197);
                            return;
                        }
                    }
                case 520:
                    {
                        method_nop(runtime);
                    }
                case 801:
                    {
                        return;
                    }
                case 418:
                    {
                        if (((((h_m_temp.w) & (1))) ? 0 : 1)) {
                            __switch_0 = ((802) | 0);
                            continue;
                        }
                        members.m_cc = ((method_read_memory(runtime, (__t1 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t1))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 198);
                            return;
                        }
                    }
                case 521:
                    {
                        method_nop(runtime);
                    }
                case 802:
                    {
                        if (((((h_m_temp.w) & (2))) ? 0 : 1)) {
                            __switch_0 = ((803) | 0);
                            continue;
                        }
                        h_m_q.r.a = method_read_memory(runtime, (__t2 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t2));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 199);
                            return;
                        }
                    }
                case 522:
                    {
                        method_nop(runtime);
                    }
                case 803:
                    {
                        if (((((h_m_temp.w) & (4))) ? 0 : 1)) {
                            __switch_0 = ((804) | 0);
                            continue;
                        }
                        h_m_q.r.b = method_read_memory(runtime, (__t3 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t3));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 200);
                            return;
                        }
                    }
                case 523:
                    {
                        method_nop(runtime);
                    }
                case 804:
                    {
                        if (((((h_m_temp.w) & (8))) ? 0 : 1)) {
                            __switch_0 = ((805) | 0);
                            continue;
                        }
                        members.m_dp = ((method_read_memory(runtime, (__t4 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t4))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 201);
                            return;
                        }
                    }
                case 524:
                    {
                        method_nop(runtime);
                    }
                case 805:
                    {
                        if (((((h_m_temp.w) & (16))) ? 0 : 1)) {
                            __switch_0 = ((806) | 0);
                            continue;
                        }
                        h_m_x.b.h = ((method_read_memory(runtime, (__t5 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t5))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 202);
                            return;
                        }
                    }
                case 525:
                    {
                        h_m_x.b.l = ((method_read_memory(runtime, (__t6 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t6))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 203);
                            return;
                        }
                    }
                case 526:
                    {
                        method_nop(runtime);
                    }
                case 806:
                    {
                        if (((((h_m_temp.w) & (32))) ? 0 : 1)) {
                            __switch_0 = ((807) | 0);
                            continue;
                        }
                        h_m_y.b.h = ((method_read_memory(runtime, (__t7 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t7))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 204);
                            return;
                        }
                    }
                case 527:
                    {
                        h_m_y.b.l = ((method_read_memory(runtime, (__t8 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t8))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 205);
                            return;
                        }
                    }
                case 528:
                    {
                        method_nop(runtime);
                    }
                case 807:
                    {
                        if (((((h_m_temp.w) & (64))) ? 0 : 1)) {
                            __switch_0 = ((808) | 0);
                            continue;
                        }
                        (((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) ? (h_m_u) : (h_m_s)).b.h = method_read_memory(runtime, (__t9 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t9));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 206);
                            return;
                        }
                    }
                case 529:
                    {
                        (((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) ? (h_m_u) : (h_m_s)).b.l = method_read_memory(runtime, (__t10 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t10));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 207);
                            return;
                        }
                    }
                case 530:
                    {
                        method_nop(runtime);
                    }
                case 808:
                    {
                        if (((((h_m_temp.w) & (128))) ? 0 : 1)) {
                            __switch_0 = ((809) | 0);
                            continue;
                        }
                        h_m_pc.b.h = ((method_read_memory(runtime, (__t11 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t11))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 208);
                            return;
                        }
                    }
                case 531:
                    {
                        h_m_pc.b.l = ((method_read_memory(runtime, (__t12 = method_regop16(runtime).w, method_regop16(runtime).w = __add_execute_one(runtime, method_regop16(runtime).w, 1), __t12))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 209);
                            return;
                        }
                    }
                case 532:
                    {
                        method_nop(runtime);
                    }
                case 809:
                    {
                        method_eat(runtime, 1);
                        return;
                    }
                case 419:
                    {
                        members.m_opcode = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 210);
                            return;
                        }
                    }
                case 420:
                    {
                        __switch_0_selected_258 = (((((members.m_opcode ?? 0)) & (247))) | 0);
                        if ((((__switch_0_selected_258) === (7)) ? 1 : 0)) {
                            __switch_0 = ((810) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (32)) ? 1 : 0)) || ((((__switch_0_selected_258) === (48)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (80)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (96)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (112)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((811) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (33)) ? 1 : 0)) || ((((__switch_0_selected_258) === (49)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (81)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (97)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (113)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((812) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (34)) ? 1 : 0)) || ((((__switch_0_selected_258) === (50)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (82)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (98)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (114)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((813) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (35)) ? 1 : 0)) || ((((__switch_0_selected_258) === (51)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (83)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (99)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (115)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((814) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (36)) ? 1 : 0)) || ((((__switch_0_selected_258) === (52)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (84)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (100)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (116)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((815) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (37)) ? 1 : 0)) || ((((__switch_0_selected_258) === (53)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (85)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (101)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (117)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((816) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (38)) ? 1 : 0)) || ((((__switch_0_selected_258) === (54)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (86)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (102)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (118)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((817) | 0);
                            continue;
                        }
                        if ((((__switch_0_selected_258) === (196)) ? 1 : 0)) {
                            __switch_0 = ((818) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (160)) ? 1 : 0)) || ((((__switch_0_selected_258) === (176)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (208)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (224)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (240)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((819) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (161)) ? 1 : 0)) || ((((__switch_0_selected_258) === (177)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (209)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (225)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (241)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((820) | 0);
                            continue;
                        }
                        if ((((((((((((((((__switch_0_selected_258) === (167)) ? 1 : 0)) || ((((__switch_0_selected_258) === (183)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (215)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (231)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_258) === (247)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((821) | 0);
                            continue;
                        }
                        __switch_0 = ((822) | 0);
                        continue;
                    }
                case 810:
                    {
                        h_m_temp.b.h = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 211);
                            return;
                        }
                    }
                case 533:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 212);
                            return;
                        }
                    }
                case 534:
                    {
                        method_eat(runtime, 1);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 811:
                    {
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_ireg_(runtime, ((method_ireg(runtime)) + (1)));
                        method_eat(runtime, 2);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 812:
                    {
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_ireg_(runtime, ((method_ireg(runtime)) + (2)));
                        method_eat(runtime, 3);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 813:
                    {
                        method_ireg_(runtime, ((method_ireg(runtime)) - (1)));
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_eat(runtime, 2);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 814:
                    {
                        method_ireg_(runtime, ((method_ireg(runtime)) - (2)));
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_eat(runtime, 3);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 815:
                    {
                        h_m_ea.w = ((method_ireg(runtime)) & 0xffff);
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 213);
                            return;
                        }
                    }
                case 535:
                    {
                        h_m_temp.w = ((((h_m_ea.w) + (((h_m_temp.b.l) << 24 >> 24)))) & 0xffff);
                        method_eat(runtime, 2);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 816:
                    {
                        h_m_ea.w = ((method_ireg(runtime)) & 0xffff);
                        h_m_temp.b.h = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 214);
                            return;
                        }
                    }
                case 536:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 215);
                            return;
                        }
                    }
                case 537:
                    {
                        h_m_temp.w = ((((h_m_ea.w) + (((h_m_temp.w) << 16 >> 16)))) & 0xffff);
                        method_eat(runtime, 2);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 817:
                    {
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_eat(runtime, 1);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 818:
                    {
                        h_m_temp.b.h = (((members.m_dp ?? 0)) & 0xff);
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 216);
                            return;
                        }
                    }
                case 538:
                    {
                        method_eat(runtime, 1);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 819:
                    {
                        h_m_temp.w = ((((method_ireg(runtime)) + (((h_m_q.r.a) << 24 >> 24)))) & 0xffff);
                        method_eat(runtime, 2);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 820:
                    {
                        h_m_temp.w = ((((method_ireg(runtime)) + (((h_m_q.r.b) << 24 >> 24)))) & 0xffff);
                        method_eat(runtime, 2);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 821:
                    {
                        h_m_temp.w = ((((method_ireg(runtime)) + (((h_m_q.r.d) << 16 >> 16)))) & 0xffff);
                        method_eat(runtime, 2);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 822:
                    {
                        0;
                        h_m_temp.w = ((0) & 0xffff);
                        __switch_0 = ((823) | 0);
                        continue;
                    }
                case 823:
                    {
                        if ((((((members.m_opcode ?? 0)) & (8))) ? 0 : 1)) {
                            __switch_0 = ((824) | 0);
                            continue;
                        }
                        method_set_ea(runtime, h_m_temp.w);
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 217);
                            return;
                        }
                    }
                case 539:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 218);
                            return;
                        }
                    }
                case 540:
                    {
                        method_eat(runtime, 1);
                    }
                case 824:
                    {
                        method_set_ea(runtime, h_m_temp.w);
                        return;
                    }
                case 421:
                    {
                        param = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        reg = ((method_read_exgtfr_register(runtime, ((param) >>> (0)))) & 0xffff);
                        if ((((((param) >>> (7)) & 1)) ? 0 : 1)) {
                            let reg2 = ((method_read_exgtfr_register(runtime, ((param) >>> (4)))) & 0xffff);
                            method_write_exgtfr_register(runtime, ((param) >>> (0)), reg2);
                            method_eat(runtime, 1);
                        }
                        method_write_exgtfr_register(runtime, ((param) >>> (4)), reg);
                        method_eat(runtime, 2);
                        return;
                    }
                case 422:
                    {
                        method_set_lines(runtime, method_read_operand__0(runtime));
                        return;
                    }
                case 423:
                    {
                        members.m_temp_im = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        return;
                    }
                case 424:
                    {
                        h_m_temp.b.l = ((method_read_memory(runtime, (__t13 = h_m_y.w, h_m_y.w = ((((h_m_y.w) + (1))) & 0xffff), __t13))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 219);
                            return;
                        }
                    }
                case 425:
                    {
                        method_write_memory(runtime, (__t14 = h_m_x.w, h_m_x.w = ((((h_m_x.w) + (1))) & 0xffff), __t14), h_m_temp.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 220);
                            return;
                        }
                    }
                case 426:
                    {
                        h_m_u.w = ((((h_m_u.w) - (1))) & 0xffff);
                        return;
                    }
                case 427:
                    {
                    }
                case 825:
                    {
                        if ((((((h_m_u.w) !== (0)) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((826) | 0);
                            continue;
                        }
                        h_m_temp.b.l = ((method_read_memory(runtime, (__t15 = h_m_y.w, h_m_y.w = ((((h_m_y.w) + (1))) & 0xffff), __t15))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 221);
                            return;
                        }
                    }
                case 541:
                    {
                        method_write_memory(runtime, (__t16 = h_m_x.w, h_m_x.w = ((((h_m_x.w) + (1))) & 0xffff), __t16), h_m_temp.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 222);
                            return;
                        }
                    }
                case 542:
                    {
                        h_m_u.w = ((((h_m_u.w) - (1))) & 0xffff);
                        __switch_0 = ((825) | 0);
                        continue;
                    }
                case 826:
                    {
                        return;
                    }
                case 428:
                    {
                    }
                case 827:
                    {
                        if ((((((h_m_u.w) !== (0)) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((828) | 0);
                            continue;
                        }
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 223);
                            return;
                        }
                    }
                case 543:
                    {
                        method_write_memory(runtime, (__t17 = h_m_x.w, h_m_x.w = ((((h_m_x.w) + (1))) & 0xffff), __t17), h_m_q.r.a);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 224);
                            return;
                        }
                    }
                case 544:
                    {
                        h_m_u.w = ((((h_m_u.w) - (1))) & 0xffff);
                        __switch_0 = ((827) | 0);
                        continue;
                    }
                case 828:
                    {
                        return;
                    }
                case 429:
                    {
                    }
                case 829:
                    {
                        if ((((((h_m_u.w) !== (0)) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((830) | 0);
                            continue;
                        }
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 225);
                            return;
                        }
                    }
                case 545:
                    {
                        method_write_memory(runtime, (__t18 = h_m_x.w, h_m_x.w = ((((h_m_x.w) + (1))) & 0xffff), __t18), h_m_q.r.a);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 226);
                            return;
                        }
                    }
                case 546:
                    {
                        method_write_memory(runtime, (__t19 = h_m_x.w, h_m_x.w = ((((h_m_x.w) + (1))) & 0xffff), __t19), h_m_q.r.b);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 227);
                            return;
                        }
                    }
                case 547:
                    {
                        h_m_u.w = ((((h_m_u.w) - (1))) & 0xffff);
                        __switch_0 = ((829) | 0);
                        continue;
                    }
                case 830:
                    {
                        return;
                    }
                case 430:
                    {
                        h_m_q.r.b = method_set_flags__T_uint8_t__4(runtime, 14, h_m_q.r.b, 1, runtime.subtract(h_m_q.r.b, 1));
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 228);
                            return;
                        }
                    }
                case 431:
                    {
                        method_set_cond(runtime, method_cond_ne(runtime));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 432:
                    {
                        h_m_x.w = ((method_set_flags__T_uint16_t__4(runtime, 14, h_m_x.w, 1, ((h_m_x.w) - (1)))) & 0xffff);
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 229);
                            return;
                        }
                    }
                case 433:
                    {
                        method_set_cond(runtime, method_cond_ne(runtime));
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 434:
                    {
                        members.m_bcount = ((((method_is_register_addressing_mode(runtime)) ? ((members.m_temp_im ?? 0)) : (h_m_q.r.a))) & 0xff);
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 230);
                            return;
                        }
                    }
                case 435:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 231);
                            return;
                        }
                    }
                case 436:
                    {
                    }
                case 831:
                    {
                        if ((((((__t20 = (members.m_bcount ?? 0), members.m_bcount = ((((members.m_bcount) - (1))) & 0xff), __t20)) & (15))) ? 0 : 1)) {
                            __switch_0 = ((832) | 0);
                            continue;
                        }
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 232);
                            return;
                        }
                    }
                case 548:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 12, ((h_m_temp.w) >>> (1)))) & 0xffff);
                        __switch_0 = ((831) | 0);
                        continue;
                    }
                case 832:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 233);
                            return;
                        }
                    }
                case 437:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 438:
                    {
                        members.m_bcount = ((((method_is_register_addressing_mode(runtime)) ? ((members.m_temp_im ?? 0)) : (h_m_q.r.a))) & 0xff);
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 234);
                            return;
                        }
                    }
                case 439:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 235);
                            return;
                        }
                    }
                case 440:
                    {
                    }
                case 833:
                    {
                        if ((((((__t21 = (members.m_bcount ?? 0), members.m_bcount = ((((members.m_bcount) - (1))) & 0xff), __t21)) & (15))) ? 0 : 1)) {
                            __switch_0 = ((834) | 0);
                            continue;
                        }
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 236);
                            return;
                        }
                    }
                case 549:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, h_m_temp.w, h_m_temp.w, ((h_m_temp.w) << (1)))) & 0xffff);
                        __switch_0 = ((833) | 0);
                        continue;
                    }
                case 834:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 237);
                            return;
                        }
                    }
                case 441:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 442:
                    {
                        members.m_bcount = ((((method_is_register_addressing_mode(runtime)) ? ((members.m_temp_im ?? 0)) : (h_m_q.r.a))) & 0xff);
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 238);
                            return;
                        }
                    }
                case 443:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 239);
                            return;
                        }
                    }
                case 444:
                    {
                    }
                case 835:
                    {
                        if ((((((__t22 = (members.m_bcount ?? 0), members.m_bcount = ((((members.m_bcount) - (1))) & 0xff), __t22)) & (15))) ? 0 : 1)) {
                            __switch_0 = ((836) | 0);
                            continue;
                        }
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 240);
                            return;
                        }
                    }
                case 550:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 12, runtime.shiftRight(((h_m_temp.w) << 16 >> 16), 1))) & 0xffff);
                        __switch_0 = ((835) | 0);
                        continue;
                    }
                case 836:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 241);
                            return;
                        }
                    }
                case 445:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 446:
                    {
                        members.m_bcount = ((((method_is_register_addressing_mode(runtime)) ? ((members.m_temp_im ?? 0)) : (h_m_q.r.a))) & 0xff);
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 242);
                            return;
                        }
                    }
                case 447:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 243);
                            return;
                        }
                    }
                case 448:
                    {
                    }
                case 837:
                    {
                        if ((((((__t23 = (members.m_bcount ?? 0), members.m_bcount = ((((members.m_bcount) - (1))) & 0xff), __t23)) & (15))) ? 0 : 1)) {
                            __switch_0 = ((838) | 0);
                            continue;
                        }
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 244);
                            return;
                        }
                    }
                case 551:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 14, method_rotate_left__T_uint16_t(runtime, h_m_temp.w))) & 0xffff);
                        __switch_0 = ((837) | 0);
                        continue;
                    }
                case 838:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 245);
                            return;
                        }
                    }
                case 449:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 450:
                    {
                        members.m_bcount = ((((method_is_register_addressing_mode(runtime)) ? ((members.m_temp_im ?? 0)) : (h_m_q.r.a))) & 0xff);
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 246);
                            return;
                        }
                    }
                case 451:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 247);
                            return;
                        }
                    }
                case 452:
                    {
                    }
                case 839:
                    {
                        if ((((((__t24 = (members.m_bcount ?? 0), members.m_bcount = ((((members.m_bcount) - (1))) & 0xff), __t24)) & (15))) ? 0 : 1)) {
                            __switch_0 = ((840) | 0);
                            continue;
                        }
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 248);
                            return;
                        }
                    }
                case 552:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 12, method_rotate_right__T_uint16_t(runtime, h_m_temp.w))) & 0xffff);
                        __switch_0 = ((839) | 0);
                        continue;
                    }
                case 840:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 249);
                            return;
                        }
                    }
                case 453:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 454:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 250);
                            return;
                        }
                    }
                case 455:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 15, 0, h_m_temp.b.l, (((((((h_m_temp.b.l) << 24 >> 24)) >= (0)) ? 1 : 0)) ? (h_m_temp.b.l) : ((-h_m_temp.b.l))))) & 0xff);
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 456:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 251);
                            return;
                        }
                    }
                case 457:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 252);
                            return;
                        }
                    }
                case 458:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, 0, h_m_temp.w, (((((((h_m_temp.w) << 16 >> 16)) >= (0)) ? 1 : 0)) ? (h_m_temp.w) : ((-h_m_temp.w))))) & 0xffff);
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 253);
                            return;
                        }
                    }
                case 459:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 460:
                    {
                        method_lmul(runtime);
                        method_eat(runtime, 21);
                        return;
                    }
                case 461:
                    {
                        method_divx(runtime);
                        method_eat(runtime, 10);
                        return;
                    }
                case 462:
                    {
                        method_log_illegal(runtime);
                        return;
                    }
            }
            break;
        }
    }
    function __add_execute_one(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_regop16_(runtime, __assigned) {
        const members = runtime.members;
        runtime.pointerStore((members.m_reg16 ?? 0), __assigned);
        return __deref_regop16_(runtime, (members.m_reg16 ?? 0));
    }
    function __deref_regop16_(runtime, p) {
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
    function method_pop_state(runtime) {
        const members = runtime.members;
        let result = (((((members.m_state ?? 0)) & (511))) & 0xffff);
        members.m_state = ((((members.m_state) >>> (9))) >>> 0);
        return ((result) & 0xffff);
    }
    function method_get_pending_interrupt(runtime) {
        const members = runtime.members;
        if ((members.m_nmi_asserted ?? 0)) {
            return ((65532) & 0xffff);
        }
        else {
            if (((((((((members.m_cc ?? 0)) & (64))) ? 0 : 1)) && ((members.m_firq_line ?? 0))) ? 1 : 0)) {
                return ((65526) & 0xffff);
            }
            else {
                if (((((((((members.m_cc ?? 0)) & (16))) ? 0 : 1)) && ((members.m_irq_line ?? 0))) ? 1 : 0)) {
                    return ((65528) & 0xffff);
                }
                else {
                    return ((0) & 0xffff);
                }
            }
        }
    }
    function method_read_opcode__0(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_pc = members.m_pc ?? 0;
        return ((method_read_opcode__1(runtime, (__t0 = h_m_pc.w, h_m_pc.w = ((((h_m_pc.w) + (1))) & 0xffff), __t0))) & 0xff);
    }
    function method_read_opcode__1(runtime, address) {
        const members = runtime.members;
        address = ((address) & 0xffff);
        method_eat(runtime, 1);
        return (((__deref_read_opcode__1(runtime, members.m_mintf).read_opcode?.(address) ?? 0)) & 0xff);
    }
    function __deref_read_opcode__1(runtime, p) {
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
    function method_set_regop16(runtime, reg) {
        const members = runtime.members;
        members.m_reg16 = (reg.address ? reg.address() : ({ generatedPointer: true, target: reg, offset: 0 }));
        members.m_reg8 = 0;
    }
    function method_set_regop8(runtime, reg) {
        const members = runtime.members;
        members.m_reg8 = (reg.address ? reg.address() : ({ generatedPointer: true, target: reg, offset: 0 }));
        members.m_reg16 = 0;
    }
    function method_set_imm(runtime) {
        const members = runtime.members;
        members.m_addressing_mode = ((0) | 0);
    }
    function method_set_a(runtime) {
        const members = runtime.members;
        members.m_addressing_mode = ((2) | 0);
    }
    function method_set_b(runtime) {
        const members = runtime.members;
        members.m_addressing_mode = ((3) | 0);
    }
    function method_set_d(runtime) {
        const members = runtime.members;
        members.m_addressing_mode = ((4) | 0);
    }
    function method_dummy_read_opcode_arg(runtime, delta) {
        const members = runtime.members;
        delta = ((delta) & 0xffff);
        const h_m_pc = members.m_pc ?? 0;
        method_read_opcode_arg__1(runtime, ((h_m_pc.w) + (delta)));
    }
    function method_read_opcode_arg__1(runtime, address) {
        const members = runtime.members;
        address = ((address) & 0xffff);
        method_eat(runtime, 1);
        return (((__deref_read_opcode_arg__1(runtime, members.m_mintf).read_opcode_arg?.(address) ?? 0)) & 0xff);
    }
    function __deref_read_opcode_arg__1(runtime, p) {
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
    function method_dummy_vma(runtime, count) {
        const members = runtime.members;
        for (let i = ((0) | 0); (((i) !== (count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            method_read_opcode_arg__1(runtime, 65535);
        }
    }
    function method_set_ea(runtime, ea) {
        const members = runtime.members;
        ea = ((ea) & 0xffff);
        const h_m_ea = members.m_ea ?? 0;
        h_m_ea.w = ((ea) & 0xffff);
        members.m_addressing_mode = ((1) | 0);
    }
    function method_read_vector(runtime, ordinal) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_vector_read_func"];
        let __t0;
        const h_m_ea = members.m_ea ?? 0;
        if ((__t0 = __deref_read_vector(runtime, members.m_vector_read_func), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_vector_read_func, "isunset"))) {
            return ((method_read_memory(runtime, ((h_m_ea.w) + (ordinal)))) & 0xff);
        }
        else {
            return (((__L0 ? __L0(Number(((h_m_ea.w) + (ordinal)))) : typeof members.m_vector_read_func === 'function' ? members.m_vector_read_func(((h_m_ea.w) + (ordinal))) : runtime.invoke("m_vector_read_func", ((h_m_ea.w) + (ordinal))))) & 0xff);
        }
    }
    function __deref_read_vector(runtime, p) {
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
    function method_read_memory(runtime, address) {
        const members = runtime.members;
        address = ((address) & 0xffff);
        method_eat(runtime, 1);
        return (((__deref_read_memory(runtime, members.m_mintf).read?.(address) ?? 0)) & 0xff);
    }
    function __deref_read_memory(runtime, p) {
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
    function method_read_operand__0(runtime) {
        const members = runtime.members;
        return ((method_m6809_base_device__read_operand(runtime)) & 0xff);
    }
    function method_m6809_base_device__read_operand(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        const h_m_ea = members.m_ea ?? 0;
        const h_m_q = members.m_q ?? 0;
        switch ((members.m_addressing_mode ?? 0)) {
            case 1:
                {
                    return ((method_read_memory(runtime, h_m_ea.w)) & 0xff);
                }
            case 0:
                {
                    return ((method_read_opcode_arg__0(runtime)) & 0xff);
                }
            case 2:
                {
                    return ((h_m_q.r.a) & 0xff);
                }
            case 3:
                {
                    return ((h_m_q.r.b) & 0xff);
                }
            default:
                {
                    (__L0 ? __L0("Unexpected") : runtime.macro("fatalerror", "Unexpected"));
                    return ((0) & 0xff);
                }
        }
    }
    function method_read_opcode_arg__0(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_pc = members.m_pc ?? 0;
        return ((method_read_opcode_arg__1(runtime, (__t0 = h_m_pc.w, h_m_pc.w = ((((h_m_pc.w) + (1))) & 0xffff), __t0))) & 0xff);
    }
    function method_set_flags__T_uint8_t__4(runtime, mask, a, b, r) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        a = ((a) & 0xff);
        b = ((b) & 0xff);
        let hi_bit = ((((128) & 0xff)) & 0xff);
        members.m_cc = ((((members.m_cc) & ((~mask)))) & 0xff);
        if (((mask) & (32))) {
            members.m_cc = ((((members.m_cc) | (((((((((a) ^ (b))) ^ (r))) & (16))) ? (32) : (0))))) & 0xff);
        }
        if (((mask) & (8))) {
            members.m_cc = ((((members.m_cc) | (((((r) & (hi_bit))) ? (8) : (0))))) & 0xff);
        }
        if (((mask) & (4))) {
            members.m_cc = ((((members.m_cc) | ((((((((r) & 0xff)) === (0)) ? 1 : 0)) ? (4) : (0))))) & 0xff);
        }
        if (((mask) & (2))) {
            members.m_cc = ((((members.m_cc) | (((((((((((a) ^ (b))) ^ (r))) ^ (((r) >>> (1))))) & (hi_bit))) ? (2) : (0))))) & 0xff);
        }
        if (((mask) & (1))) {
            members.m_cc = ((((members.m_cc) | (((((r) & (((hi_bit) << (1))))) ? (1) : (0))))) & 0xff);
        }
        return ((r) & 0xff);
    }
    function method_write_operand__1(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_m6809_base_device__write_operand(runtime, data);
    }
    function method_m6809_base_device__write_operand(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        data = ((data) & 0xff);
        const h_m_ea = members.m_ea ?? 0;
        const h_m_q = members.m_q ?? 0;
        switch ((members.m_addressing_mode ?? 0)) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    method_write_memory(runtime, h_m_ea.w, data);
                    break;
                }
            case 2:
                {
                    h_m_q.r.a = data;
                    break;
                }
            case 3:
                {
                    h_m_q.r.b = data;
                    break;
                }
            default:
                {
                    (__L0 ? __L0("Unexpected") : runtime.macro("fatalerror", "Unexpected"));
                    break;
                }
        }
    }
    function method_write_memory(runtime, address, data) {
        const members = runtime.members;
        address = ((address) & 0xffff);
        data = ((data) & 0xff);
        method_eat(runtime, 1);
        (__deref_write_memory(runtime, members.m_mintf).write?.(address, data) ?? 0);
    }
    function __deref_write_memory(runtime, p) {
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
    function method_set_flags__T_uint8_t__2(runtime, mask, r) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        r = ((r) & 0xff);
        return method_set_flags__T_uint8_t__4(runtime, mask, ((0) & 0xff), r, r);
    }
    function method_rotate_right__T_uint8_t(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        let new_carry = ((((((value) & (1))) ? (1) : (0))) ? 1 : 0);
        value = ((((value) >>> (1))) & 0xff);
        let high_bit = ((((((1) & 0xff)) << (7))) & 0xff);
        if ((((members.m_cc ?? 0)) & (1))) {
            value = ((((value) | (high_bit))) & 0xff);
        }
        else {
            value = ((((value) & ((~high_bit)))) & 0xff);
        }
        if (new_carry) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        }
        else {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        }
        return value;
    }
    function method_rotate_left__T_uint8_t(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        let high_bit = ((((((1) & 0xff)) << (7))) & 0xff);
        let new_carry = ((((((value) & (high_bit))) ? (1) : (0))) ? 1 : 0);
        let new_value = ((value) >>> 0);
        new_value = ((((new_value) << (1))) >>> 0);
        if ((((members.m_cc ?? 0)) & (1))) {
            new_value = ((((new_value) | (1))) >>> 0);
        }
        else {
            new_value = ((((new_value) & (-2))) >>> 0);
        }
        if (new_carry) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        }
        else {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        }
        return new_value;
    }
    function method_read_operand__1(runtime, ordinal) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        const h_m_ea = members.m_ea ?? 0;
        const h_m_q = members.m_q ?? 0;
        switch ((members.m_addressing_mode ?? 0)) {
            case 1:
                {
                    return ((method_read_memory(runtime, ((h_m_ea.w) + (ordinal)))) & 0xff);
                }
            case 0:
                {
                    return ((method_read_opcode_arg__0(runtime)) & 0xff);
                }
            case 4:
                {
                    return ((((((ordinal) & (1))) ? (h_m_q.r.b) : (h_m_q.r.a))) & 0xff);
                }
            default:
                {
                    (__L0 ? __L0("Unexpected") : runtime.macro("fatalerror", "Unexpected"));
                }
        }
    }
    function method_set_flags__T_uint16_t__4(runtime, mask, a, b, r) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        a = ((a) & 0xffff);
        b = ((b) & 0xffff);
        let hi_bit = ((((32768) & 0xffff)) & 0xffff);
        members.m_cc = ((((members.m_cc) & ((~mask)))) & 0xff);
        if (((mask) & (32))) {
            members.m_cc = ((((members.m_cc) | (((((((((a) ^ (b))) ^ (r))) & (16))) ? (32) : (0))))) & 0xff);
        }
        if (((mask) & (8))) {
            members.m_cc = ((((members.m_cc) | (((((r) & (hi_bit))) ? (8) : (0))))) & 0xff);
        }
        if (((mask) & (4))) {
            members.m_cc = ((((members.m_cc) | ((((((((r) & 0xffff)) === (0)) ? 1 : 0)) ? (4) : (0))))) & 0xff);
        }
        if (((mask) & (2))) {
            members.m_cc = ((((members.m_cc) | (((((((((((a) ^ (b))) ^ (r))) ^ (((r) >>> (1))))) & (hi_bit))) ? (2) : (0))))) & 0xff);
        }
        if (((mask) & (1))) {
            members.m_cc = ((((members.m_cc) | (((((r) & (((hi_bit) << (1))))) ? (1) : (0))))) & 0xff);
        }
        return ((r) & 0xffff);
    }
    function method_write_operand__2(runtime, ordinal, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        data = ((data) & 0xff);
        const h_m_ea = members.m_ea ?? 0;
        const h_m_q = members.m_q ?? 0;
        switch ((members.m_addressing_mode ?? 0)) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    method_write_memory(runtime, ((h_m_ea.w) + (ordinal)), data);
                    break;
                }
            case 4:
                {
                    runtime.pointerStore(((((ordinal) & (1))) ? (runtime.fieldAddress(h_m_q.r, "b")) : (runtime.fieldAddress(h_m_q.r, "a"))), data);
                    break;
                }
            default:
                {
                    (__L0 ? __L0("Unexpected") : runtime.macro("fatalerror", "Unexpected"));
                }
        }
    }
    function method_set_flags__T_uint16_t__2(runtime, mask, r) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        r = ((r) & 0xffff);
        return method_set_flags__T_uint16_t__4(runtime, mask, ((0) & 0xffff), r, r);
    }
    function method_rotate_right__T_uint16_t(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xffff);
        let new_carry = ((((((value) & (1))) ? (1) : (0))) ? 1 : 0);
        value = ((((value) >>> (1))) & 0xffff);
        let high_bit = ((((((1) & 0xffff)) << (15))) & 0xffff);
        if ((((members.m_cc ?? 0)) & (1))) {
            value = ((((value) | (high_bit))) & 0xffff);
        }
        else {
            value = ((((value) & ((~high_bit)))) & 0xffff);
        }
        if (new_carry) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        }
        else {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        }
        return value;
    }
    function method_rotate_left__T_uint16_t(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xffff);
        let high_bit = ((((((1) & 0xffff)) << (15))) & 0xffff);
        let new_carry = ((((((value) & (high_bit))) ? (1) : (0))) ? 1 : 0);
        let new_value = ((value) >>> 0);
        new_value = ((((new_value) << (1))) >>> 0);
        if ((((members.m_cc ?? 0)) & (1))) {
            new_value = ((((new_value) | (1))) >>> 0);
        }
        else {
            new_value = ((((new_value) & (-2))) >>> 0);
        }
        if (new_carry) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        }
        else {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        }
        return new_value;
    }
    function method_regop8_(runtime, __assigned) {
        const members = runtime.members;
        runtime.pointerStore((members.m_reg8 ?? 0), ((__assigned) & 0xff));
        return __deref_regop8_(runtime, (members.m_reg8 ?? 0));
    }
    function __deref_regop8_(runtime, p) {
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
    function method_write_ea(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_ea = members.m_ea ?? 0;
        method_write_memory(runtime, h_m_ea.w, data);
    }
    function method_eat_remaining(runtime) {
        const members = runtime.members;
        /* debugger_wait_hook: no effect */
        method_eat(runtime, (members.m_icount ?? 0));
    }
    function method_daa(runtime) {
        const members = runtime.members;
        const h_m_q = members.m_q ?? 0;
        let t = ((0) & 0xffff);
        let cf = ((0) & 0xffff);
        let msn = ((((h_m_q.r.a) & (240))) & 0xff);
        let lsn = ((((h_m_q.r.a) & (15))) & 0xff);
        if (((((((lsn) > (9)) ? 1 : 0)) || ((((members.m_cc ?? 0)) & (32)))) ? 1 : 0)) {
            cf = ((((cf) | (6))) & 0xffff);
        }
        if (((((((msn) > (128)) ? 1 : 0)) && ((((lsn) > (9)) ? 1 : 0))) ? 1 : 0)) {
            cf = ((((cf) | (96))) & 0xffff);
        }
        if (((((((msn) > (144)) ? 1 : 0)) || ((((members.m_cc ?? 0)) & (1)))) ? 1 : 0)) {
            cf = ((((cf) | (96))) & 0xffff);
        }
        t = ((((h_m_q.r.a) + (cf))) & 0xffff);
        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
        if (((t) & (256))) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        }
        h_m_q.r.a = method_set_flags__T_uint8_t__2(runtime, 12, ((t) & 0xff));
    }
    function method_mul(runtime) {
        const members = runtime.members;
        const h_m_q = members.m_q ?? 0;
        let result = ((((((h_m_q.r.a) & 0xffff)) * (((h_m_q.r.b) & 0xffff)))) & 0xffff);
        h_m_q.r.d = method_set_flags__T_uint16_t__2(runtime, 4, result);
        if (((h_m_q.r.d) & (128))) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        }
        else {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        }
    }
    function method_set_ea_l(runtime, ea_l) {
        const members = runtime.members;
        ea_l = ((ea_l) & 0xff);
        const h_m_ea = members.m_ea ?? 0;
        h_m_ea.b.l = ((ea_l) & 0xff);
        members.m_addressing_mode = ((1) | 0);
    }
    function method_nop(runtime) {
        const members = runtime.members;
    }
    function method_ireg(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        switch ((((members.m_opcode ?? 0)) & (112))) {
            case 32:
                {
                    return h_m_x.w;
                }
            case 48:
                {
                    return h_m_y.w;
                }
            case 80:
                {
                    return h_m_u.w;
                }
            case 96:
                {
                    return h_m_s.w;
                }
            case 112:
                {
                    return h_m_pc.w;
                }
            default:
                {
                    (__L0 ? __L0("Should not get here") : runtime.macro("fatalerror", "Should not get here"));
                }
        }
    }
    function method_ireg_(runtime, __assigned) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        switch ((((members.m_opcode ?? 0)) & (112))) {
            case 32:
                {
                    h_m_x.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_x.w;
                }
            case 48:
                {
                    h_m_y.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_y.w;
                }
            case 80:
                {
                    h_m_u.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_u.w;
                }
            case 96:
                {
                    h_m_s.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_s.w;
                }
            case 112:
                {
                    h_m_pc.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_pc.w;
                }
            default:
                {
                    (__L0 ? __L0("Should not get here") : runtime.macro("fatalerror", "Should not get here"));
                }
        }
    }
    function method_read_exgtfr_register(runtime, reg) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        const h_m_q = members.m_q ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let result = ((0) & 0xffff);
        switch (((reg) & (7))) {
            case 0:
                {
                    result = ((((h_m_q.r.a) | (4096))) & 0xffff);
                    break;
                }
            case 1:
                {
                    result = ((h_m_q.r.d) & 0xffff);
                    break;
                }
            case 2:
                {
                    result = ((h_m_x.w) & 0xffff);
                    break;
                }
            case 3:
                {
                    result = ((h_m_y.w) & 0xffff);
                    break;
                }
            case 4:
                {
                    0;
                    break;
                }
            case 5:
                {
                    result = ((h_m_u.w) & 0xffff);
                    break;
                }
            case 6:
                {
                    result = ((h_m_s.w) & 0xffff);
                    break;
                }
            case 7:
                {
                    result = ((h_m_pc.w) & 0xffff);
                    break;
                }
        }
        return ((result) & 0xffff);
    }
    function method_write_exgtfr_register(runtime, reg, value) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        value = ((value) & 0xffff);
        const h_m_q = members.m_q ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        switch (((reg) & (7))) {
            case 0:
                {
                    h_m_q.r.a = value;
                    break;
                }
            case 1:
                {
                    h_m_q.r.b = value;
                    break;
                }
            case 2:
                {
                    h_m_x.w = ((value) & 0xffff);
                    break;
                }
            case 3:
                {
                    h_m_y.w = ((value) & 0xffff);
                    break;
                }
            case 4:
                {
                    0;
                    break;
                }
            case 5:
                {
                    h_m_u.w = ((value) & 0xffff);
                    break;
                }
            case 6:
                {
                    h_m_s.w = ((value) & 0xffff);
                    break;
                }
            case 7:
                {
                    h_m_pc.w = ((value) & 0xffff);
                    break;
                }
        }
    }
    function method_set_lines(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_set_lines"];
        data = ((data) & 0xff);
        (__L0 ? __L0(Number(0), Number(data)) : typeof members.m_set_lines === 'function' ? members.m_set_lines(0, data) : runtime.invoke("m_set_lines", 0, data));
    }
    function method_lmul(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["PAIR_VALUE"];
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        let result = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        result.d = ((((((h_m_x.w) >>> 0)) * (h_m_y.w))) >>> 0);
        h_m_x.w = ((result.w.h) & 0xffff);
        h_m_y.w = ((result.w.l) & 0xffff);
        method_set_flags__T_uint32_t__2(runtime, 4, result.d);
        if (((result.d) & (32768))) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        }
        else {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        }
    }
    function method_set_flags__T_uint32_t__2(runtime, mask, r) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        return method_set_flags__T_uint32_t__4(runtime, mask, ((0) >>> 0), r, r);
    }
    function method_set_flags__T_uint32_t__4(runtime, mask, a, b, r) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        let hi_bit = ((((-2147483648) >>> 0)) >>> 0);
        members.m_cc = ((((members.m_cc) & ((~mask)))) & 0xff);
        if (((mask) & (32))) {
            members.m_cc = ((((members.m_cc) | (((((((((a) ^ (b))) ^ (r))) & (16))) ? (32) : (0))))) & 0xff);
        }
        if (((mask) & (8))) {
            members.m_cc = ((((members.m_cc) | (((((r) & (hi_bit))) ? (8) : (0))))) & 0xff);
        }
        if (((mask) & (4))) {
            members.m_cc = ((((members.m_cc) | ((((((((r) >>> 0)) === (0)) ? 1 : 0)) ? (4) : (0))))) & 0xff);
        }
        if (((mask) & (2))) {
            members.m_cc = ((((members.m_cc) | (((((((((((a) ^ (b))) ^ (r))) ^ (((r) >>> (1))))) & (hi_bit))) ? (2) : (0))))) & 0xff);
        }
        if (((mask) & (1))) {
            members.m_cc = ((((members.m_cc) | (((((r) & (((hi_bit) << (1))))) ? (1) : (0))))) & 0xff);
        }
        return ((r) >>> 0);
    }
    function method_divx(runtime) {
        const members = runtime.members;
        const h_m_q = members.m_q ?? 0;
        const h_m_x = members.m_x ?? 0;
        let result = ((0) & 0xffff);
        let remainder = ((0) & 0xff);
        if (((Number(h_m_q.r.b) !== Number(0)) ? 1 : 0)) {
            result = ((runtime.divide(h_m_x.w, h_m_q.r.b)) & 0xffff);
            remainder = ((((h_m_x.w) % (h_m_q.r.b))) & 0xff);
        }
        else {
            result = ((0) & 0xffff);
            remainder = ((0) & 0xff);
        }
        h_m_x.w = ((method_set_flags__T_uint16_t__2(runtime, 4, result)) & 0xffff);
        h_m_q.r.b = remainder;
        if (((result) & (128))) {
            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
        }
        else {
            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
        }
    }
    function method_log_illegal(runtime) {
        const members = runtime.members;
        0;
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        do {
            method_execute_one(runtime);
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function method_m6809_base_device__interrupt_vector_read(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_m6809_base_device__interrupt_vector_read(runtime, members.m_vector_read_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vector_read_func, "bind"));
    }
    function __deref_m6809_base_device__interrupt_vector_read(runtime, p) {
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
    function method_m6809_base_device__sync_acknowledge_write(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_m6809_base_device__sync_acknowledge_write(runtime, members.m_syncack_write_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_syncack_write_func, "bind"));
    }
    function __deref_m6809_base_device__sync_acknowledge_write(runtime, p) {
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
    function method_m6809_base_device__execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method_m6809_base_device__is_6809(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_m6809_base_device__eat(runtime, cycles) {
        const members = runtime.members;
        members.m_icount = ((((members.m_icount) - (cycles))) | 0);
    }
    function method_m6809_base_device__push_state(runtime, state) {
        const members = runtime.members;
        state = ((state) & 0xffff);
        members.m_state = (((((((members.m_state ?? 0)) << (9))) | (state))) >>> 0);
    }
    function method_m6809_base_device__set_ea_h(runtime, ea_h) {
        const members = runtime.members;
        ea_h = ((ea_h) & 0xff);
        const h_m_ea = members.m_ea ?? 0;
        h_m_ea.b.h = ((ea_h) & 0xff);
    }
    function method_m6809_base_device__regop8(runtime) {
        const members = runtime.members;
        return __deref_m6809_base_device__regop8(runtime, (members.m_reg8 ?? 0));
    }
    function __deref_m6809_base_device__regop8(runtime, p) {
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
    function method_m6809_base_device__regop16(runtime) {
        const members = runtime.members;
        return __deref_m6809_base_device__regop16(runtime, (members.m_reg16 ?? 0));
    }
    function __deref_m6809_base_device__regop16(runtime, p) {
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
    function method_m6809_base_device__is_register_register_op_16_bit(runtime) {
        const members = runtime.members;
        return (((members.m_reg16 ?? 0)) ? 1 : 0);
    }
    function method_m6809_base_device__add8_sets_h(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_m6809_base_device__hd6309_native_mode(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_m6809_base_device__cond_hi(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (5))) ? 0 : 1);
    }
    function method_m6809_base_device__cond_cc(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (1))) ? 0 : 1);
    }
    function method_m6809_base_device__cond_ne(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (4))) ? 0 : 1);
    }
    function method_m6809_base_device__cond_vc(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (2))) ? 0 : 1);
    }
    function method_m6809_base_device__cond_pl(runtime) {
        const members = runtime.members;
        return (((((members.m_cc ?? 0)) & (8))) ? 0 : 1);
    }
    function method_m6809_base_device__cond_ge(runtime) {
        const members = runtime.members;
        return ((Number((((((members.m_cc ?? 0)) & (8))) ? (1) : (0))) === Number((((((members.m_cc ?? 0)) & (2))) ? (1) : (0)))) ? 1 : 0);
    }
    function method_m6809_base_device__cond_gt(runtime) {
        const members = runtime.members;
        return (((method_cond_ge(runtime)) && ((((((members.m_cc ?? 0)) & (4))) ? 0 : 1))) ? 1 : 0);
    }
    function method_m6809_base_device__set_cond(runtime, cond) {
        const members = runtime.members;
        members.m_cond = ((cond) ? 1 : 0);
    }
    function method_m6809_base_device__branch_taken(runtime) {
        const members = runtime.members;
        return (members.m_cond ?? 0);
    }
    function method_m6809_base_device__firq_saves_entire_state(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_m6809_base_device__partial_state_registers(runtime) {
        const members = runtime.members;
        return ((129) & 0xffff);
    }
    function method_m6809_base_device__entire_state_registers(runtime) {
        const members = runtime.members;
        return ((255) & 0xffff);
    }
    function method_m6809_base_device__is_ea_addressing_mode(runtime) {
        const members = runtime.members;
        return ((Number((members.m_addressing_mode ?? 0)) === Number(1)) ? 1 : 0);
    }
    function method_m6809_base_device__execute_one(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"], __L1 = __l["m_lic_func"], __L2 = __l["standard_irq_callback"], __L3 = __l["m_syncack_write_func"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13;
        const h_m_pc = members.m_pc ?? 0;
        const h_m_ppc = members.m_ppc ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_q = members.m_q ?? 0;
        const h_m_temp = members.m_temp ?? 0;
        const h_m_ea = members.m_ea ?? 0;
        let __switch_0_selected_61 = ((0) | 0);
        let param = ((0) & 0xff);
        let reg1 = ((0) & 0xffff);
        let reg2 = ((0) & 0xffff);
        let reg = ((0) & 0xffff);
        let __switch_0 = ((method_pop_state(runtime)) | 0);
        if ((((__switch_0) >= (248)) ? 1 : 0)) {
            __switch_0 = ((-1) | 0);
        }
        while (1) {
            switch (__switch_0) {
                case 0:
                    {
                        __switch_0 = ((248) | 0);
                        continue;
                    }
                case 1:
                    {
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 2:
                    {
                        __switch_0 = ((250) | 0);
                        continue;
                    }
                case 3:
                    {
                        __switch_0 = ((274) | 0);
                        continue;
                    }
                case 4:
                    {
                        __switch_0 = ((431) | 0);
                        continue;
                    }
                case 5:
                    {
                        __switch_0 = ((276) | 0);
                        continue;
                    }
                case 6:
                    {
                        __switch_0 = ((278) | 0);
                        continue;
                    }
                case 7:
                    {
                        __switch_0 = ((280) | 0);
                        continue;
                    }
                case 8:
                    {
                        __switch_0 = ((282) | 0);
                        continue;
                    }
                case 9:
                    {
                        __switch_0 = ((284) | 0);
                        continue;
                    }
                case 10:
                    {
                        __switch_0 = ((286) | 0);
                        continue;
                    }
                case 11:
                    {
                        __switch_0 = ((288) | 0);
                        continue;
                    }
                case 12:
                    {
                        __switch_0 = ((432) | 0);
                        continue;
                    }
                case 13:
                    {
                        __switch_0 = ((290) | 0);
                        continue;
                    }
                case 14:
                    {
                        __switch_0 = ((292) | 0);
                        continue;
                    }
                case 15:
                    {
                        __switch_0 = ((294) | 0);
                        continue;
                    }
                case 16:
                    {
                        __switch_0 = ((295) | 0);
                        continue;
                    }
                case 17:
                    {
                        __switch_0 = ((387) | 0);
                        continue;
                    }
                case 18:
                    {
                        __switch_0 = ((388) | 0);
                        continue;
                    }
                case 19:
                    {
                        __switch_0 = ((322) | 0);
                        continue;
                    }
                case 20:
                    {
                        __switch_0 = ((323) | 0);
                        continue;
                    }
                case 21:
                    {
                        __switch_0 = ((324) | 0);
                        continue;
                    }
                case 22:
                    {
                        __switch_0 = ((334) | 0);
                        continue;
                    }
                case 23:
                    {
                        __switch_0 = ((325) | 0);
                        continue;
                    }
                case 24:
                    {
                        __switch_0 = ((326) | 0);
                        continue;
                    }
                case 25:
                    {
                        __switch_0 = ((340) | 0);
                        continue;
                    }
                case 26:
                    {
                        __switch_0 = ((344) | 0);
                        continue;
                    }
                case 27:
                    {
                        __switch_0 = ((327) | 0);
                        continue;
                    }
                case 28:
                    {
                        __switch_0 = ((328) | 0);
                        continue;
                    }
                case 29:
                    {
                        __switch_0 = ((329) | 0);
                        continue;
                    }
                case 30:
                    {
                        __switch_0 = ((330) | 0);
                        continue;
                    }
                case 31:
                    {
                        __switch_0 = ((337) | 0);
                        continue;
                    }
                case 32:
                    {
                        __switch_0 = ((369) | 0);
                        continue;
                    }
                case 33:
                    {
                        __switch_0 = ((341) | 0);
                        continue;
                    }
                case 34:
                    {
                        __switch_0 = ((345) | 0);
                        continue;
                    }
                case 35:
                    {
                        __switch_0 = ((331) | 0);
                        continue;
                    }
                case 36:
                    {
                        __switch_0 = ((252) | 0);
                        continue;
                    }
                case 37:
                    {
                        __switch_0 = ((443) | 0);
                        continue;
                    }
                case 38:
                    {
                        __switch_0 = ((254) | 0);
                        continue;
                    }
                case 39:
                    {
                        __switch_0 = ((256) | 0);
                        continue;
                    }
                case 40:
                    {
                        __switch_0 = ((257) | 0);
                        continue;
                    }
                case 41:
                    {
                        __switch_0 = ((258) | 0);
                        continue;
                    }
                case 42:
                    {
                        __switch_0 = ((259) | 0);
                        continue;
                    }
                case 43:
                    {
                        __switch_0 = ((261) | 0);
                        continue;
                    }
                case 44:
                    {
                        __switch_0 = ((262) | 0);
                        continue;
                    }
                case 45:
                    {
                        __switch_0 = ((263) | 0);
                        continue;
                    }
                case 46:
                    {
                        __switch_0 = ((264) | 0);
                        continue;
                    }
                case 47:
                    {
                        __switch_0 = ((266) | 0);
                        continue;
                    }
                case 48:
                    {
                        __switch_0 = ((267) | 0);
                        continue;
                    }
                case 49:
                    {
                        __switch_0 = ((268) | 0);
                        continue;
                    }
                case 50:
                    {
                        __switch_0 = ((269) | 0);
                        continue;
                    }
                case 51:
                    {
                        __switch_0 = ((271) | 0);
                        continue;
                    }
                case 52:
                    {
                        __switch_0 = ((272) | 0);
                        continue;
                    }
                case 53:
                    {
                        __switch_0 = ((273) | 0);
                        continue;
                    }
                case 54:
                    {
                        __switch_0 = ((275) | 0);
                        continue;
                    }
                case 55:
                    {
                        __switch_0 = ((451) | 0);
                        continue;
                    }
                case 56:
                    {
                        __switch_0 = ((277) | 0);
                        continue;
                    }
                case 57:
                    {
                        __switch_0 = ((452) | 0);
                        continue;
                    }
                case 58:
                    {
                        __switch_0 = ((279) | 0);
                        continue;
                    }
                case 59:
                    {
                        __switch_0 = ((453) | 0);
                        continue;
                    }
                case 60:
                    {
                        __switch_0 = ((281) | 0);
                        continue;
                    }
                case 61:
                    {
                        __switch_0 = ((454) | 0);
                        continue;
                    }
                case 62:
                    {
                        __switch_0 = ((283) | 0);
                        continue;
                    }
                case 63:
                    {
                        __switch_0 = ((455) | 0);
                        continue;
                    }
                case 64:
                    {
                        __switch_0 = ((285) | 0);
                        continue;
                    }
                case 65:
                    {
                        __switch_0 = ((456) | 0);
                        continue;
                    }
                case 66:
                    {
                        __switch_0 = ((287) | 0);
                        continue;
                    }
                case 67:
                    {
                        __switch_0 = ((457) | 0);
                        continue;
                    }
                case 68:
                    {
                        __switch_0 = ((289) | 0);
                        continue;
                    }
                case 69:
                    {
                        __switch_0 = ((458) | 0);
                        continue;
                    }
                case 70:
                    {
                        __switch_0 = ((291) | 0);
                        continue;
                    }
                case 71:
                    {
                        __switch_0 = ((459) | 0);
                        continue;
                    }
                case 72:
                    {
                        __switch_0 = ((293) | 0);
                        continue;
                    }
                case 73:
                    {
                        __switch_0 = ((460) | 0);
                        continue;
                    }
                case 74:
                    {
                        __switch_0 = ((461) | 0);
                        continue;
                    }
                case 75:
                    {
                        __switch_0 = ((296) | 0);
                        continue;
                    }
                case 76:
                    {
                        __switch_0 = ((462) | 0);
                        continue;
                    }
                case 77:
                    {
                        __switch_0 = ((463) | 0);
                        continue;
                    }
                case 78:
                    {
                        __switch_0 = ((299) | 0);
                        continue;
                    }
                case 79:
                    {
                        __switch_0 = ((300) | 0);
                        continue;
                    }
                case 80:
                    {
                        __switch_0 = ((464) | 0);
                        continue;
                    }
                case 81:
                    {
                        __switch_0 = ((301) | 0);
                        continue;
                    }
                case 82:
                    {
                        __switch_0 = ((303) | 0);
                        continue;
                    }
                case 83:
                    {
                        __switch_0 = ((304) | 0);
                        continue;
                    }
                case 84:
                    {
                        __switch_0 = ((465) | 0);
                        continue;
                    }
                case 85:
                    {
                        __switch_0 = ((305) | 0);
                        continue;
                    }
                case 86:
                    {
                        __switch_0 = ((307) | 0);
                        continue;
                    }
                case 87:
                    {
                        __switch_0 = ((308) | 0);
                        continue;
                    }
                case 88:
                    {
                        __switch_0 = ((466) | 0);
                        continue;
                    }
                case 89:
                    {
                        __switch_0 = ((309) | 0);
                        continue;
                    }
                case 90:
                    {
                        __switch_0 = ((311) | 0);
                        continue;
                    }
                case 91:
                    {
                        __switch_0 = ((312) | 0);
                        continue;
                    }
                case 92:
                    {
                        __switch_0 = ((467) | 0);
                        continue;
                    }
                case 93:
                    {
                        __switch_0 = ((313) | 0);
                        continue;
                    }
                case 94:
                    {
                        __switch_0 = ((315) | 0);
                        continue;
                    }
                case 95:
                    {
                        __switch_0 = ((316) | 0);
                        continue;
                    }
                case 96:
                    {
                        __switch_0 = ((468) | 0);
                        continue;
                    }
                case 97:
                    {
                        __switch_0 = ((317) | 0);
                        continue;
                    }
                case 98:
                    {
                        __switch_0 = ((469) | 0);
                        continue;
                    }
                case 99:
                    {
                        __switch_0 = ((470) | 0);
                        continue;
                    }
                case 100:
                    {
                        __switch_0 = ((471) | 0);
                        continue;
                    }
                case 101:
                    {
                        __switch_0 = ((472) | 0);
                        continue;
                    }
                case 102:
                    {
                        __switch_0 = ((473) | 0);
                        continue;
                    }
                case 103:
                    {
                        __switch_0 = ((332) | 0);
                        continue;
                    }
                case 104:
                    {
                        __switch_0 = ((333) | 0);
                        continue;
                    }
                case 105:
                    {
                        __switch_0 = ((474) | 0);
                        continue;
                    }
                case 106:
                    {
                        __switch_0 = ((335) | 0);
                        continue;
                    }
                case 107:
                    {
                        __switch_0 = ((336) | 0);
                        continue;
                    }
                case 108:
                    {
                        __switch_0 = ((475) | 0);
                        continue;
                    }
                case 109:
                    {
                        __switch_0 = ((338) | 0);
                        continue;
                    }
                case 110:
                    {
                        __switch_0 = ((339) | 0);
                        continue;
                    }
                case 111:
                    {
                        __switch_0 = ((476) | 0);
                        continue;
                    }
                case 112:
                    {
                        __switch_0 = ((342) | 0);
                        continue;
                    }
                case 113:
                    {
                        __switch_0 = ((343) | 0);
                        continue;
                    }
                case 114:
                    {
                        __switch_0 = ((346) | 0);
                        continue;
                    }
                case 115:
                    {
                        __switch_0 = ((347) | 0);
                        continue;
                    }
                case 116:
                    {
                        __switch_0 = ((477) | 0);
                        continue;
                    }
                case 117:
                    {
                        __switch_0 = ((350) | 0);
                        continue;
                    }
                case 118:
                    {
                        __switch_0 = ((478) | 0);
                        continue;
                    }
                case 119:
                    {
                        __switch_0 = ((479) | 0);
                        continue;
                    }
                case 120:
                    {
                        __switch_0 = ((480) | 0);
                        continue;
                    }
                case 121:
                    {
                        __switch_0 = ((481) | 0);
                        continue;
                    }
                case 122:
                    {
                        __switch_0 = ((482) | 0);
                        continue;
                    }
                case 123:
                    {
                        __switch_0 = ((356) | 0);
                        continue;
                    }
                case 124:
                    {
                        __switch_0 = ((357) | 0);
                        continue;
                    }
                case 125:
                    {
                        __switch_0 = ((359) | 0);
                        continue;
                    }
                case 126:
                    {
                        __switch_0 = ((360) | 0);
                        continue;
                    }
                case 127:
                    {
                        __switch_0 = ((361) | 0);
                        continue;
                    }
                case 128:
                    {
                        __switch_0 = ((483) | 0);
                        continue;
                    }
                case 129:
                    {
                        __switch_0 = ((363) | 0);
                        continue;
                    }
                case 130:
                    {
                        __switch_0 = ((364) | 0);
                        continue;
                    }
                case 131:
                    {
                        __switch_0 = ((366) | 0);
                        continue;
                    }
                case 132:
                    {
                        __switch_0 = ((367) | 0);
                        continue;
                    }
                case 133:
                    {
                        __switch_0 = ((368) | 0);
                        continue;
                    }
                case 134:
                    {
                        __switch_0 = ((370) | 0);
                        continue;
                    }
                case 135:
                    {
                        __switch_0 = ((371) | 0);
                        continue;
                    }
                case 136:
                    {
                        __switch_0 = ((373) | 0);
                        continue;
                    }
                case 137:
                    {
                        __switch_0 = ((374) | 0);
                        continue;
                    }
                case 138:
                    {
                        __switch_0 = ((484) | 0);
                        continue;
                    }
                case 139:
                    {
                        __switch_0 = ((485) | 0);
                        continue;
                    }
                case 140:
                    {
                        __switch_0 = ((486) | 0);
                        continue;
                    }
                case 141:
                    {
                        __switch_0 = ((378) | 0);
                        continue;
                    }
                case 142:
                    {
                        __switch_0 = ((380) | 0);
                        continue;
                    }
                case 143:
                    {
                        __switch_0 = ((381) | 0);
                        continue;
                    }
                case 144:
                    {
                        __switch_0 = ((383) | 0);
                        continue;
                    }
                case 145:
                    {
                        __switch_0 = ((384) | 0);
                        continue;
                    }
                case 146:
                    {
                        __switch_0 = ((385) | 0);
                        continue;
                    }
                case 147:
                    {
                        __switch_0 = ((386) | 0);
                        continue;
                    }
                case 148:
                    {
                        __switch_0 = ((487) | 0);
                        continue;
                    }
                case 149:
                    {
                        __switch_0 = ((390) | 0);
                        continue;
                    }
                case 150:
                    {
                        __switch_0 = ((391) | 0);
                        continue;
                    }
                case 151:
                    {
                        __switch_0 = ((488) | 0);
                        continue;
                    }
                case 152:
                    {
                        __switch_0 = ((393) | 0);
                        continue;
                    }
                case 153:
                    {
                        __switch_0 = ((394) | 0);
                        continue;
                    }
                case 154:
                    {
                        __switch_0 = ((396) | 0);
                        continue;
                    }
                case 155:
                    {
                        __switch_0 = ((397) | 0);
                        continue;
                    }
                case 156:
                    {
                        __switch_0 = ((489) | 0);
                        continue;
                    }
                case 157:
                    {
                        __switch_0 = ((399) | 0);
                        continue;
                    }
                case 158:
                    {
                        __switch_0 = ((400) | 0);
                        continue;
                    }
                case 159:
                    {
                        __switch_0 = ((402) | 0);
                        continue;
                    }
                case 160:
                    {
                        __switch_0 = ((403) | 0);
                        continue;
                    }
                case 161:
                    {
                        __switch_0 = ((404) | 0);
                        continue;
                    }
                case 162:
                    {
                        __switch_0 = ((408) | 0);
                        continue;
                    }
                case 163:
                    {
                        __switch_0 = ((409) | 0);
                        continue;
                    }
                case 164:
                    {
                        __switch_0 = ((410) | 0);
                        continue;
                    }
                case 165:
                    {
                        __switch_0 = ((412) | 0);
                        continue;
                    }
                case 166:
                    {
                        __switch_0 = ((490) | 0);
                        continue;
                    }
                case 167:
                    {
                        __switch_0 = ((414) | 0);
                        continue;
                    }
                case 168:
                    {
                        __switch_0 = ((415) | 0);
                        continue;
                    }
                case 169:
                    {
                        __switch_0 = ((491) | 0);
                        continue;
                    }
                case 170:
                    {
                        __switch_0 = ((492) | 0);
                        continue;
                    }
                case 171:
                    {
                        __switch_0 = ((493) | 0);
                        continue;
                    }
                case 172:
                    {
                        __switch_0 = ((494) | 0);
                        continue;
                    }
                case 173:
                    {
                        __switch_0 = ((495) | 0);
                        continue;
                    }
                case 174:
                    {
                        __switch_0 = ((496) | 0);
                        continue;
                    }
                case 175:
                    {
                        __switch_0 = ((497) | 0);
                        continue;
                    }
                case 176:
                    {
                        __switch_0 = ((498) | 0);
                        continue;
                    }
                case 177:
                    {
                        __switch_0 = ((499) | 0);
                        continue;
                    }
                case 178:
                    {
                        __switch_0 = ((500) | 0);
                        continue;
                    }
                case 179:
                    {
                        __switch_0 = ((501) | 0);
                        continue;
                    }
                case 180:
                    {
                        __switch_0 = ((502) | 0);
                        continue;
                    }
                case 181:
                    {
                        __switch_0 = ((503) | 0);
                        continue;
                    }
                case 182:
                    {
                        __switch_0 = ((504) | 0);
                        continue;
                    }
                case 183:
                    {
                        __switch_0 = ((505) | 0);
                        continue;
                    }
                case 184:
                    {
                        __switch_0 = ((506) | 0);
                        continue;
                    }
                case 185:
                    {
                        __switch_0 = ((507) | 0);
                        continue;
                    }
                case 186:
                    {
                        __switch_0 = ((508) | 0);
                        continue;
                    }
                case 187:
                    {
                        __switch_0 = ((509) | 0);
                        continue;
                    }
                case 188:
                    {
                        __switch_0 = ((510) | 0);
                        continue;
                    }
                case 189:
                    {
                        __switch_0 = ((511) | 0);
                        continue;
                    }
                case 190:
                    {
                        __switch_0 = ((512) | 0);
                        continue;
                    }
                case 191:
                    {
                        __switch_0 = ((513) | 0);
                        continue;
                    }
                case 192:
                    {
                        __switch_0 = ((514) | 0);
                        continue;
                    }
                case 193:
                    {
                        __switch_0 = ((515) | 0);
                        continue;
                    }
                case 194:
                    {
                        __switch_0 = ((419) | 0);
                        continue;
                    }
                case 195:
                    {
                        __switch_0 = ((516) | 0);
                        continue;
                    }
                case 196:
                    {
                        __switch_0 = ((517) | 0);
                        continue;
                    }
                case 197:
                    {
                        __switch_0 = ((518) | 0);
                        continue;
                    }
                case 198:
                    {
                        __switch_0 = ((519) | 0);
                        continue;
                    }
                case 199:
                    {
                        __switch_0 = ((520) | 0);
                        continue;
                    }
                case 200:
                    {
                        __switch_0 = ((521) | 0);
                        continue;
                    }
                case 201:
                    {
                        __switch_0 = ((522) | 0);
                        continue;
                    }
                case 202:
                    {
                        __switch_0 = ((523) | 0);
                        continue;
                    }
                case 203:
                    {
                        __switch_0 = ((524) | 0);
                        continue;
                    }
                case 204:
                    {
                        __switch_0 = ((525) | 0);
                        continue;
                    }
                case 205:
                    {
                        __switch_0 = ((526) | 0);
                        continue;
                    }
                case 206:
                    {
                        __switch_0 = ((527) | 0);
                        continue;
                    }
                case 207:
                    {
                        __switch_0 = ((528) | 0);
                        continue;
                    }
                case 208:
                    {
                        __switch_0 = ((529) | 0);
                        continue;
                    }
                case 209:
                    {
                        __switch_0 = ((530) | 0);
                        continue;
                    }
                case 210:
                    {
                        __switch_0 = ((531) | 0);
                        continue;
                    }
                case 211:
                    {
                        __switch_0 = ((532) | 0);
                        continue;
                    }
                case 212:
                    {
                        __switch_0 = ((533) | 0);
                        continue;
                    }
                case 213:
                    {
                        __switch_0 = ((534) | 0);
                        continue;
                    }
                case 214:
                    {
                        __switch_0 = ((535) | 0);
                        continue;
                    }
                case 215:
                    {
                        __switch_0 = ((536) | 0);
                        continue;
                    }
                case 216:
                    {
                        __switch_0 = ((537) | 0);
                        continue;
                    }
                case 217:
                    {
                        __switch_0 = ((538) | 0);
                        continue;
                    }
                case 218:
                    {
                        __switch_0 = ((539) | 0);
                        continue;
                    }
                case 219:
                    {
                        __switch_0 = ((540) | 0);
                        continue;
                    }
                case 220:
                    {
                        __switch_0 = ((541) | 0);
                        continue;
                    }
                case 221:
                    {
                        __switch_0 = ((542) | 0);
                        continue;
                    }
                case 222:
                    {
                        __switch_0 = ((543) | 0);
                        continue;
                    }
                case 223:
                    {
                        __switch_0 = ((544) | 0);
                        continue;
                    }
                case 224:
                    {
                        __switch_0 = ((545) | 0);
                        continue;
                    }
                case 225:
                    {
                        __switch_0 = ((546) | 0);
                        continue;
                    }
                case 226:
                    {
                        __switch_0 = ((547) | 0);
                        continue;
                    }
                case 227:
                    {
                        __switch_0 = ((548) | 0);
                        continue;
                    }
                case 228:
                    {
                        __switch_0 = ((549) | 0);
                        continue;
                    }
                case 229:
                    {
                        __switch_0 = ((424) | 0);
                        continue;
                    }
                case 230:
                    {
                        __switch_0 = ((426) | 0);
                        continue;
                    }
                case 231:
                    {
                        __switch_0 = ((428) | 0);
                        continue;
                    }
                case 232:
                    {
                        __switch_0 = ((429) | 0);
                        continue;
                    }
                case 233:
                    {
                        __switch_0 = ((430) | 0);
                        continue;
                    }
                case 234:
                    {
                        __switch_0 = ((433) | 0);
                        continue;
                    }
                case 235:
                    {
                        __switch_0 = ((550) | 0);
                        continue;
                    }
                case 236:
                    {
                        __switch_0 = ((435) | 0);
                        continue;
                    }
                case 237:
                    {
                        __switch_0 = ((551) | 0);
                        continue;
                    }
                case 238:
                    {
                        __switch_0 = ((437) | 0);
                        continue;
                    }
                case 239:
                    {
                        __switch_0 = ((440) | 0);
                        continue;
                    }
                case 240:
                    {
                        __switch_0 = ((441) | 0);
                        continue;
                    }
                case 241:
                    {
                        __switch_0 = ((442) | 0);
                        continue;
                    }
                case 242:
                    {
                        __switch_0 = ((444) | 0);
                        continue;
                    }
                case 243:
                    {
                        __switch_0 = ((445) | 0);
                        continue;
                    }
                case 244:
                    {
                        __switch_0 = ((552) | 0);
                        continue;
                    }
                case 245:
                    {
                        __switch_0 = ((447) | 0);
                        continue;
                    }
                case 246:
                    {
                        __switch_0 = ((448) | 0);
                        continue;
                    }
                case 247:
                    {
                        __switch_0 = ((449) | 0);
                        continue;
                    }
                default:
                    {
                        (__L0 ? __L0("Unexpected state") : runtime.macro("fatalerror", "Unexpected state"));
                        break;
                    }
                case 248:
                    {
                        switch (method_get_pending_interrupt(runtime)) {
                            case 65532:
                                {
                                    __switch_0 = ((255) | 0);
                                    continue;
                                }
                            case 65526:
                                {
                                    __switch_0 = ((260) | 0);
                                    continue;
                                }
                            case 65528:
                                {
                                    __switch_0 = ((265) | 0);
                                    continue;
                                }
                        }
                        (h_m_ppc.w = (h_m_pc).w);
                        /* debugger_instruction_hook: no effect */
                    }
                case 249:
                    {
                        (__L1 ? __L1(Number(1)) : typeof members.m_lic_func === 'function' ? members.m_lic_func(1) : runtime.invoke("m_lic_func", 1));
                        members.m_opcode = ((method_read_opcode__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 2);
                            return;
                        }
                    }
                case 250:
                    {
                        (__L1 ? __L1(Number(0)) : typeof members.m_lic_func === 'function' ? members.m_lic_func(0) : runtime.invoke("m_lic_func", 0));
                        if ((members.m_free_run ?? 0)) {
                            __switch_0 = ((422) | 0);
                            continue;
                        }
                        switch ((members.m_opcode ?? 0)) {
                            case 0:
                            case 1:
                                {
                                    method_push_state(runtime, 3);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 2:
                                {
                                    method_push_state(runtime, 4);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 3:
                                {
                                    method_push_state(runtime, 5);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 4:
                            case 5:
                                {
                                    method_push_state(runtime, 6);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 6:
                                {
                                    method_push_state(runtime, 7);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 7:
                                {
                                    method_push_state(runtime, 8);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 8:
                                {
                                    method_push_state(runtime, 9);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 9:
                                {
                                    method_push_state(runtime, 10);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 10:
                                {
                                    method_push_state(runtime, 11);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 11:
                                {
                                    method_push_state(runtime, 12);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 12:
                                {
                                    method_push_state(runtime, 13);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 13:
                                {
                                    method_push_state(runtime, 14);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 14:
                                {
                                    method_push_state(runtime, 15);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 15:
                                {
                                    method_push_state(runtime, 16);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 16:
                                {
                                    __switch_0 = ((251) | 0);
                                    continue;
                                }
                            case 17:
                                {
                                    __switch_0 = ((253) | 0);
                                    continue;
                                }
                            case 18:
                                {
                                    __switch_0 = ((348) | 0);
                                    continue;
                                }
                            case 19:
                                {
                                    __switch_0 = ((349) | 0);
                                    continue;
                                }
                            case 20:
                            case 21:
                                {
                                    __switch_0 = ((422) | 0);
                                    continue;
                                }
                            case 22:
                                {
                                    method_set_cond(runtime, 1);
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 23:
                                {
                                    __switch_0 = ((365) | 0);
                                    continue;
                                }
                            case 24:
                                {
                                    __switch_0 = ((423) | 0);
                                    continue;
                                }
                            case 25:
                                {
                                    __switch_0 = ((351) | 0);
                                    continue;
                                }
                            case 26:
                                {
                                    method_set_imm(runtime);
                                    __switch_0 = ((352) | 0);
                                    continue;
                                }
                            case 27:
                                {
                                    __switch_0 = ((348) | 0);
                                    continue;
                                }
                            case 28:
                                {
                                    method_set_imm(runtime);
                                    __switch_0 = ((353) | 0);
                                    continue;
                                }
                            case 29:
                                {
                                    __switch_0 = ((354) | 0);
                                    continue;
                                }
                            case 30:
                                {
                                    __switch_0 = ((420) | 0);
                                    continue;
                                }
                            case 31:
                                {
                                    __switch_0 = ((421) | 0);
                                    continue;
                                }
                            case 32:
                                {
                                    method_set_cond(runtime, 1);
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 33:
                                {
                                    method_set_cond(runtime, 0);
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 34:
                                {
                                    method_set_cond(runtime, method_cond_hi(runtime));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 35:
                                {
                                    method_set_cond(runtime, ((method_cond_hi(runtime)) ? 0 : 1));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 36:
                                {
                                    method_set_cond(runtime, method_cond_cc(runtime));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 37:
                                {
                                    method_set_cond(runtime, ((method_cond_cc(runtime)) ? 0 : 1));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 38:
                                {
                                    method_set_cond(runtime, method_cond_ne(runtime));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 39:
                                {
                                    method_set_cond(runtime, ((method_cond_ne(runtime)) ? 0 : 1));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 40:
                                {
                                    method_set_cond(runtime, method_cond_vc(runtime));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 41:
                                {
                                    method_set_cond(runtime, ((method_cond_vc(runtime)) ? 0 : 1));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 42:
                                {
                                    method_set_cond(runtime, method_cond_pl(runtime));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 43:
                                {
                                    method_set_cond(runtime, ((method_cond_pl(runtime)) ? 0 : 1));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 44:
                                {
                                    method_set_cond(runtime, method_cond_ge(runtime));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 45:
                                {
                                    method_set_cond(runtime, ((method_cond_ge(runtime)) ? 0 : 1));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 46:
                                {
                                    method_set_cond(runtime, method_cond_gt(runtime));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 47:
                                {
                                    method_set_cond(runtime, ((method_cond_gt(runtime)) ? 0 : 1));
                                    __switch_0 = ((355) | 0);
                                    continue;
                                }
                            case 48:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 17);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 49:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 17);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 50:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 18);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 51:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 18);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 52:
                                {
                                    __switch_0 = ((389) | 0);
                                    continue;
                                }
                            case 53:
                                {
                                    __switch_0 = ((392) | 0);
                                    continue;
                                }
                            case 54:
                                {
                                    __switch_0 = ((395) | 0);
                                    continue;
                                }
                            case 55:
                                {
                                    __switch_0 = ((398) | 0);
                                    continue;
                                }
                            case 56:
                                {
                                    method_set_imm(runtime);
                                    __switch_0 = ((425) | 0);
                                    continue;
                                }
                            case 57:
                                {
                                    __switch_0 = ((375) | 0);
                                    continue;
                                }
                            case 58:
                                {
                                    __switch_0 = ((376) | 0);
                                    continue;
                                }
                            case 59:
                                {
                                    __switch_0 = ((379) | 0);
                                    continue;
                                }
                            case 60:
                                {
                                    __switch_0 = ((382) | 0);
                                    continue;
                                }
                            case 61:
                                {
                                    __switch_0 = ((377) | 0);
                                    continue;
                                }
                            case 62:
                                {
                                    __switch_0 = ((427) | 0);
                                    continue;
                                }
                            case 63:
                                {
                                    __switch_0 = ((401) | 0);
                                    continue;
                                }
                            case 64:
                            case 65:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((274) | 0);
                                    continue;
                                }
                            case 66:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((431) | 0);
                                    continue;
                                }
                            case 67:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((276) | 0);
                                    continue;
                                }
                            case 68:
                            case 69:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((278) | 0);
                                    continue;
                                }
                            case 70:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((280) | 0);
                                    continue;
                                }
                            case 71:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((282) | 0);
                                    continue;
                                }
                            case 72:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((284) | 0);
                                    continue;
                                }
                            case 73:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((286) | 0);
                                    continue;
                                }
                            case 74:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((288) | 0);
                                    continue;
                                }
                            case 75:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((432) | 0);
                                    continue;
                                }
                            case 76:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((290) | 0);
                                    continue;
                                }
                            case 77:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((292) | 0);
                                    continue;
                                }
                            case 78:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((434) | 0);
                                    continue;
                                }
                            case 79:
                                {
                                    method_set_a(runtime);
                                    __switch_0 = ((295) | 0);
                                    continue;
                                }
                            case 80:
                            case 81:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((274) | 0);
                                    continue;
                                }
                            case 82:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((431) | 0);
                                    continue;
                                }
                            case 83:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((276) | 0);
                                    continue;
                                }
                            case 84:
                            case 85:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((278) | 0);
                                    continue;
                                }
                            case 86:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((280) | 0);
                                    continue;
                                }
                            case 87:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((282) | 0);
                                    continue;
                                }
                            case 88:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((284) | 0);
                                    continue;
                                }
                            case 89:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((286) | 0);
                                    continue;
                                }
                            case 90:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((288) | 0);
                                    continue;
                                }
                            case 91:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((432) | 0);
                                    continue;
                                }
                            case 92:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((290) | 0);
                                    continue;
                                }
                            case 93:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((292) | 0);
                                    continue;
                                }
                            case 94:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((434) | 0);
                                    continue;
                                }
                            case 95:
                                {
                                    method_set_b(runtime);
                                    __switch_0 = ((295) | 0);
                                    continue;
                                }
                            case 96:
                            case 97:
                                {
                                    method_push_state(runtime, 3);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 98:
                                {
                                    method_push_state(runtime, 4);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 99:
                                {
                                    method_push_state(runtime, 5);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 100:
                            case 101:
                                {
                                    method_push_state(runtime, 6);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 102:
                                {
                                    method_push_state(runtime, 7);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 103:
                                {
                                    method_push_state(runtime, 8);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 104:
                                {
                                    method_push_state(runtime, 9);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 105:
                                {
                                    method_push_state(runtime, 10);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 106:
                                {
                                    method_push_state(runtime, 11);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 107:
                                {
                                    method_push_state(runtime, 12);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 108:
                                {
                                    method_push_state(runtime, 13);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 109:
                                {
                                    method_push_state(runtime, 14);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 110:
                                {
                                    method_push_state(runtime, 15);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 111:
                                {
                                    method_push_state(runtime, 16);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 112:
                            case 113:
                                {
                                    method_push_state(runtime, 3);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 114:
                                {
                                    method_push_state(runtime, 4);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 115:
                                {
                                    method_push_state(runtime, 5);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 116:
                            case 117:
                                {
                                    method_push_state(runtime, 6);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 118:
                                {
                                    method_push_state(runtime, 7);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 119:
                                {
                                    method_push_state(runtime, 8);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 120:
                                {
                                    method_push_state(runtime, 9);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 121:
                                {
                                    method_push_state(runtime, 10);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 122:
                                {
                                    method_push_state(runtime, 11);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 123:
                                {
                                    method_push_state(runtime, 12);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 124:
                                {
                                    method_push_state(runtime, 13);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 125:
                                {
                                    method_push_state(runtime, 14);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 126:
                                {
                                    method_push_state(runtime, 15);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 127:
                                {
                                    method_push_state(runtime, 16);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 128:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((322) | 0);
                                    continue;
                                }
                            case 129:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((323) | 0);
                                    continue;
                                }
                            case 130:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((324) | 0);
                                    continue;
                                }
                            case 131:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((334) | 0);
                                    continue;
                                }
                            case 132:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((325) | 0);
                                    continue;
                                }
                            case 133:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((326) | 0);
                                    continue;
                                }
                            case 134:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((340) | 0);
                                    continue;
                                }
                            case 135:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((436) | 0);
                                    continue;
                                }
                            case 136:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((327) | 0);
                                    continue;
                                }
                            case 137:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((328) | 0);
                                    continue;
                                }
                            case 138:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((329) | 0);
                                    continue;
                                }
                            case 139:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((330) | 0);
                                    continue;
                                }
                            case 140:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((337) | 0);
                                    continue;
                                }
                            case 141:
                                {
                                    __switch_0 = ((362) | 0);
                                    continue;
                                }
                            case 142:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((341) | 0);
                                    continue;
                                }
                            case 143:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((438) | 0);
                                    continue;
                                }
                            case 144:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 19);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 145:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 20);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 146:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 21);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 147:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 22);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 148:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 23);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 149:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 24);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 150:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 25);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 151:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 26);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 152:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 27);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 153:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 28);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 154:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 29);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 155:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 30);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 156:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 157:
                                {
                                    method_push_state(runtime, 32);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 158:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 159:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 160:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 19);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 161:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 20);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 162:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 21);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 163:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 22);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 164:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 23);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 165:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 24);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 166:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 25);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 167:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 26);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 168:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 27);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 169:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 28);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 170:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 29);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 171:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 30);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 172:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 173:
                                {
                                    method_push_state(runtime, 32);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 174:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 175:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 176:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 19);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 177:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 20);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 178:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 21);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 179:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 22);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 180:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 23);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 181:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 24);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 182:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 25);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 183:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 26);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 184:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 27);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 185:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 28);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 186:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 29);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 187:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_push_state(runtime, 30);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 188:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 189:
                                {
                                    method_push_state(runtime, 32);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 190:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 191:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 192:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((322) | 0);
                                    continue;
                                }
                            case 193:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((323) | 0);
                                    continue;
                                }
                            case 194:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((324) | 0);
                                    continue;
                                }
                            case 195:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((331) | 0);
                                    continue;
                                }
                            case 196:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((325) | 0);
                                    continue;
                                }
                            case 197:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((326) | 0);
                                    continue;
                                }
                            case 198:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((340) | 0);
                                    continue;
                                }
                            case 199:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((436) | 0);
                                    continue;
                                }
                            case 200:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((327) | 0);
                                    continue;
                                }
                            case 201:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((328) | 0);
                                    continue;
                                }
                            case 202:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((329) | 0);
                                    continue;
                                }
                            case 203:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((330) | 0);
                                    continue;
                                }
                            case 204:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((341) | 0);
                                    continue;
                                }
                            case 205:
                                {
                                    __switch_0 = ((422) | 0);
                                    continue;
                                }
                            case 206:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((341) | 0);
                                    continue;
                                }
                            case 207:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((438) | 0);
                                    continue;
                                }
                            case 208:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 19);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 209:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 20);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 210:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 21);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 211:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 35);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 212:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 23);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 213:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 24);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 214:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 25);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 215:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 26);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 216:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 27);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 217:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 28);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 218:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 29);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 219:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 30);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 220:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 221:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 222:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 223:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 224:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 19);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 225:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 20);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 226:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 21);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 227:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 35);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 228:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 23);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 229:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 24);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 230:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 25);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 231:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 26);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 232:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 27);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 233:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 28);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 234:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 29);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 235:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 30);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 236:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 237:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 238:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 239:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 240:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 19);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 241:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 20);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 242:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 21);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 243:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 35);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 244:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 23);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 245:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 24);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 246:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 25);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 247:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 26);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 248:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 27);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 249:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 28);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 250:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 29);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 251:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_push_state(runtime, 30);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 252:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 253:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 254:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 255:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            default:
                                {
                                    __switch_0 = ((450) | 0);
                                    continue;
                                }
                        }
                        return;
                    }
                case 251:
                    {
                        members.m_opcode = ((method_read_opcode__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 36);
                            return;
                        }
                    }
                case 252:
                    {
                        switch ((members.m_opcode ?? 0)) {
                            case 16:
                                {
                                    __switch_0 = ((251) | 0);
                                    continue;
                                }
                            case 17:
                                {
                                    __switch_0 = ((251) | 0);
                                    continue;
                                }
                            case 32:
                                {
                                    method_set_cond(runtime, 1);
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 33:
                                {
                                    method_set_cond(runtime, 0);
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 34:
                                {
                                    method_set_cond(runtime, method_cond_hi(runtime));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 35:
                                {
                                    method_set_cond(runtime, ((method_cond_hi(runtime)) ? 0 : 1));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 36:
                                {
                                    method_set_cond(runtime, method_cond_cc(runtime));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 37:
                                {
                                    method_set_cond(runtime, ((method_cond_cc(runtime)) ? 0 : 1));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 38:
                                {
                                    method_set_cond(runtime, method_cond_ne(runtime));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 39:
                                {
                                    method_set_cond(runtime, ((method_cond_ne(runtime)) ? 0 : 1));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 40:
                                {
                                    method_set_cond(runtime, method_cond_vc(runtime));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 41:
                                {
                                    method_set_cond(runtime, ((method_cond_vc(runtime)) ? 0 : 1));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 42:
                                {
                                    method_set_cond(runtime, method_cond_pl(runtime));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 43:
                                {
                                    method_set_cond(runtime, ((method_cond_pl(runtime)) ? 0 : 1));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 44:
                                {
                                    method_set_cond(runtime, method_cond_ge(runtime));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 45:
                                {
                                    method_set_cond(runtime, ((method_cond_ge(runtime)) ? 0 : 1));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 46:
                                {
                                    method_set_cond(runtime, method_cond_gt(runtime));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 47:
                                {
                                    method_set_cond(runtime, ((method_cond_gt(runtime)) ? 0 : 1));
                                    __switch_0 = ((358) | 0);
                                    continue;
                                }
                            case 62:
                                {
                                    __switch_0 = ((439) | 0);
                                    continue;
                                }
                            case 63:
                                {
                                    __switch_0 = ((405) | 0);
                                    continue;
                                }
                            case 131:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((337) | 0);
                                    continue;
                                }
                            case 135:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((436) | 0);
                                    continue;
                                }
                            case 140:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((337) | 0);
                                    continue;
                                }
                            case 142:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((341) | 0);
                                    continue;
                                }
                            case 143:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((438) | 0);
                                    continue;
                                }
                            case 147:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 156:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 158:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 159:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 163:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 172:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 174:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 175:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 179:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 188:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 190:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 191:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_y, set: (value) => { members.m_y = value; }, address: () => h_m_y }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 195:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((443) | 0);
                                    continue;
                                }
                            case 199:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((436) | 0);
                                    continue;
                                }
                            case 206:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((341) | 0);
                                    continue;
                                }
                            case 207:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((438) | 0);
                                    continue;
                                }
                            case 211:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 37);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 222:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 223:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 227:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 37);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 238:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 239:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 243:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_q.p.d, set: (value) => { h_m_q.p.d = value; }, address: () => runtime.fieldAddress(h_m_q.p, "d") }));
                                    method_push_state(runtime, 37);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 254:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 33);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 255:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 34);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            default:
                                {
                                    __switch_0 = ((249) | 0);
                                    continue;
                                }
                        }
                        return;
                    }
                case 253:
                    {
                        members.m_opcode = ((method_read_opcode__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 38);
                            return;
                        }
                    }
                case 254:
                    {
                        switch ((members.m_opcode ?? 0)) {
                            case 16:
                                {
                                    __switch_0 = ((253) | 0);
                                    continue;
                                }
                            case 17:
                                {
                                    __switch_0 = ((253) | 0);
                                    continue;
                                }
                            case 62:
                                {
                                    __switch_0 = ((446) | 0);
                                    continue;
                                }
                            case 63:
                                {
                                    __switch_0 = ((406) | 0);
                                    continue;
                                }
                            case 131:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((337) | 0);
                                    continue;
                                }
                            case 140:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((337) | 0);
                                    continue;
                                }
                            case 135:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.a, set: (value) => { h_m_q.r.a = value; }, address: () => runtime.fieldAddress(h_m_q.r, "a") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((436) | 0);
                                    continue;
                                }
                            case 143:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_x, set: (value) => { members.m_x = value; }, address: () => h_m_x }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((438) | 0);
                                    continue;
                                }
                            case 147:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 156:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 195:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((443) | 0);
                                    continue;
                                }
                            case 199:
                                {
                                    method_set_regop8(runtime, ({ generatedLValue: true, get: () => h_m_q.r.b, set: (value) => { h_m_q.r.b = value; }, address: () => runtime.fieldAddress(h_m_q.r, "b") }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((436) | 0);
                                    continue;
                                }
                            case 207:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_set_imm(runtime);
                                    __switch_0 = ((438) | 0);
                                    continue;
                                }
                            case 163:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 172:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 179:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 188:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                                    method_push_state(runtime, 31);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            case 211:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 37);
                                    __switch_0 = ((411) | 0);
                                    continue;
                                }
                            case 227:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 37);
                                    __switch_0 = ((418) | 0);
                                    continue;
                                }
                            case 243:
                                {
                                    method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                                    method_push_state(runtime, 37);
                                    __switch_0 = ((413) | 0);
                                    continue;
                                }
                            default:
                                {
                                    __switch_0 = ((249) | 0);
                                    continue;
                                }
                        }
                        return;
                    }
                case 255:
                    {
                        members.m_nmi_asserted = ((0) ? 1 : 0);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 39);
                            return;
                        }
                    }
                case 256:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 40);
                            return;
                        }
                    }
                case 257:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 41);
                            return;
                        }
                    }
                case 258:
                    {
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_push_state(runtime, 42);
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 259:
                    {
                        members.m_cc = ((((members.m_cc) | (80))) & 0xff);
                        method_set_ea(runtime, 65532);
                        (__L2 ? __L2(-1, h_m_pc.w) : runtime.macro("standard_irq_callback", -1, h_m_pc.w));
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 260:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 43);
                            return;
                        }
                    }
                case 261:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 44);
                            return;
                        }
                    }
                case 262:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 45);
                            return;
                        }
                    }
                case 263:
                    {
                        if (method_firq_saves_entire_state(runtime)) {
                            members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                            h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        }
                        else {
                            members.m_cc = ((((members.m_cc) & (-129))) & 0xff);
                            h_m_temp.w = ((method_partial_state_registers(runtime)) & 0xffff);
                        }
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        method_push_state(runtime, 46);
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 264:
                    {
                        members.m_cc = ((((members.m_cc) | (80))) & 0xff);
                        method_set_ea(runtime, 65526);
                        (__L2 ? __L2(1, h_m_pc.w) : runtime.macro("standard_irq_callback", 1, h_m_pc.w));
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 265:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 47);
                            return;
                        }
                    }
                case 266:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 48);
                            return;
                        }
                    }
                case 267:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 49);
                            return;
                        }
                    }
                case 268:
                    {
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_push_state(runtime, 50);
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 269:
                    {
                        members.m_cc = ((((members.m_cc) | (16))) & 0xff);
                        method_set_ea(runtime, 65528);
                        (__L2 ? __L2(0, h_m_pc.w) : runtime.macro("standard_irq_callback", 0, h_m_pc.w));
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 270:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 51);
                            return;
                        }
                    }
                case 271:
                    {
                        h_m_pc.b.h = ((method_read_vector(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 52);
                            return;
                        }
                    }
                case 272:
                    {
                        h_m_pc.b.l = ((method_read_vector(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 53);
                            return;
                        }
                    }
                case 273:
                    {
                        method_dummy_vma(runtime, 1);
                        return;
                    }
                case 274:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 54);
                            return;
                        }
                    }
                case 275:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 15, ((0) & 0xff), h_m_temp.b.l, (-h_m_temp.b.l))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((553) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 55);
                            return;
                        }
                    }
                case 451:
                    {
                    }
                case 553:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 276:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 56);
                            return;
                        }
                    }
                case 277:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (1))) & 0xff);
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__2(runtime, 12, (((~h_m_temp.b.l)) & 0xff))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((554) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 57);
                            return;
                        }
                    }
                case 452:
                    {
                    }
                case 554:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 278:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 58);
                            return;
                        }
                    }
                case 279:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__2(runtime, 12, ((h_m_temp.b.l) >>> (1)))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((555) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 59);
                            return;
                        }
                    }
                case 453:
                    {
                    }
                case 555:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 280:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 60);
                            return;
                        }
                    }
                case 281:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__2(runtime, 12, method_rotate_right__T_uint8_t(runtime, h_m_temp.b.l))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((556) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 61);
                            return;
                        }
                    }
                case 454:
                    {
                    }
                case 556:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 282:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 62);
                            return;
                        }
                    }
                case 283:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.b.l) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__2(runtime, 12, runtime.shiftRight(((h_m_temp.b.l) << 24 >> 24), 1))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((557) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 63);
                            return;
                        }
                    }
                case 455:
                    {
                    }
                case 557:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 284:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 64);
                            return;
                        }
                    }
                case 285:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 15, h_m_temp.b.l, h_m_temp.b.l, ((h_m_temp.b.l) << (1)))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((558) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 65);
                            return;
                        }
                    }
                case 456:
                    {
                    }
                case 558:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 286:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 66);
                            return;
                        }
                    }
                case 287:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 14, h_m_temp.b.l, h_m_temp.b.l, method_rotate_left__T_uint8_t(runtime, h_m_temp.b.l))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((559) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 67);
                            return;
                        }
                    }
                case 457:
                    {
                    }
                case 559:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 288:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 68);
                            return;
                        }
                    }
                case 289:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 14, h_m_temp.b.l, 1, ((h_m_temp.b.l) - (1)))) & 0xff);
                        if ((((((((method_hd6309_native_mode(runtime)) ? 0 : 1)) || (((method_is_register_addressing_mode(runtime)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((560) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 69);
                            return;
                        }
                    }
                case 458:
                    {
                    }
                case 560:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 290:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 70);
                            return;
                        }
                    }
                case 291:
                    {
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 14, h_m_temp.b.l, 1, ((h_m_temp.b.l) + (1)))) & 0xff);
                        if ((((((((method_hd6309_native_mode(runtime)) ? 0 : 1)) || (((method_is_register_addressing_mode(runtime)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((561) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 71);
                            return;
                        }
                    }
                case 459:
                    {
                    }
                case 561:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 292:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 72);
                            return;
                        }
                    }
                case 293:
                    {
                        method_set_flags__T_uint8_t__2(runtime, 14, h_m_temp.b.l);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((562) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 73);
                            return;
                        }
                    }
                case 460:
                    {
                    }
                case 562:
                    {
                        if (((((method_is_register_addressing_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((563) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 74);
                            return;
                        }
                    }
                case 461:
                    {
                    }
                case 563:
                    {
                        return;
                    }
                case 294:
                    {
                        h_m_pc.w = ((h_m_ea.w) & 0xffff);
                        return;
                    }
                case 295:
                    {
                        method_read_operand__0(runtime);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 75);
                            return;
                        }
                    }
                case 296:
                    {
                        members.m_cc = ((((members.m_cc) & (-16))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (4))) & 0xff);
                        if ((((((((method_hd6309_native_mode(runtime)) ? 0 : 1)) || (((method_is_register_addressing_mode(runtime)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((564) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 76);
                            return;
                        }
                    }
                case 462:
                    {
                    }
                case 564:
                    {
                        method_write_operand__1(runtime, 0);
                        return;
                    }
                case 297:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, ((0) & 0xffff), h_m_temp.w, (-h_m_temp.w))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((565) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 77);
                            return;
                        }
                    }
                case 463:
                    {
                    }
                case 565:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 298:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 78);
                            return;
                        }
                    }
                case 299:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 79);
                            return;
                        }
                    }
                case 300:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 12, ((h_m_temp.w) >>> (1)))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((566) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 80);
                            return;
                        }
                    }
                case 464:
                    {
                    }
                case 566:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 81);
                            return;
                        }
                    }
                case 301:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 302:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 82);
                            return;
                        }
                    }
                case 303:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 83);
                            return;
                        }
                    }
                case 304:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 12, method_rotate_right__T_uint16_t(runtime, h_m_temp.w))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((567) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 84);
                            return;
                        }
                    }
                case 465:
                    {
                    }
                case 567:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 85);
                            return;
                        }
                    }
                case 305:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 306:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 86);
                            return;
                        }
                    }
                case 307:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 87);
                            return;
                        }
                    }
                case 308:
                    {
                        members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (((((h_m_temp.w) & (1))) ? (1) : (0))))) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 12, runtime.shiftRight(((h_m_temp.w) << 16 >> 16), 1))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((568) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 88);
                            return;
                        }
                    }
                case 466:
                    {
                    }
                case 568:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 89);
                            return;
                        }
                    }
                case 309:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 310:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 90);
                            return;
                        }
                    }
                case 311:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 91);
                            return;
                        }
                    }
                case 312:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, h_m_temp.w, h_m_temp.w, ((h_m_temp.w) << (1)))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((569) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 92);
                            return;
                        }
                    }
                case 467:
                    {
                    }
                case 569:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 93);
                            return;
                        }
                    }
                case 313:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 314:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 94);
                            return;
                        }
                    }
                case 315:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 95);
                            return;
                        }
                    }
                case 316:
                    {
                        h_m_temp.w = ((method_set_flags__T_uint16_t__2(runtime, 14, method_rotate_left__T_uint16_t(runtime, h_m_temp.w))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((570) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 96);
                            return;
                        }
                    }
                case 468:
                    {
                    }
                case 570:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 97);
                            return;
                        }
                    }
                case 317:
                    {
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 318:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, h_m_temp.w, 1, ((h_m_temp.w) - (1)))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((571) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 98);
                            return;
                        }
                    }
                case 469:
                    {
                    }
                case 571:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 319:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        h_m_temp.w = ((method_set_flags__T_uint16_t__4(runtime, 15, h_m_temp.w, 1, ((h_m_temp.w) + (1)))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((572) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 99);
                            return;
                        }
                    }
                case 470:
                    {
                    }
                case 572:
                    {
                        method_write_operand__2(runtime, 0, h_m_temp.b.h);
                        method_write_operand__2(runtime, 1, h_m_temp.b.l);
                        return;
                    }
                case 320:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        method_set_flags__T_uint16_t__2(runtime, 14, h_m_temp.w);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((573) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 100);
                            return;
                        }
                    }
                case 471:
                    {
                    }
                case 573:
                    {
                        if (((((method_is_register_addressing_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((574) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 101);
                            return;
                        }
                    }
                case 472:
                    {
                    }
                case 574:
                    {
                        return;
                    }
                case 321:
                    {
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((575) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 102);
                            return;
                        }
                    }
                case 473:
                    {
                    }
                case 575:
                    {
                        members.m_cc = ((((members.m_cc) & (-16))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (4))) & 0xff);
                        method_write_operand__2(runtime, 0, 0);
                        method_write_operand__2(runtime, 1, 0);
                        return;
                    }
                case 322:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 15, method_regop8(runtime), h_m_temp.b.l, ((method_regop8(runtime)) - (h_m_temp.b.l))));
                        return;
                    }
                case 323:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_set_flags__T_uint8_t__4(runtime, 15, method_regop8(runtime), h_m_temp.b.l, ((method_regop8(runtime)) - (h_m_temp.b.l)));
                        return;
                    }
                case 324:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 15, method_regop8(runtime), h_m_temp.b.l, ((((method_regop8(runtime)) - (h_m_temp.b.l))) - ((((((members.m_cc ?? 0)) & (1))) ? (1) : (0))))));
                        return;
                    }
                case 325:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 12, ((0) & 0xff), method_regop8(runtime), ((method_regop8(runtime)) & (method_read_operand__0(runtime)))));
                        return;
                    }
                case 326:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        method_set_flags__T_uint8_t__4(runtime, 12, ((0) & 0xff), method_regop8(runtime), ((method_regop8(runtime)) & (method_read_operand__0(runtime))));
                        return;
                    }
                case 327:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 12, ((0) & 0xff), method_regop8(runtime), ((method_regop8(runtime)) ^ (method_read_operand__0(runtime)))));
                        return;
                    }
                case 328:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, ((method_add8_sets_h(runtime)) ? (47) : (15)), method_regop8(runtime), h_m_temp.b.l, __add_m6809_base_device__execute_one(runtime, ((method_regop8(runtime)) + (h_m_temp.b.l)), (((((members.m_cc ?? 0)) & (1))) ? (1) : (0)))));
                        return;
                    }
                case 329:
                    {
                        members.m_cc = ((((members.m_cc) & (-3))) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, 12, ((0) & 0xff), method_regop8(runtime), ((method_regop8(runtime)) | (method_read_operand__0(runtime)))));
                        return;
                    }
                case 330:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        method_regop8_(runtime, method_set_flags__T_uint8_t__4(runtime, ((method_add8_sets_h(runtime)) ? (47) : (15)), method_regop8(runtime), h_m_temp.b.l, ((method_regop8(runtime)) + (h_m_temp.b.l))));
                        return;
                    }
                case 331:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 103);
                            return;
                        }
                    }
                case 332:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 104);
                            return;
                        }
                    }
                case 333:
                    {
                        method_regop16(runtime).w = method_set_flags__T_uint16_t__4(runtime, 15, method_regop16(runtime).w, h_m_temp.w, ((method_regop16(runtime).w) + (h_m_temp.w)));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((576) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 105);
                            return;
                        }
                    }
                case 474:
                    {
                    }
                case 576:
                    {
                        return;
                    }
                case 334:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 106);
                            return;
                        }
                    }
                case 335:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 107);
                            return;
                        }
                    }
                case 336:
                    {
                        method_regop16(runtime).w = method_set_flags__T_uint16_t__4(runtime, 15, method_regop16(runtime).w, h_m_temp.w, ((method_regop16(runtime).w) - (h_m_temp.w)));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((577) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 108);
                            return;
                        }
                    }
                case 475:
                    {
                    }
                case 577:
                    {
                        return;
                    }
                case 337:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 109);
                            return;
                        }
                    }
                case 338:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 110);
                            return;
                        }
                    }
                case 339:
                    {
                        method_set_flags__T_uint16_t__4(runtime, 15, method_regop16(runtime).w, h_m_temp.w, ((method_regop16(runtime).w) - (h_m_temp.w)));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((578) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 111);
                            return;
                        }
                    }
                case 476:
                    {
                    }
                case 578:
                    {
                        return;
                    }
                case 340:
                    {
                        method_regop8_(runtime, method_read_operand__0(runtime));
                        method_set_flags__T_uint8_t__2(runtime, 14, method_regop8(runtime));
                        return;
                    }
                case 341:
                    {
                        method_regop16(runtime).b.h = method_read_operand__1(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 112);
                            return;
                        }
                    }
                case 342:
                    {
                        method_regop16(runtime).b.l = method_read_operand__1(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 113);
                            return;
                        }
                    }
                case 343:
                    {
                        method_set_flags__T_uint16_t__2(runtime, 14, method_regop16(runtime).w);
                        if ((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) {
                            members.m_lds_encountered = ((1) ? 1 : 0);
                        }
                        return;
                    }
                case 344:
                    {
                        method_write_ea(runtime, method_set_flags__T_uint8_t__2(runtime, 14, method_regop8(runtime)));
                        return;
                    }
                case 345:
                    {
                        method_write_operand__2(runtime, 0, method_regop16(runtime).b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 114);
                            return;
                        }
                    }
                case 346:
                    {
                        method_write_operand__2(runtime, 1, method_regop16(runtime).b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 115);
                            return;
                        }
                    }
                case 347:
                    {
                        method_set_flags__T_uint16_t__2(runtime, 14, method_regop16(runtime).w);
                        return;
                    }
                case 348:
                    {
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((579) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 116);
                            return;
                        }
                    }
                case 477:
                    {
                    }
                case 579:
                    {
                        return;
                    }
                case 349:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 117);
                            return;
                        }
                    }
                case 350:
                    {
                        (__L3 ? __L3(Number(1)) : typeof members.m_syncack_write_func === 'function' ? members.m_syncack_write_func(1) : runtime.invoke("m_syncack_write_func", 1));
                    }
                case 580:
                    {
                        if ((((((((((((members.m_nmi_asserted ?? 0)) ? 0 : 1)) && ((((members.m_firq_line ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((((members.m_irq_line ?? 0)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((581) | 0);
                            continue;
                        }
                        method_eat_remaining(runtime);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 118);
                            return;
                        }
                    }
                case 478:
                    {
                        __switch_0 = ((580) | 0);
                        continue;
                    }
                case 581:
                    {
                        (__L3 ? __L3(Number(0)) : typeof members.m_syncack_write_func === 'function' ? members.m_syncack_write_func(0) : runtime.invoke("m_syncack_write_func", 0));
                        method_eat(runtime, 1);
                        return;
                    }
                case 351:
                    {
                        method_daa(runtime);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((582) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 119);
                            return;
                        }
                    }
                case 479:
                    {
                    }
                case 582:
                    {
                        return;
                    }
                case 352:
                    {
                        members.m_cc = ((((members.m_cc) | (method_read_operand__0(runtime)))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((583) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 120);
                            return;
                        }
                    }
                case 480:
                    {
                    }
                case 583:
                    {
                        return;
                    }
                case 353:
                    {
                        members.m_cc = ((((members.m_cc) & (method_read_operand__0(runtime)))) & 0xff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((584) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 121);
                            return;
                        }
                    }
                case 481:
                    {
                    }
                case 584:
                    {
                        return;
                    }
                case 354:
                    {
                        h_m_q.r.d = method_set_flags__T_uint16_t__2(runtime, 12, ((h_m_q.r.b) << 24 >> 24));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((585) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 122);
                            return;
                        }
                    }
                case 482:
                    {
                    }
                case 585:
                    {
                        return;
                    }
                case 355:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 123);
                            return;
                        }
                    }
                case 356:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 124);
                            return;
                        }
                    }
                case 357:
                    {
                        if (method_branch_taken(runtime)) {
                            h_m_pc.w = ((((h_m_pc.w) + (((h_m_temp.b.l) << 24 >> 24)))) & 0xffff);
                        }
                        return;
                    }
                case 358:
                    {
                        h_m_temp.b.h = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 125);
                            return;
                        }
                    }
                case 359:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 126);
                            return;
                        }
                    }
                case 360:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 127);
                            return;
                        }
                    }
                case 361:
                    {
                        if (((method_branch_taken(runtime)) ? 0 : 1)) {
                            __switch_0 = ((586) | 0);
                            continue;
                        }
                        h_m_pc.w = ((((h_m_pc.w) + (h_m_temp.w))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((587) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 128);
                            return;
                        }
                    }
                case 483:
                    {
                    }
                case 587:
                    {
                    }
                case 586:
                    {
                        return;
                    }
                case 362:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 129);
                            return;
                        }
                    }
                case 363:
                    {
                        h_m_ea.w = ((((h_m_pc.w) + (((h_m_temp.b.l) << 24 >> 24)))) & 0xffff);
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (2) : (3)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 130);
                            return;
                        }
                    }
                case 364:
                    {
                        __switch_0 = ((372) | 0);
                        continue;
                    }
                case 365:
                    {
                        h_m_temp.b.h = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 131);
                            return;
                        }
                    }
                case 366:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 132);
                            return;
                        }
                    }
                case 367:
                    {
                        h_m_ea.w = ((((h_m_pc.w) + (((h_m_temp.w) << 16 >> 16)))) & 0xffff);
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (2) : (4)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 133);
                            return;
                        }
                    }
                case 368:
                    {
                        __switch_0 = ((372) | 0);
                        continue;
                    }
                case 369:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 134);
                            return;
                        }
                    }
                case 370:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 135);
                            return;
                        }
                    }
                case 371:
                    {
                        __switch_0 = ((372) | 0);
                        continue;
                    }
                case 372:
                    {
                        method_write_memory(runtime, (h_m_s.w = ((((h_m_s.w) - (1))) & 0xffff)), h_m_pc.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 136);
                            return;
                        }
                    }
                case 373:
                    {
                        method_write_memory(runtime, (h_m_s.w = ((((h_m_s.w) - (1))) & 0xffff)), h_m_pc.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 137);
                            return;
                        }
                    }
                case 374:
                    {
                        h_m_pc.w = ((h_m_ea.w) & 0xffff);
                        return;
                    }
                case 375:
                    {
                        h_m_temp.w = ((128) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((588) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 138);
                            return;
                        }
                    }
                case 484:
                    {
                    }
                case 588:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 376:
                    {
                        h_m_x.w = ((((h_m_x.w) + (h_m_q.r.b))) & 0xffff);
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((589) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 139);
                            return;
                        }
                    }
                case 485:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 140);
                            return;
                        }
                    }
                case 486:
                    {
                    }
                case 589:
                    {
                        return;
                    }
                case 377:
                    {
                        method_mul(runtime);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 141);
                            return;
                        }
                    }
                case 378:
                    {
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (8) : (9)));
                        return;
                    }
                case 379:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 142);
                            return;
                        }
                    }
                case 380:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        members.m_cc = ((method_read_memory(runtime, (__t0 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t0))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 143);
                            return;
                        }
                    }
                case 381:
                    {
                        h_m_temp.w = (((((((((members.m_cc ?? 0)) & (128))) ? (method_entire_state_registers(runtime)) : (method_partial_state_registers(runtime)))) & (-2))) & 0xffff);
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 382:
                    {
                        members.m_cc = ((((members.m_cc) & (method_read_opcode_arg__0(runtime)))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 144);
                            return;
                        }
                    }
                case 383:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 145);
                            return;
                        }
                    }
                case 384:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 146);
                            return;
                        }
                    }
                case 385:
                    {
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_push_state(runtime, 147);
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 386:
                    {
                    }
                case 590:
                    {
                        if (((((Number((h_m_ea.w = ((method_get_pending_interrupt(runtime)) & 0xffff))) === Number(0)) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((591) | 0);
                            continue;
                        }
                        method_eat_remaining(runtime);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 148);
                            return;
                        }
                    }
                case 487:
                    {
                        __switch_0 = ((590) | 0);
                        continue;
                    }
                case 591:
                    {
                        if ((members.m_nmi_asserted ?? 0)) {
                            members.m_nmi_asserted = ((0) ? 1 : 0);
                        }
                        method_set_ea(runtime, h_m_ea.w);
                        members.m_cc = ((((members.m_cc) | (((16) | (((((Number(h_m_ea.w) !== Number(65528)) ? 1 : 0)) ? (64) : (0))))))) & 0xff);
                        switch (h_m_ea.w) {
                            case 65532:
                                {
                                    (__L2 ? __L2(-1, h_m_pc.w) : runtime.macro("standard_irq_callback", -1, h_m_pc.w));
                                    break;
                                }
                            case 65526:
                                {
                                    (__L2 ? __L2(1, h_m_pc.w) : runtime.macro("standard_irq_callback", 1, h_m_pc.w));
                                    break;
                                }
                            case 65528:
                                {
                                    (__L2 ? __L2(0, h_m_pc.w) : runtime.macro("standard_irq_callback", 0, h_m_pc.w));
                                    break;
                                }
                            default:
                                {
                                    break;
                                }
                        }
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 387:
                    {
                        method_regop16(runtime).w = method_set_flags__T_uint16_t__2(runtime, 4, h_m_ea.w);
                        method_dummy_vma(runtime, 1);
                        return;
                    }
                case 388:
                    {
                        if ((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) {
                            members.m_lds_encountered = ((1) ? 1 : 0);
                        }
                        method_regop16(runtime).w = h_m_ea.w;
                        method_dummy_vma(runtime, 1);
                        return;
                    }
                case 389:
                    {
                        h_m_temp.w = ((method_read_opcode_arg__0(runtime)) & 0xffff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 149);
                            return;
                        }
                    }
                case 390:
                    {
                        method_dummy_vma(runtime, 2);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 150);
                            return;
                        }
                    }
                case 391:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((592) | 0);
                            continue;
                        }
                        method_read_memory(runtime, method_regop16(runtime).w);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 151);
                            return;
                        }
                    }
                case 488:
                    {
                    }
                case 592:
                    {
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 392:
                    {
                        h_m_temp.w = ((method_read_opcode_arg__0(runtime)) & 0xffff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 152);
                            return;
                        }
                    }
                case 393:
                    {
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (1) : (2)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 153);
                            return;
                        }
                    }
                case 394:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 395:
                    {
                        h_m_temp.w = ((method_read_opcode_arg__0(runtime)) & 0xffff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 154);
                            return;
                        }
                    }
                case 396:
                    {
                        method_dummy_vma(runtime, 2);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 155);
                            return;
                        }
                    }
                case 397:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((593) | 0);
                            continue;
                        }
                        method_read_memory(runtime, method_regop16(runtime).w);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 156);
                            return;
                        }
                    }
                case 489:
                    {
                    }
                case 593:
                    {
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 398:
                    {
                        h_m_temp.w = ((method_read_opcode_arg__0(runtime)) & 0xffff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 157);
                            return;
                        }
                    }
                case 399:
                    {
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (1) : (2)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 158);
                            return;
                        }
                    }
                case 400:
                    {
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_u, set: (value) => { members.m_u = value; }, address: () => h_m_u }));
                        __switch_0 = ((417) | 0);
                        continue;
                    }
                case 401:
                    {
                        method_set_ea(runtime, 65530);
                        /* debugger_exception_hook: no effect */
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 159);
                            return;
                        }
                    }
                case 402:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 160);
                            return;
                        }
                    }
                case 403:
                    {
                        method_push_state(runtime, 161);
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 404:
                    {
                        members.m_cc = ((((members.m_cc) | (80))) & 0xff);
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 405:
                    {
                        method_set_ea(runtime, 65524);
                        /* debugger_exception_hook: no effect */
                        __switch_0 = ((407) | 0);
                        continue;
                    }
                case 406:
                    {
                        method_set_ea(runtime, 65522);
                        /* debugger_exception_hook: no effect */
                        __switch_0 = ((407) | 0);
                        continue;
                    }
                case 407:
                    {
                        members.m_cc = ((((members.m_cc) | (128))) & 0xff);
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 162);
                            return;
                        }
                    }
                case 408:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 163);
                            return;
                        }
                    }
                case 409:
                    {
                        method_push_state(runtime, 164);
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 410:
                    {
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 411:
                    {
                        method_set_ea(runtime, (((((((members.m_dp ?? 0)) & 0xffff)) << (8))) | (method_read_opcode_arg__0(runtime))));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 165);
                            return;
                        }
                    }
                case 412:
                    {
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((594) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 166);
                            return;
                        }
                    }
                case 490:
                    {
                    }
                case 594:
                    {
                        return;
                    }
                case 413:
                    {
                        method_set_ea_h(runtime, method_read_opcode_arg__0(runtime));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 167);
                            return;
                        }
                    }
                case 414:
                    {
                        method_set_ea_l(runtime, method_read_opcode_arg__0(runtime));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 168);
                            return;
                        }
                    }
                case 415:
                    {
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((595) | 0);
                            continue;
                        }
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 169);
                            return;
                        }
                    }
                case 491:
                    {
                    }
                case 595:
                    {
                        return;
                    }
                case 416:
                    {
                        if (((((h_m_temp.w) & (128))) ? 0 : 1)) {
                            __switch_0 = ((596) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_pc.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 170);
                            return;
                        }
                    }
                case 492:
                    {
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_pc.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 171);
                            return;
                        }
                    }
                case 493:
                    {
                        method_nop(runtime);
                    }
                case 596:
                    {
                        if (((((h_m_temp.w) & (64))) ? 0 : 1)) {
                            __switch_0 = ((597) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), (((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) ? (h_m_u.b.l) : (h_m_s.b.l)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 172);
                            return;
                        }
                    }
                case 494:
                    {
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), (((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) ? (h_m_u.b.h) : (h_m_s.b.h)));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 173);
                            return;
                        }
                    }
                case 495:
                    {
                        method_nop(runtime);
                    }
                case 597:
                    {
                        if (((((h_m_temp.w) & (32))) ? 0 : 1)) {
                            __switch_0 = ((598) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_y.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 174);
                            return;
                        }
                    }
                case 496:
                    {
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_y.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 175);
                            return;
                        }
                    }
                case 497:
                    {
                        method_nop(runtime);
                    }
                case 598:
                    {
                        if (((((h_m_temp.w) & (16))) ? 0 : 1)) {
                            __switch_0 = ((599) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_x.b.l);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 176);
                            return;
                        }
                    }
                case 498:
                    {
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_x.b.h);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 177);
                            return;
                        }
                    }
                case 499:
                    {
                        method_nop(runtime);
                    }
                case 599:
                    {
                        if (((((h_m_temp.w) & (8))) ? 0 : 1)) {
                            __switch_0 = ((600) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), (members.m_dp ?? 0));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 178);
                            return;
                        }
                    }
                case 500:
                    {
                        method_nop(runtime);
                    }
                case 600:
                    {
                        if (((((h_m_temp.w) & (4))) ? 0 : 1)) {
                            __switch_0 = ((601) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_q.r.b);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 179);
                            return;
                        }
                    }
                case 501:
                    {
                        method_nop(runtime);
                    }
                case 601:
                    {
                        if (((((h_m_temp.w) & (2))) ? 0 : 1)) {
                            __switch_0 = ((602) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), h_m_q.r.a);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 180);
                            return;
                        }
                    }
                case 502:
                    {
                        method_nop(runtime);
                    }
                case 602:
                    {
                        if (((((h_m_temp.w) & (1))) ? 0 : 1)) {
                            __switch_0 = ((603) | 0);
                            continue;
                        }
                        method_write_memory(runtime, (method_regop16(runtime).w = runtime.subtract(method_regop16(runtime).w, 1)), (members.m_cc ?? 0));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 181);
                            return;
                        }
                    }
                case 503:
                    {
                        method_nop(runtime);
                    }
                case 603:
                    {
                        return;
                    }
                case 417:
                    {
                        if (((((h_m_temp.w) & (1))) ? 0 : 1)) {
                            __switch_0 = ((604) | 0);
                            continue;
                        }
                        members.m_cc = ((method_read_memory(runtime, (__t1 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t1))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 182);
                            return;
                        }
                    }
                case 504:
                    {
                        method_nop(runtime);
                    }
                case 604:
                    {
                        if (((((h_m_temp.w) & (2))) ? 0 : 1)) {
                            __switch_0 = ((605) | 0);
                            continue;
                        }
                        h_m_q.r.a = method_read_memory(runtime, (__t2 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t2));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 183);
                            return;
                        }
                    }
                case 505:
                    {
                        method_nop(runtime);
                    }
                case 605:
                    {
                        if (((((h_m_temp.w) & (4))) ? 0 : 1)) {
                            __switch_0 = ((606) | 0);
                            continue;
                        }
                        h_m_q.r.b = method_read_memory(runtime, (__t3 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t3));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 184);
                            return;
                        }
                    }
                case 506:
                    {
                        method_nop(runtime);
                    }
                case 606:
                    {
                        if (((((h_m_temp.w) & (8))) ? 0 : 1)) {
                            __switch_0 = ((607) | 0);
                            continue;
                        }
                        members.m_dp = ((method_read_memory(runtime, (__t4 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t4))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 185);
                            return;
                        }
                    }
                case 507:
                    {
                        method_nop(runtime);
                    }
                case 607:
                    {
                        if (((((h_m_temp.w) & (16))) ? 0 : 1)) {
                            __switch_0 = ((608) | 0);
                            continue;
                        }
                        h_m_x.b.h = ((method_read_memory(runtime, (__t5 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t5))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 186);
                            return;
                        }
                    }
                case 508:
                    {
                        h_m_x.b.l = ((method_read_memory(runtime, (__t6 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t6))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 187);
                            return;
                        }
                    }
                case 509:
                    {
                        method_nop(runtime);
                    }
                case 608:
                    {
                        if (((((h_m_temp.w) & (32))) ? 0 : 1)) {
                            __switch_0 = ((609) | 0);
                            continue;
                        }
                        h_m_y.b.h = ((method_read_memory(runtime, (__t7 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t7))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 188);
                            return;
                        }
                    }
                case 510:
                    {
                        h_m_y.b.l = ((method_read_memory(runtime, (__t8 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t8))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 189);
                            return;
                        }
                    }
                case 511:
                    {
                        method_nop(runtime);
                    }
                case 609:
                    {
                        if (((((h_m_temp.w) & (64))) ? 0 : 1)) {
                            __switch_0 = ((610) | 0);
                            continue;
                        }
                        (((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) ? (h_m_u) : (h_m_s)).b.h = method_read_memory(runtime, (__t9 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t9));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 190);
                            return;
                        }
                    }
                case 512:
                    {
                        (((runtime.same((() => { const __held = method_regop16(runtime); return __held !== null && typeof __held === 'object' ? runtime.objectAddress(__held) : { generatedPointer: true, target: { generatedLValue: true, get: () => method_regop16(runtime), set: (__value) => method_regop16_(runtime, __value) }, offset: 0 }; })(), h_m_s) ? 1 : 0)) ? (h_m_u) : (h_m_s)).b.l = method_read_memory(runtime, (__t10 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t10));
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 191);
                            return;
                        }
                    }
                case 513:
                    {
                        method_nop(runtime);
                    }
                case 610:
                    {
                        if (((((h_m_temp.w) & (128))) ? 0 : 1)) {
                            __switch_0 = ((611) | 0);
                            continue;
                        }
                        h_m_pc.b.h = ((method_read_memory(runtime, (__t11 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t11))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 192);
                            return;
                        }
                    }
                case 514:
                    {
                        h_m_pc.b.l = ((method_read_memory(runtime, (__t12 = method_regop16(runtime).w, method_regop16(runtime).w = __add_m6809_base_device__execute_one(runtime, method_regop16(runtime).w, 1), __t12))) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 193);
                            return;
                        }
                    }
                case 515:
                    {
                        method_nop(runtime);
                    }
                case 611:
                    {
                        method_read_memory(runtime, method_regop16(runtime).w);
                        return;
                    }
                case 418:
                    {
                        members.m_opcode = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 194);
                            return;
                        }
                    }
                case 419:
                    {
                        if ((((((members.m_opcode ?? 0)) & (128))) ? 0 : 1)) {
                            __switch_0 = ((612) | 0);
                            continue;
                        }
                        __switch_0_selected_61 = (((((members.m_opcode ?? 0)) & (127))) | 0);
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (0)) ? 1 : 0)) || ((((__switch_0_selected_61) === (32)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (64)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (96)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (16)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (48)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (80)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (112)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((613) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (1)) ? 1 : 0)) || ((((__switch_0_selected_61) === (33)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (65)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (97)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (17)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (49)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (81)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (113)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((614) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (2)) ? 1 : 0)) || ((((__switch_0_selected_61) === (34)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (66)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (98)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (18)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (50)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (82)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (114)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((615) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (3)) ? 1 : 0)) || ((((__switch_0_selected_61) === (35)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (67)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (99)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (19)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (51)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (83)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (115)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((616) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (4)) ? 1 : 0)) || ((((__switch_0_selected_61) === (36)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (68)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (100)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (20)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (52)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (84)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (116)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((617) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (5)) ? 1 : 0)) || ((((__switch_0_selected_61) === (37)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (69)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (101)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (21)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (53)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (85)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (117)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((618) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (6)) ? 1 : 0)) || ((((__switch_0_selected_61) === (38)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (70)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (102)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (22)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (54)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (86)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (118)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((619) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (8)) ? 1 : 0)) || ((((__switch_0_selected_61) === (40)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (72)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (104)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (24)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (56)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (88)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (120)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((620) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (9)) ? 1 : 0)) || ((((__switch_0_selected_61) === (41)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (73)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (105)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (25)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (57)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (89)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (121)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((621) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (11)) ? 1 : 0)) || ((((__switch_0_selected_61) === (43)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (75)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (107)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (27)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (59)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (91)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (123)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((622) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (12)) ? 1 : 0)) || ((((__switch_0_selected_61) === (44)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (76)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (108)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (28)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (60)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (92)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (124)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((623) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (13)) ? 1 : 0)) || ((((__switch_0_selected_61) === (45)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (77)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (109)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (29)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (61)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (93)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (125)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((624) | 0);
                            continue;
                        }
                        if (((((((((((((((((((((((((__switch_0_selected_61) === (15)) ? 1 : 0)) || ((((__switch_0_selected_61) === (47)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (79)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (111)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (31)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (63)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (95)) ? 1 : 0))) ? 1 : 0)) || ((((__switch_0_selected_61) === (127)) ? 1 : 0))) ? 1 : 0)) {
                            __switch_0 = ((625) | 0);
                            continue;
                        }
                        __switch_0 = ((626) | 0);
                        continue;
                    }
                case 613:
                    {
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_ireg_(runtime, ((method_ireg(runtime)) + (1)));
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 195);
                            return;
                        }
                    }
                case 516:
                    {
                        method_dummy_vma(runtime, 2);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 196);
                            return;
                        }
                    }
                case 517:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 614:
                    {
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_ireg_(runtime, ((method_ireg(runtime)) + (2)));
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 197);
                            return;
                        }
                    }
                case 518:
                    {
                        method_dummy_vma(runtime, 3);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 198);
                            return;
                        }
                    }
                case 519:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 615:
                    {
                        method_ireg_(runtime, ((method_ireg(runtime)) - (1)));
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 199);
                            return;
                        }
                    }
                case 520:
                    {
                        method_dummy_vma(runtime, 2);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 200);
                            return;
                        }
                    }
                case 521:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 616:
                    {
                        method_ireg_(runtime, ((method_ireg(runtime)) - (2)));
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 201);
                            return;
                        }
                    }
                case 522:
                    {
                        method_dummy_vma(runtime, 3);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 202);
                            return;
                        }
                    }
                case 523:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 617:
                    {
                        h_m_temp.w = ((method_ireg(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 203);
                            return;
                        }
                    }
                case 524:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 618:
                    {
                        h_m_temp.w = ((((method_ireg(runtime)) + (((h_m_q.r.b) << 24 >> 24)))) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 204);
                            return;
                        }
                    }
                case 525:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 205);
                            return;
                        }
                    }
                case 526:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 619:
                    {
                        h_m_temp.w = ((((method_ireg(runtime)) + (((h_m_q.r.a) << 24 >> 24)))) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 206);
                            return;
                        }
                    }
                case 527:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 207);
                            return;
                        }
                    }
                case 528:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 620:
                    {
                        h_m_temp.w = ((((method_ireg(runtime)) + (((method_read_opcode_arg__0(runtime)) << 24 >> 24)))) & 0xffff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 208);
                            return;
                        }
                    }
                case 529:
                    {
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 209);
                            return;
                        }
                    }
                case 530:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 621:
                    {
                        h_m_temp.b.h = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 210);
                            return;
                        }
                    }
                case 531:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 211);
                            return;
                        }
                    }
                case 532:
                    {
                        h_m_temp.w = ((((method_ireg(runtime)) + (h_m_temp.w))) & 0xffff);
                        method_dummy_vma(runtime, 3);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 212);
                            return;
                        }
                    }
                case 533:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 622:
                    {
                        h_m_temp.w = ((__add_m6809_base_device__execute_one(runtime, method_ireg(runtime), h_m_q.r.d)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 213);
                            return;
                        }
                    }
                case 534:
                    {
                        method_dummy_read_opcode_arg(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 214);
                            return;
                        }
                    }
                case 535:
                    {
                        method_dummy_vma(runtime, 3);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 215);
                            return;
                        }
                    }
                case 536:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 623:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 216);
                            return;
                        }
                    }
                case 537:
                    {
                        h_m_temp.w = ((((h_m_pc.w) + (((h_m_temp.b.l) << 24 >> 24)))) & 0xffff);
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 217);
                            return;
                        }
                    }
                case 538:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 624:
                    {
                        h_m_temp.b.h = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 218);
                            return;
                        }
                    }
                case 539:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 219);
                            return;
                        }
                    }
                case 540:
                    {
                        h_m_temp.w = ((((h_m_pc.w) + (((h_m_temp.w) << 16 >> 16)))) & 0xffff);
                        method_dummy_vma(runtime, 4);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 220);
                            return;
                        }
                    }
                case 541:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 625:
                    {
                        h_m_temp.b.h = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 221);
                            return;
                        }
                    }
                case 542:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 222);
                            return;
                        }
                    }
                case 543:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 223);
                            return;
                        }
                    }
                case 544:
                    {
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 626:
                    {
                        h_m_temp.w = ((0) & 0xffff);
                        __switch_0 = ((627) | 0);
                        continue;
                    }
                case 627:
                    {
                        if ((((((members.m_opcode ?? 0)) & (16))) ? 0 : 1)) {
                            __switch_0 = ((628) | 0);
                            continue;
                        }
                        method_set_ea(runtime, h_m_temp.w);
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 224);
                            return;
                        }
                    }
                case 545:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 225);
                            return;
                        }
                    }
                case 546:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 226);
                            return;
                        }
                    }
                case 547:
                    {
                    }
                case 628:
                    {
                        __switch_0 = ((629) | 0);
                        continue;
                    }
                case 612:
                    {
                        h_m_temp.w = ((((method_ireg(runtime)) + ((((((((members.m_opcode ?? 0)) & (15))) | ((((((members.m_opcode ?? 0)) & (16))) ? (240) : (0))))) << 24 >> 24)))) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 227);
                            return;
                        }
                    }
                case 548:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 228);
                            return;
                        }
                    }
                case 549:
                    {
                    }
                case 629:
                    {
                        method_set_ea(runtime, h_m_temp.w);
                        return;
                    }
                case 420:
                    {
                        param = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        if ((((param) >>> (7)) & 1)) {
                            reg1 = ((method_read_tfr_exg_816_register(runtime, ((param) >>> (4)))) & 0xffff);
                            reg2 = ((method_read_tfr_exg_816_register(runtime, ((param) >>> (0)))) & 0xffff);
                        }
                        else {
                            reg1 = ((method_read_exg_168_register(runtime, ((param) >>> (4)))) & 0xffff);
                            reg2 = ((method_read_exg_168_register(runtime, ((param) >>> (0)))) & 0xffff);
                        }
                        method_write_exgtfr_register(runtime, ((param) >>> (0)), reg1);
                        method_write_exgtfr_register(runtime, ((param) >>> (4)), reg2);
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (3) : (6)));
                        return;
                    }
                case 421:
                    {
                        param = ((method_read_opcode_arg__0(runtime)) & 0xff);
                        reg = ((method_read_tfr_exg_816_register(runtime, ((param) >>> (4)))) & 0xffff);
                        method_write_exgtfr_register(runtime, ((param) >>> (0)), reg);
                        if (((Number(((param) & (15))) === Number(4)) ? 1 : 0)) {
                            members.m_lds_encountered = ((1) ? 1 : 0);
                        }
                        method_dummy_vma(runtime, ((method_hd6309_native_mode(runtime)) ? (2) : (4)));
                        return;
                    }
                case 422:
                    {
                        members.m_free_run = ((1) ? 1 : 0);
                        return;
                    }
                case 423:
                    {
                        h_m_temp.b.l = ((method_read_opcode_arg__1(runtime, h_m_pc.w)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 229);
                            return;
                        }
                    }
                case 424:
                    {
                        h_m_temp.b.l = (((((((members.m_cc ?? 0)) & (h_m_temp.b.l))) << (1))) & 0xff);
                        members.m_cc = ((((h_m_temp.b.l) | (runtime.shiftRight((((members.m_cc ?? 0)) & (4)), 1)))) & 0xff);
                        return;
                    }
                case 425:
                    {
                        method_eat(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 230);
                            return;
                        }
                    }
                case 426:
                    {
                        __switch_0 = ((353) | 0);
                        continue;
                    }
                case 427:
                    {
                        method_set_ea(runtime, 65534);
                        /* debugger_exception_hook: no effect */
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 231);
                            return;
                        }
                    }
                case 428:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 232);
                            return;
                        }
                    }
                case 429:
                    {
                        method_push_state(runtime, 233);
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 430:
                    {
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 431:
                    {
                        if ((((members.m_cc ?? 0)) & (1))) {
                            __switch_0 = ((276) | 0);
                            continue;
                        }
                        else {
                            __switch_0 = ((274) | 0);
                            continue;
                        }
                    }
                case 432:
                    {
                        h_m_temp.b.l = ((method_read_operand__0(runtime)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 234);
                            return;
                        }
                    }
                case 433:
                    {
                        if (h_m_temp.b.l) {
                            members.m_cc = ((((members.m_cc) | (1))) & 0xff);
                        }
                        else {
                            members.m_cc = ((((members.m_cc) & (-2))) & 0xff);
                        }
                        h_m_temp.b.l = ((method_set_flags__T_uint8_t__4(runtime, 14, h_m_temp.b.l, 1, ((h_m_temp.b.l) - (1)))) & 0xff);
                        if ((((((((method_hd6309_native_mode(runtime)) ? 0 : 1)) || (((method_is_register_addressing_mode(runtime)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((630) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 235);
                            return;
                        }
                    }
                case 550:
                    {
                    }
                case 630:
                    {
                        method_write_operand__1(runtime, h_m_temp.b.l);
                        return;
                    }
                case 434:
                    {
                        method_read_operand__0(runtime);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 236);
                            return;
                        }
                    }
                case 435:
                    {
                        members.m_cc = ((((members.m_cc) & (-15))) & 0xff);
                        members.m_cc = ((((members.m_cc) | (4))) & 0xff);
                        if ((((((((method_hd6309_native_mode(runtime)) ? 0 : 1)) || (((method_is_register_addressing_mode(runtime)) ? 0 : 1))) ? 1 : 0)) ? 0 : 1)) {
                            __switch_0 = ((631) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 237);
                            return;
                        }
                    }
                case 551:
                    {
                    }
                case 631:
                    {
                        method_write_operand__1(runtime, 0);
                        return;
                    }
                case 436:
                    {
                        method_read_operand__0(runtime);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 238);
                            return;
                        }
                    }
                case 437:
                    {
                        method_set_flags__T_uint8_t__2(runtime, 14, method_regop8(runtime));
                        return;
                    }
                case 438:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        method_write_memory(runtime, (__t13 = h_m_pc.w, h_m_pc.w = ((((h_m_pc.w) + (1))) & 0xffff), __t13), method_regop16(runtime).b.l);
                        method_set_flags__T_uint16_t__2(runtime, 14, method_regop16(runtime).w);
                        return;
                    }
                case 439:
                    {
                        method_set_ea(runtime, 65524);
                        /* debugger_exception_hook: no effect */
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 239);
                            return;
                        }
                    }
                case 440:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 240);
                            return;
                        }
                    }
                case 441:
                    {
                        method_push_state(runtime, 241);
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 442:
                    {
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 443:
                    {
                        h_m_temp.b.h = ((method_read_operand__1(runtime, 0)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 242);
                            return;
                        }
                    }
                case 444:
                    {
                        h_m_temp.b.l = ((method_read_operand__1(runtime, 1)) & 0xff);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 243);
                            return;
                        }
                    }
                case 445:
                    {
                        method_set_flags__T_uint16_t__4(runtime, 15, method_regop16(runtime).w, h_m_temp.w, ((method_regop16(runtime).w) + (h_m_temp.w)));
                        if (((((method_hd6309_native_mode(runtime)) ? 0 : 1)) ? 0 : 1)) {
                            __switch_0 = ((632) | 0);
                            continue;
                        }
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 244);
                            return;
                        }
                    }
                case 552:
                    {
                    }
                case 632:
                    {
                        return;
                    }
                case 446:
                    {
                        method_set_ea(runtime, 65526);
                        /* debugger_exception_hook: no effect */
                        method_set_regop16(runtime, ({ generatedLValue: true, get: () => h_m_s, set: (value) => { members.m_s = value; }, address: () => h_m_s }));
                        h_m_temp.w = ((method_entire_state_registers(runtime)) & 0xffff);
                        method_dummy_read_opcode_arg(runtime, 0);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 245);
                            return;
                        }
                    }
                case 447:
                    {
                        method_dummy_vma(runtime, 1);
                        if (((((members.m_icount ?? 0)) <= (0)) ? 1 : 0)) {
                            method_push_state(runtime, 246);
                            return;
                        }
                    }
                case 448:
                    {
                        method_push_state(runtime, 247);
                        __switch_0 = ((416) | 0);
                        continue;
                    }
                case 449:
                    {
                        __switch_0 = ((270) | 0);
                        continue;
                    }
                case 450:
                    {
                        method_log_illegal(runtime);
                        return;
                    }
            }
            break;
        }
    }
    function __add_m6809_base_device__execute_one(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_read_tfr_exg_816_register(runtime, reg) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        const h_m_q = members.m_q ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let result = ((0) & 0xffff);
        switch (((reg) & (15))) {
            case 0:
                {
                    result = ((h_m_q.r.d) & 0xffff);
                    break;
                }
            case 1:
                {
                    result = ((h_m_x.w) & 0xffff);
                    break;
                }
            case 2:
                {
                    result = ((h_m_y.w) & 0xffff);
                    break;
                }
            case 3:
                {
                    result = ((h_m_u.w) & 0xffff);
                    break;
                }
            case 4:
                {
                    result = ((h_m_s.w) & 0xffff);
                    break;
                }
            case 5:
                {
                    result = ((h_m_pc.w) & 0xffff);
                    break;
                }
            case 8:
                {
                    result = ((((((65280) & 0xffff)) | (h_m_q.r.a))) & 0xffff);
                    break;
                }
            case 9:
                {
                    result = ((((((65280) & 0xffff)) | (h_m_q.r.b))) & 0xffff);
                    break;
                }
            case 10:
                {
                    result = (((((((((members.m_cc ?? 0)) & 0xffff)) << (8))) | ((members.m_cc ?? 0)))) & 0xffff);
                    break;
                }
            case 11:
                {
                    result = (((((((((members.m_dp ?? 0)) & 0xffff)) << (8))) | ((members.m_dp ?? 0)))) & 0xffff);
                    break;
                }
            default:
                {
                    result = ((65535) & 0xffff);
                    break;
                }
        }
        return ((result) & 0xffff);
    }
    function method_read_exg_168_register(runtime, reg) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        const h_m_q = members.m_q ?? 0;
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_pc = members.m_pc ?? 0;
        let result = ((0) & 0xffff);
        switch (((reg) & (15))) {
            case 0:
                {
                    result = ((h_m_q.r.d) & 0xffff);
                    break;
                }
            case 1:
                {
                    result = ((h_m_x.w) & 0xffff);
                    break;
                }
            case 2:
                {
                    result = ((h_m_y.w) & 0xffff);
                    break;
                }
            case 3:
                {
                    result = ((h_m_u.w) & 0xffff);
                    break;
                }
            case 4:
                {
                    result = ((h_m_s.w) & 0xffff);
                    break;
                }
            case 5:
                {
                    result = ((h_m_pc.w) & 0xffff);
                    break;
                }
            case 8:
                {
                    result = ((((((65280) & 0xffff)) | (h_m_q.r.a))) & 0xffff);
                    break;
                }
            case 9:
                {
                    result = ((((((65280) & 0xffff)) | (h_m_q.r.b))) & 0xffff);
                    break;
                }
            case 10:
                {
                    result = ((((((65280) & 0xffff)) | ((members.m_cc ?? 0)))) & 0xffff);
                    break;
                }
            case 11:
                {
                    result = ((((((65280) & 0xffff)) | ((members.m_dp ?? 0)))) & 0xffff);
                    break;
                }
            default:
                {
                    result = ((65535) & 0xffff);
                    break;
                }
        }
        return ((result) & 0xffff);
    }
    function method_m6809_base_device__execute_run(runtime) {
        const members = runtime.members;
        do {
            method_execute_one(runtime);
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function method_line(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_line(runtime, members.m_set_lines), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_set_lines, "bind"));
    }
    function __deref_line(runtime, p) {
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
    function method_konami_cpu_device__line(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_konami_cpu_device__line(runtime, members.m_set_lines), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_set_lines, "bind"));
    }
    function __deref_konami_cpu_device__line(runtime, p) {
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
    function method_konami_cpu_device__hd6309_native_mode(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_m6809_base_device__ireg_(runtime, __assigned) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        const h_m_x = members.m_x ?? 0;
        const h_m_y = members.m_y ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_s = members.m_s ?? 0;
        switch ((((members.m_opcode ?? 0)) & (96))) {
            case 0:
                {
                    h_m_x.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_x.w;
                }
            case 32:
                {
                    h_m_y.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_y.w;
                }
            case 64:
                {
                    h_m_u.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_u.w;
                }
            case 96:
                {
                    h_m_s.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_s.w;
                }
            default:
                {
                    (__L0 ? __L0("Unexpected") : runtime.macro("fatalerror", "Unexpected"));
                    h_m_x.w = ((((__assigned) & 0xffff)) & 0xffff);
                    return h_m_x.w;
                }
        }
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        const h_m_ppc = members.m_ppc ?? 0;
        return h_m_ppc.w;
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        const h_m_ppc = members.m_ppc ?? 0;
        h_m_ppc.w = ((value) & 0xffff);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        return (members.m_cc ?? 0);
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        members.m_cc = ((value) & 0xff);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        return h_m_s.w;
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        h_m_s.w = ((value) & 0xffff);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        return (members.m_cc ?? 0);
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        members.m_cc = ((value) & 0xff);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        return (members.m_dp ?? 0);
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        members.m_dp = ((value) & 0xff);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        const h_m_q = members.m_q ?? 0;
        return h_m_q.r.a;
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        const h_m_q = members.m_q ?? 0;
        h_m_q.r.a = value;
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        const h_m_q = members.m_q ?? 0;
        return h_m_q.r.b;
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        const h_m_q = members.m_q ?? 0;
        h_m_q.r.b = value;
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        const h_m_q = members.m_q ?? 0;
        return h_m_q.r.d;
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        const h_m_q = members.m_q ?? 0;
        h_m_q.r.d = value;
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        return h_m_x.w;
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        const h_m_x = members.m_x ?? 0;
        h_m_x.w = ((value) & 0xffff);
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        const h_m_y = members.m_y ?? 0;
        return h_m_y.w;
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        const h_m_y = members.m_y ?? 0;
        h_m_y.w = ((value) & 0xffff);
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        const h_m_u = members.m_u ?? 0;
        return h_m_u.w;
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        const h_m_u = members.m_u ?? 0;
        h_m_u.w = ((value) & 0xffff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "is_register_addressing_mode": method_is_register_addressing_mode,
        "interrupt_vector_read": method_interrupt_vector_read,
        "sync_acknowledge_write": method_sync_acknowledge_write,
        "execute_input_edge_triggered": method_execute_input_edge_triggered,
        "is_6809": method_is_6809,
        "eat": method_eat,
        "push_state": method_push_state,
        "set_ea_h": method_set_ea_h,
        "regop8": method_regop8,
        "regop16": method_regop16,
        "is_register_register_op_16_bit": method_is_register_register_op_16_bit,
        "add8_sets_h": method_add8_sets_h,
        "hd6309_native_mode": method_hd6309_native_mode,
        "cond_hi": method_cond_hi,
        "cond_cc": method_cond_cc,
        "cond_ne": method_cond_ne,
        "cond_vc": method_cond_vc,
        "cond_pl": method_cond_pl,
        "cond_ge": method_cond_ge,
        "cond_gt": method_cond_gt,
        "set_cond": method_set_cond,
        "branch_taken": method_branch_taken,
        "firq_saves_entire_state": method_firq_saves_entire_state,
        "partial_state_registers": method_partial_state_registers,
        "entire_state_registers": method_entire_state_registers,
        "is_ea_addressing_mode": method_is_ea_addressing_mode,
        "m6809_base_device::is_register_addressing_mode": method_m6809_base_device__is_register_addressing_mode,
        "state_import": method_state_import,
        "execute_clocks_to_cycles": method_execute_clocks_to_cycles,
        "execute_cycles_to_clocks": method_execute_cycles_to_clocks,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "execute_set_input": method_execute_set_input,
        "inputnum_string": method_inputnum_string,
        "execute_one": method_execute_one,
        "regop16=": method_regop16_,
        "pop_state": method_pop_state,
        "get_pending_interrupt": method_get_pending_interrupt,
        "read_opcode__0": method_read_opcode__0,
        "read_opcode__1": method_read_opcode__1,
        "set_imm": method_set_imm,
        "set_a": method_set_a,
        "set_b": method_set_b,
        "set_d": method_set_d,
        "dummy_read_opcode_arg": method_dummy_read_opcode_arg,
        "read_opcode_arg__1": method_read_opcode_arg__1,
        "dummy_vma": method_dummy_vma,
        "set_ea": method_set_ea,
        "read_vector": method_read_vector,
        "read_memory": method_read_memory,
        "read_operand__0": method_read_operand__0,
        "m6809_base_device::read_operand": method_m6809_base_device__read_operand,
        "read_opcode_arg__0": method_read_opcode_arg__0,
        "set_flags__T_uint8_t__4": method_set_flags__T_uint8_t__4,
        "write_operand__1": method_write_operand__1,
        "m6809_base_device::write_operand": method_m6809_base_device__write_operand,
        "write_memory": method_write_memory,
        "set_flags__T_uint8_t__2": method_set_flags__T_uint8_t__2,
        "rotate_right__T_uint8_t": method_rotate_right__T_uint8_t,
        "rotate_left__T_uint8_t": method_rotate_left__T_uint8_t,
        "read_operand__1": method_read_operand__1,
        "set_flags__T_uint16_t__4": method_set_flags__T_uint16_t__4,
        "write_operand__2": method_write_operand__2,
        "set_flags__T_uint16_t__2": method_set_flags__T_uint16_t__2,
        "rotate_right__T_uint16_t": method_rotate_right__T_uint16_t,
        "rotate_left__T_uint16_t": method_rotate_left__T_uint16_t,
        "regop8=": method_regop8_,
        "write_ea": method_write_ea,
        "eat_remaining": method_eat_remaining,
        "daa": method_daa,
        "mul": method_mul,
        "set_ea_l": method_set_ea_l,
        "nop": method_nop,
        "ireg": method_ireg,
        "ireg=": method_ireg_,
        "read_exgtfr_register": method_read_exgtfr_register,
        "write_exgtfr_register": method_write_exgtfr_register,
        "set_lines": method_set_lines,
        "lmul": method_lmul,
        "set_flags__T_uint32_t__2": method_set_flags__T_uint32_t__2,
        "set_flags__T_uint32_t__4": method_set_flags__T_uint32_t__4,
        "divx": method_divx,
        "log_illegal": method_log_illegal,
        "execute_run": method_execute_run,
        "m6809_base_device::interrupt_vector_read": method_m6809_base_device__interrupt_vector_read,
        "m6809_base_device::sync_acknowledge_write": method_m6809_base_device__sync_acknowledge_write,
        "m6809_base_device::execute_input_edge_triggered": method_m6809_base_device__execute_input_edge_triggered,
        "m6809_base_device::is_6809": method_m6809_base_device__is_6809,
        "m6809_base_device::eat": method_m6809_base_device__eat,
        "m6809_base_device::push_state": method_m6809_base_device__push_state,
        "m6809_base_device::set_ea_h": method_m6809_base_device__set_ea_h,
        "m6809_base_device::regop8": method_m6809_base_device__regop8,
        "m6809_base_device::regop16": method_m6809_base_device__regop16,
        "m6809_base_device::is_register_register_op_16_bit": method_m6809_base_device__is_register_register_op_16_bit,
        "m6809_base_device::add8_sets_h": method_m6809_base_device__add8_sets_h,
        "m6809_base_device::hd6309_native_mode": method_m6809_base_device__hd6309_native_mode,
        "m6809_base_device::cond_hi": method_m6809_base_device__cond_hi,
        "m6809_base_device::cond_cc": method_m6809_base_device__cond_cc,
        "m6809_base_device::cond_ne": method_m6809_base_device__cond_ne,
        "m6809_base_device::cond_vc": method_m6809_base_device__cond_vc,
        "m6809_base_device::cond_pl": method_m6809_base_device__cond_pl,
        "m6809_base_device::cond_ge": method_m6809_base_device__cond_ge,
        "m6809_base_device::cond_gt": method_m6809_base_device__cond_gt,
        "m6809_base_device::set_cond": method_m6809_base_device__set_cond,
        "m6809_base_device::branch_taken": method_m6809_base_device__branch_taken,
        "m6809_base_device::firq_saves_entire_state": method_m6809_base_device__firq_saves_entire_state,
        "m6809_base_device::partial_state_registers": method_m6809_base_device__partial_state_registers,
        "m6809_base_device::entire_state_registers": method_m6809_base_device__entire_state_registers,
        "m6809_base_device::is_ea_addressing_mode": method_m6809_base_device__is_ea_addressing_mode,
        "m6809_base_device::execute_one": method_m6809_base_device__execute_one,
        "read_tfr_exg_816_register": method_read_tfr_exg_816_register,
        "read_exg_168_register": method_read_exg_168_register,
        "m6809_base_device::execute_run": method_m6809_base_device__execute_run,
        "line": method_line,
        "konami_cpu_device::line": method_konami_cpu_device__line,
        "konami_cpu_device::hd6309_native_mode": method_konami_cpu_device__hd6309_native_mode,
        "m6809_base_device::ireg=": method_m6809_base_device__ireg_,
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
        "__state_write_10": method___state_write_10
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["PAIR_VALUE", "fatalerror", "m_lic_func", "m_set_lines", "m_syncack_write_func", "m_vector_read_func", "standard_irq_callback"];
definition.allocations["mi_default"].compiledMethods = (() => {
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
    function method_read(runtime, adr) {
        const members = runtime.members;
        adr = ((adr) & 0xffff);
        const h_program = members.program ?? 0;
        return (((__deref_read(runtime, h_program).read_byte?.(adr) ?? 0)) & 0xff);
    }
    function __deref_read(runtime, p) {
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
    function method_read_opcode(runtime, adr) {
        const members = runtime.members;
        adr = ((adr) & 0xffff);
        const h_csprogram = members.csprogram ?? 0;
        return (((__deref_read_opcode(runtime, h_csprogram).read_byte?.(adr) ?? 0)) & 0xff);
    }
    function __deref_read_opcode(runtime, p) {
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
    function method_read_opcode_arg(runtime, adr) {
        const members = runtime.members;
        adr = ((adr) & 0xffff);
        const h_cprogram = members.cprogram ?? 0;
        return (((__deref_read_opcode_arg(runtime, h_cprogram).read_byte?.(adr) ?? 0)) & 0xff);
    }
    function __deref_read_opcode_arg(runtime, p) {
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
    function method_write(runtime, adr, val) {
        const members = runtime.members;
        adr = ((adr) & 0xffff);
        val = ((val) & 0xff);
        const h_program = members.program ?? 0;
        (__deref_write(runtime, h_program).write_byte?.(adr, val) ?? 0);
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
    function method___construct(runtime) {
        const members = runtime.members;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "read_opcode": method_read_opcode,
        "read_opcode_arg": method_read_opcode_arg,
        "write": method_write,
        "__construct": method___construct
    };
    return __methodTable;
})();
export const device = definition;
export default device;
