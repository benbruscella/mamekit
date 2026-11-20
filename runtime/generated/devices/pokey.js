import deviceData from './pokey.device.ir.json' with { type: 'json' };
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
    const cppScratch_vol_init_r_chan = new Float64Array(new Uint8Array(Math.max(0, Number(16))));
    function method_poly_init_4_5(runtime, poly, size) {
        const members = runtime.members;
        0;
        let mask = ((((((1) << (size))) - (1))) | 0);
        let lfsr = ((0) >>> 0);
        let xorbit = ((((size) - (1))) | 0);
        for (let i = ((0) | 0); (((i) < (mask)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            lfsr = ((((((lfsr) << (1))) | ((((~((((lfsr) >>> (2))) ^ (((lfsr) >>> (xorbit)))))) & (1))))) >>> 0);
            runtime.pointerStore(poly, ((lfsr) & (mask)));
            poly = __add_poly_init_4_5(runtime, poly, 1);
        }
    }
    function __add_poly_init_4_5(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_poly_init_9_17(runtime, poly, size) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["util::make_bitmask"];
        0;
        let mask = (((__L0 ? __L0(size) : runtime.macro("util::make_bitmask", size))) >>> 0);
        let lfsr = ((mask) >>> 0);
        if ((((size) === (17)) ? 1 : 0)) {
            for (let i = ((0) >>> 0); (((i) < (mask)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
                let in8 = (((((((lfsr) >>> (8)) & 1)) ^ ((((lfsr) >>> (13)) & 1)))) >>> 0);
                let $in = (((((lfsr) >>> (0)) & 1)) >>> 0);
                lfsr = ((((lfsr) >>> (1))) >>> 0);
                lfsr = ((((((lfsr) & (65407))) | (((in8) << (7))))) >>> 0);
                lfsr = (((((($in) << (16))) | (lfsr))) >>> 0);
                runtime.pointerStore(poly, lfsr);
                0;
                poly = __add_poly_init_9_17(runtime, poly, 1);
            }
        }
        else {
            for (let i = ((0) >>> 0); (((i) < (mask)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
                let $in = (((((((lfsr) >>> (0)) & 1)) ^ ((((lfsr) >>> (5)) & 1)))) >>> 0);
                lfsr = ((((lfsr) >>> (1))) >>> 0);
                lfsr = (((((($in) << (8))) | (lfsr))) >>> 0);
                runtime.pointerStore(poly, lfsr);
                0;
                poly = __add_poly_init_9_17(runtime, poly, 1);
            }
        }
    }
    function __add_poly_init_9_17(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_vol_init(runtime) {
        const members = runtime.members;
        const h_m_voltab = members.m_voltab ?? 0;
        let resistors = new Float64Array([90000, 26500, 8050, 3400]);
        let pull_up = 10000;
        let r_off = 8000000;
        let r_chan = cppScratch_vol_init_r_chan.fill(0);
        let rTot = 0;
        for (let j = ((0) | 0); (((j) < (16)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            rTot = ((1) / (1000000000000));
            for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if (((j) & (((1) << (i))))) {
                    rTot = ((rTot) + (((1) / ((resistors[i] ?? 0)))));
                }
                else {
                    rTot = ((rTot) + (((1) / (r_off))));
                }
            }
            r_chan[j] = ((1) / (rTot));
        }
        if (0) {
            for (let j = ((0) | 0); (((j) < (16)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                rTot = __add_vol_init(runtime, ((1) / ((r_chan[j] ?? 0))), ((3) / ((r_chan[0] ?? 0))));
                rTot = ((1) / (rTot));
                0;
            }
        }
        for (let j = ((0) | 0); (((j) < (65536)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            rTot = 0;
            for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                rTot = ((rTot) + (((1) / ((r_chan[((runtime.shiftRight(j, ((i) * (4)))) & (15))] ?? 0)))));
            }
            rTot = ((1) / (rTot));
            h_m_voltab[j] = rTot;
        }
    }
    function __add_vol_init(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_device_reset(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        method_pokey_potgo(runtime);
    }
    function __deref_device_reset(runtime, p) {
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
    function method_pokey_potgo(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_POTx = members.m_POTx ?? 0;
        0;
        members.m_ALLPOT = ((0) & 0xff);
        members.m_pot_counter = ((0) & 0xff);
        for (let pot = ((0) | 0); (((pot) < (8)) ? 1 : 0); pot = ((((pot) + (1))) | 0)) {
            h_m_POTx[pot] = 228;
            if ((((__t0 = __deref_pokey_potgo(runtime, runtime.readIndex((members.m_pot_r_cb ?? 0), pot)), typeof __t0.isunset === 'function' ? (__t0.isunset() ?? 0) : runtime.container(runtime.readIndex((members.m_pot_r_cb ?? 0), pot), "isunset"))) ? 0 : 1)) {
                let r = ((runtime.readIndex((members.m_pot_r_cb ?? 0), pot)(pot)) | 0);
                0;
                if ((((r) >= (228)) ? 1 : 0)) {
                    r = ((228) | 0);
                }
                if ((((r) === (0)) ? 1 : 0)) {
                    members.m_ALLPOT = ((((members.m_ALLPOT) | (((1) << (pot))))) & 0xff);
                }
                h_m_POTx[pot] = r;
            }
        }
    }
    function __deref_pokey_potgo(runtime, p) {
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
    function method_device_post_load(runtime) {
        const members = runtime.members;
    }
    function method_device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clocks_to_attotime"], __L1 = __l["clock"], __L2 = __l["stream_alloc"];
        members.m_clock_period = (__L0 ? __L0(1) : runtime.macro("clocks_to_attotime", 1));
        if (((Number((__L1 ? __L1() : runtime.macro("clock"))) !== Number(0)) ? 1 : 0)) {
            if ((((members.m_stream ?? 0)) ? 1 : 0)) {
                (__deref_device_clock_changed(runtime, members.m_stream).set_sample_rate?.((__L1 ? __L1() : runtime.macro("clock"))) ?? 0);
            }
            else {
                members.m_stream = (__L2 ? __L2(0, 1, (__L1 ? __L1() : runtime.macro("clock"))) : runtime.macro("stream_alloc", 0, 1, (__L1 ? __L1() : runtime.macro("clock"))));
            }
        }
    }
    function __deref_device_clock_changed(runtime, p) {
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
        do {
            method_step_one_clock(runtime);
            members.m_icount = ((((members.m_icount) - (1))) | 0);
        } while (((((members.m_icount ?? 0)) > (0)) ? 1 : 0));
    }
    function method_step_one_clock(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sod_w_cb"], __L1 = __l["m_oclk_w_cb"];
        let __t0;
        const h_m_clock_cnt = members.m_clock_cnt ?? 0;
        const h_m_channel = members.m_channel ?? 0;
        let toggle_iclk = ((0) ? 1 : 0);
        let toggle_oclk = ((0) ? 1 : 0);
        if ((((members.m_SKCTL ?? 0)) & (3))) {
            if (((Number((members.m_p4 = ((((members.m_p4) + (1))) >>> 0))) === Number(15)) ? 1 : 0)) {
                members.m_p4 = ((0) >>> 0);
            }
            if (((Number((members.m_p5 = ((((members.m_p5) + (1))) >>> 0))) === Number(31)) ? 1 : 0)) {
                members.m_p5 = ((0) >>> 0);
            }
            if (((Number((members.m_p9 = ((((members.m_p9) + (1))) >>> 0))) === Number(511)) ? 1 : 0)) {
                members.m_p9 = ((0) >>> 0);
            }
            if (((Number((members.m_p17 = ((((members.m_p17) + (1))) >>> 0))) === Number(131071)) ? 1 : 0)) {
                members.m_p17 = ((0) >>> 0);
            }
            let clock_triggered = [1, 0, 0];
            if (((Number((h_m_clock_cnt[1] = ((h_m_clock_cnt[1]) + (1)))) >= Number(28)) ? 1 : 0)) {
                h_m_clock_cnt[1] = 0;
                clock_triggered[1] = ((1) | 0);
            }
            if (((Number((h_m_clock_cnt[2] = ((h_m_clock_cnt[2]) + (1)))) >= Number(114)) ? 1 : 0)) {
                h_m_clock_cnt[2] = 0;
                clock_triggered[2] = ((1) | 0);
            }
            if (((((((members.m_AUDCTL ?? 0)) & (64))) && ((clock_triggered[0] ?? 0))) ? 1 : 0)) {
                if ((((members.m_AUDCTL ?? 0)) & (16))) {
                    (h_m_channel[0].inc_chan?.((members.this ?? 0), 7) ?? 0);
                }
                else {
                    (h_m_channel[0].inc_chan?.((members.this ?? 0), 4) ?? 0);
                }
            }
            let base_clock = (((((((members.m_AUDCTL ?? 0)) & (1))) ? (2) : (1))) | 0);
            if (((((((((members.m_AUDCTL ?? 0)) & (64))) ? 0 : 1)) && ((clock_triggered[base_clock] ?? 0))) ? 1 : 0)) {
                (h_m_channel[0].inc_chan?.((members.this ?? 0), 1) ?? 0);
            }
            let async_reset = ((((((((members.m_SKCTL ?? 0)) & (16))) && ((((((members.m_SKSTAT ?? 0)) & (18))) ? 0 : 1))) ? 1 : 0)) ? 1 : 0);
            if (async_reset) {
                members.m_ser_iclk = ((1) ? 1 : 0);
            }
            if ((((((((((members.m_AUDCTL ?? 0)) & (32))) && ((clock_triggered[0] ?? 0))) ? 1 : 0)) && (((async_reset) ? 0 : 1))) ? 1 : 0)) {
                if ((((members.m_AUDCTL ?? 0)) & (8))) {
                    (h_m_channel[2].inc_chan?.((members.this ?? 0), 7) ?? 0);
                }
                else {
                    (h_m_channel[2].inc_chan?.((members.this ?? 0), 4) ?? 0);
                }
            }
            if ((((((((((((members.m_AUDCTL ?? 0)) & (32))) ? 0 : 1)) && ((clock_triggered[base_clock] ?? 0))) ? 1 : 0)) && (((async_reset) ? 0 : 1))) ? 1 : 0)) {
                (h_m_channel[2].inc_chan?.((members.this ?? 0), 1) ?? 0);
            }
            if ((clock_triggered[base_clock] ?? 0)) {
                if ((((((members.m_AUDCTL ?? 0)) & (16))) ? 0 : 1)) {
                    if ((((((Number(h_m_channel[1].$members.m_counter) === Number(255)) ? 1 : 0)) && (((Number((((members.m_SKCTL ?? 0)) & (96))) === Number(96)) ? 1 : 0))) ? 1 : 0)) {
                        toggle_oclk = ((1) ? 1 : 0);
                    }
                    (h_m_channel[1].inc_chan?.((members.this ?? 0), 1) ?? 0);
                }
                if (((((((((members.m_AUDCTL ?? 0)) & (8))) ? 0 : 1)) && (((async_reset) ? 0 : 1))) ? 1 : 0)) {
                    if (((Number(h_m_channel[3].$members.m_counter) === Number(255)) ? 1 : 0)) {
                        if (((Number((((members.m_SKCTL ?? 0)) & (48))) !== Number(0)) ? 1 : 0)) {
                            toggle_iclk = ((1) ? 1 : 0);
                        }
                        if (((((((members.m_SKCTL ?? 0)) & (96))) && (((Number((((members.m_SKCTL ?? 0)) & (96))) !== Number(96)) ? 1 : 0))) ? 1 : 0)) {
                            toggle_oclk = ((1) ? 1 : 0);
                        }
                    }
                    (h_m_channel[3].inc_chan?.((members.this ?? 0), 1) ?? 0);
                }
            }
            if ((((((((clock_triggered[2] ?? 0)) || ((((members.m_SKCTL ?? 0)) & (4)))) ? 1 : 0)) && (((((members.m_pot_counter ?? 0)) < (228)) ? 1 : 0))) ? 1 : 0)) {
                method_step_pot(runtime);
            }
            if (((((clock_triggered[2] ?? 0)) && ((((members.m_SKCTL ?? 0)) & (2)))) ? 1 : 0)) {
                method_step_keyboard(runtime);
            }
        }
        if ((h_m_channel[2].check_borrow?.() ?? 0)) {
            if ((((members.m_AUDCTL ?? 0)) & (8))) {
                if (((Number(h_m_channel[3].$members.m_counter) === Number(255)) ? 1 : 0)) {
                    if (((Number((((members.m_SKCTL ?? 0)) & (48))) !== Number(0)) ? 1 : 0)) {
                        toggle_iclk = ((1) ? 1 : 0);
                    }
                    if ((((((Number((((members.m_SKCTL ?? 0)) & (96))) !== Number(0)) ? 1 : 0)) && (((Number((((members.m_SKCTL ?? 0)) & (96))) !== Number(96)) ? 1 : 0))) ? 1 : 0)) {
                        toggle_oclk = ((1) ? 1 : 0);
                    }
                }
                (h_m_channel[3].inc_chan?.((members.this ?? 0), 1) ?? 0);
            }
            else {
                (h_m_channel[2].reset_channel?.() ?? 0);
            }
            method_process_channel(runtime, 2);
            if ((((members.m_AUDCTL ?? 0)) & (4))) {
                (h_m_channel[0].sample?.() ?? 0);
            }
            else {
                h_m_channel[0].$members.m_filter_sample = ((1) & 0xff);
            }
            members.m_old_raw_inval = ((1) ? 1 : 0);
        }
        if ((h_m_channel[3].check_borrow?.() ?? 0)) {
            if ((((members.m_AUDCTL ?? 0)) & (8))) {
                (h_m_channel[2].reset_channel?.() ?? 0);
            }
            (h_m_channel[3].reset_channel?.() ?? 0);
            method_process_channel(runtime, 3);
            if ((((members.m_AUDCTL ?? 0)) & (2))) {
                (h_m_channel[1].sample?.() ?? 0);
            }
            else {
                h_m_channel[1].$members.m_filter_sample = ((1) & 0xff);
            }
            members.m_old_raw_inval = ((1) ? 1 : 0);
        }
        if (((((((members.m_SKCTL ?? 0)) & (8))) && (((Number(h_m_channel[1].$members.m_borrow_cnt) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
            (h_m_channel[0].reset_channel?.() ?? 0);
            members.m_old_raw_inval = ((1) ? 1 : 0);
            members.m_sod_twotone = (((((members.m_sod_twotone ?? 0)) ? 0 : 1)) ? 1 : 0);
            (__L0 ? __L0(Number((((members.m_sod_twotone ?? 0)) ? 0 : 1))) : typeof members.m_sod_w_cb === 'function' ? members.m_sod_w_cb((((members.m_sod_twotone ?? 0)) ? 0 : 1)) : runtime.invoke("m_sod_w_cb", (((members.m_sod_twotone ?? 0)) ? 0 : 1)));
        }
        if ((h_m_channel[0].check_borrow?.() ?? 0)) {
            if ((((members.m_AUDCTL ?? 0)) & (16))) {
                if ((((((Number(h_m_channel[1].$members.m_counter) === Number(255)) ? 1 : 0)) && (((Number((((members.m_SKCTL ?? 0)) & (96))) === Number(96)) ? 1 : 0))) ? 1 : 0)) {
                    toggle_oclk = ((1) ? 1 : 0);
                }
                (h_m_channel[1].inc_chan?.((members.this ?? 0), 1) ?? 0);
            }
            else {
                (h_m_channel[0].reset_channel?.() ?? 0);
                if (((((((members.m_SKCTL ?? 0)) & (8))) && ((((((members.m_IRQST ?? 0)) & (8))) ? ((((((members.m_SKCTL ?? 0)) & (128))) ? 0 : 1)) : ((((members.m_serout_shift ?? 0)) & (1)))))) ? 1 : 0)) {
                    (h_m_channel[1].reset_channel?.() ?? 0);
                    members.m_old_raw_inval = ((1) ? 1 : 0);
                    members.m_sod_twotone = (((((members.m_sod_twotone ?? 0)) ? 0 : 1)) ? 1 : 0);
                    (__L0 ? __L0(Number((((members.m_sod_twotone ?? 0)) ? 0 : 1))) : typeof members.m_sod_w_cb === 'function' ? members.m_sod_w_cb((((members.m_sod_twotone ?? 0)) ? 0 : 1)) : runtime.invoke("m_sod_w_cb", (((members.m_sod_twotone ?? 0)) ? 0 : 1)));
                }
            }
            method_process_channel(runtime, 0);
        }
        if ((h_m_channel[1].check_borrow?.() ?? 0)) {
            if ((((members.m_AUDCTL ?? 0)) & (16))) {
                (h_m_channel[0].reset_channel?.() ?? 0);
            }
            (h_m_channel[1].reset_channel?.() ?? 0);
            method_process_channel(runtime, 1);
        }
        if ((members.m_old_raw_inval ?? 0)) {
            let sum = ((0) >>> 0);
            for (let ch = ((0) | 0); (((ch) < (4)) ? 1 : 0); ch = ((((ch) + (1))) | 0)) {
                sum = ((((sum) | ((((((((h_m_channel[ch].$members.m_output) ^ (h_m_channel[ch].$members.m_filter_sample))) || (((h_m_channel[ch].$members.m_AUDC) & (16)))) ? 1 : 0)) ? (((((h_m_channel[ch].$members.m_AUDC) & (15))) << (((ch) * (4))))) : (0))))) >>> 0);
            }
            if (((((members.m_out_raw ?? 0)) !== (sum)) ? 1 : 0)) {
                (__t0 = __deref_step_one_clock(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
            }
            members.m_old_raw_inval = ((0) ? 1 : 0);
            members.m_out_raw = ((sum) >>> 0);
        }
        if (toggle_iclk) {
            members.m_ser_iclk = (((((members.m_ser_iclk ?? 0)) ? 0 : 1)) ? 1 : 0);
            if ((((members.m_ser_iclk ?? 0)) ? 0 : 1)) {
                method_process_serin(runtime);
            }
        }
        if ((((toggle_oclk) && (((((members.m_serout_full ?? 0)) || ((((((members.m_IRQST ?? 0)) & (8))) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
            members.m_ser_oclk = (((((members.m_ser_oclk ?? 0)) ? 0 : 1)) ? 1 : 0);
            if ((members.m_ser_oclk ?? 0)) {
                method_process_serout(runtime);
            }
            else {
                (__L1 ? __L1(Number(0)) : typeof members.m_oclk_w_cb === 'function' ? members.m_oclk_w_cb(0) : runtime.invoke("m_oclk_w_cb", 0));
            }
        }
    }
    function __deref_step_one_clock(runtime, p) {
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
    function method_step_pot(runtime) {
        const members = runtime.members;
        const h_m_POTx = members.m_POTx ?? 0;
        members.m_pot_counter = ((((members.m_pot_counter) + (1))) & 0xff);
        let upd = ((0) & 0xff);
        for (let pot = ((0) | 0); (((pot) < (8)) ? 1 : 0); pot = ((((pot) + (1))) | 0)) {
            if (((((((h_m_POTx[pot]) < ((members.m_pot_counter ?? 0))) ? 1 : 0)) || (((((members.m_pot_counter ?? 0)) === (228)) ? 1 : 0))) ? 1 : 0)) {
                upd = ((((upd) | (((1) << (pot))))) & 0xff);
            }
        }
        if ((((upd) !== (0)) ? 1 : 0)) {
            runtime.synchronize("sync_pot", upd);
        }
    }
    function method_step_keyboard(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_keyboard_r.isnull"], __L1 = __l["m_keyboard_r"], __L2 = __l["m_irq_w_cb"];
        const h_m_keyboard_r = members.m_keyboard_r ?? 0;
        if (((Number((members.m_kbd_cnt = ((((members.m_kbd_cnt) + (1))) & 0xff))) > Number(63)) ? 1 : 0)) {
            members.m_kbd_cnt = ((0) & 0xff);
        }
        if ((((__L0 ? __L0() : typeof (h_m_keyboard_r)?.isnull === 'function' ? (h_m_keyboard_r).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_keyboard_r.isnull"))?.() ?? 0))) ? 0 : 1)) {
            let ret = (((__L1 ? __L1(({ generatedLValue: true, get: () => (members.m_kbd_cnt ?? 0), set: (value) => { members.m_kbd_cnt = ((value) & 0xff); } })) : runtime.macro("m_keyboard_r", ({ generatedLValue: true, get: () => (members.m_kbd_cnt ?? 0), set: (value) => { members.m_kbd_cnt = ((value) & 0xff); } })))) & 0xff);
            switch ((members.m_kbd_cnt ?? 0)) {
                case 48:
                    {
                        if (((ret) & (2))) {
                            if ((((members.m_IRQEN ?? 0)) & (128))) {
                                0;
                                members.m_IRQST = ((((members.m_IRQST) | (128))) & 0xff);
                                (__L2 ? __L2(Number(1)) : typeof members.m_irq_w_cb === 'function' ? members.m_irq_w_cb(1) : runtime.invoke("m_irq_w_cb", 1));
                            }
                        }
                        break;
                    }
                case 32:
                    {
                        members.m_kbd_latch = (((((((members.m_kbd_latch ?? 0)) & (191))) | (((((ret) & (2))) << (5))))) & 0xff);
                        if ((((members.m_kbd_latch ?? 0)) & (64))) {
                            members.m_SKSTAT = ((((members.m_SKSTAT) | (8))) & 0xff);
                        }
                        else {
                            members.m_SKSTAT = ((((members.m_SKSTAT) & (-9))) & 0xff);
                        }
                        break;
                    }
                case 0:
                    {
                        members.m_kbd_latch = (((((((members.m_kbd_latch ?? 0)) & (127))) | (((((ret) & (2))) << (6))))) & 0xff);
                        break;
                    }
            }
            switch ((members.m_kbd_state ?? 0)) {
                case 0:
                    {
                        if (((ret) & (1))) {
                            members.m_kbd_latch = (((((((members.m_kbd_latch ?? 0)) & (192))) | ((members.m_kbd_cnt ?? 0)))) & 0xff);
                            members.m_kbd_state = ((((members.m_kbd_state) + (1))) & 0xff);
                        }
                        break;
                    }
                case 1:
                    {
                        if (((((((((members.m_SKCTL ?? 0)) & (1))) ? 0 : 1)) || (((Number((((members.m_kbd_latch ?? 0)) & (63))) === Number((members.m_kbd_cnt ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                            if (((ret) & (1))) {
                                members.m_KBCODE = (((((((members.m_SKCTL ?? 0)) & (1))) ? ((members.m_kbd_latch ?? 0)) : ((((((members.m_kbd_latch ?? 0)) & (192))) | ((members.m_kbd_cnt ?? 0)))))) & 0xff);
                                members.m_SKSTAT = ((((members.m_SKSTAT) | (4))) & 0xff);
                                if ((((members.m_IRQEN ?? 0)) & (64))) {
                                    if ((((members.m_IRQST ?? 0)) & (64))) {
                                        members.m_SKSTAT = ((((members.m_SKSTAT) | (64))) & 0xff);
                                    }
                                    0;
                                    members.m_IRQST = ((((members.m_IRQST) | (64))) & 0xff);
                                    (__L2 ? __L2(Number(1)) : typeof members.m_irq_w_cb === 'function' ? members.m_irq_w_cb(1) : runtime.invoke("m_irq_w_cb", 1));
                                }
                                members.m_kbd_state = ((((members.m_kbd_state) + (1))) & 0xff);
                            }
                            else {
                                members.m_kbd_state = ((0) & 0xff);
                            }
                        }
                        break;
                    }
                case 2:
                    {
                        if (((((((((members.m_SKCTL ?? 0)) & (1))) ? 0 : 1)) || (((Number((((members.m_kbd_latch ?? 0)) & (63))) === Number((members.m_kbd_cnt ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                            if (((Number(((ret) & (1))) === Number(0)) ? 1 : 0)) {
                                members.m_kbd_state = ((((members.m_kbd_state) + (1))) & 0xff);
                            }
                        }
                        break;
                    }
                case 3:
                    {
                        if (((((((((members.m_SKCTL ?? 0)) & (1))) ? 0 : 1)) || (((Number((((members.m_kbd_latch ?? 0)) & (63))) === Number((members.m_kbd_cnt ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                            if (((ret) & (1))) {
                                members.m_kbd_state = ((2) & 0xff);
                            }
                            else {
                                members.m_SKSTAT = ((((members.m_SKSTAT) & (-5))) & 0xff);
                                members.m_kbd_state = ((0) & 0xff);
                            }
                        }
                        break;
                    }
            }
        }
    }
    function method_process_channel(runtime, ch) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        const h_m_poly5 = members.m_poly5 ?? 0;
        const h_m_poly4 = members.m_poly4 ?? 0;
        const h_m_poly9 = members.m_poly9 ?? 0;
        const h_m_poly17 = members.m_poly17 ?? 0;
        if ((((((h_m_channel[ch].$members.m_AUDC) & (128))) || (((h_m_poly5[(members.m_p5 ?? 0)]) & (1)))) ? 1 : 0)) {
            if (((h_m_channel[ch].$members.m_AUDC) & (32))) {
                h_m_channel[ch].$members.m_output = ((((h_m_channel[ch].$members.m_output) ^ (1))) & 0xff);
            }
            else {
                if (((h_m_channel[ch].$members.m_AUDC) & (64))) {
                    h_m_channel[ch].$members.m_output = ((((h_m_poly4[(members.m_p4 ?? 0)]) & (1))) & 0xff);
                }
                else {
                    if ((((members.m_AUDCTL ?? 0)) & (128))) {
                        h_m_channel[ch].$members.m_output = ((((h_m_poly9[(members.m_p9 ?? 0)]) & (1))) & 0xff);
                    }
                    else {
                        h_m_channel[ch].$members.m_output = ((((h_m_poly17[(members.m_p17 ?? 0)]) & (1))) & 0xff);
                    }
                }
            }
            members.m_old_raw_inval = ((1) ? 1 : 0);
        }
    }
    function method_process_serin(runtime) {
        const members = runtime.members;
        if ((((members.m_SKSTAT ?? 0)) & (2))) {
            0;
            members.m_serin_shift = ((((members.m_serin_shift) >>> (1))) & 0xffff);
            if ((((((members.m_SKSTAT ?? 0)) & (16))) ? 0 : 1)) {
                members.m_serin_shift = ((((members.m_serin_shift) | (512))) & 0xffff);
            }
            if ((((members.m_serin_shift ?? 0)) & (1))) {
                members.m_SKSTAT = ((((members.m_SKSTAT) & (-3))) & 0xff);
                (__deref_process_serin(runtime, members.m_serin_ready_timer).adjust?.(0) ?? 0);
            }
        }
        else {
            if ((((members.m_SKSTAT ?? 0)) & (16))) {
                0;
                members.m_serin_shift = ((512) & 0xffff);
                members.m_SKSTAT = ((((members.m_SKSTAT) | (2))) & 0xff);
            }
        }
    }
    function __deref_process_serin(runtime, p) {
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
    function method_process_serout(runtime) {
        const members = runtime.members;
        if (((((members.m_serout_shift ?? 0)) === (1)) ? 1 : 0)) {
            if ((members.m_serout_full ?? 0)) {
                0;
                members.m_serout_shift = (((((((members.m_SEROUT ?? 0)) << (1))) | (512))) & 0xffff);
                members.m_serout_full = ((0) ? 1 : 0);
                (__deref_process_serout(runtime, members.m_serout_ready_timer).adjust?.(0) ?? 0);
            }
            else {
                (__deref_process_serout(runtime, members.m_serout_complete_timer).adjust?.(0) ?? 0);
            }
        }
        else {
            let last_sod = (((((members.m_serout_shift ?? 0)) & (1))) ? 1 : 0);
            members.m_serout_shift = ((((members.m_serout_shift) >>> (1))) & 0xffff);
            0;
            if (((Number(last_sod) !== Number((((members.m_serout_shift ?? 0)) & (1)))) ? 1 : 0)) {
                (__deref_process_serout(runtime, members.m_serout_bit_timer).adjust?.(0) ?? 0);
            }
        }
    }
    function __deref_process_serout(runtime, p) {
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
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_voltab = members.m_voltab ?? 0;
        if (((Number((members.m_output_type ?? 0)) === Number(0)) ? 1 : 0)) {
            let out = ((0) | 0);
            for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                out = ((((out) + ((((((members.m_out_raw ?? 0)) >>> (((4) * (i))))) & (15))))) | 0);
            }
            out = ((((out) * (744.7045454545455))) | 0);
            out = (((((((out) > (32767)) ? 1 : 0)) ? (32767) : (out))) | 0);
            let outsamp = ((out) * (((1) / (32768))));
            (__deref_sound_stream_update(runtime, stream).fill?.(0, outsamp) ?? 0);
        }
        else {
            if (((Number((members.m_output_type ?? 0)) === Number(1)) ? 1 : 0)) {
                let rTot = h_m_voltab[(members.m_out_raw ?? 0)];
                let V0 = ((((((rTot) / (((rTot) + ((members.m_r_pullup ?? 0)))))) * ((members.m_v_ref ?? 0)))) / (5));
                let mult = ((((((members.m_cap ?? 0)) === (0)) ? 1 : 0)) ? (1) : (runtime.subtract(1, Math.exp(Number((((((-((rTot) + ((members.m_r_pullup ?? 0))))) / ((((((members.m_cap ?? 0)) * ((members.m_r_pullup ?? 0)))) * (rTot))))) * ((typeof members.m_clock_period === 'number' ? (members.m_clock_period) : (__deref_sound_stream_update(runtime, members.m_clock_period).as_double?.() ?? 0)))))))));
                for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                    members.m_out_filter = ((members.m_out_filter) + (((((V0) - ((members.m_out_filter ?? 0)))) * (mult))));
                    (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, (members.m_out_filter ?? 0)) ?? 0);
                }
            }
            else {
                if (((Number((members.m_output_type ?? 0)) === Number(2)) ? 1 : 0)) {
                    let rTot = h_m_voltab[(members.m_out_raw ?? 0)];
                    let V0 = ((((((((((rTot) + ((members.m_r_pullup ?? 0)))) / (rTot))) - (1))) * ((members.m_v_ref ?? 0)))) / (5));
                    (__deref_sound_stream_update(runtime, stream).fill?.(0, V0) ?? 0);
                }
                else {
                    if (((Number((members.m_output_type ?? 0)) === Number(3)) ? 1 : 0)) {
                        let rTot = h_m_voltab[(members.m_out_raw ?? 0)];
                        let V0 = (((((((members.m_r_pullup ?? 0)) / (rTot))) * ((members.m_v_ref ?? 0)))) / (5));
                        let mult = ((((((members.m_cap ?? 0)) === (0)) ? 1 : 0)) ? (1) : (runtime.subtract(1, Math.exp(Number((((((-1)) / ((((members.m_cap ?? 0)) * ((members.m_r_pullup ?? 0)))))) * ((typeof members.m_clock_period === 'number' ? (members.m_clock_period) : (__deref_sound_stream_update(runtime, members.m_clock_period).as_double?.() ?? 0)))))))));
                        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                            members.m_out_filter = ((members.m_out_filter) + (((((V0) - ((members.m_out_filter ?? 0)))) * (mult))));
                            (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, (members.m_out_filter ?? 0)) ?? 0);
                        }
                    }
                    else {
                        if (((Number((members.m_output_type ?? 0)) === Number(4)) ? 1 : 0)) {
                            (__deref_sound_stream_update(runtime, stream).fill?.(0, h_m_voltab[(members.m_out_raw ?? 0)]) ?? 0);
                        }
                    }
                }
            }
        }
    }
    function __deref_sound_stream_update(runtime, p) {
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
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_allpot_r_cb"];
        let __t0;
        const h_m_POTx = members.m_POTx ?? 0;
        const h_m_poly9 = members.m_poly9 ?? 0;
        const h_m_poly17 = members.m_poly17 ?? 0;
        let data = ((0) | 0);
        let pot = ((0) | 0);
        runtime.synchronize("", 0);
        switch (((offset) & (15))) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                {
                    pot = ((((offset) & (7))) | 0);
                    if ((((members.m_ALLPOT ?? 0)) & (((1) << (pot))))) {
                        data = ((h_m_POTx[pot]) | 0);
                        0;
                    }
                    else {
                        data = (((members.m_pot_counter ?? 0)) | 0);
                        0;
                    }
                    break;
                }
            case 8:
                {
                    if (((Number((((members.m_SKCTL ?? 0)) & (3))) === Number(0)) ? 1 : 0)) {
                        data = (((members.m_ALLPOT ?? 0)) | 0);
                        0;
                    }
                    else {
                        if ((((__t0 = __deref_read(runtime, members.m_allpot_r_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_allpot_r_cb, "isunset"))) ? 0 : 1)) {
                            members.m_ALLPOT = (((data = (((__L0 ? __L0(Number(offset)) : typeof members.m_allpot_r_cb === 'function' ? members.m_allpot_r_cb(offset) : runtime.invoke("m_allpot_r_cb", offset))) | 0))) & 0xff);
                            0;
                        }
                        else {
                            data = (((((members.m_ALLPOT ?? 0)) ^ (255))) | 0);
                            0;
                        }
                    }
                    break;
                }
            case 9:
                {
                    data = (((members.m_KBCODE ?? 0)) | 0);
                    break;
                }
            case 10:
                {
                    if ((((members.m_AUDCTL ?? 0)) & (128))) {
                        data = ((((h_m_poly9[(members.m_p9 ?? 0)]) & (255))) | 0);
                        0;
                    }
                    else {
                        data = ((((((h_m_poly17[(members.m_p17 ?? 0)]) >>> (8))) & (255))) | 0);
                        0;
                    }
                    break;
                }
            case 13:
                {
                    data = (((members.m_SERIN ?? 0)) | 0);
                    0;
                    break;
                }
            case 14:
                {
                    data = (((((members.m_IRQST ?? 0)) ^ (255))) | 0);
                    0;
                    break;
                }
            case 15:
                {
                    data = (((((members.m_SKSTAT ?? 0)) ^ (255))) | 0);
                    0;
                    break;
                }
            default:
                {
                    0;
                    data = ((255) | 0);
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
        data = ((data) & 0xff);
        runtime.synchronize("sync_write", ((((offset) << (8))) | (data)));
    }
    function method_write_internal(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_irq_w_cb"], __L1 = __l["m_oclk_w_cb"], __L2 = __l["m_sod_w_cb"];
        data = ((data) & 0xff);
        const h_m_channel = members.m_channel ?? 0;
        const h_m_clock_cnt = members.m_clock_cnt ?? 0;
        switch (((offset) & (15))) {
            case 0:
                {
                    0;
                    h_m_channel[0].$members.m_AUDF = ((data) & 0xff);
                    break;
                }
            case 1:
                {
                    0;
                    h_m_channel[0].$members.m_AUDC = ((data) & 0xff);
                    members.m_old_raw_inval = ((1) ? 1 : 0);
                    break;
                }
            case 2:
                {
                    0;
                    h_m_channel[1].$members.m_AUDF = ((data) & 0xff);
                    break;
                }
            case 3:
                {
                    0;
                    h_m_channel[1].$members.m_AUDC = ((data) & 0xff);
                    members.m_old_raw_inval = ((1) ? 1 : 0);
                    break;
                }
            case 4:
                {
                    0;
                    h_m_channel[2].$members.m_AUDF = ((data) & 0xff);
                    break;
                }
            case 5:
                {
                    0;
                    h_m_channel[2].$members.m_AUDC = ((data) & 0xff);
                    members.m_old_raw_inval = ((1) ? 1 : 0);
                    break;
                }
            case 6:
                {
                    0;
                    h_m_channel[3].$members.m_AUDF = ((data) & 0xff);
                    break;
                }
            case 7:
                {
                    0;
                    h_m_channel[3].$members.m_AUDC = ((data) & 0xff);
                    members.m_old_raw_inval = ((1) ? 1 : 0);
                    break;
                }
            case 8:
                {
                    if ((((data) === ((members.m_AUDCTL ?? 0))) ? 1 : 0)) {
                        return;
                    }
                    0;
                    members.m_AUDCTL = ((data) & 0xff);
                    members.m_old_raw_inval = ((1) ? 1 : 0);
                    break;
                }
            case 9:
                {
                    0;
                    for (let i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        (h_m_channel[i].reset_channel?.() ?? 0);
                        h_m_channel[i].$members.m_output = ((0) & 0xff);
                        h_m_channel[i].$members.m_filter_sample = (((((((i) < (2)) ? 1 : 0)) ? (1) : (0))) & 0xff);
                    }
                    members.m_old_raw_inval = ((1) ? 1 : 0);
                    break;
                }
            case 10:
                {
                    0;
                    members.m_SKSTAT = ((((members.m_SKSTAT) & (-225))) & 0xff);
                    break;
                }
            case 11:
                {
                    0;
                    if ((((members.m_SKCTL ?? 0)) & (3))) {
                        method_pokey_potgo(runtime);
                    }
                    break;
                }
            case 13:
                {
                    0;
                    members.m_SEROUT = ((data) & 0xff);
                    if ((((members.m_SKCTL ?? 0)) & (3))) {
                        members.m_serout_full = ((1) ? 1 : 0);
                    }
                    break;
                }
            case 14:
                {
                    0;
                    if ((((members.m_IRQST ?? 0)) & ((~data)))) {
                        members.m_IRQST = ((((members.m_IRQST) & (((8) | (data))))) & 0xff);
                    }
                    members.m_IRQEN = ((data) & 0xff);
                    if ((((((members.m_IRQEN ?? 0)) & ((members.m_IRQST ?? 0)))) & (8))) {
                        0;
                        (__L0 ? __L0(Number(1)) : typeof members.m_irq_w_cb === 'function' ? members.m_irq_w_cb(1) : runtime.invoke("m_irq_w_cb", 1));
                    }
                    else {
                        if ((((((members.m_IRQEN ?? 0)) & ((members.m_IRQST ?? 0)))) ? 0 : 1)) {
                            0;
                            (__L0 ? __L0(Number(0)) : typeof members.m_irq_w_cb === 'function' ? members.m_irq_w_cb(0) : runtime.invoke("m_irq_w_cb", 0));
                        }
                    }
                    break;
                }
            case 15:
                {
                    if ((((data) === ((members.m_SKCTL ?? 0))) ? 1 : 0)) {
                        return;
                    }
                    0;
                    members.m_SKCTL = ((data) & 0xff);
                    if (((((data) & (3))) ? 0 : 1)) {
                        method_write_internal(runtime, 14, 0);
                        method_write_internal(runtime, 10, 0);
                        members.m_p9 = ((0) >>> 0);
                        members.m_p17 = ((0) >>> 0);
                        members.m_p4 = ((0) >>> 0);
                        members.m_p5 = ((0) >>> 0);
                        h_m_clock_cnt[0] = 0;
                        h_m_clock_cnt[1] = 0;
                        h_m_clock_cnt[2] = 0;
                        members.m_serin_shift = ((1) & 0xffff);
                        members.m_serout_shift = ((1) & 0xffff);
                        members.m_serout_full = ((0) ? 1 : 0);
                        (__L1 ? __L1(Number(0)) : typeof members.m_oclk_w_cb === 'function' ? members.m_oclk_w_cb(0) : runtime.invoke("m_oclk_w_cb", 0));
                        members.m_SKSTAT = ((((members.m_SKSTAT) & (-3))) & 0xff);
                        (__deref_write_internal(runtime, members.m_serout_complete_timer).adjust?.(0) ?? 0);
                    }
                    if (((((data) & (2))) ? 0 : 1)) {
                        members.m_SKSTAT = ((((members.m_SKSTAT) & (-5))) & 0xff);
                        members.m_kbd_cnt = ((0) & 0xff);
                        members.m_kbd_state = ((0) & 0xff);
                    }
                    if (((Number(((data) & (48))) === Number(0)) ? 1 : 0)) {
                        members.m_ser_iclk = ((1) ? 1 : 0);
                    }
                    if (((Number(((data) & (96))) === Number(0)) ? 1 : 0)) {
                        members.m_ser_oclk = ((0) ? 1 : 0);
                    }
                    if ((((((data) & (16))) && ((((((members.m_SKSTAT ?? 0)) & (2))) ? 0 : 1))) ? 1 : 0)) {
                        (h_m_channel[2].reset_channel?.() ?? 0);
                        (h_m_channel[3].reset_channel?.() ?? 0);
                    }
                    if (((((((((members.m_SKSTAT ?? 0)) & (2))) ? 0 : 1)) && (((((data) & (8))) ? 0 : 1))) ? 1 : 0)) {
                        (__L2 ? __L2(Number(((((data) & (128))) ? (0) : (1)))) : typeof members.m_sod_w_cb === 'function' ? members.m_sod_w_cb(((((data) & (128))) ? (0) : (1))) : runtime.invoke("m_sod_w_cb", ((((data) & (128))) ? (0) : (1))));
                    }
                    members.m_old_raw_inval = ((1) ? 1 : 0);
                    break;
                }
        }
    }
    function __deref_write_internal(runtime, p) {
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
    function method_sid_w(runtime, state) {
        const members = runtime.members;
        if (state) {
            members.m_SKSTAT = ((((members.m_SKSTAT) & (-17))) & 0xff);
        }
        else {
            members.m_SKSTAT = ((((members.m_SKSTAT) | (16))) & 0xff);
        }
    }
    function method_bclk_w(runtime, state) {
        const members = runtime.members;
    }
    function method_audc2str(runtime, val) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["strcpy"];
        if ((((members.__static_audc2str_buff__initialised ?? 0)) ? 0 : 1)) {
            members.__static_audc2str_buff = new Uint8Array(Math.max(0, Number(80)));
            members.__static_audc2str_buff__initialised = 1;
        }
        let buff = (members.__static_audc2str_buff ?? 0);
        if (((val) & (128))) {
            if (((val) & (32))) {
                (__L0 ? __L0(buff, "pure") : runtime.macro("strcpy", buff, "pure"));
            }
            else {
                if (((val) & (64))) {
                    (__L0 ? __L0(buff, "poly4") : runtime.macro("strcpy", buff, "poly4"));
                }
                else {
                    (__L0 ? __L0(buff, "poly9/17") : runtime.macro("strcpy", buff, "poly9/17"));
                }
            }
        }
        else {
            if (((val) & (32))) {
                (__L0 ? __L0(buff, "poly5") : runtime.macro("strcpy", buff, "poly5"));
            }
            else {
                if (((val) & (64))) {
                    (__L0 ? __L0(buff, "poly4+poly5") : runtime.macro("strcpy", buff, "poly4+poly5"));
                }
                else {
                    (__L0 ? __L0(buff, "poly9/17+poly5") : runtime.macro("strcpy", buff, "poly9/17+poly5"));
                }
            }
        }
        return buff;
    }
    function method_audctl2str(runtime, val) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["strcpy"], __L1 = __l["strcat"];
        if ((((members.__static_audctl2str_buff__initialised ?? 0)) ? 0 : 1)) {
            members.__static_audctl2str_buff = new Uint8Array(Math.max(0, Number(80)));
            members.__static_audctl2str_buff__initialised = 1;
        }
        let buff = (members.__static_audctl2str_buff ?? 0);
        if (((val) & (128))) {
            (__L0 ? __L0(buff, "poly9") : runtime.macro("strcpy", buff, "poly9"));
        }
        else {
            (__L0 ? __L0(buff, "poly17") : runtime.macro("strcpy", buff, "poly17"));
        }
        if (((val) & (64))) {
            (__L1 ? __L1(buff, "+ch1hi") : runtime.macro("strcat", buff, "+ch1hi"));
        }
        if (((val) & (32))) {
            (__L1 ? __L1(buff, "+ch3hi") : runtime.macro("strcat", buff, "+ch3hi"));
        }
        if (((val) & (16))) {
            (__L1 ? __L1(buff, "+ch1/2") : runtime.macro("strcat", buff, "+ch1/2"));
        }
        if (((val) & (8))) {
            (__L1 ? __L1(buff, "+ch3/4") : runtime.macro("strcat", buff, "+ch3/4"));
        }
        if (((val) & (4))) {
            (__L1 ? __L1(buff, "+ch1filter") : runtime.macro("strcat", buff, "+ch1filter"));
        }
        if (((val) & (2))) {
            (__L1 ? __L1(buff, "+ch2filter") : runtime.macro("strcat", buff, "+ch2filter"));
        }
        if (((val) & (1))) {
            (__L1 ? __L1(buff, "+clk15") : runtime.macro("strcat", buff, "+clk15"));
        }
        return buff;
    }
    function method_serout_ready_irq(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sod_w_cb"], __L1 = __l["m_oclk_w_cb"], __L2 = __l["m_irq_w_cb"];
        if ((((((members.m_SKCTL ?? 0)) & (8))) ? 0 : 1)) {
            (__L0 ? __L0(Number(0)) : typeof members.m_sod_w_cb === 'function' ? members.m_sod_w_cb(0) : runtime.invoke("m_sod_w_cb", 0));
        }
        (__L1 ? __L1(Number(1)) : typeof members.m_oclk_w_cb === 'function' ? members.m_oclk_w_cb(1) : runtime.invoke("m_oclk_w_cb", 1));
        members.m_IRQST = ((((members.m_IRQST) & (-9))) & 0xff);
        if ((((members.m_IRQEN ?? 0)) & (16))) {
            members.m_IRQST = ((((members.m_IRQST) | (16))) & 0xff);
            0;
            (__L2 ? __L2(Number(1)) : typeof members.m_irq_w_cb === 'function' ? members.m_irq_w_cb(1) : runtime.invoke("m_irq_w_cb", 1));
        }
    }
    function method_serout_complete_irq(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sod_w_cb"], __L1 = __l["m_irq_w_cb"];
        if (((((((((members.m_SKCTL ?? 0)) & (8))) ? 0 : 1)) && ((((members.m_SKCTL ?? 0)) & (128)))) ? 1 : 0)) {
            (__L0 ? __L0(Number(0)) : typeof members.m_sod_w_cb === 'function' ? members.m_sod_w_cb(0) : runtime.invoke("m_sod_w_cb", 0));
        }
        members.m_IRQST = ((((members.m_IRQST) | (8))) & 0xff);
        if ((((members.m_IRQEN ?? 0)) & (8))) {
            0;
            (__L1 ? __L1(Number(1)) : typeof members.m_irq_w_cb === 'function' ? members.m_irq_w_cb(1) : runtime.invoke("m_irq_w_cb", 1));
        }
    }
    function method_serout_transmit_bit(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sod_w_cb"], __L1 = __l["m_oclk_w_cb"];
        if ((((((members.m_SKCTL ?? 0)) & (8))) ? 0 : 1)) {
            (__L0 ? __L0(Number((((members.m_serout_shift ?? 0)) & (1)))) : typeof members.m_sod_w_cb === 'function' ? members.m_sod_w_cb((((members.m_serout_shift ?? 0)) & (1))) : runtime.invoke("m_sod_w_cb", (((members.m_serout_shift ?? 0)) & (1))));
        }
        (__L1 ? __L1(Number(1)) : typeof members.m_oclk_w_cb === 'function' ? members.m_oclk_w_cb(1) : runtime.invoke("m_oclk_w_cb", 1));
    }
    function method_serin_ready_irq(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_irq_w_cb"];
        if ((((((members.m_serin_shift ?? 0)) & (512))) ? 0 : 1)) {
            members.m_SKSTAT = ((((members.m_SKSTAT) | (128))) & 0xff);
        }
        members.m_SERIN = (((((((members.m_serin_shift ?? 0)) >>> (1))) & (255))) & 0xff);
        0;
        if ((((members.m_IRQST ?? 0)) & (32))) {
            members.m_SKSTAT = ((((members.m_SKSTAT) | (32))) & 0xff);
            0;
        }
        else {
            if ((((members.m_IRQEN ?? 0)) & (32))) {
                members.m_IRQST = ((((members.m_IRQST) | (32))) & 0xff);
                0;
                (__L0 ? __L0(Number(1)) : typeof members.m_irq_w_cb === 'function' ? members.m_irq_w_cb(1) : runtime.invoke("m_irq_w_cb", 1));
            }
        }
    }
    function method_sync_write(runtime, param) {
        const members = runtime.members;
        let offset = ((runtime.shiftRight(param, 8)) & (255));
        let data = ((((param) & (255))) & 0xff);
        method_write_internal(runtime, offset, data);
    }
    function method_sync_pot(runtime, param) {
        const members = runtime.members;
        members.m_ALLPOT = ((((members.m_ALLPOT) | (((param) & (255))))) & 0xff);
    }
    function method_sync_set_irqst(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_irq_w_cb"];
        if ((((members.m_IRQEN ?? 0)) & (param))) {
            0;
            members.m_IRQST = ((((members.m_IRQST) | (((param) & (255))))) & 0xff);
            (__L0 ? __L0(Number(1)) : typeof members.m_irq_w_cb === 'function' ? members.m_irq_w_cb(1) : runtime.invoke("m_irq_w_cb", 1));
        }
    }
    function method_allpot_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_allpot_r(runtime, members.m_allpot_r_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_allpot_r_cb, "bind"));
    }
    function __deref_allpot_r(runtime, p) {
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
    function method_irq_w(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_irq_w(runtime, members.m_irq_w_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_w_cb, "bind"));
    }
    function __deref_irq_w(runtime, p) {
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
    function method_sod_w(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_sod_w(runtime, members.m_sod_w_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_sod_w_cb, "bind"));
    }
    function __deref_sod_w(runtime, p) {
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
    function method_oclk_w(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_oclk_w(runtime, members.m_oclk_w_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_oclk_w_cb, "bind"));
    }
    function __deref_oclk_w(runtime, p) {
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
    function method_set_output_rc(runtime, r, c, v) {
        const members = runtime.members;
        members.m_output_type = 1;
        members.m_r_pullup = r;
        members.m_cap = c;
        members.m_v_ref = v;
    }
    function method_set_output_opamp(runtime, r, c, v) {
        const members = runtime.members;
        members.m_output_type = 2;
        members.m_r_pullup = r;
        members.m_cap = c;
        members.m_v_ref = v;
    }
    function method_set_output_opamp_low_pass(runtime, r, c, v) {
        const members = runtime.members;
        members.m_output_type = 3;
        members.m_r_pullup = r;
        members.m_cap = c;
        members.m_v_ref = v;
    }
    function method_set_output_discrete(runtime) {
        const members = runtime.members;
        members.m_output_type = 4;
    }
    function method_pokey_device__allpot_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pokey_device__allpot_r(runtime, members.m_allpot_r_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_allpot_r_cb, "bind"));
    }
    function __deref_pokey_device__allpot_r(runtime, p) {
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
    function method_pokey_device__irq_w(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pokey_device__irq_w(runtime, members.m_irq_w_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_w_cb, "bind"));
    }
    function __deref_pokey_device__irq_w(runtime, p) {
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
    function method_pokey_device__sod_w(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pokey_device__sod_w(runtime, members.m_sod_w_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_sod_w_cb, "bind"));
    }
    function __deref_pokey_device__sod_w(runtime, p) {
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
    function method_pokey_device__oclk_w(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pokey_device__oclk_w(runtime, members.m_oclk_w_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_oclk_w_cb, "bind"));
    }
    function __deref_pokey_device__oclk_w(runtime, p) {
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
    function method_pokey_device__set_output_rc(runtime, r, c, v) {
        const members = runtime.members;
        members.m_output_type = 1;
        members.m_r_pullup = r;
        members.m_cap = c;
        members.m_v_ref = v;
    }
    function method_pokey_device__set_output_opamp(runtime, r, c, v) {
        const members = runtime.members;
        members.m_output_type = 2;
        members.m_r_pullup = r;
        members.m_cap = c;
        members.m_v_ref = v;
    }
    function method_pokey_device__set_output_opamp_low_pass(runtime, r, c, v) {
        const members = runtime.members;
        members.m_output_type = 3;
        members.m_r_pullup = r;
        members.m_cap = c;
        members.m_v_ref = v;
    }
    function method_pokey_device__set_output_discrete(runtime) {
        const members = runtime.members;
        members.m_output_type = 4;
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[0].$members.m_AUDF;
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        h_m_channel[0].$members.m_AUDF = ((value) & 0xff);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[0].$members.m_AUDC;
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        h_m_channel[0].$members.m_AUDC = ((value) & 0xff);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[1].$members.m_AUDF;
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        h_m_channel[1].$members.m_AUDF = ((value) & 0xff);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[1].$members.m_AUDC;
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        h_m_channel[1].$members.m_AUDC = ((value) & 0xff);
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[2].$members.m_AUDF;
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        h_m_channel[2].$members.m_AUDF = ((value) & 0xff);
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[2].$members.m_AUDC;
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        h_m_channel[2].$members.m_AUDC = ((value) & 0xff);
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[3].$members.m_AUDF;
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        h_m_channel[3].$members.m_AUDF = ((value) & 0xff);
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[3].$members.m_AUDC;
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        h_m_channel[3].$members.m_AUDC = ((value) & 0xff);
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        return (members.m_AUDCTL ?? 0);
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        members.m_AUDCTL = ((value) & 0xff);
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        return (members.m_SEROUT ?? 0);
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        members.m_SEROUT = ((value) & 0xff);
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        return (members.m_IRQEN ?? 0);
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        members.m_IRQEN = ((value) & 0xff);
    }
    function method___state_read_11(runtime) {
        const members = runtime.members;
        return (members.m_SKCTL ?? 0);
    }
    function method___state_write_11(runtime, value) {
        const members = runtime.members;
        members.m_SKCTL = ((value) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "poly_init_4_5": method_poly_init_4_5,
        "poly_init_9_17": method_poly_init_9_17,
        "vol_init": method_vol_init,
        "device_reset": method_device_reset,
        "pokey_potgo": method_pokey_potgo,
        "device_post_load": method_device_post_load,
        "device_clock_changed": method_device_clock_changed,
        "execute_run": method_execute_run,
        "step_one_clock": method_step_one_clock,
        "step_pot": method_step_pot,
        "step_keyboard": method_step_keyboard,
        "process_channel": method_process_channel,
        "process_serin": method_process_serin,
        "process_serout": method_process_serout,
        "sound_stream_update": method_sound_stream_update,
        "read": method_read,
        "write": method_write,
        "write_internal": method_write_internal,
        "sid_w": method_sid_w,
        "bclk_w": method_bclk_w,
        "audc2str": method_audc2str,
        "audctl2str": method_audctl2str,
        "serout_ready_irq": method_serout_ready_irq,
        "serout_complete_irq": method_serout_complete_irq,
        "serout_transmit_bit": method_serout_transmit_bit,
        "serin_ready_irq": method_serin_ready_irq,
        "sync_write": method_sync_write,
        "sync_pot": method_sync_pot,
        "sync_set_irqst": method_sync_set_irqst,
        "allpot_r": method_allpot_r,
        "irq_w": method_irq_w,
        "sod_w": method_sod_w,
        "oclk_w": method_oclk_w,
        "set_output_rc": method_set_output_rc,
        "set_output_opamp": method_set_output_opamp,
        "set_output_opamp_low_pass": method_set_output_opamp_low_pass,
        "set_output_discrete": method_set_output_discrete,
        "pokey_device::allpot_r": method_pokey_device__allpot_r,
        "pokey_device::irq_w": method_pokey_device__irq_w,
        "pokey_device::sod_w": method_pokey_device__sod_w,
        "pokey_device::oclk_w": method_pokey_device__oclk_w,
        "pokey_device::set_output_rc": method_pokey_device__set_output_rc,
        "pokey_device::set_output_opamp": method_pokey_device__set_output_opamp,
        "pokey_device::set_output_opamp_low_pass": method_pokey_device__set_output_opamp_low_pass,
        "pokey_device::set_output_discrete": method_pokey_device__set_output_discrete,
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
        "__state_write_11": method___state_write_11
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["clock", "clocks_to_attotime", "m_allpot_r_cb", "m_irq_w_cb", "m_keyboard_r", "m_keyboard_r.isnull", "m_oclk_w_cb", "m_sod_w_cb", "strcat", "strcpy", "stream_alloc", "util::make_bitmask"];
definition.allocations["pokey_channel"].compiledMethods = (() => {
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
    function method_sample(runtime) {
        const members = runtime.members;
        members.m_filter_sample = (((members.m_output ?? 0)) & 0xff);
    }
    function method_reset_channel(runtime) {
        const members = runtime.members;
        members.m_counter = (((((members.m_AUDF ?? 0)) ^ (255))) | 0);
        members.m_borrow_cnt = ((0) | 0);
    }
    function method_inc_chan(runtime, host, cycles) {
        const members = runtime.members;
        const h_m_INTMask = members.m_INTMask ?? 0;
        members.m_counter = (((((((members.m_counter ?? 0)) + (1))) & (255))) | 0);
        if ((((((((members.m_counter ?? 0)) === (0)) ? 1 : 0)) && (((((members.m_borrow_cnt ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
            members.m_borrow_cnt = ((cycles) | 0);
            if (((host.m_IRQEN) & (h_m_INTMask))) {
                runtime.synchronize("sync_set_irqst", h_m_INTMask);
            }
        }
    }
    function method_check_borrow(runtime) {
        const members = runtime.members;
        if (((((members.m_borrow_cnt ?? 0)) > (0)) ? 1 : 0)) {
            members.m_borrow_cnt = ((((members.m_borrow_cnt) - (1))) | 0);
            return ((((((members.m_borrow_cnt ?? 0)) === (0)) ? 1 : 0)) | 0);
        }
        return ((0) | 0);
    }
    function method_pokey_device__pokey_channel__sample(runtime) {
        const members = runtime.members;
        members.m_filter_sample = (((members.m_output ?? 0)) & 0xff);
    }
    function method_pokey_device__pokey_channel__reset_channel(runtime) {
        const members = runtime.members;
        members.m_counter = (((((members.m_AUDF ?? 0)) ^ (255))) | 0);
        members.m_borrow_cnt = ((0) | 0);
    }
    function method_pokey_device__pokey_channel__inc_chan(runtime, host, cycles) {
        const members = runtime.members;
        const h_m_INTMask = members.m_INTMask ?? 0;
        members.m_counter = (((((((members.m_counter ?? 0)) + (1))) & (255))) | 0);
        if ((((((((members.m_counter ?? 0)) === (0)) ? 1 : 0)) && (((((members.m_borrow_cnt ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
            members.m_borrow_cnt = ((cycles) | 0);
            if (((host.m_IRQEN) & (h_m_INTMask))) {
                runtime.synchronize("sync_set_irqst", h_m_INTMask);
            }
        }
    }
    function method_pokey_device__pokey_channel__check_borrow(runtime) {
        const members = runtime.members;
        if (((((members.m_borrow_cnt ?? 0)) > (0)) ? 1 : 0)) {
            members.m_borrow_cnt = ((((members.m_borrow_cnt) - (1))) | 0);
            return ((((((members.m_borrow_cnt ?? 0)) === (0)) ? 1 : 0)) | 0);
        }
        return ((0) | 0);
    }
    function method___construct(runtime) {
        const members = runtime.members;
        members.m_AUDF = ((0) & 0xff);
        members.m_AUDC = ((0) & 0xff);
        members.m_borrow_cnt = ((0) | 0);
        members.m_counter = ((0) | 0);
        members.m_output = ((0) & 0xff);
        members.m_filter_sample = ((0) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "sample": method_sample,
        "reset_channel": method_reset_channel,
        "inc_chan": method_inc_chan,
        "check_borrow": method_check_borrow,
        "pokey_device::pokey_channel::sample": method_pokey_device__pokey_channel__sample,
        "pokey_device::pokey_channel::reset_channel": method_pokey_device__pokey_channel__reset_channel,
        "pokey_device::pokey_channel::inc_chan": method_pokey_device__pokey_channel__inc_chan,
        "pokey_device::pokey_channel::check_borrow": method_pokey_device__pokey_channel__check_borrow,
        "__construct": method___construct
    };
    return __methodTable;
})();
export const device = definition;
export default device;
