import deviceData from './nes_cart_slot.device.ir.json' with { type: 'json' };
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
    function method_get_software_list_loader(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["rom_software_list_loader::instance"];
        return (__L0 ? __L0() : runtime.macro("rom_software_list_loader::instance"));
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
    function method_pcb_start(runtime, ciram_ptr) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["exists"];
        if ((members.m_cart ?? 0)) {
            (members.m_cart.pcb_start?.((__L0 ? __L0() : runtime.macro("machine")), ciram_ptr, (__L1 ? __L1() : runtime.macro("exists"))) ?? 0);
        }
    }
    function method_read_l(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            let val = (((members.m_cart.read_l?.(offset) ?? 0)) & 0xff);
            (members.m_cart.set_open_bus?.(runtime.shiftRight(((((offset) + (16640))) & (65280)), 8)) ?? 0);
            return ((val) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_read_m(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            let val = (((members.m_cart.read_m?.(offset) ?? 0)) & 0xff);
            (members.m_cart.set_open_bus?.(runtime.shiftRight(((((offset) + (24576))) & (65280)), 8)) ?? 0);
            return ((val) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_read_h(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            let val = (((members.m_cart.read_h?.(offset) ?? 0)) & 0xff);
            (members.m_cart.set_open_bus?.(runtime.shiftRight(((((offset) + (32768))) & (65280)), 8)) ?? 0);
            return ((val) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_read_ex(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            let val = (((members.m_cart.read_ex?.(offset) ?? 0)) & 0xff);
            (members.m_cart.set_open_bus?.(runtime.shiftRight(((((offset) + (16416))) & (65280)), 8)) ?? 0);
            return ((val) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.write_l?.(offset, data) ?? 0);
            (members.m_cart.set_open_bus?.(runtime.shiftRight(((((offset) + (16640))) & (65280)), 8)) ?? 0);
        }
    }
    function method_write_m(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.write_m?.(offset, data) ?? 0);
            (members.m_cart.set_open_bus?.(runtime.shiftRight(((((offset) + (24576))) & (65280)), 8)) ?? 0);
        }
    }
    function method_write_h(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.write_h?.(offset, data) ?? 0);
            (members.m_cart.set_open_bus?.(runtime.shiftRight(((((offset) + (32768))) & (65280)), 8)) ?? 0);
        }
    }
    function method_write_ex(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_cart ?? 0)) {
            (members.m_cart.write_ex?.(offset, data) ?? 0);
            (members.m_cart.set_open_bus?.(runtime.shiftRight(((((offset) + (16416))) & (65280)), 8)) ?? 0);
        }
    }
    function method_call_load_unif(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["length"], __L1 = __l["VECTOR_OF"], __L2 = __l["fseek"], __L3 = __l["fread"], __L4 = __l["get_u32le"], __L5 = __l["fatalerror"], __L6 = __l["memcpy"], __L7 = __l["osd_printf_error"], __L8 = __l["battery_load"];
        let vram_size = ((0) >>> 0);
        let prgram_size = ((0) >>> 0);
        let battery_size = ((0) >>> 0);
        let mapper_sram_size = ((0) >>> 0);
        let unif_ver = ((0) >>> 0);
        let chunk_length = ((0) >>> 0);
        let read_length = ((32) >>> 0);
        let prg_start = ((0) >>> 0);
        let chr_start = ((0) >>> 0);
        let size = (((__L0 ? __L0() : runtime.macro("length"))) >>> 0);
        let prg_size = ((0) >>> 0);
        let vrom_size = ((0) >>> 0);
        let buffer = new Uint8Array(Math.max(0, Number(4)));
        let mirror = ((0) & 0xff);
        let magic2 = new Uint8Array(Math.max(0, Number(4)));
        let unif_mapr = new Uint8Array(Math.max(0, Number(32)));
        let mapr_chunk_found = ((0) ? 1 : 0);
        let small_prg = ((0) ? 1 : 0);
        let temp_prg = (__L1 ? __L1("uint8_t", 4194304) : runtime.macro("VECTOR_OF", "uint8_t", 4194304));
        let temp_chr = (__L1 ? __L1("uint8_t", 2097152) : runtime.macro("VECTOR_OF", "uint8_t", 2097152));
        let temp_byte = ((0) & 0xff);
        (__L2 ? __L2(4, 0) : runtime.macro("fseek", 4, 0));
        (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
        unif_ver = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
        0;
        do {
            (__L2 ? __L2(read_length, 0) : runtime.macro("fseek", read_length, 0));
            cppMemset(runtime, magic2, 0, ((magic2)?.byteLength ?? 1));
            (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => magic2, set: (value) => { magic2 = ((value) << 24 >> 24); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => magic2, set: (value) => { magic2 = ((value) << 24 >> 24); } }), offset: 0 }), 4));
            if (((mapr_chunk_found) ? 0 : 1)) {
                if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(77)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(65)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(80)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(82)) ? 1 : 0))) ? 1 : 0)) {
                    mapr_chunk_found = ((1) ? 1 : 0);
                    0;
                    (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                    chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                    if ((((chunk_length) <= (32)) ? 1 : 0)) {
                        (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => unif_mapr, set: (value) => { unif_mapr = ((value) << 24 >> 24); } }), offset: 0 }), chunk_length) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => unif_mapr, set: (value) => { unif_mapr = ((value) << 24 >> 24); } }), offset: 0 }), chunk_length));
                    }
                    0;
                    (__L2 ? __L2(32, 0) : runtime.macro("fseek", 32, 0));
                    read_length = ((32) >>> 0);
                }
                else {
                    0;
                    (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                    chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                    read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                }
            }
            else {
                if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(77)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(65)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(80)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(82)) ? 1 : 0))) ? 1 : 0)) {
                    0;
                    (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                    chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                    read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                }
                else {
                    if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(82)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(69)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(65)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(68)) ? 1 : 0))) ? 1 : 0)) {
                        0;
                        (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                        chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                        read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                    }
                    else {
                        if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(78)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(65)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(77)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(69)) ? 1 : 0))) ? 1 : 0)) {
                            0;
                            (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                            chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                            read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                        }
                        else {
                            if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(87)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(82)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(84)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(82)) ? 1 : 0))) ? 1 : 0)) {
                                0;
                                (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                            }
                            else {
                                if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(84)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(86)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(67)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(73)) ? 1 : 0))) ? 1 : 0)) {
                                    0;
                                    (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                    chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                    (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => temp_byte, set: (value) => { temp_byte = ((value) & 0xff); } }), offset: 0 }), 1) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => temp_byte, set: (value) => { temp_byte = ((value) & 0xff); } }), offset: 0 }), 1));
                                    0;
                                    read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                }
                                else {
                                    if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(84)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(86)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(83)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(67)) ? 1 : 0))) ? 1 : 0)) {
                                        0;
                                        (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                        chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                        read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                    }
                                    else {
                                        if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(68)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(73)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(78)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(70)) ? 1 : 0))) ? 1 : 0)) {
                                            0;
                                            (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                            chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                            read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                        }
                                        else {
                                            if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(67)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(84)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(82)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(76)) ? 1 : 0))) ? 1 : 0)) {
                                                0;
                                                (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                                chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                                read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                            }
                                            else {
                                                if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(66)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(65)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(84)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(82)) ? 1 : 0))) ? 1 : 0)) {
                                                    0;
                                                    (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                                    chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                                    read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                                }
                                                else {
                                                    if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(86)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(82)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(79)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(82)) ? 1 : 0))) ? 1 : 0)) {
                                                        0;
                                                        (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                                        chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                                        read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                                    }
                                                    else {
                                                        if ((((((((((((Number(runtime.readIndex(magic2, 0)) === Number(77)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(73)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(82)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 3)) === Number(82)) ? 1 : 0))) ? 1 : 0)) {
                                                            0;
                                                            (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                                            chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                                            (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => mirror, set: (value) => { mirror = ((value) & 0xff); } }), offset: 0 }), 1) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => mirror, set: (value) => { mirror = ((value) & 0xff); } }), offset: 0 }), 1));
                                                            read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                                        }
                                                        else {
                                                            if (((((((((Number(runtime.readIndex(magic2, 0)) === Number(80)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(67)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(75)) ? 1 : 0))) ? 1 : 0)) {
                                                                0;
                                                                (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                                                chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                                                read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                                            }
                                                            else {
                                                                if (((((((((Number(runtime.readIndex(magic2, 0)) === Number(67)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(67)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(75)) ? 1 : 0))) ? 1 : 0)) {
                                                                    0;
                                                                    (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                                                    chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                                                    read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                                                }
                                                                else {
                                                                    if (((((((((Number(runtime.readIndex(magic2, 0)) === Number(80)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(82)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(71)) ? 1 : 0))) ? 1 : 0)) {
                                                                        0;
                                                                        (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                                                        chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                                                        prg_size = ((((prg_size) + (chunk_length))) >>> 0);
                                                                        if (runtime.divide(chunk_length, 16384)) {
                                                                            0;
                                                                        }
                                                                        else {
                                                                            small_prg = ((1) ? 1 : 0);
                                                                            0;
                                                                        }
                                                                        (__L3 ? __L3(__addr_call_load_unif(runtime, temp_prg, prg_start), chunk_length) : runtime.macro("fread", __addr_call_load_unif(runtime, temp_prg, prg_start), chunk_length));
                                                                        prg_start = ((((prg_start) + (chunk_length))) >>> 0);
                                                                        read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                                                    }
                                                                    else {
                                                                        if (((((((((Number(runtime.readIndex(magic2, 0)) === Number(67)) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 1)) === Number(72)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(magic2, 2)) === Number(82)) ? 1 : 0))) ? 1 : 0)) {
                                                                            0;
                                                                            (__L3 ? __L3(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4) : runtime.macro("fread", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => buffer, set: (value) => { buffer = ((value) & 0xff); } }), offset: 0 }), 4));
                                                                            chunk_length = (((__L4 ? __L4(buffer) : runtime.macro("get_u32le", buffer))) >>> 0);
                                                                            vrom_size = ((((vrom_size) + (chunk_length))) >>> 0);
                                                                            0;
                                                                            (__L3 ? __L3(__addr_call_load_unif(runtime, temp_chr, chr_start), chunk_length) : runtime.macro("fread", __addr_call_load_unif(runtime, temp_chr, chr_start), chunk_length));
                                                                            chr_start = ((((chr_start) + (chunk_length))) >>> 0);
                                                                            read_length = ((((read_length) + (((chunk_length) + (8))))) >>> 0);
                                                                        }
                                                                        else {
                                                                            0;
                                                                            read_length = ((size) >>> 0);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } while ((((size) > (read_length)) ? 1 : 0));
        if (((mapr_chunk_found) ? 0 : 1)) {
            (__L5 ? __L5("UNIF should have a [MAPR] chunk to work. Check if your image has been corrupted\n") : runtime.macro("fatalerror", "UNIF should have a [MAPR] chunk to work. Check if your image has been corrupted\n"));
        }
        if (((prg_start) ? 0 : 1)) {
            (__L5 ? __L5("No PRG found. Please report the problem at MAME Board.\n") : runtime.macro("fatalerror", "No PRG found. Please report the problem at MAME Board.\n"));
        }
        let pcb_id = ((0) | 0);
        let battery = ((0) | 0);
        let prgram = ((0) | 0);
        let vram_chunks = ((0) | 0);
        method_unif_mapr_setup(runtime, unif_mapr, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => pcb_id, set: (value) => { pcb_id = ((value) | 0); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => battery, set: (value) => { battery = ((value) | 0); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => prgram, set: (value) => { prgram = ((value) | 0); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => vram_chunks, set: (value) => { vram_chunks = ((value) | 0); } }), offset: 0 }));
        members.m_pcb_id = ((pcb_id) | 0);
        if (battery) {
            battery_size = ((8192) >>> 0);
        }
        prgram_size = ((((prgram) * (8192))) >>> 0);
        vram_size = ((((vram_chunks) * (8192))) >>> 0);
        (members.m_cart.set_four_screen_vram?.(0) ?? 0);
        switch (mirror) {
            case 0:
                {
                    (members.m_cart.set_mirroring?.(2) ?? 0);
                    break;
                }
            case 1:
                {
                    (members.m_cart.set_mirroring?.(1) ?? 0);
                    break;
                }
            case 2:
                {
                    (members.m_cart.set_mirroring?.(4) ?? 0);
                    break;
                }
            case 3:
                {
                    (members.m_cart.set_mirroring?.(3) ?? 0);
                    break;
                }
            case 4:
                {
                    (members.m_cart.set_four_screen_vram?.(1) ?? 0);
                    (members.m_cart.set_mirroring?.(5) ?? 0);
                    break;
                }
            case 5:
                {
                    0;
                    (members.m_cart.set_mirroring?.(2) ?? 0);
                    break;
                }
            default:
                {
                    0;
                    (members.m_cart.set_mirroring?.(2) ?? 0);
                    break;
                }
        }
        0;
        0;
        0;
        0;
        if ((((prg_size) === (16384)) ? 1 : 0)) {
            (members.m_cart.prg_alloc?.(32768) ?? 0);
            (__L6 ? __L6((members.m_cart.get_prg_base?.() ?? 0), __addr_call_load_unif(runtime, temp_prg, 0), 16384) : runtime.macro("memcpy", (members.m_cart.get_prg_base?.() ?? 0), __addr_call_load_unif(runtime, temp_prg, 0), 16384));
            (__L6 ? __L6(__add_call_load_unif(runtime, (members.m_cart.get_prg_base?.() ?? 0), 16384), (members.m_cart.get_prg_base?.() ?? 0), 16384) : runtime.macro("memcpy", __add_call_load_unif(runtime, (members.m_cart.get_prg_base?.() ?? 0), 16384), (members.m_cart.get_prg_base?.() ?? 0), 16384));
        }
        else {
            (members.m_cart.prg_alloc?.(prg_size) ?? 0);
            (__L6 ? __L6((members.m_cart.get_prg_base?.() ?? 0), __addr_call_load_unif(runtime, temp_prg, 0), prg_size) : runtime.macro("memcpy", (members.m_cart.get_prg_base?.() ?? 0), __addr_call_load_unif(runtime, temp_prg, 0), prg_size));
        }
        if (small_prg) {
            (__L7 ? __L7("Loaded UNIF file with non-16k PRG chunk. This is not supported in MAME yet.") : runtime.macro("osd_printf_error", "Loaded UNIF file with non-16k PRG chunk. This is not supported in MAME yet."));
        }
        if (vrom_size) {
            (members.m_cart.vrom_alloc?.(vrom_size) ?? 0);
            (__L6 ? __L6((members.m_cart.get_vrom_base?.() ?? 0), __addr_call_load_unif(runtime, temp_chr, 0), vrom_size) : runtime.macro("memcpy", (members.m_cart.get_vrom_base?.() ?? 0), __addr_call_load_unif(runtime, temp_chr, 0), vrom_size));
        }
        if (vram_size) {
            (members.m_cart.vram_alloc?.(vram_size) ?? 0);
        }
        if (prgram_size) {
            (members.m_cart.prgram_alloc?.(prgram_size) ?? 0);
        }
        if ((((battery_size) || (mapper_sram_size)) ? 1 : 0)) {
            let tot_size = ((((battery_size) + (mapper_sram_size))) >>> 0);
            let temp_nvram = (__L1 ? __L1("uint8_t", tot_size) : runtime.macro("VECTOR_OF", "uint8_t", tot_size));
            (__L8 ? __L8(__addr_call_load_unif(runtime, temp_nvram, 0), tot_size, 0) : runtime.macro("battery_load", __addr_call_load_unif(runtime, temp_nvram, 0), tot_size, 0));
            if (battery_size) {
                (members.m_cart.battery_alloc?.(battery_size) ?? 0);
                (__L6 ? __L6((members.m_cart.get_battery_base?.() ?? 0), __addr_call_load_unif(runtime, temp_nvram, 0), battery_size) : runtime.macro("memcpy", (members.m_cart.get_battery_base?.() ?? 0), __addr_call_load_unif(runtime, temp_nvram, 0), battery_size));
            }
            if (mapper_sram_size) {
                (__L6 ? __L6((members.m_cart.get_mapper_sram_base?.() ?? 0), __addr_call_load_unif(runtime, temp_nvram, battery_size), mapper_sram_size) : runtime.macro("memcpy", (members.m_cart.get_mapper_sram_base?.() ?? 0), __addr_call_load_unif(runtime, temp_nvram, battery_size), mapper_sram_size));
            }
        }
        0;
    }
    function __add_call_load_unif(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_call_load_unif(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_unif_mapr_setup(runtime, board, pcb_id, battery, prgram, vram_chunks) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        let unif_board = method_nes_unif_lookup(runtime, board);
        let unif_board$s = undefined, unif_board$o = 0;
        if (ArrayBuffer.isView(unif_board) || Array.isArray(unif_board))
            unif_board$s = unif_board;
        else if (unif_board !== null && typeof unif_board === 'object' && unif_board.generatedPointer === true && unif_board.path === undefined && unif_board.target === undefined && (ArrayBuffer.isView(unif_board.source) || Array.isArray(unif_board.source))) {
            unif_board$s = unif_board.source;
            unif_board$o = unif_board.offset;
        }
        if (((unif_board) ? 0 : 1)) {
            (__L0 ? __L0("Unknown UNIF board %s.\n", board) : runtime.macro("fatalerror", "Unknown UNIF board %s.\n", board));
        }
        runtime.pointerStore(pcb_id, __deref_unif_mapr_setup(runtime, unif_board).board_idx);
        runtime.pointerStore(battery, __deref_unif_mapr_setup(runtime, unif_board).nvwram);
        runtime.pointerStore(prgram, __deref_unif_mapr_setup(runtime, unif_board).wram);
        if (((Number(__deref_unif_mapr_setup(runtime, unif_board).chrram) <= Number(5)) ? 1 : 0)) {
            runtime.pointerStore(vram_chunks, 1);
        }
        else {
            if (((Number(__deref_unif_mapr_setup(runtime, unif_board).chrram) === Number(6)) ? 1 : 0)) {
                runtime.pointerStore(vram_chunks, 2);
            }
            else {
                if (((Number(__deref_unif_mapr_setup(runtime, unif_board).chrram) === Number(7)) ? 1 : 0)) {
                    runtime.pointerStore(vram_chunks, 4);
                }
            }
        }
    }
    function __deref_unif_mapr_setup(runtime, p) {
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
    function method_nes_unif_lookup(runtime, board) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["core_stricmp"];
        const h_unif_list = members.unif_list ?? 0;
        for (let i = ((0) | 0); ((Number(i) < Number(((h_unif_list)?.length ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if ((((__L0 ? __L0(h_unif_list[i].board, board) : runtime.macro("core_stricmp", h_unif_list[i].board, board))) ? 0 : 1)) {
                return __addr_nes_unif_lookup(runtime, h_unif_list, i);
            }
        }
        return 0;
    }
    function __addr_nes_unif_lookup(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_image_interface(runtime) {
        const members = runtime.members;
        return "nes_cart";
    }
    function method_file_extensions(runtime) {
        const members = runtime.members;
        return "nes,unf,unif";
    }
    function method_unhashed_header_length(runtime) {
        const members = runtime.members;
        return ((16) >>> 0);
    }
    function method_get_pcb_id(runtime) {
        const members = runtime.members;
        return (((members.m_pcb_id ?? 0)) | 0);
    }
    function method_get_crc_hack(runtime) {
        const members = runtime.members;
        const h_m_crc_hack = members.m_crc_hack ?? 0;
        return ((h_m_crc_hack) | 0);
    }
    function method_nes_cart_slot_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_nes_cart_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return "nes_cart";
    }
    function method_nes_cart_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return "nes,unf,unif";
    }
    function method_nes_cart_slot_device__unhashed_header_length(runtime) {
        const members = runtime.members;
        return ((16) >>> 0);
    }
    function method_nes_cart_slot_device__get_pcb_id(runtime) {
        const members = runtime.members;
        return (((members.m_pcb_id ?? 0)) | 0);
    }
    function method_nes_cart_slot_device__get_crc_hack(runtime) {
        const members = runtime.members;
        const h_m_crc_hack = members.m_crc_hack ?? 0;
        return ((h_m_crc_hack) | 0);
    }
    function method_call_load_ines__lambda0(runtime, byte) {
        const members = runtime.members;
        return ((__add_call_load_ines__lambda0(runtime, ((2) * (((byte) & (3)))), 1)) << (runtime.shiftRight(byte, 2)));
    }
    function __add_call_load_ines__lambda0(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "is_readable": method_is_readable,
        "is_writeable": method_is_writeable,
        "is_creatable": method_is_creatable,
        "image_type_name": method_image_type_name,
        "image_brief_type_name": method_image_brief_type_name,
        "get_software_list_loader": method_get_software_list_loader,
        "device_rom_image_interface::is_readable": method_device_rom_image_interface__is_readable,
        "device_rom_image_interface::is_writeable": method_device_rom_image_interface__is_writeable,
        "device_rom_image_interface::is_creatable": method_device_rom_image_interface__is_creatable,
        "device_rom_image_interface::image_type_name": method_device_rom_image_interface__image_type_name,
        "device_rom_image_interface::image_brief_type_name": method_device_rom_image_interface__image_brief_type_name,
        "device_cartrom_image_interface::image_type_name": method_device_cartrom_image_interface__image_type_name,
        "device_cartrom_image_interface::image_brief_type_name": method_device_cartrom_image_interface__image_brief_type_name,
        "pcb_start": method_pcb_start,
        "read_l": method_read_l,
        "read_m": method_read_m,
        "read_h": method_read_h,
        "read_ex": method_read_ex,
        "write_l": method_write_l,
        "write_m": method_write_m,
        "write_h": method_write_h,
        "write_ex": method_write_ex,
        "call_load_unif": method_call_load_unif,
        "unif_mapr_setup": method_unif_mapr_setup,
        "nes_unif_lookup": method_nes_unif_lookup,
        "is_reset_on_load": method_is_reset_on_load,
        "image_interface": method_image_interface,
        "file_extensions": method_file_extensions,
        "unhashed_header_length": method_unhashed_header_length,
        "get_pcb_id": method_get_pcb_id,
        "get_crc_hack": method_get_crc_hack,
        "nes_cart_slot_device::is_reset_on_load": method_nes_cart_slot_device__is_reset_on_load,
        "nes_cart_slot_device::image_interface": method_nes_cart_slot_device__image_interface,
        "nes_cart_slot_device::file_extensions": method_nes_cart_slot_device__file_extensions,
        "nes_cart_slot_device::unhashed_header_length": method_nes_cart_slot_device__unhashed_header_length,
        "nes_cart_slot_device::get_pcb_id": method_nes_cart_slot_device__get_pcb_id,
        "nes_cart_slot_device::get_crc_hack": method_nes_cart_slot_device__get_crc_hack,
        "call_load_ines__lambda0": method_call_load_ines__lambda0
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["VECTOR_OF", "battery_load", "core_stricmp", "exists", "fatalerror", "fread", "fseek", "get_u32le", "length", "machine", "memcpy", "osd_printf_error", "rom_software_list_loader::instance"];
definition.slot.loadCard = {
    "nes_cart_slot/nes_8237": () => import("./nes_cart_slot/nes_8237.js"),
    "nes_cart_slot/nes_nrom": () => import("./nes_cart_slot/nes_nrom.js"),
    "nes_cart_slot/nes_fcbasic": () => import("./nes_cart_slot/nes_fcbasic.js"),
    "nes_cart_slot/nes_nrom368": () => import("./nes_cart_slot/nes_nrom368.js"),
    "nes_cart_slot/nes_ggenie": () => import("./nes_cart_slot/nes_ggenie.js"),
    "nes_cart_slot/nes_uxrom": () => import("./nes_cart_slot/nes_uxrom.js"),
    "nes_cart_slot/nes_uxrom_cc": () => import("./nes_cart_slot/nes_uxrom_cc.js"),
    "nes_cart_slot/nes_cnrom": () => import("./nes_cart_slot/nes_cnrom.js"),
    "nes_cart_slot/nes_bandai_pt554": () => import("./nes_cart_slot/nes_bandai_pt554.js"),
    "nes_cart_slot/nes_cprom": () => import("./nes_cart_slot/nes_cprom.js"),
    "nes_cart_slot/nes_axrom": () => import("./nes_cart_slot/nes_axrom.js"),
    "nes_cart_slot/nes_pxrom": () => import("./nes_cart_slot/nes_pxrom.js"),
    "nes_cart_slot/nes_fxrom": () => import("./nes_cart_slot/nes_fxrom.js"),
    "nes_cart_slot/nes_bxrom": () => import("./nes_cart_slot/nes_bxrom.js"),
    "nes_cart_slot/nes_gxrom": () => import("./nes_cart_slot/nes_gxrom.js"),
    "nes_cart_slot/nes_un1rom": () => import("./nes_cart_slot/nes_un1rom.js"),
    "nes_cart_slot/nes_sxrom": () => import("./nes_cart_slot/nes_sxrom.js"),
    "nes_cart_slot/nes_sorom": () => import("./nes_cart_slot/nes_sorom.js"),
    "nes_cart_slot/nes_szrom": () => import("./nes_cart_slot/nes_szrom.js"),
    "nes_cart_slot/nes_txrom": () => import("./nes_cart_slot/nes_txrom.js"),
    "nes_cart_slot/nes_hkrom": () => import("./nes_cart_slot/nes_hkrom.js"),
    "nes_cart_slot/nes_tqrom": () => import("./nes_cart_slot/nes_tqrom.js"),
    "nes_cart_slot/nes_txsrom": () => import("./nes_cart_slot/nes_txsrom.js"),
    "nes_cart_slot/nes_exrom": () => import("./nes_cart_slot/nes_exrom.js"),
    "nes_cart_slot/nes_disksys": () => import("./nes_cart_slot/nes_disksys.js"),
    "nes_cart_slot/nes_zz_pcb": () => import("./nes_cart_slot/nes_zz_pcb.js"),
    "nes_cart_slot/nes_qj_pcb": () => import("./nes_cart_slot/nes_qj_pcb.js"),
    "nes_cart_slot/nes_event": () => import("./nes_cart_slot/nes_event.js"),
    "nes_cart_slot/nes_event2": () => import("./nes_cart_slot/nes_event2.js"),
    "nes_cart_slot/nes_74x139x74": () => import("./nes_cart_slot/nes_74x139x74.js"),
    "nes_cart_slot/nes_74x377": () => import("./nes_cart_slot/nes_74x377.js"),
    "nes_cart_slot/nes_74x161x161x32": () => import("./nes_cart_slot/nes_74x161x161x32.js"),
    "nes_cart_slot/nes_74x161x138": () => import("./nes_cart_slot/nes_74x161x138.js"),
    "nes_cart_slot/nes_lz93d50": () => import("./nes_cart_slot/nes_lz93d50.js"),
    "nes_cart_slot/nes_lz93d50_24c01": () => import("./nes_cart_slot/nes_lz93d50_24c01.js"),
    "nes_cart_slot/nes_lz93d50_24c02": () => import("./nes_cart_slot/nes_lz93d50_24c02.js"),
    "nes_cart_slot/nes_fcg": () => import("./nes_cart_slot/nes_fcg.js"),
    "nes_cart_slot/nes_fjump2": () => import("./nes_cart_slot/nes_fjump2.js"),
    "nes_cart_slot/nes_datach": () => import("./nes_cart_slot/nes_datach.js"),
    "nes_cart_slot/nes_karaokestudio": () => import("./nes_cart_slot/nes_karaokestudio.js"),
    "nes_cart_slot/nes_oekakids": () => import("./nes_cart_slot/nes_oekakids.js"),
    "nes_cart_slot/nes_g101": () => import("./nes_cart_slot/nes_g101.js"),
    "nes_cart_slot/nes_lrog017": () => import("./nes_cart_slot/nes_lrog017.js"),
    "nes_cart_slot/nes_h3001": () => import("./nes_cart_slot/nes_h3001.js"),
    "nes_cart_slot/nes_holydivr": () => import("./nes_cart_slot/nes_holydivr.js"),
    "nes_cart_slot/nes_tam_s1": () => import("./nes_cart_slot/nes_tam_s1.js"),
    "nes_cart_slot/nes_jf11": () => import("./nes_cart_slot/nes_jf11.js"),
    "nes_cart_slot/nes_jf13": () => import("./nes_cart_slot/nes_jf13.js"),
    "nes_cart_slot/nes_jf16": () => import("./nes_cart_slot/nes_jf16.js"),
    "nes_cart_slot/nes_jf17": () => import("./nes_cart_slot/nes_jf17.js"),
    "nes_cart_slot/nes_jf17_adpcm": () => import("./nes_cart_slot/nes_jf17_adpcm.js"),
    "nes_cart_slot/nes_jf19": () => import("./nes_cart_slot/nes_jf19.js"),
    "nes_cart_slot/nes_jf19_adpcm": () => import("./nes_cart_slot/nes_jf19_adpcm.js"),
    "nes_cart_slot/nes_ss88006": () => import("./nes_cart_slot/nes_ss88006.js"),
    "nes_cart_slot/nes_jf23": () => import("./nes_cart_slot/nes_jf23.js"),
    "nes_cart_slot/nes_jf24": () => import("./nes_cart_slot/nes_jf24.js"),
    "nes_cart_slot/nes_jf29": () => import("./nes_cart_slot/nes_jf29.js"),
    "nes_cart_slot/nes_jf33": () => import("./nes_cart_slot/nes_jf33.js"),
    "nes_cart_slot/nes_vrc1": () => import("./nes_cart_slot/nes_vrc1.js"),
    "nes_cart_slot/nes_vrc2": () => import("./nes_cart_slot/nes_vrc2.js"),
    "nes_cart_slot/nes_vrc3": () => import("./nes_cart_slot/nes_vrc3.js"),
    "nes_cart_slot/nes_vrc4": () => import("./nes_cart_slot/nes_vrc4.js"),
    "nes_cart_slot/nes_vrc6": () => import("./nes_cart_slot/nes_vrc6.js"),
    "nes_cart_slot/nes_vrc7": () => import("./nes_cart_slot/nes_vrc7.js"),
    "nes_cart_slot/nes_namcot163": () => import("./nes_cart_slot/nes_namcot163.js"),
    "nes_cart_slot/nes_namcot175": () => import("./nes_cart_slot/nes_namcot175.js"),
    "nes_cart_slot/nes_namcot340": () => import("./nes_cart_slot/nes_namcot340.js"),
    "nes_cart_slot/nes_namcot3433": () => import("./nes_cart_slot/nes_namcot3433.js"),
    "nes_cart_slot/nes_namcot3425": () => import("./nes_cart_slot/nes_namcot3425.js"),
    "nes_cart_slot/nes_namcot3446": () => import("./nes_cart_slot/nes_namcot3446.js"),
    "nes_cart_slot/nes_sunsoft_1": () => import("./nes_cart_slot/nes_sunsoft_1.js"),
    "nes_cart_slot/nes_sunsoft_2": () => import("./nes_cart_slot/nes_sunsoft_2.js"),
    "nes_cart_slot/nes_sunsoft_3": () => import("./nes_cart_slot/nes_sunsoft_3.js"),
    "nes_cart_slot/nes_sunsoft_4": () => import("./nes_cart_slot/nes_sunsoft_4.js"),
    "nes_cart_slot/nes_sunsoft_dcs": () => import("./nes_cart_slot/nes_sunsoft_dcs.js"),
    "nes_cart_slot/nes_sunsoft_fme7": () => import("./nes_cart_slot/nes_sunsoft_fme7.js"),
    "nes_cart_slot/nes_sunsoft_5": () => import("./nes_cart_slot/nes_sunsoft_5.js"),
    "nes_cart_slot/nes_tc0190fmc": () => import("./nes_cart_slot/nes_tc0190fmc.js"),
    "nes_cart_slot/nes_tc0190fmc_pal16r4": () => import("./nes_cart_slot/nes_tc0190fmc_pal16r4.js"),
    "nes_cart_slot/nes_x1_005": () => import("./nes_cart_slot/nes_x1_005.js"),
    "nes_cart_slot/nes_x1_017": () => import("./nes_cart_slot/nes_x1_017.js"),
    "nes_cart_slot/nes_nina001": () => import("./nes_cart_slot/nes_nina001.js"),
    "nes_cart_slot/nes_nina006": () => import("./nes_cart_slot/nes_nina006.js"),
    "nes_cart_slot/nes_bf9093": () => import("./nes_cart_slot/nes_bf9093.js"),
    "nes_cart_slot/nes_bf9096": () => import("./nes_cart_slot/nes_bf9096.js"),
    "nes_cart_slot/nes_bf9096a": () => import("./nes_cart_slot/nes_bf9096a.js"),
    "nes_cart_slot/nes_golden5": () => import("./nes_cart_slot/nes_golden5.js"),
    "nes_cart_slot/nes_aladdin": () => import("./nes_cart_slot/nes_aladdin.js"),
    "nes_cart_slot/nes_cne_decathl": () => import("./nes_cart_slot/nes_cne_decathl.js"),
    "nes_cart_slot/nes_cne_fsb": () => import("./nes_cart_slot/nes_cne_fsb.js"),
    "nes_cart_slot/nes_cne_shlz": () => import("./nes_cart_slot/nes_cne_shlz.js"),
    "nes_cart_slot/nes_cocoma": () => import("./nes_cart_slot/nes_cocoma.js"),
    "nes_cart_slot/nes_nanjing": () => import("./nes_cart_slot/nes_nanjing.js"),
    "nes_cart_slot/nes_ntdec_asder": () => import("./nes_cart_slot/nes_ntdec_asder.js"),
    "nes_cart_slot/nes_ntdec_fh": () => import("./nes_cart_slot/nes_ntdec_fh.js"),
    "nes_cart_slot/nes_ntdec_n715021": () => import("./nes_cart_slot/nes_ntdec_n715021.js"),
    "nes_cart_slot/nes_jncota_kt1001": () => import("./nes_cart_slot/nes_jncota_kt1001.js"),
    "nes_cart_slot/nes_jy_typea": () => import("./nes_cart_slot/nes_jy_typea.js"),
    "nes_cart_slot/nes_jy_typeb": () => import("./nes_cart_slot/nes_jy_typeb.js"),
    "nes_cart_slot/nes_jy_typec": () => import("./nes_cart_slot/nes_jy_typec.js"),
    "nes_cart_slot/nes_sachen_sa009": () => import("./nes_cart_slot/nes_sachen_sa009.js"),
    "nes_cart_slot/nes_sachen_sa0036": () => import("./nes_cart_slot/nes_sachen_sa0036.js"),
    "nes_cart_slot/nes_sachen_sa0037": () => import("./nes_cart_slot/nes_sachen_sa0037.js"),
    "nes_cart_slot/nes_sachen_sa72007": () => import("./nes_cart_slot/nes_sachen_sa72007.js"),
    "nes_cart_slot/nes_sachen_sa72008": () => import("./nes_cart_slot/nes_sachen_sa72008.js"),
    "nes_cart_slot/nes_sachen_tca01": () => import("./nes_cart_slot/nes_sachen_tca01.js"),
    "nes_cart_slot/nes_sachen_3013": () => import("./nes_cart_slot/nes_sachen_3013.js"),
    "nes_cart_slot/nes_sachen_3014": () => import("./nes_cart_slot/nes_sachen_3014.js"),
    "nes_cart_slot/nes_sachen_8259a": () => import("./nes_cart_slot/nes_sachen_8259a.js"),
    "nes_cart_slot/nes_sachen_8259b": () => import("./nes_cart_slot/nes_sachen_8259b.js"),
    "nes_cart_slot/nes_sachen_8259c": () => import("./nes_cart_slot/nes_sachen_8259c.js"),
    "nes_cart_slot/nes_sachen_8259d": () => import("./nes_cart_slot/nes_sachen_8259d.js"),
    "nes_cart_slot/nes_sachen_74x374": () => import("./nes_cart_slot/nes_sachen_74x374.js"),
    "nes_cart_slot/nes_sachen_74x374_alt": () => import("./nes_cart_slot/nes_sachen_74x374_alt.js"),
    "nes_cart_slot/nes_sachen_tcu01": () => import("./nes_cart_slot/nes_sachen_tcu01.js"),
    "nes_cart_slot/nes_sachen_tcu02": () => import("./nes_cart_slot/nes_sachen_tcu02.js"),
    "nes_cart_slot/nes_tengen_800032": () => import("./nes_cart_slot/nes_tengen_800032.js"),
    "nes_cart_slot/nes_tengen_800037": () => import("./nes_cart_slot/nes_tengen_800037.js"),
    "nes_cart_slot/nes_txc_22110": () => import("./nes_cart_slot/nes_txc_22110.js"),
    "nes_cart_slot/nes_txc_22211": () => import("./nes_cart_slot/nes_txc_22211.js"),
    "nes_cart_slot/nes_txc_dumaracing": () => import("./nes_cart_slot/nes_txc_dumaracing.js"),
    "nes_cart_slot/nes_txc_mjblock": () => import("./nes_cart_slot/nes_txc_mjblock.js"),
    "nes_cart_slot/nes_txc_strikew": () => import("./nes_cart_slot/nes_txc_strikew.js"),
    "nes_cart_slot/nes_txc_commandos": () => import("./nes_cart_slot/nes_txc_commandos.js"),
    "nes_cart_slot/nes_waixing_a": () => import("./nes_cart_slot/nes_waixing_a.js"),
    "nes_cart_slot/nes_waixing_a1": () => import("./nes_cart_slot/nes_waixing_a1.js"),
    "nes_cart_slot/nes_waixing_b": () => import("./nes_cart_slot/nes_waixing_b.js"),
    "nes_cart_slot/nes_waixing_c": () => import("./nes_cart_slot/nes_waixing_c.js"),
    "nes_cart_slot/nes_waixing_d": () => import("./nes_cart_slot/nes_waixing_d.js"),
    "nes_cart_slot/nes_waixing_e": () => import("./nes_cart_slot/nes_waixing_e.js"),
    "nes_cart_slot/nes_waixing_f": () => import("./nes_cart_slot/nes_waixing_f.js"),
    "nes_cart_slot/nes_waixing_f1": () => import("./nes_cart_slot/nes_waixing_f1.js"),
    "nes_cart_slot/nes_waixing_g": () => import("./nes_cart_slot/nes_waixing_g.js"),
    "nes_cart_slot/nes_waixing_h": () => import("./nes_cart_slot/nes_waixing_h.js"),
    "nes_cart_slot/nes_waixing_h1": () => import("./nes_cart_slot/nes_waixing_h1.js"),
    "nes_cart_slot/nes_waixing_i": () => import("./nes_cart_slot/nes_waixing_i.js"),
    "nes_cart_slot/nes_waixing_j": () => import("./nes_cart_slot/nes_waixing_j.js"),
    "nes_cart_slot/nes_waixing_sgzlz": () => import("./nes_cart_slot/nes_waixing_sgzlz.js"),
    "nes_cart_slot/nes_waixing_sec": () => import("./nes_cart_slot/nes_waixing_sec.js"),
    "nes_cart_slot/nes_waixing_ffv": () => import("./nes_cart_slot/nes_waixing_ffv.js"),
    "nes_cart_slot/nes_waixing_wxzs": () => import("./nes_cart_slot/nes_waixing_wxzs.js"),
    "nes_cart_slot/nes_waixing_wxzs2": () => import("./nes_cart_slot/nes_waixing_wxzs2.js"),
    "nes_cart_slot/nes_waixing_dq8": () => import("./nes_cart_slot/nes_waixing_dq8.js"),
    "nes_cart_slot/nes_waixing_sh2": () => import("./nes_cart_slot/nes_waixing_sh2.js"),
    "nes_cart_slot/nes_waixing_fs304": () => import("./nes_cart_slot/nes_waixing_fs304.js"),
    "nes_cart_slot/nes_cony": () => import("./nes_cart_slot/nes_cony.js"),
    "nes_cart_slot/nes_cony1k": () => import("./nes_cart_slot/nes_cony1k.js"),
    "nes_cart_slot/nes_yoko": () => import("./nes_cart_slot/nes_yoko.js"),
    "nes_cart_slot/nes_hengg_srich": () => import("./nes_cart_slot/nes_hengg_srich.js"),
    "nes_cart_slot/nes_hengg_xhzs": () => import("./nes_cart_slot/nes_hengg_xhzs.js"),
    "nes_cart_slot/nes_hes": () => import("./nes_cart_slot/nes_hes.js"),
    "nes_cart_slot/nes_ks106c": () => import("./nes_cart_slot/nes_ks106c.js"),
    "nes_cart_slot/nes_ks202": () => import("./nes_cart_slot/nes_ks202.js"),
    "nes_cart_slot/nes_ks7010": () => import("./nes_cart_slot/nes_ks7010.js"),
    "nes_cart_slot/nes_ks7012": () => import("./nes_cart_slot/nes_ks7012.js"),
    "nes_cart_slot/nes_ks7013b": () => import("./nes_cart_slot/nes_ks7013b.js"),
    "nes_cart_slot/nes_ks7016": () => import("./nes_cart_slot/nes_ks7016.js"),
    "nes_cart_slot/nes_ks7016b": () => import("./nes_cart_slot/nes_ks7016b.js"),
    "nes_cart_slot/nes_ks7017": () => import("./nes_cart_slot/nes_ks7017.js"),
    "nes_cart_slot/nes_ks7021a": () => import("./nes_cart_slot/nes_ks7021a.js"),
    "nes_cart_slot/nes_ks7022": () => import("./nes_cart_slot/nes_ks7022.js"),
    "nes_cart_slot/nes_ks7030": () => import("./nes_cart_slot/nes_ks7030.js"),
    "nes_cart_slot/nes_ks7031": () => import("./nes_cart_slot/nes_ks7031.js"),
    "nes_cart_slot/nes_ks7032": () => import("./nes_cart_slot/nes_ks7032.js"),
    "nes_cart_slot/nes_ks7037": () => import("./nes_cart_slot/nes_ks7037.js"),
    "nes_cart_slot/nes_ks7057": () => import("./nes_cart_slot/nes_ks7057.js"),
    "nes_cart_slot/nes_ks7058": () => import("./nes_cart_slot/nes_ks7058.js"),
    "nes_cart_slot/nes_gs2015": () => import("./nes_cart_slot/nes_gs2015.js"),
    "nes_cart_slot/nes_gs2004": () => import("./nes_cart_slot/nes_gs2004.js"),
    "nes_cart_slot/nes_gs2013": () => import("./nes_cart_slot/nes_gs2013.js"),
    "nes_cart_slot/nes_tf9in1": () => import("./nes_cart_slot/nes_tf9in1.js"),
    "nes_cart_slot/nes_3dblock": () => import("./nes_cart_slot/nes_3dblock.js"),
    "nes_cart_slot/nes_racermate": () => import("./nes_cart_slot/nes_racermate.js"),
    "nes_cart_slot/nes_agci_50282": () => import("./nes_cart_slot/nes_agci_50282.js"),
    "nes_cart_slot/nes_dreamtech01": () => import("./nes_cart_slot/nes_dreamtech01.js"),
    "nes_cart_slot/nes_fukutake": () => import("./nes_cart_slot/nes_fukutake.js"),
    "nes_cart_slot/nes_futuremedia": () => import("./nes_cart_slot/nes_futuremedia.js"),
    "nes_cart_slot/nes_magseries": () => import("./nes_cart_slot/nes_magseries.js"),
    "nes_cart_slot/nes_daou306": () => import("./nes_cart_slot/nes_daou306.js"),
    "nes_cart_slot/nes_subor0": () => import("./nes_cart_slot/nes_subor0.js"),
    "nes_cart_slot/nes_subor1": () => import("./nes_cart_slot/nes_subor1.js"),
    "nes_cart_slot/nes_subor2": () => import("./nes_cart_slot/nes_subor2.js"),
    "nes_cart_slot/nes_158b": () => import("./nes_cart_slot/nes_158b.js"),
    "nes_cart_slot/nes_cc21": () => import("./nes_cart_slot/nes_cc21.js"),
    "nes_cart_slot/nes_xiaozy": () => import("./nes_cart_slot/nes_xiaozy.js"),
    "nes_cart_slot/nes_edu2k": () => import("./nes_cart_slot/nes_edu2k.js"),
    "nes_cart_slot/nes_jy830623c": () => import("./nes_cart_slot/nes_jy830623c.js"),
    "nes_cart_slot/nes_43272": () => import("./nes_cart_slot/nes_43272.js"),
    "nes_cart_slot/nes_ninjaryu": () => import("./nes_cart_slot/nes_ninjaryu.js"),
    "nes_cart_slot/nes_eh8813a": () => import("./nes_cart_slot/nes_eh8813a.js"),
    "nes_cart_slot/nes_zemina": () => import("./nes_cart_slot/nes_zemina.js"),
    "nes_cart_slot/nes_sc127": () => import("./nes_cart_slot/nes_sc127.js"),
    "nes_cart_slot/nes_mariobaby": () => import("./nes_cart_slot/nes_mariobaby.js"),
    "nes_cart_slot/nes_asn": () => import("./nes_cart_slot/nes_asn.js"),
    "nes_cart_slot/nes_smb3pirate": () => import("./nes_cart_slot/nes_smb3pirate.js"),
    "nes_cart_slot/nes_btl_contraj": () => import("./nes_cart_slot/nes_btl_contraj.js"),
    "nes_cart_slot/nes_btl_dninja": () => import("./nes_cart_slot/nes_btl_dninja.js"),
    "nes_cart_slot/nes_smb2j": () => import("./nes_cart_slot/nes_smb2j.js"),
    "nes_cart_slot/nes_smb2ja": () => import("./nes_cart_slot/nes_smb2ja.js"),
    "nes_cart_slot/nes_smb2jb": () => import("./nes_cart_slot/nes_smb2jb.js"),
    "nes_cart_slot/nes_yung08": () => import("./nes_cart_slot/nes_yung08.js"),
    "nes_cart_slot/nes_0353": () => import("./nes_cart_slot/nes_0353.js"),
    "nes_cart_slot/nes_09034a": () => import("./nes_cart_slot/nes_09034a.js"),
    "nes_cart_slot/nes_l001": () => import("./nes_cart_slot/nes_l001.js"),
    "nes_cart_slot/nes_batmanfs": () => import("./nes_cart_slot/nes_batmanfs.js"),
    "nes_cart_slot/nes_palthena": () => import("./nes_cart_slot/nes_palthena.js"),
    "nes_cart_slot/nes_tobidase": () => import("./nes_cart_slot/nes_tobidase.js"),
    "nes_cart_slot/nes_mmalee": () => import("./nes_cart_slot/nes_mmalee.js"),
    "nes_cart_slot/nes_2708": () => import("./nes_cart_slot/nes_2708.js"),
    "nes_cart_slot/nes_dh08": () => import("./nes_cart_slot/nes_dh08.js"),
    "nes_cart_slot/nes_le05": () => import("./nes_cart_slot/nes_le05.js"),
    "nes_cart_slot/nes_lg25": () => import("./nes_cart_slot/nes_lg25.js"),
    "nes_cart_slot/nes_lh10": () => import("./nes_cart_slot/nes_lh10.js"),
    "nes_cart_slot/nes_lh28_lh54": () => import("./nes_cart_slot/nes_lh28_lh54.js"),
    "nes_cart_slot/nes_lh31": () => import("./nes_cart_slot/nes_lh31.js"),
    "nes_cart_slot/nes_lh32": () => import("./nes_cart_slot/nes_lh32.js"),
    "nes_cart_slot/nes_lh42": () => import("./nes_cart_slot/nes_lh42.js"),
    "nes_cart_slot/nes_lh51": () => import("./nes_cart_slot/nes_lh51.js"),
    "nes_cart_slot/nes_lh53": () => import("./nes_cart_slot/nes_lh53.js"),
    "nes_cart_slot/nes_ac08": () => import("./nes_cart_slot/nes_ac08.js"),
    "nes_cart_slot/nes_rt01": () => import("./nes_cart_slot/nes_rt01.js"),
    "nes_cart_slot/nes_rex_dbz5": () => import("./nes_cart_slot/nes_rex_dbz5.js"),
    "nes_cart_slot/nes_rex_sl1632": () => import("./nes_cart_slot/nes_rex_sl1632.js"),
    "nes_cart_slot/nes_somari": () => import("./nes_cart_slot/nes_somari.js"),
    "nes_cart_slot/nes_huang2": () => import("./nes_cart_slot/nes_huang2.js"),
    "nes_cart_slot/nes_nitra": () => import("./nes_cart_slot/nes_nitra.js"),
    "nes_cart_slot/nes_bmw8544": () => import("./nes_cart_slot/nes_bmw8544.js"),
    "nes_cart_slot/nes_fs6": () => import("./nes_cart_slot/nes_fs6.js"),
    "nes_cart_slot/nes_sbros11": () => import("./nes_cart_slot/nes_sbros11.js"),
    "nes_cart_slot/nes_malisb": () => import("./nes_cart_slot/nes_malisb.js"),
    "nes_cart_slot/nes_family4646": () => import("./nes_cart_slot/nes_family4646.js"),
    "nes_cart_slot/nes_pikay2k": () => import("./nes_cart_slot/nes_pikay2k.js"),
    "nes_cart_slot/nes_8237a": () => import("./nes_cart_slot/nes_8237a.js"),
    "nes_cart_slot/nes_sg_lionk": () => import("./nes_cart_slot/nes_sg_lionk.js"),
    "nes_cart_slot/nes_sg_boog": () => import("./nes_cart_slot/nes_sg_boog.js"),
    "nes_cart_slot/nes_kasing": () => import("./nes_cart_slot/nes_kasing.js"),
    "nes_cart_slot/nes_kay": () => import("./nes_cart_slot/nes_kay.js"),
    "nes_cart_slot/nes_h2288": () => import("./nes_cart_slot/nes_h2288.js"),
    "nes_cart_slot/nes_6035052": () => import("./nes_cart_slot/nes_6035052.js"),
    "nes_cart_slot/nes_txc_tw": () => import("./nes_cart_slot/nes_txc_tw.js"),
    "nes_cart_slot/nes_kof97": () => import("./nes_cart_slot/nes_kof97.js"),
    "nes_cart_slot/nes_kof96": () => import("./nes_cart_slot/nes_kof96.js"),
    "nes_cart_slot/nes_sf3": () => import("./nes_cart_slot/nes_sf3.js"),
    "nes_cart_slot/nes_gouder": () => import("./nes_cart_slot/nes_gouder.js"),
    "nes_cart_slot/nes_sa9602b": () => import("./nes_cart_slot/nes_sa9602b.js"),
    "nes_cart_slot/nes_sachen_shero": () => import("./nes_cart_slot/nes_sachen_shero.js"),
    "nes_cart_slot/nes_sachen_zgdh": () => import("./nes_cart_slot/nes_sachen_zgdh.js"),
    "nes_cart_slot/nes_a9746": () => import("./nes_cart_slot/nes_a9746.js"),
    "nes_cart_slot/nes_2yudb": () => import("./nes_cart_slot/nes_2yudb.js"),
    "nes_cart_slot/nes_900218": () => import("./nes_cart_slot/nes_900218.js"),
    "nes_cart_slot/nes_ax40g": () => import("./nes_cart_slot/nes_ax40g.js"),
    "nes_cart_slot/nes_ax5705": () => import("./nes_cart_slot/nes_ax5705.js"),
    "nes_cart_slot/nes_bmc_830506c": () => import("./nes_cart_slot/nes_bmc_830506c.js"),
    "nes_cart_slot/nes_bmc_831128c": () => import("./nes_cart_slot/nes_bmc_831128c.js"),
    "nes_cart_slot/nes_bmc_kl06": () => import("./nes_cart_slot/nes_bmc_kl06.js"),
    "nes_cart_slot/nes_cityfight": () => import("./nes_cart_slot/nes_cityfight.js"),
    "nes_cart_slot/nes_hengg_shjy3": () => import("./nes_cart_slot/nes_hengg_shjy3.js"),
    "nes_cart_slot/nes_shuiguan": () => import("./nes_cart_slot/nes_shuiguan.js"),
    "nes_cart_slot/nes_t230": () => import("./nes_cart_slot/nes_t230.js"),
    "nes_cart_slot/nes_tf1201": () => import("./nes_cart_slot/nes_tf1201.js"),
    "nes_cart_slot/nes_th21311": () => import("./nes_cart_slot/nes_th21311.js"),
    "nes_cart_slot/nes_waixing_sgz": () => import("./nes_cart_slot/nes_waixing_sgz.js"),
    "nes_cart_slot/nes_benshieng": () => import("./nes_cart_slot/nes_benshieng.js"),
    "nes_cart_slot/nes_action52": () => import("./nes_cart_slot/nes_action52.js"),
    "nes_cart_slot/nes_caltron6in1": () => import("./nes_cart_slot/nes_caltron6in1.js"),
    "nes_cart_slot/nes_caltron9in1": () => import("./nes_cart_slot/nes_caltron9in1.js"),
    "nes_cart_slot/nes_maxi15": () => import("./nes_cart_slot/nes_maxi15.js"),
    "nes_cart_slot/nes_rumblestation": () => import("./nes_cart_slot/nes_rumblestation.js"),
    "nes_cart_slot/nes_svision16": () => import("./nes_cart_slot/nes_svision16.js"),
    "nes_cart_slot/nes_kn42": () => import("./nes_cart_slot/nes_kn42.js"),
    "nes_cart_slot/nes_n625092": () => import("./nes_cart_slot/nes_n625092.js"),
    "nes_cart_slot/nes_a65as": () => import("./nes_cart_slot/nes_a65as.js"),
    "nes_cart_slot/nes_t262": () => import("./nes_cart_slot/nes_t262.js"),
    "nes_cart_slot/nes_studyngame": () => import("./nes_cart_slot/nes_studyngame.js"),
    "nes_cart_slot/nes_supergun20in1": () => import("./nes_cart_slot/nes_supergun20in1.js"),
    "nes_cart_slot/nes_vt5201": () => import("./nes_cart_slot/nes_vt5201.js"),
    "nes_cart_slot/nes_bmc_60311c": () => import("./nes_cart_slot/nes_bmc_60311c.js"),
    "nes_cart_slot/nes_bmc_80013b": () => import("./nes_cart_slot/nes_bmc_80013b.js"),
    "nes_cart_slot/nes_bmc_810544c": () => import("./nes_cart_slot/nes_bmc_810544c.js"),
    "nes_cart_slot/nes_bmc_82ab": () => import("./nes_cart_slot/nes_bmc_82ab.js"),
    "nes_cart_slot/nes_bmc_830425c": () => import("./nes_cart_slot/nes_bmc_830425c.js"),
    "nes_cart_slot/nes_bmc_830928c": () => import("./nes_cart_slot/nes_bmc_830928c.js"),
    "nes_cart_slot/nes_bmc_850437c": () => import("./nes_cart_slot/nes_bmc_850437c.js"),
    "nes_cart_slot/nes_bmc_891227": () => import("./nes_cart_slot/nes_bmc_891227.js"),
    "nes_cart_slot/nes_bmc_970630c": () => import("./nes_cart_slot/nes_bmc_970630c.js"),
    "nes_cart_slot/nes_bmc_jy012005": () => import("./nes_cart_slot/nes_bmc_jy012005.js"),
    "nes_cart_slot/nes_bmc_jy820845c": () => import("./nes_cart_slot/nes_bmc_jy820845c.js"),
    "nes_cart_slot/nes_srpg_5in1": () => import("./nes_cart_slot/nes_srpg_5in1.js"),
    "nes_cart_slot/nes_n32_4in1": () => import("./nes_cart_slot/nes_n32_4in1.js"),
    "nes_cart_slot/nes_ntd03": () => import("./nes_cart_slot/nes_ntd03.js"),
    "nes_cart_slot/nes_bmc_ctc09": () => import("./nes_cart_slot/nes_bmc_ctc09.js"),
    "nes_cart_slot/nes_bmc_ctc12in1": () => import("./nes_cart_slot/nes_bmc_ctc12in1.js"),
    "nes_cart_slot/nes_bmc_ds927": () => import("./nes_cart_slot/nes_bmc_ds927.js"),
    "nes_cart_slot/nes_bmc_fam250": () => import("./nes_cart_slot/nes_bmc_fam250.js"),
    "nes_cart_slot/nes_bmc_gka": () => import("./nes_cart_slot/nes_bmc_gka.js"),
    "nes_cart_slot/nes_bmc_gkb": () => import("./nes_cart_slot/nes_bmc_gkb.js"),
    "nes_cart_slot/nes_bmc_gkcxin1": () => import("./nes_cart_slot/nes_bmc_gkcxin1.js"),
    "nes_cart_slot/nes_bmc_gn91b": () => import("./nes_cart_slot/nes_bmc_gn91b.js"),
    "nes_cart_slot/nes_bmc_hp898f": () => import("./nes_cart_slot/nes_bmc_hp898f.js"),
    "nes_cart_slot/nes_bmc_k1029": () => import("./nes_cart_slot/nes_bmc_k1029.js"),
    "nes_cart_slot/nes_bmc_k3006": () => import("./nes_cart_slot/nes_bmc_k3006.js"),
    "nes_cart_slot/nes_bmc_k3033": () => import("./nes_cart_slot/nes_bmc_k3033.js"),
    "nes_cart_slot/nes_bmc_k3036": () => import("./nes_cart_slot/nes_bmc_k3036.js"),
    "nes_cart_slot/nes_bmc_k3046": () => import("./nes_cart_slot/nes_bmc_k3046.js"),
    "nes_cart_slot/nes_bmc_k3071": () => import("./nes_cart_slot/nes_bmc_k3071.js"),
    "nes_cart_slot/nes_bmc_s009": () => import("./nes_cart_slot/nes_bmc_s009.js"),
    "nes_cart_slot/nes_bmc_sa005a": () => import("./nes_cart_slot/nes_bmc_sa005a.js"),
    "nes_cart_slot/nes_bmc_tf2740": () => import("./nes_cart_slot/nes_bmc_tf2740.js"),
    "nes_cart_slot/nes_bmc_th2348": () => import("./nes_cart_slot/nes_bmc_th2348.js"),
    "nes_cart_slot/nes_bmc_tj03": () => import("./nes_cart_slot/nes_bmc_tj03.js"),
    "nes_cart_slot/nes_bmc_ws": () => import("./nes_cart_slot/nes_bmc_ws.js"),
    "nes_cart_slot/nes_bmc_g146": () => import("./nes_cart_slot/nes_bmc_g146.js"),
    "nes_cart_slot/nes_bmc_11160": () => import("./nes_cart_slot/nes_bmc_11160.js"),
    "nes_cart_slot/nes_bmc_2751": () => import("./nes_cart_slot/nes_bmc_2751.js"),
    "nes_cart_slot/nes_bmc_8157": () => import("./nes_cart_slot/nes_bmc_8157.js"),
    "nes_cart_slot/nes_bmc_hik300": () => import("./nes_cart_slot/nes_bmc_hik300.js"),
    "nes_cart_slot/nes_bmc_s700": () => import("./nes_cart_slot/nes_bmc_s700.js"),
    "nes_cart_slot/nes_bmc_ball11": () => import("./nes_cart_slot/nes_bmc_ball11.js"),
    "nes_cart_slot/nes_bmc_22games": () => import("./nes_cart_slot/nes_bmc_22games.js"),
    "nes_cart_slot/nes_bmc_64y2k": () => import("./nes_cart_slot/nes_bmc_64y2k.js"),
    "nes_cart_slot/nes_bmc_420y2k": () => import("./nes_cart_slot/nes_bmc_420y2k.js"),
    "nes_cart_slot/nes_bmc_12in1": () => import("./nes_cart_slot/nes_bmc_12in1.js"),
    "nes_cart_slot/nes_bmc_20in1": () => import("./nes_cart_slot/nes_bmc_20in1.js"),
    "nes_cart_slot/nes_bmc_21in1": () => import("./nes_cart_slot/nes_bmc_21in1.js"),
    "nes_cart_slot/nes_bmc_31in1": () => import("./nes_cart_slot/nes_bmc_31in1.js"),
    "nes_cart_slot/nes_bmc_35in1": () => import("./nes_cart_slot/nes_bmc_35in1.js"),
    "nes_cart_slot/nes_bmc_36in1": () => import("./nes_cart_slot/nes_bmc_36in1.js"),
    "nes_cart_slot/nes_bmc_64in1": () => import("./nes_cart_slot/nes_bmc_64in1.js"),
    "nes_cart_slot/nes_bmc_70in1": () => import("./nes_cart_slot/nes_bmc_70in1.js"),
    "nes_cart_slot/nes_bmc_72in1": () => import("./nes_cart_slot/nes_bmc_72in1.js"),
    "nes_cart_slot/nes_bmc_76in1": () => import("./nes_cart_slot/nes_bmc_76in1.js"),
    "nes_cart_slot/nes_bmc_150in1": () => import("./nes_cart_slot/nes_bmc_150in1.js"),
    "nes_cart_slot/nes_bmc_190in1": () => import("./nes_cart_slot/nes_bmc_190in1.js"),
    "nes_cart_slot/nes_bmc_500in1": () => import("./nes_cart_slot/nes_bmc_500in1.js"),
    "nes_cart_slot/nes_bmc_800in1": () => import("./nes_cart_slot/nes_bmc_800in1.js"),
    "nes_cart_slot/nes_bmc_1200in1": () => import("./nes_cart_slot/nes_bmc_1200in1.js"),
    "nes_cart_slot/nes_bmc_gold260": () => import("./nes_cart_slot/nes_bmc_gold260.js"),
    "nes_cart_slot/nes_bmc_th22913": () => import("./nes_cart_slot/nes_bmc_th22913.js"),
    "nes_cart_slot/nes_bmc_4in1reset": () => import("./nes_cart_slot/nes_bmc_4in1reset.js"),
    "nes_cart_slot/nes_bmc_42in1reset": () => import("./nes_cart_slot/nes_bmc_42in1reset.js"),
    "nes_cart_slot/nes_bmc_nc20mb": () => import("./nes_cart_slot/nes_bmc_nc20mb.js"),
    "nes_cart_slot/nes_bmc_lc160": () => import("./nes_cart_slot/nes_bmc_lc160.js"),
    "nes_cart_slot/nes_resetsxrom": () => import("./nes_cart_slot/nes_resetsxrom.js"),
    "nes_cart_slot/nes_a88s1": () => import("./nes_cart_slot/nes_a88s1.js"),
    "nes_cart_slot/nes_bmc_el86xc": () => import("./nes_cart_slot/nes_bmc_el86xc.js"),
    "nes_cart_slot/nes_fk23c": () => import("./nes_cart_slot/nes_fk23c.js"),
    "nes_cart_slot/nes_fk23ca": () => import("./nes_cart_slot/nes_fk23ca.js"),
    "nes_cart_slot/nes_nt639": () => import("./nes_cart_slot/nes_nt639.js"),
    "nes_cart_slot/nes_resettxrom": () => import("./nes_cart_slot/nes_resettxrom.js"),
    "nes_cart_slot/nes_s24in1sc03": () => import("./nes_cart_slot/nes_s24in1sc03.js"),
    "nes_cart_slot/nes_smd133": () => import("./nes_cart_slot/nes_smd133.js"),
    "nes_cart_slot/nes_techline9in1": () => import("./nes_cart_slot/nes_techline9in1.js"),
    "nes_cart_slot/nes_bmc_5in1": () => import("./nes_cart_slot/nes_bmc_5in1.js"),
    "nes_cart_slot/nes_bmc_8in1": () => import("./nes_cart_slot/nes_bmc_8in1.js"),
    "nes_cart_slot/nes_bmc_15in1": () => import("./nes_cart_slot/nes_bmc_15in1.js"),
    "nes_cart_slot/nes_bmc_sbig7": () => import("./nes_cart_slot/nes_bmc_sbig7.js"),
    "nes_cart_slot/nes_bmc_hik8": () => import("./nes_cart_slot/nes_bmc_hik8.js"),
    "nes_cart_slot/nes_bmc_jy208": () => import("./nes_cart_slot/nes_bmc_jy208.js"),
    "nes_cart_slot/nes_bmc_jy302": () => import("./nes_cart_slot/nes_bmc_jy302.js"),
    "nes_cart_slot/nes_bmc_kc885": () => import("./nes_cart_slot/nes_bmc_kc885.js"),
    "nes_cart_slot/nes_bmc_sfc12": () => import("./nes_cart_slot/nes_bmc_sfc12.js"),
    "nes_cart_slot/nes_bmc_hik4": () => import("./nes_cart_slot/nes_bmc_hik4.js"),
    "nes_cart_slot/nes_bmc_f15": () => import("./nes_cart_slot/nes_bmc_f15.js"),
    "nes_cart_slot/nes_bmc_f600": () => import("./nes_cart_slot/nes_bmc_f600.js"),
    "nes_cart_slot/nes_bmc_gn45": () => import("./nes_cart_slot/nes_bmc_gn45.js"),
    "nes_cart_slot/nes_bmc_gold7in1": () => import("./nes_cart_slot/nes_bmc_gold7in1.js"),
    "nes_cart_slot/nes_bmc_l6in1": () => import("./nes_cart_slot/nes_bmc_l6in1.js"),
    "nes_cart_slot/nes_bmc_00202650": () => import("./nes_cart_slot/nes_bmc_00202650.js"),
    "nes_cart_slot/nes_bmc_411120c": () => import("./nes_cart_slot/nes_bmc_411120c.js"),
    "nes_cart_slot/nes_bmc_810305c": () => import("./nes_cart_slot/nes_bmc_810305c.js"),
    "nes_cart_slot/nes_bmc_820720c": () => import("./nes_cart_slot/nes_bmc_820720c.js"),
    "nes_cart_slot/nes_bmc_830118c": () => import("./nes_cart_slot/nes_bmc_830118c.js"),
    "nes_cart_slot/nes_bmc_830832c": () => import("./nes_cart_slot/nes_bmc_830832c.js"),
    "nes_cart_slot/nes_bmc_yy841101c": () => import("./nes_cart_slot/nes_bmc_yy841101c.js"),
    "nes_cart_slot/nes_bmc_yy841155c": () => import("./nes_cart_slot/nes_bmc_yy841155c.js"),
    "nes_cart_slot/nes_pjoy84": () => import("./nes_cart_slot/nes_pjoy84.js"),
    "nes_cart_slot/nes_nochr": () => import("./nes_cart_slot/nes_nochr.js"),
    "nes_cart_slot/nes_action53": () => import("./nes_cart_slot/nes_action53.js"),
    "nes_cart_slot/nes_batmap_000": () => import("./nes_cart_slot/nes_batmap_000.js"),
    "nes_cart_slot/nes_batmap_srrx": () => import("./nes_cart_slot/nes_batmap_srrx.js"),
    "nes_cart_slot/nes_8bitxmas": () => import("./nes_cart_slot/nes_8bitxmas.js"),
    "nes_cart_slot/nes_cufrom": () => import("./nes_cart_slot/nes_cufrom.js"),
    "nes_cart_slot/nes_dpcmcart": () => import("./nes_cart_slot/nes_dpcmcart.js"),
    "nes_cart_slot/nes_unrom512": () => import("./nes_cart_slot/nes_unrom512.js"),
    "nes_cart_slot/nes_2a03puritans": () => import("./nes_cart_slot/nes_2a03puritans.js"),
    "nes_cart_slot/nes_farid_slrom": () => import("./nes_cart_slot/nes_farid_slrom.js"),
    "nes_cart_slot/nes_farid_unrom": () => import("./nes_cart_slot/nes_farid_unrom.js"),
    "nes_cart_slot/nes_ffe3": () => import("./nes_cart_slot/nes_ffe3.js"),
    "nes_cart_slot/nes_ffe4": () => import("./nes_cart_slot/nes_ffe4.js"),
    "nes_cart_slot/nes_ffe8": () => import("./nes_cart_slot/nes_ffe8.js"),
};
export const device = definition;
export default device;
