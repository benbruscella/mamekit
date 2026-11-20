import deviceData from './alps_3255190x.device.ir.json' with { type: 'json' };
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
    function method_setup_load_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_load_cb = cb;
    }
    function method_setup_unload_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_unload_cb = cb;
    }
    function method_setup_index_pulse_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_index_pulse_cb = cb;
    }
    function method_setup_ready_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_ready_cb = cb;
    }
    function method_setup_wpt_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_wpt_cb = cb;
    }
    function method_setup_led_cb(runtime, cb) {
        const members = runtime.members;
        members.m_cur_led_cb = cb;
    }
    function method_add_variant(runtime, variant) {
        const members = runtime.members;
        let actual_variant = ((variant) >>> 0);
        if (((Number((members.m_sectoring_type ?? 0)) === Number(540029256)) ? 1 : 0)) {
            switch (variant) {
                case 1146311507:
                    {
                        actual_variant = ((808538963) >>> 0);
                        break;
                    }
                case 1145328467:
                    {
                        actual_variant = ((808535123) >>> 0);
                        break;
                    }
                case 1146180435:
                    {
                        actual_variant = ((808538451) >>> 0);
                        break;
                    }
                case 1146311492:
                    {
                        actual_variant = ((808538948) >>> 0);
                        break;
                    }
                case 1145328452:
                    {
                        actual_variant = ((808535108) >>> 0);
                        break;
                    }
                case 1146180420:
                    {
                        actual_variant = ((808538436) >>> 0);
                        break;
                    }
            }
        }
        else {
            if (((Number((members.m_sectoring_type ?? 0)) === Number(540422472)) ? 1 : 0)) {
                switch (variant) {
                    case 1146311507:
                        {
                            actual_variant = ((909198419) >>> 0);
                            break;
                        }
                    case 1145328467:
                        {
                            actual_variant = ((909202259) >>> 0);
                            break;
                        }
                    case 1146180435:
                        {
                            actual_variant = ((909201747) >>> 0);
                            break;
                        }
                    case 1146311492:
                        {
                            actual_variant = ((909202244) >>> 0);
                            break;
                        }
                    case 1145328452:
                        {
                            actual_variant = ((909198404) >>> 0);
                            break;
                        }
                    case 1146180420:
                        {
                            actual_variant = ((909201732) >>> 0);
                            break;
                        }
                }
            }
            else {
                if (((Number((members.m_sectoring_type ?? 0)) === Number(540160840)) ? 1 : 0)) {
                    switch (variant) {
                        case 1146311507:
                            {
                                actual_variant = ((842224467) >>> 0);
                                break;
                            }
                        case 1145328467:
                            {
                                actual_variant = ((842220627) >>> 0);
                                break;
                            }
                        case 1146311492:
                            {
                                actual_variant = ((842224452) >>> 0);
                                break;
                            }
                        case 1145328452:
                            {
                                actual_variant = ((842220612) >>> 0);
                                break;
                            }
                    }
                }
            }
        }
        (members.m_variants).push(actual_variant);
    }
    function method_set_rpm(runtime, _rpm) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_double"];
        if (((((members.m_rpm ?? 0)) === (_rpm)) ? 1 : 0)) {
            return;
        }
        members.m_rpm = _rpm;
        members.m_rev_time = (__L0 ? __L0(((60) / ((members.m_rpm ?? 0)))) : runtime.macro("attotime::from_double", ((60) / ((members.m_rpm ?? 0)))));
        members.m_angular_speed = (((((members.m_rpm ?? 0)) / (60))) * (200000000));
    }
    function method_set_sectoring_type(runtime, sectoring_type) {
        const members = runtime.members;
        members.m_sectoring_type = ((sectoring_type) >>> 0);
    }
    function method_get_sectoring_type(runtime) {
        const members = runtime.members;
        return (((members.m_sectoring_type ?? 0)) >>> 0);
    }
    function method_device_config_complete(runtime) {
        const members = runtime.members;
        members.m_rpm = 0;
        members.m_motor_always_on = ((0) ? 1 : 0);
        members.m_dskchg_writable = ((0) ? 1 : 0);
        members.m_has_trk00_sensor = ((1) ? 1 : 0);
        method_setup_characteristics(runtime);
    }
    function method_setup_characteristics(runtime) {
        const members = runtime.members;
        members.m_form_factor = ((540357173) >>> 0);
        members.m_tracks = ((84) | 0);
        members.m_sides = ((1) | 0);
        method_set_rpm(runtime, 300);
        members.m_cyl = ((34) | 0);
        method_add_variant(runtime, 1146311507);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sound_out.samples_loaded"];
        if ((members.m_make_sound ?? 0)) {
            members.m_make_sound = (((__L0 ? __L0() : ((members.m_sound_out)?.samples_loaded?.() ?? 0))) ? 1 : 0);
        }
        members.m_revolution_start_time = Infinity;
        members.m_revolution_count = ((0) >>> 0);
        members.m_mon = ((1) | 0);
        method_set_ready(runtime, 1);
        if (((((members.m_motor_always_on ?? 0)) && ((members.m_image ?? 0))) ? 1 : 0)) {
            method_mon_w(runtime, 0);
        }
        method_cache_clear(runtime);
    }
    function method_set_ready(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cur_ready_cb.isnull"], __L1 = __l["m_cur_ready_cb"];
        if (((Number(state) !== Number((members.m_ready ?? 0))) ? 1 : 0)) {
            members.m_ready = ((state) ? 1 : 0);
            method_check_led(runtime);
            if ((((__L0 ? __L0() : typeof ((members.m_cur_ready_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_ready_cb ?? 0)).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_cur_ready_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
                (__L1 ? __L1((members.this ?? 0), (members.m_ready ?? 0)) : runtime.macro("m_cur_ready_cb", (members.this ?? 0), (members.m_ready ?? 0)));
            }
        }
    }
    function method_check_led(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cur_led_cb.isnull"], __L1 = __l["m_cur_led_cb"];
        if ((((__L0 ? __L0() : typeof ((members.m_cur_led_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_led_cb ?? 0)).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_cur_led_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__L1 ? __L1((members.this ?? 0), (((((((((members.m_ds ?? 0)) === ((members.m_drive_index ?? 0))) ? 1 : 0)) && ((((members.m_ready ?? 0)) ? 0 : 1))) ? 1 : 0)) ? (1) : (0))) : runtime.macro("m_cur_led_cb", (members.this ?? 0), (((((((((members.m_ds ?? 0)) === ((members.m_drive_index ?? 0))) ? 1 : 0)) && ((((members.m_ready ?? 0)) ? 0 : 1))) ? 1 : 0)) ? (1) : (0))));
        }
    }
    function method_mon_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["commit_image"], __L3 = __l["exists"], __L4 = __l["m_sound_out.motor"];
        if (((((members.m_mon ?? 0)) === (state)) ? 1 : 0)) {
            return;
        }
        members.m_mon = ((state) | 0);
        if (((((((members.m_mon ?? 0)) ? 0 : 1)) && ((members.m_image ?? 0))) ? 1 : 0)) {
            members.m_revolution_start_time = ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
            method_cache_clear(runtime);
            if ((members.m_motor_always_on ?? 0)) {
                method_set_ready(runtime, 0);
            }
            else {
                members.m_ready_counter = ((2) | 0);
            }
            method_index_resync(runtime, 0);
        }
        else {
            if ((members.m_image_dirty ?? 0)) {
                (__L2 ? __L2() : runtime.macro("commit_image"));
            }
            method_cache_clear(runtime);
            members.m_revolution_start_time = Infinity;
            (__deref_mon_w(runtime, members.m_index_timer).adjust?.(0) ?? 0);
            method_set_ready(runtime, 1);
        }
        if ((members.m_make_sound ?? 0)) {
            (__L4 ? __L4((((state) === (0)) ? 1 : 0), (__L3 ? __L3() : runtime.macro("exists"))) : ((members.m_sound_out)?.motor?.((((state) === (0)) ? 1 : 0), (__L3 ? __L3() : runtime.macro("exists"))) ?? 0));
        }
    }
    function __deref_mon_w(runtime, p) {
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
    function method_cache_clear(runtime) {
        const members = runtime.members;
        members.m_cache_start_time = (members.m_cache_end_time = (members.m_cache_weak_start = 0));
        members.m_cache_index = ((0) | 0);
        members.m_cache_entry = ((0) >>> 0);
        members.m_cache_weak = ((0) ? 1 : 0);
    }
    function method_index_resync(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cur_index_pulse_cb.isnull"], __L1 = __l["m_cur_index_pulse_cb"], __L2 = __l["machine"], __L3 = __l["machine().time"], __L4 = __l["attotime::from_double"];
        if ((typeof members.m_revolution_start_time === 'number' ? ((members.m_revolution_start_time) === Infinity ? 1 : 0) : (__deref_index_resync(runtime, members.m_revolution_start_time).is_never?.() ?? 0))) {
            if ((members.m_idx ?? 0)) {
                members.m_idx = ((0) | 0);
                if ((((__L0 ? __L0() : typeof ((members.m_cur_index_pulse_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_index_pulse_cb ?? 0)).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_cur_index_pulse_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
                    (__L1 ? __L1((members.this ?? 0), (members.m_idx ?? 0)) : runtime.macro("m_cur_index_pulse_cb", (members.this ?? 0), (members.m_idx ?? 0)));
                }
            }
            return;
        }
        let delta = ((((__L3 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) - ((members.m_revolution_start_time ?? 0)));
        while (((Number(delta) >= Number((members.m_rev_time ?? 0))) ? 1 : 0)) {
            delta = ((delta) - ((members.m_rev_time ?? 0)));
            members.m_revolution_start_time = ((members.m_revolution_start_time) + ((members.m_rev_time ?? 0)));
            members.m_revolution_count = ((((members.m_revolution_count) + (1))) >>> 0);
        }
        let position = ((((__add_index_resync(runtime, (((typeof delta === 'number' ? (delta) : (__deref_index_resync(runtime, delta).as_double?.() ?? 0))) * ((members.m_angular_speed ?? 0))), 0.5)) | 0)) | 0);
        let last_index = ((0) >>> 0);
        let next_index = ((200000000) >>> 0);
        if ((members.m_image ?? 0)) {
            (__deref_index_resync(runtime, members.m_image).find_index_hole?.(position, last_index, next_index) ?? 0);
        }
        let new_idx = ((((Number(((position) - (last_index))) < Number(2000000)) ? 1 : 0)) | 0);
        if (new_idx) {
            let index_up = ((((last_index) + (2000000))) >>> 0);
            let index_up_time = (__L4 ? __L4(((index_up) / ((members.m_angular_speed ?? 0)))) : runtime.macro("attotime::from_double", ((index_up) / ((members.m_angular_speed ?? 0)))));
            (__deref_index_resync(runtime, members.m_index_timer).adjust?.(((index_up_time) - (delta))) ?? 0);
        }
        else {
            let next_index_time = (((((next_index) >= (200000000)) ? 1 : 0)) ? ((members.m_rev_time ?? 0)) : ((__L4 ? __L4(((next_index) / ((members.m_angular_speed ?? 0)))) : runtime.macro("attotime::from_double", ((next_index) / ((members.m_angular_speed ?? 0)))))));
            (__deref_index_resync(runtime, members.m_index_timer).adjust?.(((next_index_time) - (delta))) ?? 0);
        }
        if ((((new_idx) !== ((members.m_idx ?? 0))) ? 1 : 0)) {
            members.m_idx = ((new_idx) | 0);
            if (((((members.m_idx ?? 0)) && ((members.m_ready ?? 0))) ? 1 : 0)) {
                members.m_ready_counter = ((((members.m_ready_counter) - (1))) | 0);
                if ((((members.m_ready_counter ?? 0)) ? 0 : 1)) {
                    method_set_ready(runtime, 0);
                }
            }
            if ((((__L0 ? __L0() : typeof ((members.m_cur_index_pulse_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_index_pulse_cb ?? 0)).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_cur_index_pulse_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
                (__L1 ? __L1((members.this ?? 0), (members.m_idx ?? 0)) : runtime.macro("m_cur_index_pulse_cb", (members.this ?? 0), (members.m_idx ?? 0)));
            }
        }
    }
    function __add_index_resync(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_index_resync(runtime, p) {
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
    function method_floppy_image_device__device_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sound_out.samples_loaded"];
        if ((members.m_make_sound ?? 0)) {
            members.m_make_sound = (((__L0 ? __L0() : ((members.m_sound_out)?.samples_loaded?.() ?? 0))) ? 1 : 0);
        }
        members.m_revolution_start_time = Infinity;
        members.m_revolution_count = ((0) >>> 0);
        members.m_mon = ((1) | 0);
        method_set_ready(runtime, 1);
        if (((((members.m_motor_always_on ?? 0)) && ((members.m_image ?? 0))) ? 1 : 0)) {
            method_mon_w(runtime, 0);
        }
        method_cache_clear(runtime);
    }
    function method_init_floppy_load(runtime, write_supported) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["m_cur_wpt_cb.isnull"], __L3 = __l["m_cur_wpt_cb"], __L4 = __l["is_readonly"];
        method_cache_clear(runtime);
        members.m_revolution_start_time = (((members.m_mon ?? 0)) ? (Infinity) : (((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)));
        members.m_revolution_count = ((0) >>> 0);
        method_index_resync(runtime, 0);
        members.m_wpt = ((1) | 0);
        if ((((__L2 ? __L2() : typeof ((members.m_cur_wpt_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_wpt_cb ?? 0)).isnull() : ((__L2 ?? globalThis.mamekitMissingCall?.("m_cur_wpt_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__L3 ? __L3((members.this ?? 0), (members.m_wpt ?? 0)) : runtime.macro("m_cur_wpt_cb", (members.this ?? 0), (members.m_wpt ?? 0)));
        }
        members.m_wpt = ((((((__L4 ? __L4() : runtime.macro("is_readonly"))) || (((write_supported) ? 0 : 1))) ? 1 : 0)) | 0);
        if ((((__L2 ? __L2() : typeof ((members.m_cur_wpt_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_wpt_cb ?? 0)).isnull() : ((__L2 ?? globalThis.mamekitMissingCall?.("m_cur_wpt_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__L3 ? __L3((members.this ?? 0), (members.m_wpt ?? 0)) : runtime.macro("m_cur_wpt_cb", (members.this ?? 0), (members.m_wpt ?? 0)));
        }
        if ((members.m_motor_always_on ?? 0)) {
            method_mon_w(runtime, 0);
            members.m_ready_counter = ((2) | 0);
        }
        else {
            if ((((members.m_mon ?? 0)) ? 0 : 1)) {
                members.m_ready_counter = ((2) | 0);
            }
        }
        if ((members.m_dskchg_writable ?? 0)) {
            members.m_dskchg = ((1) | 0);
        }
    }
    function method_wpt_r(runtime) {
        const members = runtime.members;
        return ((((members.m_wpt ?? 0)) || ((((members.m_phases ?? 0)) & (2)))) ? 1 : 0);
    }
    function method_floppy_image_device__mon_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["commit_image"], __L3 = __l["exists"], __L4 = __l["m_sound_out.motor"];
        if (((((members.m_mon ?? 0)) === (state)) ? 1 : 0)) {
            return;
        }
        members.m_mon = ((state) | 0);
        if (((((((members.m_mon ?? 0)) ? 0 : 1)) && ((members.m_image ?? 0))) ? 1 : 0)) {
            members.m_revolution_start_time = ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
            method_cache_clear(runtime);
            if ((members.m_motor_always_on ?? 0)) {
                method_set_ready(runtime, 0);
            }
            else {
                members.m_ready_counter = ((2) | 0);
            }
            method_index_resync(runtime, 0);
        }
        else {
            if ((members.m_image_dirty ?? 0)) {
                (__L2 ? __L2() : runtime.macro("commit_image"));
            }
            method_cache_clear(runtime);
            members.m_revolution_start_time = Infinity;
            (__deref_floppy_image_device__mon_w(runtime, members.m_index_timer).adjust?.(0) ?? 0);
            method_set_ready(runtime, 1);
        }
        if ((members.m_make_sound ?? 0)) {
            (__L4 ? __L4((((state) === (0)) ? 1 : 0), (__L3 ? __L3() : runtime.macro("exists"))) : ((members.m_sound_out)?.motor?.((((state) === (0)) ? 1 : 0), (__L3 ? __L3() : runtime.macro("exists"))) ?? 0));
        }
    }
    function __deref_floppy_image_device__mon_w(runtime, p) {
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
    function method_time_next_index(runtime) {
        const members = runtime.members;
        if ((typeof members.m_revolution_start_time === 'number' ? ((members.m_revolution_start_time) === Infinity ? 1 : 0) : (__deref_time_next_index(runtime, members.m_revolution_start_time).is_never?.() ?? 0))) {
            return Infinity;
        }
        return (((members.m_revolution_start_time ?? 0)) + ((members.m_rev_time ?? 0)));
    }
    function __deref_time_next_index(runtime, p) {
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
    function method_ready_r(runtime) {
        const members = runtime.members;
        return (members.m_ready ?? 0);
    }
    function method_twosid_r(runtime) {
        const members = runtime.members;
        let __t0;
        if ((((members.m_image ?? 0)) ? 0 : 1)) {
            return 0;
        }
        switch ((__t0 = __deref_twosid_r(runtime, members.m_image), typeof __t0.get_variant === 'function' ? __t0.get_variant() : typeof __t0.get_variant === 'number' || typeof __t0.get_variant === 'boolean' ? __t0.get_variant : runtime.container(members.m_image, "get_variant"))) {
            case 1146311507:
            case 808538963:
            case 909202259:
            case 842224467:
            case 1145328467:
            case 808535123:
            case 909198419:
            case 842220627:
            case 1146180435:
            case 909201747:
                {
                    return 1;
                }
            case 0:
                {
                    let tracks = ((0) | 0);
                    let heads = ((0) | 0);
                    (__deref_twosid_r(runtime, members.m_image).get_actual_geometry?.(tracks, heads) ?? 0);
                    return (((heads) === (1)) ? 1 : 0);
                }
            default:
                {
                    return 0;
                }
        }
    }
    function __deref_twosid_r(runtime, p) {
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
    function method_floppy_is_hd(runtime) {
        const members = runtime.members;
        let __t0;
        if ((((members.m_image ?? 0)) ? 0 : 1)) {
            return 0;
        }
        let variant = (((__t0 = __deref_floppy_is_hd(runtime, members.m_image), typeof __t0.get_variant === 'function' ? __t0.get_variant() : typeof __t0.get_variant === 'number' || typeof __t0.get_variant === 'boolean' ? __t0.get_variant : runtime.container(members.m_image, "get_variant"))) >>> 0);
        return ((Number(variant) === Number(1145590596)) ? 1 : 0);
    }
    function __deref_floppy_is_hd(runtime, p) {
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
    function method_floppy_is_ed(runtime) {
        const members = runtime.members;
        let __t0;
        if ((((members.m_image ?? 0)) ? 0 : 1)) {
            return 0;
        }
        let variant = (((__t0 = __deref_floppy_is_ed(runtime, members.m_image), typeof __t0.get_variant === 'function' ? __t0.get_variant() : typeof __t0.get_variant === 'number' || typeof __t0.get_variant === 'boolean' ? __t0.get_variant : runtime.container(members.m_image, "get_variant"))) >>> 0);
        return ((Number(variant) === Number(1145393988)) ? 1 : 0);
    }
    function __deref_floppy_is_ed(runtime, p) {
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
    function method_track_changed(runtime) {
        const members = runtime.members;
    }
    function method_floppy_image_device__track_changed(runtime) {
        const members = runtime.members;
    }
    function method_stp_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sound_out.step"], __L1 = __l["exists"];
        if (((((members.m_stp ?? 0)) !== (state)) ? 1 : 0)) {
            method_cache_clear(runtime);
            members.m_stp = ((state) | 0);
            if (((((members.m_stp ?? 0)) === (0)) ? 1 : 0)) {
                if ((members.m_dir ?? 0)) {
                    members.m_cyl = ((((members.m_cyl) - (1))) | 0);
                }
                else {
                    members.m_cyl = ((((members.m_cyl) + (1))) | 0);
                }
                0;
                if ((members.m_make_sound ?? 0)) {
                    (__L0 ? __L0((members.m_cyl ?? 0)) : ((members.m_sound_out)?.step?.((members.m_cyl ?? 0)) ?? 0));
                }
                if (((((members.m_cyl ?? 0)) < (0)) ? 1 : 0)) {
                    members.m_cyl = ((0) | 0);
                }
                else {
                    if (((Number((members.m_cyl ?? 0)) > Number((((members.m_tracks ?? 0)) - (1)))) ? 1 : 0)) {
                        members.m_cyl = (((((members.m_tracks ?? 0)) - (1))) | 0);
                    }
                    else {
                        method_track_changed(runtime);
                    }
                }
                if (((((__L1 ? __L1() : runtime.macro("exists"))) && ((((members.m_dskchg_writable ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    if (((((members.m_dskchg ?? 0)) === (0)) ? 1 : 0)) {
                        members.m_dskchg = ((1) | 0);
                    }
                }
            }
            members.m_subcyl = ((0) | 0);
        }
    }
    function method_seek_phase_w(runtime, _phases) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sound_out.step"], __L1 = __l["exists"];
        members.m_phases = ((_phases) | 0);
        let cur_pos = (((((((members.m_cyl ?? 0)) << (2))) | ((members.m_subcyl ?? 0)))) | 0);
        let req_pos = ((0) | 0);
        switch ((members.m_phases ?? 0)) {
            case 1:
                {
                    req_pos = ((0) | 0);
                    break;
                }
            case 3:
                {
                    req_pos = ((1) | 0);
                    break;
                }
            case 2:
                {
                    req_pos = ((2) | 0);
                    break;
                }
            case 6:
                {
                    req_pos = ((3) | 0);
                    break;
                }
            case 4:
                {
                    req_pos = ((4) | 0);
                    break;
                }
            case 12:
                {
                    req_pos = ((5) | 0);
                    break;
                }
            case 8:
                {
                    req_pos = ((6) | 0);
                    break;
                }
            case 9:
                {
                    req_pos = ((7) | 0);
                    break;
                }
            default:
                {
                    return;
                }
        }
        if (((Number(((((cur_pos) ^ (req_pos))) & (7))) === Number(4)) ? 1 : 0)) {
            return;
        }
        let next_pos = ((((((cur_pos) & (-8))) | (req_pos))) | 0);
        if (((Number(next_pos) < Number(((cur_pos) - (4)))) ? 1 : 0)) {
            next_pos = ((((next_pos) + (8))) | 0);
        }
        else {
            if (((Number(next_pos) > Number(((cur_pos) + (4)))) ? 1 : 0)) {
                next_pos = ((((next_pos) - (8))) | 0);
            }
        }
        if ((((next_pos) < (0)) ? 1 : 0)) {
            next_pos = ((0) | 0);
        }
        else {
            if (((Number(next_pos) > Number((((((members.m_tracks ?? 0)) - (1))) * (4)))) ? 1 : 0)) {
                next_pos = (((((((members.m_tracks ?? 0)) - (1))) * (4))) | 0);
            }
        }
        members.m_cyl = ((runtime.shiftRight(next_pos, 2)) | 0);
        members.m_subcyl = ((((next_pos) & (3))) | 0);
        method_cache_clear(runtime);
        if ((((next_pos) !== (cur_pos)) ? 1 : 0)) {
            0;
            if ((members.m_make_sound ?? 0)) {
                (__L0 ? __L0((members.m_cyl ?? 0), (members.m_subcyl ?? 0)) : ((members.m_sound_out)?.step?.((members.m_cyl ?? 0), (members.m_subcyl ?? 0)) ?? 0));
            }
        }
        if (((((__L1 ? __L1() : runtime.macro("exists"))) && ((((members.m_dskchg_writable ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            if (((((members.m_dskchg ?? 0)) === (0)) ? 1 : 0)) {
                members.m_dskchg = ((1) | 0);
            }
        }
    }
    function method_hash32(runtime, a) {
        const members = runtime.members;
        a = ((__add_hash32(runtime, ((a) + (2127912214)), ((a) << (12)))) >>> 0);
        a = ((((((a) ^ (3345072700))) ^ (((a) >>> (19))))) >>> 0);
        a = ((__add_hash32(runtime, ((a) + (374761393)), ((a) << (5)))) >>> 0);
        a = ((((((a) + (3550635116))) ^ (((a) << (9))))) >>> 0);
        a = ((__add_hash32(runtime, ((a) + (4251993797)), ((a) << (3)))) >>> 0);
        a = ((((((a) ^ (3042594569))) ^ (((a) >>> (16))))) >>> 0);
        return ((a) >>> 0);
    }
    function __add_hash32(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_find_position(runtime, base, when) {
        const members = runtime.members;
        base.set((members.m_revolution_start_time ?? 0));
        let delta = ((when) - (base.get()));
        while (((Number(delta) >= Number((members.m_rev_time ?? 0))) ? 1 : 0)) {
            delta = ((delta) - ((members.m_rev_time ?? 0)));
            base.set(((base.get()) + ((members.m_rev_time ?? 0))));
        }
        while (((Number(delta) < Number(0)) ? 1 : 0)) {
            delta = ((delta) + ((members.m_rev_time ?? 0)));
            base.set(((base.get()) - ((members.m_rev_time ?? 0))));
        }
        let res = ((((__add_find_position(runtime, (((typeof delta === 'number' ? (delta) : (__deref_find_position(runtime, delta).as_double?.() ?? 0))) * ((members.m_angular_speed ?? 0))), 0.5)) >>> 0)) >>> 0);
        if ((((res) >= (200000000)) ? 1 : 0)) {
            res = ((((res) - (200000000))) >>> 0);
            base.set(((base.get()) + ((members.m_rev_time ?? 0))));
        }
        return ((res) >>> 0);
    }
    function __add_find_position(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_find_position(runtime, p) {
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
    function method_position_to_time(runtime, base, position) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_double"];
        return __add_position_to_time(runtime, base, (__L0 ? __L0(((position) / ((members.m_angular_speed ?? 0)))) : runtime.macro("attotime::from_double", ((position) / ((members.m_angular_speed ?? 0))))));
    }
    function __add_position_to_time(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_cache_fill_index(runtime, buf, index, base) {
        const members = runtime.members;
        let cells = (((buf).length) | 0);
        members.m_cache_index = ((index.get()) | 0);
        members.m_cache_start_time = method_position_to_time(runtime, base.get(), ((runtime.readIndex(buf, index.get())) & (268435455)));
        members.m_cache_entry = ((runtime.readIndex(buf, (members.m_cache_index ?? 0))) >>> 0);
        index.set(((((index.get()) + (1))) | 0));
        if (((Number(index.get()) >= Number(cells)) ? 1 : 0)) {
            index.set(((0) | 0));
            base.set(((base.get()) + ((members.m_rev_time ?? 0))));
        }
        members.m_cache_end_time = method_position_to_time(runtime, base.get(), ((runtime.readIndex(buf, index.get())) & (268435455)));
    }
    function method_cache_fill(runtime, when) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::upper_bound"];
        let buf = (__deref_cache_fill(runtime, members.m_image).get_buffer?.((members.m_cyl ?? 0), (members.m_ss ?? 0), (members.m_subcyl ?? 0)) ?? 0);
        let cells = (((buf).length) >>> 0);
        if ((((cells) <= (1)) ? 1 : 0)) {
            members.m_cache_start_time = 0;
            members.m_cache_end_time = Infinity;
            members.m_cache_index = ((0) | 0);
            members.m_cache_entry = (((((((cells) === (1)) ? 1 : 0)) ? (runtime.readIndex(buf, 0)) : (268435456))) >>> 0);
            method_cache_weakness_setup(runtime);
            return;
        }
        let base = 0;
        let position = ((method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), when)) >>> 0);
        let it = (__L0 ? __L0(runtime.container(buf, "begin"), runtime.container(buf, "end"), position, ((a, b) => {
            return ((Number(a) < Number(((b) & (268435455)))) ? 1 : 0);
        })) : runtime.macro("std::upper_bound", runtime.container(buf, "begin"), runtime.container(buf, "end"), position, ((a, b) => {
            return ((Number(a) < Number(((b) & (268435455)))) ? 1 : 0);
        })));
        let index = ((0) | 0);
        if ((runtime.same(runtime.container(buf, "begin"), it) ? 1 : 0)) {
            base = ((base) - ((members.m_rev_time ?? 0)));
            index = ((runtime.subtract((buf).length, 1)) | 0);
        }
        else {
            index = ((((((runtime.subtract(it, runtime.container(buf, "begin"))) | 0)) - (1))) | 0);
        }
        for (; 1;) {
            let __inline0_buf = buf;
            let __inline0_cells = (((__inline0_buf).length) | 0);
            members.m_cache_index = ((index) | 0);
            members.m_cache_start_time = method_position_to_time(runtime, base, ((runtime.readIndex(__inline0_buf, index)) & (268435455)));
            members.m_cache_entry = ((runtime.readIndex(__inline0_buf, (members.m_cache_index ?? 0))) >>> 0);
            index = ((((index) + (1))) | 0);
            if ((((index) >= (__inline0_cells)) ? 1 : 0)) {
                index = ((0) | 0);
                base = ((base) + ((members.m_rev_time ?? 0)));
            }
            members.m_cache_end_time = method_position_to_time(runtime, base, ((runtime.readIndex(__inline0_buf, index)) & (268435455)));
            if (((Number((members.m_cache_end_time ?? 0)) > Number(when)) ? 1 : 0)) {
                method_cache_weakness_setup(runtime);
                break;
            }
        }
    }
    function __deref_cache_fill(runtime, p) {
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
    function method_cache_weakness_setup(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_usec"];
        const h_m_amplifier_freakout_time = members.m_amplifier_freakout_time ?? 0;
        let type = (((((members.m_cache_entry ?? 0)) & (4026531840))) >>> 0);
        if ((((((Number(type) === Number(268435456)) ? 1 : 0)) || (((Number(type) === Number(536870912)) ? 1 : 0))) ? 1 : 0)) {
            members.m_cache_weak = ((1) ? 1 : 0);
            members.m_cache_weak_start = (members.m_cache_start_time ?? 0);
            return;
        }
        members.m_cache_weak = ((((((typeof members.m_cache_end_time === 'number' ? ((members.m_cache_end_time) === Infinity ? 1 : 0) : (__deref_cache_weakness_setup(runtime, members.m_cache_end_time).is_never?.() ?? 0))) || (((Number((((members.m_cache_end_time ?? 0)) - ((members.m_cache_start_time ?? 0)))) >= Number(h_m_amplifier_freakout_time)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        if ((((members.m_cache_weak ?? 0)) ? 0 : 1)) {
            members.m_cache_weak_start = Infinity;
            return;
        }
        members.m_cache_weak_start = (((members.m_cache_start_time ?? 0)) + ((__L0 ? __L0(16) : runtime.macro("attotime::from_usec", 16))));
    }
    function __deref_cache_weakness_setup(runtime, p) {
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
    function method_get_next_transition(runtime, from_when) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_ticks"], __L1 = __l["attotime::from_usec"];
        if (((((((members.m_image ?? 0)) ? 0 : 1)) || ((members.m_mon ?? 0))) ? 1 : 0)) {
            return Infinity;
        }
        if (((((((((Number(from_when) < Number((members.m_cache_start_time ?? 0))) ? 1 : 0)) || ((typeof members.m_cache_start_time === 'number' ? ((members.m_cache_start_time) === 0 ? 1 : 0) : (__deref_get_next_transition(runtime, members.m_cache_start_time).is_zero?.() ?? 0)))) ? 1 : 0)) || (((((((typeof members.m_cache_end_time === 'number' ? ((members.m_cache_end_time) === Infinity ? 1 : 0) : (__deref_get_next_transition(runtime, members.m_cache_end_time).is_never?.() ?? 0))) ? 0 : 1)) && (((Number(from_when) >= Number((members.m_cache_end_time ?? 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            method_cache_fill(runtime, from_when);
        }
        if ((((members.m_cache_weak ?? 0)) ? 0 : 1)) {
            return (members.m_cache_end_time ?? 0);
        }
        let interval_index = ((((Number(from_when) < Number((members.m_cache_weak_start ?? 0))) ? 1 : 0)) ? (0) : ((typeof ((from_when) - ((members.m_cache_weak_start ?? 0))) === 'number' ? runtime.attotime(((from_when) - ((members.m_cache_weak_start ?? 0))), "as_ticks", 250000) : (__deref_get_next_transition(runtime, ((from_when) - ((members.m_cache_weak_start ?? 0)))).as_ticks?.(250000) ?? 0))));
        let weak_time = (((members.m_cache_weak_start ?? 0)) + ((__L0 ? __L0(__add_get_next_transition(runtime, ((interval_index) * (2)), 1), 500000) : runtime.macro("attotime::from_ticks", __add_get_next_transition(runtime, ((interval_index) * (2)), 1), 500000))));
        for (; 1;) {
            if (((Number(weak_time) >= Number((members.m_cache_end_time ?? 0))) ? 1 : 0)) {
                return (members.m_cache_end_time ?? 0);
            }
            if (((Number(weak_time) > Number(from_when)) ? 1 : 0)) {
                let test = ((method_hash32(runtime, ((method_hash32(runtime, ((method_hash32(runtime, ((method_hash32(runtime, (members.m_revolution_count ?? 0))) ^ (16962)))) + ((members.m_cache_index ?? 0))))) + (interval_index)))) >>> 0);
                if (((test) & (1))) {
                    return weak_time;
                }
            }
            weak_time = ((weak_time) + ((__L1 ? __L1(4) : runtime.macro("attotime::from_usec", 4))));
            interval_index = ((interval_index) + (1));
        }
    }
    function __add_get_next_transition(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_get_next_transition(runtime, p) {
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
    function method_writing_disabled(runtime) {
        const members = runtime.members;
        return ((((members.m_wpt ?? 0)) || ((((members.m_phases ?? 0)) & (2)))) ? 1 : 0);
    }
    function method_write_flux(runtime, start, end, transition_count, transitions) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["VECTOR_OF"];
        if (((((((members.m_image ?? 0)) ? 0 : 1)) || ((members.m_mon ?? 0))) ? 1 : 0)) {
            return;
        }
        if (method_writing_disabled(runtime)) {
            return;
        }
        members.m_image_dirty = ((1) ? 1 : 0);
        members.m_track_dirty = ((1) ? 1 : 0);
        method_cache_clear(runtime);
        let wspans = (__L0 ? __L0("wspan", 1) : runtime.macro("VECTOR_OF", "wspan", 1));
        let base = 0;
        runtime.readIndex(wspans, 0).start = method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), start);
        runtime.readIndex(wspans, 0).end = method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), end);
        for (let i = ((0) | 0); (((i) !== (transition_count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (runtime.readIndex(wspans, 0).flux_change_positions).push(method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), runtime.readIndex(transitions, i)));
        }
        method_wspan_split_on_wrap(runtime, wspans);
        let buf = (__deref_write_flux(runtime, members.m_image).get_buffer?.((members.m_cyl ?? 0), (members.m_ss ?? 0), (members.m_subcyl ?? 0)) ?? 0);
        if (((buf).length === 0 ? 1 : 0)) {
            (buf).push(268435456);
            (buf).push(1005306367);
        }
        method_wspan_remove_damaged(runtime, wspans, buf);
        method_wspan_write(runtime, wspans, buf);
        method_cache_clear(runtime);
    }
    function __deref_write_flux(runtime, p) {
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
    function method_wspan_split_on_wrap(runtime, wspans) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::copy"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7;
        let ne = (((wspans).length) | 0);
        for (let i = ((0) | 0); (((i) !== (ne)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((Number(runtime.readIndex(wspans, i).end) < Number(runtime.readIndex(wspans, i).start)) ? 1 : 0)) {
                (wspans = runtime.resize(wspans, __add_wspan_split_on_wrap(runtime, (wspans).length, 1)));
                let ws = runtime.readIndex(wspans, i);
                let we = (__t0 = __deref_wspan_split_on_wrap(runtime, wspans), typeof __t0.back === 'function' ? __t0.back() : typeof __t0.back === 'number' || typeof __t0.back === 'boolean' ? __t0.back : runtime.container(wspans, "back"));
                we.start = 0;
                we.end = ws.end;
                ws.end = 200000000;
                let start = ((ws.start) | 0);
                let split_index = ((0) | 0);
                for (split_index = ((0) | 0); ((Number(split_index) !== Number((ws.flux_change_positions).length)) ? 1 : 0); split_index = ((((split_index) + (1))) | 0)) {
                    if (((Number(runtime.readIndex(ws.flux_change_positions, split_index)) < Number(start)) ? 1 : 0)) {
                        break;
                    }
                }
                if ((((split_index) === (0)) ? 1 : 0)) {
                    (__t1 = ws.flux_change_positions, __t2 = we.flux_change_positions, (runtime.swapObjects(__t1, __t2) ? 0 : (ws.flux_change_positions = __t2, we.flux_change_positions = __t1, 0)));
                }
                else {
                    runtime.resize(we.flux_change_positions, (((ws.flux_change_positions).length) - (split_index)));
                    (__L0 ? __L0(__addr_wspan_split_on_wrap(runtime, (__t3 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t3.begin === 'function' ? __t3.begin() : typeof __t3.begin === 'number' || typeof __t3.begin === 'boolean' ? __t3.begin : runtime.container(ws.flux_change_positions, "begin")), split_index), (__t4 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t4.end === 'function' ? __t4.end() : typeof __t4.end === 'number' || typeof __t4.end === 'boolean' ? __t4.end : runtime.container(ws.flux_change_positions, "end")), (__t5 = __deref_wspan_split_on_wrap(runtime, we.flux_change_positions), typeof __t5.begin === 'function' ? __t5.begin() : typeof __t5.begin === 'number' || typeof __t5.begin === 'boolean' ? __t5.begin : runtime.container(we.flux_change_positions, "begin"))) : runtime.macro("std::copy", __addr_wspan_split_on_wrap(runtime, (__t3 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t3.begin === 'function' ? __t3.begin() : typeof __t3.begin === 'number' || typeof __t3.begin === 'boolean' ? __t3.begin : runtime.container(ws.flux_change_positions, "begin")), split_index), (__t4 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t4.end === 'function' ? __t4.end() : typeof __t4.end === 'number' || typeof __t4.end === 'boolean' ? __t4.end : runtime.container(ws.flux_change_positions, "end")), (__t5 = __deref_wspan_split_on_wrap(runtime, we.flux_change_positions), typeof __t5.begin === 'function' ? __t5.begin() : typeof __t5.begin === 'number' || typeof __t5.begin === 'boolean' ? __t5.begin : runtime.container(we.flux_change_positions, "begin"))));
                    runtime.vectorMethod(ws.flux_change_positions, "erase", __addr_wspan_split_on_wrap(runtime, (__t6 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t6.begin === 'function' ? __t6.begin() : typeof __t6.begin === 'number' || typeof __t6.begin === 'boolean' ? __t6.begin : runtime.container(ws.flux_change_positions, "begin")), split_index), (__t7 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t7.end === 'function' ? __t7.end() : typeof __t7.end === 'number' || typeof __t7.end === 'boolean' ? __t7.end : runtime.container(ws.flux_change_positions, "end")));
                }
            }
        }
    }
    function __add_wspan_split_on_wrap(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_wspan_split_on_wrap(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_wspan_split_on_wrap(runtime, p) {
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
    function method_wspan_remove_damaged(runtime, wspans, track) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        for (let pos = 0; ((Number(pos) !== Number((track).length)) ? 1 : 0); pos = ((pos) + (1))) {
            if (((Number(((runtime.readIndex(track, pos)) & (4026531840))) === Number(536870912)) ? 1 : 0)) {
                let start = ((((runtime.readIndex(track, pos)) & (268435455))) | 0);
                let end = ((((runtime.readIndex(track, ((pos) + (1)))) & (268435455))) | 0);
                let ne = (((wspans).length) | 0);
                for (let i = ((0) | 0); (((i) !== (ne)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if ((((((Number(runtime.readIndex(wspans, i).start) > Number(end)) ? 1 : 0)) || (((Number(runtime.readIndex(wspans, i).end) <= Number(start)) ? 1 : 0))) ? 1 : 0)) {
                        continue;
                    }
                    if ((((((Number(runtime.readIndex(wspans, i).start) >= Number(start)) ? 1 : 0)) && (((Number(runtime.subtract(runtime.readIndex(wspans, i).end, 1)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.vectorMethod(wspans, "erase", __addr_wspan_remove_damaged(runtime, runtime.container(wspans, "begin"), i));
                        i = ((((i) - (1))) | 0);
                        ne = ((((ne) - (1))) | 0);
                        continue;
                    }
                    if ((((((Number(runtime.readIndex(wspans, i).start) >= Number(start)) ? 1 : 0)) && (((Number(runtime.subtract(runtime.readIndex(wspans, i).end, 1)) > Number(end)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.readIndex(wspans, i).start = ((end) + (1));
                        while ((((((((runtime.readIndex(wspans, i).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, i).flux_change_positions, 0)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.vectorMethod(runtime.readIndex(wspans, i).flux_change_positions, "erase", (__t0 = __deref_wspan_remove_damaged(runtime, runtime.readIndex(wspans, i).flux_change_positions), typeof __t0.begin === 'function' ? (__t0.begin() ?? 0) : runtime.container(runtime.readIndex(wspans, i).flux_change_positions, "begin")));
                        }
                        continue;
                    }
                    if ((((((Number(runtime.readIndex(wspans, i).start) < Number(start)) ? 1 : 0)) && (((Number(runtime.subtract(runtime.readIndex(wspans, i).end, 1)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.readIndex(wspans, i).end = start;
                        while ((((((((runtime.readIndex(wspans, i).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, i).flux_change_positions, runtime.subtract((runtime.readIndex(wspans, i).flux_change_positions).length, 1))) >= Number(start)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.vectorMethod(runtime.readIndex(wspans, i).flux_change_positions, "erase", __addr_wspan_remove_damaged(runtime, (__t1 = __deref_wspan_remove_damaged(runtime, runtime.readIndex(wspans, i).flux_change_positions), typeof __t1.end === 'function' ? (__t1.end() ?? 0) : runtime.container(runtime.readIndex(wspans, i).flux_change_positions, "end")), -(1)));
                        }
                        continue;
                    }
                    let id = (((wspans).length) | 0);
                    (wspans = runtime.resize(wspans, ((id) + (1))));
                    runtime.readIndex(wspans, id).start = ((end) + (1));
                    runtime.readIndex(wspans, id).end = runtime.readIndex(wspans, i).end;
                    runtime.readIndex(wspans, id).flux_change_positions = runtime.readIndex(wspans, i).flux_change_positions;
                    runtime.readIndex(wspans, i).end = start;
                    while ((((((((runtime.readIndex(wspans, i).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, i).flux_change_positions, runtime.subtract((runtime.readIndex(wspans, i).flux_change_positions).length, 1))) >= Number(start)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.vectorMethod(runtime.readIndex(wspans, i).flux_change_positions, "erase", __addr_wspan_remove_damaged(runtime, (__t2 = __deref_wspan_remove_damaged(runtime, runtime.readIndex(wspans, i).flux_change_positions), typeof __t2.end === 'function' ? (__t2.end() ?? 0) : runtime.container(runtime.readIndex(wspans, i).flux_change_positions, "end")), -(1)));
                    }
                    while ((((((((runtime.readIndex(wspans, id).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, id).flux_change_positions, 0)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.vectorMethod(runtime.readIndex(wspans, id).flux_change_positions, "erase", (__t3 = __deref_wspan_remove_damaged(runtime, runtime.readIndex(wspans, id).flux_change_positions), typeof __t3.begin === 'function' ? (__t3.begin() ?? 0) : runtime.container(runtime.readIndex(wspans, id).flux_change_positions, "begin")));
                    }
                }
            }
        }
    }
    function __addr_wspan_remove_damaged(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_wspan_remove_damaged(runtime, p) {
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
    function method_wspan_write(runtime, wspans, track) {
        const members = runtime.members;
        for (let __range0 = wspans, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            let si = 0;
            let ei = 0;
            for (si = 0; ((Number(si) !== Number((track).length)) ? 1 : 0); si = ((si) + (1))) {
                if (((Number(((runtime.readIndex(track, si)) & (268435455))) >= Number(__range0_item.start)) ? 1 : 0)) {
                    break;
                }
            }
            for (ei = si; ((Number(ei) !== Number((track).length)) ? 1 : 0); ei = ((ei) + (1))) {
                if (((Number(((runtime.readIndex(track, ei)) & (268435455))) >= Number(__range0_item.end)) ? 1 : 0)) {
                    break;
                }
            }
            if ((((((Number(si) !== Number((track).length)) ? 1 : 0)) && (((Number(((runtime.readIndex(track, si)) & (4026531840))) === Number(805306368)) ? 1 : 0))) ? 1 : 0)) {
                if ((((si) === (ei)) ? 1 : 0)) {
                    runtime.vectorMethod(track, "insert", __addr_wspan_write(runtime, runtime.container(track, "begin"), si), ((805306368) | (runtime.subtract(__range0_item.start, 1))));
                    runtime.vectorMethod(track, "insert", __addr_wspan_write(runtime, __addr_wspan_write(runtime, runtime.container(track, "begin"), si), 1), ((((runtime.readIndex(track, ((si) - (1)))) & (4026531840))) | (__range0_item.end)));
                    si = (ei = ((si) + (1)));
                }
                else {
                    runtime.writeIndex(track, si, ((805306368) | (runtime.subtract(__range0_item.start, 1))));
                    si = ((si) + (1));
                }
            }
            if ((((((Number(ei) !== Number((track).length)) ? 1 : 0)) && (((Number(((runtime.readIndex(track, ei)) & (4026531840))) === Number(805306368)) ? 1 : 0))) ? 1 : 0)) {
                runtime.writeIndex(track, ((ei) - (1)), ((268435456) | (__range0_item.end)));
                ei = ((ei) - (1));
            }
            runtime.vectorMethod(track, "erase", __addr_wspan_write(runtime, runtime.container(track, "begin"), si), __addr_wspan_write(runtime, runtime.container(track, "begin"), ei));
            for (let __range1 = __range0_item.flux_change_positions, __range1_index = 0; ((Number(__range1_index) < Number(__range1.length)) ? 1 : 0); __range1_index = ((__range1_index) + (1))) {
                const __range1_item = runtime.readIndex(__range1, __range1_index);
                runtime.vectorMethod(track, "insert", __addr_wspan_write(runtime, runtime.container(track, "begin"), si), ((0) | (__range1_item)));
                si = ((si) + (1));
            }
        }
    }
    function __addr_wspan_write(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_set_write_splice(runtime, when) {
        const members = runtime.members;
        if (((((members.m_image ?? 0)) && ((((members.m_mon ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_image_dirty = ((1) ? 1 : 0);
            let base = 0;
            let splice_pos = ((method_find_position(runtime, ({ generatedLValue: true, get: () => base, set: (value) => { base = value; } }), when)) | 0);
            (__deref_set_write_splice(runtime, members.m_image).set_write_splice_position?.((members.m_cyl ?? 0), (members.m_ss ?? 0), splice_pos, (members.m_subcyl ?? 0)) ?? 0);
        }
    }
    function __deref_set_write_splice(runtime, p) {
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
    function method_get_form_factor(runtime) {
        const members = runtime.members;
        return (((members.m_form_factor ?? 0)) >>> 0);
    }
    function method_get_variant(runtime) {
        const members = runtime.members;
        let __t0;
        return (((((members.m_image ?? 0)) ? ((__t0 = __deref_get_variant(runtime, members.m_image), typeof __t0.get_variant === 'function' ? __t0.get_variant() : typeof __t0.get_variant === 'number' || typeof __t0.get_variant === 'boolean' ? __t0.get_variant : runtime.container(members.m_image, "get_variant"))) : (0))) >>> 0);
    }
    function __deref_get_variant(runtime, p) {
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
    function method_get_cyl(runtime) {
        const members = runtime.members;
        return (((members.m_cyl ?? 0)) | 0);
    }
    function method_on_track(runtime) {
        const members = runtime.members;
        return (((members.m_subcyl ?? 0)) ? 0 : 1);
    }
    function method_tfsel_w(runtime, state) {
        const members = runtime.members;
    }
    function method_dskchg_r(runtime) {
        const members = runtime.members;
        return (((members.m_dskchg ?? 0)) | 0);
    }
    function method_trk00_r(runtime) {
        const members = runtime.members;
        return (((members.m_has_trk00_sensor ?? 0)) ? (((((members.m_cyl ?? 0)) !== (0)) ? 1 : 0)) : (1));
    }
    function method_idx_r(runtime) {
        const members = runtime.members;
        return (((members.m_idx ?? 0)) | 0);
    }
    function method_mon_r(runtime) {
        const members = runtime.members;
        return (((members.m_mon ?? 0)) | 0);
    }
    function method_floppy_image_device__mon_r(runtime) {
        const members = runtime.members;
        return (((members.m_mon ?? 0)) | 0);
    }
    function method_ss_r(runtime) {
        const members = runtime.members;
        return (members.m_ss ?? 0);
    }
    function method_dir_w(runtime, state) {
        const members = runtime.members;
        members.m_dir = ((state) | 0);
    }
    function method_ss_w(runtime, state) {
        const members = runtime.members;
        members.m_actual_ss = ((state) | 0);
        if (((((members.m_sides ?? 0)) > (1)) ? 1 : 0)) {
            members.m_ss = ((state) | 0);
        }
    }
    function method_inuse_w(runtime, state) {
        const members = runtime.members;
    }
    function method_dskchg_w(runtime, state) {
        const members = runtime.members;
        if ((members.m_dskchg_writable ?? 0)) {
            members.m_dskchg = ((state) | 0);
        }
    }
    function method_ds_w(runtime, state) {
        const members = runtime.members;
        members.m_ds = ((state) | 0);
        method_check_led(runtime);
    }
    function method_get_sides(runtime) {
        const members = runtime.members;
        return (((members.m_sides ?? 0)) | 0);
    }
    function method_floppy_image_device__get_cyl(runtime) {
        const members = runtime.members;
        return (((members.m_cyl ?? 0)) | 0);
    }
    function method_floppy_image_device__on_track(runtime) {
        const members = runtime.members;
        return (((members.m_subcyl ?? 0)) ? 0 : 1);
    }
    function method_floppy_image_device__tfsel_w(runtime, state) {
        const members = runtime.members;
    }
    function method_floppy_image_device__dskchg_r(runtime) {
        const members = runtime.members;
        return (((members.m_dskchg ?? 0)) | 0);
    }
    function method_floppy_image_device__trk00_r(runtime) {
        const members = runtime.members;
        return (((members.m_has_trk00_sensor ?? 0)) ? (((((members.m_cyl ?? 0)) !== (0)) ? 1 : 0)) : (1));
    }
    function method_floppy_image_device__idx_r(runtime) {
        const members = runtime.members;
        return (((members.m_idx ?? 0)) | 0);
    }
    function method_floppy_image_device__ss_r(runtime) {
        const members = runtime.members;
        return (members.m_ss ?? 0);
    }
    function method_floppy_image_device__dir_w(runtime, state) {
        const members = runtime.members;
        members.m_dir = ((state) | 0);
    }
    function method_floppy_image_device__ss_w(runtime, state) {
        const members = runtime.members;
        members.m_actual_ss = ((state) | 0);
        if (((((members.m_sides ?? 0)) > (1)) ? 1 : 0)) {
            members.m_ss = ((state) | 0);
        }
    }
    function method_floppy_image_device__inuse_w(runtime, state) {
        const members = runtime.members;
    }
    function method_floppy_image_device__dskchg_w(runtime, state) {
        const members = runtime.members;
        if ((members.m_dskchg_writable ?? 0)) {
            members.m_dskchg = ((state) | 0);
        }
    }
    function method_floppy_image_device__ds_w(runtime, state) {
        const members = runtime.members;
        members.m_ds = ((state) | 0);
        method_check_led(runtime);
    }
    function method_floppy_image_device__get_sides(runtime) {
        const members = runtime.members;
        return (((members.m_sides ?? 0)) | 0);
    }
    function method_get_fs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_fs = __assigned;
        return (members.m_fs ?? 0);
    }
    function method_floppy_image_device__get_fs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_fs = __assigned;
        return (members.m_fs ?? 0);
    }
    function method_mount_image(runtime, image, best_format) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_feature"], __L1 = __l["std::strcmp"], __L2 = __l["make_readonly"], __L3 = __l["is_readonly"];
        members.m_image = image;
        let wp = (__L0 ? __L0("write_protected") : runtime.macro("get_feature", "write_protected"));
        let wp$s = undefined, wp$o = 0;
        if (ArrayBuffer.isView(wp) || Array.isArray(wp))
            wp$s = wp;
        else if (wp !== null && typeof wp === 'object' && wp.generatedPointer === true && wp.path === undefined && wp.target === undefined && (ArrayBuffer.isView(wp.source) || Array.isArray(wp.source))) {
            wp$s = wp.source;
            wp$o = wp.offset;
        }
        if ((((wp) && ((((__L1 ? __L1(wp, "true") : runtime.macro("std::strcmp", wp, "true"))) ? 0 : 1))) ? 1 : 0)) {
            (__L2 ? __L2() : runtime.macro("make_readonly"));
        }
        members.m_output_format = (((__L3 ? __L3() : runtime.macro("is_readonly"))) ? (0) : (best_format));
        members.m_image_dirty = ((0) ? 1 : 0);
        method_init_floppy_load(runtime, (((members.m_output_format ?? 0)) ? 1 : 0));
    }
    function method_unmount_image(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["commit_image"], __L1 = __l["m_cur_wpt_cb.isnull"], __L2 = __l["m_cur_wpt_cb"], __L3 = __l["m_cur_unload_cb.isnull"], __L4 = __l["m_cur_unload_cb"], __L5 = __l["m_sound_out.unload"];
        method_cache_clear(runtime);
        members.m_dskchg = ((0) | 0);
        if ((members.m_image ?? 0)) {
            if ((members.m_image_dirty ?? 0)) {
                (__L0 ? __L0() : runtime.macro("commit_image"));
            }
            members.m_image = 0;
        }
        members.m_wpt = ((1) | 0);
        if ((((__L1 ? __L1() : typeof ((members.m_cur_wpt_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_wpt_cb ?? 0)).isnull() : ((__L1 ?? globalThis.mamekitMissingCall?.("m_cur_wpt_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__L2 ? __L2((members.this ?? 0), (members.m_wpt ?? 0)) : runtime.macro("m_cur_wpt_cb", (members.this ?? 0), (members.m_wpt ?? 0)));
        }
        members.m_wpt = ((0) | 0);
        if ((((__L1 ? __L1() : typeof ((members.m_cur_wpt_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_wpt_cb ?? 0)).isnull() : ((__L1 ?? globalThis.mamekitMissingCall?.("m_cur_wpt_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__L2 ? __L2((members.this ?? 0), (members.m_wpt ?? 0)) : runtime.macro("m_cur_wpt_cb", (members.this ?? 0), (members.m_wpt ?? 0)));
        }
        if ((((__L3 ? __L3() : typeof ((members.m_cur_unload_cb ?? 0))?.isnull === 'function' ? ((members.m_cur_unload_cb ?? 0)).isnull() : ((__L3 ?? globalThis.mamekitMissingCall?.("m_cur_unload_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__L4 ? __L4((members.this ?? 0)) : runtime.macro("m_cur_unload_cb", (members.this ?? 0)));
        }
        if ((members.m_motor_always_on ?? 0)) {
            method_mon_w(runtime, 1);
        }
        if ((members.m_make_sound ?? 0)) {
            (__L5 ? __L5() : ((members.m_sound_out)?.unload?.() ?? 0));
        }
        method_set_ready(runtime, 1);
    }
    function method_cache_fill__lambda0(runtime, a, b) {
        const members = runtime.members;
        return ((Number(a) < Number(((b) & (268435455)))) ? 1 : 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "setup_load_cb": method_setup_load_cb,
        "setup_unload_cb": method_setup_unload_cb,
        "setup_index_pulse_cb": method_setup_index_pulse_cb,
        "setup_ready_cb": method_setup_ready_cb,
        "setup_wpt_cb": method_setup_wpt_cb,
        "setup_led_cb": method_setup_led_cb,
        "add_variant": method_add_variant,
        "set_rpm": method_set_rpm,
        "set_sectoring_type": method_set_sectoring_type,
        "get_sectoring_type": method_get_sectoring_type,
        "device_config_complete": method_device_config_complete,
        "setup_characteristics": method_setup_characteristics,
        "device_reset": method_device_reset,
        "set_ready": method_set_ready,
        "check_led": method_check_led,
        "mon_w": method_mon_w,
        "cache_clear": method_cache_clear,
        "index_resync": method_index_resync,
        "floppy_image_device::device_reset": method_floppy_image_device__device_reset,
        "init_floppy_load": method_init_floppy_load,
        "wpt_r": method_wpt_r,
        "floppy_image_device::mon_w": method_floppy_image_device__mon_w,
        "time_next_index": method_time_next_index,
        "ready_r": method_ready_r,
        "twosid_r": method_twosid_r,
        "floppy_is_hd": method_floppy_is_hd,
        "floppy_is_ed": method_floppy_is_ed,
        "track_changed": method_track_changed,
        "floppy_image_device::track_changed": method_floppy_image_device__track_changed,
        "stp_w": method_stp_w,
        "seek_phase_w": method_seek_phase_w,
        "hash32": method_hash32,
        "position_to_time": method_position_to_time,
        "cache_fill": method_cache_fill,
        "cache_weakness_setup": method_cache_weakness_setup,
        "get_next_transition": method_get_next_transition,
        "writing_disabled": method_writing_disabled,
        "write_flux": method_write_flux,
        "wspan_split_on_wrap": method_wspan_split_on_wrap,
        "wspan_remove_damaged": method_wspan_remove_damaged,
        "wspan_write": method_wspan_write,
        "set_write_splice": method_set_write_splice,
        "get_form_factor": method_get_form_factor,
        "get_variant": method_get_variant,
        "get_cyl": method_get_cyl,
        "on_track": method_on_track,
        "tfsel_w": method_tfsel_w,
        "dskchg_r": method_dskchg_r,
        "trk00_r": method_trk00_r,
        "idx_r": method_idx_r,
        "mon_r": method_mon_r,
        "floppy_image_device::mon_r": method_floppy_image_device__mon_r,
        "ss_r": method_ss_r,
        "dir_w": method_dir_w,
        "ss_w": method_ss_w,
        "inuse_w": method_inuse_w,
        "dskchg_w": method_dskchg_w,
        "ds_w": method_ds_w,
        "get_sides": method_get_sides,
        "floppy_image_device::get_cyl": method_floppy_image_device__get_cyl,
        "floppy_image_device::on_track": method_floppy_image_device__on_track,
        "floppy_image_device::tfsel_w": method_floppy_image_device__tfsel_w,
        "floppy_image_device::dskchg_r": method_floppy_image_device__dskchg_r,
        "floppy_image_device::trk00_r": method_floppy_image_device__trk00_r,
        "floppy_image_device::idx_r": method_floppy_image_device__idx_r,
        "floppy_image_device::ss_r": method_floppy_image_device__ss_r,
        "floppy_image_device::dir_w": method_floppy_image_device__dir_w,
        "floppy_image_device::ss_w": method_floppy_image_device__ss_w,
        "floppy_image_device::inuse_w": method_floppy_image_device__inuse_w,
        "floppy_image_device::dskchg_w": method_floppy_image_device__dskchg_w,
        "floppy_image_device::ds_w": method_floppy_image_device__ds_w,
        "floppy_image_device::get_sides": method_floppy_image_device__get_sides,
        "get_fs=": method_get_fs_,
        "floppy_image_device::get_fs=": method_floppy_image_device__get_fs_,
        "mount_image": method_mount_image,
        "unmount_image": method_unmount_image,
        "cache_fill__lambda0": method_cache_fill__lambda0
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["VECTOR_OF", "attotime::from_double", "attotime::from_ticks", "attotime::from_usec", "commit_image", "exists", "get_feature", "is_readonly", "m_cur_index_pulse_cb", "m_cur_index_pulse_cb.isnull", "m_cur_led_cb", "m_cur_led_cb.isnull", "m_cur_ready_cb", "m_cur_ready_cb.isnull", "m_cur_unload_cb", "m_cur_unload_cb.isnull", "m_cur_wpt_cb", "m_cur_wpt_cb.isnull", "m_sound_out.motor", "m_sound_out.samples_loaded", "m_sound_out.step", "m_sound_out.unload", "machine", "machine().time", "make_readonly", "std::copy", "std::strcmp", "std::upper_bound"];
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
    const cppScratch_read_sample_buf = new Uint8Array(Math.max(0, Number(4)));
    function method_set_channels(runtime, channels) {
        const members = runtime.members;
        channels = ((channels) & 0xff);
        members.m_channels = ((channels) & 0xff);
    }
    function method_channels(runtime) {
        const members = runtime.members;
        return (((members.m_channels ?? 0)) & 0xff);
    }
    function method_samples(runtime) {
        const members = runtime.members;
        return (members.m_sample).length;
    }
    function method_base_frequency(runtime, channel) {
        const members = runtime.members;
        channel = ((channel) & 0xff);
        return (((members.m_channel ?? 0)[channel].basefreq) >>> 0);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        const h_m_seek_pitch = members.m_seek_pitch ?? 0;
        let out = ((0) << 16 >> 16);
        let sampleend = ((0) | 0);
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            out = ((0) << 16 >> 16);
            if (((Number((members.m_spin_sample ?? 0)) !== Number(-1)) ? 1 : 0)) {
                sampleend = ((((members.m_sample ?? 0)[(((members.m_spin_sample ?? 0)) - (1))].data).length) | 0);
                out = (((members.m_sample ?? 0)[(((members.m_spin_sample ?? 0)) - (1))].data[(__t1 = (members.m_spin_samplepos ?? 0), members.m_spin_samplepos = ((((members.m_spin_samplepos) + (1))) | 0), __t1)]) << 16 >> 16);
                if (((((members.m_spin_samplepos ?? 0)) >= (sampleend)) ? 1 : 0)) {
                    switch ((members.m_spin_kind ?? 0)) {
                        case 0:
                            {
                                members.m_spin_kind = ((1) | 0);
                                break;
                            }
                        case 4:
                        case 3:
                            {
                                members.m_spin_kind = ((5) | 0);
                                break;
                            }
                        case 1:
                            {
                                if ((((members.m_motor_on ?? 0)) ? 0 : 1)) {
                                    members.m_spin_kind = ((2) | 0);
                                }
                                break;
                            }
                        case 5:
                            {
                                if ((((members.m_motor_on ?? 0)) ? 0 : 1)) {
                                    members.m_spin_kind = ((6) | 0);
                                }
                                break;
                            }
                        case 2:
                        case 6:
                            {
                                if ((members.m_motor_on ?? 0)) {
                                    0;
                                    members.m_spin_kind = (((((members.m_with_disk ?? 0)) ? (4) : (0))) | 0);
                                }
                                else {
                                    members.m_spin_kind = ((-1) | 0);
                                }
                                break;
                            }
                        default:
                            {
                                break;
                            }
                    }
                    let old_sample = (((members.m_spin_sample ?? 0)) | 0);
                    members.m_spin_sample = ((((((Number((members.m_spin_kind ?? 0)) === Number(-1)) ? 1 : 0)) ? (-1) : ((members.m_samplelist.find_spin?.((members.m_spin_kind ?? 0)) ?? 0)))) | 0);
                    if (((Number((members.m_spin_sample ?? 0)) === Number(-1)) ? 1 : 0)) {
                        0;
                    }
                    else {
                        if (((((members.m_spin_sample ?? 0)) !== (old_sample)) ? 1 : 0)) {
                            0;
                        }
                    }
                    members.m_spin_samplepos = ((0) | 0);
                }
            }
            if (((((members.m_seek_sound_timeout ?? 0)) === (1)) ? 1 : 0)) {
                0;
                members.m_seek_sample = ((-1) | 0);
                members.m_seek_sound_timeout = ((0) | 0);
                members.m_step_samplepos = ((((members.m_step_samplepos) + (441))) | 0);
            }
            if (((Number((members.m_seek_sample ?? 0)) !== Number(-1)) ? 1 : 0)) {
                members.m_seek_sound_timeout = ((((members.m_seek_sound_timeout) - (1))) | 0);
                sampleend = ((((members.m_sample ?? 0)[(((members.m_seek_sample ?? 0)) - (1))].data).length) | 0);
                out = ((((out) + ((members.m_sample ?? 0)[(((members.m_seek_sample ?? 0)) - (1))].data[(((members.m_seek_samplepos ?? 0)) | 0)]))) << 16 >> 16);
                members.m_seek_samplepos = ((members.m_seek_samplepos) + (h_m_seek_pitch));
                if (((((members.m_seek_samplepos ?? 0)) >= (sampleend)) ? 1 : 0)) {
                    members.m_seek_samplepos = 0;
                }
            }
            else {
                if (((Number((members.m_step_sample ?? 0)) !== Number(-1)) ? 1 : 0)) {
                    sampleend = ((((members.m_sample ?? 0)[(((members.m_step_sample ?? 0)) - (1))].data).length) | 0);
                    if (((((members.m_step_samplepos ?? 0)) < (sampleend)) ? 1 : 0)) {
                        out = ((((out) + ((members.m_sample ?? 0)[(((members.m_step_sample ?? 0)) - (1))].data[(__t2 = (members.m_step_samplepos ?? 0), members.m_step_samplepos = ((((members.m_step_samplepos) + (1))) | 0), __t2)]))) << 16 >> 16);
                    }
                    if (((((members.m_step_samplepos ?? 0)) >= (sampleend)) ? 1 : 0)) {
                        members.m_step_samplepos = ((0) | 0);
                        members.m_step_sample = ((-1) | 0);
                        0;
                    }
                }
            }
            (__deref_sound_stream_update(runtime, stream).put_int?.(0, sampindex, out, 32768) ?? 0);
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
    function method_samples_device__set_channels(runtime, channels) {
        const members = runtime.members;
        channels = ((channels) & 0xff);
        members.m_channels = ((channels) & 0xff);
    }
    function method_samples_device__channels(runtime) {
        const members = runtime.members;
        return (((members.m_channels ?? 0)) & 0xff);
    }
    function method_samples_device__samples(runtime) {
        const members = runtime.members;
        return (members.m_sample).length;
    }
    function method_samples_device__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().sample_rate"], __L2 = __l["stream_alloc"], __L3 = __l["NAME"], __L4 = __l["save_item"];
        runtime.invoke("load_samples");
        (members.m_channel = runtime.resize(members.m_channel, (members.m_channels ?? 0)));
        for (let channel = ((0) | 0); (((channel) < ((members.m_channels ?? 0))) ? 1 : 0); channel = ((((channel) + (1))) | 0)) {
            let rate = ((((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) >>> 0);
            let chan = (members.m_channel ?? 0)[channel];
            chan.stream = (__L2 ? __L2(0, 1, rate) : runtime.macro("stream_alloc", 0, 1, rate));
            chan.source = 0;
            chan.source_num = ((-1) | 0);
            chan.pos = 0;
            chan.basefreq = ((rate) >>> 0);
            chan.curfreq = ((rate) >>> 0);
            chan.loop = ((0) ? 1 : 0);
            chan.paused = ((0) ? 1 : 0);
            (__L4 ? __L4((__L3 ? __L3(chan.source_num) : runtime.macro("NAME", chan.source_num)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.source_num) : runtime.macro("NAME", chan.source_num)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.source_len) : runtime.macro("NAME", chan.source_len)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.source_len) : runtime.macro("NAME", chan.source_len)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.pos) : runtime.macro("NAME", chan.pos)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.pos) : runtime.macro("NAME", chan.pos)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.basefreq) : runtime.macro("NAME", chan.basefreq)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.basefreq) : runtime.macro("NAME", chan.basefreq)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.curfreq) : runtime.macro("NAME", chan.curfreq)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.curfreq) : runtime.macro("NAME", chan.curfreq)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.loop) : runtime.macro("NAME", chan.loop)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.loop) : runtime.macro("NAME", chan.loop)), channel));
            (__L4 ? __L4((__L3 ? __L3(chan.paused) : runtime.macro("NAME", chan.paused)), channel) : runtime.macro("save_item", (__L3 ? __L3(chan.paused) : runtime.macro("NAME", chan.paused)), channel));
        }
    }
    function method_read_sample(runtime, file, sample) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["osd_printf_warning"], __L1 = __l["memcmp"];
        let __t0, __t1;
        let buf = cppScratch_read_sample_buf.fill(0);
        let offset = (((__deref_read_sample(runtime, file).read?.(buf, 4) ?? 0)) >>> 0);
        if ((((offset) < (4)) ? 1 : 0)) {
            (__L0 ? __L0("Unable to read %s, 0-byte file?\n", (__t0 = __deref_read_sample(runtime, file), typeof __t0.filename === 'function' ? __t0.filename() : typeof __t0.filename === 'number' || typeof __t0.filename === 'boolean' ? __t0.filename : runtime.container(file, "filename"))) : runtime.macro("osd_printf_warning", "Unable to read %s, 0-byte file?\n", (__t0 = __deref_read_sample(runtime, file), typeof __t0.filename === 'function' ? __t0.filename() : typeof __t0.filename === 'number' || typeof __t0.filename === 'boolean' ? __t0.filename : runtime.container(file, "filename"))));
            return 0;
        }
        if (((Number((__L1 ? __L1(({ generatedPointer: true, source: buf, offset: 0 }), "RIFF", 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: buf, offset: 0 }), "RIFF", 4))) === Number(0)) ? 1 : 0)) {
            return runtime.invoke("read_wav_sample", file, sample);
        }
        else {
            if (((Number((__L1 ? __L1(({ generatedPointer: true, source: buf, offset: 0 }), "fLaC", 4) : runtime.macro("memcmp", ({ generatedPointer: true, source: buf, offset: 0 }), "fLaC", 4))) === Number(0)) ? 1 : 0)) {
                return method_read_flac_sample(runtime, file, sample);
            }
        }
        (__L0 ? __L0("Unable to read %s, corrupt file?\n", (__t1 = __deref_read_sample(runtime, file), typeof __t1.filename === 'function' ? __t1.filename() : typeof __t1.filename === 'number' || typeof __t1.filename === 'boolean' ? __t1.filename : runtime.container(file, "filename"))) : runtime.macro("osd_printf_warning", "Unable to read %s, corrupt file?\n", (__t1 = __deref_read_sample(runtime, file), typeof __t1.filename === 'function' ? __t1.filename() : typeof __t1.filename === 'number' || typeof __t1.filename === 'boolean' ? __t1.filename : runtime.container(file, "filename"))));
        return 0;
    }
    function __deref_read_sample(runtime, p) {
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
    function method_little_endianize_int32(runtime, x) {
        const members = runtime.members;
        return ((x) >>> 0);
    }
    function method_little_endianize_int16(runtime, x) {
        const members = runtime.members;
        x = ((x) & 0xffff);
        return ((x) & 0xffff);
    }
    function method_read_flac_sample(runtime, file, sample) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["flac_decoder"];
        let __t0, __t1, __t2, __t3, __t4;
        (__deref_read_flac_sample(runtime, file).seek?.(0, 0) ?? 0);
        let decoder = (__L0 ? __L0(file) : runtime.macro("flac_decoder", file));
        sample.frequency = (((__t0 = __deref_read_flac_sample(runtime, decoder), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(decoder, "sample_rate"))) >>> 0);
        if (((Number((__t1 = __deref_read_flac_sample(runtime, decoder), typeof __t1.channels === 'function' ? __t1.channels() : typeof __t1.channels === 'number' || typeof __t1.channels === 'boolean' ? __t1.channels : runtime.container(decoder, "channels"))) !== Number(1)) ? 1 : 0)) {
            return 0;
        }
        if (((Number((__t2 = __deref_read_flac_sample(runtime, decoder), typeof __t2.bits_per_sample === 'function' ? __t2.bits_per_sample() : typeof __t2.bits_per_sample === 'number' || typeof __t2.bits_per_sample === 'boolean' ? __t2.bits_per_sample : runtime.container(decoder, "bits_per_sample"))) !== Number(16)) ? 1 : 0)) {
            return 0;
        }
        runtime.resize(sample.data, (__t3 = __deref_read_flac_sample(runtime, decoder), typeof __t3.total_samples === 'function' ? __t3.total_samples() : typeof __t3.total_samples === 'number' || typeof __t3.total_samples === 'boolean' ? __t3.total_samples : runtime.container(decoder, "total_samples")));
        if ((((__deref_read_flac_sample(runtime, decoder).decode_interleaved?.(({ generatedPointer: true, source: sample.data, offset: 0 }), (sample.data).length) ?? 0)) ? 0 : 1)) {
            return 0;
        }
        (__t4 = __deref_read_flac_sample(runtime, decoder), typeof __t4.finish === 'function' ? __t4.finish() : typeof __t4.finish === 'number' || typeof __t4.finish === 'boolean' ? __t4.finish : runtime.container(decoder, "finish"));
        return 1;
    }
    function __deref_read_flac_sample(runtime, p) {
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
    function method_samples_device__sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        let sample_scale = ((1) / (32768));
        for (let channel = ((0) | 0); (((channel) < ((members.m_channels ?? 0))) ? 1 : 0); channel = ((((channel) + (1))) | 0)) {
            if ((runtime.same(stream, (members.m_channel ?? 0)[channel].stream) ? 1 : 0)) {
                let chan = (members.m_channel ?? 0)[channel];
                if ((((((chan.source) ? 1 : 0)) && (((chan.paused) ? 0 : 1))) ? 1 : 0)) {
                    let step = ((chan.curfreq) / ((__t0 = __deref_samples_device__sound_stream_update(runtime, stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(stream, "sample_rate"))));
                    let endpos = chan.source_len;
                    let sample = chan.source;
                    let sample$s = undefined, sample$o = 0;
                    if (ArrayBuffer.isView(sample) || Array.isArray(sample))
                        sample$s = sample;
                    else if (sample !== null && typeof sample === 'object' && sample.generatedPointer === true && sample.path === undefined && sample.target === undefined && (ArrayBuffer.isView(sample.source) || Array.isArray(sample.source))) {
                        sample$s = sample.source;
                        sample$o = sample.offset;
                    }
                    for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t1 = __deref_samples_device__sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                        let pos_floor = Math.floor(Number(chan.pos));
                        let frac = ((chan.pos) - (pos_floor));
                        let ipos = ((((pos_floor) | 0)) | 0);
                        let sample1 = sample[(__t2 = ipos, ipos = ((((ipos) + (1))) | 0), __t2)];
                        let sample2 = sample[((ipos) % (chan.source_len))];
                        (__deref_samples_device__sound_stream_update(runtime, stream).put?.(0, sampindex, ((sample_scale) * (__add_samples_device__sound_stream_update(runtime, ((((1) - (frac))) * (sample1)), ((frac) * (sample2)))))) ?? 0);
                        chan.pos = ((chan.pos) + (step));
                        if ((((chan.pos) >= (endpos)) ? 1 : 0)) {
                            if (chan.loop) {
                                chan.pos = ((chan.pos) - (endpos));
                            }
                            else {
                                chan.source = 0;
                                chan.source_num = ((-1) | 0);
                                break;
                            }
                        }
                    }
                }
                break;
            }
        }
    }
    function __add_samples_device__sound_stream_update(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_samples_device__sound_stream_update(runtime, p) {
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
    function method_samples_loaded(runtime) {
        const members = runtime.members;
        return (members.m_samples_available ?? 0);
    }
    function method_floppy_sound_device__samples_loaded(runtime) {
        const members = runtime.members;
        return (members.m_samples_available ?? 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "set_channels": method_set_channels,
        "channels": method_channels,
        "samples": method_samples,
        "base_frequency": method_base_frequency,
        "sound_stream_update": method_sound_stream_update,
        "samples_device::set_channels": method_samples_device__set_channels,
        "samples_device::channels": method_samples_device__channels,
        "samples_device::samples": method_samples_device__samples,
        "samples_device::device_start": method_samples_device__device_start,
        "read_sample": method_read_sample,
        "little_endianize_int32": method_little_endianize_int32,
        "little_endianize_int16": method_little_endianize_int16,
        "read_flac_sample": method_read_flac_sample,
        "samples_device::sound_stream_update": method_samples_device__sound_stream_update,
        "samples_loaded": method_samples_loaded,
        "floppy_sound_device::samples_loaded": method_floppy_sound_device__samples_loaded
    };
    return __methodTable;
})();
definition.children[0].definition.compiledMethodLinks = ["NAME", "flac_decoder", "machine", "machine().sample_rate", "memcmp", "osd_printf_warning", "save_item", "stream_alloc"];
definition.children[0].definition.allocations["floppy_sound_samples"].compiledMethods = (() => {
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
    function method_select(runtime, form_factor) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::string"];
        let __t0;
        const h_m_fulllist = members.m_fulllist ?? 0;
        let found = ((0) ? 1 : 0);
        while (((found) ? 0 : 1)) {
            let index = ((0) | 0);
            for (let __range0 = h_m_fulllist, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                if ((((((Number(__range0_item.form_factor) === Number(form_factor)) ? 1 : 0)) && (((Number(__range0_item.directory) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                    if ((((index) === (0)) ? 1 : 0)) {
                        members.m_basedir = __add_select(runtime, "*", (__L0 ? __L0(__range0_item.directory) : runtime.macro("std::string", __range0_item.directory)));
                        (members.m_samplenames).push(runtime.stringMethod(members.m_basedir, "c_str"));
                        index = ((((index) + (1))) | 0);
                        found = ((1) ? 1 : 0);
                    }
                    __range0_item.index = (__t0 = index, index = ((((index) + (1))) | 0), __t0);
                    (members.m_samplenames).push(__range0_item.filename);
                }
            }
            if (((found) ? 0 : 1)) {
                if (((Number(form_factor) === Number(538976307)) ? 1 : 0)) {
                    form_factor = ((538981683) | 0);
                }
                else {
                    if (((Number(form_factor) !== Number(540357173)) ? 1 : 0)) {
                        form_factor = ((540357173) | 0);
                    }
                    else {
                        form_factor = ((0) | 0);
                        break;
                    }
                }
            }
        }
        members.m_current_form_factor = ((form_factor) | 0);
    }
    function __add_select(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_set_form_factor(runtime, form_factor, dir) {
        const members = runtime.members;
        members.m_current_dir = dir;
        members.m_current_form_factor = ((form_factor) | 0);
    }
    function method_add_spin_sample(runtime, filename, type) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"];
        let entry = (__L0 ? __L0("floppy_sound_entry") : runtime.macro("STRUCT_OF", "floppy_sound_entry"));
        entry.type = ((0) | 0);
        entry.spintype = ((type) | 0);
        entry.filename = filename;
        entry.form_factor = (((members.m_current_form_factor ?? 0)) | 0);
        entry.directory = (members.m_current_dir ?? 0);
        (members.m_fulllist).push(entry);
    }
    function method_get_names(runtime) {
        const members = runtime.members;
        (members.m_samplenames).push(0);
        return __addr_get_names(runtime, (members.m_samplenames ?? 0), 0);
    }
    function __addr_get_names(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_find_spin(runtime, spintype) {
        const members = runtime.members;
        const h_m_fulllist = members.m_fulllist ?? 0;
        let replace_sample = new Int32Array([1, 5, 6, 4, 5, -1, 5]);
        while (((Number(spintype) !== Number(-1)) ? 1 : 0)) {
            for (let __range0 = h_m_fulllist, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                if (((((((((Number(__range0_item.form_factor) === Number((members.m_current_form_factor ?? 0))) ? 1 : 0)) && (((Number(__range0_item.type) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(__range0_item.spintype) === Number(spintype)) ? 1 : 0))) ? 1 : 0)) {
                    return ((__range0_item.index) | 0);
                }
            }
            spintype = (((replace_sample[spintype] ?? 0)) | 0);
        }
        return ((-1) | 0);
    }
    function method_find_step(runtime, track, dir) {
        const members = runtime.members;
        const h_m_fulllist = members.m_fulllist ?? 0;
        for (let __range0 = h_m_fulllist, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            if (((((((((((((((Number(__range0_item.form_factor) === Number((members.m_current_form_factor ?? 0))) ? 1 : 0)) && (((Number(__range0_item.type) === Number(1)) ? 1 : 0))) ? 1 : 0)) && (((Number(track) >= Number(__range0_item.mintrack)) ? 1 : 0))) ? 1 : 0)) && (((Number(track) <= Number(__range0_item.maxtrack)) ? 1 : 0))) ? 1 : 0)) && ((((((Number(__range0_item.dir) === Number(0)) ? 1 : 0)) || (((Number(__range0_item.dir) === Number(dir)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                return ((__range0_item.index) | 0);
            }
        }
        return ((-1) | 0);
    }
    function method_find_seek(runtime, rate, track, dir, pitch) {
        const members = runtime.members;
        const h_m_fulllist = members.m_fulllist ?? 0;
        let index = ((-1) | 0);
        let maxrate = ((100) | 0);
        pitch.set(1);
        for (let __range0 = h_m_fulllist, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            if (((((((((((((((Number(__range0_item.form_factor) === Number((members.m_current_form_factor ?? 0))) ? 1 : 0)) && (((Number(__range0_item.type) === Number(2)) ? 1 : 0))) ? 1 : 0)) && (((Number(track) >= Number(__range0_item.mintrack)) ? 1 : 0))) ? 1 : 0)) && (((Number(track) <= Number(__range0_item.maxtrack)) ? 1 : 0))) ? 1 : 0)) && ((((((Number(__range0_item.dir) === Number(0)) ? 1 : 0)) || (((Number(__range0_item.dir) === Number(dir)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                if ((((((Number(rate) <= Number(__range0_item.maxrate)) ? 1 : 0)) && (((Number(__range0_item.maxrate) < Number(maxrate)) ? 1 : 0))) ? 1 : 0)) {
                    index = ((__range0_item.index) | 0);
                    maxrate = ((__range0_item.maxrate) | 0);
                    pitch.set(((__range0_item.rate) / (rate)));
                }
            }
        }
        return ((index) | 0);
    }
    function method_clear(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = (members.m_fulllist), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(members.m_fulllist, "clear"));
    }
    function method_get_assumed_form_factor(runtime) {
        const members = runtime.members;
        return (((members.m_current_form_factor ?? 0)) | 0);
    }
    function method_floppy_sound_samples__clear(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = (members.m_fulllist), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(members.m_fulllist, "clear"));
    }
    function method_floppy_sound_samples__get_assumed_form_factor(runtime) {
        const members = runtime.members;
        return (((members.m_current_form_factor ?? 0)) | 0);
    }
    function method___construct(runtime) {
        const members = runtime.members;
        members.m_current_form_factor = ((0) | 0);
        members.m_current_dir = 0;
    }
    function method_add_step_sample__2(runtime, filename, dir) {
        const members = runtime.members;
        method_add_step_sample__4(runtime, filename, 0, 99, dir);
    }
    function method_add_step_sample__4(runtime, filename, mintrack, maxtrack, dir) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"];
        let entry = (__L0 ? __L0("floppy_sound_entry") : runtime.macro("STRUCT_OF", "floppy_sound_entry"));
        entry.type = ((1) | 0);
        entry.mintrack = ((mintrack) | 0);
        entry.maxtrack = ((maxtrack) | 0);
        entry.dir = ((dir) | 0);
        entry.filename = filename;
        entry.form_factor = (((members.m_current_form_factor ?? 0)) | 0);
        entry.directory = (members.m_current_dir ?? 0);
        (members.m_fulllist).push(entry);
    }
    function method_add_seek_sample__4(runtime, filename, nominal_rate, max_rate, dir) {
        const members = runtime.members;
        method_add_seek_sample__6(runtime, filename, nominal_rate, max_rate, 0, 99, dir);
    }
    function method_add_seek_sample__6(runtime, filename, nominal_rate, max_rate, mintrack, maxtrack, dir) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"];
        let entry = (__L0 ? __L0("floppy_sound_entry") : runtime.macro("STRUCT_OF", "floppy_sound_entry"));
        entry.type = ((2) | 0);
        entry.rate = ((nominal_rate) | 0);
        entry.maxrate = ((max_rate) | 0);
        entry.mintrack = ((mintrack) | 0);
        entry.maxtrack = ((maxtrack) | 0);
        entry.dir = ((dir) | 0);
        entry.filename = filename;
        entry.form_factor = (((members.m_current_form_factor ?? 0)) | 0);
        entry.directory = (members.m_current_dir ?? 0);
        (members.m_fulllist).push(entry);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "select": method_select,
        "set_form_factor": method_set_form_factor,
        "add_spin_sample": method_add_spin_sample,
        "get_names": method_get_names,
        "find_spin": method_find_spin,
        "find_step": method_find_step,
        "clear": method_clear,
        "get_assumed_form_factor": method_get_assumed_form_factor,
        "floppy_sound_samples::clear": method_floppy_sound_samples__clear,
        "floppy_sound_samples::get_assumed_form_factor": method_floppy_sound_samples__get_assumed_form_factor,
        "__construct": method___construct,
        "add_step_sample__2": method_add_step_sample__2,
        "add_step_sample__4": method_add_step_sample__4,
        "add_seek_sample__4": method_add_seek_sample__4,
        "add_seek_sample__6": method_add_seek_sample__6
    };
    return __methodTable;
})();
definition.children[0].definition.allocations["floppy_sound_samples"].compiledMethodLinks = ["STRUCT_OF", "std::string"];
definition.children[0].definition.allocations["floppy_sound_samples"].compiledStructMethods = {
    "fs_info": (() => {
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
        function method___construct_5(runtime, manager, type, image_size, name, description) {
            const members = runtime.members;
            members.m_manager = manager;
            members.m_type = type;
            members.m_image_size = ((image_size) >>> 0);
            members.m_name = name;
            members.m_key = ((0) >>> 0);
            members.m_description = description;
        }
        function method___construct_3(runtime, name, key, description) {
            const members = runtime.members;
            members.m_manager = 0;
            members.m_type = 0;
            members.m_image_size = ((0) >>> 0);
            members.m_name = name;
            members.m_key = ((key) >>> 0);
            members.m_description = description;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct_5": method___construct_5,
            "__construct_3": method___construct_3
        };
        return __methodTable;
    })(),
};
definition.children[0].definition.allocations["samples_iterator"].compiledMethods = (() => {
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
    function method_samples_iterator(runtime, device) {
        const members = runtime.members;
    }
    function method_altbasename(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        return (((((((((__t0 = __deref_altbasename(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names"))) && (runtime.readIndex((__t1 = __deref_altbasename(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), 0))) ? 1 : 0)) && (((Number(runtime.readIndex(runtime.readIndex((__t2 = __deref_altbasename(runtime, members.m_samples), typeof __t2.names === 'function' ? __t2.names() : typeof __t2.names === 'number' || typeof __t2.names === 'boolean' ? __t2.names : runtime.container(members.m_samples, "names")), 0), 0)) === Number(42)) ? 1 : 0))) ? 1 : 0)) ? (__addr_altbasename(runtime, runtime.readIndex((__t3 = __deref_altbasename(runtime, members.m_samples), typeof __t3.names === 'function' ? __t3.names() : typeof __t3.names === 'number' || typeof __t3.names === 'boolean' ? __t3.names : runtime.container(members.m_samples, "names")), 0), 1)) : (0));
    }
    function __addr_altbasename(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_altbasename(runtime, p) {
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
    function method_first(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4;
        if (((((((__t0 = __deref_first(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names"))) ? 0 : 1)) || (((runtime.readIndex((__t1 = __deref_first(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), 0)) ? 0 : 1))) ? 1 : 0)) {
            return 0;
        }
        members.m_current = ((0) | 0);
        if (((Number(runtime.readIndex(runtime.readIndex((__t2 = __deref_first(runtime, members.m_samples), typeof __t2.names === 'function' ? __t2.names() : typeof __t2.names === 'number' || typeof __t2.names === 'boolean' ? __t2.names : runtime.container(members.m_samples, "names")), 0), 0)) === Number(42)) ? 1 : 0)) {
            members.m_current = ((((members.m_current) + (1))) | 0);
        }
        return runtime.readIndex((__t3 = __deref_first(runtime, members.m_samples), typeof __t3.names === 'function' ? __t3.names() : typeof __t3.names === 'number' || typeof __t3.names === 'boolean' ? __t3.names : runtime.container(members.m_samples, "names")), (__t4 = (members.m_current ?? 0), members.m_current = ((((members.m_current) + (1))) | 0), __t4));
    }
    function __deref_first(runtime, p) {
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
    function method_next(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        if ((((((Number((members.m_current ?? 0)) === Number(-1)) ? 1 : 0)) || (((runtime.readIndex((__t0 = __deref_next(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names")), (members.m_current ?? 0))) ? 0 : 1))) ? 1 : 0)) {
            return 0;
        }
        return runtime.readIndex((__t1 = __deref_next(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), (__t2 = (members.m_current ?? 0), members.m_current = ((((members.m_current) + (1))) | 0), __t2));
    }
    function __deref_next(runtime, p) {
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
    function method_count(runtime) {
        const members = runtime.members;
        let save = (((members.m_current ?? 0)) | 0);
        let result = ((0) | 0);
        for (let scan = method_first(runtime); scan; scan = method_next(runtime)) {
            result = ((((result) + (1))) | 0);
        }
        members.m_current = ((save) | 0);
        return ((result) | 0);
    }
    function method_samples_iterator__samples_iterator(runtime, device) {
        const members = runtime.members;
    }
    function method_samples_iterator__altbasename(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        return (((((((((__t0 = __deref_samples_iterator__altbasename(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names"))) && (runtime.readIndex((__t1 = __deref_samples_iterator__altbasename(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), 0))) ? 1 : 0)) && (((Number(runtime.readIndex(runtime.readIndex((__t2 = __deref_samples_iterator__altbasename(runtime, members.m_samples), typeof __t2.names === 'function' ? __t2.names() : typeof __t2.names === 'number' || typeof __t2.names === 'boolean' ? __t2.names : runtime.container(members.m_samples, "names")), 0), 0)) === Number(42)) ? 1 : 0))) ? 1 : 0)) ? (__addr_samples_iterator__altbasename(runtime, runtime.readIndex((__t3 = __deref_samples_iterator__altbasename(runtime, members.m_samples), typeof __t3.names === 'function' ? __t3.names() : typeof __t3.names === 'number' || typeof __t3.names === 'boolean' ? __t3.names : runtime.container(members.m_samples, "names")), 0), 1)) : (0));
    }
    function __addr_samples_iterator__altbasename(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_samples_iterator__altbasename(runtime, p) {
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
    function method_samples_iterator__first(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4;
        if (((((((__t0 = __deref_samples_iterator__first(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names"))) ? 0 : 1)) || (((runtime.readIndex((__t1 = __deref_samples_iterator__first(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), 0)) ? 0 : 1))) ? 1 : 0)) {
            return 0;
        }
        members.m_current = ((0) | 0);
        if (((Number(runtime.readIndex(runtime.readIndex((__t2 = __deref_samples_iterator__first(runtime, members.m_samples), typeof __t2.names === 'function' ? __t2.names() : typeof __t2.names === 'number' || typeof __t2.names === 'boolean' ? __t2.names : runtime.container(members.m_samples, "names")), 0), 0)) === Number(42)) ? 1 : 0)) {
            members.m_current = ((((members.m_current) + (1))) | 0);
        }
        return runtime.readIndex((__t3 = __deref_samples_iterator__first(runtime, members.m_samples), typeof __t3.names === 'function' ? __t3.names() : typeof __t3.names === 'number' || typeof __t3.names === 'boolean' ? __t3.names : runtime.container(members.m_samples, "names")), (__t4 = (members.m_current ?? 0), members.m_current = ((((members.m_current) + (1))) | 0), __t4));
    }
    function __deref_samples_iterator__first(runtime, p) {
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
    function method_samples_iterator__next(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        if ((((((Number((members.m_current ?? 0)) === Number(-1)) ? 1 : 0)) || (((runtime.readIndex((__t0 = __deref_samples_iterator__next(runtime, members.m_samples), typeof __t0.names === 'function' ? __t0.names() : typeof __t0.names === 'number' || typeof __t0.names === 'boolean' ? __t0.names : runtime.container(members.m_samples, "names")), (members.m_current ?? 0))) ? 0 : 1))) ? 1 : 0)) {
            return 0;
        }
        return runtime.readIndex((__t1 = __deref_samples_iterator__next(runtime, members.m_samples), typeof __t1.names === 'function' ? __t1.names() : typeof __t1.names === 'number' || typeof __t1.names === 'boolean' ? __t1.names : runtime.container(members.m_samples, "names")), (__t2 = (members.m_current ?? 0), members.m_current = ((((members.m_current) + (1))) | 0), __t2));
    }
    function __deref_samples_iterator__next(runtime, p) {
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
    function method_samples_iterator__count(runtime) {
        const members = runtime.members;
        let save = (((members.m_current ?? 0)) | 0);
        let result = ((0) | 0);
        for (let scan = method_first(runtime); scan; scan = method_next(runtime)) {
            result = ((((result) + (1))) | 0);
        }
        members.m_current = ((save) | 0);
        return ((result) | 0);
    }
    function method___construct(runtime, device) {
        const members = runtime.members;
        members.m_samples = device;
        members.m_current = ((-1) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "samples_iterator": method_samples_iterator,
        "altbasename": method_altbasename,
        "first": method_first,
        "next": method_next,
        "count": method_count,
        "samples_iterator::samples_iterator": method_samples_iterator__samples_iterator,
        "samples_iterator::altbasename": method_samples_iterator__altbasename,
        "samples_iterator::first": method_samples_iterator__first,
        "samples_iterator::next": method_samples_iterator__next,
        "samples_iterator::count": method_samples_iterator__count,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.children[0].definition.allocations["samples_iterator"].compiledStructMethods = {
    "fs_info": (() => {
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
        function method___construct_5(runtime, manager, type, image_size, name, description) {
            const members = runtime.members;
            members.m_manager = manager;
            members.m_type = type;
            members.m_image_size = ((image_size) >>> 0);
            members.m_name = name;
            members.m_key = ((0) >>> 0);
            members.m_description = description;
        }
        function method___construct_3(runtime, name, key, description) {
            const members = runtime.members;
            members.m_manager = 0;
            members.m_type = 0;
            members.m_image_size = ((0) >>> 0);
            members.m_name = name;
            members.m_key = ((key) >>> 0);
            members.m_description = description;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct_5": method___construct_5,
            "__construct_3": method___construct_3
        };
        return __methodTable;
    })(),
};
definition.children[0].definition.compiledStructMethods = {
    "fs_info": (() => {
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
        const cppScratch_read_sample_buf = new Uint8Array(Math.max(0, Number(4)));
        function method___construct_5(runtime, manager, type, image_size, name, description) {
            const members = runtime.members;
            members.m_manager = manager;
            members.m_type = type;
            members.m_image_size = ((image_size) >>> 0);
            members.m_name = name;
            members.m_key = ((0) >>> 0);
            members.m_description = description;
        }
        function method___construct_3(runtime, name, key, description) {
            const members = runtime.members;
            members.m_manager = 0;
            members.m_type = 0;
            members.m_image_size = ((0) >>> 0);
            members.m_name = name;
            members.m_key = ((key) >>> 0);
            members.m_description = description;
        }
        function method_read_sample(runtime, file, sample) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["osd_printf_warning"], __L1 = __l["memcmp"];
            let __t0, __t1;
            let buf = cppScratch_read_sample_buf.fill(0);
            let offset = (((__deref_read_sample(runtime, file).read?.(buf, 4) ?? 0)) >>> 0);
            if ((((offset) < (4)) ? 1 : 0)) {
                (__L0 ? __L0("Unable to read %s, 0-byte file?\n", (__t0 = __deref_read_sample(runtime, file), typeof __t0.filename === 'function' ? __t0.filename() : typeof __t0.filename === 'number' || typeof __t0.filename === 'boolean' ? __t0.filename : runtime.container(file, "filename"))) : runtime.macro("osd_printf_warning", "Unable to read %s, 0-byte file?\n", (__t0 = __deref_read_sample(runtime, file), typeof __t0.filename === 'function' ? __t0.filename() : typeof __t0.filename === 'number' || typeof __t0.filename === 'boolean' ? __t0.filename : runtime.container(file, "filename"))));
                return 0;
            }
            if (((Number((__L1 ? __L1(__addr_read_sample(runtime, buf, 0), "RIFF", 4) : runtime.macro("memcmp", __addr_read_sample(runtime, buf, 0), "RIFF", 4))) === Number(0)) ? 1 : 0)) {
                return runtime.invoke("read_wav_sample", file, sample);
            }
            else {
                if (((Number((__L1 ? __L1(__addr_read_sample(runtime, buf, 0), "fLaC", 4) : runtime.macro("memcmp", __addr_read_sample(runtime, buf, 0), "fLaC", 4))) === Number(0)) ? 1 : 0)) {
                    return method_read_flac_sample(runtime, file, sample);
                }
            }
            (__L0 ? __L0("Unable to read %s, corrupt file?\n", (__t1 = __deref_read_sample(runtime, file), typeof __t1.filename === 'function' ? __t1.filename() : typeof __t1.filename === 'number' || typeof __t1.filename === 'boolean' ? __t1.filename : runtime.container(file, "filename"))) : runtime.macro("osd_printf_warning", "Unable to read %s, corrupt file?\n", (__t1 = __deref_read_sample(runtime, file), typeof __t1.filename === 'function' ? __t1.filename() : typeof __t1.filename === 'number' || typeof __t1.filename === 'boolean' ? __t1.filename : runtime.container(file, "filename"))));
            return 0;
        }
        function __addr_read_sample(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_read_sample(runtime, p) {
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
        function method_little_endianize_int32(runtime, x) {
            const members = runtime.members;
            return ((x) >>> 0);
        }
        function method_little_endianize_int16(runtime, x) {
            const members = runtime.members;
            x = ((x) & 0xffff);
            return ((x) & 0xffff);
        }
        function method_read_flac_sample(runtime, file, sample) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["flac_decoder"];
            let __t0, __t1, __t2, __t3, __t4;
            (__deref_read_flac_sample(runtime, file).seek?.(0, 0) ?? 0);
            let decoder = (__L0 ? __L0(file) : runtime.macro("flac_decoder", file));
            sample.frequency = (((__t0 = __deref_read_flac_sample(runtime, decoder), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(decoder, "sample_rate"))) >>> 0);
            if (((Number((__t1 = __deref_read_flac_sample(runtime, decoder), typeof __t1.channels === 'function' ? __t1.channels() : typeof __t1.channels === 'number' || typeof __t1.channels === 'boolean' ? __t1.channels : runtime.container(decoder, "channels"))) !== Number(1)) ? 1 : 0)) {
                return 0;
            }
            if (((Number((__t2 = __deref_read_flac_sample(runtime, decoder), typeof __t2.bits_per_sample === 'function' ? __t2.bits_per_sample() : typeof __t2.bits_per_sample === 'number' || typeof __t2.bits_per_sample === 'boolean' ? __t2.bits_per_sample : runtime.container(decoder, "bits_per_sample"))) !== Number(16)) ? 1 : 0)) {
                return 0;
            }
            runtime.resize(sample.data, (__t3 = __deref_read_flac_sample(runtime, decoder), typeof __t3.total_samples === 'function' ? __t3.total_samples() : typeof __t3.total_samples === 'number' || typeof __t3.total_samples === 'boolean' ? __t3.total_samples : runtime.container(decoder, "total_samples")));
            if ((((__deref_read_flac_sample(runtime, decoder).decode_interleaved?.(__addr_read_flac_sample(runtime, sample.data, 0), (sample.data).length) ?? 0)) ? 0 : 1)) {
                return 0;
            }
            (__t4 = __deref_read_flac_sample(runtime, decoder), typeof __t4.finish === 'function' ? __t4.finish() : typeof __t4.finish === 'number' || typeof __t4.finish === 'boolean' ? __t4.finish : runtime.container(decoder, "finish"));
            return 1;
        }
        function __addr_read_flac_sample(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_read_flac_sample(runtime, p) {
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
            "__construct_5": method___construct_5,
            "__construct_3": method___construct_3,
            "read_sample": method_read_sample,
            "little_endianize_int32": method_little_endianize_int32,
            "little_endianize_int16": method_little_endianize_int16,
            "read_flac_sample": method_read_flac_sample
        };
        return __methodTable;
    })(),
};
definition.floppyFormats[0].definition.compiledMethods = (() => {
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
    const __mame_table_0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 1, 0, 12, 4, 5, 0, 0, 2, 3, 0, 15, 6, 7, 0, 9, 10, 11, 0, 13, 14, 0];
    const __mame_table_1 = [10, 11, 18, 19, 14, 15, 22, 23, 9, 25, 26, 27, 13, 29, 30, 21];
    const __mame_table_2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 3, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 9, 10, 11, 12, 13, 0, 0, 14, 15, 16, 17, 18, 19, 0, 20, 21, 22, 23, 24, 25, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 28, 29, 30, 0, 0, 0, 31, 0, 0, 32, 33, 0, 34, 35, 36, 37, 38, 39, 40, 0, 0, 0, 0, 0, 41, 42, 43, 0, 44, 45, 46, 47, 48, 49, 50, 0, 0, 51, 52, 53, 54, 55, 56, 0, 57, 58, 59, 60, 61, 62, 63];
    const __mame_table_3 = [150, 151, 154, 155, 157, 158, 159, 166, 167, 171, 172, 173, 174, 175, 178, 179, 180, 181, 182, 183, 185, 186, 187, 188, 189, 190, 191, 203, 205, 206, 207, 211, 214, 215, 217, 218, 219, 220, 221, 222, 223, 229, 230, 231, 233, 234, 235, 236, 237, 238, 239, 242, 243, 244, 245, 246, 247, 249, 250, 251, 252, 253, 254, 255];
    const __mame_table_4 = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const __mame_table_5 = [4000, 3750, 3500, 3250];
    const __mame_table_6 = [21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 19, 19, 19, 19, 19, 19, 19, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17];
    function cppStruct_type_p1_p2(a0, a1, a2) { this["type"] = a0; this["p1"] = a1; this["p2"] = a2; }
    cppStruct_type_p1_p2.prototype = cppStructPrototype;
    const cppScratch_load___inline2_id = new Uint8Array(Math.max(0, Number(2)));
    function method_type_no_data(runtime, type) {
        const members = runtime.members;
        return (((((((((((((((((((((((((((((((((((Number(type) === Number(46)) ? 1 : 0)) || (((Number(type) === Number(47)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(48)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(49)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(50)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(51)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(52)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(53)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(54)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(56)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(57)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(0)) ? 1 : 0))) ? 1 : 0);
    }
    function method_type_data_mfm(runtime, type, p1, crcs) {
        const members = runtime.members;
        const __pointee_crcs = __deref_type_data_mfm(runtime, crcs);
        return (((((((((((((((((((((((((((((((((((((((((((((((((((((Number(type) === Number(2)) ? 1 : 0)) || (((Number(type) === Number(3)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(10)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(17)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(19)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(21)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(26)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(29)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(30)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(31)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(33)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(34)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(35)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(36)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(37)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(39)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(40)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(type) === Number(55)) ? 1 : 0)) && ((((((Number(runtime.readIndex(crcs, p1).type) === Number(3)) ? 1 : 0)) || (((Number(runtime.readIndex(crcs, p1).type) === Number(1)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0);
    }
    function __deref_type_data_mfm(runtime, p) {
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
    function method_collect_crcs(runtime, desc, crcs) {
        const members = runtime.members;
        const __pointee_desc = __deref_collect_crcs(runtime, desc);
        const __pointee_crcs = __deref_collect_crcs(runtime, crcs);
        cppMemset(runtime, crcs, 0, ((64) * (((__deref_collect_crcs(runtime, crcs))?.byteLength ?? 1))));
        for (let i = ((0) | 0); ((Number(i) !== Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.readIndex(crcs, i).write = ((-1) | 0);
        }
        for (let i = ((0) | 0); ((Number(runtime.readIndex(desc, i).type) !== Number(0)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            switch (runtime.readIndex(desc, i).type) {
                case 46:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((3) | 0);
                        break;
                    }
                case 47:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((4) | 0);
                        break;
                    }
                case 48:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((1) | 0);
                        break;
                    }
                case 49:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((2) | 0);
                        break;
                    }
                case 50:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((5) | 0);
                        break;
                    }
                case 51:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((6) | 0);
                        break;
                    }
                case 52:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((7) | 0);
                        break;
                    }
                case 53:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((8) | 0);
                        break;
                    }
            }
        }
        for (let i = ((0) | 0); ((Number(runtime.readIndex(desc, i).type) !== Number(0)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((Number(runtime.readIndex(desc, i).type) === Number(55)) ? 1 : 0)) {
                let j = ((0) | 0);
                for (j = ((((i) + (1))) | 0); (((((Number(runtime.readIndex(desc, j).type) !== Number(0)) ? 1 : 0)) && (method_type_no_data(runtime, runtime.readIndex(desc, j).type))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                }
                runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).fixup_mfm_clock = ((method_type_data_mfm(runtime, runtime.readIndex(desc, j).type, runtime.readIndex(desc, j).p1, crcs)) ? 1 : 0);
            }
        }
    }
    function __deref_collect_crcs(runtime, p) {
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
    function method_crc_cells_size(runtime, type) {
        const members = runtime.members;
        switch (type) {
            case 3:
                {
                    return ((32) | 0);
                }
            case 4:
                {
                    return ((32) | 0);
                }
            case 1:
                {
                    return ((64) | 0);
                }
            case 2:
                {
                    return ((10) | 0);
                }
            case 5:
                {
                    return ((8) | 0);
                }
            case 6:
                {
                    return ((20) | 0);
                }
            case 7:
                {
                    return ((10) | 0);
                }
            case 8:
                {
                    return ((20) | 0);
                }
            default:
                {
                    return ((0) | 0);
                }
        }
    }
    function method_bit_r(runtime, buffer, offset) {
        const members = runtime.members;
        return ((Number(((runtime.readIndex(buffer, offset)) & (4026531840))) === Number(1342177280)) ? 1 : 0);
    }
    function method_bitn_r(runtime, buffer, offset, count) {
        const members = runtime.members;
        let r = ((0) >>> 0);
        for (let i = ((0) | 0); (((i) < (count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            r = ((((((r) << (1))) | (((method_bit_r(runtime, buffer, ((offset) + (i)))) >>> 0)))) >>> 0);
        }
        return ((r) >>> 0);
    }
    function method_mfm_half_w(runtime, buffer, start_bit, val, size = 1000) {
        const members = runtime.members;
        let prec = ((((((buffer).length === 0 ? 1 : 0)) ? (0) : (method_bit_r(runtime, buffer, runtime.subtract((buffer).length, 1))))) | 0);
        for (let i = ((start_bit) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (2))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__3(runtime, buffer, (((((prec) || (bit)) ? 1 : 0)) ? 0 : 1), size);
            method_bit_w__3(runtime, buffer, bit, size);
            prec = ((bit) | 0);
        }
    }
    function method_bit_w__3(runtime, buffer, val, size = 1000) {
        const members = runtime.members;
        (buffer).push(((((val) ? (1342177280) : (1073741824))) | (size)));
    }
    function method__8n1_w(runtime, buffer, n, val, size = 1000) {
        const members = runtime.members;
        method_bit_w__3(runtime, buffer, 0, size);
        for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__3(runtime, buffer, bit, size);
        }
        method_bit_w__3(runtime, buffer, 1, size);
    }
    function method_fixup_crc_amiga(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = __deref_fixup_crc_amiga(runtime, crc);
        let res = ((0) & 0xffff);
        let size = ((((__pointee_crc.end) - (__pointee_crc.start))) | 0);
        for (let i = ((1) | 0); (((i) < (size)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
            if (method_bit_r(runtime, buffer, ((__pointee_crc.start) + (i)))) {
                res = ((((res) ^ (runtime.shiftRight(32768, ((runtime.shiftRight(i, 1)) & (15)))))) & 0xffff);
            }
        }
        method_mfm_w__5(runtime, buffer, 16, 0, 1000, __pointee_crc.write);
        method_mfm_w__5(runtime, buffer, 16, res, 1000, ((__pointee_crc.write) + (32)));
    }
    function __deref_fixup_crc_amiga(runtime, p) {
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
    function method_mfm_w__5(runtime, buffer, n, val, size, offset) {
        const members = runtime.members;
        let __t0, __t1;
        let prec = ((((offset) ? (method_bit_r(runtime, buffer, ((offset) - (1)))) : (0))) | 0);
        for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__4(runtime, buffer, (((((prec) || (bit)) ? 1 : 0)) ? 0 : 1), size, (__t0 = offset, offset = ((((offset) + (1))) | 0), __t0));
            method_bit_w__4(runtime, buffer, bit, size, (__t1 = offset, offset = ((((offset) + (1))) | 0), __t1));
            prec = ((bit) | 0);
        }
    }
    function method_bit_w__4(runtime, buffer, val, size, offset) {
        const members = runtime.members;
        runtime.writeIndex(buffer, offset, ((((val) ? (1342177280) : (1073741824))) | (size)));
    }
    function method_fixup_crc_cbm(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = __deref_fixup_crc_cbm(runtime, crc);
        let v = ((0) & 0xff);
        for (let o = ((__pointee_crc.start) | 0); (((o) < (__pointee_crc.end)) ? 1 : 0); o = ((((o) + (10))) | 0)) {
            v = ((((v) ^ ((((__mame_table_0[(((method_bitn_r(runtime, buffer, o, 5)) % 32) + 32) % 32] ?? 0)) << (4))))) & 0xff);
            v = ((((v) ^ ((__mame_table_0[(((method_bitn_r(runtime, buffer, ((o) + (5)), 5)) % 32) + 32) % 32] ?? 0)))) & 0xff);
        }
        method_gcr5_w__4(runtime, buffer, v, 1000, __pointee_crc.write);
    }
    function __deref_fixup_crc_cbm(runtime, p) {
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
    function method_gcr5_w__4(runtime, buffer, val, size, offset) {
        const members = runtime.members;
        val = ((val) & 0xff);
        let e0 = (((__mame_table_1[(((((val) >>> (4))) % 16) + 16) % 16] ?? 0)) >>> 0);
        let e1 = (((__mame_table_1[(((((val) & (15))) % 16) + 16) % 16] ?? 0)) >>> 0);
        method_raw_w__5(runtime, buffer, 5, e0, size, offset);
        method_raw_w__5(runtime, buffer, 5, e1, size, ((offset) + (5)));
    }
    function method_raw_w__5(runtime, buffer, n, val, size, offset) {
        const members = runtime.members;
        let __t0;
        for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            method_bit_w__4(runtime, buffer, ((((val) >>> (i))) & (1)), size, (__t0 = offset, offset = ((((offset) + (1))) | 0), __t0));
        }
    }
    function method_calc_crc_ccitt(runtime, buffer, start, end) {
        const members = runtime.members;
        let res = ((65535) >>> 0);
        let size = ((((end) - (start))) | 0);
        for (let i = ((1) | 0); (((i) < (size)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
            res = ((((res) << (1))) >>> 0);
            if (method_bit_r(runtime, buffer, ((start) + (i)))) {
                res = ((((res) ^ (65536))) >>> 0);
            }
            if (((res) & (65536))) {
                res = ((((res) ^ (69665))) >>> 0);
            }
        }
        return ((res) & 0xffff);
    }
    function method_fixup_crc_ccitt(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = __deref_fixup_crc_ccitt(runtime, crc);
        method_mfm_w__5(runtime, buffer, 16, method_calc_crc_ccitt(runtime, buffer, __pointee_crc.start, __pointee_crc.end), 1000, __pointee_crc.write);
    }
    function __deref_fixup_crc_ccitt(runtime, p) {
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
    function method_fixup_crc_ccitt_fm(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = __deref_fixup_crc_ccitt_fm(runtime, crc);
        method_fm_w__5(runtime, buffer, 16, method_calc_crc_ccitt(runtime, buffer, __pointee_crc.start, __pointee_crc.end), 1000, __pointee_crc.write);
    }
    function __deref_fixup_crc_ccitt_fm(runtime, p) {
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
    function method_fm_w__5(runtime, buffer, n, val, size, offset) {
        const members = runtime.members;
        let __t0, __t1;
        for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__4(runtime, buffer, 1, size, (__t0 = offset, offset = ((((offset) + (1))) | 0), __t0));
            method_bit_w__4(runtime, buffer, bit, size, (__t1 = offset, offset = ((((offset) + (1))) | 0), __t1));
        }
    }
    function method_fixup_crc_machead(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = __deref_fixup_crc_machead(runtime, crc);
        let v = ((0) & 0xff);
        for (let o = ((__pointee_crc.start) | 0); (((o) < (__pointee_crc.end)) ? 1 : 0); o = ((((o) + (8))) | 0)) {
            v = ((((v) ^ ((__mame_table_2[(((method_bitn_r(runtime, buffer, o, 8)) % 256) + 256) % 256] ?? 0)))) & 0xff);
        }
        method_raw_w__5(runtime, buffer, 8, (__mame_table_3[((v) & 63)] ?? 0), 1000, __pointee_crc.write);
    }
    function __deref_fixup_crc_machead(runtime, p) {
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
    function method_fixup_crc_fcs(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = __deref_fixup_crc_fcs(runtime, crc);
    }
    function __deref_fixup_crc_fcs(runtime, p) {
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
    function method_fixup_crc_victor_header(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = __deref_fixup_crc_victor_header(runtime, crc);
        let v = ((0) & 0xff);
        for (let o = ((__pointee_crc.start) | 0); (((o) < (__pointee_crc.end)) ? 1 : 0); o = ((((o) + (10))) | 0)) {
            v = ((((v) + ((((((__mame_table_0[(((method_bitn_r(runtime, buffer, o, 5)) % 32) + 32) % 32] ?? 0)) << (4))) | ((__mame_table_0[(((method_bitn_r(runtime, buffer, ((o) + (5)), 5)) % 32) + 32) % 32] ?? 0)))))) & 0xff);
        }
        method_gcr5_w__4(runtime, buffer, v, 1000, __pointee_crc.write);
    }
    function __deref_fixup_crc_victor_header(runtime, p) {
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
    function method_fixup_crc_victor_data(runtime, buffer, crc) {
        const members = runtime.members;
        const __pointee_crc = __deref_fixup_crc_victor_data(runtime, crc);
        let v = ((0) & 0xffff);
        for (let o = ((__pointee_crc.start) | 0); (((o) < (__pointee_crc.end)) ? 1 : 0); o = ((((o) + (10))) | 0)) {
            v = ((((v) + ((((((__mame_table_0[(((method_bitn_r(runtime, buffer, o, 5)) % 32) + 32) % 32] ?? 0)) << (4))) | ((__mame_table_0[(((method_bitn_r(runtime, buffer, ((o) + (5)), 5)) % 32) + 32) % 32] ?? 0)))))) & 0xffff);
        }
        method_gcr5_w__4(runtime, buffer, ((v) & (255)), 1000, __pointee_crc.write);
        method_gcr5_w__4(runtime, buffer, ((v) >>> (8)), 1000, ((__pointee_crc.write) + (10)));
    }
    function __deref_fixup_crc_victor_data(runtime, p) {
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
    function method_fixup_crcs(runtime, buffer, crcs) {
        const members = runtime.members;
        const __pointee_crcs = __deref_fixup_crcs(runtime, crcs);
        for (let i = ((0) | 0); ((Number(i) !== Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((Number(runtime.readIndex(crcs, i).write) !== Number(-1)) ? 1 : 0)) {
                switch (runtime.readIndex(crcs, i).type) {
                    case 1:
                        {
                            method_fixup_crc_amiga(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                            break;
                        }
                    case 2:
                        {
                            method_fixup_crc_cbm(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                            break;
                        }
                    case 3:
                        {
                            method_fixup_crc_ccitt(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                            break;
                        }
                    case 4:
                        {
                            method_fixup_crc_ccitt_fm(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                            break;
                        }
                    case 5:
                        {
                            method_fixup_crc_machead(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                            break;
                        }
                    case 6:
                        {
                            method_fixup_crc_fcs(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                            break;
                        }
                    case 7:
                        {
                            method_fixup_crc_victor_header(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                            break;
                        }
                    case 8:
                        {
                            method_fixup_crc_victor_data(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                            break;
                        }
                }
                if (runtime.readIndex(crcs, i).fixup_mfm_clock) {
                    let offset = ((((runtime.readIndex(crcs, i).write) + (method_crc_cells_size(runtime, runtime.readIndex(crcs, i).type)))) | 0);
                    method_bit_w__4(runtime, buffer, (((((((offset) ? (method_bit_r(runtime, buffer, ((offset) - (1)))) : (0))) || (method_bit_r(runtime, buffer, ((offset) + (1))))) ? 1 : 0)) ? 0 : 1), 1000, offset);
                }
                runtime.readIndex(crcs, i).write = ((-1) | 0);
            }
        }
    }
    function __addr_fixup_crcs(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_fixup_crcs(runtime, p) {
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
    function method_gcr6_encode(runtime, va, vb, vc) {
        const members = runtime.members;
        va = ((va) & 0xff);
        vb = ((vb) & 0xff);
        vc = ((vc) & 0xff);
        let r = ((0) >>> 0);
        r = (((((__mame_table_3[(((((((((((va) >>> (2))) & (48))) | (((((vb) >>> (4))) & (12))))) | (((((vc) >>> (6))) & (3))))) % 64) + 64) % 64] ?? 0)) << (24))) >>> 0);
        r = ((((r) | ((((__mame_table_3[(((((va) & (63))) % 64) + 64) % 64] ?? 0)) << (16))))) >>> 0);
        r = ((((r) | ((((__mame_table_3[(((((vb) & (63))) % 64) + 64) % 64] ?? 0)) << (8))))) >>> 0);
        r = ((((r) | ((__mame_table_3[(((((vc) & (63))) % 64) + 64) % 64] ?? 0)))) >>> 0);
        return ((r) >>> 0);
    }
    function method_calc_sector_index(runtime, num, interleave, skew, total_sectors, track_head) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["util::string_format"], __L1 = __l["std::invalid_argument"], __L2 = __l["__throw"];
        let i = ((0) | 0);
        let sec = ((0) | 0);
        while ((((i) !== (num)) ? 1 : 0)) {
            i = ((((i) + (1))) | 0);
            i = ((((i) + (interleave))) | 0);
            i = ((((i) % (total_sectors))) | 0);
            sec = ((((sec) + (1))) | 0);
            if ((((sec) > (total_sectors)) ? 1 : 0)) {
                (__L2 ? __L2((__L1 ? __L1((__L0 ? __L0("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))) : runtime.macro("std::invalid_argument", (__L0 ? __L0("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))))) : runtime.macro("__throw", (__L1 ? __L1((__L0 ? __L0("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))) : runtime.macro("std::invalid_argument", (__L0 ? __L0("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))))));
            }
        }
        sec = ((((sec) - (((track_head) * (skew))))) | 0);
        sec = ((((sec) % (total_sectors))) | 0);
        if ((((sec) < (0)) ? 1 : 0)) {
            sec = ((((sec) + (total_sectors))) | 0);
        }
        return ((sec) | 0);
    }
    function method_generate_track(runtime, desc, track, head, sect, sect_count, track_size, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_ARRAY_OF"], __L1 = __l["util::string_format"], __L2 = __l["std::invalid_argument"], __L3 = __l["__throw"];
        const __pointee_desc = __deref_generate_track(runtime, desc);
        const __pointee_sect = __deref_generate_track(runtime, sect);
        let buffer = [];
        let crcs = (__L0 ? __L0(64, "gen_crc_info") : runtime.macro("STRUCT_ARRAY_OF", 64, "gen_crc_info"));
        method_collect_crcs(runtime, desc, crcs);
        let index = ((0) | 0);
        let sector_loop_start = ((0) | 0);
        let sector_idx = ((0) | 0);
        let sector_cnt = ((0) | 0);
        let sector_limit = ((0) | 0);
        let sector_interleave = ((0) | 0);
        let sector_skew = ((0) | 0);
        while (((Number(runtime.readIndex(desc, index).type) !== Number(0)) ? 1 : 0)) {
            switch (runtime.readIndex(desc, index).type) {
                case 1:
                    {
                        for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_fm_w__4(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 2:
                    {
                        for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_mfm_w__4(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 3:
                    {
                        method_mfm_w__4(runtime, buffer, runtime.readIndex(desc, index).p2, runtime.readIndex(desc, index).p1);
                        break;
                    }
                case 4:
                    {
                        for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_gcr5_w__3(runtime, buffer, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 5:
                    {
                        for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method__8n1_w(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 6:
                    {
                        for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_raw_w__4(runtime, buffer, 16, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 7:
                    {
                        for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_raw_w__4(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                        }
                        break;
                    }
                case 8:
                    {
                        method_raw_w__4(runtime, buffer, runtime.readIndex(desc, index).p2, runtime.readIndex(desc, index).p1);
                        break;
                    }
                case 9:
                    {
                        for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p1)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_raw_w__4(runtime, buffer, 10, 65535);
                        }
                        break;
                    }
                case 10:
                    {
                        method_mfm_w__4(runtime, buffer, 8, track);
                        break;
                    }
                case 11:
                    {
                        method_fm_w__4(runtime, buffer, 8, track);
                        break;
                    }
                case 12:
                    {
                        method_gcr5_w__3(runtime, buffer, __add_generate_track(runtime, __add_generate_track(runtime, 1, runtime.shiftRight(track, 1)), ((head) * (35))));
                        break;
                    }
                case 13:
                    {
                        method_gcr5_w__3(runtime, buffer, __add_generate_track(runtime, ((1) + (track)), ((head) * (77))));
                        break;
                    }
                case 14:
                    {
                        method_raw_w__4(runtime, buffer, 8, (__mame_table_3[(((((track) & (63))) % 64) + 64) % 64] ?? 0));
                        break;
                    }
                case 15:
                    {
                        method__8n1_w(runtime, buffer, 8, track);
                        break;
                    }
                case 16:
                    {
                        method_gcr5_w__3(runtime, buffer, ((track) + (((head) * (128)))));
                        break;
                    }
                case 17:
                    {
                        method_mfm_w__4(runtime, buffer, 8, head);
                        break;
                    }
                case 18:
                    {
                        method_fm_w__4(runtime, buffer, 8, head);
                        break;
                    }
                case 19:
                    {
                        method_mfm_w__4(runtime, buffer, 8, ((head) ? 0 : 1));
                        break;
                    }
                case 20:
                    {
                        method_raw_w__4(runtime, buffer, 8, (__mame_table_3[(((((((((track) & (64))) ? (1) : (0))) | (((head) ? (32) : (0))))) % 64) + 64) % 64] ?? 0));
                        break;
                    }
                case 21:
                    {
                        method_mfm_w__4(runtime, buffer, 8, runtime.readIndex(sect, sector_idx).sector_id);
                        break;
                    }
                case 22:
                    {
                        method_fm_w__4(runtime, buffer, 8, runtime.readIndex(sect, sector_idx).sector_id);
                        break;
                    }
                case 23:
                    {
                        method_gcr5_w__3(runtime, buffer, runtime.readIndex(sect, sector_idx).sector_id);
                        break;
                    }
                case 24:
                    {
                        method_raw_w__4(runtime, buffer, 8, (__mame_table_3[((runtime.readIndex(sect, sector_idx).sector_id) & 63)] ?? 0));
                        break;
                    }
                case 25:
                    {
                        method__8n1_w(runtime, buffer, 8, runtime.readIndex(sect, sector_idx).sector_id);
                        break;
                    }
                case 26:
                    {
                        let size = ((runtime.readIndex(sect, sector_idx).size) | 0);
                        let id = ((0) | 0);
                        for (id = ((0) | 0); (((size) > (128)) ? 1 : 0); size = ((((size) >> (1))) | 0), id = ((((id) + (1))) | 0)) {
                        }
                        method_mfm_w__4(runtime, buffer, 8, id);
                        break;
                    }
                case 27:
                    {
                        let size__1 = ((runtime.readIndex(sect, sector_idx).size) | 0);
                        let id__1 = ((0) | 0);
                        for (id__1 = ((0) | 0); (((size__1) > (128)) ? 1 : 0); size__1 = ((((size__1) >> (1))) | 0), id__1 = ((((id__1) + (1))) | 0)) {
                        }
                        method_fm_w__4(runtime, buffer, 8, id__1);
                        break;
                    }
                case 28:
                    {
                        method_raw_w__4(runtime, buffer, 8, (__mame_table_3[((runtime.readIndex(sect, sector_idx).sector_info) & 63)] ?? 0));
                        break;
                    }
                case 29:
                    {
                        method_mfm_half_w(runtime, buffer, 7, ((((track) * (2))) + (head)));
                        break;
                    }
                case 30:
                    {
                        method_mfm_half_w(runtime, buffer, 6, ((((track) * (2))) + (head)));
                        break;
                    }
                case 31:
                    {
                        method_fm_w__4(runtime, buffer, 8, ((((track) * (2))) + (head)));
                        break;
                    }
                case 32:
                    {
                        method_mfm_w__4(runtime, buffer, 8, ((((track) * (2))) + (head)));
                        break;
                    }
                case 33:
                    {
                        method_mfm_half_w(runtime, buffer, 7, sector_idx);
                        break;
                    }
                case 34:
                    {
                        method_mfm_half_w(runtime, buffer, 6, sector_idx);
                        break;
                    }
                case 35:
                    {
                        method_mfm_half_w(runtime, buffer, 7, ((runtime.readIndex(desc, index).p1) - (sector_idx)));
                        break;
                    }
                case 36:
                    {
                        method_mfm_half_w(runtime, buffer, 6, ((runtime.readIndex(desc, index).p1) - (sector_idx)));
                        break;
                    }
                case 56:
                    {
                        method_fixup_crcs(runtime, buffer, crcs);
                        sector_loop_start = ((index) | 0);
                        sector_idx = ((runtime.readIndex(desc, index).p1) | 0);
                        sector_cnt = ((sector_idx) | 0);
                        sector_limit = ((((((Number(runtime.readIndex(desc, index).p2) === Number(-1)) ? 1 : 0)) ? (((((sector_idx) + (sect_count))) - (1))) : (runtime.readIndex(desc, index).p2))) | 0);
                        sector_idx = ((method_calc_sector_index(runtime, sector_cnt, sector_interleave, sector_skew, ((sector_limit) + (1)), ((((track) * (2))) + (head)))) | 0);
                        break;
                    }
                case 57:
                    {
                        method_fixup_crcs(runtime, buffer, crcs);
                        if ((((sector_cnt) < (sector_limit)) ? 1 : 0)) {
                            sector_cnt = ((((sector_cnt) + (1))) | 0);
                            sector_idx = ((method_calc_sector_index(runtime, sector_cnt, sector_interleave, sector_skew, ((sector_limit) + (1)), ((((track) * (2))) + (head)))) | 0);
                            index = ((sector_loop_start) | 0);
                        }
                        break;
                    }
                case 58:
                    {
                        sector_interleave = ((runtime.readIndex(desc, index).p1) | 0);
                        sector_skew = ((runtime.readIndex(desc, index).p2) | 0);
                        break;
                    }
                case 48:
                case 49:
                case 46:
                case 47:
                case 50:
                case 51:
                case 52:
                case 53:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).start = (((buffer).length) | 0);
                        break;
                    }
                case 54:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).end = (((buffer).length) | 0);
                        break;
                    }
                case 55:
                    {
                        runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).write = (((buffer).length) | 0);
                        (buffer = runtime.resize(buffer, __add_generate_track(runtime, (buffer).length, method_crc_cells_size(runtime, runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).type))));
                        break;
                    }
                case 37:
                    {
                        let csect = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let csect$s = undefined, csect$o = 0;
                        if (ArrayBuffer.isView(csect) || Array.isArray(csect))
                            csect$s = csect;
                        else if (csect !== null && typeof csect === 'object' && csect.generatedPointer === true && csect.path === undefined && csect.target === undefined && (ArrayBuffer.isView(csect.source) || Array.isArray(csect.source))) {
                            csect$s = csect.source;
                            csect$o = csect.offset;
                        }
                        for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_mfm_w__4(runtime, buffer, 8, runtime.readIndex(__deref_generate_track(runtime, csect).data, i));
                        }
                        break;
                    }
                case 38:
                    {
                        let csect__1 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let csect__1$s = undefined, csect__1$o = 0;
                        if (ArrayBuffer.isView(csect__1) || Array.isArray(csect__1))
                            csect__1$s = csect__1;
                        else if (csect__1 !== null && typeof csect__1 === 'object' && csect__1.generatedPointer === true && csect__1.path === undefined && csect__1.target === undefined && (ArrayBuffer.isView(csect__1.source) || Array.isArray(csect__1.source))) {
                            csect__1$s = csect__1.source;
                            csect__1$o = csect__1.offset;
                        }
                        for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__1).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_fm_w__4(runtime, buffer, 8, runtime.readIndex(__deref_generate_track(runtime, csect__1).data, i));
                        }
                        break;
                    }
                case 39:
                    {
                        let csect__2 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let csect__2$s = undefined, csect__2$o = 0;
                        if (ArrayBuffer.isView(csect__2) || Array.isArray(csect__2))
                            csect__2$s = csect__2;
                        else if (csect__2 !== null && typeof csect__2 === 'object' && csect__2.generatedPointer === true && csect__2.path === undefined && csect__2.target === undefined && (ArrayBuffer.isView(csect__2.source) || Array.isArray(csect__2.source))) {
                            csect__2$s = csect__2.source;
                            csect__2$o = csect__2.offset;
                        }
                        for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__2).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_mfm_half_w(runtime, buffer, 7, runtime.readIndex(__deref_generate_track(runtime, csect__2).data, i));
                        }
                        break;
                    }
                case 40:
                    {
                        let csect__3 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let csect__3$s = undefined, csect__3$o = 0;
                        if (ArrayBuffer.isView(csect__3) || Array.isArray(csect__3))
                            csect__3$s = csect__3;
                        else if (csect__3 !== null && typeof csect__3 === 'object' && csect__3.generatedPointer === true && csect__3.path === undefined && csect__3.target === undefined && (ArrayBuffer.isView(csect__3.source) || Array.isArray(csect__3.source))) {
                            csect__3$s = csect__3.source;
                            csect__3$o = csect__3.offset;
                        }
                        for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__3).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_mfm_half_w(runtime, buffer, 6, runtime.readIndex(__deref_generate_track(runtime, csect__3).data, i));
                        }
                        break;
                    }
                case 41:
                    {
                        let csect__4 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let csect__4$s = undefined, csect__4$o = 0;
                        if (ArrayBuffer.isView(csect__4) || Array.isArray(csect__4))
                            csect__4$s = csect__4;
                        else if (csect__4 !== null && typeof csect__4 === 'object' && csect__4.generatedPointer === true && csect__4.path === undefined && csect__4.target === undefined && (ArrayBuffer.isView(csect__4.source) || Array.isArray(csect__4.source))) {
                            csect__4$s = csect__4.source;
                            csect__4$o = csect__4.offset;
                        }
                        for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__4).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method_gcr5_w__3(runtime, buffer, runtime.readIndex(__deref_generate_track(runtime, csect__4).data, i));
                        }
                        break;
                    }
                case 42:
                    {
                        let csect__5 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let csect__5$s = undefined, csect__5$o = 0;
                        if (ArrayBuffer.isView(csect__5) || Array.isArray(csect__5))
                            csect__5$s = csect__5;
                        else if (csect__5 !== null && typeof csect__5 === 'object' && csect__5.generatedPointer === true && csect__5.path === undefined && csect__5.target === undefined && (ArrayBuffer.isView(csect__5.source) || Array.isArray(csect__5.source))) {
                            csect__5$s = csect__5.source;
                            csect__5$o = csect__5.offset;
                        }
                        let data = __deref_generate_track(runtime, csect__5).data;
                        let data$s = undefined, data$o = 0;
                        if (ArrayBuffer.isView(data) || Array.isArray(data))
                            data$s = data;
                        else if (data !== null && typeof data === 'object' && data.generatedPointer === true && data.path === undefined && data.target === undefined && (ArrayBuffer.isView(data.source) || Array.isArray(data.source))) {
                            data$s = data.source;
                            data$o = data.offset;
                        }
                        let size__2 = ((__deref_generate_track(runtime, csect__5).size) | 0);
                        let ca = ((0) & 0xff);
                        let cb = ((0) & 0xff);
                        let cc = ((0) & 0xff);
                        for (let i = ((0) | 0); (((i) < (size__2)) ? 1 : 0); i = ((((i) + (3))) | 0)) {
                            let dt = ((((size__2) - (i))) | 0);
                            let va = (((data$s !== undefined ? (data$s[data$o + (i)] ?? 0) : runtime.readIndex(data, i))) & 0xff);
                            let vb = (((((((dt) > (1)) ? 1 : 0)) ? ((data$s !== undefined ? (data$s[data$o + (((i) + (1)))] ?? 0) : runtime.readIndex(data, ((i) + (1))))) : (0))) & 0xff);
                            let vc = (((((((dt) > (2)) ? 1 : 0)) ? ((data$s !== undefined ? (data$s[data$o + (((i) + (2)))] ?? 0) : runtime.readIndex(data, ((i) + (2))))) : (0))) & 0xff);
                            cc = ((((((cc) << (1))) | (((cc) >>> (7))))) & 0xff);
                            let suma = ((__add_generate_track(runtime, ((ca) + (va)), ((cc) & (1)))) | 0);
                            ca = ((suma) & 0xff);
                            va = ((((va) ^ (cc))) & 0xff);
                            let sumb = ((__add_generate_track(runtime, ((cb) + (vb)), runtime.shiftRight(suma, 8))) | 0);
                            cb = ((sumb) & 0xff);
                            vb = ((((vb) ^ (ca))) & 0xff);
                            cc = ((__add_generate_track(runtime, ((cc) + (vc)), runtime.shiftRight(sumb, 8))) & 0xff);
                            vc = ((((vc) ^ (cb))) & 0xff);
                            let nb = (((((((dt) > (2)) ? 1 : 0)) ? (32) : ((((((dt) > (1)) ? 1 : 0)) ? (24) : (16))))) | 0);
                            method_raw_w__4(runtime, buffer, nb, runtime.shiftRight(method_gcr6_encode(runtime, va, vb, vc), ((32) - (nb))));
                        }
                        method_raw_w__4(runtime, buffer, 32, method_gcr6_encode(runtime, ca, cb, cc));
                        break;
                    }
                case 43:
                    {
                        let csect__6 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let csect__6$s = undefined, csect__6$o = 0;
                        if (ArrayBuffer.isView(csect__6) || Array.isArray(csect__6))
                            csect__6$s = csect__6;
                        else if (csect__6 !== null && typeof csect__6 === 'object' && csect__6.generatedPointer === true && csect__6.path === undefined && csect__6.target === undefined && (ArrayBuffer.isView(csect__6.source) || Array.isArray(csect__6.source))) {
                            csect__6$s = csect__6.source;
                            csect__6$o = csect__6.offset;
                        }
                        for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__6).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            method__8n1_w(runtime, buffer, 8, runtime.readIndex(__deref_generate_track(runtime, csect__6).data, i));
                        }
                        break;
                    }
                case 44:
                    {
                        let csect__7 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let csect__7$s = undefined, csect__7$o = 0;
                        if (ArrayBuffer.isView(csect__7) || Array.isArray(csect__7))
                            csect__7$s = csect__7;
                        else if (csect__7 !== null && typeof csect__7 === 'object' && csect__7.generatedPointer === true && csect__7.path === undefined && csect__7.target === undefined && (ArrayBuffer.isView(csect__7.source) || Array.isArray(csect__7.source))) {
                            csect__7$s = csect__7.source;
                            csect__7$o = csect__7.offset;
                        }
                        let cksum = ((0) & 0xffff);
                        let data__1 = ((0) & 0xffff);
                        for (let i = ((0) | 0); ((Number(i) < Number(__deref_generate_track(runtime, csect__7).size)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
                            data__1 = ((runtime.readIndex(__deref_generate_track(runtime, csect__7).data, ((i) + (1)))) & 0xffff);
                            method_fm_w__4(runtime, buffer, 8, data__1);
                            data__1 = ((((((data__1) << (8))) | (runtime.readIndex(__deref_generate_track(runtime, csect__7).data, i)))) & 0xffff);
                            method_fm_w__4(runtime, buffer, 8, runtime.readIndex(__deref_generate_track(runtime, csect__7).data, i));
                            cksum = ((((cksum) + (data__1))) & 0xffff);
                        }
                        method_fm_w__4(runtime, buffer, 16, cksum);
                        break;
                    }
                case 45:
                    {
                        let csect__8 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                        let csect__8$s = undefined, csect__8$o = 0;
                        if (ArrayBuffer.isView(csect__8) || Array.isArray(csect__8))
                            csect__8$s = csect__8;
                        else if (csect__8 !== null && typeof csect__8 === 'object' && csect__8.generatedPointer === true && csect__8.path === undefined && csect__8.target === undefined && (ArrayBuffer.isView(csect__8.source) || Array.isArray(csect__8.source))) {
                            csect__8$s = csect__8.source;
                            csect__8$o = csect__8.offset;
                        }
                        let data__2 = ((0) & 0xff);
                        let cksum__1 = ((0) | 0);
                        for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__8).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            if ((((cksum__1) > (255)) ? 1 : 0)) {
                                cksum__1 = ((((cksum__1) + (1))) | 0);
                                cksum__1 = ((((cksum__1) & (255))) | 0);
                            }
                            data__2 = ((runtime.readIndex(__deref_generate_track(runtime, csect__8).data, i)) & 0xff);
                            method_mfm_w__4(runtime, buffer, 8, data__2);
                            cksum__1 = ((((cksum__1) + (data__2))) | 0);
                        }
                        cksum__1 = ((((cksum__1) & (255))) | 0);
                        method_mfm_w__4(runtime, buffer, 8, cksum__1);
                        break;
                    }
                default:
                    {
                        /* printf: no effect */
                        break;
                    }
            }
            index = ((((index) + (1))) | 0);
        }
        if (((((((buffer).length) | 0)) !== (track_size)) ? 1 : 0)) {
            (__L3 ? __L3((__L2 ? __L2((__L1 ? __L1("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))) : runtime.macro("std::invalid_argument", (__L1 ? __L1("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))))) : runtime.macro("__throw", (__L2 ? __L2((__L1 ? __L1("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))) : runtime.macro("std::invalid_argument", (__L1 ? __L1("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))))));
        }
        method_fixup_crcs(runtime, buffer, crcs);
        method_generate_track_from_levels(runtime, track, head, buffer, 0, image);
    }
    function __add_generate_track(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_generate_track(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_generate_track(runtime, p) {
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
    function method_fm_w__4(runtime, buffer, n, val, size = 1000) {
        const members = runtime.members;
        for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__3(runtime, buffer, 1, size);
            method_bit_w__3(runtime, buffer, bit, size);
        }
    }
    function method_mfm_w__4(runtime, buffer, n, val, size = 1000) {
        const members = runtime.members;
        let prec = ((((((buffer).length === 0 ? 1 : 0)) ? (0) : (method_bit_r(runtime, buffer, runtime.subtract((buffer).length, 1))))) | 0);
        for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let bit = ((((((val) >>> (i))) & (1))) | 0);
            method_bit_w__3(runtime, buffer, (((((prec) || (bit)) ? 1 : 0)) ? 0 : 1), size);
            method_bit_w__3(runtime, buffer, bit, size);
            prec = ((bit) | 0);
        }
    }
    function method_gcr5_w__3(runtime, buffer, val, size = 1000) {
        const members = runtime.members;
        val = ((val) & 0xff);
        let e0 = (((__mame_table_1[(((((val) >>> (4))) % 16) + 16) % 16] ?? 0)) >>> 0);
        let e1 = (((__mame_table_1[(((((val) & (15))) % 16) + 16) % 16] ?? 0)) >>> 0);
        method_raw_w__4(runtime, buffer, 5, e0, size);
        method_raw_w__4(runtime, buffer, 5, e1, size);
    }
    function method_raw_w__4(runtime, buffer, n, val, size = 1000) {
        const members = runtime.members;
        for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            method_bit_w__3(runtime, buffer, ((((val) >>> (i))) & (1)), size);
        }
    }
    function method_generate_track_from_levels(runtime, track, head, trackbuf, splice_pos, image) {
        const members = runtime.members;
        let __t0;
        splice_pos = ((((splice_pos) % ((trackbuf).length))) | 0);
        let splice_angular_pos = ((((runtime.readIndex(trackbuf, splice_pos)) & (268435455))) >>> 0);
        let dest = (__deref_generate_track_from_levels(runtime, image).get_buffer?.(track, head) ?? 0);
        (__t0 = __deref_generate_track_from_levels(runtime, dest), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(dest, "clear"));
        let total_time = ((0) >>> 0);
        for (let __range0 = trackbuf, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            let bit = ((((__range0_item) & (4026531840))) >>> 0);
            let time = ((((__range0_item) & (268435455))) >>> 0);
            if (((Number(bit) === Number(1342177280)) ? 1 : 0)) {
                (dest).push(((0) | (((total_time) + (((time) >>> (1)))))));
            }
            else {
                if (((Number(bit) !== Number(1073741824)) ? 1 : 0)) {
                    (dest).push(((bit) | (total_time)));
                }
            }
            total_time = ((((total_time) + (time))) >>> 0);
        }
        method_normalize_times(runtime, dest, total_time);
        (__deref_generate_track_from_levels(runtime, image).set_write_splice_position?.(track, head, splice_angular_pos) ?? 0);
    }
    function __deref_generate_track_from_levels(runtime, p) {
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
    function method_normalize_times(runtime, buffer, last_position) {
        const members = runtime.members;
        for (let i = 0; ((Number(i) !== Number((buffer).length)) ? 1 : 0); i = ((i) + (1))) {
            let time = ((((runtime.readIndex(buffer, i)) & (268435455))) >>> 0);
            runtime.writeIndex(buffer, i, ((((runtime.readIndex(buffer, i)) & (4026531840))) | (runtime.divide(((200000000) * (time)), last_position))));
        }
    }
    function method_extensions(runtime) {
        const members = runtime.members;
        return "d64";
    }
    function method_find_size(runtime, io, form_factor) {
        const members = runtime.members;
        let size = 0;
        size = (io).length();
        for (let i = ((0) | 0); runtime.readIndex((members.formats ?? 0), i).sector_count; i = ((((i) + (1))) | 0)) {
            let f = runtime.readIndex((members.formats ?? 0), i);
            if (((Number(size) === Number(((((((f.sector_count) >>> 0)) * (f.sector_base_size))) * (f.head_count)))) ? 1 : 0)) {
                return ((i) | 0);
            }
            if (((Number(size) === Number(((((((((f.sector_count) * (f.sector_base_size))) * (f.head_count))) >>> 0)) + (f.sector_count)))) ? 1 : 0)) {
                return ((i) | 0);
            }
        }
        return ((-1) | 0);
    }
    function method_identify(runtime, io, form_factor, variants) {
        const members = runtime.members;
        let type = ((method_find_size(runtime, io, form_factor)) | 0);
        if (((Number(type) !== Number(-1)) ? 1 : 0)) {
            return ((4) | 0);
        }
        return ((0) | 0);
    }
    function method_get_physical_track(runtime, f, head, track) {
        const members = runtime.members;
        return ((((track) * (2))) | 0);
    }
    function method_get_disk_id_offset(runtime, f) {
        const members = runtime.members;
        return ((91554) | 0);
    }
    function method_get_cell_size(runtime, f, track) {
        const members = runtime.members;
        return (((__mame_table_5[((((__mame_table_4[(((track) % 42) + 42) % 42] ?? 0)) % 4) + 4) % 4] ?? 0)) >>> 0);
    }
    function method_get_sectors_per_track(runtime, f, track) {
        const members = runtime.members;
        return (((__mame_table_6[(((track) % 42) + 42) % 42] ?? 0)) | 0);
    }
    function method_get_sector_desc(runtime, f, current_size, sector_count, id1, id2, gap_2) {
        const members = runtime.members;
        id1 = ((id1) & 0xff);
        id2 = ((id2) & 0xff);
        if ((((members.__static_get_sector_desc_desc__initialised ?? 0)) ? 0 : 1)) {
            members.__static_get_sector_desc_desc = [new cppStruct_type_p1_p2(56, 0, -1), new cppStruct_type_p1_p2(7, 255, 5), new cppStruct_type_p1_p2(4, 8, 1), new cppStruct_type_p1_p2(55, 1, 0), new cppStruct_type_p1_p2(49, 1, 0), new cppStruct_type_p1_p2(23, 0, 0), new cppStruct_type_p1_p2(12, 0, 0), new cppStruct_type_p1_p2(4, id2, 1), new cppStruct_type_p1_p2(4, id1, 1), new cppStruct_type_p1_p2(54, 1, 0), new cppStruct_type_p1_p2(4, 15, 2), new cppStruct_type_p1_p2(7, 85, f.gap_1), new cppStruct_type_p1_p2(7, 255, 5), new cppStruct_type_p1_p2(4, 7, 1), new cppStruct_type_p1_p2(49, 2, 0), new cppStruct_type_p1_p2(41, -1, 0), new cppStruct_type_p1_p2(54, 2, 0), new cppStruct_type_p1_p2(55, 2, 0), new cppStruct_type_p1_p2(4, 0, 2), new cppStruct_type_p1_p2(7, 85, gap_2), new cppStruct_type_p1_p2(57, 0, 0), new cppStruct_type_p1_p2(7, 85, 0), new cppStruct_type_p1_p2(8, 21845, 0), new cppStruct_type_p1_p2(0, 0, 0)];
            members.__static_get_sector_desc_desc__initialised = 1;
        }
        let desc = (members.__static_get_sector_desc_desc ?? 0);
        current_size.set(((__add_get_sector_desc(runtime, __add_get_sector_desc(runtime, __add_get_sector_desc(runtime, __add_get_sector_desc(runtime, 120, ((f.gap_1) * (8))), 40), ((__add_get_sector_desc(runtime, __add_get_sector_desc(runtime, ((1) + (f.sector_base_size)), 1), 2)) * (10))), ((gap_2) * (8)))) | 0));
        current_size.set(((((current_size.get()) * (sector_count))) | 0));
        return desc;
    }
    function __add_get_sector_desc(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_build_sector_description(runtime, f, sectdata, sect_offs, error_offs, sectors, sector_count) {
        const members = runtime.members;
        const __pointee_sectors = __deref_build_sector_description(runtime, sectors);
        for (let i = ((0) | 0); (((i) < (sector_count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.readIndex(sectors, i).data = __addr_build_sector_description(runtime, sectdata, sect_offs);
            runtime.readIndex(sectors, i).size = ((f.sector_base_size) | 0);
            runtime.readIndex(sectors, i).sector_id = ((i) & 0xff);
            runtime.readIndex(sectors, i).sector_info = ((runtime.readIndex(sectdata, error_offs)) & 0xff);
            sect_offs = ((((sect_offs) + (runtime.readIndex(sectors, i).size))) >>> 0);
            error_offs = ((((error_offs) + (1))) >>> 0);
        }
    }
    function __addr_build_sector_description(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_build_sector_description(runtime, p) {
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
    function method_fix_end_gap(runtime, desc, remaining_size) {
        const members = runtime.members;
        runtime.readIndex(desc, 21).p2 = runtime.divide(remaining_size, 8);
        runtime.readIndex(desc, 22).p2 = ((remaining_size) & (7));
        runtime.readIndex(desc, 22).p1 = runtime.shiftRight(runtime.readIndex(desc, 22).p1, ((remaining_size) & (1)));
    }
    function method_load(runtime, io, form_factor, variants, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["read_at"], __L1 = __l["osd_printf_error"];
        const h___local_load_sectors = members.__local_load_sectors ?? 0;
        let type = ((method_find_size(runtime, io, form_factor)) | 0);
        if (((Number(type) === Number(-1)) ? 1 : 0)) {
            return 0;
        }
        let f = runtime.readIndex((members.formats ?? 0), type);
        let size = 0;
        size = (io).length();
        let img = [];
        if (((Number(size) === Number(((((f.sector_count) >>> 0)) * (f.sector_base_size)))) ? 1 : 0)) {
            (img = runtime.resize(img, ((size) + (f.sector_count))));
            cppMemset(runtime, __addr_load(runtime, img, 0), 1, ((size) + (f.sector_count)));
        }
        else {
            (img = runtime.resize(img, size));
        }
        (__L0 ? __L0(io, 0, __addr_load(runtime, img, 0), size) : runtime.macro("read_at", io, 0, __addr_load(runtime, img, 0), size));
        let track_offset = ((0) | 0);
        let error_offset = ((((f.sector_count) * (f.sector_base_size))) | 0);
        let id1 = ((0) & 0xff);
        let id2 = ((0) & 0xff);
        let __inline2_f = f;
        let __inline2_id = cppScratch_load___inline2_id.fill(0);
        (__L0 ? __L0(io, method_get_disk_id_offset(runtime, __inline2_f), __inline2_id, 2) : runtime.macro("read_at", io, method_get_disk_id_offset(runtime, __inline2_f), __inline2_id, 2));
        id1 = (((__inline2_id[0] ?? 0)) & 0xff);
        id2 = (((__inline2_id[1] ?? 0)) & 0xff);
        for (let head = ((0) | 0); (((head) < (f.head_count)) ? 1 : 0); head = ((((head) + (1))) | 0)) {
            for (let track = ((0) | 0); (((track) < (f.track_count)) ? 1 : 0); track = ((((track) + (1))) | 0)) {
                let current_size = ((0) | 0);
                let total_size = ((((200000000) / (method_get_cell_size(runtime, f, track)))) | 0);
                let physical_track = ((method_get_physical_track(runtime, f, head, track)) | 0);
                let sector_count = ((method_get_sectors_per_track(runtime, f, track)) | 0);
                let track_size = ((((sector_count) * (f.sector_base_size))) | 0);
                let gap2 = ((method_get_gap2(runtime, f, head, track)) | 0);
                let desc = method_get_sector_desc(runtime, f, ({ generatedLValue: true, get: () => current_size, set: (value) => { current_size = ((value) | 0); } }), sector_count, id1, id2, gap2);
                let desc$s = undefined, desc$o = 0;
                if (ArrayBuffer.isView(desc) || Array.isArray(desc))
                    desc$s = desc;
                else if (desc !== null && typeof desc === 'object' && desc.generatedPointer === true && desc.path === undefined && desc.target === undefined && (ArrayBuffer.isView(desc.source) || Array.isArray(desc.source))) {
                    desc$s = desc.source;
                    desc$o = desc.offset;
                }
                let remaining_size = ((((total_size) - (current_size))) | 0);
                if ((((remaining_size) < (0)) ? 1 : 0)) {
                    (__L1 ? __L1("d64_format: Incorrect track layout, max_size=%d, current_size=%d\n", total_size, current_size) : runtime.macro("osd_printf_error", "d64_format: Incorrect track layout, max_size=%d, current_size=%d\n", total_size, current_size));
                    return 0;
                }
                (__deref_load(runtime, (members.this ?? 0)).fix_end_gap?.(desc, remaining_size) ?? 0);
                let sectors = h___local_load_sectors;
                method_build_sector_description(runtime, f, __addr_load(runtime, img, 0), track_offset, error_offset, sectors, sector_count);
                method_generate_track(runtime, desc, physical_track, head, sectors, sector_count, total_size, image);
                track_offset = ((((track_offset) + (track_size))) | 0);
                error_offset = ((((error_offset) + (sector_count))) | 0);
            }
        }
        (__deref_load(runtime, image).set_variant?.(f.variant) ?? 0);
        return 1;
    }
    function __addr_load(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_load(runtime, p) {
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
    function method_get_gap2(runtime, f, head, track) {
        const members = runtime.members;
        return ((f.gap_2) | 0);
    }
    function method___construct(runtime) {
        const members = runtime.members;
        const h_file_formats = members.file_formats ?? 0;
        members.formats = h_file_formats;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "type_no_data": method_type_no_data,
        "type_data_mfm": method_type_data_mfm,
        "collect_crcs": method_collect_crcs,
        "crc_cells_size": method_crc_cells_size,
        "bit_r": method_bit_r,
        "bitn_r": method_bitn_r,
        "mfm_half_w": method_mfm_half_w,
        "bit_w__3": method_bit_w__3,
        "_8n1_w": method__8n1_w,
        "fixup_crc_amiga": method_fixup_crc_amiga,
        "mfm_w__5": method_mfm_w__5,
        "bit_w__4": method_bit_w__4,
        "fixup_crc_cbm": method_fixup_crc_cbm,
        "gcr5_w__4": method_gcr5_w__4,
        "raw_w__5": method_raw_w__5,
        "calc_crc_ccitt": method_calc_crc_ccitt,
        "fixup_crc_ccitt": method_fixup_crc_ccitt,
        "fixup_crc_ccitt_fm": method_fixup_crc_ccitt_fm,
        "fm_w__5": method_fm_w__5,
        "fixup_crc_machead": method_fixup_crc_machead,
        "fixup_crc_fcs": method_fixup_crc_fcs,
        "fixup_crc_victor_header": method_fixup_crc_victor_header,
        "fixup_crc_victor_data": method_fixup_crc_victor_data,
        "fixup_crcs": method_fixup_crcs,
        "gcr6_encode": method_gcr6_encode,
        "calc_sector_index": method_calc_sector_index,
        "generate_track": method_generate_track,
        "fm_w__4": method_fm_w__4,
        "mfm_w__4": method_mfm_w__4,
        "gcr5_w__3": method_gcr5_w__3,
        "raw_w__4": method_raw_w__4,
        "generate_track_from_levels": method_generate_track_from_levels,
        "normalize_times": method_normalize_times,
        "extensions": method_extensions,
        "find_size": method_find_size,
        "identify": method_identify,
        "get_physical_track": method_get_physical_track,
        "get_disk_id_offset": method_get_disk_id_offset,
        "get_cell_size": method_get_cell_size,
        "get_sectors_per_track": method_get_sectors_per_track,
        "build_sector_description": method_build_sector_description,
        "fix_end_gap": method_fix_end_gap,
        "load": method_load,
        "get_gap2": method_get_gap2,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.floppyFormats[0].definition.compiledMethodLinks = ["STRUCT_ARRAY_OF", "__throw", "osd_printf_error", "read_at", "std::invalid_argument", "util::string_format"];
definition.floppyFormats[0].definition.allocations["pll"].compiledMethods = {};
definition.floppyFormats[0].definition.allocations["pll"].compiledStructMethods = {
    "track_info": (() => {
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
            members.write_splice = ((0) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct
        };
        return __methodTable;
    })(),
};
definition.floppyFormats[0].definition.compiledStructMethods = {
    "track_info": (() => {
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
        const __mame_table_0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 1, 0, 12, 4, 5, 0, 0, 2, 3, 0, 15, 6, 7, 0, 9, 10, 11, 0, 13, 14, 0];
        const __mame_table_1 = [10, 11, 18, 19, 14, 15, 22, 23, 9, 25, 26, 27, 13, 29, 30, 21];
        const __mame_table_2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 3, 0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 7, 8, 0, 0, 0, 9, 10, 11, 12, 13, 0, 0, 14, 15, 16, 17, 18, 19, 0, 20, 21, 22, 23, 24, 25, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27, 0, 28, 29, 30, 0, 0, 0, 31, 0, 0, 32, 33, 0, 34, 35, 36, 37, 38, 39, 40, 0, 0, 0, 0, 0, 41, 42, 43, 0, 44, 45, 46, 47, 48, 49, 50, 0, 0, 51, 52, 53, 54, 55, 56, 0, 57, 58, 59, 60, 61, 62, 63];
        const __mame_table_3 = [150, 151, 154, 155, 157, 158, 159, 166, 167, 171, 172, 173, 174, 175, 178, 179, 180, 181, 182, 183, 185, 186, 187, 188, 189, 190, 191, 203, 205, 206, 207, 211, 214, 215, 217, 218, 219, 220, 221, 222, 223, 229, 230, 231, 233, 234, 235, 236, 237, 238, 239, 242, 243, 244, 245, 246, 247, 249, 250, 251, 252, 253, 254, 255];
        const __mame_table_4 = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const __mame_table_5 = [4000, 3750, 3500, 3250];
        const __mame_table_6 = [21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 19, 19, 19, 19, 19, 19, 19, 18, 18, 18, 18, 18, 18, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17];
        function method___construct(runtime) {
            const members = runtime.members;
            members.write_splice = ((0) >>> 0);
        }
        function method_type_no_data(runtime, type) {
            const members = runtime.members;
            return (((((((((((((((((((((((((((((((((((Number(type) === Number(46)) ? 1 : 0)) || (((Number(type) === Number(47)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(48)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(49)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(50)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(51)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(52)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(53)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(54)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(56)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(57)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(0)) ? 1 : 0))) ? 1 : 0);
        }
        function method_collect_crcs(runtime, desc, crcs) {
            const members = runtime.members;
            const __pointee_desc = __deref_collect_crcs(runtime, desc);
            const __pointee_crcs = __deref_collect_crcs(runtime, crcs);
            cppMemset(runtime, crcs, 0, ((64) * (((__deref_collect_crcs(runtime, crcs))?.byteLength ?? 1))));
            for (let i = ((0) | 0); ((Number(i) !== Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                runtime.readIndex(crcs, i).write = ((-1) | 0);
            }
            for (let i = ((0) | 0); ((Number(runtime.readIndex(desc, i).type) !== Number(0)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                switch (runtime.readIndex(desc, i).type) {
                    case 46:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((3) | 0);
                            break;
                        }
                    case 47:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((4) | 0);
                            break;
                        }
                    case 48:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((1) | 0);
                            break;
                        }
                    case 49:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((2) | 0);
                            break;
                        }
                    case 50:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((5) | 0);
                            break;
                        }
                    case 51:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((6) | 0);
                            break;
                        }
                    case 52:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((7) | 0);
                            break;
                        }
                    case 53:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).type = ((8) | 0);
                            break;
                        }
                }
            }
            for (let i = ((0) | 0); ((Number(runtime.readIndex(desc, i).type) !== Number(0)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if (((Number(runtime.readIndex(desc, i).type) === Number(55)) ? 1 : 0)) {
                    let j = ((0) | 0);
                    for (j = ((((i) + (1))) | 0); (((((Number(runtime.readIndex(desc, j).type) !== Number(0)) ? 1 : 0)) && (method_type_no_data(runtime, runtime.readIndex(desc, j).type))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    }
                    runtime.readIndex(crcs, runtime.readIndex(desc, i).p1).fixup_mfm_clock = ((method_type_data_mfm(runtime, runtime.readIndex(desc, j).type, runtime.readIndex(desc, j).p1, crcs)) ? 1 : 0);
                }
            }
        }
        function __deref_collect_crcs(runtime, p) {
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
        function method_type_data_mfm(runtime, type, p1, crcs) {
            const members = runtime.members;
            const __pointee_crcs = __deref_type_data_mfm(runtime, crcs);
            return (((((((((((((((((((((((((((((((((((((((((((((((((((((Number(type) === Number(2)) ? 1 : 0)) || (((Number(type) === Number(3)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(10)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(17)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(19)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(21)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(26)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(29)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(30)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(31)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(33)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(34)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(35)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(36)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(37)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(39)) ? 1 : 0))) ? 1 : 0)) || (((Number(type) === Number(40)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(type) === Number(55)) ? 1 : 0)) && ((((((Number(runtime.readIndex(crcs, p1).type) === Number(3)) ? 1 : 0)) || (((Number(runtime.readIndex(crcs, p1).type) === Number(1)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0);
        }
        function __deref_type_data_mfm(runtime, p) {
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
        function method_crc_cells_size(runtime, type) {
            const members = runtime.members;
            switch (type) {
                case 3:
                    {
                        return ((32) | 0);
                    }
                case 4:
                    {
                        return ((32) | 0);
                    }
                case 1:
                    {
                        return ((64) | 0);
                    }
                case 2:
                    {
                        return ((10) | 0);
                    }
                case 5:
                    {
                        return ((8) | 0);
                    }
                case 6:
                    {
                        return ((20) | 0);
                    }
                case 7:
                    {
                        return ((10) | 0);
                    }
                case 8:
                    {
                        return ((20) | 0);
                    }
                default:
                    {
                        return ((0) | 0);
                    }
            }
        }
        function method_fixup_crc_amiga(runtime, buffer, crc) {
            const members = runtime.members;
            const __pointee_crc = __deref_fixup_crc_amiga(runtime, crc);
            let res = ((0) & 0xffff);
            let size = ((((__pointee_crc.end) - (__pointee_crc.start))) | 0);
            for (let i = ((1) | 0); (((i) < (size)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
                if (method_bit_r(runtime, buffer, ((__pointee_crc.start) + (i)))) {
                    res = ((((res) ^ (runtime.shiftRight(32768, ((runtime.shiftRight(i, 1)) & (15)))))) & 0xffff);
                }
            }
            method_mfm_w__5(runtime, buffer, 16, 0, 1000, __pointee_crc.write);
            method_mfm_w__5(runtime, buffer, 16, res, 1000, ((__pointee_crc.write) + (32)));
        }
        function __deref_fixup_crc_amiga(runtime, p) {
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
        function method_bit_r(runtime, buffer, offset) {
            const members = runtime.members;
            return ((Number(((runtime.readIndex(buffer, offset)) & (4026531840))) === Number(1342177280)) ? 1 : 0);
        }
        function method_mfm_w__5(runtime, buffer, n, val, size, offset) {
            const members = runtime.members;
            let __t0, __t1;
            let prec = ((((offset) ? (method_bit_r(runtime, buffer, ((offset) - (1)))) : (0))) | 0);
            for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                let bit = ((((((val) >>> (i))) & (1))) | 0);
                method_bit_w__4(runtime, buffer, (((((prec) || (bit)) ? 1 : 0)) ? 0 : 1), size, (__t0 = offset, offset = ((((offset) + (1))) | 0), __t0));
                method_bit_w__4(runtime, buffer, bit, size, (__t1 = offset, offset = ((((offset) + (1))) | 0), __t1));
                prec = ((bit) | 0);
            }
        }
        function method_bit_w__4(runtime, buffer, val, size, offset) {
            const members = runtime.members;
            runtime.writeIndex(buffer, offset, ((((val) ? (1342177280) : (1073741824))) | (size)));
        }
        function method_fixup_crc_cbm(runtime, buffer, crc) {
            const members = runtime.members;
            const __pointee_crc = __deref_fixup_crc_cbm(runtime, crc);
            let v = ((0) & 0xff);
            for (let o = ((__pointee_crc.start) | 0); (((o) < (__pointee_crc.end)) ? 1 : 0); o = ((((o) + (10))) | 0)) {
                v = ((((v) ^ ((((__mame_table_0[(((method_bitn_r(runtime, buffer, o, 5)) % 32) + 32) % 32] ?? 0)) << (4))))) & 0xff);
                v = ((((v) ^ ((__mame_table_0[(((method_bitn_r(runtime, buffer, ((o) + (5)), 5)) % 32) + 32) % 32] ?? 0)))) & 0xff);
            }
            method_gcr5_w__4(runtime, buffer, v, 1000, __pointee_crc.write);
        }
        function __deref_fixup_crc_cbm(runtime, p) {
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
        function method_bitn_r(runtime, buffer, offset, count) {
            const members = runtime.members;
            let r = ((0) >>> 0);
            for (let i = ((0) | 0); (((i) < (count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                r = ((((((r) << (1))) | (((method_bit_r(runtime, buffer, ((offset) + (i)))) >>> 0)))) >>> 0);
            }
            return ((r) >>> 0);
        }
        function method_gcr5_w__4(runtime, buffer, val, size, offset) {
            const members = runtime.members;
            val = ((val) & 0xff);
            let e0 = (((__mame_table_1[(((((val) >>> (4))) % 16) + 16) % 16] ?? 0)) >>> 0);
            let e1 = (((__mame_table_1[(((((val) & (15))) % 16) + 16) % 16] ?? 0)) >>> 0);
            method_raw_w__5(runtime, buffer, 5, e0, size, offset);
            method_raw_w__5(runtime, buffer, 5, e1, size, ((offset) + (5)));
        }
        function method_raw_w__5(runtime, buffer, n, val, size, offset) {
            const members = runtime.members;
            let __t0;
            for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                method_bit_w__4(runtime, buffer, ((((val) >>> (i))) & (1)), size, (__t0 = offset, offset = ((((offset) + (1))) | 0), __t0));
            }
        }
        function method_fixup_crc_machead(runtime, buffer, crc) {
            const members = runtime.members;
            const __pointee_crc = __deref_fixup_crc_machead(runtime, crc);
            let v = ((0) & 0xff);
            for (let o = ((__pointee_crc.start) | 0); (((o) < (__pointee_crc.end)) ? 1 : 0); o = ((((o) + (8))) | 0)) {
                v = ((((v) ^ ((__mame_table_2[(((method_bitn_r(runtime, buffer, o, 8)) % 256) + 256) % 256] ?? 0)))) & 0xff);
            }
            method_raw_w__5(runtime, buffer, 8, (__mame_table_3[((v) & 63)] ?? 0), 1000, __pointee_crc.write);
        }
        function __deref_fixup_crc_machead(runtime, p) {
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
        function method_fixup_crc_victor_header(runtime, buffer, crc) {
            const members = runtime.members;
            const __pointee_crc = __deref_fixup_crc_victor_header(runtime, crc);
            let v = ((0) & 0xff);
            for (let o = ((__pointee_crc.start) | 0); (((o) < (__pointee_crc.end)) ? 1 : 0); o = ((((o) + (10))) | 0)) {
                v = ((((v) + ((((((__mame_table_0[(((method_bitn_r(runtime, buffer, o, 5)) % 32) + 32) % 32] ?? 0)) << (4))) | ((__mame_table_0[(((method_bitn_r(runtime, buffer, ((o) + (5)), 5)) % 32) + 32) % 32] ?? 0)))))) & 0xff);
            }
            method_gcr5_w__4(runtime, buffer, v, 1000, __pointee_crc.write);
        }
        function __deref_fixup_crc_victor_header(runtime, p) {
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
        function method_fixup_crc_victor_data(runtime, buffer, crc) {
            const members = runtime.members;
            const __pointee_crc = __deref_fixup_crc_victor_data(runtime, crc);
            let v = ((0) & 0xffff);
            for (let o = ((__pointee_crc.start) | 0); (((o) < (__pointee_crc.end)) ? 1 : 0); o = ((((o) + (10))) | 0)) {
                v = ((((v) + ((((((__mame_table_0[(((method_bitn_r(runtime, buffer, o, 5)) % 32) + 32) % 32] ?? 0)) << (4))) | ((__mame_table_0[(((method_bitn_r(runtime, buffer, ((o) + (5)), 5)) % 32) + 32) % 32] ?? 0)))))) & 0xffff);
            }
            method_gcr5_w__4(runtime, buffer, ((v) & (255)), 1000, __pointee_crc.write);
            method_gcr5_w__4(runtime, buffer, ((v) >>> (8)), 1000, ((__pointee_crc.write) + (10)));
        }
        function __deref_fixup_crc_victor_data(runtime, p) {
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
        function method_fixup_crcs(runtime, buffer, crcs) {
            const members = runtime.members;
            const __pointee_crcs = __deref_fixup_crcs(runtime, crcs);
            for (let i = ((0) | 0); ((Number(i) !== Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if (((Number(runtime.readIndex(crcs, i).write) !== Number(-1)) ? 1 : 0)) {
                    switch (runtime.readIndex(crcs, i).type) {
                        case 1:
                            {
                                method_fixup_crc_amiga(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                                break;
                            }
                        case 2:
                            {
                                method_fixup_crc_cbm(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                                break;
                            }
                        case 3:
                            {
                                method_fixup_crc_ccitt(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                                break;
                            }
                        case 4:
                            {
                                method_fixup_crc_ccitt_fm(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                                break;
                            }
                        case 5:
                            {
                                method_fixup_crc_machead(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                                break;
                            }
                        case 6:
                            {
                                method_fixup_crc_fcs(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                                break;
                            }
                        case 7:
                            {
                                method_fixup_crc_victor_header(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                                break;
                            }
                        case 8:
                            {
                                method_fixup_crc_victor_data(runtime, buffer, __addr_fixup_crcs(runtime, crcs, i));
                                break;
                            }
                    }
                    if (runtime.readIndex(crcs, i).fixup_mfm_clock) {
                        let offset = ((((runtime.readIndex(crcs, i).write) + (method_crc_cells_size(runtime, runtime.readIndex(crcs, i).type)))) | 0);
                        method_bit_w__4(runtime, buffer, (((((((offset) ? (method_bit_r(runtime, buffer, ((offset) - (1)))) : (0))) || (method_bit_r(runtime, buffer, ((offset) + (1))))) ? 1 : 0)) ? 0 : 1), 1000, offset);
                    }
                    runtime.readIndex(crcs, i).write = ((-1) | 0);
                }
            }
        }
        function __addr_fixup_crcs(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_fixup_crcs(runtime, p) {
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
        function method_fixup_crc_ccitt(runtime, buffer, crc) {
            const members = runtime.members;
            const __pointee_crc = __deref_fixup_crc_ccitt(runtime, crc);
            method_mfm_w__5(runtime, buffer, 16, method_calc_crc_ccitt(runtime, buffer, __pointee_crc.start, __pointee_crc.end), 1000, __pointee_crc.write);
        }
        function __deref_fixup_crc_ccitt(runtime, p) {
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
        function method_calc_crc_ccitt(runtime, buffer, start, end) {
            const members = runtime.members;
            let res = ((65535) >>> 0);
            let size = ((((end) - (start))) | 0);
            for (let i = ((1) | 0); (((i) < (size)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
                res = ((((res) << (1))) >>> 0);
                if (method_bit_r(runtime, buffer, ((start) + (i)))) {
                    res = ((((res) ^ (65536))) >>> 0);
                }
                if (((res) & (65536))) {
                    res = ((((res) ^ (69665))) >>> 0);
                }
            }
            return ((res) & 0xffff);
        }
        function method_fixup_crc_ccitt_fm(runtime, buffer, crc) {
            const members = runtime.members;
            const __pointee_crc = __deref_fixup_crc_ccitt_fm(runtime, crc);
            method_fm_w__5(runtime, buffer, 16, method_calc_crc_ccitt(runtime, buffer, __pointee_crc.start, __pointee_crc.end), 1000, __pointee_crc.write);
        }
        function __deref_fixup_crc_ccitt_fm(runtime, p) {
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
        function method_fm_w__5(runtime, buffer, n, val, size, offset) {
            const members = runtime.members;
            let __t0, __t1;
            for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                let bit = ((((((val) >>> (i))) & (1))) | 0);
                method_bit_w__4(runtime, buffer, 1, size, (__t0 = offset, offset = ((((offset) + (1))) | 0), __t0));
                method_bit_w__4(runtime, buffer, bit, size, (__t1 = offset, offset = ((((offset) + (1))) | 0), __t1));
            }
        }
        function method_fixup_crc_fcs(runtime, buffer, crc) {
            const members = runtime.members;
            const __pointee_crc = __deref_fixup_crc_fcs(runtime, crc);
        }
        function __deref_fixup_crc_fcs(runtime, p) {
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
        function method_generate_track(runtime, desc, track, head, sect, sect_count, track_size, image) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["STRUCT_ARRAY_OF"], __L1 = __l["util::string_format"], __L2 = __l["std::invalid_argument"], __L3 = __l["__throw"];
            const __pointee_desc = __deref_generate_track(runtime, desc);
            const __pointee_sect = __deref_generate_track(runtime, sect);
            let buffer = [];
            let crcs = (__L0 ? __L0(64, "gen_crc_info") : runtime.macro("STRUCT_ARRAY_OF", 64, "gen_crc_info"));
            method_collect_crcs(runtime, desc, crcs);
            let index = ((0) | 0);
            let sector_loop_start = ((0) | 0);
            let sector_idx = ((0) | 0);
            let sector_cnt = ((0) | 0);
            let sector_limit = ((0) | 0);
            let sector_interleave = ((0) | 0);
            let sector_skew = ((0) | 0);
            while (((Number(runtime.readIndex(desc, index).type) !== Number(0)) ? 1 : 0)) {
                switch (runtime.readIndex(desc, index).type) {
                    case 1:
                        {
                            for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_fm_w__4(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                            }
                            break;
                        }
                    case 2:
                        {
                            for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_mfm_w__4(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                            }
                            break;
                        }
                    case 3:
                        {
                            method_mfm_w__4(runtime, buffer, runtime.readIndex(desc, index).p2, runtime.readIndex(desc, index).p1);
                            break;
                        }
                    case 4:
                        {
                            for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_gcr5_w__3(runtime, buffer, runtime.readIndex(desc, index).p1);
                            }
                            break;
                        }
                    case 5:
                        {
                            for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method__8n1_w(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                            }
                            break;
                        }
                    case 6:
                        {
                            for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_raw_w__4(runtime, buffer, 16, runtime.readIndex(desc, index).p1);
                            }
                            break;
                        }
                    case 7:
                        {
                            for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_raw_w__4(runtime, buffer, 8, runtime.readIndex(desc, index).p1);
                            }
                            break;
                        }
                    case 8:
                        {
                            method_raw_w__4(runtime, buffer, runtime.readIndex(desc, index).p2, runtime.readIndex(desc, index).p1);
                            break;
                        }
                    case 9:
                        {
                            for (let i = ((0) | 0); (((i) < (runtime.readIndex(desc, index).p1)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_raw_w__4(runtime, buffer, 10, 65535);
                            }
                            break;
                        }
                    case 10:
                        {
                            method_mfm_w__4(runtime, buffer, 8, track);
                            break;
                        }
                    case 11:
                        {
                            method_fm_w__4(runtime, buffer, 8, track);
                            break;
                        }
                    case 12:
                        {
                            method_gcr5_w__3(runtime, buffer, __add_generate_track(runtime, __add_generate_track(runtime, 1, runtime.shiftRight(track, 1)), ((head) * (35))));
                            break;
                        }
                    case 13:
                        {
                            method_gcr5_w__3(runtime, buffer, __add_generate_track(runtime, ((1) + (track)), ((head) * (77))));
                            break;
                        }
                    case 14:
                        {
                            method_raw_w__4(runtime, buffer, 8, (__mame_table_3[(((((track) & (63))) % 64) + 64) % 64] ?? 0));
                            break;
                        }
                    case 15:
                        {
                            method__8n1_w(runtime, buffer, 8, track);
                            break;
                        }
                    case 16:
                        {
                            method_gcr5_w__3(runtime, buffer, ((track) + (((head) * (128)))));
                            break;
                        }
                    case 17:
                        {
                            method_mfm_w__4(runtime, buffer, 8, head);
                            break;
                        }
                    case 18:
                        {
                            method_fm_w__4(runtime, buffer, 8, head);
                            break;
                        }
                    case 19:
                        {
                            method_mfm_w__4(runtime, buffer, 8, ((head) ? 0 : 1));
                            break;
                        }
                    case 20:
                        {
                            method_raw_w__4(runtime, buffer, 8, (__mame_table_3[(((((((((track) & (64))) ? (1) : (0))) | (((head) ? (32) : (0))))) % 64) + 64) % 64] ?? 0));
                            break;
                        }
                    case 21:
                        {
                            method_mfm_w__4(runtime, buffer, 8, runtime.readIndex(sect, sector_idx).sector_id);
                            break;
                        }
                    case 22:
                        {
                            method_fm_w__4(runtime, buffer, 8, runtime.readIndex(sect, sector_idx).sector_id);
                            break;
                        }
                    case 23:
                        {
                            method_gcr5_w__3(runtime, buffer, runtime.readIndex(sect, sector_idx).sector_id);
                            break;
                        }
                    case 24:
                        {
                            method_raw_w__4(runtime, buffer, 8, (__mame_table_3[((runtime.readIndex(sect, sector_idx).sector_id) & 63)] ?? 0));
                            break;
                        }
                    case 25:
                        {
                            method__8n1_w(runtime, buffer, 8, runtime.readIndex(sect, sector_idx).sector_id);
                            break;
                        }
                    case 26:
                        {
                            let size = ((runtime.readIndex(sect, sector_idx).size) | 0);
                            let id = ((0) | 0);
                            for (id = ((0) | 0); (((size) > (128)) ? 1 : 0); size = ((((size) >> (1))) | 0), id = ((((id) + (1))) | 0)) {
                            }
                            method_mfm_w__4(runtime, buffer, 8, id);
                            break;
                        }
                    case 27:
                        {
                            let size__1 = ((runtime.readIndex(sect, sector_idx).size) | 0);
                            let id__1 = ((0) | 0);
                            for (id__1 = ((0) | 0); (((size__1) > (128)) ? 1 : 0); size__1 = ((((size__1) >> (1))) | 0), id__1 = ((((id__1) + (1))) | 0)) {
                            }
                            method_fm_w__4(runtime, buffer, 8, id__1);
                            break;
                        }
                    case 28:
                        {
                            method_raw_w__4(runtime, buffer, 8, (__mame_table_3[((runtime.readIndex(sect, sector_idx).sector_info) & 63)] ?? 0));
                            break;
                        }
                    case 29:
                        {
                            method_mfm_half_w(runtime, buffer, 7, ((((track) * (2))) + (head)));
                            break;
                        }
                    case 30:
                        {
                            method_mfm_half_w(runtime, buffer, 6, ((((track) * (2))) + (head)));
                            break;
                        }
                    case 31:
                        {
                            method_fm_w__4(runtime, buffer, 8, ((((track) * (2))) + (head)));
                            break;
                        }
                    case 32:
                        {
                            method_mfm_w__4(runtime, buffer, 8, ((((track) * (2))) + (head)));
                            break;
                        }
                    case 33:
                        {
                            method_mfm_half_w(runtime, buffer, 7, sector_idx);
                            break;
                        }
                    case 34:
                        {
                            method_mfm_half_w(runtime, buffer, 6, sector_idx);
                            break;
                        }
                    case 35:
                        {
                            method_mfm_half_w(runtime, buffer, 7, ((runtime.readIndex(desc, index).p1) - (sector_idx)));
                            break;
                        }
                    case 36:
                        {
                            method_mfm_half_w(runtime, buffer, 6, ((runtime.readIndex(desc, index).p1) - (sector_idx)));
                            break;
                        }
                    case 56:
                        {
                            method_fixup_crcs(runtime, buffer, crcs);
                            sector_loop_start = ((index) | 0);
                            sector_idx = ((runtime.readIndex(desc, index).p1) | 0);
                            sector_cnt = ((sector_idx) | 0);
                            sector_limit = ((((((Number(runtime.readIndex(desc, index).p2) === Number(-1)) ? 1 : 0)) ? (((((sector_idx) + (sect_count))) - (1))) : (runtime.readIndex(desc, index).p2))) | 0);
                            sector_idx = ((method_calc_sector_index(runtime, sector_cnt, sector_interleave, sector_skew, ((sector_limit) + (1)), ((((track) * (2))) + (head)))) | 0);
                            break;
                        }
                    case 57:
                        {
                            method_fixup_crcs(runtime, buffer, crcs);
                            if ((((sector_cnt) < (sector_limit)) ? 1 : 0)) {
                                sector_cnt = ((((sector_cnt) + (1))) | 0);
                                sector_idx = ((method_calc_sector_index(runtime, sector_cnt, sector_interleave, sector_skew, ((sector_limit) + (1)), ((((track) * (2))) + (head)))) | 0);
                                index = ((sector_loop_start) | 0);
                            }
                            break;
                        }
                    case 58:
                        {
                            sector_interleave = ((runtime.readIndex(desc, index).p1) | 0);
                            sector_skew = ((runtime.readIndex(desc, index).p2) | 0);
                            break;
                        }
                    case 48:
                    case 49:
                    case 46:
                    case 47:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).start = (((buffer).length) | 0);
                            break;
                        }
                    case 54:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).end = (((buffer).length) | 0);
                            break;
                        }
                    case 55:
                        {
                            runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).write = (((buffer).length) | 0);
                            (buffer = runtime.resize(buffer, __add_generate_track(runtime, (buffer).length, method_crc_cells_size(runtime, runtime.readIndex(crcs, runtime.readIndex(desc, index).p1).type))));
                            break;
                        }
                    case 37:
                        {
                            let csect = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                            let csect$s = undefined, csect$o = 0;
                            if (ArrayBuffer.isView(csect) || Array.isArray(csect))
                                csect$s = csect;
                            else if (csect !== null && typeof csect === 'object' && csect.generatedPointer === true && csect.path === undefined && csect.target === undefined && (ArrayBuffer.isView(csect.source) || Array.isArray(csect.source))) {
                                csect$s = csect.source;
                                csect$o = csect.offset;
                            }
                            for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_mfm_w__4(runtime, buffer, 8, runtime.readIndex(__deref_generate_track(runtime, csect).data, i));
                            }
                            break;
                        }
                    case 38:
                        {
                            let csect__1 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                            let csect__1$s = undefined, csect__1$o = 0;
                            if (ArrayBuffer.isView(csect__1) || Array.isArray(csect__1))
                                csect__1$s = csect__1;
                            else if (csect__1 !== null && typeof csect__1 === 'object' && csect__1.generatedPointer === true && csect__1.path === undefined && csect__1.target === undefined && (ArrayBuffer.isView(csect__1.source) || Array.isArray(csect__1.source))) {
                                csect__1$s = csect__1.source;
                                csect__1$o = csect__1.offset;
                            }
                            for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__1).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_fm_w__4(runtime, buffer, 8, runtime.readIndex(__deref_generate_track(runtime, csect__1).data, i));
                            }
                            break;
                        }
                    case 39:
                        {
                            let csect__2 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                            let csect__2$s = undefined, csect__2$o = 0;
                            if (ArrayBuffer.isView(csect__2) || Array.isArray(csect__2))
                                csect__2$s = csect__2;
                            else if (csect__2 !== null && typeof csect__2 === 'object' && csect__2.generatedPointer === true && csect__2.path === undefined && csect__2.target === undefined && (ArrayBuffer.isView(csect__2.source) || Array.isArray(csect__2.source))) {
                                csect__2$s = csect__2.source;
                                csect__2$o = csect__2.offset;
                            }
                            for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__2).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_mfm_half_w(runtime, buffer, 7, runtime.readIndex(__deref_generate_track(runtime, csect__2).data, i));
                            }
                            break;
                        }
                    case 40:
                        {
                            let csect__3 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                            let csect__3$s = undefined, csect__3$o = 0;
                            if (ArrayBuffer.isView(csect__3) || Array.isArray(csect__3))
                                csect__3$s = csect__3;
                            else if (csect__3 !== null && typeof csect__3 === 'object' && csect__3.generatedPointer === true && csect__3.path === undefined && csect__3.target === undefined && (ArrayBuffer.isView(csect__3.source) || Array.isArray(csect__3.source))) {
                                csect__3$s = csect__3.source;
                                csect__3$o = csect__3.offset;
                            }
                            for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__3).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_mfm_half_w(runtime, buffer, 6, runtime.readIndex(__deref_generate_track(runtime, csect__3).data, i));
                            }
                            break;
                        }
                    case 41:
                        {
                            let csect__4 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                            let csect__4$s = undefined, csect__4$o = 0;
                            if (ArrayBuffer.isView(csect__4) || Array.isArray(csect__4))
                                csect__4$s = csect__4;
                            else if (csect__4 !== null && typeof csect__4 === 'object' && csect__4.generatedPointer === true && csect__4.path === undefined && csect__4.target === undefined && (ArrayBuffer.isView(csect__4.source) || Array.isArray(csect__4.source))) {
                                csect__4$s = csect__4.source;
                                csect__4$o = csect__4.offset;
                            }
                            for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__4).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method_gcr5_w__3(runtime, buffer, runtime.readIndex(__deref_generate_track(runtime, csect__4).data, i));
                            }
                            break;
                        }
                    case 42:
                        {
                            let csect__5 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                            let csect__5$s = undefined, csect__5$o = 0;
                            if (ArrayBuffer.isView(csect__5) || Array.isArray(csect__5))
                                csect__5$s = csect__5;
                            else if (csect__5 !== null && typeof csect__5 === 'object' && csect__5.generatedPointer === true && csect__5.path === undefined && csect__5.target === undefined && (ArrayBuffer.isView(csect__5.source) || Array.isArray(csect__5.source))) {
                                csect__5$s = csect__5.source;
                                csect__5$o = csect__5.offset;
                            }
                            let data = __deref_generate_track(runtime, csect__5).data;
                            let data$s = undefined, data$o = 0;
                            if (ArrayBuffer.isView(data) || Array.isArray(data))
                                data$s = data;
                            else if (data !== null && typeof data === 'object' && data.generatedPointer === true && data.path === undefined && data.target === undefined && (ArrayBuffer.isView(data.source) || Array.isArray(data.source))) {
                                data$s = data.source;
                                data$o = data.offset;
                            }
                            let size__2 = ((__deref_generate_track(runtime, csect__5).size) | 0);
                            let ca = ((0) & 0xff);
                            let cb = ((0) & 0xff);
                            let cc = ((0) & 0xff);
                            for (let i = ((0) | 0); (((i) < (size__2)) ? 1 : 0); i = ((((i) + (3))) | 0)) {
                                let dt = ((((size__2) - (i))) | 0);
                                let va = (((data$s !== undefined ? (data$s[data$o + (i)] ?? 0) : runtime.readIndex(data, i))) & 0xff);
                                let vb = (((((((dt) > (1)) ? 1 : 0)) ? ((data$s !== undefined ? (data$s[data$o + (((i) + (1)))] ?? 0) : runtime.readIndex(data, ((i) + (1))))) : (0))) & 0xff);
                                let vc = (((((((dt) > (2)) ? 1 : 0)) ? ((data$s !== undefined ? (data$s[data$o + (((i) + (2)))] ?? 0) : runtime.readIndex(data, ((i) + (2))))) : (0))) & 0xff);
                                cc = ((((((cc) << (1))) | (((cc) >>> (7))))) & 0xff);
                                let suma = ((__add_generate_track(runtime, ((ca) + (va)), ((cc) & (1)))) | 0);
                                ca = ((suma) & 0xff);
                                va = ((((va) ^ (cc))) & 0xff);
                                let sumb = ((__add_generate_track(runtime, ((cb) + (vb)), runtime.shiftRight(suma, 8))) | 0);
                                cb = ((sumb) & 0xff);
                                vb = ((((vb) ^ (ca))) & 0xff);
                                cc = ((__add_generate_track(runtime, ((cc) + (vc)), runtime.shiftRight(sumb, 8))) & 0xff);
                                vc = ((((vc) ^ (cb))) & 0xff);
                                let nb = (((((((dt) > (2)) ? 1 : 0)) ? (32) : ((((((dt) > (1)) ? 1 : 0)) ? (24) : (16))))) | 0);
                                method_raw_w__4(runtime, buffer, nb, runtime.shiftRight(method_gcr6_encode(runtime, va, vb, vc), ((32) - (nb))));
                            }
                            method_raw_w__4(runtime, buffer, 32, method_gcr6_encode(runtime, ca, cb, cc));
                            break;
                        }
                    case 43:
                        {
                            let csect__6 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                            let csect__6$s = undefined, csect__6$o = 0;
                            if (ArrayBuffer.isView(csect__6) || Array.isArray(csect__6))
                                csect__6$s = csect__6;
                            else if (csect__6 !== null && typeof csect__6 === 'object' && csect__6.generatedPointer === true && csect__6.path === undefined && csect__6.target === undefined && (ArrayBuffer.isView(csect__6.source) || Array.isArray(csect__6.source))) {
                                csect__6$s = csect__6.source;
                                csect__6$o = csect__6.offset;
                            }
                            for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__6).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                method__8n1_w(runtime, buffer, 8, runtime.readIndex(__deref_generate_track(runtime, csect__6).data, i));
                            }
                            break;
                        }
                    case 44:
                        {
                            let csect__7 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                            let csect__7$s = undefined, csect__7$o = 0;
                            if (ArrayBuffer.isView(csect__7) || Array.isArray(csect__7))
                                csect__7$s = csect__7;
                            else if (csect__7 !== null && typeof csect__7 === 'object' && csect__7.generatedPointer === true && csect__7.path === undefined && csect__7.target === undefined && (ArrayBuffer.isView(csect__7.source) || Array.isArray(csect__7.source))) {
                                csect__7$s = csect__7.source;
                                csect__7$o = csect__7.offset;
                            }
                            let cksum = ((0) & 0xffff);
                            let data__1 = ((0) & 0xffff);
                            for (let i = ((0) | 0); ((Number(i) < Number(__deref_generate_track(runtime, csect__7).size)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
                                data__1 = ((runtime.readIndex(__deref_generate_track(runtime, csect__7).data, ((i) + (1)))) & 0xffff);
                                method_fm_w__4(runtime, buffer, 8, data__1);
                                data__1 = ((((((data__1) << (8))) | (runtime.readIndex(__deref_generate_track(runtime, csect__7).data, i)))) & 0xffff);
                                method_fm_w__4(runtime, buffer, 8, runtime.readIndex(__deref_generate_track(runtime, csect__7).data, i));
                                cksum = ((((cksum) + (data__1))) & 0xffff);
                            }
                            method_fm_w__4(runtime, buffer, 16, cksum);
                            break;
                        }
                    case 45:
                        {
                            let csect__8 = __addr_generate_track(runtime, sect, (((((runtime.readIndex(desc, index).p1) >= (0)) ? 1 : 0)) ? (runtime.readIndex(desc, index).p1) : (sector_idx)));
                            let csect__8$s = undefined, csect__8$o = 0;
                            if (ArrayBuffer.isView(csect__8) || Array.isArray(csect__8))
                                csect__8$s = csect__8;
                            else if (csect__8 !== null && typeof csect__8 === 'object' && csect__8.generatedPointer === true && csect__8.path === undefined && csect__8.target === undefined && (ArrayBuffer.isView(csect__8.source) || Array.isArray(csect__8.source))) {
                                csect__8$s = csect__8.source;
                                csect__8$o = csect__8.offset;
                            }
                            let data__2 = ((0) & 0xff);
                            let cksum__1 = ((0) | 0);
                            for (let i = ((0) | 0); ((Number(i) !== Number(__deref_generate_track(runtime, csect__8).size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                if ((((cksum__1) > (255)) ? 1 : 0)) {
                                    cksum__1 = ((((cksum__1) + (1))) | 0);
                                    cksum__1 = ((((cksum__1) & (255))) | 0);
                                }
                                data__2 = ((runtime.readIndex(__deref_generate_track(runtime, csect__8).data, i)) & 0xff);
                                method_mfm_w__4(runtime, buffer, 8, data__2);
                                cksum__1 = ((((cksum__1) + (data__2))) | 0);
                            }
                            cksum__1 = ((((cksum__1) & (255))) | 0);
                            method_mfm_w__4(runtime, buffer, 8, cksum__1);
                            break;
                        }
                    default:
                        {
                            /* printf: no effect */
                            break;
                        }
                }
                index = ((((index) + (1))) | 0);
            }
            if (((((((buffer).length) | 0)) !== (track_size)) ? 1 : 0)) {
                (__L3 ? __L3((__L2 ? __L2((__L1 ? __L1("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))) : runtime.macro("std::invalid_argument", (__L1 ? __L1("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))))) : runtime.macro("__throw", (__L2 ? __L2((__L1 ? __L1("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))) : runtime.macro("std::invalid_argument", (__L1 ? __L1("Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length) : runtime.macro("util::string_format", "Wrong track size in generate_track, expected %d, got %d", track_size, (buffer).length))))));
            }
            method_fixup_crcs(runtime, buffer, crcs);
            method_generate_track_from_levels(runtime, track, head, buffer, 0, image);
        }
        function __add_generate_track(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function __addr_generate_track(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_generate_track(runtime, p) {
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
        function method_fm_w__4(runtime, buffer, n, val, size = 1000) {
            const members = runtime.members;
            for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                let bit = ((((((val) >>> (i))) & (1))) | 0);
                method_bit_w__3(runtime, buffer, 1, size);
                method_bit_w__3(runtime, buffer, bit, size);
            }
        }
        function method_bit_w__3(runtime, buffer, val, size = 1000) {
            const members = runtime.members;
            (buffer).push(((((val) ? (1342177280) : (1073741824))) | (size)));
        }
        function method_mfm_w__4(runtime, buffer, n, val, size = 1000) {
            const members = runtime.members;
            let prec = ((((((buffer).length === 0 ? 1 : 0)) ? (0) : (method_bit_r(runtime, buffer, runtime.subtract((buffer).length, 1))))) | 0);
            for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                let bit = ((((((val) >>> (i))) & (1))) | 0);
                method_bit_w__3(runtime, buffer, (((((prec) || (bit)) ? 1 : 0)) ? 0 : 1), size);
                method_bit_w__3(runtime, buffer, bit, size);
                prec = ((bit) | 0);
            }
        }
        function method_gcr5_w__3(runtime, buffer, val, size = 1000) {
            const members = runtime.members;
            val = ((val) & 0xff);
            let e0 = (((__mame_table_1[(((((val) >>> (4))) % 16) + 16) % 16] ?? 0)) >>> 0);
            let e1 = (((__mame_table_1[(((((val) & (15))) % 16) + 16) % 16] ?? 0)) >>> 0);
            method_raw_w__4(runtime, buffer, 5, e0, size);
            method_raw_w__4(runtime, buffer, 5, e1, size);
        }
        function method_raw_w__4(runtime, buffer, n, val, size = 1000) {
            const members = runtime.members;
            for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                method_bit_w__3(runtime, buffer, ((((val) >>> (i))) & (1)), size);
            }
        }
        function method__8n1_w(runtime, buffer, n, val, size = 1000) {
            const members = runtime.members;
            method_bit_w__3(runtime, buffer, 0, size);
            for (let i = ((((n) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                let bit = ((((((val) >>> (i))) & (1))) | 0);
                method_bit_w__3(runtime, buffer, bit, size);
            }
            method_bit_w__3(runtime, buffer, 1, size);
        }
        function method_mfm_half_w(runtime, buffer, start_bit, val, size = 1000) {
            const members = runtime.members;
            let prec = ((((((buffer).length === 0 ? 1 : 0)) ? (0) : (method_bit_r(runtime, buffer, runtime.subtract((buffer).length, 1))))) | 0);
            for (let i = ((start_bit) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (2))) | 0)) {
                let bit = ((((((val) >>> (i))) & (1))) | 0);
                method_bit_w__3(runtime, buffer, (((((prec) || (bit)) ? 1 : 0)) ? 0 : 1), size);
                method_bit_w__3(runtime, buffer, bit, size);
                prec = ((bit) | 0);
            }
        }
        function method_calc_sector_index(runtime, num, interleave, skew, total_sectors, track_head) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["util::string_format"], __L1 = __l["std::invalid_argument"], __L2 = __l["__throw"];
            let i = ((0) | 0);
            let sec = ((0) | 0);
            while ((((i) !== (num)) ? 1 : 0)) {
                i = ((((i) + (1))) | 0);
                i = ((((i) + (interleave))) | 0);
                i = ((((i) % (total_sectors))) | 0);
                sec = ((((sec) + (1))) | 0);
                if ((((sec) > (total_sectors)) ? 1 : 0)) {
                    (__L2 ? __L2((__L1 ? __L1((__L0 ? __L0("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))) : runtime.macro("std::invalid_argument", (__L0 ? __L0("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))))) : runtime.macro("__throw", (__L1 ? __L1((__L0 ? __L0("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))) : runtime.macro("std::invalid_argument", (__L0 ? __L0("Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors) : runtime.macro("util::string_format", "Format error: interleave %d not appropriate for %d sectors per track", interleave, total_sectors))))));
                }
            }
            sec = ((((sec) - (((track_head) * (skew))))) | 0);
            sec = ((((sec) % (total_sectors))) | 0);
            if ((((sec) < (0)) ? 1 : 0)) {
                sec = ((((sec) + (total_sectors))) | 0);
            }
            return ((sec) | 0);
        }
        function method_gcr6_encode(runtime, va, vb, vc) {
            const members = runtime.members;
            va = ((va) & 0xff);
            vb = ((vb) & 0xff);
            vc = ((vc) & 0xff);
            let r = ((0) >>> 0);
            r = (((((__mame_table_3[(((((((((((va) >>> (2))) & (48))) | (((((vb) >>> (4))) & (12))))) | (((((vc) >>> (6))) & (3))))) % 64) + 64) % 64] ?? 0)) << (24))) >>> 0);
            r = ((((r) | ((((__mame_table_3[(((((va) & (63))) % 64) + 64) % 64] ?? 0)) << (16))))) >>> 0);
            r = ((((r) | ((((__mame_table_3[(((((vb) & (63))) % 64) + 64) % 64] ?? 0)) << (8))))) >>> 0);
            r = ((((r) | ((__mame_table_3[(((((vc) & (63))) % 64) + 64) % 64] ?? 0)))) >>> 0);
            return ((r) >>> 0);
        }
        function method_generate_track_from_levels(runtime, track, head, trackbuf, splice_pos, image) {
            const members = runtime.members;
            let __t0;
            splice_pos = ((((splice_pos) % ((trackbuf).length))) | 0);
            let splice_angular_pos = ((((runtime.readIndex(trackbuf, splice_pos)) & (268435455))) >>> 0);
            let dest = (__deref_generate_track_from_levels(runtime, image).get_buffer?.(track, head) ?? 0);
            (__t0 = __deref_generate_track_from_levels(runtime, dest), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(dest, "clear"));
            let total_time = ((0) >>> 0);
            for (let __range0 = trackbuf, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                let bit = ((((__range0_item) & (4026531840))) >>> 0);
                let time = ((((__range0_item) & (268435455))) >>> 0);
                if (((Number(bit) === Number(1342177280)) ? 1 : 0)) {
                    (dest).push(((0) | (((total_time) + (((time) >>> (1)))))));
                }
                else {
                    if (((Number(bit) !== Number(1073741824)) ? 1 : 0)) {
                        (dest).push(((bit) | (total_time)));
                    }
                }
                total_time = ((((total_time) + (time))) >>> 0);
            }
            method_normalize_times(runtime, dest, total_time);
            (__deref_generate_track_from_levels(runtime, image).set_write_splice_position?.(track, head, splice_angular_pos) ?? 0);
        }
        function __deref_generate_track_from_levels(runtime, p) {
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
        function method_normalize_times(runtime, buffer, last_position) {
            const members = runtime.members;
            for (let i = 0; ((Number(i) !== Number((buffer).length)) ? 1 : 0); i = ((i) + (1))) {
                let time = ((((runtime.readIndex(buffer, i)) & (268435455))) >>> 0);
                runtime.writeIndex(buffer, i, ((((runtime.readIndex(buffer, i)) & (4026531840))) | (runtime.divide(((200000000) * (time)), last_position))));
            }
        }
        function method_extensions(runtime) {
            const members = runtime.members;
            return "d64";
        }
        function method_get_disk_id_offset(runtime, f) {
            const members = runtime.members;
            return ((91554) | 0);
        }
        function method_get_cell_size(runtime, f, track) {
            const members = runtime.members;
            return (((__mame_table_5[((((__mame_table_4[(((track) % 42) + 42) % 42] ?? 0)) % 4) + 4) % 4] ?? 0)) >>> 0);
        }
        function method_get_physical_track(runtime, f, head, track) {
            const members = runtime.members;
            return ((((track) * (2))) | 0);
        }
        function method_get_sectors_per_track(runtime, f, track) {
            const members = runtime.members;
            return (((__mame_table_6[(((track) % 42) + 42) % 42] ?? 0)) | 0);
        }
        function method_get_gap2(runtime, f, head, track) {
            const members = runtime.members;
            return ((f.gap_2) | 0);
        }
        function method_build_sector_description(runtime, f, sectdata, sect_offs, error_offs, sectors, sector_count) {
            const members = runtime.members;
            const __pointee_sectors = __deref_build_sector_description(runtime, sectors);
            for (let i = ((0) | 0); (((i) < (sector_count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                runtime.readIndex(sectors, i).data = __addr_build_sector_description(runtime, sectdata, sect_offs);
                runtime.readIndex(sectors, i).size = ((f.sector_base_size) | 0);
                runtime.readIndex(sectors, i).sector_id = ((i) & 0xff);
                runtime.readIndex(sectors, i).sector_info = ((runtime.readIndex(sectdata, error_offs)) & 0xff);
                sect_offs = ((((sect_offs) + (runtime.readIndex(sectors, i).size))) >>> 0);
                error_offs = ((((error_offs) + (1))) >>> 0);
            }
        }
        function __addr_build_sector_description(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_build_sector_description(runtime, p) {
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
            "type_no_data": method_type_no_data,
            "collect_crcs": method_collect_crcs,
            "type_data_mfm": method_type_data_mfm,
            "crc_cells_size": method_crc_cells_size,
            "fixup_crc_amiga": method_fixup_crc_amiga,
            "bit_r": method_bit_r,
            "mfm_w__5": method_mfm_w__5,
            "bit_w__4": method_bit_w__4,
            "fixup_crc_cbm": method_fixup_crc_cbm,
            "bitn_r": method_bitn_r,
            "gcr5_w__4": method_gcr5_w__4,
            "raw_w__5": method_raw_w__5,
            "fixup_crc_machead": method_fixup_crc_machead,
            "fixup_crc_victor_header": method_fixup_crc_victor_header,
            "fixup_crc_victor_data": method_fixup_crc_victor_data,
            "fixup_crcs": method_fixup_crcs,
            "fixup_crc_ccitt": method_fixup_crc_ccitt,
            "calc_crc_ccitt": method_calc_crc_ccitt,
            "fixup_crc_ccitt_fm": method_fixup_crc_ccitt_fm,
            "fm_w__5": method_fm_w__5,
            "fixup_crc_fcs": method_fixup_crc_fcs,
            "generate_track": method_generate_track,
            "fm_w__4": method_fm_w__4,
            "bit_w__3": method_bit_w__3,
            "mfm_w__4": method_mfm_w__4,
            "gcr5_w__3": method_gcr5_w__3,
            "raw_w__4": method_raw_w__4,
            "_8n1_w": method__8n1_w,
            "mfm_half_w": method_mfm_half_w,
            "calc_sector_index": method_calc_sector_index,
            "gcr6_encode": method_gcr6_encode,
            "generate_track_from_levels": method_generate_track_from_levels,
            "normalize_times": method_normalize_times,
            "extensions": method_extensions,
            "get_disk_id_offset": method_get_disk_id_offset,
            "get_cell_size": method_get_cell_size,
            "get_physical_track": method_get_physical_track,
            "get_sectors_per_track": method_get_sectors_per_track,
            "get_gap2": method_get_gap2,
            "build_sector_description": method_build_sector_description
        };
        return __methodTable;
    })(),
};
definition.floppyFormats[1].definition.compiledMethods = (() => {
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
    const cppScratch_identify_h = new Uint8Array(Math.max(0, Number(8)));
    function method_normalize_times(runtime, buffer, last_position) {
        const members = runtime.members;
        for (let i = 0; ((Number(i) !== Number((buffer).length)) ? 1 : 0); i = ((i) + (1))) {
            let time = ((((runtime.readIndex(buffer, i)) & (268435455))) >>> 0);
            runtime.writeIndex(buffer, i, ((((runtime.readIndex(buffer, i)) & (4026531840))) | (runtime.divide(((200000000) * (time)), last_position))));
        }
    }
    function method_generate_track_from_bitstream(runtime, track, head, trackbuf, track_size, image, subtrack = 0, splice = 0) {
        const members = runtime.members;
        let __t0;
        let dest = (__deref_generate_track_from_bitstream(runtime, image).get_buffer?.(track, head, subtrack) ?? 0);
        (__t0 = __deref_generate_track_from_bitstream(runtime, dest), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(dest, "clear"));
        for (let i = ((0) | 0); (((i) !== (track_size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((runtime.readIndex(trackbuf, runtime.shiftRight(i, 3))) & (runtime.shiftRight(128, ((i) & (7)))))) {
                (dest).push(((0) | (__add_generate_track_from_bitstream(runtime, ((i) * (2)), 1))));
            }
        }
        method_normalize_times(runtime, dest, ((track_size) * (2)));
        if (((((((splice) >= (0)) ? 1 : 0)) && ((((splice) < (track_size)) ? 1 : 0))) ? 1 : 0)) {
            let splpos = ((runtime.divide(((200000000) * (splice)), track_size)) | 0);
            (__deref_generate_track_from_bitstream(runtime, image).set_write_splice_position?.(track, head, splpos, subtrack) ?? 0);
        }
    }
    function __add_generate_track_from_bitstream(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_generate_track_from_bitstream(runtime, p) {
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
    function method_identify(runtime, io, form_factor, variants) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["read_at"], __L1 = __l["memcmp"];
        let h = cppScratch_identify_h.fill(0);
        let __binding_25 = (__L0 ? __L0(io, 0, h, 8) : runtime.macro("read_at", io, 0, h, 8));
        let err = runtime.readIndex(__binding_25, 0);
        let actual = runtime.readIndex(__binding_25, 1);
        if ((((err) || (((Number(8) !== Number(actual)) ? 1 : 0))) ? 1 : 0)) {
            return ((0) | 0);
        }
        if ((((__L1 ? __L1(h, "GCR-1541", 8) : runtime.macro("memcmp", h, "GCR-1541", 8))) ? 0 : 1)) {
            return ((8) | 0);
        }
        return ((0) | 0);
    }
    function method_load(runtime, io, form_factor, variants, image) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["read_at"], __L1 = __l["osd_printf_error"], __L2 = __l["get_u32le"], __L3 = __l["get_u16le"];
        let size = 0;
        size = (io).length();
        let __binding_30 = (__L0 ? __L0(io, 0, size) : runtime.macro("read_at", io, 0, size));
        let err = runtime.readIndex(__binding_30, 0);
        let img = runtime.readIndex(__binding_30, 1);
        let actual = runtime.readIndex(__binding_30, 2);
        if ((((err) || (((Number(actual) !== Number(size)) ? 1 : 0))) ? 1 : 0)) {
            return 0;
        }
        if (runtime.readIndex(img, 8)) {
            (__L1 ? __L1("g64_format: Unsupported version %u\n", runtime.readIndex(img, 8)) : runtime.macro("osd_printf_error", "g64_format: Unsupported version %u\n", runtime.readIndex(img, 8)));
            return 0;
        }
        let track_count = ((runtime.readIndex(img, 9)) | 0);
        let head = ((0) | 0);
        for (let track = ((0) | 0); (((track) < (track_count)) ? 1 : 0); track = ((((track) + (1))) | 0)) {
            let cylinder = ((((track) % (84))) | 0);
            if (((Number(track) === Number(84)) ? 1 : 0)) {
                head = ((1) | 0);
            }
            let tpos = ((__add_load(runtime, 12, ((track) * (4)))) >>> 0);
            let spos = ((((tpos) + (((track_count) * (4))))) >>> 0);
            let dpos = (((__L2 ? __L2(__addr_load(runtime, img, tpos)) : runtime.macro("get_u32le", __addr_load(runtime, img, tpos)))) >>> 0);
            if (((dpos) ? 0 : 1)) {
                continue;
            }
            if (((Number(dpos) > Number(size)) ? 1 : 0)) {
                (__L1 ? __L1("g64_format: Track %u offset %06x out of bounds\n", track, dpos) : runtime.macro("osd_printf_error", "g64_format: Track %u offset %06x out of bounds\n", track, dpos));
                return 0;
            }
            let speed_zone = (((__L2 ? __L2(__addr_load(runtime, img, spos)) : runtime.macro("get_u32le", __addr_load(runtime, img, spos)))) >>> 0);
            if ((((speed_zone) > (3)) ? 1 : 0)) {
                (__L1 ? __L1("g64_format: Unsupported variable speed zones on track %d\n", track) : runtime.macro("osd_printf_error", "g64_format: Unsupported variable speed zones on track %d\n", track));
                return 0;
            }
            let track_bytes = (((__L3 ? __L3(__addr_load(runtime, img, dpos)) : runtime.macro("get_u16le", __addr_load(runtime, img, dpos)))) & 0xffff);
            let track_size = ((((track_bytes) * (8))) | 0);
            0;
            method_generate_track_from_bitstream(runtime, cylinder, head, __addr_load(runtime, img, ((dpos) + (2))), track_size, image);
        }
        if (((head) ? 0 : 1)) {
            (__deref_load(runtime, image).set_variant?.(1146311507) ?? 0);
        }
        else {
            (__deref_load(runtime, image).set_variant?.(1146311492) ?? 0);
        }
        return 1;
    }
    function __add_load(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_load(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_load(runtime, p) {
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
    function method_extensions(runtime) {
        const members = runtime.members;
        return "g64,g41,g71";
    }
    function method___construct(runtime) {
        const members = runtime.members;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "normalize_times": method_normalize_times,
        "generate_track_from_bitstream": method_generate_track_from_bitstream,
        "identify": method_identify,
        "load": method_load,
        "extensions": method_extensions,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.floppyFormats[1].definition.compiledMethodLinks = ["get_u16le", "get_u32le", "memcmp", "osd_printf_error", "read_at"];
definition.floppyFormats[1].definition.allocations["pll"].compiledMethods = {};
definition.floppyFormats[1].definition.allocations["pll"].compiledStructMethods = {
    "track_info": (() => {
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
            members.write_splice = ((0) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct
        };
        return __methodTable;
    })(),
};
definition.floppyFormats[1].definition.compiledStructMethods = {
    "track_info": (() => {
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
            members.write_splice = ((0) >>> 0);
        }
        function method_generate_track_from_bitstream(runtime, track, head, trackbuf, track_size, image, subtrack = 0, splice = 0) {
            const members = runtime.members;
            let __t0;
            let dest = (__deref_generate_track_from_bitstream(runtime, image).get_buffer?.(track, head, subtrack) ?? 0);
            (__t0 = __deref_generate_track_from_bitstream(runtime, dest), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(dest, "clear"));
            for (let i = ((0) | 0); (((i) !== (track_size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if (((runtime.readIndex(trackbuf, runtime.shiftRight(i, 3))) & (runtime.shiftRight(128, ((i) & (7)))))) {
                    (dest).push(((0) | (__add_generate_track_from_bitstream(runtime, ((i) * (2)), 1))));
                }
            }
            method_normalize_times(runtime, dest, ((track_size) * (2)));
            if (((((((splice) >= (0)) ? 1 : 0)) && ((((splice) < (track_size)) ? 1 : 0))) ? 1 : 0)) {
                let splpos = ((runtime.divide(((200000000) * (splice)), track_size)) | 0);
                (__deref_generate_track_from_bitstream(runtime, image).set_write_splice_position?.(track, head, splpos, subtrack) ?? 0);
            }
        }
        function __add_generate_track_from_bitstream(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function __deref_generate_track_from_bitstream(runtime, p) {
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
        function method_normalize_times(runtime, buffer, last_position) {
            const members = runtime.members;
            for (let i = 0; ((Number(i) !== Number((buffer).length)) ? 1 : 0); i = ((i) + (1))) {
                let time = ((((runtime.readIndex(buffer, i)) & (268435455))) >>> 0);
                runtime.writeIndex(buffer, i, ((((runtime.readIndex(buffer, i)) & (4026531840))) | (runtime.divide(((200000000) * (time)), last_position))));
            }
        }
        function method_load(runtime, io, form_factor, variants, image) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["read_at"], __L1 = __l["osd_printf_error"], __L2 = __l["get_u32le"], __L3 = __l["get_u16le"];
            let size = 0;
            size = (io).length();
            let __binding_30 = (__L0 ? __L0(io, 0, size) : runtime.macro("read_at", io, 0, size));
            let err = runtime.readIndex(__binding_30, 0);
            let img = runtime.readIndex(__binding_30, 1);
            let actual = runtime.readIndex(__binding_30, 2);
            if ((((err) || (((Number(actual) !== Number(size)) ? 1 : 0))) ? 1 : 0)) {
                return 0;
            }
            if (runtime.readIndex(img, 8)) {
                (__L1 ? __L1("g64_format: Unsupported version %u\n", runtime.readIndex(img, 8)) : runtime.macro("osd_printf_error", "g64_format: Unsupported version %u\n", runtime.readIndex(img, 8)));
                return 0;
            }
            let track_count = ((runtime.readIndex(img, 9)) | 0);
            let head = ((0) | 0);
            for (let track = ((0) | 0); (((track) < (track_count)) ? 1 : 0); track = ((((track) + (1))) | 0)) {
                let cylinder = ((((track) % (84))) | 0);
                if (((Number(track) === Number(84)) ? 1 : 0)) {
                    head = ((1) | 0);
                }
                let tpos = ((__add_load(runtime, 12, ((track) * (4)))) >>> 0);
                let spos = ((((tpos) + (((track_count) * (4))))) >>> 0);
                let dpos = (((__L2 ? __L2(__addr_load(runtime, img, tpos)) : runtime.macro("get_u32le", __addr_load(runtime, img, tpos)))) >>> 0);
                if (((dpos) ? 0 : 1)) {
                    continue;
                }
                if (((Number(dpos) > Number(size)) ? 1 : 0)) {
                    (__L1 ? __L1("g64_format: Track %u offset %06x out of bounds\n", track, dpos) : runtime.macro("osd_printf_error", "g64_format: Track %u offset %06x out of bounds\n", track, dpos));
                    return 0;
                }
                let speed_zone = (((__L2 ? __L2(__addr_load(runtime, img, spos)) : runtime.macro("get_u32le", __addr_load(runtime, img, spos)))) >>> 0);
                if ((((speed_zone) > (3)) ? 1 : 0)) {
                    (__L1 ? __L1("g64_format: Unsupported variable speed zones on track %d\n", track) : runtime.macro("osd_printf_error", "g64_format: Unsupported variable speed zones on track %d\n", track));
                    return 0;
                }
                let track_bytes = (((__L3 ? __L3(__addr_load(runtime, img, dpos)) : runtime.macro("get_u16le", __addr_load(runtime, img, dpos)))) & 0xffff);
                let track_size = ((((track_bytes) * (8))) | 0);
                0;
                method_generate_track_from_bitstream(runtime, cylinder, head, __addr_load(runtime, img, ((dpos) + (2))), track_size, image);
            }
            if (((head) ? 0 : 1)) {
                (__deref_load(runtime, image).set_variant?.(1146311507) ?? 0);
            }
            else {
                (__deref_load(runtime, image).set_variant?.(1146311492) ?? 0);
            }
            return 1;
        }
        function __add_load(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function __addr_load(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_load(runtime, p) {
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
        function method_extensions(runtime) {
            const members = runtime.members;
            return "g64,g41,g71";
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "generate_track_from_bitstream": method_generate_track_from_bitstream,
            "normalize_times": method_normalize_times,
            "load": method_load,
            "extensions": method_extensions
        };
        return __methodTable;
    })(),
};
definition.floppyImage.compiledMethods = (() => {
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
    function method_set_variant(runtime, _variant) {
        const members = runtime.members;
        let __t0;
        const h_index_array = members.index_array ?? 0;
        members.variant = ((_variant) >>> 0);
        (__t0 = (h_index_array), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(h_index_array, "clear"));
        let sectors = ((0) >>> 0);
        switch ((members.variant ?? 0)) {
            case 909198419:
            case 909201747:
            case 909198404:
            case 909201732:
                {
                    sectors = ((16) >>> 0);
                    break;
                }
            default:
                {
                    sectors = ((0) >>> 0);
                }
        }
        if (sectors) {
            let sector_angle = ((runtime.divide(200000000, sectors)) >>> 0);
            for (let i = ((1) | 0); (((i) < (sectors)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                (h_index_array).push(((i) * (sector_angle)));
            }
            (h_index_array).push(__add_set_variant(runtime, ((((sectors) - (1))) * (sector_angle)), runtime.divide(sector_angle, 2)));
        }
    }
    function __add_set_variant(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_find_index_hole(runtime, pos, last, next) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::lower_bound"];
        const h_index_array = members.index_array ?? 0;
        let nexti = (__L0 ? __L0(runtime.container(h_index_array, "begin"), runtime.container(h_index_array, "end"), ((pos) + (1))) : runtime.macro("std::lower_bound", runtime.container(h_index_array, "begin"), runtime.container(h_index_array, "end"), ((pos) + (1))));
        next.set((((((runtime.same(nexti, runtime.container(h_index_array, "end")) ? 1 : 0)) ? (200000000) : (__deref_find_index_hole(runtime, nexti)))) >>> 0));
        last.set((((((runtime.same(nexti, runtime.container(h_index_array, "begin")) ? 1 : 0)) ? (0) : (__deref_find_index_hole(runtime, (nexti = ((nexti) - (1))))))) >>> 0));
    }
    function __deref_find_index_hole(runtime, p) {
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
    function method_get_maximal_geometry(runtime, _tracks, _heads) {
        const members = runtime.members;
        _tracks.set((((members.tracks ?? 0)) | 0));
        _heads.set((((members.heads ?? 0)) | 0));
    }
    function method_get_actual_geometry(runtime, _tracks, _heads) {
        const members = runtime.members;
        let maxt = ((0) | 0);
        let maxh = ((0) | 0);
        let __goto_head_done = ((0) | 0);
        while (1) {
            let __goto_track_done = ((0) | 0);
            while (1) {
                maxt = (((((((members.tracks ?? 0)) - (1))) * (4))) | 0);
                maxh = (((((members.heads ?? 0)) - (1))) | 0);
                while ((((maxt) >= (0)) ? 1 : 0)) {
                    for (let i = ((0) | 0); (((i) <= (maxh)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if (((((runtime.readIndex(runtime.readIndex((members.track_array ?? 0), maxt), i).cell_data).length === 0 ? 1 : 0)) ? 0 : 1)) {
                            __goto_track_done = ((1) | 0);
                            break;
                        }
                    }
                    if (__goto_track_done) {
                        break;
                    }
                    maxt = ((((maxt) - (1))) | 0);
                }
                if (__goto_track_done) {
                    break;
                }
                break;
            }
            if ((((maxt) >= (0)) ? 1 : 0)) {
                while ((((maxh) >= (0)) ? 1 : 0)) {
                    for (let i = ((0) | 0); (((i) <= (maxt)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if (((((runtime.readIndex(runtime.readIndex((members.track_array ?? 0), i), maxh).cell_data).length === 0 ? 1 : 0)) ? 0 : 1)) {
                            __goto_head_done = ((1) | 0);
                            break;
                        }
                    }
                    if (__goto_head_done) {
                        break;
                    }
                    maxh = ((((maxh) - (1))) | 0);
                }
                if (__goto_head_done) {
                    break;
                }
            }
            else {
                maxh = ((-1) | 0);
            }
            break;
        }
        _tracks.set(((runtime.divide(((maxt) + (4)), 4)) | 0));
        _heads.set(((((maxh) + (1))) | 0));
    }
    function method_get_resolution(runtime) {
        const members = runtime.members;
        let mask = ((0) | 0);
        for (let i = ((0) | 0); ((Number(i) <= Number((((((members.tracks ?? 0)) - (1))) * (4)))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            for (let j = ((0) | 0); (((j) < ((members.heads ?? 0))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                if (((((runtime.readIndex(runtime.readIndex((members.track_array ?? 0), i), j).cell_data).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    mask = ((((mask) | (((1) << (((i) & (3))))))) | 0);
                }
            }
        }
        if (((mask) & (10))) {
            return ((2) | 0);
        }
        if (((mask) & (4))) {
            return ((1) | 0);
        }
        return ((0) | 0);
    }
    function method_track_is_formatted(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        let idx = ((((((track) * (4))) + (subtrack))) | 0);
        if ((((((((members.track_array ?? 0)).length) | 0)) <= (idx)) ? 1 : 0)) {
            return 0;
        }
        if (((((((runtime.readIndex((members.track_array ?? 0), idx)).length) | 0)) <= (head)) ? 1 : 0)) {
            return 0;
        }
        let data = runtime.readIndex(runtime.readIndex((members.track_array ?? 0), idx), head).cell_data;
        if (((data).length === 0 ? 1 : 0)) {
            return 0;
        }
        for (let __range0 = data, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            if (((Number(((__range0_item) & (4026531840))) === Number(0)) ? 1 : 0)) {
                return 1;
            }
        }
        return 0;
    }
    function method_get_variant_name(runtime, form_factor, variant) {
        const members = runtime.members;
        switch (variant) {
            case 1146311507:
                {
                    return "Single side, single density";
                }
            case 808538963:
                {
                    return "Single side, single density, 10-sector";
                }
            case 909202259:
                {
                    return "Single side, single density, 16-sector";
                }
            case 842224467:
                {
                    return "Single side, single density, 32-sector";
                }
            case 1145328467:
                {
                    return "Single side, double density";
                }
            case 808535123:
                {
                    return "Single side, double density, 10-sector";
                }
            case 909198419:
                {
                    return "Single side, double density, 16 hard sector";
                }
            case 842220627:
                {
                    return "Single side, double density, 32-sector";
                }
            case 1146180435:
                {
                    return "Single side, quad density";
                }
            case 808538451:
                {
                    return "Single side, quad density, 10-sector";
                }
            case 909201747:
                {
                    return "Single side, quad density, 16 hard sector";
                }
            case 1146311492:
                {
                    return "Double side, single density";
                }
            case 808538948:
                {
                    return "Double side, single density, 10-sector";
                }
            case 909202244:
                {
                    return "Double side, single density, 16-sector";
                }
            case 842224452:
                {
                    return "Double side, single density, 32-sector";
                }
            case 1145328452:
                {
                    return "Double side, double density";
                }
            case 808535108:
                {
                    return "Double side, double density, 10-sector";
                }
            case 909198404:
                {
                    return "Double side, double density, 16 hard sector";
                }
            case 842220612:
                {
                    return "Double side, double density, 32-sector";
                }
            case 1146180420:
                {
                    return "Double side, quad density";
                }
            case 808538436:
                {
                    return "Double side, quad density, 10-sector";
                }
            case 909201732:
                {
                    return "Double side, quad density, 16 hard sector";
                }
            case 1145590596:
                {
                    return "Double side, high density";
                }
            case 1145393988:
                {
                    return "Double side, extended density";
                }
        }
        return "Unknown";
    }
    function method_get_form_factor(runtime) {
        const members = runtime.members;
        return (((members.form_factor ?? 0)) >>> 0);
    }
    function method_get_variant(runtime) {
        const members = runtime.members;
        return (((members.variant ?? 0)) >>> 0);
    }
    function method_get_sectoring(runtime) {
        const members = runtime.members;
        return (((members.sectoring ?? 0)) >>> 0);
    }
    function method_set_form_variant(runtime, f, v) {
        const members = runtime.members;
        if (((Number((members.form_factor ?? 0)) === Number(0)) ? 1 : 0)) {
            members.form_factor = ((f) >>> 0);
        }
        method_set_variant(runtime, v);
    }
    function method_set_sectoring(runtime, s) {
        const members = runtime.members;
        members.sectoring = ((s) >>> 0);
    }
    function method_get_buffer(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        return runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).cell_data;
    }
    function method_floppy_image__get_buffer(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        return runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).cell_data;
    }
    function method_set_write_splice_position(runtime, track, head, pos, subtrack = 0) {
        const members = runtime.members;
        runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).write_splice = pos;
    }
    function method_get_write_splice_position(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        return ((runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).write_splice) >>> 0);
    }
    function method_floppy_image__get_form_factor(runtime) {
        const members = runtime.members;
        return (((members.form_factor ?? 0)) >>> 0);
    }
    function method_floppy_image__get_variant(runtime) {
        const members = runtime.members;
        return (((members.variant ?? 0)) >>> 0);
    }
    function method_floppy_image__get_sectoring(runtime) {
        const members = runtime.members;
        return (((members.sectoring ?? 0)) >>> 0);
    }
    function method_floppy_image__set_form_variant(runtime, f, v) {
        const members = runtime.members;
        if (((Number((members.form_factor ?? 0)) === Number(0)) ? 1 : 0)) {
            members.form_factor = ((f) >>> 0);
        }
        method_set_variant(runtime, v);
    }
    function method_floppy_image__set_sectoring(runtime, s) {
        const members = runtime.members;
        members.sectoring = ((s) >>> 0);
    }
    function method_floppy_image__set_write_splice_position(runtime, track, head, pos, subtrack = 0) {
        const members = runtime.members;
        runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).write_splice = pos;
    }
    function method_floppy_image__get_write_splice_position(runtime, track, head, subtrack = 0) {
        const members = runtime.members;
        return ((runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).write_splice) >>> 0);
    }
    function method_get_buffer_(runtime, track, head, subtrack = 0, __assigned) {
        const members = runtime.members;
        runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).cell_data = __assigned;
        return runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).cell_data;
    }
    function method_floppy_image__get_buffer_(runtime, track, head, subtrack = 0, __assigned) {
        const members = runtime.members;
        runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).cell_data = __assigned;
        return runtime.readIndex(runtime.readIndex((members.track_array ?? 0), ((((track) * (4))) + (subtrack))), head).cell_data;
    }
    function method___construct(runtime, _tracks, _heads, _form_factor) {
        const members = runtime.members;
        members.tracks = ((_tracks) | 0);
        members.heads = ((_heads) | 0);
        members.form_factor = ((_form_factor) >>> 0);
        members.variant = ((0) >>> 0);
        (members.track_array = runtime.resize((members.track_array ?? 0), __add___construct(runtime, (((members.tracks ?? 0)) * (4)), 1)));
        for (let i = ((0) | 0); ((Number(i) < Number(__add___construct(runtime, (((members.tracks ?? 0)) * (4)), 1))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.resize(runtime.readIndex((members.track_array ?? 0), i), (members.heads ?? 0));
        }
    }
    function __add___construct(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "set_variant": method_set_variant,
        "get_resolution": method_get_resolution,
        "track_is_formatted": method_track_is_formatted,
        "get_variant_name": method_get_variant_name,
        "get_form_factor": method_get_form_factor,
        "get_variant": method_get_variant,
        "get_sectoring": method_get_sectoring,
        "set_form_variant": method_set_form_variant,
        "set_sectoring": method_set_sectoring,
        "get_buffer": method_get_buffer,
        "floppy_image::get_buffer": method_floppy_image__get_buffer,
        "set_write_splice_position": method_set_write_splice_position,
        "get_write_splice_position": method_get_write_splice_position,
        "floppy_image::get_form_factor": method_floppy_image__get_form_factor,
        "floppy_image::get_variant": method_floppy_image__get_variant,
        "floppy_image::get_sectoring": method_floppy_image__get_sectoring,
        "floppy_image::set_form_variant": method_floppy_image__set_form_variant,
        "floppy_image::set_sectoring": method_floppy_image__set_sectoring,
        "floppy_image::set_write_splice_position": method_floppy_image__set_write_splice_position,
        "floppy_image::get_write_splice_position": method_floppy_image__get_write_splice_position,
        "get_buffer=": method_get_buffer_,
        "floppy_image::get_buffer=": method_floppy_image__get_buffer_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.floppyImage.compiledMethodLinks = ["std::lower_bound"];
definition.floppyImage.compiledStructMethods = {
    "track_info": (() => {
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
            members.write_splice = ((0) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct
        };
        return __methodTable;
    })(),
};
definition.allocations["fs_enum"].compiledMethods = (() => {
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
    function method_add_format(runtime, type, image_size, name, description) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"];
        const h_m_manager = members.m_manager ?? 0;
        ((members.m_fid ?? 0).m_fs).push((__L0 ? __L0("fs_info", h_m_manager, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => type, set: (value) => { type = value; } }), offset: 0 }), image_size, name, description) : runtime.macro("STRUCT_OF", "fs_info", h_m_manager, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => type, set: (value) => { type = value; } }), offset: 0 }), image_size, name, description)));
    }
    function method_add_raw(runtime, name, key, description) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"];
        ((members.m_fid ?? 0).m_fs).push((__L0 ? __L0("fs_info", name, key, description) : runtime.macro("STRUCT_OF", "fs_info", name, key, description)));
    }
    function method___construct(runtime, fid) {
        const members = runtime.members;
        members.m_fid = fid;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "add_format": method_add_format,
        "add_raw": method_add_raw,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["fs_enum"].compiledMethodLinks = ["STRUCT_OF"];
definition.allocations["fs_enum"].compiledStructMethods = {
    "fs_info": (() => {
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
        function method___construct_5(runtime, manager, type, image_size, name, description) {
            const members = runtime.members;
            members.m_manager = manager;
            members.m_type = type;
            members.m_image_size = ((image_size) >>> 0);
            members.m_name = name;
            members.m_key = ((0) >>> 0);
            members.m_description = description;
        }
        function method___construct_3(runtime, name, key, description) {
            const members = runtime.members;
            members.m_manager = 0;
            members.m_type = 0;
            members.m_image_size = ((0) >>> 0);
            members.m_name = name;
            members.m_key = ((key) >>> 0);
            members.m_description = description;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct_5": method___construct_5,
            "__construct_3": method___construct_3
        };
        return __methodTable;
    })(),
};
definition.compiledStructMethods = {
    "fs_info": (() => {
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
        function method___construct_5(runtime, manager, type, image_size, name, description) {
            const members = runtime.members;
            members.m_manager = manager;
            members.m_type = type;
            members.m_image_size = ((image_size) >>> 0);
            members.m_name = name;
            members.m_key = ((0) >>> 0);
            members.m_description = description;
        }
        function method___construct_3(runtime, name, key, description) {
            const members = runtime.members;
            members.m_manager = 0;
            members.m_type = 0;
            members.m_image_size = ((0) >>> 0);
            members.m_name = name;
            members.m_key = ((key) >>> 0);
            members.m_description = description;
        }
        function method_track_changed(runtime) {
            const members = runtime.members;
        }
        function method_hash32(runtime, a) {
            const members = runtime.members;
            a = ((__add_hash32(runtime, ((a) + (2127912214)), ((a) << (12)))) >>> 0);
            a = ((((((a) ^ (3345072700))) ^ (((a) >>> (19))))) >>> 0);
            a = ((__add_hash32(runtime, ((a) + (374761393)), ((a) << (5)))) >>> 0);
            a = ((((((a) + (3550635116))) ^ (((a) << (9))))) >>> 0);
            a = ((__add_hash32(runtime, ((a) + (4251993797)), ((a) << (3)))) >>> 0);
            a = ((((((a) ^ (3042594569))) ^ (((a) >>> (16))))) >>> 0);
            return ((a) >>> 0);
        }
        function __add_hash32(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_wspan_split_on_wrap(runtime, wspans) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::copy"];
            let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7;
            let ne = (((wspans).length) | 0);
            for (let i = ((0) | 0); (((i) !== (ne)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if (((Number(runtime.readIndex(wspans, i).end) < Number(runtime.readIndex(wspans, i).start)) ? 1 : 0)) {
                    (wspans = runtime.resize(wspans, __add_wspan_split_on_wrap(runtime, (wspans).length, 1)));
                    let ws = runtime.readIndex(wspans, i);
                    let we = (__t0 = __deref_wspan_split_on_wrap(runtime, wspans), typeof __t0.back === 'function' ? __t0.back() : typeof __t0.back === 'number' || typeof __t0.back === 'boolean' ? __t0.back : runtime.container(wspans, "back"));
                    we.start = 0;
                    we.end = ws.end;
                    ws.end = 200000000;
                    let start = ((ws.start) | 0);
                    let split_index = ((0) | 0);
                    for (split_index = ((0) | 0); ((Number(split_index) !== Number((ws.flux_change_positions).length)) ? 1 : 0); split_index = ((((split_index) + (1))) | 0)) {
                        if (((Number(runtime.readIndex(ws.flux_change_positions, split_index)) < Number(start)) ? 1 : 0)) {
                            break;
                        }
                    }
                    if ((((split_index) === (0)) ? 1 : 0)) {
                        (__t1 = ws.flux_change_positions, __t2 = we.flux_change_positions, (runtime.swapObjects(__t1, __t2) ? 0 : (ws.flux_change_positions = __t2, we.flux_change_positions = __t1, 0)));
                    }
                    else {
                        runtime.resize(we.flux_change_positions, (((ws.flux_change_positions).length) - (split_index)));
                        (__L0 ? __L0(__addr_wspan_split_on_wrap(runtime, (__t3 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t3.begin === 'function' ? __t3.begin() : typeof __t3.begin === 'number' || typeof __t3.begin === 'boolean' ? __t3.begin : runtime.container(ws.flux_change_positions, "begin")), split_index), (__t4 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t4.end === 'function' ? __t4.end() : typeof __t4.end === 'number' || typeof __t4.end === 'boolean' ? __t4.end : runtime.container(ws.flux_change_positions, "end")), (__t5 = __deref_wspan_split_on_wrap(runtime, we.flux_change_positions), typeof __t5.begin === 'function' ? __t5.begin() : typeof __t5.begin === 'number' || typeof __t5.begin === 'boolean' ? __t5.begin : runtime.container(we.flux_change_positions, "begin"))) : runtime.macro("std::copy", __addr_wspan_split_on_wrap(runtime, (__t3 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t3.begin === 'function' ? __t3.begin() : typeof __t3.begin === 'number' || typeof __t3.begin === 'boolean' ? __t3.begin : runtime.container(ws.flux_change_positions, "begin")), split_index), (__t4 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t4.end === 'function' ? __t4.end() : typeof __t4.end === 'number' || typeof __t4.end === 'boolean' ? __t4.end : runtime.container(ws.flux_change_positions, "end")), (__t5 = __deref_wspan_split_on_wrap(runtime, we.flux_change_positions), typeof __t5.begin === 'function' ? __t5.begin() : typeof __t5.begin === 'number' || typeof __t5.begin === 'boolean' ? __t5.begin : runtime.container(we.flux_change_positions, "begin"))));
                        runtime.vectorMethod(ws.flux_change_positions, "erase", __addr_wspan_split_on_wrap(runtime, (__t6 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t6.begin === 'function' ? __t6.begin() : typeof __t6.begin === 'number' || typeof __t6.begin === 'boolean' ? __t6.begin : runtime.container(ws.flux_change_positions, "begin")), split_index), (__t7 = __deref_wspan_split_on_wrap(runtime, ws.flux_change_positions), typeof __t7.end === 'function' ? __t7.end() : typeof __t7.end === 'number' || typeof __t7.end === 'boolean' ? __t7.end : runtime.container(ws.flux_change_positions, "end")));
                    }
                }
            }
        }
        function __add_wspan_split_on_wrap(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function __addr_wspan_split_on_wrap(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_wspan_split_on_wrap(runtime, p) {
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
        function method_wspan_remove_damaged(runtime, wspans, track) {
            const members = runtime.members;
            let __t0, __t1, __t2, __t3;
            for (let pos = 0; ((Number(pos) !== Number((track).length)) ? 1 : 0); pos = ((pos) + (1))) {
                if (((Number(((runtime.readIndex(track, pos)) & (4026531840))) === Number(536870912)) ? 1 : 0)) {
                    let start = ((((runtime.readIndex(track, pos)) & (268435455))) | 0);
                    let end = ((((runtime.readIndex(track, ((pos) + (1)))) & (268435455))) | 0);
                    let ne = (((wspans).length) | 0);
                    for (let i = ((0) | 0); (((i) !== (ne)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if ((((((Number(runtime.readIndex(wspans, i).start) > Number(end)) ? 1 : 0)) || (((Number(runtime.readIndex(wspans, i).end) <= Number(start)) ? 1 : 0))) ? 1 : 0)) {
                            continue;
                        }
                        if ((((((Number(runtime.readIndex(wspans, i).start) >= Number(start)) ? 1 : 0)) && (((Number(runtime.subtract(runtime.readIndex(wspans, i).end, 1)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.vectorMethod(wspans, "erase", __addr_wspan_remove_damaged(runtime, runtime.container(wspans, "begin"), i));
                            i = ((((i) - (1))) | 0);
                            ne = ((((ne) - (1))) | 0);
                            continue;
                        }
                        if ((((((Number(runtime.readIndex(wspans, i).start) >= Number(start)) ? 1 : 0)) && (((Number(runtime.subtract(runtime.readIndex(wspans, i).end, 1)) > Number(end)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.readIndex(wspans, i).start = ((end) + (1));
                            while ((((((((runtime.readIndex(wspans, i).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, i).flux_change_positions, 0)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.vectorMethod(runtime.readIndex(wspans, i).flux_change_positions, "erase", (__t0 = __deref_wspan_remove_damaged(runtime, runtime.readIndex(wspans, i).flux_change_positions), typeof __t0.begin === 'function' ? (__t0.begin() ?? 0) : runtime.container(runtime.readIndex(wspans, i).flux_change_positions, "begin")));
                            }
                            continue;
                        }
                        if ((((((Number(runtime.readIndex(wspans, i).start) < Number(start)) ? 1 : 0)) && (((Number(runtime.subtract(runtime.readIndex(wspans, i).end, 1)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.readIndex(wspans, i).end = start;
                            while ((((((((runtime.readIndex(wspans, i).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, i).flux_change_positions, runtime.subtract((runtime.readIndex(wspans, i).flux_change_positions).length, 1))) >= Number(start)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.vectorMethod(runtime.readIndex(wspans, i).flux_change_positions, "erase", __addr_wspan_remove_damaged(runtime, (__t1 = __deref_wspan_remove_damaged(runtime, runtime.readIndex(wspans, i).flux_change_positions), typeof __t1.end === 'function' ? (__t1.end() ?? 0) : runtime.container(runtime.readIndex(wspans, i).flux_change_positions, "end")), -(1)));
                            }
                            continue;
                        }
                        let id = (((wspans).length) | 0);
                        (wspans = runtime.resize(wspans, ((id) + (1))));
                        runtime.readIndex(wspans, id).start = ((end) + (1));
                        runtime.readIndex(wspans, id).end = runtime.readIndex(wspans, i).end;
                        runtime.readIndex(wspans, id).flux_change_positions = runtime.readIndex(wspans, i).flux_change_positions;
                        runtime.readIndex(wspans, i).end = start;
                        while ((((((((runtime.readIndex(wspans, i).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, i).flux_change_positions, runtime.subtract((runtime.readIndex(wspans, i).flux_change_positions).length, 1))) >= Number(start)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.vectorMethod(runtime.readIndex(wspans, i).flux_change_positions, "erase", __addr_wspan_remove_damaged(runtime, (__t2 = __deref_wspan_remove_damaged(runtime, runtime.readIndex(wspans, i).flux_change_positions), typeof __t2.end === 'function' ? (__t2.end() ?? 0) : runtime.container(runtime.readIndex(wspans, i).flux_change_positions, "end")), -(1)));
                        }
                        while ((((((((runtime.readIndex(wspans, id).flux_change_positions).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(runtime.readIndex(runtime.readIndex(wspans, id).flux_change_positions, 0)) <= Number(end)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.vectorMethod(runtime.readIndex(wspans, id).flux_change_positions, "erase", (__t3 = __deref_wspan_remove_damaged(runtime, runtime.readIndex(wspans, id).flux_change_positions), typeof __t3.begin === 'function' ? (__t3.begin() ?? 0) : runtime.container(runtime.readIndex(wspans, id).flux_change_positions, "begin")));
                        }
                    }
                }
            }
        }
        function __addr_wspan_remove_damaged(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function __deref_wspan_remove_damaged(runtime, p) {
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
        function method_wspan_write(runtime, wspans, track) {
            const members = runtime.members;
            for (let __range0 = wspans, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                const __range0_item = runtime.readIndex(__range0, __range0_index);
                let si = 0;
                let ei = 0;
                for (si = 0; ((Number(si) !== Number((track).length)) ? 1 : 0); si = ((si) + (1))) {
                    if (((Number(((runtime.readIndex(track, si)) & (268435455))) >= Number(__range0_item.start)) ? 1 : 0)) {
                        break;
                    }
                }
                for (ei = si; ((Number(ei) !== Number((track).length)) ? 1 : 0); ei = ((ei) + (1))) {
                    if (((Number(((runtime.readIndex(track, ei)) & (268435455))) >= Number(__range0_item.end)) ? 1 : 0)) {
                        break;
                    }
                }
                if ((((((Number(si) !== Number((track).length)) ? 1 : 0)) && (((Number(((runtime.readIndex(track, si)) & (4026531840))) === Number(805306368)) ? 1 : 0))) ? 1 : 0)) {
                    if ((((si) === (ei)) ? 1 : 0)) {
                        runtime.vectorMethod(track, "insert", __addr_wspan_write(runtime, runtime.container(track, "begin"), si), ((805306368) | (runtime.subtract(__range0_item.start, 1))));
                        runtime.vectorMethod(track, "insert", __addr_wspan_write(runtime, __addr_wspan_write(runtime, runtime.container(track, "begin"), si), 1), ((((runtime.readIndex(track, ((si) - (1)))) & (4026531840))) | (__range0_item.end)));
                        si = (ei = ((si) + (1)));
                    }
                    else {
                        runtime.writeIndex(track, si, ((805306368) | (runtime.subtract(__range0_item.start, 1))));
                        si = ((si) + (1));
                    }
                }
                if ((((((Number(ei) !== Number((track).length)) ? 1 : 0)) && (((Number(((runtime.readIndex(track, ei)) & (4026531840))) === Number(805306368)) ? 1 : 0))) ? 1 : 0)) {
                    runtime.writeIndex(track, ((ei) - (1)), ((268435456) | (__range0_item.end)));
                    ei = ((ei) - (1));
                }
                runtime.vectorMethod(track, "erase", __addr_wspan_write(runtime, runtime.container(track, "begin"), si), __addr_wspan_write(runtime, runtime.container(track, "begin"), ei));
                for (let __range1 = __range0_item.flux_change_positions, __range1_index = 0; ((Number(__range1_index) < Number(__range1.length)) ? 1 : 0); __range1_index = ((__range1_index) + (1))) {
                    const __range1_item = runtime.readIndex(__range1, __range1_index);
                    runtime.vectorMethod(track, "insert", __addr_wspan_write(runtime, runtime.container(track, "begin"), si), ((0) | (__range1_item)));
                    si = ((si) + (1));
                }
            }
        }
        function __addr_wspan_write(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function method_tfsel_w(runtime, state) {
            const members = runtime.members;
        }
        function method_inuse_w(runtime, state) {
            const members = runtime.members;
        }
        function method_floppy_image_device__tfsel_w(runtime, state) {
            const members = runtime.members;
        }
        function method_floppy_image_device__inuse_w(runtime, state) {
            const members = runtime.members;
        }
        function method_cache_fill__lambda0(runtime, a, b) {
            const members = runtime.members;
            return ((Number(a) < Number(((b) & (268435455)))) ? 1 : 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct_5": method___construct_5,
            "__construct_3": method___construct_3,
            "track_changed": method_track_changed,
            "hash32": method_hash32,
            "wspan_split_on_wrap": method_wspan_split_on_wrap,
            "wspan_remove_damaged": method_wspan_remove_damaged,
            "wspan_write": method_wspan_write,
            "tfsel_w": method_tfsel_w,
            "inuse_w": method_inuse_w,
            "floppy_image_device::tfsel_w": method_floppy_image_device__tfsel_w,
            "floppy_image_device::inuse_w": method_floppy_image_device__inuse_w,
            "cache_fill__lambda0": method_cache_fill__lambda0
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
