import deviceData from './namco_50xx.device.ir.json' with { type: 'json' };
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
    function method_reset(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_reset"];
        (__L0 ? __L0(Number(((state) ? (0) : (1)))) : typeof members.m_reset === 'function' ? members.m_reset(((state) ? (0) : (1))) : runtime.invoke("m_reset", ((state) ? (0) : (1))));
    }
    function method_K_r(runtime) {
        const members = runtime.members;
        return (((((members.m_cmd ?? 0)) >>> (4))) & 0xff);
    }
    function method_R0_r(runtime) {
        const members = runtime.members;
        return (((((members.m_cmd ?? 0)) & (15))) & 0xff);
    }
    function method_R2_r(runtime) {
        const members = runtime.members;
        return (((((members.m_rw ?? 0)) & (1))) & 0xff);
    }
    function method_O_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("O_w_sync", data);
    }
    function method_rw(runtime, state) {
        const members = runtime.members;
        runtime.synchronize("rw_sync", state);
    }
    function method_chip_select(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cpu.set_input_line"];
        (__L0 ? __L0(0, ((state) ? (1) : (0))) : ((members.m_cpu)?.set_input_line?.(0, ((state) ? (1) : (0))) ?? 0));
    }
    function method_write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("write_sync", data);
    }
    function method_read(runtime) {
        const members = runtime.members;
        return (((members.m_portO ?? 0)) & 0xff);
    }
    function method_O_w_sync(runtime, param) {
        const members = runtime.members;
        members.m_portO = ((param) & 0xff);
    }
    function method_rw_sync(runtime, param) {
        const members = runtime.members;
        members.m_rw = ((param) & 0xff);
    }
    function method_write_sync(runtime, param) {
        const members = runtime.members;
        members.m_cmd = ((param) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "reset": method_reset,
        "K_r": method_K_r,
        "R0_r": method_R0_r,
        "R2_r": method_R2_r,
        "O_w": method_O_w,
        "rw": method_rw,
        "chip_select": method_chip_select,
        "write": method_write,
        "read": method_read,
        "O_w_sync": method_O_w_sync,
        "rw_sync": method_rw_sync,
        "write_sync": method_write_sync
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_cpu.set_input_line", "m_reset"];
definition.children[0].definition.compiledMethods = (() => {
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
        let __t0;
        switch ((__t0 = __deref_state_import(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case -3:
                {
                    members.m_st = (((((((members.m_debugger_flags ?? 0)) & (1))) ? (1) : (0))) & 0xff);
                    members.m_zf = (((((((members.m_debugger_flags ?? 0)) & (2))) ? (1) : (0))) & 0xff);
                    members.m_cf = (((((((members.m_debugger_flags ?? 0)) & (4))) ? (1) : (0))) & 0xff);
                    members.m_vf = (((((((members.m_debugger_flags ?? 0)) & (8))) ? (1) : (0))) & 0xff);
                    members.m_sf = (((((((members.m_debugger_flags ?? 0)) & (16))) ? (1) : (0))) & 0xff);
                    members.m_if = (((((((members.m_debugger_flags ?? 0)) & (32))) ? (1) : (0))) & 0xff);
                    break;
                }
            case -1:
            case -2:
                {
                    members.m_PC = (((((members.m_debugger_pc ?? 0)) & (63))) & 0xff);
                    members.m_PA = (((((((members.m_debugger_pc ?? 0)) >>> (6))) & (31))) & 0xff);
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
    function method_state_export(runtime, entry) {
        const members = runtime.members;
        let __t0;
        switch ((__t0 = __deref_state_export(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case -3:
                {
                    members.m_debugger_flags = ((0) & 0xff);
                    if ((((members.m_st ?? 0)) & (1))) {
                        members.m_debugger_flags = ((((members.m_debugger_flags) | (1))) & 0xff);
                    }
                    if ((((members.m_zf ?? 0)) & (1))) {
                        members.m_debugger_flags = ((((members.m_debugger_flags) | (2))) & 0xff);
                    }
                    if ((((members.m_cf ?? 0)) & (1))) {
                        members.m_debugger_flags = ((((members.m_debugger_flags) | (4))) & 0xff);
                    }
                    if ((((members.m_vf ?? 0)) & (1))) {
                        members.m_debugger_flags = ((((members.m_debugger_flags) | (8))) & 0xff);
                    }
                    if ((((members.m_sf ?? 0)) & (1))) {
                        members.m_debugger_flags = ((((members.m_debugger_flags) | (16))) & 0xff);
                    }
                    if ((((members.m_if ?? 0)) & (1))) {
                        members.m_debugger_flags = ((((members.m_debugger_flags) | (32))) & 0xff);
                    }
                    break;
                }
            case -1:
            case -2:
                {
                    members.m_debugger_pc = (((((((((members.m_PA ?? 0)) | 0)) << (6))) + ((members.m_PC ?? 0)))) & 0xffff);
                    break;
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
    function method_execute_set_input(runtime, inputnum, state) {
        const members = runtime.members;
        state = ((((state) ? (1) : (0))) | 0);
        switch (inputnum) {
            case 0:
                {
                    if ((((((((((members.m_if ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) && ((((members.m_pio ?? 0)) & (4)))) ? 1 : 0)) {
                        members.m_pending_irq = ((((members.m_pending_irq) | (4))) & 0xff);
                    }
                    members.m_if = ((state) & 0xff);
                    break;
                }
            case 1:
                {
                    if ((((((((members.m_ctr ?? 0)) && (((state) ? 0 : 1))) ? 1 : 0)) && ((((members.m_pio ?? 0)) & (64)))) ? 1 : 0)) {
                        method_increment_timer(runtime);
                    }
                    members.m_ctr = ((state) & 0xff);
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    function method_increment_timer(runtime) {
        const members = runtime.members;
        members.m_TL = (((((((members.m_TL ?? 0)) + (1))) & (15))) & 0xff);
        if (((((members.m_TL ?? 0)) === (0)) ? 1 : 0)) {
            members.m_TH = (((((((members.m_TH ?? 0)) + (1))) & (15))) & 0xff);
            if (((((members.m_TH ?? 0)) === (0)) ? 1 : 0)) {
                members.m_vf = ((1) & 0xff);
                members.m_pending_irq = ((((members.m_pending_irq) | (2))) & 0xff);
            }
        }
    }
    function method_burn_cycles(runtime, cycles) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["standard_irq_callback"];
        const h_m_SP = members.m_SP ?? 0;
        members.m_icount = ((((members.m_icount) - (cycles))) | 0);
        if ((((members.m_pio ?? 0)) & (128))) {
            members.m_TP = ((((members.m_TP) + (cycles))) & 0xff);
            while (((Number((members.m_TP ?? 0)) >= Number(32)) ? 1 : 0)) {
                members.m_TP = ((((members.m_TP) - (32))) & 0xff);
                method_increment_timer(runtime);
            }
        }
        if (((((((members.m_in_irq ?? 0)) ? 0 : 1)) && ((((members.m_pending_irq ?? 0)) & ((members.m_pio ?? 0))))) ? 1 : 0)) {
            members.m_in_irq = ((1) ? 1 : 0);
            let intpc = (((((((((members.m_PA ?? 0)) | 0)) << (6))) + ((members.m_PC ?? 0)))) & 0xffff);
            h_m_SP[(members.m_SI ?? 0)] = intpc;
            h_m_SP[(members.m_SI ?? 0)] = ((h_m_SP[(members.m_SI ?? 0)]) | ((((((members.m_cf ?? 0)) & (1))) << (15))));
            h_m_SP[(members.m_SI ?? 0)] = ((h_m_SP[(members.m_SI ?? 0)]) | ((((((members.m_zf ?? 0)) & (1))) << (14))));
            h_m_SP[(members.m_SI ?? 0)] = ((h_m_SP[(members.m_SI ?? 0)]) | ((((((members.m_st ?? 0)) & (1))) << (13))));
            members.m_SI = (((((((members.m_SI ?? 0)) + (1))) & (3))) & 0xff);
            if ((((((members.m_pending_irq ?? 0)) & ((members.m_pio ?? 0)))) & (4))) {
                (__L0 ? __L0(0, intpc) : runtime.macro("standard_irq_callback", 0, intpc));
                members.m_PC = ((2) & 0xff);
            }
            else {
                if ((((((members.m_pending_irq ?? 0)) & ((members.m_pio ?? 0)))) & (2))) {
                    (__L0 ? __L0(1, intpc) : runtime.macro("standard_irq_callback", 1, intpc));
                    members.m_PC = ((4) & 0xff);
                }
                else {
                    if ((((((members.m_pending_irq ?? 0)) & ((members.m_pio ?? 0)))) & (1))) {
                        (__L0 ? __L0(2, intpc) : runtime.macro("standard_irq_callback", 2, intpc));
                        members.m_PC = ((6) & 0xff);
                    }
                }
            }
            members.m_PA = ((0) & 0xff);
            members.m_st = ((1) & 0xff);
            members.m_pending_irq = ((0) & 0xff);
            method_burn_cycles(runtime, 3);
        }
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_p"], __L1 = __l["m_read_k"], __L2 = __l["clock"], __L3 = __l["attotime::from_hz"];
        const h_m_SP = members.m_SP ?? 0;
        while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0)) {
            let opcode = ((0) & 0xff);
            let arg = ((0) & 0xff);
            let oc = ((0) & 0xff);
            /* debugger_instruction_hook: no effect */
            opcode = (((__deref_execute_run(runtime, members.m_cache).read_byte?.((((((((members.m_PA ?? 0)) | 0)) << (6))) + ((members.m_PC ?? 0)))) ?? 0)) & 0xff);
            do {
                members.m_PC = ((((members.m_PC) + (1))) & 0xff);
                if (((((members.m_PC ?? 0)) >= (64)) ? 1 : 0)) {
                    members.m_PC = ((0) & 0xff);
                    members.m_PA = ((((members.m_PA) + (1))) & 0xff);
                }
            } while (0);
            oc = ((1) & 0xff);
            switch (opcode) {
                case 0:
                    {
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 1:
                    {
                        method_write_pla(runtime, (((((((members.m_cf ?? 0)) & (1))) << (4))) | ((members.m_A ?? 0))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 2:
                    {
                        (__L0 ? __L0(Number((members.m_A ?? 0))) : typeof members.m_write_p === 'function' ? members.m_write_p((members.m_A ?? 0)) : runtime.invoke("m_write_p", (members.m_A ?? 0)));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 3:
                    {
                        arg = (((members.m_Y ?? 0)) & 0xff);
                        runtime.readIndex((members.m_write_r ?? 0), ((arg) & (3)))((members.m_A ?? 0));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 4:
                    {
                        members.m_Y = (((members.m_A ?? 0)) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 5:
                    {
                        members.m_TH = (((members.m_A ?? 0)) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 6:
                    {
                        members.m_TL = (((members.m_A ?? 0)) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 7:
                    {
                        members.m_SB = (((members.m_A ?? 0)) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 8:
                    {
                        members.m_Y = ((((members.m_Y) + (1))) & 0xff);
                        members.m_st = (((((((members.m_Y ?? 0)) & (16))) ? (0) : (1))) & 0xff);
                        members.m_Y = ((((members.m_Y) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_Y ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 9:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        arg = ((((arg) + (1))) & 0xff);
                        members.m_st = ((((((arg) & (16))) ? (0) : (1))) & 0xff);
                        arg = ((((arg) & (15))) & 0xff);
                        members.m_zf = (((((((arg) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        (__deref_execute_run(runtime, members.m_data).write_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0))), ((arg) & (15))) ?? 0);
                        break;
                    }
                case 10:
                    {
                        (__deref_execute_run(runtime, members.m_data).write_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0))), (((members.m_A ?? 0)) & (15))) ?? 0);
                        members.m_Y = ((((members.m_Y) + (1))) & 0xff);
                        members.m_st = (((((((members.m_Y ?? 0)) & (16))) ? (0) : (1))) & 0xff);
                        members.m_Y = ((((members.m_Y) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_Y ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 11:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        (__deref_execute_run(runtime, members.m_data).write_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0))), (((members.m_A ?? 0)) & (15))) ?? 0);
                        members.m_A = ((arg) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 12:
                    {
                        members.m_A = ((((members.m_A) << (1))) & 0xff);
                        members.m_A = ((((members.m_A) | ((((members.m_cf ?? 0)) & (1))))) & 0xff);
                        members.m_st = (((((((members.m_A ?? 0)) & (16))) ? (0) : (1))) & 0xff);
                        members.m_cf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        members.m_A = ((((members.m_A) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 13:
                    {
                        members.m_A = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 14:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        arg = ((((arg) + ((members.m_A ?? 0)))) & 0xff);
                        arg = ((((arg) + ((((members.m_cf ?? 0)) & (1))))) & 0xff);
                        members.m_st = ((((((arg) & (16))) ? (0) : (1))) & 0xff);
                        members.m_cf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        members.m_A = ((((arg) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 15:
                    {
                        members.m_A = ((((members.m_A) & ((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = (((((members.m_zf ?? 0)) ^ (1))) & 0xff);
                        break;
                    }
                case 16:
                    {
                        if (((((((members.m_cf ?? 0)) & (1))) || (((((members.m_A ?? 0)) > (9)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_A = ((((members.m_A) + (6))) & 0xff);
                        }
                        members.m_st = (((((((members.m_A ?? 0)) & (16))) ? (0) : (1))) & 0xff);
                        members.m_cf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        members.m_A = ((((members.m_A) & (15))) & 0xff);
                        break;
                    }
                case 17:
                    {
                        if (((((((members.m_cf ?? 0)) & (1))) || (((((members.m_A ?? 0)) > (9)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_A = ((((members.m_A) + (10))) & 0xff);
                        }
                        members.m_st = (((((((members.m_A ?? 0)) & (16))) ? (0) : (1))) & 0xff);
                        members.m_cf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        members.m_A = ((((members.m_A) & (15))) & 0xff);
                        break;
                    }
                case 18:
                    {
                        members.m_A = (((((__L1 ? __L1() : typeof members.m_read_k === 'function' ? members.m_read_k() : runtime.invoke("m_read_k"))) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 19:
                    {
                        arg = (((members.m_Y ?? 0)) & 0xff);
                        members.m_A = ((((runtime.readIndex((members.m_read_r ?? 0), ((arg) & (3)))()) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 20:
                    {
                        members.m_A = (((members.m_Y ?? 0)) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 21:
                    {
                        members.m_A = (((members.m_TH ?? 0)) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 22:
                    {
                        members.m_A = (((members.m_TL ?? 0)) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 23:
                    {
                        members.m_A = (((members.m_SB ?? 0)) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 24:
                    {
                        members.m_Y = ((((members.m_Y) - (1))) & 0xff);
                        members.m_st = (((((((members.m_Y ?? 0)) & (16))) ? (0) : (1))) & 0xff);
                        members.m_Y = ((((members.m_Y) & (15))) & 0xff);
                        break;
                    }
                case 25:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        arg = ((((arg) - (1))) & 0xff);
                        members.m_st = ((((((arg) & (16))) ? (0) : (1))) & 0xff);
                        arg = ((((arg) & (15))) & 0xff);
                        members.m_zf = (((((((arg) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        (__deref_execute_run(runtime, members.m_data).write_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0))), ((arg) & (15))) ?? 0);
                        break;
                    }
                case 26:
                    {
                        (__deref_execute_run(runtime, members.m_data).write_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0))), (((members.m_A ?? 0)) & (15))) ?? 0);
                        members.m_Y = ((((members.m_Y) - (1))) & 0xff);
                        members.m_st = (((((((members.m_Y ?? 0)) & (16))) ? (0) : (1))) & 0xff);
                        members.m_Y = ((((members.m_Y) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_Y ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 27:
                    {
                        arg = (((members.m_X ?? 0)) & 0xff);
                        members.m_X = (((members.m_A ?? 0)) & 0xff);
                        members.m_A = ((arg) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 28:
                    {
                        members.m_A = ((((members.m_A) | ((((((members.m_cf ?? 0)) & (1))) << (4))))) & 0xff);
                        members.m_st = (((((((((members.m_A ?? 0)) << (4))) & (16))) ? (0) : (1))) & 0xff);
                        members.m_cf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        members.m_A = ((((members.m_A) >>> (1))) & 0xff);
                        members.m_A = ((((members.m_A) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 29:
                    {
                        (__deref_execute_run(runtime, members.m_data).write_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0))), (((members.m_A ?? 0)) & (15))) ?? 0);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 30:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        arg = ((((arg) - ((members.m_A ?? 0)))) & 0xff);
                        arg = ((((arg) - ((((members.m_cf ?? 0)) & (1))))) & 0xff);
                        members.m_st = ((((((arg) & (16))) ? (0) : (1))) & 0xff);
                        members.m_cf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        members.m_A = ((((arg) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 31:
                    {
                        members.m_A = ((((members.m_A) | ((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = (((((members.m_zf ?? 0)) ^ (1))) & 0xff);
                        break;
                    }
                case 32:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? 0), (((members.m_Y ?? 0)) >>> (2)))()) & (15))) & 0xff);
                        runtime.readIndex((members.m_write_r ?? 0), (((members.m_Y ?? 0)) >>> (2)))(((arg) | (((1) << ((((members.m_Y ?? 0)) & (3)))))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 33:
                    {
                        members.m_cf = ((1) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 34:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? 0), (((members.m_Y ?? 0)) >>> (2)))()) & (15))) & 0xff);
                        runtime.readIndex((members.m_write_r ?? 0), (((members.m_Y ?? 0)) >>> (2)))(((arg) & ((~((1) << ((((members.m_Y ?? 0)) & (3))))))));
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 35:
                    {
                        members.m_cf = ((0) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 36:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? 0), (((members.m_Y ?? 0)) >>> (2)))()) & (15))) & 0xff);
                        members.m_st = ((((((arg) & (((1) << ((((members.m_Y ?? 0)) & (3))))))) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 37:
                    {
                        members.m_st = (((((members.m_if ?? 0)) ^ (1))) & 0xff);
                        break;
                    }
                case 38:
                    {
                        members.m_st = (((((members.m_vf ?? 0)) ^ (1))) & 0xff);
                        members.m_vf = ((0) & 0xff);
                        break;
                    }
                case 39:
                    {
                        members.m_st = (((((members.m_sf ?? 0)) ^ (1))) & 0xff);
                        if ((members.m_sf ?? 0)) {
                            if (((Number((members.m_SBcount ?? 0)) >= Number(1000)) ? 1 : 0)) {
                                (__deref_execute_run(runtime, members.m_serial).adjust?.((__L3 ? __L3(runtime.divide((__L2 ? __L2() : runtime.macro("clock")), 6)) : runtime.macro("attotime::from_hz", runtime.divide((__L2 ? __L2() : runtime.macro("clock")), 6))), 0, (__L3 ? __L3(runtime.divide((__L2 ? __L2() : runtime.macro("clock")), 6)) : runtime.macro("attotime::from_hz", runtime.divide((__L2 ? __L2() : runtime.macro("clock")), 6)))) ?? 0);
                            }
                            members.m_SBcount = ((0) & 0xffff);
                        }
                        members.m_sf = ((0) & 0xff);
                        break;
                    }
                case 40:
                    {
                        members.m_st = (((((members.m_cf ?? 0)) ^ (1))) & 0xff);
                        break;
                    }
                case 41:
                    {
                        members.m_st = (((((members.m_zf ?? 0)) ^ (1))) & 0xff);
                        break;
                    }
                case 42:
                    {
                        (__deref_execute_run(runtime, members.m_data).write_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0))), (((members.m_SB ?? 0)) & (15))) ?? 0);
                        members.m_zf = ((((((((members.m_SB ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 43:
                    {
                        members.m_SB = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_SB ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 44:
                    {
                        members.m_SI = (((((((members.m_SI ?? 0)) - (1))) & (3))) & 0xff);
                        members.m_PC = ((((h_m_SP[(members.m_SI ?? 0)]) & (63))) & 0xff);
                        members.m_PA = ((((((h_m_SP[(members.m_SI ?? 0)]) >>> (6))) & (31))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 45:
                    {
                        members.m_A = ((__add_execute_run(runtime, (~(members.m_A ?? 0)), 1)) & 0xff);
                        members.m_A = ((((members.m_A) & (15))) & 0xff);
                        members.m_st = ((((((((members.m_A ?? 0)) === (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 46:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        arg = ((((arg) - ((members.m_A ?? 0)))) & 0xff);
                        members.m_cf = ((((((Number(((arg) & (16))) === Number(0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        arg = ((((arg) & (15))) & 0xff);
                        members.m_st = (((((((arg) === (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_zf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        break;
                    }
                case 47:
                    {
                        members.m_A = ((((members.m_A) ^ ((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))))) & 0xff);
                        members.m_st = ((((((((members.m_A ?? 0)) === (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_zf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        break;
                    }
                case 48:
                case 49:
                case 50:
                case 51:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        (__deref_execute_run(runtime, members.m_data).write_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0))), ((((arg) | (((1) << (((opcode) & (3))))))) & (15))) ?? 0);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 52:
                case 53:
                case 54:
                case 55:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        (__deref_execute_run(runtime, members.m_data).write_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0))), ((((arg) & ((~((1) << (((opcode) & (3)))))))) & (15))) ?? 0);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 56:
                case 57:
                case 58:
                case 59:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.((((((members.m_X ?? 0)) << (4))) + ((members.m_Y ?? 0)))) ?? 0)) & (15))) & 0xff);
                        members.m_st = ((((((arg) & (((1) << (((opcode) & (3))))))) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 60:
                    {
                        members.m_in_irq = ((0) ? 1 : 0);
                        members.m_SI = (((((((members.m_SI ?? 0)) - (1))) & (3))) & 0xff);
                        members.m_PC = ((((h_m_SP[(members.m_SI ?? 0)]) & (63))) & 0xff);
                        members.m_PA = ((((((h_m_SP[(members.m_SI ?? 0)]) >>> (6))) & (31))) & 0xff);
                        members.m_st = ((((((h_m_SP[(members.m_SI ?? 0)]) >>> (13))) & (1))) & 0xff);
                        members.m_zf = ((((((h_m_SP[(members.m_SI ?? 0)]) >>> (14))) & (1))) & 0xff);
                        members.m_cf = ((((((h_m_SP[(members.m_SI ?? 0)]) >>> (15))) & (1))) & 0xff);
                        break;
                    }
                case 61:
                    {
                        members.m_PA = (((((__deref_execute_run(runtime, members.m_cache).read_byte?.((((((((members.m_PA ?? 0)) | 0)) << (6))) + ((members.m_PC ?? 0)))) ?? 0)) & (31))) & 0xff);
                        members.m_PC = (((((members.m_A ?? 0)) * (4))) & 0xff);
                        oc = ((((oc) + (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 62:
                    {
                        method_pio_enable(runtime, (((members.m_pio ?? 0)) | ((__deref_execute_run(runtime, members.m_cache).read_byte?.((((((((members.m_PA ?? 0)) | 0)) << (6))) + ((members.m_PC ?? 0)))) ?? 0))));
                        do {
                            members.m_PC = ((((members.m_PC) + (1))) & 0xff);
                            if (((((members.m_PC ?? 0)) >= (64)) ? 1 : 0)) {
                                members.m_PC = ((0) & 0xff);
                                members.m_PA = ((((members.m_PA) + (1))) & 0xff);
                            }
                        } while (0);
                        oc = ((((oc) + (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 63:
                    {
                        method_pio_enable(runtime, (((members.m_pio ?? 0)) & ((~(__deref_execute_run(runtime, members.m_cache).read_byte?.((((((((members.m_PA ?? 0)) | 0)) << (6))) + ((members.m_PC ?? 0)))) ?? 0)))));
                        do {
                            members.m_PC = ((((members.m_PC) + (1))) & 0xff);
                            if (((((members.m_PC ?? 0)) >= (64)) ? 1 : 0)) {
                                members.m_PC = ((0) & 0xff);
                                members.m_PA = ((((members.m_PA) + (1))) & 0xff);
                            }
                        } while (0);
                        oc = ((((oc) + (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 64:
                case 65:
                case 66:
                case 67:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? 0), 0)()) & (15))) & 0xff);
                        arg = ((((arg) | (((1) << (((opcode) & (3))))))) & 0xff);
                        runtime.readIndex((members.m_write_r ?? 0), 0)(arg);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 68:
                case 69:
                case 70:
                case 71:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? 0), 0)()) & (15))) & 0xff);
                        arg = ((((arg) & ((~((1) << (((opcode) & (3)))))))) & 0xff);
                        runtime.readIndex((members.m_write_r ?? 0), 0)(arg);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 72:
                case 73:
                case 74:
                case 75:
                    {
                        arg = ((((runtime.readIndex((members.m_read_r ?? 0), 2)()) & (15))) & 0xff);
                        members.m_st = ((((((arg) & (((1) << (((opcode) & (3))))))) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 76:
                case 77:
                case 78:
                case 79:
                    {
                        members.m_st = (((((((members.m_A ?? 0)) & (((1) << (((opcode) & (3))))))) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 80:
                case 81:
                case 82:
                case 83:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.(((opcode) & (3))) ?? 0)) & (15))) & 0xff);
                        (__deref_execute_run(runtime, members.m_data).write_byte?.(((opcode) & (3)), (((members.m_A ?? 0)) & (15))) ?? 0);
                        members.m_A = ((arg) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 84:
                case 85:
                case 86:
                case 87:
                    {
                        arg = (((((__deref_execute_run(runtime, members.m_data).read_byte?.(__add_execute_run(runtime, ((opcode) & (3)), 4)) ?? 0)) & (15))) & 0xff);
                        (__deref_execute_run(runtime, members.m_data).write_byte?.(__add_execute_run(runtime, ((opcode) & (3)), 4), (((members.m_Y ?? 0)) & (15))) ?? 0);
                        members.m_Y = ((arg) & 0xff);
                        members.m_zf = ((((((((members.m_Y ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 88:
                case 89:
                case 90:
                case 91:
                case 92:
                case 93:
                case 94:
                case 95:
                    {
                        members.m_X = ((((opcode) & (7))) & 0xff);
                        members.m_zf = ((((((((members.m_X ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 96:
                case 97:
                case 98:
                case 99:
                case 100:
                case 101:
                case 102:
                case 103:
                    {
                        arg = (((__deref_execute_run(runtime, members.m_cache).read_byte?.((((((((members.m_PA ?? 0)) | 0)) << (6))) + ((members.m_PC ?? 0)))) ?? 0)) & 0xff);
                        do {
                            members.m_PC = ((((members.m_PC) + (1))) & 0xff);
                            if (((((members.m_PC ?? 0)) >= (64)) ? 1 : 0)) {
                                members.m_PC = ((0) & 0xff);
                                members.m_PA = ((((members.m_PA) + (1))) & 0xff);
                            }
                        } while (0);
                        oc = ((((oc) + (1))) & 0xff);
                        if ((((members.m_st ?? 0)) & (1))) {
                            h_m_SP[(members.m_SI ?? 0)] = (((((((members.m_PA ?? 0)) | 0)) << (6))) + ((members.m_PC ?? 0)));
                            members.m_SI = (((((((members.m_SI ?? 0)) + (1))) & (3))) & 0xff);
                            members.m_PC = ((((arg) & (63))) & 0xff);
                            members.m_PA = ((((((((opcode) & (7))) << (2))) | (((arg) >>> (6))))) & 0xff);
                        }
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                    {
                        arg = (((__deref_execute_run(runtime, members.m_cache).read_byte?.((((((((members.m_PA ?? 0)) | 0)) << (6))) + ((members.m_PC ?? 0)))) ?? 0)) & 0xff);
                        do {
                            members.m_PC = ((((members.m_PC) + (1))) & 0xff);
                            if (((((members.m_PC ?? 0)) >= (64)) ? 1 : 0)) {
                                members.m_PC = ((0) & 0xff);
                                members.m_PA = ((((members.m_PA) + (1))) & 0xff);
                            }
                        } while (0);
                        oc = ((((oc) + (1))) & 0xff);
                        if ((((members.m_st ?? 0)) & (1))) {
                            members.m_PC = ((((arg) & (63))) & 0xff);
                            members.m_PA = ((((((((opcode) & (7))) << (2))) | (((arg) >>> (6))))) & 0xff);
                        }
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 117:
                case 118:
                case 119:
                case 120:
                case 121:
                case 122:
                case 123:
                case 124:
                case 125:
                case 126:
                case 127:
                    {
                        arg = ((((opcode) & (15))) & 0xff);
                        arg = ((((arg) + ((members.m_A ?? 0)))) & 0xff);
                        members.m_st = ((((((arg) & (16))) ? (0) : (1))) & 0xff);
                        members.m_cf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        members.m_A = ((((arg) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        break;
                    }
                case 128:
                case 129:
                case 130:
                case 131:
                case 132:
                case 133:
                case 134:
                case 135:
                case 136:
                case 137:
                case 138:
                case 139:
                case 140:
                case 141:
                case 142:
                case 143:
                    {
                        members.m_Y = ((((opcode) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_Y ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 144:
                case 145:
                case 146:
                case 147:
                case 148:
                case 149:
                case 150:
                case 151:
                case 152:
                case 153:
                case 154:
                case 155:
                case 156:
                case 157:
                case 158:
                case 159:
                    {
                        members.m_A = ((((opcode) & (15))) & 0xff);
                        members.m_zf = ((((((((members.m_A ?? 0)) !== (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_st = ((1) & 0xff);
                        break;
                    }
                case 160:
                case 161:
                case 162:
                case 163:
                case 164:
                case 165:
                case 166:
                case 167:
                case 168:
                case 169:
                case 170:
                case 171:
                case 172:
                case 173:
                case 174:
                case 175:
                    {
                        arg = ((((((opcode) & (15))) - ((members.m_Y ?? 0)))) & 0xff);
                        members.m_cf = ((((((Number(((arg) & (16))) === Number(0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        arg = ((((arg) & (15))) & 0xff);
                        members.m_st = (((((((arg) === (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_zf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        break;
                    }
                case 176:
                case 177:
                case 178:
                case 179:
                case 180:
                case 181:
                case 182:
                case 183:
                case 184:
                case 185:
                case 186:
                case 187:
                case 188:
                case 189:
                case 190:
                case 191:
                    {
                        arg = ((((((opcode) & (15))) - ((members.m_A ?? 0)))) & 0xff);
                        members.m_cf = ((((((Number(((arg) & (16))) === Number(0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        arg = ((((arg) & (15))) & 0xff);
                        members.m_st = (((((((arg) === (0)) ? 1 : 0)) ? (0) : (1))) & 0xff);
                        members.m_zf = (((((members.m_st ?? 0)) ^ (1))) & 0xff);
                        break;
                    }
                default:
                    {
                        if ((((members.m_st ?? 0)) & (1))) {
                            members.m_PC = ((((opcode) & (63))) & 0xff);
                        }
                        members.m_st = ((1) & 0xff);
                        break;
                    }
            }
            method_burn_cycles(runtime, oc);
        }
    }
    function __add_execute_run(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method_write_pla(runtime, index) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_o"];
        index = ((index) & 0xff);
        let mask = ((255) & 0xff);
        if (((((members.m_pla_bits ?? 0)) === (8)) ? 1 : 0)) {
            let shift = ((((((index) & (16))) ? (4) : (0))) & 0xff);
            mask = ((((15) << (shift))) & 0xff);
            members.m_o_output = (((((((members.m_o_output ?? 0)) & ((~mask)))) | (((((index) << (shift))) & (mask))))) & 0xff);
        }
        else {
            if ((members.m_pla_data ?? 0)) {
                members.m_o_output = ((runtime.readIndex((members.m_pla_data ?? 0), index)) & 0xff);
            }
            else {
                members.m_o_output = ((index) & 0xff);
            }
        }
        (__L0 ? __L0(Number(0), Number((members.m_o_output ?? 0)), Number(mask)) : typeof members.m_write_o === 'function' ? members.m_write_o(0, (members.m_o_output ?? 0), mask) : runtime.invoke("m_write_o", 0, (members.m_o_output ?? 0), mask));
    }
    function method_pio_enable(runtime, newpio) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["attotime::from_hz"], __L2 = __l["fatalerror"];
        newpio = ((newpio) & 0xff);
        if ((((((members.m_pio ?? 0)) ^ (newpio))) & (48))) {
            if (((Number(((newpio) & (48))) === Number(0)) ? 1 : 0)) {
                (__deref_pio_enable(runtime, members.m_serial).adjust?.(Infinity) ?? 0);
            }
            else {
                if (((Number(((newpio) & (48))) === Number(32)) ? 1 : 0)) {
                    (__deref_pio_enable(runtime, members.m_serial).adjust?.((__L1 ? __L1(runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 6)) : runtime.macro("attotime::from_hz", runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 6))), 0, (__L1 ? __L1(runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 6)) : runtime.macro("attotime::from_hz", runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 6)))) ?? 0);
                }
                else {
                    (__L2 ? __L2("mb88xx: pio_enable set serial enable to unsupported value %02X\n", ((newpio) & (48))) : runtime.macro("fatalerror", "mb88xx: pio_enable set serial enable to unsupported value %02X\n", ((newpio) & (48))));
                }
            }
        }
        members.m_pio = ((newpio) & 0xff);
    }
    function __deref_pio_enable(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_serial_timer(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_read_si"];
        members.m_SBcount = ((((members.m_SBcount) + (1))) & 0xffff);
        if (((Number((members.m_SBcount ?? 0)) >= Number(1000)) ? 1 : 0)) {
            (__deref_serial_timer(runtime, members.m_serial).adjust?.(Infinity) ?? 0);
        }
        if ((((members.m_sf ?? 0)) ? 0 : 1)) {
            members.m_SB = (((((((members.m_SB ?? 0)) >>> (1))) | ((((__L0 ? __L0() : typeof members.m_read_si === 'function' ? members.m_read_si() : runtime.invoke("m_read_si"))) ? (8) : (0))))) & 0xff);
            if (((((members.m_SBcount ?? 0)) >= (4)) ? 1 : 0)) {
                members.m_sf = ((1) & 0xff);
                members.m_pending_irq = ((((members.m_pending_irq) | (1))) & 0xff);
            }
        }
    }
    function __deref_serial_timer(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_read_k(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_k(runtime, members.m_read_k), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_k, "bind"));
    }
    function __deref_read_k(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_write_o(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_o(runtime, members.m_write_o), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_o, "bind"));
    }
    function __deref_write_o(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_write_p(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_p(runtime, members.m_write_p), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_p, "bind"));
    }
    function __deref_write_p(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_read_si(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_si(runtime, members.m_read_si), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_si, "bind"));
    }
    function __deref_read_si(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_write_so(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_so(runtime, members.m_write_so), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_so, "bind"));
    }
    function __deref_write_so(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_pla_bits(runtime, bits) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
        members.m_pla_bits = ((bits) & 0xff);
    }
    function method_set_pla_data(runtime, pla) {
        const members = runtime.members;
        members.m_pla_data = pla;
    }
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((5) >>> 0);
    }
    function method_execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return (((((Number(inputnum) === Number(0)) ? 1 : 0)) || (((Number(inputnum) === Number(1)) ? 1 : 0))) ? 1 : 0);
    }
    function method_execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 6), 1), 6);
    }
    function method_execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 6);
    }
    function method_mb88_cpu_device__read_k(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mb88_cpu_device__read_k(runtime, members.m_read_k), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_k, "bind"));
    }
    function __deref_mb88_cpu_device__read_k(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mb88_cpu_device__write_o(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mb88_cpu_device__write_o(runtime, members.m_write_o), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_o, "bind"));
    }
    function __deref_mb88_cpu_device__write_o(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mb88_cpu_device__write_p(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mb88_cpu_device__write_p(runtime, members.m_write_p), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_p, "bind"));
    }
    function __deref_mb88_cpu_device__write_p(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mb88_cpu_device__read_si(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mb88_cpu_device__read_si(runtime, members.m_read_si), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_si, "bind"));
    }
    function __deref_mb88_cpu_device__read_si(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mb88_cpu_device__write_so(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mb88_cpu_device__write_so(runtime, members.m_write_so), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_so, "bind"));
    }
    function __deref_mb88_cpu_device__write_so(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mb88_cpu_device__set_pla_bits(runtime, bits) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
        members.m_pla_bits = ((bits) & 0xff);
    }
    function method_mb88_cpu_device__set_pla_data(runtime, pla) {
        const members = runtime.members;
        members.m_pla_data = pla;
    }
    function method_mb88_cpu_device__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_mb88_cpu_device__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((5) >>> 0);
    }
    function method_mb88_cpu_device__execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return (((((Number(inputnum) === Number(0)) ? 1 : 0)) || (((Number(inputnum) === Number(1)) ? 1 : 0))) ? 1 : 0);
    }
    function method_mb88_cpu_device__execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 6), 1), 6);
    }
    function method_mb88_cpu_device__execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 6);
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        return (members.m_PC ?? 0);
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        members.m_PC = ((value) & 0xff);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        return (members.m_PA ?? 0);
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        members.m_PA = ((value) & 0xff);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        return (members.m_SI ?? 0);
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        members.m_SI = ((value) & 0xff);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        return (members.m_A ?? 0);
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        members.m_A = ((value) & 0xff);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        return (members.m_X ?? 0);
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        members.m_X = ((value) & 0xff);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        return (members.m_Y ?? 0);
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        members.m_Y = ((value) & 0xff);
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        return (members.m_pio ?? 0);
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        members.m_pio = ((value) & 0xff);
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        return (members.m_TH ?? 0);
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        members.m_TH = ((value) & 0xff);
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        return (members.m_TL ?? 0);
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        members.m_TL = ((value) & 0xff);
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        return (members.m_SB ?? 0);
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        members.m_SB = ((value) & 0xff);
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        return (members.m_debugger_pc ?? 0);
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        members.m_debugger_pc = ((value) & 0xffff);
    }
    function method___state_read_11(runtime) {
        const members = runtime.members;
        return (members.m_debugger_pc ?? 0);
    }
    function method___state_write_11(runtime, value) {
        const members = runtime.members;
        members.m_debugger_pc = ((value) & 0xffff);
    }
    function method___state_read_12(runtime) {
        const members = runtime.members;
        return (members.m_debugger_flags ?? 0);
    }
    function method___state_write_12(runtime, value) {
        const members = runtime.members;
        members.m_debugger_flags = ((value) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "state_import": method_state_import,
        "state_export": method_state_export,
        "execute_set_input": method_execute_set_input,
        "increment_timer": method_increment_timer,
        "burn_cycles": method_burn_cycles,
        "execute_run": method_execute_run,
        "write_pla": method_write_pla,
        "pio_enable": method_pio_enable,
        "serial_timer": method_serial_timer,
        "read_k": method_read_k,
        "write_o": method_write_o,
        "write_p": method_write_p,
        "read_si": method_read_si,
        "write_so": method_write_so,
        "set_pla_bits": method_set_pla_bits,
        "set_pla_data": method_set_pla_data,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "execute_input_edge_triggered": method_execute_input_edge_triggered,
        "execute_clocks_to_cycles": method_execute_clocks_to_cycles,
        "execute_cycles_to_clocks": method_execute_cycles_to_clocks,
        "mb88_cpu_device::read_k": method_mb88_cpu_device__read_k,
        "mb88_cpu_device::write_o": method_mb88_cpu_device__write_o,
        "mb88_cpu_device::write_p": method_mb88_cpu_device__write_p,
        "mb88_cpu_device::read_si": method_mb88_cpu_device__read_si,
        "mb88_cpu_device::write_so": method_mb88_cpu_device__write_so,
        "mb88_cpu_device::set_pla_bits": method_mb88_cpu_device__set_pla_bits,
        "mb88_cpu_device::set_pla_data": method_mb88_cpu_device__set_pla_data,
        "mb88_cpu_device::execute_min_cycles": method_mb88_cpu_device__execute_min_cycles,
        "mb88_cpu_device::execute_max_cycles": method_mb88_cpu_device__execute_max_cycles,
        "mb88_cpu_device::execute_input_edge_triggered": method_mb88_cpu_device__execute_input_edge_triggered,
        "mb88_cpu_device::execute_clocks_to_cycles": method_mb88_cpu_device__execute_clocks_to_cycles,
        "mb88_cpu_device::execute_cycles_to_clocks": method_mb88_cpu_device__execute_cycles_to_clocks,
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
        "__state_write_12": method___state_write_12
    };
    return __methodTable;
})();
definition.children[0].definition.compiledMethodLinks = ["attotime::from_hz", "clock", "fatalerror", "m_read_k", "m_read_si", "m_write_o", "m_write_p", "standard_irq_callback"];
export const device = definition;
export default device;
