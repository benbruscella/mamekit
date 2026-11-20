import deviceData from './z80dma.device.ir.json' with { type: 'json' };
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
    function method_set_busrq(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_busreq_cb"];
        members.m_busrq = ((state) | 0);
        (__L0 ? __L0(Number((members.m_busrq ?? 0))) : typeof members.m_out_busreq_cb === 'function' ? members.m_out_busreq_cb((members.m_busrq ?? 0)) : runtime.invoke("m_out_busreq_cb", (members.m_busrq ?? 0)));
        method_update_bao(runtime);
    }
    function method_update_bao(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_bao_cb"];
        (__L0 ? __L0(Number(((((((members.m_busrq ?? 0)) ? 0 : 1)) && ((members.m_busrq_ack ?? 0))) ? 1 : 0))) : typeof members.m_out_bao_cb === 'function' ? members.m_out_bao_cb(((((((members.m_busrq ?? 0)) ? 0 : 1)) && ((members.m_busrq_ack ?? 0))) ? 1 : 0)) : runtime.invoke("m_out_bao_cb", ((((((members.m_busrq ?? 0)) ? 0 : 1)) && ((members.m_busrq_ack ?? 0))) ? 1 : 0)));
    }
    function method_write(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13;
        data = ((data) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_regs_follow = members.m_regs_follow ?? 0;
        if (((((members.m_num_follow ?? 0)) === (0)) ? 1 : 0)) {
            members.m_reset_pointer = ((0) & 0xff);
            if (((Number(((data) & (135))) === Number(0)) ? 1 : 0)) {
                0;
                h_m_regs[method_REGNUM(runtime, 2, 0)] = data;
                if (((data) & (64))) {
                    h_m_regs_follow[(__t0 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t0)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 2, 1)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                }
            }
            else {
                if (((Number(((data) & (135))) === Number(4)) ? 1 : 0)) {
                    0;
                    h_m_regs[method_REGNUM(runtime, 1, 0)] = data;
                    if (((data) & (64))) {
                        h_m_regs_follow[(__t1 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t1)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 1, 1)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                    }
                }
                else {
                    if (((Number(((data) & (128))) === Number(0)) ? 1 : 0)) {
                        0;
                        h_m_regs[method_REGNUM(runtime, 0, 0)] = data;
                        if (((data) & (8))) {
                            h_m_regs_follow[(__t2 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t2)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 1)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                        }
                        if (((data) & (16))) {
                            h_m_regs_follow[(__t3 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t3)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 2)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                        }
                        if (((data) & (32))) {
                            h_m_regs_follow[(__t4 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t4)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 3)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                        }
                        if (((data) & (64))) {
                            h_m_regs_follow[(__t5 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t5)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 4)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                        }
                    }
                    else {
                        if (((Number(((data) & (131))) === Number(128)) ? 1 : 0)) {
                            0;
                            h_m_regs[method_REGNUM(runtime, 3, 0)] = data;
                            if (((data) & (8))) {
                                h_m_regs_follow[(__t6 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t6)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 3, 1)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                            }
                            if (((data) & (16))) {
                                h_m_regs_follow[(__t7 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t7)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 3, 2)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                            }
                            if ((((data) >>> (6)) & 1)) {
                                method_enable(runtime);
                            }
                        }
                        else {
                            if (((Number(((data) & (131))) === Number(129)) ? 1 : 0)) {
                                0;
                                h_m_regs[method_REGNUM(runtime, 4, 0)] = data;
                                if (((data) & (4))) {
                                    h_m_regs_follow[(__t8 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t8)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 4, 1)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                                }
                                if (((data) & (8))) {
                                    h_m_regs_follow[(__t9 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t9)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 4, 2)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                                }
                                if (((data) & (16))) {
                                    h_m_regs_follow[(__t10 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t10)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 4, 3)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                                }
                            }
                            else {
                                if (((Number(((data) & (199))) === Number(130)) ? 1 : 0)) {
                                    0;
                                    h_m_regs[method_REGNUM(runtime, 5, 0)] = data;
                                }
                                else {
                                    if (((Number(((data) & (131))) === Number(131)) ? 1 : 0)) {
                                        0;
                                        h_m_regs[method_REGNUM(runtime, 6, 0)] = data;
                                        switch (data) {
                                            case 183:
                                                {
                                                    (__L0 ? __L0("Unimplemented m_regs[REGNUM((6), (0))] command %02x\n", data) : runtime.macro("fatalerror", "Unimplemented m_regs[REGNUM((6), (0))] command %02x\n", data));
                                                }
                                            case 191:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 6, 1)] = 1;
                                                    members.m_read_cur_follow = ((0) & 0xff);
                                                    break;
                                                }
                                            case 163:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 3, 0)] = ((h_m_regs[method_REGNUM(runtime, 3, 0)]) & (-33));
                                                    members.m_ip = ((0) | 0);
                                                    members.m_ius = ((0) | 0);
                                                    members.m_force_ready = ((0) | 0);
                                                    members.m_status = ((((members.m_status) | (8))) & 0xff);
                                                    break;
                                                }
                                            case 167:
                                                {
                                                    0;
                                                    method_setup_next_read(runtime, 0);
                                                    break;
                                                }
                                            case 195:
                                                {
                                                    0;
                                                    method_disable(runtime);
                                                    members.m_force_ready = ((0) | 0);
                                                    members.m_ip = ((0) | 0);
                                                    members.m_ius = ((0) | 0);
                                                    method_interrupt_check(runtime);
                                                    for (let WRi = ((0) & 0xff); (((WRi) < (7)) ? 1 : 0); WRi = ((((WRi) + (1))) & 0xff)) {
                                                        h_m_regs[method_REGNUM(runtime, WRi, (members.m_reset_pointer ?? 0))] = 0;
                                                    }
                                                    members.m_reset_pointer = ((((members.m_reset_pointer) + (1))) & 0xff);
                                                    if (((((members.m_reset_pointer ?? 0)) >= (6)) ? 1 : 0)) {
                                                        members.m_reset_pointer = ((0) & 0xff);
                                                    }
                                                    members.m_status = ((56) & 0xff);
                                                    break;
                                                }
                                            case 207:
                                                {
                                                    members.m_force_ready = ((0) | 0);
                                                    members.m_addressA = ((((((h_m_regs[method_REGNUM(runtime, 0, 2)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 0, 1)]))) & 0xffff);
                                                    members.m_addressB = ((((((h_m_regs[method_REGNUM(runtime, 4, 2)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 4, 1)]))) & 0xffff);
                                                    members.m_count = ((((((h_m_regs[method_REGNUM(runtime, 0, 4)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 0, 3)]))) & 0xffff);
                                                    method_reset_byte_counter(runtime);
                                                    members.m_status = ((((members.m_status) | (48))) & 0xff);
                                                    0;
                                                    break;
                                                }
                                            case 131:
                                                {
                                                    0;
                                                    method_disable(runtime);
                                                    break;
                                                }
                                            case 135:
                                                {
                                                    0;
                                                    method_enable(runtime);
                                                    break;
                                                }
                                            case 187:
                                                {
                                                    0;
                                                    h_m_regs_follow[(__t11 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t11)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 6, 1)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                                                    break;
                                                }
                                            case 211:
                                                {
                                                    0;
                                                    members.m_count = ((((((h_m_regs[method_REGNUM(runtime, 0, 4)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 0, 3)]))) & 0xffff);
                                                    method_reset_byte_counter(runtime);
                                                    members.m_status = ((((members.m_status) | (48))) & 0xff);
                                                    break;
                                                }
                                            case 199:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 1, 1)] = 0;
                                                    break;
                                                }
                                            case 203:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 2, 1)] = 0;
                                                    break;
                                                }
                                            case 179:
                                                {
                                                    0;
                                                    members.m_force_ready = ((1) | 0);
                                                    break;
                                                }
                                            case 171:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 3, 0)] = ((h_m_regs[method_REGNUM(runtime, 3, 0)]) | (32));
                                                    break;
                                                }
                                            case 175:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 3, 0)] = ((h_m_regs[method_REGNUM(runtime, 3, 0)]) & (-33));
                                                    break;
                                                }
                                            case 139:
                                                {
                                                    0;
                                                    members.m_status = ((((members.m_status) | (48))) & 0xff);
                                                    members.m_ip = ((0) | 0);
                                                    break;
                                                }
                                            case 251:
                                            case 255:
                                                {
                                                    break;
                                                }
                                            default:
                                                {
                                                    0;
                                                }
                                        }
                                    }
                                    else {
                                        0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            members.m_cur_follow = ((0) & 0xff);
        }
        else {
            0;
            let nreg = ((h_m_regs_follow[(members.m_cur_follow ?? 0)]) | 0);
            h_m_regs[nreg] = data;
            members.m_cur_follow = ((((members.m_cur_follow) + (1))) & 0xff);
            if (((((members.m_cur_follow ?? 0)) >= ((members.m_num_follow ?? 0))) ? 1 : 0)) {
                members.m_num_follow = ((0) & 0xff);
            }
            if (((Number(nreg) === Number(method_REGNUM(runtime, 4, 3))) ? 1 : 0)) {
                members.m_num_follow = ((0) & 0xff);
                if (((data) & (8))) {
                    h_m_regs_follow[(__t12 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t12)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 4, 5)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                }
                if (((data) & (16))) {
                    h_m_regs_follow[(__t13 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t13)] = runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 4, 4)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                }
                members.m_cur_follow = ((0) & 0xff);
            }
            else {
                if ((runtime.same(h_m_regs_follow[(members.m_num_follow ?? 0)], runtime.subtract(__addr_write(runtime, h_m_regs, method_REGNUM(runtime, 6, 1)), __addr_write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)))) ? 1 : 0)) {
                    method_setup_next_read(runtime, 0);
                }
            }
            members.m_reset_pointer = ((((members.m_reset_pointer) + (1))) & 0xff);
            if (((((members.m_reset_pointer ?? 0)) >= (6)) ? 1 : 0)) {
                members.m_reset_pointer = ((0) & 0xff);
            }
        }
    }
    function __addr_write(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_REGNUM(runtime, m, s) {
        const members = runtime.members;
        return ((((((m) << (3))) + (s))) >>> 0);
    }
    function method_enable(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["clock"], __L3 = __l["attotime::from_ticks"], __L4 = __l["clocks_to_attotime"];
        let curtime = ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
        (__deref_enable(runtime, members.m_timer).adjust?.((((__L3 ? __L3(__add_enable(runtime, (typeof curtime === 'number' ? runtime.attotime(curtime, "as_ticks", (__L2 ? __L2() : runtime.macro("clock"))) : (__deref_enable(runtime, curtime).as_ticks?.((__L2 ? __L2() : runtime.macro("clock"))) ?? 0)), 1), (__L2 ? __L2() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", __add_enable(runtime, (typeof curtime === 'number' ? runtime.attotime(curtime, "as_ticks", (__L2 ? __L2() : runtime.macro("clock"))) : (__deref_enable(runtime, curtime).as_ticks?.((__L2 ? __L2() : runtime.macro("clock"))) ?? 0)), 1), (__L2 ? __L2() : runtime.macro("clock"))))) - (curtime)), 0, (__L4 ? __L4(1) : runtime.macro("clocks_to_attotime", 1))) ?? 0);
        members.m_dma_seq = ((1) | 0);
    }
    function __add_enable(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_enable(runtime, p) {
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
    function method_setup_next_read(runtime, rr) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if (((h_m_regs[method_REGNUM(runtime, 6, 1)]) ? 0 : 1)) {
            return;
        }
        while ((((((h_m_regs[method_REGNUM(runtime, 6, 1)]) >>> (rr)) & 1)) ? 0 : 1)) {
            rr = ((((((rr) + (1))) & (7))) | 0);
        }
        members.m_read_cur_follow = ((rr) & 0xff);
    }
    function method_disable(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_disable(runtime, members.m_timer), typeof __t0.reset === 'function' ? __t0.reset() : typeof __t0.reset === 'number' || typeof __t0.reset === 'boolean' ? __t0.reset : runtime.container(members.m_timer, "reset"));
        if (((((members.m_busrq_ack ?? 0)) === (1)) ? 1 : 0)) {
            method_set_busrq(runtime, 0);
        }
        members.m_dma_seq = ((0) | 0);
        0;
    }
    function __deref_disable(runtime, p) {
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
    function method_interrupt_check(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_int_cb"], __L1 = __l["m_out_ieo_cb"];
        (__L0 ? __L0(Number((((members.m_ip ?? 0)) ? (1) : (0)))) : typeof members.m_out_int_cb === 'function' ? members.m_out_int_cb((((members.m_ip ?? 0)) ? (1) : (0))) : runtime.invoke("m_out_int_cb", (((members.m_ip ?? 0)) ? (1) : (0))));
        (__L1 ? __L1(Number((((members.m_ip ?? 0)) ? (0) : ((members.m_iei ?? 0))))) : typeof members.m_out_ieo_cb === 'function' ? members.m_out_ieo_cb((((members.m_ip ?? 0)) ? (0) : ((members.m_iei ?? 0)))) : runtime.invoke("m_out_ieo_cb", (((members.m_ip ?? 0)) ? (0) : ((members.m_iei ?? 0)))));
    }
    function method_reset_byte_counter(runtime) {
        const members = runtime.members;
        members.m_byte_counter = ((0) & 0xffff);
    }
    function method_z80dma_device__write(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13;
        data = ((data) & 0xff);
        const h_m_regs = members.m_regs ?? 0;
        const h_m_regs_follow = members.m_regs_follow ?? 0;
        if (((((members.m_num_follow ?? 0)) === (0)) ? 1 : 0)) {
            members.m_reset_pointer = ((0) & 0xff);
            if (((Number(((data) & (135))) === Number(0)) ? 1 : 0)) {
                0;
                h_m_regs[method_REGNUM(runtime, 2, 0)] = data;
                if (((data) & (64))) {
                    h_m_regs_follow[(__t0 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t0)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 2, 1)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                }
            }
            else {
                if (((Number(((data) & (135))) === Number(4)) ? 1 : 0)) {
                    0;
                    h_m_regs[method_REGNUM(runtime, 1, 0)] = data;
                    if (((data) & (64))) {
                        h_m_regs_follow[(__t1 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t1)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 1, 1)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                    }
                }
                else {
                    if (((Number(((data) & (128))) === Number(0)) ? 1 : 0)) {
                        0;
                        h_m_regs[method_REGNUM(runtime, 0, 0)] = data;
                        if (((data) & (8))) {
                            h_m_regs_follow[(__t2 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t2)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 1)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                        }
                        if (((data) & (16))) {
                            h_m_regs_follow[(__t3 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t3)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 2)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                        }
                        if (((data) & (32))) {
                            h_m_regs_follow[(__t4 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t4)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 3)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                        }
                        if (((data) & (64))) {
                            h_m_regs_follow[(__t5 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t5)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 4)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                        }
                    }
                    else {
                        if (((Number(((data) & (131))) === Number(128)) ? 1 : 0)) {
                            0;
                            h_m_regs[method_REGNUM(runtime, 3, 0)] = data;
                            if (((data) & (8))) {
                                h_m_regs_follow[(__t6 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t6)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 3, 1)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                            }
                            if (((data) & (16))) {
                                h_m_regs_follow[(__t7 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t7)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 3, 2)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                            }
                            if ((((data) >>> (6)) & 1)) {
                                method_enable(runtime);
                            }
                        }
                        else {
                            if (((Number(((data) & (131))) === Number(129)) ? 1 : 0)) {
                                0;
                                h_m_regs[method_REGNUM(runtime, 4, 0)] = data;
                                if (((data) & (4))) {
                                    h_m_regs_follow[(__t8 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t8)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 4, 1)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                                }
                                if (((data) & (8))) {
                                    h_m_regs_follow[(__t9 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t9)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 4, 2)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                                }
                                if (((data) & (16))) {
                                    h_m_regs_follow[(__t10 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t10)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 4, 3)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                                }
                            }
                            else {
                                if (((Number(((data) & (199))) === Number(130)) ? 1 : 0)) {
                                    0;
                                    h_m_regs[method_REGNUM(runtime, 5, 0)] = data;
                                }
                                else {
                                    if (((Number(((data) & (131))) === Number(131)) ? 1 : 0)) {
                                        0;
                                        h_m_regs[method_REGNUM(runtime, 6, 0)] = data;
                                        switch (data) {
                                            case 183:
                                                {
                                                    (__L0 ? __L0("Unimplemented m_regs[REGNUM((6), (0))] command %02x\n", data) : runtime.macro("fatalerror", "Unimplemented m_regs[REGNUM((6), (0))] command %02x\n", data));
                                                }
                                            case 191:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 6, 1)] = 1;
                                                    members.m_read_cur_follow = ((0) & 0xff);
                                                    break;
                                                }
                                            case 163:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 3, 0)] = ((h_m_regs[method_REGNUM(runtime, 3, 0)]) & (-33));
                                                    members.m_ip = ((0) | 0);
                                                    members.m_ius = ((0) | 0);
                                                    members.m_force_ready = ((0) | 0);
                                                    members.m_status = ((((members.m_status) | (8))) & 0xff);
                                                    break;
                                                }
                                            case 167:
                                                {
                                                    0;
                                                    method_setup_next_read(runtime, 0);
                                                    break;
                                                }
                                            case 195:
                                                {
                                                    0;
                                                    method_disable(runtime);
                                                    members.m_force_ready = ((0) | 0);
                                                    members.m_ip = ((0) | 0);
                                                    members.m_ius = ((0) | 0);
                                                    method_interrupt_check(runtime);
                                                    for (let WRi = ((0) & 0xff); (((WRi) < (7)) ? 1 : 0); WRi = ((((WRi) + (1))) & 0xff)) {
                                                        h_m_regs[method_REGNUM(runtime, WRi, (members.m_reset_pointer ?? 0))] = 0;
                                                    }
                                                    members.m_reset_pointer = ((((members.m_reset_pointer) + (1))) & 0xff);
                                                    if (((((members.m_reset_pointer ?? 0)) >= (6)) ? 1 : 0)) {
                                                        members.m_reset_pointer = ((0) & 0xff);
                                                    }
                                                    members.m_status = ((56) & 0xff);
                                                    break;
                                                }
                                            case 207:
                                                {
                                                    members.m_force_ready = ((0) | 0);
                                                    members.m_addressA = ((((((h_m_regs[method_REGNUM(runtime, 0, 2)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 0, 1)]))) & 0xffff);
                                                    members.m_addressB = ((((((h_m_regs[method_REGNUM(runtime, 4, 2)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 4, 1)]))) & 0xffff);
                                                    members.m_count = ((((((h_m_regs[method_REGNUM(runtime, 0, 4)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 0, 3)]))) & 0xffff);
                                                    method_reset_byte_counter(runtime);
                                                    members.m_status = ((((members.m_status) | (48))) & 0xff);
                                                    0;
                                                    break;
                                                }
                                            case 131:
                                                {
                                                    0;
                                                    method_disable(runtime);
                                                    break;
                                                }
                                            case 135:
                                                {
                                                    0;
                                                    method_enable(runtime);
                                                    break;
                                                }
                                            case 187:
                                                {
                                                    0;
                                                    h_m_regs_follow[(__t11 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t11)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 6, 1)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                                                    break;
                                                }
                                            case 211:
                                                {
                                                    0;
                                                    members.m_count = ((((((h_m_regs[method_REGNUM(runtime, 0, 4)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 0, 3)]))) & 0xffff);
                                                    method_reset_byte_counter(runtime);
                                                    members.m_status = ((((members.m_status) | (48))) & 0xff);
                                                    break;
                                                }
                                            case 199:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 1, 1)] = 0;
                                                    break;
                                                }
                                            case 203:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 2, 1)] = 0;
                                                    break;
                                                }
                                            case 179:
                                                {
                                                    0;
                                                    members.m_force_ready = ((1) | 0);
                                                    break;
                                                }
                                            case 171:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 3, 0)] = ((h_m_regs[method_REGNUM(runtime, 3, 0)]) | (32));
                                                    break;
                                                }
                                            case 175:
                                                {
                                                    0;
                                                    h_m_regs[method_REGNUM(runtime, 3, 0)] = ((h_m_regs[method_REGNUM(runtime, 3, 0)]) & (-33));
                                                    break;
                                                }
                                            case 139:
                                                {
                                                    0;
                                                    members.m_status = ((((members.m_status) | (48))) & 0xff);
                                                    members.m_ip = ((0) | 0);
                                                    break;
                                                }
                                            case 251:
                                            case 255:
                                                {
                                                    break;
                                                }
                                            default:
                                                {
                                                    0;
                                                }
                                        }
                                    }
                                    else {
                                        0;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            members.m_cur_follow = ((0) & 0xff);
        }
        else {
            0;
            let nreg = ((h_m_regs_follow[(members.m_cur_follow ?? 0)]) | 0);
            h_m_regs[nreg] = data;
            members.m_cur_follow = ((((members.m_cur_follow) + (1))) & 0xff);
            if (((((members.m_cur_follow ?? 0)) >= ((members.m_num_follow ?? 0))) ? 1 : 0)) {
                members.m_num_follow = ((0) & 0xff);
            }
            if (((Number(nreg) === Number(method_REGNUM(runtime, 4, 3))) ? 1 : 0)) {
                members.m_num_follow = ((0) & 0xff);
                if (((data) & (8))) {
                    h_m_regs_follow[(__t12 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t12)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 4, 5)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                }
                if (((data) & (16))) {
                    h_m_regs_follow[(__t13 = (members.m_num_follow ?? 0), members.m_num_follow = ((((members.m_num_follow) + (1))) & 0xff), __t13)] = runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 4, 4)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)));
                }
                members.m_cur_follow = ((0) & 0xff);
            }
            else {
                if ((runtime.same(h_m_regs_follow[(members.m_num_follow ?? 0)], runtime.subtract(__addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 6, 1)), __addr_z80dma_device__write(runtime, h_m_regs, method_REGNUM(runtime, 0, 0)))) ? 1 : 0)) {
                    method_setup_next_read(runtime, 0);
                }
            }
            members.m_reset_pointer = ((((members.m_reset_pointer) + (1))) & 0xff);
            if (((((members.m_reset_pointer ?? 0)) >= (6)) ? 1 : 0)) {
                members.m_reset_pointer = ((0) & 0xff);
            }
        }
    }
    function __addr_z80dma_device__write(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_rdy_w(runtime, state) {
        const members = runtime.members;
        0;
        runtime.synchronize("rdy_write_callback", state);
    }
    function method_bai_w(runtime, state) {
        const members = runtime.members;
        members.m_busrq_ack = ((state) | 0);
        method_update_bao(runtime);
        if (((((members.m_busrq_ack ?? 0)) && (((Number((members.m_dma_seq ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
            method_set_busrq(runtime, 0);
        }
    }
    function method_clock_w(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_int_cb"], __L1 = __l["clocks_to_attotime"];
        const h_m_regs = members.m_regs ?? 0;
        switch ((members.m_dma_seq ?? 0)) {
            case 1:
                {
                    if (method_is_ready(runtime)) {
                        if ((((((Number(((((h_m_regs[method_REGNUM(runtime, 4, 0)]) >>> (5))) & (3))) !== Number(1)) ? 1 : 0)) || (((((members.m_byte_counter ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_dma_seq = ((2) | 0);
                        }
                        else {
                            members.m_dma_seq = ((4) | 0);
                        }
                    }
                    break;
                }
            case 2:
                {
                    if (((((members.m_busrq_ack ?? 0)) === (0)) ? 1 : 0)) {
                        method_set_busrq(runtime, 1);
                    }
                    members.m_dma_seq = ((3) | 0);
                    break;
                }
            case 3:
                {
                    if (((((members.m_busrq_ack ?? 0)) === (1)) ? 1 : 0)) {
                        members.m_dma_seq = ((4) | 0);
                    }
                    break;
                }
            case 4:
                {
                    if ((((((h_m_regs[method_REGNUM(runtime, 4, 3)]) & (4))) && (((Number((((members.m_byte_counter ?? 0)) & (255))) === Number(h_m_regs[method_REGNUM(runtime, 4, 5)])) ? 1 : 0))) ? 1 : 0)) {
                        members.m_is_pulse = ((1) ? 1 : 0);
                        (__L0 ? __L0(Number(1)) : typeof members.m_out_int_cb === 'function' ? members.m_out_int_cb(1) : runtime.invoke("m_out_int_cb", 1));
                    }
                    let clock = (__L1 ? __L1(1) : runtime.macro("clocks_to_attotime", 1));
                    let next = ((clock) * (((((3) - (((((((((h_m_regs[method_REGNUM(runtime, 0, 0)]) >>> (2))) & (1))) ? (h_m_regs[method_REGNUM(runtime, 1, 1)]) : (h_m_regs[method_REGNUM(runtime, 2, 1)]))) & (3))))) + ((members.m_waits_extra ?? 0)))));
                    members.m_waits_extra = ((0) | 0);
                    (__deref_clock_w(runtime, members.m_timer).adjust?.(next, 0, clock) ?? 0);
                    members.m_dma_seq = ((5) | 0);
                    break;
                }
            case 5:
                {
                    if ((((members.m_wait ?? 0)) ? 0 : 1)) {
                        method_do_read(runtime);
                        members.m_dma_seq = ((6) | 0);
                    }
                    break;
                }
            case 6:
                {
                    let clock__1 = (__L1 ? __L1(1) : runtime.macro("clocks_to_attotime", 1));
                    let next__1 = ((clock__1) * (((((3) - (((((((((((h_m_regs[method_REGNUM(runtime, 0, 0)]) >>> (2))) & (1))) ? 0 : 1)) ? (h_m_regs[method_REGNUM(runtime, 1, 1)]) : (h_m_regs[method_REGNUM(runtime, 2, 1)]))) & (3))))) + ((members.m_waits_extra ?? 0)))));
                    members.m_waits_extra = ((0) | 0);
                    (__deref_clock_w(runtime, members.m_timer).adjust?.(next__1, 0, clock__1) ?? 0);
                    members.m_dma_seq = ((7) | 0);
                    break;
                }
            case 7:
                {
                    if ((((members.m_wait ?? 0)) ? 0 : 1)) {
                        let is_final = ((((((members.m_count ?? 0)) && (((((members.m_byte_counter ?? 0)) === ((members.m_count ?? 0))) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
                        method_do_write(runtime);
                        if ((((((h_m_regs[method_REGNUM(runtime, 4, 3)]) & (4))) && ((members.m_is_pulse ?? 0))) ? 1 : 0)) {
                            (__L0 ? __L0(Number(0)) : typeof members.m_out_int_cb === 'function' ? members.m_out_int_cb(0) : runtime.invoke("m_out_int_cb", 0));
                            members.m_is_pulse = ((0) ? 1 : 0);
                        }
                        let mode = ((((is_final) ? (3) : (((((h_m_regs[method_REGNUM(runtime, 4, 0)]) >>> (5))) & (3))))) & 0xff);
                        switch (mode) {
                            case 0:
                                {
                                    method_set_busrq(runtime, 0);
                                    members.m_dma_seq = ((1) | 0);
                                    break;
                                }
                            case 2:
                                {
                                    if (method_is_ready(runtime)) {
                                        members.m_dma_seq = ((4) | 0);
                                    }
                                    else {
                                        method_set_busrq(runtime, 0);
                                        members.m_dma_seq = ((1) | 0);
                                    }
                                    break;
                                }
                            case 1:
                                {
                                    members.m_dma_seq = ((((method_is_ready(runtime)) ? (4) : (1))) | 0);
                                    break;
                                }
                            default:
                                {
                                    members.m_dma_seq = ((11) | 0);
                                    break;
                                }
                        }
                    }
                    break;
                }
            case 8:
            case 9:
            case 10:
            case 11:
                {
                    method_disable(runtime);
                    members.m_status = ((9) & 0xff);
                    members.m_status = ((((members.m_status) | (((((method_is_ready(runtime)) ? 0 : 1)) << (1))))) & 0xff);
                    if (((Number(((h_m_regs[method_REGNUM(runtime, 0, 0)]) & (3))) === Number(1)) ? 1 : 0)) {
                        members.m_status = ((((members.m_status) | (16))) & 0xff);
                    }
                    0;
                    if (((h_m_regs[method_REGNUM(runtime, 4, 3)]) & (2))) {
                        method_trigger_interrupt(runtime, 2);
                    }
                    if (((((h_m_regs[method_REGNUM(runtime, 5, 0)]) >>> (5))) & (1))) {
                        0;
                        members.m_addressA = ((((((h_m_regs[method_REGNUM(runtime, 0, 2)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 0, 1)]))) & 0xffff);
                        members.m_addressB = ((((((h_m_regs[method_REGNUM(runtime, 4, 2)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 4, 1)]))) & 0xffff);
                        members.m_count = ((((((h_m_regs[method_REGNUM(runtime, 0, 4)]) << (8))) | (h_m_regs[method_REGNUM(runtime, 0, 3)]))) & 0xffff);
                        method_reset_byte_counter(runtime);
                        members.m_status = ((((members.m_status) | (48))) & 0xff);
                        method_enable(runtime);
                    }
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    function __deref_clock_w(runtime, p) {
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
    function method_is_ready(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((((members.m_force_ready ?? 0)) || (((Number((members.m_rdy ?? 0)) === Number(((((h_m_regs[method_REGNUM(runtime, 5, 0)]) >>> (3))) & (1)))) ? 1 : 0))) ? 1 : 0)) | 0);
    }
    function method_do_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in_mreq_cb"], __L1 = __l["m_in_iorq_cb"];
        const h_m_regs = members.m_regs ?? 0;
        switch (((h_m_regs[method_REGNUM(runtime, 0, 0)]) & (3))) {
            case 1:
            case 2:
            case 3:
                {
                    if (((((h_m_regs[method_REGNUM(runtime, 0, 0)]) >>> (2))) & (1))) {
                        if (((Number(((((h_m_regs[method_REGNUM(runtime, 1, 0)]) >>> (3))) & (1))) === Number(0)) ? 1 : 0)) {
                            members.m_latch = (((__L0 ? __L0(Number((members.m_addressA ?? 0))) : typeof members.m_in_mreq_cb === 'function' ? members.m_in_mreq_cb((members.m_addressA ?? 0)) : runtime.invoke("m_in_mreq_cb", (members.m_addressA ?? 0)))) & 0xff);
                        }
                        else {
                            members.m_latch = (((__L1 ? __L1(Number((members.m_addressA ?? 0))) : typeof members.m_in_iorq_cb === 'function' ? members.m_in_iorq_cb((members.m_addressA ?? 0)) : runtime.invoke("m_in_iorq_cb", (members.m_addressA ?? 0)))) & 0xff);
                        }
                        0;
                    }
                    else {
                        if (((Number(((((h_m_regs[method_REGNUM(runtime, 2, 0)]) >>> (3))) & (1))) === Number(0)) ? 1 : 0)) {
                            members.m_latch = (((__L0 ? __L0(Number((members.m_addressB ?? 0))) : typeof members.m_in_mreq_cb === 'function' ? members.m_in_mreq_cb((members.m_addressB ?? 0)) : runtime.invoke("m_in_mreq_cb", (members.m_addressB ?? 0)))) & 0xff);
                        }
                        else {
                            members.m_latch = (((__L1 ? __L1(Number((members.m_addressB ?? 0))) : typeof members.m_in_iorq_cb === 'function' ? members.m_in_iorq_cb((members.m_addressB ?? 0)) : runtime.invoke("m_in_iorq_cb", (members.m_addressB ?? 0)))) & 0xff);
                        }
                        0;
                    }
                    break;
                }
            default:
                {
                    0;
                    break;
                }
        }
    }
    function method_do_write(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        switch (((h_m_regs[method_REGNUM(runtime, 0, 0)]) & (3))) {
            case 1:
                {
                    method_do_transfer_write(runtime);
                    break;
                }
            case 2:
                {
                    method_do_search(runtime);
                    break;
                }
            case 3:
                {
                    method_do_transfer_write(runtime);
                    method_do_search(runtime);
                    break;
                }
            default:
                {
                    0;
                    break;
                }
        }
        members.m_addressA = ((((members.m_addressA) + (((((Number(((((h_m_regs[method_REGNUM(runtime, 1, 0)]) >>> (4))) & (2))) === Number(2)) ? 1 : 0)) ? (0) : (((((h_m_regs[method_REGNUM(runtime, 1, 0)]) & (16))) ? (1) : (-1))))))) & 0xffff);
        members.m_addressB = ((((members.m_addressB) + (((((Number(((((h_m_regs[method_REGNUM(runtime, 2, 0)]) >>> (4))) & (2))) === Number(2)) ? 1 : 0)) ? (0) : (((((h_m_regs[method_REGNUM(runtime, 2, 0)]) & (16))) ? (1) : (-1))))))) & 0xffff);
        members.m_byte_counter = ((((members.m_byte_counter) + (1))) & 0xffff);
    }
    function method_do_transfer_write(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_mreq_cb"], __L1 = __l["m_out_iorq_cb"];
        const h_m_regs = members.m_regs ?? 0;
        if (((((h_m_regs[method_REGNUM(runtime, 0, 0)]) >>> (2))) & (1))) {
            if (((Number(((((h_m_regs[method_REGNUM(runtime, 2, 0)]) >>> (3))) & (1))) === Number(0)) ? 1 : 0)) {
                (__L0 ? __L0(Number((members.m_addressB ?? 0)), Number((members.m_latch ?? 0))) : typeof members.m_out_mreq_cb === 'function' ? members.m_out_mreq_cb((members.m_addressB ?? 0), (members.m_latch ?? 0)) : runtime.invoke("m_out_mreq_cb", (members.m_addressB ?? 0), (members.m_latch ?? 0)));
            }
            else {
                (__L1 ? __L1(Number((members.m_addressB ?? 0)), Number((members.m_latch ?? 0))) : typeof members.m_out_iorq_cb === 'function' ? members.m_out_iorq_cb((members.m_addressB ?? 0), (members.m_latch ?? 0)) : runtime.invoke("m_out_iorq_cb", (members.m_addressB ?? 0), (members.m_latch ?? 0)));
            }
            0;
        }
        else {
            if (((Number(((((h_m_regs[method_REGNUM(runtime, 1, 0)]) >>> (3))) & (1))) === Number(0)) ? 1 : 0)) {
                (__L0 ? __L0(Number((members.m_addressA ?? 0)), Number((members.m_latch ?? 0))) : typeof members.m_out_mreq_cb === 'function' ? members.m_out_mreq_cb((members.m_addressA ?? 0), (members.m_latch ?? 0)) : runtime.invoke("m_out_mreq_cb", (members.m_addressA ?? 0), (members.m_latch ?? 0)));
            }
            else {
                (__L1 ? __L1(Number((members.m_addressA ?? 0)), Number((members.m_latch ?? 0))) : typeof members.m_out_iorq_cb === 'function' ? members.m_out_iorq_cb((members.m_addressA ?? 0), (members.m_latch ?? 0)) : runtime.invoke("m_out_iorq_cb", (members.m_addressA ?? 0), (members.m_latch ?? 0)));
            }
            0;
        }
    }
    function method_do_search(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        let load_byte = (((((members.m_latch ?? 0)) | (h_m_regs[method_REGNUM(runtime, 3, 1)]))) & 0xff);
        let match_byte = ((((h_m_regs[method_REGNUM(runtime, 3, 2)]) | (h_m_regs[method_REGNUM(runtime, 3, 1)]))) & 0xff);
        0;
        if ((((((h_m_regs[method_REGNUM(runtime, 4, 3)]) & (1))) && ((((load_byte) === (match_byte)) ? 1 : 0))) ? 1 : 0)) {
            method_trigger_interrupt(runtime, 1);
        }
    }
    function method_trigger_interrupt(runtime, level) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if (((((((members.m_ius ?? 0)) ? 0 : 1)) && (((h_m_regs[method_REGNUM(runtime, 3, 0)]) & (32)))) ? 1 : 0)) {
            members.m_ip = ((1) | 0);
            if (((h_m_regs[method_REGNUM(runtime, 4, 3)]) & (32))) {
                members.m_vector = ((((((h_m_regs[method_REGNUM(runtime, 4, 4)]) & (249))) | (((level) << (1))))) & 0xff);
            }
            else {
                members.m_vector = ((h_m_regs[method_REGNUM(runtime, 4, 4)]) & 0xff);
            }
            members.m_status = ((((members.m_status) & (-9))) & 0xff);
            0;
            method_interrupt_check(runtime);
        }
    }
    function method_rdy_write_callback(runtime, param) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        members.m_rdy = ((param) | 0);
        members.m_status = (((((((members.m_status ?? 0)) & (253))) | (((((method_is_ready(runtime)) ? 0 : 1)) << (1))))) & 0xff);
        if ((((method_is_ready(runtime)) && (((h_m_regs[method_REGNUM(runtime, 4, 3)]) & (64)))) ? 1 : 0)) {
            method_trigger_interrupt(runtime, 0);
        }
    }
    function method_out_busreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_busreq_callback(runtime, members.m_out_busreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_busreq_cb, "bind"));
    }
    function __deref_out_busreq_callback(runtime, p) {
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
    function method_out_int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_int_callback(runtime, members.m_out_int_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_cb, "bind"));
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
    function method_out_ieo_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_ieo_callback(runtime, members.m_out_ieo_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_ieo_cb, "bind"));
    }
    function __deref_out_ieo_callback(runtime, p) {
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
    function method_out_bao_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_bao_callback(runtime, members.m_out_bao_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_bao_cb, "bind"));
    }
    function __deref_out_bao_callback(runtime, p) {
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
    function method_in_mreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_mreq_callback(runtime, members.m_in_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_mreq_cb, "bind"));
    }
    function __deref_in_mreq_callback(runtime, p) {
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
    function method_out_mreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_mreq_callback(runtime, members.m_out_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_mreq_cb, "bind"));
    }
    function __deref_out_mreq_callback(runtime, p) {
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
    function method_in_iorq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_in_iorq_callback(runtime, members.m_in_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_iorq_cb, "bind"));
    }
    function __deref_in_iorq_callback(runtime, p) {
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
    function method_out_iorq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_iorq_callback(runtime, members.m_out_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_iorq_cb, "bind"));
    }
    function __deref_out_iorq_callback(runtime, p) {
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
    function method_iei_w(runtime, state) {
        const members = runtime.members;
        members.m_iei = ((state) | 0);
        method_interrupt_check(runtime);
    }
    function method_wait_w(runtime, state) {
        const members = runtime.members;
        members.m_wait = ((state) | 0);
    }
    function method_adjust_wait(runtime, count) {
        const members = runtime.members;
        members.m_waits_extra = ((((members.m_waits_extra) + (count))) | 0);
    }
    function method_num_follow(runtime) {
        const members = runtime.members;
        return (((members.m_num_follow ?? 0)) & 0xff);
    }
    function method_z80dma_device__out_busreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80dma_device__out_busreq_callback(runtime, members.m_out_busreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_busreq_cb, "bind"));
    }
    function __deref_z80dma_device__out_busreq_callback(runtime, p) {
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
    function method_z80dma_device__out_int_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80dma_device__out_int_callback(runtime, members.m_out_int_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_int_cb, "bind"));
    }
    function __deref_z80dma_device__out_int_callback(runtime, p) {
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
    function method_z80dma_device__out_ieo_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80dma_device__out_ieo_callback(runtime, members.m_out_ieo_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_ieo_cb, "bind"));
    }
    function __deref_z80dma_device__out_ieo_callback(runtime, p) {
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
    function method_z80dma_device__out_bao_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80dma_device__out_bao_callback(runtime, members.m_out_bao_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_bao_cb, "bind"));
    }
    function __deref_z80dma_device__out_bao_callback(runtime, p) {
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
    function method_z80dma_device__in_mreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80dma_device__in_mreq_callback(runtime, members.m_in_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_mreq_cb, "bind"));
    }
    function __deref_z80dma_device__in_mreq_callback(runtime, p) {
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
    function method_z80dma_device__out_mreq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80dma_device__out_mreq_callback(runtime, members.m_out_mreq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_mreq_cb, "bind"));
    }
    function __deref_z80dma_device__out_mreq_callback(runtime, p) {
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
    function method_z80dma_device__in_iorq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80dma_device__in_iorq_callback(runtime, members.m_in_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in_iorq_cb, "bind"));
    }
    function __deref_z80dma_device__in_iorq_callback(runtime, p) {
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
    function method_z80dma_device__out_iorq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_z80dma_device__out_iorq_callback(runtime, members.m_out_iorq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_iorq_cb, "bind"));
    }
    function __deref_z80dma_device__out_iorq_callback(runtime, p) {
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
    function method_z80dma_device__iei_w(runtime, state) {
        const members = runtime.members;
        members.m_iei = ((state) | 0);
        method_interrupt_check(runtime);
    }
    function method_z80dma_device__wait_w(runtime, state) {
        const members = runtime.members;
        members.m_wait = ((state) | 0);
    }
    function method_z80dma_device__adjust_wait(runtime, count) {
        const members = runtime.members;
        members.m_waits_extra = ((((members.m_waits_extra) + (count))) | 0);
    }
    function method_z80dma_device__num_follow(runtime) {
        const members = runtime.members;
        return (((members.m_num_follow ?? 0)) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "set_busrq": method_set_busrq,
        "update_bao": method_update_bao,
        "write": method_write,
        "REGNUM": method_REGNUM,
        "enable": method_enable,
        "setup_next_read": method_setup_next_read,
        "disable": method_disable,
        "interrupt_check": method_interrupt_check,
        "reset_byte_counter": method_reset_byte_counter,
        "z80dma_device::write": method_z80dma_device__write,
        "rdy_w": method_rdy_w,
        "bai_w": method_bai_w,
        "clock_w": method_clock_w,
        "is_ready": method_is_ready,
        "do_read": method_do_read,
        "do_write": method_do_write,
        "do_transfer_write": method_do_transfer_write,
        "do_search": method_do_search,
        "trigger_interrupt": method_trigger_interrupt,
        "rdy_write_callback": method_rdy_write_callback,
        "out_busreq_callback": method_out_busreq_callback,
        "out_int_callback": method_out_int_callback,
        "out_ieo_callback": method_out_ieo_callback,
        "out_bao_callback": method_out_bao_callback,
        "in_mreq_callback": method_in_mreq_callback,
        "out_mreq_callback": method_out_mreq_callback,
        "in_iorq_callback": method_in_iorq_callback,
        "out_iorq_callback": method_out_iorq_callback,
        "iei_w": method_iei_w,
        "wait_w": method_wait_w,
        "adjust_wait": method_adjust_wait,
        "num_follow": method_num_follow,
        "z80dma_device::out_busreq_callback": method_z80dma_device__out_busreq_callback,
        "z80dma_device::out_int_callback": method_z80dma_device__out_int_callback,
        "z80dma_device::out_ieo_callback": method_z80dma_device__out_ieo_callback,
        "z80dma_device::out_bao_callback": method_z80dma_device__out_bao_callback,
        "z80dma_device::in_mreq_callback": method_z80dma_device__in_mreq_callback,
        "z80dma_device::out_mreq_callback": method_z80dma_device__out_mreq_callback,
        "z80dma_device::in_iorq_callback": method_z80dma_device__in_iorq_callback,
        "z80dma_device::out_iorq_callback": method_z80dma_device__out_iorq_callback,
        "z80dma_device::iei_w": method_z80dma_device__iei_w,
        "z80dma_device::wait_w": method_z80dma_device__wait_w,
        "z80dma_device::adjust_wait": method_z80dma_device__adjust_wait,
        "z80dma_device::num_follow": method_z80dma_device__num_follow
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["attotime::from_ticks", "clock", "clocks_to_attotime", "fatalerror", "m_in_iorq_cb", "m_in_mreq_cb", "m_out_bao_cb", "m_out_busreq_cb", "m_out_ieo_cb", "m_out_int_cb", "m_out_iorq_cb", "m_out_mreq_cb", "machine", "machine().time"];
export const device = definition;
export default device;
