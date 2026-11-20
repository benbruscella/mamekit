import deviceData from './i8255a.device.ir.json' with { type: 'json' };
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
    function method_set_inte1(runtime, state) {
        const members = runtime.members;
        0;
        members.m_inte1 = ((state) | 0);
        method_check_interrupt(runtime, 0);
    }
    function method_check_interrupt(runtime, port) {
        const members = runtime.members;
        const h_m_inte = members.m_inte ?? 0;
        const h_m_ibf = members.m_ibf ?? 0;
        const h_m_obf = members.m_obf ?? 0;
        switch (method_group_mode(runtime, port)) {
            case 1:
                {
                    switch (method_port_mode(runtime, port)) {
                        case 1:
                            {
                                method_set_intr(runtime, port, (((h_m_inte[port]) && (h_m_ibf[port])) ? 1 : 0));
                                break;
                            }
                        case 0:
                            {
                                method_set_intr(runtime, port, (((h_m_inte[port]) && (h_m_obf[port])) ? 1 : 0));
                                break;
                            }
                    }
                    break;
                }
            case 2:
                {
                    method_set_intr(runtime, port, (((((((members.m_inte1 ?? 0)) && (h_m_obf[port])) ? 1 : 0)) || (((((members.m_inte2 ?? 0)) && (h_m_ibf[port])) ? 1 : 0))) ? 1 : 0));
                    break;
                }
        }
    }
    function method_group_mode(runtime, group) {
        const members = runtime.members;
        let mode = ((0) | 0);
        switch (group) {
            case 0:
                {
                    switch (runtime.shiftRight((((members.m_control ?? 0)) & (96)), 5)) {
                        case 0:
                            {
                                mode = ((0) | 0);
                                break;
                            }
                        case 1:
                            {
                                mode = ((1) | 0);
                                break;
                            }
                        case 2:
                        case 3:
                            {
                                mode = ((2) | 0);
                                break;
                            }
                    }
                    break;
                }
            case 1:
                {
                    mode = (((((((members.m_control ?? 0)) & (4))) ? (1) : (0))) | 0);
                    break;
                }
        }
        return ((mode) | 0);
    }
    function method_port_mode(runtime, port) {
        const members = runtime.members;
        let mode = ((0) | 0);
        switch (port) {
            case 0:
                {
                    mode = (((((((members.m_control ?? 0)) & (16))) ? (1) : (0))) | 0);
                    break;
                }
            case 1:
                {
                    mode = (((((((members.m_control ?? 0)) & (2))) ? (1) : (0))) | 0);
                    break;
                }
        }
        return ((mode) | 0);
    }
    function method_set_intr(runtime, port, state) {
        const members = runtime.members;
        const h_m_intr = members.m_intr ?? 0;
        0;
        h_m_intr[port] = state;
        method_output_pc(runtime);
    }
    function method_output_pc(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_tri_pc_cb"], __L1 = __l["m_out_pc_cb"];
        const h_m_intr = members.m_intr ?? 0;
        const h_m_obf = members.m_obf ?? 0;
        const h_m_ibf = members.m_ibf ?? 0;
        const h_m_output = members.m_output ?? 0;
        let data = ((0) & 0xff);
        let mask = ((0) & 0xff);
        let b_mask = ((15) & 0xff);
        switch (method_group_mode(runtime, 0)) {
            case 0:
                {
                    if (((Number(method_port_c_upper_mode(runtime)) === Number(0)) ? 1 : 0)) {
                        mask = ((((mask) | (240))) & 0xff);
                    }
                    else {
                        data = ((((data) | ((((__L0 ? __L0(Number(0)) : typeof members.m_tri_pc_cb === 'function' ? members.m_tri_pc_cb(0) : runtime.invoke("m_tri_pc_cb", 0))) & (240))))) & 0xff);
                    }
                    break;
                }
            case 1:
                {
                    data = ((((data) | (((h_m_intr[0]) ? (8) : (0))))) & 0xff);
                    if (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0)) {
                        data = ((((data) | (((h_m_obf[0]) ? (128) : (0))))) & 0xff);
                        mask = ((((mask) | (48))) & 0xff);
                    }
                    else {
                        data = ((((data) | (((h_m_ibf[0]) ? (32) : (0))))) & 0xff);
                        mask = ((((mask) | (192))) & 0xff);
                    }
                    break;
                }
            case 2:
                {
                    b_mask = ((7) & 0xff);
                    data = ((((data) | (((h_m_intr[0]) ? (8) : (0))))) & 0xff);
                    data = ((((data) | (((h_m_ibf[0]) ? (32) : (0))))) & 0xff);
                    data = ((((data) | (((h_m_obf[0]) ? (128) : (0))))) & 0xff);
                    break;
                }
        }
        switch (method_group_mode(runtime, 1)) {
            case 0:
                {
                    if (((Number(method_port_c_lower_mode(runtime)) === Number(0)) ? 1 : 0)) {
                        mask = ((((mask) | (b_mask))) & 0xff);
                    }
                    else {
                        data = ((((data) | ((((__L0 ? __L0(Number(0)) : typeof members.m_tri_pc_cb === 'function' ? members.m_tri_pc_cb(0) : runtime.invoke("m_tri_pc_cb", 0))) & (b_mask))))) & 0xff);
                    }
                    break;
                }
            case 1:
                {
                    data = ((((data) | (((h_m_intr[1]) ? (1) : (0))))) & 0xff);
                    if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
                        data = ((((data) | (((h_m_obf[1]) ? (2) : (0))))) & 0xff);
                    }
                    else {
                        data = ((((data) | (((h_m_ibf[1]) ? (2) : (0))))) & 0xff);
                    }
                }
        }
        data = ((((data) | (((h_m_output[2]) & (mask))))) & 0xff);
        (__L1 ? __L1(Number(0), Number(data)) : typeof members.m_out_pc_cb === 'function' ? members.m_out_pc_cb(0, data) : runtime.invoke("m_out_pc_cb", 0, data));
    }
    function method_port_c_upper_mode(runtime) {
        const members = runtime.members;
        return (((((((members.m_control ?? 0)) & (8))) ? (1) : (0))) | 0);
    }
    function method_port_c_lower_mode(runtime) {
        const members = runtime.members;
        return (((((((members.m_control ?? 0)) & (1))) ? (1) : (0))) | 0);
    }
    function method_set_inte2(runtime, state) {
        const members = runtime.members;
        0;
        members.m_inte2 = ((state) | 0);
        method_check_interrupt(runtime, 0);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        let data = ((0) & 0xff);
        switch (((offset) & (3))) {
            case 0:
                {
                    switch (method_group_mode(runtime, 0)) {
                        case 0:
                            {
                                data = ((method_read_mode0(runtime, 0)) & 0xff);
                                break;
                            }
                        case 1:
                            {
                                data = ((method_read_mode1(runtime, 0)) & 0xff);
                                break;
                            }
                        case 2:
                            {
                                data = ((method_read_mode2(runtime)) & 0xff);
                                break;
                            }
                    }
                    0;
                    break;
                }
            case 1:
                {
                    switch (method_group_mode(runtime, 1)) {
                        case 0:
                            {
                                data = ((method_read_mode0(runtime, 1)) & 0xff);
                                break;
                            }
                        case 1:
                            {
                                data = ((method_read_mode1(runtime, 1)) & 0xff);
                                break;
                            }
                    }
                    0;
                    break;
                }
            case 2:
                {
                    data = ((method_read_pc(runtime)) & 0xff);
                    0;
                    break;
                }
            case 3:
                {
                    data = (((members.m_control ?? 0)) & 0xff);
                    0;
                    break;
                }
        }
        return ((data) & 0xff);
    }
    function method_read_mode0(runtime, port) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_pa_cb"], __L1 = __l["m_in_pb_cb"], __L2 = __l["m_in_pc_cb"];
        const h_m_output = members.m_output ?? 0;
        let data = ((0) & 0xff);
        if (((Number(method_port_mode(runtime, port)) === Number(0)) ? 1 : 0)) {
            data = ((h_m_output[port]) & 0xff);
        }
        else {
            data = ((((((Number(port) === Number(0)) ? 1 : 0)) ? ((__L0 ? __L0(Number(0)) : typeof members.m_in_pa_cb === 'function' ? members.m_in_pa_cb(0) : runtime.invoke("m_in_pa_cb", 0))) : (((((Number(port) === Number(1)) ? 1 : 0)) ? ((__L1 ? __L1(Number(0)) : typeof members.m_in_pb_cb === 'function' ? members.m_in_pb_cb(0) : runtime.invoke("m_in_pb_cb", 0))) : ((__L2 ? __L2(Number(0)) : typeof members.m_in_pc_cb === 'function' ? members.m_in_pc_cb(0) : runtime.invoke("m_in_pc_cb", 0))))))) & 0xff);
        }
        return ((data) & 0xff);
    }
    function method_read_mode1(runtime, port) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        const h_m_output = members.m_output ?? 0;
        const h_m_input = members.m_input ?? 0;
        let data = ((0) & 0xff);
        if (((Number(method_port_mode(runtime, port)) === Number(0)) ? 1 : 0)) {
            data = ((h_m_output[port]) & 0xff);
        }
        else {
            data = ((h_m_input[port]) & 0xff);
            if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_set_ibf(runtime, port, 0);
                method_set_intr(runtime, port, 0);
                h_m_input[port] = 0;
            }
        }
        return ((data) & 0xff);
    }
    function method_set_ibf(runtime, port, state) {
        const members = runtime.members;
        const h_m_ibf = members.m_ibf ?? 0;
        0;
        h_m_ibf[port] = state;
        method_check_interrupt(runtime, port);
    }
    function method_read_mode2(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        const h_m_input = members.m_input ?? 0;
        let data = ((h_m_input[0]) & 0xff);
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_set_ibf(runtime, 0, 0);
            method_set_intr(runtime, 0, 0);
            h_m_input[0] = 0;
        }
        return ((data) & 0xff);
    }
    function method_read_pc(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_pc_cb"];
        const h_m_output = members.m_output ?? 0;
        const h_m_intr = members.m_intr ?? 0;
        const h_m_obf = members.m_obf ?? 0;
        const h_m_inte = members.m_inte ?? 0;
        const h_m_ibf = members.m_ibf ?? 0;
        let data = ((0) & 0xff);
        let mask = ((0) & 0xff);
        let b_mask = ((15) & 0xff);
        switch (method_group_mode(runtime, 0)) {
            case 0:
                {
                    if (((Number(method_port_c_upper_mode(runtime)) === Number(0)) ? 1 : 0)) {
                        data = ((((data) | (((h_m_output[2]) & (240))))) & 0xff);
                    }
                    else {
                        mask = ((((mask) | (240))) & 0xff);
                    }
                    break;
                }
            case 1:
                {
                    data = ((((data) | (((h_m_intr[0]) ? (8) : (0))))) & 0xff);
                    if (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0)) {
                        data = ((((data) | (((h_m_obf[0]) ? (128) : (0))))) & 0xff);
                        data = ((((data) | (((h_m_inte[0]) ? (64) : (0))))) & 0xff);
                        mask = ((((mask) | (48))) & 0xff);
                    }
                    else {
                        data = ((((data) | (((h_m_ibf[0]) ? (32) : (0))))) & 0xff);
                        data = ((((data) | (((h_m_inte[0]) ? (16) : (0))))) & 0xff);
                        mask = ((((mask) | (192))) & 0xff);
                    }
                    if (((Number(method_port_c_upper_mode(runtime)) === Number(0)) ? 1 : 0)) {
                        data = ((((data) | (((h_m_output[2]) & (mask))))) & 0xff);
                        mask = ((0) & 0xff);
                    }
                    break;
                }
            case 2:
                {
                    b_mask = ((7) & 0xff);
                    data = ((((data) | (((h_m_intr[0]) ? (8) : (0))))) & 0xff);
                    data = ((((data) | ((((members.m_inte2 ?? 0)) ? (16) : (0))))) & 0xff);
                    data = ((((data) | (((h_m_ibf[0]) ? (32) : (0))))) & 0xff);
                    data = ((((data) | ((((members.m_inte1 ?? 0)) ? (64) : (0))))) & 0xff);
                    data = ((((data) | (((h_m_obf[0]) ? (128) : (0))))) & 0xff);
                    break;
                }
        }
        switch (method_group_mode(runtime, 1)) {
            case 0:
                {
                    if (((Number(method_port_c_lower_mode(runtime)) === Number(0)) ? 1 : 0)) {
                        data = ((((data) | (((h_m_output[2]) & (b_mask))))) & 0xff);
                    }
                    else {
                        mask = ((((mask) | (b_mask))) & 0xff);
                    }
                    break;
                }
            case 1:
                {
                    data = ((((data) | (((h_m_inte[1]) ? (4) : (0))))) & 0xff);
                    data = ((((data) | (((h_m_intr[1]) ? (1) : (0))))) & 0xff);
                    if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
                        data = ((((data) | (((h_m_obf[1]) ? (2) : (0))))) & 0xff);
                    }
                    else {
                        data = ((((data) | (((h_m_ibf[1]) ? (2) : (0))))) & 0xff);
                    }
                }
        }
        if (mask) {
            data = ((((data) | ((((__L0 ? __L0(Number(0)) : typeof members.m_in_pc_cb === 'function' ? members.m_in_pc_cb(0) : runtime.invoke("m_in_pc_cb", 0))) & (mask))))) & 0xff);
        }
        return ((data) & 0xff);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_output = members.m_output ?? 0;
        switch (((offset) & (3))) {
            case 0:
                {
                    0;
                    switch (method_group_mode(runtime, 0)) {
                        case 0:
                            {
                                method_write_mode0(runtime, 0, data);
                                break;
                            }
                        case 1:
                            {
                                method_write_mode1(runtime, 0, data);
                                break;
                            }
                        case 2:
                            {
                                method_write_mode2(runtime, data);
                                break;
                            }
                    }
                    break;
                }
            case 1:
                {
                    0;
                    switch (method_group_mode(runtime, 1)) {
                        case 0:
                            {
                                method_write_mode0(runtime, 1, data);
                                break;
                            }
                        case 1:
                            {
                                method_write_mode1(runtime, 1, data);
                                break;
                            }
                    }
                    break;
                }
            case 2:
                {
                    0;
                    h_m_output[2] = data;
                    method_output_pc(runtime);
                    break;
                }
            case 3:
                {
                    if (((data) & (128))) {
                        0;
                        method_set_mode(runtime, data);
                    }
                    else {
                        let bit = ((((((data) >>> (1))) & (7))) | 0);
                        let state = (((((data) >>> (0)) & 1)) | 0);
                        0;
                        method_set_pc_bit(runtime, bit, state);
                    }
                    break;
                }
        }
    }
    function method_write_mode0(runtime, port, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_pa_cb"], __L1 = __l["m_out_pb_cb"];
        data = ((data) & 0xff);
        const h_m_output = members.m_output ?? 0;
        if (((Number(method_port_mode(runtime, port)) === Number(0)) ? 1 : 0)) {
            h_m_output[port] = data;
            if (((Number(port) === Number(0)) ? 1 : 0)) {
                (__L0 ? __L0(Number(0), Number(h_m_output[port])) : typeof members.m_out_pa_cb === 'function' ? members.m_out_pa_cb(0, h_m_output[port]) : runtime.invoke("m_out_pa_cb", 0, h_m_output[port]));
            }
            else {
                (__L1 ? __L1(Number(0), Number(h_m_output[port])) : typeof members.m_out_pb_cb === 'function' ? members.m_out_pb_cb(0, h_m_output[port]) : runtime.invoke("m_out_pb_cb", 0, h_m_output[port]));
            }
        }
    }
    function method_write_mode1(runtime, port, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_pa_cb"], __L1 = __l["m_out_pb_cb"];
        data = ((data) & 0xff);
        const h_m_output = members.m_output ?? 0;
        if (((Number(method_port_mode(runtime, port)) === Number(0)) ? 1 : 0)) {
            h_m_output[port] = data;
            if (((Number(port) === Number(0)) ? 1 : 0)) {
                (__L0 ? __L0(Number(0), Number(h_m_output[port])) : typeof members.m_out_pa_cb === 'function' ? members.m_out_pa_cb(0, h_m_output[port]) : runtime.invoke("m_out_pa_cb", 0, h_m_output[port]));
            }
            else {
                (__L1 ? __L1(Number(0), Number(h_m_output[port])) : typeof members.m_out_pb_cb === 'function' ? members.m_out_pb_cb(0, h_m_output[port]) : runtime.invoke("m_out_pb_cb", 0, h_m_output[port]));
            }
            method_set_obf(runtime, port, 0);
            method_set_intr(runtime, port, 0);
        }
    }
    function method_set_obf(runtime, port, state) {
        const members = runtime.members;
        const h_m_obf = members.m_obf ?? 0;
        0;
        h_m_obf[port] = state;
        method_check_interrupt(runtime, port);
    }
    function method_write_mode2(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_pa_cb"];
        data = ((data) & 0xff);
        const h_m_output = members.m_output ?? 0;
        h_m_output[0] = data;
        (__L0 ? __L0(Number(0), Number(data)) : typeof members.m_out_pa_cb === 'function' ? members.m_out_pa_cb(0, data) : runtime.invoke("m_out_pa_cb", 0, data));
        method_set_obf(runtime, 0, 0);
        method_set_intr(runtime, 0, 0);
    }
    function method_set_mode(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_pa_cb"], __L1 = __l["m_tri_pa_cb"], __L2 = __l["m_out_pb_cb"], __L3 = __l["m_tri_pb_cb"];
        data = ((data) & 0xff);
        const h_m_output = members.m_output ?? 0;
        const h_m_input = members.m_input ?? 0;
        const h_m_ibf = members.m_ibf ?? 0;
        const h_m_obf = members.m_obf ?? 0;
        const h_m_inte = members.m_inte ?? 0;
        members.m_control = ((data) & 0xff);
        if (0) {
            members.m_control = (((((members.m_control ?? 0)) | (2))) & 0xff);
        }
        if (0) {
            members.m_control = (((((members.m_control ?? 0)) & (-9))) & 0xff);
            members.m_control = (((((members.m_control ?? 0)) & (-2))) & 0xff);
        }
        if (1) {
            h_m_output[0] = 0;
        }
        h_m_input[0] = 0;
        h_m_ibf[0] = 0;
        h_m_obf[0] = 1;
        h_m_inte[0] = 0;
        members.m_inte1 = ((0) | 0);
        members.m_inte2 = ((0) | 0);
        if (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0)) {
            (__L0 ? __L0(Number(0), Number(h_m_output[0])) : typeof members.m_out_pa_cb === 'function' ? members.m_out_pa_cb(0, h_m_output[0]) : runtime.invoke("m_out_pa_cb", 0, h_m_output[0]));
            h_m_ibf[0] = 1;
        }
        else {
            (__L0 ? __L0(Number(0), Number((__L1 ? __L1(Number(0)) : typeof members.m_tri_pa_cb === 'function' ? members.m_tri_pa_cb(0) : runtime.invoke("m_tri_pa_cb", 0)))) : typeof members.m_out_pa_cb === 'function' ? members.m_out_pa_cb(0, (__L1 ? __L1(Number(0)) : typeof members.m_tri_pa_cb === 'function' ? members.m_tri_pa_cb(0) : runtime.invoke("m_tri_pa_cb", 0))) : runtime.invoke("m_out_pa_cb", 0, (__L1 ? __L1(Number(0)) : typeof members.m_tri_pa_cb === 'function' ? members.m_tri_pa_cb(0) : runtime.invoke("m_tri_pa_cb", 0))));
        }
        0;
        0;
        0;
        0;
        0;
        0;
        if (1) {
            h_m_output[1] = 0;
        }
        h_m_input[1] = 0;
        h_m_ibf[1] = 0;
        h_m_obf[1] = 1;
        h_m_inte[1] = 0;
        if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
            (__L2 ? __L2(Number(0), Number(h_m_output[1])) : typeof members.m_out_pb_cb === 'function' ? members.m_out_pb_cb(0, h_m_output[1]) : runtime.invoke("m_out_pb_cb", 0, h_m_output[1]));
        }
        else {
            (__L2 ? __L2(Number(0), Number((__L3 ? __L3(Number(0)) : typeof members.m_tri_pb_cb === 'function' ? members.m_tri_pb_cb(0) : runtime.invoke("m_tri_pb_cb", 0)))) : typeof members.m_out_pb_cb === 'function' ? members.m_out_pb_cb(0, (__L3 ? __L3(Number(0)) : typeof members.m_tri_pb_cb === 'function' ? members.m_tri_pb_cb(0) : runtime.invoke("m_tri_pb_cb", 0))) : runtime.invoke("m_out_pb_cb", 0, (__L3 ? __L3(Number(0)) : typeof members.m_tri_pb_cb === 'function' ? members.m_tri_pb_cb(0) : runtime.invoke("m_tri_pb_cb", 0))));
        }
        if (1) {
            h_m_output[2] = 0;
        }
        h_m_input[2] = 0;
        method_output_pc(runtime);
    }
    function method_set_pc_bit(runtime, bit, state) {
        const members = runtime.members;
        const h_m_output = members.m_output ?? 0;
        h_m_output[2] = runtime.andAssign(h_m_output[2], (~((1) << (bit))));
        h_m_output[2] = ((h_m_output[2]) | (((state) << (bit))));
        switch (method_group_mode(runtime, 0)) {
            case 1:
                {
                    if (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0)) {
                        switch (bit) {
                            case 3:
                                {
                                    method_set_intr(runtime, 0, state);
                                    break;
                                }
                            case 6:
                                {
                                    method_set_inte(runtime, 0, state);
                                    break;
                                }
                            case 7:
                                {
                                    method_set_obf(runtime, 0, state);
                                    break;
                                }
                            default:
                                {
                                    break;
                                }
                        }
                    }
                    else {
                        switch (bit) {
                            case 3:
                                {
                                    method_set_intr(runtime, 0, state);
                                    break;
                                }
                            case 4:
                                {
                                    method_set_inte(runtime, 0, state);
                                    break;
                                }
                            case 5:
                                {
                                    method_set_ibf(runtime, 0, state);
                                    break;
                                }
                            default:
                                {
                                    break;
                                }
                        }
                    }
                    break;
                }
            case 2:
                {
                    switch (bit) {
                        case 3:
                            {
                                method_set_intr(runtime, 0, state);
                                break;
                            }
                        case 4:
                            {
                                method_set_inte2(runtime, state);
                                break;
                            }
                        case 5:
                            {
                                method_set_ibf(runtime, 0, state);
                                break;
                            }
                        case 6:
                            {
                                method_set_inte1(runtime, state);
                                break;
                            }
                        case 7:
                            {
                                method_set_obf(runtime, 0, state);
                                break;
                            }
                        default:
                            {
                                break;
                            }
                    }
                    break;
                }
        }
        if (((Number(method_group_mode(runtime, 1)) === Number(1)) ? 1 : 0)) {
            switch (bit) {
                case 0:
                    {
                        method_set_intr(runtime, 1, state);
                        break;
                    }
                case 1:
                    {
                        if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
                            method_set_obf(runtime, 1, state);
                        }
                        else {
                            method_set_ibf(runtime, 1, state);
                        }
                        break;
                    }
                case 2:
                    {
                        method_set_inte(runtime, 1, state);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
        method_output_pc(runtime);
    }
    function method_set_inte(runtime, port, state) {
        const members = runtime.members;
        const h_m_inte = members.m_inte ?? 0;
        0;
        h_m_inte[port] = state;
        method_check_interrupt(runtime, port);
    }
    function method_pa_r(runtime) {
        const members = runtime.members;
        const h_m_output = members.m_output ?? 0;
        let data = ((255) & 0xff);
        if (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0)) {
            data = ((h_m_output[0]) & 0xff);
        }
        return ((data) & 0xff);
    }
    function method_acka_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_pc6_w(runtime, 0);
        }
        let data = ((method_pa_r(runtime)) & 0xff);
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_pc6_w(runtime, 1);
        }
        return ((data) & 0xff);
    }
    function method_pc6_w(runtime, state) {
        const members = runtime.members;
        const h_m_obf = members.m_obf ?? 0;
        if ((((((Number(method_group_mode(runtime, 0)) === Number(2)) ? 1 : 0)) || ((((((Number(method_group_mode(runtime, 0)) === Number(1)) ? 1 : 0)) && (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            if ((((((h_m_obf[0]) ? 0 : 1)) && (((state) ? 0 : 1))) ? 1 : 0)) {
                0;
                method_set_obf(runtime, 0, 1);
            }
        }
    }
    function method_pb_r(runtime) {
        const members = runtime.members;
        const h_m_output = members.m_output ?? 0;
        let data = ((255) & 0xff);
        if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
            data = ((h_m_output[1]) & 0xff);
        }
        return ((data) & 0xff);
    }
    function method_ackb_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_pc2_w(runtime, 0);
        }
        let data = ((method_pb_r(runtime)) & 0xff);
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_pc2_w(runtime, 1);
        }
        return ((data) & 0xff);
    }
    function method_pc2_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_pb_cb"];
        const h_m_obf = members.m_obf ?? 0;
        const h_m_input = members.m_input ?? 0;
        if (((Number(method_group_mode(runtime, 1)) === Number(1)) ? 1 : 0)) {
            if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
                if ((((((h_m_obf[1]) ? 0 : 1)) && (((state) ? 0 : 1))) ? 1 : 0)) {
                    0;
                    method_set_obf(runtime, 1, 1);
                }
            }
            else {
                if (((state) ? 0 : 1)) {
                    0;
                    h_m_input[1] = (__L0 ? __L0(Number(0)) : typeof members.m_in_pb_cb === 'function' ? members.m_in_pb_cb(0) : runtime.invoke("m_in_pb_cb", 0));
                    method_set_ibf(runtime, 1, 1);
                }
            }
        }
    }
    function method_pc4_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_pa_cb"];
        const h_m_input = members.m_input ?? 0;
        if ((((((Number(method_group_mode(runtime, 0)) === Number(2)) ? 1 : 0)) || ((((((Number(method_group_mode(runtime, 0)) === Number(1)) ? 1 : 0)) && (((Number(method_port_mode(runtime, 0)) === Number(1)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            if (((state) ? 0 : 1)) {
                0;
                h_m_input[0] = (__L0 ? __L0(Number(0)) : typeof members.m_in_pa_cb === 'function' ? members.m_in_pa_cb(0) : runtime.invoke("m_in_pa_cb", 0));
                method_set_ibf(runtime, 0, 1);
            }
        }
    }
    function method_in_pa_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_pa_callback(runtime, members.m_in_pa_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_pa_cb, "bind"));
    }
    function __deref_in_pa_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_in_pb_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_pb_callback(runtime, members.m_in_pb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_pb_cb, "bind"));
    }
    function __deref_in_pb_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_in_pc_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_pc_callback(runtime, members.m_in_pc_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_pc_cb, "bind"));
    }
    function __deref_in_pc_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_pa_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_pa_callback(runtime, members.m_out_pa_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_pa_cb, "bind"));
    }
    function __deref_out_pa_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_pb_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_pb_callback(runtime, members.m_out_pb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_pb_cb, "bind"));
    }
    function __deref_out_pb_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_pc_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_pc_callback(runtime, members.m_out_pc_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_pc_cb, "bind"));
    }
    function __deref_out_pc_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_tri_pa_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tri_pa_callback(runtime, members.m_tri_pa_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tri_pa_cb, "bind"));
    }
    function __deref_tri_pa_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_tri_pb_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tri_pb_callback(runtime, members.m_tri_pb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tri_pb_cb, "bind"));
    }
    function __deref_tri_pb_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_tri_pc_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tri_pc_callback(runtime, members.m_tri_pc_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tri_pc_cb, "bind"));
    }
    function __deref_tri_pc_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8255_device__in_pa_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8255_device__in_pa_callback(runtime, members.m_in_pa_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_pa_cb, "bind"));
    }
    function __deref_i8255_device__in_pa_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8255_device__in_pb_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8255_device__in_pb_callback(runtime, members.m_in_pb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_pb_cb, "bind"));
    }
    function __deref_i8255_device__in_pb_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8255_device__in_pc_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8255_device__in_pc_callback(runtime, members.m_in_pc_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_pc_cb, "bind"));
    }
    function __deref_i8255_device__in_pc_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8255_device__out_pa_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8255_device__out_pa_callback(runtime, members.m_out_pa_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_pa_cb, "bind"));
    }
    function __deref_i8255_device__out_pa_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8255_device__out_pb_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8255_device__out_pb_callback(runtime, members.m_out_pb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_pb_cb, "bind"));
    }
    function __deref_i8255_device__out_pb_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8255_device__out_pc_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8255_device__out_pc_callback(runtime, members.m_out_pc_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_pc_cb, "bind"));
    }
    function __deref_i8255_device__out_pc_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8255_device__tri_pa_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8255_device__tri_pa_callback(runtime, members.m_tri_pa_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tri_pa_cb, "bind"));
    }
    function __deref_i8255_device__tri_pa_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8255_device__tri_pb_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8255_device__tri_pb_callback(runtime, members.m_tri_pb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tri_pb_cb, "bind"));
    }
    function __deref_i8255_device__tri_pb_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_i8255_device__tri_pc_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8255_device__tri_pc_callback(runtime, members.m_tri_pc_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_tri_pc_cb, "bind"));
    }
    function __deref_i8255_device__tri_pc_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "set_inte1": method_set_inte1,
        "check_interrupt": method_check_interrupt,
        "group_mode": method_group_mode,
        "port_mode": method_port_mode,
        "set_intr": method_set_intr,
        "output_pc": method_output_pc,
        "port_c_upper_mode": method_port_c_upper_mode,
        "port_c_lower_mode": method_port_c_lower_mode,
        "set_inte2": method_set_inte2,
        "read": method_read,
        "read_mode0": method_read_mode0,
        "read_mode1": method_read_mode1,
        "set_ibf": method_set_ibf,
        "read_mode2": method_read_mode2,
        "read_pc": method_read_pc,
        "write": method_write,
        "write_mode0": method_write_mode0,
        "write_mode1": method_write_mode1,
        "set_obf": method_set_obf,
        "write_mode2": method_write_mode2,
        "set_mode": method_set_mode,
        "set_pc_bit": method_set_pc_bit,
        "set_inte": method_set_inte,
        "pa_r": method_pa_r,
        "acka_r": method_acka_r,
        "pc6_w": method_pc6_w,
        "pb_r": method_pb_r,
        "ackb_r": method_ackb_r,
        "pc2_w": method_pc2_w,
        "pc4_w": method_pc4_w,
        "in_pa_callback": method_in_pa_callback,
        "in_pb_callback": method_in_pb_callback,
        "in_pc_callback": method_in_pc_callback,
        "out_pa_callback": method_out_pa_callback,
        "out_pb_callback": method_out_pb_callback,
        "out_pc_callback": method_out_pc_callback,
        "tri_pa_callback": method_tri_pa_callback,
        "tri_pb_callback": method_tri_pb_callback,
        "tri_pc_callback": method_tri_pc_callback,
        "i8255_device::in_pa_callback": method_i8255_device__in_pa_callback,
        "i8255_device::in_pb_callback": method_i8255_device__in_pb_callback,
        "i8255_device::in_pc_callback": method_i8255_device__in_pc_callback,
        "i8255_device::out_pa_callback": method_i8255_device__out_pa_callback,
        "i8255_device::out_pb_callback": method_i8255_device__out_pb_callback,
        "i8255_device::out_pc_callback": method_i8255_device__out_pc_callback,
        "i8255_device::tri_pa_callback": method_i8255_device__tri_pa_callback,
        "i8255_device::tri_pb_callback": method_i8255_device__tri_pb_callback,
        "i8255_device::tri_pc_callback": method_i8255_device__tri_pc_callback
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_in_pa_cb", "m_in_pb_cb", "m_in_pc_cb", "m_out_pa_cb", "m_out_pb_cb", "m_out_pc_cb", "m_tri_pa_cb", "m_tri_pb_cb", "m_tri_pc_cb", "machine", "machine().side_effects_disabled"];
export const device = definition;
export default device;
