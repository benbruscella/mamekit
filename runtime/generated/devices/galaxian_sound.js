import deviceData from './galaxian_sound.device.ir.json' with { type: 'json' };
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
    function method_pitch_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_discrete.write"];
        data = ((data) & 0xff);
        (__L0 ? __L0(1073742048, data) : ((members.m_discrete)?.write?.(1073742048, data) ?? 0));
    }
    function method_lfo_freq_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_discrete.write"];
        data = ((data) & 0xff);
        let lfo_val_new = (((((((members.m_lfo_val ?? 0)) & ((~((1) << (offset)))))) | (((((data) & (1))) << (offset))))) & 0xff);
        if (((((members.m_lfo_val ?? 0)) !== (lfo_val_new)) ? 1 : 0)) {
            members.m_lfo_val = ((lfo_val_new) & 0xff);
            (__L0 ? __L0(1073741904, (members.m_lfo_val ?? 0)) : ((members.m_discrete)?.write?.(1073741904, (members.m_lfo_val ?? 0)) ?? 0));
        }
    }
    function method_background_enable_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_discrete.write"];
        data = ((data) & 0xff);
        (__L0 ? __L0(__add_background_enable_w(runtime, 1073741824, ((((method_NODE_INDEX(runtime, 1073741984)) + (offset))) * (8))), ((data) & (1))) : ((members.m_discrete)?.write?.(__add_background_enable_w(runtime, 1073741824, ((((method_NODE_INDEX(runtime, 1073741984)) + (offset))) * (8))), ((data) & (1))) ?? 0));
    }
    function __add_background_enable_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_NODE_INDEX(runtime, x) {
        const members = runtime.members;
        return runtime.shiftRight(((x) - (1073741824)), 3);
    }
    function method_noise_enable_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_discrete.write"];
        data = ((data) & 0xff);
        (__L0 ? __L0(1073742008, ((data) & (1))) : ((members.m_discrete)?.write?.(1073742008, ((data) & (1))) ?? 0));
    }
    function method_vol_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_discrete.write"];
        data = ((data) & 0xff);
        (__L0 ? __L0(__add_vol_w(runtime, 1073741824, ((((method_NODE_INDEX(runtime, 1073742032)) + (offset))) * (8))), ((data) & (1))) : ((members.m_discrete)?.write?.(__add_vol_w(runtime, 1073741824, ((((method_NODE_INDEX(runtime, 1073742032)) + (offset))) * (8))), ((data) & (1))) ?? 0));
    }
    function __add_vol_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_fire_enable_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_discrete.write"];
        data = ((data) & 0xff);
        (__L0 ? __L0(1073742024, ((data) & (1))) : ((members.m_discrete)?.write?.(1073742024, ((data) & (1))) ?? 0));
    }
    function method_sound_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        data = ((((data) & (1))) & 0xff);
        switch (((offset) & (7))) {
            case 0:
            case 1:
            case 2:
                {
                    method_background_enable_w(runtime, offset, data);
                    break;
                }
            case 3:
                {
                    method_noise_enable_w(runtime, data);
                    break;
                }
            case 4:
                {
                    break;
                }
            case 5:
                {
                    method_fire_enable_w(runtime, data);
                    break;
                }
            case 6:
            case 7:
                {
                    method_vol_w(runtime, ((offset) & (1)), data);
                    break;
                }
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "pitch_w": method_pitch_w,
        "lfo_freq_w": method_lfo_freq_w,
        "background_enable_w": method_background_enable_w,
        "NODE_INDEX": method_NODE_INDEX,
        "noise_enable_w": method_noise_enable_w,
        "vol_w": method_vol_w,
        "fire_enable_w": method_fire_enable_w,
        "sound_w": method_sound_w
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_discrete.write"];
definition.children[0].definition.compiledMethods = (() => {
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
    function method_discrete_build_list(runtime, intf, block_list) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["discrete_log"], __L1 = __l["fatalerror"];
        const __pointee_intf = __deref_discrete_build_list(runtime, intf);
        let node_count = ((0) | 0);
        for (; ((Number(intf[node_count].type) !== Number(0)) ? 1 : 0);) {
            if (((Number(intf[node_count].type) === Number(9)) ? 1 : 0)) {
                (__L0 ? __L0("discrete_build_list() - DISCRETE_IMPORT @ NODE_%02d", method_NODE_INDEX(runtime, intf[node_count].node)) : runtime.macro("discrete_log", "discrete_build_list() - DISCRETE_IMPORT @ NODE_%02d", method_NODE_INDEX(runtime, intf[node_count].node)));
                method_discrete_build_list(runtime, intf[node_count].custom, block_list);
            }
            else {
                if (((Number(intf[node_count].type) === Number(10)) ? 1 : 0)) {
                    let found = ((0) ? 1 : 0);
                    node_count = ((((node_count) + (1))) | 0);
                    if (((Number(intf[node_count].type) === Number(0)) ? 1 : 0)) {
                        (__L1 ? __L1("discrete_build_list: DISCRETE_REPLACE at end of node_list\n") : runtime.macro("fatalerror", "discrete_build_list: DISCRETE_REPLACE at end of node_list\n"));
                    }
                    for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        let block = block_list[i];
                        if (((Number(__deref_discrete_build_list(runtime, block).type) !== Number(1073744224)) ? 1 : 0)) {
                            if (((Number(__deref_discrete_build_list(runtime, block).node) === Number(intf[node_count].node)) ? 1 : 0)) {
                                block_list[i] = ({ generatedPointer: true, source: intf, offset: node_count });
                                (__L0 ? __L0("discrete_build_list() - DISCRETE_REPLACE @ NODE_%02d", method_NODE_INDEX(runtime, intf[node_count].node)) : runtime.macro("discrete_log", "discrete_build_list() - DISCRETE_REPLACE @ NODE_%02d", method_NODE_INDEX(runtime, intf[node_count].node)));
                                found = ((1) ? 1 : 0);
                                break;
                            }
                        }
                    }
                    if (((found) ? 0 : 1)) {
                        (__L1 ? __L1("discrete_build_list: DISCRETE_REPLACE did not found node %d\n", method_NODE_INDEX(runtime, intf[node_count].node)) : runtime.macro("fatalerror", "discrete_build_list: DISCRETE_REPLACE did not found node %d\n", method_NODE_INDEX(runtime, intf[node_count].node)));
                    }
                }
                else {
                    if (((Number(intf[node_count].type) === Number(11)) ? 1 : 0)) {
                        let deletethem = [];
                        for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            let block = block_list[i];
                            if ((((((Number(__deref_discrete_build_list(runtime, block).node) >= Number(intf[node_count].input_node[0])) ? 1 : 0)) && (((Number(__deref_discrete_build_list(runtime, block).node) <= Number(intf[node_count].input_node[1])) ? 1 : 0))) ? 1 : 0)) {
                                (__L0 ? __L0("discrete_build_list() - DISCRETE_DELETE deleted NODE_%02d", method_NODE_INDEX(runtime, __deref_discrete_build_list(runtime, block).node)) : runtime.macro("discrete_log", "discrete_build_list() - DISCRETE_DELETE deleted NODE_%02d", method_NODE_INDEX(runtime, __deref_discrete_build_list(runtime, block).node)));
                                (deletethem).push(i);
                            }
                        }
                        for (let __range0 = deletethem, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                            const __range0_item = __range0[__range0_index];
                            runtime.vectorMethod(block_list, "erase", __addr_discrete_build_list(runtime, runtime.container(block_list, "begin"), __range0_item));
                        }
                    }
                    else {
                        (__L0 ? __L0("discrete_build_list() - adding node %d\n", node_count) : runtime.macro("discrete_log", "discrete_build_list() - adding node %d\n", node_count));
                        (block_list).push(({ generatedPointer: true, source: intf, offset: node_count }));
                    }
                }
            }
            node_count = ((((node_count) + (1))) | 0);
        }
    }
    function __addr_discrete_build_list(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_discrete_build_list(runtime, p) {
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
    function method_NODE_INDEX(runtime, x) {
        const members = runtime.members;
        return runtime.shiftRight(((x) - (1073741824)), 3);
    }
    function method_display_profiling(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["osd_printf_info"];
        let __t0, __t1;
        const h_m_node_list = members.m_node_list ?? 0;
        let count = ((0) | 0);
        let total = 0;
        let tresh = 0;
        total = method_list_run_time(runtime, h_m_node_list);
        count = (((members.m_node_list).length) | 0);
        /* osd_printf_info: no effect */
        tresh = runtime.wide("/", total, ((count) | 0));
        /* osd_printf_info: no effect */
        for (let __range0 = h_m_node_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            let step = 0;
            if ((__deref_display_profiling(runtime, __range0_item).interface?.(step) ?? 0)) {
                if (runtime.wide(">", __deref_display_profiling(runtime, step).run_time, tresh)) {
                    (__L0 ? __L0("%3d: %20s %8.2f %10.2f\n", (__t0 = __deref_display_profiling(runtime, __range0_item), typeof __t0.index === 'function' ? (__t0.index() ?? 0) : runtime.container(__range0_item, "index")), (__t1 = __deref_display_profiling(runtime, __range0_item), typeof __t1.module_name === 'function' ? (__t1.module_name() ?? 0) : runtime.container(__range0_item, "module_name")), ((((__deref_display_profiling(runtime, step).run_time) / (total))) * (100)), ((__deref_display_profiling(runtime, step).run_time) / ((members.m_total_samples ?? 0)))) : runtime.macro("osd_printf_info", "%3d: %20s %8.2f %10.2f\n", (__t0 = __deref_display_profiling(runtime, __range0_item), typeof __t0.index === 'function' ? (__t0.index() ?? 0) : runtime.container(__range0_item, "index")), (__t1 = __deref_display_profiling(runtime, __range0_item), typeof __t1.module_name === 'function' ? (__t1.module_name() ?? 0) : runtime.container(__range0_item, "module_name")), ((((__deref_display_profiling(runtime, step).run_time) / (total))) * (100)), ((__deref_display_profiling(runtime, step).run_time) / ((members.m_total_samples ?? 0)))));
                }
            }
        }
        for (let __range0 = (members.task_list ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            let tt = method_step_list_run_time(runtime, __range0_item.step_list);
            /* osd_printf_info: no effect */
        }
        /* osd_printf_info: no effect */
    }
    function __deref_display_profiling(runtime, p) {
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
    function method_list_run_time(runtime, list) {
        const members = runtime.members;
        let total = 0;
        for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            let step = 0;
            if ((__deref_list_run_time(runtime, __range0_item).interface?.(step) ?? 0)) {
                total = runtime.wide("+", total, __deref_list_run_time(runtime, step).run_time);
            }
        }
        return total;
    }
    function __deref_list_run_time(runtime, p) {
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
    function method_step_list_run_time(runtime, list) {
        const members = runtime.members;
        let total = 0;
        for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            total = runtime.wide("+", total, __range0_item.run_time);
        }
        return total;
    }
    function method_init_nodes(runtime, block_list) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["CALL_METHOD"], __L1 = __l["fatalerror"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6;
        let task = 0;
        let has_tasks = ((0) ? 1 : 0);
        if (1) {
            for (let i = ((0) | 0); (((((has_tasks) ? 0 : 1)) && (((Number(i) < Number((block_list).length)) ? 1 : 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if (((Number(__deref_init_nodes(runtime, block_list[i]).type) === Number(6)) ? 1 : 0)) {
                    has_tasks = ((1) ? 1 : 0);
                }
            }
        }
        if (((has_tasks) ? 0 : 1)) {
            ((members.task_list ?? 0)).push(runtime.invoke("new::discrete_task", (members.this ?? 0)));
            task = (__t1 = __deref_init_nodes(runtime, (__t0 = ((members.task_list ?? 0)), typeof __t0.back === 'function' ? __t0.back() : typeof __t0.back === 'number' || typeof __t0.back === 'boolean' ? __t0.back : runtime.container((members.task_list ?? 0), "back"))), typeof __t1.get === 'function' ? (__t1.get() ?? 0) : runtime.container((__t0 = ((members.task_list ?? 0)), typeof __t0.back === 'function' ? __t0.back() : typeof __t0.back === 'number' || typeof __t0.back === 'boolean' ? __t0.back : runtime.container((members.task_list ?? 0), "back")), "get"));
        }
        for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let block = __deref_init_nodes(runtime, block_list[i]);
            (members.m_node_list).push(((__method) => __method ? __method(runtime, (members.this ?? 0), block) : (__L0 ? __L0(block.factory, (members.this ?? 0), block) : runtime.macro("CALL_METHOD", block.factory, (members.this ?? 0), block)))(__methodTable[block.factory]));
            let node = __deref_init_nodes(runtime, (__t2 = (members.m_node_list), typeof __t2.back === 'function' ? __t2.back() : typeof __t2.back === 'number' || typeof __t2.back === 'boolean' ? __t2.back : runtime.container(members.m_node_list, "back")));
            if (((Number(block.node) === Number(1073744224)) ? 1 : 0)) {
                switch (block.type) {
                    case 8:
                        {
                            break;
                        }
                    case 4:
                        {
                            break;
                        }
                    case 5:
                        {
                            break;
                        }
                    case 6:
                        {
                            if (1) {
                                if (((task) ? 1 : 0)) {
                                    (__L1 ? __L1("init_nodes() - Nested DISCRETE_START_TASK.\n") : runtime.macro("fatalerror", "init_nodes() - Nested DISCRETE_START_TASK.\n"));
                                }
                                ((members.task_list ?? 0)).push(runtime.invoke("new::discrete_task", (members.this ?? 0)));
                                task = (__t4 = __deref_init_nodes(runtime, (__t3 = ((members.task_list ?? 0)), typeof __t3.back === 'function' ? __t3.back() : typeof __t3.back === 'number' || typeof __t3.back === 'boolean' ? __t3.back : runtime.container((members.task_list ?? 0), "back"))), typeof __t4.get === 'function' ? (__t4.get() ?? 0) : runtime.container((__t3 = ((members.task_list ?? 0)), typeof __t3.back === 'function' ? __t3.back() : typeof __t3.back === 'number' || typeof __t3.back === 'boolean' ? __t3.back : runtime.container((members.task_list ?? 0), "back")), "get"));
                                __deref_init_nodes(runtime, task).task_group = block.initial[0];
                                if ((((((Number(__deref_init_nodes(runtime, task).task_group) < Number(0)) ? 1 : 0)) || (((Number(__deref_init_nodes(runtime, task).task_group) >= Number(10)) ? 1 : 0))) ? 1 : 0)) {
                                    (__L1 ? __L1("discrete_dso_task: illegal task_group %d\n", __deref_init_nodes(runtime, task).task_group) : runtime.macro("fatalerror", "discrete_dso_task: illegal task_group %d\n", __deref_init_nodes(runtime, task).task_group));
                                }
                            }
                            break;
                        }
                    case 7:
                        {
                            if (1) {
                                if (((task) ? 0 : 1)) {
                                    (__L1 ? __L1("init_nodes() - NO DISCRETE_START_TASK.\n") : runtime.macro("fatalerror", "init_nodes() - NO DISCRETE_START_TASK.\n"));
                                }
                            }
                            break;
                        }
                    default:
                        {
                            (__L1 ? __L1("init_nodes() - Failed, trying to create unknown special discrete node.\n") : runtime.macro("fatalerror", "init_nodes() - Failed, trying to create unknown special discrete node.\n"));
                        }
                }
            }
            else {
                if ((members.m_indexed_node ?? 0)[method_NODE_INDEX(runtime, block.node)]) {
                    (__L1 ? __L1("init_nodes() - Duplicate entries for NODE_%02d\n", method_NODE_INDEX(runtime, block.node)) : runtime.macro("fatalerror", "init_nodes() - Duplicate entries for NODE_%02d\n", method_NODE_INDEX(runtime, block.node)));
                }
                (members.m_indexed_node ?? 0)[method_NODE_INDEX(runtime, block.node)] = node;
            }
            let step = 0;
            if ((__deref_init_nodes(runtime, node).interface__discrete_step_interface?.(({ generatedLValue: true, get: () => step, set: (value) => { step = value; } })) ?? 0)) {
                if (((task) ? 0 : 1)) {
                    (__L1 ? __L1("init_nodes() - found node outside of task: %s\n", (__t5 = __deref_init_nodes(runtime, node), typeof __t5.module_name === 'function' ? __t5.module_name() : typeof __t5.module_name === 'number' || typeof __t5.module_name === 'boolean' ? __t5.module_name : runtime.container(node, "module_name"))) : runtime.macro("fatalerror", "init_nodes() - found node outside of task: %s\n", (__t5 = __deref_init_nodes(runtime, node), typeof __t5.module_name === 'function' ? __t5.module_name() : typeof __t5.module_name === 'number' || typeof __t5.module_name === 'boolean' ? __t5.module_name : runtime.container(node, "module_name"))));
                }
                else {
                    (__deref_init_nodes(runtime, task).step_list).push(step);
                }
            }
            if ((((1) && (((Number(block.type) === Number(7)) ? 1 : 0))) ? 1 : 0)) {
                task = 0;
            }
            (__t6 = __deref_init_nodes(runtime, node), typeof __t6.save_state === 'function' ? __t6.save_state() : typeof __t6.save_state === 'number' || typeof __t6.save_state === 'boolean' ? __t6.save_state : runtime.container(node, "save_state"));
        }
        if (((has_tasks) ? 0 : 1)) {
        }
    }
    function __deref_init_nodes(runtime, p) {
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
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["DYNAMIC_CAST"], __L1 = __l["fatalerror"], __L2 = __l["stream_alloc"];
        let __t0, __t1, __t2, __t3;
        const h_m_node_list = members.m_node_list ?? 0;
        const h_m_input_stream_list = members.m_input_stream_list ?? 0;
        (__t0 = (members.m_input_stream_list), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(members.m_input_stream_list, "clear"));
        (__t1 = (members.m_output_list), typeof __t1.clear === 'function' ? __t1.clear() : typeof __t1.clear === 'number' || typeof __t1.clear === 'boolean' ? __t1.clear : runtime.container(members.m_output_list, "clear"));
        method_discrete_device__device_start(runtime);
        for (let __range0 = h_m_node_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            let input_stream = (__L0 ? __L0((__t2 = __deref_device_start(runtime, __range0_item), typeof __t2.get === 'function' ? (__t2.get() ?? 0) : runtime.container(__range0_item, "get")), "discrete_dss_input_stream_node") : runtime.macro("DYNAMIC_CAST", (__t2 = __deref_device_start(runtime, __range0_item), typeof __t2.get === 'function' ? (__t2.get() ?? 0) : runtime.container(__range0_item, "get")), "discrete_dss_input_stream_node"));
            let input_stream$s = undefined, input_stream$o = 0;
            if (ArrayBuffer.isView(input_stream) || Array.isArray(input_stream))
                input_stream$s = input_stream;
            else if (input_stream !== null && typeof input_stream === 'object' && input_stream.generatedPointer === true && input_stream.path === undefined && input_stream.target === undefined && (ArrayBuffer.isView(input_stream.source) || Array.isArray(input_stream.source))) {
                input_stream$s = input_stream.source;
                input_stream$o = input_stream.offset;
            }
            if (((input_stream) ? 1 : 0)) {
                (members.m_input_stream_list).push(input_stream);
            }
            let out = 0;
            if ((__deref_device_start(runtime, __range0_item).interface__discrete_sound_output_interface?.(({ generatedLValue: true, get: () => out, set: (value) => { out = value; } })) ?? 0)) {
                (members.m_output_list).push(out);
            }
        }
        if (((members.m_output_list).length === 0 ? 1 : 0)) {
            (__L1 ? __L1("init_nodes() - Couldn't find an output node\n") : runtime.macro("fatalerror", "init_nodes() - Couldn't find an output node\n"));
        }
        members.m_stream = (__L2 ? __L2((members.m_input_stream_list).length, (members.m_output_list).length, (members.m_sample_rate ?? 0)) : runtime.macro("stream_alloc", (members.m_input_stream_list).length, (members.m_output_list).length, (members.m_sample_rate ?? 0)));
        for (let __range0 = h_m_input_stream_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            (__t3 = __deref_device_start(runtime, __range0_item), typeof __t3.stream_start === 'function' ? (__t3.stream_start() ?? 0) : runtime.container(__range0_item, "stream_start"));
        }
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
    function method_discrete_device__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["osd_getenv"], __L1 = __l["atoi"], __L2 = __l["osd_work_queue_alloc"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6;
        const h_m_node_list = members.m_node_list ?? 0;
        let intf_start = (members.m_intf ?? 0);
        let intf_start$s = undefined, intf_start$o = 0;
        if (ArrayBuffer.isView(intf_start) || Array.isArray(intf_start))
            intf_start$s = intf_start;
        else if (intf_start !== null && typeof intf_start === 'object' && intf_start.generatedPointer === true && intf_start.path === undefined && intf_start.target === undefined && (ArrayBuffer.isView(intf_start.source) || Array.isArray(intf_start.source))) {
            intf_start$s = intf_start.source;
            intf_start$o = intf_start.offset;
        }
        if ((__t0 = __deref_discrete_device__device_start(runtime, (members.this ?? 0)), typeof __t0.clock === 'function' ? __t0.clock() : typeof __t0.clock === 'number' || typeof __t0.clock === 'boolean' ? __t0.clock : runtime.container((members.this ?? 0), "clock"))) {
            members.m_sample_rate = (((__t1 = __deref_discrete_device__device_start(runtime, (members.this ?? 0)), typeof __t1.clock === 'function' ? __t1.clock() : typeof __t1.clock === 'number' || typeof __t1.clock === 'boolean' ? __t1.clock : runtime.container((members.this ?? 0), "clock"))) | 0);
        }
        else {
            members.m_sample_rate = (((__t3 = __deref_discrete_device__device_start(runtime, (__t2 = __deref_discrete_device__device_start(runtime, (members.this ?? 0)), typeof __t2.machine === 'function' ? __t2.machine() : typeof __t2.machine === 'number' || typeof __t2.machine === 'boolean' ? __t2.machine : runtime.container((members.this ?? 0), "machine"))), typeof __t3.sample_rate === 'function' ? (__t3.sample_rate() ?? 0) : runtime.container((__t2 = __deref_discrete_device__device_start(runtime, (members.this ?? 0)), typeof __t2.machine === 'function' ? __t2.machine() : typeof __t2.machine === 'number' || typeof __t2.machine === 'boolean' ? __t2.machine : runtime.container((members.this ?? 0), "machine")), "sample_rate"))) | 0);
        }
        members.m_sample_time = ((1) / ((members.m_sample_rate ?? 0)));
        members.m_neg_sample_time = (-(members.m_sample_time ?? 0));
        members.m_total_samples = 0;
        members.m_total_stream_updates = 0;
        members.m_profiling = ((0) | 0);
        if ((__L0 ? __L0("DISCRETE_PROFILING") : runtime.macro("osd_getenv", "DISCRETE_PROFILING"))) {
            members.m_profiling = (((__L1 ? __L1((__L0 ? __L0("DISCRETE_PROFILING") : runtime.macro("osd_getenv", "DISCRETE_PROFILING"))) : runtime.macro("atoi", (__L0 ? __L0("DISCRETE_PROFILING") : runtime.macro("osd_getenv", "DISCRETE_PROFILING"))))) | 0);
        }
        let block_list = [];
        method_discrete_build_list(runtime, intf_start, block_list);
        method_discrete_sanity_check(runtime, block_list);
        (__t4 = (members.m_node_list), typeof __t4.clear === 'function' ? __t4.clear() : typeof __t4.clear === 'number' || typeof __t4.clear === 'boolean' ? __t4.clear : runtime.container(members.m_node_list, "clear"));
        members.m_indexed_node = new Array(Math.max(0, Number(300))).fill(0);
        method_init_nodes(runtime, block_list);
        for (let __range0 = h_m_node_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            (__t5 = __deref_discrete_device__device_start(runtime, __range0_item), typeof __t5.resolve_input_nodes === 'function' ? (__t5.resolve_input_nodes() ?? 0) : runtime.container(__range0_item, "resolve_input_nodes"));
        }
        members.m_queue = (__L2 ? __L2(6) : runtime.macro("osd_work_queue_alloc", 6));
        for (let __range0 = h_m_node_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            (__t6 = __deref_discrete_device__device_start(runtime, __range0_item), typeof __t6.start === 'function' ? (__t6.start() ?? 0) : runtime.container(__range0_item, "start"));
        }
        for (let __range0 = (members.task_list ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            for (let __range1 = (members.task_list ?? 0), __range1_index = 0; ((Number(__range1_index) < Number(__range1.length)) ? 1 : 0); __range1_index = ((__range1_index) + (1))) {
                const __range1_item = __range1[__range1_index];
                if (((Number(__range0_item.task_group) > Number(__range1_item.task_group)) ? 1 : 0)) {
                    (__deref_discrete_device__device_start(runtime, __range1_item).check?.(__deref_discrete_device__device_start(runtime, __range0_item)) ?? 0);
                }
            }
        }
    }
    function __deref_discrete_device__device_start(runtime, p) {
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
    function method_discrete_sanity_check(runtime, block_list) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["discrete_log"], __L1 = __l["fatalerror"];
        let node_count = ((0) | 0);
        (__L0 ? __L0("discrete_start() - Doing node list sanity check") : runtime.macro("discrete_log", "discrete_start() - Doing node list sanity check"));
        for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let block = block_list[i];
            let block$s = undefined, block$o = 0;
            if (ArrayBuffer.isView(block) || Array.isArray(block))
                block$s = block;
            else if (block !== null && typeof block === 'object' && block.generatedPointer === true && block.path === undefined && block.target === undefined && (ArrayBuffer.isView(block.source) || Array.isArray(block.source))) {
                block$s = block.source;
                block$o = block.offset;
            }
            if ((((node_count) > (300)) ? 1 : 0)) {
                (__L1 ? __L1("discrete_start() - Upper limit of %d nodes exceeded, have you terminated the interface block?\n", 300) : runtime.macro("fatalerror", "discrete_start() - Upper limit of %d nodes exceeded, have you terminated the interface block?\n", 300));
            }
            if ((((((Number(__deref_discrete_sanity_check(runtime, block).node) < Number(1073741824)) ? 1 : 0)) || (((Number(__deref_discrete_sanity_check(runtime, block).node) > Number(1073744224)) ? 1 : 0))) ? 1 : 0)) {
                (__L1 ? __L1("discrete_start() - Invalid node number on node %02d descriptor\n", __deref_discrete_sanity_check(runtime, block).node) : runtime.macro("fatalerror", "discrete_start() - Invalid node number on node %02d descriptor\n", __deref_discrete_sanity_check(runtime, block).node));
            }
            if (((Number(__deref_discrete_sanity_check(runtime, block).type) > Number(8)) ? 1 : 0)) {
                (__L1 ? __L1("discrete_start() - Invalid function type on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)) : runtime.macro("fatalerror", "discrete_start() - Invalid function type on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)));
            }
            if (((Number(method_NODE_CHILD_NODE_NUM(runtime, __deref_discrete_sanity_check(runtime, block).node)) > Number(0)) ? 1 : 0)) {
                (__L1 ? __L1("discrete_start() - Child node number on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)) : runtime.macro("fatalerror", "discrete_start() - Child node number on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)));
            }
            node_count = ((((node_count) + (1))) | 0);
        }
        (__L0 ? __L0("discrete_start() - Sanity check counted %d nodes", node_count) : runtime.macro("discrete_log", "discrete_start() - Sanity check counted %d nodes", node_count));
    }
    function __deref_discrete_sanity_check(runtime, p) {
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
    function method_NODE_CHILD_NODE_NUM(runtime, x) {
        const members = runtime.members;
        return ((x) & (7));
    }
    function method_device_stop(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["osd_work_queue_free"];
        let __t0, __t1;
        const h_m_node_list = members.m_node_list ?? 0;
        if ((members.m_queue ?? 0)) {
            (__L0 ? __L0((members.m_queue ?? 0)) : runtime.macro("osd_work_queue_free", (members.m_queue ?? 0)));
        }
        if ((members.m_profiling ?? 0)) {
            method_display_profiling(runtime);
        }
        for (let __range0 = h_m_node_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            (__t0 = __deref_device_stop(runtime, __range0_item), typeof __t0.stop === 'function' ? (__t0.stop() ?? 0) : runtime.container(__range0_item, "stop"));
        }
        (__t1 = __deref_device_stop(runtime, members.m_disclogfile), typeof __t1.reset === 'function' ? __t1.reset() : typeof __t1.reset === 'number' || typeof __t1.reset === 'boolean' ? __t1.reset : runtime.container(members.m_disclogfile, "reset"));
    }
    function __deref_device_stop(runtime, p) {
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
        const __L0 = __l["fatalerror"];
        let node = method_discrete_find_node(runtime, offset);
        let node$s = undefined, node$o = 0;
        if (ArrayBuffer.isView(node) || Array.isArray(node))
            node$s = node;
        else if (node !== null && typeof node === 'object' && node.generatedPointer === true && node.path === undefined && node.target === undefined && (ArrayBuffer.isView(node.source) || Array.isArray(node.source))) {
            node$s = node.source;
            node$o = node.offset;
        }
        let data = ((0) & 0xff);
        if (node) {
            method_update_to_current_time(runtime);
            data = ((((__deref_read(runtime, node).m_output[method_NODE_CHILD_NODE_NUM(runtime, offset)]) & 0xff)) & 0xff);
        }
        else {
            (__L0 ? __L0("discrete_sound_r read from non-existent NODE_%02d\n", ((offset) - (1073741824))) : runtime.macro("fatalerror", "discrete_sound_r read from non-existent NODE_%02d\n", ((offset) - (1073741824))));
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
    function method_discrete_find_node(runtime, node) {
        const members = runtime.members;
        if ((((((Number(node) < Number(1073741824)) ? 1 : 0)) || (((Number(node) > Number(1073744224)) ? 1 : 0))) ? 1 : 0)) {
            return 0;
        }
        return (members.m_indexed_node ?? 0)[method_NODE_INDEX(runtime, node)];
    }
    function method_update_to_current_time(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_update_to_current_time(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
    }
    function __deref_update_to_current_time(runtime, p) {
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
        const __L0 = __l["discrete_log"];
        data = ((data) & 0xff);
        let node = method_discrete_find_node(runtime, offset);
        let node$s = undefined, node$o = 0;
        if (ArrayBuffer.isView(node) || Array.isArray(node))
            node$s = node;
        else if (node !== null && typeof node === 'object' && node.generatedPointer === true && node.path === undefined && node.target === undefined && (ArrayBuffer.isView(node.source) || Array.isArray(node.source))) {
            node$s = node.source;
            node$o = node.offset;
        }
        if (node) {
            let intf = 0;
            if ((__deref_write(runtime, node).interface__discrete_input_interface?.(({ generatedLValue: true, get: () => intf, set: (value) => { intf = value; } })) ?? 0)) {
                (__deref_write(runtime, intf).input_write?.(0, data) ?? 0);
            }
            else {
                (__L0 ? __L0("discrete_sound_w write to non-input NODE_%02d\n", ((offset) - (1073741824))) : runtime.macro("discrete_log", "discrete_sound_w write to non-input NODE_%02d\n", ((offset) - (1073741824))));
            }
        }
        else {
            (__L0 ? __L0("discrete_sound_w write to non-existent NODE_%02d\n", ((offset) - (1073741824))) : runtime.macro("discrete_log", "discrete_sound_w write to non-existent NODE_%02d\n", ((offset) - (1073741824))));
        }
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
    function method_set_intf(runtime, intf) {
        const members = runtime.members;
        const __pointee_intf = __deref_set_intf(runtime, intf);
        members.m_intf = intf;
    }
    function __deref_set_intf(runtime, p) {
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
    function method_profiling(runtime) {
        const members = runtime.members;
        return (((members.m_profiling ?? 0)) | 0);
    }
    function method_sample_rate(runtime) {
        const members = runtime.members;
        return (((members.m_sample_rate ?? 0)) | 0);
    }
    function method_sample_time(runtime) {
        const members = runtime.members;
        return (members.m_sample_time ?? 0);
    }
    function method_discrete_device__set_intf(runtime, intf) {
        const members = runtime.members;
        const __pointee_intf = __deref_discrete_device__set_intf(runtime, intf);
        members.m_intf = intf;
    }
    function __deref_discrete_device__set_intf(runtime, p) {
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
    function method_discrete_device__profiling(runtime) {
        const members = runtime.members;
        return (((members.m_profiling ?? 0)) | 0);
    }
    function method_discrete_device__sample_rate(runtime) {
        const members = runtime.members;
        return (((members.m_sample_rate ?? 0)) | 0);
    }
    function method_discrete_device__sample_time(runtime) {
        const members = runtime.members;
        return (members.m_sample_time ?? 0);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0;
        const h_m_output_list = members.m_output_list ?? 0;
        const h_m_input_stream_list = members.m_input_stream_list ?? 0;
        let outputnum = ((0) | 0);
        for (let __range0 = h_m_output_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            (__deref_sound_stream_update(runtime, __range0_item).set_output_ptr?.(stream, outputnum) ?? 0);
            outputnum = ((((outputnum) + (1))) | 0);
        }
        let inputnum = ((0) | 0);
        for (let __range0 = h_m_input_stream_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            (__deref_sound_stream_update(runtime, __range0_item).set_input_ptr?.(stream, inputnum) ?? 0);
            inputnum = ((((inputnum) + (1))) | 0);
        }
        method_process(runtime, (__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")));
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
    function method_process(runtime, samples) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::atomic_thread_fence"], __L1 = __l["osd_work_item_queue"], __L2 = __l["osd_ticks_per_second"], __L3 = __l["osd_work_queue_wait"];
        if ((((samples) === (0)) ? 1 : 0)) {
            return;
        }
        for (let __range0 = (members.task_list ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            (__deref_process(runtime, __range0_item).prepare_for_queue?.(samples) ?? 0);
        }
        (__L0 ? __L0(3) : runtime.macro("std::atomic_thread_fence", 3));
        for (let __range0 = (members.task_list ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = __range0[__range0_index];
            (__L1 ? __L1((members.m_queue ?? 0), method_discrete_task__task_callback.bind(undefined, runtime), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.task_list ?? 0), set: (value) => { members.task_list = value; } }), offset: 0 }), 1) : runtime.macro("osd_work_item_queue", (members.m_queue ?? 0), method_discrete_task__task_callback.bind(undefined, runtime), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.task_list ?? 0), set: (value) => { members.task_list = value; } }), offset: 0 }), 1));
        }
        (__L3 ? __L3((members.m_queue ?? 0), (((__L2 ? __L2() : runtime.macro("osd_ticks_per_second"))) * (10))) : runtime.macro("osd_work_queue_wait", (members.m_queue ?? 0), (((__L2 ? __L2() : runtime.macro("osd_ticks_per_second"))) * (10))));
        if ((members.m_profiling ?? 0)) {
            members.m_total_samples = runtime.wide("+", (members.m_total_samples ?? 0), samples);
            members.m_total_stream_updates = runtime.wide("+", (members.m_total_stream_updates ?? 0), 1);
        }
    }
    function __deref_process(runtime, p) {
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
    function method_get_stream(runtime) {
        const members = runtime.members;
        return (members.m_stream ?? 0);
    }
    function method_discrete_sound_device__get_stream(runtime) {
        const members = runtime.members;
        return (members.m_stream ?? 0);
    }
    function method_discrete_task__task_callback(runtime, param, threadid) {
        const members = runtime.members;
        let __t0, __t1;
        let list = __deref_discrete_task__task_callback(runtime, param);
        while (1) {
            for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = __range0[__range0_index];
                if ((__deref_discrete_task__task_callback(runtime, __range0_item).lock_threadid?.(threadid) ?? 0)) {
                    if ((((__t0 = __deref_discrete_task__task_callback(runtime, __range0_item), typeof __t0.process === 'function' ? (__t0.process() ?? 0) : runtime.container(__range0_item, "process"))) ? 0 : 1)) {
                        return 0;
                    }
                    (__t1 = __deref_discrete_task__task_callback(runtime, __range0_item), typeof __t1.unlock === 'function' ? (__t1.unlock() ?? 0) : runtime.container(__range0_item, "unlock"));
                }
            }
        }
        return 0;
    }
    function __deref_discrete_task__task_callback(runtime, p) {
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
        "discrete_build_list": method_discrete_build_list,
        "NODE_INDEX": method_NODE_INDEX,
        "display_profiling": method_display_profiling,
        "list_run_time": method_list_run_time,
        "step_list_run_time": method_step_list_run_time,
        "init_nodes": method_init_nodes,
        "device_start": method_device_start,
        "discrete_device::device_start": method_discrete_device__device_start,
        "discrete_sanity_check": method_discrete_sanity_check,
        "NODE_CHILD_NODE_NUM": method_NODE_CHILD_NODE_NUM,
        "device_stop": method_device_stop,
        "read": method_read,
        "discrete_find_node": method_discrete_find_node,
        "update_to_current_time": method_update_to_current_time,
        "write": method_write,
        "set_intf": method_set_intf,
        "profiling": method_profiling,
        "sample_rate": method_sample_rate,
        "sample_time": method_sample_time,
        "discrete_device::set_intf": method_discrete_device__set_intf,
        "discrete_device::profiling": method_discrete_device__profiling,
        "discrete_device::sample_rate": method_discrete_device__sample_rate,
        "discrete_device::sample_time": method_discrete_device__sample_time,
        "sound_stream_update": method_sound_stream_update,
        "process": method_process,
        "get_stream": method_get_stream,
        "discrete_sound_device::get_stream": method_discrete_sound_device__get_stream,
        "discrete_task::task_callback": method_discrete_task__task_callback
    };
    return __methodTable;
})();
definition.children[0].definition.compiledMethodLinks = ["CALL_METHOD", "DYNAMIC_CAST", "atoi", "discrete_log", "fatalerror", "osd_getenv", "osd_printf_info", "osd_ticks_per_second", "osd_work_item_queue", "osd_work_queue_alloc", "osd_work_queue_free", "osd_work_queue_wait", "std::atomic_thread_fence", "stream_alloc"];
definition.children[0].definition.allocations["discrete_task"].compiledMethods = (() => {
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
    function cppStruct_ptr_linked_outbuf_buffer(a0, a1, a2) { this["ptr"] = a0; this["linked_outbuf"] = a1; this["buffer"] = a2; }
    cppStruct_ptr_linked_outbuf_buffer.prototype = cppStructPrototype;
    function method_step_nodes(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_profile_ticks"], __L1 = __l["std::atomic_thread_fence"];
        let __t0, __t1, __t2, __t3;
        const h_source_list = members.source_list ?? 0;
        const h_step_list = members.step_list ?? 0;
        for (let __range0 = h_source_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            __range0_item.buffer = __deref_step_nodes(runtime, (__t0 = __range0_item.ptr, __range0_item.ptr = __add_step_nodes(runtime, __range0_item.ptr, 1), __t0));
        }
        if ((((__t1 = __deref_step_nodes(runtime, members.m_device), typeof __t1.profiling === 'function' ? __t1.profiling() : typeof __t1.profiling === 'number' || typeof __t1.profiling === 'boolean' ? __t1.profiling : runtime.container(members.m_device, "profiling"))) ? 0 : 1)) {
            for (let __range0 = h_step_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                (__t2 = __deref_step_nodes(runtime, __range0_item), typeof __t2.step === 'function' ? (__t2.step() ?? 0) : runtime.container(__range0_item, "step"));
            }
        }
        else {
            let last = (__L0 ? __L0() : runtime.macro("get_profile_ticks"));
            for (let __range0 = h_step_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                __range0_item.run_time = runtime.subtract(__range0_item.run_time, last);
                (__t3 = __deref_step_nodes(runtime, __range0_item), typeof __t3.step === 'function' ? (__t3.step() ?? 0) : runtime.container(__range0_item, "step"));
                last = (__L0 ? __L0() : runtime.macro("get_profile_ticks"));
                __range0_item.run_time = __add_step_nodes(runtime, __range0_item.run_time, last);
            }
        }
        for (let __range0 = (members.m_buffers ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            runtime.pointerStore(__range0_item.ptr, __deref_step_nodes(runtime, __range0_item.source));
        }
        (__L1 ? __L1(3) : runtime.macro("std::atomic_thread_fence", 3));
        for (let __range0 = (members.m_buffers ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            (__range0_item.ptr = __add_step_nodes(runtime, __range0_item.ptr, 1));
        }
    }
    function __add_step_nodes(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_step_nodes(runtime, p) {
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
    function method_task_callback(runtime, param, threadid) {
        const members = runtime.members;
        let __t0, __t1;
        let list = __deref_task_callback(runtime, param);
        while (1) {
            for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                if ((__deref_task_callback(runtime, __range0_item).lock_threadid?.(threadid) ?? 0)) {
                    if ((((__t0 = __deref_task_callback(runtime, __range0_item), typeof __t0.process === 'function' ? (__t0.process() ?? 0) : runtime.container(__range0_item, "process"))) ? 0 : 1)) {
                        return 0;
                    }
                    (__t1 = __deref_task_callback(runtime, __range0_item), typeof __t1.unlock === 'function' ? (__t1.unlock() ?? 0) : runtime.container(__range0_item, "unlock"));
                }
            }
        }
        return 0;
    }
    function __deref_task_callback(runtime, p) {
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
    function method_process(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["emu_fatalerror"], __L1 = __l["__throw"], __L2 = __l["std::atomic_thread_fence"];
        const h_source_list = members.source_list ?? 0;
        let samples = ((cppMin(+((members.m_samples ?? 0)), +(240))) | 0);
        for (let __range0 = h_source_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            let avail = ((runtime.subtract(__deref_process(runtime, __range0_item.linked_outbuf).ptr, __range0_item.ptr)) | 0);
            if ((((avail) < (0)) ? 1 : 0)) {
                (__L1 ? __L1((__L0 ? __L0("discrete_task::process: available samples are negative") : runtime.macro("emu_fatalerror", "discrete_task::process: available samples are negative"))) : runtime.macro("__throw", (__L0 ? __L0("discrete_task::process: available samples are negative") : runtime.macro("emu_fatalerror", "discrete_task::process: available samples are negative"))));
            }
            if ((((avail) < (samples)) ? 1 : 0)) {
                samples = ((avail) | 0);
            }
        }
        (__L2 ? __L2(2) : runtime.macro("std::atomic_thread_fence", 2));
        members.m_samples = ((((members.m_samples) - (samples))) | 0);
        if (((((members.m_samples ?? 0)) < (0)) ? 1 : 0)) {
            (__L1 ? __L1((__L0 ? __L0("discrete_task::process: m_samples got negative") : runtime.macro("emu_fatalerror", "discrete_task::process: m_samples got negative"))) : runtime.macro("__throw", (__L0 ? __L0("discrete_task::process: m_samples got negative") : runtime.macro("emu_fatalerror", "discrete_task::process: m_samples got negative"))));
        }
        while ((((samples) > (0)) ? 1 : 0)) {
            method_step_nodes(runtime);
            samples = ((((samples) - (1))) | 0);
        }
        if (((((members.m_samples ?? 0)) === (0)) ? 1 : 0)) {
            return 0;
        }
        return 1;
    }
    function __deref_process(runtime, p) {
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
    function method_prepare_for_queue(runtime, samples) {
        const members = runtime.members;
        let __t0, __t1;
        const h_source_list = members.source_list ?? 0;
        (members.m_threadid = -1);
        members.m_samples = ((samples) | 0);
        for (let __range0 = (members.m_buffers ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            (__range0_item.ptr = (__t0 = __deref_prepare_for_queue(runtime, __range0_item.node_buf), typeof __t0.get === 'function' ? (__t0.get() ?? 0) : runtime.container(__range0_item.node_buf, "get")));
        }
        for (let __range0 = h_source_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            __range0_item.ptr = (__t1 = __deref_prepare_for_queue(runtime, __deref_prepare_for_queue(runtime, __range0_item.linked_outbuf).node_buf), typeof __t1.get === 'function' ? (__t1.get() ?? 0) : runtime.container(__deref_prepare_for_queue(runtime, __range0_item.linked_outbuf).node_buf, "get"));
        }
    }
    function __deref_prepare_for_queue(runtime, p) {
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
    function method_check(runtime, dest_task) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"];
        let __t0, __t1, __t2, __t3, __t4, __t5;
        const h_task_group = members.task_group ?? 0;
        const h_step_list = members.step_list ?? 0;
        ((members.m_buffers).reserve?.(16) ?? 0);
        for (let __range0 = h_step_list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            let task_node = __range0_item.self;
            let task_node$s = undefined, task_node$o = 0;
            if (ArrayBuffer.isView(task_node) || Array.isArray(task_node))
                task_node$s = task_node;
            else if (task_node !== null && typeof task_node === 'object' && task_node.generatedPointer === true && task_node.path === undefined && task_node.target === undefined && (ArrayBuffer.isView(task_node.source) || Array.isArray(task_node.source))) {
                task_node$s = task_node.source;
                task_node$o = task_node.offset;
            }
            for (let __range1 = dest_task.step_list, __range1_index = 0; ((Number(__range1_index) < Number(__range1.length)) ? 1 : 0); __range1_index = ((__range1_index) + (1))) {
                const __range1_item = runtime.readIndex(__range1, __range1_index);
                let dest_node = __range1_item.self;
                let dest_node$s = undefined, dest_node$o = 0;
                if (ArrayBuffer.isView(dest_node) || Array.isArray(dest_node))
                    dest_node$s = dest_node;
                else if (dest_node !== null && typeof dest_node === 'object' && dest_node.generatedPointer === true && dest_node.path === undefined && dest_node.target === undefined && (ArrayBuffer.isView(dest_node.source) || Array.isArray(dest_node.source))) {
                    dest_node$s = dest_node.source;
                    dest_node$o = dest_node.offset;
                }
                for (let inputnum = ((0) | 0); ((Number(inputnum) < Number((__t0 = __deref_check(runtime, dest_node), typeof __t0.active_inputs === 'function' ? __t0.active_inputs() : typeof __t0.active_inputs === 'number' || typeof __t0.active_inputs === 'boolean' ? __t0.active_inputs : runtime.container(dest_node, "active_inputs")))) ? 1 : 0); inputnum = ((((inputnum) + (1))) | 0)) {
                    let inputnode_num = (((__deref_check(runtime, dest_node).input_node?.(inputnum) ?? 0)) | 0);
                    if ((((((Number(inputnode_num) > Number(1073741824)) ? 1 : 0)) && (((Number(inputnode_num) <= Number(1073744224)) ? 1 : 0))) ? 1 : 0)) {
                        if (((Number(method_NODE_DEFAULT_NODE(runtime, (__t1 = __deref_check(runtime, task_node), typeof __t1.block_node === 'function' ? __t1.block_node() : typeof __t1.block_node === 'number' || typeof __t1.block_node === 'boolean' ? __t1.block_node : runtime.container(task_node, "block_node")))) === Number(method_NODE_DEFAULT_NODE(runtime, inputnode_num))) ? 1 : 0)) {
                            let found = ((-1) | 0);
                            let pbuf = 0;
                            for (let i = ((0) | 0); ((Number(i) < Number((members.m_buffers).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                if (((Number(runtime.readIndex((members.m_buffers ?? 0), i).node_num) === Number(inputnode_num)) ? 1 : 0)) {
                                    found = ((i) | 0);
                                    pbuf = __addr_check(runtime, (members.m_buffers ?? 0), i);
                                    break;
                                }
                            }
                            if ((((found) < (0)) ? 1 : 0)) {
                                let buf = (__L0 ? __L0("output_buffer") : runtime.macro("STRUCT_OF", "output_buffer"));
                                buf.node_buf = new Float64Array(Math.max(0, Number(runtime.divide(__add_check(runtime, (__t2 = __deref_check(runtime, task_node), typeof __t2.sample_rate === 'function' ? __t2.sample_rate() : typeof __t2.sample_rate === 'number' || typeof __t2.sample_rate === 'boolean' ? __t2.sample_rate : runtime.container(task_node, "sample_rate")), 50), 50))));
                                (buf.ptr = buf.node_buf);
                                buf.source = runtime.readIndex(__deref_check(runtime, dest_node).m_input, inputnum);
                                buf.node_num = ((inputnode_num) | 0);
                                (members.m_buffers).push(buf);
                                pbuf = (__t3 = (members.m_buffers), typeof __t3.back === 'function' ? __t3.back() : typeof __t3.back === 'number' || typeof __t3.back === 'boolean' ? __t3.back : runtime.container(members.m_buffers, "back"));
                            }
                            (__deref_check(runtime, members.m_device).discrete_log?.("dso_task_start - buffering %d(%d) in task %p group %d referenced by %d group %d", method_NODE_INDEX(runtime, inputnode_num), method_NODE_CHILD_NODE_NUM(runtime, inputnode_num), (members.this ?? 0), h_task_group, (__t4 = __deref_check(runtime, dest_node), typeof __t4.index === 'function' ? __t4.index() : typeof __t4.index === 'number' || typeof __t4.index === 'boolean' ? __t4.index : runtime.container(dest_node, "index")), dest_task.task_group) ?? 0);
                            (dest_task.source_list).push(new cppStruct_ptr_linked_outbuf_buffer(0, pbuf, 0));
                            runtime.writeIndex(__deref_check(runtime, dest_node).m_input, inputnum, runtime.fieldAddress((__t5 = __deref_check(runtime, dest_task.source_list), typeof __t5.back === 'function' ? __t5.back() : typeof __t5.back === 'number' || typeof __t5.back === 'boolean' ? __t5.back : runtime.container(dest_task.source_list, "back")), "buffer"));
                        }
                    }
                }
            }
        }
    }
    function __add_check(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_check(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_check(runtime, p) {
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
    function method_NODE_DEFAULT_NODE(runtime, x) {
        const members = runtime.members;
        return ((x) & (-8));
    }
    function method_NODE_INDEX(runtime, x) {
        const members = runtime.members;
        return runtime.shiftRight(((x) - (1073741824)), 3);
    }
    function method_NODE_CHILD_NODE_NUM(runtime, x) {
        const members = runtime.members;
        return ((x) & (7));
    }
    function method_discrete_task(runtime, pdev) {
        const members = runtime.members;
        const h_source_list = members.source_list ?? 0;
        ((h_source_list).reserve?.(16) ?? 0);
    }
    function method_lock_threadid(runtime, threadid) {
        const members = runtime.members;
        let expected = ((-1) | 0);
        return ((((Number((members.m_threadid ?? 0)) === Number(expected)) ? 1 : 0)) ? (((((members.m_threadid = threadid)) || (1)) ? 1 : 0)) : (((((expected = (((members.m_threadid ?? 0)) | 0))) && (0)) ? 1 : 0)));
    }
    function method_unlock(runtime) {
        const members = runtime.members;
        (members.m_threadid = -1);
    }
    function method_discrete_task__discrete_task(runtime, pdev) {
        const members = runtime.members;
        const h_source_list = members.source_list ?? 0;
        ((h_source_list).reserve?.(16) ?? 0);
    }
    function method_discrete_task__lock_threadid(runtime, threadid) {
        const members = runtime.members;
        let expected = ((-1) | 0);
        return ((((Number((members.m_threadid ?? 0)) === Number(expected)) ? 1 : 0)) ? (((((members.m_threadid = threadid)) || (1)) ? 1 : 0)) : (((((expected = (((members.m_threadid ?? 0)) | 0))) && (0)) ? 1 : 0)));
    }
    function method_discrete_task__unlock(runtime) {
        const members = runtime.members;
        (members.m_threadid = -1);
    }
    function method___construct(runtime, pdev) {
        const members = runtime.members;
        const h_source_list = members.source_list ?? 0;
        members.m_device = pdev;
        members.m_threadid = -1;
        members.m_samples = ((0) | 0);
        ((h_source_list).reserve?.(16) ?? 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "step_nodes": method_step_nodes,
        "task_callback": method_task_callback,
        "process": method_process,
        "prepare_for_queue": method_prepare_for_queue,
        "check": method_check,
        "NODE_DEFAULT_NODE": method_NODE_DEFAULT_NODE,
        "NODE_INDEX": method_NODE_INDEX,
        "NODE_CHILD_NODE_NUM": method_NODE_CHILD_NODE_NUM,
        "discrete_task": method_discrete_task,
        "lock_threadid": method_lock_threadid,
        "unlock": method_unlock,
        "discrete_task::discrete_task": method_discrete_task__discrete_task,
        "discrete_task::lock_threadid": method_discrete_task__lock_threadid,
        "discrete_task::unlock": method_discrete_task__unlock,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.children[0].definition.allocations["discrete_task"].compiledMethodLinks = ["STRUCT_OF", "__throw", "emu_fatalerror", "get_profile_ticks", "std::atomic_thread_fence"];
definition.children[0].definition.allocations["discrete_task"].allocations["output_buffer"].compiledMethods = (() => {
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
    function method___construct(runtime) {
        const members = runtime.members;
        members.source = 0;
        members.ptr = 0;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.children[0].definition.allocations["discrete_task"].allocations["output_buffer"].compiledStructMethods = {
    "output_buffer": (() => {
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
        function method___construct(runtime) {
            const members = runtime.members;
            members.source = 0;
            members.ptr = 0;
        }
        function method___construct_1(runtime, that) {
            const members = runtime.members;
            members.node_buf = that.node_buf;
            members.source = that.source;
            members.ptr = (__deref___construct_1(runtime, that.ptr).load?.(0) ?? 0);
            members.node_num = ((that.node_num) | 0);
        }
        function __deref___construct_1(runtime, p) {
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
            "__construct": method___construct,
            "__construct_1": method___construct_1
        };
        return __methodTable;
    })(),
    "double_stack": (() => {
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
        function method___construct(runtime) {
            const members = runtime.members;
            const h_stk = members.stk ?? 0;
            members.p = __addr___construct(runtime, h_stk, 0);
        }
        function __addr___construct(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function method_push(runtime, v) {
            const members = runtime.members;
            let __t0;
            runtime.pointerStore((__t0 = (members.p ?? 0), members.p = __add_push(runtime, members.p, 1), __t0), v);
        }
        function __add_push(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_pop(runtime) {
            const members = runtime.members;
            members.p = runtime.subtract(members.p, 1);
            return __deref_pop(runtime, (members.p ?? 0));
        }
        function __deref_pop(runtime, p) {
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
            "__construct": method___construct,
            "push": method_push,
            "pop": method_pop
        };
        return __methodTable;
    })(),
};
definition.children[0].definition.allocations["discrete_task"].compiledStructMethods = {
    "double_stack": (() => {
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
        function method___construct(runtime) {
            const members = runtime.members;
            const h_stk = members.stk ?? 0;
            members.p = __addr___construct(runtime, h_stk, 0);
        }
        function __addr___construct(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function method_push(runtime, v) {
            const members = runtime.members;
            let __t0;
            runtime.pointerStore((__t0 = (members.p ?? 0), members.p = __add_push(runtime, members.p, 1), __t0), v);
        }
        function __add_push(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_pop(runtime) {
            const members = runtime.members;
            members.p = runtime.subtract(members.p, 1);
            return __deref_pop(runtime, (members.p ?? 0));
        }
        function __deref_pop(runtime, p) {
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
        function method_task_callback(runtime, param, threadid) {
            const members = runtime.members;
            let __t0, __t1;
            let list = __deref_task_callback(runtime, param);
            while (1) {
                for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                    const __range0_item = runtime.readIndex(__range0, __range0_index);
                    if ((__deref_task_callback(runtime, __range0_item).lock_threadid?.(threadid) ?? 0)) {
                        if ((((__t0 = __deref_task_callback(runtime, __range0_item), typeof __t0.process === 'function' ? (__t0.process() ?? 0) : runtime.container(__range0_item, "process"))) ? 0 : 1)) {
                            return 0;
                        }
                        (__t1 = __deref_task_callback(runtime, __range0_item), typeof __t1.unlock === 'function' ? (__t1.unlock() ?? 0) : runtime.container(__range0_item, "unlock"));
                    }
                }
            }
            return 0;
        }
        function __deref_task_callback(runtime, p) {
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
        function method_NODE_DEFAULT_NODE(runtime, x) {
            const members = runtime.members;
            return ((x) & (-8));
        }
        function method_NODE_INDEX(runtime, x) {
            const members = runtime.members;
            return runtime.shiftRight(((x) - (1073741824)), 3);
        }
        function method_NODE_CHILD_NODE_NUM(runtime, x) {
            const members = runtime.members;
            return ((x) & (7));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "push": method_push,
            "pop": method_pop,
            "task_callback": method_task_callback,
            "NODE_DEFAULT_NODE": method_NODE_DEFAULT_NODE,
            "NODE_INDEX": method_NODE_INDEX,
            "NODE_CHILD_NODE_NUM": method_NODE_CHILD_NODE_NUM
        };
        return __methodTable;
    })(),
};
definition.children[0].definition.compiledStructMethods = {
    "output_buffer": (() => {
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
        function method___construct(runtime) {
            const members = runtime.members;
            members.source = 0;
            members.ptr = 0;
        }
        function method___construct_1(runtime, that) {
            const members = runtime.members;
            members.node_buf = that.node_buf;
            members.source = that.source;
            members.ptr = (__deref___construct_1(runtime, that.ptr).load?.(0) ?? 0);
            members.node_num = ((that.node_num) | 0);
        }
        function __deref___construct_1(runtime, p) {
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
        function method_discrete_build_list(runtime, intf, block_list) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["discrete_log"], __L1 = __l["fatalerror"];
            const __pointee_intf = __deref_discrete_build_list(runtime, intf);
            let node_count = ((0) | 0);
            for (; ((Number(runtime.readIndex(intf, node_count).type) !== Number(0)) ? 1 : 0);) {
                if (((Number(runtime.readIndex(intf, node_count).type) === Number(9)) ? 1 : 0)) {
                    (__L0 ? __L0("discrete_build_list() - DISCRETE_IMPORT @ NODE_%02d", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)) : runtime.macro("discrete_log", "discrete_build_list() - DISCRETE_IMPORT @ NODE_%02d", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)));
                    method_discrete_build_list(runtime, runtime.readIndex(intf, node_count).custom, block_list);
                }
                else {
                    if (((Number(runtime.readIndex(intf, node_count).type) === Number(10)) ? 1 : 0)) {
                        let found = ((0) ? 1 : 0);
                        node_count = ((((node_count) + (1))) | 0);
                        if (((Number(runtime.readIndex(intf, node_count).type) === Number(0)) ? 1 : 0)) {
                            (__L1 ? __L1("discrete_build_list: DISCRETE_REPLACE at end of node_list\n") : runtime.macro("fatalerror", "discrete_build_list: DISCRETE_REPLACE at end of node_list\n"));
                        }
                        for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            let block = runtime.readIndex(block_list, i);
                            if (((Number(__deref_discrete_build_list(runtime, block).type) !== Number(1073744224)) ? 1 : 0)) {
                                if (((Number(__deref_discrete_build_list(runtime, block).node) === Number(runtime.readIndex(intf, node_count).node)) ? 1 : 0)) {
                                    runtime.writeIndex(block_list, i, __addr_discrete_build_list(runtime, intf, node_count));
                                    (__L0 ? __L0("discrete_build_list() - DISCRETE_REPLACE @ NODE_%02d", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)) : runtime.macro("discrete_log", "discrete_build_list() - DISCRETE_REPLACE @ NODE_%02d", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)));
                                    found = ((1) ? 1 : 0);
                                    break;
                                }
                            }
                        }
                        if (((found) ? 0 : 1)) {
                            (__L1 ? __L1("discrete_build_list: DISCRETE_REPLACE did not found node %d\n", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)) : runtime.macro("fatalerror", "discrete_build_list: DISCRETE_REPLACE did not found node %d\n", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)));
                        }
                    }
                    else {
                        if (((Number(runtime.readIndex(intf, node_count).type) === Number(11)) ? 1 : 0)) {
                            let deletethem = [];
                            for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                let block = runtime.readIndex(block_list, i);
                                if ((((((Number(__deref_discrete_build_list(runtime, block).node) >= Number(runtime.readIndex(intf, node_count).input_node[0])) ? 1 : 0)) && (((Number(__deref_discrete_build_list(runtime, block).node) <= Number(runtime.readIndex(intf, node_count).input_node[1])) ? 1 : 0))) ? 1 : 0)) {
                                    (__L0 ? __L0("discrete_build_list() - DISCRETE_DELETE deleted NODE_%02d", method_NODE_INDEX(runtime, __deref_discrete_build_list(runtime, block).node)) : runtime.macro("discrete_log", "discrete_build_list() - DISCRETE_DELETE deleted NODE_%02d", method_NODE_INDEX(runtime, __deref_discrete_build_list(runtime, block).node)));
                                    (deletethem).push(i);
                                }
                            }
                            for (let __range0 = deletethem, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                                const __range0_item = runtime.readIndex(__range0, __range0_index);
                                runtime.vectorMethod(block_list, "erase", __addr_discrete_build_list(runtime, runtime.container(block_list, "begin"), __range0_item));
                            }
                        }
                        else {
                            (__L0 ? __L0("discrete_build_list() - adding node %d\n", node_count) : runtime.macro("discrete_log", "discrete_build_list() - adding node %d\n", node_count));
                            (block_list).push(__addr_discrete_build_list(runtime, intf, node_count));
                        }
                    }
                }
                node_count = ((((node_count) + (1))) | 0);
            }
        }
        function __addr_discrete_build_list(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_discrete_build_list(runtime, p) {
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
        function method_NODE_INDEX(runtime, x) {
            const members = runtime.members;
            return runtime.shiftRight(((x) - (1073741824)), 3);
        }
        function method_list_run_time(runtime, list) {
            const members = runtime.members;
            let total = 0;
            for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                let step = 0;
                if ((__deref_list_run_time(runtime, __range0_item).interface?.(step) ?? 0)) {
                    total = runtime.wide("+", total, __deref_list_run_time(runtime, step).run_time);
                }
            }
            return total;
        }
        function __deref_list_run_time(runtime, p) {
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
        function method_step_list_run_time(runtime, list) {
            const members = runtime.members;
            let total = 0;
            for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                total = runtime.wide("+", total, __range0_item.run_time);
            }
            return total;
        }
        function method_discrete_sanity_check(runtime, block_list) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["discrete_log"], __L1 = __l["fatalerror"];
            let node_count = ((0) | 0);
            (__L0 ? __L0("discrete_start() - Doing node list sanity check") : runtime.macro("discrete_log", "discrete_start() - Doing node list sanity check"));
            for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let block = runtime.readIndex(block_list, i);
                let block$s = undefined, block$o = 0;
                if (ArrayBuffer.isView(block) || Array.isArray(block))
                    block$s = block;
                else if (block !== null && typeof block === 'object' && block.generatedPointer === true && block.path === undefined && block.target === undefined && (ArrayBuffer.isView(block.source) || Array.isArray(block.source))) {
                    block$s = block.source;
                    block$o = block.offset;
                }
                if ((((node_count) > (300)) ? 1 : 0)) {
                    (__L1 ? __L1("discrete_start() - Upper limit of %d nodes exceeded, have you terminated the interface block?\n", 300) : runtime.macro("fatalerror", "discrete_start() - Upper limit of %d nodes exceeded, have you terminated the interface block?\n", 300));
                }
                if ((((((Number(__deref_discrete_sanity_check(runtime, block).node) < Number(1073741824)) ? 1 : 0)) || (((Number(__deref_discrete_sanity_check(runtime, block).node) > Number(1073744224)) ? 1 : 0))) ? 1 : 0)) {
                    (__L1 ? __L1("discrete_start() - Invalid node number on node %02d descriptor\n", __deref_discrete_sanity_check(runtime, block).node) : runtime.macro("fatalerror", "discrete_start() - Invalid node number on node %02d descriptor\n", __deref_discrete_sanity_check(runtime, block).node));
                }
                if (((Number(__deref_discrete_sanity_check(runtime, block).type) > Number(8)) ? 1 : 0)) {
                    (__L1 ? __L1("discrete_start() - Invalid function type on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)) : runtime.macro("fatalerror", "discrete_start() - Invalid function type on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)));
                }
                if (((Number(method_NODE_CHILD_NODE_NUM(runtime, __deref_discrete_sanity_check(runtime, block).node)) > Number(0)) ? 1 : 0)) {
                    (__L1 ? __L1("discrete_start() - Child node number on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)) : runtime.macro("fatalerror", "discrete_start() - Child node number on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)));
                }
                node_count = ((((node_count) + (1))) | 0);
            }
            (__L0 ? __L0("discrete_start() - Sanity check counted %d nodes", node_count) : runtime.macro("discrete_log", "discrete_start() - Sanity check counted %d nodes", node_count));
        }
        function __deref_discrete_sanity_check(runtime, p) {
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
        function method_NODE_CHILD_NODE_NUM(runtime, x) {
            const members = runtime.members;
            return ((x) & (7));
        }
        function method_read(runtime, offset) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["fatalerror"];
            let node = runtime.invoke("discrete_find_node", offset);
            let node$s = undefined, node$o = 0;
            if (ArrayBuffer.isView(node) || Array.isArray(node))
                node$s = node;
            else if (node !== null && typeof node === 'object' && node.generatedPointer === true && node.path === undefined && node.target === undefined && (ArrayBuffer.isView(node.source) || Array.isArray(node.source))) {
                node$s = node.source;
                node$o = node.offset;
            }
            let data = ((0) & 0xff);
            if (node) {
                runtime.invoke("update_to_current_time");
                data = ((((runtime.readIndex(__deref_read(runtime, node).m_output, method_NODE_CHILD_NODE_NUM(runtime, offset))) & 0xff)) & 0xff);
            }
            else {
                (__L0 ? __L0("discrete_sound_r read from non-existent NODE_%02d\n", ((offset) - (1073741824))) : runtime.macro("fatalerror", "discrete_sound_r read from non-existent NODE_%02d\n", ((offset) - (1073741824))));
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
            const __L0 = __l["discrete_log"];
            data = ((data) & 0xff);
            let node = runtime.invoke("discrete_find_node", offset);
            let node$s = undefined, node$o = 0;
            if (ArrayBuffer.isView(node) || Array.isArray(node))
                node$s = node;
            else if (node !== null && typeof node === 'object' && node.generatedPointer === true && node.path === undefined && node.target === undefined && (ArrayBuffer.isView(node.source) || Array.isArray(node.source))) {
                node$s = node.source;
                node$o = node.offset;
            }
            if (node) {
                let intf = 0;
                if ((__deref_write(runtime, node).interface__discrete_input_interface?.(({ generatedLValue: true, get: () => intf, set: (value) => { intf = value; } })) ?? 0)) {
                    (__deref_write(runtime, intf).input_write?.(0, data) ?? 0);
                }
                else {
                    (__L0 ? __L0("discrete_sound_w write to non-input NODE_%02d\n", ((offset) - (1073741824))) : runtime.macro("discrete_log", "discrete_sound_w write to non-input NODE_%02d\n", ((offset) - (1073741824))));
                }
            }
            else {
                (__L0 ? __L0("discrete_sound_w write to non-existent NODE_%02d\n", ((offset) - (1073741824))) : runtime.macro("discrete_log", "discrete_sound_w write to non-existent NODE_%02d\n", ((offset) - (1073741824))));
            }
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
        function method_discrete_task__task_callback(runtime, param, threadid) {
            const members = runtime.members;
            let __t0, __t1;
            let list = __deref_discrete_task__task_callback(runtime, param);
            while (1) {
                for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                    const __range0_item = runtime.readIndex(__range0, __range0_index);
                    if ((__deref_discrete_task__task_callback(runtime, __range0_item).lock_threadid?.(threadid) ?? 0)) {
                        if ((((__t0 = __deref_discrete_task__task_callback(runtime, __range0_item), typeof __t0.process === 'function' ? (__t0.process() ?? 0) : runtime.container(__range0_item, "process"))) ? 0 : 1)) {
                            return 0;
                        }
                        (__t1 = __deref_discrete_task__task_callback(runtime, __range0_item), typeof __t1.unlock === 'function' ? (__t1.unlock() ?? 0) : runtime.container(__range0_item, "unlock"));
                    }
                }
            }
            return 0;
        }
        function __deref_discrete_task__task_callback(runtime, p) {
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
            "__construct": method___construct,
            "__construct_1": method___construct_1,
            "discrete_build_list": method_discrete_build_list,
            "NODE_INDEX": method_NODE_INDEX,
            "list_run_time": method_list_run_time,
            "step_list_run_time": method_step_list_run_time,
            "discrete_sanity_check": method_discrete_sanity_check,
            "NODE_CHILD_NODE_NUM": method_NODE_CHILD_NODE_NUM,
            "read": method_read,
            "write": method_write,
            "discrete_task::task_callback": method_discrete_task__task_callback
        };
        return __methodTable;
    })(),
    "double_stack": (() => {
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
        function method___construct(runtime) {
            const members = runtime.members;
            const h_stk = members.stk ?? 0;
            members.p = __addr___construct(runtime, h_stk, 0);
        }
        function __addr___construct(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function method_push(runtime, v) {
            const members = runtime.members;
            let __t0;
            runtime.pointerStore((__t0 = (members.p ?? 0), members.p = __add_push(runtime, members.p, 1), __t0), v);
        }
        function __add_push(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_pop(runtime) {
            const members = runtime.members;
            members.p = runtime.subtract(members.p, 1);
            return __deref_pop(runtime, (members.p ?? 0));
        }
        function __deref_pop(runtime, p) {
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
        function method_discrete_build_list(runtime, intf, block_list) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["discrete_log"], __L1 = __l["fatalerror"];
            const __pointee_intf = __deref_discrete_build_list(runtime, intf);
            let node_count = ((0) | 0);
            for (; ((Number(runtime.readIndex(intf, node_count).type) !== Number(0)) ? 1 : 0);) {
                if (((Number(runtime.readIndex(intf, node_count).type) === Number(9)) ? 1 : 0)) {
                    (__L0 ? __L0("discrete_build_list() - DISCRETE_IMPORT @ NODE_%02d", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)) : runtime.macro("discrete_log", "discrete_build_list() - DISCRETE_IMPORT @ NODE_%02d", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)));
                    method_discrete_build_list(runtime, runtime.readIndex(intf, node_count).custom, block_list);
                }
                else {
                    if (((Number(runtime.readIndex(intf, node_count).type) === Number(10)) ? 1 : 0)) {
                        let found = ((0) ? 1 : 0);
                        node_count = ((((node_count) + (1))) | 0);
                        if (((Number(runtime.readIndex(intf, node_count).type) === Number(0)) ? 1 : 0)) {
                            (__L1 ? __L1("discrete_build_list: DISCRETE_REPLACE at end of node_list\n") : runtime.macro("fatalerror", "discrete_build_list: DISCRETE_REPLACE at end of node_list\n"));
                        }
                        for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            let block = runtime.readIndex(block_list, i);
                            if (((Number(__deref_discrete_build_list(runtime, block).type) !== Number(1073744224)) ? 1 : 0)) {
                                if (((Number(__deref_discrete_build_list(runtime, block).node) === Number(runtime.readIndex(intf, node_count).node)) ? 1 : 0)) {
                                    runtime.writeIndex(block_list, i, __addr_discrete_build_list(runtime, intf, node_count));
                                    (__L0 ? __L0("discrete_build_list() - DISCRETE_REPLACE @ NODE_%02d", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)) : runtime.macro("discrete_log", "discrete_build_list() - DISCRETE_REPLACE @ NODE_%02d", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)));
                                    found = ((1) ? 1 : 0);
                                    break;
                                }
                            }
                        }
                        if (((found) ? 0 : 1)) {
                            (__L1 ? __L1("discrete_build_list: DISCRETE_REPLACE did not found node %d\n", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)) : runtime.macro("fatalerror", "discrete_build_list: DISCRETE_REPLACE did not found node %d\n", method_NODE_INDEX(runtime, runtime.readIndex(intf, node_count).node)));
                        }
                    }
                    else {
                        if (((Number(runtime.readIndex(intf, node_count).type) === Number(11)) ? 1 : 0)) {
                            let deletethem = [];
                            for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                let block = runtime.readIndex(block_list, i);
                                if ((((((Number(__deref_discrete_build_list(runtime, block).node) >= Number(runtime.readIndex(intf, node_count).input_node[0])) ? 1 : 0)) && (((Number(__deref_discrete_build_list(runtime, block).node) <= Number(runtime.readIndex(intf, node_count).input_node[1])) ? 1 : 0))) ? 1 : 0)) {
                                    (__L0 ? __L0("discrete_build_list() - DISCRETE_DELETE deleted NODE_%02d", method_NODE_INDEX(runtime, __deref_discrete_build_list(runtime, block).node)) : runtime.macro("discrete_log", "discrete_build_list() - DISCRETE_DELETE deleted NODE_%02d", method_NODE_INDEX(runtime, __deref_discrete_build_list(runtime, block).node)));
                                    (deletethem).push(i);
                                }
                            }
                            for (let __range0 = deletethem, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                                const __range0_item = runtime.readIndex(__range0, __range0_index);
                                runtime.vectorMethod(block_list, "erase", __addr_discrete_build_list(runtime, runtime.container(block_list, "begin"), __range0_item));
                            }
                        }
                        else {
                            (__L0 ? __L0("discrete_build_list() - adding node %d\n", node_count) : runtime.macro("discrete_log", "discrete_build_list() - adding node %d\n", node_count));
                            (block_list).push(__addr_discrete_build_list(runtime, intf, node_count));
                        }
                    }
                }
                node_count = ((((node_count) + (1))) | 0);
            }
        }
        function __addr_discrete_build_list(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_discrete_build_list(runtime, p) {
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
        function method_NODE_INDEX(runtime, x) {
            const members = runtime.members;
            return runtime.shiftRight(((x) - (1073741824)), 3);
        }
        function method_list_run_time(runtime, list) {
            const members = runtime.members;
            let total = 0;
            for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                let step = 0;
                if ((__deref_list_run_time(runtime, __range0_item).interface?.(step) ?? 0)) {
                    total = runtime.wide("+", total, __deref_list_run_time(runtime, step).run_time);
                }
            }
            return total;
        }
        function __deref_list_run_time(runtime, p) {
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
        function method_step_list_run_time(runtime, list) {
            const members = runtime.members;
            let total = 0;
            for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                total = runtime.wide("+", total, __range0_item.run_time);
            }
            return total;
        }
        function method_discrete_sanity_check(runtime, block_list) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["discrete_log"], __L1 = __l["fatalerror"];
            let node_count = ((0) | 0);
            (__L0 ? __L0("discrete_start() - Doing node list sanity check") : runtime.macro("discrete_log", "discrete_start() - Doing node list sanity check"));
            for (let i = ((0) | 0); ((Number(i) < Number((block_list).length)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                let block = runtime.readIndex(block_list, i);
                let block$s = undefined, block$o = 0;
                if (ArrayBuffer.isView(block) || Array.isArray(block))
                    block$s = block;
                else if (block !== null && typeof block === 'object' && block.generatedPointer === true && block.path === undefined && block.target === undefined && (ArrayBuffer.isView(block.source) || Array.isArray(block.source))) {
                    block$s = block.source;
                    block$o = block.offset;
                }
                if ((((node_count) > (300)) ? 1 : 0)) {
                    (__L1 ? __L1("discrete_start() - Upper limit of %d nodes exceeded, have you terminated the interface block?\n", 300) : runtime.macro("fatalerror", "discrete_start() - Upper limit of %d nodes exceeded, have you terminated the interface block?\n", 300));
                }
                if ((((((Number(__deref_discrete_sanity_check(runtime, block).node) < Number(1073741824)) ? 1 : 0)) || (((Number(__deref_discrete_sanity_check(runtime, block).node) > Number(1073744224)) ? 1 : 0))) ? 1 : 0)) {
                    (__L1 ? __L1("discrete_start() - Invalid node number on node %02d descriptor\n", __deref_discrete_sanity_check(runtime, block).node) : runtime.macro("fatalerror", "discrete_start() - Invalid node number on node %02d descriptor\n", __deref_discrete_sanity_check(runtime, block).node));
                }
                if (((Number(__deref_discrete_sanity_check(runtime, block).type) > Number(8)) ? 1 : 0)) {
                    (__L1 ? __L1("discrete_start() - Invalid function type on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)) : runtime.macro("fatalerror", "discrete_start() - Invalid function type on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)));
                }
                if (((Number(method_NODE_CHILD_NODE_NUM(runtime, __deref_discrete_sanity_check(runtime, block).node)) > Number(0)) ? 1 : 0)) {
                    (__L1 ? __L1("discrete_start() - Child node number on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)) : runtime.macro("fatalerror", "discrete_start() - Child node number on NODE_%02d\n", method_NODE_INDEX(runtime, __deref_discrete_sanity_check(runtime, block).node)));
                }
                node_count = ((((node_count) + (1))) | 0);
            }
            (__L0 ? __L0("discrete_start() - Sanity check counted %d nodes", node_count) : runtime.macro("discrete_log", "discrete_start() - Sanity check counted %d nodes", node_count));
        }
        function __deref_discrete_sanity_check(runtime, p) {
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
        function method_NODE_CHILD_NODE_NUM(runtime, x) {
            const members = runtime.members;
            return ((x) & (7));
        }
        function method_read(runtime, offset) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["fatalerror"];
            let node = runtime.invoke("discrete_find_node", offset);
            let node$s = undefined, node$o = 0;
            if (ArrayBuffer.isView(node) || Array.isArray(node))
                node$s = node;
            else if (node !== null && typeof node === 'object' && node.generatedPointer === true && node.path === undefined && node.target === undefined && (ArrayBuffer.isView(node.source) || Array.isArray(node.source))) {
                node$s = node.source;
                node$o = node.offset;
            }
            let data = ((0) & 0xff);
            if (node) {
                runtime.invoke("update_to_current_time");
                data = ((((runtime.readIndex(__deref_read(runtime, node).m_output, method_NODE_CHILD_NODE_NUM(runtime, offset))) & 0xff)) & 0xff);
            }
            else {
                (__L0 ? __L0("discrete_sound_r read from non-existent NODE_%02d\n", ((offset) - (1073741824))) : runtime.macro("fatalerror", "discrete_sound_r read from non-existent NODE_%02d\n", ((offset) - (1073741824))));
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
            const __L0 = __l["discrete_log"];
            data = ((data) & 0xff);
            let node = runtime.invoke("discrete_find_node", offset);
            let node$s = undefined, node$o = 0;
            if (ArrayBuffer.isView(node) || Array.isArray(node))
                node$s = node;
            else if (node !== null && typeof node === 'object' && node.generatedPointer === true && node.path === undefined && node.target === undefined && (ArrayBuffer.isView(node.source) || Array.isArray(node.source))) {
                node$s = node.source;
                node$o = node.offset;
            }
            if (node) {
                let intf = 0;
                if ((__deref_write(runtime, node).interface__discrete_input_interface?.(({ generatedLValue: true, get: () => intf, set: (value) => { intf = value; } })) ?? 0)) {
                    (__deref_write(runtime, intf).input_write?.(0, data) ?? 0);
                }
                else {
                    (__L0 ? __L0("discrete_sound_w write to non-input NODE_%02d\n", ((offset) - (1073741824))) : runtime.macro("discrete_log", "discrete_sound_w write to non-input NODE_%02d\n", ((offset) - (1073741824))));
                }
            }
            else {
                (__L0 ? __L0("discrete_sound_w write to non-existent NODE_%02d\n", ((offset) - (1073741824))) : runtime.macro("discrete_log", "discrete_sound_w write to non-existent NODE_%02d\n", ((offset) - (1073741824))));
            }
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
        function method_discrete_task__task_callback(runtime, param, threadid) {
            const members = runtime.members;
            let __t0, __t1;
            let list = __deref_discrete_task__task_callback(runtime, param);
            while (1) {
                for (let __range0 = list, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                    const __range0_item = runtime.readIndex(__range0, __range0_index);
                    if ((__deref_discrete_task__task_callback(runtime, __range0_item).lock_threadid?.(threadid) ?? 0)) {
                        if ((((__t0 = __deref_discrete_task__task_callback(runtime, __range0_item), typeof __t0.process === 'function' ? (__t0.process() ?? 0) : runtime.container(__range0_item, "process"))) ? 0 : 1)) {
                            return 0;
                        }
                        (__t1 = __deref_discrete_task__task_callback(runtime, __range0_item), typeof __t1.unlock === 'function' ? (__t1.unlock() ?? 0) : runtime.container(__range0_item, "unlock"));
                    }
                }
            }
            return 0;
        }
        function __deref_discrete_task__task_callback(runtime, p) {
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
            "__construct": method___construct,
            "push": method_push,
            "pop": method_pop,
            "discrete_build_list": method_discrete_build_list,
            "NODE_INDEX": method_NODE_INDEX,
            "list_run_time": method_list_run_time,
            "step_list_run_time": method_step_list_run_time,
            "discrete_sanity_check": method_discrete_sanity_check,
            "NODE_CHILD_NODE_NUM": method_NODE_CHILD_NODE_NUM,
            "read": method_read,
            "write": method_write,
            "discrete_task::task_callback": method_discrete_task__task_callback
        };
        return __methodTable;
    })(),
};
definition.compiledStructMethods = {
    "output_buffer": (() => {
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
        function method___construct(runtime) {
            const members = runtime.members;
            members.source = 0;
            members.ptr = 0;
        }
        function method___construct_1(runtime, that) {
            const members = runtime.members;
            members.node_buf = that.node_buf;
            members.source = that.source;
            members.ptr = (__deref___construct_1(runtime, that.ptr).load?.(0) ?? 0);
            members.node_num = ((that.node_num) | 0);
        }
        function __deref___construct_1(runtime, p) {
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
        function method_NODE_INDEX(runtime, x) {
            const members = runtime.members;
            return runtime.shiftRight(((x) - (1073741824)), 3);
        }
        function method_sound_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            data = ((((data) & (1))) & 0xff);
            switch (((offset) & (7))) {
                case 0:
                case 1:
                case 2:
                    {
                        runtime.invoke("background_enable_w", offset, data);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("noise_enable_w", data);
                        break;
                    }
                case 4:
                    {
                        break;
                    }
                case 5:
                    {
                        runtime.invoke("fire_enable_w", data);
                        break;
                    }
                case 6:
                case 7:
                    {
                        runtime.invoke("vol_w", ((offset) & (1)), data);
                        break;
                    }
            }
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "__construct_1": method___construct_1,
            "NODE_INDEX": method_NODE_INDEX,
            "sound_w": method_sound_w
        };
        return __methodTable;
    })(),
    "double_stack": (() => {
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
        function method___construct(runtime) {
            const members = runtime.members;
            const h_stk = members.stk ?? 0;
            members.p = __addr___construct(runtime, h_stk, 0);
        }
        function __addr___construct(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function method_push(runtime, v) {
            const members = runtime.members;
            let __t0;
            runtime.pointerStore((__t0 = (members.p ?? 0), members.p = __add_push(runtime, members.p, 1), __t0), v);
        }
        function __add_push(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_pop(runtime) {
            const members = runtime.members;
            members.p = runtime.subtract(members.p, 1);
            return __deref_pop(runtime, (members.p ?? 0));
        }
        function __deref_pop(runtime, p) {
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
        function method_NODE_INDEX(runtime, x) {
            const members = runtime.members;
            return runtime.shiftRight(((x) - (1073741824)), 3);
        }
        function method_sound_w(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            data = ((((data) & (1))) & 0xff);
            switch (((offset) & (7))) {
                case 0:
                case 1:
                case 2:
                    {
                        runtime.invoke("background_enable_w", offset, data);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("noise_enable_w", data);
                        break;
                    }
                case 4:
                    {
                        break;
                    }
                case 5:
                    {
                        runtime.invoke("fire_enable_w", data);
                        break;
                    }
                case 6:
                case 7:
                    {
                        runtime.invoke("vol_w", ((offset) & (1)), data);
                        break;
                    }
            }
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "push": method_push,
            "pop": method_pop,
            "NODE_INDEX": method_NODE_INDEX,
            "sound_w": method_sound_w
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
