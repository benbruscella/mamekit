import deviceData from './upd4990a.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function method_set_use_utc(runtime, use_utc) {
        const members = runtime.members;
        members.m_use_utc = ((use_utc) ? 1 : 0);
    }
    function method_has_battery(runtime) {
        const members = runtime.members;
        return method_rtc_battery_backed(runtime);
    }
    function method_rtc_battery_backed(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_rtc_feature_y2k(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_rtc_feature_leap_year(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_convert_to_bcd(runtime, val) {
        const members = runtime.members;
        return ((((((runtime.divide(val, 10)) << (4))) | (((val) % (10))))) & 0xff);
    }
    function method_bcd_to_integer(runtime, val) {
        const members = runtime.members;
        val = ((val) & 0xff);
        return ((__add_bcd_to_integer(runtime, ((runtime.shiftRight(((val) & (240)), 4)) * (10)), ((val) & (15)))) | 0);
    }
    function __add_bcd_to_integer(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_get_clock_register(runtime, reg) {
        const members = runtime.members;
        const h_m_register = members.m_register ?? 0;
        return ((h_m_register[reg]) | 0);
    }
    function method_device_rtc_interface__set_use_utc(runtime, use_utc) {
        const members = runtime.members;
        members.m_use_utc = ((use_utc) ? 1 : 0);
    }
    function method_device_rtc_interface__has_battery(runtime) {
        const members = runtime.members;
        return method_rtc_battery_backed(runtime);
    }
    function method_device_rtc_interface__rtc_feature_y2k(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_rtc_interface__rtc_feature_leap_year(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_rtc_interface__rtc_battery_backed(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_is_serial_mode(runtime) {
        const members = runtime.members;
        return (((1) && (((((members.m_c_unlatched ?? 0)) === (7)) ? 1 : 0))) ? 1 : 0);
    }
    function method_stb_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["attotime::from_hz"], __L2 = __l["m_write_data"], __L3 = __l["attotime::from_ticks"], __L4 = __l["m_write_tp"];
        let __t0;
        const h_m_shift_reg = members.m_shift_reg ?? 0;
        const h_m_time_counter = members.m_time_counter ?? 0;
        if ((((members.m_cs ?? 0)) ? 0 : 1)) {
            return;
        }
        0;
        if (((((((members.m_stb ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) {
            if (method_is_serial_mode(runtime)) {
                members.m_c = ((h_m_shift_reg[6]) | 0);
            }
            else {
                members.m_c = (((members.m_c_unlatched ?? 0)) | 0);
                if (((((members.m_c ?? 0)) === (7)) ? 1 : 0)) {
                    members.m_c = ((15) | 0);
                }
            }
            0;
            if ((((((Number((members.m_c ?? 0)) === Number(0)) ? 1 : 0)) || ((((((Number((members.m_c ?? 0)) >= Number(4)) ? 1 : 0)) && (((Number((members.m_c ?? 0)) < Number(15)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                (__deref_stb_w(runtime, members.m_timer_clock).enable?.(1) ?? 0);
                members.m_testmode = ((0) ? 1 : 0);
                (__deref_stb_w(runtime, members.m_timer_test_mode).enable?.(0) ?? 0);
            }
            switch ((members.m_c ?? 0)) {
                case 0:
                    {
                        (__deref_stb_w(runtime, members.m_timer_data_out).adjust?.(0, 0, (__L1 ? __L1((((((__L0 ? __L0() : runtime.macro("clock"))) / (32768))) * (2))) : runtime.macro("attotime::from_hz", (((((__L0 ? __L0() : runtime.macro("clock"))) / (32768))) * (2))))) ?? 0);
                        (__deref_stb_w(runtime, members.m_timer_tp).adjust?.(0, 0, (__L1 ? __L1((((((__L0 ? __L0() : runtime.macro("clock"))) / (512))) * (2))) : runtime.macro("attotime::from_hz", (((((__L0 ? __L0() : runtime.macro("clock"))) / (512))) * (2))))) ?? 0);
                        break;
                    }
                case 1:
                    {
                        if ((((members.m_testmode ?? 0)) ? 0 : 1)) {
                            (__deref_stb_w(runtime, members.m_timer_clock).enable?.(1) ?? 0);
                        }
                        (__deref_stb_w(runtime, members.m_timer_data_out).enable?.(0) ?? 0);
                        members.m_data_out = ((((h_m_shift_reg[0]) & (1))) | 0);
                        (__L2 ? __L2(Number(method_get_data_out(runtime))) : typeof members.m_write_data === 'function' ? members.m_write_data(method_get_data_out(runtime)) : runtime.invoke("m_write_data", method_get_data_out(runtime)));
                        if ((members.m_testmode ?? 0)) {
                            (__deref_stb_w(runtime, members.m_timer_tp).adjust?.(0, 0, (__L1 ? __L1((((((__L0 ? __L0() : runtime.macro("clock"))) / (1024))) * (2))) : runtime.macro("attotime::from_hz", (((((__L0 ? __L0() : runtime.macro("clock"))) / (1024))) * (2))))) ?? 0);
                        }
                        break;
                    }
                case 2:
                    {
                        (__deref_stb_w(runtime, members.m_timer_clock).enable?.(0) ?? 0);
                        (__deref_stb_w(runtime, members.m_timer_data_out).enable?.(0) ?? 0);
                        members.m_data_out = ((((h_m_shift_reg[0]) & (1))) | 0);
                        (__L2 ? __L2(Number(method_get_data_out(runtime))) : typeof members.m_write_data === 'function' ? members.m_write_data(method_get_data_out(runtime)) : runtime.invoke("m_write_data", method_get_data_out(runtime)));
                        let max_shift = ((((method_is_serial_mode(runtime)) ? (6) : (5))) | 0);
                        for (let i = ((0) | 0); (((i) < (max_shift)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            h_m_time_counter[i] = h_m_shift_reg[i];
                        }
                        method_set_time(runtime, 0, method_bcd_to_integer(runtime, h_m_time_counter[5]), ((h_m_time_counter[4]) >>> (4)), method_bcd_to_integer(runtime, h_m_time_counter[3]), __add_stb_w(runtime, ((h_m_time_counter[4]) & (15)), 1), method_bcd_to_integer(runtime, h_m_time_counter[2]), method_bcd_to_integer(runtime, h_m_time_counter[1]), method_bcd_to_integer(runtime, h_m_time_counter[0]));
                        (__deref_stb_w(runtime, members.m_timer_clock).adjust?.((__L3 ? __L3((((typeof (__t0 = __deref_stb_w(runtime, members.m_timer_clock), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_timer_clock, "remaining")) === 'number' ? runtime.attotime((__t0 = __deref_stb_w(runtime, members.m_timer_clock), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_timer_clock, "remaining")), "as_ticks", (__L0 ? __L0() : runtime.macro("clock"))) : (__deref_stb_w(runtime, (__t0 = __deref_stb_w(runtime, members.m_timer_clock), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_timer_clock, "remaining"))).as_ticks?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0))) % (runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 512))), (__L0 ? __L0() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", (((typeof (__t0 = __deref_stb_w(runtime, members.m_timer_clock), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_timer_clock, "remaining")) === 'number' ? runtime.attotime((__t0 = __deref_stb_w(runtime, members.m_timer_clock), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_timer_clock, "remaining")), "as_ticks", (__L0 ? __L0() : runtime.macro("clock"))) : (__deref_stb_w(runtime, (__t0 = __deref_stb_w(runtime, members.m_timer_clock), typeof __t0.remaining === 'function' ? __t0.remaining() : typeof __t0.remaining === 'number' || typeof __t0.remaining === 'boolean' ? __t0.remaining : runtime.container(members.m_timer_clock, "remaining"))).as_ticks?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0))) % (runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 512))), (__L0 ? __L0() : runtime.macro("clock")))), 0, (__L1 ? __L1((((__L0 ? __L0() : runtime.macro("clock"))) / (32768))) : runtime.macro("attotime::from_hz", (((__L0 ? __L0() : runtime.macro("clock"))) / (32768))))) ?? 0);
                        if ((members.m_testmode ?? 0)) {
                            (__deref_stb_w(runtime, members.m_timer_tp).enable?.(0) ?? 0);
                            members.m_tp = ((0) | 0);
                            (__L4 ? __L4(Number((members.m_tp ?? 0))) : typeof members.m_write_tp === 'function' ? members.m_write_tp((members.m_tp ?? 0)) : runtime.invoke("m_write_tp", (members.m_tp ?? 0)));
                        }
                        break;
                    }
                case 3:
                    {
                        if ((((members.m_testmode ?? 0)) ? 0 : 1)) {
                            (__deref_stb_w(runtime, members.m_timer_clock).enable?.(1) ?? 0);
                        }
                        let max_shift__1 = ((((method_is_serial_mode(runtime)) ? (6) : (5))) | 0);
                        for (let i = ((0) | 0); (((i) < (max_shift__1)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            h_m_shift_reg[i] = h_m_time_counter[i];
                        }
                        let div = 0;
                        if (1) {
                            div = 32768;
                        }
                        else {
                            if ((members.m_testmode ?? 0)) {
                                div = 64;
                            }
                            else {
                                div = 65536;
                            }
                        }
                        (__deref_stb_w(runtime, members.m_timer_data_out).adjust?.(0, 0, (__L1 ? __L1((((((__L0 ? __L0() : runtime.macro("clock"))) / (div))) * (2))) : runtime.macro("attotime::from_hz", (((((__L0 ? __L0() : runtime.macro("clock"))) / (div))) * (2))))) ?? 0);
                        if ((members.m_testmode ?? 0)) {
                            (__deref_stb_w(runtime, members.m_timer_tp).adjust?.(0, 0, (__L1 ? __L1((((((__L0 ? __L0() : runtime.macro("clock"))) / (1024))) * (2))) : runtime.macro("attotime::from_hz", (((((__L0 ? __L0() : runtime.macro("clock"))) / (1024))) * (2))))) ?? 0);
                        }
                        break;
                    }
                case 4:
                case 5:
                case 6:
                case 7:
                    {
                        let div__1 = new Float64Array([512, 128, 16, 8]);
                        (__deref_stb_w(runtime, members.m_timer_tp).adjust?.(0, 0, (__L1 ? __L1((((((__L0 ? __L0() : runtime.macro("clock"))) / ((div__1[(((members.m_c ?? 0)) - (4))] ?? 0)))) * (2))) : runtime.macro("attotime::from_hz", (((((__L0 ? __L0() : runtime.macro("clock"))) / ((div__1[(((members.m_c ?? 0)) - (4))] ?? 0)))) * (2))))) ?? 0);
                        break;
                    }
                case 8:
                case 9:
                case 10:
                case 11:
                    {
                        let one_second = (__L1 ? __L1((((__L0 ? __L0() : runtime.macro("clock"))) / (32768))) : runtime.macro("attotime::from_hz", (((__L0 ? __L0() : runtime.macro("clock"))) / (32768))));
                        let mul = new Float64Array([1, 10, 30, 60]);
                        (__deref_stb_w(runtime, members.m_timer_tp).adjust?.(0, 0, ((((one_second) * ((mul[(((members.m_c ?? 0)) - (8))] ?? 0)))) / (2))) ?? 0);
                        break;
                    }
                case 12:
                case 13:
                case 14:
                    {
                        break;
                    }
                case 15:
                    {
                        (__deref_stb_w(runtime, members.m_timer_clock).enable?.(0) ?? 0);
                        (__deref_stb_w(runtime, members.m_timer_data_out).enable?.(0) ?? 0);
                        members.m_testmode = ((1) ? 1 : 0);
                        (__deref_stb_w(runtime, members.m_timer_test_mode).enable?.(1) ?? 0);
                        let div__2 = ((1) ? (4) : (32));
                        (__deref_stb_w(runtime, members.m_timer_test_mode).adjust?.(0, 0, (__L1 ? __L1((((__L0 ? __L0() : runtime.macro("clock"))) / (div__2))) : runtime.macro("attotime::from_hz", (((__L0 ? __L0() : runtime.macro("clock"))) / (div__2))))) ?? 0);
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
        members.m_stb = ((state) | 0);
    }
    function __add_stb_w(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_stb_w(runtime, p) {
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
    function method_get_data_out(runtime) {
        const members = runtime.members;
        return ((((((((members.m_oe ?? 0)) || ((members.m_testmode ?? 0))) ? 1 : 0)) ? ((members.m_data_out ?? 0)) : (1))) | 0);
    }
    function method_set_time(runtime, update, year, month, day, day_of_week, hour, minute, second) {
        const members = runtime.members;
        const h_m_register = members.m_register ?? 0;
        if (((method_rtc_feature_y2k(runtime)) ? 0 : 1)) {
            year = ((((year) % (100))) | 0);
        }
        method_set_clock_register(runtime, 6, year);
        method_set_clock_register(runtime, 4, month);
        method_set_clock_register(runtime, 3, day);
        method_set_clock_register(runtime, 5, day_of_week);
        method_set_clock_register(runtime, 2, hour);
        method_set_clock_register(runtime, 1, minute);
        method_set_clock_register(runtime, 0, second);
        if (update) {
            method_rtc_clock_updated(runtime, h_m_register[6], h_m_register[4], h_m_register[3], h_m_register[5], h_m_register[2], h_m_register[1], h_m_register[0]);
        }
    }
    function method_set_clock_register(runtime, reg, value) {
        const members = runtime.members;
        const h_m_register = members.m_register ?? 0;
        h_m_register[reg] = value;
    }
    function method_rtc_clock_updated(runtime, year, month, day, day_of_week, hour, minute, second) {
        const members = runtime.members;
        const h_m_time_counter = members.m_time_counter ?? 0;
        h_m_time_counter[0] = method_convert_to_bcd(runtime, second);
        h_m_time_counter[1] = method_convert_to_bcd(runtime, minute);
        h_m_time_counter[2] = method_convert_to_bcd(runtime, hour);
        h_m_time_counter[3] = method_convert_to_bcd(runtime, day);
        h_m_time_counter[4] = ((((month) << (4))) | (((day_of_week) - (1))));
        h_m_time_counter[5] = method_convert_to_bcd(runtime, year);
    }
    function method_clk_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_data"];
        const h_m_shift_reg = members.m_shift_reg ?? 0;
        if ((((members.m_cs ?? 0)) ? 0 : 1)) {
            return;
        }
        0;
        if (((((((members.m_clk ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) {
            let $in = (((members.m_data_in ?? 0)) | 0);
            if (method_is_serial_mode(runtime)) {
                $in = ((((h_m_shift_reg[6]) & (1))) | 0);
                h_m_shift_reg[6] = runtime.shiftRight(h_m_shift_reg[6], 1);
                h_m_shift_reg[6] = ((h_m_shift_reg[6]) | ((((members.m_data_in ?? 0)) << (3))));
            }
            if (((Number((members.m_c ?? 0)) === Number(1)) ? 1 : 0)) {
                let max_shift = ((((method_is_serial_mode(runtime)) ? (6) : (5))) | 0);
                for (let i = ((0) | 0); (((i) < (max_shift)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    h_m_shift_reg[i] = runtime.shiftRight(h_m_shift_reg[i], 1);
                    if (((Number(i) === Number(((max_shift) - (1)))) ? 1 : 0)) {
                        h_m_shift_reg[i] = ((h_m_shift_reg[i]) | ((($in) << (7))));
                    }
                    else {
                        h_m_shift_reg[i] = ((h_m_shift_reg[i]) | (((((h_m_shift_reg[((i) + (1))]) << (7))) & (128))));
                    }
                }
                members.m_data_out = ((((h_m_shift_reg[0]) & (1))) | 0);
                (__L0 ? __L0(Number(method_get_data_out(runtime))) : typeof members.m_write_data === 'function' ? members.m_write_data(method_get_data_out(runtime)) : runtime.invoke("m_write_data", method_get_data_out(runtime)));
            }
        }
        members.m_clk = ((state) | 0);
    }
    function method_cs_w(runtime, state) {
        const members = runtime.members;
        0;
        members.m_cs = ((state) | 0);
    }
    function method_oe_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_data"];
        0;
        let prev_oe = (((members.m_oe ?? 0)) | 0);
        members.m_oe = ((state) | 0);
        if ((((((((members.m_oe ?? 0)) !== (prev_oe)) ? 1 : 0)) && (((Number((members.m_c ?? 0)) !== Number(15)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0(Number(method_get_data_out(runtime))) : typeof members.m_write_data === 'function' ? members.m_write_data(method_get_data_out(runtime)) : runtime.invoke("m_write_data", method_get_data_out(runtime)));
        }
    }
    function method_c0_w(runtime, state) {
        const members = runtime.members;
        0;
        members.m_c_unlatched = (((((((members.m_c_unlatched ?? 0)) & (6))) | (state))) | 0);
    }
    function method_c1_w(runtime, state) {
        const members = runtime.members;
        0;
        members.m_c_unlatched = (((((((members.m_c_unlatched ?? 0)) & (5))) | (((state) << (1))))) | 0);
    }
    function method_c2_w(runtime, state) {
        const members = runtime.members;
        0;
        members.m_c_unlatched = (((((((members.m_c_unlatched ?? 0)) & (3))) | (((state) << (2))))) | 0);
    }
    function method_data_in_w(runtime, state) {
        const members = runtime.members;
        0;
        members.m_data_in = ((state) | 0);
    }
    function method_data_out_r(runtime) {
        const members = runtime.members;
        return ((method_get_data_out(runtime)) | 0);
    }
    function method_tp_r(runtime) {
        const members = runtime.members;
        return (((members.m_tp ?? 0)) | 0);
    }
    function method_clock_tick(runtime, param) {
        const members = runtime.members;
        method_advance_seconds(runtime);
    }
    function method_advance_seconds(runtime) {
        const members = runtime.members;
        const h_m_register = members.m_register ?? 0;
        h_m_register[0] = ((h_m_register[0]) + (1));
        if ((((h_m_register[0]) === (60)) ? 1 : 0)) {
            h_m_register[0] = 0;
            method_advance_minutes(runtime);
        }
        else {
            method_clock_updated(runtime);
        }
    }
    function method_advance_minutes(runtime) {
        const members = runtime.members;
        const h_m_register = members.m_register ?? 0;
        h_m_register[1] = ((h_m_register[1]) + (1));
        if ((((h_m_register[1]) === (60)) ? 1 : 0)) {
            h_m_register[1] = 0;
            h_m_register[2] = ((h_m_register[2]) + (1));
        }
        if ((((h_m_register[2]) === (24)) ? 1 : 0)) {
            h_m_register[2] = 0;
            method_advance_days(runtime);
        }
        else {
            method_clock_updated(runtime);
        }
    }
    function method_advance_days(runtime) {
        const members = runtime.members;
        const h_m_register = members.m_register ?? 0;
        h_m_register[3] = ((h_m_register[3]) + (1));
        h_m_register[5] = ((h_m_register[5]) + (1));
        if ((((h_m_register[5]) === (8)) ? 1 : 0)) {
            h_m_register[5] = 1;
        }
        if (((((((h_m_register[4]) > (0)) ? 1 : 0)) && (((Number(h_m_register[3]) > Number((__mame_table_0[(((((h_m_register[4]) - (1))) % 12) + 12) % 12] ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            if (((((((((((((h_m_register[4]) !== (2)) ? 1 : 0)) || ((((h_m_register[3]) !== (29)) ? 1 : 0))) ? 1 : 0)) || (((method_rtc_feature_leap_year(runtime)) ? 0 : 1))) ? 1 : 0)) || (((((h_m_register[6]) % (4))) ? 0 : 1))) ? 1 : 0)) {
                h_m_register[3] = 1;
                h_m_register[4] = ((h_m_register[4]) + (1));
            }
        }
        if ((((h_m_register[4]) === (13)) ? 1 : 0)) {
            h_m_register[4] = 1;
            h_m_register[6] = ((h_m_register[6]) + (1));
            if ((((((method_rtc_feature_y2k(runtime)) ? 0 : 1)) && ((((h_m_register[6]) === (100)) ? 1 : 0))) ? 1 : 0)) {
                h_m_register[6] = 0;
            }
        }
        method_clock_updated(runtime);
    }
    function method_clock_updated(runtime) {
        const members = runtime.members;
        const h_m_register = members.m_register ?? 0;
        method_rtc_clock_updated(runtime, h_m_register[6], h_m_register[4], h_m_register[3], h_m_register[5], h_m_register[2], h_m_register[1], h_m_register[0]);
    }
    function method_tp_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_tp"];
        members.m_tp = (((((members.m_tp ?? 0)) ? 0 : 1)) | 0);
        (__L0 ? __L0(Number((members.m_tp ?? 0))) : typeof members.m_write_tp === 'function' ? members.m_write_tp((members.m_tp ?? 0)) : runtime.invoke("m_write_tp", (members.m_tp ?? 0)));
    }
    function method_data_out_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_data"];
        members.m_data_out = (((((members.m_data_out ?? 0)) ? 0 : 1)) | 0);
        (__L0 ? __L0(Number(method_get_data_out(runtime))) : typeof members.m_write_data === 'function' ? members.m_write_data(method_get_data_out(runtime)) : runtime.invoke("m_write_data", method_get_data_out(runtime)));
    }
    function method_test_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_write_data"];
        const h_m_time_counter = members.m_time_counter ?? 0;
        if ((members.m_oe ?? 0)) {
            let max_shift = ((((method_is_serial_mode(runtime)) ? (6) : (5))) | 0);
            members.m_data_out = (((((h_m_time_counter[((max_shift) - (1))]) === (0)) ? 1 : 0)) | 0);
            (__L0 ? __L0(Number(method_get_data_out(runtime))) : typeof members.m_write_data === 'function' ? members.m_write_data(method_get_data_out(runtime)) : runtime.invoke("m_write_data", method_get_data_out(runtime)));
            for (let i = ((0) | 0); (((i) < (max_shift)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                h_m_time_counter[i] = ((h_m_time_counter[i]) + (1));
                if ((((h_m_time_counter[i]) !== (0)) ? 1 : 0)) {
                    return;
                }
            }
        }
        else {
            members.m_data_out = ((0) | 0);
            let max_shift = ((((method_is_serial_mode(runtime)) ? (6) : (5))) | 0);
            for (let i = ((0) | 0); (((i) < (max_shift)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                h_m_time_counter[i] = ((h_m_time_counter[i]) + (1));
                members.m_data_out = ((((members.m_data_out) | ((((h_m_time_counter[i]) === (0)) ? 1 : 0)))) | 0);
            }
            (__L0 ? __L0(Number(method_get_data_out(runtime))) : typeof members.m_write_data === 'function' ? members.m_write_data(method_get_data_out(runtime)) : runtime.invoke("m_write_data", method_get_data_out(runtime)));
        }
    }
    function method_data_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_data_callback(runtime, members.m_write_data), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_data, "bind"));
    }
    function __deref_data_callback(runtime, p) {
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
    function method_tp_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tp_callback(runtime, members.m_write_tp), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_tp, "bind"));
    }
    function __deref_tp_callback(runtime, p) {
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
    function method_upd1990a_device__data_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_upd1990a_device__data_callback(runtime, members.m_write_data), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_data, "bind"));
    }
    function __deref_upd1990a_device__data_callback(runtime, p) {
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
    function method_upd1990a_device__tp_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_upd1990a_device__tp_callback(runtime, members.m_write_tp), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_tp, "bind"));
    }
    function __deref_upd1990a_device__tp_callback(runtime, p) {
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
        "set_use_utc": method_set_use_utc,
        "has_battery": method_has_battery,
        "rtc_battery_backed": method_rtc_battery_backed,
        "rtc_feature_y2k": method_rtc_feature_y2k,
        "rtc_feature_leap_year": method_rtc_feature_leap_year,
        "convert_to_bcd": method_convert_to_bcd,
        "bcd_to_integer": method_bcd_to_integer,
        "get_clock_register": method_get_clock_register,
        "device_rtc_interface::set_use_utc": method_device_rtc_interface__set_use_utc,
        "device_rtc_interface::has_battery": method_device_rtc_interface__has_battery,
        "device_rtc_interface::rtc_feature_y2k": method_device_rtc_interface__rtc_feature_y2k,
        "device_rtc_interface::rtc_feature_leap_year": method_device_rtc_interface__rtc_feature_leap_year,
        "device_rtc_interface::rtc_battery_backed": method_device_rtc_interface__rtc_battery_backed,
        "is_serial_mode": method_is_serial_mode,
        "stb_w": method_stb_w,
        "get_data_out": method_get_data_out,
        "set_time": method_set_time,
        "set_clock_register": method_set_clock_register,
        "rtc_clock_updated": method_rtc_clock_updated,
        "clk_w": method_clk_w,
        "cs_w": method_cs_w,
        "oe_w": method_oe_w,
        "c0_w": method_c0_w,
        "c1_w": method_c1_w,
        "c2_w": method_c2_w,
        "data_in_w": method_data_in_w,
        "data_out_r": method_data_out_r,
        "tp_r": method_tp_r,
        "clock_tick": method_clock_tick,
        "advance_seconds": method_advance_seconds,
        "advance_minutes": method_advance_minutes,
        "advance_days": method_advance_days,
        "clock_updated": method_clock_updated,
        "tp_tick": method_tp_tick,
        "data_out_tick": method_data_out_tick,
        "test_tick": method_test_tick,
        "data_callback": method_data_callback,
        "tp_callback": method_tp_callback,
        "upd1990a_device::data_callback": method_upd1990a_device__data_callback,
        "upd1990a_device::tp_callback": method_upd1990a_device__tp_callback
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["attotime::from_hz", "attotime::from_ticks", "clock", "m_write_data", "m_write_tp"];
export const device = definition;
export default device;
