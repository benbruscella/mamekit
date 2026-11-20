import deviceData from './i8085a.device.ir.json' with { type: 'json' };
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
    function method_state_import(runtime, entry) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        let __t0;
        switch ((__t0 = __deref_state_import(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case 16:
                {
                    if ((members.m_ietemp ?? 0)) {
                        members.m_im = ((((members.m_im) | (128))) & 0xff);
                    }
                    else {
                        members.m_im = ((((members.m_im) & (-129))) & 0xff);
                    }
                    break;
                }
            case 17:
                {
                    if ((members.m_ietemp ?? 0)) {
                        members.m_im = ((((members.m_im) | (8))) & 0xff);
                    }
                    else {
                        members.m_im = ((((members.m_im) & (-9))) & 0xff);
                    }
                    break;
                }
            default:
                {
                    (__L0 ? __L0("CPU_IMPORT_STATE(i808x) called for unexpected value\n") : runtime.macro("fatalerror", "CPU_IMPORT_STATE(i808x) called for unexpected value\n"));
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
    function method_state_export(runtime, entry) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_sid_func"], __L1 = __l["fatalerror"];
        let __t0;
        switch ((__t0 = __deref_state_export(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case 16:
                {
                    members.m_ietemp = ((((((((((members.m_im ?? 0)) & (128))) && ((__L0 ? __L0() : typeof members.m_in_sid_func === 'function' ? members.m_in_sid_func() : runtime.invoke("m_in_sid_func")))) ? 1 : 0)) ? (1) : (0))) & 0xff);
                    break;
                }
            case 17:
                {
                    members.m_ietemp = (((((((members.m_im ?? 0)) & (8))) ? (1) : (0))) & 0xff);
                    break;
                }
            default:
                {
                    (__L1 ? __L1("CPU_EXPORT_STATE(i808x) called for unexpected value\n") : runtime.macro("fatalerror", "CPU_EXPORT_STATE(i808x) called for unexpected value\n"));
                }
        }
    }
    function __deref_state_export(runtime, p) {
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
        let newstate = ((((Number(state) !== Number(0)) ? 1 : 0)) | 0);
        if (((Number(irqline) === Number(-1)) ? 1 : 0)) {
            if (((((((members.m_nmi_state ?? 0)) ? 0 : 1)) && (newstate)) ? 1 : 0)) {
                members.m_trap_pending = ((1) ? 1 : 0);
            }
            else {
                if (((newstate) ? 0 : 1)) {
                    members.m_trap_pending = ((0) ? 1 : 0);
                }
            }
            members.m_nmi_state = ((newstate) & 0xff);
        }
        else {
            if (((Number(irqline) === Number(3)) ? 1 : 0)) {
                if ((((((h_m_irq_state[3]) ? 0 : 1)) && (newstate)) ? 1 : 0)) {
                    members.m_im = ((((members.m_im) | (64))) & 0xff);
                }
                h_m_irq_state[3] = newstate;
            }
            else {
                if (((Number(irqline) < Number(((h_m_irq_state)?.length ?? 0))) ? 1 : 0)) {
                    h_m_irq_state[irqline] = state;
                }
            }
        }
    }
    function method_set_sod(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_sod_func"];
        if (((((((state) !== (0)) ? 1 : 0)) && (((((members.m_sod_state ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
            members.m_sod_state = ((1) & 0xff);
            (__L0 ? __L0(Number((members.m_sod_state ?? 0))) : typeof members.m_out_sod_func === 'function' ? members.m_out_sod_func((members.m_sod_state ?? 0)) : runtime.invoke("m_out_sod_func", (members.m_sod_state ?? 0)));
        }
        else {
            if (((((((state) === (0)) ? 1 : 0)) && (((((members.m_sod_state ?? 0)) !== (0)) ? 1 : 0))) ? 1 : 0)) {
                members.m_sod_state = ((0) & 0xff);
                (__L0 ? __L0(Number((members.m_sod_state ?? 0))) : typeof members.m_out_sod_func === 'function' ? members.m_out_sod_func((members.m_sod_state ?? 0)) : runtime.invoke("m_out_sod_func", (members.m_sod_state ?? 0)));
            }
        }
    }
    function method_set_inte(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_inte_func"];
        if (((((((state) !== (0)) ? 1 : 0)) && (((Number((((members.m_im ?? 0)) & (8))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
            members.m_im = ((((members.m_im) | (8))) & 0xff);
            (__L0 ? __L0(Number(1)) : typeof members.m_out_inte_func === 'function' ? members.m_out_inte_func(1) : runtime.invoke("m_out_inte_func", 1));
        }
        else {
            if (((((((state) === (0)) ? 1 : 0)) && (((Number((((members.m_im ?? 0)) & (8))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                members.m_im = ((((members.m_im) & (-9))) & 0xff);
                (__L0 ? __L0(Number(0)) : typeof members.m_out_inte_func === 'function' ? members.m_out_inte_func(0) : runtime.invoke("m_out_inte_func", 0));
            }
        }
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        if (((((members.m_trap_pending ?? 0)) || (((((members.m_after_ei ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
            method_check_for_interrupts(runtime);
        }
        do {
            if ((((((((members.m_after_ei ?? 0)) !== (0)) ? 1 : 0)) && (((Number((members.m_after_ei = ((((members.m_after_ei) - (1))) & 0xff))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                method_check_for_interrupts(runtime);
            }
            members.m_in_acknowledge = ((0) ? 1 : 0);
            /* debugger_instruction_hook: no effect */
            method_execute_one(runtime, method_read_op(runtime));
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function method_check_for_interrupts(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["standard_irq_callback"];
        let __t0;
        const h_m_PC = members.m_PC ?? 0;
        const h_m_irq_state = members.m_irq_state ?? 0;
        if ((members.m_trap_pending ?? 0)) {
            members.m_trap_im_copy = (((((members.m_im ?? 0)) | (128))) & 0xff);
            members.m_trap_pending = ((0) ? 1 : 0);
            method_break_halt_for_interrupt(runtime);
            (__L0 ? __L0(-1, h_m_PC.w.l) : runtime.macro("standard_irq_callback", -1, h_m_PC.w.l));
            method_op_push(runtime, h_m_PC);
            method_set_inte(runtime, 0);
            h_m_PC.w.l = ((36) & 0xffff);
            members.m_icount = ((((members.m_icount) - (11))) | 0);
        }
        else {
            if ((((((((((members.m_im ?? 0)) & (64))) && ((((((members.m_im ?? 0)) & (4))) ? 0 : 1))) ? 1 : 0)) && ((((members.m_im ?? 0)) & (8)))) ? 1 : 0)) {
                members.m_im = ((((members.m_im) & (-65))) & 0xff);
                method_break_halt_for_interrupt(runtime);
                (__L0 ? __L0(3, h_m_PC.w.l) : runtime.macro("standard_irq_callback", 3, h_m_PC.w.l));
                method_op_push(runtime, h_m_PC);
                method_set_inte(runtime, 0);
                h_m_PC.w.l = ((60) & 0xffff);
                members.m_icount = ((((members.m_icount) - (11))) | 0);
            }
            else {
                if (((((((h_m_irq_state[2]) && ((((((members.m_im ?? 0)) & (2))) ? 0 : 1))) ? 1 : 0)) && ((((members.m_im ?? 0)) & (8)))) ? 1 : 0)) {
                    method_break_halt_for_interrupt(runtime);
                    (__L0 ? __L0(2, h_m_PC.w.l) : runtime.macro("standard_irq_callback", 2, h_m_PC.w.l));
                    method_op_push(runtime, h_m_PC);
                    method_set_inte(runtime, 0);
                    h_m_PC.w.l = ((52) & 0xffff);
                    members.m_icount = ((((members.m_icount) - (11))) | 0);
                }
                else {
                    if (((((((h_m_irq_state[1]) && ((((((members.m_im ?? 0)) & (1))) ? 0 : 1))) ? 1 : 0)) && ((((members.m_im ?? 0)) & (8)))) ? 1 : 0)) {
                        method_break_halt_for_interrupt(runtime);
                        (__L0 ? __L0(1, h_m_PC.w.l) : runtime.macro("standard_irq_callback", 1, h_m_PC.w.l));
                        method_op_push(runtime, h_m_PC);
                        method_set_inte(runtime, 0);
                        h_m_PC.w.l = ((44) & 0xffff);
                        members.m_icount = ((((members.m_icount) - (11))) | 0);
                    }
                    else {
                        if ((((h_m_irq_state[0]) && ((((members.m_im ?? 0)) & (8)))) ? 1 : 0)) {
                            if ((((__t0 = __deref_check_for_interrupts(runtime, members.m_in_inta_func), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_in_inta_func, "isunset"))) ? 0 : 1)) {
                                (__L0 ? __L0(0, h_m_PC.w.l) : runtime.macro("standard_irq_callback", 0, h_m_PC.w.l));
                            }
                            method_break_halt_for_interrupt(runtime);
                            let vector = ((method_read_inta(runtime)) & 0xff);
                            method_set_inte(runtime, 0);
                            0;
                            method_execute_one(runtime, vector);
                        }
                    }
                }
            }
        }
    }
    function __deref_check_for_interrupts(runtime, p) {
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
    function method_break_halt_for_interrupt(runtime) {
        const members = runtime.members;
        const h_m_PC = members.m_PC ?? 0;
        if ((members.m_halt ?? 0)) {
            h_m_PC.w.l = ((((h_m_PC.w.l) + (1))) & 0xffff);
            members.m_halt = ((0) & 0xff);
            method_set_status(runtime, 38);
        }
        else {
            method_set_status(runtime, 35);
        }
        members.m_in_acknowledge = ((1) ? 1 : 0);
    }
    function method_set_status(runtime, status) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_status_func"];
        let __t0;
        status = ((status) & 0xff);
        if (((((((__t0 = __deref_set_status(runtime, members.m_out_status_func), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_out_status_func, "isunset"))) ? 0 : 1)) && ((((status) !== ((members.m_status ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0(Number(status)) : typeof members.m_out_status_func === 'function' ? members.m_out_status_func(status) : runtime.invoke("m_out_status_func", status));
        }
        members.m_status = ((status) & 0xff);
    }
    function __deref_set_status(runtime, p) {
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
    function method_op_push(runtime, p) {
        const members = runtime.members;
        const h_m_SP = members.m_SP ?? 0;
        method_set_status(runtime, 4);
        (__deref_op_push(runtime, members.m_program).write_byte?.((h_m_SP.w.l = ((((h_m_SP.w.l) - (1))) & 0xffff)), p.b.h) ?? 0);
        (__deref_op_push(runtime, members.m_program).write_byte?.((h_m_SP.w.l = ((((h_m_SP.w.l) - (1))) & 0xffff)), p.b.l) ?? 0);
    }
    function __deref_op_push(runtime, p) {
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
    function method_read_inta(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["standard_irq_callback"], __L1 = __l["m_in_inta_func"];
        let __t0;
        const h_m_PC = members.m_PC ?? 0;
        if ((__t0 = __deref_read_inta(runtime, members.m_in_inta_func), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_in_inta_func, "isunset"))) {
            return (((__L0 ? __L0(0, h_m_PC.w.l) : runtime.macro("standard_irq_callback", 0, h_m_PC.w.l))) & 0xff);
        }
        else {
            return (((__L1 ? __L1(Number(h_m_PC.w.l)) : typeof members.m_in_inta_func === 'function' ? members.m_in_inta_func(h_m_PC.w.l) : runtime.invoke("m_in_inta_func", h_m_PC.w.l))) & 0xff);
        }
    }
    function __deref_read_inta(runtime, p) {
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
    function method_execute_one(runtime, opcode) {
        const members = runtime.members;
        const h_lut_cycles = members.lut_cycles ?? 0;
        const h_m_BC = members.m_BC ?? 0;
        const h_m_AF = members.m_AF ?? 0;
        const h_m_HL = members.m_HL ?? 0;
        const h_lut_zs = members.lut_zs ?? 0;
        const h_m_DE = members.m_DE ?? 0;
        const h_m_WZ = members.m_WZ ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        const h_m_irq_state = members.m_irq_state ?? 0;
        const h_m_SP = members.m_SP ?? 0;
        const h_m_PC = members.m_PC ?? 0;
        members.m_icount = ((((members.m_icount) - (h_lut_cycles[opcode]))) | 0);
        switch (opcode) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    runtime.copyStruct(members.m_BC, method_read_arg16(runtime));
                    break;
                }
            case 2:
                {
                    method_write_mem(runtime, h_m_BC.d, h_m_AF.b.h);
                    break;
                }
            case 3:
                {
                    h_m_BC.w.l = ((((h_m_BC.w.l) + (1))) & 0xffff);
                    if (method_is_8085(runtime)) {
                        if ((((h_m_BC.w.l) === (0)) ? 1 : 0)) {
                            h_m_AF.b.l = ((((h_m_AF.b.l) | (32))) & 0xff);
                        }
                        else {
                            h_m_AF.b.l = ((((h_m_AF.b.l) & (-33))) & 0xff);
                        }
                    }
                    break;
                }
            case 4:
                {
                    h_m_BC.b.h = ((method_op_inr(runtime, h_m_BC.b.h)) & 0xff);
                    break;
                }
            case 5:
                {
                    h_m_BC.b.h = ((method_op_dcr(runtime, h_m_BC.b.h)) & 0xff);
                    break;
                }
            case 6:
                {
                    h_m_BC.b.h = ((method_read_arg(runtime)) & 0xff);
                    break;
                }
            case 7:
                {
                    h_m_AF.b.h = ((((((h_m_AF.b.h) << (1))) | (((h_m_AF.b.h) >>> (7))))) & 0xff);
                    h_m_AF.b.l = ((((((h_m_AF.b.l) & (254))) | (((h_m_AF.b.h) & (1))))) & 0xff);
                    break;
                }
            case 8:
                {
                    if (method_is_8085(runtime)) {
                        let q_low = ((((h_m_HL.b.l) - (h_m_BC.b.l))) | 0);
                        let res_low = ((((q_low) & (255))) & 0xff);
                        h_m_AF.b.l = ((((((((h_lut_zs[res_low]) | (((runtime.shiftRight(q_low, 8)) & (1))))) | (((((((h_m_HL.b.l) ^ (res_low))) ^ (h_m_BC.b.l))) & (16))))) | (runtime.shiftRight(((((((h_m_BC.b.l) ^ (h_m_HL.b.l))) & (((h_m_HL.b.l) ^ (res_low))))) & (128)), 5)))) & 0xff);
                        h_m_HL.b.l = ((res_low) & 0xff);
                        let q_high = ((((((h_m_HL.b.h) - (h_m_BC.b.h))) - (((h_m_AF.b.l) & (1))))) | 0);
                        let res_high = ((((q_high) & (255))) & 0xff);
                        h_m_AF.b.l = ((((((((h_lut_zs[res_high]) | (((runtime.shiftRight(q_high, 8)) & (1))))) | (((((((h_m_HL.b.h) ^ (res_high))) ^ (h_m_BC.b.h))) & (16))))) | (runtime.shiftRight(((((((h_m_BC.b.h) ^ (h_m_HL.b.h))) & (((h_m_HL.b.h) ^ (res_high))))) & (128)), 5)))) & 0xff);
                        h_m_HL.b.h = ((res_high) & 0xff);
                        h_m_AF.b.l = ((((((h_m_AF.b.l) & (-65))) | (((((Number(((h_m_HL.b.l) | (h_m_HL.b.h))) === Number(0)) ? 1 : 0)) ? (64) : (0))))) & 0xff);
                    }
                    break;
                }
            case 9:
                {
                    method_op_dad(runtime, h_m_BC.w.l);
                    break;
                }
            case 10:
                {
                    h_m_AF.b.h = ((method_read_mem(runtime, h_m_BC.d)) & 0xff);
                    break;
                }
            case 11:
                {
                    h_m_BC.w.l = ((((h_m_BC.w.l) - (1))) & 0xffff);
                    if (method_is_8085(runtime)) {
                        if ((((h_m_BC.w.l) === (65535)) ? 1 : 0)) {
                            h_m_AF.b.l = ((((h_m_AF.b.l) | (32))) & 0xff);
                        }
                        else {
                            h_m_AF.b.l = ((((h_m_AF.b.l) & (-33))) & 0xff);
                        }
                    }
                    break;
                }
            case 12:
                {
                    h_m_BC.b.l = ((method_op_inr(runtime, h_m_BC.b.l)) & 0xff);
                    break;
                }
            case 13:
                {
                    h_m_BC.b.l = ((method_op_dcr(runtime, h_m_BC.b.l)) & 0xff);
                    break;
                }
            case 14:
                {
                    h_m_BC.b.l = ((method_read_arg(runtime)) & 0xff);
                    break;
                }
            case 15:
                {
                    h_m_AF.b.l = ((((((h_m_AF.b.l) & (254))) | (((h_m_AF.b.h) & (1))))) & 0xff);
                    h_m_AF.b.h = ((((((h_m_AF.b.h) >>> (1))) | (((h_m_AF.b.h) << (7))))) & 0xff);
                    break;
                }
            case 16:
                {
                    if (method_is_8085(runtime)) {
                        h_m_AF.b.l = ((((((h_m_AF.b.l) & (-2))) | (((h_m_HL.b.l) & (1))))) & 0xff);
                        h_m_HL.w.l = ((((((h_m_HL.w.l) & (32768))) | (((h_m_HL.w.l) >>> (1))))) & 0xffff);
                    }
                    break;
                }
            case 17:
                {
                    runtime.copyStruct(members.m_DE, method_read_arg16(runtime));
                    break;
                }
            case 18:
                {
                    method_write_mem(runtime, h_m_DE.d, h_m_AF.b.h);
                    break;
                }
            case 19:
                {
                    h_m_DE.w.l = ((((h_m_DE.w.l) + (1))) & 0xffff);
                    if (method_is_8085(runtime)) {
                        if ((((h_m_DE.w.l) === (0)) ? 1 : 0)) {
                            h_m_AF.b.l = ((((h_m_AF.b.l) | (32))) & 0xff);
                        }
                        else {
                            h_m_AF.b.l = ((((h_m_AF.b.l) & (-33))) & 0xff);
                        }
                    }
                    break;
                }
            case 20:
                {
                    h_m_DE.b.h = ((method_op_inr(runtime, h_m_DE.b.h)) & 0xff);
                    break;
                }
            case 21:
                {
                    h_m_DE.b.h = ((method_op_dcr(runtime, h_m_DE.b.h)) & 0xff);
                    break;
                }
            case 22:
                {
                    h_m_DE.b.h = ((method_read_arg(runtime)) & 0xff);
                    break;
                }
            case 23:
                {
                    let c = ((((h_m_AF.b.l) & (1))) | 0);
                    h_m_AF.b.l = ((((((h_m_AF.b.l) & (254))) | (((h_m_AF.b.h) >>> (7))))) & 0xff);
                    h_m_AF.b.h = ((((((h_m_AF.b.h) << (1))) | (c))) & 0xff);
                    break;
                }
            case 24:
                {
                    if (method_is_8085(runtime)) {
                        let c__1 = ((((h_m_AF.b.l) & (1))) | 0);
                        h_m_AF.b.l = ((((((h_m_AF.b.l) & (-4))) | (((h_m_DE.b.h) >>> (7))))) & 0xff);
                        h_m_DE.w.l = ((((((h_m_DE.w.l) << (1))) | (c__1))) & 0xffff);
                        if (((Number(((((((h_m_DE.w.l) >>> (15))) ^ (h_m_AF.b.l))) & (1))) !== Number(0)) ? 1 : 0)) {
                            h_m_AF.b.l = ((((h_m_AF.b.l) | (2))) & 0xff);
                        }
                    }
                    break;
                }
            case 25:
                {
                    method_op_dad(runtime, h_m_DE.w.l);
                    break;
                }
            case 26:
                {
                    h_m_AF.b.h = ((method_read_mem(runtime, h_m_DE.d)) & 0xff);
                    break;
                }
            case 27:
                {
                    h_m_DE.w.l = ((((h_m_DE.w.l) - (1))) & 0xffff);
                    if (method_is_8085(runtime)) {
                        if ((((h_m_DE.w.l) === (65535)) ? 1 : 0)) {
                            h_m_AF.b.l = ((((h_m_AF.b.l) | (32))) & 0xff);
                        }
                        else {
                            h_m_AF.b.l = ((((h_m_AF.b.l) & (-33))) & 0xff);
                        }
                    }
                    break;
                }
            case 28:
                {
                    h_m_DE.b.l = ((method_op_inr(runtime, h_m_DE.b.l)) & 0xff);
                    break;
                }
            case 29:
                {
                    h_m_DE.b.l = ((method_op_dcr(runtime, h_m_DE.b.l)) & 0xff);
                    break;
                }
            case 30:
                {
                    h_m_DE.b.l = ((method_read_arg(runtime)) & 0xff);
                    break;
                }
            case 31:
                {
                    let c__2 = ((((((h_m_AF.b.l) & (1))) << (7))) | 0);
                    h_m_AF.b.l = ((((((h_m_AF.b.l) & (254))) | (((h_m_AF.b.h) & (1))))) & 0xff);
                    h_m_AF.b.h = ((((((h_m_AF.b.h) >>> (1))) | (c__2))) & 0xff);
                    break;
                }
            case 32:
                {
                    if (method_is_8085(runtime)) {
                        h_m_AF.b.h = ((method_get_rim_value(runtime)) & 0xff);
                        if ((((members.m_trap_im_copy ?? 0)) & (128))) {
                            h_m_AF.b.h = ((((((h_m_AF.b.h) & (-9))) | ((((members.m_trap_im_copy ?? 0)) & (8))))) & 0xff);
                        }
                        members.m_trap_im_copy = ((0) & 0xff);
                    }
                    break;
                }
            case 33:
                {
                    runtime.copyStruct(members.m_HL, method_read_arg16(runtime));
                    break;
                }
            case 34:
                {
                    runtime.copyStruct(members.m_WZ, method_read_arg16(runtime));
                    method_write_mem(runtime, h_m_WZ.d, h_m_HL.b.l);
                    h_m_WZ.w.l = ((((h_m_WZ.w.l) + (1))) & 0xffff);
                    method_write_mem(runtime, h_m_WZ.d, h_m_HL.b.h);
                    break;
                }
            case 35:
                {
                    h_m_HL.w.l = ((((h_m_HL.w.l) + (1))) & 0xffff);
                    if (method_is_8085(runtime)) {
                        if ((((h_m_HL.w.l) === (0)) ? 1 : 0)) {
                            h_m_AF.b.l = ((((h_m_AF.b.l) | (32))) & 0xff);
                        }
                        else {
                            h_m_AF.b.l = ((((h_m_AF.b.l) & (-33))) & 0xff);
                        }
                    }
                    break;
                }
            case 36:
                {
                    h_m_HL.b.h = ((method_op_inr(runtime, h_m_HL.b.h)) & 0xff);
                    break;
                }
            case 37:
                {
                    h_m_HL.b.h = ((method_op_dcr(runtime, h_m_HL.b.h)) & 0xff);
                    break;
                }
            case 38:
                {
                    h_m_HL.b.h = ((method_read_arg(runtime)) & 0xff);
                    break;
                }
            case 39:
                {
                    h_m_WZ.b.h = ((h_m_AF.b.h) & 0xff);
                    if ((((((h_m_AF.b.l) & (16))) || (((Number(((h_m_AF.b.h) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
                        h_m_WZ.b.h = ((((h_m_WZ.b.h) + (6))) & 0xff);
                    }
                    if ((((((h_m_AF.b.l) & (1))) || ((((h_m_AF.b.h) > (153)) ? 1 : 0))) ? 1 : 0)) {
                        h_m_WZ.b.h = ((((h_m_WZ.b.h) + (96))) & 0xff);
                    }
                    h_m_AF.b.l = ((((((((((h_m_AF.b.l) & (35))) | ((((((h_m_AF.b.h) > (153)) ? 1 : 0)) ? (1) : (0))))) | (((((h_m_AF.b.h) ^ (h_m_WZ.b.h))) & (16))))) | (h_lut_zsp[h_m_WZ.b.h]))) & 0xff);
                    h_m_AF.b.h = ((h_m_WZ.b.h) & 0xff);
                    break;
                }
            case 40:
                {
                    if (method_is_8085(runtime)) {
                        h_m_WZ.d = ((method_read_arg(runtime)) >>> 0);
                        h_m_DE.d = ((((((h_m_HL.d) + (h_m_WZ.d))) & (65535))) >>> 0);
                    }
                    break;
                }
            case 41:
                {
                    method_op_dad(runtime, h_m_HL.w.l);
                    break;
                }
            case 42:
                {
                    runtime.copyStruct(members.m_WZ, method_read_arg16(runtime));
                    h_m_HL.b.l = ((method_read_mem(runtime, h_m_WZ.d)) & 0xff);
                    h_m_WZ.w.l = ((((h_m_WZ.w.l) + (1))) & 0xffff);
                    h_m_HL.b.h = ((method_read_mem(runtime, h_m_WZ.d)) & 0xff);
                    break;
                }
            case 43:
                {
                    h_m_HL.w.l = ((((h_m_HL.w.l) - (1))) & 0xffff);
                    if (method_is_8085(runtime)) {
                        if ((((h_m_HL.w.l) === (65535)) ? 1 : 0)) {
                            h_m_AF.b.l = ((((h_m_AF.b.l) | (32))) & 0xff);
                        }
                        else {
                            h_m_AF.b.l = ((((h_m_AF.b.l) & (-33))) & 0xff);
                        }
                    }
                    break;
                }
            case 44:
                {
                    h_m_HL.b.l = ((method_op_inr(runtime, h_m_HL.b.l)) & 0xff);
                    break;
                }
            case 45:
                {
                    h_m_HL.b.l = ((method_op_dcr(runtime, h_m_HL.b.l)) & 0xff);
                    break;
                }
            case 46:
                {
                    h_m_HL.b.l = ((method_read_arg(runtime)) & 0xff);
                    break;
                }
            case 47:
                {
                    h_m_AF.b.h = ((((h_m_AF.b.h) ^ (255))) & 0xff);
                    if (method_is_8085(runtime)) {
                        h_m_AF.b.l = ((((h_m_AF.b.l) | (2))) & 0xff);
                    }
                    break;
                }
            case 48:
                {
                    if (method_is_8085(runtime)) {
                        if (((h_m_AF.b.h) & (8))) {
                            members.m_im = ((((members.m_im) & (-56))) & 0xff);
                            members.m_im = ((((members.m_im) | (((h_m_AF.b.h) & (7))))) & 0xff);
                            if ((((((Number((((members.m_im ?? 0)) & (1))) === Number(0)) ? 1 : 0)) && (h_m_irq_state[1])) ? 1 : 0)) {
                                members.m_im = ((((members.m_im) | (16))) & 0xff);
                            }
                            if ((((((Number((((members.m_im ?? 0)) & (2))) === Number(0)) ? 1 : 0)) && (h_m_irq_state[2])) ? 1 : 0)) {
                                members.m_im = ((((members.m_im) | (32))) & 0xff);
                            }
                        }
                        if (((h_m_AF.b.h) & (16))) {
                            members.m_im = ((((members.m_im) & (-65))) & 0xff);
                        }
                        if (((h_m_AF.b.h) & (64))) {
                            method_set_sod(runtime, ((h_m_AF.b.h) >>> (7)));
                        }
                        method_check_for_interrupts(runtime);
                    }
                    break;
                }
            case 49:
                {
                    runtime.copyStruct(members.m_SP, method_read_arg16(runtime));
                    break;
                }
            case 50:
                {
                    runtime.copyStruct(members.m_WZ, method_read_arg16(runtime));
                    method_write_mem(runtime, h_m_WZ.d, h_m_AF.b.h);
                    break;
                }
            case 51:
                {
                    h_m_SP.w.l = ((((h_m_SP.w.l) + (1))) & 0xffff);
                    if (method_is_8085(runtime)) {
                        if ((((h_m_SP.w.l) === (0)) ? 1 : 0)) {
                            h_m_AF.b.l = ((((h_m_AF.b.l) | (32))) & 0xff);
                        }
                        else {
                            h_m_AF.b.l = ((((h_m_AF.b.l) & (-33))) & 0xff);
                        }
                    }
                    break;
                }
            case 52:
                {
                    h_m_WZ.b.l = ((method_op_inr(runtime, method_read_mem(runtime, h_m_HL.d))) & 0xff);
                    method_write_mem(runtime, h_m_HL.d, h_m_WZ.b.l);
                    break;
                }
            case 53:
                {
                    h_m_WZ.b.l = ((method_op_dcr(runtime, method_read_mem(runtime, h_m_HL.d))) & 0xff);
                    method_write_mem(runtime, h_m_HL.d, h_m_WZ.b.l);
                    break;
                }
            case 54:
                {
                    h_m_WZ.b.l = ((method_read_arg(runtime)) & 0xff);
                    method_write_mem(runtime, h_m_HL.d, h_m_WZ.b.l);
                    break;
                }
            case 55:
                {
                    h_m_AF.b.l = ((((((h_m_AF.b.l) & (254))) | (1))) & 0xff);
                    break;
                }
            case 56:
                {
                    if (method_is_8085(runtime)) {
                        h_m_WZ.d = ((method_read_arg(runtime)) >>> 0);
                        h_m_DE.d = ((((((h_m_SP.d) + (h_m_WZ.d))) & (65535))) >>> 0);
                    }
                    break;
                }
            case 57:
                {
                    method_op_dad(runtime, h_m_SP.w.l);
                    break;
                }
            case 58:
                {
                    runtime.copyStruct(members.m_WZ, method_read_arg16(runtime));
                    h_m_AF.b.h = ((method_read_mem(runtime, h_m_WZ.d)) & 0xff);
                    break;
                }
            case 59:
                {
                    h_m_SP.w.l = ((((h_m_SP.w.l) - (1))) & 0xffff);
                    if (method_is_8085(runtime)) {
                        if ((((h_m_SP.w.l) === (65535)) ? 1 : 0)) {
                            h_m_AF.b.l = ((((h_m_AF.b.l) | (32))) & 0xff);
                        }
                        else {
                            h_m_AF.b.l = ((((h_m_AF.b.l) & (-33))) & 0xff);
                        }
                    }
                    break;
                }
            case 60:
                {
                    h_m_AF.b.h = ((method_op_inr(runtime, h_m_AF.b.h)) & 0xff);
                    break;
                }
            case 61:
                {
                    h_m_AF.b.h = ((method_op_dcr(runtime, h_m_AF.b.h)) & 0xff);
                    break;
                }
            case 62:
                {
                    h_m_AF.b.h = ((method_read_arg(runtime)) & 0xff);
                    break;
                }
            case 63:
                {
                    h_m_AF.b.l = ((((((h_m_AF.b.l) & (254))) | ((((~h_m_AF.b.l)) & (1))))) & 0xff);
                    break;
                }
            case 64:
                {
                    break;
                }
            case 65:
                {
                    h_m_BC.b.h = ((h_m_BC.b.l) & 0xff);
                    break;
                }
            case 66:
                {
                    h_m_BC.b.h = ((h_m_DE.b.h) & 0xff);
                    break;
                }
            case 67:
                {
                    h_m_BC.b.h = ((h_m_DE.b.l) & 0xff);
                    break;
                }
            case 68:
                {
                    h_m_BC.b.h = ((h_m_HL.b.h) & 0xff);
                    break;
                }
            case 69:
                {
                    h_m_BC.b.h = ((h_m_HL.b.l) & 0xff);
                    break;
                }
            case 70:
                {
                    h_m_BC.b.h = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    break;
                }
            case 71:
                {
                    h_m_BC.b.h = ((h_m_AF.b.h) & 0xff);
                    break;
                }
            case 72:
                {
                    h_m_BC.b.l = ((h_m_BC.b.h) & 0xff);
                    break;
                }
            case 73:
                {
                    break;
                }
            case 74:
                {
                    h_m_BC.b.l = ((h_m_DE.b.h) & 0xff);
                    break;
                }
            case 75:
                {
                    h_m_BC.b.l = ((h_m_DE.b.l) & 0xff);
                    break;
                }
            case 76:
                {
                    h_m_BC.b.l = ((h_m_HL.b.h) & 0xff);
                    break;
                }
            case 77:
                {
                    h_m_BC.b.l = ((h_m_HL.b.l) & 0xff);
                    break;
                }
            case 78:
                {
                    h_m_BC.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    break;
                }
            case 79:
                {
                    h_m_BC.b.l = ((h_m_AF.b.h) & 0xff);
                    break;
                }
            case 80:
                {
                    h_m_DE.b.h = ((h_m_BC.b.h) & 0xff);
                    break;
                }
            case 81:
                {
                    h_m_DE.b.h = ((h_m_BC.b.l) & 0xff);
                    break;
                }
            case 82:
                {
                    break;
                }
            case 83:
                {
                    h_m_DE.b.h = ((h_m_DE.b.l) & 0xff);
                    break;
                }
            case 84:
                {
                    h_m_DE.b.h = ((h_m_HL.b.h) & 0xff);
                    break;
                }
            case 85:
                {
                    h_m_DE.b.h = ((h_m_HL.b.l) & 0xff);
                    break;
                }
            case 86:
                {
                    h_m_DE.b.h = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    break;
                }
            case 87:
                {
                    h_m_DE.b.h = ((h_m_AF.b.h) & 0xff);
                    break;
                }
            case 88:
                {
                    h_m_DE.b.l = ((h_m_BC.b.h) & 0xff);
                    break;
                }
            case 89:
                {
                    h_m_DE.b.l = ((h_m_BC.b.l) & 0xff);
                    break;
                }
            case 90:
                {
                    h_m_DE.b.l = ((h_m_DE.b.h) & 0xff);
                    break;
                }
            case 91:
                {
                    break;
                }
            case 92:
                {
                    h_m_DE.b.l = ((h_m_HL.b.h) & 0xff);
                    break;
                }
            case 93:
                {
                    h_m_DE.b.l = ((h_m_HL.b.l) & 0xff);
                    break;
                }
            case 94:
                {
                    h_m_DE.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    break;
                }
            case 95:
                {
                    h_m_DE.b.l = ((h_m_AF.b.h) & 0xff);
                    break;
                }
            case 96:
                {
                    h_m_HL.b.h = ((h_m_BC.b.h) & 0xff);
                    break;
                }
            case 97:
                {
                    h_m_HL.b.h = ((h_m_BC.b.l) & 0xff);
                    break;
                }
            case 98:
                {
                    h_m_HL.b.h = ((h_m_DE.b.h) & 0xff);
                    break;
                }
            case 99:
                {
                    h_m_HL.b.h = ((h_m_DE.b.l) & 0xff);
                    break;
                }
            case 100:
                {
                    break;
                }
            case 101:
                {
                    h_m_HL.b.h = ((h_m_HL.b.l) & 0xff);
                    break;
                }
            case 102:
                {
                    h_m_HL.b.h = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    break;
                }
            case 103:
                {
                    h_m_HL.b.h = ((h_m_AF.b.h) & 0xff);
                    break;
                }
            case 104:
                {
                    h_m_HL.b.l = ((h_m_BC.b.h) & 0xff);
                    break;
                }
            case 105:
                {
                    h_m_HL.b.l = ((h_m_BC.b.l) & 0xff);
                    break;
                }
            case 106:
                {
                    h_m_HL.b.l = ((h_m_DE.b.h) & 0xff);
                    break;
                }
            case 107:
                {
                    h_m_HL.b.l = ((h_m_DE.b.l) & 0xff);
                    break;
                }
            case 108:
                {
                    h_m_HL.b.l = ((h_m_HL.b.h) & 0xff);
                    break;
                }
            case 109:
                {
                    break;
                }
            case 110:
                {
                    h_m_HL.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    break;
                }
            case 111:
                {
                    h_m_HL.b.l = ((h_m_AF.b.h) & 0xff);
                    break;
                }
            case 112:
                {
                    method_write_mem(runtime, h_m_HL.d, h_m_BC.b.h);
                    break;
                }
            case 113:
                {
                    method_write_mem(runtime, h_m_HL.d, h_m_BC.b.l);
                    break;
                }
            case 114:
                {
                    method_write_mem(runtime, h_m_HL.d, h_m_DE.b.h);
                    break;
                }
            case 115:
                {
                    method_write_mem(runtime, h_m_HL.d, h_m_DE.b.l);
                    break;
                }
            case 116:
                {
                    method_write_mem(runtime, h_m_HL.d, h_m_HL.b.h);
                    break;
                }
            case 117:
                {
                    method_write_mem(runtime, h_m_HL.d, h_m_HL.b.l);
                    break;
                }
            case 118:
                {
                    h_m_PC.w.l = ((((h_m_PC.w.l) - (1))) & 0xffff);
                    members.m_halt = ((1) & 0xff);
                    method_set_status(runtime, 138);
                    break;
                }
            case 119:
                {
                    method_write_mem(runtime, h_m_HL.d, h_m_AF.b.h);
                    break;
                }
            case 120:
                {
                    h_m_AF.b.h = ((h_m_BC.b.h) & 0xff);
                    break;
                }
            case 121:
                {
                    h_m_AF.b.h = ((h_m_BC.b.l) & 0xff);
                    break;
                }
            case 122:
                {
                    h_m_AF.b.h = ((h_m_DE.b.h) & 0xff);
                    break;
                }
            case 123:
                {
                    h_m_AF.b.h = ((h_m_DE.b.l) & 0xff);
                    break;
                }
            case 124:
                {
                    h_m_AF.b.h = ((h_m_HL.b.h) & 0xff);
                    break;
                }
            case 125:
                {
                    h_m_AF.b.h = ((h_m_HL.b.l) & 0xff);
                    break;
                }
            case 126:
                {
                    h_m_AF.b.h = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    break;
                }
            case 127:
                {
                    break;
                }
            case 128:
                {
                    method_op_add(runtime, h_m_BC.b.h);
                    break;
                }
            case 129:
                {
                    method_op_add(runtime, h_m_BC.b.l);
                    break;
                }
            case 130:
                {
                    method_op_add(runtime, h_m_DE.b.h);
                    break;
                }
            case 131:
                {
                    method_op_add(runtime, h_m_DE.b.l);
                    break;
                }
            case 132:
                {
                    method_op_add(runtime, h_m_HL.b.h);
                    break;
                }
            case 133:
                {
                    method_op_add(runtime, h_m_HL.b.l);
                    break;
                }
            case 134:
                {
                    h_m_WZ.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    method_op_add(runtime, h_m_WZ.b.l);
                    break;
                }
            case 135:
                {
                    method_op_add(runtime, h_m_AF.b.h);
                    break;
                }
            case 136:
                {
                    method_op_adc(runtime, h_m_BC.b.h);
                    break;
                }
            case 137:
                {
                    method_op_adc(runtime, h_m_BC.b.l);
                    break;
                }
            case 138:
                {
                    method_op_adc(runtime, h_m_DE.b.h);
                    break;
                }
            case 139:
                {
                    method_op_adc(runtime, h_m_DE.b.l);
                    break;
                }
            case 140:
                {
                    method_op_adc(runtime, h_m_HL.b.h);
                    break;
                }
            case 141:
                {
                    method_op_adc(runtime, h_m_HL.b.l);
                    break;
                }
            case 142:
                {
                    h_m_WZ.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    method_op_adc(runtime, h_m_WZ.b.l);
                    break;
                }
            case 143:
                {
                    method_op_adc(runtime, h_m_AF.b.h);
                    break;
                }
            case 144:
                {
                    method_op_sub(runtime, h_m_BC.b.h);
                    break;
                }
            case 145:
                {
                    method_op_sub(runtime, h_m_BC.b.l);
                    break;
                }
            case 146:
                {
                    method_op_sub(runtime, h_m_DE.b.h);
                    break;
                }
            case 147:
                {
                    method_op_sub(runtime, h_m_DE.b.l);
                    break;
                }
            case 148:
                {
                    method_op_sub(runtime, h_m_HL.b.h);
                    break;
                }
            case 149:
                {
                    method_op_sub(runtime, h_m_HL.b.l);
                    break;
                }
            case 150:
                {
                    h_m_WZ.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    method_op_sub(runtime, h_m_WZ.b.l);
                    break;
                }
            case 151:
                {
                    method_op_sub(runtime, h_m_AF.b.h);
                    break;
                }
            case 152:
                {
                    method_op_sbb(runtime, h_m_BC.b.h);
                    break;
                }
            case 153:
                {
                    method_op_sbb(runtime, h_m_BC.b.l);
                    break;
                }
            case 154:
                {
                    method_op_sbb(runtime, h_m_DE.b.h);
                    break;
                }
            case 155:
                {
                    method_op_sbb(runtime, h_m_DE.b.l);
                    break;
                }
            case 156:
                {
                    method_op_sbb(runtime, h_m_HL.b.h);
                    break;
                }
            case 157:
                {
                    method_op_sbb(runtime, h_m_HL.b.l);
                    break;
                }
            case 158:
                {
                    h_m_WZ.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    method_op_sbb(runtime, h_m_WZ.b.l);
                    break;
                }
            case 159:
                {
                    method_op_sbb(runtime, h_m_AF.b.h);
                    break;
                }
            case 160:
                {
                    method_op_ana(runtime, h_m_BC.b.h);
                    break;
                }
            case 161:
                {
                    method_op_ana(runtime, h_m_BC.b.l);
                    break;
                }
            case 162:
                {
                    method_op_ana(runtime, h_m_DE.b.h);
                    break;
                }
            case 163:
                {
                    method_op_ana(runtime, h_m_DE.b.l);
                    break;
                }
            case 164:
                {
                    method_op_ana(runtime, h_m_HL.b.h);
                    break;
                }
            case 165:
                {
                    method_op_ana(runtime, h_m_HL.b.l);
                    break;
                }
            case 166:
                {
                    h_m_WZ.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    method_op_ana(runtime, h_m_WZ.b.l);
                    break;
                }
            case 167:
                {
                    method_op_ana(runtime, h_m_AF.b.h);
                    break;
                }
            case 168:
                {
                    method_op_xra(runtime, h_m_BC.b.h);
                    break;
                }
            case 169:
                {
                    method_op_xra(runtime, h_m_BC.b.l);
                    break;
                }
            case 170:
                {
                    method_op_xra(runtime, h_m_DE.b.h);
                    break;
                }
            case 171:
                {
                    method_op_xra(runtime, h_m_DE.b.l);
                    break;
                }
            case 172:
                {
                    method_op_xra(runtime, h_m_HL.b.h);
                    break;
                }
            case 173:
                {
                    method_op_xra(runtime, h_m_HL.b.l);
                    break;
                }
            case 174:
                {
                    h_m_WZ.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    method_op_xra(runtime, h_m_WZ.b.l);
                    break;
                }
            case 175:
                {
                    method_op_xra(runtime, h_m_AF.b.h);
                    break;
                }
            case 176:
                {
                    method_op_ora(runtime, h_m_BC.b.h);
                    break;
                }
            case 177:
                {
                    method_op_ora(runtime, h_m_BC.b.l);
                    break;
                }
            case 178:
                {
                    method_op_ora(runtime, h_m_DE.b.h);
                    break;
                }
            case 179:
                {
                    method_op_ora(runtime, h_m_DE.b.l);
                    break;
                }
            case 180:
                {
                    method_op_ora(runtime, h_m_HL.b.h);
                    break;
                }
            case 181:
                {
                    method_op_ora(runtime, h_m_HL.b.l);
                    break;
                }
            case 182:
                {
                    h_m_WZ.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    method_op_ora(runtime, h_m_WZ.b.l);
                    break;
                }
            case 183:
                {
                    method_op_ora(runtime, h_m_AF.b.h);
                    break;
                }
            case 184:
                {
                    method_op_cmp(runtime, h_m_BC.b.h);
                    break;
                }
            case 185:
                {
                    method_op_cmp(runtime, h_m_BC.b.l);
                    break;
                }
            case 186:
                {
                    method_op_cmp(runtime, h_m_DE.b.h);
                    break;
                }
            case 187:
                {
                    method_op_cmp(runtime, h_m_DE.b.l);
                    break;
                }
            case 188:
                {
                    method_op_cmp(runtime, h_m_HL.b.h);
                    break;
                }
            case 189:
                {
                    method_op_cmp(runtime, h_m_HL.b.l);
                    break;
                }
            case 190:
                {
                    h_m_WZ.b.l = ((method_read_mem(runtime, h_m_HL.d)) & 0xff);
                    method_op_cmp(runtime, h_m_WZ.b.l);
                    break;
                }
            case 191:
                {
                    method_op_cmp(runtime, h_m_AF.b.h);
                    break;
                }
            case 192:
                {
                    method_op_ret(runtime, ((((h_m_AF.b.l) & (64))) ? 0 : 1));
                    break;
                }
            case 193:
                {
                    runtime.copyStruct(members.m_BC, method_op_pop(runtime));
                    break;
                }
            case 194:
                {
                    method_op_jmp(runtime, ((((h_m_AF.b.l) & (64))) ? 0 : 1));
                    break;
                }
            case 195:
                {
                    method_op_jmp(runtime, 1);
                    break;
                }
            case 196:
                {
                    method_op_call(runtime, ((((h_m_AF.b.l) & (64))) ? 0 : 1));
                    break;
                }
            case 197:
                {
                    method_op_push(runtime, h_m_BC);
                    break;
                }
            case 198:
                {
                    h_m_WZ.b.l = ((method_read_arg(runtime)) & 0xff);
                    method_op_add(runtime, h_m_WZ.b.l);
                    break;
                }
            case 199:
                {
                    method_op_rst(runtime, 0);
                    break;
                }
            case 200:
                {
                    method_op_ret(runtime, ((h_m_AF.b.l) & (64)));
                    break;
                }
            case 201:
                {
                    runtime.copyStruct(members.m_PC, method_op_pop(runtime));
                    break;
                }
            case 202:
                {
                    method_op_jmp(runtime, ((h_m_AF.b.l) & (64)));
                    break;
                }
            case 203:
                {
                    if (method_is_8085(runtime)) {
                        if (((h_m_AF.b.l) & (2))) {
                            members.m_icount = ((((members.m_icount) - (method_ret_taken(runtime)))) | 0);
                            method_op_rst(runtime, 8);
                        }
                    }
                    else {
                        method_op_jmp(runtime, 1);
                    }
                    break;
                }
            case 204:
                {
                    method_op_call(runtime, ((h_m_AF.b.l) & (64)));
                    break;
                }
            case 205:
                {
                    method_op_call(runtime, 1);
                    break;
                }
            case 206:
                {
                    h_m_WZ.b.l = ((method_read_arg(runtime)) & 0xff);
                    method_op_adc(runtime, h_m_WZ.b.l);
                    break;
                }
            case 207:
                {
                    method_op_rst(runtime, 1);
                    break;
                }
            case 208:
                {
                    method_op_ret(runtime, ((((h_m_AF.b.l) & (1))) ? 0 : 1));
                    break;
                }
            case 209:
                {
                    runtime.copyStruct(members.m_DE, method_op_pop(runtime));
                    break;
                }
            case 210:
                {
                    method_op_jmp(runtime, ((((h_m_AF.b.l) & (1))) ? 0 : 1));
                    break;
                }
            case 211:
                {
                    method_set_status(runtime, 16);
                    h_m_WZ.d = ((method_read_arg(runtime)) >>> 0);
                    (__deref_execute_one(runtime, members.m_io).write_byte?.(h_m_WZ.d, h_m_AF.b.h) ?? 0);
                    break;
                }
            case 212:
                {
                    method_op_call(runtime, ((((h_m_AF.b.l) & (1))) ? 0 : 1));
                    break;
                }
            case 213:
                {
                    method_op_push(runtime, h_m_DE);
                    break;
                }
            case 214:
                {
                    h_m_WZ.b.l = ((method_read_arg(runtime)) & 0xff);
                    method_op_sub(runtime, h_m_WZ.b.l);
                    break;
                }
            case 215:
                {
                    method_op_rst(runtime, 2);
                    break;
                }
            case 216:
                {
                    method_op_ret(runtime, ((h_m_AF.b.l) & (1)));
                    break;
                }
            case 217:
                {
                    if (method_is_8085(runtime)) {
                        h_m_WZ.w.l = ((h_m_DE.w.l) & 0xffff);
                        method_write_mem(runtime, h_m_WZ.d, h_m_HL.b.l);
                        h_m_WZ.w.l = ((((h_m_WZ.w.l) + (1))) & 0xffff);
                        method_write_mem(runtime, h_m_WZ.d, h_m_HL.b.h);
                    }
                    else {
                        runtime.copyStruct(members.m_PC, method_op_pop(runtime));
                    }
                    break;
                }
            case 218:
                {
                    method_op_jmp(runtime, ((h_m_AF.b.l) & (1)));
                    break;
                }
            case 219:
                {
                    method_set_status(runtime, 66);
                    h_m_WZ.d = ((method_read_arg(runtime)) >>> 0);
                    h_m_AF.b.h = (((__deref_execute_one(runtime, members.m_io).read_byte?.(h_m_WZ.d) ?? 0)) & 0xff);
                    break;
                }
            case 220:
                {
                    method_op_call(runtime, ((h_m_AF.b.l) & (1)));
                    break;
                }
            case 221:
                {
                    if (method_is_8085(runtime)) {
                        method_op_jmp(runtime, ((((h_m_AF.b.l) & (32))) ? 0 : 1));
                    }
                    else {
                        method_op_call(runtime, 1);
                    }
                    break;
                }
            case 222:
                {
                    h_m_WZ.b.l = ((method_read_arg(runtime)) & 0xff);
                    method_op_sbb(runtime, h_m_WZ.b.l);
                    break;
                }
            case 223:
                {
                    method_op_rst(runtime, 3);
                    break;
                }
            case 224:
                {
                    method_op_ret(runtime, ((((h_m_AF.b.l) & (4))) ? 0 : 1));
                    break;
                }
            case 225:
                {
                    runtime.copyStruct(members.m_HL, method_op_pop(runtime));
                    break;
                }
            case 226:
                {
                    method_op_jmp(runtime, ((((h_m_AF.b.l) & (4))) ? 0 : 1));
                    break;
                }
            case 227:
                {
                    runtime.copyStruct(members.m_WZ, method_op_pop(runtime));
                    method_op_push(runtime, h_m_HL);
                    h_m_HL.d = ((h_m_WZ.d) >>> 0);
                    break;
                }
            case 228:
                {
                    method_op_call(runtime, ((((h_m_AF.b.l) & (4))) ? 0 : 1));
                    break;
                }
            case 229:
                {
                    method_op_push(runtime, h_m_HL);
                    break;
                }
            case 230:
                {
                    h_m_WZ.b.l = ((method_read_arg(runtime)) & 0xff);
                    method_op_ana(runtime, h_m_WZ.b.l);
                    break;
                }
            case 231:
                {
                    method_op_rst(runtime, 4);
                    break;
                }
            case 232:
                {
                    method_op_ret(runtime, ((h_m_AF.b.l) & (4)));
                    break;
                }
            case 233:
                {
                    h_m_PC.d = ((h_m_HL.w.l) >>> 0);
                    break;
                }
            case 234:
                {
                    method_op_jmp(runtime, ((h_m_AF.b.l) & (4)));
                    break;
                }
            case 235:
                {
                    h_m_WZ.d = ((h_m_DE.d) >>> 0);
                    h_m_DE.d = ((h_m_HL.d) >>> 0);
                    h_m_HL.d = ((h_m_WZ.d) >>> 0);
                    break;
                }
            case 236:
                {
                    method_op_call(runtime, ((h_m_AF.b.l) & (4)));
                    break;
                }
            case 237:
                {
                    if (method_is_8085(runtime)) {
                        h_m_WZ.w.l = ((h_m_DE.w.l) & 0xffff);
                        h_m_HL.b.l = ((method_read_mem(runtime, h_m_WZ.d)) & 0xff);
                        h_m_WZ.w.l = ((((h_m_WZ.w.l) + (1))) & 0xffff);
                        h_m_HL.b.h = ((method_read_mem(runtime, h_m_WZ.d)) & 0xff);
                    }
                    else {
                        method_op_call(runtime, 1);
                    }
                    break;
                }
            case 238:
                {
                    h_m_WZ.b.l = ((method_read_arg(runtime)) & 0xff);
                    method_op_xra(runtime, h_m_WZ.b.l);
                    break;
                }
            case 239:
                {
                    method_op_rst(runtime, 5);
                    break;
                }
            case 240:
                {
                    method_op_ret(runtime, ((((h_m_AF.b.l) & (128))) ? 0 : 1));
                    break;
                }
            case 241:
                {
                    runtime.copyStruct(members.m_AF, method_op_pop(runtime));
                    break;
                }
            case 242:
                {
                    method_op_jmp(runtime, ((((h_m_AF.b.l) & (128))) ? 0 : 1));
                    break;
                }
            case 243:
                {
                    method_set_inte(runtime, 0);
                    break;
                }
            case 244:
                {
                    method_op_call(runtime, ((((h_m_AF.b.l) & (128))) ? 0 : 1));
                    break;
                }
            case 245:
                {
                    h_m_AF.b.l = ((((h_m_AF.b.l) & (-9))) & 0xff);
                    if (((method_is_8085(runtime)) ? 0 : 1)) {
                        h_m_AF.b.l = ((((((h_m_AF.b.l) & (-33))) | (2))) & 0xff);
                    }
                    method_op_push(runtime, h_m_AF);
                    break;
                }
            case 246:
                {
                    h_m_WZ.b.l = ((method_read_arg(runtime)) & 0xff);
                    method_op_ora(runtime, h_m_WZ.b.l);
                    break;
                }
            case 247:
                {
                    method_op_rst(runtime, 6);
                    break;
                }
            case 248:
                {
                    method_op_ret(runtime, ((h_m_AF.b.l) & (128)));
                    break;
                }
            case 249:
                {
                    h_m_SP.d = ((h_m_HL.d) >>> 0);
                    break;
                }
            case 250:
                {
                    method_op_jmp(runtime, ((h_m_AF.b.l) & (128)));
                    break;
                }
            case 251:
                {
                    method_set_inte(runtime, 1);
                    members.m_after_ei = ((2) & 0xff);
                    break;
                }
            case 252:
                {
                    method_op_call(runtime, ((h_m_AF.b.l) & (128)));
                    break;
                }
            case 253:
                {
                    if (method_is_8085(runtime)) {
                        method_op_jmp(runtime, ((h_m_AF.b.l) & (32)));
                    }
                    else {
                        method_op_call(runtime, 1);
                    }
                    break;
                }
            case 254:
                {
                    h_m_WZ.b.l = ((method_read_arg(runtime)) & 0xff);
                    method_op_cmp(runtime, h_m_WZ.b.l);
                    break;
                }
            case 255:
                {
                    method_op_rst(runtime, 7);
                    break;
                }
        }
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
    function method_read_arg16(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["PAIR_VALUE"];
        let __t0, __t1;
        const h_m_PC = members.m_PC ?? 0;
        let p = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        method_set_status(runtime, 130);
        if ((members.m_in_acknowledge ?? 0)) {
            p.b.l = ((method_read_inta(runtime)) & 0xff);
            p.b.h = ((method_read_inta(runtime)) & 0xff);
        }
        else {
            p.b.l = (((__deref_read_arg16(runtime, members.m_cprogram).read_byte?.((__t0 = h_m_PC.w.l, h_m_PC.w.l = ((((h_m_PC.w.l) + (1))) & 0xffff), __t0)) ?? 0)) & 0xff);
            p.b.h = (((__deref_read_arg16(runtime, members.m_cprogram).read_byte?.((__t1 = h_m_PC.w.l, h_m_PC.w.l = ((((h_m_PC.w.l) + (1))) & 0xffff), __t1)) ?? 0)) & 0xff);
        }
        return p;
    }
    function __deref_read_arg16(runtime, p) {
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
    function method_write_mem(runtime, a, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        method_set_status(runtime, 0);
        (__deref_write_mem(runtime, members.m_program).write_byte?.(a, v) ?? 0);
    }
    function __deref_write_mem(runtime, p) {
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
    function method_is_8085(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_op_inr(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        let hc = ((((((Number(((v) & (15))) === Number(15)) ? 1 : 0)) ? (16) : (0))) & 0xff);
        h_m_AF.b.l = ((((((((h_m_AF.b.l) & (1))) | (h_lut_zsp[(v = ((((v) + (1))) & 0xff))]))) | (hc))) & 0xff);
        return ((v) & 0xff);
    }
    function method_op_dcr(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        let hc = ((((((Number(((v) & (15))) !== Number(0)) ? 1 : 0)) ? (16) : (0))) & 0xff);
        h_m_AF.b.l = ((((((((((h_m_AF.b.l) & (1))) | (h_lut_zsp[(v = ((((v) - (1))) & 0xff))]))) | (hc))) | (2))) & 0xff);
        return ((v) & 0xff);
    }
    function method_read_arg(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_PC = members.m_PC ?? 0;
        method_set_status(runtime, 130);
        if ((members.m_in_acknowledge ?? 0)) {
            return ((method_read_inta(runtime)) & 0xff);
        }
        else {
            return (((__deref_read_arg(runtime, members.m_cprogram).read_byte?.((__t0 = h_m_PC.w.l, h_m_PC.w.l = ((((h_m_PC.w.l) + (1))) & 0xffff), __t0)) ?? 0)) & 0xff);
        }
    }
    function __deref_read_arg(runtime, p) {
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
    function method_op_dad(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xffff);
        const h_m_HL = members.m_HL ?? 0;
        const h_m_AF = members.m_AF ?? 0;
        let q = ((((h_m_HL.w.l) + (v))) | 0);
        h_m_AF.b.l = ((((((h_m_AF.b.l) & (-2))) | (((runtime.shiftRight(q, 16)) & (1))))) & 0xff);
        h_m_HL.w.l = ((q) & 0xffff);
    }
    function method_read_mem(runtime, a) {
        const members = runtime.members;
        method_set_status(runtime, 130);
        return (((__deref_read_mem(runtime, members.m_program).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_read_mem(runtime, p) {
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
    function method_get_rim_value(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_sid_func"];
        const h_m_irq_state = members.m_irq_state ?? 0;
        let result = (((members.m_im ?? 0)) & 0xff);
        let sid = (((__L0 ? __L0() : typeof members.m_in_sid_func === 'function' ? members.m_in_sid_func() : runtime.invoke("m_in_sid_func"))) | 0);
        result = ((((result) & (-49))) & 0xff);
        if (h_m_irq_state[2]) {
            result = ((((result) | (32))) & 0xff);
        }
        if (h_m_irq_state[1]) {
            result = ((((result) | (16))) & 0xff);
        }
        result = ((((((result) & (-129))) | (((sid) ? (128) : (0))))) & 0xff);
        return ((result) & 0xff);
    }
    function method_op_add(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        let q = ((((h_m_AF.b.h) + (v))) | 0);
        h_m_AF.b.l = ((((((h_lut_zsp[((q) & (255))]) | (((runtime.shiftRight(q, 8)) & (1))))) | (((((((h_m_AF.b.h) ^ (q))) ^ (v))) & (16))))) & 0xff);
        h_m_AF.b.h = ((q) & 0xff);
    }
    function method_op_adc(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        let q = ((__add_op_adc(runtime, ((h_m_AF.b.h) + (v)), ((h_m_AF.b.l) & (1)))) | 0);
        h_m_AF.b.l = ((((((h_lut_zsp[((q) & (255))]) | (((runtime.shiftRight(q, 8)) & (1))))) | (((((((h_m_AF.b.h) ^ (q))) ^ (v))) & (16))))) & 0xff);
        h_m_AF.b.h = ((q) & 0xff);
    }
    function __add_op_adc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_op_sub(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        let q = ((((h_m_AF.b.h) - (v))) | 0);
        h_m_AF.b.l = ((((((((h_lut_zsp[((q) & (255))]) | (((runtime.shiftRight(q, 8)) & (1))))) | ((((~((((h_m_AF.b.h) ^ (q))) ^ (v)))) & (16))))) | (2))) & 0xff);
        h_m_AF.b.h = ((q) & 0xff);
    }
    function method_op_sbb(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        let q = ((((((h_m_AF.b.h) - (v))) - (((h_m_AF.b.l) & (1))))) | 0);
        h_m_AF.b.l = ((((((((h_lut_zsp[((q) & (255))]) | (((runtime.shiftRight(q, 8)) & (1))))) | ((((~((((h_m_AF.b.h) ^ (q))) ^ (v)))) & (16))))) | (2))) & 0xff);
        h_m_AF.b.h = ((q) & 0xff);
    }
    function method_op_ana(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        let hc = ((((((((h_m_AF.b.h) | (v))) << (1))) & (16))) & 0xff);
        h_m_AF.b.h = ((((h_m_AF.b.h) & (v))) & 0xff);
        h_m_AF.b.l = ((h_lut_zsp[h_m_AF.b.h]) & 0xff);
        if (method_is_8085(runtime)) {
            h_m_AF.b.l = ((((h_m_AF.b.l) | (16))) & 0xff);
        }
        else {
            h_m_AF.b.l = ((((h_m_AF.b.l) | (hc))) & 0xff);
        }
    }
    function method_op_xra(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        h_m_AF.b.h = ((((h_m_AF.b.h) ^ (v))) & 0xff);
        h_m_AF.b.l = ((h_lut_zsp[h_m_AF.b.h]) & 0xff);
    }
    function method_op_ora(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        h_m_AF.b.h = ((((h_m_AF.b.h) | (v))) & 0xff);
        h_m_AF.b.l = ((h_lut_zsp[h_m_AF.b.h]) & 0xff);
    }
    function method_op_cmp(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_AF = members.m_AF ?? 0;
        const h_lut_zsp = members.lut_zsp ?? 0;
        let q = ((((h_m_AF.b.h) - (v))) | 0);
        h_m_AF.b.l = ((((((((h_lut_zsp[((q) & (255))]) | (((runtime.shiftRight(q, 8)) & (1))))) | ((((~((((h_m_AF.b.h) ^ (q))) ^ (v)))) & (16))))) | (2))) & 0xff);
    }
    function method_op_ret(runtime, cond) {
        const members = runtime.members;
        if (cond) {
            members.m_icount = ((((members.m_icount) - (method_ret_taken(runtime)))) | 0);
            runtime.copyStruct(members.m_PC, method_op_pop(runtime));
        }
    }
    function method_ret_taken(runtime) {
        const members = runtime.members;
        return ((6) | 0);
    }
    function method_op_pop(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["PAIR_VALUE"];
        let __t0, __t1;
        const h_m_SP = members.m_SP ?? 0;
        let p = (__L0 ? __L0() : runtime.macro("PAIR_VALUE"));
        method_set_status(runtime, 134);
        p.b.l = (((__deref_op_pop(runtime, members.m_program).read_byte?.((__t0 = h_m_SP.w.l, h_m_SP.w.l = ((((h_m_SP.w.l) + (1))) & 0xffff), __t0)) ?? 0)) & 0xff);
        p.b.h = (((__deref_op_pop(runtime, members.m_program).read_byte?.((__t1 = h_m_SP.w.l, h_m_SP.w.l = ((((h_m_SP.w.l) + (1))) & 0xffff), __t1)) ?? 0)) & 0xff);
        return p;
    }
    function __deref_op_pop(runtime, p) {
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
    function method_op_jmp(runtime, cond) {
        const members = runtime.members;
        const h_m_PC = members.m_PC ?? 0;
        if (cond) {
            runtime.copyStruct(members.m_PC, method_read_arg16(runtime));
            members.m_icount = ((((members.m_icount) - (method_jmp_taken(runtime)))) | 0);
        }
        else {
            h_m_PC.w.l = ((((h_m_PC.w.l) + (2))) & 0xffff);
        }
    }
    function method_jmp_taken(runtime) {
        const members = runtime.members;
        return ((3) | 0);
    }
    function method_op_call(runtime, cond) {
        const members = runtime.members;
        const h_m_PC = members.m_PC ?? 0;
        if (cond) {
            let p = method_read_arg16(runtime);
            members.m_icount = ((((members.m_icount) - (method_call_taken(runtime)))) | 0);
            method_op_push(runtime, h_m_PC);
            (h_m_PC.d = (p).d);
        }
        else {
            h_m_PC.w.l = ((((h_m_PC.w.l) + (2))) & 0xffff);
        }
    }
    function method_call_taken(runtime) {
        const members = runtime.members;
        return ((9) | 0);
    }
    function method_op_rst(runtime, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        const h_m_PC = members.m_PC ?? 0;
        method_op_push(runtime, h_m_PC);
        h_m_PC.d = ((((8) * (v))) >>> 0);
    }
    function method_read_op(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_PC = members.m_PC ?? 0;
        method_set_status(runtime, 162);
        return (((__deref_read_op(runtime, members.m_copcodes).read_byte?.((__t0 = h_m_PC.w.l, h_m_PC.w.l = ((((h_m_PC.w.l) + (1))) & 0xffff), __t0)) ?? 0)) & 0xff);
    }
    function __deref_read_op(runtime, p) {
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
    function method_in_inta_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_inta_func(runtime, members.m_in_inta_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_inta_func, "bind"));
    }
    function __deref_in_inta_func(runtime, p) {
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
    function method_out_status_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_status_func(runtime, members.m_out_status_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_status_func, "bind"));
    }
    function __deref_out_status_func(runtime, p) {
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
    function method_out_inte_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_inte_func(runtime, members.m_out_inte_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_inte_func, "bind"));
    }
    function __deref_out_inte_func(runtime, p) {
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
    function method_in_sid_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_sid_func(runtime, members.m_in_sid_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_sid_func, "bind"));
    }
    function __deref_in_sid_func(runtime, p) {
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
    function method_out_sod_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_sod_func(runtime, members.m_out_sod_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_sod_func, "bind"));
    }
    function __deref_out_sod_func(runtime, p) {
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
        return ((4) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((16) >>> 0);
    }
    function method_execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(3)) ? 1 : 0);
    }
    function method_execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 2), 1), 2);
    }
    function method_execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 2);
    }
    function method_i8085a_cpu_device__in_inta_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8085a_cpu_device__in_inta_func(runtime, members.m_in_inta_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_inta_func, "bind"));
    }
    function __deref_i8085a_cpu_device__in_inta_func(runtime, p) {
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
    function method_i8085a_cpu_device__out_status_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8085a_cpu_device__out_status_func(runtime, members.m_out_status_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_status_func, "bind"));
    }
    function __deref_i8085a_cpu_device__out_status_func(runtime, p) {
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
    function method_i8085a_cpu_device__out_inte_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8085a_cpu_device__out_inte_func(runtime, members.m_out_inte_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_inte_func, "bind"));
    }
    function __deref_i8085a_cpu_device__out_inte_func(runtime, p) {
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
    function method_i8085a_cpu_device__in_sid_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8085a_cpu_device__in_sid_func(runtime, members.m_in_sid_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_sid_func, "bind"));
    }
    function __deref_i8085a_cpu_device__in_sid_func(runtime, p) {
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
    function method_i8085a_cpu_device__out_sod_func(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8085a_cpu_device__out_sod_func(runtime, members.m_out_sod_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_sod_func, "bind"));
    }
    function __deref_i8085a_cpu_device__out_sod_func(runtime, p) {
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
    function method_i8085a_cpu_device__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((4) >>> 0);
    }
    function method_i8085a_cpu_device__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((16) >>> 0);
    }
    function method_i8085a_cpu_device__execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(3)) ? 1 : 0);
    }
    function method_i8085a_cpu_device__execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 2), 1), 2);
    }
    function method_i8085a_cpu_device__execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 2);
    }
    function method_i8085a_cpu_device__ret_taken(runtime) {
        const members = runtime.members;
        return ((6) | 0);
    }
    function method_i8085a_cpu_device__jmp_taken(runtime) {
        const members = runtime.members;
        return ((3) | 0);
    }
    function method_i8085a_cpu_device__call_taken(runtime) {
        const members = runtime.members;
        return ((9) | 0);
    }
    function method_i8085a_cpu_device__is_8085(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        const h_m_PC = members.m_PC ?? 0;
        return h_m_PC.w.l;
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        const h_m_PC = members.m_PC ?? 0;
        h_m_PC.w.l = ((value) & 0xffff);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        const h_m_PC = members.m_PC ?? 0;
        return h_m_PC.w.l;
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        const h_m_PC = members.m_PC ?? 0;
        h_m_PC.w.l = ((value) & 0xffff);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        const h_m_PC = members.m_PC ?? 0;
        return h_m_PC.w.l;
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        const h_m_PC = members.m_PC ?? 0;
        h_m_PC.w.l = ((value) & 0xffff);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        const h_m_SP = members.m_SP ?? 0;
        return h_m_SP.w.l;
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        const h_m_SP = members.m_SP ?? 0;
        h_m_SP.w.l = ((value) & 0xffff);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        const h_m_AF = members.m_AF ?? 0;
        return h_m_AF.b.l;
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        const h_m_AF = members.m_AF ?? 0;
        h_m_AF.b.l = ((value) & 0xff);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        const h_m_AF = members.m_AF ?? 0;
        return h_m_AF.b.h;
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        const h_m_AF = members.m_AF ?? 0;
        h_m_AF.b.h = ((value) & 0xff);
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        const h_m_BC = members.m_BC ?? 0;
        return h_m_BC.b.h;
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        const h_m_BC = members.m_BC ?? 0;
        h_m_BC.b.h = ((value) & 0xff);
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        const h_m_BC = members.m_BC ?? 0;
        return h_m_BC.b.l;
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        const h_m_BC = members.m_BC ?? 0;
        h_m_BC.b.l = ((value) & 0xff);
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        const h_m_DE = members.m_DE ?? 0;
        return h_m_DE.b.h;
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        const h_m_DE = members.m_DE ?? 0;
        h_m_DE.b.h = ((value) & 0xff);
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        const h_m_DE = members.m_DE ?? 0;
        return h_m_DE.b.l;
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        const h_m_DE = members.m_DE ?? 0;
        h_m_DE.b.l = ((value) & 0xff);
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        const h_m_AF = members.m_AF ?? 0;
        return h_m_AF.b.l;
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        const h_m_AF = members.m_AF ?? 0;
        h_m_AF.b.l = ((value) & 0xff);
    }
    function method___state_read_11(runtime) {
        const members = runtime.members;
        const h_m_HL = members.m_HL ?? 0;
        return h_m_HL.b.h;
    }
    function method___state_write_11(runtime, value) {
        const members = runtime.members;
        const h_m_HL = members.m_HL ?? 0;
        h_m_HL.b.h = ((value) & 0xff);
    }
    function method___state_read_12(runtime) {
        const members = runtime.members;
        const h_m_HL = members.m_HL ?? 0;
        return h_m_HL.b.l;
    }
    function method___state_write_12(runtime, value) {
        const members = runtime.members;
        const h_m_HL = members.m_HL ?? 0;
        h_m_HL.b.l = ((value) & 0xff);
    }
    function method___state_read_13(runtime) {
        const members = runtime.members;
        const h_m_AF = members.m_AF ?? 0;
        return h_m_AF.w.l;
    }
    function method___state_write_13(runtime, value) {
        const members = runtime.members;
        const h_m_AF = members.m_AF ?? 0;
        h_m_AF.w.l = ((value) & 0xffff);
    }
    function method___state_read_14(runtime) {
        const members = runtime.members;
        const h_m_BC = members.m_BC ?? 0;
        return h_m_BC.w.l;
    }
    function method___state_write_14(runtime, value) {
        const members = runtime.members;
        const h_m_BC = members.m_BC ?? 0;
        h_m_BC.w.l = ((value) & 0xffff);
    }
    function method___state_read_15(runtime) {
        const members = runtime.members;
        const h_m_DE = members.m_DE ?? 0;
        return h_m_DE.w.l;
    }
    function method___state_write_15(runtime, value) {
        const members = runtime.members;
        const h_m_DE = members.m_DE ?? 0;
        h_m_DE.w.l = ((value) & 0xffff);
    }
    function method___state_read_16(runtime) {
        const members = runtime.members;
        const h_m_HL = members.m_HL ?? 0;
        return h_m_HL.w.l;
    }
    function method___state_write_16(runtime, value) {
        const members = runtime.members;
        const h_m_HL = members.m_HL ?? 0;
        h_m_HL.w.l = ((value) & 0xffff);
    }
    function method___state_read_17(runtime) {
        const members = runtime.members;
        return (members.m_im ?? 0);
    }
    function method___state_write_17(runtime, value) {
        const members = runtime.members;
        members.m_im = ((value) & 0xff);
    }
    function method___state_read_18(runtime) {
        const members = runtime.members;
        return (members.m_sod_state ?? 0);
    }
    function method___state_write_18(runtime, value) {
        const members = runtime.members;
        members.m_sod_state = ((value) & 0xff);
    }
    function method___state_read_19(runtime) {
        const members = runtime.members;
        return (members.m_ietemp ?? 0);
    }
    function method___state_write_19(runtime, value) {
        const members = runtime.members;
        members.m_ietemp = ((value) & 0xff);
    }
    function method___state_read_20(runtime) {
        const members = runtime.members;
        return (members.m_status ?? 0);
    }
    function method___state_write_20(runtime, value) {
        const members = runtime.members;
        members.m_status = ((value) & 0xff);
    }
    function method___state_read_21(runtime) {
        const members = runtime.members;
        return (members.m_ietemp ?? 0);
    }
    function method___state_write_21(runtime, value) {
        const members = runtime.members;
        members.m_ietemp = ((value) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "state_import": method_state_import,
        "state_export": method_state_export,
        "execute_set_input": method_execute_set_input,
        "set_sod": method_set_sod,
        "set_inte": method_set_inte,
        "execute_run": method_execute_run,
        "check_for_interrupts": method_check_for_interrupts,
        "break_halt_for_interrupt": method_break_halt_for_interrupt,
        "set_status": method_set_status,
        "op_push": method_op_push,
        "read_inta": method_read_inta,
        "execute_one": method_execute_one,
        "read_arg16": method_read_arg16,
        "write_mem": method_write_mem,
        "is_8085": method_is_8085,
        "op_inr": method_op_inr,
        "op_dcr": method_op_dcr,
        "read_arg": method_read_arg,
        "op_dad": method_op_dad,
        "read_mem": method_read_mem,
        "get_rim_value": method_get_rim_value,
        "op_add": method_op_add,
        "op_adc": method_op_adc,
        "op_sub": method_op_sub,
        "op_sbb": method_op_sbb,
        "op_ana": method_op_ana,
        "op_xra": method_op_xra,
        "op_ora": method_op_ora,
        "op_cmp": method_op_cmp,
        "op_ret": method_op_ret,
        "ret_taken": method_ret_taken,
        "op_pop": method_op_pop,
        "op_jmp": method_op_jmp,
        "jmp_taken": method_jmp_taken,
        "op_call": method_op_call,
        "call_taken": method_call_taken,
        "op_rst": method_op_rst,
        "read_op": method_read_op,
        "in_inta_func": method_in_inta_func,
        "out_status_func": method_out_status_func,
        "out_inte_func": method_out_inte_func,
        "in_sid_func": method_in_sid_func,
        "out_sod_func": method_out_sod_func,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "execute_input_edge_triggered": method_execute_input_edge_triggered,
        "execute_clocks_to_cycles": method_execute_clocks_to_cycles,
        "execute_cycles_to_clocks": method_execute_cycles_to_clocks,
        "i8085a_cpu_device::in_inta_func": method_i8085a_cpu_device__in_inta_func,
        "i8085a_cpu_device::out_status_func": method_i8085a_cpu_device__out_status_func,
        "i8085a_cpu_device::out_inte_func": method_i8085a_cpu_device__out_inte_func,
        "i8085a_cpu_device::in_sid_func": method_i8085a_cpu_device__in_sid_func,
        "i8085a_cpu_device::out_sod_func": method_i8085a_cpu_device__out_sod_func,
        "i8085a_cpu_device::execute_min_cycles": method_i8085a_cpu_device__execute_min_cycles,
        "i8085a_cpu_device::execute_max_cycles": method_i8085a_cpu_device__execute_max_cycles,
        "i8085a_cpu_device::execute_input_edge_triggered": method_i8085a_cpu_device__execute_input_edge_triggered,
        "i8085a_cpu_device::execute_clocks_to_cycles": method_i8085a_cpu_device__execute_clocks_to_cycles,
        "i8085a_cpu_device::execute_cycles_to_clocks": method_i8085a_cpu_device__execute_cycles_to_clocks,
        "i8085a_cpu_device::ret_taken": method_i8085a_cpu_device__ret_taken,
        "i8085a_cpu_device::jmp_taken": method_i8085a_cpu_device__jmp_taken,
        "i8085a_cpu_device::call_taken": method_i8085a_cpu_device__call_taken,
        "i8085a_cpu_device::is_8085": method_i8085a_cpu_device__is_8085,
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
        "__state_write_15": method___state_write_15,
        "__state_read_16": method___state_read_16,
        "__state_write_16": method___state_write_16,
        "__state_read_17": method___state_read_17,
        "__state_write_17": method___state_write_17,
        "__state_read_18": method___state_read_18,
        "__state_write_18": method___state_write_18,
        "__state_read_19": method___state_read_19,
        "__state_write_19": method___state_write_19,
        "__state_read_20": method___state_read_20,
        "__state_write_20": method___state_write_20,
        "__state_read_21": method___state_read_21,
        "__state_write_21": method___state_write_21
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["PAIR_VALUE", "fatalerror", "m_in_inta_func", "m_in_sid_func", "m_out_inte_func", "m_out_sod_func", "m_out_status_func", "standard_irq_callback"];
export const device = definition;
export default device;
