import deviceData from './nes_jf29.device.ir.json' with { type: 'json' };
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
        return ((255) & 0xff);
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
        if (((Number(h_m_chr_src[bank]) === Number(1)) ? 1 : 0)) {
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
    function method_nt_r(runtime, offset) {
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
        if ((((members.m_wram_protect ?? 0)) & (1))) {
            return ((method_device_nes_cart_interface__read_m(runtime, offset)) & 0xff);
        }
        return ((method_get_open_bus(runtime)) & 0xff);
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
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
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
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_irq_enable ?? 0)) {
            let mask = ((65535) & 0xffff);
            if (((((members.m_irq_mode ?? 0)) >>> (3)) & 1)) {
                mask = ((15) & 0xffff);
            }
            else {
                if (((((members.m_irq_mode ?? 0)) >>> (2)) & 1)) {
                    mask = ((255) & 0xffff);
                }
                else {
                    if (((((members.m_irq_mode ?? 0)) >>> (1)) & 1)) {
                        mask = ((4095) & 0xffff);
                    }
                }
            }
            members.m_irq_count = (((((((members.m_irq_count ?? 0)) & ((~mask)))) | ((((((members.m_irq_count ?? 0)) - (1))) & (mask))))) & 0xffff);
            if (((Number((((members.m_irq_count ?? 0)) & (mask))) === Number(mask)) ? 1 : 0)) {
                method_set_irq_line(runtime, 1);
            }
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read_h": method_read_h,
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
        "hi_access_rom": method_hi_access_rom,
        "account_bus_conflict": method_account_bus_conflict,
        "chr_w": method_chr_w,
        "chr_r": method_chr_r,
        "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
        "nt_w": method_nt_w,
        "nt_r": method_nt_r,
        "read_l": method_read_l,
        "read_m": method_read_m,
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "write_l": method_write_l,
        "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
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
        "irq_timer_tick": method_irq_timer_tick
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_maincpu.set_input_line"];
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
    function method_base_frequency(runtime, channel) {
        const members = runtime.members;
        channel = ((channel) & 0xff);
        return (((members.m_channel ?? 0)[channel].basefreq) >>> 0);
    }
    function method_device_start(runtime) {
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
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        let sample_scale = ((1) / (32768));
        for (let channel = ((0) | 0); (((channel) < ((members.m_channels ?? 0))) ? 1 : 0); channel = ((((channel) + (1))) | 0)) {
            if ((runtime.same(stream, (members.m_channel ?? 0)[channel].stream) ? 1 : 0)) {
                let chan = (members.m_channel ?? 0)[channel];
                if ((((((chan.source) ? 1 : 0)) && (((chan.paused) ? 0 : 1))) ? 1 : 0)) {
                    let step = ((chan.curfreq) / ((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(stream, "sample_rate"))));
                    let endpos = chan.source_len;
                    let sample = chan.source;
                    let sample$s = undefined, sample$o = 0;
                    if (ArrayBuffer.isView(sample) || Array.isArray(sample))
                        sample$s = sample;
                    else if (sample !== null && typeof sample === 'object' && sample.generatedPointer === true && sample.path === undefined && sample.target === undefined && (ArrayBuffer.isView(sample.source) || Array.isArray(sample.source))) {
                        sample$s = sample.source;
                        sample$o = sample.offset;
                    }
                    for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                        let pos_floor = Math.floor(Number(chan.pos));
                        let frac = ((chan.pos) - (pos_floor));
                        let ipos = ((((pos_floor) | 0)) | 0);
                        let sample1 = sample[(__t2 = ipos, ipos = ((((ipos) + (1))) | 0), __t2)];
                        let sample2 = sample[((ipos) % (chan.source_len))];
                        (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, ((sample_scale) * (__add_sound_stream_update(runtime, ((((1) - (frac))) * (sample1)), ((frac) * (sample2)))))) ?? 0);
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
    function __add_sound_stream_update(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "base_frequency": method_base_frequency,
        "device_start": method_device_start,
        "read_sample": method_read_sample,
        "little_endianize_int32": method_little_endianize_int32,
        "little_endianize_int16": method_little_endianize_int16,
        "read_flac_sample": method_read_flac_sample,
        "sound_stream_update": method_sound_stream_update,
        "set_channels": method_set_channels,
        "channels": method_channels,
        "samples": method_samples,
        "samples_device::set_channels": method_samples_device__set_channels,
        "samples_device::channels": method_samples_device__channels,
        "samples_device::samples": method_samples_device__samples
    };
    return __methodTable;
})();
definition.children[0].definition.compiledMethodLinks = ["NAME", "flac_decoder", "machine", "machine().sample_rate", "memcmp", "osd_printf_warning", "save_item", "stream_alloc"];
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
export const device = definition;
export default device;
