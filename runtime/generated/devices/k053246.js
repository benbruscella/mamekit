import deviceData from './k053246.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [0, 1, 4, 5, 16, 17, 20, 21];
    const __mame_table_1 = [0, 2, 8, 10, 32, 34, 40, 42];
    const cppScratch_k053247_sprites_draw_common_drawmode_table = new Uint8Array(Math.max(0, Number(256)));
    const cppScratch_k053247_sprites_draw_common_shadowmode_table = new Uint8Array(Math.max(0, Number(256)));
    function method_k053247_get_ram(runtime, ram) {
        const members = runtime.members;
        runtime.pointerStore(ram, (members.m_ram ?? 0));
    }
    function method_k053247_get_dx(runtime) {
        const members = runtime.members;
        return (((members.m_dx ?? 0)) | 0);
    }
    function method_k053247_get_dy(runtime) {
        const members = runtime.members;
        return (((members.m_dy ?? 0)) | 0);
    }
    function method_k053246_read_register(runtime, offset) {
        const members = runtime.members;
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        return ((h_m_kx46_regs[offset]) & 0xff);
    }
    function method_k053247_read_register(runtime, offset) {
        const members = runtime.members;
        const h_m_kx47_regs = members.m_kx47_regs ?? 0;
        return ((h_m_kx47_regs[offset]) & 0xffff);
    }
    function method_k055673_reg_word_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
        const h_m_kx47_regs = members.m_kx47_regs ?? 0;
        runtime.combineData(__addr_k055673_reg_word_w(runtime, h_m_kx47_regs, offset), data, mem_mask);
    }
    function __addr_k055673_reg_word_w(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_k053247_word_r(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xffff);
    }
    function method_k053247_word_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        data = ((data) & 0xffff);
        mem_mask = ((mem_mask) & 0xffff);
        runtime.combineData((((members.m_ram ?? 0)) + (offset)), data, mem_mask);
    }
    function method_k053247_r(runtime, offset) {
        const members = runtime.members;
        let __t0, __t1;
        let offs = ((((offset) >>> (1))) | 0);
        if (((offset) & (1))) {
            return (((((__t0 = (members.m_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offs] ?? 0) : runtime.readIndex(__t0, offs))) & (255))) & 0xff);
        }
        else {
            return ((runtime.shiftRight((__t1 = (members.m_ram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[offs] ?? 0) : runtime.readIndex(__t1, offs)), 8)) & 0xff);
        }
    }
    function method_k053247_w(runtime, offset, data) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3;
        data = ((data) & 0xff);
        let offs = ((((offset) >>> (1))) | 0);
        if (((offset) & (1))) {
            ((__t1 = members.m_ram) && ArrayBuffer.isView(__t1) ? (__t1[offs] = (((((__t0 = (members.m_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offs] ?? 0) : runtime.readIndex(__t0, offs))) & (65280))) | (data))) : runtime.writeIndex(runtime.writableMember("m_ram"), offs, (((((__t0 = (members.m_ram ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offs] ?? 0) : runtime.readIndex(__t0, offs))) & (65280))) | (data))));
        }
        else {
            ((__t3 = members.m_ram) && ArrayBuffer.isView(__t3) ? (__t3[offs] = (((((__t2 = (members.m_ram ?? 0), ArrayBuffer.isView(__t2) ? (__t2[offs] ?? 0) : runtime.readIndex(__t2, offs))) & (255))) | (((data) << (8))))) : runtime.writeIndex(runtime.writableMember("m_ram"), offs, (((((__t2 = (members.m_ram ?? 0), ArrayBuffer.isView(__t2) ? (__t2[offs] ?? 0) : runtime.readIndex(__t2, offs))) & (255))) | (((data) << (8))))));
        }
    }
    function method_k055673_5bpp_rom_word_r(runtime, offset) {
        const members = runtime.members;
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        let ROM8 = runtime.byteView(__addr_k055673_5bpp_rom_word_r(runtime, (members.m_gfxrom ?? 0), 0));
        let ROM = runtime.packedView(__addr_k055673_5bpp_rom_word_r(runtime, (members.m_gfxrom ?? 0), 0), false);
        let ROM$s = undefined, ROM$o = 0;
        if (ArrayBuffer.isView(ROM) || Array.isArray(ROM))
            ROM$s = ROM;
        else if (ROM !== null && typeof ROM === 'object' && ROM.generatedPointer === true && ROM.path === undefined && ROM.target === undefined && (ArrayBuffer.isView(ROM.source) || Array.isArray(ROM.source))) {
            ROM$s = ROM.source;
            ROM$o = ROM.offset;
        }
        let size4 = ((runtime.divide(runtime.divide((members.m_gfxrom).length, 1048576), 5)) | 0);
        let romofs = ((0) | 0);
        size4 = ((((size4) * (4194304))) | 0);
        ROM8 = __add_k055673_5bpp_rom_word_r(runtime, ROM8, size4);
        romofs = ((((((((h_m_kx46_regs[6]) << (16))) | (((h_m_kx46_regs[7]) << (8))))) | (h_m_kx46_regs[4]))) | 0);
        switch (offset) {
            case 0:
                {
                    return (((ROM$s !== undefined ? (ROM$s[ROM$o + (((romofs) + (2)))] ?? 0) : runtime.readIndex(ROM, ((romofs) + (2))))) & 0xffff);
                }
            case 1:
                {
                    return (((ROM$s !== undefined ? (ROM$s[ROM$o + (((romofs) + (3)))] ?? 0) : runtime.readIndex(ROM, ((romofs) + (3))))) & 0xffff);
                }
            case 2:
            case 3:
                {
                    romofs = ((((romofs) / (2))) | 0);
                    return ((runtime.readIndex(ROM8, ((romofs) + (1)))) & 0xffff);
                }
            case 4:
                {
                    return (((ROM$s !== undefined ? (ROM$s[ROM$o + (romofs)] ?? 0) : runtime.readIndex(ROM, romofs))) & 0xffff);
                }
            case 5:
                {
                    return (((ROM$s !== undefined ? (ROM$s[ROM$o + (((romofs) + (1)))] ?? 0) : runtime.readIndex(ROM, ((romofs) + (1))))) & 0xffff);
                }
            case 6:
            case 7:
                {
                    romofs = ((((romofs) / (2))) | 0);
                    return ((runtime.readIndex(ROM8, romofs)) & 0xffff);
                }
            default:
                {
                    0;
                    break;
                }
        }
        return ((0) & 0xffff);
    }
    function __add_k055673_5bpp_rom_word_r(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_k055673_5bpp_rom_word_r(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_k055673_rom_word_r(runtime, offset) {
        const members = runtime.members;
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        if (((((members.m_bpp ?? 0)) === (5)) ? 1 : 0)) {
            return ((method_k055673_5bpp_rom_word_r(runtime, offset)) & 0xffff);
        }
        let ROM = runtime.packedView(__addr_k055673_rom_word_r(runtime, (members.m_gfxrom ?? 0), 0), false);
        let ROM$s = undefined, ROM$o = 0;
        if (ArrayBuffer.isView(ROM) || Array.isArray(ROM))
            ROM$s = ROM;
        else if (ROM !== null && typeof ROM === 'object' && ROM.generatedPointer === true && ROM.path === undefined && ROM.target === undefined && (ArrayBuffer.isView(ROM.source) || Array.isArray(ROM.source))) {
            ROM$s = ROM.source;
            ROM$o = ROM.offset;
        }
        let romofs = ((0) | 0);
        romofs = ((((((((h_m_kx46_regs[6]) << (16))) | (((h_m_kx46_regs[7]) << (8))))) | (h_m_kx46_regs[4]))) | 0);
        romofs = ((((runtime.shiftRight(romofs, 2)) * ((members.m_bpp ?? 0)))) | 0);
        if (((Number(((offset) & (4))) === Number(0)) ? 1 : 0)) {
            romofs = ((((romofs) + (runtime.shiftRight((members.m_bpp ?? 0), 1)))) | 0);
        }
        return (((ROM$s !== undefined ? (ROM$s[ROM$o + (((romofs) + (((offset) & (3)))))] ?? 0) : runtime.readIndex(ROM, ((romofs) + (((offset) & (3))))))) & 0xffff);
    }
    function __addr_k055673_rom_word_r(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_k055673_ps_rom_word_r(runtime, offset) {
        const members = runtime.members;
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        let ROM = runtime.byteView(__addr_k055673_ps_rom_word_r(runtime, (members.m_gfxrom ?? 0), 0));
        let ROM$s = undefined, ROM$o = 0;
        if (ArrayBuffer.isView(ROM) || Array.isArray(ROM))
            ROM$s = ROM;
        else if (ROM !== null && typeof ROM === 'object' && ROM.generatedPointer === true && ROM.path === undefined && ROM.target === undefined && (ArrayBuffer.isView(ROM.source) || Array.isArray(ROM.source))) {
            ROM$s = ROM.source;
            ROM$o = ROM.offset;
        }
        let romofs = ((0) | 0);
        let magic = ((((offset) & (1))) | 0);
        romofs = ((((((((h_m_kx46_regs[6]) << (16))) | (((h_m_kx46_regs[7]) << (8))))) | (h_m_kx46_regs[4]))) | 0);
        offset = runtime.shiftRight(((offset) & (4)), 1);
        let finoffs = ((((__add_k055673_ps_rom_word_r(runtime, ((romofs) * (2)), ((offset) * (2)))) + (magic))) | 0);
        return (((((ROM$s !== undefined ? (ROM$s[ROM$o + (((finoffs) + (2)))] ?? 0) : runtime.readIndex(ROM, ((finoffs) + (2))))) | ((((ROM$s !== undefined ? (ROM$s[ROM$o + (finoffs)] ?? 0) : runtime.readIndex(ROM, finoffs))) << (8))))) & 0xffff);
    }
    function __add_k055673_ps_rom_word_r(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_k055673_ps_rom_word_r(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_k055673_gr_rom_word_r(runtime, offset) {
        const members = runtime.members;
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        let ROM = runtime.byteView(__addr_k055673_gr_rom_word_r(runtime, (members.m_gfxrom ?? 0), 0));
        let ROM$s = undefined, ROM$o = 0;
        if (ArrayBuffer.isView(ROM) || Array.isArray(ROM))
            ROM$s = ROM;
        else if (ROM !== null && typeof ROM === 'object' && ROM.generatedPointer === true && ROM.path === undefined && ROM.target === undefined && (ArrayBuffer.isView(ROM.source) || Array.isArray(ROM.source))) {
            ROM$s = ROM.source;
            ROM$o = ROM.offset;
        }
        let romofs = ((((((((h_m_kx46_regs[6]) << (16))) | (((h_m_kx46_regs[7]) << (8))))) | (h_m_kx46_regs[4]))) | 0);
        offset = runtime.shiftRight(((offset) & (4)), 1);
        let finoffs = ((__add_k055673_gr_rom_word_r(runtime, ((romofs) * (2)), ((offset) * (2)))) | 0);
        return (((((ROM$s !== undefined ? (ROM$s[ROM$o + (((finoffs) + (1)))] ?? 0) : runtime.readIndex(ROM, ((finoffs) + (1))))) | ((((ROM$s !== undefined ? (ROM$s[ROM$o + (finoffs)] ?? 0) : runtime.readIndex(ROM, finoffs))) << (8))))) & 0xffff);
    }
    function __add_k055673_gr_rom_word_r(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_k055673_gr_rom_word_r(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_k053246_r(runtime, offset) {
        const members = runtime.members;
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        if (((Number((members.m_objcha_line ?? 0)) === Number(1)) ? 1 : 0)) {
            let addr = ((((((((((h_m_kx46_regs[6]) << (17))) | (((h_m_kx46_regs[7]) << (9))))) | (((h_m_kx46_regs[4]) << (1))))) | (((((offset) & (1))) ^ (1))))) | 0);
            addr = ((((addr) & (runtime.subtract((members.m_gfxrom).length, 1)))) | 0);
            return ((runtime.readIndex((members.m_gfxrom ?? 0), addr)) & 0xff);
        }
        else {
            return ((0) & 0xff);
        }
    }
    function method_k053246_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        h_m_kx46_regs[offset] = data;
    }
    function method_k053246_set_objcha_line(runtime, state) {
        const members = runtime.members;
        members.m_objcha_line = ((state) & 0xff);
    }
    function method_k053246_is_irq_enabled(runtime) {
        const members = runtime.members;
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        return ((((h_m_kx46_regs[5]) & (16))) | 0);
    }
    function method_k053247_sprites_draw_common(runtime, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["palette"], __L1 = __l["palette().shadows_enabled"], __L2 = __l["palette().highlights_enabled"], __L3 = __l["m_k053247_cb"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11;
        const h_m_kx47_regs = members.m_kx47_regs ?? 0;
        if ((((members.__static_k053247_sprites_draw_common_NUM_SPRITES__initialised ?? 0)) ? 0 : 1)) {
            members.__static_k053247_sprites_draw_common_NUM_SPRITES = 256;
            members.__static_k053247_sprites_draw_common_NUM_SPRITES__initialised = 1;
        }
        let code = ((0) | 0);
        let color = ((0) | 0);
        let x = ((0) | 0);
        let y = ((0) | 0);
        let shadow = ((0) | 0);
        let shdmask = ((0) | 0);
        let count = ((0) | 0);
        let temp = ((0) | 0);
        let primask = ((0) | 0);
        let sortedlist = new Int32Array(new Uint8Array(Math.max(0, Number((members.__static_k053247_sprites_draw_common_NUM_SPRITES ?? 0)))));
        let offs = ((0) | 0);
        let zcode = ((0) | 0);
        let drawmode_table = cppScratch_k053247_sprites_draw_common_drawmode_table.fill(0);
        let shadowmode_table = cppScratch_k053247_sprites_draw_common_shadowmode_table.fill(0);
        cppMemset(runtime, drawmode_table, 1, ((drawmode_table)?.byteLength ?? 1));
        drawmode_table[0] = 0;
        cppMemset(runtime, shadowmode_table, 2, ((shadowmode_table)?.byteLength ?? 1));
        shadowmode_table[0] = 0;
        if (((__L1 ?? globalThis.mamekitMissingCall?.("palette().shadows_enabled"))?.() ?? 0)) {
            if ((((((Number(runtime.shiftRight((__t0 = __deref_k053247_sprites_draw_common(runtime, bitmap), typeof __t0.bpp === 'function' ? __t0.bpp() : typeof __t0.bpp === 'number' || typeof __t0.bpp === 'boolean' ? __t0.bpp : runtime.container(bitmap, "bpp")), 3)) === Number(4)) ? 1 : 0)) && (((__L2 ?? globalThis.mamekitMissingCall?.("palette().highlights_enabled"))?.() ?? 0))) ? 1 : 0)) {
                shdmask = ((3) | 0);
            }
            else {
                shdmask = ((0) | 0);
            }
        }
        else {
            shdmask = ((-1) | 0);
        }
        zcode = (((members.m_z_rejection ?? 0)) | 0);
        offs = (((count = ((0) | 0))) | 0);
        if (((Number(zcode) === Number(-1)) ? 1 : 0)) {
            for (; (((offs) < (2048)) ? 1 : 0); offs = ((((offs) + (8))) | 0)) {
                if ((((__t1 = (members.m_ram ?? 0), ArrayBuffer.isView(__t1) ? (__t1[offs] ?? 0) : runtime.readIndex(__t1, offs))) & (32768))) {
                    sortedlist[(__t2 = count, count = ((((count) + (1))) | 0), __t2)] = offs;
                }
            }
        }
        else {
            for (; (((offs) < (2048)) ? 1 : 0); offs = ((((offs) + (8))) | 0)) {
                if (((((((__t3 = (members.m_ram ?? 0), ArrayBuffer.isView(__t3) ? (__t3[offs] ?? 0) : runtime.readIndex(__t3, offs))) & (32768))) && (((Number((((__t4 = (members.m_ram ?? 0), ArrayBuffer.isView(__t4) ? (__t4[offs] ?? 0) : runtime.readIndex(__t4, offs))) & (255))) !== Number(zcode)) ? 1 : 0))) ? 1 : 0)) {
                    sortedlist[(__t5 = count, count = ((((count) + (1))) | 0), __t5)] = offs;
                }
            }
        }
        let w = ((count) | 0);
        count = ((((count) - (1))) | 0);
        let h = ((count) | 0);
        if (((((h_m_kx47_regs[runtime.divide(12, 2)]) & (16))) ? 0 : 1)) {
            for (y = ((0) | 0); (((y) < (h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                offs = (((sortedlist[y] ?? 0)) | 0);
                zcode = (((((__t6 = (members.m_ram ?? 0), ArrayBuffer.isView(__t6) ? (__t6[offs] ?? 0) : runtime.readIndex(__t6, offs))) & (255))) | 0);
                for (x = ((((y) + (1))) | 0); (((x) < (w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                    temp = (((sortedlist[x] ?? 0)) | 0);
                    code = (((((__t7 = (members.m_ram ?? 0), ArrayBuffer.isView(__t7) ? (__t7[temp] ?? 0) : runtime.readIndex(__t7, temp))) & (255))) | 0);
                    if ((((zcode) <= (code)) ? 1 : 0)) {
                        zcode = ((code) | 0);
                        sortedlist[x] = offs;
                        sortedlist[y] = (offs = ((temp) | 0));
                    }
                }
            }
        }
        else {
            for (y = ((0) | 0); (((y) < (h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                offs = (((sortedlist[y] ?? 0)) | 0);
                zcode = (((((__t8 = (members.m_ram ?? 0), ArrayBuffer.isView(__t8) ? (__t8[offs] ?? 0) : runtime.readIndex(__t8, offs))) & (255))) | 0);
                for (x = ((((y) + (1))) | 0); (((x) < (w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                    temp = (((sortedlist[x] ?? 0)) | 0);
                    code = (((((__t9 = (members.m_ram ?? 0), ArrayBuffer.isView(__t9) ? (__t9[temp] ?? 0) : runtime.readIndex(__t9, temp))) & (255))) | 0);
                    if ((((zcode) >= (code)) ? 1 : 0)) {
                        zcode = ((code) | 0);
                        sortedlist[x] = offs;
                        sortedlist[y] = (offs = ((temp) | 0));
                    }
                }
            }
        }
        for (; (((count) >= (0)) ? 1 : 0); count = ((((count) - (1))) | 0)) {
            offs = (((sortedlist[count] ?? 0)) | 0);
            code = (((__t10 = (members.m_ram ?? 0), ArrayBuffer.isView(__t10) ? (__t10[((offs) + (1))] ?? 0) : runtime.readIndex(__t10, ((offs) + (1))))) | 0);
            shadow = (((color = (((__t11 = (members.m_ram ?? 0), ArrayBuffer.isView(__t11) ? (__t11[((offs) + (6))] ?? 0) : runtime.readIndex(__t11, ((offs) + (6))))) | 0))) | 0);
            primask = ((0) | 0);
            (__L3 ? __L3(({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => primask, set: (value) => { primask = ((value) | 0); } })) : runtime.macro("m_k053247_cb", ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => primask, set: (value) => { primask = ((value) | 0); } })));
            method_k053247_draw_single_sprite_gxcore(runtime, bitmap, cliprect, 0, 0, code, (members.m_ram ?? 0), offs, color, 0, 0, 0, 0, primask, shadow, drawmode_table, shadowmode_table, shdmask);
        }
    }
    function __deref_k053247_sprites_draw_common(runtime, p) {
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
    function method_k053247_draw_single_sprite_gxcore(runtime, bitmap, cliprect, gx_objzbuf, gx_shdzbuf, code, gx_spriteram, offs, color, alpha, drawmode, zcode, pri, primask, shadow, drawmode_table, shadowmode_table, shdmask) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().width"], __L2 = __l["palette"], __L3 = __l["palette().set_shadow_mode"];
        let __t0;
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        let xa = ((0) | 0);
        let ya = ((0) | 0);
        let ox = ((0) | 0);
        let oy = ((0) | 0);
        let flipx = ((0) | 0);
        let flipy = ((0) | 0);
        let mirrorx = ((0) | 0);
        let mirrory = ((0) | 0);
        let zoomx = ((0) | 0);
        let zoomy = ((0) | 0);
        let scalex = ((0) | 0);
        let scaley = ((0) | 0);
        let nozoom = ((0) | 0);
        let temp = ((0) | 0);
        let temp4 = ((0) | 0);
        let flipscreenx = ((((h_m_kx46_regs[5]) & (1))) | 0);
        let flipscreeny = ((((h_m_kx46_regs[5]) & (2))) | 0);
        xa = (((ya = ((0) | 0))) | 0);
        if (((code) & (1))) {
            xa = ((((xa) + (1))) | 0);
        }
        if (((code) & (2))) {
            ya = ((((ya) + (1))) | 0);
        }
        if (((code) & (4))) {
            xa = ((((xa) + (2))) | 0);
        }
        if (((code) & (8))) {
            ya = ((((ya) + (2))) | 0);
        }
        if (((code) & (16))) {
            xa = ((((xa) + (4))) | 0);
        }
        if (((code) & (32))) {
            ya = ((((ya) + (4))) | 0);
        }
        code = ((((code) & (-64))) | 0);
        temp4 = ((runtime.readIndex(gx_spriteram, offs)) | 0);
        oy = ((((runtime.readIndex(gx_spriteram, ((offs) + (2)))) & (1023))) | 0);
        ox = ((((runtime.readIndex(gx_spriteram, ((offs) + (3)))) & (1023))) | 0);
        scaley = (((zoomy = ((((runtime.readIndex(gx_spriteram, ((offs) + (4)))) & (1023))) | 0))) | 0);
        if (zoomy) {
            zoomy = ((runtime.divide(__add_k053247_draw_single_sprite_gxcore(runtime, 4194304, runtime.shiftRight(zoomy, 1)), zoomy)) | 0);
        }
        else {
            zoomy = ((8388608) | 0);
        }
        if (((((temp4) & (16384))) ? 0 : 1)) {
            scalex = (((zoomx = ((((runtime.readIndex(gx_spriteram, ((offs) + (5)))) & (1023))) | 0))) | 0);
            if (zoomx) {
                zoomx = ((runtime.divide(__add_k053247_draw_single_sprite_gxcore(runtime, 4194304, runtime.shiftRight(zoomx, 1)), zoomx)) | 0);
            }
            else {
                zoomx = ((8388608) | 0);
            }
        }
        else {
            zoomx = ((zoomy) | 0);
            scalex = ((scaley) | 0);
        }
        nozoom = ((((((((scalex) === (64)) ? 1 : 0)) && ((((scaley) === (64)) ? 1 : 0))) ? 1 : 0)) | 0);
        flipx = ((((temp4) & (4096))) | 0);
        flipy = ((((temp4) & (8192))) | 0);
        temp = ((runtime.readIndex(gx_spriteram, ((offs) + (6)))) | 0);
        mirrorx = ((((temp) & (16384))) | 0);
        if (mirrorx) {
            flipx = ((0) | 0);
        }
        mirrory = ((((temp) & (32768))) | 0);
        let objset1 = ((method_k053246_read_register(runtime, 5)) | 0);
        if (((objset1) & (8))) {
            let screenwidth = ((((__L1 ?? globalThis.mamekitMissingCall?.("screen().width"))?.() ?? 0)) | 0);
            zoomx = ((runtime.shiftRight(zoomx, 1)) | 0);
            ox = ((__add_k053247_draw_single_sprite_gxcore(runtime, runtime.shiftRight(ox, 1), 1)) | 0);
            if (flipscreenx) {
                ox = ((((ox) + (screenwidth))) | 0);
            }
            nozoom = ((0) | 0);
        }
        if (flipscreenx) {
            ox = (((-ox)) | 0);
            if (((mirrorx) ? 0 : 1)) {
                flipx = ((((flipx) ? 0 : 1)) | 0);
            }
        }
        if (flipscreeny) {
            oy = (((-oy)) | 0);
            if (((mirrory) ? 0 : 1)) {
                flipy = ((((flipy) ? 0 : 1)) | 0);
            }
        }
        let k053247_opset = ((method_k053247_read_register(runtime, runtime.divide(12, 2))) | 0);
        let wrapsize = ((0) | 0);
        let xwraplim = ((0) | 0);
        let ywraplim = ((0) | 0);
        if (((k053247_opset) & (64))) {
            wrapsize = ((512) | 0);
            xwraplim = ((448) | 0);
            ywraplim = ((384) | 0);
        }
        else {
            wrapsize = ((1024) | 0);
            xwraplim = ((640) | 0);
            ywraplim = ((512) | 0);
        }
        let offx = ((((((((h_m_kx46_regs[0]) << (8))) | (h_m_kx46_regs[1]))) << 16 >> 16)) | 0);
        let offy = ((((((((h_m_kx46_regs[2]) << (8))) | (h_m_kx46_regs[3]))) << 16 >> 16)) | 0);
        temp = ((((wrapsize) - (1))) | 0);
        if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
            ox = ((((ox) + ((members.m_dx ?? 0)))) | 0);
            oy = ((((oy) - ((members.m_dy ?? 0)))) | 0);
        }
        ox = ((((((ox) - (offx))) & (temp))) | 0);
        oy = (((((((-oy)) - (offy))) & (temp))) | 0);
        if ((((ox) >= (xwraplim)) ? 1 : 0)) {
            ox = ((((ox) - (wrapsize))) | 0);
        }
        if ((((oy) >= (ywraplim)) ? 1 : 0)) {
            oy = ((((oy) - (wrapsize))) | 0);
        }
        temp = ((((runtime.shiftRight(temp4, 8)) & (15))) | 0);
        let width = ((((1) << (((temp) & (3))))) | 0);
        let height = ((((1) << (((runtime.shiftRight(temp, 2)) & (3))))) | 0);
        if ((((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) ? 0 : 1)) {
            ox = ((((ox) + ((members.m_dx ?? 0)))) | 0);
            oy = ((((oy) - ((members.m_dy ?? 0)))) | 0);
        }
        ox = ((((ox) - (runtime.shiftRight(((zoomx) * (width)), 13)))) | 0);
        oy = ((((oy) - (runtime.shiftRight(((zoomy) * (height)), 13)))) | 0);
        if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
            method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, pri, zcode, alpha, drawmode, gx_objzbuf, gx_shdzbuf, 0, 0);
        }
        else {
            let whichtable = drawmode_table;
            if (((Number(color) === Number(-1)) ? 1 : 0)) {
                if ((((shdmask) < (0)) ? 1 : 0)) {
                    return;
                }
                color = ((0) | 0);
                shadow = ((-1) | 0);
                whichtable = shadowmode_table;
                ((__L3 ?? globalThis.mamekitMissingCall?.("palette().set_shadow_mode"))?.(0) ?? 0);
            }
            else {
                if ((((shdmask) >= (0)) ? 1 : 0)) {
                    shadow = ((((((color) & (536870912))) ? (runtime.shiftRight(color, 20)) : (runtime.shiftRight(shadow, 10)))) | 0);
                    if ((shadow = ((((shadow) & (3))) | 0))) {
                        ((__L3 ?? globalThis.mamekitMissingCall?.("palette().set_shadow_mode"))?.(((((shadow) - (1))) & (shdmask))) ?? 0);
                    }
                }
                else {
                    shadow = ((0) | 0);
                }
            }
            color = ((((color) & (65535))) | 0);
            runtime.writeIndex(drawmode_table, runtime.subtract((__t0 = __deref_k053247_draw_single_sprite_gxcore(runtime, members.m_gfx), typeof __t0.granularity === 'function' ? __t0.granularity() : typeof __t0.granularity === 'number' || typeof __t0.granularity === 'boolean' ? __t0.granularity : runtime.container(members.m_gfx, "granularity")), 1), ((shadow) ? (2) : (1)));
            method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, 0, 0, 0, 0, 0, 0, primask, whichtable);
        }
    }
    function __add_k053247_draw_single_sprite_gxcore(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_k053247_draw_single_sprite_gxcore(runtime, p) {
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
    function method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, pri, zcode, alpha, drawmode, gx_objzbuf, gx_shdzbuf, primask, whichtable) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().priority"];
        let zw = ((0) | 0);
        let zh = ((0) | 0);
        let fx = ((0) | 0);
        let fy = ((0) | 0);
        let sx = ((0) | 0);
        let sy = ((0) | 0);
        let tempcode = ((0) | 0);
        for (let y = ((0) | 0); (((y) < (height)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            sy = ((((oy) + (runtime.shiftRight(__add_k053247_draw_yxloop_gx(runtime, ((zoomy) * (y)), 2048), 12)))) | 0);
            zh = ((((((oy) + (runtime.shiftRight(__add_k053247_draw_yxloop_gx(runtime, ((zoomy) * (((y) + (1)))), 2048), 12)))) - (sy))) | 0);
            for (let x = ((0) | 0); (((x) < (width)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                sx = ((((ox) + (runtime.shiftRight(__add_k053247_draw_yxloop_gx(runtime, ((zoomx) * (x)), 2048), 12)))) | 0);
                zw = ((((((ox) + (runtime.shiftRight(__add_k053247_draw_yxloop_gx(runtime, ((zoomx) * (((x) + (1)))), 2048), 12)))) - (sx))) | 0);
                tempcode = ((code) | 0);
                if (mirrorx) {
                    if (((((flipx) ? 0 : 1)) ^ (((Number(((x) << (1))) < Number(width)) ? 1 : 0)))) {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fx = ((1) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fx = ((0) | 0);
                    }
                }
                else {
                    if (flipx) {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    fx = ((flipx) | 0);
                }
                if (mirrory) {
                    if (((((flipy) ? 0 : 1)) ^ (((Number(((y) << (1))) >= Number(height)) ? 1 : 0)))) {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fy = ((1) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fy = ((0) | 0);
                    }
                }
                else {
                    if (flipy) {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    fy = ((flipy) | 0);
                }
                if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
                    if (nozoom) {
                        zw = (((zh = ((16) | 0))) | 0);
                    }
                    method_zdrawgfxzoom32GP(runtime, bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf);
                }
                else {
                    if (nozoom) {
                        (__deref_k053247_draw_yxloop_gx(runtime, members.m_gfx).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((__L1 ?? globalThis.mamekitMissingCall?.("screen().priority"))?.() ?? 0), primask, whichtable) ?? 0);
                    }
                    else {
                        (__deref_k053247_draw_yxloop_gx(runtime, members.m_gfx).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), ((__L1 ?? globalThis.mamekitMissingCall?.("screen().priority"))?.() ?? 0), primask, whichtable) ?? 0);
                    }
                    if ((((mirrory) && ((((height) === (1)) ? 1 : 0))) ? 1 : 0)) {
                        if (nozoom) {
                            (__deref_k053247_draw_yxloop_gx(runtime, members.m_gfx).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, ((__L1 ?? globalThis.mamekitMissingCall?.("screen().priority"))?.() ?? 0), primask, whichtable) ?? 0);
                        }
                        else {
                            (__deref_k053247_draw_yxloop_gx(runtime, members.m_gfx).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, ((zw) << (12)), ((zh) << (12)), ((__L1 ?? globalThis.mamekitMissingCall?.("screen().priority"))?.() ?? 0), primask, whichtable) ?? 0);
                        }
                    }
                }
            }
        }
    }
    function __add_k053247_draw_yxloop_gx(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_k053247_draw_yxloop_gx(runtime, p) {
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
    function method_zdrawgfxzoom32GP(runtime, bitmap, cliprect, code, color, flipx, flipy, sx, sy, scalex, scaley, alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf) {
        const members = runtime.members;
        let __t0;
        pri = ((pri) & 0xff);
        if (((Number((__t0 = __deref_zdrawgfxzoom32GP(runtime, bitmap), typeof __t0.bpp === 'function' ? __t0.bpp() : typeof __t0.bpp === 'number' || typeof __t0.bpp === 'boolean' ? __t0.bpp : runtime.container(bitmap, "bpp"))) === Number(32)) ? 1 : 0)) {
            return runtime.invoke("zdrawgfxzoom32GP__bitmap_rgb32__rectangle__u32__u32__bool__bool__int__int__int__int__int__int__int__u8__u8__u8", bitmap, cliprect, code, color, flipx, flipy, sx, sy, scalex, scaley, alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf);
        }
        else {
            return method_zdrawgfxzoom32GP__bitmap_ind16__rectangle__u32__u32__int__int__int__int__int__int__int__int__int__int__u8__u8(runtime, bitmap, cliprect, code, color, flipx, flipy, sx, sy, scalex, scaley, alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf);
        }
    }
    function __deref_zdrawgfxzoom32GP(runtime, p) {
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
    function method_zdrawgfxzoom32GP__bitmap_ind16__rectangle__u32__u32__int__int__int__int__int__int__int__int__int__int__u8__u8(runtime, bitmap, cliprect, code, color, flipx, flipy, sx, sy, scalex, scaley, alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        (__L0 ? __L0("no zdrawgfxzoom32GP for bitmap_ind16\n") : runtime.macro("fatalerror", "no zdrawgfxzoom32GP for bitmap_ind16\n"));
    }
    function method_k053247_sprites_draw__bitmap_ind16__rectangle(runtime, bitmap, cliprect) {
        const members = runtime.members;
        method_k053247_sprites_draw_common(runtime, bitmap, cliprect);
    }
    function method_k053247_sprites_draw__bitmap_rgb32__rectangle(runtime, bitmap, cliprect) {
        const members = runtime.members;
        method_k053247_sprites_draw_common(runtime, bitmap, cliprect);
    }
    function method_k053247_set_z_rejection(runtime, zcode) {
        const members = runtime.members;
        members.m_z_rejection = ((zcode) | 0);
    }
    function method_k053247_device__k053247_draw_single_sprite_gxcore(runtime, bitmap, cliprect, gx_objzbuf, gx_shdzbuf, code, gx_spriteram, offs, color, alpha, drawmode, zcode, pri, primask, shadow, drawmode_table, shadowmode_table, shdmask) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().width"], __L2 = __l["palette"], __L3 = __l["palette().set_shadow_mode"];
        let __t0;
        const h_m_kx46_regs = members.m_kx46_regs ?? 0;
        let xa = ((0) | 0);
        let ya = ((0) | 0);
        let ox = ((0) | 0);
        let oy = ((0) | 0);
        let flipx = ((0) | 0);
        let flipy = ((0) | 0);
        let mirrorx = ((0) | 0);
        let mirrory = ((0) | 0);
        let zoomx = ((0) | 0);
        let zoomy = ((0) | 0);
        let scalex = ((0) | 0);
        let scaley = ((0) | 0);
        let nozoom = ((0) | 0);
        let temp = ((0) | 0);
        let temp4 = ((0) | 0);
        let flipscreenx = ((((h_m_kx46_regs[5]) & (1))) | 0);
        let flipscreeny = ((((h_m_kx46_regs[5]) & (2))) | 0);
        xa = (((ya = ((0) | 0))) | 0);
        if (((code) & (1))) {
            xa = ((((xa) + (1))) | 0);
        }
        if (((code) & (2))) {
            ya = ((((ya) + (1))) | 0);
        }
        if (((code) & (4))) {
            xa = ((((xa) + (2))) | 0);
        }
        if (((code) & (8))) {
            ya = ((((ya) + (2))) | 0);
        }
        if (((code) & (16))) {
            xa = ((((xa) + (4))) | 0);
        }
        if (((code) & (32))) {
            ya = ((((ya) + (4))) | 0);
        }
        code = ((((code) & (-64))) | 0);
        temp4 = ((runtime.readIndex(gx_spriteram, offs)) | 0);
        oy = ((((runtime.readIndex(gx_spriteram, ((offs) + (2)))) & (1023))) | 0);
        ox = ((((runtime.readIndex(gx_spriteram, ((offs) + (3)))) & (1023))) | 0);
        scaley = (((zoomy = ((((runtime.readIndex(gx_spriteram, ((offs) + (4)))) & (1023))) | 0))) | 0);
        if (zoomy) {
            zoomy = ((runtime.divide(__add_k053247_device__k053247_draw_single_sprite_gxcore(runtime, 4194304, runtime.shiftRight(zoomy, 1)), zoomy)) | 0);
        }
        else {
            zoomy = ((8388608) | 0);
        }
        if (((((temp4) & (16384))) ? 0 : 1)) {
            scalex = (((zoomx = ((((runtime.readIndex(gx_spriteram, ((offs) + (5)))) & (1023))) | 0))) | 0);
            if (zoomx) {
                zoomx = ((runtime.divide(__add_k053247_device__k053247_draw_single_sprite_gxcore(runtime, 4194304, runtime.shiftRight(zoomx, 1)), zoomx)) | 0);
            }
            else {
                zoomx = ((8388608) | 0);
            }
        }
        else {
            zoomx = ((zoomy) | 0);
            scalex = ((scaley) | 0);
        }
        nozoom = ((((((((scalex) === (64)) ? 1 : 0)) && ((((scaley) === (64)) ? 1 : 0))) ? 1 : 0)) | 0);
        flipx = ((((temp4) & (4096))) | 0);
        flipy = ((((temp4) & (8192))) | 0);
        temp = ((runtime.readIndex(gx_spriteram, ((offs) + (6)))) | 0);
        mirrorx = ((((temp) & (16384))) | 0);
        if (mirrorx) {
            flipx = ((0) | 0);
        }
        mirrory = ((((temp) & (32768))) | 0);
        let objset1 = ((method_k053246_read_register(runtime, 5)) | 0);
        if (((objset1) & (8))) {
            let screenwidth = ((((__L1 ?? globalThis.mamekitMissingCall?.("screen().width"))?.() ?? 0)) | 0);
            zoomx = ((runtime.shiftRight(zoomx, 1)) | 0);
            ox = ((__add_k053247_device__k053247_draw_single_sprite_gxcore(runtime, runtime.shiftRight(ox, 1), 1)) | 0);
            if (flipscreenx) {
                ox = ((((ox) + (screenwidth))) | 0);
            }
            nozoom = ((0) | 0);
        }
        if (flipscreenx) {
            ox = (((-ox)) | 0);
            if (((mirrorx) ? 0 : 1)) {
                flipx = ((((flipx) ? 0 : 1)) | 0);
            }
        }
        if (flipscreeny) {
            oy = (((-oy)) | 0);
            if (((mirrory) ? 0 : 1)) {
                flipy = ((((flipy) ? 0 : 1)) | 0);
            }
        }
        let k053247_opset = ((method_k053247_read_register(runtime, runtime.divide(12, 2))) | 0);
        let wrapsize = ((0) | 0);
        let xwraplim = ((0) | 0);
        let ywraplim = ((0) | 0);
        if (((k053247_opset) & (64))) {
            wrapsize = ((512) | 0);
            xwraplim = ((448) | 0);
            ywraplim = ((384) | 0);
        }
        else {
            wrapsize = ((1024) | 0);
            xwraplim = ((640) | 0);
            ywraplim = ((512) | 0);
        }
        let offx = ((((((((h_m_kx46_regs[0]) << (8))) | (h_m_kx46_regs[1]))) << 16 >> 16)) | 0);
        let offy = ((((((((h_m_kx46_regs[2]) << (8))) | (h_m_kx46_regs[3]))) << 16 >> 16)) | 0);
        temp = ((((wrapsize) - (1))) | 0);
        if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
            ox = ((((ox) + ((members.m_dx ?? 0)))) | 0);
            oy = ((((oy) - ((members.m_dy ?? 0)))) | 0);
        }
        ox = ((((((ox) - (offx))) & (temp))) | 0);
        oy = (((((((-oy)) - (offy))) & (temp))) | 0);
        if ((((ox) >= (xwraplim)) ? 1 : 0)) {
            ox = ((((ox) - (wrapsize))) | 0);
        }
        if ((((oy) >= (ywraplim)) ? 1 : 0)) {
            oy = ((((oy) - (wrapsize))) | 0);
        }
        temp = ((((runtime.shiftRight(temp4, 8)) & (15))) | 0);
        let width = ((((1) << (((temp) & (3))))) | 0);
        let height = ((((1) << (((runtime.shiftRight(temp, 2)) & (3))))) | 0);
        if ((((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) ? 0 : 1)) {
            ox = ((((ox) + ((members.m_dx ?? 0)))) | 0);
            oy = ((((oy) - ((members.m_dy ?? 0)))) | 0);
        }
        ox = ((((ox) - (runtime.shiftRight(((zoomx) * (width)), 13)))) | 0);
        oy = ((((oy) - (runtime.shiftRight(((zoomy) * (height)), 13)))) | 0);
        if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
            method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, pri, zcode, alpha, drawmode, gx_objzbuf, gx_shdzbuf, 0, 0);
        }
        else {
            let whichtable = drawmode_table;
            if (((Number(color) === Number(-1)) ? 1 : 0)) {
                if ((((shdmask) < (0)) ? 1 : 0)) {
                    return;
                }
                color = ((0) | 0);
                shadow = ((-1) | 0);
                whichtable = shadowmode_table;
                ((__L3 ?? globalThis.mamekitMissingCall?.("palette().set_shadow_mode"))?.(0) ?? 0);
            }
            else {
                if ((((shdmask) >= (0)) ? 1 : 0)) {
                    shadow = ((((((color) & (536870912))) ? (runtime.shiftRight(color, 20)) : (runtime.shiftRight(shadow, 10)))) | 0);
                    if ((shadow = ((((shadow) & (3))) | 0))) {
                        ((__L3 ?? globalThis.mamekitMissingCall?.("palette().set_shadow_mode"))?.(((((shadow) - (1))) & (shdmask))) ?? 0);
                    }
                }
                else {
                    shadow = ((0) | 0);
                }
            }
            color = ((((color) & (65535))) | 0);
            runtime.writeIndex(drawmode_table, runtime.subtract((__t0 = __deref_k053247_device__k053247_draw_single_sprite_gxcore(runtime, members.m_gfx), typeof __t0.granularity === 'function' ? __t0.granularity() : typeof __t0.granularity === 'number' || typeof __t0.granularity === 'boolean' ? __t0.granularity : runtime.container(members.m_gfx, "granularity")), 1), ((shadow) ? (2) : (1)));
            method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, 0, 0, 0, 0, 0, 0, primask, whichtable);
        }
    }
    function __add_k053247_device__k053247_draw_single_sprite_gxcore(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_k053247_device__k053247_draw_single_sprite_gxcore(runtime, p) {
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
    function method_k053247_device__k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, pri, zcode, alpha, drawmode, gx_objzbuf, gx_shdzbuf, primask, whichtable) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["screen"], __L1 = __l["screen().priority"];
        let zw = ((0) | 0);
        let zh = ((0) | 0);
        let fx = ((0) | 0);
        let fy = ((0) | 0);
        let sx = ((0) | 0);
        let sy = ((0) | 0);
        let tempcode = ((0) | 0);
        for (let y = ((0) | 0); (((y) < (height)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
            sy = ((((oy) + (runtime.shiftRight(__add_k053247_device__k053247_draw_yxloop_gx(runtime, ((zoomy) * (y)), 2048), 12)))) | 0);
            zh = ((((((oy) + (runtime.shiftRight(__add_k053247_device__k053247_draw_yxloop_gx(runtime, ((zoomy) * (((y) + (1)))), 2048), 12)))) - (sy))) | 0);
            for (let x = ((0) | 0); (((x) < (width)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                sx = ((((ox) + (runtime.shiftRight(__add_k053247_device__k053247_draw_yxloop_gx(runtime, ((zoomx) * (x)), 2048), 12)))) | 0);
                zw = ((((((ox) + (runtime.shiftRight(__add_k053247_device__k053247_draw_yxloop_gx(runtime, ((zoomx) * (((x) + (1)))), 2048), 12)))) - (sx))) | 0);
                tempcode = ((code) | 0);
                if (mirrorx) {
                    if (((((flipx) ? 0 : 1)) ^ (((Number(((x) << (1))) < Number(width)) ? 1 : 0)))) {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fx = ((1) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fx = ((0) | 0);
                    }
                }
                else {
                    if (flipx) {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_0[(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    fx = ((flipx) | 0);
                }
                if (mirrory) {
                    if (((((flipy) ? 0 : 1)) ^ (((Number(((y) << (1))) >= Number(height)) ? 1 : 0)))) {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fy = ((1) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                        fy = ((0) | 0);
                    }
                }
                else {
                    if (flipy) {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    else {
                        tempcode = ((((tempcode) + ((__mame_table_1[(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
                    }
                    fy = ((flipy) | 0);
                }
                if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
                    if (nozoom) {
                        zw = (((zh = ((16) | 0))) | 0);
                    }
                    method_zdrawgfxzoom32GP(runtime, bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf);
                }
                else {
                    if (nozoom) {
                        (__deref_k053247_device__k053247_draw_yxloop_gx(runtime, members.m_gfx).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((__L1 ?? globalThis.mamekitMissingCall?.("screen().priority"))?.() ?? 0), primask, whichtable) ?? 0);
                    }
                    else {
                        (__deref_k053247_device__k053247_draw_yxloop_gx(runtime, members.m_gfx).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), ((__L1 ?? globalThis.mamekitMissingCall?.("screen().priority"))?.() ?? 0), primask, whichtable) ?? 0);
                    }
                    if ((((mirrory) && ((((height) === (1)) ? 1 : 0))) ? 1 : 0)) {
                        if (nozoom) {
                            (__deref_k053247_device__k053247_draw_yxloop_gx(runtime, members.m_gfx).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, ((__L1 ?? globalThis.mamekitMissingCall?.("screen().priority"))?.() ?? 0), primask, whichtable) ?? 0);
                        }
                        else {
                            (__deref_k053247_device__k053247_draw_yxloop_gx(runtime, members.m_gfx).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, ((zw) << (12)), ((zh) << (12)), ((__L1 ?? globalThis.mamekitMissingCall?.("screen().priority"))?.() ?? 0), primask, whichtable) ?? 0);
                        }
                    }
                }
            }
        }
    }
    function __add_k053247_device__k053247_draw_yxloop_gx(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_k053247_device__k053247_draw_yxloop_gx(runtime, p) {
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
    function method_k053247_sprites_draw(runtime, bitmap, cliprect) {
        const members = runtime.members;
        let __t0;
        if (((Number((__t0 = __deref_k053247_sprites_draw(runtime, bitmap), typeof __t0.bpp === 'function' ? __t0.bpp() : typeof __t0.bpp === 'number' || typeof __t0.bpp === 'boolean' ? __t0.bpp : runtime.container(bitmap, "bpp"))) === Number(16)) ? 1 : 0)) {
            return method_k053247_sprites_draw__bitmap_ind16__rectangle(runtime, bitmap, cliprect);
        }
        else {
            return method_k053247_sprites_draw__bitmap_rgb32__rectangle(runtime, bitmap, cliprect);
        }
    }
    function __deref_k053247_sprites_draw(runtime, p) {
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
        "k053247_get_ram": method_k053247_get_ram,
        "k053247_get_dx": method_k053247_get_dx,
        "k053247_get_dy": method_k053247_get_dy,
        "k053246_read_register": method_k053246_read_register,
        "k053247_read_register": method_k053247_read_register,
        "k055673_reg_word_w": method_k055673_reg_word_w,
        "k053247_word_r": method_k053247_word_r,
        "k053247_word_w": method_k053247_word_w,
        "k053247_r": method_k053247_r,
        "k053247_w": method_k053247_w,
        "k055673_5bpp_rom_word_r": method_k055673_5bpp_rom_word_r,
        "k055673_rom_word_r": method_k055673_rom_word_r,
        "k055673_ps_rom_word_r": method_k055673_ps_rom_word_r,
        "k055673_gr_rom_word_r": method_k055673_gr_rom_word_r,
        "k053246_r": method_k053246_r,
        "k053246_w": method_k053246_w,
        "k053246_set_objcha_line": method_k053246_set_objcha_line,
        "k053246_is_irq_enabled": method_k053246_is_irq_enabled,
        "k053247_sprites_draw_common": method_k053247_sprites_draw_common,
        "k053247_draw_single_sprite_gxcore": method_k053247_draw_single_sprite_gxcore,
        "k053247_draw_yxloop_gx": method_k053247_draw_yxloop_gx,
        "zdrawgfxzoom32GP": method_zdrawgfxzoom32GP,
        "zdrawgfxzoom32GP__bitmap_ind16__rectangle__u32__u32__int__int__int__int__int__int__int__int__int__int__u8__u8": method_zdrawgfxzoom32GP__bitmap_ind16__rectangle__u32__u32__int__int__int__int__int__int__int__int__int__int__u8__u8,
        "k053247_sprites_draw__bitmap_ind16__rectangle": method_k053247_sprites_draw__bitmap_ind16__rectangle,
        "k053247_sprites_draw__bitmap_rgb32__rectangle": method_k053247_sprites_draw__bitmap_rgb32__rectangle,
        "k053247_set_z_rejection": method_k053247_set_z_rejection,
        "k053247_device::k053247_draw_single_sprite_gxcore": method_k053247_device__k053247_draw_single_sprite_gxcore,
        "k053247_device::k053247_draw_yxloop_gx": method_k053247_device__k053247_draw_yxloop_gx,
        "k053247_sprites_draw": method_k053247_sprites_draw
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["fatalerror", "m_k053247_cb", "palette", "palette().highlights_enabled", "palette().set_shadow_mode", "palette().shadows_enabled", "screen", "screen().priority", "screen().width"];
export const device = definition;
export default device;
