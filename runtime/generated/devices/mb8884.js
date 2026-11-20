import deviceData from './mb8884.device.ir.json' with { type: 'json' };
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
    function method_illegal(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        0;
    }
    function method_burn_cycles(runtime, count) {
        const members = runtime.members;
        if ((members.m_timecount_enabled ?? 0)) {
            let timerover = ((0) ? 1 : 0);
            if ((((members.m_timecount_enabled ?? 0)) & (1))) {
                let oldtimer = (((members.m_timer ?? 0)) & 0xff);
                members.m_prescaler = ((((members.m_prescaler) + (count))) & 0xff);
                members.m_timer = ((((members.m_timer) + ((((members.m_prescaler ?? 0)) >>> (5))))) & 0xff);
                members.m_prescaler = ((((members.m_prescaler) & (31))) & 0xff);
                timerover = ((((((members.m_timer ?? 0)) < (oldtimer)) ? 1 : 0)) ? 1 : 0);
            }
            else {
                if ((((members.m_timecount_enabled ?? 0)) & (2))) {
                    for (; (((count) > (0)) ? 1 : 0); count = ((((count) - (1))) | 0), members.m_icount = ((((members.m_icount) - (1))) | 0)) {
                        members.m_t1_history = (((((((members.m_t1_history ?? 0)) << (1))) | (((method_test_r(runtime, 1)) & (1))))) & 0xff);
                        if (((Number((((members.m_t1_history ?? 0)) & (3))) === Number(2)) ? 1 : 0)) {
                            if (((Number((members.m_timer = ((((members.m_timer) + (1))) & 0xff))) === Number(0)) ? 1 : 0)) {
                                timerover = ((1) ? 1 : 0);
                            }
                        }
                    }
                }
            }
            if (timerover) {
                members.m_timer_flag = ((1) ? 1 : 0);
                if ((members.m_tirq_enabled ?? 0)) {
                    members.m_timer_overflow = ((1) ? 1 : 0);
                }
            }
        }
        members.m_icount = ((((members.m_icount) - (count))) | 0);
    }
    function method_test_r(runtime, a) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_test_in_cb ?? 0), a)()) | 0);
    }
    function method_add_a_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, runtime.readIndex((members.m_regptr ?? 0), 0));
    }
    function method_execute_add(runtime, dat) {
        const members = runtime.members;
        dat = ((dat) & 0xff);
        let temp = (((((members.m_a ?? 0)) + (dat))) & 0xffff);
        let temp4 = ((__add_execute_add(runtime, (((members.m_a ?? 0)) & (15)), ((dat) & (15)))) & 0xffff);
        members.m_psw = ((((members.m_psw) & (-193))) & 0xff);
        members.m_psw = ((((members.m_psw) | (((((temp4) << (2))) & (64))))) & 0xff);
        members.m_psw = ((((members.m_psw) | (((((temp) >>> (1))) & (128))))) & 0xff);
        members.m_a = ((temp) & 0xff);
    }
    function __add_execute_add(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_add_a_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, runtime.readIndex((members.m_regptr ?? 0), 1));
    }
    function method_add_a_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, runtime.readIndex((members.m_regptr ?? 0), 2));
    }
    function method_add_a_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, runtime.readIndex((members.m_regptr ?? 0), 3));
    }
    function method_add_a_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, runtime.readIndex((members.m_regptr ?? 0), 4));
    }
    function method_add_a_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, runtime.readIndex((members.m_regptr ?? 0), 5));
    }
    function method_add_a_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, runtime.readIndex((members.m_regptr ?? 0), 6));
    }
    function method_add_a_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, runtime.readIndex((members.m_regptr ?? 0), 7));
    }
    function method_add_a_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0)));
    }
    function method_ram_r(runtime, a) {
        const members = runtime.members;
        return (((__deref_ram_r(runtime, members.m_data).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_ram_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_add_a_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_add(runtime, method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1)));
    }
    function method_add_a_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_add(runtime, method_argument_fetch(runtime));
    }
    function method_argument_fetch(runtime) {
        const members = runtime.members;
        let address = (((members.m_pc ?? 0)) & 0xffff);
        members.m_pc = (((((((((members.m_pc ?? 0)) + (1))) & (2047))) | ((((members.m_pc ?? 0)) & (2048))))) & 0xffff);
        return (((__deref_argument_fetch(runtime, members.m_program).read_byte?.(address) ?? 0)) & 0xff);
    }
    function __deref_argument_fetch(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_adc_a_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, runtime.readIndex((members.m_regptr ?? 0), 0));
    }
    function method_execute_addc(runtime, dat) {
        const members = runtime.members;
        dat = ((dat) & 0xff);
        let carryin = ((runtime.shiftRight((((members.m_psw ?? 0)) & (128)), 7)) & 0xff);
        let temp = (((((((members.m_a ?? 0)) + (dat))) + (carryin))) & 0xffff);
        let temp4 = ((((__add_execute_addc(runtime, (((members.m_a ?? 0)) & (15)), ((dat) & (15)))) + (carryin))) & 0xffff);
        members.m_psw = ((((members.m_psw) & (-193))) & 0xff);
        members.m_psw = ((((members.m_psw) | (((((temp4) << (2))) & (64))))) & 0xff);
        members.m_psw = ((((members.m_psw) | (((((temp) >>> (1))) & (128))))) & 0xff);
        members.m_a = ((temp) & 0xff);
    }
    function __add_execute_addc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_adc_a_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, runtime.readIndex((members.m_regptr ?? 0), 1));
    }
    function method_adc_a_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, runtime.readIndex((members.m_regptr ?? 0), 2));
    }
    function method_adc_a_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, runtime.readIndex((members.m_regptr ?? 0), 3));
    }
    function method_adc_a_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, runtime.readIndex((members.m_regptr ?? 0), 4));
    }
    function method_adc_a_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, runtime.readIndex((members.m_regptr ?? 0), 5));
    }
    function method_adc_a_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, runtime.readIndex((members.m_regptr ?? 0), 6));
    }
    function method_adc_a_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, runtime.readIndex((members.m_regptr ?? 0), 7));
    }
    function method_adc_a_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0)));
    }
    function method_adc_a_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_execute_addc(runtime, method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1)));
    }
    function method_adc_a_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_addc(runtime, method_argument_fetch(runtime));
    }
    function method_anl_a_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (runtime.readIndex((members.m_regptr ?? 0), 0)))) & 0xff);
    }
    function method_anl_a_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (runtime.readIndex((members.m_regptr ?? 0), 1)))) & 0xff);
    }
    function method_anl_a_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (runtime.readIndex((members.m_regptr ?? 0), 2)))) & 0xff);
    }
    function method_anl_a_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (runtime.readIndex((members.m_regptr ?? 0), 3)))) & 0xff);
    }
    function method_anl_a_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (runtime.readIndex((members.m_regptr ?? 0), 4)))) & 0xff);
    }
    function method_anl_a_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (runtime.readIndex((members.m_regptr ?? 0), 5)))) & 0xff);
    }
    function method_anl_a_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (runtime.readIndex((members.m_regptr ?? 0), 6)))) & 0xff);
    }
    function method_anl_a_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (runtime.readIndex((members.m_regptr ?? 0), 7)))) & 0xff);
    }
    function method_anl_a_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0))))) & 0xff);
    }
    function method_anl_a_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) & (method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1))))) & 0xff);
    }
    function method_anl_a_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((((members.m_a) & (method_argument_fetch(runtime)))) & 0xff);
    }
    function method_anl_bus_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_bus_w(runtime, ((method_bus_r(runtime)) & (method_argument_fetch(runtime))));
    }
    function method_bus_w(runtime, v) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_bus_out_cb"];
        v = ((v) & 0xff);
        (__L0 ? __L0(Number(v)) : typeof members.m_bus_out_cb === 'function' ? members.m_bus_out_cb(v) : runtime.invoke("m_bus_out_cb", v));
    }
    function method_bus_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_bus_in_cb"];
        return (((__L0 ? __L0() : typeof members.m_bus_in_cb === 'function' ? members.m_bus_in_cb() : runtime.invoke("m_bus_in_cb"))) & 0xff);
    }
    function method_anl_p1_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_port_w(runtime, 1, (members.m_p1 = ((((members.m_p1) & (method_argument_fetch(runtime)))) & 0xff)));
    }
    function method_port_w(runtime, a, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        runtime.readIndex((members.m_port_out_cb ?? 0), ((a) - (1)))(v);
    }
    function method_anl_p2_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_port_w(runtime, 2, (members.m_p2 = ((((members.m_p2) & (((method_argument_fetch(runtime)) | ((~method_p2_mask(runtime))))))) & 0xff)));
    }
    function method_p2_mask(runtime) {
        const members = runtime.members;
        const h_m_feature_mask = members.m_feature_mask ?? 0;
        let result = ((255) & 0xff);
        if (((Number(((h_m_feature_mask) & (4))) === Number(0)) ? 1 : 0)) {
            return ((result) & 0xff);
        }
        if ((members.m_flags_enabled ?? 0)) {
            result = ((((result) & (-49))) & 0xff);
        }
        if ((members.m_dma_enabled ?? 0)) {
            result = ((((result) & (-193))) & 0xff);
        }
        return ((result) & 0xff);
    }
    function method_anld_p4_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 3, 4);
    }
    function method_expander_operation(runtime, operation, port) {
        const members = runtime.members;
        port = ((port) & 0xff);
        method_port_w(runtime, 2, (members.m_p2 = (((((((((members.m_p2 ?? 0)) & (240))) | (((((operation) & 0xff)) << (2))))) | (((port) & (3))))) & 0xff)));
        method_prog_w(runtime, 0);
        if (((Number(operation) !== Number(0)) ? 1 : 0)) {
            method_port_w(runtime, 2, (members.m_p2 = (((((((members.m_p2 ?? 0)) & (240))) | ((((members.m_a ?? 0)) & (15))))) & 0xff)));
        }
        else {
            method_port_w(runtime, 2, (members.m_p2 = ((((members.m_p2) | (15))) & 0xff)));
            members.m_a = ((((method_port_r(runtime, 2)) & (15))) & 0xff);
        }
        method_prog_w(runtime, 1);
    }
    function method_prog_w(runtime, v) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_prog_out_cb"];
        (__L0 ? __L0(Number(v)) : typeof members.m_prog_out_cb === 'function' ? members.m_prog_out_cb(v) : runtime.invoke("m_prog_out_cb", v));
    }
    function method_port_r(runtime, a) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_port_in_cb ?? 0), ((a) - (1)))()) & 0xff);
    }
    function method_anld_p5_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 3, 5);
    }
    function method_anld_p6_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 3, 6);
    }
    function method_anld_p7_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 3, 7);
    }
    function method_call_0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_call(runtime, ((method_argument_fetch(runtime)) | (0)));
    }
    function method_execute_call(runtime, address) {
        const members = runtime.members;
        address = ((address) & 0xffff);
        method_push_pc_psw(runtime);
        method_execute_jmp(runtime, address);
    }
    function method_push_pc_psw(runtime) {
        const members = runtime.members;
        let sp = (((((members.m_psw ?? 0)) & (7))) & 0xff);
        method_ram_w(runtime, __add_push_pc_psw(runtime, 8, ((2) * (sp))), (members.m_pc ?? 0));
        method_ram_w(runtime, __add_push_pc_psw(runtime, 9, ((2) * (sp))), (((((((members.m_pc ?? 0)) >>> (8))) & (15))) | ((((members.m_psw ?? 0)) & (240)))));
        members.m_psw = (((((((members.m_psw ?? 0)) & (240))) | (((((sp) + (1))) & (7))))) & 0xff);
    }
    function __add_push_pc_psw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ram_w(runtime, a, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        (__deref_ram_w(runtime, members.m_data).write_byte?.(a, v) ?? 0);
    }
    function __deref_ram_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_execute_jmp(runtime, address) {
        const members = runtime.members;
        address = ((address) & 0xffff);
        let a11 = (((((members.m_irq_in_progress ?? 0)) ? (0) : ((members.m_a11 ?? 0)))) & 0xffff);
        members.m_pc = ((((address) | (a11))) & 0xffff);
    }
    function method_call_1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_call(runtime, ((method_argument_fetch(runtime)) | (256)));
    }
    function method_call_2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_call(runtime, ((method_argument_fetch(runtime)) | (512)));
    }
    function method_call_3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_call(runtime, ((method_argument_fetch(runtime)) | (768)));
    }
    function method_call_4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_call(runtime, ((method_argument_fetch(runtime)) | (1024)));
    }
    function method_call_5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_call(runtime, ((method_argument_fetch(runtime)) | (1280)));
    }
    function method_call_6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_call(runtime, ((method_argument_fetch(runtime)) | (1536)));
    }
    function method_call_7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_call(runtime, ((method_argument_fetch(runtime)) | (1792)));
    }
    function method_clr_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((0) & 0xff);
    }
    function method_clr_c(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_psw = ((((members.m_psw) & (-129))) & 0xff);
    }
    function method_clr_f0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_psw = ((((members.m_psw) & (-33))) & 0xff);
    }
    function method_clr_f1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_f1 = ((0) ? 1 : 0);
    }
    function method_cpl_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (255))) & 0xff);
    }
    function method_cpl_c(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_psw = ((((members.m_psw) ^ (128))) & 0xff);
    }
    function method_cpl_f0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_psw = ((((members.m_psw) ^ (32))) & 0xff);
    }
    function method_cpl_f1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_f1 = (((((members.m_f1 ?? 0)) ? 0 : 1)) ? 1 : 0);
    }
    function method_da_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        if ((((((Number((((members.m_a ?? 0)) & (15))) > Number(9)) ? 1 : 0)) || ((((members.m_psw ?? 0)) & (64)))) ? 1 : 0)) {
            if (((((members.m_a ?? 0)) > (249)) ? 1 : 0)) {
                members.m_psw = ((((members.m_psw) | (128))) & 0xff);
            }
            members.m_a = ((((members.m_a) + (6))) & 0xff);
        }
        if ((((((Number((((members.m_a ?? 0)) & (240))) > Number(144)) ? 1 : 0)) || ((((members.m_psw ?? 0)) & (128)))) ? 1 : 0)) {
            members.m_a = ((((members.m_a) + (96))) & 0xff);
            members.m_psw = ((((members.m_psw) | (128))) & 0xff);
        }
    }
    function method_dec_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) - (1))) & 0xff);
    }
    function method_dec_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 0, ((runtime.readIndex(runtime.writableMember("m_regptr"), 0)) - (1)));
    }
    function method_dec_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 1, ((runtime.readIndex(runtime.writableMember("m_regptr"), 1)) - (1)));
    }
    function method_dec_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 2, ((runtime.readIndex(runtime.writableMember("m_regptr"), 2)) - (1)));
    }
    function method_dec_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 3, ((runtime.readIndex(runtime.writableMember("m_regptr"), 3)) - (1)));
    }
    function method_dec_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 4, ((runtime.readIndex(runtime.writableMember("m_regptr"), 4)) - (1)));
    }
    function method_dec_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 5, ((runtime.readIndex(runtime.writableMember("m_regptr"), 5)) - (1)));
    }
    function method_dec_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 6, ((runtime.readIndex(runtime.writableMember("m_regptr"), 6)) - (1)));
    }
    function method_dec_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 7, ((runtime.readIndex(runtime.writableMember("m_regptr"), 7)) - (1)));
    }
    function method_dis_i(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_xirq_enabled = ((0) ? 1 : 0);
    }
    function method_dis_tcnti(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_tirq_enabled = ((0) ? 1 : 0);
        members.m_timer_overflow = ((0) ? 1 : 0);
    }
    function method_djnz_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((runtime.writeIndex(runtime.writableMember("m_regptr"), 0, ((runtime.readIndex(runtime.writableMember("m_regptr"), 0)) - (1))))) !== Number(0)) ? 1 : 0));
    }
    function method_execute_jcc(runtime, result) {
        const members = runtime.members;
        let pch = (((((members.m_pc ?? 0)) & (3840))) & 0xffff);
        let offset = ((method_argument_fetch(runtime)) & 0xff);
        if (result) {
            members.m_pc = ((((pch) | (offset))) & 0xffff);
        }
    }
    function method_djnz_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((runtime.writeIndex(runtime.writableMember("m_regptr"), 1, ((runtime.readIndex(runtime.writableMember("m_regptr"), 1)) - (1))))) !== Number(0)) ? 1 : 0));
    }
    function method_djnz_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((runtime.writeIndex(runtime.writableMember("m_regptr"), 2, ((runtime.readIndex(runtime.writableMember("m_regptr"), 2)) - (1))))) !== Number(0)) ? 1 : 0));
    }
    function method_djnz_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((runtime.writeIndex(runtime.writableMember("m_regptr"), 3, ((runtime.readIndex(runtime.writableMember("m_regptr"), 3)) - (1))))) !== Number(0)) ? 1 : 0));
    }
    function method_djnz_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((runtime.writeIndex(runtime.writableMember("m_regptr"), 4, ((runtime.readIndex(runtime.writableMember("m_regptr"), 4)) - (1))))) !== Number(0)) ? 1 : 0));
    }
    function method_djnz_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((runtime.writeIndex(runtime.writableMember("m_regptr"), 5, ((runtime.readIndex(runtime.writableMember("m_regptr"), 5)) - (1))))) !== Number(0)) ? 1 : 0));
    }
    function method_djnz_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((runtime.writeIndex(runtime.writableMember("m_regptr"), 6, ((runtime.readIndex(runtime.writableMember("m_regptr"), 6)) - (1))))) !== Number(0)) ? 1 : 0));
    }
    function method_djnz_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((runtime.writeIndex(runtime.writableMember("m_regptr"), 7, ((runtime.readIndex(runtime.writableMember("m_regptr"), 7)) - (1))))) !== Number(0)) ? 1 : 0));
    }
    function method_en_i(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_xirq_enabled = ((1) ? 1 : 0);
    }
    function method_en_tcnti(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_tirq_enabled = ((1) ? 1 : 0);
    }
    function method_ent0_clk(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_t0_clk_func.isnull"], __L1 = __l["clock"], __L2 = __l["m_t0_clk_func"];
        const h_m_t0_clk_func = members.m_t0_clk_func ?? 0;
        method_burn_cycles(runtime, 1);
        if ((((__L0 ? __L0() : typeof (h_m_t0_clk_func)?.isnull === 'function' ? (h_m_t0_clk_func).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_t0_clk_func.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__L2 ? __L2(runtime.divide((__L1 ? __L1() : runtime.macro("clock")), 3)) : runtime.macro("m_t0_clk_func", runtime.divide((__L1 ? __L1() : runtime.macro("clock")), 3)));
        }
        else {
            0;
        }
    }
    function method_in_a_p1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((((method_port_r(runtime, 1)) & ((members.m_p1 ?? 0)))) & 0xff);
    }
    function method_in_a_p2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((((method_port_r(runtime, 2)) & ((members.m_p2 ?? 0)))) & 0xff);
    }
    function method_ins_a_bus(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((method_bus_r(runtime)) & 0xff);
    }
    function method_inc_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) + (1))) & 0xff);
    }
    function method_inc_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 0, ((runtime.readIndex(runtime.writableMember("m_regptr"), 0)) + (1)));
    }
    function method_inc_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 1, ((runtime.readIndex(runtime.writableMember("m_regptr"), 1)) + (1)));
    }
    function method_inc_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 2, ((runtime.readIndex(runtime.writableMember("m_regptr"), 2)) + (1)));
    }
    function method_inc_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 3, ((runtime.readIndex(runtime.writableMember("m_regptr"), 3)) + (1)));
    }
    function method_inc_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 4, ((runtime.readIndex(runtime.writableMember("m_regptr"), 4)) + (1)));
    }
    function method_inc_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 5, ((runtime.readIndex(runtime.writableMember("m_regptr"), 5)) + (1)));
    }
    function method_inc_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 6, ((runtime.readIndex(runtime.writableMember("m_regptr"), 6)) + (1)));
    }
    function method_inc_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 7, ((runtime.readIndex(runtime.writableMember("m_regptr"), 7)) + (1)));
    }
    function method_inc_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 0), __add_inc_xr0(runtime, method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0)), 1));
    }
    function __add_inc_xr0(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_inc_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 1), __add_inc_xr1(runtime, method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1)), 1));
    }
    function __add_inc_xr1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_jb_0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_a ?? 0)) & (1))) !== Number(0)) ? 1 : 0));
    }
    function method_jb_1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_a ?? 0)) & (2))) !== Number(0)) ? 1 : 0));
    }
    function method_jb_2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_a ?? 0)) & (4))) !== Number(0)) ? 1 : 0));
    }
    function method_jb_3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_a ?? 0)) & (8))) !== Number(0)) ? 1 : 0));
    }
    function method_jb_4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_a ?? 0)) & (16))) !== Number(0)) ? 1 : 0));
    }
    function method_jb_5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_a ?? 0)) & (32))) !== Number(0)) ? 1 : 0));
    }
    function method_jb_6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_a ?? 0)) & (64))) !== Number(0)) ? 1 : 0));
    }
    function method_jb_7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_a ?? 0)) & (128))) !== Number(0)) ? 1 : 0));
    }
    function method_jc(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_psw ?? 0)) & (128))) !== Number(0)) ? 1 : 0));
    }
    function method_jf0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_psw ?? 0)) & (32))) !== Number(0)) ? 1 : 0));
    }
    function method_jf1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, (members.m_f1 ?? 0));
    }
    function method_jnc(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number((((members.m_psw ?? 0)) & (128))) === Number(0)) ? 1 : 0));
    }
    function method_jni(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_irq_polled = ((((Number((members.m_irq_state ?? 0)) === Number(0)) ? 1 : 0)) ? 1 : 0);
        method_execute_jcc(runtime, ((Number((members.m_irq_state ?? 0)) !== Number(0)) ? 1 : 0));
    }
    function method_jnt_0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number(method_test_r(runtime, 0)) === Number(0)) ? 1 : 0));
    }
    function method_jnt_1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number(method_test_r(runtime, 1)) === Number(0)) ? 1 : 0));
    }
    function method_jnz(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((((members.m_a ?? 0)) !== (0)) ? 1 : 0));
    }
    function method_jtf(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, (members.m_timer_flag ?? 0));
        members.m_timer_flag = ((0) ? 1 : 0);
    }
    function method_jt_0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number(method_test_r(runtime, 0)) !== Number(0)) ? 1 : 0));
    }
    function method_jt_1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((Number(method_test_r(runtime, 1)) !== Number(0)) ? 1 : 0));
    }
    function method_jz(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jcc(runtime, ((((members.m_a ?? 0)) === (0)) ? 1 : 0));
    }
    function method_jmp_0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jmp(runtime, ((method_argument_fetch(runtime)) | (0)));
    }
    function method_jmp_1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jmp(runtime, ((method_argument_fetch(runtime)) | (256)));
    }
    function method_jmp_2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jmp(runtime, ((method_argument_fetch(runtime)) | (512)));
    }
    function method_jmp_3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jmp(runtime, ((method_argument_fetch(runtime)) | (768)));
    }
    function method_jmp_4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jmp(runtime, ((method_argument_fetch(runtime)) | (1024)));
    }
    function method_jmp_5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jmp(runtime, ((method_argument_fetch(runtime)) | (1280)));
    }
    function method_jmp_6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jmp(runtime, ((method_argument_fetch(runtime)) | (1536)));
    }
    function method_jmp_7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_execute_jmp(runtime, ((method_argument_fetch(runtime)) | (1792)));
    }
    function method_jmpp_xa(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_pc = ((((members.m_pc) & (3840))) & 0xffff);
        members.m_pc = ((((members.m_pc) | (method_program_r(runtime, (((members.m_pc ?? 0)) | ((members.m_a ?? 0))))))) & 0xffff);
    }
    function method_program_r(runtime, a) {
        const members = runtime.members;
        return (((__deref_program_r(runtime, members.m_program).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_program_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mov_a_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((method_argument_fetch(runtime)) & 0xff);
    }
    function method_mov_a_psw(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = (((((members.m_psw ?? 0)) | (8))) & 0xff);
    }
    function method_mov_a_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 0)) & 0xff);
    }
    function method_mov_a_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 1)) & 0xff);
    }
    function method_mov_a_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 2)) & 0xff);
    }
    function method_mov_a_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 3)) & 0xff);
    }
    function method_mov_a_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 4)) & 0xff);
    }
    function method_mov_a_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 5)) & 0xff);
    }
    function method_mov_a_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 6)) & 0xff);
    }
    function method_mov_a_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 7)) & 0xff);
    }
    function method_mov_a_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0))) & 0xff);
    }
    function method_mov_a_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1))) & 0xff);
    }
    function method_mov_a_t(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = (((members.m_timer ?? 0)) & 0xff);
    }
    function method_mov_psw_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_psw = (((((members.m_a ?? 0)) & (-9))) & 0xff);
        method_update_regptr(runtime);
    }
    function method_update_regptr(runtime) {
        const members = runtime.members;
        members.m_regptr = __addr_update_regptr(runtime, (members.m_dataptr ?? 0), (((((members.m_psw ?? 0)) & (16))) ? (24) : (0)));
    }
    function __addr_update_regptr(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_mov_r0_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 0, (members.m_a ?? 0));
    }
    function method_mov_r1_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 1, (members.m_a ?? 0));
    }
    function method_mov_r2_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 2, (members.m_a ?? 0));
    }
    function method_mov_r3_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 3, (members.m_a ?? 0));
    }
    function method_mov_r4_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 4, (members.m_a ?? 0));
    }
    function method_mov_r5_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 5, (members.m_a ?? 0));
    }
    function method_mov_r6_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 6, (members.m_a ?? 0));
    }
    function method_mov_r7_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 7, (members.m_a ?? 0));
    }
    function method_mov_r0_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 0, method_argument_fetch(runtime));
    }
    function method_mov_r1_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 1, method_argument_fetch(runtime));
    }
    function method_mov_r2_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 2, method_argument_fetch(runtime));
    }
    function method_mov_r3_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 3, method_argument_fetch(runtime));
    }
    function method_mov_r4_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 4, method_argument_fetch(runtime));
    }
    function method_mov_r5_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 5, method_argument_fetch(runtime));
    }
    function method_mov_r6_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 6, method_argument_fetch(runtime));
    }
    function method_mov_r7_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 7, method_argument_fetch(runtime));
    }
    function method_mov_t_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_timer = (((members.m_a ?? 0)) & 0xff);
    }
    function method_mov_xr0_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 0), (members.m_a ?? 0));
    }
    function method_mov_xr1_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 1), (members.m_a ?? 0));
    }
    function method_mov_xr0_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 0), method_argument_fetch(runtime));
    }
    function method_mov_xr1_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 1), method_argument_fetch(runtime));
    }
    function method_movd_a_p4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 0, 4);
    }
    function method_movd_a_p5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 0, 5);
    }
    function method_movd_a_p6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 0, 6);
    }
    function method_movd_a_p7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 0, 7);
    }
    function method_movd_p4_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 1, 4);
    }
    function method_movd_p5_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 1, 5);
    }
    function method_movd_p6_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 1, 6);
    }
    function method_movd_p7_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 1, 7);
    }
    function method_movp_a_xa(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((method_program_r(runtime, (((((members.m_pc ?? 0)) & (3840))) | ((members.m_a ?? 0))))) & 0xff);
    }
    function method_movp3_a_xa(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((method_program_r(runtime, ((768) | ((members.m_a ?? 0))))) & 0xff);
    }
    function method_movx_a_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((method_ext_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0))) & 0xff);
    }
    function method_ext_r(runtime, a) {
        const members = runtime.members;
        return (((__deref_ext_r(runtime, members.m_io).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_ext_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_movx_a_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((method_ext_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1))) & 0xff);
    }
    function method_movx_xr0_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_ext_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 0), (members.m_a ?? 0));
    }
    function method_ext_w(runtime, a, v) {
        const members = runtime.members;
        v = ((v) & 0xff);
        (__deref_ext_w(runtime, members.m_io).write_byte?.(a, v) ?? 0);
    }
    function __deref_ext_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_movx_xr1_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_ext_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 1), (members.m_a ?? 0));
    }
    function method_nop(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
    }
    function method_orl_a_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (runtime.readIndex((members.m_regptr ?? 0), 0)))) & 0xff);
    }
    function method_orl_a_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (runtime.readIndex((members.m_regptr ?? 0), 1)))) & 0xff);
    }
    function method_orl_a_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (runtime.readIndex((members.m_regptr ?? 0), 2)))) & 0xff);
    }
    function method_orl_a_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (runtime.readIndex((members.m_regptr ?? 0), 3)))) & 0xff);
    }
    function method_orl_a_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (runtime.readIndex((members.m_regptr ?? 0), 4)))) & 0xff);
    }
    function method_orl_a_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (runtime.readIndex((members.m_regptr ?? 0), 5)))) & 0xff);
    }
    function method_orl_a_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (runtime.readIndex((members.m_regptr ?? 0), 6)))) & 0xff);
    }
    function method_orl_a_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (runtime.readIndex((members.m_regptr ?? 0), 7)))) & 0xff);
    }
    function method_orl_a_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0))))) & 0xff);
    }
    function method_orl_a_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) | (method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1))))) & 0xff);
    }
    function method_orl_a_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((((members.m_a) | (method_argument_fetch(runtime)))) & 0xff);
    }
    function method_orl_bus_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_bus_w(runtime, ((method_bus_r(runtime)) | (method_argument_fetch(runtime))));
    }
    function method_orl_p1_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_port_w(runtime, 1, (members.m_p1 = ((((members.m_p1) | (method_argument_fetch(runtime)))) & 0xff)));
    }
    function method_orl_p2_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_port_w(runtime, 2, (members.m_p2 = ((((members.m_p2) | (((method_argument_fetch(runtime)) & (method_p2_mask(runtime)))))) & 0xff)));
    }
    function method_orld_p4_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 2, 4);
    }
    function method_orld_p5_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 2, 5);
    }
    function method_orld_p6_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 2, 6);
    }
    function method_orld_p7_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_expander_operation(runtime, 2, 7);
    }
    function method_outl_bus_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_bus_w(runtime, (members.m_a ?? 0));
    }
    function method_outl_p1_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_port_w(runtime, 1, (members.m_p1 = (((members.m_a ?? 0)) & 0xff)));
    }
    function method_outl_p2_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        let mask = ((method_p2_mask(runtime)) & 0xff);
        method_port_w(runtime, 2, (members.m_p2 = (((((((members.m_p2 ?? 0)) & ((~mask)))) | ((((members.m_a ?? 0)) & (mask))))) & 0xff)));
    }
    function method_ret(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        method_pull_pc(runtime);
    }
    function method_pull_pc(runtime) {
        const members = runtime.members;
        let sp = (((((((members.m_psw ?? 0)) - (1))) & (7))) & 0xff);
        members.m_pc = ((method_ram_r(runtime, __add_pull_pc(runtime, 8, ((2) * (sp))))) & 0xffff);
        members.m_pc = ((((members.m_pc) | (((method_ram_r(runtime, __add_pull_pc(runtime, 9, ((2) * (sp))))) << (8))))) & 0xffff);
        members.m_pc = ((((members.m_pc) & ((((members.m_irq_in_progress ?? 0)) ? (2047) : (4095))))) & 0xffff);
        members.m_psw = (((((((members.m_psw ?? 0)) & (240))) | (sp))) & 0xff);
    }
    function __add_pull_pc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_retr(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_irq_in_progress = ((0) ? 1 : 0);
        method_pull_pc_psw(runtime);
    }
    function method_pull_pc_psw(runtime) {
        const members = runtime.members;
        let sp = (((((((members.m_psw ?? 0)) - (1))) & (7))) & 0xff);
        members.m_pc = ((method_ram_r(runtime, __add_pull_pc_psw(runtime, 8, ((2) * (sp))))) & 0xffff);
        members.m_pc = ((((members.m_pc) | (((method_ram_r(runtime, __add_pull_pc_psw(runtime, 9, ((2) * (sp))))) << (8))))) & 0xffff);
        members.m_psw = (((((((((members.m_pc ?? 0)) >>> (8))) & (240))) | (sp))) & 0xff);
        members.m_pc = ((((members.m_pc) & ((((members.m_irq_in_progress ?? 0)) ? (2047) : (4095))))) & 0xffff);
        method_update_regptr(runtime);
    }
    function __add_pull_pc_psw(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_rl_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = (((((((members.m_a ?? 0)) << (1))) | ((((members.m_a ?? 0)) >>> (7))))) & 0xff);
    }
    function method_rlc_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let newc = (((((members.m_a ?? 0)) & (128))) & 0xff);
        members.m_a = (((((((members.m_a ?? 0)) << (1))) | ((((members.m_psw ?? 0)) >>> (7))))) & 0xff);
        members.m_psw = (((((((members.m_psw ?? 0)) & (-129))) | (newc))) & 0xff);
    }
    function method_rr_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = (((((((members.m_a ?? 0)) >>> (1))) | ((((members.m_a ?? 0)) << (7))))) & 0xff);
    }
    function method_rrc_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let newc = (((((((members.m_a ?? 0)) << (7))) & (128))) & 0xff);
        members.m_a = (((((((members.m_a ?? 0)) >>> (1))) | ((((members.m_psw ?? 0)) & (128))))) & 0xff);
        members.m_psw = (((((((members.m_psw ?? 0)) & (-129))) | (newc))) & 0xff);
    }
    function method_sel_mb0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a11 = ((0) & 0xffff);
    }
    function method_sel_mb1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a11 = ((2048) & 0xffff);
    }
    function method_sel_rb0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_psw = ((((members.m_psw) & (-17))) & 0xff);
        method_update_regptr(runtime);
    }
    function method_sel_rb1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_psw = ((((members.m_psw) | (16))) & 0xff);
        method_update_regptr(runtime);
    }
    function method_stop_tcnt(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_timecount_enabled = ((0) & 0xff);
    }
    function method_strt_t(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_timecount_enabled = ((1) & 0xff);
        members.m_prescaler = ((0) & 0xff);
    }
    function method_strt_cnt(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        if ((((((members.m_timecount_enabled ?? 0)) & (2))) ? 0 : 1)) {
            members.m_t1_history = ((method_test_r(runtime, 1)) & 0xff);
        }
        members.m_timecount_enabled = ((2) & 0xff);
    }
    function method_swap_a(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = (((((((members.m_a ?? 0)) << (4))) | ((((members.m_a ?? 0)) >>> (4))))) & 0xff);
    }
    function method_xch_a_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 0)) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 0, tmp);
    }
    function method_xch_a_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 1)) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 1, tmp);
    }
    function method_xch_a_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 2)) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 2, tmp);
    }
    function method_xch_a_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 3)) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 3, tmp);
    }
    function method_xch_a_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 4)) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 4, tmp);
    }
    function method_xch_a_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 5)) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 5, tmp);
    }
    function method_xch_a_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 6)) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 6, tmp);
    }
    function method_xch_a_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((runtime.readIndex((members.m_regptr ?? 0), 7)) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_regptr"), 7, tmp);
    }
    function method_xch_a_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0))) & 0xff);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 0), tmp);
    }
    function method_xch_a_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let tmp = (((members.m_a ?? 0)) & 0xff);
        members.m_a = ((method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1))) & 0xff);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 1), tmp);
    }
    function method_xchd_a_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let oldram = ((method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0))) & 0xff);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 0), ((((oldram) & (240))) | ((((members.m_a ?? 0)) & (15)))));
        members.m_a = (((((((members.m_a ?? 0)) & (240))) | (((oldram) & (15))))) & 0xff);
    }
    function method_xchd_a_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        let oldram = ((method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1))) & 0xff);
        method_ram_w(runtime, runtime.readIndex((members.m_regptr ?? 0), 1), ((((oldram) & (240))) | ((((members.m_a ?? 0)) & (15)))));
        members.m_a = (((((((members.m_a ?? 0)) & (240))) | (((oldram) & (15))))) & 0xff);
    }
    function method_xrl_a_r0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (runtime.readIndex((members.m_regptr ?? 0), 0)))) & 0xff);
    }
    function method_xrl_a_r1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (runtime.readIndex((members.m_regptr ?? 0), 1)))) & 0xff);
    }
    function method_xrl_a_r2(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (runtime.readIndex((members.m_regptr ?? 0), 2)))) & 0xff);
    }
    function method_xrl_a_r3(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (runtime.readIndex((members.m_regptr ?? 0), 3)))) & 0xff);
    }
    function method_xrl_a_r4(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (runtime.readIndex((members.m_regptr ?? 0), 4)))) & 0xff);
    }
    function method_xrl_a_r5(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (runtime.readIndex((members.m_regptr ?? 0), 5)))) & 0xff);
    }
    function method_xrl_a_r6(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (runtime.readIndex((members.m_regptr ?? 0), 6)))) & 0xff);
    }
    function method_xrl_a_r7(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (runtime.readIndex((members.m_regptr ?? 0), 7)))) & 0xff);
    }
    function method_xrl_a_xr0(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 0))))) & 0xff);
    }
    function method_xrl_a_xr1(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 1);
        members.m_a = ((((members.m_a) ^ (method_ram_r(runtime, runtime.readIndex((members.m_regptr ?? 0), 1))))) & 0xff);
    }
    function method_xrl_a_n(runtime) {
        const members = runtime.members;
        method_burn_cycles(runtime, 2);
        members.m_a = ((((members.m_a) ^ (method_argument_fetch(runtime)))) & 0xff);
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["CALL_METHOD"];
        const h_m_opcode_table = members.m_opcode_table ?? 0;
        method_update_regptr(runtime);
        do {
            method_check_irqs(runtime);
            members.m_irq_polled = ((0) ? 1 : 0);
            members.m_prevpc = (((members.m_pc ?? 0)) & 0xffff);
            /* debugger_instruction_hook: no effect */
            let opcode = method_opcode_fetch(runtime);
            ((__method) => __method ? __method(runtime) : (__L0 ? __L0(runtime.readIndex(h_m_opcode_table, opcode)) : runtime.macro("CALL_METHOD", runtime.readIndex(h_m_opcode_table, opcode))))((cppMethodAt(h_m_opcode_table, opcode) ?? __methodTable[runtime.readIndex(h_m_opcode_table, opcode)]));
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function method_check_irqs(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["standard_irq_callback"];
        if ((members.m_irq_in_progress ?? 0)) {
            return;
        }
        else {
            if ((((((((members.m_irq_state ?? 0)) || (((Number((((members.m_sts ?? 0)) & (2))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && ((members.m_xirq_enabled ?? 0))) ? 1 : 0)) {
                (__L0 ? __L0(0, (members.m_pc ?? 0)) : runtime.macro("standard_irq_callback", 0, (members.m_pc ?? 0)));
                method_burn_cycles(runtime, 2);
                members.m_irq_in_progress = ((1) ? 1 : 0);
                if ((members.m_irq_polled ?? 0)) {
                    members.m_pc = (((((((((members.m_prevpc ?? 0)) + (1))) & (2047))) | ((((members.m_prevpc ?? 0)) & (2048))))) & 0xffff);
                    method_execute_jcc(runtime, 1);
                }
                method_execute_call(runtime, 3);
            }
            else {
                if (((((members.m_timer_overflow ?? 0)) && ((members.m_tirq_enabled ?? 0))) ? 1 : 0)) {
                    (__L0 ? __L0(1, (members.m_pc ?? 0)) : runtime.macro("standard_irq_callback", 1, (members.m_pc ?? 0)));
                    method_burn_cycles(runtime, 2);
                    members.m_irq_in_progress = ((1) ? 1 : 0);
                    method_execute_call(runtime, 7);
                    members.m_timer_overflow = ((0) ? 1 : 0);
                }
            }
        }
    }
    function method_opcode_fetch(runtime) {
        const members = runtime.members;
        let address = (((members.m_pc ?? 0)) & 0xffff);
        members.m_pc = (((((((((members.m_pc ?? 0)) + (1))) & (2047))) | ((((members.m_pc ?? 0)) & (2048))))) & 0xffff);
        return (((__deref_opcode_fetch(runtime, members.m_program).read_byte?.(address) ?? 0)) & 0xff);
    }
    function __deref_opcode_fetch(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_state_import(runtime, entry) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        let __t0, __t1;
        switch ((__t0 = __deref_state_import(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                {
                    runtime.writeIndex(runtime.writableMember("m_regptr"), runtime.subtract((__t1 = __deref_state_import(runtime, entry), typeof __t1.index === 'function' ? __t1.index() : typeof __t1.index === 'number' || typeof __t1.index === 'boolean' ? __t1.index : runtime.container(entry, "index")), 9), (members.m_rtemp ?? 0));
                    break;
                }
            default:
                {
                    (__L0 ? __L0("CPU_IMPORT_STATE(mcs48) called for unexpected value\n") : runtime.macro("fatalerror", "CPU_IMPORT_STATE(mcs48) called for unexpected value\n"));
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
        const __L0 = __l["fatalerror"];
        let __t0, __t1;
        switch ((__t0 = __deref_state_export(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                {
                    members.m_rtemp = ((runtime.readIndex((members.m_regptr ?? 0), runtime.subtract((__t1 = __deref_state_export(runtime, entry), typeof __t1.index === 'function' ? __t1.index() : typeof __t1.index === 'number' || typeof __t1.index === 'boolean' ? __t1.index : runtime.container(entry, "index")), 9))) & 0xff);
                    break;
                }
            default:
                {
                    (__L0 ? __L0("CPU_EXPORT_STATE(mcs48) called for unexpected value\n") : runtime.macro("fatalerror", "CPU_EXPORT_STATE(mcs48) called for unexpected value\n"));
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
        switch (inputnum) {
            case 0:
                {
                    members.m_irq_state = ((((Number(state) !== Number(0)) ? 1 : 0)) ? 1 : 0);
                    break;
                }
            case 1:
                {
                    members.m_ea = ((((Number(state) !== Number(0)) ? 1 : 0)) & 0xff);
                    method_update_ea(runtime);
                    break;
                }
        }
    }
    function method_update_ea(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        if ((__t0 = __deref_update_ea(runtime, members.m_rom_view), typeof __t0.exists === 'function' ? __t0.exists() : typeof __t0.exists === 'number' || typeof __t0.exists === 'boolean' ? __t0.exists : runtime.container(members.m_rom_view, "exists"))) {
            if ((members.m_ea ?? 0)) {
                (__t1 = __deref_update_ea(runtime, members.m_rom_view), typeof __t1.disable === 'function' ? __t1.disable() : typeof __t1.disable === 'number' || typeof __t1.disable === 'boolean' ? __t1.disable : runtime.container(members.m_rom_view, "disable"));
            }
            else {
                (__deref_update_ea(runtime, members.m_rom_view).select?.(0) ?? 0);
            }
        }
    }
    function __deref_update_ea(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_p1_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p1_in_cb(runtime, runtime.readIndex((members.m_port_in_cb ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_port_in_cb ?? 0), 0), "bind"));
    }
    function __deref_p1_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_p2_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p2_in_cb(runtime, runtime.readIndex((members.m_port_in_cb ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_port_in_cb ?? 0), 1), "bind"));
    }
    function __deref_p2_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_p1_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p1_out_cb(runtime, runtime.readIndex((members.m_port_out_cb ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_port_out_cb ?? 0), 0), "bind"));
    }
    function __deref_p1_out_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_p2_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p2_out_cb(runtime, runtime.readIndex((members.m_port_out_cb ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_port_out_cb ?? 0), 1), "bind"));
    }
    function __deref_p2_out_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_bus_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_bus_in_cb(runtime, members.m_bus_in_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_bus_in_cb, "bind"));
    }
    function __deref_bus_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_bus_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_bus_out_cb(runtime, members.m_bus_out_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_bus_out_cb, "bind"));
    }
    function __deref_bus_out_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_t0_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_t0_in_cb(runtime, runtime.readIndex((members.m_test_in_cb ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_test_in_cb ?? 0), 0), "bind"));
    }
    function __deref_t0_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_t1_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_t1_in_cb(runtime, runtime.readIndex((members.m_test_in_cb ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_test_in_cb ?? 0), 1), "bind"));
    }
    function __deref_t1_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_prog_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_prog_out_cb(runtime, members.m_prog_out_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_prog_out_cb, "bind"));
    }
    function __deref_prog_out_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_p1_r(runtime) {
        const members = runtime.members;
        return (((members.m_p1 ?? 0)) & 0xff);
    }
    function method_p2_r(runtime) {
        const members = runtime.members;
        return (((members.m_p2 ?? 0)) & 0xff);
    }
    function method_execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 15), 1), 15);
    }
    function method_execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 15);
    }
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((4) >>> 0);
    }
    function method_mcs48_cpu_device__p1_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mcs48_cpu_device__p1_in_cb(runtime, runtime.readIndex((members.m_port_in_cb ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_port_in_cb ?? 0), 0), "bind"));
    }
    function __deref_mcs48_cpu_device__p1_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__p2_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mcs48_cpu_device__p2_in_cb(runtime, runtime.readIndex((members.m_port_in_cb ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_port_in_cb ?? 0), 1), "bind"));
    }
    function __deref_mcs48_cpu_device__p2_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__p1_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mcs48_cpu_device__p1_out_cb(runtime, runtime.readIndex((members.m_port_out_cb ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_port_out_cb ?? 0), 0), "bind"));
    }
    function __deref_mcs48_cpu_device__p1_out_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__p2_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mcs48_cpu_device__p2_out_cb(runtime, runtime.readIndex((members.m_port_out_cb ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_port_out_cb ?? 0), 1), "bind"));
    }
    function __deref_mcs48_cpu_device__p2_out_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__bus_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mcs48_cpu_device__bus_in_cb(runtime, members.m_bus_in_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_bus_in_cb, "bind"));
    }
    function __deref_mcs48_cpu_device__bus_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__bus_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mcs48_cpu_device__bus_out_cb(runtime, members.m_bus_out_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_bus_out_cb, "bind"));
    }
    function __deref_mcs48_cpu_device__bus_out_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__t0_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mcs48_cpu_device__t0_in_cb(runtime, runtime.readIndex((members.m_test_in_cb ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_test_in_cb ?? 0), 0), "bind"));
    }
    function __deref_mcs48_cpu_device__t0_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__t1_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mcs48_cpu_device__t1_in_cb(runtime, runtime.readIndex((members.m_test_in_cb ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_test_in_cb ?? 0), 1), "bind"));
    }
    function __deref_mcs48_cpu_device__t1_in_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__prog_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mcs48_cpu_device__prog_out_cb(runtime, members.m_prog_out_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_prog_out_cb, "bind"));
    }
    function __deref_mcs48_cpu_device__prog_out_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__p1_r(runtime) {
        const members = runtime.members;
        return (((members.m_p1 ?? 0)) & 0xff);
    }
    function method_mcs48_cpu_device__p2_r(runtime) {
        const members = runtime.members;
        return (((members.m_p2 ?? 0)) & 0xff);
    }
    function method_mcs48_cpu_device__execute_clocks_to_cycles(runtime, clocks) {
        const members = runtime.members;
        return runtime.wide("/", runtime.wide("-", runtime.wide("+", clocks, 15), 1), 15);
    }
    function method_mcs48_cpu_device__execute_cycles_to_clocks(runtime, cycles) {
        const members = runtime.members;
        return runtime.wide("*", cycles, 15);
    }
    function method_mcs48_cpu_device__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_mcs48_cpu_device__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((4) >>> 0);
    }
    function method_mcs48_cpu_device__program_r(runtime, a) {
        const members = runtime.members;
        return (((__deref_mcs48_cpu_device__program_r(runtime, members.m_program).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_mcs48_cpu_device__program_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__ram_r(runtime, a) {
        const members = runtime.members;
        return (((__deref_mcs48_cpu_device__ram_r(runtime, members.m_data).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_mcs48_cpu_device__ram_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__ext_r(runtime, a) {
        const members = runtime.members;
        return (((__deref_mcs48_cpu_device__ext_r(runtime, members.m_io).read_byte?.(a) ?? 0)) & 0xff);
    }
    function __deref_mcs48_cpu_device__ext_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mcs48_cpu_device__port_r(runtime, a) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_port_in_cb ?? 0), ((a) - (1)))()) & 0xff);
    }
    function method_mcs48_cpu_device__test_r(runtime, a) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_test_in_cb ?? 0), a)()) | 0);
    }
    function method_mcs48_cpu_device__bus_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_bus_in_cb"];
        return (((__L0 ? __L0() : typeof members.m_bus_in_cb === 'function' ? members.m_bus_in_cb() : runtime.invoke("m_bus_in_cb"))) & 0xff);
    }
    function method_mcs48_cpu_device__bus_w(runtime, v) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_bus_out_cb"];
        v = ((v) & 0xff);
        (__L0 ? __L0(Number(v)) : typeof members.m_bus_out_cb === 'function' ? members.m_bus_out_cb(v) : runtime.invoke("m_bus_out_cb", v));
    }
    function method_mcs48_cpu_device__prog_w(runtime, v) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_prog_out_cb"];
        (__L0 ? __L0(Number(v)) : typeof members.m_prog_out_cb === 'function' ? members.m_prog_out_cb(v) : runtime.invoke("m_prog_out_cb", v));
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        return (members.m_pc ?? 0);
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        members.m_pc = ((value) & 0xffff);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        return (members.m_pc ?? 0);
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        members.m_pc = ((value) & 0xffff);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        return (members.m_prevpc ?? 0);
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        members.m_prevpc = ((value) & 0xffff);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        return (members.m_psw ?? 0);
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        members.m_psw = ((value) & 0xff);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        return (members.m_psw ?? 0);
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        members.m_psw = ((value) & 0xff);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        return (members.m_a ?? 0);
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        members.m_a = ((value) & 0xff);
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        return (members.m_timer ?? 0);
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        members.m_timer = ((value) & 0xff);
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        return (members.m_prescaler ?? 0);
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        members.m_prescaler = ((value) & 0xff);
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        return (members.m_dbbo ?? 0);
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        members.m_dbbo = ((value) & 0xff);
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        return (members.m_p1 ?? 0);
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        members.m_p1 = ((value) & 0xff);
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        return (members.m_p2 ?? 0);
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        members.m_p2 = ((value) & 0xff);
    }
    function method___state_read_11(runtime) {
        const members = runtime.members;
        return (members.m_ea ?? 0);
    }
    function method___state_write_11(runtime, value) {
        const members = runtime.members;
        members.m_ea = ((value) & 0xff);
    }
    function method___state_read_12(runtime) {
        const members = runtime.members;
        return (members.m_sts ?? 0);
    }
    function method___state_write_12(runtime, value) {
        const members = runtime.members;
        members.m_sts = ((value) & 0xff);
    }
    function method___state_read_13(runtime) {
        const members = runtime.members;
        return (members.m_dbbi ?? 0);
    }
    function method___state_write_13(runtime, value) {
        const members = runtime.members;
        members.m_dbbi = ((value) & 0xff);
    }
    function method___state_read_14(runtime) {
        const members = runtime.members;
        return (members.m_dbbo ?? 0);
    }
    function method___state_write_14(runtime, value) {
        const members = runtime.members;
        members.m_dbbo = ((value) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "illegal": method_illegal,
        "burn_cycles": method_burn_cycles,
        "test_r": method_test_r,
        "add_a_r0": method_add_a_r0,
        "execute_add": method_execute_add,
        "add_a_r1": method_add_a_r1,
        "add_a_r2": method_add_a_r2,
        "add_a_r3": method_add_a_r3,
        "add_a_r4": method_add_a_r4,
        "add_a_r5": method_add_a_r5,
        "add_a_r6": method_add_a_r6,
        "add_a_r7": method_add_a_r7,
        "add_a_xr0": method_add_a_xr0,
        "ram_r": method_ram_r,
        "add_a_xr1": method_add_a_xr1,
        "add_a_n": method_add_a_n,
        "argument_fetch": method_argument_fetch,
        "adc_a_r0": method_adc_a_r0,
        "execute_addc": method_execute_addc,
        "adc_a_r1": method_adc_a_r1,
        "adc_a_r2": method_adc_a_r2,
        "adc_a_r3": method_adc_a_r3,
        "adc_a_r4": method_adc_a_r4,
        "adc_a_r5": method_adc_a_r5,
        "adc_a_r6": method_adc_a_r6,
        "adc_a_r7": method_adc_a_r7,
        "adc_a_xr0": method_adc_a_xr0,
        "adc_a_xr1": method_adc_a_xr1,
        "adc_a_n": method_adc_a_n,
        "anl_a_r0": method_anl_a_r0,
        "anl_a_r1": method_anl_a_r1,
        "anl_a_r2": method_anl_a_r2,
        "anl_a_r3": method_anl_a_r3,
        "anl_a_r4": method_anl_a_r4,
        "anl_a_r5": method_anl_a_r5,
        "anl_a_r6": method_anl_a_r6,
        "anl_a_r7": method_anl_a_r7,
        "anl_a_xr0": method_anl_a_xr0,
        "anl_a_xr1": method_anl_a_xr1,
        "anl_a_n": method_anl_a_n,
        "anl_bus_n": method_anl_bus_n,
        "bus_w": method_bus_w,
        "bus_r": method_bus_r,
        "anl_p1_n": method_anl_p1_n,
        "port_w": method_port_w,
        "anl_p2_n": method_anl_p2_n,
        "p2_mask": method_p2_mask,
        "anld_p4_a": method_anld_p4_a,
        "expander_operation": method_expander_operation,
        "prog_w": method_prog_w,
        "port_r": method_port_r,
        "anld_p5_a": method_anld_p5_a,
        "anld_p6_a": method_anld_p6_a,
        "anld_p7_a": method_anld_p7_a,
        "call_0": method_call_0,
        "execute_call": method_execute_call,
        "push_pc_psw": method_push_pc_psw,
        "ram_w": method_ram_w,
        "execute_jmp": method_execute_jmp,
        "call_1": method_call_1,
        "call_2": method_call_2,
        "call_3": method_call_3,
        "call_4": method_call_4,
        "call_5": method_call_5,
        "call_6": method_call_6,
        "call_7": method_call_7,
        "clr_a": method_clr_a,
        "clr_c": method_clr_c,
        "clr_f0": method_clr_f0,
        "clr_f1": method_clr_f1,
        "cpl_a": method_cpl_a,
        "cpl_c": method_cpl_c,
        "cpl_f0": method_cpl_f0,
        "cpl_f1": method_cpl_f1,
        "da_a": method_da_a,
        "dec_a": method_dec_a,
        "dec_r0": method_dec_r0,
        "dec_r1": method_dec_r1,
        "dec_r2": method_dec_r2,
        "dec_r3": method_dec_r3,
        "dec_r4": method_dec_r4,
        "dec_r5": method_dec_r5,
        "dec_r6": method_dec_r6,
        "dec_r7": method_dec_r7,
        "dis_i": method_dis_i,
        "dis_tcnti": method_dis_tcnti,
        "djnz_r0": method_djnz_r0,
        "execute_jcc": method_execute_jcc,
        "djnz_r1": method_djnz_r1,
        "djnz_r2": method_djnz_r2,
        "djnz_r3": method_djnz_r3,
        "djnz_r4": method_djnz_r4,
        "djnz_r5": method_djnz_r5,
        "djnz_r6": method_djnz_r6,
        "djnz_r7": method_djnz_r7,
        "en_i": method_en_i,
        "en_tcnti": method_en_tcnti,
        "ent0_clk": method_ent0_clk,
        "in_a_p1": method_in_a_p1,
        "in_a_p2": method_in_a_p2,
        "ins_a_bus": method_ins_a_bus,
        "inc_a": method_inc_a,
        "inc_r0": method_inc_r0,
        "inc_r1": method_inc_r1,
        "inc_r2": method_inc_r2,
        "inc_r3": method_inc_r3,
        "inc_r4": method_inc_r4,
        "inc_r5": method_inc_r5,
        "inc_r6": method_inc_r6,
        "inc_r7": method_inc_r7,
        "inc_xr0": method_inc_xr0,
        "inc_xr1": method_inc_xr1,
        "jb_0": method_jb_0,
        "jb_1": method_jb_1,
        "jb_2": method_jb_2,
        "jb_3": method_jb_3,
        "jb_4": method_jb_4,
        "jb_5": method_jb_5,
        "jb_6": method_jb_6,
        "jb_7": method_jb_7,
        "jc": method_jc,
        "jf0": method_jf0,
        "jf1": method_jf1,
        "jnc": method_jnc,
        "jni": method_jni,
        "jnt_0": method_jnt_0,
        "jnt_1": method_jnt_1,
        "jnz": method_jnz,
        "jtf": method_jtf,
        "jt_0": method_jt_0,
        "jt_1": method_jt_1,
        "jz": method_jz,
        "jmp_0": method_jmp_0,
        "jmp_1": method_jmp_1,
        "jmp_2": method_jmp_2,
        "jmp_3": method_jmp_3,
        "jmp_4": method_jmp_4,
        "jmp_5": method_jmp_5,
        "jmp_6": method_jmp_6,
        "jmp_7": method_jmp_7,
        "jmpp_xa": method_jmpp_xa,
        "program_r": method_program_r,
        "mov_a_n": method_mov_a_n,
        "mov_a_psw": method_mov_a_psw,
        "mov_a_r0": method_mov_a_r0,
        "mov_a_r1": method_mov_a_r1,
        "mov_a_r2": method_mov_a_r2,
        "mov_a_r3": method_mov_a_r3,
        "mov_a_r4": method_mov_a_r4,
        "mov_a_r5": method_mov_a_r5,
        "mov_a_r6": method_mov_a_r6,
        "mov_a_r7": method_mov_a_r7,
        "mov_a_xr0": method_mov_a_xr0,
        "mov_a_xr1": method_mov_a_xr1,
        "mov_a_t": method_mov_a_t,
        "mov_psw_a": method_mov_psw_a,
        "update_regptr": method_update_regptr,
        "mov_r0_a": method_mov_r0_a,
        "mov_r1_a": method_mov_r1_a,
        "mov_r2_a": method_mov_r2_a,
        "mov_r3_a": method_mov_r3_a,
        "mov_r4_a": method_mov_r4_a,
        "mov_r5_a": method_mov_r5_a,
        "mov_r6_a": method_mov_r6_a,
        "mov_r7_a": method_mov_r7_a,
        "mov_r0_n": method_mov_r0_n,
        "mov_r1_n": method_mov_r1_n,
        "mov_r2_n": method_mov_r2_n,
        "mov_r3_n": method_mov_r3_n,
        "mov_r4_n": method_mov_r4_n,
        "mov_r5_n": method_mov_r5_n,
        "mov_r6_n": method_mov_r6_n,
        "mov_r7_n": method_mov_r7_n,
        "mov_t_a": method_mov_t_a,
        "mov_xr0_a": method_mov_xr0_a,
        "mov_xr1_a": method_mov_xr1_a,
        "mov_xr0_n": method_mov_xr0_n,
        "mov_xr1_n": method_mov_xr1_n,
        "movd_a_p4": method_movd_a_p4,
        "movd_a_p5": method_movd_a_p5,
        "movd_a_p6": method_movd_a_p6,
        "movd_a_p7": method_movd_a_p7,
        "movd_p4_a": method_movd_p4_a,
        "movd_p5_a": method_movd_p5_a,
        "movd_p6_a": method_movd_p6_a,
        "movd_p7_a": method_movd_p7_a,
        "movp_a_xa": method_movp_a_xa,
        "movp3_a_xa": method_movp3_a_xa,
        "movx_a_xr0": method_movx_a_xr0,
        "ext_r": method_ext_r,
        "movx_a_xr1": method_movx_a_xr1,
        "movx_xr0_a": method_movx_xr0_a,
        "ext_w": method_ext_w,
        "movx_xr1_a": method_movx_xr1_a,
        "nop": method_nop,
        "orl_a_r0": method_orl_a_r0,
        "orl_a_r1": method_orl_a_r1,
        "orl_a_r2": method_orl_a_r2,
        "orl_a_r3": method_orl_a_r3,
        "orl_a_r4": method_orl_a_r4,
        "orl_a_r5": method_orl_a_r5,
        "orl_a_r6": method_orl_a_r6,
        "orl_a_r7": method_orl_a_r7,
        "orl_a_xr0": method_orl_a_xr0,
        "orl_a_xr1": method_orl_a_xr1,
        "orl_a_n": method_orl_a_n,
        "orl_bus_n": method_orl_bus_n,
        "orl_p1_n": method_orl_p1_n,
        "orl_p2_n": method_orl_p2_n,
        "orld_p4_a": method_orld_p4_a,
        "orld_p5_a": method_orld_p5_a,
        "orld_p6_a": method_orld_p6_a,
        "orld_p7_a": method_orld_p7_a,
        "outl_bus_a": method_outl_bus_a,
        "outl_p1_a": method_outl_p1_a,
        "outl_p2_a": method_outl_p2_a,
        "ret": method_ret,
        "pull_pc": method_pull_pc,
        "retr": method_retr,
        "pull_pc_psw": method_pull_pc_psw,
        "rl_a": method_rl_a,
        "rlc_a": method_rlc_a,
        "rr_a": method_rr_a,
        "rrc_a": method_rrc_a,
        "sel_mb0": method_sel_mb0,
        "sel_mb1": method_sel_mb1,
        "sel_rb0": method_sel_rb0,
        "sel_rb1": method_sel_rb1,
        "stop_tcnt": method_stop_tcnt,
        "strt_t": method_strt_t,
        "strt_cnt": method_strt_cnt,
        "swap_a": method_swap_a,
        "xch_a_r0": method_xch_a_r0,
        "xch_a_r1": method_xch_a_r1,
        "xch_a_r2": method_xch_a_r2,
        "xch_a_r3": method_xch_a_r3,
        "xch_a_r4": method_xch_a_r4,
        "xch_a_r5": method_xch_a_r5,
        "xch_a_r6": method_xch_a_r6,
        "xch_a_r7": method_xch_a_r7,
        "xch_a_xr0": method_xch_a_xr0,
        "xch_a_xr1": method_xch_a_xr1,
        "xchd_a_xr0": method_xchd_a_xr0,
        "xchd_a_xr1": method_xchd_a_xr1,
        "xrl_a_r0": method_xrl_a_r0,
        "xrl_a_r1": method_xrl_a_r1,
        "xrl_a_r2": method_xrl_a_r2,
        "xrl_a_r3": method_xrl_a_r3,
        "xrl_a_r4": method_xrl_a_r4,
        "xrl_a_r5": method_xrl_a_r5,
        "xrl_a_r6": method_xrl_a_r6,
        "xrl_a_r7": method_xrl_a_r7,
        "xrl_a_xr0": method_xrl_a_xr0,
        "xrl_a_xr1": method_xrl_a_xr1,
        "xrl_a_n": method_xrl_a_n,
        "execute_run": method_execute_run,
        "check_irqs": method_check_irqs,
        "opcode_fetch": method_opcode_fetch,
        "state_import": method_state_import,
        "state_export": method_state_export,
        "execute_set_input": method_execute_set_input,
        "update_ea": method_update_ea,
        "p1_in_cb": method_p1_in_cb,
        "p2_in_cb": method_p2_in_cb,
        "p1_out_cb": method_p1_out_cb,
        "p2_out_cb": method_p2_out_cb,
        "bus_in_cb": method_bus_in_cb,
        "bus_out_cb": method_bus_out_cb,
        "t0_in_cb": method_t0_in_cb,
        "t1_in_cb": method_t1_in_cb,
        "prog_out_cb": method_prog_out_cb,
        "p1_r": method_p1_r,
        "p2_r": method_p2_r,
        "execute_clocks_to_cycles": method_execute_clocks_to_cycles,
        "execute_cycles_to_clocks": method_execute_cycles_to_clocks,
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "mcs48_cpu_device::p1_in_cb": method_mcs48_cpu_device__p1_in_cb,
        "mcs48_cpu_device::p2_in_cb": method_mcs48_cpu_device__p2_in_cb,
        "mcs48_cpu_device::p1_out_cb": method_mcs48_cpu_device__p1_out_cb,
        "mcs48_cpu_device::p2_out_cb": method_mcs48_cpu_device__p2_out_cb,
        "mcs48_cpu_device::bus_in_cb": method_mcs48_cpu_device__bus_in_cb,
        "mcs48_cpu_device::bus_out_cb": method_mcs48_cpu_device__bus_out_cb,
        "mcs48_cpu_device::t0_in_cb": method_mcs48_cpu_device__t0_in_cb,
        "mcs48_cpu_device::t1_in_cb": method_mcs48_cpu_device__t1_in_cb,
        "mcs48_cpu_device::prog_out_cb": method_mcs48_cpu_device__prog_out_cb,
        "mcs48_cpu_device::p1_r": method_mcs48_cpu_device__p1_r,
        "mcs48_cpu_device::p2_r": method_mcs48_cpu_device__p2_r,
        "mcs48_cpu_device::execute_clocks_to_cycles": method_mcs48_cpu_device__execute_clocks_to_cycles,
        "mcs48_cpu_device::execute_cycles_to_clocks": method_mcs48_cpu_device__execute_cycles_to_clocks,
        "mcs48_cpu_device::execute_min_cycles": method_mcs48_cpu_device__execute_min_cycles,
        "mcs48_cpu_device::execute_max_cycles": method_mcs48_cpu_device__execute_max_cycles,
        "mcs48_cpu_device::program_r": method_mcs48_cpu_device__program_r,
        "mcs48_cpu_device::ram_r": method_mcs48_cpu_device__ram_r,
        "mcs48_cpu_device::ext_r": method_mcs48_cpu_device__ext_r,
        "mcs48_cpu_device::port_r": method_mcs48_cpu_device__port_r,
        "mcs48_cpu_device::test_r": method_mcs48_cpu_device__test_r,
        "mcs48_cpu_device::bus_r": method_mcs48_cpu_device__bus_r,
        "mcs48_cpu_device::bus_w": method_mcs48_cpu_device__bus_w,
        "mcs48_cpu_device::prog_w": method_mcs48_cpu_device__prog_w,
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
        "__state_write_14": method___state_write_14
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["CALL_METHOD", "clock", "fatalerror", "m_bus_in_cb", "m_bus_out_cb", "m_prog_out_cb", "m_t0_clk_func", "m_t0_clk_func.isnull", "standard_irq_callback"];
export const device = definition;
export default device;
