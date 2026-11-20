import deviceData from './mos6526.device.ir.json' with { type: 'json' };
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
    function method_update_pa(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_pa"];
        let pa = (((((members.m_pra ?? 0)) | ((((members.m_pa_in ?? 0)) & ((~(members.m_ddra ?? 0))))))) & 0xff);
        if (((((members.m_pa ?? 0)) !== (pa)) ? 1 : 0)) {
            members.m_pa = ((pa) & 0xff);
            (__L0 ? __L0(Number(0), Number(pa)) : typeof members.m_write_pa === 'function' ? members.m_write_pa(0, pa) : runtime.invoke("m_write_pa", 0, pa));
        }
    }
    function method_update_pb(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_pb"];
        let pb = (((((members.m_prb ?? 0)) | ((((members.m_pb_in ?? 0)) & ((~(members.m_ddrb ?? 0))))))) & 0xff);
        if (((((members.m_cra ?? 0)) >>> (1)) & 1)) {
            let pb6 = ((((((((members.m_cra ?? 0)) >>> (2)) & 1)) ? ((members.m_ta_pb6 ?? 0)) : ((members.m_ta_out ?? 0)))) | 0);
            pb = ((((pb) & (-65))) & 0xff);
            pb = ((((pb) | (((pb6) << (6))))) & 0xff);
        }
        if (((((members.m_crb ?? 0)) >>> (1)) & 1)) {
            let pb7 = ((((((((members.m_crb ?? 0)) >>> (2)) & 1)) ? ((members.m_tb_pb7 ?? 0)) : ((members.m_tb_out ?? 0)))) | 0);
            pb = ((((pb) & (-129))) & 0xff);
            pb = ((((pb) | (((pb7) << (7))))) & 0xff);
        }
        if (((((members.m_pb ?? 0)) !== (pb)) ? 1 : 0)) {
            (__L0 ? __L0(Number(0), Number(pb)) : typeof members.m_write_pb === 'function' ? members.m_write_pb(0, pb) : runtime.invoke("m_write_pb", 0, pb));
            members.m_pb = ((pb) & 0xff);
        }
    }
    function method_set_cra(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_sp"];
        data = ((data) & 0xff);
        if ((((((((((members.m_cra ?? 0)) >>> (0)) & 1)) ? 0 : 1)) && (((data) & (1)))) ? 1 : 0)) {
            members.m_ta_pb6 = ((1) | 0);
        }
        if ((((((((((members.m_cra ?? 0)) >>> (6)) & 1)) ? 0 : 1)) && ((((data) >>> (6)) & 1))) ? 1 : 0)) {
            members.m_bits = ((0) | 0);
            (__L0 ? __L0(Number(1)) : typeof members.m_write_sp === 'function' ? members.m_write_sp(1) : runtime.invoke("m_write_sp", 1));
        }
        if ((((((((members.m_cra ?? 0)) >>> (6)) & 1)) && ((((((data) >>> (6)) & 1)) ? 0 : 1))) ? 1 : 0)) {
            members.m_bits = ((0) | 0);
            (__L0 ? __L0(Number(0)) : typeof members.m_write_sp === 'function' ? members.m_write_sp(0) : runtime.invoke("m_write_sp", 0));
        }
        members.m_cra = ((data) & 0xff);
        method_update_pb(runtime);
    }
    function method_set_crb(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((((((((members.m_crb ?? 0)) >>> (0)) & 1)) ? 0 : 1)) && (((data) & (1)))) ? 1 : 0)) {
            members.m_tb_pb7 = ((1) | 0);
        }
        members.m_crb = ((data) & 0xff);
        method_update_pb(runtime);
    }
    function method_bcd_increment(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        value = ((((value) + (1))) & 0xff);
        if (((Number(((value) & (15))) >= Number(10)) ? 1 : 0)) {
            value = ((((value) + (6))) & 0xff);
        }
        return ((value) & 0xff);
    }
    function method_clock_tod(runtime) {
        const members = runtime.members;
        let subsecond = (((((((members.m_tod ?? 0)) >>> (0))) & 0xff)) & 0xff);
        let second = (((((((members.m_tod ?? 0)) >>> (8))) & 0xff)) & 0xff);
        let minute = (((((((members.m_tod ?? 0)) >>> (16))) & 0xff)) & 0xff);
        let hour = (((((((members.m_tod ?? 0)) >>> (24))) & 0xff)) & 0xff);
        members.m_tod_count = ((((members.m_tod_count) + (1))) | 0);
        if (((Number((members.m_tod_count ?? 0)) === Number(((((((members.m_cra ?? 0)) >>> (7)) & 1)) ? (5) : (6)))) ? 1 : 0)) {
            members.m_tod_count = ((0) | 0);
            subsecond = ((method_bcd_increment(runtime, subsecond)) & 0xff);
            if ((((subsecond) >= (16)) ? 1 : 0)) {
                subsecond = ((0) & 0xff);
                second = ((method_bcd_increment(runtime, second)) & 0xff);
                if ((((second) >= (60)) ? 1 : 0)) {
                    second = ((0) & 0xff);
                    minute = ((method_bcd_increment(runtime, minute)) & 0xff);
                    if ((((minute) >= (96)) ? 1 : 0)) {
                        minute = ((0) & 0xff);
                        let pm = ((((hour) & (128))) | 0);
                        hour = ((((hour) & (31))) & 0xff);
                        if ((((hour) === (11)) ? 1 : 0)) {
                            pm = ((((pm) ^ (128))) | 0);
                        }
                        if ((((hour) === (12)) ? 1 : 0)) {
                            hour = ((0) & 0xff);
                        }
                        hour = ((method_bcd_increment(runtime, hour)) & 0xff);
                        hour = ((((hour) | (pm))) & 0xff);
                    }
                }
            }
        }
        members.m_tod = ((((((((((((subsecond) >>> 0)) << (0))) | (((((second) >>> 0)) << (8))))) | (((((minute) >>> 0)) << (16))))) | (((((hour) >>> 0)) << (24))))) >>> 0);
    }
    function method_read_tod(runtime, offset) {
        const members = runtime.members;
        let shift = ((((8) * (offset))) | 0);
        if ((members.m_tod_latched ?? 0)) {
            return (((((members.m_tod_latch ?? 0)) >>> (shift))) & 0xff);
        }
        else {
            return (((((members.m_tod ?? 0)) >>> (shift))) & 0xff);
        }
    }
    function method_write_tod(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let shift = ((((8) * (offset))) | 0);
        if (((((members.m_crb ?? 0)) >>> (7)) & 1)) {
            members.m_alarm = (((((((members.m_alarm ?? 0)) & ((~((255) << (shift)))))) | (((data) << (shift))))) >>> 0);
        }
        else {
            members.m_tod = (((((((members.m_tod ?? 0)) & ((~((255) << (shift)))))) | (((data) << (shift))))) >>> 0);
        }
    }
    function method_serial_input(runtime) {
        const members = runtime.members;
        members.m_shift = ((((members.m_shift) << (1))) & 0xff);
        members.m_bits = ((((members.m_bits) + (1))) | 0);
        members.m_shift = ((((members.m_shift) | ((members.m_sp ?? 0)))) & 0xff);
        if (((((members.m_bits ?? 0)) === (8)) ? 1 : 0)) {
            members.m_sdr = (((members.m_shift ?? 0)) & 0xff);
            members.m_bits = ((0) | 0);
            members.m_icr = ((((members.m_icr) | (8))) & 0xff);
        }
    }
    function method_clock_ta(runtime) {
        const members = runtime.members;
        if ((members.m_count_a3 ?? 0)) {
            members.m_ta = ((((members.m_ta) - (1))) & 0xffff);
        }
        members.m_ta_out = ((((((members.m_count_a2 ?? 0)) && ((((members.m_ta ?? 0)) ? 0 : 1))) ? 1 : 0)) | 0);
        if ((members.m_ta_out ?? 0)) {
            members.m_ta_pb6 = (((((members.m_ta_pb6 ?? 0)) ? 0 : 1)) | 0);
            if ((((((((members.m_cra ?? 0)) >>> (3)) & 1)) || ((members.m_oneshot_a0 ?? 0))) ? 1 : 0)) {
                members.m_cra = ((((members.m_cra) & (-2))) & 0xff);
                members.m_count_a0 = (((members.m_count_a1 = (((members.m_count_a2 = ((0) | 0))) | 0))) | 0);
            }
            members.m_load_a1 = ((1) | 0);
        }
        if ((members.m_load_a1 ?? 0)) {
            members.m_count_a2 = ((0) | 0);
            members.m_ta = (((members.m_ta_latch ?? 0)) & 0xffff);
        }
    }
    function method_serial_output(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_sp"], __L1 = __l["m_write_cnt"];
        if (((((members.m_ta_out ?? 0)) && (((((members.m_cra ?? 0)) >>> (6)) & 1))) ? 1 : 0)) {
            if (((((((members.m_sdr_empty ?? 0)) ? 0 : 1)) || ((members.m_bits ?? 0))) ? 1 : 0)) {
                if ((members.m_cnt ?? 0)) {
                    if (((((members.m_bits ?? 0)) === (0)) ? 1 : 0)) {
                        members.m_sdr_empty = ((1) ? 1 : 0);
                        members.m_shift = (((members.m_sdr ?? 0)) & 0xff);
                    }
                    members.m_sp = ((((((members.m_shift ?? 0)) >>> (7)) & 1)) | 0);
                    (__L0 ? __L0(Number((members.m_sp ?? 0))) : typeof members.m_write_sp === 'function' ? members.m_write_sp((members.m_sp ?? 0)) : runtime.invoke("m_write_sp", (members.m_sp ?? 0)));
                    members.m_shift = ((((members.m_shift) << (1))) & 0xff);
                    members.m_bits = ((((members.m_bits) + (1))) | 0);
                    if (((((members.m_bits ?? 0)) === (8)) ? 1 : 0)) {
                        members.m_icr = ((((members.m_icr) | (8))) & 0xff);
                    }
                }
                else {
                    if (((((members.m_bits ?? 0)) === (8)) ? 1 : 0)) {
                        members.m_bits = ((0) | 0);
                    }
                }
                members.m_cnt = (((((members.m_cnt ?? 0)) ? 0 : 1)) | 0);
                (__L1 ? __L1(Number((members.m_cnt ?? 0))) : typeof members.m_write_cnt === 'function' ? members.m_write_cnt((members.m_cnt ?? 0)) : runtime.invoke("m_write_cnt", (members.m_cnt ?? 0)));
            }
        }
    }
    function method_clock_tb(runtime) {
        const members = runtime.members;
        if ((members.m_count_b3 ?? 0)) {
            members.m_tb = ((((members.m_tb) - (1))) & 0xffff);
        }
        members.m_tb_out = ((((((members.m_count_b2 ?? 0)) && ((((members.m_tb ?? 0)) ? 0 : 1))) ? 1 : 0)) | 0);
        if ((members.m_tb_out ?? 0)) {
            members.m_tb_pb7 = (((((members.m_tb_pb7 ?? 0)) ? 0 : 1)) | 0);
            if ((((((((members.m_crb ?? 0)) >>> (3)) & 1)) || ((members.m_oneshot_b0 ?? 0))) ? 1 : 0)) {
                members.m_crb = ((((members.m_crb) & (-2))) & 0xff);
                members.m_count_b0 = (((members.m_count_b1 = (((members.m_count_b2 = ((0) | 0))) | 0))) | 0);
            }
            members.m_load_b1 = ((1) | 0);
        }
        if ((members.m_load_b1 ?? 0)) {
            members.m_count_b2 = ((0) | 0);
            members.m_tb = (((members.m_tb_latch ?? 0)) & 0xffff);
        }
    }
    function method_update_interrupt(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_irq"];
        if (((((((members.m_irq ?? 0)) ? 0 : 1)) && ((members.m_ir1 ?? 0))) ? 1 : 0)) {
            (__L0 ? __L0(Number(1)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(1) : runtime.invoke("m_write_irq", 1));
            members.m_irq = ((1) ? 1 : 0);
        }
        if ((members.m_ta_out ?? 0)) {
            members.m_icr = ((((members.m_icr) | (1))) & 0xff);
        }
        if ((members.m_tb_out ?? 0)) {
            members.m_icr = ((((members.m_icr) | (2))) & 0xff);
        }
    }
    function method_clock_pipeline(runtime) {
        const members = runtime.members;
        members.m_count_a3 = (((members.m_count_a2 ?? 0)) | 0);
        if (((Number(((((members.m_cra ?? 0)) >>> (5)) & 1)) === Number(0)) ? 1 : 0)) {
            members.m_count_a2 = ((1) | 0);
        }
        members.m_count_a2 = ((((members.m_count_a2) & (((((members.m_cra ?? 0)) >>> (0)) & 1)))) | 0);
        members.m_count_a1 = (((members.m_count_a0 ?? 0)) | 0);
        members.m_count_a0 = ((0) | 0);
        members.m_load_a2 = (((members.m_load_a1 ?? 0)) | 0);
        members.m_load_a1 = (((members.m_load_a0 ?? 0)) | 0);
        members.m_load_a0 = ((((((members.m_cra ?? 0)) >>> (4)) & 1)) | 0);
        members.m_cra = ((((members.m_cra) & (-17))) & 0xff);
        members.m_oneshot_a0 = ((((((members.m_cra ?? 0)) >>> (3)) & 1)) | 0);
        members.m_count_b3 = (((members.m_count_b2 ?? 0)) | 0);
        switch (runtime.shiftRight((((members.m_crb ?? 0)) & (96)), 5)) {
            case 0:
                {
                    members.m_count_b2 = ((1) | 0);
                    break;
                }
            case 2:
                {
                    members.m_count_b2 = (((members.m_ta_out ?? 0)) | 0);
                    break;
                }
            case 3:
                {
                    members.m_count_b2 = ((((((members.m_ta_out ?? 0)) && ((members.m_cnt ?? 0))) ? 1 : 0)) | 0);
                    break;
                }
        }
        members.m_count_b2 = ((((members.m_count_b2) & (((((members.m_crb ?? 0)) >>> (0)) & 1)))) | 0);
        members.m_count_b1 = (((members.m_count_b0 ?? 0)) | 0);
        members.m_count_b0 = ((0) | 0);
        members.m_load_b2 = (((members.m_load_b1 ?? 0)) | 0);
        members.m_load_b1 = (((members.m_load_b0 ?? 0)) | 0);
        members.m_load_b0 = ((((((members.m_crb ?? 0)) >>> (4)) & 1)) | 0);
        members.m_crb = ((((members.m_crb) & (-17))) & 0xff);
        members.m_oneshot_b0 = ((((((members.m_crb ?? 0)) >>> (3)) & 1)) | 0);
        if ((members.m_ir0 ?? 0)) {
            members.m_ir1 = ((1) | 0);
        }
        members.m_ir0 = (((((((members.m_icr ?? 0)) & ((members.m_imr ?? 0)))) ? (1) : (0))) | 0);
    }
    function method_synchronize(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_pc"];
        if ((((members.m_pc ?? 0)) ? 0 : 1)) {
            members.m_pc = ((1) | 0);
            (__L0 ? __L0(Number((members.m_pc ?? 0))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? 0)) : runtime.invoke("m_write_pc", (members.m_pc ?? 0)));
        }
        method_clock_ta(runtime);
        method_serial_output(runtime);
        method_clock_tb(runtime);
        method_update_pb(runtime);
        method_update_interrupt(runtime);
        method_clock_pipeline(runtime);
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_hz"], __L1 = __l["NAME"], __L2 = __l["save_item"];
        /* set_icountptr: no effect */
        members.m_flag = ((1) | 0);
        members.m_cnt = ((1) | 0);
        members.m_cra = ((0) & 0xff);
        if (((((members.m_tod_clock ?? 0)) !== (0)) ? 1 : 0)) {
            (__deref_device_start(runtime, members.m_tod_timer).adjust?.((__L0 ? __L0((members.m_tod_clock ?? 0)) : runtime.macro("attotime::from_hz", (members.m_tod_clock ?? 0))), 0, (__L0 ? __L0((members.m_tod_clock ?? 0)) : runtime.macro("attotime::from_hz", (members.m_tod_clock ?? 0)))) ?? 0);
        }
        (__L2 ? __L2((__L1 ? __L1((members.m_ir0 ?? 0)) : runtime.macro("NAME", (members.m_ir0 ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_ir0 ?? 0)) : runtime.macro("NAME", (members.m_ir0 ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_ir1 ?? 0)) : runtime.macro("NAME", (members.m_ir1 ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_ir1 ?? 0)) : runtime.macro("NAME", (members.m_ir1 ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_icr ?? 0)) : runtime.macro("NAME", (members.m_icr ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_icr ?? 0)) : runtime.macro("NAME", (members.m_icr ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_imr ?? 0)) : runtime.macro("NAME", (members.m_imr ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_imr ?? 0)) : runtime.macro("NAME", (members.m_imr ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_pc ?? 0)) : runtime.macro("NAME", (members.m_pc ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_pc ?? 0)) : runtime.macro("NAME", (members.m_pc ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_flag ?? 0)) : runtime.macro("NAME", (members.m_flag ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_flag ?? 0)) : runtime.macro("NAME", (members.m_flag ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_pra ?? 0)) : runtime.macro("NAME", (members.m_pra ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_pra ?? 0)) : runtime.macro("NAME", (members.m_pra ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_prb ?? 0)) : runtime.macro("NAME", (members.m_prb ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_prb ?? 0)) : runtime.macro("NAME", (members.m_prb ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_ddra ?? 0)) : runtime.macro("NAME", (members.m_ddra ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_ddra ?? 0)) : runtime.macro("NAME", (members.m_ddra ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_ddrb ?? 0)) : runtime.macro("NAME", (members.m_ddrb ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_ddrb ?? 0)) : runtime.macro("NAME", (members.m_ddrb ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_sp ?? 0)) : runtime.macro("NAME", (members.m_sp ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_sp ?? 0)) : runtime.macro("NAME", (members.m_sp ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_cnt ?? 0)) : runtime.macro("NAME", (members.m_cnt ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_cnt ?? 0)) : runtime.macro("NAME", (members.m_cnt ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_sdr ?? 0)) : runtime.macro("NAME", (members.m_sdr ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_sdr ?? 0)) : runtime.macro("NAME", (members.m_sdr ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_shift ?? 0)) : runtime.macro("NAME", (members.m_shift ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_shift ?? 0)) : runtime.macro("NAME", (members.m_shift ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_sdr_empty ?? 0)) : runtime.macro("NAME", (members.m_sdr_empty ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_sdr_empty ?? 0)) : runtime.macro("NAME", (members.m_sdr_empty ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_bits ?? 0)) : runtime.macro("NAME", (members.m_bits ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_bits ?? 0)) : runtime.macro("NAME", (members.m_bits ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_ta_out ?? 0)) : runtime.macro("NAME", (members.m_ta_out ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_ta_out ?? 0)) : runtime.macro("NAME", (members.m_ta_out ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_tb_out ?? 0)) : runtime.macro("NAME", (members.m_tb_out ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_tb_out ?? 0)) : runtime.macro("NAME", (members.m_tb_out ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_ta_pb6 ?? 0)) : runtime.macro("NAME", (members.m_ta_pb6 ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_ta_pb6 ?? 0)) : runtime.macro("NAME", (members.m_ta_pb6 ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_tb_pb7 ?? 0)) : runtime.macro("NAME", (members.m_tb_pb7 ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_tb_pb7 ?? 0)) : runtime.macro("NAME", (members.m_tb_pb7 ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_ta ?? 0)) : runtime.macro("NAME", (members.m_ta ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_ta ?? 0)) : runtime.macro("NAME", (members.m_ta ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_tb ?? 0)) : runtime.macro("NAME", (members.m_tb ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_tb ?? 0)) : runtime.macro("NAME", (members.m_tb ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_ta_latch ?? 0)) : runtime.macro("NAME", (members.m_ta_latch ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_ta_latch ?? 0)) : runtime.macro("NAME", (members.m_ta_latch ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_tb_latch ?? 0)) : runtime.macro("NAME", (members.m_tb_latch ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_tb_latch ?? 0)) : runtime.macro("NAME", (members.m_tb_latch ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_cra ?? 0)) : runtime.macro("NAME", (members.m_cra ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_cra ?? 0)) : runtime.macro("NAME", (members.m_cra ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_crb ?? 0)) : runtime.macro("NAME", (members.m_crb ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_crb ?? 0)) : runtime.macro("NAME", (members.m_crb ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_tod_count ?? 0)) : runtime.macro("NAME", (members.m_tod_count ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_tod_count ?? 0)) : runtime.macro("NAME", (members.m_tod_count ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_tod ?? 0)) : runtime.macro("NAME", (members.m_tod ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_tod ?? 0)) : runtime.macro("NAME", (members.m_tod ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_tod_latch ?? 0)) : runtime.macro("NAME", (members.m_tod_latch ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_tod_latch ?? 0)) : runtime.macro("NAME", (members.m_tod_latch ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_alarm ?? 0)) : runtime.macro("NAME", (members.m_alarm ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_alarm ?? 0)) : runtime.macro("NAME", (members.m_alarm ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_tod_stopped ?? 0)) : runtime.macro("NAME", (members.m_tod_stopped ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_tod_stopped ?? 0)) : runtime.macro("NAME", (members.m_tod_stopped ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_tod_latched ?? 0)) : runtime.macro("NAME", (members.m_tod_latched ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_tod_latched ?? 0)) : runtime.macro("NAME", (members.m_tod_latched ?? 0)))));
    }
    function __deref_device_start(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_irq"], __L1 = __l["m_write_pc"], __L2 = __l["m_write_sp"], __L3 = __l["m_write_cnt"];
        members.m_irq = ((0) ? 1 : 0);
        members.m_ir0 = ((0) | 0);
        members.m_ir1 = ((0) | 0);
        members.m_icr = ((0) & 0xff);
        members.m_imr = ((0) & 0xff);
        members.m_pc = ((1) | 0);
        members.m_flag = ((1) | 0);
        members.m_pra = ((0) & 0xff);
        members.m_prb = ((0) & 0xff);
        members.m_ddra = ((0) & 0xff);
        members.m_ddrb = ((0) & 0xff);
        members.m_pa = ((255) & 0xff);
        members.m_pb = ((255) & 0xff);
        members.m_pa_in = ((0) & 0xff);
        members.m_pb_in = ((0) & 0xff);
        members.m_sp = ((1) | 0);
        members.m_cnt = ((1) | 0);
        members.m_sdr = ((0) & 0xff);
        members.m_shift = ((0) & 0xff);
        members.m_sdr_empty = ((1) ? 1 : 0);
        members.m_bits = ((0) | 0);
        members.m_ta_out = ((0) | 0);
        members.m_tb_out = ((0) | 0);
        members.m_ta_pb6 = ((0) | 0);
        members.m_tb_pb7 = ((0) | 0);
        members.m_count_a0 = ((0) | 0);
        members.m_count_a1 = ((0) | 0);
        members.m_count_a2 = ((0) | 0);
        members.m_count_a3 = ((0) | 0);
        members.m_load_a0 = ((0) | 0);
        members.m_load_a1 = ((0) | 0);
        members.m_load_a2 = ((0) | 0);
        members.m_oneshot_a0 = ((0) | 0);
        members.m_count_b0 = ((0) | 0);
        members.m_count_b1 = ((0) | 0);
        members.m_count_b2 = ((0) | 0);
        members.m_count_b3 = ((0) | 0);
        members.m_load_b0 = ((0) | 0);
        members.m_load_b1 = ((0) | 0);
        members.m_load_b2 = ((0) | 0);
        members.m_oneshot_b0 = ((0) | 0);
        members.m_ta = ((65535) & 0xffff);
        members.m_tb = ((65535) & 0xffff);
        members.m_ta_latch = ((65535) & 0xffff);
        members.m_tb_latch = ((65535) & 0xffff);
        members.m_cra = ((0) & 0xff);
        members.m_crb = ((0) & 0xff);
        members.m_tod_count = ((0) | 0);
        members.m_tod = ((16777216) >>> 0);
        members.m_tod_latch = ((0) >>> 0);
        members.m_alarm = ((0) >>> 0);
        members.m_tod_stopped = ((1) ? 1 : 0);
        members.m_tod_latched = ((0) ? 1 : 0);
        (__L0 ? __L0(Number(0)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(0) : runtime.invoke("m_write_irq", 0));
        (__L1 ? __L1(Number((members.m_pc ?? 0))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? 0)) : runtime.invoke("m_write_pc", (members.m_pc ?? 0)));
        (__L2 ? __L2(Number((members.m_sp ?? 0))) : typeof members.m_write_sp === 'function' ? members.m_write_sp((members.m_sp ?? 0)) : runtime.invoke("m_write_sp", (members.m_sp ?? 0)));
        (__L3 ? __L3(Number((members.m_cnt ?? 0))) : typeof members.m_write_cnt === 'function' ? members.m_write_cnt((members.m_cnt ?? 0)) : runtime.invoke("m_write_cnt", (members.m_cnt ?? 0)));
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        do {
            method_synchronize(runtime);
            members.m_icount = ((((members.m_icount) - (1))) | 0);
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_read_pa"], __L3 = __l["m_read_pb"], __L4 = __l["m_write_pc"], __L5 = __l["m_write_irq"];
        let data = ((0) & 0xff);
        switch (((offset) & (15))) {
            case 0:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    if (((((members.m_ddra ?? 0)) !== (255)) ? 1 : 0)) {
                        data = (((((((__L2 ? __L2(Number(0)) : typeof members.m_read_pa === 'function' ? members.m_read_pa(0) : runtime.invoke("m_read_pa", 0))) & ((~(members.m_ddra ?? 0))))) | ((((members.m_pra ?? 0)) & ((members.m_ddra ?? 0)))))) & 0xff);
                    }
                    else {
                        data = (((((__L2 ? __L2(Number(0)) : typeof members.m_read_pa === 'function' ? members.m_read_pa(0) : runtime.invoke("m_read_pa", 0))) & ((members.m_pra ?? 0)))) & 0xff);
                    }
                    members.m_pa_in = ((data) & 0xff);
                    break;
                }
            case 1:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    if (((((members.m_ddrb ?? 0)) !== (255)) ? 1 : 0)) {
                        data = (((((((__L3 ? __L3(Number(0)) : typeof members.m_read_pb === 'function' ? members.m_read_pb(0) : runtime.invoke("m_read_pb", 0))) & ((~(members.m_ddrb ?? 0))))) | ((((members.m_prb ?? 0)) & ((members.m_ddrb ?? 0)))))) & 0xff);
                    }
                    else {
                        data = (((((__L3 ? __L3(Number(0)) : typeof members.m_read_pb === 'function' ? members.m_read_pb(0) : runtime.invoke("m_read_pb", 0))) & ((members.m_prb ?? 0)))) & 0xff);
                    }
                    members.m_pb_in = ((data) & 0xff);
                    if (((((members.m_cra ?? 0)) >>> (1)) & 1)) {
                        let pb6 = ((((((((members.m_cra ?? 0)) >>> (2)) & 1)) ? ((members.m_ta_pb6 ?? 0)) : ((members.m_ta_out ?? 0)))) | 0);
                        data = ((((data) & (-65))) & 0xff);
                        data = ((((data) | (((pb6) << (6))))) & 0xff);
                    }
                    if (((((members.m_crb ?? 0)) >>> (1)) & 1)) {
                        let pb7 = ((((((((members.m_crb ?? 0)) >>> (2)) & 1)) ? ((members.m_tb_pb7 ?? 0)) : ((members.m_tb_out ?? 0)))) | 0);
                        data = ((((data) & (-129))) & 0xff);
                        data = ((((data) | (((pb7) << (7))))) & 0xff);
                    }
                    members.m_pc = ((0) | 0);
                    (__L4 ? __L4(Number((members.m_pc ?? 0))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? 0)) : runtime.invoke("m_write_pc", (members.m_pc ?? 0)));
                    break;
                }
            case 2:
                {
                    data = (((members.m_ddra ?? 0)) & 0xff);
                    break;
                }
            case 3:
                {
                    data = (((members.m_ddrb ?? 0)) & 0xff);
                    break;
                }
            case 4:
                {
                    data = (((((members.m_ta ?? 0)) & (255))) & 0xff);
                    break;
                }
            case 5:
                {
                    data = (((((members.m_ta ?? 0)) >>> (8))) & 0xff);
                    break;
                }
            case 6:
                {
                    data = (((((members.m_tb ?? 0)) & (255))) & 0xff);
                    break;
                }
            case 7:
                {
                    data = (((((members.m_tb ?? 0)) >>> (8))) & 0xff);
                    break;
                }
            case 8:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    data = ((method_read_tod(runtime, 0)) & 0xff);
                    members.m_tod_latched = ((0) ? 1 : 0);
                    break;
                }
            case 9:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    data = ((method_read_tod(runtime, 1)) & 0xff);
                    break;
                }
            case 10:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    data = ((method_read_tod(runtime, 2)) & 0xff);
                    break;
                }
            case 11:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    if ((((members.m_tod_latched ?? 0)) ? 0 : 1)) {
                        members.m_tod_latched = ((1) ? 1 : 0);
                        members.m_tod_latch = (((members.m_tod ?? 0)) >>> 0);
                    }
                    data = ((method_read_tod(runtime, 3)) & 0xff);
                    break;
                }
            case 12:
                {
                    data = (((members.m_sdr ?? 0)) & 0xff);
                    break;
                }
            case 13:
                {
                    data = (((((((members.m_ir1 ?? 0)) << (7))) | ((members.m_icr ?? 0)))) & 0xff);
                    if ((((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) || ((((members.m_icr ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                        return ((data) & 0xff);
                    }
                    members.m_ir0 = ((0) | 0);
                    members.m_ir1 = ((0) | 0);
                    members.m_icr = ((0) & 0xff);
                    members.m_irq = ((0) ? 1 : 0);
                    (__L5 ? __L5(Number(0)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(0) : runtime.invoke("m_write_irq", 0));
                    break;
                }
            case 14:
                {
                    data = (((members.m_cra ?? 0)) & 0xff);
                    break;
                }
            case 15:
                {
                    data = (((members.m_crb ?? 0)) & 0xff);
                    break;
                }
        }
        return ((data) & 0xff);
    }
    function method_mos6526_device__read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_read_pa"], __L3 = __l["m_read_pb"], __L4 = __l["m_write_pc"], __L5 = __l["m_write_irq"];
        let data = ((0) & 0xff);
        switch (((offset) & (15))) {
            case 0:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    if (((((members.m_ddra ?? 0)) !== (255)) ? 1 : 0)) {
                        data = (((((((__L2 ? __L2(Number(0)) : typeof members.m_read_pa === 'function' ? members.m_read_pa(0) : runtime.invoke("m_read_pa", 0))) & ((~(members.m_ddra ?? 0))))) | ((((members.m_pra ?? 0)) & ((members.m_ddra ?? 0)))))) & 0xff);
                    }
                    else {
                        data = (((((__L2 ? __L2(Number(0)) : typeof members.m_read_pa === 'function' ? members.m_read_pa(0) : runtime.invoke("m_read_pa", 0))) & ((members.m_pra ?? 0)))) & 0xff);
                    }
                    members.m_pa_in = ((data) & 0xff);
                    break;
                }
            case 1:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    if (((((members.m_ddrb ?? 0)) !== (255)) ? 1 : 0)) {
                        data = (((((((__L3 ? __L3(Number(0)) : typeof members.m_read_pb === 'function' ? members.m_read_pb(0) : runtime.invoke("m_read_pb", 0))) & ((~(members.m_ddrb ?? 0))))) | ((((members.m_prb ?? 0)) & ((members.m_ddrb ?? 0)))))) & 0xff);
                    }
                    else {
                        data = (((((__L3 ? __L3(Number(0)) : typeof members.m_read_pb === 'function' ? members.m_read_pb(0) : runtime.invoke("m_read_pb", 0))) & ((members.m_prb ?? 0)))) & 0xff);
                    }
                    members.m_pb_in = ((data) & 0xff);
                    if (((((members.m_cra ?? 0)) >>> (1)) & 1)) {
                        let pb6 = ((((((((members.m_cra ?? 0)) >>> (2)) & 1)) ? ((members.m_ta_pb6 ?? 0)) : ((members.m_ta_out ?? 0)))) | 0);
                        data = ((((data) & (-65))) & 0xff);
                        data = ((((data) | (((pb6) << (6))))) & 0xff);
                    }
                    if (((((members.m_crb ?? 0)) >>> (1)) & 1)) {
                        let pb7 = ((((((((members.m_crb ?? 0)) >>> (2)) & 1)) ? ((members.m_tb_pb7 ?? 0)) : ((members.m_tb_out ?? 0)))) | 0);
                        data = ((((data) & (-129))) & 0xff);
                        data = ((((data) | (((pb7) << (7))))) & 0xff);
                    }
                    members.m_pc = ((0) | 0);
                    (__L4 ? __L4(Number((members.m_pc ?? 0))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? 0)) : runtime.invoke("m_write_pc", (members.m_pc ?? 0)));
                    break;
                }
            case 2:
                {
                    data = (((members.m_ddra ?? 0)) & 0xff);
                    break;
                }
            case 3:
                {
                    data = (((members.m_ddrb ?? 0)) & 0xff);
                    break;
                }
            case 4:
                {
                    data = (((((members.m_ta ?? 0)) & (255))) & 0xff);
                    break;
                }
            case 5:
                {
                    data = (((((members.m_ta ?? 0)) >>> (8))) & 0xff);
                    break;
                }
            case 6:
                {
                    data = (((((members.m_tb ?? 0)) & (255))) & 0xff);
                    break;
                }
            case 7:
                {
                    data = (((((members.m_tb ?? 0)) >>> (8))) & 0xff);
                    break;
                }
            case 8:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    data = ((method_read_tod(runtime, 0)) & 0xff);
                    members.m_tod_latched = ((0) ? 1 : 0);
                    break;
                }
            case 9:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    data = ((method_read_tod(runtime, 1)) & 0xff);
                    break;
                }
            case 10:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    data = ((method_read_tod(runtime, 2)) & 0xff);
                    break;
                }
            case 11:
                {
                    if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                        return ((255) & 0xff);
                    }
                    if ((((members.m_tod_latched ?? 0)) ? 0 : 1)) {
                        members.m_tod_latched = ((1) ? 1 : 0);
                        members.m_tod_latch = (((members.m_tod ?? 0)) >>> 0);
                    }
                    data = ((method_read_tod(runtime, 3)) & 0xff);
                    break;
                }
            case 12:
                {
                    data = (((members.m_sdr ?? 0)) & 0xff);
                    break;
                }
            case 13:
                {
                    data = (((((((members.m_ir1 ?? 0)) << (7))) | ((members.m_icr ?? 0)))) & 0xff);
                    if ((((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) || ((((members.m_icr ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                        return ((data) & 0xff);
                    }
                    members.m_ir0 = ((0) | 0);
                    members.m_ir1 = ((0) | 0);
                    members.m_icr = ((0) & 0xff);
                    members.m_irq = ((0) ? 1 : 0);
                    (__L5 ? __L5(Number(0)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(0) : runtime.invoke("m_write_irq", 0));
                    break;
                }
            case 14:
                {
                    data = (((members.m_cra ?? 0)) & 0xff);
                    break;
                }
            case 15:
                {
                    data = (((members.m_crb ?? 0)) & 0xff);
                    break;
                }
        }
        return ((data) & 0xff);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_pc"];
        data = ((data) & 0xff);
        switch (((offset) & (15))) {
            case 0:
                {
                    members.m_pra = ((data) & 0xff);
                    method_update_pa(runtime);
                    break;
                }
            case 1:
                {
                    members.m_prb = ((data) & 0xff);
                    method_update_pb(runtime);
                    members.m_pc = ((0) | 0);
                    (__L0 ? __L0(Number((members.m_pc ?? 0))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? 0)) : runtime.invoke("m_write_pc", (members.m_pc ?? 0)));
                    break;
                }
            case 2:
                {
                    members.m_ddra = ((data) & 0xff);
                    method_update_pa(runtime);
                    break;
                }
            case 3:
                {
                    members.m_ddrb = ((data) & 0xff);
                    method_update_pb(runtime);
                    break;
                }
            case 4:
                {
                    members.m_ta_latch = (((((((members.m_ta_latch ?? 0)) & (65280))) | (data))) & 0xffff);
                    if ((members.m_load_a2 ?? 0)) {
                        members.m_ta = (((((((members.m_ta ?? 0)) & (65280))) | (data))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    members.m_ta_latch = ((((((data) << (8))) | ((((members.m_ta_latch ?? 0)) & (255))))) & 0xffff);
                    if (((((((members.m_cra ?? 0)) >>> (0)) & 1)) ? 0 : 1)) {
                        members.m_load_a0 = ((1) | 0);
                    }
                    if (((((members.m_cra ?? 0)) >>> (3)) & 1)) {
                        members.m_ta = (((members.m_ta_latch ?? 0)) & 0xffff);
                        method_set_cra(runtime, (((members.m_cra ?? 0)) | (1)));
                    }
                    if ((members.m_load_a2 ?? 0)) {
                        members.m_ta = ((((((data) << (8))) | ((((members.m_ta ?? 0)) & (255))))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    members.m_tb_latch = (((((((members.m_tb_latch ?? 0)) & (65280))) | (data))) & 0xffff);
                    if ((members.m_load_b2 ?? 0)) {
                        members.m_tb = (((((((members.m_tb ?? 0)) & (65280))) | (data))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    members.m_tb_latch = ((((((data) << (8))) | ((((members.m_tb_latch ?? 0)) & (255))))) & 0xffff);
                    if (((((((members.m_crb ?? 0)) >>> (0)) & 1)) ? 0 : 1)) {
                        members.m_load_b0 = ((1) | 0);
                    }
                    if (((((members.m_crb ?? 0)) >>> (3)) & 1)) {
                        members.m_tb = (((members.m_tb_latch ?? 0)) & 0xffff);
                        method_set_crb(runtime, (((members.m_crb ?? 0)) | (1)));
                    }
                    if ((members.m_load_b2 ?? 0)) {
                        members.m_tb = ((((((data) << (8))) | ((((members.m_tb ?? 0)) & (255))))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    method_write_tod(runtime, 0, data);
                    members.m_tod_stopped = ((0) ? 1 : 0);
                    break;
                }
            case 9:
                {
                    method_write_tod(runtime, 1, data);
                    break;
                }
            case 10:
                {
                    method_write_tod(runtime, 2, data);
                    break;
                }
            case 11:
                {
                    members.m_tod_stopped = ((1) ? 1 : 0);
                    if ((((((Number(((data) & (31))) === Number(18)) ? 1 : 0)) && (((((((members.m_crb ?? 0)) >>> (7)) & 1)) ? 0 : 1))) ? 1 : 0)) {
                        data = ((((data) ^ (128))) & 0xff);
                    }
                    method_write_tod(runtime, 3, data);
                    break;
                }
            case 12:
                {
                    members.m_sdr = ((data) & 0xff);
                    members.m_sdr_empty = ((0) ? 1 : 0);
                    break;
                }
            case 13:
                {
                    if ((((data) >>> (7)) & 1)) {
                        members.m_imr = ((((members.m_imr) | (((data) & (31))))) & 0xff);
                    }
                    else {
                        members.m_imr = ((((members.m_imr) & ((~((data) & (31)))))) & 0xff);
                    }
                    if (((((((members.m_irq ?? 0)) ? 0 : 1)) && ((((members.m_icr ?? 0)) & ((members.m_imr ?? 0))))) ? 1 : 0)) {
                        members.m_ir0 = ((1) | 0);
                    }
                    break;
                }
            case 14:
                {
                    method_set_cra(runtime, data);
                    break;
                }
            case 15:
                {
                    method_set_crb(runtime, data);
                    break;
                }
        }
    }
    function method_mos6526_device__write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_pc"];
        data = ((data) & 0xff);
        switch (((offset) & (15))) {
            case 0:
                {
                    members.m_pra = ((data) & 0xff);
                    method_update_pa(runtime);
                    break;
                }
            case 1:
                {
                    members.m_prb = ((data) & 0xff);
                    method_update_pb(runtime);
                    members.m_pc = ((0) | 0);
                    (__L0 ? __L0(Number((members.m_pc ?? 0))) : typeof members.m_write_pc === 'function' ? members.m_write_pc((members.m_pc ?? 0)) : runtime.invoke("m_write_pc", (members.m_pc ?? 0)));
                    break;
                }
            case 2:
                {
                    members.m_ddra = ((data) & 0xff);
                    method_update_pa(runtime);
                    break;
                }
            case 3:
                {
                    members.m_ddrb = ((data) & 0xff);
                    method_update_pb(runtime);
                    break;
                }
            case 4:
                {
                    members.m_ta_latch = (((((((members.m_ta_latch ?? 0)) & (65280))) | (data))) & 0xffff);
                    if ((members.m_load_a2 ?? 0)) {
                        members.m_ta = (((((((members.m_ta ?? 0)) & (65280))) | (data))) & 0xffff);
                    }
                    break;
                }
            case 5:
                {
                    members.m_ta_latch = ((((((data) << (8))) | ((((members.m_ta_latch ?? 0)) & (255))))) & 0xffff);
                    if (((((((members.m_cra ?? 0)) >>> (0)) & 1)) ? 0 : 1)) {
                        members.m_load_a0 = ((1) | 0);
                    }
                    if (((((members.m_cra ?? 0)) >>> (3)) & 1)) {
                        members.m_ta = (((members.m_ta_latch ?? 0)) & 0xffff);
                        method_set_cra(runtime, (((members.m_cra ?? 0)) | (1)));
                    }
                    if ((members.m_load_a2 ?? 0)) {
                        members.m_ta = ((((((data) << (8))) | ((((members.m_ta ?? 0)) & (255))))) & 0xffff);
                    }
                    break;
                }
            case 6:
                {
                    members.m_tb_latch = (((((((members.m_tb_latch ?? 0)) & (65280))) | (data))) & 0xffff);
                    if ((members.m_load_b2 ?? 0)) {
                        members.m_tb = (((((((members.m_tb ?? 0)) & (65280))) | (data))) & 0xffff);
                    }
                    break;
                }
            case 7:
                {
                    members.m_tb_latch = ((((((data) << (8))) | ((((members.m_tb_latch ?? 0)) & (255))))) & 0xffff);
                    if (((((((members.m_crb ?? 0)) >>> (0)) & 1)) ? 0 : 1)) {
                        members.m_load_b0 = ((1) | 0);
                    }
                    if (((((members.m_crb ?? 0)) >>> (3)) & 1)) {
                        members.m_tb = (((members.m_tb_latch ?? 0)) & 0xffff);
                        method_set_crb(runtime, (((members.m_crb ?? 0)) | (1)));
                    }
                    if ((members.m_load_b2 ?? 0)) {
                        members.m_tb = ((((((data) << (8))) | ((((members.m_tb ?? 0)) & (255))))) & 0xffff);
                    }
                    break;
                }
            case 8:
                {
                    method_write_tod(runtime, 0, data);
                    members.m_tod_stopped = ((0) ? 1 : 0);
                    break;
                }
            case 9:
                {
                    method_write_tod(runtime, 1, data);
                    break;
                }
            case 10:
                {
                    method_write_tod(runtime, 2, data);
                    break;
                }
            case 11:
                {
                    members.m_tod_stopped = ((1) ? 1 : 0);
                    if ((((((Number(((data) & (31))) === Number(18)) ? 1 : 0)) && (((((((members.m_crb ?? 0)) >>> (7)) & 1)) ? 0 : 1))) ? 1 : 0)) {
                        data = ((((data) ^ (128))) & 0xff);
                    }
                    method_write_tod(runtime, 3, data);
                    break;
                }
            case 12:
                {
                    members.m_sdr = ((data) & 0xff);
                    members.m_sdr_empty = ((0) ? 1 : 0);
                    break;
                }
            case 13:
                {
                    if ((((data) >>> (7)) & 1)) {
                        members.m_imr = ((((members.m_imr) | (((data) & (31))))) & 0xff);
                    }
                    else {
                        members.m_imr = ((((members.m_imr) & ((~((data) & (31)))))) & 0xff);
                    }
                    if (((((((members.m_irq ?? 0)) ? 0 : 1)) && ((((members.m_icr ?? 0)) & ((members.m_imr ?? 0))))) ? 1 : 0)) {
                        members.m_ir0 = ((1) | 0);
                    }
                    break;
                }
            case 14:
                {
                    method_set_cra(runtime, data);
                    break;
                }
            case 15:
                {
                    method_set_crb(runtime, data);
                    break;
                }
        }
    }
    function method_sp_w(runtime, state) {
        const members = runtime.members;
        members.m_sp = ((state) | 0);
    }
    function method_cnt_w(runtime, state) {
        const members = runtime.members;
        if (((((members.m_cra ?? 0)) >>> (6)) & 1)) {
            return;
        }
        if (((((((members.m_cnt ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) {
            method_serial_input(runtime);
            if (((Number(((((members.m_cra ?? 0)) >>> (5)) & 1)) === Number(1)) ? 1 : 0)) {
                members.m_ta = ((((members.m_ta) - (1))) & 0xffff);
            }
            if (((Number(runtime.shiftRight((((members.m_crb ?? 0)) & (96)), 5)) === Number(1)) ? 1 : 0)) {
                members.m_tb = ((((members.m_tb) - (1))) & 0xffff);
            }
        }
        members.m_cnt = ((state) | 0);
    }
    function method_flag_w(runtime, state) {
        const members = runtime.members;
        if (((((members.m_flag ?? 0)) && (((state) ? 0 : 1))) ? 1 : 0)) {
            members.m_icr = ((((members.m_icr) | (16))) & 0xff);
        }
        members.m_flag = ((state) | 0);
    }
    function method_tod_w(runtime, state) {
        const members = runtime.members;
        if ((((state) && ((((members.m_tod_stopped ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            method_clock_tod(runtime);
            if (((((members.m_tod ?? 0)) === ((members.m_alarm ?? 0))) ? 1 : 0)) {
                members.m_icr = ((((members.m_icr) | (4))) & 0xff);
            }
        }
    }
    function method_advance_tod_clock(runtime, param) {
        const members = runtime.members;
        method_tod_w(runtime, 1);
        method_tod_w(runtime, 0);
    }
    function method_set_tod_clock(runtime, clock) {
        const members = runtime.members;
        members.m_tod_clock = ((clock) | 0);
    }
    function method_irq_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_irq_wr_callback(runtime, members.m_write_irq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_irq, "bind"));
    }
    function __deref_irq_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cnt_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cnt_wr_callback(runtime, members.m_write_cnt), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_cnt, "bind"));
    }
    function __deref_cnt_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_sp_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_sp_wr_callback(runtime, members.m_write_sp), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_sp, "bind"));
    }
    function __deref_sp_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pa_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pa_rd_callback(runtime, members.m_read_pa), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_pa, "bind"));
    }
    function __deref_pa_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pa_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pa_wr_callback(runtime, members.m_write_pa), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_pa, "bind"));
    }
    function __deref_pa_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pb_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pb_rd_callback(runtime, members.m_read_pb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_pb, "bind"));
    }
    function __deref_pb_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pb_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pb_wr_callback(runtime, members.m_write_pb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_pb, "bind"));
    }
    function __deref_pb_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pc_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pc_wr_callback(runtime, members.m_write_pc), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_pc, "bind"));
    }
    function __deref_pc_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pa_r(runtime) {
        const members = runtime.members;
        return (((members.m_pa ?? 0)) & 0xff);
    }
    function method_pb_r(runtime) {
        const members = runtime.members;
        return (((members.m_pb ?? 0)) & 0xff);
    }
    function method_sp_r(runtime) {
        const members = runtime.members;
        return (((members.m_sp ?? 0)) | 0);
    }
    function method_cnt_r(runtime) {
        const members = runtime.members;
        return (((members.m_cnt ?? 0)) | 0);
    }
    function method_irq_r(runtime) {
        const members = runtime.members;
        return (((members.m_irq ?? 0)) | 0);
    }
    function method_mos6526_device__set_tod_clock(runtime, clock) {
        const members = runtime.members;
        members.m_tod_clock = ((clock) | 0);
    }
    function method_mos6526_device__irq_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6526_device__irq_wr_callback(runtime, members.m_write_irq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_irq, "bind"));
    }
    function __deref_mos6526_device__irq_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mos6526_device__cnt_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6526_device__cnt_wr_callback(runtime, members.m_write_cnt), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_cnt, "bind"));
    }
    function __deref_mos6526_device__cnt_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mos6526_device__sp_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6526_device__sp_wr_callback(runtime, members.m_write_sp), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_sp, "bind"));
    }
    function __deref_mos6526_device__sp_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mos6526_device__pa_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6526_device__pa_rd_callback(runtime, members.m_read_pa), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_pa, "bind"));
    }
    function __deref_mos6526_device__pa_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mos6526_device__pa_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6526_device__pa_wr_callback(runtime, members.m_write_pa), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_pa, "bind"));
    }
    function __deref_mos6526_device__pa_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mos6526_device__pb_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6526_device__pb_rd_callback(runtime, members.m_read_pb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_pb, "bind"));
    }
    function __deref_mos6526_device__pb_rd_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mos6526_device__pb_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6526_device__pb_wr_callback(runtime, members.m_write_pb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_pb, "bind"));
    }
    function __deref_mos6526_device__pb_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mos6526_device__pc_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6526_device__pc_wr_callback(runtime, members.m_write_pc), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_pc, "bind"));
    }
    function __deref_mos6526_device__pc_wr_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mos6526_device__pa_r(runtime) {
        const members = runtime.members;
        return (((members.m_pa ?? 0)) & 0xff);
    }
    function method_mos6526_device__pb_r(runtime) {
        const members = runtime.members;
        return (((members.m_pb ?? 0)) & 0xff);
    }
    function method_mos6526_device__sp_r(runtime) {
        const members = runtime.members;
        return (((members.m_sp ?? 0)) | 0);
    }
    function method_mos6526_device__cnt_r(runtime) {
        const members = runtime.members;
        return (((members.m_cnt ?? 0)) | 0);
    }
    function method_mos6526_device__irq_r(runtime) {
        const members = runtime.members;
        return (((members.m_irq ?? 0)) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "update_pa": method_update_pa,
        "update_pb": method_update_pb,
        "set_cra": method_set_cra,
        "set_crb": method_set_crb,
        "bcd_increment": method_bcd_increment,
        "clock_tod": method_clock_tod,
        "read_tod": method_read_tod,
        "write_tod": method_write_tod,
        "serial_input": method_serial_input,
        "clock_ta": method_clock_ta,
        "serial_output": method_serial_output,
        "clock_tb": method_clock_tb,
        "update_interrupt": method_update_interrupt,
        "clock_pipeline": method_clock_pipeline,
        "synchronize": method_synchronize,
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "execute_run": method_execute_run,
        "read": method_read,
        "mos6526_device::read": method_mos6526_device__read,
        "write": method_write,
        "mos6526_device::write": method_mos6526_device__write,
        "sp_w": method_sp_w,
        "cnt_w": method_cnt_w,
        "flag_w": method_flag_w,
        "tod_w": method_tod_w,
        "advance_tod_clock": method_advance_tod_clock,
        "set_tod_clock": method_set_tod_clock,
        "irq_wr_callback": method_irq_wr_callback,
        "cnt_wr_callback": method_cnt_wr_callback,
        "sp_wr_callback": method_sp_wr_callback,
        "pa_rd_callback": method_pa_rd_callback,
        "pa_wr_callback": method_pa_wr_callback,
        "pb_rd_callback": method_pb_rd_callback,
        "pb_wr_callback": method_pb_wr_callback,
        "pc_wr_callback": method_pc_wr_callback,
        "pa_r": method_pa_r,
        "pb_r": method_pb_r,
        "sp_r": method_sp_r,
        "cnt_r": method_cnt_r,
        "irq_r": method_irq_r,
        "mos6526_device::set_tod_clock": method_mos6526_device__set_tod_clock,
        "mos6526_device::irq_wr_callback": method_mos6526_device__irq_wr_callback,
        "mos6526_device::cnt_wr_callback": method_mos6526_device__cnt_wr_callback,
        "mos6526_device::sp_wr_callback": method_mos6526_device__sp_wr_callback,
        "mos6526_device::pa_rd_callback": method_mos6526_device__pa_rd_callback,
        "mos6526_device::pa_wr_callback": method_mos6526_device__pa_wr_callback,
        "mos6526_device::pb_rd_callback": method_mos6526_device__pb_rd_callback,
        "mos6526_device::pb_wr_callback": method_mos6526_device__pb_wr_callback,
        "mos6526_device::pc_wr_callback": method_mos6526_device__pc_wr_callback,
        "mos6526_device::pa_r": method_mos6526_device__pa_r,
        "mos6526_device::pb_r": method_mos6526_device__pb_r,
        "mos6526_device::sp_r": method_mos6526_device__sp_r,
        "mos6526_device::cnt_r": method_mos6526_device__cnt_r,
        "mos6526_device::irq_r": method_mos6526_device__irq_r
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "attotime::from_hz", "m_read_pa", "m_read_pb", "m_write_cnt", "m_write_irq", "m_write_pa", "m_write_pb", "m_write_pc", "m_write_sp", "machine", "machine().side_effects_disabled", "save_item"];
export const device = definition;
export default device;
