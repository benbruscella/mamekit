import deviceData from './avg_bzone.device.ir.json' with { type: 'json' };
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
    function method_done_r(runtime) {
        const members = runtime.members;
        return (((((members.m_sync_halt ?? 0)) ? (1) : (0))) | 0);
    }
    function method_vg_set_halt_callback(runtime, param) {
        const members = runtime.members;
        method_vg_set_halt(runtime, param);
    }
    function method_vg_set_halt(runtime, dummy) {
        const members = runtime.members;
        members.m_halt = ((dummy) & 0xff);
        members.m_sync_halt = ((dummy) & 0xff);
    }
    function method_run_state_machine(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_hz"];
        const h_m_prom = members.m_prom ?? 0;
        let cycles = ((0) | 0);
        while (((Number(cycles) < Number(10000)) ? 1 : 0)) {
            members.m_state_latch = (((((((members.m_state_latch ?? 0)) & (16))) | (((runtime.readIndex(h_m_prom, method_state_addr(runtime))) & (15))))) & 0xff);
            if (method_ST3(runtime)) {
                method_update_databus(runtime);
                switch ((((members.m_state_latch ?? 0)) & (7))) {
                    case 0:
                        {
                            cycles = ((((cycles) + (method_handler_0(runtime)))) | 0);
                            break;
                        }
                    case 1:
                        {
                            cycles = ((((cycles) + (method_handler_1(runtime)))) | 0);
                            break;
                        }
                    case 2:
                        {
                            cycles = ((((cycles) + (method_handler_2(runtime)))) | 0);
                            break;
                        }
                    case 3:
                        {
                            cycles = ((((cycles) + (method_handler_3(runtime)))) | 0);
                            break;
                        }
                    case 4:
                        {
                            cycles = ((((cycles) + (method_handler_4(runtime)))) | 0);
                            break;
                        }
                    case 5:
                        {
                            cycles = ((((cycles) + (method_handler_5(runtime)))) | 0);
                            break;
                        }
                    case 6:
                        {
                            cycles = ((((cycles) + (method_handler_6(runtime)))) | 0);
                            break;
                        }
                    case 7:
                        {
                            cycles = ((((cycles) + (method_handler_7(runtime)))) | 0);
                            break;
                        }
                }
            }
            if (((((members.m_halt ?? 0)) && ((((((members.m_state_latch ?? 0)) & (16))) ? 0 : 1))) ? 1 : 0)) {
                (__deref_run_state_machine(runtime, members.m_vg_halt_timer).adjust?.((((__L0 ? __L0(12096000) : runtime.macro("attotime::from_hz", 12096000))) * (cycles)), 1) ?? 0);
            }
            members.m_state_latch = (((((((members.m_halt ?? 0)) << (4))) | ((((members.m_state_latch ?? 0)) & (15))))) & 0xff);
            cycles = ((((cycles) + (8))) | 0);
        }
        (__deref_run_state_machine(runtime, members.m_vg_run_timer).adjust?.((((__L0 ? __L0(12096000) : runtime.macro("attotime::from_hz", 12096000))) * (cycles))) ?? 0);
    }
    function __deref_run_state_machine(runtime, p) {
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
    function method_state_addr(runtime) {
        const members = runtime.members;
        return (((((((((((((members.m_state_latch ?? 0)) >>> (4))) ^ (1))) << (7))) | ((((members.m_op ?? 0)) << (4))))) | ((((members.m_state_latch ?? 0)) & (15))))) & 0xff);
    }
    function method_ST3(runtime) {
        const members = runtime.members;
        return ((((((members.m_state_latch ?? 0)) >>> (3)) & 1)) & 0xff);
    }
    function method_update_databus(runtime) {
        const members = runtime.members;
        members.m_data = (((__deref_update_databus(runtime, members.m_memspace).read_byte?.((((members.m_membase ?? 0)) + ((((members.m_pc ?? 0)) ^ (1))))) ?? 0)) & 0xffff);
    }
    function __deref_update_databus(runtime, p) {
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
    function method_handler_0(runtime) {
        const members = runtime.members;
        members.m_dvy = (((((((members.m_dvy ?? 0)) & (7936))) | ((members.m_data ?? 0)))) & 0xffff);
        members.m_pc = ((((members.m_pc) + (1))) & 0xffff);
        return ((0) | 0);
    }
    function method_handler_1(runtime) {
        const members = runtime.members;
        if ((((members.m_hst ?? 0)) ? 0 : 1)) {
            members.m_clipx_max = (((members.m_xpos ?? 0)) | 0);
            members.m_clipy_min = (((members.m_ypos ?? 0)) | 0);
        }
        if ((((members.m_lst ?? 0)) ? 0 : 1)) {
            members.m_clipx_min = (((members.m_xpos ?? 0)) | 0);
            members.m_clipy_max = (((members.m_ypos ?? 0)) | 0);
        }
        if (((((((members.m_lst ?? 0)) ? 0 : 1)) || ((((members.m_hst ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            method_vg_add_clip(runtime, (members.m_clipx_min ?? 0), (members.m_clipy_min ?? 0), (members.m_clipx_max ?? 0), (members.m_clipy_max ?? 0));
        }
        members.m_lst = (((members.m_hst = ((1) & 0xffff))) & 0xffff);
        return ((method_avg_device__handler_1(runtime)) | 0);
    }
    function method_vg_add_clip(runtime, xmin, ymin, xmax, ymax) {
        const members = runtime.members;
        const h_m_vectbuf = members.m_vectbuf ?? 0;
        if (((Number((members.m_nvect ?? 0)) < Number(10000)) ? 1 : 0)) {
            h_m_vectbuf[(members.m_nvect ?? 0)].status = ((1) | 0);
            h_m_vectbuf[(members.m_nvect ?? 0)].x = ((xmin) | 0);
            h_m_vectbuf[(members.m_nvect ?? 0)].y = ((ymin) | 0);
            h_m_vectbuf[(members.m_nvect ?? 0)].arg1 = ((xmax) | 0);
            h_m_vectbuf[(members.m_nvect ?? 0)].arg2 = ((ymax) | 0);
            members.m_nvect = ((((members.m_nvect) + (1))) | 0);
        }
    }
    function method_avg_device__handler_1(runtime) {
        const members = runtime.members;
        members.m_dvy12 = (((((((members.m_data ?? 0)) >>> (4))) & (1))) & 0xff);
        members.m_op = (((((members.m_data ?? 0)) >>> (5))) & 0xff);
        members.m_int_latch = ((0) & 0xff);
        members.m_dvy = (((((((members.m_dvy12 ?? 0)) << (12))) | ((((((members.m_data ?? 0)) & (15))) << (8))))) & 0xffff);
        members.m_dvx = ((0) & 0xffff);
        members.m_pc = ((((members.m_pc) + (1))) & 0xffff);
        return ((0) | 0);
    }
    function method_handler_2(runtime) {
        const members = runtime.members;
        members.m_dvx = (((((((members.m_dvx ?? 0)) & (7936))) | ((members.m_data ?? 0)))) & 0xffff);
        members.m_pc = ((((members.m_pc) + (1))) & 0xffff);
        return ((0) | 0);
    }
    function method_handler_3(runtime) {
        const members = runtime.members;
        members.m_int_latch = (((((members.m_data ?? 0)) >>> (4))) & 0xff);
        members.m_dvx = (((((((((((members.m_int_latch ?? 0)) & (1))) << (12))) | ((((((members.m_data ?? 0)) & (15))) << (8))))) | ((((members.m_dvx ?? 0)) & (255))))) & 0xffff);
        members.m_pc = ((((members.m_pc) + (1))) & 0xffff);
        return ((0) | 0);
    }
    function method_handler_4(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_stack = members.m_stack ?? 0;
        if (method_OP0(runtime)) {
            h_m_stack[(((members.m_sp ?? 0)) & (3))] = (members.m_pc ?? 0);
        }
        else {
            let i = ((0) | 0);
            while (((((((((Number((((((members.m_dvy ?? 0)) ^ ((((members.m_dvy ?? 0)) << (1))))) & (4096))) === Number(0)) ? 1 : 0)) && (((Number((((((members.m_dvx ?? 0)) ^ ((((members.m_dvx ?? 0)) << (1))))) & (4096))) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number((__t0 = i, i = ((((i) + (1))) | 0), __t0)) < Number(16)) ? 1 : 0))) ? 1 : 0)) {
                members.m_dvy = (((((((members.m_dvy ?? 0)) & (4096))) | ((((((members.m_dvy ?? 0)) << (1))) & (8191))))) & 0xffff);
                members.m_dvx = (((((((members.m_dvx ?? 0)) & (4096))) | ((((((members.m_dvx ?? 0)) << (1))) & (8191))))) & 0xffff);
                members.m_timer = ((((members.m_timer) >>> (1))) & 0xffff);
                members.m_timer = ((((members.m_timer) | (((16384) | (((method_OP1(runtime)) << (7))))))) & 0xffff);
            }
            if (method_OP1(runtime)) {
                members.m_timer = ((((members.m_timer) & (255))) & 0xffff);
            }
        }
        return ((0) | 0);
    }
    function method_OP0(runtime) {
        const members = runtime.members;
        return ((((((members.m_op ?? 0)) >>> (0)) & 1)) & 0xff);
    }
    function method_OP1(runtime) {
        const members = runtime.members;
        return ((((((members.m_op ?? 0)) >>> (1)) & 1)) & 0xff);
    }
    function method_handler_5(runtime) {
        const members = runtime.members;
        if (((method_OP2(runtime)) ? 0 : 1)) {
            for (let i = (((members.m_bin_scale ?? 0)) | 0); (((i) > (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                members.m_timer = ((((members.m_timer) >>> (1))) & 0xffff);
                members.m_timer = ((((members.m_timer) | (((16384) | (((method_OP1(runtime)) << (7))))))) & 0xffff);
            }
            if (method_OP1(runtime)) {
                members.m_timer = ((((members.m_timer) & (255))) & 0xffff);
            }
        }
        return ((method_avg_common_strobe1(runtime)) | 0);
    }
    function method_OP2(runtime) {
        const members = runtime.members;
        return ((((((members.m_op ?? 0)) >>> (2)) & 1)) & 0xff);
    }
    function method_avg_common_strobe1(runtime) {
        const members = runtime.members;
        if (method_OP2(runtime)) {
            if (method_OP1(runtime)) {
                members.m_sp = (((((((members.m_sp ?? 0)) - (1))) & (15))) & 0xff);
            }
            else {
                members.m_sp = (((((((members.m_sp ?? 0)) + (1))) & (15))) & 0xff);
            }
        }
        return ((0) | 0);
    }
    function method_handler_6(runtime) {
        const members = runtime.members;
        if ((((((method_OP2(runtime)) ? 0 : 1)) && ((((members.m_dvy12 ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_intensity = (((((((members.m_dvy ?? 0)) >>> (4))) & (15))) & 0xff);
            if ((((((members.m_dvy ?? 0)) & (1024))) ? 0 : 1)) {
                members.m_lst = (((((members.m_dvy ?? 0)) & (512))) & 0xffff);
                members.m_hst = (((((members.m_lst ?? 0)) ^ (512))) & 0xffff);
                members.m_izblank = (((((members.m_dvy ?? 0)) & (256))) & 0xffff);
            }
        }
        return ((method_avg_common_strobe2(runtime)) | 0);
    }
    function method_avg_common_strobe2(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_vector.clear_list"];
        const h_m_stack = members.m_stack ?? 0;
        if (method_OP2(runtime)) {
            if (method_OP0(runtime)) {
                members.m_pc = (((((members.m_dvy ?? 0)) << (1))) & 0xffff);
                if (((((members.m_dvy ?? 0)) === (0)) ? 1 : 0)) {
                    (__L0 ? __L0() : ((members.m_vector)?.clear_list?.() ?? 0));
                    method_vg_flush(runtime);
                }
            }
            else {
                members.m_pc = ((h_m_stack[(((members.m_sp ?? 0)) & (3))]) & 0xffff);
            }
        }
        else {
            if ((members.m_dvy12 ?? 0)) {
                members.m_scale = (((((members.m_dvy ?? 0)) & (255))) & 0xff);
                members.m_bin_scale = (((((((members.m_dvy ?? 0)) >>> (8))) & (7))) & 0xff);
            }
        }
        return ((0) | 0);
    }
    function method_vg_flush(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_vector.add_point"];
        let __t0, __t1, __t2, __t3;
        const h_m_vectbuf = members.m_vectbuf ?? 0;
        let cx0 = ((0) | 0);
        let cy0 = ((0) | 0);
        let cx1 = ((83886080) | 0);
        let cy1 = ((83886080) | 0);
        let i = ((0) | 0);
        while (((Number(h_m_vectbuf[i].status) === Number(1)) ? 1 : 0)) {
            i = ((((i) + (1))) | 0);
        }
        let xs = ((h_m_vectbuf[i].x) | 0);
        let ys = ((h_m_vectbuf[i].y) | 0);
        for (i = ((0) | 0); (((i) < ((members.m_nvect ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((Number(h_m_vectbuf[i].status) === Number(0)) ? 1 : 0)) {
                let xe = ((h_m_vectbuf[i].x) | 0);
                let ye = ((h_m_vectbuf[i].y) | 0);
                let x0 = ((xs) | 0);
                let y0 = ((ys) | 0);
                let x1 = ((xe) | 0);
                let y1 = ((ye) | 0);
                xs = ((xe) | 0);
                ys = ((ye) | 0);
                if ((((((((((x0) < (cx0)) ? 1 : 0)) && ((((x1) < (cx0)) ? 1 : 0))) ? 1 : 0)) || (((((((x0) > (cx1)) ? 1 : 0)) && ((((x1) > (cx1)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                    continue;
                }
                if ((((x0) < (cx0)) ? 1 : 0)) {
                    y0 = ((((y0) + (runtime.wide("/", runtime.wide("*", ((cx0) - (x0)), ((y1) - (y0))), ((x1) - (x0)))))) | 0);
                    x0 = ((cx0) | 0);
                }
                else {
                    if ((((x0) > (cx1)) ? 1 : 0)) {
                        y0 = ((((y0) + (runtime.wide("/", runtime.wide("*", ((cx1) - (x0)), ((y1) - (y0))), ((x1) - (x0)))))) | 0);
                        x0 = ((cx1) | 0);
                    }
                }
                if ((((x1) < (cx0)) ? 1 : 0)) {
                    y1 = ((((y1) + (runtime.wide("/", runtime.wide("*", ((cx0) - (x1)), ((y1) - (y0))), ((x1) - (x0)))))) | 0);
                    x1 = ((cx0) | 0);
                }
                else {
                    if ((((x1) > (cx1)) ? 1 : 0)) {
                        y1 = ((((y1) + (runtime.wide("/", runtime.wide("*", ((cx1) - (x1)), ((y1) - (y0))), ((x1) - (x0)))))) | 0);
                        x1 = ((cx1) | 0);
                    }
                }
                if ((((((((((y0) < (cy0)) ? 1 : 0)) && ((((y1) < (cy0)) ? 1 : 0))) ? 1 : 0)) || (((((((y0) > (cy1)) ? 1 : 0)) && ((((y1) > (cy1)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                    continue;
                }
                if ((((y0) < (cy0)) ? 1 : 0)) {
                    x0 = ((((x0) + (runtime.wide("/", runtime.wide("*", ((cy0) - (y0)), ((x1) - (x0))), ((y1) - (y0)))))) | 0);
                    y0 = ((cy0) | 0);
                }
                else {
                    if ((((y0) > (cy1)) ? 1 : 0)) {
                        x0 = ((((x0) + (runtime.wide("/", runtime.wide("*", ((cy1) - (y0)), ((x1) - (x0))), ((y1) - (y0)))))) | 0);
                        y0 = ((cy1) | 0);
                    }
                }
                if ((((y1) < (cy0)) ? 1 : 0)) {
                    x1 = ((((x1) + (runtime.wide("/", runtime.wide("*", ((cy0) - (y1)), ((x1) - (x0))), ((y1) - (y0)))))) | 0);
                    y1 = ((cy0) | 0);
                }
                else {
                    if ((((y1) > (cy1)) ? 1 : 0)) {
                        x1 = ((((x1) + (runtime.wide("/", runtime.wide("*", ((cy1) - (y1)), ((x1) - (x0))), ((y1) - (y0)))))) | 0);
                        y1 = ((cy1) | 0);
                    }
                }
                (__L0 ? __L0(x0, y0, h_m_vectbuf[i].color, 0) : ((members.m_vector)?.add_point?.(x0, y0, h_m_vectbuf[i].color, 0) ?? 0));
                (__L0 ? __L0(x1, y1, h_m_vectbuf[i].color, h_m_vectbuf[i].intensity) : ((members.m_vector)?.add_point?.(x1, y1, h_m_vectbuf[i].color, h_m_vectbuf[i].intensity) ?? 0));
            }
            if (((Number(h_m_vectbuf[i].status) === Number(1)) ? 1 : 0)) {
                cx0 = ((h_m_vectbuf[i].x) | 0);
                cy0 = ((h_m_vectbuf[i].y) | 0);
                cx1 = ((h_m_vectbuf[i].arg1) | 0);
                cy1 = ((h_m_vectbuf[i].arg2) | 0);
                if ((((cx0) > (cx1)) ? 1 : 0)) {
                    (__t0 = cx0, __t1 = cx1, (runtime.swapObjects(__t0, __t1) ? 0 : (cx0 = ((__t1) | 0), cx1 = ((__t0) | 0), 0)));
                }
                if ((((cy0) > (cy1)) ? 1 : 0)) {
                    (__t2 = cy0, __t3 = cy1, (runtime.swapObjects(__t2, __t3) ? 0 : (cy0 = ((__t3) | 0), cy1 = ((__t2) | 0), 0)));
                }
            }
        }
        members.m_nvect = ((0) | 0);
    }
    function method_handler_7(runtime) {
        const members = runtime.members;
        let cycles = ((method_avg_common_strobe3(runtime)) | 0);
        if ((((((method_OP0(runtime)) ? 0 : 1)) && (((method_OP2(runtime)) ? 0 : 1))) ? 1 : 0)) {
            method_vg_add_point_buf(runtime, (members.m_xpos ?? 0), (members.m_ypos ?? 0), method_vector_device__color111(runtime, 7), ((((((Number((((members.m_int_latch ?? 0)) >>> (1))) === Number(1)) ? 1 : 0)) ? ((members.m_intensity ?? 0)) : ((((members.m_int_latch ?? 0)) & (14))))) << (4)));
        }
        return ((cycles) | 0);
    }
    function method_avg_common_strobe3(runtime) {
        const members = runtime.members;
        let cycles = ((0) | 0);
        members.m_halt = ((method_OP0(runtime)) & 0xff);
        if ((((((method_OP0(runtime)) ? 0 : 1)) && (((method_OP2(runtime)) ? 0 : 1))) ? 1 : 0)) {
            if (method_OP1(runtime)) {
                cycles = ((((256) - ((((members.m_timer ?? 0)) & (255))))) | 0);
            }
            else {
                cycles = ((((32768) - ((members.m_timer ?? 0)))) | 0);
            }
            members.m_timer = ((0) & 0xffff);
            members.m_xpos = ((((members.m_xpos) + (runtime.shiftRight((((((((((((members.m_dvx ?? 0)) >>> (3))) ^ ((members.m_xdac_xor ?? 0)))) - (512))) * (cycles))) * ((((members.m_scale ?? 0)) ^ (255)))), 4)))) | 0);
            members.m_ypos = ((((members.m_ypos) - (runtime.shiftRight((((((((((((members.m_dvy ?? 0)) >>> (3))) ^ ((members.m_ydac_xor ?? 0)))) - (512))) * (cycles))) * ((((members.m_scale ?? 0)) ^ (255)))), 4)))) | 0);
        }
        if (method_OP2(runtime)) {
            cycles = ((((32768) - ((members.m_timer ?? 0)))) | 0);
            members.m_timer = ((0) & 0xffff);
            members.m_xpos = (((members.m_xcenter ?? 0)) | 0);
            members.m_ypos = (((members.m_ycenter ?? 0)) | 0);
            method_vg_add_point_buf(runtime, (members.m_xpos ?? 0), (members.m_ypos ?? 0), 0, 0);
        }
        return ((cycles) | 0);
    }
    function method_vg_add_point_buf(runtime, x, y, color, intensity) {
        const members = runtime.members;
        const h_m_vectbuf = members.m_vectbuf ?? 0;
        if (((Number((members.m_nvect ?? 0)) < Number(10000)) ? 1 : 0)) {
            h_m_vectbuf[(members.m_nvect ?? 0)].status = ((0) | 0);
            h_m_vectbuf[(members.m_nvect ?? 0)].x = ((x) | 0);
            h_m_vectbuf[(members.m_nvect ?? 0)].y = ((y) | 0);
            h_m_vectbuf[(members.m_nvect ?? 0)].color = color;
            h_m_vectbuf[(members.m_nvect ?? 0)].intensity = ((intensity) | 0);
            members.m_nvect = ((((members.m_nvect) + (1))) | 0);
        }
    }
    function method_vector_device__color111(runtime, c) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rgb_t"];
        return (__L0 ? __L0(method_pal1bit(runtime, runtime.shiftRight(c, 2)), method_pal1bit(runtime, runtime.shiftRight(c, 1)), method_pal1bit(runtime, runtime.shiftRight(c, 0))) : runtime.macro("rgb_t", method_pal1bit(runtime, runtime.shiftRight(c, 2)), method_pal1bit(runtime, runtime.shiftRight(c, 1)), method_pal1bit(runtime, runtime.shiftRight(c, 0))));
    }
    function method_pal1bit(runtime, bits) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
        return ((method_palexpand_1(runtime, bits)) & 0xff);
    }
    function method_palexpand_1(runtime, bits) {
        const members = runtime.members;
        bits = ((bits) & 0xff);
        if (1) {
            return ((((((bits) & (1))) ? (255) : (0))) & 0xff);
        }
        return ((bits) & 0xff);
    }
    function method_set_vector(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_vector.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_vector)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_set_flip_x(runtime, flip) {
        const members = runtime.members;
        members.m_flip_x = ((flip) ? 1 : 0);
    }
    function method_set_flip_y(runtime, flip) {
        const members = runtime.members;
        members.m_flip_y = ((flip) ? 1 : 0);
    }
    function method_OP3(runtime) {
        const members = runtime.members;
        return ((((((members.m_op ?? 0)) >>> (3)) & 1)) & 0xff);
    }
    function method_avgdvg_device_base__set_vector(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_vector.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_vector)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_avgdvg_device_base__set_flip_x(runtime, flip) {
        const members = runtime.members;
        members.m_flip_x = ((flip) ? 1 : 0);
    }
    function method_avgdvg_device_base__set_flip_y(runtime, flip) {
        const members = runtime.members;
        members.m_flip_y = ((flip) ? 1 : 0);
    }
    function method_avgdvg_device_base__OP0(runtime) {
        const members = runtime.members;
        return ((((((members.m_op ?? 0)) >>> (0)) & 1)) & 0xff);
    }
    function method_avgdvg_device_base__OP1(runtime) {
        const members = runtime.members;
        return ((((((members.m_op ?? 0)) >>> (1)) & 1)) & 0xff);
    }
    function method_avgdvg_device_base__OP2(runtime) {
        const members = runtime.members;
        return ((((((members.m_op ?? 0)) >>> (2)) & 1)) & 0xff);
    }
    function method_avgdvg_device_base__OP3(runtime) {
        const members = runtime.members;
        return ((((((members.m_op ?? 0)) >>> (3)) & 1)) & 0xff);
    }
    function method_avgdvg_device_base__ST3(runtime) {
        const members = runtime.members;
        return ((((((members.m_state_latch ?? 0)) >>> (3)) & 1)) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "done_r": method_done_r,
        "vg_set_halt_callback": method_vg_set_halt_callback,
        "vg_set_halt": method_vg_set_halt,
        "run_state_machine": method_run_state_machine,
        "state_addr": method_state_addr,
        "ST3": method_ST3,
        "update_databus": method_update_databus,
        "handler_0": method_handler_0,
        "handler_1": method_handler_1,
        "vg_add_clip": method_vg_add_clip,
        "avg_device::handler_1": method_avg_device__handler_1,
        "handler_2": method_handler_2,
        "handler_3": method_handler_3,
        "handler_4": method_handler_4,
        "OP0": method_OP0,
        "OP1": method_OP1,
        "handler_5": method_handler_5,
        "OP2": method_OP2,
        "avg_common_strobe1": method_avg_common_strobe1,
        "handler_6": method_handler_6,
        "avg_common_strobe2": method_avg_common_strobe2,
        "vg_flush": method_vg_flush,
        "handler_7": method_handler_7,
        "avg_common_strobe3": method_avg_common_strobe3,
        "vg_add_point_buf": method_vg_add_point_buf,
        "vector_device::color111": method_vector_device__color111,
        "pal1bit": method_pal1bit,
        "palexpand_1": method_palexpand_1,
        "set_vector": method_set_vector,
        "set_flip_x": method_set_flip_x,
        "set_flip_y": method_set_flip_y,
        "OP3": method_OP3,
        "avgdvg_device_base::set_vector": method_avgdvg_device_base__set_vector,
        "avgdvg_device_base::set_flip_x": method_avgdvg_device_base__set_flip_x,
        "avgdvg_device_base::set_flip_y": method_avgdvg_device_base__set_flip_y,
        "avgdvg_device_base::OP0": method_avgdvg_device_base__OP0,
        "avgdvg_device_base::OP1": method_avgdvg_device_base__OP1,
        "avgdvg_device_base::OP2": method_avgdvg_device_base__OP2,
        "avgdvg_device_base::OP3": method_avgdvg_device_base__OP3,
        "avgdvg_device_base::ST3": method_avgdvg_device_base__ST3
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["attotime::from_hz", "m_vector.add_point", "m_vector.clear_list", "m_vector.set_tag", "rgb_t", "std::forward"];
definition.compiledStructMethods = {
    "point": (() => {
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
            members.x = ((0) | 0);
            members.y = ((0) | 0);
            members.col = 0;
            members.intensity = ((0) | 0);
        }
        function method_vg_set_halt_callback(runtime, param) {
            const members = runtime.members;
            runtime.invoke("vg_set_halt", param);
        }
        function method_vector_device__color111(runtime, c) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["rgb_t"];
            return (__L0 ? __L0(method_pal1bit(runtime, runtime.shiftRight(c, 2)), method_pal1bit(runtime, runtime.shiftRight(c, 1)), method_pal1bit(runtime, runtime.shiftRight(c, 0))) : runtime.macro("rgb_t", method_pal1bit(runtime, runtime.shiftRight(c, 2)), method_pal1bit(runtime, runtime.shiftRight(c, 1)), method_pal1bit(runtime, runtime.shiftRight(c, 0))));
        }
        function method_pal1bit(runtime, bits) {
            const members = runtime.members;
            bits = ((bits) & 0xff);
            return ((method_palexpand_1(runtime, bits)) & 0xff);
        }
        function method_palexpand_1(runtime, bits) {
            const members = runtime.members;
            bits = ((bits) & 0xff);
            if (1) {
                return ((((((bits) & (1))) ? (255) : (0))) & 0xff);
            }
            return ((bits) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "vg_set_halt_callback": method_vg_set_halt_callback,
            "vector_device::color111": method_vector_device__color111,
            "pal1bit": method_pal1bit,
            "palexpand_1": method_palexpand_1
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
