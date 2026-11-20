import deviceData from './eeprom_er5911_8bit.device.ir.json' with { type: 'json' };
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
    function method_ready(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        return ((Number(((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) >= Number((members.m_completion_time ?? 0))) ? 1 : 0);
    }
    function method_internal_read(runtime, address) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_u16le"];
        let __t0;
        if (((((members.m_data_bits ?? 0)) === (16)) ? 1 : 0)) {
            return (((__L0 ? __L0(__addr_internal_read(runtime, (members.m_data ?? 0), ((address) * (2)))) : runtime.macro("get_u16le", __addr_internal_read(runtime, (members.m_data ?? 0), ((address) * (2)))))) >>> 0);
        }
        else {
            return (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[address] ?? 0) : runtime.readIndex(__t0, address))) >>> 0);
        }
    }
    function __addr_internal_read(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_eeprom_base_device__ready(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        return ((Number(((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) >= Number((members.m_completion_time ?? 0))) ? 1 : 0);
    }
    function method_base_cs_write(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        state = ((((state) & (1))) | 0);
        if ((((state) === ((members.m_cs_state ?? 0))) ? 1 : 0)) {
            return;
        }
        do {
        } while (0);
        members.m_cs_state = ((state) & 0xff);
        if (((Number(state) === Number(1)) ? 1 : 0)) {
            members.m_last_cs_rising_edge_time = ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
        }
        method_handle_event(runtime, ((((Number((members.m_cs_state ?? 0)) === Number(1)) ? 1 : 0)) ? (1) : (2)));
    }
    function method_handle_event(runtime, event) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["m_do_cb"];
        let __t0;
        switch ((members.m_state ?? 0)) {
            case 0:
                {
                    if (((Number(event) === Number(1)) ? 1 : 0)) {
                        method_set_state(runtime, 1);
                    }
                    break;
                }
            case 1:
                {
                    if ((((((((((((Number(event) === Number(4)) ? 1 : 0)) && (((Number((members.m_di_state ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) && (method_ready(runtime))) ? 1 : 0)) && (((Number(((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) > Number((members.m_last_cs_rising_edge_time ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                        members.m_command_address_accum = (((members.m_bits_accum = ((0) >>> 0))) >>> 0);
                        method_set_state(runtime, 2);
                    }
                    else {
                        if (((Number(event) === Number(2)) ? 1 : 0)) {
                            method_set_state(runtime, 0);
                        }
                    }
                    break;
                }
            case 2:
                {
                    if (((Number(event) === Number(4)) ? 1 : 0)) {
                        members.m_command_address_accum = (((((((members.m_command_address_accum ?? 0)) << (1))) | ((members.m_di_state ?? 0)))) >>> 0);
                        if (((Number((members.m_bits_accum = ((((members.m_bits_accum) + (1))) >>> 0))) === Number(((2) + ((members.m_command_address_bits ?? 0))))) ? 1 : 0)) {
                            method_execute_command(runtime);
                        }
                    }
                    else {
                        if (((Number(event) === Number(2)) ? 1 : 0)) {
                            method_set_state(runtime, 0);
                        }
                    }
                    break;
                }
            case 3:
                {
                    if (((Number(event) === Number((((members.m_output_on_falling_clock_enabled ?? 0)) ? (8) : (4)))) ? 1 : 0)) {
                        let bit_index = (((__t0 = (members.m_bits_accum ?? 0), members.m_bits_accum = ((((members.m_bits_accum) + (1))) >>> 0), __t0)) | 0);
                        if ((((((Number(((bit_index) % ((members.m_data_bits ?? 0)))) === Number(0)) ? 1 : 0)) && (((((((bit_index) === (0)) ? 1 : 0)) || ((members.m_streaming_enabled ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                            members.m_shift_register = ((((method_read(runtime, (((((members.m_address ?? 0)) + (runtime.divide((members.m_bits_accum ?? 0), (members.m_data_bits ?? 0))))) & (((((1) << ((members.m_address_bits ?? 0)))) - (1)))))) << (((32) - ((members.m_data_bits ?? 0)))))) >>> 0);
                        }
                        else {
                            members.m_shift_register = (((((((members.m_shift_register ?? 0)) << (1))) | (1))) >>> 0);
                        }
                        (__L2 ? __L2(Number(((((members.m_shift_register ?? 0)) >>> (31)) & 1))) : typeof members.m_do_cb === 'function' ? members.m_do_cb(((((members.m_shift_register ?? 0)) >>> (31)) & 1)) : runtime.invoke("m_do_cb", ((((members.m_shift_register ?? 0)) >>> (31)) & 1)));
                    }
                    else {
                        if (((Number(event) === Number(2)) ? 1 : 0)) {
                            method_set_state(runtime, 0);
                            if ((members.m_streaming_enabled ?? 0)) {
                                do {
                                } while (0);
                            }
                            if (((((((members.m_streaming_enabled ?? 0)) ? 0 : 1)) && (((Number((members.m_bits_accum ?? 0)) > Number((((members.m_data_bits ?? 0)) + (1)))) ? 1 : 0))) ? 1 : 0)) {
                                do {
                                    0;
                                } while (0);
                            }
                            else {
                                if ((((((((members.m_streaming_enabled ?? 0)) && (((Number((members.m_bits_accum ?? 0)) > Number((((members.m_data_bits ?? 0)) + (1)))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_bits_accum ?? 0)) % ((members.m_data_bits ?? 0)))) > Number(2)) ? 1 : 0))) ? 1 : 0)) {
                                    do {
                                        0;
                                    } while (0);
                                }
                                else {
                                    if (((((members.m_bits_accum ?? 0)) < ((members.m_data_bits ?? 0))) ? 1 : 0)) {
                                        do {
                                            0;
                                        } while (0);
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            case 4:
                {
                    if (((Number(event) === Number(4)) ? 1 : 0)) {
                        members.m_shift_register = (((((((members.m_shift_register ?? 0)) << (1))) | ((members.m_di_state ?? 0)))) >>> 0);
                        if (((Number((members.m_bits_accum = ((((members.m_bits_accum) + (1))) >>> 0))) === Number((members.m_data_bits ?? 0))) ? 1 : 0)) {
                            method_execute_write_command(runtime);
                        }
                    }
                    else {
                        if (((Number(event) === Number(2)) ? 1 : 0)) {
                            method_set_state(runtime, 0);
                            do {
                                0;
                            } while (0);
                        }
                    }
                    break;
                }
            case 5:
                {
                    if (((Number(event) === Number(2)) ? 1 : 0)) {
                        method_set_state(runtime, 0);
                    }
                    break;
                }
        }
    }
    function method_set_state(runtime, newstate) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_do_cb"];
        members.m_state = newstate;
        (__L0 ? __L0(Number(((Number((members.m_state ?? 0)) !== Number(3)) ? 1 : 0))) : typeof members.m_do_cb === 'function' ? members.m_do_cb(((Number((members.m_state ?? 0)) !== Number(3)) ? 1 : 0)) : runtime.invoke("m_do_cb", ((Number((members.m_state ?? 0)) !== Number(3)) ? 1 : 0)));
    }
    function method_execute_command(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["emu_fatalerror"], __L1 = __l["__throw"];
        method_parse_command_and_address(runtime);
        members.m_bits_accum = ((0) >>> 0);
        switch ((members.m_command ?? 0)) {
            case 1:
                {
                    members.m_shift_register = ((0) >>> 0);
                    method_set_state(runtime, 3);
                    break;
                }
            case 2:
            case 6:
                {
                    members.m_shift_register = ((0) >>> 0);
                    method_set_state(runtime, 4);
                    break;
                }
            case 3:
                {
                    if ((members.m_locked ?? 0)) {
                        do {
                            0;
                        } while (0);
                        method_set_state(runtime, 0);
                        break;
                    }
                    method_erase(runtime, (members.m_address ?? 0));
                    method_set_state(runtime, 5);
                    break;
                }
            case 4:
                {
                    members.m_locked = ((1) ? 1 : 0);
                    method_set_state(runtime, 0);
                    break;
                }
            case 5:
                {
                    members.m_locked = ((0) ? 1 : 0);
                    method_set_state(runtime, 0);
                    break;
                }
            case 7:
                {
                    if ((members.m_locked ?? 0)) {
                        do {
                            0;
                        } while (0);
                        method_set_state(runtime, 0);
                        break;
                    }
                    method_erase_all(runtime);
                    method_set_state(runtime, 5);
                    break;
                }
            default:
                {
                    (__L1 ? __L1((__L0 ? __L0("execute_command called with invalid command %d\n", (members.m_command ?? 0)) : runtime.macro("emu_fatalerror", "execute_command called with invalid command %d\n", (members.m_command ?? 0)))) : runtime.macro("__throw", (__L0 ? __L0("execute_command called with invalid command %d\n", (members.m_command ?? 0)) : runtime.macro("emu_fatalerror", "execute_command called with invalid command %d\n", (members.m_command ?? 0)))));
                }
        }
    }
    function method_parse_command_and_address(runtime) {
        const members = runtime.members;
        members.m_command = 0;
        members.m_address = (((((members.m_command_address_accum ?? 0)) & (((((1) << ((members.m_command_address_bits ?? 0)))) - (1))))) >>> 0);
        switch ((((members.m_command_address_accum ?? 0)) >>> ((members.m_command_address_bits ?? 0)))) {
            case 0:
                {
                    switch ((((members.m_address ?? 0)) >>> ((((members.m_command_address_bits ?? 0)) - (2))))) {
                        case 0:
                            {
                                members.m_command = 4;
                                break;
                            }
                        case 1:
                            {
                                members.m_command = 0;
                                break;
                            }
                        case 2:
                            {
                                members.m_command = 7;
                                break;
                            }
                        case 3:
                            {
                                members.m_command = 5;
                                break;
                            }
                    }
                    members.m_address = ((0) >>> 0);
                    break;
                }
            case 1:
                {
                    members.m_command = 2;
                    break;
                }
            case 2:
                {
                    members.m_command = 1;
                    break;
                }
            case 3:
                {
                    members.m_command = 2;
                    break;
                }
        }
        if (((Number((members.m_address ?? 0)) >= Number(((1) << ((members.m_address_bits ?? 0))))) ? 1 : 0)) {
            do {
                0;
            } while (0);
        }
    }
    function method_erase(runtime, address) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        const h_m_operation_time = members.m_operation_time ?? 0;
        if (((method_ready(runtime)) ? 0 : 1)) {
            0;
        }
        method_internal_write(runtime, address, -1);
        members.m_completion_time = __add_erase(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0), h_m_operation_time[2]);
    }
    function __add_erase(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_internal_write(runtime, address, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["put_u16le"];
        let __t0;
        if (((((members.m_data_bits ?? 0)) === (16)) ? 1 : 0)) {
            (__L0 ? __L0(__addr_internal_write(runtime, (members.m_data ?? 0), ((address) * (2))), data) : runtime.macro("put_u16le", __addr_internal_write(runtime, (members.m_data ?? 0), ((address) * (2))), data));
        }
        else {
            ((__t0 = members.m_data) && ArrayBuffer.isView(__t0) ? (__t0[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
        }
    }
    function __addr_internal_write(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_erase_all(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        const h_m_operation_time = members.m_operation_time ?? 0;
        if (((method_ready(runtime)) ? 0 : 1)) {
            0;
        }
        for (let address = 0; ((Number(address) < Number(((1) << ((members.m_address_bits ?? 0))))) ? 1 : 0); address = ((address) + (1))) {
            method_internal_write(runtime, address, -1);
        }
        members.m_completion_time = __add_erase_all(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0), h_m_operation_time[3]);
    }
    function __add_erase_all(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_read(runtime, address) {
        const members = runtime.members;
        if (((method_ready(runtime)) ? 0 : 1)) {
            0;
        }
        return ((method_internal_read(runtime, address)) >>> 0);
    }
    function method_execute_write_command(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["emu_fatalerror"], __L1 = __l["__throw"];
        switch ((members.m_command ?? 0)) {
            case 2:
                {
                    if ((members.m_locked ?? 0)) {
                        do {
                            0;
                        } while (0);
                        method_set_state(runtime, 0);
                        break;
                    }
                    method_write(runtime, (members.m_address ?? 0), (members.m_shift_register ?? 0));
                    method_set_state(runtime, 5);
                    break;
                }
            case 6:
                {
                    if ((members.m_locked ?? 0)) {
                        do {
                            0;
                        } while (0);
                        method_set_state(runtime, 0);
                        break;
                    }
                    method_write_all(runtime, (members.m_shift_register ?? 0));
                    method_set_state(runtime, 5);
                    break;
                }
            default:
                {
                    (__L1 ? __L1((__L0 ? __L0("execute_write_command called with invalid command %d\n", (members.m_command ?? 0)) : runtime.macro("emu_fatalerror", "execute_write_command called with invalid command %d\n", (members.m_command ?? 0)))) : runtime.macro("__throw", (__L0 ? __L0("execute_write_command called with invalid command %d\n", (members.m_command ?? 0)) : runtime.macro("emu_fatalerror", "execute_write_command called with invalid command %d\n", (members.m_command ?? 0)))));
                }
        }
    }
    function method_write(runtime, address, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        const h_m_operation_time = members.m_operation_time ?? 0;
        if (((method_ready(runtime)) ? 0 : 1)) {
            0;
        }
        method_internal_write(runtime, address, data);
        members.m_completion_time = __add_write(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0), h_m_operation_time[0]);
    }
    function __add_write(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_write_all(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        const h_m_operation_time = members.m_operation_time ?? 0;
        if (((method_ready(runtime)) ? 0 : 1)) {
            0;
        }
        for (let address = 0; ((Number(address) < Number(((1) << ((members.m_address_bits ?? 0))))) ? 1 : 0); address = ((address) + (1))) {
            method_internal_write(runtime, address, ((method_internal_read(runtime, address)) & (data)));
        }
        members.m_completion_time = __add_write_all(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0), h_m_operation_time[1]);
    }
    function __add_write_all(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_base_clk_write(runtime, state) {
        const members = runtime.members;
        state = ((((state) & (1))) | 0);
        if ((((state) === ((members.m_clk_state ?? 0))) ? 1 : 0)) {
            return;
        }
        do {
        } while (0);
        members.m_clk_state = ((state) & 0xff);
        method_handle_event(runtime, ((((Number((members.m_clk_state ?? 0)) === Number(1)) ? 1 : 0)) ? (4) : (8)));
    }
    function method_base_di_write(runtime, state) {
        const members = runtime.members;
        if (((((((state) !== (0)) ? 1 : 0)) && ((((state) !== (1)) ? 1 : 0))) ? 1 : 0)) {
            do {
                0;
            } while (0);
        }
        do {
        } while (0);
        members.m_di_state = ((((state) & (1))) & 0xff);
    }
    function method_enable_streaming(runtime, enable) {
        const members = runtime.members;
        members.m_streaming_enabled = ((enable) ? 1 : 0);
    }
    function method_enable_output_on_falling_clock(runtime, enable) {
        const members = runtime.members;
        members.m_output_on_falling_clock_enabled = ((enable) ? 1 : 0);
    }
    function method_set_do_tristate(runtime, value) {
        const members = runtime.members;
        members.m_do_tristate = ((value) ? 1 : 0);
    }
    function method_do_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_do_callback(runtime, members.m_do_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_do_cb, "bind"));
    }
    function __deref_do_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_address_bits(runtime, addrbits) {
        const members = runtime.members;
        members.m_command_address_bits = ((addrbits) & 0xff);
    }
    function method_eeprom_serial_base_device__enable_streaming(runtime, enable) {
        const members = runtime.members;
        members.m_streaming_enabled = ((enable) ? 1 : 0);
    }
    function method_eeprom_serial_base_device__enable_output_on_falling_clock(runtime, enable) {
        const members = runtime.members;
        members.m_output_on_falling_clock_enabled = ((enable) ? 1 : 0);
    }
    function method_eeprom_serial_base_device__set_do_tristate(runtime, value) {
        const members = runtime.members;
        members.m_do_tristate = ((value) ? 1 : 0);
    }
    function method_eeprom_serial_base_device__do_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_eeprom_serial_base_device__do_callback(runtime, members.m_do_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_do_cb, "bind"));
    }
    function __deref_eeprom_serial_base_device__do_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_eeprom_serial_base_device__set_address_bits(runtime, addrbits) {
        const members = runtime.members;
        members.m_command_address_bits = ((addrbits) & 0xff);
    }
    function method_do_read(runtime) {
        const members = runtime.members;
        return ((method_base_do_read(runtime)) | 0);
    }
    function method_base_do_read(runtime) {
        const members = runtime.members;
        let result = (((members.m_do_tristate ?? 0)) | 0);
        if (((Number((members.m_state ?? 0)) === Number(3)) ? 1 : 0)) {
            result = ((((((Number((((members.m_shift_register ?? 0)) & (2147483648))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) | 0);
        }
        do {
        } while (0);
        return ((result) | 0);
    }
    function method_ready_read(runtime) {
        const members = runtime.members;
        return ((method_base_ready_read(runtime)) | 0);
    }
    function method_base_ready_read(runtime) {
        const members = runtime.members;
        let result = ((((method_ready(runtime)) ? (1) : (0))) | 0);
        do {
        } while (0);
        return ((result) | 0);
    }
    function method_cs_write(runtime, state) {
        const members = runtime.members;
        method_base_cs_write(runtime, state);
    }
    function method_clk_write(runtime, state) {
        const members = runtime.members;
        method_base_clk_write(runtime, state);
    }
    function method_di_write(runtime, state) {
        const members = runtime.members;
        method_base_di_write(runtime, state);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "ready": method_ready,
        "internal_read": method_internal_read,
        "eeprom_base_device::ready": method_eeprom_base_device__ready,
        "base_cs_write": method_base_cs_write,
        "handle_event": method_handle_event,
        "set_state": method_set_state,
        "execute_command": method_execute_command,
        "parse_command_and_address": method_parse_command_and_address,
        "erase": method_erase,
        "internal_write": method_internal_write,
        "erase_all": method_erase_all,
        "read": method_read,
        "execute_write_command": method_execute_write_command,
        "write": method_write,
        "write_all": method_write_all,
        "base_clk_write": method_base_clk_write,
        "base_di_write": method_base_di_write,
        "enable_streaming": method_enable_streaming,
        "enable_output_on_falling_clock": method_enable_output_on_falling_clock,
        "set_do_tristate": method_set_do_tristate,
        "do_callback": method_do_callback,
        "set_address_bits": method_set_address_bits,
        "eeprom_serial_base_device::enable_streaming": method_eeprom_serial_base_device__enable_streaming,
        "eeprom_serial_base_device::enable_output_on_falling_clock": method_eeprom_serial_base_device__enable_output_on_falling_clock,
        "eeprom_serial_base_device::set_do_tristate": method_eeprom_serial_base_device__set_do_tristate,
        "eeprom_serial_base_device::do_callback": method_eeprom_serial_base_device__do_callback,
        "eeprom_serial_base_device::set_address_bits": method_eeprom_serial_base_device__set_address_bits,
        "do_read": method_do_read,
        "base_do_read": method_base_do_read,
        "ready_read": method_ready_read,
        "base_ready_read": method_base_ready_read,
        "cs_write": method_cs_write,
        "clk_write": method_clk_write,
        "di_write": method_di_write
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["__throw", "emu_fatalerror", "get_u16le", "m_do_cb", "machine", "machine().time", "put_u16le"];
export const device = definition;
export default device;
