import deviceData from './i8257.device.ir.json' with { type: 'json' };
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
    function method_set_hreq(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_hrq_cb"], __L1 = __l["abort_timeslice"];
        0;
        if (((((members.m_hreq ?? 0)) !== (state)) ? 1 : 0)) {
            (__L0 ? __L0(Number(state)) : typeof members.m_out_hrq_cb === 'function' ? members.m_out_hrq_cb(state) : runtime.invoke("m_out_hrq_cb", state));
            members.m_hreq = ((state) | 0);
            (__L1 ? __L1() : runtime.macro("abort_timeslice"));
        }
    }
    function method_set_tc(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_tc_cb"];
        0;
        if (((Number((members.m_tc ?? 0)) !== Number(state)) ? 1 : 0)) {
            (__L0 ? __L0(Number(state)) : typeof members.m_out_tc_cb === 'function' ? members.m_out_tc_cb(state) : runtime.invoke("m_out_tc_cb", state));
            members.m_tc = ((state) ? 1 : 0);
        }
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        0;
        members.m_state = ((0) | 0);
        members.m_transfer_mode = ((0) & 0xff);
        members.m_status = ((0) & 0xff);
        members.m_msb = ((0) | 0);
        members.m_current_channel = ((-1) | 0);
        members.m_last_channel = ((3) | 0);
        members.m_hreq = ((-1) | 0);
        members.m_tc = ((0) ? 1 : 0);
        for (let __range0 = h_m_channel, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            __range0_item.m_address = 0;
            __range0_item.m_count = 0;
            __range0_item.m_mode = 0;
        }
        method_set_hreq(runtime, 0);
        method_set_dack(runtime);
    }
    function method_set_dack(runtime) {
        const members = runtime.members;
        0;
        for (let ch = ((0) | 0); (((ch) < (4)) ? 1 : 0); ch = ((((ch) + (1))) | 0)) {
            (members.m_out_dack_cb ?? 0)[ch](((((members.m_current_channel ?? 0)) !== (ch)) ? 1 : 0));
        }
    }
    function method_execute_run(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["suspend_until_trigger"];
        const h_m_channel = members.m_channel ?? 0;
        0;
        do {
            switch ((members.m_state ?? 0)) {
                case 0:
                    {
                        method_set_tc(runtime, 0);
                        if (method_next_channel(runtime)) {
                            members.m_state = ((1) | 0);
                        }
                        else {
                            members.m_icount = ((0) | 0);
                            (__L0 ? __L0(1, 1) : runtime.macro("suspend_until_trigger", 1, 1));
                        }
                        break;
                    }
                case 1:
                    {
                        method_set_hreq(runtime, 1);
                        if ((members.m_hack ?? 0)) {
                            members.m_state = ((2) | 0);
                        }
                        else {
                            members.m_icount = ((0) | 0);
                            (__L0 ? __L0(1, 1) : runtime.macro("suspend_until_trigger", 1, 1));
                        }
                        break;
                    }
                case 2:
                    {
                        method_set_tc(runtime, 0);
                        members.m_state = ((3) | 0);
                        break;
                    }
                case 3:
                    {
                        method_set_dack(runtime);
                        members.m_state = ((4) | 0);
                        break;
                    }
                case 4:
                    {
                        method_dma_read(runtime);
                        if (((((members.m_transfer_mode ?? 0)) >>> (5)) & 1)) {
                            method_dma_write(runtime);
                        }
                        if ((members.m_ready ?? 0)) {
                            members.m_state = ((6) | 0);
                            if (((((((h_m_channel[(members.m_current_channel ?? 0)].m_count) === (0)) ? 1 : 0)) && (((Number(h_m_channel[(members.m_current_channel ?? 0)].m_mode) !== Number(2)) ? 1 : 0))) ? 1 : 0)) {
                                method_set_tc(runtime, 1);
                            }
                        }
                        else {
                            members.m_state = ((5) | 0);
                        }
                        break;
                    }
                case 5:
                    {
                        if ((members.m_ready ?? 0)) {
                            members.m_state = ((6) | 0);
                            if (((((((h_m_channel[(members.m_current_channel ?? 0)].m_count) === (0)) ? 1 : 0)) && (((Number(h_m_channel[(members.m_current_channel ?? 0)].m_mode) !== Number(2)) ? 1 : 0))) ? 1 : 0)) {
                                method_set_tc(runtime, 1);
                            }
                        }
                        break;
                    }
                case 6:
                    {
                        if (((((((members.m_transfer_mode ?? 0)) >>> (5)) & 1)) ? 0 : 1)) {
                            method_dma_write(runtime);
                        }
                        if (((((((h_m_channel[(members.m_current_channel ?? 0)].m_count) === (0)) ? 1 : 0)) && (((Number(h_m_channel[(members.m_current_channel ?? 0)].m_mode) === Number(2)) ? 1 : 0))) ? 1 : 0)) {
                            method_set_tc(runtime, 1);
                        }
                        method_advance(runtime);
                        if (((((members.m_hack ?? 0)) && (method_next_channel(runtime))) ? 1 : 0)) {
                            members.m_state = ((2) | 0);
                        }
                        else {
                            method_set_hreq(runtime, 0);
                            members.m_current_channel = ((-1) | 0);
                            members.m_state = ((0) | 0);
                            method_set_dack(runtime);
                        }
                        break;
                    }
            }
            members.m_icount = ((((members.m_icount) - (1))) | 0);
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function method_next_channel(runtime) {
        const members = runtime.members;
        0;
        let priority = new Int32Array([0, 1, 2, 3]);
        if (((((members.m_transfer_mode ?? 0)) >>> (4)) & 1)) {
            let last_channel = (((members.m_last_channel ?? 0)) | 0);
            for (let channel = ((3) | 0); (((channel) >= (0)) ? 1 : 0); channel = ((((channel) - (1))) | 0)) {
                priority[channel] = last_channel;
                last_channel = ((((last_channel) - (1))) | 0);
                if ((((last_channel) < (0)) ? 1 : 0)) {
                    last_channel = ((3) | 0);
                }
            }
        }
        for (let __range0 = priority, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            if (method_is_request_active(runtime, __range0_item)) {
                members.m_current_channel = (((members.m_last_channel = ((__range0_item) | 0))) | 0);
                return 1;
            }
        }
        return 0;
    }
    function method_is_request_active(runtime, channel) {
        const members = runtime.members;
        0;
        return (((((((members.m_request ?? 0)) >>> (channel)) & 1)) && (((((members.m_transfer_mode ?? 0)) >>> (channel)) & 1))) ? 1 : 0);
    }
    function method_dma_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_memr_cb"];
        const h_m_channel = members.m_channel ?? 0;
        0;
        let offset = h_m_channel[(members.m_current_channel ?? 0)].m_address;
        switch (h_m_channel[(members.m_current_channel ?? 0)].m_mode) {
            case 0:
                {
                    break;
                }
            case 1:
                {
                    0;
                    members.m_temp = (((members.m_in_ior_cb ?? 0)[(members.m_current_channel ?? 0)](offset)) & 0xff);
                    break;
                }
            case 2:
                {
                    0;
                    members.m_temp = (((__L0 ? __L0(Number(offset)) : typeof members.m_in_memr_cb === 'function' ? members.m_in_memr_cb(offset) : runtime.invoke("m_in_memr_cb", offset))) & 0xff);
                    break;
                }
        }
        0;
    }
    function method_dma_write(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_memw_cb"];
        const h_m_channel = members.m_channel ?? 0;
        0;
        let offset = h_m_channel[(members.m_current_channel ?? 0)].m_address;
        switch (h_m_channel[(members.m_current_channel ?? 0)].m_mode) {
            case 0:
                {
                    0;
                    (members.m_verify_cb ?? 0)[(members.m_current_channel ?? 0)](offset);
                    break;
                }
            case 1:
                {
                    0;
                    (__L0 ? __L0(Number(offset), Number((members.m_temp ?? 0))) : typeof members.m_out_memw_cb === 'function' ? members.m_out_memw_cb(offset, (members.m_temp ?? 0)) : runtime.invoke("m_out_memw_cb", offset, (members.m_temp ?? 0)));
                    break;
                }
            case 2:
                {
                    0;
                    (members.m_out_iow_cb ?? 0)[(members.m_current_channel ?? 0)](offset, (members.m_temp ?? 0));
                    break;
                }
        }
        0;
    }
    function method_advance(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        0;
        let tc = (((members.m_tc ?? 0)) ? 1 : 0);
        let al = (((((((((members.m_transfer_mode ?? 0)) >>> (7)) & 1)) && (((((members.m_current_channel ?? 0)) === (2)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        method_set_tc(runtime, 0);
        if (tc) {
            members.m_status = ((((members.m_status) | (((1) << ((members.m_current_channel ?? 0)))))) & 0xff);
            if (al) {
                h_m_channel[2].m_address = ((h_m_channel[3].m_address) & 0xffff);
                h_m_channel[2].m_count = ((h_m_channel[3].m_count) & 0xffff);
                h_m_channel[2].m_mode = ((h_m_channel[3].m_mode) & 0xff);
            }
            else {
                if (((((members.m_transfer_mode ?? 0)) >>> (6)) & 1)) {
                    members.m_transfer_mode = ((((members.m_transfer_mode) & ((~((1) << ((members.m_current_channel ?? 0))))))) & 0xff);
                }
            }
        }
        if ((((((al) && (tc)) ? 1 : 0)) ? 0 : 1)) {
            h_m_channel[(members.m_current_channel ?? 0)].m_count = ((((h_m_channel[(members.m_current_channel ?? 0)].m_count) - (1))) & 0xffff);
            h_m_channel[(members.m_current_channel ?? 0)].m_count = ((((h_m_channel[(members.m_current_channel ?? 0)].m_count) & (16383))) & 0xffff);
            h_m_channel[(members.m_current_channel ?? 0)].m_address = ((((h_m_channel[(members.m_current_channel ?? 0)].m_address) + (1))) & 0xffff);
        }
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        const h_m_channel = members.m_channel ?? 0;
        0;
        let data = ((0) & 0xff);
        if ((((((offset) >>> (3)) & 1)) ? 0 : 1)) {
            let channel = ((((((offset) >>> (1))) & (3))) | 0);
            switch (((offset) & (1))) {
                case 0:
                    {
                        if ((members.m_msb ?? 0)) {
                            data = ((((h_m_channel[channel].m_address) >>> (8))) & 0xff);
                        }
                        else {
                            data = ((((h_m_channel[channel].m_address) & (255))) & 0xff);
                        }
                        break;
                    }
                case 1:
                    {
                        if ((members.m_msb ?? 0)) {
                            data = ((((h_m_channel[channel].m_count) >>> (8))) & 0xff);
                            if (((((members.m_reverse_rw ?? 0)) && (h_m_channel[channel].m_mode)) ? 1 : 0)) {
                                data = ((((data) | ((((((h_m_channel[channel].m_mode) === (1)) ? 1 : 0)) ? (128) : (64))))) & 0xff);
                            }
                            else {
                                data = ((((data) | (((h_m_channel[channel].m_mode) << (6))))) & 0xff);
                            }
                        }
                        else {
                            data = ((((h_m_channel[channel].m_count) & (255))) & 0xff);
                        }
                        break;
                    }
            }
            if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                members.m_msb = (((((members.m_msb ?? 0)) ? 0 : 1)) | 0);
            }
        }
        else {
            if (((Number(offset) === Number(8)) ? 1 : 0)) {
                data = (((members.m_status ?? 0)) & 0xff);
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_status = ((((members.m_status) & (240))) & 0xff);
                }
            }
        }
        return ((data) & 0xff);
    }
    function method_hlda_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["trigger"];
        0;
        members.m_hack = ((state) | 0);
        (__L0 ? __L0(1) : runtime.macro("trigger", 1));
    }
    function method_ready_w(runtime, state) {
        const members = runtime.members;
        0;
        members.m_ready = ((state) | 0);
    }
    function method_dreq0_w(runtime, state) {
        const members = runtime.members;
        0;
        method_dma_request(runtime, 0, state);
    }
    function method_dma_request(runtime, channel, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["trigger"];
        0;
        if (state) {
            members.m_request = ((((members.m_request) | (((1) << (channel))))) & 0xff);
        }
        else {
            members.m_request = ((((members.m_request) & ((~((1) << (channel)))))) & 0xff);
        }
        (__L0 ? __L0(1) : runtime.macro("trigger", 1));
    }
    function method_dreq1_w(runtime, state) {
        const members = runtime.members;
        0;
        method_dma_request(runtime, 1, state);
    }
    function method_dreq2_w(runtime, state) {
        const members = runtime.members;
        0;
        method_dma_request(runtime, 2, state);
    }
    function method_dreq3_w(runtime, state) {
        const members = runtime.members;
        0;
        method_dma_request(runtime, 3, state);
    }
    function method_out_hrq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_hrq_cb(runtime, members.m_out_hrq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_hrq_cb, "bind"));
    }
    function __deref_out_hrq_cb(runtime, p) {
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
    function method_out_tc_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_tc_cb(runtime, members.m_out_tc_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_tc_cb, "bind"));
    }
    function __deref_out_tc_cb(runtime, p) {
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
    function method_in_memr_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_memr_cb(runtime, members.m_in_memr_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_memr_cb, "bind"));
    }
    function __deref_in_memr_cb(runtime, p) {
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
    function method_out_memw_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_memw_cb(runtime, members.m_out_memw_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_memw_cb, "bind"));
    }
    function __deref_out_memw_cb(runtime, p) {
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
    function method_in_ior_cb_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_ior_cb_1(runtime, (members.m_in_ior_cb ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_in_ior_cb ?? 0)[1], "bind"));
    }
    function __deref_in_ior_cb_1(runtime, p) {
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
    function method_out_iow_cb_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_iow_cb_0(runtime, (members.m_out_iow_cb ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_out_iow_cb ?? 0)[0], "bind"));
    }
    function __deref_out_iow_cb_0(runtime, p) {
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
    function method_set_reverse_rw_mode(runtime, flag) {
        const members = runtime.members;
        members.m_reverse_rw = ((flag) ? 1 : 0);
    }
    function method_i8257_device__out_hrq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8257_device__out_hrq_cb(runtime, members.m_out_hrq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_hrq_cb, "bind"));
    }
    function __deref_i8257_device__out_hrq_cb(runtime, p) {
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
    function method_i8257_device__out_tc_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8257_device__out_tc_cb(runtime, members.m_out_tc_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_tc_cb, "bind"));
    }
    function __deref_i8257_device__out_tc_cb(runtime, p) {
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
    function method_i8257_device__in_memr_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8257_device__in_memr_cb(runtime, members.m_in_memr_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_memr_cb, "bind"));
    }
    function __deref_i8257_device__in_memr_cb(runtime, p) {
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
    function method_i8257_device__out_memw_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8257_device__out_memw_cb(runtime, members.m_out_memw_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_memw_cb, "bind"));
    }
    function __deref_i8257_device__out_memw_cb(runtime, p) {
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
    function method_i8257_device__in_ior_cb_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8257_device__in_ior_cb_1(runtime, (members.m_in_ior_cb ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_in_ior_cb ?? 0)[1], "bind"));
    }
    function __deref_i8257_device__in_ior_cb_1(runtime, p) {
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
    function method_i8257_device__out_iow_cb_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8257_device__out_iow_cb_0(runtime, (members.m_out_iow_cb ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_out_iow_cb ?? 0)[0], "bind"));
    }
    function __deref_i8257_device__out_iow_cb_0(runtime, p) {
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
    function method_i8257_device__set_reverse_rw_mode(runtime, flag) {
        const members = runtime.members;
        members.m_reverse_rw = ((flag) ? 1 : 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "set_hreq": method_set_hreq,
        "set_tc": method_set_tc,
        "device_reset": method_device_reset,
        "set_dack": method_set_dack,
        "execute_run": method_execute_run,
        "next_channel": method_next_channel,
        "is_request_active": method_is_request_active,
        "dma_read": method_dma_read,
        "dma_write": method_dma_write,
        "advance": method_advance,
        "read": method_read,
        "hlda_w": method_hlda_w,
        "ready_w": method_ready_w,
        "dreq0_w": method_dreq0_w,
        "dma_request": method_dma_request,
        "dreq1_w": method_dreq1_w,
        "dreq2_w": method_dreq2_w,
        "dreq3_w": method_dreq3_w,
        "out_hrq_cb": method_out_hrq_cb,
        "out_tc_cb": method_out_tc_cb,
        "in_memr_cb": method_in_memr_cb,
        "out_memw_cb": method_out_memw_cb,
        "in_ior_cb_1": method_in_ior_cb_1,
        "out_iow_cb_0": method_out_iow_cb_0,
        "set_reverse_rw_mode": method_set_reverse_rw_mode,
        "i8257_device::out_hrq_cb": method_i8257_device__out_hrq_cb,
        "i8257_device::out_tc_cb": method_i8257_device__out_tc_cb,
        "i8257_device::in_memr_cb": method_i8257_device__in_memr_cb,
        "i8257_device::out_memw_cb": method_i8257_device__out_memw_cb,
        "i8257_device::in_ior_cb_1": method_i8257_device__in_ior_cb_1,
        "i8257_device::out_iow_cb_0": method_i8257_device__out_iow_cb_0,
        "i8257_device::set_reverse_rw_mode": method_i8257_device__set_reverse_rw_mode
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["abort_timeslice", "m_in_memr_cb", "m_out_hrq_cb", "m_out_memw_cb", "m_out_tc_cb", "machine", "machine().side_effects_disabled", "suspend_until_trigger", "trigger"];
export const device = definition;
export default device;
