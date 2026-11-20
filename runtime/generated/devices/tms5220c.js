import deviceData from './tms5220c.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [0, 2, 4, 6];
    function method_register_for_save_states(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"], __L1 = __l["save_item"];
        const h_m_fifo = members.m_fifo ?? 0;
        const h_m_new_frame_k_idx = members.m_new_frame_k_idx ?? 0;
        const h_m_current_k = members.m_current_k ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_x = members.m_x ?? 0;
        (__L1 ? __L1((__L0 ? __L0((members.m_PDC ?? 0)) : runtime.macro("NAME", (members.m_PDC ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_PDC ?? 0)) : runtime.macro("NAME", (members.m_PDC ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_CTL_pins ?? 0)) : runtime.macro("NAME", (members.m_CTL_pins ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_CTL_pins ?? 0)) : runtime.macro("NAME", (members.m_CTL_pins ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_state ?? 0)) : runtime.macro("NAME", (members.m_state ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_address ?? 0)) : runtime.macro("NAME", (members.m_address ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_address ?? 0)) : runtime.macro("NAME", (members.m_address ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_next_is_address ?? 0)) : runtime.macro("NAME", (members.m_next_is_address ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_next_is_address ?? 0)) : runtime.macro("NAME", (members.m_next_is_address ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_schedule_dummy_read ?? 0)) : runtime.macro("NAME", (members.m_schedule_dummy_read ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_schedule_dummy_read ?? 0)) : runtime.macro("NAME", (members.m_schedule_dummy_read ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_addr_bit ?? 0)) : runtime.macro("NAME", (members.m_addr_bit ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_addr_bit ?? 0)) : runtime.macro("NAME", (members.m_addr_bit ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_CTL_buffer ?? 0)) : runtime.macro("NAME", (members.m_CTL_buffer ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_CTL_buffer ?? 0)) : runtime.macro("NAME", (members.m_CTL_buffer ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_read_byte_register ?? 0)) : runtime.macro("NAME", (members.m_read_byte_register ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_read_byte_register ?? 0)) : runtime.macro("NAME", (members.m_read_byte_register ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_RDB_flag ?? 0)) : runtime.macro("NAME", (members.m_RDB_flag ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_RDB_flag ?? 0)) : runtime.macro("NAME", (members.m_RDB_flag ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0(h_m_fifo) : runtime.macro("NAME", h_m_fifo))) : runtime.macro("save_item", (__L0 ? __L0(h_m_fifo) : runtime.macro("NAME", h_m_fifo))));
        (__L1 ? __L1((__L0 ? __L0((members.m_fifo_head ?? 0)) : runtime.macro("NAME", (members.m_fifo_head ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_fifo_head ?? 0)) : runtime.macro("NAME", (members.m_fifo_head ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_fifo_tail ?? 0)) : runtime.macro("NAME", (members.m_fifo_tail ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_fifo_tail ?? 0)) : runtime.macro("NAME", (members.m_fifo_tail ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_fifo_count ?? 0)) : runtime.macro("NAME", (members.m_fifo_count ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_fifo_count ?? 0)) : runtime.macro("NAME", (members.m_fifo_count ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_fifo_bits_taken ?? 0)) : runtime.macro("NAME", (members.m_fifo_bits_taken ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_fifo_bits_taken ?? 0)) : runtime.macro("NAME", (members.m_fifo_bits_taken ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_previous_talk_status ?? 0)) : runtime.macro("NAME", (members.m_previous_talk_status ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_previous_talk_status ?? 0)) : runtime.macro("NAME", (members.m_previous_talk_status ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_SPEN ?? 0)) : runtime.macro("NAME", (members.m_SPEN ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_SPEN ?? 0)) : runtime.macro("NAME", (members.m_SPEN ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_DDIS ?? 0)) : runtime.macro("NAME", (members.m_DDIS ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_DDIS ?? 0)) : runtime.macro("NAME", (members.m_DDIS ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_TALK ?? 0)) : runtime.macro("NAME", (members.m_TALK ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_TALK ?? 0)) : runtime.macro("NAME", (members.m_TALK ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_TALKD ?? 0)) : runtime.macro("NAME", (members.m_TALKD ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_TALKD ?? 0)) : runtime.macro("NAME", (members.m_TALKD ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_buffer_low ?? 0)) : runtime.macro("NAME", (members.m_buffer_low ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_buffer_low ?? 0)) : runtime.macro("NAME", (members.m_buffer_low ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_buffer_empty ?? 0)) : runtime.macro("NAME", (members.m_buffer_empty ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_buffer_empty ?? 0)) : runtime.macro("NAME", (members.m_buffer_empty ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_irq_pin ?? 0)) : runtime.macro("NAME", (members.m_irq_pin ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_irq_pin ?? 0)) : runtime.macro("NAME", (members.m_irq_pin ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_ready_pin ?? 0)) : runtime.macro("NAME", (members.m_ready_pin ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_ready_pin ?? 0)) : runtime.macro("NAME", (members.m_ready_pin ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_command_register ?? 0)) : runtime.macro("NAME", (members.m_command_register ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_command_register ?? 0)) : runtime.macro("NAME", (members.m_command_register ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_data_latched ?? 0)) : runtime.macro("NAME", (members.m_data_latched ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_data_latched ?? 0)) : runtime.macro("NAME", (members.m_data_latched ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_OLDE ?? 0)) : runtime.macro("NAME", (members.m_OLDE ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_OLDE ?? 0)) : runtime.macro("NAME", (members.m_OLDE ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_OLDP ?? 0)) : runtime.macro("NAME", (members.m_OLDP ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_OLDP ?? 0)) : runtime.macro("NAME", (members.m_OLDP ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_new_frame_energy_idx ?? 0)) : runtime.macro("NAME", (members.m_new_frame_energy_idx ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_new_frame_energy_idx ?? 0)) : runtime.macro("NAME", (members.m_new_frame_energy_idx ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_new_frame_pitch_idx ?? 0)) : runtime.macro("NAME", (members.m_new_frame_pitch_idx ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_new_frame_pitch_idx ?? 0)) : runtime.macro("NAME", (members.m_new_frame_pitch_idx ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0(h_m_new_frame_k_idx) : runtime.macro("NAME", h_m_new_frame_k_idx))) : runtime.macro("save_item", (__L0 ? __L0(h_m_new_frame_k_idx) : runtime.macro("NAME", h_m_new_frame_k_idx))));
        (__L1 ? __L1((__L0 ? __L0((members.m_current_energy ?? 0)) : runtime.macro("NAME", (members.m_current_energy ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_current_energy ?? 0)) : runtime.macro("NAME", (members.m_current_energy ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_current_pitch ?? 0)) : runtime.macro("NAME", (members.m_current_pitch ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_current_pitch ?? 0)) : runtime.macro("NAME", (members.m_current_pitch ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0(h_m_current_k) : runtime.macro("NAME", h_m_current_k))) : runtime.macro("save_item", (__L0 ? __L0(h_m_current_k) : runtime.macro("NAME", h_m_current_k))));
        (__L1 ? __L1((__L0 ? __L0((members.m_previous_energy ?? 0)) : runtime.macro("NAME", (members.m_previous_energy ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_previous_energy ?? 0)) : runtime.macro("NAME", (members.m_previous_energy ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_subcycle ?? 0)) : runtime.macro("NAME", (members.m_subcycle ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_subcycle ?? 0)) : runtime.macro("NAME", (members.m_subcycle ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_subc_reload ?? 0)) : runtime.macro("NAME", (members.m_subc_reload ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_subc_reload ?? 0)) : runtime.macro("NAME", (members.m_subc_reload ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_PC ?? 0)) : runtime.macro("NAME", (members.m_PC ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_PC ?? 0)) : runtime.macro("NAME", (members.m_PC ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_IP ?? 0)) : runtime.macro("NAME", (members.m_IP ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_IP ?? 0)) : runtime.macro("NAME", (members.m_IP ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_inhibit ?? 0)) : runtime.macro("NAME", (members.m_inhibit ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_inhibit ?? 0)) : runtime.macro("NAME", (members.m_inhibit ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_uv_zpar ?? 0)) : runtime.macro("NAME", (members.m_uv_zpar ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_uv_zpar ?? 0)) : runtime.macro("NAME", (members.m_uv_zpar ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_zpar ?? 0)) : runtime.macro("NAME", (members.m_zpar ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_zpar ?? 0)) : runtime.macro("NAME", (members.m_zpar ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_pitch_zero ?? 0)) : runtime.macro("NAME", (members.m_pitch_zero ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_pitch_zero ?? 0)) : runtime.macro("NAME", (members.m_pitch_zero ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_c_variant_rate ?? 0)) : runtime.macro("NAME", (members.m_c_variant_rate ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_c_variant_rate ?? 0)) : runtime.macro("NAME", (members.m_c_variant_rate ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_pitch_count ?? 0)) : runtime.macro("NAME", (members.m_pitch_count ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_pitch_count ?? 0)) : runtime.macro("NAME", (members.m_pitch_count ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0(h_m_u) : runtime.macro("NAME", h_m_u))) : runtime.macro("save_item", (__L0 ? __L0(h_m_u) : runtime.macro("NAME", h_m_u))));
        (__L1 ? __L1((__L0 ? __L0(h_m_x) : runtime.macro("NAME", h_m_x))) : runtime.macro("save_item", (__L0 ? __L0(h_m_x) : runtime.macro("NAME", h_m_x))));
        (__L1 ? __L1((__L0 ? __L0((members.m_RNG ?? 0)) : runtime.macro("NAME", (members.m_RNG ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_RNG ?? 0)) : runtime.macro("NAME", (members.m_RNG ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_excitation_data ?? 0)) : runtime.macro("NAME", (members.m_excitation_data ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_excitation_data ?? 0)) : runtime.macro("NAME", (members.m_excitation_data ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_digital_select ?? 0)) : runtime.macro("NAME", (members.m_digital_select ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_digital_select ?? 0)) : runtime.macro("NAME", (members.m_digital_select ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_io_ready ?? 0)) : runtime.macro("NAME", (members.m_io_ready ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_io_ready ?? 0)) : runtime.macro("NAME", (members.m_io_ready ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_true_timing ?? 0)) : runtime.macro("NAME", (members.m_true_timing ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_true_timing ?? 0)) : runtime.macro("NAME", (members.m_true_timing ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_rs_ws ?? 0)) : runtime.macro("NAME", (members.m_rs_ws ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_rs_ws ?? 0)) : runtime.macro("NAME", (members.m_rs_ws ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_read_latch ?? 0)) : runtime.macro("NAME", (members.m_read_latch ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_read_latch ?? 0)) : runtime.macro("NAME", (members.m_read_latch ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_write_latch ?? 0)) : runtime.macro("NAME", (members.m_write_latch ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_write_latch ?? 0)) : runtime.macro("NAME", (members.m_write_latch ?? 0)))));
    }
    function method_printbits(runtime, data, num) {
        const members = runtime.members;
        for (let i = ((((num) - (1))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            0;
        }
        switch (((((num) - (1))) & (252))) {
            case 0:
                {
                    0;
                    break;
                }
            case 4:
                {
                    0;
                    break;
                }
            case 8:
                {
                    0;
                    break;
                }
            case 12:
                {
                    0;
                    break;
                }
            default:
                {
                    0;
                    break;
                }
        }
    }
    function method_vsm_write(runtime, rc, m0, m1, addr) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_m0_cb"], __L1 = __l["m_m1_cb"], __L2 = __l["m_addr_cb"], __L3 = __l["m_romclk_cb"];
        let __t0;
        rc = ((rc) & 0xff);
        m0 = ((m0) & 0xff);
        m1 = ((m1) & 0xff);
        addr = ((addr) & 0xff);
        (__L0 ? __L0(Number(m0)) : typeof members.m_m0_cb === 'function' ? members.m_m0_cb(m0) : runtime.invoke("m_m0_cb", m0));
        (__L1 ? __L1(Number(m1)) : typeof members.m_m1_cb === 'function' ? members.m_m1_cb(m1) : runtime.invoke("m_m1_cb", m1));
        (__L2 ? __L2(Number(0), Number(addr)) : typeof members.m_addr_cb === 'function' ? members.m_addr_cb(0, addr) : runtime.invoke("m_addr_cb", 0, addr));
        if ((((__t0 = __deref_vsm_write(runtime, members.m_romclk_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_romclk_cb, "isunset"))) ? 0 : 1)) {
            (__L3 ? __L3(Number(rc)) : typeof members.m_romclk_cb === 'function' ? members.m_romclk_cb(rc) : runtime.invoke("m_romclk_cb", rc));
        }
    }
    function __deref_vsm_write(runtime, p) {
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
    function method_vsm_write_addr(runtime, addr) {
        const members = runtime.members;
        addr = ((addr) & 0xff);
        method_vsm_write(runtime, 1, 0, 1, addr);
        method_vsm_write(runtime, 0, 0, 1, addr);
        method_vsm_write(runtime, 1, 0, 0, addr);
        method_vsm_write(runtime, 0, 0, 0, addr);
    }
    function method_vsm_read(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_data_cb"];
        let __t0;
        method_vsm_write(runtime, 1, 1, 0, 0);
        method_vsm_write(runtime, 0, 1, 0, 0);
        method_vsm_write(runtime, 1, 0, 0, 0);
        method_vsm_write(runtime, 0, 0, 0, 0);
        let val = ((0) & 0xff);
        if ((((__t0 = __deref_vsm_read(runtime, members.m_data_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_data_cb, "isunset"))) ? 0 : 1)) {
            val = (((__L0 ? __L0() : typeof members.m_data_cb === 'function' ? members.m_data_cb() : runtime.invoke("m_data_cb"))) & 0xff);
        }
        else {
            0;
        }
        return ((val) & 0xff);
    }
    function __deref_vsm_read(runtime, p) {
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
    function method_vsm_read_and_branch(runtime) {
        const members = runtime.members;
        method_vsm_write(runtime, 0, 1, 1, 0);
        method_vsm_write(runtime, 1, 1, 1, 0);
        method_vsm_write(runtime, 0, 1, 1, 0);
        method_vsm_write(runtime, 0, 0, 0, 0);
        method_vsm_write(runtime, 1, 0, 0, 0);
        method_vsm_write(runtime, 0, 0, 0, 0);
    }
    function method_data_write(runtime, data) {
        const members = runtime.members;
        const h_m_fifo = members.m_fifo ?? 0;
        const h_m_new_frame_k_idx = members.m_new_frame_k_idx ?? 0;
        let old_buffer_low = (((members.m_buffer_low ?? 0)) ? 1 : 0);
        0;
        if ((members.m_DDIS ?? 0)) {
            if (((Number((members.m_fifo_count ?? 0)) < Number(16)) ? 1 : 0)) {
                h_m_fifo[(members.m_fifo_tail ?? 0)] = data;
                members.m_fifo_tail = (((((((members.m_fifo_tail ?? 0)) + (1))) % (16))) & 0xff);
                members.m_fifo_count = ((((members.m_fifo_count) + (1))) & 0xff);
                0;
                method_update_fifo_status_and_ints(runtime);
                if (((((((members.m_SPEN ?? 0)) ? 0 : 1)) && ((((old_buffer_low) && ((((members.m_buffer_low ?? 0)) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
                    0;
                    members.m_zpar = ((1) ? 1 : 0);
                    members.m_uv_zpar = ((1) ? 1 : 0);
                    members.m_OLDE = ((1) ? 1 : 0);
                    members.m_OLDP = ((1) ? 1 : 0);
                    members.m_SPEN = ((1) ? 1 : 0);
                    members.m_TALK = ((1) ? 1 : 0);
                    members.m_new_frame_energy_idx = ((0) & 0xff);
                    members.m_new_frame_pitch_idx = ((0) & 0xff);
                    for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        h_m_new_frame_k_idx[i] = 0;
                    }
                    for (let i = ((4) | 0); (((i) < (7)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        h_m_new_frame_k_idx[i] = 15;
                    }
                    for (let i = ((7) | 0); (((i) < (__deref_data_write(runtime, (members.m_coeff ?? 0)).num_k)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        h_m_new_frame_k_idx[i] = 7;
                    }
                }
            }
            else {
                0;
            }
            members.m_data_latched = ((0) ? 1 : 0);
        }
        else {
            method_process_command(runtime, data);
        }
        if ((((members.m_data_latched ?? 0)) ? 0 : 1)) {
            members.m_io_ready = ((1) ? 1 : 0);
        }
    }
    function __deref_data_write(runtime, p) {
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
    function method_update_fifo_status_and_ints(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clocks_to_attotime"];
        if (0) {
            return;
        }
        method_update_ready_state(runtime);
        if (((((members.m_fifo_count ?? 0)) <= (8)) ? 1 : 0)) {
            if ((((members.m_buffer_low ?? 0)) ? 0 : 1)) {
                members.m_buffer_low = ((1) ? 1 : 0);
                method_set_interrupt_state(runtime, 1);
            }
        }
        else {
            members.m_buffer_low = ((0) ? 1 : 0);
        }
        if (((((members.m_fifo_count ?? 0)) === (0)) ? 1 : 0)) {
            if ((((members.m_buffer_empty ?? 0)) ? 0 : 1)) {
                members.m_buffer_empty = ((1) ? 1 : 0);
                method_set_interrupt_state(runtime, 1);
            }
            if ((members.m_DDIS ?? 0)) {
                members.m_TALK = (((members.m_SPEN = ((0) ? 1 : 0))) ? 1 : 0);
            }
        }
        else {
            members.m_buffer_empty = ((0) ? 1 : 0);
        }
        if (((((members.m_previous_talk_status ?? 0)) && (((method_talk_status(runtime)) ? 0 : 1))) ? 1 : 0)) {
            0;
            method_set_interrupt_state(runtime, 1);
            members.m_DDIS = ((0) ? 1 : 0);
            members.m_previous_talk_status = ((0) ? 1 : 0);
            if (((Number((members.m_command_register ?? 0)) !== Number(255)) ? 1 : 0)) {
                0;
                method_process_command(runtime, (members.m_command_register ?? 0));
                if ((members.m_data_latched ?? 0)) {
                    0;
                    (__deref_update_fifo_status_and_ints(runtime, members.m_timer_io_ready).adjust?.((__L0 ? __L0(16) : runtime.macro("clocks_to_attotime", 16)), 1) ?? 0);
                }
                else {
                    members.m_io_ready = ((1) ? 1 : 0);
                }
                method_update_ready_state(runtime);
            }
        }
        members.m_previous_talk_status = ((method_talk_status(runtime)) ? 1 : 0);
        if ((((((((members.m_rs_ws ?? 0)) === (1)) ? 1 : 0)) && ((((members.m_RDB_flag ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_read_latch = ((method_status_read(runtime, 0)) & 0xff);
        }
    }
    function __deref_update_fifo_status_and_ints(runtime, p) {
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
    function method_update_ready_state(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_readyq_handler"];
        let state = (((members.m_io_ready ?? 0)) ? 1 : 0);
        if (((Number((members.m_ready_pin ?? 0)) !== Number(state)) ? 1 : 0)) {
            0;
            (__L0 ? __L0(Number(((state) ? 0 : 1))) : typeof members.m_readyq_handler === 'function' ? members.m_readyq_handler(((state) ? 0 : 1)) : runtime.invoke("m_readyq_handler", ((state) ? 0 : 1)));
            members.m_ready_pin = ((state) ? 1 : 0);
        }
    }
    function method_set_interrupt_state(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_irq_handler"];
        if (0) {
            return;
        }
        0;
        if (((Number(state) !== Number((members.m_irq_pin ?? 0))) ? 1 : 0)) {
            members.m_irq_pin = ((state) ? 1 : 0);
            (__L0 ? __L0(Number(((state) ? 0 : 1))) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(((state) ? 0 : 1)) : runtime.invoke("m_irq_handler", ((state) ? 0 : 1)));
        }
    }
    function method_talk_status(runtime) {
        const members = runtime.members;
        return ((((members.m_SPEN ?? 0)) || ((members.m_TALKD ?? 0))) ? 1 : 0);
    }
    function method_process_command(runtime, cmd) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::begin"], __L1 = __l["std::end"], __L2 = __l["std::fill"], __L3 = __l["reset"];
        let __t0, __t1;
        cmd = ((cmd) & 0xff);
        const h_m_new_frame_k_idx = members.m_new_frame_k_idx ?? 0;
        const h_m_fifo = members.m_fifo ?? 0;
        members.m_command_register = ((cmd) & 0xff);
        switch (((cmd) & (112))) {
            case 16:
                {
                    0;
                    if (((method_talk_status(runtime)) ? 0 : 1)) {
                        if ((members.m_schedule_dummy_read ?? 0)) {
                            members.m_schedule_dummy_read = ((0) ? 1 : 0);
                            method_perform_dummy_read(runtime);
                        }
                        members.m_read_byte_register = ((method_read_bits(runtime, 8)) & 0xff);
                        members.m_RDB_flag = ((1) ? 1 : 0);
                        members.m_command_register = ((255) & 0xff);
                    }
                    else {
                        0;
                    }
                    break;
                }
            case 0:
            case 32:
                {
                    if (1) {
                        0;
                        members.m_c_variant_rate = ((((cmd) & (15))) & 0xff);
                    }
                    else {
                        0;
                    }
                    members.m_command_register = ((255) & 0xff);
                    break;
                }
            case 48:
                {
                    if (((method_talk_status(runtime)) ? 0 : 1)) {
                        0;
                        members.m_RDB_flag = ((0) ? 1 : 0);
                        if ((members.m_schedule_dummy_read ?? 0)) {
                            members.m_schedule_dummy_read = ((0) ? 1 : 0);
                            method_perform_dummy_read(runtime);
                        }
                        if ((((__t0 = __deref_process_command(runtime, members.m_m0_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_m0_cb, "isunset"))) ? 0 : 1)) {
                            method_vsm_read_and_branch(runtime);
                        }
                        else {
                            0;
                        }
                        members.m_command_register = ((255) & 0xff);
                    }
                    break;
                }
            case 64:
                {
                    if (((method_talk_status(runtime)) ? 0 : 1)) {
                        0;
                        if ((((__t1 = __deref_process_command(runtime, members.m_m0_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_m0_cb, "isunset"))) ? 0 : 1)) {
                            method_vsm_write_addr(runtime, ((cmd) & (15)));
                        }
                        members.m_schedule_dummy_read = ((1) ? 1 : 0);
                        members.m_command_register = ((255) & 0xff);
                    }
                    else {
                    }
                    break;
                }
            case 80:
                {
                    0;
                    if ((members.m_schedule_dummy_read ?? 0)) {
                        members.m_schedule_dummy_read = ((0) ? 1 : 0);
                        method_perform_dummy_read(runtime);
                    }
                    members.m_SPEN = ((1) ? 1 : 0);
                    members.m_TALK = ((1) ? 1 : 0);
                    members.m_DDIS = ((0) ? 1 : 0);
                    members.m_zpar = ((1) ? 1 : 0);
                    members.m_uv_zpar = ((1) ? 1 : 0);
                    members.m_OLDE = ((1) ? 1 : 0);
                    members.m_OLDP = ((1) ? 1 : 0);
                    members.m_new_frame_energy_idx = ((0) & 0xff);
                    members.m_new_frame_pitch_idx = ((0) & 0xff);
                    for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        h_m_new_frame_k_idx[i] = 0;
                    }
                    for (let i = ((4) | 0); (((i) < (7)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        h_m_new_frame_k_idx[i] = 15;
                    }
                    for (let i = ((7) | 0); (((i) < (__deref_process_command(runtime, (members.m_coeff ?? 0)).num_k)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        h_m_new_frame_k_idx[i] = 7;
                    }
                    members.m_command_register = ((255) & 0xff);
                    break;
                }
            case 96:
                {
                    0;
                    (__L2 ? __L2((__L0 ? __L0(h_m_fifo) : runtime.macro("std::begin", h_m_fifo)), (__L1 ? __L1(h_m_fifo) : runtime.macro("std::end", h_m_fifo)), 0) : runtime.macro("std::fill", (__L0 ? __L0(h_m_fifo) : runtime.macro("std::begin", h_m_fifo)), (__L1 ? __L1(h_m_fifo) : runtime.macro("std::end", h_m_fifo)), 0));
                    members.m_fifo_head = (((members.m_fifo_tail = (((members.m_fifo_count = (((members.m_fifo_bits_taken = ((0) & 0xff))) & 0xff))) & 0xff))) & 0xff);
                    members.m_DDIS = ((1) ? 1 : 0);
                    members.m_zpar = ((1) ? 1 : 0);
                    members.m_uv_zpar = ((1) ? 1 : 0);
                    members.m_OLDE = ((1) ? 1 : 0);
                    members.m_OLDP = ((1) ? 1 : 0);
                    members.m_new_frame_energy_idx = ((0) & 0xff);
                    members.m_new_frame_pitch_idx = ((0) & 0xff);
                    for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        h_m_new_frame_k_idx[i] = 0;
                    }
                    for (let i = ((4) | 0); (((i) < (7)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        h_m_new_frame_k_idx[i] = 15;
                    }
                    for (let i = ((7) | 0); (((i) < (__deref_process_command(runtime, (members.m_coeff ?? 0)).num_k)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        h_m_new_frame_k_idx[i] = 7;
                    }
                    members.m_RDB_flag = ((0) ? 1 : 0);
                    members.m_command_register = ((255) & 0xff);
                    break;
                }
            case 112:
                {
                    0;
                    if ((members.m_schedule_dummy_read ?? 0)) {
                        members.m_schedule_dummy_read = ((0) ? 1 : 0);
                        method_perform_dummy_read(runtime);
                    }
                    (__L3 ? __L3() : runtime.macro("reset"));
                    members.m_command_register = ((255) & 0xff);
                    break;
                }
        }
        method_update_fifo_status_and_ints(runtime);
    }
    function __deref_process_command(runtime, p) {
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
    function method_perform_dummy_read(runtime) {
        const members = runtime.members;
        let __t0;
        members.m_schedule_dummy_read = ((0) ? 1 : 0);
        if ((((__t0 = __deref_perform_dummy_read(runtime, members.m_m0_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_m0_cb, "isunset"))) ? 0 : 1)) {
            0;
            method_vsm_write_addr(runtime, 0);
            method_vsm_read(runtime);
        }
    }
    function __deref_perform_dummy_read(runtime, p) {
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
    function method_read_bits(runtime, count) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        const h_m_fifo = members.m_fifo ?? 0;
        let val = ((0) | 0);
        if ((members.m_DDIS ?? 0)) {
            while ((__t0 = count, count = ((((count) - (1))) | 0), __t0)) {
                val = ((((((val) << (1))) | (((((h_m_fifo[(members.m_fifo_head ?? 0)]) >>> ((members.m_fifo_bits_taken ?? 0)))) & (1))))) | 0);
                members.m_fifo_bits_taken = ((((members.m_fifo_bits_taken) + (1))) & 0xff);
                if (((((members.m_fifo_bits_taken ?? 0)) >= (8)) ? 1 : 0)) {
                    members.m_fifo_count = ((((members.m_fifo_count) - (1))) & 0xff);
                    h_m_fifo[(members.m_fifo_head ?? 0)] = 0;
                    members.m_fifo_head = (((((((members.m_fifo_head ?? 0)) + (1))) % (16))) & 0xff);
                    members.m_fifo_bits_taken = ((0) & 0xff);
                    method_update_fifo_status_and_ints(runtime);
                }
            }
        }
        else {
            if ((((__t1 = __deref_read_bits(runtime, members.m_m0_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_m0_cb, "isunset"))) ? 0 : 1)) {
                while ((__t2 = count, count = ((((count) - (1))) | 0), __t2)) {
                    val = ((((((val) << (1))) | (method_vsm_read(runtime)))) | 0);
                    0;
                }
            }
            else {
                val = ((((((1) << (count))) - (1))) | 0);
            }
        }
        return ((val) | 0);
    }
    function __deref_read_bits(runtime, p) {
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
    function method_status_read(runtime, clear_int) {
        const members = runtime.members;
        if ((members.m_RDB_flag ?? 0)) {
            members.m_RDB_flag = ((0) ? 1 : 0);
            return (((members.m_read_byte_register ?? 0)) & 0xff);
        }
        else {
            if (clear_int) {
                method_set_interrupt_state(runtime, 0);
            }
            0;
            return ((((((((method_talk_status(runtime)) << (7))) | ((((members.m_buffer_low ?? 0)) << (6))))) | ((((members.m_buffer_empty ?? 0)) << (5))))) & 0xff);
        }
    }
    function method_ready_read(runtime) {
        const members = runtime.members;
        0;
        if ((((members.m_true_timing ?? 0)) ? 0 : 1)) {
            return ((((((((Number((members.m_fifo_count ?? 0)) < Number(16)) ? 1 : 0)) || ((((members.m_DDIS ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((members.m_io_ready ?? 0))) ? 1 : 0);
        }
        else {
            return (members.m_io_ready ?? 0);
        }
    }
    function method_int_read(runtime) {
        const members = runtime.members;
        0;
        return (members.m_irq_pin ?? 0);
    }
    function method_process(runtime, buffer, size) {
        const members = runtime.members;
        const h_m_current_k = members.m_current_k ?? 0;
        const h_m_new_frame_k_idx = members.m_new_frame_k_idx ?? 0;
        let buf_count = ((0) | 0);
        let i = ((0) | 0);
        let bitout = ((0) | 0);
        let this_sample = ((0) | 0);
        0;
        while (((Number(size) > Number(0)) ? 1 : 0)) {
            if ((members.m_TALKD ?? 0)) {
                if (((((((((((members.m_IP ?? 0)) === (0)) ? 1 : 0)) && (((((members.m_PC ?? 0)) === (12)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_subcycle ?? 0)) === (1)) ? 1 : 0))) ? 1 : 0)) {
                    members.m_IP = (((__mame_table_0[((((((members.m_c_variant_rate ?? 0)) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
                    method_parse_frame(runtime);
                    if (method_new_frame_stop_flag(runtime)) {
                        members.m_TALK = (((members.m_SPEN = ((0) ? 1 : 0))) ? 1 : 0);
                        method_update_fifo_status_and_ints(runtime);
                    }
                    if ((((((((((((((((members.m_OLDP ?? 0)) ? 0 : 1)) && (method_new_frame_unvoiced_flag(runtime))) ? 1 : 0)) || (((((members.m_OLDP ?? 0)) && (((method_new_frame_unvoiced_flag(runtime)) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) || (((((members.m_OLDE ?? 0)) && (((method_new_frame_silence_flag(runtime)) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) || (((((members.m_OLDP ?? 0)) && (method_new_frame_silence_flag(runtime))) ? 1 : 0))) ? 1 : 0)) {
                        members.m_inhibit = ((1) ? 1 : 0);
                    }
                    else {
                        members.m_inhibit = ((0) ? 1 : 0);
                    }
                    0;
                    0;
                    0;
                    0;
                }
                else {
                    let inhibit_state = ((((((members.m_inhibit ?? 0)) && (((((members.m_IP ?? 0)) !== (0)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
                    if (((((members.m_subcycle ?? 0)) === (2)) ? 1 : 0)) {
                        switch ((members.m_PC ?? 0)) {
                            case 0:
                                {
                                    if (((((members.m_IP ?? 0)) === (0)) ? 1 : 0)) {
                                        members.m_pitch_zero = ((0) ? 1 : 0);
                                    }
                                    members.m_current_energy = (((((((members.m_current_energy ?? 0)) + (runtime.shiftRight(((((__deref_process(runtime, (members.m_coeff ?? 0)).energytable[(members.m_new_frame_energy_idx ?? 0)]) - ((members.m_current_energy ?? 0)))) * (((1) - (inhibit_state)))), __deref_process(runtime, (members.m_coeff ?? 0)).interp_coeff[(members.m_IP ?? 0)])))) * (((1) - ((members.m_zpar ?? 0)))))) << 16 >> 16);
                                    break;
                                }
                            case 1:
                                {
                                    members.m_current_pitch = (((((((members.m_current_pitch ?? 0)) + (runtime.shiftRight(((((__deref_process(runtime, (members.m_coeff ?? 0)).pitchtable[(members.m_new_frame_pitch_idx ?? 0)]) - ((members.m_current_pitch ?? 0)))) * (((1) - (inhibit_state)))), __deref_process(runtime, (members.m_coeff ?? 0)).interp_coeff[(members.m_IP ?? 0)])))) * (((1) - ((members.m_zpar ?? 0)))))) << 16 >> 16);
                                    break;
                                }
                            case 2:
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                                {
                                    h_m_current_k[(((members.m_PC ?? 0)) - (2))] = ((((h_m_current_k[(((members.m_PC ?? 0)) - (2))]) + (runtime.shiftRight(((((runtime.readIndex(__deref_process(runtime, (members.m_coeff ?? 0)).ktable[(((members.m_PC ?? 0)) - (2))], h_m_new_frame_k_idx[(((members.m_PC ?? 0)) - (2))])) - (h_m_current_k[(((members.m_PC ?? 0)) - (2))]))) * (((1) - (inhibit_state)))), __deref_process(runtime, (members.m_coeff ?? 0)).interp_coeff[(members.m_IP ?? 0)])))) * (((1) - (((((Number((((members.m_PC ?? 0)) - (2))) < Number(4)) ? 1 : 0)) ? ((members.m_zpar ?? 0)) : ((members.m_uv_zpar ?? 0)))))));
                                    break;
                                }
                            case 12:
                                {
                                    break;
                                }
                        }
                    }
                }
                if ((members.m_OLDP ?? 0)) {
                    if ((((members.m_RNG ?? 0)) & (1))) {
                        members.m_excitation_data = ((-64) << 16 >> 16);
                    }
                    else {
                        members.m_excitation_data = ((64) << 16 >> 16);
                    }
                }
                else {
                    if (((((members.m_pitch_count ?? 0)) >= (51)) ? 1 : 0)) {
                        members.m_excitation_data = ((((__deref_process(runtime, (members.m_coeff ?? 0)).chirptable[51]) << 24 >> 24)) << 16 >> 16);
                    }
                    else {
                        members.m_excitation_data = ((((__deref_process(runtime, (members.m_coeff ?? 0)).chirptable[(members.m_pitch_count ?? 0)]) << 24 >> 24)) << 16 >> 16);
                    }
                }
                for (i = ((0) | 0); (((i) < (20)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    bitout = (((((((((((((members.m_RNG ?? 0)) >>> (12))) & (1))) ^ ((((((members.m_RNG ?? 0)) >>> (3))) & (1))))) ^ ((((((members.m_RNG ?? 0)) >>> (2))) & (1))))) ^ ((((((members.m_RNG ?? 0)) >>> (0))) & (1))))) | 0);
                    members.m_RNG = ((((members.m_RNG) << (1))) & 0xffff);
                    members.m_RNG = ((((members.m_RNG) | (bitout))) & 0xffff);
                }
                this_sample = ((method_lattice_filter(runtime)) | 0);
                0;
                for (i = ((0) | 0); (((i) < (10)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    0;
                }
                0;
                0;
                while ((((this_sample) > (16383)) ? 1 : 0)) {
                    this_sample = ((((this_sample) - (32768))) | 0);
                }
                while (((Number(this_sample) < Number(-16384)) ? 1 : 0)) {
                    this_sample = ((((this_sample) + (32768))) | 0);
                }
                if (((Number((members.m_digital_select ?? 0)) === Number(0)) ? 1 : 0)) {
                    runtime.writeIndex(buffer, buf_count, method_clip_analog(runtime, this_sample));
                }
                else {
                    this_sample = ((((this_sample) & (-16))) | 0);
                    runtime.writeIndex(buffer, buf_count, ((((this_sample) << (1))) | (runtime.shiftRight(((this_sample) & (15872)), 9))));
                }
                members.m_subcycle = ((((members.m_subcycle) + (1))) & 0xff);
                if ((((((((members.m_subcycle ?? 0)) === (2)) ? 1 : 0)) && (((((members.m_PC ?? 0)) === (12)) ? 1 : 0))) ? 1 : 0)) {
                    if ((((((((members.m_IP ?? 0)) === (7)) ? 1 : 0)) && ((members.m_inhibit ?? 0))) ? 1 : 0)) {
                        members.m_pitch_zero = ((1) ? 1 : 0);
                    }
                    if (((((members.m_IP ?? 0)) === (7)) ? 1 : 0)) {
                        members.m_OLDE = ((method_new_frame_silence_flag(runtime)) ? 1 : 0);
                        members.m_OLDP = ((method_new_frame_unvoiced_flag(runtime)) ? 1 : 0);
                        0;
                        if (((((((members.m_TALK ?? 0)) ? 0 : 1)) && ((((members.m_SPEN ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                            0;
                        }
                        members.m_TALKD = (((members.m_TALK ?? 0)) ? 1 : 0);
                        method_update_fifo_status_and_ints(runtime);
                        if (((((((members.m_TALK ?? 0)) ? 0 : 1)) && ((members.m_SPEN ?? 0))) ? 1 : 0)) {
                            members.m_TALK = ((1) ? 1 : 0);
                        }
                        0;
                    }
                    members.m_subcycle = (((members.m_subc_reload ?? 0)) & 0xff);
                    members.m_PC = ((0) & 0xff);
                    members.m_IP = ((((members.m_IP) + (1))) & 0xff);
                    members.m_IP = ((((members.m_IP) & (7))) & 0xff);
                }
                else {
                    if (((((members.m_subcycle ?? 0)) === (3)) ? 1 : 0)) {
                        members.m_subcycle = (((members.m_subc_reload ?? 0)) & 0xff);
                        members.m_PC = ((((members.m_PC) + (1))) & 0xff);
                    }
                }
                members.m_pitch_count = ((((members.m_pitch_count) + (1))) & 0xffff);
                if ((((((((members.m_pitch_count ?? 0)) >= ((members.m_current_pitch ?? 0))) ? 1 : 0)) || ((members.m_pitch_zero ?? 0))) ? 1 : 0)) {
                    members.m_pitch_count = ((0) & 0xffff);
                }
                members.m_pitch_count = ((((members.m_pitch_count) & (511))) & 0xffff);
            }
            else {
                members.m_subcycle = ((((members.m_subcycle) + (1))) & 0xff);
                if ((((((((members.m_subcycle ?? 0)) === (2)) ? 1 : 0)) && (((((members.m_PC ?? 0)) === (12)) ? 1 : 0))) ? 1 : 0)) {
                    if (((((members.m_IP ?? 0)) === (7)) ? 1 : 0)) {
                        members.m_TALKD = (((members.m_TALK ?? 0)) ? 1 : 0);
                        method_update_fifo_status_and_ints(runtime);
                        if (((((((members.m_TALK ?? 0)) ? 0 : 1)) && ((members.m_SPEN ?? 0))) ? 1 : 0)) {
                            members.m_TALK = ((1) ? 1 : 0);
                        }
                    }
                    members.m_subcycle = (((members.m_subc_reload ?? 0)) & 0xff);
                    members.m_PC = ((0) & 0xff);
                    members.m_IP = ((((members.m_IP) + (1))) & 0xff);
                    members.m_IP = ((((members.m_IP) & (7))) & 0xff);
                }
                else {
                    if (((((members.m_subcycle ?? 0)) === (3)) ? 1 : 0)) {
                        members.m_subcycle = (((members.m_subc_reload ?? 0)) & 0xff);
                        members.m_PC = ((((members.m_PC) + (1))) & 0xff);
                    }
                }
                runtime.writeIndex(buffer, buf_count, -1);
            }
            buf_count = ((((buf_count) + (1))) | 0);
            size = ((size) - (1));
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
    function method_parse_frame(runtime) {
        const members = runtime.members;
        const h_m_new_frame_k_idx = members.m_new_frame_k_idx ?? 0;
        let __goto_ranout = ((0) | 0);
        while (1) {
            let i = ((0) | 0);
            let rep_flag = ((0) | 0);
            members.m_uv_zpar = (((members.m_zpar = ((0) ? 1 : 0))) ? 1 : 0);
            if ((((1) && ((((members.m_c_variant_rate ?? 0)) & (4)))) ? 1 : 0)) {
                i = ((method_read_bits(runtime, 2)) | 0);
                method_printbits(runtime, i, 2);
                0;
                members.m_IP = (((__mame_table_0[((i) & 3)] ?? 0)) & 0xff);
            }
            else {
                members.m_IP = (((__mame_table_0[((((((members.m_c_variant_rate ?? 0)) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
            }
            method_update_fifo_status_and_ints(runtime);
            if (((((members.m_DDIS ?? 0)) && ((members.m_buffer_empty ?? 0))) ? 1 : 0)) {
                __goto_ranout = ((1) | 0);
                break;
            }
            members.m_new_frame_energy_idx = ((method_read_bits(runtime, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).energy_bits)) & 0xff);
            method_printbits(runtime, (members.m_new_frame_energy_idx ?? 0), __deref_parse_frame(runtime, (members.m_coeff ?? 0)).energy_bits);
            0;
            method_update_fifo_status_and_ints(runtime);
            if (((((members.m_DDIS ?? 0)) && ((members.m_buffer_empty ?? 0))) ? 1 : 0)) {
                __goto_ranout = ((1) | 0);
                break;
            }
            if ((((((((members.m_new_frame_energy_idx ?? 0)) === (0)) ? 1 : 0)) || (((((members.m_new_frame_energy_idx ?? 0)) === (15)) ? 1 : 0))) ? 1 : 0)) {
                return;
            }
            rep_flag = ((method_read_bits(runtime, 1)) | 0);
            method_printbits(runtime, rep_flag, 1);
            0;
            members.m_new_frame_pitch_idx = ((method_read_bits(runtime, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).pitch_bits)) & 0xff);
            method_printbits(runtime, (members.m_new_frame_pitch_idx ?? 0), __deref_parse_frame(runtime, (members.m_coeff ?? 0)).pitch_bits);
            0;
            members.m_uv_zpar = ((method_new_frame_unvoiced_flag(runtime)) ? 1 : 0);
            method_update_fifo_status_and_ints(runtime);
            if (((((members.m_DDIS ?? 0)) && ((members.m_buffer_empty ?? 0))) ? 1 : 0)) {
                __goto_ranout = ((1) | 0);
                break;
            }
            if (rep_flag) {
                return;
            }
            for (i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                h_m_new_frame_k_idx[i] = method_read_bits(runtime, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[i]);
                method_printbits(runtime, h_m_new_frame_k_idx[i], __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[i]);
                0;
                method_update_fifo_status_and_ints(runtime);
                if (((((members.m_DDIS ?? 0)) && ((members.m_buffer_empty ?? 0))) ? 1 : 0)) {
                    __goto_ranout = ((1) | 0);
                    break;
                }
            }
            if (__goto_ranout) {
                break;
            }
            if (((((members.m_new_frame_pitch_idx ?? 0)) === (0)) ? 1 : 0)) {
                return;
            }
            for (i = ((4) | 0); (((i) < (__deref_parse_frame(runtime, (members.m_coeff ?? 0)).num_k)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                h_m_new_frame_k_idx[i] = method_read_bits(runtime, __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[i]);
                method_printbits(runtime, h_m_new_frame_k_idx[i], __deref_parse_frame(runtime, (members.m_coeff ?? 0)).kbits[i]);
                0;
                method_update_fifo_status_and_ints(runtime);
                if (((((members.m_DDIS ?? 0)) && ((members.m_buffer_empty ?? 0))) ? 1 : 0)) {
                    __goto_ranout = ((1) | 0);
                    break;
                }
            }
            if (__goto_ranout) {
                break;
            }
            0;
            if ((members.m_DDIS ?? 0)) {
                0;
            }
            else {
                0;
            }
            return;
            break;
        }
        0;
        return;
    }
    function __deref_parse_frame(runtime, p) {
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
    function method_new_frame_unvoiced_flag(runtime) {
        const members = runtime.members;
        return ((((members.m_new_frame_pitch_idx ?? 0)) === (0)) ? 1 : 0);
    }
    function method_new_frame_stop_flag(runtime) {
        const members = runtime.members;
        return ((((members.m_new_frame_energy_idx ?? 0)) === (15)) ? 1 : 0);
    }
    function method_new_frame_silence_flag(runtime) {
        const members = runtime.members;
        return ((((members.m_new_frame_energy_idx ?? 0)) === (0)) ? 1 : 0);
    }
    function method_lattice_filter(runtime) {
        const members = runtime.members;
        const h_m_u = members.m_u ?? 0;
        const h_m_current_k = members.m_current_k ?? 0;
        const h_m_x = members.m_x ?? 0;
        h_m_u[10] = method_matrix_multiply(runtime, (members.m_previous_energy ?? 0), (((members.m_excitation_data ?? 0)) << (6)));
        h_m_u[9] = ((h_m_u[10]) - (method_matrix_multiply(runtime, h_m_current_k[9], h_m_x[9])));
        h_m_u[8] = ((h_m_u[9]) - (method_matrix_multiply(runtime, h_m_current_k[8], h_m_x[8])));
        h_m_u[7] = ((h_m_u[8]) - (method_matrix_multiply(runtime, h_m_current_k[7], h_m_x[7])));
        h_m_u[6] = ((h_m_u[7]) - (method_matrix_multiply(runtime, h_m_current_k[6], h_m_x[6])));
        h_m_u[5] = ((h_m_u[6]) - (method_matrix_multiply(runtime, h_m_current_k[5], h_m_x[5])));
        h_m_u[4] = ((h_m_u[5]) - (method_matrix_multiply(runtime, h_m_current_k[4], h_m_x[4])));
        h_m_u[3] = ((h_m_u[4]) - (method_matrix_multiply(runtime, h_m_current_k[3], h_m_x[3])));
        h_m_u[2] = ((h_m_u[3]) - (method_matrix_multiply(runtime, h_m_current_k[2], h_m_x[2])));
        h_m_u[1] = ((h_m_u[2]) - (method_matrix_multiply(runtime, h_m_current_k[1], h_m_x[1])));
        h_m_u[0] = ((h_m_u[1]) - (method_matrix_multiply(runtime, h_m_current_k[0], h_m_x[0])));
        let err = ((((h_m_x[9]) + (method_matrix_multiply(runtime, h_m_current_k[9], h_m_u[9])))) | 0);
        h_m_x[9] = ((h_m_x[8]) + (method_matrix_multiply(runtime, h_m_current_k[8], h_m_u[8])));
        h_m_x[8] = ((h_m_x[7]) + (method_matrix_multiply(runtime, h_m_current_k[7], h_m_u[7])));
        h_m_x[7] = ((h_m_x[6]) + (method_matrix_multiply(runtime, h_m_current_k[6], h_m_u[6])));
        h_m_x[6] = ((h_m_x[5]) + (method_matrix_multiply(runtime, h_m_current_k[5], h_m_u[5])));
        h_m_x[5] = ((h_m_x[4]) + (method_matrix_multiply(runtime, h_m_current_k[4], h_m_u[4])));
        h_m_x[4] = ((h_m_x[3]) + (method_matrix_multiply(runtime, h_m_current_k[3], h_m_u[3])));
        h_m_x[3] = ((h_m_x[2]) + (method_matrix_multiply(runtime, h_m_current_k[2], h_m_u[2])));
        h_m_x[2] = ((h_m_x[1]) + (method_matrix_multiply(runtime, h_m_current_k[1], h_m_u[1])));
        h_m_x[1] = ((h_m_x[0]) + (method_matrix_multiply(runtime, h_m_current_k[0], h_m_u[0])));
        h_m_x[0] = h_m_u[0];
        members.m_previous_energy = (((members.m_current_energy ?? 0)) & 0xffff);
        0;
        for (let i = ((9) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            0;
        }
        0;
        0;
        for (let i = ((9) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            0;
        }
        0;
        return ((h_m_u[0]) | 0);
    }
    function method_matrix_multiply(runtime, a, b) {
        const members = runtime.members;
        let result = ((0) | 0);
        while ((((a) > (511)) ? 1 : 0)) {
            a = ((((a) - (1024))) | 0);
        }
        while (((Number(a) < Number(-512)) ? 1 : 0)) {
            a = ((((a) + (1024))) | 0);
        }
        while ((((b) > (16383)) ? 1 : 0)) {
            b = ((((b) - (32768))) | 0);
        }
        while (((Number(b) < Number(-16384)) ? 1 : 0)) {
            b = ((((b) + (32768))) | 0);
        }
        result = ((runtime.shiftRight(((a) * (b)), 9)) | 0);
        if ((((result) > (16383)) ? 1 : 0)) {
            0;
        }
        if (((Number(result) < Number(-16384)) ? 1 : 0)) {
            0;
        }
        return ((result) | 0);
    }
    function method_clip_analog(runtime, cliptemp) {
        const members = runtime.members;
        cliptemp = ((cliptemp) << 16 >> 16);
        if (((((((cliptemp) > (2047)) ? 1 : 0)) || (((Number(cliptemp) < Number(-2048)) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
        if ((((cliptemp) > (2047)) ? 1 : 0)) {
            cliptemp = ((2047) << 16 >> 16);
        }
        else {
            if (((Number(cliptemp) < Number(-2048)) ? 1 : 0)) {
                cliptemp = ((-2048) << 16 >> 16);
            }
        }
        cliptemp = ((((cliptemp) & (-16))) << 16 >> 16);
        return ((((((((cliptemp) << (4))) | (runtime.shiftRight(((cliptemp) & (2032)), 3)))) | (runtime.shiftRight(((cliptemp) & (1024)), 10)))) << 16 >> 16);
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"], __L1 = __l["clock"], __L2 = __l["stream_alloc"];
        const h_T0280B_0281A_coeff = members.T0280B_0281A_coeff ?? 0;
        const h_T0280D_0281D_coeff = members.T0280D_0281D_coeff ?? 0;
        const h_T0280F_2801A_coeff = members.T0280F_2801A_coeff ?? 0;
        const h_M58817_coeff = members.M58817_coeff ?? 0;
        const h_T0280F_2802_coeff = members.T0280F_2802_coeff ?? 0;
        const h_tms5110a_coeff = members.tms5110a_coeff ?? 0;
        const h_T0285_2501E_coeff = members.T0285_2501E_coeff ?? 0;
        const h_tms5220_coeff = members.tms5220_coeff ?? 0;
        switch (7) {
            case 1:
                {
                    members.m_coeff = h_T0280B_0281A_coeff;
                    break;
                }
            case 2:
                {
                    members.m_coeff = h_T0280D_0281D_coeff;
                    break;
                }
            case 3:
                {
                    members.m_coeff = h_T0280F_2801A_coeff;
                    break;
                }
            case 6:
                {
                    members.m_coeff = h_M58817_coeff;
                    break;
                }
            case 4:
                {
                    members.m_coeff = h_T0280F_2802_coeff;
                    break;
                }
            case 5:
                {
                    members.m_coeff = h_tms5110a_coeff;
                    break;
                }
            case 8:
            case 10:
                {
                    members.m_coeff = h_T0285_2501E_coeff;
                    break;
                }
            case 7:
            case 9:
                {
                    members.m_coeff = h_tms5220_coeff;
                    break;
                }
            default:
                {
                    (__L0 ? __L0("Unknown variant in tms5220_set_variant\n") : runtime.macro("fatalerror", "Unknown variant in tms5220_set_variant\n"));
                }
        }
        members.m_stream = (__L2 ? __L2(0, 1, runtime.divide((__L1 ? __L1() : runtime.macro("clock")), 80)) : runtime.macro("stream_alloc", 0, 1, runtime.divide((__L1 ? __L1() : runtime.macro("clock")), 80)));
        members.m_io_ready = ((1) ? 1 : 0);
        members.m_true_timing = ((0) ? 1 : 0);
        members.m_rs_ws = ((3) & 0xff);
        members.m_write_latch = ((0) & 0xff);
        method_register_for_save_states(runtime);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::begin"], __L1 = __l["std::end"], __L2 = __l["std::fill"];
        const h_m_fifo = members.m_fifo ?? 0;
        const h_m_new_frame_k_idx = members.m_new_frame_k_idx ?? 0;
        const h_m_current_k = members.m_current_k ?? 0;
        const h_m_u = members.m_u ?? 0;
        const h_m_x = members.m_x ?? 0;
        members.m_digital_select = ((0) ? 1 : 0);
        (__L2 ? __L2((__L0 ? __L0(h_m_fifo) : runtime.macro("std::begin", h_m_fifo)), (__L1 ? __L1(h_m_fifo) : runtime.macro("std::end", h_m_fifo)), 0) : runtime.macro("std::fill", (__L0 ? __L0(h_m_fifo) : runtime.macro("std::begin", h_m_fifo)), (__L1 ? __L1(h_m_fifo) : runtime.macro("std::end", h_m_fifo)), 0));
        members.m_fifo_head = (((members.m_fifo_tail = (((members.m_fifo_count = (((members.m_fifo_bits_taken = ((0) & 0xff))) & 0xff))) & 0xff))) & 0xff);
        members.m_SPEN = (((members.m_DDIS = (((members.m_TALK = (((members.m_TALKD = (((members.m_previous_talk_status = (((members.m_irq_pin = (((members.m_ready_pin = ((0) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0);
        method_set_interrupt_state(runtime, 0);
        method_update_ready_state(runtime);
        members.m_buffer_empty = (((members.m_buffer_low = ((1) ? 1 : 0))) ? 1 : 0);
        members.m_command_register = ((255) & 0xff);
        members.m_data_latched = ((0) ? 1 : 0);
        members.m_RDB_flag = ((0) ? 1 : 0);
        members.m_new_frame_energy_idx = (((members.m_current_energy = (((members.m_previous_energy = ((0) & 0xffff))) << 16 >> 16))) & 0xff);
        members.m_new_frame_pitch_idx = (((members.m_current_pitch = ((0) << 16 >> 16))) & 0xff);
        members.m_zpar = (((members.m_uv_zpar = ((0) ? 1 : 0))) ? 1 : 0);
        (__L2 ? __L2((__L0 ? __L0(h_m_new_frame_k_idx) : runtime.macro("std::begin", h_m_new_frame_k_idx)), (__L1 ? __L1(h_m_new_frame_k_idx) : runtime.macro("std::end", h_m_new_frame_k_idx)), 0) : runtime.macro("std::fill", (__L0 ? __L0(h_m_new_frame_k_idx) : runtime.macro("std::begin", h_m_new_frame_k_idx)), (__L1 ? __L1(h_m_new_frame_k_idx) : runtime.macro("std::end", h_m_new_frame_k_idx)), 0));
        (__L2 ? __L2((__L0 ? __L0(h_m_current_k) : runtime.macro("std::begin", h_m_current_k)), (__L1 ? __L1(h_m_current_k) : runtime.macro("std::end", h_m_current_k)), 0) : runtime.macro("std::fill", (__L0 ? __L0(h_m_current_k) : runtime.macro("std::begin", h_m_current_k)), (__L1 ? __L1(h_m_current_k) : runtime.macro("std::end", h_m_current_k)), 0));
        members.m_inhibit = ((1) ? 1 : 0);
        members.m_subcycle = (((members.m_c_variant_rate = (((members.m_pitch_count = (((members.m_PC = ((0) & 0xff))) & 0xffff))) & 0xff))) & 0xff);
        members.m_subc_reload = ((1) & 0xff);
        members.m_OLDE = (((members.m_OLDP = ((1) ? 1 : 0))) ? 1 : 0);
        members.m_IP = (((__mame_table_0[((((((members.m_c_variant_rate ?? 0)) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
        members.m_RNG = ((8191) & 0xffff);
        (__L2 ? __L2((__L0 ? __L0(h_m_u) : runtime.macro("std::begin", h_m_u)), (__L1 ? __L1(h_m_u) : runtime.macro("std::end", h_m_u)), 0) : runtime.macro("std::fill", (__L0 ? __L0(h_m_u) : runtime.macro("std::begin", h_m_u)), (__L1 ? __L1(h_m_u) : runtime.macro("std::end", h_m_u)), 0));
        (__L2 ? __L2((__L0 ? __L0(h_m_x) : runtime.macro("std::begin", h_m_x)), (__L1 ? __L1(h_m_x) : runtime.macro("std::end", h_m_x)), 0) : runtime.macro("std::fill", (__L0 ? __L0(h_m_x) : runtime.macro("std::begin", h_m_x)), (__L1 ? __L1(h_m_x) : runtime.macro("std::end", h_m_x)), 0));
        method_perform_dummy_read(runtime);
        members.m_PDC = ((0) & 0xff);
        members.m_CTL_pins = ((0) & 0xff);
        members.m_state = ((0) & 0xff);
        members.m_address = ((0) >>> 0);
        members.m_next_is_address = ((0) ? 1 : 0);
        members.m_addr_bit = ((0) & 0xff);
        members.m_CTL_buffer = ((0) & 0xff);
    }
    function method_rsq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["reset"], __L1 = __l["attotime::from_usec"];
        members.m_true_timing = ((1) ? 1 : 0);
        state = ((((state) & (1))) | 0);
        0;
        let new_val = (((((((members.m_rs_ws ?? 0)) & (1))) | (((state) << (1))))) & 0xff);
        if ((((new_val) !== ((members.m_rs_ws ?? 0))) ? 1 : 0)) {
            members.m_rs_ws = ((new_val) & 0xff);
            if ((((new_val) === (0)) ? 1 : 0)) {
                if (1) {
                    (__L0 ? __L0() : runtime.macro("reset"));
                }
                else {
                    0;
                }
                return;
            }
            else {
                if ((((new_val) === (3)) ? 1 : 0)) {
                    members.m_read_latch = ((255) & 0xff);
                    return;
                }
            }
            if (state) {
            }
            else {
                0;
                members.m_io_ready = ((0) ? 1 : 0);
                method_update_ready_state(runtime);
                (__deref_rsq_w(runtime, members.m_timer_io_ready).adjust?.((__L1 ? __L1(13) : runtime.macro("attotime::from_usec", 13)), 1) ?? 0);
            }
        }
    }
    function __deref_rsq_w(runtime, p) {
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
    function method_wsq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["reset"], __L1 = __l["clocks_to_attotime"];
        members.m_true_timing = ((1) ? 1 : 0);
        state = ((((state) & (1))) | 0);
        0;
        let new_val = (((((((members.m_rs_ws ?? 0)) & (2))) | (((state) << (0))))) & 0xff);
        if ((((new_val) !== ((members.m_rs_ws ?? 0))) ? 1 : 0)) {
            members.m_rs_ws = ((new_val) & 0xff);
            if ((((new_val) === (0)) ? 1 : 0)) {
                if (1) {
                    (__L0 ? __L0() : runtime.macro("reset"));
                }
                else {
                    0;
                }
                return;
            }
            else {
                if ((((new_val) === (3)) ? 1 : 0)) {
                    members.m_read_latch = ((255) & 0xff);
                    return;
                }
            }
            if (state) {
            }
            else {
                0;
                members.m_io_ready = ((0) ? 1 : 0);
                method_update_ready_state(runtime);
                (__deref_wsq_w(runtime, members.m_timer_io_ready).adjust?.((__L1 ? __L1(16) : runtime.macro("clocks_to_attotime", 16)), 1) ?? 0);
            }
        }
    }
    function __deref_wsq_w(runtime, p) {
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
    function method_combined_rsq_wsq_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["reset"], __L1 = __l["clocks_to_attotime"];
        data = ((data) & 0xff);
        let falling_edges = ((0) & 0xff);
        members.m_true_timing = ((1) ? 1 : 0);
        0;
        let new_val = ((((data) & (3))) & 0xff);
        if ((((new_val) !== ((members.m_rs_ws ?? 0))) ? 1 : 0)) {
            falling_edges = (((((((members.m_rs_ws ?? 0)) ^ (new_val))) & ((~new_val)))) & 0xff);
            members.m_rs_ws = ((new_val) & 0xff);
            switch (new_val) {
                case 0:
                    {
                        if (1) {
                            (__L0 ? __L0() : runtime.macro("reset"));
                        }
                        else {
                            0;
                        }
                        return;
                    }
                case 3:
                    {
                        members.m_read_latch = ((255) & 0xff);
                        return;
                    }
                case 2:
                    {
                        if (((((falling_edges) & (1))) ? 0 : 1)) {
                            return;
                        }
                        0;
                        members.m_io_ready = ((0) ? 1 : 0);
                        method_update_ready_state(runtime);
                        (__deref_combined_rsq_wsq_w(runtime, members.m_timer_io_ready).adjust?.((__L1 ? __L1(16) : runtime.macro("clocks_to_attotime", 16)), 1) ?? 0);
                        return;
                    }
                case 1:
                    {
                        if (((((falling_edges) & (2))) ? 0 : 1)) {
                            return;
                        }
                        0;
                        members.m_io_ready = ((0) ? 1 : 0);
                        method_update_ready_state(runtime);
                        (__deref_combined_rsq_wsq_w(runtime, members.m_timer_io_ready).adjust?.((__L1 ? __L1(16) : runtime.macro("clocks_to_attotime", 16)), 1) ?? 0);
                        return;
                    }
            }
        }
    }
    function __deref_combined_rsq_wsq_w(runtime, p) {
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
    function method_data_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        0;
        (__t0 = __deref_data_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_write_latch = ((data) & 0xff);
        members.m_data_latched = ((1) ? 1 : 0);
        if ((((members.m_true_timing ?? 0)) ? 0 : 1)) {
            method_data_write(runtime, (members.m_write_latch ?? 0));
        }
        else {
            if (((((((members.m_rs_ws ?? 0)) === (2)) ? 1 : 0)) ? 0 : 1)) {
                0;
            }
        }
    }
    function __deref_data_w(runtime, p) {
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
    function method_status_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0;
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            (__t0 = __deref_status_r(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        }
        if ((((members.m_true_timing ?? 0)) ? 0 : 1)) {
            if (((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
                return ((method_status_read(runtime, 0)) & 0xff);
            }
            return ((method_status_read(runtime, 1)) & 0xff);
        }
        else {
            if (((((members.m_rs_ws ?? 0)) === (1)) ? 1 : 0)) {
                return (((members.m_read_latch ?? 0)) & 0xff);
            }
            else {
                0;
            }
            return ((255) & 0xff);
        }
    }
    function __deref_status_r(runtime, p) {
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
    function method_readyq_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0;
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            (__t0 = __deref_readyq_r(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        }
        return ((((method_ready_read(runtime)) ? 0 : 1)) | 0);
    }
    function __deref_readyq_r(runtime, p) {
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
    function method_intq_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0;
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            (__t0 = __deref_intq_r(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        }
        return ((((method_int_read(runtime)) ? 0 : 1)) | 0);
    }
    function __deref_intq_r(runtime, p) {
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
        let __t0, __t1, __t2, __t3;
        let sample_data = new Int16Array(new Uint8Array(Math.max(0, Number(512))));
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0);) {
            let length = ((((((Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples"))) > Number(512)) ? 1 : 0)) ? (512) : ((__t2 = __deref_sound_stream_update(runtime, stream), typeof __t2.samples === 'function' ? __t2.samples() : typeof __t2.samples === 'number' || typeof __t2.samples === 'boolean' ? __t2.samples : runtime.container(stream, "samples"))))) | 0);
            method_process(runtime, sample_data, length);
            for (let index = ((0) | 0); (((index) < (length)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
                (__deref_sound_stream_update(runtime, stream).put_int?.(0, (__t3 = sampindex, sampindex = ((((sampindex) + (1))) | 0), __t3), (sample_data[index] ?? 0), 32768) ?? 0);
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
    function method_device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        (__deref_device_clock_changed(runtime, members.m_stream).set_sample_rate?.(runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 80)) ?? 0);
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
    function method_set_io_ready(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clocks_to_attotime"];
        let __t0;
        (__t0 = __deref_set_io_ready(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        0;
        if (param) {
            switch ((members.m_rs_ws ?? 0)) {
                case 2:
                    {
                        0;
                        if ((((((Number((members.m_fifo_count ?? 0)) >= Number(16)) ? 1 : 0)) && ((members.m_DDIS ?? 0))) ? 1 : 0)) {
                            0;
                            (__deref_set_io_ready(runtime, members.m_timer_io_ready).adjust?.((__L0 ? __L0(16) : runtime.macro("clocks_to_attotime", 16)), 1) ?? 0);
                            break;
                        }
                        else {
                            if (((Number((members.m_command_register ?? 0)) !== Number(255)) ? 1 : 0)) {
                                0;
                            }
                            else {
                                0;
                                members.m_data_latched = ((0) ? 1 : 0);
                                method_data_write(runtime, (members.m_write_latch ?? 0));
                            }
                            break;
                        }
                    }
                case 1:
                    {
                        members.m_read_latch = ((method_status_read(runtime, 1)) & 0xff);
                        0;
                        members.m_io_ready = ((1) ? 1 : 0);
                        break;
                    }
                case 3:
                    {
                        members.m_io_ready = ((1) ? 1 : 0);
                        break;
                    }
                case 0:
                    {
                        members.m_io_ready = ((1) ? 1 : 0);
                        break;
                    }
            }
        }
        method_update_ready_state(runtime);
    }
    function __deref_set_io_ready(runtime, p) {
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
    function method_irq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_irq_cb(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function __deref_irq_cb(runtime, p) {
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
    function method_ready_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ready_cb(runtime, members.m_readyq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_readyq_handler, "bind"));
    }
    function __deref_ready_cb(runtime, p) {
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
    function method_m0_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_m0_cb(runtime, members.m_m0_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_m0_cb, "bind"));
    }
    function __deref_m0_cb(runtime, p) {
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
    function method_m1_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_m1_cb(runtime, members.m_m1_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_m1_cb, "bind"));
    }
    function __deref_m1_cb(runtime, p) {
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
    function method_addr_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addr_cb(runtime, members.m_addr_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_addr_cb, "bind"));
    }
    function __deref_addr_cb(runtime, p) {
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
    function method_data_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_data_cb(runtime, members.m_data_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_data_cb, "bind"));
    }
    function __deref_data_cb(runtime, p) {
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
    function method_romclk_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_romclk_cb(runtime, members.m_romclk_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_romclk_cb, "bind"));
    }
    function __deref_romclk_cb(runtime, p) {
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
    function method_old_frame_silence_flag(runtime) {
        const members = runtime.members;
        return (members.m_OLDE ?? 0);
    }
    function method_old_frame_unvoiced_flag(runtime) {
        const members = runtime.members;
        return (members.m_OLDP ?? 0);
    }
    function method_tms5220_device__irq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms5220_device__irq_cb(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function __deref_tms5220_device__irq_cb(runtime, p) {
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
    function method_tms5220_device__ready_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms5220_device__ready_cb(runtime, members.m_readyq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_readyq_handler, "bind"));
    }
    function __deref_tms5220_device__ready_cb(runtime, p) {
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
    function method_tms5220_device__m0_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms5220_device__m0_cb(runtime, members.m_m0_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_m0_cb, "bind"));
    }
    function __deref_tms5220_device__m0_cb(runtime, p) {
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
    function method_tms5220_device__m1_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms5220_device__m1_cb(runtime, members.m_m1_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_m1_cb, "bind"));
    }
    function __deref_tms5220_device__m1_cb(runtime, p) {
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
    function method_tms5220_device__addr_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms5220_device__addr_cb(runtime, members.m_addr_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_addr_cb, "bind"));
    }
    function __deref_tms5220_device__addr_cb(runtime, p) {
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
    function method_tms5220_device__data_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms5220_device__data_cb(runtime, members.m_data_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_data_cb, "bind"));
    }
    function __deref_tms5220_device__data_cb(runtime, p) {
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
    function method_tms5220_device__romclk_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_tms5220_device__romclk_cb(runtime, members.m_romclk_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_romclk_cb, "bind"));
    }
    function __deref_tms5220_device__romclk_cb(runtime, p) {
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
    function method_tms5220_device__talk_status(runtime) {
        const members = runtime.members;
        return ((((members.m_SPEN ?? 0)) || ((members.m_TALKD ?? 0))) ? 1 : 0);
    }
    function method_tms5220_device__old_frame_silence_flag(runtime) {
        const members = runtime.members;
        return (members.m_OLDE ?? 0);
    }
    function method_tms5220_device__old_frame_unvoiced_flag(runtime) {
        const members = runtime.members;
        return (members.m_OLDP ?? 0);
    }
    function method_tms5220_device__new_frame_stop_flag(runtime) {
        const members = runtime.members;
        return ((((members.m_new_frame_energy_idx ?? 0)) === (15)) ? 1 : 0);
    }
    function method_tms5220_device__new_frame_silence_flag(runtime) {
        const members = runtime.members;
        return ((((members.m_new_frame_energy_idx ?? 0)) === (0)) ? 1 : 0);
    }
    function method_tms5220_device__new_frame_unvoiced_flag(runtime) {
        const members = runtime.members;
        return ((((members.m_new_frame_pitch_idx ?? 0)) === (0)) ? 1 : 0);
    }
    function method_old_frame_silence_flag_(runtime, __assigned) {
        const members = runtime.members;
        members.m_OLDE = ((__assigned) ? 1 : 0);
        return (members.m_OLDE ?? 0);
    }
    function method_old_frame_unvoiced_flag_(runtime, __assigned) {
        const members = runtime.members;
        members.m_OLDP = ((__assigned) ? 1 : 0);
        return (members.m_OLDP ?? 0);
    }
    function method_tms5220_device__old_frame_silence_flag_(runtime, __assigned) {
        const members = runtime.members;
        members.m_OLDE = ((__assigned) ? 1 : 0);
        return (members.m_OLDE ?? 0);
    }
    function method_tms5220_device__old_frame_unvoiced_flag_(runtime, __assigned) {
        const members = runtime.members;
        members.m_OLDP = ((__assigned) ? 1 : 0);
        return (members.m_OLDP ?? 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "register_for_save_states": method_register_for_save_states,
        "printbits": method_printbits,
        "vsm_write": method_vsm_write,
        "vsm_write_addr": method_vsm_write_addr,
        "vsm_read": method_vsm_read,
        "vsm_read_and_branch": method_vsm_read_and_branch,
        "data_write": method_data_write,
        "update_fifo_status_and_ints": method_update_fifo_status_and_ints,
        "update_ready_state": method_update_ready_state,
        "set_interrupt_state": method_set_interrupt_state,
        "talk_status": method_talk_status,
        "process_command": method_process_command,
        "perform_dummy_read": method_perform_dummy_read,
        "read_bits": method_read_bits,
        "status_read": method_status_read,
        "ready_read": method_ready_read,
        "int_read": method_int_read,
        "process": method_process,
        "parse_frame": method_parse_frame,
        "new_frame_unvoiced_flag": method_new_frame_unvoiced_flag,
        "new_frame_stop_flag": method_new_frame_stop_flag,
        "new_frame_silence_flag": method_new_frame_silence_flag,
        "lattice_filter": method_lattice_filter,
        "matrix_multiply": method_matrix_multiply,
        "clip_analog": method_clip_analog,
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "rsq_w": method_rsq_w,
        "wsq_w": method_wsq_w,
        "combined_rsq_wsq_w": method_combined_rsq_wsq_w,
        "data_w": method_data_w,
        "status_r": method_status_r,
        "readyq_r": method_readyq_r,
        "intq_r": method_intq_r,
        "sound_stream_update": method_sound_stream_update,
        "device_clock_changed": method_device_clock_changed,
        "set_io_ready": method_set_io_ready,
        "irq_cb": method_irq_cb,
        "ready_cb": method_ready_cb,
        "m0_cb": method_m0_cb,
        "m1_cb": method_m1_cb,
        "addr_cb": method_addr_cb,
        "data_cb": method_data_cb,
        "romclk_cb": method_romclk_cb,
        "old_frame_silence_flag": method_old_frame_silence_flag,
        "old_frame_unvoiced_flag": method_old_frame_unvoiced_flag,
        "tms5220_device::irq_cb": method_tms5220_device__irq_cb,
        "tms5220_device::ready_cb": method_tms5220_device__ready_cb,
        "tms5220_device::m0_cb": method_tms5220_device__m0_cb,
        "tms5220_device::m1_cb": method_tms5220_device__m1_cb,
        "tms5220_device::addr_cb": method_tms5220_device__addr_cb,
        "tms5220_device::data_cb": method_tms5220_device__data_cb,
        "tms5220_device::romclk_cb": method_tms5220_device__romclk_cb,
        "tms5220_device::talk_status": method_tms5220_device__talk_status,
        "tms5220_device::old_frame_silence_flag": method_tms5220_device__old_frame_silence_flag,
        "tms5220_device::old_frame_unvoiced_flag": method_tms5220_device__old_frame_unvoiced_flag,
        "tms5220_device::new_frame_stop_flag": method_tms5220_device__new_frame_stop_flag,
        "tms5220_device::new_frame_silence_flag": method_tms5220_device__new_frame_silence_flag,
        "tms5220_device::new_frame_unvoiced_flag": method_tms5220_device__new_frame_unvoiced_flag,
        "old_frame_silence_flag=": method_old_frame_silence_flag_,
        "old_frame_unvoiced_flag=": method_old_frame_unvoiced_flag_,
        "tms5220_device::old_frame_silence_flag=": method_tms5220_device__old_frame_silence_flag_,
        "tms5220_device::old_frame_unvoiced_flag=": method_tms5220_device__old_frame_unvoiced_flag_
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "attotime::from_usec", "clock", "clocks_to_attotime", "fatalerror", "m_addr_cb", "m_data_cb", "m_irq_handler", "m_m0_cb", "m_m1_cb", "m_readyq_handler", "m_romclk_cb", "machine", "machine().side_effects_disabled", "reset", "save_item", "std::begin", "std::end", "std::fill", "stream_alloc"];
export const device = definition;
export default device;
