import deviceData from './nes_datach.device.ir.json' with { type: 'json' };
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
    function method_read_h(runtime, offset) {
        const members = runtime.members;
        const h_m_subslot = members.m_subslot ?? 0;
        0;
        if (h_m_subslot.m_cart) {
            return (((__deref_read_h(runtime, h_m_subslot.m_cart).read?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((method_hi_access_rom(runtime, offset)) & 0xff);
        }
    }
    function __deref_read_h(runtime, p) {
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
    function method_hi_access_rom(runtime, offset) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        let bank = (((((offset) >>> (13)) & ((1 << (2)) - 1))) | 0);
        return ((runtime.readIndex((members.m_prg ?? 0), __add_hi_access_rom(runtime, ((h_m_prg_bank[bank]) * (8192)), ((offset) & (8191))))) & 0xff);
    }
    function __add_hi_access_rom(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_read_ex(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_write_ex(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_get_mirroring(runtime) {
        const members = runtime.members;
        return (((members.m_mirroring ?? 0)) | 0);
    }
    function method_set_mirroring(runtime, val) {
        const members = runtime.members;
        members.m_mirroring = ((val) | 0);
    }
    function method_get_pcb_ctrl_mirror(runtime) {
        const members = runtime.members;
        return (members.m_pcb_ctrl_mirror ?? 0);
    }
    function method_set_pcb_ctrl_mirror(runtime, val) {
        const members = runtime.members;
        members.m_pcb_ctrl_mirror = ((val) ? 1 : 0);
    }
    function method_get_four_screen_vram(runtime) {
        const members = runtime.members;
        return (members.m_four_screen_vram ?? 0);
    }
    function method_set_four_screen_vram(runtime, val) {
        const members = runtime.members;
        members.m_four_screen_vram = ((val) ? 1 : 0);
    }
    function method_get_trainer(runtime) {
        const members = runtime.members;
        return (members.m_has_trainer ?? 0);
    }
    function method_set_trainer(runtime, val) {
        const members = runtime.members;
        members.m_has_trainer = ((val) ? 1 : 0);
    }
    function method_set_mmc1_type(runtime, val) {
        const members = runtime.members;
        members.m_mmc1_type = val;
    }
    function method_set_n163_vol(runtime, vol) {
        const members = runtime.members;
        members.m_n163_vol = ((vol) | 0);
    }
    function method_set_outer_prg_size(runtime, val) {
        const members = runtime.members;
        members.m_outer_prg_size = ((val) >>> 0);
    }
    function method_set_outer_chr_size(runtime, val) {
        const members = runtime.members;
        members.m_outer_chr_size = ((val) >>> 0);
    }
    function method_set_smd133_addr(runtime, val) {
        const members = runtime.members;
        members.m_smd133_addr = ((val) | 0);
    }
    function method_set_x1_005_alt(runtime, val) {
        const members = runtime.members;
        members.m_x1_005_alt_mirroring = ((val) ? 1 : 0);
    }
    function method_set_bus_conflict(runtime, val) {
        const members = runtime.members;
        members.m_bus_conflict = ((val) ? 1 : 0);
    }
    function method_get_open_bus(runtime) {
        const members = runtime.members;
        return (((members.m_open_bus ?? 0)) & 0xff);
    }
    function method_set_open_bus(runtime, val) {
        const members = runtime.members;
        val = ((val) & 0xff);
        members.m_open_bus = ((val) & 0xff);
    }
    function method_get_prg_base(runtime) {
        const members = runtime.members;
        return (members.m_prg ?? 0);
    }
    function method_get_prgram_base(runtime) {
        const members = runtime.members;
        return __addr_get_prgram_base(runtime, (members.m_prgram ?? 0), 0);
    }
    function __addr_get_prgram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_vrom_base(runtime) {
        const members = runtime.members;
        return (members.m_vrom ?? 0);
    }
    function method_get_vram_base(runtime) {
        const members = runtime.members;
        return __addr_get_vram_base(runtime, (members.m_vram ?? 0), 0);
    }
    function __addr_get_vram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_ciram_base(runtime) {
        const members = runtime.members;
        return (members.m_ciram ?? 0);
    }
    function method_get_battery_base(runtime) {
        const members = runtime.members;
        return __addr_get_battery_base(runtime, (members.m_battery ?? 0), 0);
    }
    function __addr_get_battery_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_mapper_sram_base(runtime) {
        const members = runtime.members;
        const h_m_mapper_sram = members.m_mapper_sram ?? 0;
        return h_m_mapper_sram;
    }
    function method_get_misc_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_misc_rom ?? 0);
    }
    function method_get_prg_size(runtime) {
        const members = runtime.members;
        return (((members.m_prg_size ?? 0)) >>> 0);
    }
    function method_get_prgram_size(runtime) {
        const members = runtime.members;
        return (((members.m_prgram).length) >>> 0);
    }
    function method_get_vrom_size(runtime) {
        const members = runtime.members;
        return (((members.m_vrom_size ?? 0)) >>> 0);
    }
    function method_get_vram_size(runtime) {
        const members = runtime.members;
        return (((members.m_vram).length) >>> 0);
    }
    function method_get_battery_size(runtime) {
        const members = runtime.members;
        return (((members.m_battery).length) >>> 0);
    }
    function method_get_mapper_sram_size(runtime) {
        const members = runtime.members;
        const h_m_mapper_sram_size = members.m_mapper_sram_size ?? 0;
        return ((h_m_mapper_sram_size) >>> 0);
    }
    function method_get_misc_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_misc_rom_size ?? 0)) >>> 0);
    }
    function method_ppu_latch(runtime, offset) {
        const members = runtime.members;
    }
    function method_hblank_irq(runtime, scanline, vblank, blanked) {
        const members = runtime.members;
    }
    function method_scanline_irq(runtime, scanline, vblank, blanked) {
        const members = runtime.members;
    }
    function method_prgram_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_prgram = runtime.resize(members.m_prgram, size));
    }
    function method_battery_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_battery = runtime.resize(members.m_battery, size));
    }
    function method_set_irq_line(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_maincpu.set_input_line"];
        (__L0 ? __L0(0, state) : ((members.m_maincpu)?.set_input_line?.(0, state) ?? 0));
    }
    function method_account_bus_conflict(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_bus_conflict ?? 0)) {
            return ((((data) & (method_hi_access_rom(runtime, offset)))) & 0xff);
        }
        else {
            return ((data) & 0xff);
        }
    }
    function method_chr_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_chr_src = members.m_chr_src ?? 0;
        const h_m_chr_access = members.m_chr_access ?? 0;
        let bank = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
        if ((((h_m_chr_src[bank]) === (1)) ? 1 : 0)) {
            runtime.writeIndex(h_m_chr_access[bank], ((offset) & (1023)), data);
        }
    }
    function method_chr_r(runtime, offset) {
        const members = runtime.members;
        const h_m_chr_access = members.m_chr_access ?? 0;
        let bank = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
        return ((runtime.readIndex(h_m_chr_access[bank], ((offset) & (1023)))) & 0xff);
    }
    function method_device_nes_cart_interface__chr_r(runtime, offset) {
        const members = runtime.members;
        const h_m_chr_access = members.m_chr_access ?? 0;
        let bank = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
        return ((runtime.readIndex(h_m_chr_access[bank], ((offset) & (1023)))) & 0xff);
    }
    function method_nt_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_nt_writable = members.m_nt_writable ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        if (h_m_nt_writable[page]) {
            runtime.writeIndex(h_m_nt_access[page], ((offset) & (1023)), data);
        }
    }
    function method_device_nes_cart_interface__nt_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_nt_writable = members.m_nt_writable ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        if (h_m_nt_writable[page]) {
            runtime.writeIndex(h_m_nt_access[page], ((offset) & (1023)), data);
        }
    }
    function method_nt_r(runtime, offset) {
        const members = runtime.members;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
    }
    function method_device_nes_cart_interface__nt_r(runtime, offset) {
        const members = runtime.members;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
    }
    function method_read_l(runtime, offset) {
        const members = runtime.members;
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_read_m(runtime, offset) {
        const members = runtime.members;
        0;
        let i2c_val = ((0) & 0xff);
        return (((((members.m_datach_latch ?? 0)) | (i2c_val))) & 0xff);
    }
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_write_m(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        0;
        if ((((((members.m_battery).length === 0 ? 1 : 0)) && (((members.m_prgram).length === 0 ? 1 : 0))) ? 1 : 0)) {
            method_fcg_write(runtime, ((offset) & (15)), data);
        }
        else {
            if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
                runtime.writeIndex(runtime.writableMember("m_battery"), offset, data);
            }
            else {
                runtime.writeIndex(runtime.writableMember("m_prgram"), offset, data);
            }
        }
    }
    function method_fcg_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        0;
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
                    method_chr1_x(runtime, ((offset) & (7)), data, (members.m_chr_source ?? 0));
                    break;
                }
            case 8:
                {
                    method_prg16_89ab(runtime, data);
                    break;
                }
            case 9:
                {
                    switch (((data) & (3))) {
                        case 0:
                            {
                                method_set_nt_mirroring(runtime, 1);
                                break;
                            }
                        case 1:
                            {
                                method_set_nt_mirroring(runtime, 2);
                                break;
                            }
                        case 2:
                            {
                                method_set_nt_mirroring(runtime, 4);
                                break;
                            }
                        case 3:
                            {
                                method_set_nt_mirroring(runtime, 3);
                                break;
                            }
                    }
                    break;
                }
            case 10:
                {
                    members.m_irq_enable = ((((data) & (1))) | 0);
                    method_set_irq_line(runtime, 0);
                    break;
                }
            case 11:
                {
                    members.m_irq_count = (((((((members.m_irq_count ?? 0)) & (65280))) | (data))) & 0xffff);
                    break;
                }
            case 12:
                {
                    members.m_irq_count = (((((((members.m_irq_count ?? 0)) & (255))) | (((data) << (8))))) & 0xffff);
                    break;
                }
            default:
                {
                    0;
                    break;
                }
        }
    }
    function method_chr1_x(runtime, start, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, start, bank, source);
    }
    function method_bank_chr(runtime, shift, start, bank, source) {
        const members = runtime.members;
        const h_m_chr_src = members.m_chr_src ?? 0;
        const h_m_chr_orig = members.m_chr_orig ?? 0;
        const h_m_chr_access = members.m_chr_access ?? 0;
        let base_ptr = 0;
        let chr_chunks = ((0) >>> 0);
        if ((((source) === (1)) ? 1 : 0)) {
            base_ptr = __addr_bank_chr(runtime, (members.m_vram ?? 0), 0);
            chr_chunks = (((members.m_vram_chunks ?? 0)) >>> 0);
        }
        else {
            base_ptr = (members.m_vrom ?? 0);
            chr_chunks = (((members.m_vrom_chunks ?? 0)) >>> 0);
        }
        bank = ((((bank) & (((((chr_chunks) << (((3) - (shift))))) - (1))))) | 0);
        let size = ((((1024) << (shift))) | 0);
        let bank_start = ((((bank) * (size))) | 0);
        let kbyte = ((((1) << (shift))) | 0);
        for (let i = ((0) | 0); (((i) < (kbyte)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_chr_src[((i) + (start))] = source;
            h_m_chr_orig[((i) + (start))] = ((bank_start) + (((i) * (1024))));
            h_m_chr_access[((i) + (start))] = __addr_bank_chr(runtime, base_ptr, h_m_chr_orig[((i) + (start))]);
        }
    }
    function __addr_bank_chr(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_prg16_89ab(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (2)))) | 0);
        h_m_prg_bank[0] = ((bank) + (0));
        h_m_prg_bank[1] = ((bank) + (1));
        method_update_prg_banks(runtime, 0, 1);
    }
    function method_prg_8k_bank_num(runtime, bank_8k) {
        const members = runtime.members;
        if (((Number((members.m_prg_mask ?? 0)) === Number((((((members.m_prg_chunks ?? 0)) << (1))) - (1)))) ? 1 : 0)) {
            return ((((bank_8k) & ((members.m_prg_mask ?? 0)))) | 0);
        }
        if (((Number(bank_8k) < Number((((((members.m_prg_chunks ?? 0)) << (1))) - (1)))) ? 1 : 0)) {
            return ((bank_8k) | 0);
        }
        bank_8k = ((((bank_8k) & ((members.m_prg_mask ?? 0)))) | 0);
        bank_8k = ((((bank_8k) - (__add_prg_8k_bank_num(runtime, runtime.divide((members.m_prg_mask ?? 0), 2), 1)))) | 0);
        return ((runtime.readIndex((members.m_prg_bank_map ?? 0), bank_8k)) | 0);
    }
    function __add_prg_8k_bank_num(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_update_prg_banks(runtime, prg_bank_start, prg_bank_end) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        const h_m_prg_bank_mem = members.m_prg_bank_mem ?? 0;
        for (let prg_bank = ((prg_bank_start) | 0); (((prg_bank) <= (prg_bank_end)) ? 1 : 0); prg_bank = ((((prg_bank) + (1))) | 0)) {
            (__deref_update_prg_banks(runtime, h_m_prg_bank_mem[prg_bank]).set_entry?.(h_m_prg_bank[prg_bank]) ?? 0);
        }
    }
    function __deref_update_prg_banks(runtime, p) {
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
    function method_set_nt_mirroring(runtime, mirroring) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        switch (mirroring) {
            default:
                {
                    method_set_nt_page(runtime, 0, 0, 0, 1);
                    method_set_nt_page(runtime, 1, 0, 0, 1);
                    method_set_nt_page(runtime, 2, 0, 1, 1);
                    method_set_nt_page(runtime, 3, 0, 1, 1);
                    break;
                }
            case 1:
                {
                    method_set_nt_page(runtime, 0, 0, 0, 1);
                    method_set_nt_page(runtime, 1, 0, 1, 1);
                    method_set_nt_page(runtime, 2, 0, 0, 1);
                    method_set_nt_page(runtime, 3, 0, 1, 1);
                    break;
                }
            case 3:
                {
                    method_set_nt_page(runtime, 0, 0, 1, 1);
                    method_set_nt_page(runtime, 1, 0, 1, 1);
                    method_set_nt_page(runtime, 2, 0, 1, 1);
                    method_set_nt_page(runtime, 3, 0, 1, 1);
                    break;
                }
            case 4:
                {
                    method_set_nt_page(runtime, 0, 0, 0, 1);
                    method_set_nt_page(runtime, 1, 0, 0, 1);
                    method_set_nt_page(runtime, 2, 0, 0, 1);
                    method_set_nt_page(runtime, 3, 0, 0, 1);
                    break;
                }
            case 5:
                {
                    if (((members.m_ext_ntram).length === 0 ? 1 : 0)) {
                        (__L0 ? __L0("4-screen mirroring without on-cart NTRAM!\n") : runtime.macro("fatalerror", "4-screen mirroring without on-cart NTRAM!\n"));
                    }
                    method_set_nt_page(runtime, 0, 4, 0, 1);
                    method_set_nt_page(runtime, 1, 4, 1, 1);
                    method_set_nt_page(runtime, 2, 4, 2, 1);
                    method_set_nt_page(runtime, 3, 4, 3, 1);
                    break;
                }
        }
    }
    function method_set_nt_page(runtime, page, source, bank, writable) {
        const members = runtime.members;
        const h_m_nt_src = members.m_nt_src ?? 0;
        const h_m_nt_orig = members.m_nt_orig ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        const h_m_nt_writable = members.m_nt_writable ?? 0;
        let base_ptr = 0;
        switch (source) {
            case 4:
                {
                    base_ptr = __addr_set_nt_page(runtime, (members.m_ext_ntram ?? 0), 0);
                    break;
                }
            case 1:
                {
                    bank = ((((bank) & ((((((members.m_vrom_chunks ?? 0)) << (3))) - (1))))) | 0);
                    base_ptr = (members.m_vrom ?? 0);
                    break;
                }
            case 2:
            case 3:
                {
                    base_ptr = 0;
                    break;
                }
            default:
                {
                    base_ptr = (members.m_ciram ?? 0);
                    break;
                }
        }
        page = ((((page) & (3))) | 0);
        h_m_nt_src[page] = source;
        if (base_ptr) {
            h_m_nt_orig[page] = ((bank) * (1024));
            h_m_nt_access[page] = __addr_set_nt_page(runtime, base_ptr, h_m_nt_orig[page]);
        }
        h_m_nt_writable[page] = writable;
    }
    function __addr_set_nt_page(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_write_h(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_subslot.write_prg_bank"];
        data = ((data) & 0xff);
        0;
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
                    break;
                }
            case 8:
                {
                    (__L0 ? __L0(((data) & (15))) : ((members.m_subslot)?.write_prg_bank?.(((data) & (15))) ?? 0));
                    break;
                }
            case 13:
                {
                    break;
                }
            default:
                {
                    method_fcg_write(runtime, ((offset) & (15)), data);
                    break;
                }
        }
    }
    function method_device_nes_cart_interface__read_h(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_nes_cart_interface__read_ex(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_nes_cart_interface__write_ex(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_device_nes_cart_interface__get_mirroring(runtime) {
        const members = runtime.members;
        return (((members.m_mirroring ?? 0)) | 0);
    }
    function method_device_nes_cart_interface__set_mirroring(runtime, val) {
        const members = runtime.members;
        members.m_mirroring = ((val) | 0);
    }
    function method_device_nes_cart_interface__get_pcb_ctrl_mirror(runtime) {
        const members = runtime.members;
        return (members.m_pcb_ctrl_mirror ?? 0);
    }
    function method_device_nes_cart_interface__set_pcb_ctrl_mirror(runtime, val) {
        const members = runtime.members;
        members.m_pcb_ctrl_mirror = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__get_four_screen_vram(runtime) {
        const members = runtime.members;
        return (members.m_four_screen_vram ?? 0);
    }
    function method_device_nes_cart_interface__set_four_screen_vram(runtime, val) {
        const members = runtime.members;
        members.m_four_screen_vram = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__get_trainer(runtime) {
        const members = runtime.members;
        return (members.m_has_trainer ?? 0);
    }
    function method_device_nes_cart_interface__set_trainer(runtime, val) {
        const members = runtime.members;
        members.m_has_trainer = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__set_mmc1_type(runtime, val) {
        const members = runtime.members;
        members.m_mmc1_type = val;
    }
    function method_device_nes_cart_interface__set_n163_vol(runtime, vol) {
        const members = runtime.members;
        members.m_n163_vol = ((vol) | 0);
    }
    function method_device_nes_cart_interface__set_outer_prg_size(runtime, val) {
        const members = runtime.members;
        members.m_outer_prg_size = ((val) >>> 0);
    }
    function method_device_nes_cart_interface__set_outer_chr_size(runtime, val) {
        const members = runtime.members;
        members.m_outer_chr_size = ((val) >>> 0);
    }
    function method_device_nes_cart_interface__set_smd133_addr(runtime, val) {
        const members = runtime.members;
        members.m_smd133_addr = ((val) | 0);
    }
    function method_device_nes_cart_interface__set_x1_005_alt(runtime, val) {
        const members = runtime.members;
        members.m_x1_005_alt_mirroring = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__set_bus_conflict(runtime, val) {
        const members = runtime.members;
        members.m_bus_conflict = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__get_open_bus(runtime) {
        const members = runtime.members;
        return (((members.m_open_bus ?? 0)) & 0xff);
    }
    function method_device_nes_cart_interface__set_open_bus(runtime, val) {
        const members = runtime.members;
        val = ((val) & 0xff);
        members.m_open_bus = ((val) & 0xff);
    }
    function method_device_nes_cart_interface__get_prg_base(runtime) {
        const members = runtime.members;
        return (members.m_prg ?? 0);
    }
    function method_device_nes_cart_interface__get_prgram_base(runtime) {
        const members = runtime.members;
        return __addr_device_nes_cart_interface__get_prgram_base(runtime, (members.m_prgram ?? 0), 0);
    }
    function __addr_device_nes_cart_interface__get_prgram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_nes_cart_interface__get_vrom_base(runtime) {
        const members = runtime.members;
        return (members.m_vrom ?? 0);
    }
    function method_device_nes_cart_interface__get_vram_base(runtime) {
        const members = runtime.members;
        return __addr_device_nes_cart_interface__get_vram_base(runtime, (members.m_vram ?? 0), 0);
    }
    function __addr_device_nes_cart_interface__get_vram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_nes_cart_interface__get_ciram_base(runtime) {
        const members = runtime.members;
        return (members.m_ciram ?? 0);
    }
    function method_device_nes_cart_interface__get_battery_base(runtime) {
        const members = runtime.members;
        return __addr_device_nes_cart_interface__get_battery_base(runtime, (members.m_battery ?? 0), 0);
    }
    function __addr_device_nes_cart_interface__get_battery_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_nes_cart_interface__get_mapper_sram_base(runtime) {
        const members = runtime.members;
        const h_m_mapper_sram = members.m_mapper_sram ?? 0;
        return h_m_mapper_sram;
    }
    function method_device_nes_cart_interface__get_misc_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_misc_rom ?? 0);
    }
    function method_device_nes_cart_interface__get_prg_size(runtime) {
        const members = runtime.members;
        return (((members.m_prg_size ?? 0)) >>> 0);
    }
    function method_device_nes_cart_interface__get_prgram_size(runtime) {
        const members = runtime.members;
        return (((members.m_prgram).length) >>> 0);
    }
    function method_device_nes_cart_interface__get_vrom_size(runtime) {
        const members = runtime.members;
        return (((members.m_vrom_size ?? 0)) >>> 0);
    }
    function method_device_nes_cart_interface__get_vram_size(runtime) {
        const members = runtime.members;
        return (((members.m_vram).length) >>> 0);
    }
    function method_device_nes_cart_interface__get_battery_size(runtime) {
        const members = runtime.members;
        return (((members.m_battery).length) >>> 0);
    }
    function method_device_nes_cart_interface__get_mapper_sram_size(runtime) {
        const members = runtime.members;
        const h_m_mapper_sram_size = members.m_mapper_sram_size ?? 0;
        return ((h_m_mapper_sram_size) >>> 0);
    }
    function method_device_nes_cart_interface__get_misc_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_misc_rom_size ?? 0)) >>> 0);
    }
    function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_nes_cart_interface__write_m(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & (runtime.subtract((members.m_prgram).length, 1))), data);
        }
    }
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_irq_enable ?? 0)) {
            if ((((members.m_irq_count ?? 0)) ? 0 : 1)) {
                members.m_irq_count = ((65535) & 0xffff);
            }
            else {
                members.m_irq_count = ((((members.m_irq_count) - (1))) & 0xffff);
            }
            if ((((members.m_irq_count ?? 0)) ? 0 : 1)) {
                method_set_irq_line(runtime, 1);
                members.m_irq_enable = ((0) | 0);
            }
        }
    }
    function method_device_nes_cart_interface__write_h(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_nes_lz93d50_device__write_h(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_fcg_write(runtime, offset, data);
    }
    function method_device_nes_cart_interface__read_m(runtime, offset) {
        const members = runtime.members;
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
            return ((runtime.readIndex((members.m_battery ?? 0), ((offset) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
        }
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
            return ((runtime.readIndex((members.m_prgram ?? 0), ((offset) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
        }
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_serial_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_reader.read_pixel"];
        members.m_datach_latch = (((((__L0 ? __L0() : ((members.m_reader)?.read_pixel?.() ?? 0))) << (3))) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read_h": method_read_h,
        "hi_access_rom": method_hi_access_rom,
        "read_ex": method_read_ex,
        "write_ex": method_write_ex,
        "get_mirroring": method_get_mirroring,
        "set_mirroring": method_set_mirroring,
        "get_pcb_ctrl_mirror": method_get_pcb_ctrl_mirror,
        "set_pcb_ctrl_mirror": method_set_pcb_ctrl_mirror,
        "get_four_screen_vram": method_get_four_screen_vram,
        "set_four_screen_vram": method_set_four_screen_vram,
        "get_trainer": method_get_trainer,
        "set_trainer": method_set_trainer,
        "set_mmc1_type": method_set_mmc1_type,
        "set_n163_vol": method_set_n163_vol,
        "set_outer_prg_size": method_set_outer_prg_size,
        "set_outer_chr_size": method_set_outer_chr_size,
        "set_smd133_addr": method_set_smd133_addr,
        "set_x1_005_alt": method_set_x1_005_alt,
        "set_bus_conflict": method_set_bus_conflict,
        "get_open_bus": method_get_open_bus,
        "set_open_bus": method_set_open_bus,
        "get_prg_base": method_get_prg_base,
        "get_prgram_base": method_get_prgram_base,
        "get_vrom_base": method_get_vrom_base,
        "get_vram_base": method_get_vram_base,
        "get_ciram_base": method_get_ciram_base,
        "get_battery_base": method_get_battery_base,
        "get_mapper_sram_base": method_get_mapper_sram_base,
        "get_misc_rom_base": method_get_misc_rom_base,
        "get_prg_size": method_get_prg_size,
        "get_prgram_size": method_get_prgram_size,
        "get_vrom_size": method_get_vrom_size,
        "get_vram_size": method_get_vram_size,
        "get_battery_size": method_get_battery_size,
        "get_mapper_sram_size": method_get_mapper_sram_size,
        "get_misc_rom_size": method_get_misc_rom_size,
        "ppu_latch": method_ppu_latch,
        "hblank_irq": method_hblank_irq,
        "scanline_irq": method_scanline_irq,
        "prgram_alloc": method_prgram_alloc,
        "battery_alloc": method_battery_alloc,
        "set_irq_line": method_set_irq_line,
        "account_bus_conflict": method_account_bus_conflict,
        "chr_w": method_chr_w,
        "chr_r": method_chr_r,
        "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
        "nt_w": method_nt_w,
        "device_nes_cart_interface::nt_w": method_device_nes_cart_interface__nt_w,
        "nt_r": method_nt_r,
        "device_nes_cart_interface::nt_r": method_device_nes_cart_interface__nt_r,
        "read_l": method_read_l,
        "read_m": method_read_m,
        "write_l": method_write_l,
        "write_m": method_write_m,
        "fcg_write": method_fcg_write,
        "chr1_x": method_chr1_x,
        "bank_chr": method_bank_chr,
        "prg16_89ab": method_prg16_89ab,
        "prg_8k_bank_num": method_prg_8k_bank_num,
        "update_prg_banks": method_update_prg_banks,
        "set_nt_mirroring": method_set_nt_mirroring,
        "set_nt_page": method_set_nt_page,
        "write_h": method_write_h,
        "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
        "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
        "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
        "device_nes_cart_interface::get_mirroring": method_device_nes_cart_interface__get_mirroring,
        "device_nes_cart_interface::set_mirroring": method_device_nes_cart_interface__set_mirroring,
        "device_nes_cart_interface::get_pcb_ctrl_mirror": method_device_nes_cart_interface__get_pcb_ctrl_mirror,
        "device_nes_cart_interface::set_pcb_ctrl_mirror": method_device_nes_cart_interface__set_pcb_ctrl_mirror,
        "device_nes_cart_interface::get_four_screen_vram": method_device_nes_cart_interface__get_four_screen_vram,
        "device_nes_cart_interface::set_four_screen_vram": method_device_nes_cart_interface__set_four_screen_vram,
        "device_nes_cart_interface::get_trainer": method_device_nes_cart_interface__get_trainer,
        "device_nes_cart_interface::set_trainer": method_device_nes_cart_interface__set_trainer,
        "device_nes_cart_interface::set_mmc1_type": method_device_nes_cart_interface__set_mmc1_type,
        "device_nes_cart_interface::set_n163_vol": method_device_nes_cart_interface__set_n163_vol,
        "device_nes_cart_interface::set_outer_prg_size": method_device_nes_cart_interface__set_outer_prg_size,
        "device_nes_cart_interface::set_outer_chr_size": method_device_nes_cart_interface__set_outer_chr_size,
        "device_nes_cart_interface::set_smd133_addr": method_device_nes_cart_interface__set_smd133_addr,
        "device_nes_cart_interface::set_x1_005_alt": method_device_nes_cart_interface__set_x1_005_alt,
        "device_nes_cart_interface::set_bus_conflict": method_device_nes_cart_interface__set_bus_conflict,
        "device_nes_cart_interface::get_open_bus": method_device_nes_cart_interface__get_open_bus,
        "device_nes_cart_interface::set_open_bus": method_device_nes_cart_interface__set_open_bus,
        "device_nes_cart_interface::get_prg_base": method_device_nes_cart_interface__get_prg_base,
        "device_nes_cart_interface::get_prgram_base": method_device_nes_cart_interface__get_prgram_base,
        "device_nes_cart_interface::get_vrom_base": method_device_nes_cart_interface__get_vrom_base,
        "device_nes_cart_interface::get_vram_base": method_device_nes_cart_interface__get_vram_base,
        "device_nes_cart_interface::get_ciram_base": method_device_nes_cart_interface__get_ciram_base,
        "device_nes_cart_interface::get_battery_base": method_device_nes_cart_interface__get_battery_base,
        "device_nes_cart_interface::get_mapper_sram_base": method_device_nes_cart_interface__get_mapper_sram_base,
        "device_nes_cart_interface::get_misc_rom_base": method_device_nes_cart_interface__get_misc_rom_base,
        "device_nes_cart_interface::get_prg_size": method_device_nes_cart_interface__get_prg_size,
        "device_nes_cart_interface::get_prgram_size": method_device_nes_cart_interface__get_prgram_size,
        "device_nes_cart_interface::get_vrom_size": method_device_nes_cart_interface__get_vrom_size,
        "device_nes_cart_interface::get_vram_size": method_device_nes_cart_interface__get_vram_size,
        "device_nes_cart_interface::get_battery_size": method_device_nes_cart_interface__get_battery_size,
        "device_nes_cart_interface::get_mapper_sram_size": method_device_nes_cart_interface__get_mapper_sram_size,
        "device_nes_cart_interface::get_misc_rom_size": method_device_nes_cart_interface__get_misc_rom_size,
        "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
        "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
        "irq_timer_tick": method_irq_timer_tick,
        "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h,
        "nes_lz93d50_device::write_h": method_nes_lz93d50_device__write_h,
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "serial_tick": method_serial_tick
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["fatalerror", "m_maincpu.set_input_line", "m_reader.read_pixel", "m_subslot.write_prg_bank"];
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
    const __mame_table_0 = [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1];
    const __mame_table_1 = [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0];
    const __mame_table_2 = [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0];
    const __mame_table_3 = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1];
    function method_decode(runtime, len) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16, __t17, __t18, __t19, __t20, __t21, __t22, __t23, __t24;
        const h_m_pixel_data = members.m_pixel_data ?? 0;
        const h_m_byte_data = members.m_byte_data ?? 0;
        let output = ((0) | 0);
        let sum = ((0) | 0);
        if ((((len) === (13)) ? 1 : 0)) {
            h_m_pixel_data[(__t0 = output, output = ((((output) + (1))) | 0), __t0)] = 0;
            h_m_pixel_data[(__t1 = output, output = ((((output) + (1))) | 0), __t1)] = 1;
            h_m_pixel_data[(__t2 = output, output = ((((output) + (1))) | 0), __t2)] = 0;
            for (let i = ((1) | 0); (((i) < (7)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if ((__mame_table_0[(((__add_decode(runtime, ((h_m_byte_data[0]) * (6)), ((i) - (1)))) % 60) + 60) % 60] ?? 0)) {
                    for (let j = ((0) | 0); (((j) < (7)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                        h_m_pixel_data[(__t3 = output, output = ((((output) + (1))) | 0), __t3)] = (__mame_table_1[(((((((h_m_byte_data[i]) * (7))) + (j))) % 70) + 70) % 70] ?? 0);
                    }
                }
                else {
                    for (let j = ((0) | 0); (((j) < (7)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                        h_m_pixel_data[(__t4 = output, output = ((((output) + (1))) | 0), __t4)] = (__mame_table_2[(((((((h_m_byte_data[i]) * (7))) + (j))) % 70) + 70) % 70] ?? 0);
                    }
                }
            }
            h_m_pixel_data[(__t5 = output, output = ((((output) + (1))) | 0), __t5)] = 1;
            h_m_pixel_data[(__t6 = output, output = ((((output) + (1))) | 0), __t6)] = 0;
            h_m_pixel_data[(__t7 = output, output = ((((output) + (1))) | 0), __t7)] = 1;
            h_m_pixel_data[(__t8 = output, output = ((((output) + (1))) | 0), __t8)] = 0;
            h_m_pixel_data[(__t9 = output, output = ((((output) + (1))) | 0), __t9)] = 1;
            for (let i = ((7) | 0); (((i) < (12)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                for (let j = ((0) | 0); (((j) < (7)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    h_m_pixel_data[(__t10 = output, output = ((((output) + (1))) | 0), __t10)] = (__mame_table_3[(((((((h_m_byte_data[i]) * (7))) + (j))) % 70) + 70) % 70] ?? 0);
                }
            }
            for (let i = ((0) | 0); (((i) < (12)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                sum = ((((sum) + (((((i) & (1))) ? (((h_m_byte_data[i]) * (3))) : (((h_m_byte_data[i]) * (1))))))) | 0);
            }
        }
        else {
            if ((((len) === (8)) ? 1 : 0)) {
                h_m_pixel_data[(__t11 = output, output = ((((output) + (1))) | 0), __t11)] = 0;
                h_m_pixel_data[(__t12 = output, output = ((((output) + (1))) | 0), __t12)] = 1;
                h_m_pixel_data[(__t13 = output, output = ((((output) + (1))) | 0), __t13)] = 0;
                for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    for (let j = ((0) | 0); (((j) < (7)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                        h_m_pixel_data[(__t14 = output, output = ((((output) + (1))) | 0), __t14)] = (__mame_table_1[(((((((h_m_byte_data[i]) * (7))) + (j))) % 70) + 70) % 70] ?? 0);
                    }
                }
                h_m_pixel_data[(__t15 = output, output = ((((output) + (1))) | 0), __t15)] = 1;
                h_m_pixel_data[(__t16 = output, output = ((((output) + (1))) | 0), __t16)] = 0;
                h_m_pixel_data[(__t17 = output, output = ((((output) + (1))) | 0), __t17)] = 1;
                h_m_pixel_data[(__t18 = output, output = ((((output) + (1))) | 0), __t18)] = 0;
                h_m_pixel_data[(__t19 = output, output = ((((output) + (1))) | 0), __t19)] = 1;
                for (let i = ((4) | 0); (((i) < (7)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    for (let j = ((0) | 0); (((j) < (7)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                        h_m_pixel_data[(__t20 = output, output = ((((output) + (1))) | 0), __t20)] = (__mame_table_3[(((((((h_m_byte_data[i]) * (7))) + (j))) % 70) + 70) % 70] ?? 0);
                    }
                }
                for (let i = ((0) | 0); (((i) < (7)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    sum = ((((sum) + (((((i) & (1))) ? (((h_m_byte_data[i]) * (1))) : (((h_m_byte_data[i]) * (3))))))) | 0);
                }
            }
        }
        sum = ((((((10) - (((sum) % (10))))) % (10))) | 0);
        if ((((sum) !== (h_m_byte_data[((len) - (1))])) ? 1 : 0)) {
            0;
        }
        for (let i = ((0) | 0); (((i) < (7)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_pixel_data[(__t21 = output, output = ((((output) + (1))) | 0), __t21)] = (__mame_table_3[(((((((sum) * (7))) + (i))) % 70) + 70) % 70] ?? 0);
        }
        h_m_pixel_data[(__t22 = output, output = ((((output) + (1))) | 0), __t22)] = 0;
        h_m_pixel_data[(__t23 = output, output = ((((output) + (1))) | 0), __t23)] = 1;
        h_m_pixel_data[(__t24 = output, output = ((((output) + (1))) | 0), __t24)] = 0;
        members.m_byte_length = ((len) | 0);
        members.m_pixel_length = ((output) | 0);
    }
    function __add_decode(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_write_code(runtime, barcode, len) {
        const members = runtime.members;
        const h_m_byte_data = members.m_byte_data ?? 0;
        let shift = ((0) | 0);
        let deconde_len = ((len) | 0);
        if ((((deconde_len) === (12)) ? 1 : 0)) {
            shift = ((1) | 0);
            deconde_len = ((13) | 0);
            h_m_byte_data[0] = 0;
        }
        for (let i = ((0) | 0); (((i) < (len)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_byte_data[((i) + (shift))] = ((barcode[i]) - (48));
        }
        method_decode(runtime, deconde_len);
        members.m_new_code = ((1) | 0);
    }
    function method_get_pending_code(runtime) {
        const members = runtime.members;
        return (((members.m_new_code ?? 0)) | 0);
    }
    function method_get_byte_length(runtime) {
        const members = runtime.members;
        return (((members.m_byte_length ?? 0)) | 0);
    }
    function method_is_valid(runtime, len) {
        const members = runtime.members;
        return (((((((((((len) !== (12)) ? 1 : 0)) && ((((len) !== (13)) ? 1 : 0))) ? 1 : 0)) && ((((len) !== (8)) ? 1 : 0))) ? 1 : 0)) ? (0) : (1));
    }
    function method_barcode_reader_device__get_pending_code(runtime) {
        const members = runtime.members;
        return (((members.m_new_code ?? 0)) | 0);
    }
    function method_barcode_reader_device__get_byte_length(runtime) {
        const members = runtime.members;
        return (((members.m_byte_length ?? 0)) | 0);
    }
    function method_barcode_reader_device__is_valid(runtime, len) {
        const members = runtime.members;
        return (((((((((((len) !== (12)) ? 1 : 0)) && ((((len) !== (13)) ? 1 : 0))) ? 1 : 0)) && ((((len) !== (8)) ? 1 : 0))) ? 1 : 0)) ? (0) : (1));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "decode": method_decode,
        "write_code": method_write_code,
        "get_pending_code": method_get_pending_code,
        "get_byte_length": method_get_byte_length,
        "is_valid": method_is_valid,
        "barcode_reader_device::get_pending_code": method_barcode_reader_device__get_pending_code,
        "barcode_reader_device::get_byte_length": method_barcode_reader_device__get_byte_length,
        "barcode_reader_device::is_valid": method_barcode_reader_device__is_valid
    };
    return __methodTable;
})();
definition.children[1].definition.compiledMethods = (() => {
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
    function method_get_software_list_loader(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rom_software_list_loader::instance"];
        return (__L0 ? __L0() : runtime.macro("rom_software_list_loader::instance"));
    }
    function method_is_readable(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_is_writeable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_is_creatable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_image_type_name(runtime) {
        const members = runtime.members;
        return "cartridge";
    }
    function method_image_brief_type_name(runtime) {
        const members = runtime.members;
        return "cart";
    }
    function method_device_rom_image_interface__is_readable(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_rom_image_interface__is_writeable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_rom_image_interface__is_creatable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_rom_image_interface__image_type_name(runtime) {
        const members = runtime.members;
        return "romimage";
    }
    function method_device_rom_image_interface__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "rom";
    }
    function method_device_cartrom_image_interface__image_type_name(runtime) {
        const members = runtime.members;
        return "cartridge";
    }
    function method_device_cartrom_image_interface__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "cart";
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return (((members.m_cart.read?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_image_interface(runtime) {
        const members = runtime.members;
        return "datach_cart";
    }
    function method_file_extensions(runtime) {
        const members = runtime.members;
        return "nes,bin";
    }
    function method_write_prg_bank(runtime, bank) {
        const members = runtime.members;
        bank = ((bank) & 0xff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.write_prg_bank?.(bank) ?? 0);
        }
    }
    function method_nes_datach_slot_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_nes_datach_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return "datach_cart";
    }
    function method_nes_datach_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return "nes,bin";
    }
    function method_nes_datach_slot_device__write_prg_bank(runtime, bank) {
        const members = runtime.members;
        bank = ((bank) & 0xff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.write_prg_bank?.(bank) ?? 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_software_list_loader": method_get_software_list_loader,
        "is_readable": method_is_readable,
        "is_writeable": method_is_writeable,
        "is_creatable": method_is_creatable,
        "image_type_name": method_image_type_name,
        "image_brief_type_name": method_image_brief_type_name,
        "device_rom_image_interface::is_readable": method_device_rom_image_interface__is_readable,
        "device_rom_image_interface::is_writeable": method_device_rom_image_interface__is_writeable,
        "device_rom_image_interface::is_creatable": method_device_rom_image_interface__is_creatable,
        "device_rom_image_interface::image_type_name": method_device_rom_image_interface__image_type_name,
        "device_rom_image_interface::image_brief_type_name": method_device_rom_image_interface__image_brief_type_name,
        "device_cartrom_image_interface::image_type_name": method_device_cartrom_image_interface__image_type_name,
        "device_cartrom_image_interface::image_brief_type_name": method_device_cartrom_image_interface__image_brief_type_name,
        "read": method_read,
        "is_reset_on_load": method_is_reset_on_load,
        "image_interface": method_image_interface,
        "file_extensions": method_file_extensions,
        "write_prg_bank": method_write_prg_bank,
        "nes_datach_slot_device::is_reset_on_load": method_nes_datach_slot_device__is_reset_on_load,
        "nes_datach_slot_device::image_interface": method_nes_datach_slot_device__image_interface,
        "nes_datach_slot_device::file_extensions": method_nes_datach_slot_device__file_extensions,
        "nes_datach_slot_device::write_prg_bank": method_nes_datach_slot_device__write_prg_bank
    };
    return __methodTable;
})();
definition.children[1].definition.compiledMethodLinks = ["rom_software_list_loader::instance"];
definition.children[2].definition.compiledMethods = {};
export const device = definition;
export default device;
