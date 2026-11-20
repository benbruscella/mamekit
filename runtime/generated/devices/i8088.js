import deviceData from './i8088.device.ir.json' with { type: 'json' };
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
        let __t0;
        const h_m_sregs = members.m_sregs ?? 0;
        switch ((__t0 = __deref_state_import(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case 1:
            case 20:
                {
                    members.m_pc = ((((((h_m_sregs[1]) << (4))) + ((members.m_ip ?? 0)))) >>> 0);
                    break;
                }
            case -1:
                {
                    if (((Number((((members.m_pc ?? 0)) - (((h_m_sregs[1]) << (4))))) > Number(65535)) ? 1 : 0)) {
                        h_m_sregs[1] = (((members.m_pc ?? 0)) >>> (4));
                    }
                    members.m_ip = (((((members.m_pc ?? 0)) - (((h_m_sregs[1]) << (4))))) & 0xffff);
                    members.m_prev_ip = (((members.m_ip ?? 0)) & 0xffff);
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
    function method_i8086_common_cpu_device__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["space"], __L1 = __l["has_space"], __L2 = __l["NAME"], __L3 = __l["save_item"];
        let __t0;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_sregs = members.m_sregs ?? 0;
        members.m_program = (__L0 ? __L0(0) : runtime.macro("space", 0));
        members.m_opcodes = (((__L1 ? __L1(3) : runtime.macro("has_space", 3))) ? ((__L0 ? __L0(3) : runtime.macro("space", 3))) : ((members.m_program ?? 0)));
        if (((Number((__t0 = __deref_i8086_common_cpu_device__device_start(runtime, members.m_opcodes), typeof __t0.data_width === 'function' ? __t0.data_width() : typeof __t0.data_width === 'number' || typeof __t0.data_width === 'boolean' ? __t0.data_width : runtime.container(members.m_opcodes, "data_width"))) === Number(8)) ? 1 : 0)) {
            members.m_cache8 = (members.m_opcodes ?? 0);
            members.m_or8 = ((address) => {
                return (__deref_i8086_common_cpu_device__device_start(runtime, members.m_cache8).read_byte?.(address) ?? 0);
            });
        }
        else {
            members.m_cache16 = (members.m_opcodes ?? 0);
            members.m_or8 = ((address) => {
                return (__deref_i8086_common_cpu_device__device_start(runtime, members.m_cache16).read_byte?.(address) ?? 0);
            });
        }
        members.m_io = (__L0 ? __L0(2) : runtime.macro("space", 2));
        (__L3 ? __L3((__L2 ? __L2(h_m_regs.w) : runtime.macro("NAME", h_m_regs.w))) : runtime.macro("save_item", (__L2 ? __L2(h_m_regs.w) : runtime.macro("NAME", h_m_regs.w))));
        (__L3 ? __L3((__L2 ? __L2(h_m_sregs) : runtime.macro("NAME", h_m_sregs))) : runtime.macro("save_item", (__L2 ? __L2(h_m_sregs) : runtime.macro("NAME", h_m_sregs))));
        (__L3 ? __L3((__L2 ? __L2((members.m_ip ?? 0)) : runtime.macro("NAME", (members.m_ip ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_ip ?? 0)) : runtime.macro("NAME", (members.m_ip ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_prev_ip ?? 0)) : runtime.macro("NAME", (members.m_prev_ip ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_prev_ip ?? 0)) : runtime.macro("NAME", (members.m_prev_ip ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_io_stall ?? 0)) : runtime.macro("NAME", (members.m_io_stall ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_io_stall ?? 0)) : runtime.macro("NAME", (members.m_io_stall ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_TF ?? 0)) : runtime.macro("NAME", (members.m_TF ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_TF ?? 0)) : runtime.macro("NAME", (members.m_TF ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_IF ?? 0)) : runtime.macro("NAME", (members.m_IF ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_IF ?? 0)) : runtime.macro("NAME", (members.m_IF ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_DF ?? 0)) : runtime.macro("NAME", (members.m_DF ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_DF ?? 0)) : runtime.macro("NAME", (members.m_DF ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_MF ?? 0)) : runtime.macro("NAME", (members.m_MF ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_MF ?? 0)) : runtime.macro("NAME", (members.m_MF ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_NT ?? 0)) : runtime.macro("NAME", (members.m_NT ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_NT ?? 0)) : runtime.macro("NAME", (members.m_NT ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_IOPL ?? 0)) : runtime.macro("NAME", (members.m_IOPL ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_IOPL ?? 0)) : runtime.macro("NAME", (members.m_IOPL ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_SignVal ?? 0)) : runtime.macro("NAME", (members.m_SignVal ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_SignVal ?? 0)) : runtime.macro("NAME", (members.m_SignVal ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_int_vector ?? 0)) : runtime.macro("NAME", (members.m_int_vector ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_int_vector ?? 0)) : runtime.macro("NAME", (members.m_int_vector ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_pending_irq ?? 0)) : runtime.macro("NAME", (members.m_pending_irq ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_pending_irq ?? 0)) : runtime.macro("NAME", (members.m_pending_irq ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_nmi_state ?? 0)) : runtime.macro("NAME", (members.m_nmi_state ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_nmi_state ?? 0)) : runtime.macro("NAME", (members.m_nmi_state ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_AuxVal ?? 0)) : runtime.macro("NAME", (members.m_AuxVal ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_AuxVal ?? 0)) : runtime.macro("NAME", (members.m_AuxVal ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_OverVal ?? 0)) : runtime.macro("NAME", (members.m_OverVal ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_OverVal ?? 0)) : runtime.macro("NAME", (members.m_OverVal ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_ZeroVal ?? 0)) : runtime.macro("NAME", (members.m_ZeroVal ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_ZeroVal ?? 0)) : runtime.macro("NAME", (members.m_ZeroVal ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_CarryVal ?? 0)) : runtime.macro("NAME", (members.m_CarryVal ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_CarryVal ?? 0)) : runtime.macro("NAME", (members.m_CarryVal ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_ParityVal ?? 0)) : runtime.macro("NAME", (members.m_ParityVal ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_ParityVal ?? 0)) : runtime.macro("NAME", (members.m_ParityVal ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_seg_prefix ?? 0)) : runtime.macro("NAME", (members.m_seg_prefix ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_seg_prefix ?? 0)) : runtime.macro("NAME", (members.m_seg_prefix ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_seg_prefix_next ?? 0)) : runtime.macro("NAME", (members.m_seg_prefix_next ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_seg_prefix_next ?? 0)) : runtime.macro("NAME", (members.m_seg_prefix_next ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_prefix_seg ?? 0)) : runtime.macro("NAME", (members.m_prefix_seg ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_prefix_seg ?? 0)) : runtime.macro("NAME", (members.m_prefix_seg ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_halt ?? 0)) : runtime.macro("NAME", (members.m_halt ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_halt ?? 0)) : runtime.macro("NAME", (members.m_halt ?? 0)))));
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* state_add(...)...: no effect */
        /* set_icountptr: no effect */
    }
    function __deref_i8086_common_cpu_device__device_start(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["total_cycles"];
        if (((Number(inptnum) === Number(-1)) ? 1 : 0)) {
            if ((((((((((members.m_nmi_state ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) && ((__L0 ? __L0() : runtime.macro("total_cycles")))) ? 1 : 0)) {
                members.m_pending_irq = ((((members.m_pending_irq) | (2))) >>> 0);
            }
            members.m_nmi_state = ((state) >>> 0);
        }
        else {
            if (((Number(inptnum) === Number(20)) ? 1 : 0)) {
                members.m_test_state = ((state) & 0xff);
            }
            else {
                if (((Number(state) === Number(0)) ? 1 : 0)) {
                    members.m_pending_irq = ((((members.m_pending_irq) & (-2))) >>> 0);
                }
                else {
                    members.m_pending_irq = ((((members.m_pending_irq) | (1))) >>> 0);
                }
            }
        }
    }
    function method_get_mode(runtime) {
        const members = runtime.members;
        return ((1) | 0);
    }
    function method_read_byte(runtime, addr) {
        const members = runtime.members;
        return (((__deref_read_byte(runtime, method_sreg_to_space(runtime, (members.m_easeg ?? 0))).read_byte?.(addr) ?? 0)) & 0xff);
    }
    function __deref_read_byte(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_sreg_to_space(runtime, sreg) {
        const members = runtime.members;
        switch (sreg) {
            default:
                {
                    return (members.m_program ?? 0);
                }
            case 1:
                {
                    return (members.m_code ?? 0);
                }
            case 2:
                {
                    return (members.m_stack ?? 0);
                }
            case 0:
                {
                    return (members.m_extra ?? 0);
                }
        }
    }
    function method_read_word(runtime, addr) {
        const members = runtime.members;
        return (((__deref_read_word(runtime, method_sreg_to_space(runtime, (members.m_easeg ?? 0))).read_word_unaligned?.(addr) ?? 0)) & 0xffff);
    }
    function __deref_read_word(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_read_port_byte(runtime, port) {
        const members = runtime.members;
        port = ((port) & 0xffff);
        return (((__deref_read_port_byte(runtime, members.m_io).read_byte?.(port) ?? 0)) & 0xff);
    }
    function __deref_read_port_byte(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_read_port_word(runtime, port) {
        const members = runtime.members;
        port = ((port) & 0xffff);
        return (((__deref_read_port_word(runtime, members.m_io).read_word_unaligned?.(port) ?? 0)) & 0xffff);
    }
    function __deref_read_port_word(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_write_port_byte_al(runtime, port) {
        const members = runtime.members;
        port = ((port) & 0xffff);
        const h_m_regs = members.m_regs ?? 0;
        if (((port) & (1))) {
            (__deref_write_port_byte_al(runtime, members.m_io).write_word?.(((port) - (1)), method_swapendian_int16(runtime, runtime.readIndex(h_m_regs.w, 0)), 65280) ?? 0);
        }
        else {
            (__deref_write_port_byte_al(runtime, members.m_io).write_word?.(port, runtime.readIndex(h_m_regs.w, 0), 255) ?? 0);
        }
    }
    function __deref_write_port_byte_al(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_swapendian_int16(runtime, val) {
        const members = runtime.members;
        val = ((val) & 0xffff);
        return ((((((val) << (8))) | (((val) >>> (8))))) & 0xffff);
    }
    function method_common_op(runtime, op) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_lock_handler"], __L1 = __l["access_to_be_redone"];
        op = ((op) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_sregs = members.m_sregs ?? 0;
        const h_m_parity_table = members.m_parity_table ?? 0;
        switch (op) {
            case 0:
                {
                    method_DEF_br8(runtime);
                    method_set_CFB(runtime, method_ADDB(runtime));
                    method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 88);
                    break;
                }
            case 1:
                {
                    method_DEF_wr16(runtime);
                    method_set_CFW(runtime, method_ADDX(runtime));
                    method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 94);
                    break;
                }
            case 2:
                {
                    method_DEF_r8b(runtime);
                    method_set_CFB(runtime, method_ADDB(runtime));
                    method_RegByte__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 3:
                {
                    method_DEF_r16w(runtime);
                    method_set_CFW(runtime, method_ADDX(runtime));
                    method_RegWord__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 4:
                {
                    method_DEF_ald8(runtime);
                    method_set_CFB(runtime, method_ADDB(runtime));
                    runtime.writeIndex(h_m_regs.b, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 89);
                    break;
                }
            case 5:
                {
                    method_DEF_axd16(runtime);
                    method_set_CFW(runtime, method_ADDX(runtime));
                    runtime.writeIndex(h_m_regs.w, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 95);
                    break;
                }
            case 6:
                {
                    method_PUSH(runtime, h_m_sregs[0]);
                    method_CLK(runtime, 80);
                    break;
                }
            case 7:
                {
                    h_m_sregs[0] = method_POP(runtime);
                    method_CLK(runtime, 84);
                    break;
                }
            case 8:
                {
                    method_DEF_br8(runtime);
                    method_ORB(runtime);
                    method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 88);
                    break;
                }
            case 9:
                {
                    method_DEF_wr16(runtime);
                    method_ORW(runtime);
                    method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 94);
                    break;
                }
            case 10:
                {
                    method_DEF_r8b(runtime);
                    method_ORB(runtime);
                    method_RegByte__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 11:
                {
                    method_DEF_r16w(runtime);
                    method_ORW(runtime);
                    method_RegWord__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 12:
                {
                    method_DEF_ald8(runtime);
                    method_ORB(runtime);
                    runtime.writeIndex(h_m_regs.b, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 89);
                    break;
                }
            case 13:
                {
                    method_DEF_axd16(runtime);
                    method_ORW(runtime);
                    runtime.writeIndex(h_m_regs.w, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 95);
                    break;
                }
            case 14:
                {
                    method_PUSH(runtime, h_m_sregs[1]);
                    method_CLK(runtime, 80);
                    break;
                }
            case 16:
                {
                    method_DEF_br8(runtime);
                    let tmpcf = ((method_ADDB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                    method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                    method_set_CFB(runtime, tmpcf);
                    method_CLKM(runtime, 86, 88);
                    break;
                }
            case 17:
                {
                    method_DEF_wr16(runtime);
                    let tmpcf__1 = ((method_ADDX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                    method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                    method_set_CFW(runtime, tmpcf__1);
                    method_CLKM(runtime, 92, 94);
                    break;
                }
            case 18:
                {
                    method_DEF_r8b(runtime);
                    method_set_CFB(runtime, method_ADDB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))));
                    method_RegByte__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 19:
                {
                    method_DEF_r16w(runtime);
                    method_set_CFW(runtime, method_ADDX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))));
                    method_RegWord__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 20:
                {
                    method_DEF_ald8(runtime);
                    method_set_CFB(runtime, method_ADDB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))));
                    runtime.writeIndex(h_m_regs.b, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 89);
                    break;
                }
            case 21:
                {
                    method_DEF_axd16(runtime);
                    method_set_CFW(runtime, method_ADDX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))));
                    runtime.writeIndex(h_m_regs.w, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 95);
                    break;
                }
            case 22:
                {
                    method_PUSH(runtime, h_m_sregs[2]);
                    method_CLK(runtime, 80);
                    break;
                }
            case 23:
                {
                    h_m_sregs[2] = method_POP(runtime);
                    method_CLK(runtime, 84);
                    members.m_no_interrupt = ((1) & 0xff);
                    break;
                }
            case 24:
                {
                    method_DEF_br8(runtime);
                    let tmpcf__2 = ((method_SUBB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                    method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                    method_set_CFB(runtime, tmpcf__2);
                    method_CLKM(runtime, 86, 88);
                    break;
                }
            case 25:
                {
                    method_DEF_wr16(runtime);
                    let tmpcf__3 = ((method_SUBX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                    method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                    method_set_CFW(runtime, tmpcf__3);
                    method_CLKM(runtime, 92, 94);
                    break;
                }
            case 26:
                {
                    method_DEF_r8b(runtime);
                    method_set_CFB(runtime, method_SUBB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))));
                    method_RegByte__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 27:
                {
                    method_DEF_r16w(runtime);
                    method_set_CFW(runtime, method_SUBX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))));
                    method_RegWord__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 28:
                {
                    method_DEF_ald8(runtime);
                    method_set_CFB(runtime, method_SUBB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))));
                    runtime.writeIndex(h_m_regs.b, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 89);
                    break;
                }
            case 29:
                {
                    method_DEF_axd16(runtime);
                    method_set_CFW(runtime, method_SUBX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))));
                    runtime.writeIndex(h_m_regs.w, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 95);
                    break;
                }
            case 30:
                {
                    method_PUSH(runtime, h_m_sregs[3]);
                    method_CLK(runtime, 80);
                    break;
                }
            case 31:
                {
                    h_m_sregs[3] = method_POP(runtime);
                    method_CLK(runtime, 84);
                    break;
                }
            case 32:
                {
                    method_DEF_br8(runtime);
                    method_ANDB(runtime);
                    method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 88);
                    break;
                }
            case 33:
                {
                    method_DEF_wr16(runtime);
                    method_ANDX(runtime);
                    method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 94);
                    break;
                }
            case 34:
                {
                    method_DEF_r8b(runtime);
                    method_ANDB(runtime);
                    method_RegByte__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 35:
                {
                    method_DEF_r16w(runtime);
                    method_ANDX(runtime);
                    method_RegWord__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 36:
                {
                    method_DEF_ald8(runtime);
                    method_ANDB(runtime);
                    runtime.writeIndex(h_m_regs.b, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 89);
                    break;
                }
            case 37:
                {
                    method_DEF_axd16(runtime);
                    method_ANDX(runtime);
                    runtime.writeIndex(h_m_regs.w, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 95);
                    break;
                }
            case 38:
                {
                    members.m_seg_prefix_next = ((1) ? 1 : 0);
                    members.m_prefix_seg = ((0) >>> 0);
                    method_CLK(runtime, 6);
                    break;
                }
            case 39:
                {
                    method_ADJ4(runtime, 6, 96);
                    method_CLK(runtime, 14);
                    break;
                }
            case 40:
                {
                    method_DEF_br8(runtime);
                    method_set_CFB(runtime, method_SUBB(runtime));
                    method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 88);
                    break;
                }
            case 41:
                {
                    method_DEF_wr16(runtime);
                    method_set_CFW(runtime, method_SUBX(runtime));
                    method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 94);
                    break;
                }
            case 42:
                {
                    method_DEF_r8b(runtime);
                    method_set_CFB(runtime, method_SUBB(runtime));
                    method_RegByte__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 43:
                {
                    method_DEF_r16w(runtime);
                    method_set_CFW(runtime, method_SUBX(runtime));
                    method_RegWord__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 44:
                {
                    method_DEF_ald8(runtime);
                    method_set_CFB(runtime, method_SUBB(runtime));
                    runtime.writeIndex(h_m_regs.b, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 89);
                    break;
                }
            case 45:
                {
                    method_DEF_axd16(runtime);
                    method_set_CFW(runtime, method_SUBX(runtime));
                    runtime.writeIndex(h_m_regs.w, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 95);
                    break;
                }
            case 46:
                {
                    members.m_seg_prefix_next = ((1) ? 1 : 0);
                    members.m_prefix_seg = ((1) >>> 0);
                    method_CLK(runtime, 6);
                    break;
                }
            case 47:
                {
                    method_ADJ4(runtime, -6, -96);
                    method_CLK(runtime, 15);
                    break;
                }
            case 48:
                {
                    method_DEF_br8(runtime);
                    method_XORB(runtime);
                    method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 88);
                    break;
                }
            case 49:
                {
                    method_DEF_wr16(runtime);
                    method_XORW(runtime);
                    method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 50:
                {
                    method_DEF_r8b(runtime);
                    method_XORB(runtime);
                    method_RegByte__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 51:
                {
                    method_DEF_r16w(runtime);
                    method_XORW(runtime);
                    method_RegWord__1(runtime, (members.m_dst ?? 0));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 52:
                {
                    method_DEF_ald8(runtime);
                    method_XORB(runtime);
                    runtime.writeIndex(h_m_regs.b, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 89);
                    break;
                }
            case 53:
                {
                    method_DEF_axd16(runtime);
                    method_XORW(runtime);
                    runtime.writeIndex(h_m_regs.w, 0, (members.m_dst ?? 0));
                    method_CLK(runtime, 95);
                    break;
                }
            case 54:
                {
                    members.m_seg_prefix_next = ((1) ? 1 : 0);
                    members.m_prefix_seg = ((2) >>> 0);
                    method_CLK(runtime, 6);
                    break;
                }
            case 55:
                {
                    method_ADJB(runtime, 6, ((((Number(runtime.readIndex(h_m_regs.b, 0)) > Number(249)) ? 1 : 0)) ? (2) : (1)));
                    method_CLK(runtime, 10);
                    break;
                }
            case 56:
                {
                    method_DEF_br8(runtime);
                    method_set_CFB(runtime, method_SUBB(runtime));
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 57:
                {
                    method_DEF_wr16(runtime);
                    method_set_CFW(runtime, method_SUBX(runtime));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 58:
                {
                    method_DEF_r8b(runtime);
                    method_set_CFB(runtime, method_SUBB(runtime));
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 59:
                {
                    method_DEF_r16w(runtime);
                    method_set_CFW(runtime, method_SUBX(runtime));
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 60:
                {
                    method_DEF_ald8(runtime);
                    method_set_CFB(runtime, method_SUBB(runtime));
                    method_CLK(runtime, 89);
                    break;
                }
            case 61:
                {
                    method_DEF_axd16(runtime);
                    method_set_CFW(runtime, method_SUBX(runtime));
                    method_CLK(runtime, 95);
                    break;
                }
            case 62:
                {
                    members.m_seg_prefix_next = ((1) ? 1 : 0);
                    members.m_prefix_seg = ((3) >>> 0);
                    method_CLK(runtime, 6);
                    break;
                }
            case 63:
                {
                    method_ADJB(runtime, -6, ((((Number(runtime.readIndex(h_m_regs.b, 0)) < Number(6)) ? 1 : 0)) ? (-2) : (-1)));
                    method_CLK(runtime, 11);
                    break;
                }
            case 64:
                {
                    method_IncWordReg(runtime, 0);
                    method_CLK(runtime, 118);
                    break;
                }
            case 65:
                {
                    method_IncWordReg(runtime, 1);
                    method_CLK(runtime, 118);
                    break;
                }
            case 66:
                {
                    method_IncWordReg(runtime, 2);
                    method_CLK(runtime, 118);
                    break;
                }
            case 67:
                {
                    method_IncWordReg(runtime, 3);
                    method_CLK(runtime, 118);
                    break;
                }
            case 68:
                {
                    method_IncWordReg(runtime, 4);
                    method_CLK(runtime, 118);
                    break;
                }
            case 69:
                {
                    method_IncWordReg(runtime, 5);
                    method_CLK(runtime, 118);
                    break;
                }
            case 70:
                {
                    method_IncWordReg(runtime, 6);
                    method_CLK(runtime, 118);
                    break;
                }
            case 71:
                {
                    method_IncWordReg(runtime, 7);
                    method_CLK(runtime, 118);
                    break;
                }
            case 72:
                {
                    method_DecWordReg(runtime, 0);
                    method_CLK(runtime, 118);
                    break;
                }
            case 73:
                {
                    method_DecWordReg(runtime, 1);
                    method_CLK(runtime, 118);
                    break;
                }
            case 74:
                {
                    method_DecWordReg(runtime, 2);
                    method_CLK(runtime, 118);
                    break;
                }
            case 75:
                {
                    method_DecWordReg(runtime, 3);
                    method_CLK(runtime, 118);
                    break;
                }
            case 76:
                {
                    method_DecWordReg(runtime, 4);
                    method_CLK(runtime, 118);
                    break;
                }
            case 77:
                {
                    method_DecWordReg(runtime, 5);
                    method_CLK(runtime, 118);
                    break;
                }
            case 78:
                {
                    method_DecWordReg(runtime, 6);
                    method_CLK(runtime, 118);
                    break;
                }
            case 79:
                {
                    method_DecWordReg(runtime, 7);
                    method_CLK(runtime, 118);
                    break;
                }
            case 80:
                {
                    method_PUSH(runtime, runtime.readIndex(h_m_regs.w, 0));
                    method_CLK(runtime, 78);
                    break;
                }
            case 81:
                {
                    method_PUSH(runtime, runtime.readIndex(h_m_regs.w, 1));
                    method_CLK(runtime, 78);
                    break;
                }
            case 82:
                {
                    method_PUSH(runtime, runtime.readIndex(h_m_regs.w, 2));
                    method_CLK(runtime, 78);
                    break;
                }
            case 83:
                {
                    method_PUSH(runtime, runtime.readIndex(h_m_regs.w, 3));
                    method_CLK(runtime, 78);
                    break;
                }
            case 84:
                {
                    method_PUSH(runtime, ((runtime.readIndex(h_m_regs.w, 4)) - (2)));
                    method_CLK(runtime, 78);
                    break;
                }
            case 85:
                {
                    method_PUSH(runtime, runtime.readIndex(h_m_regs.w, 5));
                    method_CLK(runtime, 78);
                    break;
                }
            case 86:
                {
                    method_PUSH(runtime, runtime.readIndex(h_m_regs.w, 6));
                    method_CLK(runtime, 78);
                    break;
                }
            case 87:
                {
                    method_PUSH(runtime, runtime.readIndex(h_m_regs.w, 7));
                    method_CLK(runtime, 78);
                    break;
                }
            case 88:
                {
                    runtime.writeIndex(h_m_regs.w, 0, method_POP(runtime));
                    method_CLK(runtime, 82);
                    break;
                }
            case 89:
                {
                    runtime.writeIndex(h_m_regs.w, 1, method_POP(runtime));
                    method_CLK(runtime, 82);
                    break;
                }
            case 90:
                {
                    runtime.writeIndex(h_m_regs.w, 2, method_POP(runtime));
                    method_CLK(runtime, 82);
                    break;
                }
            case 91:
                {
                    runtime.writeIndex(h_m_regs.w, 3, method_POP(runtime));
                    method_CLK(runtime, 82);
                    break;
                }
            case 92:
                {
                    runtime.writeIndex(h_m_regs.w, 4, method_POP(runtime));
                    method_CLK(runtime, 82);
                    break;
                }
            case 93:
                {
                    runtime.writeIndex(h_m_regs.w, 5, method_POP(runtime));
                    method_CLK(runtime, 82);
                    break;
                }
            case 94:
                {
                    runtime.writeIndex(h_m_regs.w, 6, method_POP(runtime));
                    method_CLK(runtime, 82);
                    break;
                }
            case 95:
                {
                    runtime.writeIndex(h_m_regs.w, 7, method_POP(runtime));
                    method_CLK(runtime, 82);
                    break;
                }
            case 96:
            case 112:
                {
                    method_JMP(runtime, ((((members.m_OverVal ?? 0)) !== (0)) ? 1 : 0));
                    break;
                }
            case 97:
            case 113:
                {
                    method_JMP(runtime, ((((((members.m_OverVal ?? 0)) !== (0)) ? 1 : 0)) ? 0 : 1));
                    break;
                }
            case 98:
            case 114:
                {
                    method_JMP(runtime, ((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0));
                    break;
                }
            case 99:
            case 115:
                {
                    method_JMP(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? 0 : 1));
                    break;
                }
            case 100:
            case 116:
                {
                    method_JMP(runtime, ((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0));
                    break;
                }
            case 101:
            case 117:
                {
                    method_JMP(runtime, ((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? 0 : 1));
                    break;
                }
            case 102:
            case 118:
                {
                    method_JMP(runtime, (((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) || (((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0));
                    break;
                }
            case 103:
            case 119:
                {
                    method_JMP(runtime, (((((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) || (((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1));
                    break;
                }
            case 104:
            case 120:
                {
                    method_JMP(runtime, ((((members.m_SignVal ?? 0)) < (0)) ? 1 : 0));
                    break;
                }
            case 105:
            case 121:
                {
                    method_JMP(runtime, ((((((members.m_SignVal ?? 0)) < (0)) ? 1 : 0)) ? 0 : 1));
                    break;
                }
            case 106:
            case 122:
                {
                    method_JMP(runtime, h_m_parity_table[(((members.m_ParityVal ?? 0)) & 0xff)]);
                    break;
                }
            case 107:
            case 123:
                {
                    method_JMP(runtime, ((h_m_parity_table[(((members.m_ParityVal ?? 0)) & 0xff)]) ? 0 : 1));
                    break;
                }
            case 108:
            case 124:
                {
                    method_JMP(runtime, (((((Number(((((members.m_SignVal ?? 0)) < (0)) ? 1 : 0)) !== Number(((((members.m_OverVal ?? 0)) !== (0)) ? 1 : 0))) ? 1 : 0)) && (((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0));
                    break;
                }
            case 109:
            case 125:
                {
                    method_JMP(runtime, ((Number(((((members.m_SignVal ?? 0)) < (0)) ? 1 : 0)) === Number(((((members.m_OverVal ?? 0)) !== (0)) ? 1 : 0))) ? 1 : 0));
                    break;
                }
            case 110:
            case 126:
                {
                    method_JMP(runtime, (((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) || (((Number(((((members.m_SignVal ?? 0)) < (0)) ? 1 : 0)) !== Number(((((members.m_OverVal ?? 0)) !== (0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0));
                    break;
                }
            case 111:
            case 127:
                {
                    method_JMP(runtime, (((((Number(((((members.m_SignVal ?? 0)) < (0)) ? 1 : 0)) === Number(((((members.m_OverVal ?? 0)) !== (0)) ? 1 : 0))) ? 1 : 0)) && (((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0));
                    break;
                }
            case 128:
                {
                    let tmpcf__4 = ((0) >>> 0);
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_dst = ((method_GetRMByte(runtime)) >>> 0);
                    members.m_src = ((method_fetch(runtime)) >>> 0);
                    if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
                        method_CLK(runtime, 89);
                    }
                    else {
                        if (((Number((((members.m_modrm ?? 0)) & (56))) === Number(56)) ? 1 : 0)) {
                            method_CLK(runtime, 91);
                        }
                        else {
                            method_CLK(runtime, 90);
                        }
                    }
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                            {
                                method_set_CFB(runtime, method_ADDB(runtime));
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 8:
                            {
                                method_ORB(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 16:
                            {
                                tmpcf__4 = ((method_ADDB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                method_set_CFB(runtime, tmpcf__4);
                                break;
                            }
                        case 24:
                            {
                                tmpcf__4 = ((method_SUBB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                method_set_CFB(runtime, tmpcf__4);
                                break;
                            }
                        case 32:
                            {
                                method_ANDB(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 40:
                            {
                                method_set_CFB(runtime, method_SUBB(runtime));
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 48:
                            {
                                method_XORB(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 56:
                            {
                                method_set_CFB(runtime, method_SUBB(runtime));
                                break;
                            }
                    }
                    break;
                }
            case 129:
                {
                    let tmpcf__5 = ((0) >>> 0);
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_dst = ((method_GetRMWord(runtime)) >>> 0);
                    members.m_src = ((method_fetch_word(runtime)) >>> 0);
                    if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
                        method_CLK(runtime, 95);
                    }
                    else {
                        if (((Number((((members.m_modrm ?? 0)) & (56))) === Number(56)) ? 1 : 0)) {
                            method_CLK(runtime, 97);
                        }
                        else {
                            method_CLK(runtime, 96);
                        }
                    }
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                            {
                                method_set_CFW(runtime, method_ADDX(runtime));
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 8:
                            {
                                method_ORW(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 16:
                            {
                                tmpcf__5 = ((method_ADDX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                method_set_CFW(runtime, tmpcf__5);
                                break;
                            }
                        case 24:
                            {
                                tmpcf__5 = ((method_SUBX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                method_set_CFW(runtime, tmpcf__5);
                                break;
                            }
                        case 32:
                            {
                                method_ANDX(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 40:
                            {
                                method_set_CFW(runtime, method_SUBX(runtime));
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 48:
                            {
                                method_XORW(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 56:
                            {
                                method_set_CFW(runtime, method_SUBX(runtime));
                                break;
                            }
                    }
                    break;
                }
            case 130:
                {
                    let tmpcf__6 = ((0) >>> 0);
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_dst = ((method_GetRMByte(runtime)) >>> 0);
                    members.m_src = ((((method_fetch(runtime)) << 24 >> 24)) >>> 0);
                    if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
                        method_CLK(runtime, 89);
                    }
                    else {
                        if (((Number((((members.m_modrm ?? 0)) & (56))) === Number(56)) ? 1 : 0)) {
                            method_CLK(runtime, 91);
                        }
                        else {
                            method_CLK(runtime, 90);
                        }
                    }
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                            {
                                method_set_CFB(runtime, method_ADDB(runtime));
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 8:
                            {
                                method_ORB(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 16:
                            {
                                tmpcf__6 = ((method_ADDB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                method_set_CFB(runtime, tmpcf__6);
                                break;
                            }
                        case 24:
                            {
                                tmpcf__6 = ((method_SUBB(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                method_set_CFB(runtime, tmpcf__6);
                                break;
                            }
                        case 32:
                            {
                                method_ANDB(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 40:
                            {
                                method_set_CFB(runtime, method_SUBB(runtime));
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 48:
                            {
                                method_XORB(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 56:
                            {
                                method_set_CFB(runtime, method_SUBB(runtime));
                                break;
                            }
                    }
                    break;
                }
            case 131:
                {
                    let tmpcf__7 = ((0) >>> 0);
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_dst = ((method_GetRMWord(runtime)) >>> 0);
                    members.m_src = ((((((((method_fetch(runtime)) << 24 >> 24)) << 16 >> 16)) & 0xffff)) >>> 0);
                    if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
                        method_CLK(runtime, 98);
                    }
                    else {
                        if (((Number((((members.m_modrm ?? 0)) & (56))) === Number(56)) ? 1 : 0)) {
                            method_CLK(runtime, 100);
                        }
                        else {
                            method_CLK(runtime, 99);
                        }
                    }
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                            {
                                method_set_CFW(runtime, method_ADDX(runtime));
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 8:
                            {
                                method_ORW(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 16:
                            {
                                tmpcf__7 = ((method_ADDX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                method_set_CFW(runtime, tmpcf__7);
                                break;
                            }
                        case 24:
                            {
                                tmpcf__7 = ((method_SUBX(runtime, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0)))) >>> 0);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                method_set_CFW(runtime, tmpcf__7);
                                break;
                            }
                        case 32:
                            {
                                method_ANDX(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 40:
                            {
                                method_set_CFW(runtime, method_SUBX(runtime));
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 48:
                            {
                                method_XORW(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                break;
                            }
                        case 56:
                            {
                                method_set_CFW(runtime, method_SUBX(runtime));
                                break;
                            }
                    }
                    break;
                }
            case 132:
                {
                    method_DEF_br8(runtime);
                    method_ANDB(runtime);
                    method_CLKM(runtime, 86, 87);
                    break;
                }
            case 133:
                {
                    method_DEF_wr16(runtime);
                    method_ANDX(runtime);
                    method_CLKM(runtime, 92, 93);
                    break;
                }
            case 134:
                {
                    method_DEF_br8(runtime);
                    method_RegByte__1(runtime, (members.m_dst ?? 0));
                    method_PutbackRMByte(runtime, (members.m_src ?? 0));
                    method_CLKM(runtime, 73, 74);
                    break;
                }
            case 135:
                {
                    method_DEF_wr16(runtime);
                    method_RegWord__1(runtime, (members.m_dst ?? 0));
                    method_PutbackRMWord(runtime, (members.m_src ?? 0));
                    method_CLKM(runtime, 75, 76);
                    break;
                }
            case 136:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_src = ((method_RegByte__0(runtime)) >>> 0);
                    method_PutRMByte(runtime, (members.m_src ?? 0));
                    method_CLKM(runtime, 55, 57);
                    break;
                }
            case 137:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_src = ((method_RegWord__0(runtime)) >>> 0);
                    method_PutRMWord(runtime, (members.m_src ?? 0));
                    method_CLKM(runtime, 60, 62);
                    break;
                }
            case 138:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_src = ((method_GetRMByte(runtime)) >>> 0);
                    method_RegByte__1(runtime, (members.m_src ?? 0));
                    method_CLKM(runtime, 55, 56);
                    break;
                }
            case 139:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_src = ((method_GetRMWord(runtime)) >>> 0);
                    method_RegWord__1(runtime, (members.m_src ?? 0));
                    method_CLKM(runtime, 60, 61);
                    break;
                }
            case 140:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    method_PutRMWord(runtime, h_m_sregs[runtime.shiftRight((((members.m_modrm ?? 0)) & (24)), 3)]);
                    method_CLKM(runtime, 71, 72);
                    break;
                }
            case 141:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    method_get_ea(runtime, 0, 3);
                    method_RegWord__1(runtime, (members.m_eo ?? 0));
                    method_CLK(runtime, 20);
                    break;
                }
            case 142:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_src = ((method_GetRMWord(runtime)) >>> 0);
                    h_m_sregs[runtime.shiftRight((((members.m_modrm ?? 0)) & (24)), 3)] = (members.m_src ?? 0);
                    method_CLKM(runtime, 69, 70);
                    members.m_no_interrupt = ((1) & 0xff);
                    break;
                }
            case 143:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    method_PutRMWord(runtime, method_POP(runtime));
                    method_CLKM(runtime, 82, 83);
                    break;
                }
            case 144:
                {
                    method_CLK(runtime, 21);
                    break;
                }
            case 145:
                {
                    method_XchgAXReg(runtime, 1);
                    method_CLK(runtime, 77);
                    break;
                }
            case 146:
                {
                    method_XchgAXReg(runtime, 2);
                    method_CLK(runtime, 77);
                    break;
                }
            case 147:
                {
                    method_XchgAXReg(runtime, 3);
                    method_CLK(runtime, 77);
                    break;
                }
            case 148:
                {
                    method_XchgAXReg(runtime, 4);
                    method_CLK(runtime, 77);
                    break;
                }
            case 149:
                {
                    method_XchgAXReg(runtime, 5);
                    method_CLK(runtime, 77);
                    break;
                }
            case 150:
                {
                    method_XchgAXReg(runtime, 6);
                    method_CLK(runtime, 77);
                    break;
                }
            case 151:
                {
                    method_XchgAXReg(runtime, 7);
                    method_CLK(runtime, 77);
                    break;
                }
            case 152:
                {
                    runtime.writeIndex(h_m_regs.b, 1, ((((runtime.readIndex(h_m_regs.b, 0)) & (128))) ? (255) : (0)));
                    method_CLK(runtime, 16);
                    break;
                }
            case 153:
                {
                    runtime.writeIndex(h_m_regs.w, 2, ((((runtime.readIndex(h_m_regs.b, 1)) & (128))) ? (65535) : (0)));
                    method_CLK(runtime, 17);
                    break;
                }
            case 154:
                {
                    let tmp = ((method_fetch_word(runtime)) & 0xffff);
                    let tmp2 = ((method_fetch_word(runtime)) & 0xffff);
                    method_PUSH(runtime, h_m_sregs[1]);
                    method_PUSH(runtime, (members.m_ip ?? 0));
                    members.m_ip = ((tmp) & 0xffff);
                    h_m_sregs[1] = tmp2;
                    method_CLK(runtime, 31);
                    break;
                }
            case 155:
                {
                    if (((((members.m_test_state ?? 0)) === (0)) ? 1 : 0)) {
                        members.m_icount = ((0) | 0);
                        members.m_ip = ((((members.m_ip) - (1))) & 0xffff);
                    }
                    else {
                        method_CLK(runtime, 22);
                    }
                    break;
                }
            case 156:
                {
                    method_PUSH(runtime, method_CompressFlags(runtime));
                    method_CLK(runtime, 81);
                    break;
                }
            case 157:
                {
                    method_i_popf(runtime);
                    break;
                }
            case 158:
                {
                    let tmp__1 = ((((((method_CompressFlags(runtime)) & (65280))) | (((runtime.readIndex(h_m_regs.b, 1)) & (213))))) >>> 0);
                    method_ExpandFlags(runtime, tmp__1);
                    method_CLK(runtime, 9);
                    break;
                }
            case 159:
                {
                    runtime.writeIndex(h_m_regs.b, 1, method_CompressFlags(runtime));
                    method_CLK(runtime, 8);
                    break;
                }
            case 160:
                {
                    let addr = ((method_fetch_word(runtime)) >>> 0);
                    runtime.writeIndex(h_m_regs.b, 0, method_GetMemB(runtime, 3, addr));
                    method_CLK(runtime, 65);
                    break;
                }
            case 161:
                {
                    let addr__1 = ((method_fetch_word(runtime)) >>> 0);
                    runtime.writeIndex(h_m_regs.w, 0, method_GetMemW(runtime, 3, addr__1));
                    method_CLK(runtime, 66);
                    break;
                }
            case 162:
                {
                    let addr__2 = ((method_fetch_word(runtime)) >>> 0);
                    method_PutMemB(runtime, 3, addr__2, runtime.readIndex(h_m_regs.b, 0));
                    method_CLK(runtime, 67);
                    break;
                }
            case 163:
                {
                    let addr__3 = ((method_fetch_word(runtime)) >>> 0);
                    method_PutMemW(runtime, 3, addr__3, runtime.readIndex(h_m_regs.w, 0));
                    method_CLK(runtime, 68);
                    break;
                }
            case 164:
                {
                    method_i_movsb(runtime);
                    break;
                }
            case 165:
                {
                    method_i_movsw(runtime);
                    break;
                }
            case 166:
                {
                    method_i_cmpsb(runtime);
                    break;
                }
            case 167:
                {
                    method_i_cmpsw(runtime);
                    break;
                }
            case 168:
                {
                    method_DEF_ald8(runtime);
                    method_ANDB(runtime);
                    method_CLK(runtime, 89);
                    break;
                }
            case 169:
                {
                    method_DEF_axd16(runtime);
                    method_ANDX(runtime);
                    method_CLK(runtime, 95);
                    break;
                }
            case 170:
                {
                    method_i_stosb(runtime);
                    break;
                }
            case 171:
                {
                    method_i_stosw(runtime);
                    break;
                }
            case 172:
                {
                    method_i_lodsb(runtime);
                    break;
                }
            case 173:
                {
                    method_i_lodsw(runtime);
                    break;
                }
            case 174:
                {
                    method_i_scasb(runtime);
                    break;
                }
            case 175:
                {
                    method_i_scasw(runtime);
                    break;
                }
            case 176:
                {
                    runtime.writeIndex(h_m_regs.b, 0, method_fetch(runtime));
                    method_CLK(runtime, 58);
                    break;
                }
            case 177:
                {
                    runtime.writeIndex(h_m_regs.b, 2, method_fetch(runtime));
                    method_CLK(runtime, 58);
                    break;
                }
            case 178:
                {
                    runtime.writeIndex(h_m_regs.b, 4, method_fetch(runtime));
                    method_CLK(runtime, 58);
                    break;
                }
            case 179:
                {
                    runtime.writeIndex(h_m_regs.b, 6, method_fetch(runtime));
                    method_CLK(runtime, 58);
                    break;
                }
            case 180:
                {
                    runtime.writeIndex(h_m_regs.b, 1, method_fetch(runtime));
                    method_CLK(runtime, 58);
                    break;
                }
            case 181:
                {
                    runtime.writeIndex(h_m_regs.b, 3, method_fetch(runtime));
                    method_CLK(runtime, 58);
                    break;
                }
            case 182:
                {
                    runtime.writeIndex(h_m_regs.b, 5, method_fetch(runtime));
                    method_CLK(runtime, 58);
                    break;
                }
            case 183:
                {
                    runtime.writeIndex(h_m_regs.b, 7, method_fetch(runtime));
                    method_CLK(runtime, 58);
                    break;
                }
            case 184:
                {
                    runtime.writeIndex(h_m_regs.b, 0, method_fetch(runtime));
                    runtime.writeIndex(h_m_regs.b, 1, method_fetch(runtime));
                    method_CLK(runtime, 63);
                    break;
                }
            case 185:
                {
                    runtime.writeIndex(h_m_regs.b, 2, method_fetch(runtime));
                    runtime.writeIndex(h_m_regs.b, 3, method_fetch(runtime));
                    method_CLK(runtime, 63);
                    break;
                }
            case 186:
                {
                    runtime.writeIndex(h_m_regs.b, 4, method_fetch(runtime));
                    runtime.writeIndex(h_m_regs.b, 5, method_fetch(runtime));
                    method_CLK(runtime, 63);
                    break;
                }
            case 187:
                {
                    runtime.writeIndex(h_m_regs.b, 6, method_fetch(runtime));
                    runtime.writeIndex(h_m_regs.b, 7, method_fetch(runtime));
                    method_CLK(runtime, 63);
                    break;
                }
            case 188:
                {
                    runtime.writeIndex(h_m_regs.b, 8, method_fetch(runtime));
                    runtime.writeIndex(h_m_regs.b, 9, method_fetch(runtime));
                    method_CLK(runtime, 63);
                    break;
                }
            case 189:
                {
                    runtime.writeIndex(h_m_regs.b, 10, method_fetch(runtime));
                    runtime.writeIndex(h_m_regs.b, 11, method_fetch(runtime));
                    method_CLK(runtime, 63);
                    break;
                }
            case 190:
                {
                    runtime.writeIndex(h_m_regs.b, 12, method_fetch(runtime));
                    runtime.writeIndex(h_m_regs.b, 13, method_fetch(runtime));
                    method_CLK(runtime, 63);
                    break;
                }
            case 191:
                {
                    runtime.writeIndex(h_m_regs.b, 14, method_fetch(runtime));
                    runtime.writeIndex(h_m_regs.b, 15, method_fetch(runtime));
                    method_CLK(runtime, 63);
                    break;
                }
            case 192:
            case 194:
                {
                    let count = ((method_fetch_word(runtime)) >>> 0);
                    members.m_ip = ((method_POP(runtime)) & 0xffff);
                    runtime.writeIndex(h_m_regs.w, 4, ((runtime.readIndex(h_m_regs.w, 4)) + (count)));
                    method_CLK(runtime, 37);
                    break;
                }
            case 193:
            case 195:
                {
                    members.m_ip = ((method_POP(runtime)) & 0xffff);
                    method_CLK(runtime, 35);
                    break;
                }
            case 196:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    method_RegWord__1(runtime, method_GetRMWord(runtime));
                    h_m_sregs[0] = method_GetnextRMWord(runtime);
                    method_CLK(runtime, 19);
                    break;
                }
            case 197:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    method_RegWord__1(runtime, method_GetRMWord(runtime));
                    h_m_sregs[3] = method_GetnextRMWord(runtime);
                    method_CLK(runtime, 19);
                    break;
                }
            case 198:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    method_PutImmRMByte(runtime);
                    method_CLKM(runtime, 58, 59);
                    break;
                }
            case 199:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    method_PutImmRMWord(runtime);
                    method_CLKM(runtime, 63, 64);
                    break;
                }
            case 200:
            case 202:
                {
                    let count__1 = ((method_fetch_word(runtime)) >>> 0);
                    members.m_ip = ((method_POP(runtime)) & 0xffff);
                    h_m_sregs[1] = method_POP(runtime);
                    runtime.writeIndex(h_m_regs.w, 4, ((runtime.readIndex(h_m_regs.w, 4)) + (count__1)));
                    method_CLK(runtime, 38);
                    break;
                }
            case 201:
            case 203:
                {
                    members.m_ip = ((method_POP(runtime)) & 0xffff);
                    h_m_sregs[1] = method_POP(runtime);
                    method_CLK(runtime, 36);
                    break;
                }
            case 204:
                {
                    method_interrupt(runtime, 3, 0);
                    method_CLK(runtime, 2);
                    break;
                }
            case 205:
                {
                    method_interrupt(runtime, method_fetch(runtime), 0);
                    method_CLK(runtime, 3);
                    break;
                }
            case 206:
                {
                    if (((((members.m_OverVal ?? 0)) !== (0)) ? 1 : 0)) {
                        method_interrupt(runtime, 4, 0);
                        method_CLK(runtime, 5);
                    }
                    else {
                        method_CLK(runtime, 4);
                    }
                    break;
                }
            case 207:
                {
                    members.m_ip = ((method_POP(runtime)) & 0xffff);
                    h_m_sregs[1] = method_POP(runtime);
                    method_i_popf(runtime);
                    method_CLK(runtime, 1);
                    break;
                }
            case 208:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_src = ((method_GetRMByte(runtime)) >>> 0);
                    members.m_dst = (((members.m_src ?? 0)) >>> 0);
                    method_CLKM(runtime, 125, 128);
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                            {
                                method_ROL_BYTE(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (128))) >>> 0);
                                break;
                            }
                        case 8:
                            {
                                method_ROR_BYTE(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (128))) >>> 0);
                                break;
                            }
                        case 16:
                            {
                                method_ROLC_BYTE(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (128))) >>> 0);
                                break;
                            }
                        case 24:
                            {
                                method_RORC_BYTE(runtime);
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (128))) >>> 0);
                                break;
                            }
                        case 48:
                        case 32:
                            {
                                method_SHL_BYTE(runtime, 1);
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (128))) >>> 0);
                                break;
                            }
                        case 40:
                            {
                                method_SHR_BYTE(runtime, 1);
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (128))) >>> 0);
                                break;
                            }
                        case 56:
                            {
                                method_SHRA_BYTE(runtime, 1);
                                members.m_OverVal = ((0) >>> 0);
                                break;
                            }
                    }
                    break;
                }
            case 209:
                {
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    members.m_src = ((method_GetRMWord(runtime)) >>> 0);
                    members.m_dst = (((members.m_src ?? 0)) >>> 0);
                    method_CLKM(runtime, 125, 128);
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                            {
                                method_ROL_WORD(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (32768))) >>> 0);
                                break;
                            }
                        case 8:
                            {
                                method_ROR_WORD(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (32768))) >>> 0);
                                break;
                            }
                        case 16:
                            {
                                method_ROLC_WORD(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (32768))) >>> 0);
                                break;
                            }
                        case 24:
                            {
                                method_RORC_WORD(runtime);
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (32768))) >>> 0);
                                break;
                            }
                        case 48:
                        case 32:
                            {
                                method_SHL_WORD(runtime, 1);
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (32768))) >>> 0);
                                break;
                            }
                        case 40:
                            {
                                method_SHR_WORD(runtime, 1);
                                members.m_OverVal = (((((((members.m_src ?? 0)) ^ ((members.m_dst ?? 0)))) & (32768))) >>> 0);
                                break;
                            }
                        case 56:
                            {
                                method_SHRA_WORD(runtime, 1);
                                members.m_OverVal = ((0) >>> 0);
                                break;
                            }
                    }
                    break;
                }
            case 212:
                {
                    let base = ((method_fetch(runtime)) & 0xff);
                    if (((base) ? 0 : 1)) {
                        method_interrupt(runtime, 0);
                        break;
                    }
                    runtime.writeIndex(h_m_regs.b, 1, runtime.divide(runtime.readIndex(h_m_regs.b, 0), base));
                    runtime.writeIndex(h_m_regs.b, 0, ((runtime.readIndex(h_m_regs.b, 0)) % (base)));
                    method_set_SZPF_Word(runtime, runtime.readIndex(h_m_regs.w, 0));
                    method_CLK(runtime, 12);
                    break;
                }
            case 213:
                {
                    let base__1 = ((method_fetch(runtime)) & 0xff);
                    runtime.writeIndex(h_m_regs.b, 0, __add_common_op(runtime, ((runtime.readIndex(h_m_regs.b, 1)) * (base__1)), runtime.readIndex(h_m_regs.b, 0)));
                    runtime.writeIndex(h_m_regs.b, 1, 0);
                    method_set_SZPF_Byte(runtime, runtime.readIndex(h_m_regs.b, 0));
                    method_CLK(runtime, 13);
                    break;
                }
            case 214:
                {
                    runtime.writeIndex(h_m_regs.b, 0, ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (255) : (0)));
                    method_CLK(runtime, 86);
                    break;
                }
            case 215:
                {
                    runtime.writeIndex(h_m_regs.b, 0, method_GetMemB(runtime, 3, __add_common_op(runtime, runtime.readIndex(h_m_regs.w, 3), runtime.readIndex(h_m_regs.b, 0))));
                    method_CLK(runtime, 23);
                    break;
                }
            case 224:
                {
                    let disp = ((((method_fetch(runtime)) << 24 >> 24)) << 24 >> 24);
                    runtime.writeIndex(h_m_regs.w, 1, ((runtime.readIndex(h_m_regs.w, 1)) - (1)));
                    if ((((((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? 0 : 1)) && (runtime.readIndex(h_m_regs.w, 1))) ? 1 : 0)) {
                        members.m_ip = (((((members.m_ip ?? 0)) + (disp))) & 0xffff);
                        method_CLK(runtime, 44);
                    }
                    else {
                        method_CLK(runtime, 43);
                    }
                    break;
                }
            case 225:
                {
                    let disp__1 = ((((method_fetch(runtime)) << 24 >> 24)) << 24 >> 24);
                    runtime.writeIndex(h_m_regs.w, 1, ((runtime.readIndex(h_m_regs.w, 1)) - (1)));
                    if ((((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) && (runtime.readIndex(h_m_regs.w, 1))) ? 1 : 0)) {
                        members.m_ip = (((((members.m_ip ?? 0)) + (disp__1))) & 0xffff);
                        method_CLK(runtime, 46);
                    }
                    else {
                        method_CLK(runtime, 45);
                    }
                    break;
                }
            case 226:
                {
                    let disp__2 = ((((method_fetch(runtime)) << 24 >> 24)) << 24 >> 24);
                    runtime.writeIndex(h_m_regs.w, 1, ((runtime.readIndex(h_m_regs.w, 1)) - (1)));
                    if (runtime.readIndex(h_m_regs.w, 1)) {
                        members.m_ip = (((((members.m_ip ?? 0)) + (disp__2))) & 0xffff);
                        method_CLK(runtime, 44);
                    }
                    else {
                        method_CLK(runtime, 43);
                    }
                    break;
                }
            case 227:
                {
                    let disp__3 = ((((method_fetch(runtime)) << 24 >> 24)) << 24 >> 24);
                    if (((Number(runtime.readIndex(h_m_regs.w, 1)) === Number(0)) ? 1 : 0)) {
                        members.m_ip = (((((members.m_ip ?? 0)) + (disp__3))) & 0xffff);
                        method_CLK(runtime, 42);
                    }
                    else {
                        method_CLK(runtime, 41);
                    }
                    break;
                }
            case 228:
                {
                    if ((members.m_lock ?? 0)) {
                        (__L0 ? __L0(Number(1)) : typeof members.m_lock_handler === 'function' ? members.m_lock_handler(1) : runtime.invoke("m_lock_handler", 1));
                    }
                    let v = ((method_read_port_byte(runtime, method_fetch(runtime))) & 0xff);
                    if ((members.m_lock ?? 0)) {
                        (__L0 ? __L0(Number(0)) : typeof members.m_lock_handler === 'function' ? members.m_lock_handler(0) : runtime.invoke("m_lock_handler", 0));
                        members.m_lock = ((0) ? 1 : 0);
                    }
                    if ((__L1 ? __L1() : runtime.macro("access_to_be_redone"))) {
                        members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        members.m_icount = ((((members.m_icount) - (4))) | 0);
                        break;
                    }
                    runtime.writeIndex(h_m_regs.b, 0, v);
                    method_CLK(runtime, 47);
                    break;
                }
            case 229:
                {
                    let port = ((method_fetch(runtime)) & 0xff);
                    let v__1 = ((method_read_port_word(runtime, port)) & 0xffff);
                    if ((__L1 ? __L1() : runtime.macro("access_to_be_redone"))) {
                        members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        members.m_icount = ((((members.m_icount) - (4))) | 0);
                        break;
                    }
                    runtime.writeIndex(h_m_regs.w, 0, v__1);
                    method_CLK(runtime, 48);
                    break;
                }
            case 230:
                {
                    method_write_port_byte_al(runtime, method_fetch(runtime));
                    if ((__L1 ? __L1() : runtime.macro("access_to_be_redone"))) {
                        members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        members.m_icount = ((((members.m_icount) - (4))) | 0);
                        break;
                    }
                    method_CLK(runtime, 51);
                    break;
                }
            case 231:
                {
                    let port__1 = ((method_fetch(runtime)) & 0xff);
                    method_write_port_word(runtime, port__1, runtime.readIndex(h_m_regs.w, 0));
                    if ((__L1 ? __L1() : runtime.macro("access_to_be_redone"))) {
                        members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        members.m_icount = ((((members.m_icount) - (4))) | 0);
                        break;
                    }
                    method_CLK(runtime, 52);
                    break;
                }
            case 232:
                {
                    let tmp__2 = ((((method_fetch_word(runtime)) << 16 >> 16)) << 16 >> 16);
                    method_PUSH(runtime, (members.m_ip ?? 0));
                    members.m_ip = (((((members.m_ip ?? 0)) + (tmp__2))) & 0xffff);
                    method_CLK(runtime, 30);
                    break;
                }
            case 233:
                {
                    let offset = ((((method_fetch_word(runtime)) << 16 >> 16)) << 16 >> 16);
                    members.m_ip = ((((members.m_ip) + (offset))) & 0xffff);
                    method_CLK(runtime, 25);
                    break;
                }
            case 234:
                {
                    let tmp__3 = ((method_fetch_word(runtime)) & 0xffff);
                    let tmp1 = ((method_fetch_word(runtime)) & 0xffff);
                    h_m_sregs[1] = tmp1;
                    members.m_ip = ((tmp__3) & 0xffff);
                    method_CLK(runtime, 26);
                    break;
                }
            case 235:
                {
                    let tmp__4 = ((((((method_fetch(runtime)) << 24 >> 24)) | 0)) | 0);
                    method_CLK(runtime, 24);
                    if ((((((((((((Number(tmp__4) === Number(-2)) ? 1 : 0)) && (((((members.m_no_interrupt ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_pending_irq ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_icount = ((((members.m_icount) % (12))) | 0);
                    }
                    members.m_ip = (((((((members.m_ip ?? 0)) + (tmp__4))) & 0xffff)) & 0xffff);
                    break;
                }
            case 236:
                {
                    let v__2 = ((method_read_port_byte(runtime, runtime.readIndex(h_m_regs.w, 2))) & 0xff);
                    if ((__L1 ? __L1() : runtime.macro("access_to_be_redone"))) {
                        members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        members.m_icount = ((((members.m_icount) - (4))) | 0);
                        break;
                    }
                    runtime.writeIndex(h_m_regs.b, 0, v__2);
                    method_CLK(runtime, 49);
                    break;
                }
            case 237:
                {
                    let port__2 = ((runtime.readIndex(h_m_regs.w, 2)) >>> 0);
                    let v__3 = ((method_read_port_word(runtime, port__2)) & 0xffff);
                    if ((__L1 ? __L1() : runtime.macro("access_to_be_redone"))) {
                        members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        members.m_icount = ((((members.m_icount) - (4))) | 0);
                        break;
                    }
                    runtime.writeIndex(h_m_regs.w, 0, v__3);
                    method_CLK(runtime, 50);
                    break;
                }
            case 238:
                {
                    method_write_port_byte_al(runtime, runtime.readIndex(h_m_regs.w, 2));
                    if ((__L1 ? __L1() : runtime.macro("access_to_be_redone"))) {
                        members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        members.m_icount = ((((members.m_icount) - (4))) | 0);
                        break;
                    }
                    method_CLK(runtime, 53);
                    break;
                }
            case 239:
                {
                    let port__3 = ((runtime.readIndex(h_m_regs.w, 2)) >>> 0);
                    method_write_port_word(runtime, port__3, runtime.readIndex(h_m_regs.w, 0));
                    if ((__L1 ? __L1() : runtime.macro("access_to_be_redone"))) {
                        members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        members.m_icount = ((((members.m_icount) - (4))) | 0);
                        break;
                    }
                    method_CLK(runtime, 54);
                    break;
                }
            case 240:
            case 241:
                {
                    members.m_lock = ((1) ? 1 : 0);
                    members.m_no_interrupt = ((1) & 0xff);
                    method_CLK(runtime, 21);
                    break;
                }
            case 242:
                {
                    let invalid = ((0) ? 1 : 0);
                    let next = ((method_repx_op(runtime)) & 0xff);
                    let c = ((runtime.readIndex(h_m_regs.w, 1)) & 0xffff);
                    switch (next) {
                        case 164:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_movsb(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while (((((((c) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 165:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_movsw(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while (((((((c) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 166:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_cmpsb(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while ((((((((((c) > (0)) ? 1 : 0)) && (((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 167:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_cmpsw(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while ((((((((((c) > (0)) ? 1 : 0)) && (((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 170:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_stosb(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while (((((((c) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 171:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_stosw(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while (((((((c) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 172:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_lodsb(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while (((((((c) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 173:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_lodsw(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while (((((((c) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 174:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_scasb(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while ((((((((((c) > (0)) ? 1 : 0)) && (((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 175:
                            {
                                method_CLK(runtime, 6);
                                if (c) {
                                    do {
                                        method_i_scasw(runtime);
                                        c = ((((c) - (1))) & 0xffff);
                                    } while ((((((((((c) > (0)) ? 1 : 0)) && (((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        default:
                            {
                                0;
                                members.m_ip = ((((members.m_ip) - (1))) & 0xffff);
                                invalid = ((1) ? 1 : 0);
                                break;
                            }
                    }
                    if ((((c) && (((invalid) ? 0 : 1))) ? 1 : 0)) {
                        if ((((((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) && (((Number(((next) & (6))) === Number(6)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
                            members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        }
                    }
                    break;
                }
            case 243:
                {
                    let invalid__1 = ((0) ? 1 : 0);
                    let next__1 = ((method_repx_op(runtime)) & 0xff);
                    let c__1 = ((runtime.readIndex(h_m_regs.w, 1)) & 0xffff);
                    switch (next__1) {
                        case 164:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_movsb(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while (((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 165:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_movsw(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while (((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 166:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_cmpsb(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while ((((((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 167:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_cmpsw(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while ((((((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 170:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_stosb(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while (((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 171:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_stosw(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while (((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 172:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_lodsb(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while (((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 173:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_lodsw(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while (((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 174:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_scasb(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while ((((((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        case 175:
                            {
                                method_CLK(runtime, 6);
                                if (c__1) {
                                    do {
                                        method_i_scasw(runtime);
                                        c__1 = ((((c__1) - (1))) & 0xffff);
                                    } while ((((((((((c__1) > (0)) ? 1 : 0)) && (((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_icount ?? 0)) > (0)) ? 1 : 0))) ? 1 : 0));
                                }
                                runtime.writeIndex(h_m_regs.w, 1, c__1);
                                members.m_seg_prefix = ((0) ? 1 : 0);
                                members.m_seg_prefix_next = ((0) ? 1 : 0);
                                break;
                            }
                        default:
                            {
                                0;
                                members.m_ip = ((((members.m_ip) - (1))) & 0xffff);
                                invalid__1 = ((1) ? 1 : 0);
                                break;
                            }
                    }
                    if ((((c__1) && (((invalid__1) ? 0 : 1))) ? 1 : 0)) {
                        if ((((((((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? 0 : 1)) && (((Number(((next__1) & (6))) === Number(6)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
                            members.m_ip = (((members.m_prev_ip ?? 0)) & 0xffff);
                        }
                    }
                    break;
                }
            case 244:
                {
                    members.m_icount = ((0) | 0);
                    members.m_halt = ((1) ? 1 : 0);
                    break;
                }
            case 245:
                {
                    members.m_CarryVal = (((((members.m_CarryVal ?? 0)) ? 0 : 1)) >>> 0);
                    method_CLK(runtime, 7);
                    break;
                }
            case 246:
                {
                    let tmp__5 = ((0) >>> 0);
                    let uresult = ((0) >>> 0);
                    let uresult2 = ((0) >>> 0);
                    let result = ((0) | 0);
                    let result2 = ((0) | 0);
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    tmp__5 = ((method_GetRMByte(runtime)) >>> 0);
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                        case 8:
                            {
                                tmp__5 = ((((tmp__5) & (method_fetch(runtime)))) >>> 0);
                                members.m_CarryVal = (((members.m_OverVal = ((0) >>> 0))) >>> 0);
                                method_set_SZPF_Byte(runtime, tmp__5);
                                method_CLKM(runtime, 89, 91);
                                break;
                            }
                        case 16:
                            {
                                method_PutbackRMByte(runtime, (~tmp__5));
                                method_CLKM(runtime, 121, 123);
                                break;
                            }
                        case 24:
                            {
                                members.m_dst = ((0) >>> 0);
                                members.m_src = ((tmp__5) >>> 0);
                                method_set_CFB(runtime, method_SUBB(runtime));
                                method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                method_CLKM(runtime, 121, 123);
                                break;
                            }
                        case 32:
                            {
                                uresult = ((((runtime.readIndex(h_m_regs.b, 0)) * (tmp__5))) >>> 0);
                                runtime.writeIndex(h_m_regs.w, 0, ((uresult) & 0xffff));
                                members.m_CarryVal = (((members.m_OverVal = ((((((Number(runtime.readIndex(h_m_regs.b, 1)) !== Number(0)) ? 1 : 0)) ? (1) : (0))) >>> 0))) >>> 0);
                                method_set_ZF(runtime, runtime.readIndex(h_m_regs.w, 0));
                                method_CLKM(runtime, 101, 103);
                                break;
                            }
                        case 40:
                            {
                                result = ((((((((runtime.readIndex(h_m_regs.b, 0)) << 24 >> 24)) << 16 >> 16)) * (((((tmp__5) << 24 >> 24)) << 16 >> 16)))) | 0);
                                runtime.writeIndex(h_m_regs.w, 0, ((result) & 0xffff));
                                members.m_CarryVal = (((members.m_OverVal = ((((((Number(runtime.readIndex(h_m_regs.b, 1)) !== Number(0)) ? 1 : 0)) ? (1) : (0))) >>> 0))) >>> 0);
                                method_set_ZF(runtime, runtime.readIndex(h_m_regs.w, 0));
                                method_CLKM(runtime, 105, 107);
                                break;
                            }
                        case 48:
                            {
                                if (tmp__5) {
                                    uresult = ((runtime.readIndex(h_m_regs.w, 0)) >>> 0);
                                    uresult2 = ((((uresult) % (tmp__5))) >>> 0);
                                    uresult = ((((uresult) / (tmp__5))) >>> 0);
                                    if ((((uresult) > (255)) ? 1 : 0)) {
                                        method_interrupt(runtime, 0);
                                    }
                                    else {
                                        runtime.writeIndex(h_m_regs.b, 0, uresult);
                                        runtime.writeIndex(h_m_regs.b, 1, uresult2);
                                        method_set_ZF(runtime, runtime.readIndex(h_m_regs.b, 0));
                                    }
                                }
                                else {
                                    method_interrupt(runtime, 0);
                                }
                                method_CLKM(runtime, 109, 111);
                                break;
                            }
                        case 56:
                            {
                                if (tmp__5) {
                                    result = ((((runtime.readIndex(h_m_regs.w, 0)) << 16 >> 16)) | 0);
                                    result2 = ((((result) % (((((tmp__5) << 24 >> 24)) << 16 >> 16)))) | 0);
                                    result = ((((result) / (((((tmp__5) << 24 >> 24)) << 16 >> 16)))) | 0);
                                    let lower_bound = (((((members.m_MF ?? 0)) ? (-127) : (-128))) | 0);
                                    if (((((((result) > (127)) ? 1 : 0)) || ((((result) < (lower_bound)) ? 1 : 0))) ? 1 : 0)) {
                                        method_interrupt(runtime, 0);
                                    }
                                    else {
                                        runtime.writeIndex(h_m_regs.b, 0, result);
                                        runtime.writeIndex(h_m_regs.b, 1, result2);
                                        method_set_ZF(runtime, runtime.readIndex(h_m_regs.b, 0));
                                    }
                                }
                                else {
                                    method_interrupt(runtime, 0);
                                }
                                method_CLKM(runtime, 113, 115);
                                break;
                            }
                    }
                    break;
                }
            case 247:
                {
                    let tmp__6 = ((0) >>> 0);
                    let tmp2__1 = ((0) >>> 0);
                    let uresult__1 = ((0) >>> 0);
                    let uresult2__1 = ((0) >>> 0);
                    let result__1 = ((0) | 0);
                    let result2__1 = ((0) | 0);
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    tmp__6 = ((method_GetRMWord(runtime)) >>> 0);
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                        case 8:
                            {
                                tmp2__1 = ((method_fetch_word(runtime)) >>> 0);
                                tmp__6 = ((((tmp__6) & (tmp2__1))) >>> 0);
                                members.m_CarryVal = (((members.m_OverVal = ((0) >>> 0))) >>> 0);
                                method_set_SZPF_Word(runtime, tmp__6);
                                method_CLKM(runtime, 95, 97);
                                break;
                            }
                        case 16:
                            {
                                method_PutbackRMWord(runtime, (~tmp__6));
                                method_CLKM(runtime, 122, 124);
                                break;
                            }
                        case 24:
                            {
                                members.m_dst = ((0) >>> 0);
                                members.m_src = ((tmp__6) >>> 0);
                                method_set_CFW(runtime, method_SUBX(runtime));
                                method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                method_CLKM(runtime, 122, 124);
                                break;
                            }
                        case 32:
                            {
                                uresult__1 = ((((runtime.readIndex(h_m_regs.w, 0)) * (tmp__6))) >>> 0);
                                runtime.writeIndex(h_m_regs.w, 0, ((uresult__1) & (65535)));
                                runtime.writeIndex(h_m_regs.w, 2, ((((uresult__1) >>> 0)) >>> (16)));
                                members.m_CarryVal = (((members.m_OverVal = ((((((Number(runtime.readIndex(h_m_regs.w, 2)) !== Number(0)) ? 1 : 0)) ? (1) : (0))) >>> 0))) >>> 0);
                                method_set_ZF(runtime, ((runtime.readIndex(h_m_regs.w, 0)) | (runtime.readIndex(h_m_regs.w, 2))));
                                method_CLKM(runtime, 102, 104);
                                break;
                            }
                        case 40:
                            {
                                result__1 = ((((((((runtime.readIndex(h_m_regs.w, 0)) << 16 >> 16)) | 0)) * (((((tmp__6) << 16 >> 16)) | 0)))) | 0);
                                runtime.writeIndex(h_m_regs.w, 0, ((result__1) & (65535)));
                                runtime.writeIndex(h_m_regs.w, 2, runtime.shiftRight(result__1, 16));
                                members.m_CarryVal = (((members.m_OverVal = ((((((Number(runtime.readIndex(h_m_regs.w, 2)) !== Number(0)) ? 1 : 0)) ? (1) : (0))) >>> 0))) >>> 0);
                                method_set_ZF(runtime, ((runtime.readIndex(h_m_regs.w, 0)) | (runtime.readIndex(h_m_regs.w, 2))));
                                method_CLKM(runtime, 106, 108);
                                break;
                            }
                        case 48:
                            {
                                if (tmp__6) {
                                    uresult__1 = ((((((((runtime.readIndex(h_m_regs.w, 2)) >>> 0)) << (16))) | (runtime.readIndex(h_m_regs.w, 0)))) >>> 0);
                                    uresult2__1 = ((((uresult__1) % (tmp__6))) >>> 0);
                                    uresult__1 = ((((uresult__1) / (tmp__6))) >>> 0);
                                    if ((((uresult__1) > (65535)) ? 1 : 0)) {
                                        method_interrupt(runtime, 0);
                                    }
                                    else {
                                        runtime.writeIndex(h_m_regs.w, 0, uresult__1);
                                        runtime.writeIndex(h_m_regs.w, 2, uresult2__1);
                                        method_set_ZF(runtime, runtime.readIndex(h_m_regs.w, 0));
                                    }
                                }
                                else {
                                    method_interrupt(runtime, 0);
                                }
                                method_CLKM(runtime, 110, 112);
                                break;
                            }
                        case 56:
                            {
                                if (tmp__6) {
                                    result__1 = ((__add_common_op(runtime, ((((runtime.readIndex(h_m_regs.w, 2)) >>> 0)) << (16)), runtime.readIndex(h_m_regs.w, 0))) | 0);
                                    result2__1 = ((((result__1) % (((((tmp__6) << 16 >> 16)) | 0)))) | 0);
                                    result__1 = ((((result__1) / (((((tmp__6) << 16 >> 16)) | 0)))) | 0);
                                    let lower_bound = (((((members.m_MF ?? 0)) ? (-32767) : (-32768))) | 0);
                                    if (((((((result__1) > (32767)) ? 1 : 0)) || ((((result__1) < (lower_bound)) ? 1 : 0))) ? 1 : 0)) {
                                        method_interrupt(runtime, 0);
                                    }
                                    else {
                                        runtime.writeIndex(h_m_regs.w, 0, result__1);
                                        runtime.writeIndex(h_m_regs.w, 2, result2__1);
                                        method_set_ZF(runtime, runtime.readIndex(h_m_regs.w, 0));
                                    }
                                }
                                else {
                                    method_interrupt(runtime, 0);
                                }
                                method_CLKM(runtime, 114, 116);
                                break;
                            }
                    }
                    break;
                }
            case 248:
                {
                    members.m_CarryVal = ((0) >>> 0);
                    method_CLK(runtime, 7);
                    break;
                }
            case 249:
                {
                    members.m_CarryVal = ((1) >>> 0);
                    method_CLK(runtime, 7);
                    break;
                }
            case 250:
                {
                    members.m_IF = ((0) & 0xff);
                    method_CLK(runtime, 7);
                    break;
                }
            case 251:
                {
                    members.m_IF = ((1) & 0xff);
                    members.m_no_interrupt = ((1) & 0xff);
                    method_CLK(runtime, 7);
                    break;
                }
            case 252:
                {
                    members.m_DF = ((0) & 0xff);
                    method_CLK(runtime, 7);
                    break;
                }
            case 253:
                {
                    members.m_DF = ((1) & 0xff);
                    method_CLK(runtime, 7);
                    break;
                }
            case 254:
                {
                    let tmp__7 = ((0) >>> 0);
                    let tmp1__1 = ((0) >>> 0);
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    tmp__7 = ((method_GetRMByte(runtime)) >>> 0);
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                            {
                                tmp1__1 = ((((tmp__7) + (1))) >>> 0);
                                members.m_OverVal = (((((tmp__7) === (127)) ? 1 : 0)) >>> 0);
                                method_set_AF(runtime, tmp1__1, tmp__7, 1);
                                method_set_SZPF_Byte(runtime, tmp1__1);
                                method_PutbackRMByte(runtime, tmp1__1);
                                method_CLKM(runtime, 117, 119);
                                break;
                            }
                        case 8:
                            {
                                tmp1__1 = ((((tmp__7) - (1))) >>> 0);
                                members.m_OverVal = (((((tmp__7) === (128)) ? 1 : 0)) >>> 0);
                                method_set_AF(runtime, tmp1__1, tmp__7, 1);
                                method_set_SZPF_Byte(runtime, tmp1__1);
                                method_PutbackRMByte(runtime, tmp1__1);
                                method_CLKM(runtime, 117, 119);
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    break;
                }
            case 255:
                {
                    let tmp__8 = ((0) >>> 0);
                    let tmp1__2 = ((0) >>> 0);
                    members.m_modrm = ((method_fetch(runtime)) & 0xff);
                    tmp__8 = ((method_GetRMWord(runtime)) >>> 0);
                    switch ((((members.m_modrm ?? 0)) & (56))) {
                        case 0:
                            {
                                tmp1__2 = ((((tmp__8) + (1))) >>> 0);
                                members.m_OverVal = (((((tmp__8) === (32767)) ? 1 : 0)) >>> 0);
                                method_set_AF(runtime, tmp1__2, tmp__8, 1);
                                method_set_SZPF_Word(runtime, tmp1__2);
                                method_PutbackRMWord(runtime, tmp1__2);
                                method_CLKM(runtime, 118, 120);
                                break;
                            }
                        case 8:
                            {
                                tmp1__2 = ((((tmp__8) - (1))) >>> 0);
                                members.m_OverVal = (((((tmp__8) === (32768)) ? 1 : 0)) >>> 0);
                                method_set_AF(runtime, tmp1__2, tmp__8, 1);
                                method_set_SZPF_Word(runtime, tmp1__2);
                                method_PutbackRMWord(runtime, tmp1__2);
                                method_CLKM(runtime, 118, 120);
                                break;
                            }
                        case 16:
                            {
                                method_PUSH(runtime, (members.m_ip ?? 0));
                                members.m_ip = ((tmp__8) & 0xffff);
                                method_CLKM(runtime, 32, 33);
                                break;
                            }
                        case 24:
                            {
                                tmp1__2 = ((h_m_sregs[1]) >>> 0);
                                h_m_sregs[1] = method_GetnextRMWord(runtime);
                                method_PUSH(runtime, tmp1__2);
                                method_PUSH(runtime, (members.m_ip ?? 0));
                                members.m_ip = ((tmp__8) & 0xffff);
                                method_CLK(runtime, 34);
                                break;
                            }
                        case 32:
                            {
                                members.m_ip = ((tmp__8) & 0xffff);
                                method_CLKM(runtime, 27, 28);
                                break;
                            }
                        case 40:
                            {
                                members.m_ip = ((tmp__8) & 0xffff);
                                h_m_sregs[1] = method_GetnextRMWord(runtime);
                                method_CLK(runtime, 29);
                                break;
                            }
                        case 48:
                            {
                                method_PUSH(runtime, tmp__8);
                                method_CLKM(runtime, 78, 79);
                                break;
                            }
                        default:
                            {
                                members.m_icount = ((((members.m_icount) - (10))) | 0);
                                0;
                                break;
                            }
                    }
                    break;
                }
            default:
                {
                    return 0;
                }
        }
        return 1;
    }
    function __add_common_op(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_DEF_br8(runtime) {
        const members = runtime.members;
        members.m_modrm = ((method_fetch(runtime)) & 0xff);
        members.m_src = ((method_RegByte__0(runtime)) >>> 0);
        members.m_dst = ((method_GetRMByte(runtime)) >>> 0);
    }
    function method_fetch(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_or8"];
        let __t0;
        let data = ((0) & 0xff);
        data = (((typeof (__t0 = members.m_or8) === 'function' ? __t0(method_update_pc(runtime)) : ((__L0 ?? globalThis.mamekitMissingCall?.("m_or8")) ? __L0(method_update_pc(runtime)) : runtime.macro("m_or8", method_update_pc(runtime))))) & 0xff);
        members.m_ip = ((((members.m_ip) + (1))) & 0xffff);
        return ((data) & 0xff);
    }
    function method_update_pc(runtime) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        return (((members.m_pc = ((((((h_m_sregs[1]) << (4))) + ((members.m_ip ?? 0)))) >>> 0))) >>> 0);
    }
    function method_RegByte__0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        return runtime.readIndex(h_m_regs.b, h_m_Mod_RM.reg.b[(members.m_modrm ?? 0)]);
    }
    function method_GetRMByte(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
            return ((runtime.readIndex(h_m_regs.b, h_m_Mod_RM.RM.b[(members.m_modrm ?? 0)])) & 0xff);
        }
        else {
            return ((method_read_byte(runtime, method_get_ea(runtime, 1, 0))) & 0xff);
        }
    }
    function method_get_ea(runtime, size, op) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_ea_timing = members.m_ea_timing ?? 0;
        let e16 = ((0) & 0xffff);
        let modrm = (((((members.m_modrm ?? 0)) & (199))) & 0xff);
        switch (modrm) {
            case 0:
                {
                    members.m_eo = ((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 3), runtime.readIndex(h_m_regs.w, 6))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 1:
                {
                    members.m_eo = ((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 3), runtime.readIndex(h_m_regs.w, 7))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 2:
                {
                    members.m_eo = ((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 5), runtime.readIndex(h_m_regs.w, 6))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 2, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 3:
                {
                    members.m_eo = ((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 5), runtime.readIndex(h_m_regs.w, 7))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 2, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 4:
                {
                    members.m_eo = ((runtime.readIndex(h_m_regs.w, 6)) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 5:
                {
                    members.m_eo = ((runtime.readIndex(h_m_regs.w, 7)) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 6:
                {
                    members.m_eo = ((method_fetch_word(runtime)) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 7:
                {
                    members.m_eo = ((runtime.readIndex(h_m_regs.w, 3)) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 64:
                {
                    members.m_eo = ((((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 3), runtime.readIndex(h_m_regs.w, 6))) + (((method_fetch(runtime)) << 24 >> 24)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 65:
                {
                    members.m_eo = ((((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 3), runtime.readIndex(h_m_regs.w, 7))) + (((method_fetch(runtime)) << 24 >> 24)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 66:
                {
                    members.m_eo = ((((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 5), runtime.readIndex(h_m_regs.w, 6))) + (((method_fetch(runtime)) << 24 >> 24)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 2, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 67:
                {
                    members.m_eo = ((((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 5), runtime.readIndex(h_m_regs.w, 7))) + (((method_fetch(runtime)) << 24 >> 24)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 2, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 68:
                {
                    members.m_eo = ((((runtime.readIndex(h_m_regs.w, 6)) + (((method_fetch(runtime)) << 24 >> 24)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 69:
                {
                    members.m_eo = ((((runtime.readIndex(h_m_regs.w, 7)) + (((method_fetch(runtime)) << 24 >> 24)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 70:
                {
                    members.m_eo = ((((runtime.readIndex(h_m_regs.w, 5)) + (((method_fetch(runtime)) << 24 >> 24)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 2, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 71:
                {
                    members.m_eo = ((((runtime.readIndex(h_m_regs.w, 3)) + (((method_fetch(runtime)) << 24 >> 24)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 128:
                {
                    e16 = ((method_fetch_word(runtime)) & 0xffff);
                    members.m_eo = ((((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 3), runtime.readIndex(h_m_regs.w, 6))) + (((e16) << 16 >> 16)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 129:
                {
                    e16 = ((method_fetch_word(runtime)) & 0xffff);
                    members.m_eo = ((((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 3), runtime.readIndex(h_m_regs.w, 7))) + (((e16) << 16 >> 16)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 130:
                {
                    e16 = ((method_fetch_word(runtime)) & 0xffff);
                    members.m_eo = ((((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 5), runtime.readIndex(h_m_regs.w, 6))) + (((e16) << 16 >> 16)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 2, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 131:
                {
                    e16 = ((method_fetch_word(runtime)) & 0xffff);
                    members.m_eo = ((((__add_get_ea(runtime, runtime.readIndex(h_m_regs.w, 5), runtime.readIndex(h_m_regs.w, 7))) + (((e16) << 16 >> 16)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 2, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 132:
                {
                    e16 = ((method_fetch_word(runtime)) & 0xffff);
                    members.m_eo = ((((runtime.readIndex(h_m_regs.w, 6)) + (((e16) << 16 >> 16)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 133:
                {
                    e16 = ((method_fetch_word(runtime)) & 0xffff);
                    members.m_eo = ((((runtime.readIndex(h_m_regs.w, 7)) + (((e16) << 16 >> 16)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 134:
                {
                    e16 = ((method_fetch_word(runtime)) & 0xffff);
                    members.m_eo = ((((runtime.readIndex(h_m_regs.w, 5)) + (((e16) << 16 >> 16)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 2, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
            case 135:
                {
                    e16 = ((method_fetch_word(runtime)) & 0xffff);
                    members.m_eo = ((((runtime.readIndex(h_m_regs.w, 3)) + (((e16) << 16 >> 16)))) & 0xffff);
                    members.m_ea = ((method_calc_addr(runtime, 3, (members.m_eo ?? 0), size, op)) >>> 0);
                    break;
                }
        }
        members.m_icount = ((((members.m_icount) - (h_m_ea_timing[modrm]))) | 0);
        return (((members.m_ea ?? 0)) >>> 0);
    }
    function __add_get_ea(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_calc_addr(runtime, seg, offset, size, op, override = 1) {
        const members = runtime.members;
        offset = ((offset) & 0xffff);
        const h_m_sregs = members.m_sregs ?? 0;
        if ((((((((members.m_seg_prefix ?? 0)) && ((((((Number(seg) === Number(3)) ? 1 : 0)) || (((Number(seg) === Number(2)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (override)) ? 1 : 0)) {
            members.m_easeg = (((members.m_seg_prefix ?? 0)) | 0);
            return ((((((h_m_sregs[(members.m_prefix_seg ?? 0)]) << (4))) + (offset))) >>> 0);
        }
        else {
            members.m_easeg = ((seg) | 0);
            return ((((((h_m_sregs[seg]) << (4))) + (offset))) >>> 0);
        }
    }
    function method_fetch_word(runtime) {
        const members = runtime.members;
        let data = ((method_fetch(runtime)) & 0xffff);
        data = ((((data) | (((method_fetch(runtime)) << (8))))) & 0xffff);
        return ((data) & 0xffff);
    }
    function method_set_CFB(runtime, x) {
        const members = runtime.members;
        members.m_CarryVal = ((((x) & (256))) >>> 0);
    }
    function method_ADDB(runtime, c = 0) {
        const members = runtime.members;
        c = ((c) & 0xff);
        let res = (((((((members.m_dst ?? 0)) + ((members.m_src ?? 0)))) + (c))) >>> 0);
        method_set_OFB_Add(runtime, res, (members.m_src ?? 0), (members.m_dst ?? 0));
        method_set_AF(runtime, res, (members.m_src ?? 0), (members.m_dst ?? 0));
        method_set_SZPF_Byte(runtime, res);
        members.m_dst = ((((res) & (255))) >>> 0);
        return ((res) >>> 0);
    }
    function method_set_OFB_Add(runtime, x, y, z) {
        const members = runtime.members;
        members.m_OverVal = ((((((((x) ^ (y))) & (((x) ^ (z))))) & (128))) >>> 0);
    }
    function method_set_AF(runtime, x, y, z) {
        const members = runtime.members;
        members.m_AuxVal = ((((((x) ^ (((y) ^ (z))))) & (16))) >>> 0);
    }
    function method_set_SZPF_Byte(runtime, x) {
        const members = runtime.members;
        members.m_SignVal = (((members.m_ZeroVal = (((members.m_ParityVal = ((((x) << 24 >> 24)) >>> 0))) >>> 0))) | 0);
    }
    function method_PutbackRMByte(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
            runtime.writeIndex(h_m_regs.b, h_m_Mod_RM.RM.b[(members.m_modrm ?? 0)], data);
        }
        else {
            method_write_byte(runtime, (members.m_ea ?? 0), data);
        }
    }
    function method_write_byte(runtime, addr, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_write_byte(runtime, method_sreg_to_space(runtime, (members.m_easeg ?? 0))).write_byte?.(addr, data) ?? 0);
    }
    function __deref_write_byte(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_CLKM(runtime, op_reg, op_mem) {
        const members = runtime.members;
        op_reg = ((op_reg) & 0xff);
        op_mem = ((op_mem) & 0xff);
        const h_m_timing = members.m_timing ?? 0;
        members.m_icount = ((((members.m_icount) - (((((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) ? (h_m_timing[op_reg]) : (h_m_timing[op_mem]))))) | 0);
    }
    function method_DEF_wr16(runtime) {
        const members = runtime.members;
        members.m_modrm = ((method_fetch(runtime)) & 0xff);
        members.m_src = ((method_RegWord__0(runtime)) >>> 0);
        members.m_dst = ((method_GetRMWord(runtime)) >>> 0);
    }
    function method_RegWord__0(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        return runtime.readIndex(h_m_regs.w, h_m_Mod_RM.reg.w[(members.m_modrm ?? 0)]);
    }
    function method_GetRMWord(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
            return ((runtime.readIndex(h_m_regs.w, h_m_Mod_RM.RM.w[(members.m_modrm ?? 0)])) & 0xffff);
        }
        else {
            return ((method_read_word(runtime, method_get_ea(runtime, 2, 0))) & 0xffff);
        }
    }
    function method_set_CFW(runtime, x) {
        const members = runtime.members;
        members.m_CarryVal = ((((x) & (65536))) >>> 0);
    }
    function method_ADDX(runtime, c = 0) {
        const members = runtime.members;
        c = ((c) & 0xff);
        let res = (((((((members.m_dst ?? 0)) + ((members.m_src ?? 0)))) + (c))) >>> 0);
        method_set_OFW_Add(runtime, res, (members.m_src ?? 0), (members.m_dst ?? 0));
        method_set_AF(runtime, res, (members.m_src ?? 0), (members.m_dst ?? 0));
        method_set_SZPF_Word(runtime, res);
        members.m_dst = ((((res) & (65535))) >>> 0);
        return ((res) >>> 0);
    }
    function method_set_OFW_Add(runtime, x, y, z) {
        const members = runtime.members;
        members.m_OverVal = ((((((((x) ^ (y))) & (((x) ^ (z))))) & (32768))) >>> 0);
    }
    function method_set_SZPF_Word(runtime, x) {
        const members = runtime.members;
        members.m_SignVal = (((members.m_ZeroVal = (((members.m_ParityVal = ((((x) << 16 >> 16)) >>> 0))) >>> 0))) | 0);
    }
    function method_PutbackRMWord(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
            runtime.writeIndex(h_m_regs.w, h_m_Mod_RM.RM.w[(members.m_modrm ?? 0)], data);
        }
        else {
            method_write_word(runtime, (members.m_ea ?? 0), data);
        }
    }
    function method_write_word(runtime, addr, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        (__deref_write_word(runtime, method_sreg_to_space(runtime, (members.m_easeg ?? 0))).write_word_unaligned?.(addr, data) ?? 0);
    }
    function __deref_write_word(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_DEF_r8b(runtime) {
        const members = runtime.members;
        members.m_modrm = ((method_fetch(runtime)) & 0xff);
        members.m_dst = ((method_RegByte__0(runtime)) >>> 0);
        members.m_src = ((method_GetRMByte(runtime)) >>> 0);
    }
    function method_RegByte__1(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        runtime.writeIndex(h_m_regs.b, h_m_Mod_RM.reg.b[(members.m_modrm ?? 0)], data);
    }
    function method_DEF_r16w(runtime) {
        const members = runtime.members;
        members.m_modrm = ((method_fetch(runtime)) & 0xff);
        members.m_dst = ((method_RegWord__0(runtime)) >>> 0);
        members.m_src = ((method_GetRMWord(runtime)) >>> 0);
    }
    function method_RegWord__1(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        runtime.writeIndex(h_m_regs.w, h_m_Mod_RM.reg.w[(members.m_modrm ?? 0)], data);
    }
    function method_DEF_ald8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        members.m_src = ((method_fetch(runtime)) >>> 0);
        members.m_dst = ((runtime.readIndex(h_m_regs.b, 0)) >>> 0);
    }
    function method_CLK(runtime, op) {
        const members = runtime.members;
        op = ((op) & 0xff);
        const h_m_timing = members.m_timing ?? 0;
        members.m_icount = ((((members.m_icount) - (h_m_timing[op]))) | 0);
    }
    function method_DEF_axd16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        members.m_src = ((method_fetch_word(runtime)) >>> 0);
        members.m_dst = ((runtime.readIndex(h_m_regs.w, 0)) >>> 0);
    }
    function method_PUSH(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        const h_m_regs = members.m_regs ?? 0;
        method_write_word(runtime, method_calc_addr(runtime, 2, ((runtime.readIndex(h_m_regs.w, 4)) - (2)), 2, 1, 0), data);
        runtime.writeIndex(h_m_regs.w, 4, ((runtime.readIndex(h_m_regs.w, 4)) - (2)));
    }
    function method_POP(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let data = ((method_read_word(runtime, method_calc_addr(runtime, 2, runtime.readIndex(h_m_regs.w, 4), 2, 0, 0))) & 0xffff);
        runtime.writeIndex(h_m_regs.w, 4, ((runtime.readIndex(h_m_regs.w, 4)) + (2)));
        return ((data) & 0xffff);
    }
    function method_ORB(runtime) {
        const members = runtime.members;
        members.m_dst = ((((members.m_dst) | ((members.m_src ?? 0)))) >>> 0);
        members.m_CarryVal = (((members.m_OverVal = (((members.m_AuxVal = ((0) >>> 0))) >>> 0))) >>> 0);
        method_set_SZPF_Byte(runtime, (members.m_dst ?? 0));
    }
    function method_ORW(runtime) {
        const members = runtime.members;
        members.m_dst = ((((members.m_dst) | ((members.m_src ?? 0)))) >>> 0);
        members.m_CarryVal = (((members.m_OverVal = (((members.m_AuxVal = ((0) >>> 0))) >>> 0))) >>> 0);
        method_set_SZPF_Word(runtime, (members.m_dst ?? 0));
    }
    function method_SUBB(runtime, b = 0) {
        const members = runtime.members;
        b = ((b) & 0xff);
        let res = (((((((members.m_dst ?? 0)) - ((members.m_src ?? 0)))) - (b))) >>> 0);
        method_set_OFB_Sub(runtime, res, (members.m_src ?? 0), (members.m_dst ?? 0));
        method_set_AF(runtime, res, (members.m_src ?? 0), (members.m_dst ?? 0));
        method_set_SZPF_Byte(runtime, res);
        members.m_dst = ((((res) & (255))) >>> 0);
        return ((res) >>> 0);
    }
    function method_set_OFB_Sub(runtime, x, y, z) {
        const members = runtime.members;
        members.m_OverVal = ((((((((z) ^ (y))) & (((z) ^ (x))))) & (128))) >>> 0);
    }
    function method_SUBX(runtime, b = 0) {
        const members = runtime.members;
        b = ((b) & 0xff);
        let res = (((((((members.m_dst ?? 0)) - ((members.m_src ?? 0)))) - (b))) >>> 0);
        method_set_OFW_Sub(runtime, res, (members.m_src ?? 0), (members.m_dst ?? 0));
        method_set_AF(runtime, res, (members.m_src ?? 0), (members.m_dst ?? 0));
        method_set_SZPF_Word(runtime, res);
        members.m_dst = ((((res) & (65535))) >>> 0);
        return ((res) >>> 0);
    }
    function method_set_OFW_Sub(runtime, x, y, z) {
        const members = runtime.members;
        members.m_OverVal = ((((((((z) ^ (y))) & (((z) ^ (x))))) & (32768))) >>> 0);
    }
    function method_ANDB(runtime) {
        const members = runtime.members;
        members.m_dst = ((((members.m_dst) & ((members.m_src ?? 0)))) >>> 0);
        members.m_CarryVal = (((members.m_OverVal = (((members.m_AuxVal = ((0) >>> 0))) >>> 0))) >>> 0);
        method_set_SZPF_Byte(runtime, (members.m_dst ?? 0));
    }
    function method_ANDX(runtime) {
        const members = runtime.members;
        members.m_dst = ((((members.m_dst) & ((members.m_src ?? 0)))) >>> 0);
        members.m_CarryVal = (((members.m_OverVal = (((members.m_AuxVal = ((0) >>> 0))) >>> 0))) >>> 0);
        method_set_SZPF_Word(runtime, (members.m_dst ?? 0));
    }
    function method_ADJ4(runtime, param1, param2) {
        const members = runtime.members;
        param1 = ((param1) << 24 >> 24);
        param2 = ((param2) << 24 >> 24);
        const h_m_regs = members.m_regs ?? 0;
        if ((((((((members.m_AuxVal ?? 0)) !== (0)) ? 1 : 0)) || (((Number(((runtime.readIndex(h_m_regs.b, 0)) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
            let tmp = ((0) & 0xffff);
            tmp = ((((runtime.readIndex(h_m_regs.b, 0)) + (param1))) & 0xffff);
            runtime.writeIndex(h_m_regs.b, 0, tmp);
            members.m_AuxVal = ((1) >>> 0);
            members.m_CarryVal = ((((members.m_CarryVal) | (((tmp) & (256))))) >>> 0);
        }
        if ((((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) || (((Number(runtime.readIndex(h_m_regs.b, 0)) > Number(159)) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(h_m_regs.b, 0, ((runtime.readIndex(h_m_regs.b, 0)) + (param2)));
            members.m_CarryVal = ((1) >>> 0);
        }
        method_set_SZPF_Byte(runtime, runtime.readIndex(h_m_regs.b, 0));
    }
    function method_XORB(runtime) {
        const members = runtime.members;
        members.m_dst = ((((members.m_dst) ^ ((members.m_src ?? 0)))) >>> 0);
        members.m_CarryVal = (((members.m_OverVal = (((members.m_AuxVal = ((0) >>> 0))) >>> 0))) >>> 0);
        method_set_SZPF_Byte(runtime, (members.m_dst ?? 0));
    }
    function method_XORW(runtime) {
        const members = runtime.members;
        members.m_dst = ((((members.m_dst) ^ ((members.m_src ?? 0)))) >>> 0);
        members.m_CarryVal = (((members.m_OverVal = (((members.m_AuxVal = ((0) >>> 0))) >>> 0))) >>> 0);
        method_set_SZPF_Word(runtime, (members.m_dst ?? 0));
    }
    function method_ADJB(runtime, param1, param2) {
        const members = runtime.members;
        param1 = ((param1) << 24 >> 24);
        param2 = ((param2) << 24 >> 24);
        const h_m_regs = members.m_regs ?? 0;
        if ((((((((members.m_AuxVal ?? 0)) !== (0)) ? 1 : 0)) || (((Number(((runtime.readIndex(h_m_regs.b, 0)) & (15))) > Number(9)) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(h_m_regs.b, 0, ((runtime.readIndex(h_m_regs.b, 0)) + (param1)));
            runtime.writeIndex(h_m_regs.b, 1, ((runtime.readIndex(h_m_regs.b, 1)) + (param2)));
            members.m_AuxVal = ((1) >>> 0);
            members.m_CarryVal = ((1) >>> 0);
        }
        else {
            members.m_AuxVal = ((0) >>> 0);
            members.m_CarryVal = ((0) >>> 0);
        }
        runtime.writeIndex(h_m_regs.b, 0, ((runtime.readIndex(h_m_regs.b, 0)) & (15)));
    }
    function method_IncWordReg(runtime, reg) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        let tmp = ((runtime.readIndex(h_m_regs.w, reg)) >>> 0);
        let tmp1 = ((((tmp) + (1))) >>> 0);
        members.m_OverVal = (((((tmp) === (32767)) ? 1 : 0)) >>> 0);
        method_set_AF(runtime, tmp1, tmp, 1);
        method_set_SZPF_Word(runtime, tmp1);
        runtime.writeIndex(h_m_regs.w, reg, tmp1);
    }
    function method_DecWordReg(runtime, reg) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        let tmp = ((runtime.readIndex(h_m_regs.w, reg)) >>> 0);
        let tmp1 = ((((tmp) - (1))) >>> 0);
        members.m_OverVal = (((((tmp) === (32768)) ? 1 : 0)) >>> 0);
        method_set_AF(runtime, tmp1, tmp, 1);
        method_set_SZPF_Word(runtime, tmp1);
        runtime.writeIndex(h_m_regs.w, reg, tmp1);
    }
    function method_JMP(runtime, cond) {
        const members = runtime.members;
        let rel = ((((((method_fetch(runtime)) << 24 >> 24)) | 0)) | 0);
        if (cond) {
            members.m_ip = ((((members.m_ip) + (rel))) & 0xffff);
            method_CLK(runtime, 40);
        }
        else {
            method_CLK(runtime, 39);
        }
    }
    function method_PutRMByte(runtime, val) {
        const members = runtime.members;
        val = ((val) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
            runtime.writeIndex(h_m_regs.b, h_m_Mod_RM.RM.b[(members.m_modrm ?? 0)], val);
        }
        else {
            method_write_byte(runtime, method_get_ea(runtime, 1, 1), val);
        }
    }
    function method_PutRMWord(runtime, val) {
        const members = runtime.members;
        val = ((val) & 0xffff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
            runtime.writeIndex(h_m_regs.w, h_m_Mod_RM.RM.w[(members.m_modrm ?? 0)], val);
        }
        else {
            method_write_word(runtime, method_get_ea(runtime, 2, 1), val);
        }
    }
    function method_XchgAXReg(runtime, reg) {
        const members = runtime.members;
        reg = ((reg) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        let tmp = ((runtime.readIndex(h_m_regs.w, reg)) & 0xffff);
        runtime.writeIndex(h_m_regs.w, reg, runtime.readIndex(h_m_regs.w, 0));
        runtime.writeIndex(h_m_regs.w, 0, tmp);
    }
    function method_CompressFlags(runtime) {
        const members = runtime.members;
        const h_m_parity_table = members.m_parity_table ?? 0;
        return ((((((((((((((((((((((((((((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))) | (2))) | (((h_m_parity_table[(((members.m_ParityVal ?? 0)) & 0xff)]) ? (4) : (0))))) | (((((((members.m_AuxVal ?? 0)) !== (0)) ? 1 : 0)) ? (16) : (0))))) | (((((((members.m_ZeroVal ?? 0)) === (0)) ? 1 : 0)) ? (64) : (0))))) | (((((((members.m_SignVal ?? 0)) < (0)) ? 1 : 0)) ? (128) : (0))))) | ((((members.m_TF ?? 0)) << (8))))) | ((((members.m_IF ?? 0)) << (9))))) | ((((members.m_DF ?? 0)) << (10))))) | (((((((members.m_OverVal ?? 0)) !== (0)) ? 1 : 0)) << (11))))) | ((((members.m_IOPL ?? 0)) << (12))))) | ((((members.m_NT ?? 0)) << (14))))) | ((((members.m_MF ?? 0)) << (15))))) & 0xffff);
    }
    function method_i_popf(runtime) {
        const members = runtime.members;
        let tmp = ((method_POP(runtime)) >>> 0);
        method_ExpandFlags(runtime, ((tmp) | (61440)));
        method_CLK(runtime, 85);
        if ((members.m_TF ?? 0)) {
            members.m_fire_trap = ((1) & 0xff);
        }
    }
    function method_ExpandFlags(runtime, f) {
        const members = runtime.members;
        f = ((f) & 0xffff);
        members.m_CarryVal = ((((f) & (1))) >>> 0);
        members.m_ParityVal = ((((((f) & (4))) ? 0 : 1)) >>> 0);
        members.m_AuxVal = ((((f) & (16))) >>> 0);
        members.m_ZeroVal = ((((((f) & (64))) ? 0 : 1)) >>> 0);
        members.m_SignVal = ((((((f) & (128))) ? (-1) : (0))) | 0);
        members.m_TF = ((((Number(((f) & (256))) === Number(256)) ? 1 : 0)) & 0xff);
        members.m_IF = ((((Number(((f) & (512))) === Number(512)) ? 1 : 0)) & 0xff);
        members.m_DF = ((((Number(((f) & (1024))) === Number(1024)) ? 1 : 0)) & 0xff);
        members.m_OverVal = ((((f) & (2048))) >>> 0);
        members.m_IOPL = ((((((f) >>> (12))) & (3))) & 0xff);
        members.m_NT = ((((Number(((f) & (16384))) === Number(16384)) ? 1 : 0)) & 0xff);
        members.m_MF = ((((Number(((f) & (32768))) === Number(32768)) ? 1 : 0)) & 0xff);
    }
    function method_GetMemB(runtime, seg, offset) {
        const members = runtime.members;
        offset = ((offset) & 0xffff);
        return ((method_read_byte(runtime, method_calc_addr(runtime, seg, offset, 1, 0))) & 0xff);
    }
    function method_GetMemW(runtime, seg, offset) {
        const members = runtime.members;
        offset = ((offset) & 0xffff);
        return ((method_read_word(runtime, method_calc_addr(runtime, seg, offset, 2, 0))) & 0xffff);
    }
    function method_PutMemB(runtime, seg, offset, data) {
        const members = runtime.members;
        offset = ((offset) & 0xffff);
        data = ((data) & 0xff);
        method_write_byte(runtime, method_calc_addr(runtime, seg, offset, 1, 1), data);
    }
    function method_PutMemW(runtime, seg, offset, data) {
        const members = runtime.members;
        offset = ((offset) & 0xffff);
        data = ((data) & 0xffff);
        method_write_word(runtime, method_calc_addr(runtime, seg, offset, 2, 1), data);
    }
    function method_i_movsb(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let tmp = ((method_GetMemB(runtime, 3, runtime.readIndex(h_m_regs.w, 6))) & 0xff);
        method_PutMemB(runtime, 0, runtime.readIndex(h_m_regs.w, 7), tmp);
        runtime.writeIndex(h_m_regs.w, 7, ((runtime.readIndex(h_m_regs.w, 7)) + (__add_i_movsb(runtime, ((-2) * ((members.m_DF ?? 0))), 1))));
        runtime.writeIndex(h_m_regs.w, 6, ((runtime.readIndex(h_m_regs.w, 6)) + (__add_i_movsb(runtime, ((-2) * ((members.m_DF ?? 0))), 1))));
        method_CLK(runtime, 158);
    }
    function __add_i_movsb(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_i_movsw(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let tmp = ((method_GetMemW(runtime, 3, runtime.readIndex(h_m_regs.w, 6))) & 0xffff);
        method_PutMemW(runtime, 0, runtime.readIndex(h_m_regs.w, 7), tmp);
        runtime.writeIndex(h_m_regs.w, 7, ((runtime.readIndex(h_m_regs.w, 7)) + (__add_i_movsw(runtime, ((-4) * ((members.m_DF ?? 0))), 2))));
        runtime.writeIndex(h_m_regs.w, 6, ((runtime.readIndex(h_m_regs.w, 6)) + (__add_i_movsw(runtime, ((-4) * ((members.m_DF ?? 0))), 2))));
        method_CLK(runtime, 161);
    }
    function __add_i_movsw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_i_cmpsb(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        members.m_src = ((method_GetMemB(runtime, 0, runtime.readIndex(h_m_regs.w, 7))) >>> 0);
        members.m_dst = ((method_GetMemB(runtime, 3, runtime.readIndex(h_m_regs.w, 6))) >>> 0);
        method_set_CFB(runtime, method_SUBB(runtime));
        runtime.writeIndex(h_m_regs.w, 7, ((runtime.readIndex(h_m_regs.w, 7)) + (__add_i_cmpsb(runtime, ((-2) * ((members.m_DF ?? 0))), 1))));
        runtime.writeIndex(h_m_regs.w, 6, ((runtime.readIndex(h_m_regs.w, 6)) + (__add_i_cmpsb(runtime, ((-2) * ((members.m_DF ?? 0))), 1))));
        method_CLK(runtime, 134);
    }
    function __add_i_cmpsb(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_i_cmpsw(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        members.m_src = ((method_GetMemW(runtime, 0, runtime.readIndex(h_m_regs.w, 7))) >>> 0);
        members.m_dst = ((method_GetMemW(runtime, 3, runtime.readIndex(h_m_regs.w, 6))) >>> 0);
        method_set_CFW(runtime, method_SUBX(runtime));
        runtime.writeIndex(h_m_regs.w, 7, ((runtime.readIndex(h_m_regs.w, 7)) + (__add_i_cmpsw(runtime, ((-4) * ((members.m_DF ?? 0))), 2))));
        runtime.writeIndex(h_m_regs.w, 6, ((runtime.readIndex(h_m_regs.w, 6)) + (__add_i_cmpsw(runtime, ((-4) * ((members.m_DF ?? 0))), 2))));
        method_CLK(runtime, 137);
    }
    function __add_i_cmpsw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_i_stosb(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        method_PutMemB(runtime, 0, runtime.readIndex(h_m_regs.w, 7), runtime.readIndex(h_m_regs.b, 0));
        runtime.writeIndex(h_m_regs.w, 7, ((runtime.readIndex(h_m_regs.w, 7)) + (__add_i_stosb(runtime, ((-2) * ((members.m_DF ?? 0))), 1))));
        method_CLK(runtime, 152);
    }
    function __add_i_stosb(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_i_stosw(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        method_PutMemW(runtime, 0, runtime.readIndex(h_m_regs.w, 7), runtime.readIndex(h_m_regs.w, 0));
        runtime.writeIndex(h_m_regs.w, 7, ((runtime.readIndex(h_m_regs.w, 7)) + (__add_i_stosw(runtime, ((-4) * ((members.m_DF ?? 0))), 2))));
        method_CLK(runtime, 155);
    }
    function __add_i_stosw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_i_lodsb(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.b, 0, method_GetMemB(runtime, 3, runtime.readIndex(h_m_regs.w, 6)));
        runtime.writeIndex(h_m_regs.w, 6, ((runtime.readIndex(h_m_regs.w, 6)) + (__add_i_lodsb(runtime, ((-2) * ((members.m_DF ?? 0))), 1))));
        method_CLK(runtime, 146);
    }
    function __add_i_lodsb(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_i_lodsw(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.w, 0, method_GetMemW(runtime, 3, runtime.readIndex(h_m_regs.w, 6)));
        runtime.writeIndex(h_m_regs.w, 6, ((runtime.readIndex(h_m_regs.w, 6)) + (__add_i_lodsw(runtime, ((-4) * ((members.m_DF ?? 0))), 2))));
        method_CLK(runtime, 149);
    }
    function __add_i_lodsw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_i_scasb(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        members.m_src = ((method_GetMemB(runtime, 0, runtime.readIndex(h_m_regs.w, 7))) >>> 0);
        members.m_dst = ((runtime.readIndex(h_m_regs.b, 0)) >>> 0);
        method_set_CFB(runtime, method_SUBB(runtime));
        runtime.writeIndex(h_m_regs.w, 7, ((runtime.readIndex(h_m_regs.w, 7)) + (__add_i_scasb(runtime, ((-2) * ((members.m_DF ?? 0))), 1))));
        method_CLK(runtime, 140);
    }
    function __add_i_scasb(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_i_scasw(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        members.m_src = ((method_GetMemW(runtime, 0, runtime.readIndex(h_m_regs.w, 7))) >>> 0);
        members.m_dst = ((runtime.readIndex(h_m_regs.w, 0)) >>> 0);
        method_set_CFW(runtime, method_SUBX(runtime));
        runtime.writeIndex(h_m_regs.w, 7, ((runtime.readIndex(h_m_regs.w, 7)) + (__add_i_scasw(runtime, ((-4) * ((members.m_DF ?? 0))), 2))));
        method_CLK(runtime, 143);
    }
    function __add_i_scasw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_GetnextRMWord(runtime) {
        const members = runtime.members;
        return ((method_read_word(runtime, __add_GetnextRMWord(runtime, (((members.m_ea ?? 0)) - ((members.m_eo ?? 0))), (((((members.m_eo ?? 0)) + (2))) & (65535))))) & 0xffff);
    }
    function __add_GetnextRMWord(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_PutImmRMByte(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
            runtime.writeIndex(h_m_regs.b, h_m_Mod_RM.RM.b[(members.m_modrm ?? 0)], method_fetch(runtime));
        }
        else {
            let addr = ((method_get_ea(runtime, 1, 1)) >>> 0);
            method_write_byte(runtime, addr, method_fetch(runtime));
        }
    }
    function method_PutImmRMWord(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_Mod_RM = members.m_Mod_RM ?? 0;
        if (((((members.m_modrm ?? 0)) >= (192)) ? 1 : 0)) {
            runtime.writeIndex(h_m_regs.w, h_m_Mod_RM.RM.w[(members.m_modrm ?? 0)], method_fetch_word(runtime));
        }
        else {
            let addr = ((method_get_ea(runtime, 2, 1)) >>> 0);
            method_write_word(runtime, addr, method_fetch_word(runtime));
        }
    }
    function method_interrupt(runtime, int_num, trap = 1) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["standard_irq_callback"];
        const h_m_sregs = members.m_sregs ?? 0;
        method_PUSH(runtime, method_CompressFlags(runtime));
        members.m_TF = (((members.m_IF = ((0) & 0xff))) & 0xff);
        if (((Number(int_num) === Number(-1)) ? 1 : 0)) {
            int_num = (((__L0 ? __L0(0, ((((h_m_sregs[1]) << (4))) + ((members.m_ip ?? 0)))) : runtime.macro("standard_irq_callback", 0, ((((h_m_sregs[1]) << (4))) + ((members.m_ip ?? 0)))))) | 0);
        }
        /* debugger_exception_hook: no effect */
        members.m_easeg = ((1) | 0);
        let dest_off = ((method_read_word(runtime, __add_interrupt(runtime, ((int_num) * (4)), 0))) & 0xffff);
        let dest_seg = ((method_read_word(runtime, __add_interrupt(runtime, ((int_num) * (4)), 2))) & 0xffff);
        method_PUSH(runtime, h_m_sregs[1]);
        method_PUSH(runtime, (members.m_ip ?? 0));
        members.m_prev_ip = (((members.m_ip = ((dest_off) & 0xffff))) & 0xffff);
        h_m_sregs[1] = dest_seg;
    }
    function __add_interrupt(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ROL_BYTE(runtime) {
        const members = runtime.members;
        members.m_CarryVal = (((((members.m_dst ?? 0)) & (128))) >>> 0);
        members.m_dst = (((((((members.m_dst ?? 0)) << (1))) | (((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))))) >>> 0);
    }
    function method_ROR_BYTE(runtime) {
        const members = runtime.members;
        members.m_CarryVal = (((((members.m_dst ?? 0)) & (1))) >>> 0);
        members.m_dst = (((((((members.m_dst ?? 0)) >>> (1))) | (((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (128) : (0))))) >>> 0);
    }
    function method_ROLC_BYTE(runtime) {
        const members = runtime.members;
        members.m_dst = (((((((members.m_dst ?? 0)) << (1))) | (((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))))) >>> 0);
        method_set_CFB(runtime, (members.m_dst ?? 0));
    }
    function method_RORC_BYTE(runtime) {
        const members = runtime.members;
        members.m_dst = ((((members.m_dst) | (((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (256) : (0))))) >>> 0);
        members.m_CarryVal = (((((members.m_dst ?? 0)) & (1))) >>> 0);
        members.m_dst = ((((members.m_dst) >>> (1))) >>> 0);
    }
    function method_SHL_BYTE(runtime, c) {
        const members = runtime.members;
        let __t0;
        c = ((c) & 0xff);
        while ((__t0 = c, c = ((((c) - (1))) & 0xff), __t0)) {
            members.m_dst = ((((members.m_dst) << (1))) >>> 0);
        }
        method_set_CFB(runtime, (members.m_dst ?? 0));
        method_set_SZPF_Byte(runtime, (members.m_dst ?? 0));
        method_PutbackRMByte(runtime, (members.m_dst ?? 0));
    }
    function method_SHR_BYTE(runtime, c) {
        const members = runtime.members;
        let __t0;
        c = ((c) & 0xff);
        while ((__t0 = c, c = ((((c) - (1))) & 0xff), __t0)) {
            members.m_CarryVal = (((((members.m_dst ?? 0)) & (1))) >>> 0);
            members.m_dst = ((((members.m_dst) >>> (1))) >>> 0);
        }
        method_set_SZPF_Byte(runtime, (members.m_dst ?? 0));
        method_PutbackRMByte(runtime, (members.m_dst ?? 0));
    }
    function method_SHRA_BYTE(runtime, c) {
        const members = runtime.members;
        let __t0;
        c = ((c) & 0xff);
        while ((__t0 = c, c = ((((c) - (1))) & 0xff), __t0)) {
            members.m_CarryVal = (((((members.m_dst ?? 0)) & (1))) >>> 0);
            members.m_dst = ((runtime.shiftRight((((members.m_dst ?? 0)) << 24 >> 24), 1)) >>> 0);
        }
        method_set_SZPF_Byte(runtime, (members.m_dst ?? 0));
        method_PutbackRMByte(runtime, (members.m_dst ?? 0));
    }
    function method_ROL_WORD(runtime) {
        const members = runtime.members;
        members.m_CarryVal = (((((members.m_dst ?? 0)) & (32768))) >>> 0);
        members.m_dst = (((((((members.m_dst ?? 0)) << (1))) | (((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))))) >>> 0);
    }
    function method_ROR_WORD(runtime) {
        const members = runtime.members;
        members.m_CarryVal = (((((members.m_dst ?? 0)) & (1))) >>> 0);
        members.m_dst = ((__add_ROR_WORD(runtime, (((members.m_dst ?? 0)) >>> (1)), ((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (32768) : (0)))) >>> 0);
    }
    function __add_ROR_WORD(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ROLC_WORD(runtime) {
        const members = runtime.members;
        members.m_dst = (((((((members.m_dst ?? 0)) << (1))) | (((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (1) : (0))))) >>> 0);
        method_set_CFW(runtime, (members.m_dst ?? 0));
    }
    function method_RORC_WORD(runtime) {
        const members = runtime.members;
        members.m_dst = ((((members.m_dst) | (((((((members.m_CarryVal ?? 0)) !== (0)) ? 1 : 0)) ? (65536) : (0))))) >>> 0);
        members.m_CarryVal = (((((members.m_dst ?? 0)) & (1))) >>> 0);
        members.m_dst = ((((members.m_dst) >>> (1))) >>> 0);
    }
    function method_SHL_WORD(runtime, c) {
        const members = runtime.members;
        let __t0;
        c = ((c) & 0xff);
        while ((__t0 = c, c = ((((c) - (1))) & 0xff), __t0)) {
            members.m_dst = ((((members.m_dst) << (1))) >>> 0);
        }
        method_set_CFW(runtime, (members.m_dst ?? 0));
        method_set_SZPF_Word(runtime, (members.m_dst ?? 0));
        method_PutbackRMWord(runtime, (members.m_dst ?? 0));
    }
    function method_SHR_WORD(runtime, c) {
        const members = runtime.members;
        let __t0;
        c = ((c) & 0xff);
        while ((__t0 = c, c = ((((c) - (1))) & 0xff), __t0)) {
            members.m_CarryVal = (((((members.m_dst ?? 0)) & (1))) >>> 0);
            members.m_dst = ((((members.m_dst) >>> (1))) >>> 0);
        }
        method_set_SZPF_Word(runtime, (members.m_dst ?? 0));
        method_PutbackRMWord(runtime, (members.m_dst ?? 0));
    }
    function method_SHRA_WORD(runtime, c) {
        const members = runtime.members;
        let __t0;
        c = ((c) & 0xff);
        while ((__t0 = c, c = ((((c) - (1))) & 0xff), __t0)) {
            members.m_CarryVal = (((((members.m_dst ?? 0)) & (1))) >>> 0);
            members.m_dst = ((runtime.shiftRight((((members.m_dst ?? 0)) << 16 >> 16), 1)) >>> 0);
        }
        method_set_SZPF_Word(runtime, (members.m_dst ?? 0));
        method_PutbackRMWord(runtime, (members.m_dst ?? 0));
    }
    function method_write_port_word(runtime, port, data) {
        const members = runtime.members;
        port = ((port) & 0xffff);
        data = ((data) & 0xffff);
        (__deref_write_port_word(runtime, members.m_io).write_word_unaligned?.(port, data) ?? 0);
    }
    function __deref_write_port_word(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_repx_op(runtime) {
        const members = runtime.members;
        let next = ((method_fetch_op(runtime)) & 0xff);
        let seg_prefix = ((0) ? 1 : 0);
        let seg = ((0) | 0);
        switch (next) {
            case 38:
                {
                    seg_prefix = ((1) ? 1 : 0);
                    seg = ((0) | 0);
                    break;
                }
            case 46:
                {
                    seg_prefix = ((1) ? 1 : 0);
                    seg = ((1) | 0);
                    break;
                }
            case 54:
                {
                    seg_prefix = ((1) ? 1 : 0);
                    seg = ((2) | 0);
                    break;
                }
            case 62:
                {
                    seg_prefix = ((1) ? 1 : 0);
                    seg = ((3) | 0);
                    break;
                }
        }
        if (seg_prefix) {
            members.m_seg_prefix = ((1) ? 1 : 0);
            members.m_seg_prefix_next = ((1) ? 1 : 0);
            members.m_prefix_seg = ((seg) >>> 0);
            next = ((method_fetch_op(runtime)) & 0xff);
            method_CLK(runtime, 6);
        }
        return ((next) & 0xff);
    }
    function method_fetch_op(runtime) {
        const members = runtime.members;
        return ((method_fetch(runtime)) & 0xff);
    }
    function method_set_ZF(runtime, x) {
        const members = runtime.members;
        members.m_ZeroVal = ((x) >>> 0);
    }
    function method_set_SF(runtime, x) {
        const members = runtime.members;
        members.m_SignVal = ((x) | 0);
    }
    function method_set_PF(runtime, x) {
        const members = runtime.members;
        members.m_ParityVal = ((x) >>> 0);
    }
    function method_lock_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_lock_handler(runtime, members.m_lock_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_lock_handler, "bind"));
    }
    function __deref_lock_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        return ((50) >>> 0);
    }
    function method_execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method_i8086_common_cpu_device__lock_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8086_common_cpu_device__lock_handler(runtime, members.m_lock_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_lock_handler, "bind"));
    }
    function __deref_i8086_common_cpu_device__lock_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8086_common_cpu_device__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_i8086_common_cpu_device__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((50) >>> 0);
    }
    function method_i8086_common_cpu_device__execute_input_edge_triggered(runtime, inputnum) {
        const members = runtime.members;
        return ((Number(inputnum) === Number(-1)) ? 1 : 0);
    }
    function method_i8086_common_cpu_device__read_byte(runtime, addr) {
        const members = runtime.members;
        return (((__deref_i8086_common_cpu_device__read_byte(runtime, members.m_program).read_byte?.(addr) ?? 0)) & 0xff);
    }
    function __deref_i8086_common_cpu_device__read_byte(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8086_common_cpu_device__read_word(runtime, addr) {
        const members = runtime.members;
        return (((__deref_i8086_common_cpu_device__read_word(runtime, members.m_program).read_word_unaligned?.(addr) ?? 0)) & 0xffff);
    }
    function __deref_i8086_common_cpu_device__read_word(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["debugger_instruction_hook"], __L1 = __l["m_esc_opcode_handler"], __L2 = __l["m_esc_data_handler"], __L3 = __l["m_out_if_func"];
        const h_m_sregs = members.m_sregs ?? 0;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_timing = members.m_timing ?? 0;
        let iflag = (((members.m_IF ?? 0)) & 0xff);
        while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0)) {
            if ((members.m_seg_prefix_next ?? 0)) {
                members.m_seg_prefix = ((1) ? 1 : 0);
                members.m_seg_prefix_next = ((0) ? 1 : 0);
            }
            else {
                members.m_prev_ip = (((members.m_ip ?? 0)) & 0xffff);
                members.m_seg_prefix = ((0) ? 1 : 0);
                if (((((members.m_pending_irq ?? 0)) && (((((members.m_no_interrupt ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
                    if ((((members.m_pending_irq ?? 0)) & (2))) {
                        method_interrupt(runtime, 2);
                        members.m_pending_irq = ((((members.m_pending_irq) & (-3))) >>> 0);
                        members.m_halt = ((0) ? 1 : 0);
                    }
                    else {
                        if ((members.m_IF ?? 0)) {
                            method_interrupt(runtime, -1);
                            members.m_halt = ((0) ? 1 : 0);
                        }
                    }
                }
                if ((members.m_halt ?? 0)) {
                    /* debugger_wait_hook: no effect */
                    members.m_icount = ((0) | 0);
                    return;
                }
                if ((members.m_fire_trap ?? 0)) {
                    if ((((((((members.m_fire_trap ?? 0)) >= (2)) ? 1 : 0)) && (((((members.m_no_interrupt ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_fire_trap = ((0) & 0xff);
                        method_interrupt(runtime, 1);
                    }
                    else {
                        members.m_fire_trap = ((((members.m_fire_trap) + (1))) & 0xff);
                    }
                }
                if ((members.m_no_interrupt ?? 0)) {
                    members.m_no_interrupt = ((((members.m_no_interrupt) - (1))) & 0xff);
                }
            }
            if ((((members.m_seg_prefix ?? 0)) ? 0 : 1)) {
                (__L0 ? __L0(method_update_pc(runtime)) : runtime.macro("debugger_instruction_hook", method_update_pc(runtime)));
            }
            let op = ((method_fetch_op(runtime)) & 0xff);
            switch (op) {
                case 15:
                    {
                        h_m_sregs[1] = method_POP(runtime);
                        method_CLK(runtime, 84);
                        break;
                    }
                case 210:
                    {
                        let c = ((0) & 0xff);
                        members.m_modrm = ((method_fetch(runtime)) & 0xff);
                        members.m_src = ((method_GetRMByte(runtime)) >>> 0);
                        members.m_dst = (((members.m_src ?? 0)) >>> 0);
                        c = ((runtime.readIndex(h_m_regs.b, 2)) & 0xff);
                        method_CLKM(runtime, 126, 129);
                        members.m_icount = ((((members.m_icount) - (((h_m_timing[127]) * (c))))) | 0);
                        if (c) {
                            switch ((((members.m_modrm ?? 0)) & (56))) {
                                case 0:
                                    {
                                        do {
                                            method_ROL_BYTE(runtime);
                                            c = ((((c) - (1))) & 0xff);
                                        } while ((((c) > (0)) ? 1 : 0));
                                        method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                        break;
                                    }
                                case 8:
                                    {
                                        do {
                                            method_ROR_BYTE(runtime);
                                            c = ((((c) - (1))) & 0xff);
                                        } while ((((c) > (0)) ? 1 : 0));
                                        method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                        break;
                                    }
                                case 16:
                                    {
                                        do {
                                            method_ROLC_BYTE(runtime);
                                            c = ((((c) - (1))) & 0xff);
                                        } while ((((c) > (0)) ? 1 : 0));
                                        method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                        break;
                                    }
                                case 24:
                                    {
                                        do {
                                            method_RORC_BYTE(runtime);
                                            c = ((((c) - (1))) & 0xff);
                                        } while ((((c) > (0)) ? 1 : 0));
                                        method_PutbackRMByte(runtime, (members.m_dst ?? 0));
                                        break;
                                    }
                                case 48:
                                case 32:
                                    {
                                        method_SHL_BYTE(runtime, c);
                                        break;
                                    }
                                case 40:
                                    {
                                        method_SHR_BYTE(runtime, c);
                                        break;
                                    }
                                case 56:
                                    {
                                        method_SHRA_BYTE(runtime, c);
                                        break;
                                    }
                            }
                        }
                        break;
                    }
                case 211:
                    {
                        let c__1 = ((0) & 0xff);
                        members.m_modrm = ((method_fetch(runtime)) & 0xff);
                        members.m_src = ((method_GetRMWord(runtime)) >>> 0);
                        members.m_dst = (((members.m_src ?? 0)) >>> 0);
                        c__1 = ((runtime.readIndex(h_m_regs.b, 2)) & 0xff);
                        method_CLKM(runtime, 126, 132);
                        members.m_icount = ((((members.m_icount) - (((h_m_timing[127]) * (c__1))))) | 0);
                        if (c__1) {
                            switch ((((members.m_modrm ?? 0)) & (56))) {
                                case 0:
                                    {
                                        do {
                                            method_ROL_WORD(runtime);
                                            c__1 = ((((c__1) - (1))) & 0xff);
                                        } while ((((c__1) > (0)) ? 1 : 0));
                                        method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                        break;
                                    }
                                case 8:
                                    {
                                        do {
                                            method_ROR_WORD(runtime);
                                            c__1 = ((((c__1) - (1))) & 0xff);
                                        } while ((((c__1) > (0)) ? 1 : 0));
                                        method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                        break;
                                    }
                                case 16:
                                    {
                                        do {
                                            method_ROLC_WORD(runtime);
                                            c__1 = ((((c__1) - (1))) & 0xff);
                                        } while ((((c__1) > (0)) ? 1 : 0));
                                        method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                        break;
                                    }
                                case 24:
                                    {
                                        do {
                                            method_RORC_WORD(runtime);
                                            c__1 = ((((c__1) - (1))) & 0xff);
                                        } while ((((c__1) > (0)) ? 1 : 0));
                                        method_PutbackRMWord(runtime, (members.m_dst ?? 0));
                                        break;
                                    }
                                case 48:
                                case 32:
                                    {
                                        method_SHL_WORD(runtime, c__1);
                                        break;
                                    }
                                case 40:
                                    {
                                        method_SHR_WORD(runtime, c__1);
                                        break;
                                    }
                                case 56:
                                    {
                                        method_SHRA_WORD(runtime, c__1);
                                        break;
                                    }
                            }
                        }
                        break;
                    }
                case 216:
                case 217:
                case 218:
                case 219:
                case 220:
                case 221:
                case 222:
                case 223:
                    {
                        (__L1 ? __L1(Number((members.m_pc ?? 0))) : typeof members.m_esc_opcode_handler === 'function' ? members.m_esc_opcode_handler((members.m_pc ?? 0)) : runtime.invoke("m_esc_opcode_handler", (members.m_pc ?? 0)));
                        members.m_modrm = ((method_fetch(runtime)) & 0xff);
                        if (((((members.m_modrm ?? 0)) < (192)) ? 1 : 0)) {
                            (__L2 ? __L2(Number(method_get_ea(runtime, 1, 0))) : typeof members.m_esc_data_handler === 'function' ? members.m_esc_data_handler(method_get_ea(runtime, 1, 0)) : runtime.invoke("m_esc_data_handler", method_get_ea(runtime, 1, 0)));
                        }
                        else {
                            (__L2 ? __L2(Number(0)) : typeof members.m_esc_data_handler === 'function' ? members.m_esc_data_handler(0) : runtime.invoke("m_esc_data_handler", 0));
                        }
                        method_CLK(runtime, 21);
                        break;
                    }
                default:
                    {
                        if (((method_common_op(runtime, op)) ? 0 : 1)) {
                            members.m_icount = ((((members.m_icount) - (10))) | 0);
                            0;
                            break;
                        }
                        break;
                    }
            }
            if ((((iflag) !== ((members.m_IF ?? 0))) ? 1 : 0)) {
                (__L3 ? __L3(Number((((members.m_IF ?? 0)) ? (1) : (0)))) : typeof members.m_out_if_func === 'function' ? members.m_out_if_func((((members.m_IF ?? 0)) ? (1) : (0))) : runtime.invoke("m_out_if_func", (((members.m_IF ?? 0)) ? (1) : (0))));
                iflag = (((members.m_IF ?? 0)) & 0xff);
            }
        }
    }
    function method_if_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_if_handler(runtime, members.m_out_if_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_if_func, "bind"));
    }
    function __deref_if_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_esc_opcode_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_esc_opcode_handler(runtime, members.m_esc_opcode_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_esc_opcode_handler, "bind"));
    }
    function __deref_esc_opcode_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_esc_data_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_esc_data_handler(runtime, members.m_esc_data_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_esc_data_handler, "bind"));
    }
    function __deref_esc_data_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8086_cpu_device__if_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8086_cpu_device__if_handler(runtime, members.m_out_if_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_if_func, "bind"));
    }
    function __deref_i8086_cpu_device__if_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8086_cpu_device__esc_opcode_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8086_cpu_device__esc_opcode_handler(runtime, members.m_esc_opcode_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_esc_opcode_handler, "bind"));
    }
    function __deref_i8086_cpu_device__esc_opcode_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8086_cpu_device__esc_data_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8086_cpu_device__esc_data_handler(runtime, members.m_esc_data_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_esc_data_handler, "bind"));
    }
    function __deref_i8086_cpu_device__esc_data_handler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8086_cpu_device__update_pc(runtime) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        return (((members.m_pc = ((((((h_m_sregs[1]) << (4))) + ((members.m_ip ?? 0)))) >>> 0))) >>> 0);
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        return h_m_sregs[0];
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        h_m_sregs[0] = value;
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        return h_m_sregs[1];
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        h_m_sregs[1] = value;
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        return h_m_sregs[2];
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        h_m_sregs[2] = value;
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        return h_m_sregs[3];
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        h_m_sregs[3] = value;
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        return (members.m_int_vector ?? 0);
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        members.m_int_vector = ((value) >>> 0);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        return (members.m_halt ?? 0);
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        members.m_halt = ((value) ? 1 : 0);
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        return (members.m_ip ?? 0);
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        members.m_ip = ((value) & 0xffff);
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.w, 0);
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.w, 0, value);
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.w, 1);
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.w, 1, value);
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.w, 2);
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.w, 2, value);
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.w, 3);
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.w, 3, value);
    }
    function method___state_read_11(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.w, 4);
    }
    function method___state_write_11(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.w, 4, value);
    }
    function method___state_read_12(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.w, 5);
    }
    function method___state_write_12(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.w, 5, value);
    }
    function method___state_read_13(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.w, 6);
    }
    function method___state_write_13(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.w, 6, value);
    }
    function method___state_read_14(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.w, 7);
    }
    function method___state_write_14(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.w, 7, value);
    }
    function method___state_read_15(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.b, 0);
    }
    function method___state_write_15(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.b, 0, value);
    }
    function method___state_read_16(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.b, 1);
    }
    function method___state_write_16(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.b, 1, value);
    }
    function method___state_read_17(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.b, 2);
    }
    function method___state_write_17(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.b, 2, value);
    }
    function method___state_read_18(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.b, 3);
    }
    function method___state_write_18(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.b, 3, value);
    }
    function method___state_read_19(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.b, 4);
    }
    function method___state_write_19(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.b, 4, value);
    }
    function method___state_read_20(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.b, 5);
    }
    function method___state_write_20(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.b, 5, value);
    }
    function method___state_read_21(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.b, 6);
    }
    function method___state_write_21(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.b, 6, value);
    }
    function method___state_read_22(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return runtime.readIndex(h_m_regs.b, 7);
    }
    function method___state_write_22(runtime, value) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        runtime.writeIndex(h_m_regs.b, 7, value);
    }
    function method___state_read_23(runtime) {
        const members = runtime.members;
        return (members.m_TF ?? 0);
    }
    function method___state_write_23(runtime, value) {
        const members = runtime.members;
        members.m_TF = ((value) & 0xff);
    }
    function method_device_start__lambda0(runtime) {
        const members = runtime.members;
        const h_m_sregs = members.m_sregs ?? 0;
        return ((((h_m_sregs[1]) << (4))) + ((members.m_prev_ip ?? 0)));
    }
    function method_i8086_common_cpu_device__device_start__lambda0(runtime, address) {
        const members = runtime.members;
        return (__deref_i8086_common_cpu_device__device_start__lambda0(runtime, members.m_cache8).read_byte?.(address) ?? 0);
    }
    function __deref_i8086_common_cpu_device__device_start__lambda0(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8086_common_cpu_device__device_start__lambda1(runtime, address) {
        const members = runtime.members;
        return (__deref_i8086_common_cpu_device__device_start__lambda1(runtime, members.m_cache16).read_byte?.(address) ?? 0);
    }
    function __deref_i8086_common_cpu_device__device_start__lambda1(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "state_import": method_state_import,
        "i8086_common_cpu_device::device_start": method_i8086_common_cpu_device__device_start,
        "execute_set_input": method_execute_set_input,
        "get_mode": method_get_mode,
        "read_byte": method_read_byte,
        "sreg_to_space": method_sreg_to_space,
        "read_word": method_read_word,
        "read_port_byte": method_read_port_byte,
        "read_port_word": method_read_port_word,
        "write_port_byte_al": method_write_port_byte_al,
        "swapendian_int16": method_swapendian_int16,
        "common_op": method_common_op,
        "DEF_br8": method_DEF_br8,
        "fetch": method_fetch,
        "update_pc": method_update_pc,
        "RegByte__0": method_RegByte__0,
        "GetRMByte": method_GetRMByte,
        "get_ea": method_get_ea,
        "calc_addr": method_calc_addr,
        "fetch_word": method_fetch_word,
        "set_CFB": method_set_CFB,
        "ADDB": method_ADDB,
        "set_OFB_Add": method_set_OFB_Add,
        "set_AF": method_set_AF,
        "set_SZPF_Byte": method_set_SZPF_Byte,
        "PutbackRMByte": method_PutbackRMByte,
        "write_byte": method_write_byte,
        "CLKM": method_CLKM,
        "DEF_wr16": method_DEF_wr16,
        "RegWord__0": method_RegWord__0,
        "GetRMWord": method_GetRMWord,
        "set_CFW": method_set_CFW,
        "ADDX": method_ADDX,
        "set_OFW_Add": method_set_OFW_Add,
        "set_SZPF_Word": method_set_SZPF_Word,
        "PutbackRMWord": method_PutbackRMWord,
        "write_word": method_write_word,
        "DEF_r8b": method_DEF_r8b,
        "RegByte__1": method_RegByte__1,
        "DEF_r16w": method_DEF_r16w,
        "RegWord__1": method_RegWord__1,
        "DEF_ald8": method_DEF_ald8,
        "CLK": method_CLK,
        "DEF_axd16": method_DEF_axd16,
        "PUSH": method_PUSH,
        "POP": method_POP,
        "ORB": method_ORB,
        "ORW": method_ORW,
        "SUBB": method_SUBB,
        "set_OFB_Sub": method_set_OFB_Sub,
        "SUBX": method_SUBX,
        "set_OFW_Sub": method_set_OFW_Sub,
        "ANDB": method_ANDB,
        "ANDX": method_ANDX,
        "ADJ4": method_ADJ4,
        "XORB": method_XORB,
        "XORW": method_XORW,
        "ADJB": method_ADJB,
        "IncWordReg": method_IncWordReg,
        "DecWordReg": method_DecWordReg,
        "JMP": method_JMP,
        "PutRMByte": method_PutRMByte,
        "PutRMWord": method_PutRMWord,
        "XchgAXReg": method_XchgAXReg,
        "CompressFlags": method_CompressFlags,
        "i_popf": method_i_popf,
        "ExpandFlags": method_ExpandFlags,
        "GetMemB": method_GetMemB,
        "GetMemW": method_GetMemW,
        "PutMemB": method_PutMemB,
        "PutMemW": method_PutMemW,
        "i_movsb": method_i_movsb,
        "i_movsw": method_i_movsw,
        "i_cmpsb": method_i_cmpsb,
        "i_cmpsw": method_i_cmpsw,
        "i_stosb": method_i_stosb,
        "i_stosw": method_i_stosw,
        "i_lodsb": method_i_lodsb,
        "i_lodsw": method_i_lodsw,
        "i_scasb": method_i_scasb,
        "i_scasw": method_i_scasw,
        "GetnextRMWord": method_GetnextRMWord,
        "PutImmRMByte": method_PutImmRMByte,
        "PutImmRMWord": method_PutImmRMWord,
        "interrupt": method_interrupt,
        "ROL_BYTE": method_ROL_BYTE,
        "ROR_BYTE": method_ROR_BYTE,
        "ROLC_BYTE": method_ROLC_BYTE,
        "RORC_BYTE": method_RORC_BYTE,
        "SHL_BYTE": method_SHL_BYTE,
        "SHR_BYTE": method_SHR_BYTE,
        "SHRA_BYTE": method_SHRA_BYTE,
        "ROL_WORD": method_ROL_WORD,
        "ROR_WORD": method_ROR_WORD,
        "ROLC_WORD": method_ROLC_WORD,
        "RORC_WORD": method_RORC_WORD,
        "SHL_WORD": method_SHL_WORD,
        "SHR_WORD": method_SHR_WORD,
        "SHRA_WORD": method_SHRA_WORD,
        "write_port_word": method_write_port_word,
        "repx_op": method_repx_op,
        "fetch_op": method_fetch_op,
        "set_ZF": method_set_ZF,
        "set_SF": method_set_SF,
        "set_PF": method_set_PF,
        "lock_handler": method_lock_handler,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "execute_input_edge_triggered": method_execute_input_edge_triggered,
        "i8086_common_cpu_device::lock_handler": method_i8086_common_cpu_device__lock_handler,
        "i8086_common_cpu_device::execute_min_cycles": method_i8086_common_cpu_device__execute_min_cycles,
        "i8086_common_cpu_device::execute_max_cycles": method_i8086_common_cpu_device__execute_max_cycles,
        "i8086_common_cpu_device::execute_input_edge_triggered": method_i8086_common_cpu_device__execute_input_edge_triggered,
        "i8086_common_cpu_device::read_byte": method_i8086_common_cpu_device__read_byte,
        "i8086_common_cpu_device::read_word": method_i8086_common_cpu_device__read_word,
        "execute_run": method_execute_run,
        "if_handler": method_if_handler,
        "esc_opcode_handler": method_esc_opcode_handler,
        "esc_data_handler": method_esc_data_handler,
        "i8086_cpu_device::if_handler": method_i8086_cpu_device__if_handler,
        "i8086_cpu_device::esc_opcode_handler": method_i8086_cpu_device__esc_opcode_handler,
        "i8086_cpu_device::esc_data_handler": method_i8086_cpu_device__esc_data_handler,
        "i8086_cpu_device::update_pc": method_i8086_cpu_device__update_pc,
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
        "__state_write_21": method___state_write_21,
        "__state_read_22": method___state_read_22,
        "__state_write_22": method___state_write_22,
        "__state_read_23": method___state_read_23,
        "__state_write_23": method___state_write_23,
        "device_start__lambda0": method_device_start__lambda0,
        "i8086_common_cpu_device::device_start__lambda0": method_i8086_common_cpu_device__device_start__lambda0,
        "i8086_common_cpu_device::device_start__lambda1": method_i8086_common_cpu_device__device_start__lambda1
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "access_to_be_redone", "debugger_instruction_hook", "has_space", "m_esc_data_handler", "m_esc_opcode_handler", "m_lock_handler", "m_or8", "m_out_if_func", "save_item", "space", "standard_irq_callback", "total_cycles"];
export const device = definition;
export default device;
