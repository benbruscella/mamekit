import deviceData from './pic8259.device.ir.json' with { type: 'json' };
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
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let data = ((0) & 0xff);
        switch (offset) {
            case 0:
                {
                    if ((((members.m_ocw3 ?? 0)) & (4))) {
                        if (((Number((members.m_current_level ?? 0)) !== Number(-1)) ? 1 : 0)) {
                            data = ((((128) | ((members.m_current_level ?? 0)))) & 0xff);
                            if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                if (((((((members.m_level_trig_mode ?? 0)) ? 0 : 1)) && (((((((members.m_master ?? 0)) ? 0 : 1)) || (((((((members.m_slave ?? 0)) >>> ((members.m_current_level ?? 0))) & 1)) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_irr = ((((members.m_irr) & ((~((1) << ((members.m_current_level ?? 0))))))) & 0xff);
                                }
                                if ((((members.m_auto_eoi ?? 0)) ? 0 : 1)) {
                                    members.m_isr = ((((members.m_isr) | (((1) << ((members.m_current_level ?? 0)))))) & 0xff);
                                }
                                (__deref_read(runtime, members.m_irq_timer).adjust?.(0) ?? 0);
                            }
                        }
                        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                            members.m_ocw3 = ((((members.m_ocw3) & (251))) & 0xff);
                        }
                    }
                    else {
                        switch ((((members.m_ocw3 ?? 0)) & (1))) {
                            case 0:
                                {
                                    data = (((members.m_irr ?? 0)) & 0xff);
                                    break;
                                }
                            case 1:
                                {
                                    data = (((((members.m_isr ?? 0)) & ((~(members.m_imr ?? 0))))) & 0xff);
                                    break;
                                }
                        }
                    }
                    break;
                }
            case 1:
                {
                    data = (((members.m_imr ?? 0)) & 0xff);
                    break;
                }
        }
        return ((data) & 0xff);
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
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_int_func"];
        data = ((data) & 0xff);
        switch (offset) {
            case 0:
                {
                    if (((data) & (16))) {
                        0;
                        members.m_imr = ((0) & 0xff);
                        members.m_isr = ((0) & 0xff);
                        members.m_slave = ((0) & 0xff);
                        members.m_level_trig_mode = ((((((data) & (8))) ? (1) : (0))) & 0xff);
                        members.m_vector_size = ((((((data) & (4))) ? (1) : (0))) & 0xff);
                        members.m_cascade = ((((((data) & (2))) ? (0) : (1))) & 0xff);
                        members.m_icw4_needed = ((((((data) & (1))) ? (1) : (0))) & 0xff);
                        members.m_vector_addr_low = ((((data) & (224))) >>> 0);
                        members.m_state = 1;
                        members.m_current_level = ((-1) << 24 >> 24);
                        members.m_inta_sequence = ((0) & 0xff);
                        members.m_irr = (((((members.m_level_trig_mode ?? 0)) ? ((members.m_irq_lines ?? 0)) : (0))) & 0xff);
                        (__L0 ? __L0(Number(0)) : typeof members.m_out_int_func === 'function' ? members.m_out_int_func(0) : runtime.invoke("m_out_int_func", 0));
                    }
                    else {
                        if (((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0)) {
                            if (((Number(((data) & (152))) === Number(8)) ? 1 : 0)) {
                                0;
                                if ((((data) >>> (1)) & 1)) {
                                    members.m_ocw3 = (((((((members.m_ocw3 ?? 0)) & (254))) | (((data) & (1))))) & 0xff);
                                }
                                if ((((data) >>> (2)) & 1)) {
                                    members.m_ocw3 = ((((members.m_ocw3) | (4))) & 0xff);
                                }
                                if ((((data) >>> (6)) & 1)) {
                                    members.m_ocw3 = (((((((members.m_ocw3 ?? 0)) & (223))) | (((data) & (32))))) & 0xff);
                                }
                            }
                            else {
                                if (((Number(((data) & (24))) === Number(0)) ? 1 : 0)) {
                                    let n = ((((data) & (7))) | 0);
                                    let mask = ((((1) << (n))) & 0xff);
                                    0;
                                    switch (((data) & (224))) {
                                        case 0:
                                            {
                                                members.m_prio = ((0) & 0xff);
                                                break;
                                            }
                                        case 32:
                                            {
                                                for (n = ((0) | 0), mask = ((((1) << ((members.m_prio ?? 0)))) & 0xff); (((n) < (8)) ? 1 : 0); n = ((((n) + (1))) | 0), mask = ((((((mask) << (1))) | (((mask) >>> (7))))) & 0xff)) {
                                                    if ((((members.m_isr ?? 0)) & (mask))) {
                                                        members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                        break;
                                                    }
                                                }
                                                break;
                                            }
                                        case 64:
                                            {
                                                break;
                                            }
                                        case 96:
                                            {
                                                if ((((members.m_isr ?? 0)) & (mask))) {
                                                    members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                }
                                                break;
                                            }
                                        case 128:
                                            {
                                                members.m_prio = (((((((members.m_prio ?? 0)) + (1))) & (7))) & 0xff);
                                                break;
                                            }
                                        case 160:
                                            {
                                                for (n = ((0) | 0), mask = ((((1) << ((members.m_prio ?? 0)))) & 0xff); (((n) < (8)) ? 1 : 0); n = ((((n) + (1))) | 0), mask = ((((((mask) << (1))) | (((mask) >>> (7))))) & 0xff)) {
                                                    if ((((members.m_isr ?? 0)) & (mask))) {
                                                        members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                        members.m_prio = (((((((members.m_prio ?? 0)) + (1))) & (7))) & 0xff);
                                                        break;
                                                    }
                                                }
                                                break;
                                            }
                                        case 192:
                                            {
                                                members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                                                break;
                                            }
                                        case 224:
                                            {
                                                if ((((members.m_isr ?? 0)) & (mask))) {
                                                    members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                    members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                                                }
                                                break;
                                            }
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            case 1:
                {
                    switch ((members.m_state ?? 0)) {
                        case 0:
                            {
                                break;
                            }
                        case 1:
                            {
                                0;
                                members.m_base = ((((data) & (248))) & 0xff);
                                members.m_vector_addr_high = ((data) & 0xff);
                                if ((members.m_cascade ?? 0)) {
                                    members.m_state = 2;
                                }
                                else {
                                    members.m_state = (((members.m_icw4_needed ?? 0)) ? (3) : (4));
                                }
                                break;
                            }
                        case 2:
                            {
                                0;
                                members.m_slave = ((data) & 0xff);
                                members.m_state = (((members.m_icw4_needed ?? 0)) ? (3) : (4));
                                break;
                            }
                        case 3:
                            {
                                0;
                                members.m_nested = ((((((data) & (16))) ? (1) : (0))) & 0xff);
                                members.m_mode = ((((((data) >>> (2))) & (3))) & 0xff);
                                members.m_auto_eoi = ((((((data) & (2))) ? (1) : (0))) & 0xff);
                                members.m_is_x86 = ((((((data) & (1))) ? (1) : (0))) & 0xff);
                                members.m_state = 4;
                                break;
                            }
                        case 4:
                            {
                                0;
                                members.m_imr = ((data) & 0xff);
                                break;
                            }
                    }
                    break;
                }
        }
        (__deref_write(runtime, members.m_irq_timer).adjust?.(0) ?? 0);
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
    function method_pic8259_device__write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_int_func"];
        data = ((data) & 0xff);
        switch (offset) {
            case 0:
                {
                    if (((data) & (16))) {
                        0;
                        members.m_imr = ((0) & 0xff);
                        members.m_isr = ((0) & 0xff);
                        members.m_slave = ((0) & 0xff);
                        members.m_level_trig_mode = ((((((data) & (8))) ? (1) : (0))) & 0xff);
                        members.m_vector_size = ((((((data) & (4))) ? (1) : (0))) & 0xff);
                        members.m_cascade = ((((((data) & (2))) ? (0) : (1))) & 0xff);
                        members.m_icw4_needed = ((((((data) & (1))) ? (1) : (0))) & 0xff);
                        members.m_vector_addr_low = ((((data) & (224))) >>> 0);
                        members.m_state = 1;
                        members.m_current_level = ((-1) << 24 >> 24);
                        members.m_inta_sequence = ((0) & 0xff);
                        members.m_irr = (((((members.m_level_trig_mode ?? 0)) ? ((members.m_irq_lines ?? 0)) : (0))) & 0xff);
                        (__L0 ? __L0(Number(0)) : typeof members.m_out_int_func === 'function' ? members.m_out_int_func(0) : runtime.invoke("m_out_int_func", 0));
                    }
                    else {
                        if (((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0)) {
                            if (((Number(((data) & (152))) === Number(8)) ? 1 : 0)) {
                                0;
                                if ((((data) >>> (1)) & 1)) {
                                    members.m_ocw3 = (((((((members.m_ocw3 ?? 0)) & (254))) | (((data) & (1))))) & 0xff);
                                }
                                if ((((data) >>> (2)) & 1)) {
                                    members.m_ocw3 = ((((members.m_ocw3) | (4))) & 0xff);
                                }
                                if ((((data) >>> (6)) & 1)) {
                                    members.m_ocw3 = (((((((members.m_ocw3 ?? 0)) & (223))) | (((data) & (32))))) & 0xff);
                                }
                            }
                            else {
                                if (((Number(((data) & (24))) === Number(0)) ? 1 : 0)) {
                                    let n = ((((data) & (7))) | 0);
                                    let mask = ((((1) << (n))) & 0xff);
                                    0;
                                    switch (((data) & (224))) {
                                        case 0:
                                            {
                                                members.m_prio = ((0) & 0xff);
                                                break;
                                            }
                                        case 32:
                                            {
                                                for (n = ((0) | 0), mask = ((((1) << ((members.m_prio ?? 0)))) & 0xff); (((n) < (8)) ? 1 : 0); n = ((((n) + (1))) | 0), mask = ((((((mask) << (1))) | (((mask) >>> (7))))) & 0xff)) {
                                                    if ((((members.m_isr ?? 0)) & (mask))) {
                                                        members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                        break;
                                                    }
                                                }
                                                break;
                                            }
                                        case 64:
                                            {
                                                break;
                                            }
                                        case 96:
                                            {
                                                if ((((members.m_isr ?? 0)) & (mask))) {
                                                    members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                }
                                                break;
                                            }
                                        case 128:
                                            {
                                                members.m_prio = (((((((members.m_prio ?? 0)) + (1))) & (7))) & 0xff);
                                                break;
                                            }
                                        case 160:
                                            {
                                                for (n = ((0) | 0), mask = ((((1) << ((members.m_prio ?? 0)))) & 0xff); (((n) < (8)) ? 1 : 0); n = ((((n) + (1))) | 0), mask = ((((((mask) << (1))) | (((mask) >>> (7))))) & 0xff)) {
                                                    if ((((members.m_isr ?? 0)) & (mask))) {
                                                        members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                        members.m_prio = (((((((members.m_prio ?? 0)) + (1))) & (7))) & 0xff);
                                                        break;
                                                    }
                                                }
                                                break;
                                            }
                                        case 192:
                                            {
                                                members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                                                break;
                                            }
                                        case 224:
                                            {
                                                if ((((members.m_isr ?? 0)) & (mask))) {
                                                    members.m_isr = ((((members.m_isr) & ((~mask)))) & 0xff);
                                                    members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                                                }
                                                break;
                                            }
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            case 1:
                {
                    switch ((members.m_state ?? 0)) {
                        case 0:
                            {
                                break;
                            }
                        case 1:
                            {
                                0;
                                members.m_base = ((((data) & (248))) & 0xff);
                                members.m_vector_addr_high = ((data) & 0xff);
                                if ((members.m_cascade ?? 0)) {
                                    members.m_state = 2;
                                }
                                else {
                                    members.m_state = (((members.m_icw4_needed ?? 0)) ? (3) : (4));
                                }
                                break;
                            }
                        case 2:
                            {
                                0;
                                members.m_slave = ((data) & 0xff);
                                members.m_state = (((members.m_icw4_needed ?? 0)) ? (3) : (4));
                                break;
                            }
                        case 3:
                            {
                                0;
                                members.m_nested = ((((((data) & (16))) ? (1) : (0))) & 0xff);
                                members.m_mode = ((((((data) >>> (2))) & (3))) & 0xff);
                                members.m_auto_eoi = ((((((data) & (2))) ? (1) : (0))) & 0xff);
                                members.m_is_x86 = ((((((data) & (1))) ? (1) : (0))) & 0xff);
                                members.m_state = 4;
                                break;
                            }
                        case 4:
                            {
                                0;
                                members.m_imr = ((data) & 0xff);
                                break;
                            }
                    }
                    break;
                }
        }
        (__deref_pic8259_device__write(runtime, members.m_irq_timer).adjust?.(0) ?? 0);
    }
    function __deref_pic8259_device__write(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_int_func"];
        for (let n = ((0) | 0), irq = (((members.m_prio ?? 0)) | 0); (((n) < (8)) ? 1 : 0); n = ((((n) + (1))) | 0), irq = ((((((irq) + (1))) & (7))) | 0)) {
            let mask = ((((1) << (irq))) & 0xff);
            if (((((((members.m_isr ?? 0)) & (mask))) && (((((((((((((members.m_master ?? 0)) && ((members.m_cascade ?? 0))) ? 1 : 0)) && ((members.m_nested ?? 0))) ? 1 : 0)) && ((((members.m_slave ?? 0)) & (mask)))) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) {
                0;
                break;
            }
            if (((((((((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0)) && ((((members.m_irr ?? 0)) & (mask)))) ? 1 : 0)) && ((((((members.m_imr ?? 0)) & (mask))) ? 0 : 1))) ? 1 : 0)) {
                0;
                members.m_current_level = ((irq) << 24 >> 24);
                (__L0 ? __L0(Number(1)) : typeof members.m_out_int_func === 'function' ? members.m_out_int_func(1) : runtime.invoke("m_out_int_func", 1));
                return;
            }
            if ((((((((((((((((members.m_isr ?? 0)) & (mask))) && ((members.m_master ?? 0))) ? 1 : 0)) && ((members.m_cascade ?? 0))) ? 1 : 0)) && ((members.m_nested ?? 0))) ? 1 : 0)) && ((((members.m_slave ?? 0)) & (mask)))) ? 1 : 0)) {
                break;
            }
        }
        members.m_current_level = ((-1) << 24 >> 24);
        (__L0 ? __L0(Number(0)) : typeof members.m_out_int_func === 'function' ? members.m_out_int_func(0) : runtime.invoke("m_out_int_func", 0));
    }
    function method_out_int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_int_callback(runtime, members.m_out_int_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_func, "bind"));
    }
    function __deref_out_int_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_in_sp_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_sp_callback(runtime, members.m_in_sp_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_sp_func, "bind"));
    }
    function __deref_in_sp_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_read_slave_ack_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_slave_ack_callback(runtime, members.m_read_slave_ack_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_slave_ack_func, "bind"));
    }
    function __deref_read_slave_ack_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ir0_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 0, state);
    }
    function method_set_irq_line(runtime, irq, state) {
        const members = runtime.members;
        let mask = ((((1) << (irq))) & 0xff);
        if ((((state) && ((((((members.m_irq_lines ?? 0)) & (mask))) ? 0 : 1))) ? 1 : 0)) {
            0;
            members.m_irr = ((((members.m_irr) | (mask))) & 0xff);
            members.m_irq_lines = ((((members.m_irq_lines) | (mask))) & 0xff);
        }
        else {
            if ((((((state) ? 0 : 1)) && ((((members.m_irq_lines ?? 0)) & (mask)))) ? 1 : 0)) {
                0;
                members.m_irq_lines = ((((members.m_irq_lines) & ((~mask)))) & 0xff);
                members.m_irr = ((((members.m_irr) & ((~mask)))) & 0xff);
            }
        }
        if (((((members.m_inta_sequence ?? 0)) === (0)) ? 1 : 0)) {
            (__deref_set_irq_line(runtime, members.m_irq_timer).adjust?.(0) ?? 0);
        }
    }
    function __deref_set_irq_line(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ir1_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 1, state);
    }
    function method_ir2_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 2, state);
    }
    function method_ir3_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 3, state);
    }
    function method_ir4_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 4, state);
    }
    function method_ir5_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 5, state);
    }
    function method_ir6_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 6, state);
    }
    function method_ir7_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 7, state);
    }
    function method_is_x86(runtime) {
        const members = runtime.members;
        return (members.m_is_x86 ?? 0);
    }
    function method_pic8259_device__out_int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pic8259_device__out_int_callback(runtime, members.m_out_int_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_func, "bind"));
    }
    function __deref_pic8259_device__out_int_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pic8259_device__in_sp_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pic8259_device__in_sp_callback(runtime, members.m_in_sp_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_sp_func, "bind"));
    }
    function __deref_pic8259_device__in_sp_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pic8259_device__read_slave_ack_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pic8259_device__read_slave_ack_callback(runtime, members.m_read_slave_ack_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_read_slave_ack_func, "bind"));
    }
    function __deref_pic8259_device__read_slave_ack_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_pic8259_device__ir0_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 0, state);
    }
    function method_pic8259_device__ir1_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 1, state);
    }
    function method_pic8259_device__ir2_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 2, state);
    }
    function method_pic8259_device__ir3_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 3, state);
    }
    function method_pic8259_device__ir4_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 4, state);
    }
    function method_pic8259_device__ir5_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 5, state);
    }
    function method_pic8259_device__ir6_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 6, state);
    }
    function method_pic8259_device__ir7_w(runtime, state) {
        const members = runtime.members;
        method_set_irq_line(runtime, 7, state);
    }
    function method_pic8259_device__is_x86(runtime) {
        const members = runtime.members;
        return (members.m_is_x86 ?? 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "pic8259_device::write": method_pic8259_device__write,
        "irq_timer_tick": method_irq_timer_tick,
        "out_int_callback": method_out_int_callback,
        "in_sp_callback": method_in_sp_callback,
        "read_slave_ack_callback": method_read_slave_ack_callback,
        "ir0_w": method_ir0_w,
        "set_irq_line": method_set_irq_line,
        "ir1_w": method_ir1_w,
        "ir2_w": method_ir2_w,
        "ir3_w": method_ir3_w,
        "ir4_w": method_ir4_w,
        "ir5_w": method_ir5_w,
        "ir6_w": method_ir6_w,
        "ir7_w": method_ir7_w,
        "is_x86": method_is_x86,
        "pic8259_device::out_int_callback": method_pic8259_device__out_int_callback,
        "pic8259_device::in_sp_callback": method_pic8259_device__in_sp_callback,
        "pic8259_device::read_slave_ack_callback": method_pic8259_device__read_slave_ack_callback,
        "pic8259_device::ir0_w": method_pic8259_device__ir0_w,
        "pic8259_device::ir1_w": method_pic8259_device__ir1_w,
        "pic8259_device::ir2_w": method_pic8259_device__ir2_w,
        "pic8259_device::ir3_w": method_pic8259_device__ir3_w,
        "pic8259_device::ir4_w": method_pic8259_device__ir4_w,
        "pic8259_device::ir5_w": method_pic8259_device__ir5_w,
        "pic8259_device::ir6_w": method_pic8259_device__ir6_w,
        "pic8259_device::ir7_w": method_pic8259_device__ir7_w,
        "pic8259_device::is_x86": method_pic8259_device__is_x86
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_out_int_func", "machine", "machine().side_effects_disabled"];
export const device = definition;
export default device;
