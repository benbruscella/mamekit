import deviceData from './nes_exrom.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [0, 85, 170, 255];
    function method_read_h(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_sound.pcm_w"];
        const h_m_prg_ram_mapped = members.m_prg_ram_mapped ?? 0;
        const h_m_ram_hi_banks = members.m_ram_hi_banks ?? 0;
        0;
        let bank = ((runtime.divide(offset, 8192)) | 0);
        let ret = ((0) & 0xff);
        if (((((((((((((bank) < (3)) ? 1 : 0)) && (((Number(offset) >= Number(((bank) * (8192)))) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) < Number(((((bank) + (1))) * (8192)))) ? 1 : 0))) ? 1 : 0)) && (h_m_prg_ram_mapped[bank])) ? 1 : 0)) {
            if ((((((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) && ((((h_m_ram_hi_banks[bank]) < (4)) ? 1 : 0))) ? 1 : 0)) {
                ret = ((runtime.readIndex((members.m_battery ?? 0), ((__add_read_h(runtime, ((h_m_ram_hi_banks[bank]) * (8192)), ((offset) & (8191)))) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
            }
            else {
                if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    ret = ((runtime.readIndex((members.m_prgram ?? 0), ((__add_read_h(runtime, ((((h_m_ram_hi_banks[bank]) & (3))) * (8192)), ((offset) & (8191)))) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
                }
            }
        }
        else {
            ret = ((method_hi_access_rom(runtime, offset)) & 0xff);
        }
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if (((((~offset)) >>> (14)) & 1)) {
                (__L2 ? __L2(ret) : ((members.m_sound)?.pcm_w?.(ret) ?? 0));
            }
        }
        return ((ret) & 0xff);
    }
    function __add_read_h(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
        members.m_vcount = ((scanline) | 0);
        if ((((scanline) === ((members.m_irq_count ?? 0))) ? 1 : 0)) {
            members.m_irq_status = ((255) & 0xff);
            method_update_irq(runtime);
        }
        if ((((scanline) === (0)) ? 1 : 0)) {
            members.m_irq_status = ((((members.m_irq_status) | (64))) & 0xff);
        }
        else {
            if (((Number(scanline) > Number(239)) ? 1 : 0)) {
                members.m_irq_status = ((((members.m_irq_status) & (-65))) & 0xff);
            }
        }
    }
    function method_update_irq(runtime) {
        const members = runtime.members;
        method_set_irq_line(runtime, ((((((((((((members.m_irq_status ?? 0)) >>> (7)) & 1)) && ((members.m_irq_enable ?? 0))) ? 1 : 0)) || ((members.m_pcm_irq ?? 0))) ? 1 : 0)) ? (1) : (0)));
    }
    function method_set_irq_line(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_maincpu.set_input_line"];
        (__L0 ? __L0(0, state) : ((members.m_maincpu)?.set_input_line?.(0, state) ?? 0));
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
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_ppu.get_draw_phase"], __L1 = __l["m_ppu.is_sprite_8x16"];
        let bank = ((((offset) >>> (10))) | 0);
        if (((((((((((members.m_exram_control ?? 0)) === (1)) ? 1 : 0)) && (((Number((__L0 ? __L0() : ((members.m_ppu)?.get_draw_phase?.() ?? 0))) === Number(0)) ? 1 : 0))) ? 1 : 0)) && ((members.m_ex1_chr ?? 0))) ? 1 : 0)) {
            return ((method_bg_ex1_chr_r(runtime, ((offset) & (4095)))) & 0xff);
        }
        if ((((((((((((((members.m_split_scr ?? 0)) && ((((((members.m_exram_control ?? 0)) & (2))) ? 0 : 1))) ? 1 : 0)) && (method_in_split(runtime))) ? 1 : 0)) && (((Number((__L0 ? __L0() : ((members.m_ppu)?.get_draw_phase?.() ?? 0))) === Number(0)) ? 1 : 0))) ? 1 : 0)) && ((members.m_split_chr ?? 0))) ? 1 : 0)) {
            return ((method_split_chr_r(runtime, ((offset) & (4095)))) & 0xff);
        }
        if ((__L1 ? __L1() : ((members.m_ppu)?.is_sprite_8x16?.() ?? 0))) {
            if (((Number((__L0 ? __L0() : ((members.m_ppu)?.get_draw_phase?.() ?? 0))) === Number(1)) ? 1 : 0)) {
                return ((method_base_chr_r(runtime, ((bank) & (7)), ((offset) & (8191)))) & 0xff);
            }
            if (((Number((__L0 ? __L0() : ((members.m_ppu)?.get_draw_phase?.() ?? 0))) === Number(0)) ? 1 : 0)) {
                return ((method_base_chr_r(runtime, __add_chr_r(runtime, ((bank) & (3)), 8), ((offset) & (8191)))) & 0xff);
            }
        }
        if (((Number((members.m_last_chr ?? 0)) === Number(0)) ? 1 : 0)) {
            return ((method_base_chr_r(runtime, ((bank) & (7)), ((offset) & (8191)))) & 0xff);
        }
        else {
            return ((method_base_chr_r(runtime, __add_chr_r(runtime, ((bank) & (3)), 8), ((offset) & (8191)))) & 0xff);
        }
    }
    function __add_chr_r(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_bg_ex1_chr_r(runtime, offset) {
        const members = runtime.members;
        let helper = ((__add_bg_ex1_chr_r(runtime, (((members.m_ex1_bank ?? 0)) * (4096)), ((offset) & (4095)))) >>> 0);
        return ((runtime.readIndex((members.m_vrom ?? 0), ((helper) & ((((members.m_vrom_size ?? 0)) - (1)))))) & 0xff);
    }
    function __add_bg_ex1_chr_r(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_in_split(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_ppu.get_tilenum"];
        let tile = (((__L0 ? __L0() : ((members.m_ppu)?.get_tilenum?.() ?? 0))) | 0);
        if ((((tile) < (34)) ? 1 : 0)) {
            if (((((((members.m_split_rev ?? 0)) ? 0 : 1)) && ((((tile) < ((members.m_split_ctrl ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                return 1;
            }
            if (((((members.m_split_rev ?? 0)) && ((((tile) >= ((members.m_split_ctrl ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                return 1;
            }
        }
        return 0;
    }
    function method_split_chr_r(runtime, offset) {
        const members = runtime.members;
        let helper = ((__add_split_chr_r(runtime, __add_split_chr_r(runtime, (((members.m_split_bank ?? 0)) * (4096)), ((offset) & (1016))), (((members.m_split_yst ?? 0)) & (7)))) >>> 0);
        return ((runtime.readIndex((members.m_vrom ?? 0), ((helper) & ((((members.m_vrom_size ?? 0)) - (1)))))) & 0xff);
    }
    function __add_split_chr_r(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_base_chr_r(runtime, bank, offset) {
        const members = runtime.members;
        const h_m_vrom_bank = members.m_vrom_bank ?? 0;
        let helper = ((0) >>> 0);
        switch ((members.m_chr_mode ?? 0)) {
            case 0:
                {
                    if ((((bank) < (8)) ? 1 : 0)) {
                        helper = ((__add_base_chr_r(runtime, ((((h_m_vrom_bank[((bank) | (7))]) & (255))) * (8192)), ((offset) & (8191)))) >>> 0);
                    }
                    else {
                        helper = ((__add_base_chr_r(runtime, ((((h_m_vrom_bank[((bank) | (3))]) & (255))) * (8192)), ((offset) & (8191)))) >>> 0);
                    }
                    break;
                }
            case 1:
                {
                    helper = ((__add_base_chr_r(runtime, ((((h_m_vrom_bank[((bank) | (3))]) & (255))) * (4096)), ((offset) & (4095)))) >>> 0);
                    break;
                }
            case 2:
                {
                    helper = ((__add_base_chr_r(runtime, ((h_m_vrom_bank[((bank) | (1))]) * (2048)), ((offset) & (2047)))) >>> 0);
                    break;
                }
            case 3:
                {
                    helper = ((__add_base_chr_r(runtime, ((h_m_vrom_bank[bank]) * (1024)), ((offset) & (1023)))) >>> 0);
                    break;
                }
        }
        return ((runtime.readIndex((members.m_vrom ?? 0), ((helper) & ((((members.m_vrom_size ?? 0)) - (1)))))) & 0xff);
    }
    function __add_base_chr_r(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
        const h_m_nt_src = members.m_nt_src ?? 0;
        const h_m_exram = members.m_exram ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = ((runtime.shiftRight(((offset) & (3072)), 10)) | 0);
        if (((h_m_nt_writable[page]) ? 0 : 1)) {
            return;
        }
        switch (h_m_nt_src[page]) {
            case 2:
                {
                    h_m_exram[((offset) & (1023))] = data;
                    break;
                }
            default:
                {
                    runtime.writeIndex(h_m_nt_access[page], ((offset) & (1023)), data);
                    break;
                }
        }
    }
    function method_nt_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_ppu.get_tilenum"], __L1 = __l["machine"], __L2 = __l["machine().side_effects_disabled"];
        const h_m_nt_src = members.m_nt_src ?? 0;
        const h_m_exram = members.m_exram ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = ((runtime.shiftRight(((offset) & (3072)), 10)) | 0);
        switch (h_m_nt_src[page]) {
            case 3:
                {
                    if (((Number(((offset) & (1023))) >= Number(960)) ? 1 : 0)) {
                        return (((members.m_floodattr ?? 0)) & 0xff);
                    }
                    return (((members.m_floodtile ?? 0)) & 0xff);
                }
            case 2:
                {
                    if (((((((members.m_exram_control ?? 0)) >>> (1)) & 1)) ? 0 : 1)) {
                        return ((h_m_exram[((offset) & (1023))]) & 0xff);
                    }
                    else {
                        return ((0) & 0xff);
                    }
                }
            default:
                {
                    if ((((((((members.m_split_scr ?? 0)) && ((((((members.m_exram_control ?? 0)) & (2))) ? 0 : 1))) ? 1 : 0)) && (method_in_split(runtime))) ? 1 : 0)) {
                        let tile = (((__L0 ? __L0() : ((members.m_ppu)?.get_tilenum?.() ?? 0))) | 0);
                        if (((Number(((offset) & (1023))) >= Number(960)) ? 1 : 0)) {
                            let pos = ((runtime.shiftRight((((((((members.m_split_yst ?? 0)) + ((members.m_vcount ?? 0)))) & (-32))) | (((tile) & (31)))), 2)) | 0);
                            return ((h_m_exram[((960) | (pos))]) & 0xff);
                        }
                        else {
                            let pos = (((((((((((members.m_split_yst ?? 0)) + ((members.m_vcount ?? 0)))) & (248))) << (2))) | (((tile) & (31))))) | 0);
                            return ((h_m_exram[pos]) & 0xff);
                        }
                    }
                    if (((((members.m_exram_control ?? 0)) === (1)) ? 1 : 0)) {
                        if (((Number(((offset) & (1023))) >= Number(960)) ? 1 : 0)) {
                            return (((members.m_ex1_attrib ?? 0)) & 0xff);
                        }
                        else {
                            if (((((__L2 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                members.m_ex1_chr = ((1) & 0xff);
                                members.m_ex1_bank = ((((((h_m_exram[((offset) & (1023))]) & (63))) | ((((members.m_high_chr ?? 0)) << (6))))) & 0xff);
                                members.m_ex1_attrib = (((__mame_table_0[(((((((h_m_exram[((offset) & (1023))]) >>> (6))) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
                            }
                        }
                    }
                    return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
                }
        }
    }
    function method_read_l(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sound.read"], __L1 = __l["machine"], __L2 = __l["machine().side_effects_disabled"];
        const h_m_exram = members.m_exram ?? 0;
        let value = ((0) | 0);
        0;
        offset = ((offset) + (256));
        if (((((((offset) >= (4096)) ? 1 : 0)) && ((((offset) <= (4117)) ? 1 : 0))) ? 1 : 0)) {
            return (((__L0 ? __L0(((offset) & (31))) : ((members.m_sound)?.read?.(((offset) & (31))) ?? 0))) & 0xff);
        }
        if (((((((offset) >= (7168)) ? 1 : 0)) && ((((offset) <= (8191)) ? 1 : 0))) ? 1 : 0)) {
            if (((((members.m_exram_control ?? 0)) >>> (1)) & 1)) {
                return ((h_m_exram[((offset) - (7168))]) & 0xff);
            }
            else {
                return ((method_get_open_bus(runtime)) & 0xff);
            }
        }
        switch (offset) {
            case 4612:
                {
                    value = (((members.m_irq_status ?? 0)) | 0);
                    if (((((__L2 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        members.m_irq_status = ((((members.m_irq_status) & (-129))) & 0xff);
                        method_update_irq(runtime);
                    }
                    return ((value) & 0xff);
                }
            case 4613:
                {
                    return (((((((members.m_mult1 ?? 0)) * ((members.m_mult2 ?? 0)))) & (255))) & 0xff);
                }
            case 4614:
                {
                    return ((runtime.shiftRight((((((members.m_mult1 ?? 0)) * ((members.m_mult2 ?? 0)))) & (65280)), 8)) & 0xff);
                }
            default:
                {
                    if (((((__L2 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        0;
                    }
                    return ((method_get_open_bus(runtime)) & 0xff);
                }
        }
    }
    function method_read_m(runtime, offset) {
        const members = runtime.members;
        0;
        if ((((((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) && (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) {
            if (((((members.m_wram_base ?? 0)) >>> (2)) & 1)) {
                return ((runtime.readIndex((members.m_prgram ?? 0), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
            }
            else {
                return ((runtime.readIndex((members.m_battery ?? 0), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
            }
        }
        else {
            if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                return ((runtime.readIndex((members.m_prgram ?? 0), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
            }
            else {
                if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    return ((runtime.readIndex((members.m_battery ?? 0), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
                }
                else {
                    return ((method_get_open_bus(runtime)) & 0xff);
                }
            }
        }
    }
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_sound.write"];
        data = ((data) & 0xff);
        const h_m_exram = members.m_exram ?? 0;
        const h_m_prg_regs = members.m_prg_regs ?? 0;
        const h_m_prg_ram_mapped = members.m_prg_ram_mapped ?? 0;
        const h_m_vrom_bank = members.m_vrom_bank ?? 0;
        0;
        offset = ((offset) + (256));
        if (((((((offset) >= (4096)) ? 1 : 0)) && ((((offset) <= (4117)) ? 1 : 0))) ? 1 : 0)) {
            (__L0 ? __L0(((offset) & (31)), data) : ((members.m_sound)?.write?.(((offset) & (31)), data) ?? 0));
            return;
        }
        if (((((((offset) >= (7168)) ? 1 : 0)) && ((((offset) <= (8191)) ? 1 : 0))) ? 1 : 0)) {
            if (((((members.m_exram_control ?? 0)) === (2)) ? 1 : 0)) {
                h_m_exram[((offset) - (7168))] = data;
            }
            else {
                if (((((members.m_exram_control ?? 0)) !== (3)) ? 1 : 0)) {
                    if (((((members.m_irq_status ?? 0)) >>> (6)) & 1)) {
                        h_m_exram[((offset) - (7168))] = data;
                    }
                    else {
                        h_m_exram[((offset) - (7168))] = 0;
                    }
                }
            }
            return;
        }
        switch (offset) {
            case 4352:
                {
                    members.m_prg_mode = ((((data) & (3))) & 0xff);
                    method_update_prg(runtime);
                    0;
                    break;
                }
            case 4353:
                {
                    members.m_chr_mode = ((((data) & (3))) & 0xff);
                    members.m_ex1_chr = ((0) & 0xff);
                    members.m_split_chr = ((0) & 0xff);
                    0;
                    break;
                }
            case 4354:
                {
                    members.m_wram_protect_1 = ((((data) & (3))) & 0xff);
                    0;
                    break;
                }
            case 4355:
                {
                    members.m_wram_protect_2 = ((((data) & (3))) & 0xff);
                    0;
                    break;
                }
            case 4356:
                {
                    members.m_exram_control = ((((data) & (3))) & 0xff);
                    0;
                    break;
                }
            case 4357:
                {
                    method_set_mirror(runtime, 0, runtime.shiftRight(((data) & (3)), 0));
                    method_set_mirror(runtime, 1, runtime.shiftRight(((data) & (12)), 2));
                    method_set_mirror(runtime, 2, runtime.shiftRight(((data) & (48)), 4));
                    method_set_mirror(runtime, 3, runtime.shiftRight(((data) & (192)), 6));
                    break;
                }
            case 4358:
                {
                    members.m_floodtile = ((data) & 0xff);
                    break;
                }
            case 4359:
                {
                    members.m_floodattr = (((__mame_table_0[(((((data) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
                    break;
                }
            case 4371:
                {
                    0;
                    members.m_wram_base = ((((data) & (7))) & 0xff);
                    break;
                }
            case 4372:
            case 4373:
            case 4374:
            case 4375:
                {
                    h_m_prg_regs[((offset) & (3))] = ((data) & (127));
                    h_m_prg_ram_mapped[((offset) & (3))] = (((((data) >>> (7)) & 1)) ? 0 : 1);
                    method_update_prg(runtime);
                    break;
                }
            case 4384:
            case 4385:
            case 4386:
            case 4387:
            case 4388:
            case 4389:
            case 4390:
            case 4391:
                {
                    h_m_vrom_bank[((offset) & (7))] = ((data) | ((((members.m_high_chr ?? 0)) << (8))));
                    members.m_last_chr = ((0) & 0xff);
                    members.m_ex1_chr = ((0) & 0xff);
                    members.m_split_chr = ((0) & 0xff);
                    break;
                }
            case 4392:
            case 4393:
            case 4394:
            case 4395:
                {
                    h_m_vrom_bank[((offset) & (15))] = ((data) | ((((members.m_high_chr ?? 0)) << (8))));
                    members.m_last_chr = ((1) & 0xff);
                    members.m_ex1_chr = ((0) & 0xff);
                    members.m_split_chr = ((0) & 0xff);
                    break;
                }
            case 4400:
                {
                    members.m_high_chr = ((((data) & (3))) & 0xff);
                    members.m_ex1_chr = ((0) & 0xff);
                    members.m_split_chr = ((0) & 0xff);
                    break;
                }
            case 4608:
                {
                    members.m_split_scr = (((((data) >>> (7)) & 1)) & 0xff);
                    members.m_split_rev = (((((data) >>> (6)) & 1)) & 0xff);
                    members.m_split_ctrl = ((((data) & (31))) & 0xff);
                    break;
                }
            case 4609:
                {
                    members.m_split_yst = (((((((data) >= (240)) ? 1 : 0)) ? (((data) - (16))) : (data))) & 0xff);
                    break;
                }
            case 4610:
                {
                    members.m_split_bank = ((data) & 0xff);
                    members.m_split_chr = ((1) & 0xff);
                    break;
                }
            case 4611:
                {
                    members.m_irq_count = ((data) & 0xffff);
                    0;
                    break;
                }
            case 4612:
                {
                    members.m_irq_enable = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    0;
                    break;
                }
            case 4613:
                {
                    members.m_mult1 = ((data) | 0);
                    break;
                }
            case 4614:
                {
                    members.m_mult2 = ((data) | 0);
                    break;
                }
            default:
                {
                    0;
                    break;
                }
        }
    }
    function method_update_prg(runtime) {
        const members = runtime.members;
        const h_m_prg_regs = members.m_prg_regs ?? 0;
        const h_m_prg_ram_mapped = members.m_prg_ram_mapped ?? 0;
        const h_m_ram_hi_banks = members.m_ram_hi_banks ?? 0;
        let bank0 = ((0) | 0);
        let bank1 = ((0) | 0);
        let bank2 = ((0) | 0);
        let bank3 = ((0) | 0);
        switch ((members.m_prg_mode ?? 0)) {
            case 0:
                {
                    bank3 = ((((h_m_prg_regs[3]) >>> (2))) | 0);
                    method_prg32(runtime, bank3);
                    break;
                }
            case 1:
                {
                    bank1 = ((((h_m_prg_regs[1]) >>> (1))) | 0);
                    bank3 = ((((h_m_prg_regs[3]) >>> (1))) | 0);
                    if (h_m_prg_ram_mapped[1]) {
                        h_m_ram_hi_banks[0] = ((((bank1) << (1))) & (7));
                        h_m_ram_hi_banks[1] = ((((((bank1) << (1))) & (7))) | (1));
                    }
                    else {
                        method_prg16_89ab(runtime, bank1);
                    }
                    method_prg16_cdef(runtime, bank3);
                    break;
                }
            case 2:
                {
                    bank1 = ((((h_m_prg_regs[1]) >>> (1))) | 0);
                    bank2 = ((h_m_prg_regs[2]) | 0);
                    bank3 = ((h_m_prg_regs[3]) | 0);
                    if (h_m_prg_ram_mapped[1]) {
                        h_m_ram_hi_banks[0] = ((((bank1) << (1))) & (7));
                        h_m_ram_hi_banks[1] = ((((((bank1) << (1))) & (7))) | (1));
                    }
                    else {
                        method_prg16_89ab(runtime, bank1);
                    }
                    if (h_m_prg_ram_mapped[2]) {
                        h_m_ram_hi_banks[2] = ((bank2) & (7));
                    }
                    else {
                        method_prg8_cd(runtime, bank2);
                    }
                    method_prg8_ef(runtime, bank3);
                    break;
                }
            case 3:
                {
                    bank0 = ((h_m_prg_regs[0]) | 0);
                    bank1 = ((h_m_prg_regs[1]) | 0);
                    bank2 = ((h_m_prg_regs[2]) | 0);
                    bank3 = ((h_m_prg_regs[3]) | 0);
                    if (h_m_prg_ram_mapped[0]) {
                        h_m_ram_hi_banks[0] = ((bank0) & (7));
                    }
                    else {
                        method_prg8_89(runtime, bank0);
                    }
                    if (h_m_prg_ram_mapped[1]) {
                        h_m_ram_hi_banks[1] = ((bank1) & (7));
                    }
                    else {
                        method_prg8_ab(runtime, bank1);
                    }
                    if (h_m_prg_ram_mapped[2]) {
                        h_m_ram_hi_banks[2] = ((bank2) & (7));
                    }
                    else {
                        method_prg8_cd(runtime, bank2);
                    }
                    method_prg8_ef(runtime, bank3);
                    break;
                }
        }
    }
    function method_prg32(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        if ((((((members.m_prg_chunks ?? 0)) >>> (1))) ? 0 : 1)) {
            return;
        }
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (4)))) | 0);
        h_m_prg_bank[0] = ((bank) + (0));
        h_m_prg_bank[1] = ((bank) + (1));
        h_m_prg_bank[2] = ((bank) + (2));
        h_m_prg_bank[3] = ((bank) + (3));
        method_update_prg_banks(runtime, 0, 3);
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
    function method_prg16_89ab(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (2)))) | 0);
        h_m_prg_bank[0] = ((bank) + (0));
        h_m_prg_bank[1] = ((bank) + (1));
        method_update_prg_banks(runtime, 0, 1);
    }
    function method_prg16_cdef(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (2)))) | 0);
        h_m_prg_bank[2] = ((bank) + (0));
        h_m_prg_bank[3] = ((bank) + (1));
        method_update_prg_banks(runtime, 2, 3);
    }
    function method_prg8_cd(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 2, bank);
    }
    function method_prg8_x(runtime, start, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        bank = ((method_prg_8k_bank_num(runtime, bank)) | 0);
        h_m_prg_bank[start] = bank;
        method_update_prg_banks(runtime, start, start);
    }
    function method_prg8_ef(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 3, bank);
    }
    function method_prg8_89(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 0, bank);
    }
    function method_prg8_ab(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 1, bank);
    }
    function method_set_mirror(runtime, page, src) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        switch (src) {
            case 0:
                {
                    method_set_nt_page(runtime, page, 0, 0, 1);
                    break;
                }
            case 1:
                {
                    method_set_nt_page(runtime, page, 0, 1, 1);
                    break;
                }
            case 2:
                {
                    method_set_nt_page(runtime, page, 2, 0, 1);
                    break;
                }
            case 3:
                {
                    method_set_nt_page(runtime, page, 3, 0, 0);
                    break;
                }
            default:
                {
                    (__L0 ? __L0("This should never happen\n") : runtime.macro("fatalerror", "This should never happen\n"));
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
    function method_write_m(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        0;
        if ((((((((members.m_wram_protect_1 ?? 0)) !== (2)) ? 1 : 0)) || (((((members.m_wram_protect_2 ?? 0)) !== (1)) ? 1 : 0))) ? 1 : 0)) {
            return;
        }
        if ((((((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) && (((((members.m_wram_base ?? 0)) < (4)) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_battery"), ((((offset) + ((((members.m_wram_base ?? 0)) * (8192))))) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        else {
            if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                runtime.writeIndex(runtime.writableMember("m_prgram"), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_prgram).length, 1))), data);
            }
        }
    }
    function method_write_h(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_prg_ram_mapped = members.m_prg_ram_mapped ?? 0;
        const h_m_ram_hi_banks = members.m_ram_hi_banks ?? 0;
        0;
        let bank = ((runtime.divide(offset, 8192)) | 0);
        if ((((((((((((((members.m_wram_protect_1 ?? 0)) !== (2)) ? 1 : 0)) || (((((members.m_wram_protect_2 ?? 0)) !== (1)) ? 1 : 0))) ? 1 : 0)) || ((((bank) === (3)) ? 1 : 0))) ? 1 : 0)) || (((h_m_prg_ram_mapped[bank]) ? 0 : 1))) ? 1 : 0)) {
            return;
        }
        if ((((((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) && ((((h_m_ram_hi_banks[bank]) < (4)) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_battery"), ((__add_write_h(runtime, ((h_m_ram_hi_banks[bank]) * (8192)), ((offset) & (8191)))) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        else {
            if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                runtime.writeIndex(runtime.writableMember("m_prgram"), ((__add_write_h(runtime, ((((h_m_ram_hi_banks[bank]) & (3))) * (8192)), ((offset) & (8191)))) & (runtime.subtract((members.m_prgram).length, 1))), data);
            }
        }
    }
    function __add_write_h(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method_pcm_irq(runtime, state) {
        const members = runtime.members;
        members.m_pcm_irq = ((state) ? 1 : 0);
        method_update_irq(runtime);
    }
    function method_device_nes_cart_interface__nt_r(runtime, offset) {
        const members = runtime.members;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
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
    function method_device_nes_cart_interface__read_l(runtime, offset) {
        const members = runtime.members;
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_device_nes_cart_interface__write_l(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
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
    function method_device_nes_cart_interface__write_h(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
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
        "update_irq": method_update_irq,
        "set_irq_line": method_set_irq_line,
        "scanline_irq": method_scanline_irq,
        "prgram_alloc": method_prgram_alloc,
        "battery_alloc": method_battery_alloc,
        "account_bus_conflict": method_account_bus_conflict,
        "chr_w": method_chr_w,
        "chr_r": method_chr_r,
        "bg_ex1_chr_r": method_bg_ex1_chr_r,
        "in_split": method_in_split,
        "split_chr_r": method_split_chr_r,
        "base_chr_r": method_base_chr_r,
        "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
        "nt_w": method_nt_w,
        "nt_r": method_nt_r,
        "read_l": method_read_l,
        "read_m": method_read_m,
        "write_l": method_write_l,
        "update_prg": method_update_prg,
        "prg32": method_prg32,
        "prg_8k_bank_num": method_prg_8k_bank_num,
        "update_prg_banks": method_update_prg_banks,
        "prg16_89ab": method_prg16_89ab,
        "prg16_cdef": method_prg16_cdef,
        "prg8_cd": method_prg8_cd,
        "prg8_x": method_prg8_x,
        "prg8_ef": method_prg8_ef,
        "prg8_89": method_prg8_89,
        "prg8_ab": method_prg8_ab,
        "set_mirror": method_set_mirror,
        "set_nt_page": method_set_nt_page,
        "write_m": method_write_m,
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
        "pcm_irq": method_pcm_irq,
        "device_nes_cart_interface::nt_r": method_device_nes_cart_interface__nt_r,
        "device_nes_cart_interface::nt_w": method_device_nes_cart_interface__nt_w,
        "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
        "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
        "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["fatalerror", "m_maincpu.set_input_line", "m_ppu.get_draw_phase", "m_ppu.get_tilenum", "m_ppu.is_sprite_8x16", "m_sound.pcm_w", "m_sound.read", "m_sound.write", "machine", "machine().side_effects_disabled"];
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
    const __mame_table_0 = [10, 254, 20, 2, 40, 4, 80, 6, 160, 8, 60, 10, 14, 12, 26, 14, 12, 16, 24, 18, 48, 20, 96, 22, 192, 24, 72, 26, 16, 28, 32, 30];
    const __mame_table_1 = [64, 96, 120, 159];
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"], __L1 = __l["save_item"];
        const h_m_square_lut = members.m_square_lut ?? 0;
        const h_m_core = members.m_core ?? 0;
        members.m_frame_clocks = ((29830) & 0xffff);
        method_calculate_rates(runtime);
        for (let i = ((0) | 0); (((i) < (31)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let pulse_out = (((((i) === (0)) ? 1 : 0)) ? (0) : (((95.88) / (__add_device_start(runtime, ((8128) / (i)), 100)))));
            h_m_square_lut[i] = pulse_out;
        }
        for (let i = ((0) | 0); (((i) < (2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (__L1 ? __L1((__L0 ? __L0(h_m_core.squ[i].regs) : runtime.macro("NAME", h_m_core.squ[i].regs)), i) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.squ[i].regs) : runtime.macro("NAME", h_m_core.squ[i].regs)), i));
            (__L1 ? __L1((__L0 ? __L0(h_m_core.squ[i].vbl_length) : runtime.macro("NAME", h_m_core.squ[i].vbl_length)), i) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.squ[i].vbl_length) : runtime.macro("NAME", h_m_core.squ[i].vbl_length)), i));
            (__L1 ? __L1((__L0 ? __L0(h_m_core.squ[i].freq) : runtime.macro("NAME", h_m_core.squ[i].freq)), i) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.squ[i].freq) : runtime.macro("NAME", h_m_core.squ[i].freq)), i));
            (__L1 ? __L1((__L0 ? __L0(h_m_core.squ[i].phaseacc) : runtime.macro("NAME", h_m_core.squ[i].phaseacc)), i) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.squ[i].phaseacc) : runtime.macro("NAME", h_m_core.squ[i].phaseacc)), i));
            (__L1 ? __L1((__L0 ? __L0(h_m_core.squ[i].env_phase) : runtime.macro("NAME", h_m_core.squ[i].env_phase)), i) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.squ[i].env_phase) : runtime.macro("NAME", h_m_core.squ[i].env_phase)), i));
            (__L1 ? __L1((__L0 ? __L0(h_m_core.squ[i].adder) : runtime.macro("NAME", h_m_core.squ[i].adder)), i) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.squ[i].adder) : runtime.macro("NAME", h_m_core.squ[i].adder)), i));
            (__L1 ? __L1((__L0 ? __L0(h_m_core.squ[i].env_vol) : runtime.macro("NAME", h_m_core.squ[i].env_vol)), i) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.squ[i].env_vol) : runtime.macro("NAME", h_m_core.squ[i].env_vol)), i));
            (__L1 ? __L1((__L0 ? __L0(h_m_core.squ[i].enabled) : runtime.macro("NAME", h_m_core.squ[i].enabled)), i) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.squ[i].enabled) : runtime.macro("NAME", h_m_core.squ[i].enabled)), i));
            (__L1 ? __L1((__L0 ? __L0(h_m_core.squ[i].output) : runtime.macro("NAME", h_m_core.squ[i].output)), i) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.squ[i].output) : runtime.macro("NAME", h_m_core.squ[i].output)), i));
        }
        (__L1 ? __L1((__L0 ? __L0(h_m_core.pcm.regs) : runtime.macro("NAME", h_m_core.pcm.regs))) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.pcm.regs) : runtime.macro("NAME", h_m_core.pcm.regs))));
        (__L1 ? __L1((__L0 ? __L0(h_m_core.pcm.irq_enabled) : runtime.macro("NAME", h_m_core.pcm.irq_enabled))) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.pcm.irq_enabled) : runtime.macro("NAME", h_m_core.pcm.irq_enabled))));
        (__L1 ? __L1((__L0 ? __L0(h_m_core.pcm.irq_line) : runtime.macro("NAME", h_m_core.pcm.irq_line))) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.pcm.irq_line) : runtime.macro("NAME", h_m_core.pcm.irq_line))));
        (__L1 ? __L1((__L0 ? __L0(h_m_core.pcm.output) : runtime.macro("NAME", h_m_core.pcm.output))) : runtime.macro("save_item", (__L0 ? __L0(h_m_core.pcm.output) : runtime.macro("NAME", h_m_core.pcm.output))));
    }
    function __add_device_start(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_calculate_rates(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["stream_alloc"];
        const h_m_vbl_times = members.m_vbl_times ?? 0;
        const h_m_sync_times1 = members.m_sync_times1 ?? 0;
        members.m_samps_per_sync = ((runtime.divide((members.m_frame_clocks ?? 0), 4)) >>> 0);
        for (let i = ((0) | 0); ((Number(i) < Number(32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_vbl_times[i] = runtime.divide((((__mame_table_0[((i) & 31)] ?? 0)) * ((members.m_samps_per_sync ?? 0))), 4);
            h_m_sync_times1[i] = (((members.m_samps_per_sync ?? 0)) * (((i) + (1))));
        }
        let rate = ((runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 4)) | 0);
        if ((((members.m_stream ?? 0)) ? 1 : 0)) {
            (__deref_calculate_rates(runtime, members.m_stream).set_sample_rate?.(rate) ?? 0);
        }
        else {
            members.m_stream = (__L1 ? __L1(0, 1, rate) : runtime.macro("stream_alloc", 0, 1, rate));
        }
    }
    function __deref_calculate_rates(runtime, p) {
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
        const __L0 = __l["m_irq_handler"];
        let __t0;
        data = ((data) & 0xff);
        const h_m_core = members.m_core ?? 0;
        const h_m_vbl_times = members.m_vbl_times ?? 0;
        (__t0 = __deref_write(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        let chan = (((((offset) >>> (2)) & 1)) | 0);
        switch (offset) {
            case 0:
            case 4:
                {
                    h_m_core.squ[chan].regs[0] = data;
                    break;
                }
            case 2:
            case 6:
                {
                    h_m_core.squ[chan].regs[2] = data;
                    if (h_m_core.squ[chan].enabled) {
                        h_m_core.squ[chan].freq = ((((__add_write(runtime, ((((((h_m_core.squ[chan].regs[3]) & (7))) << (8))) + (data)), 1)) << (16))) | 0);
                    }
                    break;
                }
            case 3:
            case 7:
                {
                    h_m_core.squ[chan].regs[3] = data;
                    if (h_m_core.squ[chan].enabled) {
                        h_m_core.squ[chan].vbl_length = ((h_m_vbl_times[((data) >>> (3))]) | 0);
                        h_m_core.squ[chan].env_vol = ((0) & 0xff);
                        h_m_core.squ[chan].freq = ((((__add_write(runtime, ((((((data) & (7))) << (8))) + (h_m_core.squ[chan].regs[2])), 1)) << (16))) | 0);
                    }
                    break;
                }
            case 16:
                {
                    h_m_core.pcm.regs[0] = data;
                    h_m_core.pcm.irq_enabled = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    (__L0 ? __L0(Number(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled)))) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))) : runtime.invoke("m_irq_handler", ((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))));
                    break;
                }
            case 17:
                {
                    h_m_core.pcm.regs[1] = data;
                    if (((((~h_m_core.pcm.regs[0])) >>> (0)) & 1)) {
                        if ((((data) === (0)) ? 1 : 0)) {
                            h_m_core.pcm.irq_line = ((1) ? 1 : 0);
                            (__L0 ? __L0(Number(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled)))) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))) : runtime.invoke("m_irq_handler", ((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))));
                        }
                        else {
                            h_m_core.pcm.output = ((data) & 0xff);
                        }
                    }
                    break;
                }
            case 21:
                {
                    if ((((data) >>> (0)) & 1)) {
                        h_m_core.squ[0].enabled = ((1) ? 1 : 0);
                    }
                    else {
                        h_m_core.squ[0].enabled = ((0) ? 1 : 0);
                        h_m_core.squ[0].vbl_length = ((0) | 0);
                    }
                    if ((((data) >>> (1)) & 1)) {
                        h_m_core.squ[1].enabled = ((1) ? 1 : 0);
                    }
                    else {
                        h_m_core.squ[1].enabled = ((0) ? 1 : 0);
                        h_m_core.squ[1].vbl_length = ((0) | 0);
                    }
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    function __add_write(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method_read(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_irq_handler"];
        let __t0;
        const h_m_core = members.m_core ?? 0;
        (__t0 = __deref_read(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        let readval = ((0) & 0xff);
        switch (offset) {
            case 16:
                {
                    readval = ((((readval) | (((((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))) ? (128) : (0))))) & 0xff);
                    if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        h_m_core.pcm.irq_line = ((0) ? 1 : 0);
                        (__L2 ? __L2(Number(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled)))) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))) : runtime.invoke("m_irq_handler", ((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))));
                    }
                    break;
                }
            case 21:
                {
                    if ((((h_m_core.squ[0].vbl_length) > (0)) ? 1 : 0)) {
                        readval = ((((readval) | (1))) & 0xff);
                    }
                    if ((((h_m_core.squ[1].vbl_length) > (0)) ? 1 : 0)) {
                        readval = ((((readval) | (2))) & 0xff);
                    }
                    break;
                }
            default:
                {
                    if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        0;
                    }
                    break;
                }
        }
        return ((readval) & 0xff);
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
    function method_pcm_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_core = members.m_core ?? 0;
        if ((((h_m_core.pcm.regs[0]) >>> (0)) & 1)) {
            h_m_core.pcm.output = ((data) & 0xff);
        }
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0;
        const h_m_core = members.m_core ?? 0;
        const h_m_square_lut = members.m_square_lut ?? 0;
        let accum = 0;
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            method_tick_square(runtime, h_m_core.squ[0]);
            method_tick_square(runtime, h_m_core.squ[1]);
            accum = h_m_square_lut[((h_m_core.squ[0].output) + (h_m_core.squ[1].output))];
            accum = ((accum) + (((h_m_core.pcm.output) / (255))));
            (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, (-accum)) ?? 0);
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
    function method_tick_square(runtime, chan) {
        const members = runtime.members;
        const h_m_sync_times1 = members.m_sync_times1 ?? 0;
        if (((chan.enabled) ? 0 : 1)) {
            chan.output = ((0) & 0xff);
            return;
        }
        let env_delay = ((h_m_sync_times1[((chan.regs[0]) & (15))]) | 0);
        chan.env_phase = ((chan.env_phase) - (4));
        while ((((chan.env_phase) < (0)) ? 1 : 0)) {
            chan.env_phase = ((chan.env_phase) + (env_delay));
            if ((((chan.regs[0]) >>> (5)) & 1)) {
                chan.env_vol = ((((((chan.env_vol) + (1))) & (15))) & 0xff);
            }
            else {
                if ((((chan.env_vol) < (15)) ? 1 : 0)) {
                    chan.env_vol = ((((chan.env_vol) + (1))) & 0xff);
                }
            }
        }
        if (((((((chan.vbl_length) > (0)) ? 1 : 0)) && (((((~chan.regs[0])) >>> (5)) & 1))) ? 1 : 0)) {
            chan.vbl_length = ((((chan.vbl_length) - (1))) | 0);
        }
        if (((chan.vbl_length) ? 0 : 1)) {
            chan.output = ((0) & 0xff);
            return;
        }
        chan.phaseacc = ((chan.phaseacc) - (4));
        while ((((chan.phaseacc) < (0)) ? 1 : 0)) {
            chan.phaseacc = ((chan.phaseacc) + (runtime.shiftRight(chan.freq, 16)));
            chan.adder = ((((((chan.adder) + (1))) & (15))) & 0xff);
        }
        if ((((chan.regs[0]) >>> (4)) & 1)) {
            chan.output = ((((chan.regs[0]) & (15))) & 0xff);
        }
        else {
            chan.output = ((((15) - (chan.env_vol))) & 0xff);
        }
        chan.output = ((((chan.output) * (((((__mame_table_1[(((((chan.regs[0]) >>> (6))) % 4) + 4) % 4] ?? 0)) >>> (runtime.subtract(7, (((chan.adder) >>> (1)) & ((1 << (3)) - 1))))) & 1)))) & 0xff);
    }
    function method_irq(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function __deref_irq(runtime, p) {
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
    function method_mmc5_sound_device__irq(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mmc5_sound_device__irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function __deref_mmc5_sound_device__irq(runtime, p) {
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
        "device_start": method_device_start,
        "calculate_rates": method_calculate_rates,
        "write": method_write,
        "read": method_read,
        "pcm_w": method_pcm_w,
        "sound_stream_update": method_sound_stream_update,
        "tick_square": method_tick_square,
        "irq": method_irq,
        "mmc5_sound_device::irq": method_mmc5_sound_device__irq
    };
    return __methodTable;
})();
definition.children[0].definition.compiledMethodLinks = ["NAME", "clock", "m_irq_handler", "machine", "machine().side_effects_disabled", "save_item", "stream_alloc"];
definition.children[0].definition.compiledStructMethods = {
    "apu_t::square_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_irq(runtime, p) {
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
        function method_mmc5_sound_device__irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_mmc5_sound_device__irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_mmc5_sound_device__irq(runtime, p) {
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
            "irq": method_irq,
            "mmc5_sound_device::irq": method_mmc5_sound_device__irq
        };
        return __methodTable;
    })(),
    "apu_t::triangle_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_irq(runtime, p) {
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
        function method_mmc5_sound_device__irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_mmc5_sound_device__irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_mmc5_sound_device__irq(runtime, p) {
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
            "irq": method_irq,
            "mmc5_sound_device::irq": method_mmc5_sound_device__irq
        };
        return __methodTable;
    })(),
    "apu_t::noise_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_irq(runtime, p) {
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
        function method_mmc5_sound_device__irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_mmc5_sound_device__irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_mmc5_sound_device__irq(runtime, p) {
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
            "irq": method_irq,
            "mmc5_sound_device::irq": method_mmc5_sound_device__irq
        };
        return __methodTable;
    })(),
    "apu_t::dpcm_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_irq(runtime, p) {
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
        function method_mmc5_sound_device__irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_mmc5_sound_device__irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_mmc5_sound_device__irq(runtime, p) {
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
            "irq": method_irq,
            "mmc5_sound_device::irq": method_mmc5_sound_device__irq
        };
        return __methodTable;
    })(),
    "mmc5_sound_t::square_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_irq(runtime, p) {
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
        function method_mmc5_sound_device__irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_mmc5_sound_device__irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_mmc5_sound_device__irq(runtime, p) {
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
            "irq": method_irq,
            "mmc5_sound_device::irq": method_mmc5_sound_device__irq
        };
        return __methodTable;
    })(),
    "mmc5_sound_t::pcm_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_irq(runtime, p) {
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
        function method_mmc5_sound_device__irq(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_mmc5_sound_device__irq(runtime, members.m_irq_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_irq_handler, "bind"));
        }
        function __deref_mmc5_sound_device__irq(runtime, p) {
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
            "irq": method_irq,
            "mmc5_sound_device::irq": method_mmc5_sound_device__irq
        };
        return __methodTable;
    })(),
};
definition.compiledStructMethods = {
    "apu_t::square_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_read_ex(runtime, offset) {
            const members = runtime.members;
            return ((255) & 0xff);
        }
        function method_write_ex(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_prg8_cd(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 2, bank);
        }
        function method_prg8_ef(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 3, bank);
        }
        function method_prg8_89(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 0, bank);
        }
        function method_prg8_ab(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 1, bank);
        }
        function method_set_mirror(runtime, page, src) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["fatalerror"];
            switch (src) {
                case 0:
                    {
                        runtime.invoke("set_nt_page", page, 0, 0, 1);
                        break;
                    }
                case 1:
                    {
                        runtime.invoke("set_nt_page", page, 0, 1, 1);
                        break;
                    }
                case 2:
                    {
                        runtime.invoke("set_nt_page", page, 2, 0, 1);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("set_nt_page", page, 3, 0, 0);
                        break;
                    }
                default:
                    {
                        (__L0 ? __L0("This should never happen\n") : runtime.macro("fatalerror", "This should never happen\n"));
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
        function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_device_nes_cart_interface__read_l(runtime, offset) {
            const members = runtime.members;
            return ((runtime.invoke("get_open_bus")) & 0xff);
        }
        function method_device_nes_cart_interface__write_l(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_device_nes_cart_interface__write_h(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "read_ex": method_read_ex,
            "write_ex": method_write_ex,
            "ppu_latch": method_ppu_latch,
            "prg8_cd": method_prg8_cd,
            "prg8_ef": method_prg8_ef,
            "prg8_89": method_prg8_89,
            "prg8_ab": method_prg8_ab,
            "set_mirror": method_set_mirror,
            "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
            "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
            "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
            "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
            "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
            "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
            "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
        };
        return __methodTable;
    })(),
    "apu_t::triangle_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_read_ex(runtime, offset) {
            const members = runtime.members;
            return ((255) & 0xff);
        }
        function method_write_ex(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_prg8_cd(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 2, bank);
        }
        function method_prg8_ef(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 3, bank);
        }
        function method_prg8_89(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 0, bank);
        }
        function method_prg8_ab(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 1, bank);
        }
        function method_set_mirror(runtime, page, src) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["fatalerror"];
            switch (src) {
                case 0:
                    {
                        runtime.invoke("set_nt_page", page, 0, 0, 1);
                        break;
                    }
                case 1:
                    {
                        runtime.invoke("set_nt_page", page, 0, 1, 1);
                        break;
                    }
                case 2:
                    {
                        runtime.invoke("set_nt_page", page, 2, 0, 1);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("set_nt_page", page, 3, 0, 0);
                        break;
                    }
                default:
                    {
                        (__L0 ? __L0("This should never happen\n") : runtime.macro("fatalerror", "This should never happen\n"));
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
        function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_device_nes_cart_interface__read_l(runtime, offset) {
            const members = runtime.members;
            return ((runtime.invoke("get_open_bus")) & 0xff);
        }
        function method_device_nes_cart_interface__write_l(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_device_nes_cart_interface__write_h(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "read_ex": method_read_ex,
            "write_ex": method_write_ex,
            "ppu_latch": method_ppu_latch,
            "prg8_cd": method_prg8_cd,
            "prg8_ef": method_prg8_ef,
            "prg8_89": method_prg8_89,
            "prg8_ab": method_prg8_ab,
            "set_mirror": method_set_mirror,
            "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
            "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
            "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
            "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
            "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
            "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
            "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
        };
        return __methodTable;
    })(),
    "apu_t::noise_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_read_ex(runtime, offset) {
            const members = runtime.members;
            return ((255) & 0xff);
        }
        function method_write_ex(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_prg8_cd(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 2, bank);
        }
        function method_prg8_ef(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 3, bank);
        }
        function method_prg8_89(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 0, bank);
        }
        function method_prg8_ab(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 1, bank);
        }
        function method_set_mirror(runtime, page, src) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["fatalerror"];
            switch (src) {
                case 0:
                    {
                        runtime.invoke("set_nt_page", page, 0, 0, 1);
                        break;
                    }
                case 1:
                    {
                        runtime.invoke("set_nt_page", page, 0, 1, 1);
                        break;
                    }
                case 2:
                    {
                        runtime.invoke("set_nt_page", page, 2, 0, 1);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("set_nt_page", page, 3, 0, 0);
                        break;
                    }
                default:
                    {
                        (__L0 ? __L0("This should never happen\n") : runtime.macro("fatalerror", "This should never happen\n"));
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
        function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_device_nes_cart_interface__read_l(runtime, offset) {
            const members = runtime.members;
            return ((runtime.invoke("get_open_bus")) & 0xff);
        }
        function method_device_nes_cart_interface__write_l(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_device_nes_cart_interface__write_h(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "read_ex": method_read_ex,
            "write_ex": method_write_ex,
            "ppu_latch": method_ppu_latch,
            "prg8_cd": method_prg8_cd,
            "prg8_ef": method_prg8_ef,
            "prg8_89": method_prg8_89,
            "prg8_ab": method_prg8_ab,
            "set_mirror": method_set_mirror,
            "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
            "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
            "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
            "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
            "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
            "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
            "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
        };
        return __methodTable;
    })(),
    "apu_t::dpcm_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_read_ex(runtime, offset) {
            const members = runtime.members;
            return ((255) & 0xff);
        }
        function method_write_ex(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_prg8_cd(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 2, bank);
        }
        function method_prg8_ef(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 3, bank);
        }
        function method_prg8_89(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 0, bank);
        }
        function method_prg8_ab(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 1, bank);
        }
        function method_set_mirror(runtime, page, src) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["fatalerror"];
            switch (src) {
                case 0:
                    {
                        runtime.invoke("set_nt_page", page, 0, 0, 1);
                        break;
                    }
                case 1:
                    {
                        runtime.invoke("set_nt_page", page, 0, 1, 1);
                        break;
                    }
                case 2:
                    {
                        runtime.invoke("set_nt_page", page, 2, 0, 1);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("set_nt_page", page, 3, 0, 0);
                        break;
                    }
                default:
                    {
                        (__L0 ? __L0("This should never happen\n") : runtime.macro("fatalerror", "This should never happen\n"));
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
        function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_device_nes_cart_interface__read_l(runtime, offset) {
            const members = runtime.members;
            return ((runtime.invoke("get_open_bus")) & 0xff);
        }
        function method_device_nes_cart_interface__write_l(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_device_nes_cart_interface__write_h(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "read_ex": method_read_ex,
            "write_ex": method_write_ex,
            "ppu_latch": method_ppu_latch,
            "prg8_cd": method_prg8_cd,
            "prg8_ef": method_prg8_ef,
            "prg8_89": method_prg8_89,
            "prg8_ab": method_prg8_ab,
            "set_mirror": method_set_mirror,
            "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
            "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
            "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
            "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
            "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
            "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
            "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
        };
        return __methodTable;
    })(),
    "mmc5_sound_t::square_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_read_ex(runtime, offset) {
            const members = runtime.members;
            return ((255) & 0xff);
        }
        function method_write_ex(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_prg8_cd(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 2, bank);
        }
        function method_prg8_ef(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 3, bank);
        }
        function method_prg8_89(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 0, bank);
        }
        function method_prg8_ab(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 1, bank);
        }
        function method_set_mirror(runtime, page, src) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["fatalerror"];
            switch (src) {
                case 0:
                    {
                        runtime.invoke("set_nt_page", page, 0, 0, 1);
                        break;
                    }
                case 1:
                    {
                        runtime.invoke("set_nt_page", page, 0, 1, 1);
                        break;
                    }
                case 2:
                    {
                        runtime.invoke("set_nt_page", page, 2, 0, 1);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("set_nt_page", page, 3, 0, 0);
                        break;
                    }
                default:
                    {
                        (__L0 ? __L0("This should never happen\n") : runtime.macro("fatalerror", "This should never happen\n"));
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
        function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_device_nes_cart_interface__read_l(runtime, offset) {
            const members = runtime.members;
            return ((runtime.invoke("get_open_bus")) & 0xff);
        }
        function method_device_nes_cart_interface__write_l(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_device_nes_cart_interface__write_h(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "read_ex": method_read_ex,
            "write_ex": method_write_ex,
            "ppu_latch": method_ppu_latch,
            "prg8_cd": method_prg8_cd,
            "prg8_ef": method_prg8_ef,
            "prg8_89": method_prg8_89,
            "prg8_ab": method_prg8_ab,
            "set_mirror": method_set_mirror,
            "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
            "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
            "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
            "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
            "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
            "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
            "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
        };
        return __methodTable;
    })(),
    "mmc5_sound_t::pcm_t": (() => {
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
            const h_regs = members.regs ?? 0;
            for (let __range0 = h_regs, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                runtime.writeIndex(__range0, __range0_index, 0);
            }
        }
        function method_read_ex(runtime, offset) {
            const members = runtime.members;
            return ((255) & 0xff);
        }
        function method_write_ex(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_prg8_cd(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 2, bank);
        }
        function method_prg8_ef(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 3, bank);
        }
        function method_prg8_89(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 0, bank);
        }
        function method_prg8_ab(runtime, bank) {
            const members = runtime.members;
            runtime.invoke("prg8_x", 1, bank);
        }
        function method_set_mirror(runtime, page, src) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["fatalerror"];
            switch (src) {
                case 0:
                    {
                        runtime.invoke("set_nt_page", page, 0, 0, 1);
                        break;
                    }
                case 1:
                    {
                        runtime.invoke("set_nt_page", page, 0, 1, 1);
                        break;
                    }
                case 2:
                    {
                        runtime.invoke("set_nt_page", page, 2, 0, 1);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("set_nt_page", page, 3, 0, 0);
                        break;
                    }
                default:
                    {
                        (__L0 ? __L0("This should never happen\n") : runtime.macro("fatalerror", "This should never happen\n"));
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
        function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
            const members = runtime.members;
        }
        function method_device_nes_cart_interface__read_l(runtime, offset) {
            const members = runtime.members;
            return ((runtime.invoke("get_open_bus")) & 0xff);
        }
        function method_device_nes_cart_interface__write_l(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_device_nes_cart_interface__write_h(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "read_ex": method_read_ex,
            "write_ex": method_write_ex,
            "ppu_latch": method_ppu_latch,
            "prg8_cd": method_prg8_cd,
            "prg8_ef": method_prg8_ef,
            "prg8_89": method_prg8_89,
            "prg8_ab": method_prg8_ab,
            "set_mirror": method_set_mirror,
            "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
            "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
            "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
            "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
            "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
            "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
            "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
