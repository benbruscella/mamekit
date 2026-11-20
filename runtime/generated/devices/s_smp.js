import deviceData from './s_smp.device.ir.json' with { type: 'json' };
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
    function method_EA_IMM(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_pc ?? 0), members.m_pc = ((((members.m_pc) + (1))) >>> 0), __t0)) >>> 0);
    }
    function method_EA_XI(runtime) {
        const members = runtime.members;
        return (((members.m_x ?? 0)) >>> 0);
    }
    function method_EA_YI(runtime) {
        const members = runtime.members;
        return (((members.m_y ?? 0)) >>> 0);
    }
    function method_JUMP(runtime, address) {
        const members = runtime.members;
        members.m_pc = ((address) >>> 0);
    }
    function method_BRANCH(runtime, offset) {
        const members = runtime.members;
        members.m_pc = (((((((members.m_pc ?? 0)) + (((((offset) & (255))) << 24 >> 24)))) & (65535))) >>> 0);
    }
    function method_SET_FLAG_I(runtime, value) {
        const members = runtime.members;
        members.m_flag_i = ((((value) & (4))) >>> 0);
    }
    function method_state_export(runtime, entry) {
        const members = runtime.members;
        let __t0;
        switch ((__t0 = __deref_state_export(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case 3:
                {
                    members.m_debugger_temp = (((((((((((((((((((members.m_flag_n ?? 0)) & (128))) | (runtime.shiftRight((((members.m_flag_v ?? 0)) & (128)), 1)))) | ((((members.m_flag_p ?? 0)) >>> (3))))) | ((members.m_flag_b ?? 0)))) | ((((members.m_flag_h ?? 0)) & (8))))) | ((members.m_flag_i ?? 0)))) | ((((((members.m_flag_z ?? 0)) ? 0 : 1)) << (1))))) | ((((((members.m_flag_c ?? 0)) >>> (8))) & (1))))) >>> 0);
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
    function method_execute_set_input(runtime, inptnum, state) {
        const members = runtime.members;
        if (((Number(inptnum) === Number(-1)) ? 1 : 0)) {
        }
        else {
        }
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        if ((members.m_stopped ?? 0)) {
            /* debugger_wait_hook: no effect */
            members.m_ICount = ((0) | 0);
            return;
        }
        while (((((members.m_ICount ?? 0)) > (0)) ? 1 : 0)) {
            members.m_ppc = (((members.m_pc ?? 0)) >>> 0);
            /* debugger_instruction_hook: no effect */
            members.m_pc = ((((members.m_pc) + (1))) >>> 0);
            switch ((members.m_ir = ((method_read_8_immediate(runtime, (members.m_ppc ?? 0))) >>> 0))) {
                case 0:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        break;
                    }
                case 1:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65502));
                        break;
                    }
                case 2:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | (1))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 3:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_source ?? 0)) & (1))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 4:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) | (method_read_8_direct(runtime, method_EA_DP(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 5:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) | (method_read_8_normal(runtime, method_EA_ABS(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 6:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) | (method_read_8_direct(runtime, method_EA_XI(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 7:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) | (method_read_8_normal(runtime, method_EA_DXI(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 8:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) | (method_read_8_immediate(runtime, method_EA_IMM(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 9:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) | (method_read_8_direct(runtime, (members.m_destination ?? 0))))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 10:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_IMM16(runtime)) >>> 0);
                        if ((((((members.m_flag_c ?? 0)) & (256))) ? 0 : 1)) {
                            members.m_destination = ((method_read_16_immediate(runtime, (members.m_destination ?? 0))) >>> 0);
                            members.m_source = ((((1) << ((((members.m_destination ?? 0)) >>> (13))))) >>> 0);
                            members.m_destination = ((((members.m_destination) & (8191))) >>> 0);
                            if (((method_read_8_normal(runtime, (members.m_destination ?? 0))) & ((members.m_source ?? 0)))) {
                                members.m_flag_c = ((256) >>> 0);
                            }
                        }
                        break;
                    }
                case 11:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_c = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) << (1))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_flag_c ?? 0)) & (255))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 12:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_ABS(runtime)) >>> 0);
                        members.m_flag_c = ((((method_read_8_normal(runtime, (members.m_destination ?? 0))) << (1))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_flag_c ?? 0)) & (255))) >>> 0))) >>> 0);
                        method_write_8_normal(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 13:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_PUSH_8(runtime, (((((((((((((((((members.m_flag_n ?? 0)) & (128))) | (runtime.shiftRight((((members.m_flag_v ?? 0)) & (128)), 1)))) | ((((members.m_flag_p ?? 0)) >>> (3))))) | ((members.m_flag_b ?? 0)))) | ((((members.m_flag_h ?? 0)) & (8))))) | ((members.m_flag_i ?? 0)))) | ((((((members.m_flag_z ?? 0)) ? 0 : 1)) << (1))))) | ((((((members.m_flag_c ?? 0)) >>> (8))) & (1)))));
                        break;
                    }
                case 14:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_destination = ((method_EA_ABS(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_normal(runtime, (members.m_destination ?? 0))) >>> 0))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - (((method_read_8_normal(runtime, (members.m_destination ?? 0))) << 16 >> 16)))) << 16 >> 16);
                        method_write_8_normal(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((((members.m_flag_z ?? 0)) | ((members.m_a ?? 0)))) >>> 0)));
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 15:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_PUSH_8(runtime, (((((((((((((((((members.m_flag_n ?? 0)) & (128))) | (runtime.shiftRight((((members.m_flag_v ?? 0)) & (128)), 1)))) | ((((members.m_flag_p ?? 0)) >>> (3))))) | ((members.m_flag_b ?? 0)))) | ((((members.m_flag_h ?? 0)) & (8))))) | ((members.m_flag_i ?? 0)))) | ((((((members.m_flag_z ?? 0)) ? 0 : 1)) << (1))))) | ((((((members.m_flag_c ?? 0)) >>> (8))) & (1)))));
                        members.m_flag_b = ((((members.m_flag_b) | (16))) >>> 0);
                        members.m_flag_i = ((0) >>> 0);
                        method_JUMP(runtime, method_read_16_normal(runtime, 65502));
                        break;
                    }
                case 16:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_flag_n ?? 0)) & (128))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 17:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65500));
                        break;
                    }
                case 18:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) & (-2))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 19:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_source ?? 0)) & (1))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 20:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) | (method_read_8_direct(runtime, method_EA_DPX(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 21:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) | (method_read_8_normal(runtime, method_EA_ABX(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 22:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) | (method_read_8_normal(runtime, method_EA_ABY(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 23:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) | (method_read_8_normal(runtime, method_EA_DIY(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 24:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) | (method_read_8_direct(runtime, (members.m_destination ?? 0))))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 25:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_direct(runtime, method_EA_YI(runtime))) >>> 0))) >>> 0);
                        members.m_destination = ((method_EA_XI(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) | (method_read_8_direct(runtime, (members.m_destination ?? 0))))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 26:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((runtime.subtract(method_read_16_direct(runtime, (members.m_destination ?? 0)), 1)) & (65535))) >>> 0))) >>> 0);
                        method_write_16_direct(runtime, (members.m_destination ?? 0), (members.m_flag_z ?? 0));
                        members.m_flag_n = (((members.m_flag_z = (((((((((members.m_flag_z ?? 0)) & (127))) | ((((((members.m_flag_z ?? 0)) >>> (1))) & (64))))) | ((((((members.m_flag_z ?? 0)) >>> (8))) & (255))))) >>> 0))) >>> 0);
                        break;
                    }
                case 27:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_DPX(runtime)) >>> 0);
                        members.m_flag_c = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) << (1))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_flag_c ?? 0)) & (255))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 28:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_c = (((((members.m_a ?? 0)) << (1))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = (((((members.m_flag_c ?? 0)) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 29:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_x = (((((((members.m_x ?? 0)) - (1))) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 30:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABS(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_x ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 31:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        method_JUMP(runtime, method_EA_AXI(runtime));
                        if (((((members.m_pc ?? 0)) === ((members.m_ppc ?? 0))) ? 1 : 0)) {
                            members.m_ICount = ((0) | 0);
                        }
                        break;
                    }
                case 32:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_p = ((0) >>> 0);
                        break;
                    }
                case 33:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65498));
                        break;
                    }
                case 34:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | (2))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 35:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_source ?? 0)) & (2))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 36:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) & (method_read_8_direct(runtime, method_EA_DP(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 37:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) & (method_read_8_normal(runtime, method_EA_ABS(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 38:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) & (method_read_8_direct(runtime, method_EA_XI(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 39:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) & (method_read_8_normal(runtime, method_EA_DXI(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 40:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) & (method_read_8_immediate(runtime, method_EA_IMM(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 41:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) & (method_read_8_direct(runtime, (members.m_destination ?? 0))))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 42:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_IMM16(runtime)) >>> 0);
                        if ((((((members.m_flag_c ?? 0)) & (256))) ? 0 : 1)) {
                            members.m_destination = ((method_read_16_immediate(runtime, (members.m_destination ?? 0))) >>> 0);
                            members.m_source = ((((1) << ((((members.m_destination ?? 0)) >>> (13))))) >>> 0);
                            members.m_destination = ((((members.m_destination) & (8191))) >>> 0);
                            if (((((method_read_8_normal(runtime, (members.m_destination ?? 0))) & ((members.m_source ?? 0)))) ? 0 : 1)) {
                                members.m_flag_c = ((256) >>> 0);
                            }
                        }
                        break;
                    }
                case 43:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_c = ((((((method_read_8_direct(runtime, (members.m_destination ?? 0))) << (1))) | ((((((members.m_flag_c ?? 0)) >>> (8))) & (1))))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_flag_c ?? 0)) & (255))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 44:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_ABS(runtime)) >>> 0);
                        members.m_flag_c = ((((((method_read_8_normal(runtime, (members.m_destination ?? 0))) << (1))) | ((((((members.m_flag_c ?? 0)) >>> (8))) & (1))))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_flag_c ?? 0)) & (255))) >>> 0))) >>> 0);
                        method_write_8_normal(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 45:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_PUSH_8(runtime, (members.m_a ?? 0));
                        break;
                    }
                case 46:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_EA_IMM(runtime)) >>> 0);
                        if (((((members.m_source ?? 0)) !== ((members.m_a ?? 0))) ? 1 : 0)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, method_read_8_immediate(runtime, (members.m_destination ?? 0)));
                        }
                        break;
                    }
                case 47:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_BRANCH(runtime, method_read_8_immediate(runtime, method_EA_IMM(runtime)));
                        if (((((members.m_pc ?? 0)) === ((members.m_ppc ?? 0))) ? 1 : 0)) {
                            members.m_ICount = ((0) | 0);
                        }
                        break;
                    }
                case 48:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_flag_n ?? 0)) & (128))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 49:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65496));
                        break;
                    }
                case 50:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) & (-3))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 51:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_source ?? 0)) & (2))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 52:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) & (method_read_8_direct(runtime, method_EA_DPX(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 53:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) & (method_read_8_normal(runtime, method_EA_ABX(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 54:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) & (method_read_8_normal(runtime, method_EA_ABY(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 55:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) & (method_read_8_normal(runtime, method_EA_DIY(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 56:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) & (method_read_8_direct(runtime, (members.m_destination ?? 0))))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 57:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_direct(runtime, method_EA_YI(runtime))) >>> 0))) >>> 0);
                        members.m_destination = ((method_EA_XI(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) & (method_read_8_direct(runtime, (members.m_destination ?? 0))))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 58:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((__add_execute_run(runtime, method_read_16_direct(runtime, (members.m_destination ?? 0)), 1)) & (65535))) >>> 0))) >>> 0);
                        method_write_16_direct(runtime, (members.m_destination ?? 0), (members.m_flag_z ?? 0));
                        members.m_flag_n = (((members.m_flag_z = (((((((((members.m_flag_z ?? 0)) & (127))) | ((((((members.m_flag_z ?? 0)) >>> (1))) & (64))))) | ((((((members.m_flag_z ?? 0)) >>> (8))) & (255))))) >>> 0))) >>> 0);
                        break;
                    }
                case 59:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_DPX(runtime)) >>> 0);
                        members.m_flag_c = ((((((method_read_8_direct(runtime, (members.m_destination ?? 0))) << (1))) | ((((((members.m_flag_c ?? 0)) >>> (8))) & (1))))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_flag_c ?? 0)) & (255))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 60:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_c = (((((((members.m_a ?? 0)) << (1))) | ((((((members.m_flag_c ?? 0)) >>> (8))) & (1))))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = (((((members.m_flag_c ?? 0)) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 61:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_x = (((((((members.m_x ?? 0)) + (1))) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 62:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_x ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 63:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        members.m_destination = ((method_EA_ABS(runtime)) >>> 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, (members.m_destination ?? 0));
                        break;
                    }
                case 64:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_p = ((256) >>> 0);
                        break;
                    }
                case 65:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65494));
                        break;
                    }
                case 66:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | (4))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 67:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_source ?? 0)) & (4))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 68:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) ^ (method_read_8_direct(runtime, method_EA_DP(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 69:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) ^ (method_read_8_normal(runtime, method_EA_ABS(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 70:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) ^ (method_read_8_direct(runtime, method_EA_XI(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 71:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) ^ (method_read_8_normal(runtime, method_EA_DXI(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 72:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) ^ (method_read_8_immediate(runtime, method_EA_IMM(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 73:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) ^ (method_read_8_direct(runtime, (members.m_destination ?? 0))))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 74:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_IMM16(runtime)) >>> 0);
                        if ((((members.m_flag_c ?? 0)) & (256))) {
                            members.m_destination = ((method_read_16_immediate(runtime, (members.m_destination ?? 0))) >>> 0);
                            members.m_source = ((((1) << ((((members.m_destination ?? 0)) >>> (13))))) >>> 0);
                            members.m_destination = ((((members.m_destination) & (8191))) >>> 0);
                            if (((((method_read_8_normal(runtime, (members.m_destination ?? 0))) & ((members.m_source ?? 0)))) ? 0 : 1)) {
                                members.m_flag_c = ((0) >>> 0);
                            }
                        }
                        break;
                    }
                case 75:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_direct(runtime, (members.m_destination ?? 0))) >>> 0))) >>> 0);
                        members.m_flag_c = (((((members.m_flag_n ?? 0)) << (8))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) >>> (1))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 76:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_ABS(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_normal(runtime, (members.m_destination ?? 0))) >>> 0))) >>> 0);
                        members.m_flag_c = (((((members.m_flag_n ?? 0)) << (8))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) >>> (1))) >>> 0))) >>> 0);
                        method_write_8_normal(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 77:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_PUSH_8(runtime, (members.m_x ?? 0));
                        break;
                    }
                case 78:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_destination = ((method_EA_ABS(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_normal(runtime, (members.m_destination ?? 0))) >>> 0))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - (((method_read_8_normal(runtime, (members.m_destination ?? 0))) << 16 >> 16)))) << 16 >> 16);
                        method_write_8_normal(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((((members.m_flag_z ?? 0)) & ((~(members.m_a ?? 0))))) >>> 0)));
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 79:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, ((65280) | ((members.m_destination ?? 0))));
                        break;
                    }
                case 80:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_flag_v ?? 0)) & (128))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 81:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65492));
                        break;
                    }
                case 82:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) & (-5))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 83:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_source ?? 0)) & (4))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 84:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) ^ (method_read_8_direct(runtime, method_EA_DPX(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 85:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) ^ (method_read_8_normal(runtime, method_EA_ABX(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 86:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) ^ (method_read_8_normal(runtime, method_EA_ABY(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 87:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) ^ (method_read_8_normal(runtime, method_EA_DIY(runtime))))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 88:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) ^ (method_read_8_direct(runtime, (members.m_destination ?? 0))))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 89:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_direct(runtime, method_EA_YI(runtime))) >>> 0))) >>> 0);
                        members.m_destination = ((method_EA_XI(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) ^ (method_read_8_direct(runtime, (members.m_destination ?? 0))))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 90:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_source = ((method_read_16_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_spc_int32 = (((((((((members.m_a ?? 0)) | ((((members.m_y ?? 0)) << (8))))) | 0)) - ((((members.m_source ?? 0)) | 0)))) | 0);
                        members.m_flag_c = ((((((((members.m_spc_int32 ?? 0)) >= (0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((((((members.m_spc_int32 ?? 0)) & (127))) | (((runtime.shiftRight((members.m_spc_int32 ?? 0), 1)) & (64))))) | (((runtime.shiftRight((members.m_spc_int32 ?? 0), 8)) & (255))))) >>> 0))) >>> 0);
                        break;
                    }
                case 91:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_DPX(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_8_direct(runtime, (members.m_destination ?? 0))) >>> 0))) >>> 0);
                        members.m_flag_c = (((((members.m_flag_n ?? 0)) << (8))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) >>> (1))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 92:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_c = (((((members.m_a ?? 0)) << (8))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) >>> (1))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 93:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_x = (((members.m_a ?? 0)) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 94:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABS(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_y ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 95:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        method_JUMP(runtime, method_EA_ABS(runtime));
                        if (((((members.m_pc ?? 0)) === ((members.m_ppc ?? 0))) ? 1 : 0)) {
                            members.m_ICount = ((0) | 0);
                        }
                        break;
                    }
                case 96:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_c = ((0) >>> 0);
                        break;
                    }
                case 97:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65490));
                        break;
                    }
                case 98:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | (8))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 99:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_source ?? 0)) & (8))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 100:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 101:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABS(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 102:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_XI(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 103:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_DXI(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 104:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_source = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 105:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_spc_int16 = ((((((method_read_8_direct(runtime, method_EA_DP(runtime))) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 106:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_IMM16(runtime)) >>> 0);
                        if ((((members.m_flag_c ?? 0)) & (256))) {
                            members.m_destination = ((method_read_16_immediate(runtime, (members.m_destination ?? 0))) >>> 0);
                            members.m_source = ((((1) << ((((members.m_destination ?? 0)) >>> (13))))) >>> 0);
                            members.m_destination = ((((members.m_destination) & (8191))) >>> 0);
                            if (((method_read_8_normal(runtime, (members.m_destination ?? 0))) & ((members.m_source ?? 0)))) {
                                members.m_flag_c = ((0) >>> 0);
                            }
                        }
                        break;
                    }
                case 107:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | ((((members.m_flag_c ?? 0)) & (256))))) >>> 0))) >>> 0);
                        members.m_flag_c = (((((members.m_flag_n ?? 0)) << (8))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) >>> (1))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 108:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_ABS(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((method_read_8_normal(runtime, (members.m_destination ?? 0))) | ((((members.m_flag_c ?? 0)) & (256))))) >>> 0))) >>> 0);
                        members.m_flag_c = (((((members.m_flag_n ?? 0)) << (8))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) >>> (1))) >>> 0))) >>> 0);
                        method_write_8_normal(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 109:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_PUSH_8(runtime, (members.m_y ?? 0));
                        break;
                    }
                case 110:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((runtime.subtract(method_read_8_direct(runtime, (members.m_destination ?? 0)), 1)) & (255))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        members.m_destination = ((method_EA_IMM(runtime)) >>> 0);
                        if (((((members.m_source ?? 0)) !== (0)) ? 1 : 0)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, method_read_8_immediate(runtime, (members.m_destination ?? 0)));
                        }
                        break;
                    }
                case 111:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        method_JUMP(runtime, method_PULL_16(runtime));
                        break;
                    }
                case 112:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_flag_v ?? 0)) & (128))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 113:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65488));
                        break;
                    }
                case 114:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) & (-9))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 115:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_source ?? 0)) & (8))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 116:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DPX(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 117:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABX(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 118:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABY(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 119:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_DIY(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_a ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 120:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        members.m_spc_int16 = ((((((method_read_8_direct(runtime, method_EA_DP(runtime))) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 121:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_YI(runtime))) >>> 0);
                        members.m_spc_int16 = ((((((method_read_8_direct(runtime, method_EA_XI(runtime))) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 122:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_16_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = (((((members.m_a ?? 0)) | ((((members.m_y ?? 0)) << (8))))) >>> 0);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (255)), (((members.m_destination ?? 0)) & (255)))) >>> 0);
                        members.m_temp2 = ((((((((members.m_temp1 ?? 0)) > (255)) ? 1 : 0)) ? (1) : (0))) >>> 0);
                        members.m_temp3 = ((((__add_execute_run(runtime, (((members.m_source ?? 0)) >>> (8)), (((members.m_destination ?? 0)) >>> (8)))) + ((members.m_temp2 ?? 0)))) >>> 0);
                        members.m_spc_int16 = ((((__add_execute_run(runtime, (((members.m_temp1 ?? 0)) & (255)), (((members.m_temp3 ?? 0)) << (8)))) & (65535))) << 16 >> 16);
                        members.m_flag_c = ((((((((members.m_temp3 ?? 0)) > (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_h = (((((((((__add_execute_run(runtime, (((((members.m_destination ?? 0)) >>> (8))) & (15)), (((((members.m_source ?? 0)) >>> (8))) & (15)))) + ((members.m_temp2 ?? 0)))) > (15)) ? 1 : 0)) ? (8) : (0))) >>> 0);
                        members.m_flag_v = (((((((((~(((members.m_destination ?? 0)) ^ ((members.m_source ?? 0))))) & ((((members.m_source ?? 0)) ^ ((((members.m_spc_int16 ?? 0)) & 0xffff)))))) & (32768))) ? (128) : (0))) >>> 0);
                        members.m_flag_z = ((((Number((members.m_spc_int16 ?? 0)) !== Number(0)) ? 1 : 0)) >>> 0);
                        members.m_flag_n = ((runtime.shiftRight((members.m_spc_int16 ?? 0), 8)) >>> 0);
                        method_SET_REG_YA(runtime, (members.m_spc_int16 ?? 0));
                        break;
                    }
                case 123:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_DPX(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | ((((members.m_flag_c ?? 0)) & (256))))) >>> 0))) >>> 0);
                        members.m_flag_c = (((((members.m_flag_n ?? 0)) << (8))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((members.m_flag_z) >>> (1))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 124:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_a = ((((members.m_a) | ((((members.m_flag_c ?? 0)) & (256))))) >>> 0);
                        members.m_flag_c = (((((members.m_a ?? 0)) << (8))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((((members.m_a) >>> (1))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 125:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = (((members.m_x ?? 0)) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 126:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_y ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 127:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        method_SET_REG_P(runtime, method_PULL_8(runtime));
                        method_JUMP(runtime, method_PULL_16(runtime));
                        break;
                    }
                case 128:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_c = ((256) >>> 0);
                        break;
                    }
                case 129:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65486));
                        break;
                    }
                case 130:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | (16))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 131:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_source ?? 0)) & (16))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 132:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + ((members.m_a ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ ((members.m_a ?? 0))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 133:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABS(runtime))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + ((members.m_a ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ ((members.m_a ?? 0))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 134:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_XI(runtime))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + ((members.m_a ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ ((members.m_a ?? 0))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 135:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_DXI(runtime))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + ((members.m_a ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ ((members.m_a ?? 0))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 136:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_source = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + ((members.m_a ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ ((members.m_a ?? 0))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 137:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + (method_read_8_direct(runtime, (members.m_destination ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ (method_read_8_direct(runtime, (members.m_destination ?? 0)))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (((members.m_spc_int16 ?? 0)) & 0xff));
                        break;
                    }
                case 138:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_read_16_immediate(runtime, method_EA_IMM16(runtime))) >>> 0);
                        members.m_source = ((((1) << ((((members.m_destination ?? 0)) >>> (13))))) >>> 0);
                        members.m_destination = ((((members.m_destination) & (8191))) >>> 0);
                        if (((method_read_8_normal(runtime, (members.m_destination ?? 0))) & ((members.m_source ?? 0)))) {
                            members.m_flag_c = (((~(members.m_flag_c ?? 0))) >>> 0);
                        }
                        break;
                    }
                case 139:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((runtime.subtract(method_read_8_direct(runtime, (members.m_destination ?? 0)), 1)) & (255))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 140:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_ABS(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((runtime.subtract(method_read_8_normal(runtime, (members.m_destination ?? 0)), 1)) & (255))) >>> 0))) >>> 0);
                        method_write_8_normal(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 141:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_y = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 142:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_SET_REG_P(runtime, method_PULL_8(runtime));
                        break;
                    }
                case 143:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 144:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_flag_c ?? 0)) & (256))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 145:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65484));
                        break;
                    }
                case 146:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) & (-17))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 147:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_source ?? 0)) & (16))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 148:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DPX(runtime))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + ((members.m_a ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ ((members.m_a ?? 0))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 149:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABX(runtime))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + ((members.m_a ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ ((members.m_a ?? 0))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 150:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABY(runtime))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + ((members.m_a ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ ((members.m_a ?? 0))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 151:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_DIY(runtime))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + ((members.m_a ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ ((members.m_a ?? 0))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 152:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + (method_read_8_direct(runtime, (members.m_destination ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ (method_read_8_direct(runtime, (members.m_destination ?? 0)))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (((members.m_spc_int16 ?? 0)) & 0xff));
                        break;
                    }
                case 153:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_YI(runtime))) >>> 0);
                        members.m_destination = ((method_EA_XI(runtime)) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) + (method_read_8_direct(runtime, (members.m_destination ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_source ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_source ?? 0)) ^ (method_read_8_direct(runtime, (members.m_destination ?? 0)))))) & ((((((members.m_source ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (((members.m_spc_int16 ?? 0)) & 0xff));
                        break;
                    }
                case 154:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_16_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = (((((members.m_a ?? 0)) | ((((members.m_y ?? 0)) << (8))))) >>> 0);
                        members.m_temp1 = (((((((members.m_destination ?? 0)) & (255))) - ((((members.m_source ?? 0)) & (255))))) >>> 0);
                        members.m_temp2 = ((((((((members.m_temp1 ?? 0)) > (255)) ? 1 : 0)) ? (1) : (0))) >>> 0);
                        members.m_temp3 = (((((((((members.m_destination ?? 0)) >>> (8))) - ((((members.m_source ?? 0)) >>> (8))))) - ((members.m_temp2 ?? 0)))) >>> 0);
                        members.m_spc_int16 = ((((__add_execute_run(runtime, (((members.m_temp1 ?? 0)) & (255)), (((members.m_temp3 ?? 0)) << (8)))) & (65535))) << 16 >> 16);
                        members.m_flag_c = ((((((((members.m_temp3 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_h = ((((((((((((((((members.m_destination ?? 0)) >>> (8))) & (15))) - ((((((members.m_source ?? 0)) >>> (8))) & (15))))) - ((members.m_temp2 ?? 0)))) > (15)) ? 1 : 0)) ? (0) : (8))) >>> 0);
                        members.m_flag_v = (((((((((((members.m_destination ?? 0)) ^ ((members.m_source ?? 0)))) & ((((members.m_destination ?? 0)) ^ ((((members.m_spc_int16 ?? 0)) & 0xffff)))))) & (32768))) ? (128) : (0))) >>> 0);
                        members.m_flag_z = ((((Number((members.m_spc_int16 ?? 0)) !== Number(0)) ? 1 : 0)) >>> 0);
                        members.m_flag_n = ((runtime.shiftRight((members.m_spc_int16 ?? 0), 8)) >>> 0);
                        method_SET_REG_YA(runtime, (members.m_spc_int16 ?? 0));
                        break;
                    }
                case 155:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_DPX(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((runtime.subtract(method_read_8_direct(runtime, (members.m_destination ?? 0)), 1)) & (255))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 156:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = (((((((members.m_a ?? 0)) - (1))) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 157:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_x = (((members.m_s ?? 0)) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 158:
                    {
                        members.m_ICount = ((((members.m_ICount) - (24))) | 0);
                        members.m_temp1 = (((members.m_source = (((((members.m_a ?? 0)) | ((((members.m_y ?? 0)) << (8))))) >>> 0))) >>> 0);
                        members.m_temp2 = (((((members.m_x ?? 0)) << (9))) >>> 0);
                        members.m_flag_h = ((0) >>> 0);
                        if (((Number((((members.m_y ?? 0)) & (15))) >= Number((((members.m_x ?? 0)) & (15)))) ? 1 : 0)) {
                            members.m_flag_h = ((8) >>> 0);
                        }
                        for (members.m_temp3 = ((0) >>> 0); ((((members.m_temp3 ?? 0)) < (9)) ? 1 : 0); members.m_temp3 = ((((members.m_temp3) + (1))) >>> 0)) {
                            members.m_temp1 = ((((members.m_temp1) << (1))) >>> 0);
                            if ((((members.m_temp1 ?? 0)) & (131072))) {
                                members.m_temp1 = (((((((members.m_temp1 ?? 0)) & (131071))) | (1))) >>> 0);
                            }
                            if (((((members.m_temp1 ?? 0)) >= ((members.m_temp2 ?? 0))) ? 1 : 0)) {
                                members.m_temp1 = ((((members.m_temp1) ^ (1))) >>> 0);
                            }
                            if ((((members.m_temp1 ?? 0)) & (1))) {
                                members.m_temp1 = (((((((members.m_temp1 ?? 0)) - ((members.m_temp2 ?? 0)))) & (131071))) >>> 0);
                            }
                        }
                        members.m_flag_v = (((((((members.m_temp1 ?? 0)) & (256))) ? (128) : (0))) >>> 0);
                        method_SET_REG_YA(runtime, __add_execute_run(runtime, (((((((members.m_temp1 ?? 0)) >>> (9))) & (255))) << (8)), (((members.m_temp1 ?? 0)) & (255))));
                        members.m_flag_n = (((members.m_flag_z = (((((((members.m_a ?? 0)) | ((((members.m_y ?? 0)) << (8))))) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 159:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = (((((((((members.m_a ?? 0)) << (4))) | ((((members.m_a ?? 0)) >>> (4))))) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 160:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_i = ((4) >>> 0);
                        break;
                    }
                case 161:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65482));
                        break;
                    }
                case 162:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | (32))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 163:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_source ?? 0)) & (32))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 164:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_temp2 = (((((((members.m_a ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) + ((~(members.m_source ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_a ?? 0)) ^ ((~(members.m_source ?? 0)))))) & ((((((members.m_a ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 165:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABS(runtime))) >>> 0);
                        members.m_temp2 = (((((((members.m_a ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) + ((~(members.m_source ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_a ?? 0)) ^ ((~(members.m_source ?? 0)))))) & ((((((members.m_a ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 166:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_XI(runtime))) >>> 0);
                        members.m_temp2 = (((((((members.m_a ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) + ((~(members.m_source ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_a ?? 0)) ^ ((~(members.m_source ?? 0)))))) & ((((((members.m_a ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 167:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_DXI(runtime))) >>> 0);
                        members.m_temp2 = (((((((members.m_a ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) + ((~(members.m_source ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_a ?? 0)) ^ ((~(members.m_source ?? 0)))))) & ((((((members.m_a ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 168:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_source = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        members.m_temp2 = (((((((members.m_a ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) + ((~(members.m_source ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_a ?? 0)) ^ ((~(members.m_source ?? 0)))))) & ((((((members.m_a ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 169:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_temp3 = ((method_read_8_direct(runtime, (members.m_destination ?? 0))) >>> 0);
                        members.m_temp2 = (((((((members.m_temp3 ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((~(members.m_source ?? 0))) + ((members.m_temp3 ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((~(members.m_source ?? 0))) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((~(members.m_source ?? 0))) ^ ((members.m_temp3 ?? 0))))) & ((((((~(members.m_source ?? 0))) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (((members.m_spc_int16 ?? 0)) & 0xff));
                        break;
                    }
                case 170:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_read_16_immediate(runtime, method_EA_IMM16(runtime))) >>> 0);
                        members.m_source = ((((1) << ((((members.m_destination ?? 0)) >>> (13))))) >>> 0);
                        members.m_destination = ((((members.m_destination) & (8191))) >>> 0);
                        members.m_flag_c = ((((((Number(((method_read_8_normal(runtime, (members.m_destination ?? 0))) & ((members.m_source ?? 0)))) !== Number(0)) ? 1 : 0)) << (8))) >>> 0);
                        break;
                    }
                case 171:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((__add_execute_run(runtime, method_read_8_direct(runtime, (members.m_destination ?? 0)), 1)) & (255))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 172:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_ABS(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((__add_execute_run(runtime, method_read_8_normal(runtime, (members.m_destination ?? 0)), 1)) & (255))) >>> 0))) >>> 0);
                        method_write_8_normal(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 173:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_source = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_y ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 174:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_a = ((method_PULL_8(runtime)) >>> 0);
                        break;
                    }
                case 175:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_write_8_direct(runtime, method_EA_XII(runtime), (members.m_a ?? 0));
                        break;
                    }
                case 176:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_flag_c ?? 0)) & (256))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 177:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65480));
                        break;
                    }
                case 178:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) & (-33))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 179:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_source ?? 0)) & (32))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 180:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DPX(runtime))) >>> 0);
                        members.m_temp2 = (((((((members.m_a ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) + ((~(members.m_source ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_a ?? 0)) ^ ((~(members.m_source ?? 0)))))) & ((((((members.m_a ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 181:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABX(runtime))) >>> 0);
                        members.m_temp2 = (((((((members.m_a ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) + ((~(members.m_source ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_a ?? 0)) ^ ((~(members.m_source ?? 0)))))) & ((((((members.m_a ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 182:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_ABY(runtime))) >>> 0);
                        members.m_temp2 = (((((((members.m_a ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) + ((~(members.m_source ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_a ?? 0)) ^ ((~(members.m_source ?? 0)))))) & ((((((members.m_a ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 183:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_normal(runtime, method_EA_DIY(runtime))) >>> 0);
                        members.m_temp2 = (((((((members.m_a ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) + ((~(members.m_source ?? 0)))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((members.m_a ?? 0)) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((members.m_a ?? 0)) ^ ((~(members.m_source ?? 0)))))) & ((((((members.m_a ?? 0)) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_a = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0);
                        break;
                    }
                case 184:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_temp3 = ((method_read_8_direct(runtime, (members.m_destination ?? 0))) >>> 0);
                        members.m_temp2 = (((((((members.m_temp3 ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((~(members.m_source ?? 0))) + ((members.m_temp3 ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((~(members.m_source ?? 0))) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((~(members.m_source ?? 0))) ^ ((members.m_temp3 ?? 0))))) & ((((((~(members.m_source ?? 0))) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (((members.m_spc_int16 ?? 0)) & 0xff));
                        break;
                    }
                case 185:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_YI(runtime))) >>> 0);
                        members.m_destination = ((method_EA_XI(runtime)) >>> 0);
                        members.m_temp3 = ((method_read_8_direct(runtime, (members.m_destination ?? 0))) >>> 0);
                        members.m_temp2 = (((((((members.m_temp3 ?? 0)) - ((members.m_source ?? 0)))) - ((((((((members.m_flag_c ?? 0)) >>> (8))) & (1))) ^ (1))))) >>> 0);
                        members.m_spc_int16 = ((__add_execute_run(runtime, (((~(members.m_source ?? 0))) + ((members.m_temp3 ?? 0))), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) << 16 >> 16);
                        members.m_temp1 = ((__add_execute_run(runtime, (((~(members.m_source ?? 0))) & (15)), (((((members.m_flag_c ?? 0)) >>> (8))) & (1)))) >>> 0);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) > Number(255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_v = (((((~(((~(members.m_source ?? 0))) ^ ((members.m_temp3 ?? 0))))) & ((((((~(members.m_source ?? 0))) ^ ((members.m_spc_int16 ?? 0)))) & (128))))) >>> 0);
                        members.m_flag_h = ((runtime.shiftRight((((((((members.m_spc_int16 ?? 0)) & (15))) - ((members.m_temp1 ?? 0)))) & (16)), 1)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & 0xff)) >>> 0))) >>> 0);
                        members.m_flag_c = ((((((((members.m_temp2 ?? 0)) <= (255)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (((members.m_spc_int16 ?? 0)) & 0xff));
                        break;
                    }
                case 186:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = ((method_read_16_direct(runtime, method_EA_DP(runtime))) >>> 0))) >>> 0);
                        method_SET_REG_YA(runtime, (members.m_flag_z ?? 0));
                        members.m_flag_n = (((members.m_flag_z = (((((((((members.m_flag_z ?? 0)) & (127))) | ((((((members.m_flag_z ?? 0)) >>> (1))) & (64))))) | ((((((members.m_flag_z ?? 0)) >>> (8))) & (255))))) >>> 0))) >>> 0);
                        break;
                    }
                case 187:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_EA_DPX(runtime)) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = ((((__add_execute_run(runtime, method_read_8_direct(runtime, (members.m_destination ?? 0)), 1)) & (255))) >>> 0))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_flag_n = (((members.m_flag_z ?? 0)) >>> 0)));
                        break;
                    }
                case 188:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = (((((((members.m_a ?? 0)) + (1))) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 189:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_s = (((members.m_x ?? 0)) >>> 0);
                        break;
                    }
                case 190:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = (((members.m_a ?? 0)) >>> 0);
                        if (((((((((members.m_flag_h ?? 0)) & (8))) ? 0 : 1)) || (((Number((((members.m_source ?? 0)) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_a = ((((members.m_a) - (6))) >>> 0);
                        }
                        if (((((((((members.m_flag_c ?? 0)) & (256))) ? 0 : 1)) || (((((members.m_source ?? 0)) > (153)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_a = ((((members.m_a) - (96))) >>> 0);
                            members.m_flag_c = ((0) >>> 0);
                        }
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = (((((members.m_a ?? 0)) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 191:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_direct(runtime, method_EA_XII(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 192:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_i = ((0) >>> 0);
                        break;
                    }
                case 193:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65478));
                        break;
                    }
                case 194:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | (64))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 195:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_source ?? 0)) & (64))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 196:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_write_8_direct(runtime, method_EA_DP(runtime), (members.m_a ?? 0));
                        break;
                    }
                case 197:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        method_write_8_normal(runtime, method_EA_ABS(runtime), (members.m_a ?? 0));
                        break;
                    }
                case 198:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_write_8_direct(runtime, method_EA_XI(runtime), (members.m_a ?? 0));
                        break;
                    }
                case 199:
                    {
                        members.m_ICount = ((((members.m_ICount) - (14))) | 0);
                        method_write_8_normal(runtime, method_EA_DXI(runtime), (members.m_a ?? 0));
                        break;
                    }
                case 200:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_source = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        members.m_spc_int16 = (((((((members.m_x ?? 0)) << 16 >> 16)) - ((((members.m_source ?? 0)) << 16 >> 16)))) << 16 >> 16);
                        members.m_flag_c = ((((((Number((members.m_spc_int16 ?? 0)) >= Number(0)) ? 1 : 0)) ? (256) : (0))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((((members.m_spc_int16 ?? 0)) & (255))) >>> 0))) >>> 0);
                        break;
                    }
                case 201:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        method_write_8_normal(runtime, method_EA_ABS(runtime), (members.m_x ?? 0));
                        break;
                    }
                case 202:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_destination = ((method_read_16_immediate(runtime, method_EA_IMM16(runtime))) >>> 0);
                        members.m_source = ((((1) << ((((members.m_destination ?? 0)) >>> (13))))) >>> 0);
                        members.m_destination = ((((members.m_destination) & (8191))) >>> 0);
                        if ((((members.m_flag_c ?? 0)) & (256))) {
                            method_write_8_normal(runtime, (members.m_destination ?? 0), ((method_read_8_normal(runtime, (members.m_destination ?? 0))) | ((members.m_source ?? 0))));
                        }
                        else {
                            method_write_8_normal(runtime, (members.m_destination ?? 0), ((method_read_8_normal(runtime, (members.m_destination ?? 0))) & ((~(members.m_source ?? 0)))));
                        }
                        break;
                    }
                case 203:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_write_8_direct(runtime, method_EA_DP(runtime), (members.m_y ?? 0));
                        break;
                    }
                case 204:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        method_write_8_normal(runtime, method_EA_ABS(runtime), (members.m_y ?? 0));
                        break;
                    }
                case 205:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_x = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 206:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_x = ((method_PULL_8(runtime)) >>> 0);
                        break;
                    }
                case 207:
                    {
                        members.m_ICount = ((((members.m_ICount) - (18))) | 0);
                        members.m_source = (((((members.m_y ?? 0)) * ((members.m_a ?? 0)))) >>> 0);
                        members.m_a = (((((members.m_source ?? 0)) & (255))) >>> 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_y = (((((members.m_source ?? 0)) >>> (8))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 208:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((members.m_flag_z ?? 0)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 209:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65476));
                        break;
                    }
                case 210:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) & (-65))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 211:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_source ?? 0)) & (64))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 212:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        method_write_8_direct(runtime, method_EA_DPX(runtime), (members.m_a ?? 0));
                        break;
                    }
                case 213:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        method_write_8_normal(runtime, method_EA_ABX(runtime), (members.m_a ?? 0));
                        break;
                    }
                case 214:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        method_write_8_normal(runtime, method_EA_ABY(runtime), (members.m_a ?? 0));
                        break;
                    }
                case 215:
                    {
                        members.m_ICount = ((((members.m_ICount) - (14))) | 0);
                        method_write_8_normal(runtime, method_EA_DIY(runtime), (members.m_a ?? 0));
                        break;
                    }
                case 216:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        method_write_8_direct(runtime, method_EA_DP(runtime), (members.m_x ?? 0));
                        break;
                    }
                case 217:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        method_write_8_direct(runtime, method_EA_DPY(runtime), (members.m_x ?? 0));
                        break;
                    }
                case 218:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        method_write_16_direct(runtime, method_EA_DP(runtime), (((members.m_a ?? 0)) | ((((members.m_y ?? 0)) << (8)))));
                        break;
                    }
                case 219:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        method_write_8_direct(runtime, method_EA_DPX(runtime), (members.m_y ?? 0));
                        break;
                    }
                case 220:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_y = (((((((members.m_y ?? 0)) - (1))) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 221:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = (((members.m_y ?? 0)) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 222:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DPX(runtime))) >>> 0);
                        members.m_destination = ((method_EA_IMM(runtime)) >>> 0);
                        if (((((members.m_source ?? 0)) !== ((members.m_a ?? 0))) ? 1 : 0)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, method_read_8_immediate(runtime, (members.m_destination ?? 0)));
                        }
                        break;
                    }
                case 223:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_source = (((members.m_a ?? 0)) >>> 0);
                        if ((((((Number((((members.m_source ?? 0)) & (15))) > Number(9)) ? 1 : 0)) || ((((members.m_flag_h ?? 0)) & (8)))) ? 1 : 0)) {
                            members.m_a = ((((members.m_a) + (6))) >>> 0);
                            if (((((members.m_a ?? 0)) < (6)) ? 1 : 0)) {
                                members.m_flag_c = ((256) >>> 0);
                            }
                        }
                        if ((((((((members.m_source ?? 0)) > (153)) ? 1 : 0)) || ((((members.m_flag_c ?? 0)) & (256)))) ? 1 : 0)) {
                            members.m_a = ((((members.m_a) + (96))) >>> 0);
                            members.m_flag_c = ((256) >>> 0);
                        }
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = (((((members.m_a ?? 0)) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 224:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_v = ((0) >>> 0);
                        members.m_flag_h = ((0) >>> 0);
                        break;
                    }
                case 225:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65474));
                        break;
                    }
                case 226:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) | (128))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 227:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_source ?? 0)) & (128))) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 228:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 229:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_normal(runtime, method_EA_ABS(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 230:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_direct(runtime, method_EA_XI(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 231:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_normal(runtime, method_EA_DXI(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 232:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 233:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_x = ((method_read_8_normal(runtime, method_EA_ABS(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 234:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_destination = ((method_read_16_immediate(runtime, method_EA_IMM16(runtime))) >>> 0);
                        members.m_source = ((((1) << ((((members.m_destination ?? 0)) >>> (13))))) >>> 0);
                        members.m_destination = ((((members.m_destination) & (8191))) >>> 0);
                        method_write_8_normal(runtime, (members.m_destination ?? 0), ((method_read_8_normal(runtime, (members.m_destination ?? 0))) ^ ((members.m_source ?? 0))));
                        break;
                    }
                case 235:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_y = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 236:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_y = ((method_read_8_normal(runtime, method_EA_ABS(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 237:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_c = (((~(members.m_flag_c ?? 0))) >>> 0);
                        break;
                    }
                case 238:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_y = ((method_PULL_8(runtime)) >>> 0);
                        break;
                    }
                case 239:
                    {
                        members.m_ICount = ((((members.m_ICount) - (2))) | 0);
                        members.m_stopped = ((((members.m_stopped) | (2))) >>> 0);
                        members.m_ICount = ((0) | 0);
                        break;
                    }
                case 240:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((members.m_flag_z ?? 0)) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 241:
                    {
                        members.m_ICount = ((((members.m_ICount) - (16))) | 0);
                        method_PUSH_16(runtime, (members.m_pc ?? 0));
                        method_JUMP(runtime, method_read_16_normal(runtime, 65472));
                        break;
                    }
                case 242:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        members.m_source = ((((method_read_8_direct(runtime, (members.m_destination ?? 0))) & (-129))) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 243:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
                        if ((((((members.m_source ?? 0)) & (128))) ? 0 : 1)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, (members.m_destination ?? 0));
                        }
                        break;
                    }
                case 244:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_direct(runtime, method_EA_DPX(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 245:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_normal(runtime, method_EA_ABX(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 246:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_normal(runtime, method_EA_ABY(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 247:
                    {
                        members.m_ICount = ((((members.m_ICount) - (12))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_a = ((method_read_8_normal(runtime, method_EA_DIY(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 248:
                    {
                        members.m_ICount = ((((members.m_ICount) - (6))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_x = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 249:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_x = ((method_read_8_direct(runtime, method_EA_DPY(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 250:
                    {
                        members.m_ICount = ((((members.m_ICount) - (10))) | 0);
                        members.m_source = ((method_read_8_direct(runtime, method_EA_DP(runtime))) >>> 0);
                        members.m_destination = ((method_EA_DP(runtime)) >>> 0);
                        method_write_8_direct(runtime, (members.m_destination ?? 0), (members.m_source ?? 0));
                        break;
                    }
                case 251:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_y = ((method_read_8_direct(runtime, method_EA_DPX(runtime))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 252:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_y = (((((((members.m_y ?? 0)) + (1))) & (255))) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 253:
                    {
                        members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                        members.m_flag_n = (((members.m_flag_z = (((members.m_y = (((members.m_a ?? 0)) >>> 0))) >>> 0))) >>> 0);
                        break;
                    }
                case 254:
                    {
                        members.m_ICount = ((((members.m_ICount) - (8))) | 0);
                        members.m_y = (((((((members.m_y ?? 0)) - (1))) & (255))) >>> 0);
                        members.m_destination = ((method_EA_IMM(runtime)) >>> 0);
                        if (((((members.m_y ?? 0)) !== (0)) ? 1 : 0)) {
                            members.m_ICount = ((((members.m_ICount) - (4))) | 0);
                            method_BRANCH(runtime, method_read_8_immediate(runtime, (members.m_destination ?? 0)));
                        }
                        break;
                    }
                case 255:
                    {
                        members.m_ICount = ((((members.m_ICount) - (2))) | 0);
                        members.m_stopped = ((((members.m_stopped) | (1))) >>> 0);
                        members.m_ICount = ((0) | 0);
                        break;
                    }
            }
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
    function method_read_8_immediate(runtime, address) {
        const members = runtime.members;
        address = ((((address) & (65535))) >>> 0);
        return (((__deref_read_8_immediate(runtime, members.m_program).read_byte?.(address) ?? 0)) >>> 0);
    }
    function __deref_read_8_immediate(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_PUSH_16(runtime, value) {
        const members = runtime.members;
        method_PUSH_8(runtime, ((value) >>> (8)));
        method_PUSH_8(runtime, value);
    }
    function method_PUSH_8(runtime, value) {
        const members = runtime.members;
        method_write_8_normal(runtime, (((members.m_s ?? 0)) + (256)), value);
        members.m_s = (((((((members.m_s ?? 0)) - (1))) & (255))) >>> 0);
    }
    function method_write_8_normal(runtime, address, value) {
        const members = runtime.members;
        address = ((((address) & (65535))) >>> 0);
        value = ((((value) & (255))) >>> 0);
        (__deref_write_8_normal(runtime, members.m_program).write_byte?.(address, value) ?? 0);
    }
    function __deref_write_8_normal(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_read_16_normal(runtime, address) {
        const members = runtime.members;
        return ((((method_read_8_normal(runtime, address)) | (((method_read_8_normal(runtime, ((address) + (1)))) << (8))))) >>> 0);
    }
    function method_read_8_normal(runtime, address) {
        const members = runtime.members;
        address = ((((address) & (65535))) >>> 0);
        return (((__deref_read_8_normal(runtime, members.m_program).read_byte?.(address) ?? 0)) >>> 0);
    }
    function __deref_read_8_normal(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_EA_DP(runtime) {
        const members = runtime.members;
        return ((method_read_8_immediate(runtime, method_EA_IMM(runtime))) >>> 0);
    }
    function method_read_8_direct(runtime, address) {
        const members = runtime.members;
        address = ((((((address) & (255))) | ((members.m_flag_p ?? 0)))) >>> 0);
        return (((__deref_read_8_direct(runtime, members.m_program).read_byte?.(address) ?? 0)) >>> 0);
    }
    function __deref_read_8_direct(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_write_8_direct(runtime, address, value) {
        const members = runtime.members;
        address = ((((((address) & (255))) | ((members.m_flag_p ?? 0)))) >>> 0);
        value = ((((value) & (255))) >>> 0);
        (__deref_write_8_direct(runtime, members.m_program).write_byte?.(address, value) ?? 0);
    }
    function __deref_write_8_direct(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_EA_ABS(runtime) {
        const members = runtime.members;
        return ((method_read_16_immediate(runtime, method_EA_IMM16(runtime))) >>> 0);
    }
    function method_read_16_immediate(runtime, address) {
        const members = runtime.members;
        return ((((method_read_8_immediate(runtime, address)) | (((method_read_8_immediate(runtime, ((address) + (1)))) << (8))))) >>> 0);
    }
    function method_EA_IMM16(runtime) {
        const members = runtime.members;
        members.m_pc = ((((members.m_pc) + (2))) >>> 0);
        return (((((members.m_pc ?? 0)) - (2))) >>> 0);
    }
    function method_EA_DXI(runtime) {
        const members = runtime.members;
        return ((method_read_16_direct(runtime, method_EA_DPX(runtime))) >>> 0);
    }
    function method_read_16_direct(runtime, address) {
        const members = runtime.members;
        return ((((method_read_8_direct(runtime, address)) | (((method_read_8_direct(runtime, ((address) + (1)))) << (8))))) >>> 0);
    }
    function method_EA_DPX(runtime) {
        const members = runtime.members;
        return ((((((method_EA_DP(runtime)) + ((members.m_x ?? 0)))) & (255))) >>> 0);
    }
    function method_EA_ABX(runtime) {
        const members = runtime.members;
        return ((((method_EA_ABS(runtime)) + ((members.m_x ?? 0)))) >>> 0);
    }
    function method_EA_ABY(runtime) {
        const members = runtime.members;
        return ((((method_EA_ABS(runtime)) + ((members.m_y ?? 0)))) >>> 0);
    }
    function method_EA_DIY(runtime) {
        const members = runtime.members;
        let addr = ((method_read_16_direct(runtime, method_EA_DP(runtime))) >>> 0);
        return ((((addr) + ((members.m_y ?? 0)))) >>> 0);
    }
    function method_write_16_direct(runtime, address, value) {
        const members = runtime.members;
        method_write_8_direct(runtime, address, value);
        method_write_8_direct(runtime, ((address) + (1)), ((value) >>> (8)));
    }
    function method_EA_AXI(runtime) {
        const members = runtime.members;
        return ((method_read_16_normal(runtime, method_EA_ABX(runtime))) >>> 0);
    }
    function method_PULL_16(runtime) {
        const members = runtime.members;
        let value = ((method_PULL_8(runtime)) >>> 0);
        return ((((value) | (((method_PULL_8(runtime)) << (8))))) >>> 0);
    }
    function method_PULL_8(runtime) {
        const members = runtime.members;
        members.m_s = (((((((members.m_s ?? 0)) + (1))) & (255))) >>> 0);
        return ((method_read_8_normal(runtime, (((members.m_s ?? 0)) + (256)))) >>> 0);
    }
    function method_SET_REG_YA(runtime, value) {
        const members = runtime.members;
        members.m_a = ((((value) & (255))) >>> 0);
        members.m_y = ((((((value) >>> (8))) & (255))) >>> 0);
    }
    function method_SET_REG_P(runtime, value) {
        const members = runtime.members;
        members.m_flag_n = ((((value) & (128))) >>> 0);
        members.m_flag_z = ((((((value) & (2))) ? 0 : 1)) >>> 0);
        members.m_flag_v = ((((value) << (1))) >>> 0);
        members.m_flag_p = ((((((value) & (32))) << (3))) >>> 0);
        members.m_flag_b = ((((value) & (16))) >>> 0);
        members.m_flag_h = ((((value) & (8))) >>> 0);
        members.m_flag_c = ((((value) << (8))) >>> 0);
        method_SET_FLAG_I(runtime, value);
    }
    function method_EA_XII(runtime) {
        const members = runtime.members;
        let val = (((members.m_x ?? 0)) >>> 0);
        members.m_x = (((((((members.m_x ?? 0)) + (1))) & (255))) >>> 0);
        return ((val) >>> 0);
    }
    function method_EA_DPY(runtime) {
        const members = runtime.members;
        return ((((((method_EA_DP(runtime)) + ((members.m_y ?? 0)))) & (255))) >>> 0);
    }
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((2) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((8) >>> 0);
    }
    function method_execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method_spc700_device__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((2) >>> 0);
    }
    function method_spc700_device__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((8) >>> 0);
    }
    function method_spc700_device__execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method_io_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_dsp_io_r_cb"], __L1 = __l["machine"], __L2 = __l["machine().side_effects_disabled"];
        const h_m_port_in = members.m_port_in ?? 0;
        const h_m_counter_reg = members.m_counter_reg ?? 0;
        switch (offset) {
            case 0:
                {
                    return ((0) & 0xff);
                }
            case 1:
                {
                    return ((0) & 0xff);
                }
            case 2:
            case 3:
                {
                    return (((__L0 ? __L0(Number(((offset) - (2)))) : typeof members.m_dsp_io_r_cb === 'function' ? members.m_dsp_io_r_cb(((offset) - (2))) : runtime.invoke("m_dsp_io_r_cb", ((offset) - (2))))) & 0xff);
                }
            case 4:
            case 5:
            case 6:
            case 7:
                {
                    return ((h_m_port_in[((offset) - (4))]) & 0xff);
                }
            case 8:
            case 9:
                {
                    return ((method_data_read_byte(runtime, ((240) + (offset)))) & 0xff);
                }
            case 10:
            case 11:
            case 12:
                {
                    break;
                }
            case 13:
            case 14:
            case 15:
                {
                    let value = ((((h_m_counter_reg[((offset) - (13))]) & (15))) & 0xff);
                    if (((((__L2 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        h_m_counter_reg[((offset) - (13))] = 0;
                    }
                    return ((value) & 0xff);
                }
        }
        return ((0) & 0xff);
    }
    function method_data_read_byte(runtime, a) {
        const members = runtime.members;
        const h_m_ipl_region = members.m_ipl_region ?? 0;
        if (((((((a) >= (65472)) ? 1 : 0)) && ((((members.m_ctrl ?? 0)) & (128)))) ? 1 : 0)) {
            return ((runtime.readIndex(h_m_ipl_region, ((a) & (63)))) & 0xff);
        }
        return (((__deref_data_read_byte(runtime, members.m_dcache).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_data_read_byte(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_io_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_dsp_io_w_cb"];
        data = ((data) & 0xff);
        const h_m_timer_enabled = members.m_timer_enabled ?? 0;
        const h_m_subcounter = members.m_subcounter ?? 0;
        const h_m_counter = members.m_counter ?? 0;
        const h_m_counter_reg = members.m_counter_reg ?? 0;
        const h_m_port_in = members.m_port_in ?? 0;
        const h_m_port_out = members.m_port_out ?? 0;
        const h_m_TnDIV = members.m_TnDIV ?? 0;
        switch (offset) {
            case 0:
                {
                    members.m_test = ((data) & 0xff);
                    0;
                    break;
                }
            case 1:
                {
                    members.m_ctrl = ((data) & 0xff);
                    for (let i = ((0) | 0); (((i) < (3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if (((((((data) >>> (i)) & 1)) && (((Number(h_m_timer_enabled[i]) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                            h_m_subcounter[i] = 0;
                            h_m_counter[i] = 0;
                            h_m_counter_reg[i] = 0;
                        }
                        h_m_timer_enabled[i] = (((data) >>> (i)) & 1);
                    }
                    if ((((data) >>> (4)) & 1)) {
                        h_m_port_in[0] = 0;
                        h_m_port_in[1] = 0;
                    }
                    if ((((data) >>> (5)) & 1)) {
                        h_m_port_in[2] = 0;
                        h_m_port_in[3] = 0;
                    }
                    break;
                }
            case 2:
            case 3:
                {
                    (__L0 ? __L0(Number(((offset) - (2))), Number(data)) : typeof members.m_dsp_io_w_cb === 'function' ? members.m_dsp_io_w_cb(((offset) - (2)), data) : runtime.invoke("m_dsp_io_w_cb", ((offset) - (2)), data));
                    break;
                }
            case 4:
            case 5:
            case 6:
            case 7:
                {
                    h_m_port_out[((offset) - (4))] = data;
                    break;
                }
            case 10:
            case 11:
            case 12:
                {
                    if ((((data) === (0)) ? 1 : 0)) {
                        h_m_TnDIV[((offset) - (10))] = 256;
                    }
                    else {
                        h_m_TnDIV[((offset) - (10))] = data;
                    }
                    break;
                }
            case 13:
            case 14:
            case 15:
                {
                    return;
                }
        }
        method_data_write_byte(runtime, ((240) + (offset)), data);
    }
    function method_data_write_byte(runtime, a, d) {
        const members = runtime.members;
        d = ((d) & 0xff);
        (__deref_data_write_byte(runtime, members.m_data).write_byte?.(a, d) ?? 0);
    }
    function __deref_data_write_byte(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_spc_port_out_r(runtime, offset) {
        const members = runtime.members;
        const h_m_port_out = members.m_port_out ?? 0;
        return ((h_m_port_out[offset]) & 0xff);
    }
    function method_spc_port_in_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_port_in = members.m_port_in ?? 0;
        h_m_port_in[offset] = data;
    }
    function method_update_timers(runtime, param) {
        const members = runtime.members;
        for (let ch = ((0) | 0); (((ch) < (3)) ? 1 : 0); ch = ((((ch) + (1))) | 0)) {
            method_update_timer_tick(runtime, ch);
        }
    }
    function method_update_timer_tick(runtime, which) {
        const members = runtime.members;
        which = ((which) & 0xff);
        const h_m_timer_enabled = members.m_timer_enabled ?? 0;
        const h_m_subcounter = members.m_subcounter ?? 0;
        const h_m_counter = members.m_counter ?? 0;
        const h_m_TnDIV = members.m_TnDIV ?? 0;
        const h_m_counter_reg = members.m_counter_reg ?? 0;
        if (((Number(h_m_timer_enabled[which]) === Number(0)) ? 1 : 0)) {
            return;
        }
        h_m_subcounter[which] = ((h_m_subcounter[which]) + (1));
        if (((((((h_m_subcounter[which]) >= (8)) ? 1 : 0)) || ((((which) === (2)) ? 1 : 0))) ? 1 : 0)) {
            h_m_subcounter[which] = 0;
            h_m_counter[which] = ((h_m_counter[which]) + (1));
            if ((((h_m_counter[which]) >= (h_m_TnDIV[which])) ? 1 : 0)) {
                h_m_counter[which] = 0;
                h_m_counter_reg[which] = ((h_m_counter_reg[which]) + (1));
                h_m_counter_reg[which] = ((h_m_counter_reg[which]) & (15));
            }
        }
    }
    function method_dsp_io_read_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_dsp_io_read_callback(runtime, members.m_dsp_io_r_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_dsp_io_r_cb, "bind"));
    }
    function __deref_dsp_io_read_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dsp_io_write_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_dsp_io_write_callback(runtime, members.m_dsp_io_w_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_dsp_io_w_cb, "bind"));
    }
    function __deref_dsp_io_write_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_s_smp_device__dsp_io_read_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_s_smp_device__dsp_io_read_callback(runtime, members.m_dsp_io_r_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_dsp_io_r_cb, "bind"));
    }
    function __deref_s_smp_device__dsp_io_read_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_s_smp_device__dsp_io_write_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_s_smp_device__dsp_io_write_callback(runtime, members.m_dsp_io_w_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_dsp_io_w_cb, "bind"));
    }
    function __deref_s_smp_device__dsp_io_write_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        return (members.m_pc ?? 0);
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        members.m_pc = ((value) >>> 0);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        return (members.m_s ?? 0);
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        members.m_s = ((value) >>> 0);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        return (members.m_debugger_temp ?? 0);
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        members.m_debugger_temp = ((value) >>> 0);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        return (members.m_a ?? 0);
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        members.m_a = ((value) >>> 0);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        return (members.m_x ?? 0);
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        members.m_x = ((value) >>> 0);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        return (members.m_y ?? 0);
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        members.m_y = ((value) >>> 0);
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        return (members.m_pc ?? 0);
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        members.m_pc = ((value) >>> 0);
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        return (members.m_ppc ?? 0);
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        members.m_ppc = ((value) >>> 0);
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        return (members.m_debugger_temp ?? 0);
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        members.m_debugger_temp = ((value) >>> 0);
    }
    function method_internal_map__lambda0(runtime, offset) {
        const members = runtime.members;
        return method_data_read_byte(runtime, offset);
    }
    function method_internal_map__lambda1(runtime, offset, data) {
        const members = runtime.members;
        method_data_write_byte(runtime, offset, data);
    }
    function method_internal_map__lambda2(runtime, offset) {
        const members = runtime.members;
        return method_data_read_byte(runtime, __add_internal_map__lambda2(runtime, offset, 256));
    }
    function __add_internal_map__lambda2(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_internal_map__lambda3(runtime, offset, data) {
        const members = runtime.members;
        method_data_write_byte(runtime, __add_internal_map__lambda3(runtime, offset, 256), data);
    }
    function __add_internal_map__lambda3(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "EA_IMM": method_EA_IMM,
        "EA_XI": method_EA_XI,
        "EA_YI": method_EA_YI,
        "JUMP": method_JUMP,
        "BRANCH": method_BRANCH,
        "SET_FLAG_I": method_SET_FLAG_I,
        "state_export": method_state_export,
        "execute_set_input": method_execute_set_input,
        "execute_run": method_execute_run,
        "read_8_immediate": method_read_8_immediate,
        "PUSH_16": method_PUSH_16,
        "PUSH_8": method_PUSH_8,
        "write_8_normal": method_write_8_normal,
        "read_16_normal": method_read_16_normal,
        "read_8_normal": method_read_8_normal,
        "EA_DP": method_EA_DP,
        "read_8_direct": method_read_8_direct,
        "write_8_direct": method_write_8_direct,
        "EA_ABS": method_EA_ABS,
        "read_16_immediate": method_read_16_immediate,
        "EA_IMM16": method_EA_IMM16,
        "EA_DXI": method_EA_DXI,
        "read_16_direct": method_read_16_direct,
        "EA_DPX": method_EA_DPX,
        "EA_ABX": method_EA_ABX,
        "EA_ABY": method_EA_ABY,
        "EA_DIY": method_EA_DIY,
        "write_16_direct": method_write_16_direct,
        "EA_AXI": method_EA_AXI,
        "PULL_16": method_PULL_16,
        "PULL_8": method_PULL_8,
        "SET_REG_YA": method_SET_REG_YA,
        "SET_REG_P": method_SET_REG_P,
        "EA_XII": method_EA_XII,
        "EA_DPY": method_EA_DPY,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "execute_input_edge_triggered": method_execute_input_edge_triggered,
        "spc700_device::execute_min_cycles": method_spc700_device__execute_min_cycles,
        "spc700_device::execute_max_cycles": method_spc700_device__execute_max_cycles,
        "spc700_device::execute_input_edge_triggered": method_spc700_device__execute_input_edge_triggered,
        "io_r": method_io_r,
        "data_read_byte": method_data_read_byte,
        "io_w": method_io_w,
        "data_write_byte": method_data_write_byte,
        "spc_port_out_r": method_spc_port_out_r,
        "spc_port_in_w": method_spc_port_in_w,
        "update_timers": method_update_timers,
        "update_timer_tick": method_update_timer_tick,
        "dsp_io_read_callback": method_dsp_io_read_callback,
        "dsp_io_write_callback": method_dsp_io_write_callback,
        "s_smp_device::dsp_io_read_callback": method_s_smp_device__dsp_io_read_callback,
        "s_smp_device::dsp_io_write_callback": method_s_smp_device__dsp_io_write_callback,
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
        "internal_map__lambda0": method_internal_map__lambda0,
        "internal_map__lambda1": method_internal_map__lambda1,
        "internal_map__lambda2": method_internal_map__lambda2,
        "internal_map__lambda3": method_internal_map__lambda3
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_dsp_io_r_cb", "m_dsp_io_w_cb", "machine", "machine().side_effects_disabled"];
export const device = definition;
export default device;
