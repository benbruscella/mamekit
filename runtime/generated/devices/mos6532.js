import deviceData from './mos6532.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [0, 3, 6, 10];
    function method_pa_w(runtime, offset, data, mem_mask = 255) {
        const members = runtime.members;
        data = ((data) & 0xff);
        mem_mask = ((mem_mask) & 0xff);
        0;
        members.m_pa_in = (((((((members.m_pa_in ?? 0)) & ((~mem_mask)))) | (((data) & (mem_mask))))) & 0xff);
        method_edge_detect(runtime);
    }
    function method_edge_detect(runtime) {
        const members = runtime.members;
        let data = (((((((members.m_pa_out ?? 0)) & ((members.m_pa_ddr ?? 0)))) | ((((members.m_pa_in ?? 0)) & ((~(members.m_pa_ddr ?? 0))))))) & 0xff);
        let state = (((((data) >>> (7)) & 1)) | 0);
        if ((((((((((members.m_pa7 ?? 0)) ^ (state))) && ((((((members.m_pa7_dir ?? 0)) ^ (state))) ? 0 : 1))) ? 1 : 0)) && ((((members.m_irq_edge ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            0;
            members.m_irq_edge = ((1) ? 1 : 0);
            method_update_irq(runtime);
        }
        members.m_pa7 = ((state) | 0);
    }
    function method_update_irq(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_irq_cb"];
        let state = ((0) | 0);
        if (((((members.m_ie_timer ?? 0)) && ((members.m_irq_timer ?? 0))) ? 1 : 0)) {
            state = ((1) | 0);
        }
        if (((((members.m_ie_edge ?? 0)) && ((members.m_irq_edge ?? 0))) ? 1 : 0)) {
            state = ((1) | 0);
        }
        (__L0 ? __L0(Number(state)) : typeof members.m_irq_cb === 'function' ? members.m_irq_cb(state) : runtime.invoke("m_irq_cb", state));
    }
    function method_pb_w(runtime, offset, data, mem_mask = 255) {
        const members = runtime.members;
        data = ((data) & 0xff);
        mem_mask = ((mem_mask) & 0xff);
        0;
        members.m_pb_in = (((((((members.m_pb_in ?? 0)) & ((~mem_mask)))) | (((data) & (mem_mask))))) & 0xff);
    }
    function method_pa_data_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in8_pa_cb"];
        let __t0, __t1;
        let $in = ((0) & 0xff);
        if ((__t0 = __deref_pa_data_r(runtime, members.m_in8_pa_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_in8_pa_cb, "isunset"))) {
            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                $in = (((($in) | ((((((__t1 = __deref_pa_data_r(runtime, runtime.readIndex((members.m_in_pa_cb ?? 0), i)), typeof __t1.isunset === 'function' ? (__t1.isunset() ?? 0) : runtime.container(runtime.readIndex((members.m_in_pa_cb ?? 0), i), "isunset"))) ? (((((members.m_pa_in ?? 0)) >>> (i)) & 1)) : (runtime.readIndex((members.m_in_pa_cb ?? 0), i)()))) << (i))))) & 0xff);
            }
        }
        else {
            $in = (((__L0 ? __L0() : typeof members.m_in8_pa_cb === 'function' ? members.m_in8_pa_cb() : runtime.invoke("m_in8_pa_cb"))) & 0xff);
        }
        let data = (((((((members.m_pa_out ?? 0)) & ((members.m_pa_ddr ?? 0)))) | ((($in) & ((~(members.m_pa_ddr ?? 0))))))) & 0xff);
        0;
        return ((data) & 0xff);
    }
    function __deref_pa_data_r(runtime, p) {
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
    function method_pa_data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_pa_out = ((data) & 0xff);
        0;
        method_update_pa(runtime);
        method_edge_detect(runtime);
    }
    function method_update_pa(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out8_pa_cb"];
        let __t0;
        let data = (((((((members.m_pa_out ?? 0)) & ((members.m_pa_ddr ?? 0)))) | ((((members.m_pa_ddr ?? 0)) ^ (255))))) & 0xff);
        if ((__t0 = __deref_update_pa(runtime, members.m_out8_pa_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_out8_pa_cb, "isunset"))) {
            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                runtime.readIndex((members.m_out_pa_cb ?? 0), i)((((data) >>> (i)) & 1));
            }
        }
        else {
            (__L0 ? __L0(Number(data)) : typeof members.m_out8_pa_cb === 'function' ? members.m_out8_pa_cb(data) : runtime.invoke("m_out8_pa_cb", data));
        }
    }
    function __deref_update_pa(runtime, p) {
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
    function method_pa_ddr_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_pa_ddr = ((data) & 0xff);
        0;
        method_update_pa(runtime);
        method_edge_detect(runtime);
    }
    function method_pb_data_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_in8_pb_cb"];
        let __t0, __t1;
        let $in = ((0) & 0xff);
        if ((__t0 = __deref_pb_data_r(runtime, members.m_in8_pb_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_in8_pb_cb, "isunset"))) {
            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                $in = (((($in) | ((((((__t1 = __deref_pb_data_r(runtime, runtime.readIndex((members.m_in_pb_cb ?? 0), i)), typeof __t1.isunset === 'function' ? (__t1.isunset() ?? 0) : runtime.container(runtime.readIndex((members.m_in_pb_cb ?? 0), i), "isunset"))) ? (((((members.m_pb_in ?? 0)) >>> (i)) & 1)) : (runtime.readIndex((members.m_in_pb_cb ?? 0), i)()))) << (i))))) & 0xff);
            }
        }
        else {
            $in = (((__L0 ? __L0() : typeof members.m_in8_pb_cb === 'function' ? members.m_in8_pb_cb() : runtime.invoke("m_in8_pb_cb"))) & 0xff);
        }
        let data = (((((((members.m_pb_out ?? 0)) & ((members.m_pb_ddr ?? 0)))) | ((($in) & ((~(members.m_pb_ddr ?? 0))))))) & 0xff);
        0;
        return ((data) & 0xff);
    }
    function __deref_pb_data_r(runtime, p) {
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
    function method_pb_data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_pb_out = ((data) & 0xff);
        0;
        method_update_pb(runtime);
    }
    function method_update_pb(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out8_pb_cb"];
        let __t0;
        let data = (((((((members.m_pb_out ?? 0)) & ((members.m_pb_ddr ?? 0)))) | ((((members.m_pb_ddr ?? 0)) ^ (255))))) & 0xff);
        if ((__t0 = __deref_update_pb(runtime, members.m_out8_pb_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_out8_pb_cb, "isunset"))) {
            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                runtime.readIndex((members.m_out_pb_cb ?? 0), i)((((data) >>> (i)) & 1));
            }
        }
        else {
            (__L0 ? __L0(Number(data)) : typeof members.m_out8_pb_cb === 'function' ? members.m_out8_pb_cb(data) : runtime.invoke("m_out8_pb_cb", data));
        }
    }
    function __deref_update_pb(runtime, p) {
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
    function method_pb_ddr_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_pb_ddr = ((data) & 0xff);
        0;
        method_update_pb(runtime);
    }
    function method_timer_off_r(runtime) {
        const members = runtime.members;
        return ((method_timer_r(runtime, 0)) & 0xff);
    }
    function method_timer_r(runtime, ie) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["machine().time"], __L3 = __l["clock"], __L4 = __l["attotime::from_hz"];
        let data = ((method_get_timer(runtime)) & 0xff);
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if (((Number((members.m_timeout ?? 0)) < Number(runtime.subtract(((__L2 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0), (__L4 ? __L4(((2) * ((__L3 ? __L3() : runtime.macro("clock"))))) : runtime.macro("attotime::from_hz", ((2) * ((__L3 ? __L3() : runtime.macro("clock"))))))))) ? 1 : 0)) {
                members.m_irq_timer = ((0) ? 1 : 0);
                if (((Number((members.m_timerstate ?? 0)) === Number(1)) ? 1 : 0)) {
                    method_timer_start(runtime, data);
                }
            }
            members.m_ie_timer = ((ie) ? 1 : 0);
            method_update_irq(runtime);
            0;
        }
        return ((data) & 0xff);
    }
    function method_get_timer(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        let __t0;
        let shift = ((((((Number((members.m_timerstate ?? 0)) === Number(0)) ? 1 : 0)) ? ((members.m_timershift ?? 0)) : (0))) & 0xff);
        let remain = (typeof (__t0 = __deref_get_timer(runtime, members.m_timer), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_timer, "remaining")) === 'number' ? runtime.attotime((__t0 = __deref_get_timer(runtime, members.m_timer), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_timer, "remaining")), "as_ticks", (__L0 ? __L0() : runtime.macro("clock"))) : (__deref_get_timer(runtime, (__t0 = __deref_get_timer(runtime, members.m_timer), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_timer, "remaining"))).as_ticks?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0));
        let val = ((runtime.low32(runtime.wide(">>", remain, shift))) & 0xff);
        return ((((runtime.wide("&", remain, ((((1) << (shift))) - (1)))) ? (val) : (((val) - (1))))) & 0xff);
    }
    function __deref_get_timer(runtime, p) {
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
    function method_timer_start(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["clock"], __L3 = __l["attotime::from_ticks"];
        data = ((data) & 0xff);
        members.m_timerstate = ((0) & 0xff);
        let curtime = ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
        let target = __add_timer_start(runtime, __add_timer_start(runtime, (typeof curtime === 'number' ? runtime.attotime(curtime, "as_ticks", (__L2 ? __L2() : runtime.macro("clock"))) : (__deref_timer_start(runtime, curtime).as_ticks?.((__L2 ? __L2() : runtime.macro("clock"))) ?? 0)), 1), ((data) << ((members.m_timershift ?? 0))));
        (__deref_timer_start(runtime, members.m_timer).adjust?.((((__L3 ? __L3(target, (__L2 ? __L2() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", target, (__L2 ? __L2() : runtime.macro("clock"))))) - (curtime))) ?? 0);
    }
    function __add_timer_start(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_timer_start(runtime, p) {
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
    function method_timer_on_r(runtime) {
        const members = runtime.members;
        return ((method_timer_r(runtime, 1)) & 0xff);
    }
    function method_irq_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let data = ((method_get_irq_flags(runtime)) & 0xff);
        if ((((((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) && ((members.m_irq_edge ?? 0))) ? 1 : 0)) {
            members.m_irq_edge = ((0) ? 1 : 0);
            method_update_irq(runtime);
        }
        return ((data) & 0xff);
    }
    function method_get_irq_flags(runtime) {
        const members = runtime.members;
        let data = ((0) & 0xff);
        if ((members.m_irq_timer ?? 0)) {
            data = ((((data) | (128))) & 0xff);
        }
        if ((members.m_irq_edge ?? 0)) {
            data = ((((data) | (64))) & 0xff);
        }
        return ((data) & 0xff);
    }
    function method_timer_off_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_timer_w(runtime, offset, data, 0);
    }
    function method_timer_w(runtime, offset, data, ie) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_timershift = (((__mame_table_0[(((((offset) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
        method_timer_start(runtime, data);
        members.m_irq_timer = ((0) ? 1 : 0);
        members.m_ie_timer = ((ie) ? 1 : 0);
        method_update_irq(runtime);
        0;
    }
    function method_timer_on_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_timer_w(runtime, offset, data, 1);
    }
    function method_edge_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_pa7_dir = (((((offset) >>> (0)) & 1)) | 0);
        members.m_ie_edge = (((((((offset) >>> (1)) & 1)) ? 1 : 0)) ? 1 : 0);
        method_update_irq(runtime);
        0;
    }
    function method_timer_end(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["clock"], __L3 = __l["attotime::from_ticks"];
        if (((Number((members.m_timerstate ?? 0)) === Number(0)) ? 1 : 0)) {
            members.m_timeout = ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
            members.m_irq_timer = ((1) ? 1 : 0);
            method_update_irq(runtime);
        }
        members.m_timerstate = ((1) & 0xff);
        (__deref_timer_end(runtime, members.m_timer).adjust?.((__L3 ? __L3(256, (__L2 ? __L2() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", 256, (__L2 ? __L2() : runtime.macro("clock"))))) ?? 0);
    }
    function __deref_timer_end(runtime, p) {
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
    function method_mos6530_device_base__pa_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6530_device_base__pa_rd_callback(runtime, members.m_in8_pa_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in8_pa_cb, "bind"));
    }
    function __deref_mos6530_device_base__pa_rd_callback(runtime, p) {
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
    function method_mos6530_device_base__pa_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6530_device_base__pa_wr_callback(runtime, members.m_out8_pa_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out8_pa_cb, "bind"));
    }
    function __deref_mos6530_device_base__pa_wr_callback(runtime, p) {
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
    function method_mos6530_device_base__pb_rd_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6530_device_base__pb_rd_callback(runtime, members.m_in8_pb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_in8_pb_cb, "bind"));
    }
    function __deref_mos6530_device_base__pb_rd_callback(runtime, p) {
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
    function method_mos6530_device_base__pb_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6530_device_base__pb_wr_callback(runtime, members.m_out8_pb_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out8_pb_cb, "bind"));
    }
    function __deref_mos6530_device_base__pb_wr_callback(runtime, p) {
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
    function method_irq_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_irq_wr_callback(runtime, members.m_irq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_cb, "bind"));
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
    function method_rom_r(runtime, offset) {
        const members = runtime.members;
        const h_m_rom = members.m_rom ?? 0;
        return ((runtime.readIndex(h_m_rom, offset)) & 0xff);
    }
    function method_ram_r(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_ram_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_pa_ddr_r(runtime) {
        const members = runtime.members;
        return (((members.m_pa_ddr ?? 0)) & 0xff);
    }
    function method_pb_ddr_r(runtime) {
        const members = runtime.members;
        return (((members.m_pb_ddr ?? 0)) & 0xff);
    }
    function method_mos6530_device_base__irq_wr_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mos6530_device_base__irq_wr_callback(runtime, members.m_irq_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_cb, "bind"));
    }
    function __deref_mos6530_device_base__irq_wr_callback(runtime, p) {
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
    function method_mos6530_device_base__rom_r(runtime, offset) {
        const members = runtime.members;
        const h_m_rom = members.m_rom ?? 0;
        return ((runtime.readIndex(h_m_rom, offset)) & 0xff);
    }
    function method_mos6530_device_base__ram_r(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_mos6530_device_base__ram_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_mos6530_device_base__pa_ddr_r(runtime) {
        const members = runtime.members;
        return (((members.m_pa_ddr ?? 0)) & 0xff);
    }
    function method_mos6530_device_base__pb_ddr_r(runtime) {
        const members = runtime.members;
        return (((members.m_pb_ddr ?? 0)) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "pa_w": method_pa_w,
        "edge_detect": method_edge_detect,
        "update_irq": method_update_irq,
        "pb_w": method_pb_w,
        "pa_data_r": method_pa_data_r,
        "pa_data_w": method_pa_data_w,
        "update_pa": method_update_pa,
        "pa_ddr_w": method_pa_ddr_w,
        "pb_data_r": method_pb_data_r,
        "pb_data_w": method_pb_data_w,
        "update_pb": method_update_pb,
        "pb_ddr_w": method_pb_ddr_w,
        "timer_off_r": method_timer_off_r,
        "timer_r": method_timer_r,
        "get_timer": method_get_timer,
        "timer_start": method_timer_start,
        "timer_on_r": method_timer_on_r,
        "irq_r": method_irq_r,
        "get_irq_flags": method_get_irq_flags,
        "timer_off_w": method_timer_off_w,
        "timer_w": method_timer_w,
        "timer_on_w": method_timer_on_w,
        "edge_w": method_edge_w,
        "timer_end": method_timer_end,
        "mos6530_device_base::pa_rd_callback": method_mos6530_device_base__pa_rd_callback,
        "mos6530_device_base::pa_wr_callback": method_mos6530_device_base__pa_wr_callback,
        "mos6530_device_base::pb_rd_callback": method_mos6530_device_base__pb_rd_callback,
        "mos6530_device_base::pb_wr_callback": method_mos6530_device_base__pb_wr_callback,
        "irq_wr_callback": method_irq_wr_callback,
        "rom_r": method_rom_r,
        "ram_r": method_ram_r,
        "ram_w": method_ram_w,
        "pa_ddr_r": method_pa_ddr_r,
        "pb_ddr_r": method_pb_ddr_r,
        "mos6530_device_base::irq_wr_callback": method_mos6530_device_base__irq_wr_callback,
        "mos6530_device_base::rom_r": method_mos6530_device_base__rom_r,
        "mos6530_device_base::ram_r": method_mos6530_device_base__ram_r,
        "mos6530_device_base::ram_w": method_mos6530_device_base__ram_w,
        "mos6530_device_base::pa_ddr_r": method_mos6530_device_base__pa_ddr_r,
        "mos6530_device_base::pb_ddr_r": method_mos6530_device_base__pb_ddr_r
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["attotime::from_hz", "attotime::from_ticks", "clock", "m_in8_pa_cb", "m_in8_pb_cb", "m_irq_cb", "m_out8_pa_cb", "m_out8_pb_cb", "machine", "machine().side_effects_disabled", "machine().time"];
export const device = definition;
export default device;
