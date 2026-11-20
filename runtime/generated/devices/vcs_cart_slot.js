import deviceData from './vcs_cart_slot.device.ir.json' with { type: 'json' };
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
    function method_get_cart_type(runtime) {
        const members = runtime.members;
        const h_m_type = members.m_type ?? 0;
        return ((h_m_type) | 0);
    }
    function method_vcs_cart_slot_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_cart_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return "a2600_cart";
    }
    function method_vcs_cart_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return "bin,a26";
    }
    function method_vcs_cart_slot_device__get_cart_type(runtime) {
        const members = runtime.members;
        const h_m_type = members.m_type ?? 0;
        return ((h_m_type) | 0);
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
        "get_cart_type": method_get_cart_type,
        "vcs_cart_slot_device::is_reset_on_load": method_vcs_cart_slot_device__is_reset_on_load,
        "vcs_cart_slot_device::image_interface": method_vcs_cart_slot_device__image_interface,
        "vcs_cart_slot_device::file_extensions": method_vcs_cart_slot_device__file_extensions,
        "vcs_cart_slot_device::get_cart_type": method_vcs_cart_slot_device__get_cart_type
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["rom_software_list_loader::instance"];
definition.slot.options["a26_2k_4k"].compiledMethods = (() => {
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
    function method_install_memory_handlers(runtime, space) {
        const members = runtime.members;
        if (((((members.m_rom_size ?? 0)) < (4096)) ? 1 : 0)) {
            (__deref_install_memory_handlers(runtime, space).install_rom?.(4096, 6143, 2048, method_get_rom_base(runtime)) ?? 0);
        }
        else {
            (__deref_install_memory_handlers(runtime, space).install_rom?.(4096, 8191, method_get_rom_base(runtime)) ?? 0);
        }
    }
    function __deref_install_memory_handlers(runtime, p) {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "install_memory_handlers": method_install_memory_handlers,
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
    return __methodTable;
})();
definition.slot.options["a26_f4"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.(offset) ?? 0);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((7) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f4_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((7) & 0xff);
    }
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8180), 0);
        }
    }
    function method_a26_rom_f6_device__install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8182), 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "is_ram_present": method_is_ram_present,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "a26_rom_f4_device::get_start_bank": method_a26_rom_f4_device__get_start_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "a26_rom_f6_device::install_memory_handlers__lambda0": method_a26_rom_f6_device__install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_f4"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_f6"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.(offset) ?? 0);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8182), 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "is_ram_present": method_is_ram_present,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_f6"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_f8"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.(offset) ?? 0);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8184), 0);
        }
    }
    function method_a26_rom_f6_device__install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8182), 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "is_ram_present": method_is_ram_present,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "a26_rom_f6_device::install_memory_handlers__lambda0": method_a26_rom_f6_device__install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_f8"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_f8sw"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.(offset) ?? 0);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((1) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f8_sw_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((1) & 0xff);
    }
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8184), 0);
        }
    }
    function method_a26_rom_f6_device__install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8182), 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "is_ram_present": method_is_ram_present,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "a26_rom_f8_sw_device::get_start_bank": method_a26_rom_f8_sw_device__get_start_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "a26_rom_f6_device::install_memory_handlers__lambda0": method_a26_rom_f6_device__install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_f8sw"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_fa"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.(offset) ?? 0);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8184), 0);
        }
    }
    function method_a26_rom_f6_device__install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8182), 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "a26_rom_f6_device::install_memory_handlers__lambda0": method_a26_rom_f6_device__install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_fa"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_fe"].compiledMethods = (() => {
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
    function method_install_memory_handlers(runtime, space) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_bank = members.m_bank ?? 0;
        (__deref_install_memory_handlers(runtime, members.m_bank).configure_entries?.(0, 8, method_get_rom_base(runtime), 4096) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_read_bank?.(4096, 8191, h_m_bank) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_readwrite_tap?.(510, 510, "trigger_bank", ((unused0, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_trigger_bank(runtime);
            }
        }), ((unused0, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_trigger_bank(runtime);
            }
        })) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_read_tap?.(511, 511, "switch_bank1", ((unused0, data, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_switch_bank(runtime, data);
            }
        })) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_read_tap?.(4096, 8191, "switch_bank2", ((unused0, data, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_switch_bank(runtime, data);
            }
        })) ?? 0);
    }
    function __deref_install_memory_handlers(runtime, p) {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_trigger_on_next_access ?? 0)) {
            (__deref_switch_bank(runtime, members.m_bank).set_entry?.((((((data) >>> (5)) & 1)) ? (0) : (1))) ?? 0);
            members.m_trigger_on_next_access = ((0) ? 1 : 0);
        }
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_install_memory_handlers__lambda0(runtime, __unnamed0, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_trigger_bank(runtime);
        }
    }
    function method_trigger_bank(runtime) {
        const members = runtime.members;
        if ((members.m_ignore_first_read ?? 0)) {
            members.m_ignore_first_read = ((0) ? 1 : 0);
        }
        else {
            members.m_trigger_on_next_access = ((1) ? 1 : 0);
        }
    }
    function method_install_memory_handlers__lambda1(runtime, __unnamed0, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_trigger_bank(runtime);
        }
    }
    function method_install_memory_handlers__lambda2(runtime, __unnamed0, data, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, data);
        }
    }
    function method_install_memory_handlers__lambda3(runtime, __unnamed0, data, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, data);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "install_memory_handlers": method_install_memory_handlers,
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "trigger_bank": method_trigger_bank,
        "install_memory_handlers__lambda1": method_install_memory_handlers__lambda1,
        "install_memory_handlers__lambda2": method_install_memory_handlers__lambda2,
        "install_memory_handlers__lambda3": method_install_memory_handlers__lambda3
    };
    return __methodTable;
})();
definition.slot.options["a26_fe"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_3e"].compiledMethods = (() => {
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
    function method_install_memory_handlers(runtime, space) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_view = members.m_view ?? 0;
        const h_m_rom_bank = members.m_rom_bank ?? 0;
        const h_m_ram_bank = members.m_ram_bank ?? 0;
        members.m_rom_bank_mask = ((((runtime.divide(method_get_rom_size(runtime), 2048)) - (1))) & 0xff);
        members.m_ram_bank_mask = ((((runtime.divide(method_get_ram_size(runtime), 1024)) - (1))) & 0xff);
        (__deref_install_memory_handlers(runtime, members.m_rom_bank).configure_entries?.(0, (((members.m_rom_bank_mask ?? 0)) + (1)), method_get_rom_base(runtime), 2048) ?? 0);
        (__deref_install_memory_handlers(runtime, members.m_ram_bank).configure_entries?.(0, (((members.m_ram_bank_mask ?? 0)) + (1)), method_get_ram_base(runtime), 1024) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_view?.(4096, 6143, h_m_view) ?? 0);
        (__deref_install_memory_handlers(runtime, runtime.readIndex(h_m_view, 0)).install_read_bank?.(4096, 6143, h_m_rom_bank) ?? 0);
        (__deref_install_memory_handlers(runtime, runtime.readIndex(h_m_view, 1)).install_read_bank?.(4096, 6143, h_m_rom_bank) ?? 0);
        (__deref_install_memory_handlers(runtime, runtime.readIndex(h_m_view, 1)).install_read_bank?.(4096, 5119, h_m_ram_bank) ?? 0);
        (__deref_install_memory_handlers(runtime, runtime.readIndex(h_m_view, 1)).install_write_bank?.(5120, 6143, h_m_ram_bank) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_rom?.(6144, 8191, __add_install_memory_handlers(runtime, method_get_rom_base(runtime), (((members.m_rom_bank_mask ?? 0)) * (2048)))) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_write_tap?.(62, 62, "ram_bank", ((address, data, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_select_ram_bank(runtime, address, data);
            }
        })) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_write_tap?.(63, 63, "rom_bank", ((address, data, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_select_rom_bank(runtime, address, data);
            }
        })) ?? 0);
    }
    function __add_install_memory_handlers(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_install_memory_handlers(runtime, p) {
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
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_install_memory_handlers__lambda0(runtime, address, data, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_select_ram_bank(runtime, address, data);
        }
    }
    function method_select_ram_bank(runtime, address, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_select_ram_bank(runtime, members.m_ram_bank).set_entry?.(((data) & ((members.m_ram_bank_mask ?? 0)))) ?? 0);
        (__deref_select_ram_bank(runtime, members.m_view).select?.(1) ?? 0);
    }
    function __deref_select_ram_bank(runtime, p) {
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
    function method_install_memory_handlers__lambda1(runtime, address, data, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_select_rom_bank(runtime, address, data);
        }
    }
    function method_select_rom_bank(runtime, address, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_select_rom_bank(runtime, members.m_rom_bank).set_entry?.(((data) & ((members.m_rom_bank_mask ?? 0)))) ?? 0);
        (__deref_select_rom_bank(runtime, members.m_view).select?.(0) ?? 0);
    }
    function __deref_select_rom_bank(runtime, p) {
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
        "install_memory_handlers": method_install_memory_handlers,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "select_ram_bank": method_select_ram_bank,
        "install_memory_handlers__lambda1": method_install_memory_handlers__lambda1,
        "select_rom_bank": method_select_rom_bank
    };
    return __methodTable;
})();
definition.slot.options["a26_3e"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_3f"].compiledMethods = (() => {
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
    function method_install_memory_handlers(runtime, space) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_bank = members.m_bank ?? 0;
        members.m_bank_mask = ((((runtime.divide(method_get_rom_size(runtime), 2048)) - (1))) & 0xff);
        (__deref_install_memory_handlers(runtime, members.m_bank).configure_entries?.(0, runtime.divide(method_get_rom_size(runtime), 2048), method_get_rom_base(runtime), 2048) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_read_bank?.(4096, 6143, h_m_bank) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_rom?.(6144, 8191, __add_install_memory_handlers(runtime, method_get_rom_base(runtime), (((members.m_bank_mask ?? 0)) * (2048)))) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_write_tap?.(0, 63, "bank", ((offset, data, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_select_bank(runtime, offset, data);
            }
        })) ?? 0);
    }
    function __add_install_memory_handlers(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_install_memory_handlers(runtime, p) {
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
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_select_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_select_bank(runtime, members.m_bank).set_entry?.(((data) & ((members.m_bank_mask ?? 0)))) ?? 0);
    }
    function __deref_select_bank(runtime, p) {
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
    function method_install_memory_handlers__lambda0(runtime, offset, data, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_select_bank(runtime, offset, data);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "install_memory_handlers": method_install_memory_handlers,
        "get_rom_size": method_get_rom_size,
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "select_bank": method_select_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_3f"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_e0"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank_0(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank = members.m_bank ?? 0;
        (__deref_switch_bank_0(runtime, h_m_bank[0]).set_entry?.(((offset) & (7))) ?? 0);
    }
    function __deref_switch_bank_0(runtime, p) {
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
    function method_switch_bank_1(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank = members.m_bank ?? 0;
        (__deref_switch_bank_1(runtime, h_m_bank[1]).set_entry?.(((offset) & (7))) ?? 0);
    }
    function __deref_switch_bank_1(runtime, p) {
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
    function method_switch_bank_2(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank = members.m_bank ?? 0;
        (__deref_switch_bank_2(runtime, h_m_bank[2]).set_entry?.(((offset) & (7))) ?? 0);
    }
    function __deref_switch_bank_2(runtime, p) {
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
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank_0(runtime, address, 0);
        }
    }
    function method_install_memory_handlers__lambda1(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank_1(runtime, address, 0);
        }
    }
    function method_install_memory_handlers__lambda2(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank_2(runtime, address, 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank_0": method_switch_bank_0,
        "switch_bank_1": method_switch_bank_1,
        "switch_bank_2": method_switch_bank_2,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "install_memory_handlers__lambda1": method_install_memory_handlers__lambda1,
        "install_memory_handlers__lambda2": method_install_memory_handlers__lambda2
    };
    return __methodTable;
})();
definition.slot.options["a26_e0"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_e7"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_rom_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_rom_bank(runtime, members.m_view).select?.((((((offset) === (7)) ? 1 : 0)) ? (1) : (0))) ?? 0);
        (__deref_switch_rom_bank(runtime, members.m_rom_bank).set_entry?.(offset) ?? 0);
    }
    function __deref_switch_rom_bank(runtime, p) {
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
    function method_switch_ram_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_ram_bank(runtime, members.m_hi_ram_bank).set_entry?.(offset) ?? 0);
    }
    function __deref_switch_ram_bank(runtime, p) {
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
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_rom_bank(runtime, runtime.subtract(address, 8160), 0);
        }
    }
    function method_install_memory_handlers__lambda1(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_ram_bank(runtime, runtime.subtract(address, 8168), 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_rom_bank": method_switch_rom_bank,
        "switch_ram_bank": method_switch_ram_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "install_memory_handlers__lambda1": method_install_memory_handlers__lambda1
    };
    return __methodTable;
})();
definition.slot.options["a26_e7"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_ua"].compiledMethods = (() => {
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
    function method_install_memory_handlers(runtime, space) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_bank = members.m_bank ?? 0;
        (__deref_install_memory_handlers(runtime, members.m_bank).configure_entries?.(0, 2, method_get_rom_base(runtime), 4096) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_read_bank?.(4096, 8191, h_m_bank) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_readwrite_tap?.(512, 639, "bank", ((offset, data, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank(runtime, offset);
            }
        }), ((offset, data, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank(runtime, offset);
            }
        })) ?? 0);
    }
    function __deref_install_memory_handlers(runtime, p) {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_change_bank(runtime, offset) {
        const members = runtime.members;
        (__deref_change_bank(runtime, members.m_bank).set_entry?.(((((offset) >>> (6))) & (1))) ?? 0);
    }
    function __deref_change_bank(runtime, p) {
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
    function method_install_memory_handlers__lambda0(runtime, offset, data, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank(runtime, offset);
        }
    }
    function method_install_memory_handlers__lambda1(runtime, offset, data, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank(runtime, offset);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "install_memory_handlers": method_install_memory_handlers,
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "change_bank": method_change_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "install_memory_handlers__lambda1": method_install_memory_handlers__lambda1
    };
    return __methodTable;
})();
definition.slot.options["a26_ua"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_cv"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
    return __methodTable;
})();
definition.slot.options["a26_dc"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_read_current_bank(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_read_current_bank(runtime, members.m_bank), typeof __t0.entry === 'function' ? __t0.entry() : typeof __t0.entry === 'number' || typeof __t0.entry === 'boolean' ? __t0.entry : runtime.container(members.m_bank, "entry"))) & 0xff);
    }
    function __deref_read_current_bank(runtime, p) {
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
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.(((__add_switch_bank(runtime, (__t0 = __deref_switch_bank(runtime, members.m_bank), typeof __t0.entry === 'function' ? __t0.entry() : typeof __t0.entry === 'number' || typeof __t0.entry === 'boolean' ? __t0.entry : runtime.container(members.m_bank, "entry")), 1)) & (15))) ?? 0);
    }
    function __add_switch_bank(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, 0, 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read_current_bank": method_read_current_bank,
        "switch_bank": method_switch_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_dc"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_fv"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.(1) ?? 0);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_install_memory_handlers__lambda0(runtime, __unnamed0, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, 0, 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_fv"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_jvp"].compiledMethods = (() => {
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
    function method_install_memory_handlers(runtime, space) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_bank = members.m_bank ?? 0;
        (__deref_install_memory_handlers(runtime, members.m_bank).configure_entries?.(0, 2, method_get_rom_base(runtime), 4096) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_read_bank?.(4096, 8191, h_m_bank) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_readwrite_tap?.(4000, 4000, "bank_fa0", ((unused0, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank(runtime);
            }
        }), ((unused0, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank(runtime);
            }
        })) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_readwrite_tap?.(4032, 4032, "bank_fc0", ((unused0, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank(runtime);
            }
        }), ((unused0, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank(runtime);
            }
        })) ?? 0);
    }
    function __deref_install_memory_handlers(runtime, p) {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_install_memory_handlers__lambda0(runtime, __unnamed0, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank(runtime);
        }
    }
    function method_change_bank(runtime) {
        const members = runtime.members;
        let __t0;
        (__deref_change_bank(runtime, members.m_bank).set_entry?.((((__t0 = __deref_change_bank(runtime, members.m_bank), typeof __t0.entry === 'function' ? __t0.entry() : typeof __t0.entry === 'number' || typeof __t0.entry === 'boolean' ? __t0.entry : runtime.container(members.m_bank, "entry"))) ^ (1))) ?? 0);
    }
    function __deref_change_bank(runtime, p) {
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
    function method_install_memory_handlers__lambda1(runtime, __unnamed0, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank(runtime);
        }
    }
    function method_install_memory_handlers__lambda2(runtime, __unnamed0, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank(runtime);
        }
    }
    function method_install_memory_handlers__lambda3(runtime, __unnamed0, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank(runtime);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "install_memory_handlers": method_install_memory_handlers,
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "change_bank": method_change_bank,
        "install_memory_handlers__lambda1": method_install_memory_handlers__lambda1,
        "install_memory_handlers__lambda2": method_install_memory_handlers__lambda2,
        "install_memory_handlers__lambda3": method_install_memory_handlers__lambda3
    };
    return __methodTable;
})();
definition.slot.options["a26_jvp"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_cm"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
    return __methodTable;
})();
definition.slot.options["a26_ss"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_read_lo(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        const h_m_base_banks = members.m_base_banks ?? 0;
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if ((members.m_ram_write_enabled ?? 0)) {
                if (((Number((members.m_address_bus_changes ?? 0)) === Number(5)) ? 1 : 0)) {
                    0;
                    runtime.writeIndex(runtime.writableMember("m_ram"), ((offset) + (((h_m_base_banks[0]) * (2048)))), (members.m_data ?? 0));
                }
                else {
                    if ((((offset) < (256)) ? 1 : 0)) {
                        members.m_data = ((offset) & 0xff);
                        members.m_address_bus_changes = ((0) >>> 0);
                    }
                }
            }
            else {
                if ((((offset) < (256)) ? 1 : 0)) {
                    members.m_data = ((offset) & 0xff);
                    members.m_address_bus_changes = ((0) >>> 0);
                }
            }
        }
        return ((runtime.readIndex((members.m_ram ?? 0), ((offset) + (((h_m_base_banks[0]) * (2048)))))) & 0xff);
    }
    function method_read_hi(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        const h_m_base_banks = members.m_base_banks ?? 0;
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if ((members.m_ram_write_enabled ?? 0)) {
                if (((Number((members.m_address_bus_changes ?? 0)) === Number(5)) ? 1 : 0)) {
                    if ((((h_m_base_banks[1]) !== (3)) ? 1 : 0)) {
                        0;
                        runtime.writeIndex(runtime.writableMember("m_ram"), ((offset) + (((h_m_base_banks[1]) * (2048)))), (members.m_data ?? 0));
                    }
                }
            }
        }
        if ((((h_m_base_banks[1]) !== (3)) ? 1 : 0)) {
            return ((runtime.readIndex((members.m_ram ?? 0), ((offset) + (((h_m_base_banks[1]) * (2048)))))) & 0xff);
        }
        else {
            if ((members.m_rom_enabled ?? 0)) {
                return ((runtime.readIndex((members.m_rom ?? 0), offset)) & 0xff);
            }
            else {
                return ((255) & 0xff);
            }
        }
    }
    function method_read_cass(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_cassette.input"];
        members.m_address_bus_changes = ((6) >>> 0);
        if (((Number((__L0 ? __L0() : ((members.m_cassette)?.input?.() ?? 0))) < Number(0)) ? 1 : 0)) {
            return ((0) & 0xff);
        }
        else {
            return ((1) & 0xff);
        }
    }
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_tap(runtime, address);
        }
    }
    function method_tap(runtime, address) {
        const members = runtime.members;
        const h_m_base_banks = members.m_base_banks ?? 0;
        if ((((address) === (8184)) ? 1 : 0)) {
            0;
            members.m_write_delay = (((((members.m_data ?? 0)) >>> (5))) & 0xff);
            members.m_ram_write_enabled = ((((((members.m_data ?? 0)) >>> (1)) & 1)) ? 1 : 0);
            members.m_rom_enabled = ((((((((members.m_data ?? 0)) >>> (0)) & 1)) ? 0 : 1)) ? 1 : 0);
            members.m_address_bus_changes = ((6) >>> 0);
            switch ((((members.m_data ?? 0)) & (28))) {
                case 0:
                    {
                        h_m_base_banks[0] = 2;
                        h_m_base_banks[1] = 3;
                        break;
                    }
                case 4:
                    {
                        h_m_base_banks[0] = 0;
                        h_m_base_banks[1] = 3;
                        break;
                    }
                case 8:
                    {
                        h_m_base_banks[0] = 2;
                        h_m_base_banks[1] = 0;
                        break;
                    }
                case 12:
                    {
                        h_m_base_banks[0] = 0;
                        h_m_base_banks[1] = 2;
                        break;
                    }
                case 16:
                    {
                        h_m_base_banks[0] = 2;
                        h_m_base_banks[1] = 3;
                        break;
                    }
                case 20:
                    {
                        h_m_base_banks[0] = 1;
                        h_m_base_banks[1] = 3;
                        break;
                    }
                case 24:
                    {
                        h_m_base_banks[0] = 2;
                        h_m_base_banks[1] = 1;
                        break;
                    }
                case 28:
                    {
                        h_m_base_banks[0] = 1;
                        h_m_base_banks[1] = 2;
                        break;
                    }
            }
        }
        if ((((((Number((members.m_address_bus_changes ?? 0)) <= Number(5)) ? 1 : 0)) && (((((members.m_last_address_bus ?? 0)) !== (address)) ? 1 : 0))) ? 1 : 0)) {
            members.m_address_bus_changes = ((((members.m_address_bus_changes) + (1))) >>> 0);
        }
        members.m_last_address_bus = ((address) & 0xffff);
    }
    function method_install_memory_handlers__lambda1(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_tap(runtime, address);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read_lo": method_read_lo,
        "read_hi": method_read_hi,
        "read_cass": method_read_cass,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "tap": method_tap,
        "install_memory_handlers__lambda1": method_install_memory_handlers__lambda1
    };
    return __methodTable;
})();
definition.slot.options["a26_ss"].compiledMethodLinks = ["m_cassette.input", "machine", "machine().side_effects_disabled"];
definition.slot.options["a26_dpc"].compiledMethods = (() => {
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
    function method_setup_addon_ptr(runtime, ptr) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_dpc.set_display_data"];
        (__L0 ? __L0(ptr) : ((members.m_dpc)?.set_display_data?.(ptr) ?? 0));
    }
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.(offset) ?? 0);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_dpc_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f6_device__install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8182), 0);
        }
    }
    function method_a26_rom_f8_device__install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8184), 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "setup_addon_ptr": method_setup_addon_ptr,
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "get_start_bank": method_get_start_bank,
        "switch_bank": method_switch_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "a26_rom_dpc_device::get_start_bank": method_a26_rom_dpc_device__get_start_bank,
        "a26_rom_f6_device::install_memory_handlers__lambda0": method_a26_rom_f6_device__install_memory_handlers__lambda0,
        "a26_rom_f8_device::install_memory_handlers__lambda0": method_a26_rom_f8_device__install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_dpc"].compiledMethodLinks = ["m_dpc.set_display_data", "machine", "machine().side_effects_disabled"];
definition.slot.options["a26_dpc"].children[0].definition.compiledMethods = (() => {
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
    const __mame_table_0 = [0, 4, 5, 9, 6, 10, 11, 15];
    function method_read(runtime, offset) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? 0;
        let data_fetcher = ((((offset) & (7))) & 0xff);
        let data = ((255) & 0xff);
        if ((((offset) < (8)) ? 1 : 0)) {
            switch (((offset) & (6))) {
                case 0:
                case 2:
                    {
                        members.m_shift_reg = (((((((members.m_shift_reg ?? 0)) << (1))) | ((((~(((((((members.m_shift_reg ?? 0)) >>> (7))) ^ ((((members.m_shift_reg ?? 0)) >>> (5))))) ^ ((((((members.m_shift_reg ?? 0)) >>> (4))) ^ ((((members.m_shift_reg ?? 0)) >>> (3)))))))) & (1))))) & 0xff);
                        return (((members.m_shift_reg ?? 0)) & 0xff);
                    }
                case 4:
                    {
                        members.m_latch_62 = (((members.m_latch_64 ?? 0)) & 0xff);
                    }
                case 6:
                    {
                        members.m_latch_64 = (((((members.m_latch_62 ?? 0)) + (h_m_df[4].top))) & 0xff);
                        members.m_dlc = ((((((Number((((members.m_latch_62 ?? 0)) + (h_m_df[4].top))) > Number(255)) ? 1 : 0)) ? (1) : (0))) & 0xff);
                        data = ((0) & 0xff);
                        if ((((h_m_df[5].music_mode) && (h_m_df[5].flag)) ? 1 : 0)) {
                            data = ((((data) | (1))) & 0xff);
                        }
                        if ((((h_m_df[6].music_mode) && (h_m_df[6].flag)) ? 1 : 0)) {
                            data = ((((data) | (2))) & 0xff);
                        }
                        if ((((h_m_df[7].music_mode) && (h_m_df[7].flag)) ? 1 : 0)) {
                            data = ((((data) | (4))) & 0xff);
                        }
                        return (((((((members.m_dlc ?? 0)) ? ((((members.m_movamt ?? 0)) & (240))) : (0))) | ((__mame_table_0[((data) & 7)] ?? 0)))) & 0xff);
                    }
            }
        }
        else {
            let display_data = ((runtime.readIndex((members.m_displaydata ?? 0), (((~((h_m_df[data_fetcher].low) | (((h_m_df[data_fetcher].high) << (8)))))) & (2047)))) & 0xff);
            switch (((offset) & (56))) {
                case 8:
                    {
                        data = ((display_data) & 0xff);
                        break;
                    }
                case 16:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (display_data) : (0))) & 0xff);
                        break;
                    }
                case 24:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (((((display_data) >>> (3)) & 1) << 7 | (((display_data) >>> (2)) & 1) << 6 | (((display_data) >>> (1)) & 1) << 5 | (((display_data) >>> (0)) & 1) << 4 | (((display_data) >>> (7)) & 1) << 3 | (((display_data) >>> (6)) & 1) << 2 | (((display_data) >>> (5)) & 1) << 1 | (((display_data) >>> (4)) & 1) << 0)) : (0))) & 0xff);
                        break;
                    }
                case 32:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (((((display_data) >>> (0)) & 1) << 7 | (((display_data) >>> (1)) & 1) << 6 | (((display_data) >>> (2)) & 1) << 5 | (((display_data) >>> (3)) & 1) << 4 | (((display_data) >>> (4)) & 1) << 3 | (((display_data) >>> (5)) & 1) << 2 | (((display_data) >>> (6)) & 1) << 1 | (((display_data) >>> (7)) & 1) << 0)) : (0))) & 0xff);
                        break;
                    }
                case 40:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (((display_data) >>> (1))) : (0))) & 0xff);
                        break;
                    }
                case 48:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (((display_data) << (1))) : (0))) & 0xff);
                        break;
                    }
                case 56:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (255) : (0))) & 0xff);
                        break;
                    }
            }
            if (((((((data_fetcher) < (5)) ? 1 : 0)) || (((h_m_df[data_fetcher].osc_clk) ? 0 : 1))) ? 1 : 0)) {
                method_decrement_counter(runtime, data_fetcher);
            }
        }
        return ((data) & 0xff);
    }
    function method_decrement_counter(runtime, data_fetcher) {
        const members = runtime.members;
        data_fetcher = ((data_fetcher) & 0xff);
        const h_m_df = members.m_df ?? 0;
        h_m_df[data_fetcher].low = ((((h_m_df[data_fetcher].low) - (1))) & 0xff);
        if ((((h_m_df[data_fetcher].low) === (255)) ? 1 : 0)) {
            h_m_df[data_fetcher].high = ((((h_m_df[data_fetcher].high) - (1))) & 0xff);
            if (((((((data_fetcher) > (4)) ? 1 : 0)) && (h_m_df[data_fetcher].music_mode)) ? 1 : 0)) {
                h_m_df[data_fetcher].low = ((h_m_df[data_fetcher].top) & 0xff);
            }
        }
        method_check_flag(runtime, data_fetcher);
    }
    function method_check_flag(runtime, data_fetcher) {
        const members = runtime.members;
        data_fetcher = ((data_fetcher) & 0xff);
        const h_m_df = members.m_df ?? 0;
        if ((((h_m_df[data_fetcher].low) === (h_m_df[data_fetcher].top)) ? 1 : 0)) {
            h_m_df[data_fetcher].flag = ((1) & 0xff);
        }
        if ((((h_m_df[data_fetcher].low) === (h_m_df[data_fetcher].bottom)) ? 1 : 0)) {
            h_m_df[data_fetcher].flag = ((0) & 0xff);
        }
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_df = members.m_df ?? 0;
        let data_fetcher = ((((offset) & (7))) & 0xff);
        switch (((offset) & (56))) {
            case 0:
                {
                    h_m_df[data_fetcher].top = ((data) & 0xff);
                    h_m_df[data_fetcher].flag = ((0) & 0xff);
                    method_check_flag(runtime, data_fetcher);
                    break;
                }
            case 8:
                {
                    h_m_df[data_fetcher].bottom = ((data) & 0xff);
                    method_check_flag(runtime, data_fetcher);
                    break;
                }
            case 16:
                {
                    h_m_df[data_fetcher].low = ((data) & 0xff);
                    if ((((data_fetcher) === (4)) ? 1 : 0)) {
                        members.m_latch_64 = ((data) & 0xff);
                    }
                    if (((((((data_fetcher) > (4)) ? 1 : 0)) && (h_m_df[data_fetcher].music_mode)) ? 1 : 0)) {
                        h_m_df[data_fetcher].low = ((h_m_df[data_fetcher].top) & 0xff);
                    }
                    method_check_flag(runtime, data_fetcher);
                    break;
                }
            case 24:
                {
                    h_m_df[data_fetcher].high = ((data) & 0xff);
                    h_m_df[data_fetcher].music_mode = ((((data) & (16))) & 0xff);
                    h_m_df[data_fetcher].osc_clk = ((((data) & (32))) & 0xff);
                    if ((((((((((data_fetcher) > (4)) ? 1 : 0)) && (h_m_df[data_fetcher].music_mode)) ? 1 : 0)) && ((((h_m_df[data_fetcher].low) === (255)) ? 1 : 0))) ? 1 : 0)) {
                        h_m_df[data_fetcher].low = ((h_m_df[data_fetcher].top) & 0xff);
                        method_check_flag(runtime, data_fetcher);
                    }
                    break;
                }
            case 32:
                {
                    members.m_movamt = ((data) & 0xff);
                    break;
                }
            case 40:
                {
                    0;
                    break;
                }
            case 48:
                {
                    members.m_shift_reg = ((0) & 0xff);
                    break;
                }
            case 56:
                {
                    0;
                    break;
                }
        }
    }
    function method_oscillator_tick(runtime, param) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? 0;
        for (let data_fetcher = ((5) | 0); (((data_fetcher) < (8)) ? 1 : 0); data_fetcher = ((((data_fetcher) + (1))) | 0)) {
            if (h_m_df[data_fetcher].osc_clk) {
                method_decrement_counter(runtime, data_fetcher);
            }
        }
    }
    function method_set_display_data(runtime, data) {
        const members = runtime.members;
        members.m_displaydata = data;
    }
    function method_dpc_device__set_display_data(runtime, data) {
        const members = runtime.members;
        members.m_displaydata = data;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "decrement_counter": method_decrement_counter,
        "check_flag": method_check_flag,
        "write": method_write,
        "oscillator_tick": method_oscillator_tick,
        "set_display_data": method_set_display_data,
        "dpc_device::set_display_data": method_dpc_device__set_display_data
    };
    return __methodTable;
})();
definition.slot.options["a26_4in1"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
    return __methodTable;
})();
definition.slot.options["a26_8in1"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.((((members.m_game_bank ?? 0)) + (offset))) ?? 0);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8184), 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_8in1"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_32in1"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
    return __methodTable;
})();
definition.slot.options["a26_x07"].compiledMethods = (() => {
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
    function method_install_memory_handlers(runtime, space) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_bank = members.m_bank ?? 0;
        (__deref_install_memory_handlers(runtime, members.m_bank).configure_entries?.(0, 16, method_get_rom_base(runtime), 4096) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_read_bank?.(4096, 8191, h_m_bank) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_readwrite_tap?.(0, 0, 1919, "bank1", ((address, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank1(runtime, address);
            }
        }), ((address, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank1(runtime, address);
            }
        })) ?? 0);
        (__deref_install_memory_handlers(runtime, space).install_readwrite_tap?.(2061, 2061, 2032, "bank2", ((address, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank2(runtime, address);
            }
        }), ((address, unused1, unused2) => {
            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                method_change_bank2(runtime, address);
            }
        })) ?? 0);
    }
    function __deref_install_memory_handlers(runtime, p) {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_change_bank1(runtime, address) {
        const members = runtime.members;
        let __t0;
        if (((Number((__t0 = __deref_change_bank1(runtime, members.m_bank), typeof __t0.entry === 'function' ? __t0.entry() : typeof __t0.entry === 'number' || typeof __t0.entry === 'boolean' ? __t0.entry : runtime.container(members.m_bank, "entry"))) >= Number(14)) ? 1 : 0)) {
            if (((address) & (64))) {
                (__deref_change_bank1(runtime, members.m_bank).set_entry?.(15) ?? 0);
            }
            else {
                (__deref_change_bank1(runtime, members.m_bank).set_entry?.(14) ?? 0);
            }
        }
    }
    function __deref_change_bank1(runtime, p) {
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
    function method_change_bank2(runtime, address) {
        const members = runtime.members;
        (__deref_change_bank2(runtime, members.m_bank).set_entry?.(((((address) >>> (4))) & (15))) ?? 0);
    }
    function __deref_change_bank2(runtime, p) {
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
    function method_install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank1(runtime, address);
        }
    }
    function method_install_memory_handlers__lambda1(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank1(runtime, address);
        }
    }
    function method_install_memory_handlers__lambda2(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank2(runtime, address);
        }
    }
    function method_install_memory_handlers__lambda3(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_change_bank2(runtime, address);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "install_memory_handlers": method_install_memory_handlers,
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "change_bank1": method_change_bank1,
        "change_bank2": method_change_bank2,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "install_memory_handlers__lambda1": method_install_memory_handlers__lambda1,
        "install_memory_handlers__lambda2": method_install_memory_handlers__lambda2,
        "install_memory_handlers__lambda3": method_install_memory_handlers__lambda3
    };
    return __methodTable;
})();
definition.slot.options["a26_x07"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
definition.slot.options["a26_harmony"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_read8_r(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_rom ?? 0), ((offset) + ((((members.m_base_bank ?? 0)) * (4096)))))) & 0xff);
    }
    function method_check_bankswitch(runtime, offset) {
        const members = runtime.members;
        switch (offset) {
            case 4086:
                {
                    members.m_base_bank = ((0) & 0xff);
                    break;
                }
            case 4087:
                {
                    members.m_base_bank = ((1) & 0xff);
                    break;
                }
            case 4088:
                {
                    members.m_base_bank = ((2) & 0xff);
                    break;
                }
            case 4089:
                {
                    members.m_base_bank = ((3) & 0xff);
                    break;
                }
            case 4090:
                {
                    members.m_base_bank = ((4) & 0xff);
                    break;
                }
            case 4091:
                {
                    members.m_base_bank = ((5) & 0xff);
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        let retvalue = ((method_read8_r(runtime, ((offset) + (3072)))) & 0xff);
        method_check_bankswitch(runtime, offset);
        return ((retvalue) & 0xff);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_check_bankswitch(runtime, offset);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read8_r": method_read8_r,
        "check_bankswitch": method_check_bankswitch,
        "read": method_read,
        "write": method_write
    };
    return __methodTable;
})();
definition.slot.options["a26_harmony"].children[0].definition.compiledMethods = (() => {
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
    function method_execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((3) >>> 0);
    }
    function method_execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((4) >>> 0);
    }
    function method_tlb_probe(runtime, vaddr, flags) {
        const members = runtime.members;
        const h_m_dtlb_entries = members.m_dtlb_entries ?? 0;
        const h_m_itlb_entries = members.m_itlb_entries ?? 0;
        const h_m_dtlb_entry_index = members.m_dtlb_entry_index ?? 0;
        const h_m_itlb_entry_index = members.m_itlb_entry_index ?? 0;
        let section = ((((((vaddr) >>> (20))) & (4095))) >>> 0);
        let entries = ((((flags) & (1))) ? (h_m_dtlb_entries) : (h_m_itlb_entries));
        let entries$s = undefined, entries$o = 0;
        if (ArrayBuffer.isView(entries) || Array.isArray(entries))
            entries$s = entries;
        else if (entries !== null && typeof entries === 'object' && entries.generatedPointer === true && entries.path === undefined && entries.target === undefined && (ArrayBuffer.isView(entries.source) || Array.isArray(entries.source))) {
            entries$s = entries.source;
            entries$o = entries.offset;
        }
        let start = ((((section) << (1))) >>> 0);
        let index = ((((((flags) & (1))) ? (h_m_dtlb_entry_index[section]) : (h_m_itlb_entry_index[section]))) >>> 0);
        if ((members.m_tlb_log ?? 0)) {
            0;
        }
        for (let i = ((0) >>> 0); (((i) < (2)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
            let position = ((((start) + (index))) >>> 0);
            if ((entries$s !== undefined ? (entries$s[entries$o + (position)] ?? 0) : runtime.readIndex(entries, position)).valid) {
                switch ((entries$s !== undefined ? (entries$s[entries$o + (position)] ?? 0) : runtime.readIndex(entries, position)).type) {
                    case 0:
                        {
                            if (((Number((entries$s !== undefined ? (entries$s[entries$o + (position)] ?? 0) : runtime.readIndex(entries, position)).table_bits) === Number(((vaddr) & (4293918720)))) ? 1 : 0)) {
                                return __addr_tlb_probe(runtime, entries, position);
                            }
                            break;
                        }
                    case 1:
                    case 2:
                        {
                            if (((Number((entries$s !== undefined ? (entries$s[entries$o + (position)] ?? 0) : runtime.readIndex(entries, position)).table_bits) === Number(((vaddr) & (4294963200)))) ? 1 : 0)) {
                                return __addr_tlb_probe(runtime, entries, position);
                            }
                            break;
                        }
                    case 3:
                        {
                            if (((Number((entries$s !== undefined ? (entries$s[entries$o + (position)] ?? 0) : runtime.readIndex(entries, position)).table_bits) === Number(((vaddr) & (4294966272)))) ? 1 : 0)) {
                                return __addr_tlb_probe(runtime, entries, position);
                            }
                            break;
                        }
                }
            }
            if ((members.m_tlb_log ?? 0)) {
                0;
            }
            index = ((((((index) - (1))) & (1))) >>> 0);
        }
        return 0;
    }
    function __addr_tlb_probe(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_postload(runtime) {
        const members = runtime.members;
        runtime.invoke("update_reg_ptr");
    }
    function method_init_ce_kernel_addrs(runtime) {
        const members = runtime.members;
        const h_m_ce_kernel_addr_present = members.m_ce_kernel_addr_present ?? 0;
        cppMemset(runtime, h_m_ce_kernel_addr_present, 0, 66560);
        method_add_ce_kernel_addr(runtime, 4026597376, "SH_AFS_Unmount");
        method_add_ce_kernel_addr(runtime, 4026597376, "SH_AFS_CloseHandle");
        method_add_ce_kernel_addr(runtime, 4026597384, "SH_AFS_CreateDirectoryW");
        method_add_ce_kernel_addr(runtime, 4026597388, "SH_AFS_RemoveDirectoryW");
        method_add_ce_kernel_addr(runtime, 4026597392, "SH_AFS_GetFileAttributesW");
        method_add_ce_kernel_addr(runtime, 4026597396, "SH_AFS_SetFileAttributesW");
        method_add_ce_kernel_addr(runtime, 4026597400, "SH_AFS_CreateFileW");
        method_add_ce_kernel_addr(runtime, 4026597404, "SH_AFS_DeleteFileW");
        method_add_ce_kernel_addr(runtime, 4026597408, "SH_AFS_MoveFileW");
        method_add_ce_kernel_addr(runtime, 4026597412, "SH_AFS_FindFirstFileW");
        method_add_ce_kernel_addr(runtime, 4026597424, "SH_AFS_PrestoChangoFileName");
        method_add_ce_kernel_addr(runtime, 4026597428, "SH_AFS_CloseAllFileHandles");
        method_add_ce_kernel_addr(runtime, 4026597432, "SH_AFS_GetDiskFreeSpace");
        method_add_ce_kernel_addr(runtime, 4026597436, "SH_AFS_NotifyMountedFS");
        method_add_ce_kernel_addr(runtime, 4026597440, "SH_AFS_RegisterFileSystemFunction");
        method_add_ce_kernel_addr(runtime, 4026597444, "SH_AFS_FindFirstChangeNotificationW");
        method_add_ce_kernel_addr(runtime, 4026597372, "SH_WIN32_NotSupported");
        method_add_ce_kernel_addr(runtime, 4026597368, "SH_WIN32_CreateAPISet");
        method_add_ce_kernel_addr(runtime, 4026597364, "SH_WIN32_VirtualAlloc");
        method_add_ce_kernel_addr(runtime, 4026597360, "SH_WIN32_VirtualFree");
        method_add_ce_kernel_addr(runtime, 4026597356, "SH_WIN32_VirtualProtect");
        method_add_ce_kernel_addr(runtime, 4026597352, "SH_WIN32_VirtualQuery");
        method_add_ce_kernel_addr(runtime, 4026597348, "SH_WIN32_VirtualCopy");
        method_add_ce_kernel_addr(runtime, 4026597344, "SH_WIN32_LoadLibraryW");
        method_add_ce_kernel_addr(runtime, 4026597340, "SH_WIN32_FreeLibrary");
        method_add_ce_kernel_addr(runtime, 4026597336, "SH_WIN32_GetProcAddressW");
        method_add_ce_kernel_addr(runtime, 4026597332, "SH_WIN32_ThreadAttachOrDetach");
        method_add_ce_kernel_addr(runtime, 4026597328, "SH_WIN32_ThreadDetachAllDLLs");
        method_add_ce_kernel_addr(runtime, 4026597324, "SH_WIN32_GetTickCount");
        method_add_ce_kernel_addr(runtime, 4026597320, "SH_WIN32_OutputDebugStringW");
        method_add_ce_kernel_addr(runtime, 4026597316, "SH_WIN32_TlsCall");
        method_add_ce_kernel_addr(runtime, 4026597312, "SH_WIN32_GetSystemInfo");
        method_add_ce_kernel_addr(runtime, 4026597308, "SH_WIN32_U_ropen");
        method_add_ce_kernel_addr(runtime, 4026597304, "SH_WIN32_U_rread");
        method_add_ce_kernel_addr(runtime, 4026597300, "SH_WIN32_U_rwrite");
        method_add_ce_kernel_addr(runtime, 4026597296, "SH_WIN32_U_rlseek");
        method_add_ce_kernel_addr(runtime, 4026597292, "SH_WIN32_U_rclose");
        method_add_ce_kernel_addr(runtime, 4026597288, "SH_WIN32_RegisterDbgZones");
        method_add_ce_kernel_addr(runtime, 4026597284, "SH_WIN32_NKvDbgPrintfW");
        method_add_ce_kernel_addr(runtime, 4026597280, "SH_WIN32_ProfileSyscall");
        method_add_ce_kernel_addr(runtime, 4026597276, "SH_WIN32_FindResourceW");
        method_add_ce_kernel_addr(runtime, 4026597272, "SH_WIN32_LoadResource");
        method_add_ce_kernel_addr(runtime, 4026597268, "SH_WIN32_SizeofResource");
        method_add_ce_kernel_addr(runtime, 4026597264, "SH_WIN32_GetRealTime");
        method_add_ce_kernel_addr(runtime, 4026597260, "SH_WIN32_SetRealTime");
        method_add_ce_kernel_addr(runtime, 4026597256, "SH_WIN32_ProcessDetachAllDLLs");
        method_add_ce_kernel_addr(runtime, 4026597252, "SH_WIN32_ExtractResource");
        method_add_ce_kernel_addr(runtime, 4026597248, "SH_WIN32_GetRomFileInfo");
        method_add_ce_kernel_addr(runtime, 4026597244, "SH_WIN32_GetRomFileBytes");
        method_add_ce_kernel_addr(runtime, 4026597240, "SH_WIN32_CacheRangeFlush");
        method_add_ce_kernel_addr(runtime, 4026597236, "SH_WIN32_AddTrackedItem");
        method_add_ce_kernel_addr(runtime, 4026597232, "SH_WIN32_DeleteTrackedItem");
        method_add_ce_kernel_addr(runtime, 4026597228, "SH_WIN32_PrintTrackedItem");
        method_add_ce_kernel_addr(runtime, 4026597224, "SH_WIN32_GetKPhys");
        method_add_ce_kernel_addr(runtime, 4026597220, "SH_WIN32_GiveKPhys");
        method_add_ce_kernel_addr(runtime, 4026597216, "SH_WIN32_SetExceptionHandler");
        method_add_ce_kernel_addr(runtime, 4026597212, "SH_WIN32_RegisterTrackedItem");
        method_add_ce_kernel_addr(runtime, 4026597208, "SH_WIN32_FilterTrackedItem");
        method_add_ce_kernel_addr(runtime, 4026597204, "SH_WIN32_SetKernelAlarm");
        method_add_ce_kernel_addr(runtime, 4026597200, "SH_WIN32_RefreshKernelAlarm");
        method_add_ce_kernel_addr(runtime, 4026597196, "SH_WIN32_CeGetRandomSeed");
        method_add_ce_kernel_addr(runtime, 4026597192, "SH_WIN32_CloseProcOE");
        method_add_ce_kernel_addr(runtime, 4026597188, "SH_WIN32_SetGwesOOMEvent");
        method_add_ce_kernel_addr(runtime, 4026597184, "SH_WIN32_StringCompress");
        method_add_ce_kernel_addr(runtime, 4026597180, "SH_WIN32_StringDecompress");
        method_add_ce_kernel_addr(runtime, 4026597176, "SH_WIN32_BinaryCompress");
        method_add_ce_kernel_addr(runtime, 4026597172, "SH_WIN32_BinaryDecompress");
        method_add_ce_kernel_addr(runtime, 4026597168, "SH_WIN32_CreateEventW");
        method_add_ce_kernel_addr(runtime, 4026597164, "SH_WIN32_CreateProcessW");
        method_add_ce_kernel_addr(runtime, 4026597160, "SH_WIN32_CreateThread");
        method_add_ce_kernel_addr(runtime, 4026597156, "SH_WIN32_InputDebugCharW");
        method_add_ce_kernel_addr(runtime, 4026597152, "SH_WIN32_TakeCritSec");
        method_add_ce_kernel_addr(runtime, 4026597148, "SH_WIN32_LeaveCritSec");
        method_add_ce_kernel_addr(runtime, 4026597144, "SH_WIN32_WaitForMultipleObjects");
        method_add_ce_kernel_addr(runtime, 4026597140, "SH_WIN32_MapPtrToProcess");
        method_add_ce_kernel_addr(runtime, 4026597136, "SH_WIN32_MapPtrUnsecure");
        method_add_ce_kernel_addr(runtime, 4026597132, "SH_WIN32_GetProcFromPtr");
        method_add_ce_kernel_addr(runtime, 4026597128, "SH_WIN32_IsBadPtr");
        method_add_ce_kernel_addr(runtime, 4026597124, "SH_WIN32_GetProcAddrBits");
        method_add_ce_kernel_addr(runtime, 4026597120, "SH_WIN32_GetFSHeapInfo");
        method_add_ce_kernel_addr(runtime, 4026597116, "SH_WIN32_OtherThreadsRunning");
        method_add_ce_kernel_addr(runtime, 4026597112, "SH_WIN32_KillAllOtherThreads");
        method_add_ce_kernel_addr(runtime, 4026597108, "SH_WIN32_GetOwnerProcess");
        method_add_ce_kernel_addr(runtime, 4026597104, "SH_WIN32_GetCallerProcess");
        method_add_ce_kernel_addr(runtime, 4026597100, "SH_WIN32_GetIdleTime");
        method_add_ce_kernel_addr(runtime, 4026597096, "SH_WIN32_SetLowestScheduledPriority");
        method_add_ce_kernel_addr(runtime, 4026597092, "SH_WIN32_IsPrimaryThread");
        method_add_ce_kernel_addr(runtime, 4026597088, "SH_WIN32_SetProcPermissions");
        method_add_ce_kernel_addr(runtime, 4026597084, "SH_WIN32_GetCurrentPermissions");
        method_add_ce_kernel_addr(runtime, 4026597076, "SH_WIN32_SetDaylightTime");
        method_add_ce_kernel_addr(runtime, 4026597072, "SH_WIN32_SetTimeZoneBias");
        method_add_ce_kernel_addr(runtime, 4026597068, "SH_WIN32_SetCleanRebootFlag");
        method_add_ce_kernel_addr(runtime, 4026597064, "SH_WIN32_CreateCrit");
        method_add_ce_kernel_addr(runtime, 4026597060, "SH_WIN32_PowerOffSystem");
        method_add_ce_kernel_addr(runtime, 4026597056, "SH_WIN32_CreateMutexW");
        method_add_ce_kernel_addr(runtime, 4026597052, "SH_WIN32_SetDbgZone");
        method_add_ce_kernel_addr(runtime, 4026597048, "SH_WIN32_Sleep");
        method_add_ce_kernel_addr(runtime, 4026597044, "SH_WIN32_TurnOnProfiling");
        method_add_ce_kernel_addr(runtime, 4026597040, "SH_WIN32_TurnOffProfiling");
        method_add_ce_kernel_addr(runtime, 4026597036, "SH_WIN32_CeGetCurrentTrust");
        method_add_ce_kernel_addr(runtime, 4026597032, "SH_WIN32_CeGetCallerTrust");
        method_add_ce_kernel_addr(runtime, 4026597028, "SH_WIN32_NKTerminateThread");
        method_add_ce_kernel_addr(runtime, 4026597024, "SH_WIN32_SetLastError");
        method_add_ce_kernel_addr(runtime, 4026597020, "SH_WIN32_GetLastError");
        method_add_ce_kernel_addr(runtime, 4026597016, "SH_WIN32_GetProcName");
        method_add_ce_kernel_addr(runtime, 4026597012, "SH_WIN32_ExitProcess");
        method_add_ce_kernel_addr(runtime, 4026597008, "SH_WIN32_CloseAllHandles");
        method_add_ce_kernel_addr(runtime, 4026597004, "SH_WIN32_SetHandleOwner");
        method_add_ce_kernel_addr(runtime, 4026597000, "SH_WIN32_LoadDriver");
        method_add_ce_kernel_addr(runtime, 4026596996, "SH_WIN32_CreateFileMappingW");
        method_add_ce_kernel_addr(runtime, 4026596992, "SH_WIN32_UnmapViewOfFile");
        method_add_ce_kernel_addr(runtime, 4026596988, "SH_WIN32_FlushViewOfFile");
        method_add_ce_kernel_addr(runtime, 4026596984, "SH_WIN32_CreateFileForMappingW");
        method_add_ce_kernel_addr(runtime, 4026596980, "SH_WIN32_KernelIoControl");
        method_add_ce_kernel_addr(runtime, 4026596976, "SH_WIN32_GetCallStackSnapshot");
        method_add_ce_kernel_addr(runtime, 4026596972, "SH_WIN32_PPSHRestart");
        method_add_ce_kernel_addr(runtime, 4026596964, "SH_WIN32_UpdateNLSInfoEx");
        method_add_ce_kernel_addr(runtime, 4026596960, "SH_WIN32_ConnectDebugger");
        method_add_ce_kernel_addr(runtime, 4026596956, "SH_WIN32_InterruptInitialize");
        method_add_ce_kernel_addr(runtime, 4026596952, "SH_WIN32_InterruptDone");
        method_add_ce_kernel_addr(runtime, 4026596948, "SH_WIN32_InterruptDisable");
        method_add_ce_kernel_addr(runtime, 4026596944, "SH_WIN32_SetKMode");
        method_add_ce_kernel_addr(runtime, 4026596940, "SH_WIN32_SetPowerOffHandler");
        method_add_ce_kernel_addr(runtime, 4026596936, "SH_WIN32_SetGwesPowerHandler");
        method_add_ce_kernel_addr(runtime, 4026596932, "SH_WIN32_SetHardwareWatch");
        method_add_ce_kernel_addr(runtime, 4026596928, "SH_WIN32_QueryAPISetID");
        method_add_ce_kernel_addr(runtime, 4026596924, "SH_WIN32_PerformCallBack");
        method_add_ce_kernel_addr(runtime, 4026596920, "SH_WIN32_RaiseException");
        method_add_ce_kernel_addr(runtime, 4026596916, "SH_WIN32_GetCallerProcessIndex");
        method_add_ce_kernel_addr(runtime, 4026596912, "SH_WIN32_WaitForDebugEvent");
        method_add_ce_kernel_addr(runtime, 4026596908, "SH_WIN32_ContinueDebugEvent");
        method_add_ce_kernel_addr(runtime, 4026596904, "SH_WIN32_DebugNotify");
        method_add_ce_kernel_addr(runtime, 4026596900, "SH_WIN32_OpenProcess");
        method_add_ce_kernel_addr(runtime, 4026596896, "SH_WIN32_THCreateSnapshot");
        method_add_ce_kernel_addr(runtime, 4026596892, "SH_WIN32_THGrow");
        method_add_ce_kernel_addr(runtime, 4026596888, "SH_WIN32_NotifyForceCleanboot");
        method_add_ce_kernel_addr(runtime, 4026596884, "SH_WIN32_DumpKCallProfile");
        method_add_ce_kernel_addr(runtime, 4026596880, "SH_WIN32_GetProcessVersion");
        method_add_ce_kernel_addr(runtime, 4026596876, "SH_WIN32_GetModuleFileNameW");
        method_add_ce_kernel_addr(runtime, 4026596872, "SH_WIN32_QueryPerformanceCounter");
        method_add_ce_kernel_addr(runtime, 4026596868, "SH_WIN32_QueryPerformanceFrequency");
        method_add_ce_kernel_addr(runtime, 4026596864, "SH_WIN32_KernExtractIcons");
        method_add_ce_kernel_addr(runtime, 4026596860, "SH_WIN32_ForcePageout");
        method_add_ce_kernel_addr(runtime, 4026596856, "SH_WIN32_GetThreadTimes");
        method_add_ce_kernel_addr(runtime, 4026596852, "SH_WIN32_GetModuleHandleW");
        method_add_ce_kernel_addr(runtime, 4026596848, "SH_WIN32_SetWDevicePowerHandler");
        method_add_ce_kernel_addr(runtime, 4026596844, "SH_WIN32_SetStdioPathW");
        method_add_ce_kernel_addr(runtime, 4026596840, "SH_WIN32_GetStdioPathW");
        method_add_ce_kernel_addr(runtime, 4026596836, "SH_WIN32_ReadRegistryFromOEM");
        method_add_ce_kernel_addr(runtime, 4026596832, "SH_WIN32_WriteRegistryToOEM");
        method_add_ce_kernel_addr(runtime, 4026596828, "SH_WIN32_WriteDebugLED");
        method_add_ce_kernel_addr(runtime, 4026596824, "SH_WIN32_LockPages");
        method_add_ce_kernel_addr(runtime, 4026596820, "SH_WIN32_UnlockPages");
        method_add_ce_kernel_addr(runtime, 4026596816, "SH_WIN32_VirtualSetAttributes");
        method_add_ce_kernel_addr(runtime, 4026596812, "SH_WIN32_SetRAMMode");
        method_add_ce_kernel_addr(runtime, 4026596808, "SH_WIN32_SetStoreQueueBase");
        method_add_ce_kernel_addr(runtime, 4026596804, "SH_WIN32_FlushViewOfFileMaybe");
        method_add_ce_kernel_addr(runtime, 4026596800, "SH_WIN32_GetProcAddressA");
        method_add_ce_kernel_addr(runtime, 4026596796, "SH_WIN32_GetCommandLineW");
        method_add_ce_kernel_addr(runtime, 4026596792, "SH_WIN32_DisableThreadLibraryCalls");
        method_add_ce_kernel_addr(runtime, 4026596788, "SH_WIN32_CreateSemaphoreW");
        method_add_ce_kernel_addr(runtime, 4026596784, "SH_WIN32_LoadLibraryExW");
        method_add_ce_kernel_addr(runtime, 4026596780, "SH_WIN32_PerformCallForward");
        method_add_ce_kernel_addr(runtime, 4026596776, "SH_WIN32_CeMapArgumentArray");
        method_add_ce_kernel_addr(runtime, 4026596772, "SH_WIN32_KillThreadIfNeeded");
        method_add_ce_kernel_addr(runtime, 4026596768, "SH_WIN32_GetProcessIndexFromID");
        method_add_ce_kernel_addr(runtime, 4026596764, "SH_WIN32_RegisterGwesHandler");
        method_add_ce_kernel_addr(runtime, 4026596760, "SH_WIN32_GetProfileBaseAddress");
        method_add_ce_kernel_addr(runtime, 4026596756, "SH_WIN32_SetProfilePortAddress");
        method_add_ce_kernel_addr(runtime, 4026596752, "SH_WIN32_CeLogData");
        method_add_ce_kernel_addr(runtime, 4026596748, "SH_WIN32_CeLogSetZones");
        method_add_ce_kernel_addr(runtime, 4026596744, "SH_WIN32_CeModuleJit");
        method_add_ce_kernel_addr(runtime, 4026596740, "SH_WIN32_CeSetExtendedPdata");
        method_add_ce_kernel_addr(runtime, 4026596736, "SH_WIN32_VerQueryValueW");
        method_add_ce_kernel_addr(runtime, 4026596732, "SH_WIN32_GetFileVersionInfoSizeW");
        method_add_ce_kernel_addr(runtime, 4026596728, "SH_WIN32_GetFileVersionInfoW");
        method_add_ce_kernel_addr(runtime, 4026596724, "SH_WIN32_CreateLocaleView");
        method_add_ce_kernel_addr(runtime, 4026596720, "SH_WIN32_CeLogReSync");
        method_add_ce_kernel_addr(runtime, 4026596716, "SH_WIN32_LoadIntChainHandler");
        method_add_ce_kernel_addr(runtime, 4026596712, "SH_WIN32_FreeIntChainHandler");
        method_add_ce_kernel_addr(runtime, 4026596708, "SH_WIN32_LoadKernelLibrary");
        method_add_ce_kernel_addr(runtime, 4026596704, "SH_WIN32_AllocPhysMem");
        method_add_ce_kernel_addr(runtime, 4026596700, "SH_WIN32_FreePhysMem");
        method_add_ce_kernel_addr(runtime, 4026596696, "SH_WIN32_KernelLibIoControl");
        method_add_ce_kernel_addr(runtime, 4026596692, "SH_WIN32_OpenEventW");
        method_add_ce_kernel_addr(runtime, 4026596688, "SH_WIN32_SleepTillTick");
        method_add_ce_kernel_addr(runtime, 4026596684, "SH_WIN32_DuplicateHandle");
        method_add_ce_kernel_addr(runtime, 4026596680, "SH_WIN32_CreateStaticMapping");
        method_add_ce_kernel_addr(runtime, 4026596676, "SH_WIN32_MapCallerPtr");
        method_add_ce_kernel_addr(runtime, 4026596672, "SH_WIN32_MapPtrToProcWithSize");
        method_add_ce_kernel_addr(runtime, 4026596668, "SH_WIN32_LoadStringW");
        method_add_ce_kernel_addr(runtime, 4026596664, "SH_WIN32_QueryInstructionSet");
        method_add_ce_kernel_addr(runtime, 4026596660, "SH_WIN32_CeLogGetZones");
        method_add_ce_kernel_addr(runtime, 4026596656, "SH_WIN32_GetProcessIDFromIndex");
        method_add_ce_kernel_addr(runtime, 4026596652, "SH_WIN32_IsProcessorFeaturePresent");
        method_add_ce_kernel_addr(runtime, 4026596648, "SH_WIN32_DecompressBinaryBlock");
        method_add_ce_kernel_addr(runtime, 4026596644, "SH_WIN32_PageOutModule");
        method_add_ce_kernel_addr(runtime, 4026596640, "SH_WIN32_InterruptMask");
        method_add_ce_kernel_addr(runtime, 4026596636, "SH_WIN32_GetProcModList");
        method_add_ce_kernel_addr(runtime, 4026596632, "SH_WIN32_FreeModFromCurrProc");
        method_add_ce_kernel_addr(runtime, 4026596628, "SH_WIN32_CeVirtualSharedAlloc");
        method_add_ce_kernel_addr(runtime, 4026596624, "SH_WIN32_NKDeleteStaticMapping");
        method_add_ce_kernel_addr(runtime, 4026596620, "SH_WIN32_CreateToken");
        method_add_ce_kernel_addr(runtime, 4026596616, "SH_WIN32_RevertToSelf");
        method_add_ce_kernel_addr(runtime, 4026596612, "SH_WIN32_CeImpersonateCurrProc");
        method_add_ce_kernel_addr(runtime, 4026596608, "SH_WIN32_CeDuplicateToken");
        method_add_ce_kernel_addr(runtime, 4026596604, "SH_WIN32_ConnectHdstub");
        method_add_ce_kernel_addr(runtime, 4026596600, "SH_WIN32_ConnectOsAxsT0");
        method_add_ce_kernel_addr(runtime, 4026596596, "SH_WIN32_IsNamedEventSignaled");
        method_add_ce_kernel_addr(runtime, 4026596592, "SH_WIN32_ConnectOsAxsT1");
        method_add_ce_kernel_addr(runtime, 4026596588, "SH_WIN32_DebugSetProcessKillOnExit");
        method_add_ce_kernel_addr(runtime, 4026596584, "SH_WIN32_CeGetProcessTrust");
        method_add_ce_kernel_addr(runtime, 4026596580, "SH_WIN32_CeOpenFileHandle");
        method_add_ce_kernel_addr(runtime, 4026596348, "SH_CURTHREAD_ThreadCloseHandle");
        method_add_ce_kernel_addr(runtime, 4026596344, "SH_CURTHREAD_SuspendThread");
        method_add_ce_kernel_addr(runtime, 4026596340, "SH_CURTHREAD_ResumeThread");
        method_add_ce_kernel_addr(runtime, 4026596336, "SH_CURTHREAD_SetThreadPriority");
        method_add_ce_kernel_addr(runtime, 4026596332, "SH_CURTHREAD_GetThreadPriority");
        method_add_ce_kernel_addr(runtime, 4026596328, "SH_CURTHREAD_GetExitCodeThread");
        method_add_ce_kernel_addr(runtime, 4026596324, "SH_CURTHREAD_GetThreadContext");
        method_add_ce_kernel_addr(runtime, 4026596320, "SH_CURTHREAD_SetThreadContext");
        method_add_ce_kernel_addr(runtime, 4026596316, "SH_CURTHREAD_TerminateThread");
        method_add_ce_kernel_addr(runtime, 4026596312, "SH_CURTHREAD_CeGetThreadPriority");
        method_add_ce_kernel_addr(runtime, 4026596308, "SH_CURTHREAD_CeSetThreadPriority");
        method_add_ce_kernel_addr(runtime, 4026596304, "SH_CURTHREAD_CeGetThreadQuantum");
        method_add_ce_kernel_addr(runtime, 4026596300, "SH_CURTHREAD_CeSetThreadQuantum");
        method_add_ce_kernel_addr(runtime, 4026595328, "SH_CURPROC_ProcCloseHandle");
        method_add_ce_kernel_addr(runtime, 4026595320, "SH_CURPROC_TerminateProcess");
        method_add_ce_kernel_addr(runtime, 4026595316, "SH_CURPROC_GetExitCodeProcess");
        method_add_ce_kernel_addr(runtime, 4026595308, "SH_CURPROC_FlushInstructionCache");
        method_add_ce_kernel_addr(runtime, 4026595304, "SH_CURPROC_ReadProcessMemory");
        method_add_ce_kernel_addr(runtime, 4026595300, "SH_CURPROC_WriteProcessMemory");
        method_add_ce_kernel_addr(runtime, 4026595296, "SH_CURPROC_DebugActiveProcess");
        method_add_ce_kernel_addr(runtime, 4026595292, "SH_CURPROC_GetModuleInformation");
        method_add_ce_kernel_addr(runtime, 4026595288, "SH_CURPROC_CeSetProcessVersion");
        method_add_ce_kernel_addr(runtime, 4026595284, "SH_CURPROC_DebugActiveProcessStop");
        method_add_ce_kernel_addr(runtime, 4026595280, "SH_CURPROC_CeGetModuleInfo");
        method_add_ce_kernel_addr(runtime, 4026595276, "SH_CURPROC_CheckRemoteDebuggerPresent");
        method_add_ce_kernel_addr(runtime, 4026593280, "HT_EVENT_EventCloseHandle");
        method_add_ce_kernel_addr(runtime, 4026593272, "HT_EVENT_EventModify");
        method_add_ce_kernel_addr(runtime, 4026593268, "HT_EVENT_AddEventAccess");
        method_add_ce_kernel_addr(runtime, 4026593264, "HT_EVENT_EventGetData");
        method_add_ce_kernel_addr(runtime, 4026593260, "HT_EVENT_EventSetData");
        method_add_ce_kernel_addr(runtime, 4026592256, "HT_MUTEX_MutexCloseHandle");
        method_add_ce_kernel_addr(runtime, 4026592248, "HT_MUTEX_ReleaseMutex");
        method_add_ce_kernel_addr(runtime, 4026591232, "HT_APISET_CloseAPISet");
        method_add_ce_kernel_addr(runtime, 4026591224, "HT_APISET_RegisterAPISet");
        method_add_ce_kernel_addr(runtime, 4026591220, "HT_APISET_CreateAPIHandle");
        method_add_ce_kernel_addr(runtime, 4026591216, "HT_APISET_VerifyAPIHandle");
        method_add_ce_kernel_addr(runtime, 4026590204, "HT_FILE_PSLGetStoreInfo");
        method_add_ce_kernel_addr(runtime, 4026590200, "HT_FILE_PSLDismountStore");
        method_add_ce_kernel_addr(runtime, 4026590200, "HT_FILE_ReadFile");
        method_add_ce_kernel_addr(runtime, 4026590196, "HT_FILE_PSLFormatStore");
        method_add_ce_kernel_addr(runtime, 4026590196, "HT_FILE_WriteFile");
        method_add_ce_kernel_addr(runtime, 4026590192, "HT_FILE_GetFileSize");
        method_add_ce_kernel_addr(runtime, 4026590192, "HT_FILE_PSLCreatePart");
        method_add_ce_kernel_addr(runtime, 4026590188, "HT_FILE_PSLDeletePartition");
        method_add_ce_kernel_addr(runtime, 4026590188, "HT_FILE_SetFilePointer");
        method_add_ce_kernel_addr(runtime, 4026590184, "HT_FILE_GetFileInformationByHandle");
        method_add_ce_kernel_addr(runtime, 4026590184, "HT_FILE_PSLOpenPartition");
        method_add_ce_kernel_addr(runtime, 4026590180, "HT_FILE_FlushFileBuffers");
        method_add_ce_kernel_addr(runtime, 4026590180, "HT_FILE_PSLMountPartition");
        method_add_ce_kernel_addr(runtime, 4026590176, "HT_FILE_GetFileTime");
        method_add_ce_kernel_addr(runtime, 4026590176, "HT_FILE_PSLDismountPartition");
        method_add_ce_kernel_addr(runtime, 4026590172, "HT_FILE_PSLRenamePartition");
        method_add_ce_kernel_addr(runtime, 4026590172, "HT_FILE_SetFileTime");
        method_add_ce_kernel_addr(runtime, 4026590168, "HT_FILE_PSLSetPartitionAttributes");
        method_add_ce_kernel_addr(runtime, 4026590168, "HT_FILE_SetEndOfFile");
        method_add_ce_kernel_addr(runtime, 4026590164, "HT_FILE_DeviceIoControl");
        method_add_ce_kernel_addr(runtime, 4026590160, "HT_FILE_PSLGetPartitionInfo");
        method_add_ce_kernel_addr(runtime, 4026590160, "HT_FILE_ReadFileWithSeek");
        method_add_ce_kernel_addr(runtime, 4026590156, "HT_FILE_PSLFormatPart");
        method_add_ce_kernel_addr(runtime, 4026590156, "HT_FILE_WriteFileWithSeek");
        method_add_ce_kernel_addr(runtime, 4026590152, "HT_FILE_PSLFindFirstPartition");
        method_add_ce_kernel_addr(runtime, 4026589184, "HT_FIND_FindClose");
        method_add_ce_kernel_addr(runtime, 4026589176, "HT_FIND_FindNextFileW");
        method_add_ce_kernel_addr(runtime, 4026588152, "HT_DBFILE_CeSeekDatabaseEx");
        method_add_ce_kernel_addr(runtime, 4026588148, "HT_DBFILE_CeDeleteRecord");
        method_add_ce_kernel_addr(runtime, 4026588144, "HT_DBFILE_CeReadRecordPropsEx");
        method_add_ce_kernel_addr(runtime, 4026588140, "HT_DBFILE_CeWriteRecordProps");
        method_add_ce_kernel_addr(runtime, 4026588136, "HT_DBFILE_CeGetDBInformationByHandle");
        method_add_ce_kernel_addr(runtime, 4026587128, "HT_DBFIND_CeFindNextDatabaseEx");
        method_add_ce_kernel_addr(runtime, 4026586112, "HT_SOCKET_AFDCloseSocket");
        method_add_ce_kernel_addr(runtime, 4026586104, "HT_SOCKET_AFDAccept");
        method_add_ce_kernel_addr(runtime, 4026586100, "HT_SOCKET_AFDBind");
        method_add_ce_kernel_addr(runtime, 4026586096, "HT_SOCKET_AFDConnect");
        method_add_ce_kernel_addr(runtime, 4026586092, "HT_SOCKET_AFDIoctl");
        method_add_ce_kernel_addr(runtime, 4026586088, "HT_SOCKET_AFDListen");
        method_add_ce_kernel_addr(runtime, 4026586084, "HT_SOCKET_AFDRecv");
        method_add_ce_kernel_addr(runtime, 4026586080, "HT_SOCKET_AFDSend");
        method_add_ce_kernel_addr(runtime, 4026586076, "HT_SOCKET_AFDShutdown");
        method_add_ce_kernel_addr(runtime, 4026586072, "HT_SOCKET_AFDGetsockname");
        method_add_ce_kernel_addr(runtime, 4026586068, "HT_SOCKET_AFDGetpeername");
        method_add_ce_kernel_addr(runtime, 4026586064, "HT_SOCKET_AFDGetSockOpt");
        method_add_ce_kernel_addr(runtime, 4026586060, "HT_SOCKET_AFDSetSockOpt");
        method_add_ce_kernel_addr(runtime, 4026586056, "HT_SOCKET_AFDWakeup");
        method_add_ce_kernel_addr(runtime, 4026586052, "HT_SOCKET_AFDGetOverlappedResult");
        method_add_ce_kernel_addr(runtime, 4026586048, "HT_SOCKET_AFDEventSelect");
        method_add_ce_kernel_addr(runtime, 4026586044, "HT_SOCKET_AFDEnumNetworkEvents");
        method_add_ce_kernel_addr(runtime, 4026584064, "HT_SEMAPHORE_SemaphoreCloseHandle");
        method_add_ce_kernel_addr(runtime, 4026584056, "HT_SEMAPHORE_ReleaseSemaphore");
        method_add_ce_kernel_addr(runtime, 4026583040, "HT_FSMAP_MapCloseHandle");
        method_add_ce_kernel_addr(runtime, 4026583032, "HT_FSMAP_MapViewOfFile");
        method_add_ce_kernel_addr(runtime, 4026582016, "HT_WNETENUM_WNetCloseEnum");
        method_add_ce_kernel_addr(runtime, 4026582008, "HT_WNETENUM_WNetEnumResourceW");
        method_add_ce_kernel_addr(runtime, 4026580984, "SH_GDI_AddFontResourceW");
        method_add_ce_kernel_addr(runtime, 4026580980, "SH_GDI_BitBlt");
        method_add_ce_kernel_addr(runtime, 4026580976, "SH_GDI_CombineRgn");
        method_add_ce_kernel_addr(runtime, 4026580972, "SH_GDI_CreateCompatibleDC");
        method_add_ce_kernel_addr(runtime, 4026580968, "SH_GDI_CreateDIBPatternBrushPt");
        method_add_ce_kernel_addr(runtime, 4026580964, "SH_GDI_CreateDIBSection");
        method_add_ce_kernel_addr(runtime, 4026580960, "SH_GDI_CreateFontIndirectW");
        method_add_ce_kernel_addr(runtime, 4026580956, "SH_GDI_CreateRectRgnIndirect");
        method_add_ce_kernel_addr(runtime, 4026580952, "SH_GDI_CreatePenIndirect");
        method_add_ce_kernel_addr(runtime, 4026580948, "SH_GDI_CreateSolidBrush");
        method_add_ce_kernel_addr(runtime, 4026580944, "SH_GDI_DeleteDC");
        method_add_ce_kernel_addr(runtime, 4026580940, "SH_GDI_DeleteObject");
        method_add_ce_kernel_addr(runtime, 4026580936, "SH_GDI_DrawEdge");
        method_add_ce_kernel_addr(runtime, 4026580932, "SH_GDI_DrawFocusRect");
        method_add_ce_kernel_addr(runtime, 4026580928, "SH_GDI_DrawTextW");
        method_add_ce_kernel_addr(runtime, 4026580924, "SH_GDI_Ellipse");
        method_add_ce_kernel_addr(runtime, 4026580920, "SH_GDI_EnumFontFamiliesW");
        method_add_ce_kernel_addr(runtime, 4026580916, "SH_GDI_EnumFontsW");
        method_add_ce_kernel_addr(runtime, 4026580912, "SH_GDI_ExcludeClipRect");
        method_add_ce_kernel_addr(runtime, 4026580908, "SH_GDI_ExtTextOutW");
        method_add_ce_kernel_addr(runtime, 4026580904, "SH_GDI_FillRect");
        method_add_ce_kernel_addr(runtime, 4026580896, "SH_GDI_GetBkColor");
        method_add_ce_kernel_addr(runtime, 4026580892, "SH_GDI_GetBkMode");
        method_add_ce_kernel_addr(runtime, 4026580888, "SH_GDI_GetClipRgn");
        method_add_ce_kernel_addr(runtime, 4026580884, "SH_GDI_GetCurrentObject");
        method_add_ce_kernel_addr(runtime, 4026580880, "SH_GDI_GetDeviceCaps");
        method_add_ce_kernel_addr(runtime, 4026580876, "SH_GDI_GetNearestColor");
        method_add_ce_kernel_addr(runtime, 4026580872, "SH_GDI_GetObjectW");
        method_add_ce_kernel_addr(runtime, 4026580868, "SH_GDI_GetObjectType");
        method_add_ce_kernel_addr(runtime, 4026580864, "SH_GDI_GetPixel");
        method_add_ce_kernel_addr(runtime, 4026580860, "SH_GDI_GetRegionData");
        method_add_ce_kernel_addr(runtime, 4026580856, "SH_GDI_GetRgnBox");
        method_add_ce_kernel_addr(runtime, 4026580852, "SH_GDI_GetStockObject");
        method_add_ce_kernel_addr(runtime, 4026580848, "SH_GDI_PatBlt");
        method_add_ce_kernel_addr(runtime, 4026580844, "SH_GDI_GetTextColor");
        method_add_ce_kernel_addr(runtime, 4026580840, "SH_GDI_GetTextExtentExPointW");
        method_add_ce_kernel_addr(runtime, 4026580836, "SH_GDI_GetTextFaceW");
        method_add_ce_kernel_addr(runtime, 4026580832, "SH_GDI_GetTextMetricsW");
        method_add_ce_kernel_addr(runtime, 4026580828, "SH_GDI_MaskBlt");
        method_add_ce_kernel_addr(runtime, 4026580824, "SH_GDI_OffsetRgn");
        method_add_ce_kernel_addr(runtime, 4026580820, "SH_GDI_Polygon");
        method_add_ce_kernel_addr(runtime, 4026580816, "SH_GDI_Polyline");
        method_add_ce_kernel_addr(runtime, 4026580812, "SH_GDI_PtInRegion");
        method_add_ce_kernel_addr(runtime, 4026580808, "SH_GDI_Rectangle");
        method_add_ce_kernel_addr(runtime, 4026580804, "SH_GDI_RectInRegion");
        method_add_ce_kernel_addr(runtime, 4026580800, "SH_GDI_RemoveFontResourceW");
        method_add_ce_kernel_addr(runtime, 4026580796, "SH_GDI_RestoreDC");
        method_add_ce_kernel_addr(runtime, 4026580792, "SH_GDI_RoundRect");
        method_add_ce_kernel_addr(runtime, 4026580788, "SH_GDI_SaveDC");
        method_add_ce_kernel_addr(runtime, 4026580784, "SH_GDI_SelectClipRgn");
        method_add_ce_kernel_addr(runtime, 4026580780, "SH_GDI_SelectObject");
        method_add_ce_kernel_addr(runtime, 4026580776, "SH_GDI_SetBkColor");
        method_add_ce_kernel_addr(runtime, 4026580772, "SH_GDI_SetBkMode");
        method_add_ce_kernel_addr(runtime, 4026580768, "SH_GDI_SetBrushOrgEx");
        method_add_ce_kernel_addr(runtime, 4026580764, "SH_GDI_SetPixel");
        method_add_ce_kernel_addr(runtime, 4026580760, "SH_GDI_SetTextColor");
        method_add_ce_kernel_addr(runtime, 4026580756, "SH_GDI_StretchBlt");
        method_add_ce_kernel_addr(runtime, 4026580752, "SH_GDI_CreateBitmap");
        method_add_ce_kernel_addr(runtime, 4026580748, "SH_GDI_CreateCompatibleBitmap");
        method_add_ce_kernel_addr(runtime, 4026580744, "SH_GDI_GetSysColorBrush");
        method_add_ce_kernel_addr(runtime, 4026580740, "SH_GDI_IntersectClipRect");
        method_add_ce_kernel_addr(runtime, 4026580736, "SH_GDI_GetClipBox");
        method_add_ce_kernel_addr(runtime, 4026580732, "SH_GDI_CeRemoveFontResource");
        method_add_ce_kernel_addr(runtime, 4026580728, "SH_GDI_EnableEUDC");
        method_add_ce_kernel_addr(runtime, 4026580724, "SH_GDI_CloseEnhMetaFile");
        method_add_ce_kernel_addr(runtime, 4026580720, "SH_GDI_CreateEnhMetaFileW");
        method_add_ce_kernel_addr(runtime, 4026580716, "SH_GDI_DeleteEnhMetaFile");
        method_add_ce_kernel_addr(runtime, 4026580712, "SH_GDI_PlayEnhMetaFile");
        method_add_ce_kernel_addr(runtime, 4026580708, "SH_GDI_CreatePalette");
        method_add_ce_kernel_addr(runtime, 4026580704, "SH_GDI_SelectPalette");
        method_add_ce_kernel_addr(runtime, 4026580700, "SH_GDI_RealizePalette");
        method_add_ce_kernel_addr(runtime, 4026580696, "SH_GDI_GetPaletteEntries");
        method_add_ce_kernel_addr(runtime, 4026580692, "SH_GDI_SetPaletteEntries");
        method_add_ce_kernel_addr(runtime, 4026580688, "SH_GDI_GetSystemPaletteEntries");
        method_add_ce_kernel_addr(runtime, 4026580684, "SH_GDI_GetNearestPaletteIndex");
        method_add_ce_kernel_addr(runtime, 4026580680, "SH_GDI_CreatePen");
        method_add_ce_kernel_addr(runtime, 4026580676, "SH_GDI_StartDocW");
        method_add_ce_kernel_addr(runtime, 4026580672, "SH_GDI_EndDoc");
        method_add_ce_kernel_addr(runtime, 4026580668, "SH_GDI_StartPage");
        method_add_ce_kernel_addr(runtime, 4026580664, "SH_GDI_EndPage");
        method_add_ce_kernel_addr(runtime, 4026580660, "SH_GDI_AbortDoc");
        method_add_ce_kernel_addr(runtime, 4026580656, "SH_GDI_SetAbortProc");
        method_add_ce_kernel_addr(runtime, 4026580652, "SH_GDI_CreateDCW");
        method_add_ce_kernel_addr(runtime, 4026580648, "SH_GDI_CreateRectRgn");
        method_add_ce_kernel_addr(runtime, 4026580644, "SH_GDI_FillRgn");
        method_add_ce_kernel_addr(runtime, 4026580640, "SH_GDI_SetROP2");
        method_add_ce_kernel_addr(runtime, 4026580636, "SH_GDI_SetRectRgn");
        method_add_ce_kernel_addr(runtime, 4026580632, "SH_GDI_RectVisible");
        method_add_ce_kernel_addr(runtime, 4026580628, "SH_GDI_CreatePatternBrush");
        method_add_ce_kernel_addr(runtime, 4026580624, "SH_GDI_CreateBitmapFromPointer");
        method_add_ce_kernel_addr(runtime, 4026580620, "SH_GDI_SetViewportOrgEx");
        method_add_ce_kernel_addr(runtime, 4026580616, "SH_GDI_TransparentImage");
        method_add_ce_kernel_addr(runtime, 4026580612, "SH_GDI_SetObjectOwner");
        method_add_ce_kernel_addr(runtime, 4026580608, "SH_GDI_TranslateCharsetInfo");
        method_add_ce_kernel_addr(runtime, 4026580604, "SH_GDI_ExtEscape");
        method_add_ce_kernel_addr(runtime, 4026580600, "SH_GDI_SetWindowsHookExW_Trap");
        method_add_ce_kernel_addr(runtime, 4026580596, "SH_GDI_UnhookWindowsHookEx_Trap");
        method_add_ce_kernel_addr(runtime, 4026580592, "SH_GDI_GetForegroundInfo");
        method_add_ce_kernel_addr(runtime, 4026580588, "SH_GDI_CeGetUserNotificationPreferences");
        method_add_ce_kernel_addr(runtime, 4026580584, "SH_GDI_CeSetUserNotificationEx");
        method_add_ce_kernel_addr(runtime, 4026580580, "SH_GDI_CeClearUserNotification");
        method_add_ce_kernel_addr(runtime, 4026580576, "SH_GDI_CeRunAppAtEvent");
        method_add_ce_kernel_addr(runtime, 4026580572, "SH_GDI_CeHandleAppNotifications");
        method_add_ce_kernel_addr(runtime, 4026580568, "SH_GDI_CeGetUserNotificationHandles");
        method_add_ce_kernel_addr(runtime, 4026580564, "SH_GDI_CeGetUserNotification");
        method_add_ce_kernel_addr(runtime, 4026580560, "SH_GDI_CeEventHasOccurred");
        method_add_ce_kernel_addr(runtime, 4026580556, "SH_GDI_SetWindowRgn_Trap");
        method_add_ce_kernel_addr(runtime, 4026580552, "SH_GDI_GetPrivateCallbacks_Trap");
        method_add_ce_kernel_addr(runtime, 4026580548, "SH_GDI_GetWindowRgn_Trap");
        method_add_ce_kernel_addr(runtime, 4026580544, "SH_GDI_CeRunAppAtTime");
        method_add_ce_kernel_addr(runtime, 4026580540, "SH_GDI_GetDesktopWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026580536, "SH_GDI_InSendMessage_Trap");
        method_add_ce_kernel_addr(runtime, 4026580532, "SH_GDI_GetQueueStatus_Trap");
        method_add_ce_kernel_addr(runtime, 4026580528, "SH_GDI_AllKeys_Trap");
        method_add_ce_kernel_addr(runtime, 4026580524, "SH_GDI_LoadAnimatedCursor_Trap");
        method_add_ce_kernel_addr(runtime, 4026580520, "SH_GDI_SendMessageTimeout");
        method_add_ce_kernel_addr(runtime, 4026580516, "SH_GDI_SetProp_Trap");
        method_add_ce_kernel_addr(runtime, 4026580512, "SH_GDI_GetProp_Trap");
        method_add_ce_kernel_addr(runtime, 4026580508, "SH_GDI_RemoveProp_Trap");
        method_add_ce_kernel_addr(runtime, 4026580504, "SH_GDI_EnumPropsEx_Trap");
        method_add_ce_kernel_addr(runtime, 4026580500, "SH_GDI_GetMessageQueueReadyTimeStamp");
        method_add_ce_kernel_addr(runtime, 4026580496, "SH_GDI_RegisterTaskBarEx");
        method_add_ce_kernel_addr(runtime, 4026580492, "SH_GDI_RegisterDesktop");
        method_add_ce_kernel_addr(runtime, 4026580488, "SH_GDI_GlobalAddAtomW");
        method_add_ce_kernel_addr(runtime, 4026580484, "SH_GDI_GlobalDeleteAtom");
        method_add_ce_kernel_addr(runtime, 4026580480, "SH_GDI_GlobalFindAtomW");
        method_add_ce_kernel_addr(runtime, 4026580476, "SH_GDI_MonitorFromPoint_Trap");
        method_add_ce_kernel_addr(runtime, 4026580472, "SH_GDI_MonitorFromRect_Trap");
        method_add_ce_kernel_addr(runtime, 4026580468, "SH_GDI_MonitorFromWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026580464, "SH_GDI_GetMonitorInfo_Trap");
        method_add_ce_kernel_addr(runtime, 4026580460, "SH_GDI_EnumDisplayMonitors_Trap");
        method_add_ce_kernel_addr(runtime, 4026580456, "SH_GDI_AccessibilitySoundSentryEvent_Trap");
        method_add_ce_kernel_addr(runtime, 4026580452, "SH_GDI_ChangeDisplaySettingsEx_Trap");
        method_add_ce_kernel_addr(runtime, 4026580448, "SH_GDI_InvalidateRgn_Trap");
        method_add_ce_kernel_addr(runtime, 4026580444, "SH_GDI_ValidateRgn_Trap");
        method_add_ce_kernel_addr(runtime, 4026580440, "SH_GDI_ExtCreateRegion");
        method_add_ce_kernel_addr(runtime, 4026580436, "SH_GDI_MoveToEx");
        method_add_ce_kernel_addr(runtime, 4026580432, "SH_GDI_LineTo");
        method_add_ce_kernel_addr(runtime, 4026580428, "SH_GDI_GetCurrentPositionEx");
        method_add_ce_kernel_addr(runtime, 4026580424, "SH_GDI_SetTextAlign");
        method_add_ce_kernel_addr(runtime, 4026580420, "SH_GDI_GetTextAlign");
        method_add_ce_kernel_addr(runtime, 4026580416, "SH_GDI_GetCharWidth32");
        method_add_ce_kernel_addr(runtime, 4026580412, "SH_GDI_GetDIBColorTable");
        method_add_ce_kernel_addr(runtime, 4026580408, "SH_GDI_SetDIBColorTable");
        method_add_ce_kernel_addr(runtime, 4026580404, "SH_GDI_StretchDIBits");
        method_add_ce_kernel_addr(runtime, 4026580400, "SH_GDI_RedrawWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026580396, "SH_GDI_SetBitmapBits");
        method_add_ce_kernel_addr(runtime, 4026580392, "SH_GDI_SetDIBitsToDevice");
        method_add_ce_kernel_addr(runtime, 4026580388, "SH_GDI_GradientFill");
        method_add_ce_kernel_addr(runtime, 4026580384, "SH_GDI_InvertRect");
        method_add_ce_kernel_addr(runtime, 4026580380, "SH_GDI_EnumDisplaySettings_Trap");
        method_add_ce_kernel_addr(runtime, 4026580376, "SH_GDI_EnumDisplayDevices_Trap");
        method_add_ce_kernel_addr(runtime, 4026580372, "SH_GDI_GetCharABCWidths");
        method_add_ce_kernel_addr(runtime, 4026580368, "SH_GDI_ShowStartupWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026580364, "SH_GDI_GetGweApiSetTables");
        method_add_ce_kernel_addr(runtime, 4026580360, "SH_GDI_GetStretchBltMode");
        method_add_ce_kernel_addr(runtime, 4026580356, "SH_GDI_SetStretchBltMode");
        method_add_ce_kernel_addr(runtime, 4026580352, "SH_GDI_AlphaBlend");
        method_add_ce_kernel_addr(runtime, 4026580348, "SH_GDI_GetIconInfo");
        method_add_ce_kernel_addr(runtime, 4026580344, "SH_GDI_EnumFontFamiliesExW");
        method_add_ce_kernel_addr(runtime, 4026580340, "SH_GDI_GetFontData");
        method_add_ce_kernel_addr(runtime, 4026580336, "SH_GDI_GetCharABCWidthsI");
        method_add_ce_kernel_addr(runtime, 4026580332, "SH_GDI_GetOutlineTextMetricsW");
        method_add_ce_kernel_addr(runtime, 4026580328, "SH_GDI_SetLayout");
        method_add_ce_kernel_addr(runtime, 4026580324, "SH_GDI_GetLayout");
        method_add_ce_kernel_addr(runtime, 4026580320, "SH_GDI_SetTextCharacterExtra");
        method_add_ce_kernel_addr(runtime, 4026580316, "SH_GDI_GetTextCharacterExtra");
        method_add_ce_kernel_addr(runtime, 4026580312, "SH_GDI_ImmGetKeyboardLayout");
        method_add_ce_kernel_addr(runtime, 4026580308, "SH_GDI_GetViewportOrgEx");
        method_add_ce_kernel_addr(runtime, 4026580304, "SH_GDI_GetViewportExtEx");
        method_add_ce_kernel_addr(runtime, 4026580300, "SH_GDI_OffsetViewportOrgEx");
        method_add_ce_kernel_addr(runtime, 4026580296, "SH_GDI_GetROP2");
        method_add_ce_kernel_addr(runtime, 4026580292, "SH_GDI_SetWindowOrgEx");
        method_add_ce_kernel_addr(runtime, 4026580288, "SH_GDI_GetWindowOrgEx");
        method_add_ce_kernel_addr(runtime, 4026580284, "SH_GDI_GetWindowExtEx");
        method_add_ce_kernel_addr(runtime, 4026580276, "SH_GDI_Gesture");
        method_add_ce_kernel_addr(runtime, 4026580272, "SH_GDI_GetWindowAutoGesture");
        method_add_ce_kernel_addr(runtime, 4026580268, "SH_GDI_SetWindowAutoGesture");
        method_add_ce_kernel_addr(runtime, 4026580264, "SH_GDI_RegisterGesture");
        method_add_ce_kernel_addr(runtime, 4026580260, "SH_GDI_RegisterDefaultGestureHandler");
        method_add_ce_kernel_addr(runtime, 4026580256, "SH_GDI_SetLayeredWindowAttributes");
        method_add_ce_kernel_addr(runtime, 4026580252, "SH_GDI_GetLayeredWindowAttributes");
        method_add_ce_kernel_addr(runtime, 4026580248, "SH_GDI_UpdateLayeredWindow");
        method_add_ce_kernel_addr(runtime, 4026580244, "SH_GDI_UpdateLayeredWindowIndirect");
        method_add_ce_kernel_addr(runtime, 4026580240, "SH_GDI_DrawThemePrimitive");
        method_add_ce_kernel_addr(runtime, 4026580236, "SH_GDI_ThemePrimitiveExists");
        method_add_ce_kernel_addr(runtime, 4026580232, "SH_GDI_UpdateThemePrimitives");
        method_add_ce_kernel_addr(runtime, 4026580228, "SH_GDI_COREDLL_2872");
        method_add_ce_kernel_addr(runtime, 4026579960, "SH_WMGR_RegisterClassWApiSetEntry_Trap");
        method_add_ce_kernel_addr(runtime, 4026579956, "SH_WMGR_UnregisterClassW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579952, "SH_WMGR_CreateWindowExW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579948, "SH_WMGR_PostMessageW");
        method_add_ce_kernel_addr(runtime, 4026579944, "SH_WMGR_PostQuitMessage_Trap");
        method_add_ce_kernel_addr(runtime, 4026579940, "SH_WMGR_SendMessageW");
        method_add_ce_kernel_addr(runtime, 4026579936, "SH_WMGR_GetMessageW");
        method_add_ce_kernel_addr(runtime, 4026579932, "SH_WMGR_TranslateMessage_Trap");
        method_add_ce_kernel_addr(runtime, 4026579928, "SH_WMGR_DispatchMessageW");
        method_add_ce_kernel_addr(runtime, 4026579924, "SH_WMGR_GetCapture_Trap");
        method_add_ce_kernel_addr(runtime, 4026579920, "SH_WMGR_SetCapture_Trap");
        method_add_ce_kernel_addr(runtime, 4026579916, "SH_WMGR_ReleaseCapture_Trap");
        method_add_ce_kernel_addr(runtime, 4026579912, "SH_WMGR_SetWindowPos");
        method_add_ce_kernel_addr(runtime, 4026579908, "SH_WMGR_GetWindowRect");
        method_add_ce_kernel_addr(runtime, 4026579904, "SH_WMGR_GetClientRect");
        method_add_ce_kernel_addr(runtime, 4026579900, "SH_WMGR_InvalidateRect");
        method_add_ce_kernel_addr(runtime, 4026579896, "SH_WMGR_GetWindow");
        method_add_ce_kernel_addr(runtime, 4026579892, "SH_WMGR_GetSystemMetrics");
        method_add_ce_kernel_addr(runtime, 4026579888, "SH_WMGR_ImageList_GetDragImage");
        method_add_ce_kernel_addr(runtime, 4026579884, "SH_WMGR_ImageList_GetIconSize");
        method_add_ce_kernel_addr(runtime, 4026579880, "SH_WMGR_ImageList_SetIconSize");
        method_add_ce_kernel_addr(runtime, 4026579876, "SH_WMGR_ImageList_GetImageInfo");
        method_add_ce_kernel_addr(runtime, 4026579872, "SH_WMGR_ImageList_Merge");
        method_add_ce_kernel_addr(runtime, 4026579868, "SH_WMGR_ShowCursor_Trap");
        method_add_ce_kernel_addr(runtime, 4026579864, "SH_WMGR_SetCursorPos_Trap");
        method_add_ce_kernel_addr(runtime, 4026579860, "SH_WMGR_ImageList_CopyDitherImage");
        method_add_ce_kernel_addr(runtime, 4026579856, "SH_WMGR_ImageList_DrawIndirect");
        method_add_ce_kernel_addr(runtime, 4026579852, "SH_WMGR_ImageList_DragShowNolock");
        method_add_ce_kernel_addr(runtime, 4026579848, "SH_WMGR_WindowFromPoint_Trap");
        method_add_ce_kernel_addr(runtime, 4026579844, "SH_WMGR_ChildWindowFromPoint_Trap");
        method_add_ce_kernel_addr(runtime, 4026579840, "SH_WMGR_ClientToScreen");
        method_add_ce_kernel_addr(runtime, 4026579836, "SH_WMGR_ScreenToClient_Trap");
        method_add_ce_kernel_addr(runtime, 4026579832, "SH_WMGR_SetWindowTextW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579828, "SH_WMGR_GetWindowTextW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579824, "SH_WMGR_SetWindowLongW");
        method_add_ce_kernel_addr(runtime, 4026579820, "SH_WMGR_GetWindowLongW");
        method_add_ce_kernel_addr(runtime, 4026579816, "SH_WMGR_BeginPaint");
        method_add_ce_kernel_addr(runtime, 4026579812, "SH_WMGR_EndPaint");
        method_add_ce_kernel_addr(runtime, 4026579808, "SH_WMGR_GetDC");
        method_add_ce_kernel_addr(runtime, 4026579804, "SH_WMGR_ReleaseDC");
        method_add_ce_kernel_addr(runtime, 4026579800, "SH_WMGR_DefWindowProcW");
        method_add_ce_kernel_addr(runtime, 4026579796, "SH_WMGR_GetClassLongW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579792, "SH_WMGR_SetClassLongW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579788, "SH_WMGR_DestroyWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026579784, "SH_WMGR_ShowWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026579780, "SH_WMGR_UpdateWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026579776, "SH_WMGR_SetParent_Trap");
        method_add_ce_kernel_addr(runtime, 4026579772, "SH_WMGR_GetParent");
        method_add_ce_kernel_addr(runtime, 4026579768, "SH_WMGR_MessageBoxW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579764, "SH_WMGR_SetFocus_Trap");
        method_add_ce_kernel_addr(runtime, 4026579760, "SH_WMGR_GetFocus");
        method_add_ce_kernel_addr(runtime, 4026579756, "SH_WMGR_GetActiveWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026579752, "SH_WMGR_GetWindowDC_Trap");
        method_add_ce_kernel_addr(runtime, 4026579748, "SH_WMGR_GetSysColor");
        method_add_ce_kernel_addr(runtime, 4026579744, "SH_WMGR_AdjustWindowRectEx_Trap");
        method_add_ce_kernel_addr(runtime, 4026579740, "SH_WMGR_IsWindow");
        method_add_ce_kernel_addr(runtime, 4026579736, "SH_WMGR_CreatePopupMenu_Trap");
        method_add_ce_kernel_addr(runtime, 4026579732, "SH_WMGR_InsertMenuW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579728, "SH_WMGR_AppendMenuW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579724, "SH_WMGR_RemoveMenu_Trap");
        method_add_ce_kernel_addr(runtime, 4026579720, "SH_WMGR_DestroyMenu_Trap");
        method_add_ce_kernel_addr(runtime, 4026579716, "SH_WMGR_TrackPopupMenuEx_Trap");
        method_add_ce_kernel_addr(runtime, 4026579712, "SH_WMGR_LoadMenuW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579708, "SH_WMGR_EnableMenuItem_Trap");
        method_add_ce_kernel_addr(runtime, 4026579704, "SH_WMGR_MoveWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026579700, "SH_WMGR_GetUpdateRgn_Trap");
        method_add_ce_kernel_addr(runtime, 4026579696, "SH_WMGR_GetUpdateRect_Trap");
        method_add_ce_kernel_addr(runtime, 4026579692, "SH_WMGR_BringWindowToTop_Trap");
        method_add_ce_kernel_addr(runtime, 4026579688, "SH_WMGR_GetWindowTextLengthW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579684, "SH_WMGR_IsChild_Trap");
        method_add_ce_kernel_addr(runtime, 4026579680, "SH_WMGR_IsWindowVisible");
        method_add_ce_kernel_addr(runtime, 4026579676, "SH_WMGR_ValidateRect_Trap");
        method_add_ce_kernel_addr(runtime, 4026579672, "SH_WMGR_LoadBitmapW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579668, "SH_WMGR_CheckMenuItem_Trap");
        method_add_ce_kernel_addr(runtime, 4026579664, "SH_WMGR_CheckMenuRadioItem_Trap");
        method_add_ce_kernel_addr(runtime, 4026579660, "SH_WMGR_DeleteMenu");
        method_add_ce_kernel_addr(runtime, 4026579656, "SH_WMGR_LoadIconW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579652, "SH_WMGR_DrawIconEx_Trap");
        method_add_ce_kernel_addr(runtime, 4026579648, "SH_WMGR_DestroyIcon_Trap");
        method_add_ce_kernel_addr(runtime, 4026579644, "SH_WMGR_GetAsyncKeyState");
        method_add_ce_kernel_addr(runtime, 4026579640, "SH_WMGR_multitouch_event");
        method_add_ce_kernel_addr(runtime, 4026579636, "SH_WMGR_DialogBoxIndirectParamW");
        method_add_ce_kernel_addr(runtime, 4026579632, "SH_WMGR_EndDialog");
        method_add_ce_kernel_addr(runtime, 4026579628, "SH_WMGR_GetDlgItem");
        method_add_ce_kernel_addr(runtime, 4026579624, "SH_WMGR_GetDlgCtrlID");
        method_add_ce_kernel_addr(runtime, 4026579620, "SH_WMGR_GetKeyState");
        method_add_ce_kernel_addr(runtime, 4026579616, "SH_WMGR_KeybdGetDeviceInfo");
        method_add_ce_kernel_addr(runtime, 4026579612, "SH_WMGR_KeybdInitStates");
        method_add_ce_kernel_addr(runtime, 4026579608, "SH_WMGR_PostKeybdMessage");
        method_add_ce_kernel_addr(runtime, 4026579604, "SH_WMGR_KeybdVKeyToUnicode");
        method_add_ce_kernel_addr(runtime, 4026579600, "SH_WMGR_keybd_event");
        method_add_ce_kernel_addr(runtime, 4026579596, "SH_WMGR_mouse_event");
        method_add_ce_kernel_addr(runtime, 4026579592, "SH_WMGR_SetScrollInfo");
        method_add_ce_kernel_addr(runtime, 4026579588, "SH_WMGR_SetScrollPos");
        method_add_ce_kernel_addr(runtime, 4026579584, "SH_WMGR_SetScrollRange");
        method_add_ce_kernel_addr(runtime, 4026579580, "SH_WMGR_GetScrollInfo");
        method_add_ce_kernel_addr(runtime, 4026579576, "SH_WMGR_PeekMessageW");
        method_add_ce_kernel_addr(runtime, 4026579572, "SH_WMGR_MapVirtualKeyW");
        method_add_ce_kernel_addr(runtime, 4026579568, "SH_WMGR_GetMessageWNoWait");
        method_add_ce_kernel_addr(runtime, 4026579564, "SH_WMGR_GetClassNameW");
        method_add_ce_kernel_addr(runtime, 4026579560, "SH_WMGR_MapWindowPoints");
        method_add_ce_kernel_addr(runtime, 4026579556, "SH_WMGR_LoadImageW");
        method_add_ce_kernel_addr(runtime, 4026579552, "SH_WMGR_GetForegroundWindow");
        method_add_ce_kernel_addr(runtime, 4026579548, "SH_WMGR_SetForegroundWindow");
        method_add_ce_kernel_addr(runtime, 4026579544, "SH_WMGR_RegisterTaskBar");
        method_add_ce_kernel_addr(runtime, 4026579540, "SH_WMGR_SetActiveWindow");
        method_add_ce_kernel_addr(runtime, 4026579536, "SH_WMGR_CallWindowProcW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579532, "SH_WMGR_GetClassInfoW");
        method_add_ce_kernel_addr(runtime, 4026579528, "SH_WMGR_GetNextDlgTabItem");
        method_add_ce_kernel_addr(runtime, 4026579524, "SH_WMGR_CreateDialogIndirectParamW");
        method_add_ce_kernel_addr(runtime, 4026579520, "SH_WMGR_IsDialogMessageW");
        method_add_ce_kernel_addr(runtime, 4026579516, "SH_WMGR_SetDlgItemInt");
        method_add_ce_kernel_addr(runtime, 4026579512, "SH_WMGR_GetDlgItemInt");
        method_add_ce_kernel_addr(runtime, 4026579508, "SH_WMGR_FindWindowW");
        method_add_ce_kernel_addr(runtime, 4026579504, "SH_WMGR_CreateCaret");
        method_add_ce_kernel_addr(runtime, 4026579500, "SH_WMGR_DestroyCaret");
        method_add_ce_kernel_addr(runtime, 4026579496, "SH_WMGR_HideCaret");
        method_add_ce_kernel_addr(runtime, 4026579492, "SH_WMGR_ShowCaret");
        method_add_ce_kernel_addr(runtime, 4026579488, "SH_WMGR_SetCaretPos");
        method_add_ce_kernel_addr(runtime, 4026579484, "SH_WMGR_GetCaretPos");
        method_add_ce_kernel_addr(runtime, 4026579480, "SH_WMGR_GetCursorPos_Trap");
        method_add_ce_kernel_addr(runtime, 4026579476, "SH_WMGR_ClipCursor");
        method_add_ce_kernel_addr(runtime, 4026579472, "SH_WMGR_GetClipCursor");
        method_add_ce_kernel_addr(runtime, 4026579468, "SH_WMGR_GetCursor_Trap");
        method_add_ce_kernel_addr(runtime, 4026579464, "SH_WMGR_ExtractIconExW");
        method_add_ce_kernel_addr(runtime, 4026579460, "SH_WMGR_SetTimer_Trap");
        method_add_ce_kernel_addr(runtime, 4026579456, "SH_WMGR_KillTimer_Trap");
        method_add_ce_kernel_addr(runtime, 4026579452, "SH_WMGR_GetNextDlgGroupItem");
        method_add_ce_kernel_addr(runtime, 4026579448, "SH_WMGR_CheckRadioButton");
        method_add_ce_kernel_addr(runtime, 4026579444, "SH_WMGR_EnableWindow");
        method_add_ce_kernel_addr(runtime, 4026579440, "SH_WMGR_IsWindowEnabled");
        method_add_ce_kernel_addr(runtime, 4026579436, "SH_WMGR_CreateMenu");
        method_add_ce_kernel_addr(runtime, 4026579432, "SH_WMGR_GetSubMenu");
        method_add_ce_kernel_addr(runtime, 4026579428, "SH_WMGR_DefDlgProcW");
        method_add_ce_kernel_addr(runtime, 4026579424, "SH_WMGR_SendNotifyMessageW");
        method_add_ce_kernel_addr(runtime, 4026579420, "SH_WMGR_PostThreadMessageW");
        method_add_ce_kernel_addr(runtime, 4026579416, "SH_WMGR_TranslateAcceleratorW");
        method_add_ce_kernel_addr(runtime, 4026579412, "SH_WMGR_GetKeyboardLayout");
        method_add_ce_kernel_addr(runtime, 4026579408, "SH_WMGR_GetKeyboardLayoutList");
        method_add_ce_kernel_addr(runtime, 4026579404, "SH_WMGR_GetKeyboardType");
        method_add_ce_kernel_addr(runtime, 4026579400, "SH_WMGR_ImageList_Create");
        method_add_ce_kernel_addr(runtime, 4026579396, "SH_WMGR_ImageList_Destroy");
        method_add_ce_kernel_addr(runtime, 4026579392, "SH_WMGR_ImageList_GetImageCount");
        method_add_ce_kernel_addr(runtime, 4026579388, "SH_WMGR_ImageList_Add");
        method_add_ce_kernel_addr(runtime, 4026579384, "SH_WMGR_ImageList_ReplaceIcon");
        method_add_ce_kernel_addr(runtime, 4026579380, "SH_WMGR_ImageList_SetBkColor");
        method_add_ce_kernel_addr(runtime, 4026579376, "SH_WMGR_ImageList_GetBkColor");
        method_add_ce_kernel_addr(runtime, 4026579372, "SH_WMGR_ImageList_SetOverlayImage");
        method_add_ce_kernel_addr(runtime, 4026579368, "SH_WMGR_ImageList_Draw");
        method_add_ce_kernel_addr(runtime, 4026579364, "SH_WMGR_ImageList_Replace");
        method_add_ce_kernel_addr(runtime, 4026579360, "SH_WMGR_ImageList_AddMasked");
        method_add_ce_kernel_addr(runtime, 4026579356, "SH_WMGR_ImageList_DrawEx");
        method_add_ce_kernel_addr(runtime, 4026579352, "SH_WMGR_ImageList_Remove");
        method_add_ce_kernel_addr(runtime, 4026579348, "SH_WMGR_ImageList_GetIcon");
        method_add_ce_kernel_addr(runtime, 4026579344, "SH_WMGR_ImageList_LoadImage");
        method_add_ce_kernel_addr(runtime, 4026579340, "SH_WMGR_ImageList_BeginDrag");
        method_add_ce_kernel_addr(runtime, 4026579336, "SH_WMGR_ImageList_EndDrag");
        method_add_ce_kernel_addr(runtime, 4026579332, "SH_WMGR_ImageList_DragEnter");
        method_add_ce_kernel_addr(runtime, 4026579328, "SH_WMGR_ImageList_DragLeave");
        method_add_ce_kernel_addr(runtime, 4026579324, "SH_WMGR_ImageList_DragMove");
        method_add_ce_kernel_addr(runtime, 4026579320, "SH_WMGR_ImageList_SetDragCursorImage");
        method_add_ce_kernel_addr(runtime, 4026579316, "SH_WMGR_AudioUpdateFromRegistry");
        method_add_ce_kernel_addr(runtime, 4026579312, "SH_WMGR_ScrollDC");
        method_add_ce_kernel_addr(runtime, 4026579308, "SH_WMGR_ScrollWindowEx");
        method_add_ce_kernel_addr(runtime, 4026579304, "SH_WMGR_OpenClipboard");
        method_add_ce_kernel_addr(runtime, 4026579300, "SH_WMGR_CloseClipboard");
        method_add_ce_kernel_addr(runtime, 4026579296, "SH_WMGR_GetClipboardOwner");
        method_add_ce_kernel_addr(runtime, 4026579292, "SH_WMGR_SetClipboardData");
        method_add_ce_kernel_addr(runtime, 4026579288, "SH_WMGR_GetClipboardDataGwe");
        method_add_ce_kernel_addr(runtime, 4026579284, "SH_WMGR_RegisterClipboardFormatW");
        method_add_ce_kernel_addr(runtime, 4026579280, "SH_WMGR_CountClipboardFormats");
        method_add_ce_kernel_addr(runtime, 4026579276, "SH_WMGR_EnumClipboardFormats");
        method_add_ce_kernel_addr(runtime, 4026579272, "SH_WMGR_GetClipboardFormatNameW");
        method_add_ce_kernel_addr(runtime, 4026579268, "SH_WMGR_EmptyClipboard");
        method_add_ce_kernel_addr(runtime, 4026579264, "SH_WMGR_IsClipboardFormatAvailable");
        method_add_ce_kernel_addr(runtime, 4026579260, "SH_WMGR_GetPriorityClipboardFormat");
        method_add_ce_kernel_addr(runtime, 4026579256, "SH_WMGR_GetOpenClipboardWindow");
        method_add_ce_kernel_addr(runtime, 4026579252, "SH_WMGR_MessageBeep");
        method_add_ce_kernel_addr(runtime, 4026579248, "SH_WMGR_SystemIdleTimerReset");
        method_add_ce_kernel_addr(runtime, 4026579244, "SH_WMGR_SystemIdleTimerUpdateMax");
        method_add_ce_kernel_addr(runtime, 4026579240, "SH_WMGR_Unused182");
        method_add_ce_kernel_addr(runtime, 4026579236, "SH_WMGR_SetKeyboardTarget");
        method_add_ce_kernel_addr(runtime, 4026579232, "SH_WMGR_GetKeyboardTarget");
        method_add_ce_kernel_addr(runtime, 4026579228, "SH_WMGR_NotifyWinUserSystem");
        method_add_ce_kernel_addr(runtime, 4026579224, "SH_WMGR_SetMenuItemInfoW");
        method_add_ce_kernel_addr(runtime, 4026579220, "SH_WMGR_GetMenuItemInfoW");
        method_add_ce_kernel_addr(runtime, 4026579216, "SH_WMGR_SetCaretBlinkTime");
        method_add_ce_kernel_addr(runtime, 4026579212, "SH_WMGR_GetCaretBlinkTime");
        method_add_ce_kernel_addr(runtime, 4026579208, "SH_WMGR_GetMessagePos");
        method_add_ce_kernel_addr(runtime, 4026579204, "SH_WMGR_QASetWindowsJournalHook");
        method_add_ce_kernel_addr(runtime, 4026579200, "SH_WMGR_QAUnhookWindowsJournalHook");
        method_add_ce_kernel_addr(runtime, 4026579196, "SH_WMGR_NLedGetDeviceInfo");
        method_add_ce_kernel_addr(runtime, 4026579192, "SH_WMGR_NLedSetDevice");
        method_add_ce_kernel_addr(runtime, 4026579188, "SH_WMGR_EnumWindows_Trap");
        method_add_ce_kernel_addr(runtime, 4026579184, "SH_WMGR_RectangleAnimation");
        method_add_ce_kernel_addr(runtime, 4026579180, "SH_WMGR_MapDialogRect");
        method_add_ce_kernel_addr(runtime, 4026579176, "SH_WMGR_GetSystemPowerStatusEx");
        method_add_ce_kernel_addr(runtime, 4026579172, "SH_WMGR_GetDialogBaseUnits");
        method_add_ce_kernel_addr(runtime, 4026579168, "SH_WMGR_GetDoubleClickTime");
        method_add_ce_kernel_addr(runtime, 4026579164, "SH_WMGR_GetWindowThreadProcessId");
        method_add_ce_kernel_addr(runtime, 4026579160, "SH_WMGR_CreateIconIndirect");
        method_add_ce_kernel_addr(runtime, 4026579156, "SH_WMGR_ShellModalEnd");
        method_add_ce_kernel_addr(runtime, 4026579152, "SH_WMGR_TouchCalibrate");
        method_add_ce_kernel_addr(runtime, 4026579148, "SH_WMGR_BatteryGetLifeTimeInfo");
        method_add_ce_kernel_addr(runtime, 4026579144, "SH_WMGR_BatteryDrvrGetLevels");
        method_add_ce_kernel_addr(runtime, 4026579140, "SH_WMGR_GwesPowerOffSystem");
        method_add_ce_kernel_addr(runtime, 4026579136, "SH_WMGR_BatteryNotifyOfTimeChange");
        method_add_ce_kernel_addr(runtime, 4026579132, "SH_WMGR_LoadCursorW_Trap");
        method_add_ce_kernel_addr(runtime, 4026579128, "SH_WMGR_SetCursor");
        method_add_ce_kernel_addr(runtime, 4026579124, "SH_WMGR_DestroyCursor_Trap");
        method_add_ce_kernel_addr(runtime, 4026579120, "SH_WMGR_DisableCaretSystemWide");
        method_add_ce_kernel_addr(runtime, 4026579116, "SH_WMGR_EnableCaretSystemWide");
        method_add_ce_kernel_addr(runtime, 4026579112, "SH_WMGR_GetMouseMovePoints");
        method_add_ce_kernel_addr(runtime, 4026579108, "SH_WMGR_BatteryDrvrSupportsChangeNotification");
        method_add_ce_kernel_addr(runtime, 4026579104, "SH_WMGR_EnableHardwareKeyboard");
        method_add_ce_kernel_addr(runtime, 4026579100, "SH_WMGR_GetKeyboardStatus");
        method_add_ce_kernel_addr(runtime, 4026579096, "SH_WMGR_RegisterSIPanel");
        method_add_ce_kernel_addr(runtime, 4026579092, "SH_WMGR_GetAsyncShiftFlags");
        method_add_ce_kernel_addr(runtime, 4026579088, "SH_WMGR_MsgWaitForMultipleObjectsEx");
        method_add_ce_kernel_addr(runtime, 4026579084, "SH_WMGR_SetAssociatedMenu");
        method_add_ce_kernel_addr(runtime, 4026579080, "SH_WMGR_GetAssociatedMenu");
        method_add_ce_kernel_addr(runtime, 4026579076, "SH_WMGR_DrawMenuBar");
        method_add_ce_kernel_addr(runtime, 4026579072, "SH_WMGR_SetSysColors");
        method_add_ce_kernel_addr(runtime, 4026579068, "SH_WMGR_DrawFrameControl");
        method_add_ce_kernel_addr(runtime, 4026579064, "SH_WMGR_CreateCursor_Trap");
        method_add_ce_kernel_addr(runtime, 4026579060, "SH_WMGR_RegisterWindowMessageW");
        method_add_ce_kernel_addr(runtime, 4026579056, "SH_WMGR_SystemParametersInfo_GWE_Trap");
        method_add_ce_kernel_addr(runtime, 4026579052, "SH_WMGR_SendInput");
        method_add_ce_kernel_addr(runtime, 4026579048, "SH_WMGR_SendDlgItemMessageW");
        method_add_ce_kernel_addr(runtime, 4026579044, "SH_WMGR_SetDlgItemTextW");
        method_add_ce_kernel_addr(runtime, 4026579040, "SH_WMGR_GetDlgItemTextW");
        method_add_ce_kernel_addr(runtime, 4026579036, "SH_WMGR_GetMessageSource_Trap");
        method_add_ce_kernel_addr(runtime, 4026579032, "SH_WMGR_RegisterHotKey_Trap");
        method_add_ce_kernel_addr(runtime, 4026579028, "SH_WMGR_UnregisterHotKey_Trap");
        method_add_ce_kernel_addr(runtime, 4026579024, "SH_WMGR_ImageList_Copy");
        method_add_ce_kernel_addr(runtime, 4026579020, "SH_WMGR_ImageList_Duplicate");
        method_add_ce_kernel_addr(runtime, 4026579016, "SH_WMGR_ImageList_SetImageCount");
        method_add_ce_kernel_addr(runtime, 4026579012, "SH_WMGR_UnregisterFunc1_Trap");
        method_add_ce_kernel_addr(runtime, 4026579008, "SH_WMGR_ImmGetContextFromWindowGwe");
        method_add_ce_kernel_addr(runtime, 4026579004, "SH_WMGR_ImmAssociateContextWithWindowGwe");
        method_add_ce_kernel_addr(runtime, 4026579000, "SH_WMGR_ImmSetHotKey");
        method_add_ce_kernel_addr(runtime, 4026578996, "SH_WMGR_BeginDeferWindowPos_Trap");
        method_add_ce_kernel_addr(runtime, 4026578992, "SH_WMGR_DeferWindowPos_Trap");
        method_add_ce_kernel_addr(runtime, 4026578988, "SH_WMGR_EndDeferWindowPos_Trap");
        method_add_ce_kernel_addr(runtime, 4026578984, "SH_WMGR_ImmGetHotKey");
        method_add_ce_kernel_addr(runtime, 4026578980, "SH_WMGR_GetDCEx_Trap");
        method_add_ce_kernel_addr(runtime, 4026578976, "SH_WMGR_GwesPowerDown");
        method_add_ce_kernel_addr(runtime, 4026578972, "SH_WMGR_GwesPowerUp");
        method_add_ce_kernel_addr(runtime, 4026578960, "SH_WMGR_LoadKeyboardLayoutW");
        method_add_ce_kernel_addr(runtime, 4026578956, "SH_WMGR_ActivateKeyboardLayout");
        method_add_ce_kernel_addr(runtime, 4026578952, "SH_WMGR_GetSystemPowerStatusEx2");
        method_add_ce_kernel_addr(runtime, 4026578948, "SH_WMGR_GetKeyboardLayoutNameW");
        method_add_ce_kernel_addr(runtime, 4026578940, "SH_WNET_WNetAddConnection3W");
        method_add_ce_kernel_addr(runtime, 4026578936, "SH_WNET_WNetCancelConnection2W");
        method_add_ce_kernel_addr(runtime, 4026578932, "SH_WNET_WNetConnectionDialog1W");
        method_add_ce_kernel_addr(runtime, 4026578928, "SH_WNET_WNetDisconnectDialog");
        method_add_ce_kernel_addr(runtime, 4026578924, "SH_WNET_WNetDisconnectDialog1W");
        method_add_ce_kernel_addr(runtime, 4026578920, "SH_WNET_WNetGetConnectionW");
        method_add_ce_kernel_addr(runtime, 4026578916, "SH_WNET_WNetGetUniversalNameW");
        method_add_ce_kernel_addr(runtime, 4026578912, "SH_WNET_WNetGetUserW");
        method_add_ce_kernel_addr(runtime, 4026578908, "SH_WNET_WNetOpenEnumW");
        method_add_ce_kernel_addr(runtime, 4026577912, "SH_COMM_AFDSocket");
        method_add_ce_kernel_addr(runtime, 4026577908, "SH_COMM_AFDControl");
        method_add_ce_kernel_addr(runtime, 4026577904, "SH_COMM_AFDEnumProtocolsW");
        method_add_ce_kernel_addr(runtime, 4026577900, "SH_COMM_RasDial");
        method_add_ce_kernel_addr(runtime, 4026577896, "SH_COMM_RasHangup");
        method_add_ce_kernel_addr(runtime, 4026577892, "SH_COMM_AFDGetHostentByAttr");
        method_add_ce_kernel_addr(runtime, 4026577888, "SH_COMM_AFDAddIPHostent");
        method_add_ce_kernel_addr(runtime, 4026577884, "SH_COMM_RasIOControl");
        method_add_ce_kernel_addr(runtime, 4026577880, "SH_COMM_AFDSelect");
        method_add_ce_kernel_addr(runtime, 4026577876, "SH_COMM_RasEnumEntries");
        method_add_ce_kernel_addr(runtime, 4026577872, "SH_COMM_RasGetEntryDialParams");
        method_add_ce_kernel_addr(runtime, 4026577868, "SH_COMM_RasSetEntryDialParams");
        method_add_ce_kernel_addr(runtime, 4026577864, "SH_COMM_RasGetEntryProperties");
        method_add_ce_kernel_addr(runtime, 4026577860, "SH_COMM_RasSetEntryProperties");
        method_add_ce_kernel_addr(runtime, 4026577856, "SH_COMM_RasValidateEntryName");
        method_add_ce_kernel_addr(runtime, 4026577852, "SH_COMM_RasDeleteEntry");
        method_add_ce_kernel_addr(runtime, 4026577848, "SH_COMM_RasRenameEntry");
        method_add_ce_kernel_addr(runtime, 4026577844, "SH_COMM_AFDAddInterface");
        method_add_ce_kernel_addr(runtime, 4026577840, "SH_COMM_RasEnumConnections");
        method_add_ce_kernel_addr(runtime, 4026577836, "SH_COMM_RasGetConnectStatus");
        method_add_ce_kernel_addr(runtime, 4026577832, "SH_COMM_RasGetEntryDevConfig");
        method_add_ce_kernel_addr(runtime, 4026577828, "SH_COMM_RasSetEntryDevConfig");
        method_add_ce_kernel_addr(runtime, 4026577824, "SH_COMM_NETbios");
        method_add_ce_kernel_addr(runtime, 4026577816, "SH_COMM_PMInstallProvider");
        method_add_ce_kernel_addr(runtime, 4026577812, "SH_COMM_PMEnumProtocols");
        method_add_ce_kernel_addr(runtime, 4026577808, "SH_COMM_PMFindProvider");
        method_add_ce_kernel_addr(runtime, 4026577804, "SH_COMM_PMInstallNameSpace");
        method_add_ce_kernel_addr(runtime, 4026577800, "SH_COMM_PMEnumNameSpaceProviders");
        method_add_ce_kernel_addr(runtime, 4026577796, "SH_COMM_PMFindNameSpaces");
        method_add_ce_kernel_addr(runtime, 4026577792, "SH_COMM_PMAddrConvert");
        method_add_ce_kernel_addr(runtime, 4026576888, "SH_FILESYS_APIS_CreateDirectoryW");
        method_add_ce_kernel_addr(runtime, 4026576884, "SH_FILESYS_APIS_RemoveDirectoryW");
        method_add_ce_kernel_addr(runtime, 4026576880, "SH_FILESYS_APIS_MoveFileW");
        method_add_ce_kernel_addr(runtime, 4026576876, "SH_FILESYS_APIS_CopyFileW");
        method_add_ce_kernel_addr(runtime, 4026576872, "SH_FILESYS_APIS_DeleteFileW");
        method_add_ce_kernel_addr(runtime, 4026576868, "SH_FILESYS_APIS_GetFileAttributesW");
        method_add_ce_kernel_addr(runtime, 4026576864, "SH_FILESYS_APIS_FindFirstFileW");
        method_add_ce_kernel_addr(runtime, 4026576860, "SH_FILESYS_APIS_CreateFileW");
        method_add_ce_kernel_addr(runtime, 4026576856, "SH_FILESYS_APIS_CeRegisterFileSystemNotification");
        method_add_ce_kernel_addr(runtime, 4026576852, "SH_FILESYS_APIS_CeRegisterReplNotification");
        method_add_ce_kernel_addr(runtime, 4026576848, "SH_FILESYS_APIS_CeOidGetInfoEx2");
        method_add_ce_kernel_addr(runtime, 4026576844, "SH_FILESYS_APIS_CeFindFirstDatabaseEx");
        method_add_ce_kernel_addr(runtime, 4026576840, "SH_FILESYS_APIS_CeCreateDatabaseEx2");
        method_add_ce_kernel_addr(runtime, 4026576836, "SH_FILESYS_APIS_CeSetDatabaseInfoEx2");
        method_add_ce_kernel_addr(runtime, 4026576832, "SH_FILESYS_APIS_CeOpenDatabaseEx2");
        method_add_ce_kernel_addr(runtime, 4026576828, "SH_FILESYS_APIS_RegCloseKey");
        method_add_ce_kernel_addr(runtime, 4026576824, "SH_FILESYS_APIS_RegCreateKeyExW");
        method_add_ce_kernel_addr(runtime, 4026576820, "SH_FILESYS_APIS_RegDeleteKeyW");
        method_add_ce_kernel_addr(runtime, 4026576816, "SH_FILESYS_APIS_RegDeleteValueW");
        method_add_ce_kernel_addr(runtime, 4026576812, "SH_FILESYS_APIS_RegEnumValueW");
        method_add_ce_kernel_addr(runtime, 4026576808, "SH_FILESYS_APIS_RegEnumKeyExW");
        method_add_ce_kernel_addr(runtime, 4026576804, "SH_FILESYS_APIS_RegOpenKeyExW");
        method_add_ce_kernel_addr(runtime, 4026576800, "SH_FILESYS_APIS_RegQueryInfoKeyW");
        method_add_ce_kernel_addr(runtime, 4026576796, "SH_FILESYS_APIS_RegQueryValueExW");
        method_add_ce_kernel_addr(runtime, 4026576792, "SH_FILESYS_APIS_RegSetValueExW");
        method_add_ce_kernel_addr(runtime, 4026576788, "SH_FILESYS_APIS_GetTempPathW");
        method_add_ce_kernel_addr(runtime, 4026576784, "SH_FILESYS_APIS_CeDeleteDatabaseEx");
        method_add_ce_kernel_addr(runtime, 4026576780, "SH_FILESYS_APIS_CheckPassword");
        method_add_ce_kernel_addr(runtime, 4026576776, "SH_FILESYS_APIS_SetPassword");
        method_add_ce_kernel_addr(runtime, 4026576772, "SH_FILESYS_APIS_SetFileAttributesW");
        method_add_ce_kernel_addr(runtime, 4026576768, "SH_FILESYS_APIS_GetStoreInformation");
        method_add_ce_kernel_addr(runtime, 4026576764, "SH_FILESYS_APIS_CeGetReplChangeMask");
        method_add_ce_kernel_addr(runtime, 4026576760, "SH_FILESYS_APIS_CeSetReplChangeMask");
        method_add_ce_kernel_addr(runtime, 4026576756, "SH_FILESYS_APIS_CeGetReplChangeBitsEx");
        method_add_ce_kernel_addr(runtime, 4026576752, "SH_FILESYS_APIS_CeClearReplChangeBitsEx");
        method_add_ce_kernel_addr(runtime, 4026576748, "SH_FILESYS_APIS_CeGetReplOtherBitsEx");
        method_add_ce_kernel_addr(runtime, 4026576744, "SH_FILESYS_APIS_CeSetReplOtherBitsEx");
        method_add_ce_kernel_addr(runtime, 4026576740, "SH_FILESYS_APIS_GetSystemMemoryDivision");
        method_add_ce_kernel_addr(runtime, 4026576736, "SH_FILESYS_APIS_SetSystemMemoryDivision");
        method_add_ce_kernel_addr(runtime, 4026576732, "SH_FILESYS_APIS_RegCopyFile");
        method_add_ce_kernel_addr(runtime, 4026576728, "SH_FILESYS_APIS_CloseAllFileHandles");
        method_add_ce_kernel_addr(runtime, 4026576724, "SH_FILESYS_APIS_DeleteAndRenameFile");
        method_add_ce_kernel_addr(runtime, 4026576720, "SH_FILESYS_APIS_RegRestoreFile");
        method_add_ce_kernel_addr(runtime, 4026576716, "SH_FILESYS_APIS_RegisterAFSEx");
        method_add_ce_kernel_addr(runtime, 4026576712, "SH_FILESYS_APIS_DeregisterAFS");
        method_add_ce_kernel_addr(runtime, 4026576708, "SH_FILESYS_APIS_GetPasswordActive");
        method_add_ce_kernel_addr(runtime, 4026576704, "SH_FILESYS_APIS_SetPasswordActive");
        method_add_ce_kernel_addr(runtime, 4026576700, "SH_FILESYS_APIS_RegFlushKey");
        method_add_ce_kernel_addr(runtime, 4026576696, "SH_FILESYS_APIS_FileSystemPowerFunction");
        method_add_ce_kernel_addr(runtime, 4026576692, "SH_FILESYS_APIS_CeSetReplChangeBitsEx");
        method_add_ce_kernel_addr(runtime, 4026576688, "SH_FILESYS_APIS_RegisterAFSName");
        method_add_ce_kernel_addr(runtime, 4026576684, "SH_FILESYS_APIS_DeregisterAFSName");
        method_add_ce_kernel_addr(runtime, 4026576680, "SH_FILESYS_APIS_GetDiskFreeSpaceExW");
        method_add_ce_kernel_addr(runtime, 4026576676, "SH_FILESYS_APIS_IsSystemFile");
        method_add_ce_kernel_addr(runtime, 4026576672, "SH_FILESYS_APIS_CeChangeDatabaseLCID");
        method_add_ce_kernel_addr(runtime, 4026576668, "SH_FILESYS_APIS_DumpFileSystemHeap");
        method_add_ce_kernel_addr(runtime, 4026576664, "SH_FILESYS_APIS_CeMountDBVol");
        method_add_ce_kernel_addr(runtime, 4026576660, "SH_FILESYS_APIS_CeEnumDBVolumes");
        method_add_ce_kernel_addr(runtime, 4026576656, "SH_FILESYS_APIS_CeUnmountDBVol");
        method_add_ce_kernel_addr(runtime, 4026576652, "SH_FILESYS_APIS_CeFlushDBVol");
        method_add_ce_kernel_addr(runtime, 4026576648, "SH_FILESYS_APIS_CeFreeNotification");
        method_add_ce_kernel_addr(runtime, 4026576644, "SH_FILESYS_APIS_FindFirstFileExW");
        method_add_ce_kernel_addr(runtime, 4026576640, "SH_FILESYS_APIS_RegSaveKey");
        method_add_ce_kernel_addr(runtime, 4026576636, "SH_FILESYS_APIS_RegReplaceKey");
        method_add_ce_kernel_addr(runtime, 4026576632, "SH_FILESYS_APIS_SignalStarted");
        method_add_ce_kernel_addr(runtime, 4026576628, "SH_FILESYS_APIS_SetCurrentUser");
        method_add_ce_kernel_addr(runtime, 4026576624, "SH_FILESYS_APIS_SetUserData");
        method_add_ce_kernel_addr(runtime, 4026576620, "SH_FILESYS_APIS_GetUserInformation");
        method_add_ce_kernel_addr(runtime, 4026576616, "SH_FILESYS_APIS_SetPasswordStatus");
        method_add_ce_kernel_addr(runtime, 4026576612, "SH_FILESYS_APIS_GetPasswordStatus");
        method_add_ce_kernel_addr(runtime, 4026576608, "SH_FILESYS_APIS_ReplOpenSync");
        method_add_ce_kernel_addr(runtime, 4026576604, "SH_FILESYS_APIS_ReplCheckpoint");
        method_add_ce_kernel_addr(runtime, 4026576600, "SH_FILESYS_APIS_ReplCloseSync");
        method_add_ce_kernel_addr(runtime, 4026576596, "SH_FILESYS_APIS_ReplGetSyncState");
        method_add_ce_kernel_addr(runtime, 4026576592, "SH_FILESYS_APIS_ReplChangeSyncSettings");
        method_add_ce_kernel_addr(runtime, 4026576588, "SH_FILESYS_APIS_ReplFindNextChange");
        method_add_ce_kernel_addr(runtime, 4026576584, "SH_FILESYS_APIS_ReplGetOidStatus");
        method_add_ce_kernel_addr(runtime, 4026576580, "SH_FILESYS_APIS_CreateMsgQueue");
        method_add_ce_kernel_addr(runtime, 4026576576, "SH_FILESYS_APIS_OpenMsgQueue");
        method_add_ce_kernel_addr(runtime, 4026576572, "SH_FILESYS_APIS_ReadMsgQueue");
        method_add_ce_kernel_addr(runtime, 4026576568, "SH_FILESYS_APIS_WriteMsgQueue");
        method_add_ce_kernel_addr(runtime, 4026576564, "SH_FILESYS_APIS_GetMsgQueueInfo");
        method_add_ce_kernel_addr(runtime, 4026576560, "SH_FILESYS_APIS_CloseMsgQueue");
        method_add_ce_kernel_addr(runtime, 4026576556, "SH_FILESYS_APIS_CryptProtectData");
        method_add_ce_kernel_addr(runtime, 4026576552, "SH_FILESYS_APIS_CryptUnprotectData");
        method_add_ce_kernel_addr(runtime, 4026576548, "SH_FILESYS_APIS_GenRandom");
        method_add_ce_kernel_addr(runtime, 4026576544, "SH_FILESYS_APIS_FindFirstChangeNotificationW");
        method_add_ce_kernel_addr(runtime, 4026576540, "SH_FILESYS_APIS_FindNextChangeNotification");
        method_add_ce_kernel_addr(runtime, 4026576536, "SH_FILESYS_APIS_FindCloseChangeNotification");
        method_add_ce_kernel_addr(runtime, 4026576532, "SH_FILESYS_APIS_CeGetFileNotificationInfo");
        method_add_ce_kernel_addr(runtime, 4026575860, "SH_SHELL_GetOpenFileNameW");
        method_add_ce_kernel_addr(runtime, 4026575856, "SH_SHELL_GetSaveFileNameW");
        method_add_ce_kernel_addr(runtime, 4026575848, "SH_SHELL_Shell_NotifyIcon");
        method_add_ce_kernel_addr(runtime, 4026575844, "SH_SHELL_SHAddToRecentDocs");
        method_add_ce_kernel_addr(runtime, 4026575836, "SH_SHELL_SHCreateExplorerInstance");
        method_add_ce_kernel_addr(runtime, 4026575764, "SH_SHELL_NotSystemParametersInfo_Trap");
        method_add_ce_kernel_addr(runtime, 4026575760, "SH_SHELL_SHGetAppKeyAssoc_Trap");
        method_add_ce_kernel_addr(runtime, 4026575756, "SH_SHELL_SHSetAppKeyWndAssoc_Trap");
        method_add_ce_kernel_addr(runtime, 4026575736, "SH_SHELL_SHFileNotifyRemove_Trap");
        method_add_ce_kernel_addr(runtime, 4026575732, "SH_SHELL_SHFileNotifyFree_Trap");
        method_add_ce_kernel_addr(runtime, 4026575724, "SH_SHELL_SHCloseApps_Trap");
        method_add_ce_kernel_addr(runtime, 4026575720, "SH_SHELL_SHSipPreference_Trap");
        method_add_ce_kernel_addr(runtime, 4026575708, "SH_SHELL_SHSetNavBarText_Trap");
        method_add_ce_kernel_addr(runtime, 4026575704, "SH_SHELL_SHDoneButton_Trap");
        method_add_ce_kernel_addr(runtime, 4026575672, "SH_SHELL_SHChangeNotifyRegister_Trap");
        method_add_ce_kernel_addr(runtime, 4026575652, "SH_SHELL_SHNotificationAdd_Trap");
        method_add_ce_kernel_addr(runtime, 4026575648, "SH_SHELL_SHNotificationUpdate_Trap");
        method_add_ce_kernel_addr(runtime, 4026575644, "SH_SHELL_SHNotificationRemove_Trap");
        method_add_ce_kernel_addr(runtime, 4026575640, "SH_SHELL_SHNotificationGetData_Trap");
        method_add_ce_kernel_addr(runtime, 4026575580, "SH_SHELL_SendChangeNotificationToWindow_Trap");
        method_add_ce_kernel_addr(runtime, 4026574840, "SH_DEVMGR_APIS_RegisterDevice");
        method_add_ce_kernel_addr(runtime, 4026574836, "SH_DEVMGR_APIS_DeregisterDevice");
        method_add_ce_kernel_addr(runtime, 4026574832, "SH_DEVMGR_APIS_CloseAllDeviceHandles");
        method_add_ce_kernel_addr(runtime, 4026574828, "SH_DEVMGR_APIS_CreateDeviceHandle");
        method_add_ce_kernel_addr(runtime, 4026574824, "SH_DEVMGR_APIS_LoadFSD");
        method_add_ce_kernel_addr(runtime, 4026574816, "SH_DEVMGR_APIS_DeactivateDevice");
        method_add_ce_kernel_addr(runtime, 4026574812, "SH_DEVMGR_APIS_LoadFSDEx");
        method_add_ce_kernel_addr(runtime, 4026574808, "SH_DEVMGR_APIS_GetDeviceByIndex");
        method_add_ce_kernel_addr(runtime, 4026574804, "SH_DEVMGR_APIS_CeResyncFilesys");
        method_add_ce_kernel_addr(runtime, 4026574800, "SH_DEVMGR_APIS_ActivateDeviceEx");
        method_add_ce_kernel_addr(runtime, 4026574796, "SH_DEVMGR_APIS_RequestDeviceNotifications");
        method_add_ce_kernel_addr(runtime, 4026574792, "SH_DEVMGR_APIS_StopDeviceNotifications");
        method_add_ce_kernel_addr(runtime, 4026574788, "SH_DEVMGR_APIS__GetDevicePathFromPnp");
        method_add_ce_kernel_addr(runtime, 4026574784, "SH_DEVMGR_APIS_ResourceCreateList");
        method_add_ce_kernel_addr(runtime, 4026574780, "SH_DEVMGR_APIS_ResourceAdjust");
        method_add_ce_kernel_addr(runtime, 4026574776, "SH_DEVMGR_APIS_GetSystemPowerState");
        method_add_ce_kernel_addr(runtime, 4026574772, "SH_DEVMGR_APIS_SetSystemPowerState");
        method_add_ce_kernel_addr(runtime, 4026574768, "SH_DEVMGR_APIS_SetPowerRequirement");
        method_add_ce_kernel_addr(runtime, 4026574764, "SH_DEVMGR_APIS_ReleasePowerRequirement");
        method_add_ce_kernel_addr(runtime, 4026574760, "SH_DEVMGR_APIS_RequestPowerNotifications");
        method_add_ce_kernel_addr(runtime, 4026574756, "SH_DEVMGR_APIS_StopPowerNotifications");
        method_add_ce_kernel_addr(runtime, 4026574748, "SH_DEVMGR_APIS_DevicePowerNotify");
        method_add_ce_kernel_addr(runtime, 4026574744, "SH_DEVMGR_APIS_RegisterPowerRelationship");
        method_add_ce_kernel_addr(runtime, 4026574740, "SH_DEVMGR_APIS_ReleasePowerRelationship");
        method_add_ce_kernel_addr(runtime, 4026574736, "SH_DEVMGR_APIS_SetDevicePower");
        method_add_ce_kernel_addr(runtime, 4026574732, "SH_DEVMGR_APIS_GetDevicePower");
        method_add_ce_kernel_addr(runtime, 4026574728, "SH_DEVMGR_APIS_AdvertiseInterface");
        method_add_ce_kernel_addr(runtime, 4026573816, "SH_TAPI_lineClose");
        method_add_ce_kernel_addr(runtime, 4026573812, "SH_TAPI_lineConfigDialogEdit");
        method_add_ce_kernel_addr(runtime, 4026573808, "SH_TAPI_lineDeallocateCall");
        method_add_ce_kernel_addr(runtime, 4026573804, "SH_TAPI_lineDrop");
        method_add_ce_kernel_addr(runtime, 4026573800, "SH_TAPI_lineGetDevCaps");
        method_add_ce_kernel_addr(runtime, 4026573796, "SH_TAPI_lineGetDevConfig");
        method_add_ce_kernel_addr(runtime, 4026573792, "SH_TAPI_lineGetTranslateCaps");
        method_add_ce_kernel_addr(runtime, 4026573788, "SH_TAPI_TAPIlineInitialize");
        method_add_ce_kernel_addr(runtime, 4026573784, "SH_TAPI_lineMakeCall");
        method_add_ce_kernel_addr(runtime, 4026573780, "SH_TAPI_lineNegotiateAPIVersion");
        method_add_ce_kernel_addr(runtime, 4026573776, "SH_TAPI_lineOpen");
        method_add_ce_kernel_addr(runtime, 4026573772, "SH_TAPI_lineSetDevConfig");
        method_add_ce_kernel_addr(runtime, 4026573768, "SH_TAPI_lineSetStatusMessages");
        method_add_ce_kernel_addr(runtime, 4026573764, "SH_TAPI_TAPIlineShutdown");
        method_add_ce_kernel_addr(runtime, 4026573760, "SH_TAPI_lineTranslateAddress");
        method_add_ce_kernel_addr(runtime, 4026573756, "SH_TAPI_lineTranslateDialog");
        method_add_ce_kernel_addr(runtime, 4026573752, "SH_TAPI_lineGetID");
        method_add_ce_kernel_addr(runtime, 4026573748, "SH_TAPI_lineAddProvider");
        method_add_ce_kernel_addr(runtime, 4026573744, "SH_TAPI_lineSetCurrentLocation");
        method_add_ce_kernel_addr(runtime, 4026573740, "SH_TAPI_lineAccept");
        method_add_ce_kernel_addr(runtime, 4026573736, "SH_TAPI_lineAddToConference");
        method_add_ce_kernel_addr(runtime, 4026573732, "SH_TAPI_lineAnswer");
        method_add_ce_kernel_addr(runtime, 4026573728, "SH_TAPI_lineBlindTransfer");
        method_add_ce_kernel_addr(runtime, 4026573724, "SH_TAPI_lineCompleteTransfer");
        method_add_ce_kernel_addr(runtime, 4026573720, "SH_TAPI_lineDevSpecific");
        method_add_ce_kernel_addr(runtime, 4026573716, "SH_TAPI_lineDial");
        method_add_ce_kernel_addr(runtime, 4026573712, "SH_TAPI_lineForward");
        method_add_ce_kernel_addr(runtime, 4026573708, "SH_TAPI_lineGenerateDigits");
        method_add_ce_kernel_addr(runtime, 4026573704, "SH_TAPI_lineGenerateTone");
        method_add_ce_kernel_addr(runtime, 4026573700, "SH_TAPI_lineGetAddressCaps");
        method_add_ce_kernel_addr(runtime, 4026573696, "SH_TAPI_lineGetAddressID");
        method_add_ce_kernel_addr(runtime, 4026573692, "SH_TAPI_lineGetAddressStatus");
        method_add_ce_kernel_addr(runtime, 4026573688, "SH_TAPI_lineGetAppPriority");
        method_add_ce_kernel_addr(runtime, 4026573684, "SH_TAPI_lineGetCallInfo");
        method_add_ce_kernel_addr(runtime, 4026573680, "SH_TAPI_lineGetCallStatus");
        method_add_ce_kernel_addr(runtime, 4026573676, "SH_TAPI_lineGetConfRelatedCalls");
        method_add_ce_kernel_addr(runtime, 4026573672, "SH_TAPI_lineGetIcon");
        method_add_ce_kernel_addr(runtime, 4026573668, "SH_TAPI_lineGetLineDevStatus");
        method_add_ce_kernel_addr(runtime, 4026573664, "SH_TAPI_lineGetMessage");
        method_add_ce_kernel_addr(runtime, 4026573660, "SH_TAPI_lineGetNewCalls");
        method_add_ce_kernel_addr(runtime, 4026573656, "SH_TAPI_lineGetNumRings");
        method_add_ce_kernel_addr(runtime, 4026573652, "SH_TAPI_lineGetProviderList");
        method_add_ce_kernel_addr(runtime, 4026573648, "SH_TAPI_lineGetStatusMessages");
        method_add_ce_kernel_addr(runtime, 4026573644, "SH_TAPI_lineHandoff");
        method_add_ce_kernel_addr(runtime, 4026573640, "SH_TAPI_lineHold");
        method_add_ce_kernel_addr(runtime, 4026573636, "SH_TAPI_TAPIlineInitializeEx");
        method_add_ce_kernel_addr(runtime, 4026573632, "SH_TAPI_lineMonitorDigits");
        method_add_ce_kernel_addr(runtime, 4026573628, "SH_TAPI_lineMonitorMedia");
        method_add_ce_kernel_addr(runtime, 4026573624, "SH_TAPI_lineNegotiateExtVersion");
        method_add_ce_kernel_addr(runtime, 4026573620, "SH_TAPI_linePickup");
        method_add_ce_kernel_addr(runtime, 4026573616, "SH_TAPI_linePrepareAddToConference");
        method_add_ce_kernel_addr(runtime, 4026573612, "SH_TAPI_lineRedirect");
        method_add_ce_kernel_addr(runtime, 4026573608, "SH_TAPI_lineReleaseUserUserInfo");
        method_add_ce_kernel_addr(runtime, 4026573604, "SH_TAPI_lineRemoveFromConference");
        method_add_ce_kernel_addr(runtime, 4026573600, "SH_TAPI_lineSendUserUserInfo");
        method_add_ce_kernel_addr(runtime, 4026573596, "SH_TAPI_lineSetAppPriority");
        method_add_ce_kernel_addr(runtime, 4026573592, "SH_TAPI_lineSetCallParams");
        method_add_ce_kernel_addr(runtime, 4026573588, "SH_TAPI_lineSetCallPrivilege");
        method_add_ce_kernel_addr(runtime, 4026573584, "SH_TAPI_lineSetMediaMode");
        method_add_ce_kernel_addr(runtime, 4026573580, "SH_TAPI_lineSetNumRings");
        method_add_ce_kernel_addr(runtime, 4026573576, "SH_TAPI_lineSetTerminal");
        method_add_ce_kernel_addr(runtime, 4026573572, "SH_TAPI_lineSetTollList");
        method_add_ce_kernel_addr(runtime, 4026573568, "SH_TAPI_lineSetupConference");
        method_add_ce_kernel_addr(runtime, 4026573564, "SH_TAPI_lineSetupTransfer");
        method_add_ce_kernel_addr(runtime, 4026573560, "SH_TAPI_lineSwapHold");
        method_add_ce_kernel_addr(runtime, 4026573556, "SH_TAPI_lineUnhold");
        method_add_ce_kernel_addr(runtime, 4026573552, "SH_TAPI_phoneClose");
        method_add_ce_kernel_addr(runtime, 4026573548, "SH_TAPI_phoneConfigDialog");
        method_add_ce_kernel_addr(runtime, 4026573544, "SH_TAPI_phoneDevSpecific");
        method_add_ce_kernel_addr(runtime, 4026573540, "SH_TAPI_phoneGetDevCaps");
        method_add_ce_kernel_addr(runtime, 4026573536, "SH_TAPI_phoneGetGain");
        method_add_ce_kernel_addr(runtime, 4026573532, "SH_TAPI_phoneGetHookSwitch");
        method_add_ce_kernel_addr(runtime, 4026573528, "SH_TAPI_phoneGetIcon");
        method_add_ce_kernel_addr(runtime, 4026573524, "SH_TAPI_phoneGetID");
        method_add_ce_kernel_addr(runtime, 4026573520, "SH_TAPI_phoneGetMessage");
        method_add_ce_kernel_addr(runtime, 4026573516, "SH_TAPI_phoneGetRing");
        method_add_ce_kernel_addr(runtime, 4026573512, "SH_TAPI_phoneGetStatus");
        method_add_ce_kernel_addr(runtime, 4026573508, "SH_TAPI_phoneGetStatusMessages");
        method_add_ce_kernel_addr(runtime, 4026573504, "SH_TAPI_phoneGetVolume");
        method_add_ce_kernel_addr(runtime, 4026573500, "SH_TAPI_TAPIphoneInitializeEx");
        method_add_ce_kernel_addr(runtime, 4026573496, "SH_TAPI_phoneNegotiateAPIVersion");
        method_add_ce_kernel_addr(runtime, 4026573492, "SH_TAPI_phoneNegotiateExtVersion");
        method_add_ce_kernel_addr(runtime, 4026573488, "SH_TAPI_phoneOpen");
        method_add_ce_kernel_addr(runtime, 4026573484, "SH_TAPI_phoneSetGain");
        method_add_ce_kernel_addr(runtime, 4026573480, "SH_TAPI_phoneSetHookSwitch");
        method_add_ce_kernel_addr(runtime, 4026573476, "SH_TAPI_phoneSetRing");
        method_add_ce_kernel_addr(runtime, 4026573472, "SH_TAPI_phoneSetStatusMessages");
        method_add_ce_kernel_addr(runtime, 4026573468, "SH_TAPI_phoneSetVolume");
        method_add_ce_kernel_addr(runtime, 4026573464, "SH_TAPI_TAPIphoneShutdown");
        method_add_ce_kernel_addr(runtime, 4026572792, "SH_PATCHER_PatchExe");
        method_add_ce_kernel_addr(runtime, 4026572788, "SH_PATCHER_PatchDll");
        method_add_ce_kernel_addr(runtime, 4026572784, "SH_PATCHER_FreeDllPatch");
        method_add_ce_kernel_addr(runtime, 4026570744, "SH_SERVICES_ActivateService");
        method_add_ce_kernel_addr(runtime, 4026570740, "SH_SERVICES_RegisterService");
        method_add_ce_kernel_addr(runtime, 4026570736, "SH_SERVICES_DeregisterService");
        method_add_ce_kernel_addr(runtime, 4026570732, "SH_SERVICES_CloseAllServiceHandles");
        method_add_ce_kernel_addr(runtime, 4026570728, "SH_SERVICES_CreateServiceHandle");
        method_add_ce_kernel_addr(runtime, 4026570724, "SH_SERVICES_GetServiceByIndex");
        method_add_ce_kernel_addr(runtime, 4026570720, "SH_SERVICES_ServiceIoControl");
        method_add_ce_kernel_addr(runtime, 4026570716, "SH_SERVICES_ServiceAddPort");
        method_add_ce_kernel_addr(runtime, 4026570712, "SH_SERVICES_ServiceUnbindPorts");
        method_add_ce_kernel_addr(runtime, 4026570708, "SH_SERVICES_EnumServices");
        method_add_ce_kernel_addr(runtime, 4026570704, "SH_SERVICES_GetServiceHandle");
        method_add_ce_kernel_addr(runtime, 4026570700, "SH_SERVICES_ServiceClosePort");
    }
    function method_add_ce_kernel_addr(runtime, addr, value) {
        const members = runtime.members;
        const h_m_ce_kernel_addrs = members.m_ce_kernel_addrs ?? 0;
        const h_m_ce_kernel_addr_present = members.m_ce_kernel_addr_present ?? 0;
        h_m_ce_kernel_addrs[((addr) - (4026531840))] = value;
        h_m_ce_kernel_addr_present[((addr) - (4026531840))] = 1;
    }
    function method_state_export(runtime, entry) {
        const members = runtime.members;
        let __t0;
        const h_m_r = members.m_r ?? 0;
        switch ((__t0 = __deref_state_export(runtime, entry), typeof __t0.index === 'function' ? __t0.index() : typeof __t0.index === 'number' || typeof __t0.index === 'boolean' ? __t0.index : runtime.container(entry, "index"))) {
            case -1:
            case -2:
                {
                    members.m_pc = ((((((h_m_r[16]) & (16))) ? (h_m_r[15]) : (((h_m_r[15]) & (67108860))))) >>> 0);
                    break;
                }
        }
    }
    function __deref_state_export(runtime, p) {
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
    function method_print_ce_kernel_address(runtime, addr) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["printf"];
        let __t0;
        const h_m_ce_kernel_addr_present = members.m_ce_kernel_addr_present ?? 0;
        const h_m_ce_kernel_addrs = members.m_ce_kernel_addrs ?? 0;
        if ((((((Number(addr) < Number(66560)) ? 1 : 0)) && (h_m_ce_kernel_addr_present[addr])) ? 1 : 0)) {
            (__L0 ? __L0("Kernel Call: %s\n", (__t0 = __deref_print_ce_kernel_address(runtime, h_m_ce_kernel_addrs[addr]), typeof __t0.c_str === 'function' ? (__t0.c_str() ?? 0) : runtime.container(h_m_ce_kernel_addrs[addr], "c_str"))) : runtime.macro("printf", "Kernel Call: %s\n", (__t0 = __deref_print_ce_kernel_address(runtime, h_m_ce_kernel_addrs[addr]), typeof __t0.c_str === 'function' ? (__t0.c_str() ?? 0) : runtime.container(h_m_ce_kernel_addrs[addr], "c_str"))));
        }
        else {
            if (((Number(addr) === Number(4294953856)) ? 1 : 0)) {
                /* printf: no effect */
            }
            else {
                if (((Number(addr) === Number(4294953880)) ? 1 : 0)) {
                    /* printf: no effect */
                }
                else {
                    if (((Number(addr) === Number(4294953900)) ? 1 : 0)) {
                        /* printf: no effect */
                    }
                    else {
                        if (((Number(addr) === Number(4294953920)) ? 1 : 0)) {
                            /* printf: no effect */
                        }
                        else {
                            if (((Number(addr) === Number(4294953940)) ? 1 : 0)) {
                                /* printf: no effect */
                            }
                        }
                    }
                }
            }
        }
    }
    function __deref_print_ce_kernel_address(runtime, p) {
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
    function method_update_insn_prefetch(runtime, curr_pc) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_pr32"];
        let __t0;
        const h_m_insn_prefetch_address = members.m_insn_prefetch_address ?? 0;
        const h_m_insn_prefetch_depth = members.m_insn_prefetch_depth ?? 0;
        const h_m_insn_prefetch_valid = members.m_insn_prefetch_valid ?? 0;
        const h_m_insn_prefetch_buffer = members.m_insn_prefetch_buffer ?? 0;
        curr_pc = ((((curr_pc) & (-4))) >>> 0);
        if ((((h_m_insn_prefetch_address[(members.m_insn_prefetch_index ?? 0)]) !== (curr_pc)) ? 1 : 0)) {
            0;
            members.m_insn_prefetch_count = ((0) >>> 0);
            members.m_insn_prefetch_index = ((0) >>> 0);
        }
        if (((((members.m_insn_prefetch_count ?? 0)) === (h_m_insn_prefetch_depth)) ? 1 : 0)) {
            0;
            return;
        }
        let to_fetch = ((((h_m_insn_prefetch_depth) - ((members.m_insn_prefetch_count ?? 0)))) >>> 0);
        let start_index = ((((((h_m_insn_prefetch_depth) + ((((members.m_insn_prefetch_index ?? 0)) - (to_fetch))))) % (h_m_insn_prefetch_depth))) >>> 0);
        0;
        let pc = ((((curr_pc) + ((((members.m_insn_prefetch_count ?? 0)) * (4))))) >>> 0);
        for (let i = ((0) >>> 0); (((i) < (to_fetch)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
            let index = ((((((i) + (start_index))) % (h_m_insn_prefetch_depth))) >>> 0);
            0;
            h_m_insn_prefetch_valid[index] = 1;
            let physical_pc = pc;
            if (((((((members.m_control ?? 0)) & (1))) && (((method_translate_vaddr_to_paddr(runtime, ({ generatedLValue: true, get: () => physical_pc, set: (value) => { physical_pc = value; } }), 6)) ? 0 : 1))) ? 1 : 0)) {
                0;
                h_m_insn_prefetch_valid[index] = 0;
                break;
            }
            let op = (((typeof (__t0 = members.m_pr32) === 'function' ? __t0(physical_pc) : ((__L0 ?? globalThis.mamekitMissingCall?.("m_pr32")) ? __L0(physical_pc) : runtime.macro("m_pr32", physical_pc)))) >>> 0);
            0;
            h_m_insn_prefetch_buffer[index] = op;
            h_m_insn_prefetch_address[index] = pc;
            members.m_insn_prefetch_count = ((((members.m_insn_prefetch_count) + (1))) >>> 0);
            pc = ((((pc) + (4))) >>> 0);
        }
    }
    function method_translate_vaddr_to_paddr(runtime, vaddr, flags) {
        const members = runtime.members;
        const h_m_faultStatus = members.m_faultStatus ?? 0;
        if ((members.m_tlb_log ?? 0)) {
            0;
        }
        if (((Number(vaddr.get()) < Number(33554432)) ? 1 : 0)) {
            vaddr.set(((vaddr.get()) + ((members.m_pid_offset ?? 0))));
            if ((members.m_tlb_log ?? 0)) {
                0;
            }
        }
        let entry = method_tlb_probe(runtime, vaddr.get(), flags);
        let entry$s = undefined, entry$o = 0;
        if (ArrayBuffer.isView(entry) || Array.isArray(entry))
            entry$s = entry;
        else if (entry !== null && typeof entry === 'object' && entry.generatedPointer === true && entry.path === undefined && entry.target === undefined && (ArrayBuffer.isView(entry.source) || Array.isArray(entry.source))) {
            entry$s = entry.source;
            entry$o = entry.offset;
        }
        if (entry) {
            if ((members.m_tlb_log ?? 0)) {
                0;
            }
            let access_result = ((method_tlb_check_permissions(runtime, entry, flags)) >>> 0);
            if ((((access_result) === (0)) ? 1 : 0)) {
                vaddr.set(method_tlb_translate(runtime, entry, vaddr.get()));
                return 1;
            }
            else {
                if (((flags) & (2))) {
                    0;
                }
                else {
                    if (((flags) & (1))) {
                        0;
                        h_m_faultStatus[0] = access_result;
                        members.m_faultAddress = ((vaddr.get()) >>> 0);
                        members.m_pendingAbtD = ((1) ? 1 : 0);
                        method_update_irq_state(runtime);
                    }
                }
            }
            return 0;
        }
        else {
            if ((members.m_tlb_log ?? 0)) {
                0;
            }
            return method_page_table_translate(runtime, vaddr.get(), flags);
        }
    }
    function method_tlb_check_permissions(runtime, entry, flags) {
        const members = runtime.members;
        const __pointee_entry = __deref_tlb_check_permissions(runtime, entry);
        return ((method_get_fault_from_permissions(runtime, __pointee_entry.access, __pointee_entry.domain, __pointee_entry.type, flags)) >>> 0);
    }
    function __deref_tlb_check_permissions(runtime, p) {
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
    function method_get_fault_from_permissions(runtime, access, domain, type, flags) {
        const members = runtime.members;
        access = ((access) & 0xff);
        domain = ((domain) & 0xff);
        type = ((type) & 0xff);
        const h_m_decoded_access_control = members.m_decoded_access_control ?? 0;
        const h_m_r = members.m_r ?? 0;
        let domain_bits = ((h_m_decoded_access_control[domain]) & 0xff);
        switch (domain_bits) {
            case 0:
                {
                    if ((((type) === (0)) ? 1 : 0)) {
                        return ((((((domain) << (4))) | (9))) >>> 0);
                    }
                    return ((((((domain) << (4))) | (11))) >>> 0);
                }
            case 1:
                {
                    let mode = ((((h_m_r[16]) & (15))) >>> 0);
                    switch (access) {
                        case 0:
                            {
                                let sr = (((((((members.m_control ?? 0)) >>> (8))) & (3))) >>> 0);
                                switch (sr) {
                                    case 0:
                                        {
                                            if ((((type) === (0)) ? 1 : 0)) {
                                                return ((((((domain) << (4))) | (13))) >>> 0);
                                            }
                                            return ((((((domain) << (4))) | (15))) >>> 0);
                                        }
                                    case 1:
                                        {
                                            if (((((((mode) === (0)) ? 1 : 0)) || (((flags) & (8)))) ? 1 : 0)) {
                                                if ((((type) === (0)) ? 1 : 0)) {
                                                    return ((((((domain) << (4))) | (13))) >>> 0);
                                                }
                                                return ((((((domain) << (4))) | (15))) >>> 0);
                                            }
                                            return ((0) >>> 0);
                                        }
                                    case 2:
                                        {
                                            if (((flags) & (8))) {
                                                if ((((type) === (0)) ? 1 : 0)) {
                                                    return ((((((domain) << (4))) | (13))) >>> 0);
                                                }
                                                return ((((((domain) << (4))) | (15))) >>> 0);
                                            }
                                            return ((0) >>> 0);
                                        }
                                    case 3:
                                        {
                                            0;
                                            return ((0) >>> 0);
                                        }
                                }
                                return ((0) >>> 0);
                            }
                        case 1:
                            {
                                if ((((mode) !== (0)) ? 1 : 0)) {
                                    return ((0) >>> 0);
                                }
                                if ((((type) === (0)) ? 1 : 0)) {
                                    return ((((((domain) << (4))) | (13))) >>> 0);
                                }
                                return ((((((domain) << (4))) | (15))) >>> 0);
                            }
                        case 2:
                            {
                                if (((((((mode) !== (0)) ? 1 : 0)) || (((flags) & (4)))) ? 1 : 0)) {
                                    return ((0) >>> 0);
                                }
                                if ((((type) === (0)) ? 1 : 0)) {
                                    return ((((((domain) << (4))) | (13))) >>> 0);
                                }
                                return ((((((domain) << (4))) | (15))) >>> 0);
                            }
                        case 3:
                            {
                                return ((0) >>> 0);
                            }
                    }
                    return ((0) >>> 0);
                }
            case 2:
                {
                    0;
                    return ((0) >>> 0);
                }
            default:
                {
                    return ((0) >>> 0);
                }
        }
    }
    function method_tlb_translate(runtime, entry, vaddr) {
        const members = runtime.members;
        const __pointee_entry = __deref_tlb_translate(runtime, entry);
        switch (__pointee_entry.type) {
            case 0:
                {
                    return ((((__pointee_entry.base_addr) | (((vaddr) & (1048575))))) >>> 0);
                }
            case 1:
                {
                    return ((((__pointee_entry.base_addr) | (((vaddr) & (65535))))) >>> 0);
                }
            case 2:
                {
                    return ((((__pointee_entry.base_addr) | (((vaddr) & (4095))))) >>> 0);
                }
            case 3:
                {
                    return ((((__pointee_entry.base_addr) | (((vaddr) & (1023))))) >>> 0);
                }
            default:
                {
                    return ((0) >>> 0);
                }
        }
    }
    function __deref_tlb_translate(runtime, p) {
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
    function method_update_irq_state(runtime) {
        const members = runtime.members;
        members.m_pending_interrupt = ((((((((((((((((((members.m_pendingAbtD ?? 0)) || ((members.m_pendingAbtP ?? 0))) ? 1 : 0)) || ((members.m_pendingUnd ?? 0))) ? 1 : 0)) || ((members.m_pendingSwi ?? 0))) ? 1 : 0)) || ((members.m_pendingFiq ?? 0))) ? 1 : 0)) || ((members.m_pendingIrq ?? 0))) ? 1 : 0)) ? 1 : 0);
    }
    function method_page_table_translate(runtime, vaddr, flags) {
        const members = runtime.members;
        const h_m_faultStatus = members.m_faultStatus ?? 0;
        let lvl1_addr = (((((members.m_tlb_base_mask ?? 0)) | (runtime.shiftRight(((vaddr) & (4293918720)), 18)))) >>> 0);
        let lvl1_desc = (((__deref_page_table_translate(runtime, members.m_program).read_dword?.(lvl1_addr) ?? 0)) >>> 0);
        0;
        switch (((lvl1_desc) & (3))) {
            case 0:
                {
                    0;
                    if (((flags) & (1))) {
                        0;
                        h_m_faultStatus[0] = 5;
                        members.m_faultAddress = ((vaddr) >>> 0);
                        members.m_pendingAbtD = ((1) ? 1 : 0);
                        method_update_irq_state(runtime);
                    }
                    else {
                        if (((flags) & (2))) {
                            0;
                        }
                    }
                    return 0;
                }
            case 1:
                {
                    let lvl2_addr = ((((((lvl1_desc) & (4294966272))) | (runtime.shiftRight(((vaddr) & (1044480)), 10)))) >>> 0);
                    let lvl2_desc = (((__deref_page_table_translate(runtime, members.m_program).read_dword?.(lvl2_addr) ?? 0)) >>> 0);
                    0;
                    switch (((lvl2_desc) & (3))) {
                        case 0:
                            {
                                if (((flags) & (1))) {
                                    0;
                                    h_m_faultStatus[0] = ((((((lvl1_desc) >>> (1))) & (240))) | (7));
                                    members.m_faultAddress = ((vaddr) >>> 0);
                                    members.m_pendingAbtD = ((1) ? 1 : 0);
                                    method_update_irq_state(runtime);
                                }
                                else {
                                    if (((flags) & (2))) {
                                        0;
                                    }
                                }
                                return 0;
                            }
                        case 1:
                            {
                                return method_page_table_finish_translation(runtime, ({ generatedLValue: true, get: () => vaddr, set: (value) => { vaddr = value; } }), 1, lvl1_desc, lvl2_desc, flags, lvl1_addr, lvl2_addr);
                            }
                        case 2:
                            {
                                return method_page_table_finish_translation(runtime, ({ generatedLValue: true, get: () => vaddr, set: (value) => { vaddr = value; } }), 2, lvl1_desc, lvl2_desc, flags, lvl1_addr, lvl2_addr);
                            }
                        case 3:
                            {
                                0;
                                return 0;
                            }
                    }
                    return 0;
                }
            case 2:
                {
                    0;
                    return method_page_table_finish_translation(runtime, ({ generatedLValue: true, get: () => vaddr, set: (value) => { vaddr = value; } }), 0, lvl1_desc, lvl1_desc, flags, lvl1_addr, lvl1_addr);
                }
            case 3:
                {
                    let lvl2_addr__1 = ((((((lvl1_desc) & (4294963200))) | (runtime.shiftRight(((vaddr) & (1047552)), 8)))) >>> 0);
                    let lvl2_desc__1 = (((__deref_page_table_translate(runtime, members.m_program).read_dword?.(lvl2_addr__1) ?? 0)) >>> 0);
                    0;
                    switch (((lvl2_desc__1) & (3))) {
                        case 0:
                            {
                                if (((flags) & (1))) {
                                    0;
                                    h_m_faultStatus[0] = ((((((lvl1_desc) >>> (1))) & (240))) | (7));
                                    members.m_faultAddress = ((vaddr) >>> 0);
                                    members.m_pendingAbtD = ((1) ? 1 : 0);
                                    method_update_irq_state(runtime);
                                }
                                else {
                                    if (((flags) & (2))) {
                                        0;
                                    }
                                }
                                return 0;
                            }
                        case 1:
                            {
                                return method_page_table_finish_translation(runtime, ({ generatedLValue: true, get: () => vaddr, set: (value) => { vaddr = value; } }), 1, lvl1_desc, lvl2_desc__1, flags, lvl1_addr, lvl2_addr__1);
                            }
                        case 2:
                            {
                                return method_page_table_finish_translation(runtime, ({ generatedLValue: true, get: () => vaddr, set: (value) => { vaddr = value; } }), 2, lvl1_desc, lvl2_desc__1, flags, lvl1_addr, lvl2_addr__1);
                            }
                        case 3:
                            {
                                return method_page_table_finish_translation(runtime, ({ generatedLValue: true, get: () => vaddr, set: (value) => { vaddr = value; } }), 3, lvl1_desc, lvl2_desc__1, flags, lvl1_addr, lvl2_addr__1);
                            }
                    }
                    return 0;
                }
        }
        return 0;
    }
    function __deref_page_table_translate(runtime, p) {
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
    function method_page_table_finish_translation(runtime, vaddr, type, lvl1, lvl2, flags, lvl1a, lvl2a) {
        const members = runtime.members;
        type = ((type) & 0xff);
        const h_m_faultStatus = members.m_faultStatus ?? 0;
        let domain = ((((((((lvl1) >>> (5))) & 0xff)) & (15))) & 0xff);
        let access = ((0) & 0xff);
        let table_bits = ((0) >>> 0);
        switch (type) {
            case 0:
                {
                    access = ((((((((lvl2) >>> (10))) & (3))) & 0xff)) & 0xff);
                    table_bits = ((((vaddr.get()) & (4293918720))) >>> 0);
                    break;
                }
            case 1:
                {
                    let subpage_shift = ((((4) + (((((runtime.shiftRight(vaddr.get(), 13)) & (6))) & 0xff)))) & 0xff);
                    access = ((((((((lvl2) >>> (subpage_shift))) & (3))) & 0xff)) & 0xff);
                    table_bits = ((((vaddr.get()) & (4294963200))) >>> 0);
                    break;
                }
            case 2:
                {
                    let subpage_shift__1 = ((((4) + (((((runtime.shiftRight(vaddr.get(), 9)) & (6))) & 0xff)))) & 0xff);
                    access = ((((((((lvl2) >>> (subpage_shift__1))) & (3))) & 0xff)) & 0xff);
                    table_bits = ((((vaddr.get()) & (4294963200))) >>> 0);
                    break;
                }
            case 3:
                {
                    access = ((((((((lvl2) >>> (4))) & (3))) & 0xff)) & 0xff);
                    table_bits = ((((vaddr.get()) & (4294966272))) >>> 0);
                    break;
                }
        }
        let access_result = ((method_get_fault_from_permissions(runtime, access, domain, type, flags)) >>> 0);
        if ((((access_result) !== (0)) ? 1 : 0)) {
            if (((flags) & (2))) {
                0;
            }
            else {
                if (((flags) & (1))) {
                    0;
                    0;
                    h_m_faultStatus[0] = access_result;
                    members.m_faultAddress = ((vaddr.get()) >>> 0);
                    members.m_pendingAbtD = ((1) ? 1 : 0);
                    method_update_irq_state(runtime);
                }
            }
            return 0;
        }
        if ((((members.__static_page_table_finish_translation_s_page_masks__initialised ?? 0)) ? 0 : 1)) {
            members.__static_page_table_finish_translation_s_page_masks = [4293918720, 4294901760, 4294963200, 4294966272];
            members.__static_page_table_finish_translation_s_page_masks__initialised = 1;
        }
        let s_page_masks = (members.__static_page_table_finish_translation_s_page_masks ?? 0);
        let base_addr = ((((lvl2) & (runtime.readIndex(s_page_masks, type)))) >>> 0);
        let paddr = ((((base_addr) | (((vaddr.get()) & ((~runtime.readIndex(s_page_masks, type))))))) >>> 0);
        if (flags) {
            let entry = method_tlb_map_entry(runtime, vaddr.get(), flags);
            let entry$s = undefined, entry$o = 0;
            if (ArrayBuffer.isView(entry) || Array.isArray(entry))
                entry$s = entry;
            else if (entry !== null && typeof entry === 'object' && entry.generatedPointer === true && entry.path === undefined && entry.target === undefined && (ArrayBuffer.isView(entry.source) || Array.isArray(entry.source))) {
                entry$s = entry.source;
                entry$o = entry.offset;
            }
            __deref_page_table_finish_translation(runtime, entry).valid = 1;
            __deref_page_table_finish_translation(runtime, entry).domain = domain;
            __deref_page_table_finish_translation(runtime, entry).access = access;
            __deref_page_table_finish_translation(runtime, entry).table_bits = table_bits;
            __deref_page_table_finish_translation(runtime, entry).base_addr = base_addr;
            __deref_page_table_finish_translation(runtime, entry).type = type;
        }
        vaddr.set(paddr);
        return 1;
    }
    function __deref_page_table_finish_translation(runtime, p) {
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
    function method_tlb_map_entry(runtime, vaddr, flags) {
        const members = runtime.members;
        const h_m_dtlb_entries = members.m_dtlb_entries ?? 0;
        const h_m_itlb_entries = members.m_itlb_entries ?? 0;
        const h_m_dtlb_entry_index = members.m_dtlb_entry_index ?? 0;
        const h_m_itlb_entry_index = members.m_itlb_entry_index ?? 0;
        let section = ((((((vaddr) >>> (20))) & (4095))) >>> 0);
        let entries = ((((flags) & (1))) ? (h_m_dtlb_entries) : (h_m_itlb_entries));
        let entries$s = undefined, entries$o = 0;
        if (ArrayBuffer.isView(entries) || Array.isArray(entries))
            entries$s = entries;
        else if (entries !== null && typeof entries === 'object' && entries.generatedPointer === true && entries.path === undefined && entries.target === undefined && (ArrayBuffer.isView(entries.source) || Array.isArray(entries.source))) {
            entries$s = entries.source;
            entries$o = entries.offset;
        }
        let start = ((((section) << (1))) >>> 0);
        let index = ((((((flags) & (1))) ? (h_m_dtlb_entry_index[section]) : (h_m_itlb_entry_index[section]))) >>> 0);
        let entry_found = ((0) ? 1 : 0);
        for (let i = ((0) >>> 0); (((i) < (2)) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
            index = ((((((index) + (1))) & (1))) >>> 0);
            if ((((entries$s !== undefined ? (entries$s[entries$o + (((start) + (index)))] ?? 0) : runtime.readIndex(entries, ((start) + (index)))).valid) ? 0 : 1)) {
                entry_found = ((1) ? 1 : 0);
                break;
            }
        }
        if (((entry_found) ? 0 : 1)) {
            index = ((((((index) + (1))) & (1))) >>> 0);
        }
        if (((flags) & (1))) {
            h_m_dtlb_entry_index[section] = index;
        }
        else {
            h_m_itlb_entry_index[section] = index;
        }
        return __addr_tlb_map_entry(runtime, entries, ((start) + (index)));
    }
    function __addr_tlb_map_entry(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_insn_fetch_thumb(runtime, pc, out_insn) {
        const members = runtime.members;
        const h_m_insn_prefetch_buffer = members.m_insn_prefetch_buffer ?? 0;
        const h_m_insn_prefetch_valid = members.m_insn_prefetch_valid ?? 0;
        const h_m_insn_prefetch_depth = members.m_insn_prefetch_depth ?? 0;
        if (((pc) & (2))) {
            out_insn.set(((((((h_m_insn_prefetch_buffer[(members.m_insn_prefetch_index ?? 0)]) >>> (0))) & 0xffff)) >>> 0));
            let valid = ((h_m_insn_prefetch_valid[(members.m_insn_prefetch_index ?? 0)]) ? 1 : 0);
            members.m_insn_prefetch_index = (((((((members.m_insn_prefetch_index ?? 0)) + (1))) % (h_m_insn_prefetch_depth))) >>> 0);
            members.m_insn_prefetch_count = ((((members.m_insn_prefetch_count) - (1))) >>> 0);
            return valid;
        }
        out_insn.set(((((((h_m_insn_prefetch_buffer[(members.m_insn_prefetch_index ?? 0)]) >>> (0))) & 0xffff)) >>> 0));
        return h_m_insn_prefetch_valid[(members.m_insn_prefetch_index ?? 0)];
    }
    function method_insn_fetch_arm(runtime, pc, out_insn) {
        const members = runtime.members;
        const h_m_insn_prefetch_buffer = members.m_insn_prefetch_buffer ?? 0;
        const h_m_insn_prefetch_valid = members.m_insn_prefetch_valid ?? 0;
        const h_m_insn_prefetch_depth = members.m_insn_prefetch_depth ?? 0;
        out_insn.set(((h_m_insn_prefetch_buffer[(members.m_insn_prefetch_index ?? 0)]) >>> 0));
        let valid = ((h_m_insn_prefetch_valid[(members.m_insn_prefetch_index ?? 0)]) ? 1 : 0);
        0;
        members.m_insn_prefetch_index = (((((((members.m_insn_prefetch_index ?? 0)) + (1))) % (h_m_insn_prefetch_depth))) >>> 0);
        members.m_insn_prefetch_count = ((((members.m_insn_prefetch_count) - (1))) >>> 0);
        return valid;
    }
    function method_arm7_check_irq_state(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"], __L1 = __l["SwitchMode"], __L2 = __l["standard_irq_callback"];
        const h_m_r = members.m_r ?? 0;
        if ((((members.m_pending_interrupt ?? 0)) ? 0 : 1)) {
            return;
        }
        let cpsr = ((h_m_r[16]) >>> 0);
        let pc = ((((h_m_r[15]) + (4))) >>> 0);
        if ((members.m_pendingAbtD ?? 0)) {
            if (((((h_m_r[16]) & (16))) ? 0 : 1)) {
                (__L0 ? __L0("ARM7: pendingAbtD (todo)\n") : runtime.macro("fatalerror", "ARM7: pendingAbtD (todo)\n"));
            }
            (__L1 ? __L1(7) : runtime.macro("SwitchMode", 7));
            h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 14)] = __add_arm7_check_irq_state(runtime, ((pc) - (8)), 8);
            h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 17)] = cpsr;
            runtime.invoke("set_cpsr", ((h_m_r[16]) | (((128) >>> 0))));
            runtime.invoke("set_cpsr", ((h_m_r[16]) & ((~((32) >>> 0)))));
            h_m_r[15] = 16;
            if (((((((members.m_control ?? 0)) & (1))) && ((((members.m_control ?? 0)) & (8192)))) ? 1 : 0)) {
                h_m_r[15] = ((h_m_r[15]) | (4294901760));
            }
            members.m_pendingAbtD = ((0) ? 1 : 0);
            method_update_irq_state(runtime);
            return;
        }
        if (((((members.m_pendingFiq ?? 0)) && (((Number(((cpsr) & (((64) >>> 0)))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
            (__L2 ? __L2(1, pc) : runtime.macro("standard_irq_callback", 1, pc));
            if (((((h_m_r[16]) & (16))) ? 0 : 1)) {
                (__L0 ? __L0("pendingFiq (todo)\n") : runtime.macro("fatalerror", "pendingFiq (todo)\n"));
            }
            (__L1 ? __L1(1) : runtime.macro("SwitchMode", 1));
            h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 14)] = __add_arm7_check_irq_state(runtime, ((pc) - (4)), 4);
            h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 17)] = cpsr;
            runtime.invoke("set_cpsr", ((((h_m_r[16]) | (((128) >>> 0)))) | (((64) >>> 0))));
            runtime.invoke("set_cpsr", ((h_m_r[16]) & ((~((32) >>> 0)))));
            h_m_r[15] = 28;
            h_m_r[15] = ((h_m_r[15]) | ((members.m_vectorbase ?? 0)));
            if (((((((members.m_control ?? 0)) & (1))) && ((((members.m_control ?? 0)) & (8192)))) ? 1 : 0)) {
                h_m_r[15] = ((h_m_r[15]) | (4294901760));
            }
            return;
        }
        if (((((members.m_pendingIrq ?? 0)) && (((Number(((cpsr) & (((128) >>> 0)))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
            (__L2 ? __L2(0, pc) : runtime.macro("standard_irq_callback", 0, pc));
            (__L1 ? __L1(2) : runtime.macro("SwitchMode", 2));
            h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 14)] = __add_arm7_check_irq_state(runtime, ((pc) - (4)), 4);
            if (((h_m_r[16]) & (16))) {
                h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 17)] = cpsr;
                runtime.invoke("set_cpsr", ((h_m_r[16]) | (((128) >>> 0))));
                runtime.invoke("set_cpsr", ((h_m_r[16]) & ((~((32) >>> 0)))));
                h_m_r[15] = 24;
            }
            else {
                let temp = ((0) >>> 0);
                h_m_r[15] = ((((((((pc) & (4093640704))) | (24))) | (2))) | (134217728));
                temp = ((((((((h_m_r[16]) & (268435263))) | (((h_m_r[15]) & (4026531840))))) | (runtime.shiftRight(((h_m_r[15]) & (201326592)), 20)))) >>> 0);
                runtime.invoke("set_cpsr", temp);
            }
            h_m_r[15] = ((h_m_r[15]) | ((members.m_vectorbase ?? 0)));
            if (((((((members.m_control ?? 0)) & (1))) && ((((members.m_control ?? 0)) & (8192)))) ? 1 : 0)) {
                h_m_r[15] = ((h_m_r[15]) | (4294901760));
            }
            return;
        }
        if ((members.m_pendingAbtP ?? 0)) {
            if (((((h_m_r[16]) & (16))) ? 0 : 1)) {
                (__L0 ? __L0("pendingAbtP (todo)\n") : runtime.macro("fatalerror", "pendingAbtP (todo)\n"));
            }
            (__L1 ? __L1(7) : runtime.macro("SwitchMode", 7));
            h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 14)] = __add_arm7_check_irq_state(runtime, ((pc) - (4)), 4);
            h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 17)] = cpsr;
            runtime.invoke("set_cpsr", ((h_m_r[16]) | (((128) >>> 0))));
            runtime.invoke("set_cpsr", ((h_m_r[16]) & ((~((32) >>> 0)))));
            h_m_r[15] = ((12) | ((members.m_vectorbase ?? 0)));
            if (((((((members.m_control ?? 0)) & (1))) && ((((members.m_control ?? 0)) & (8192)))) ? 1 : 0)) {
                h_m_r[15] = ((h_m_r[15]) | (4294901760));
            }
            members.m_pendingAbtP = ((0) ? 1 : 0);
            method_update_irq_state(runtime);
            return;
        }
        if ((members.m_pendingUnd ?? 0)) {
            if (((((h_m_r[16]) & (16))) ? 0 : 1)) {
                /* printf: no effect */
            }
            (__L1 ? __L1(11) : runtime.macro("SwitchMode", 11));
            if (((h_m_r[16]) & (((32) >>> 0)))) {
                h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 14)] = __add_arm7_check_irq_state(runtime, ((pc) - (4)), 2);
            }
            else {
                h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 14)] = ((__add_arm7_check_irq_state(runtime, ((pc) - (4)), 4)) - (4));
            }
            h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 17)] = cpsr;
            runtime.invoke("set_cpsr", ((h_m_r[16]) | (((128) >>> 0))));
            runtime.invoke("set_cpsr", ((h_m_r[16]) & ((~((32) >>> 0)))));
            h_m_r[15] = ((4) | ((members.m_vectorbase ?? 0)));
            if (((((((members.m_control ?? 0)) & (1))) && ((((members.m_control ?? 0)) & (8192)))) ? 1 : 0)) {
                h_m_r[15] = ((h_m_r[15]) | (4294901760));
            }
            members.m_pendingUnd = ((0) ? 1 : 0);
            method_update_irq_state(runtime);
            return;
        }
        if ((members.m_pendingSwi ?? 0)) {
            (__L1 ? __L1(3) : runtime.macro("SwitchMode", 3));
            if (((h_m_r[16]) & (((32) >>> 0)))) {
                h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 14)] = __add_arm7_check_irq_state(runtime, ((pc) - (4)), 2);
            }
            else {
                h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 14)] = __add_arm7_check_irq_state(runtime, ((pc) - (4)), 4);
            }
            if (((h_m_r[16]) & (16))) {
                h_m_r[runtime.readIndex((members.m_reg_group ?? 0), 17)] = cpsr;
                runtime.invoke("set_cpsr", ((h_m_r[16]) | (((128) >>> 0))));
                runtime.invoke("set_cpsr", ((h_m_r[16]) & ((~((32) >>> 0)))));
                h_m_r[15] = 8;
            }
            else {
                let temp = ((0) >>> 0);
                h_m_r[15] = ((((((((pc) & (4093640704))) | (8))) | (3))) | (134217728));
                temp = ((((((((h_m_r[16]) & (268435263))) | (((h_m_r[15]) & (4026531840))))) | (runtime.shiftRight(((h_m_r[15]) & (201326592)), 20)))) >>> 0);
                runtime.invoke("set_cpsr", temp);
            }
            h_m_r[15] = ((h_m_r[15]) | ((members.m_vectorbase ?? 0)));
            if (((((((members.m_control ?? 0)) & (1))) && ((((members.m_control ?? 0)) & (8192)))) ? 1 : 0)) {
                h_m_r[15] = ((h_m_r[15]) | (4294901760));
            }
            members.m_pendingSwi = ((0) ? 1 : 0);
            method_update_irq_state(runtime);
            return;
        }
    }
    function __add_arm7_check_irq_state(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_execute_set_input(runtime, irqline, state) {
        const members = runtime.members;
        switch (irqline) {
            case 0:
                {
                    members.m_pendingIrq = (((((state) !== (0)) ? 1 : 0)) ? 1 : 0);
                    break;
                }
            case 1:
                {
                    members.m_pendingFiq = (((((state) !== (0)) ? 1 : 0)) ? 1 : 0);
                    break;
                }
            case 2:
                {
                    members.m_pendingAbtD = (((((state) !== (0)) ? 1 : 0)) ? 1 : 0);
                    break;
                }
            case 3:
                {
                    members.m_pendingAbtP = (((((state) !== (0)) ? 1 : 0)) ? 1 : 0);
                    break;
                }
            case 4:
                {
                    members.m_pendingUnd = (((((state) !== (0)) ? 1 : 0)) ? 1 : 0);
                    break;
                }
        }
        method_update_irq_state(runtime);
        method_arm7_check_irq_state(runtime);
    }
    function method_set_irq(runtime, state) {
        const members = runtime.members;
        members.m_pendingIrq = (((((state) !== (0)) ? 1 : 0)) ? 1 : 0);
        method_update_irq_state(runtime);
        method_arm7_check_irq_state(runtime);
    }
    function method_set_fiq(runtime, state) {
        const members = runtime.members;
        members.m_pendingFiq = (((((state) !== (0)) ? 1 : 0)) ? 1 : 0);
        method_update_irq_state(runtime);
        method_arm7_check_irq_state(runtime);
    }
    function method_get_t_flag(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return ((h_m_r[16]) & (((32) >>> 0)));
    }
    function method_arm7_rt_w_callback(runtime, offset, data) {
        const members = runtime.members;
        const h_m_decoded_access_control = members.m_decoded_access_control ?? 0;
        const h_m_faultStatus = members.m_faultStatus ?? 0;
        const h_m_itlb_entries = members.m_itlb_entries ?? 0;
        const h_m_dtlb_entries = members.m_dtlb_entries ?? 0;
        let opcode = ((offset) >>> 0);
        let cReg = ((runtime.shiftRight(((opcode) & (((983040) >>> 0))), 16)) & 0xff);
        let op2 = ((runtime.shiftRight(((opcode) & (((224) >>> 0))), 5)) & 0xff);
        let op3 = ((((opcode) & (((15) >>> 0)))) & 0xff);
        let cpnum = ((runtime.shiftRight(((opcode) & (((3840) >>> 0))), 8)) & 0xff);
        if ((((cpnum) !== (15)) ? 1 : 0)) {
            if ((((cpnum) === (14)) ? 1 : 0)) {
                0;
                return;
            }
            else {
                0;
                members.m_pendingUnd = ((1) ? 1 : 0);
                method_update_irq_state(runtime);
                return;
            }
        }
        switch (cReg) {
            case 0:
            case 4:
            case 10:
            case 11:
            case 12:
                {
                    0;
                    break;
                }
            case 1:
                {
                    0;
                    0;
                    0;
                    0;
                    members.m_control = ((((data) & (13199))) >>> 0);
                    break;
                }
            case 2:
                {
                    0;
                    members.m_tlbBase = ((data) >>> 0);
                    members.m_tlb_base_mask = ((((data) & (4294950912))) >>> 0);
                    break;
                }
            case 3:
                {
                    0;
                    members.m_domainAccessControl = ((data) >>> 0);
                    for (let i = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
                        h_m_decoded_access_control[runtime.shiftRight(i, 1)] = (((((members.m_domainAccessControl ?? 0)) >>> (i))) & (3));
                    }
                    break;
                }
            case 5:
                {
                    0;
                    switch (op3) {
                        case 0:
                            {
                                h_m_faultStatus[0] = data;
                                break;
                            }
                        case 1:
                            {
                                h_m_faultStatus[1] = data;
                                break;
                            }
                    }
                    break;
                }
            case 6:
                {
                    0;
                    members.m_faultAddress = ((data) >>> 0);
                    break;
                }
            case 7:
                {
                    break;
                }
            case 8:
                {
                    0;
                    switch (op2) {
                        case 0:
                            {
                                switch (op3) {
                                    case 5:
                                        {
                                            for (let i = ((0) >>> 0); ((Number(i) < Number(((h_m_itlb_entries)?.length ?? 0))) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
                                                h_m_itlb_entries[i].valid = ((0) ? 1 : 0);
                                            }
                                            break;
                                        }
                                    case 6:
                                        {
                                            for (let i = ((0) >>> 0); ((Number(i) < Number(((h_m_dtlb_entries)?.length ?? 0))) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
                                                h_m_dtlb_entries[i].valid = ((0) ? 1 : 0);
                                            }
                                            break;
                                        }
                                    case 7:
                                        {
                                            for (let i = ((0) >>> 0); ((Number(i) < Number(((h_m_dtlb_entries)?.length ?? 0))) ? 1 : 0); i = ((((i) + (1))) >>> 0)) {
                                                h_m_dtlb_entries[i].valid = ((0) ? 1 : 0);
                                                h_m_itlb_entries[i].valid = ((0) ? 1 : 0);
                                            }
                                            break;
                                        }
                                    default:
                                        {
                                            0;
                                            break;
                                        }
                                }
                                break;
                            }
                        case 1:
                            {
                                switch (op3) {
                                    case 5:
                                        {
                                            let entry = method_tlb_probe(runtime, data, 2);
                                            let entry$s = undefined, entry$o = 0;
                                            if (ArrayBuffer.isView(entry) || Array.isArray(entry))
                                                entry$s = entry;
                                            else if (entry !== null && typeof entry === 'object' && entry.generatedPointer === true && entry.path === undefined && entry.target === undefined && (ArrayBuffer.isView(entry.source) || Array.isArray(entry.source))) {
                                                entry$s = entry.source;
                                                entry$o = entry.offset;
                                            }
                                            if (entry) {
                                                0;
                                                __deref_arm7_rt_w_callback(runtime, entry).valid = 0;
                                            }
                                            break;
                                        }
                                    case 6:
                                        {
                                            let entry__1 = method_tlb_probe(runtime, data, 1);
                                            let entry__1$s = undefined, entry__1$o = 0;
                                            if (ArrayBuffer.isView(entry__1) || Array.isArray(entry__1))
                                                entry__1$s = entry__1;
                                            else if (entry__1 !== null && typeof entry__1 === 'object' && entry__1.generatedPointer === true && entry__1.path === undefined && entry__1.target === undefined && (ArrayBuffer.isView(entry__1.source) || Array.isArray(entry__1.source))) {
                                                entry__1$s = entry__1.source;
                                                entry__1$o = entry__1.offset;
                                            }
                                            if (entry__1) {
                                                0;
                                                __deref_arm7_rt_w_callback(runtime, entry__1).valid = 0;
                                            }
                                            break;
                                        }
                                    case 7:
                                        {
                                            let entry__2 = method_tlb_probe(runtime, data, 1);
                                            if (entry__2) {
                                                0;
                                                __deref_arm7_rt_w_callback(runtime, entry__2).valid = 0;
                                            }
                                            entry__2 = method_tlb_probe(runtime, data, 2);
                                            if (entry__2) {
                                                0;
                                                __deref_arm7_rt_w_callback(runtime, entry__2).valid = 0;
                                            }
                                            break;
                                        }
                                    default:
                                        {
                                            0;
                                            break;
                                        }
                                }
                                break;
                            }
                    }
                    break;
                }
            case 9:
                {
                    0;
                    break;
                }
            case 13:
                {
                    0;
                    members.m_fcsePID = ((data) >>> 0);
                    members.m_pid_offset = (((((((((members.m_fcsePID ?? 0)) >>> (25))) & (127))) * (33554432))) >>> 0);
                    break;
                }
            case 14:
                {
                    0;
                    break;
                }
            case 15:
                {
                    0;
                    break;
                }
        }
    }
    function __deref_arm7_rt_w_callback(runtime, p) {
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
    function method_arm7_cpu_device__execute_min_cycles(runtime) {
        const members = runtime.members;
        return ((3) >>> 0);
    }
    function method_arm7_cpu_device__execute_max_cycles(runtime) {
        const members = runtime.members;
        return ((4) >>> 0);
    }
    function method_arm_E01FC088_r(runtime) {
        const members = runtime.members;
        return ((4294967295) >>> 0);
    }
    function method_flash_r(runtime, offset) {
        const members = runtime.members;
        const h_m_flash = members.m_flash ?? 0;
        let ret = ((((((((((h_m_flash[__add_flash_r(runtime, ((offset) * (4)), 3)]) << (24))) | (((h_m_flash[__add_flash_r(runtime, ((offset) * (4)), 2)]) << (16))))) | (((h_m_flash[__add_flash_r(runtime, ((offset) * (4)), 1)]) << (8))))) | (((h_m_flash[__add_flash_r(runtime, ((offset) * (4)), 0)]) << (0))))) >>> 0);
        return ((ret) >>> 0);
    }
    function __add_flash_r(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_flash_w(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_pin_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        switch (((offset) * (4))) {
            default:
                {
                    0;
                }
        }
        return ((0) >>> 0);
    }
    function method_pin_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        switch (((offset) * (4))) {
            default:
                {
                    0;
                }
        }
    }
    function method_mam_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        switch (((offset) * (4))) {
            default:
                {
                    0;
                }
        }
        return ((0) >>> 0);
    }
    function method_mam_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        switch (((offset) * (4))) {
            default:
                {
                    0;
                }
        }
    }
    function method_fio_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        switch (((offset) * (4))) {
            default:
                {
                    0;
                }
        }
        return ((0) >>> 0);
    }
    function method_fio_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        switch (((offset) * (4))) {
            default:
                {
                    0;
                }
        }
    }
    function method_apbdiv_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        0;
        return ((0) >>> 0);
    }
    function method_apbdiv_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        0;
    }
    function method_scs_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        0;
        return ((0) >>> 0);
    }
    function method_scs_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        0;
    }
    function method_pll_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        switch (((offset) * (4))) {
            default:
                {
                    0;
                }
        }
        return ((4294967295) >>> 0);
    }
    function method_pll_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        switch (((offset) * (4))) {
            default:
                {
                    0;
                }
        }
    }
    function method_timer0_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        return ((method_read_timer(runtime, 0, offset, mem_mask)) >>> 0);
    }
    function method_read_timer(runtime, timer, offset, mem_mask) {
        const members = runtime.members;
        const h_m_TxPR = members.m_TxPR ?? 0;
        switch (((offset) * (4))) {
            case 12:
                {
                    return h_m_TxPR[timer];
                }
            default:
                {
                    0;
                }
        }
        return 0;
    }
    function method_timer0_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        method_write_timer(runtime, 0, offset, data, mem_mask);
    }
    function method_write_timer(runtime, timer, offset, data, mem_mask) {
        const members = runtime.members;
        const h_m_TxPR = members.m_TxPR ?? 0;
        switch (((offset) * (4))) {
            case 12:
                {
                    runtime.combineData(__addr_write_timer(runtime, h_m_TxPR, timer), data, mem_mask);
                    0;
                    break;
                }
            default:
                {
                    0;
                }
        }
    }
    function __addr_write_timer(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_timer1_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        return ((method_read_timer(runtime, 1, offset, mem_mask)) >>> 0);
    }
    function method_timer1_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        method_write_timer(runtime, 1, offset, data, mem_mask);
    }
    function method_lpc210x_device__timer0_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        return ((method_read_timer(runtime, 0, offset, mem_mask)) >>> 0);
    }
    function method_lpc210x_device__timer0_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        method_write_timer(runtime, 0, offset, data, mem_mask);
    }
    function method_lpc210x_device__timer1_r(runtime, offset, mem_mask) {
        const members = runtime.members;
        return ((method_read_timer(runtime, 1, offset, mem_mask)) >>> 0);
    }
    function method_lpc210x_device__timer1_w(runtime, offset, data, mem_mask) {
        const members = runtime.members;
        method_write_timer(runtime, 1, offset, data, mem_mask);
    }
    function method___state_read_0(runtime) {
        const members = runtime.members;
        return (members.m_pc ?? 0);
    }
    function method___state_write_0(runtime, value) {
        const members = runtime.members;
        members.m_pc = ((value) >>> 0);
    }
    function method___state_read_1(runtime) {
        const members = runtime.members;
        return (members.m_pc ?? 0);
    }
    function method___state_write_1(runtime, value) {
        const members = runtime.members;
        members.m_pc = ((value) >>> 0);
    }
    function method___state_read_2(runtime) {
        const members = runtime.members;
        return (members.m_pc ?? 0);
    }
    function method___state_write_2(runtime, value) {
        const members = runtime.members;
        members.m_pc = ((value) >>> 0);
    }
    function method___state_read_3(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[0];
    }
    function method___state_write_3(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[0] = value;
    }
    function method___state_read_4(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[1];
    }
    function method___state_write_4(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[1] = value;
    }
    function method___state_read_5(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[2];
    }
    function method___state_write_5(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[2] = value;
    }
    function method___state_read_6(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[3];
    }
    function method___state_write_6(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[3] = value;
    }
    function method___state_read_7(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[4];
    }
    function method___state_write_7(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[4] = value;
    }
    function method___state_read_8(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[5];
    }
    function method___state_write_8(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[5] = value;
    }
    function method___state_read_9(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[6];
    }
    function method___state_write_9(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[6] = value;
    }
    function method___state_read_10(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[7];
    }
    function method___state_write_10(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[7] = value;
    }
    function method___state_read_11(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[8];
    }
    function method___state_write_11(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[8] = value;
    }
    function method___state_read_12(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[9];
    }
    function method___state_write_12(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[9] = value;
    }
    function method___state_read_13(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[10];
    }
    function method___state_write_13(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[10] = value;
    }
    function method___state_read_14(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[11];
    }
    function method___state_write_14(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[11] = value;
    }
    function method___state_read_15(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[12];
    }
    function method___state_write_15(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[12] = value;
    }
    function method___state_read_16(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[13];
    }
    function method___state_write_16(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[13] = value;
    }
    function method___state_read_17(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[14];
    }
    function method___state_write_17(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[14] = value;
    }
    function method___state_read_18(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[15];
    }
    function method___state_write_18(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[15] = value;
    }
    function method___state_read_19(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[16];
    }
    function method___state_write_19(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[16] = value;
    }
    function method___state_read_20(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[17];
    }
    function method___state_write_20(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[17] = value;
    }
    function method___state_read_21(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[18];
    }
    function method___state_write_21(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[18] = value;
    }
    function method___state_read_22(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[19];
    }
    function method___state_write_22(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[19] = value;
    }
    function method___state_read_23(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[20];
    }
    function method___state_write_23(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[20] = value;
    }
    function method___state_read_24(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[21];
    }
    function method___state_write_24(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[21] = value;
    }
    function method___state_read_25(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[22];
    }
    function method___state_write_25(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[22] = value;
    }
    function method___state_read_26(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[23];
    }
    function method___state_write_26(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[23] = value;
    }
    function method___state_read_27(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[24];
    }
    function method___state_write_27(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[24] = value;
    }
    function method___state_read_28(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[25];
    }
    function method___state_write_28(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[25] = value;
    }
    function method___state_read_29(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[26];
    }
    function method___state_write_29(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[26] = value;
    }
    function method___state_read_30(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[27];
    }
    function method___state_write_30(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[27] = value;
    }
    function method___state_read_31(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[28];
    }
    function method___state_write_31(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[28] = value;
    }
    function method___state_read_32(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[29];
    }
    function method___state_write_32(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[29] = value;
    }
    function method___state_read_33(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[30];
    }
    function method___state_write_33(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[30] = value;
    }
    function method___state_read_34(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[31];
    }
    function method___state_write_34(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[31] = value;
    }
    function method___state_read_35(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[32];
    }
    function method___state_write_35(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[32] = value;
    }
    function method___state_read_36(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[33];
    }
    function method___state_write_36(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[33] = value;
    }
    function method___state_read_37(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[34];
    }
    function method___state_write_37(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[34] = value;
    }
    function method___state_read_38(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[35];
    }
    function method___state_write_38(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[35] = value;
    }
    function method___state_read_39(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[36];
    }
    function method___state_write_39(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[36] = value;
    }
    function method___state_read_40(runtime) {
        const members = runtime.members;
        return (members.m_actual_log ?? 0);
    }
    function method___state_write_40(runtime, value) {
        const members = runtime.members;
        members.m_actual_log = ((value) | 0);
    }
    function method___state_read_41(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        return h_m_r[16];
    }
    function method___state_write_41(runtime, value) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[16] = value;
    }
    function method_arm7_cpu_device__device_start__lambda0(runtime, address) {
        const members = runtime.members;
        return (__deref_arm7_cpu_device__device_start__lambda0(runtime, members.m_cachele).read_dword?.(address) ?? 0);
    }
    function __deref_arm7_cpu_device__device_start__lambda0(runtime, p) {
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
    function method_arm7_cpu_device__device_start__lambda1(runtime, address) {
        const members = runtime.members;
        return (__deref_arm7_cpu_device__device_start__lambda1(runtime, members.m_cachele).read_ptr?.(address) ?? 0);
    }
    function __deref_arm7_cpu_device__device_start__lambda1(runtime, p) {
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
    function method_arm7_cpu_device__device_start__lambda2(runtime, address) {
        const members = runtime.members;
        return (__deref_arm7_cpu_device__device_start__lambda2(runtime, members.m_cachebe).read_dword?.(address) ?? 0);
    }
    function __deref_arm7_cpu_device__device_start__lambda2(runtime, p) {
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
    function method_arm7_cpu_device__device_start__lambda3(runtime, address) {
        const members = runtime.members;
        return (__deref_arm7_cpu_device__device_start__lambda3(runtime, members.m_cachebe).read_ptr?.(address) ?? 0);
    }
    function __deref_arm7_cpu_device__device_start__lambda3(runtime, p) {
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
    function method_execute_run__lambda0(runtime) {
        const members = runtime.members;
        const h_m_r = members.m_r ?? 0;
        h_m_r[15] = ((h_m_r[15]) + (4));
        members.m_icount = ((((members.m_icount) + (2))) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "execute_min_cycles": method_execute_min_cycles,
        "execute_max_cycles": method_execute_max_cycles,
        "tlb_probe": method_tlb_probe,
        "postload": method_postload,
        "init_ce_kernel_addrs": method_init_ce_kernel_addrs,
        "add_ce_kernel_addr": method_add_ce_kernel_addr,
        "state_export": method_state_export,
        "print_ce_kernel_address": method_print_ce_kernel_address,
        "update_insn_prefetch": method_update_insn_prefetch,
        "tlb_check_permissions": method_tlb_check_permissions,
        "get_fault_from_permissions": method_get_fault_from_permissions,
        "tlb_translate": method_tlb_translate,
        "update_irq_state": method_update_irq_state,
        "page_table_translate": method_page_table_translate,
        "tlb_map_entry": method_tlb_map_entry,
        "arm7_check_irq_state": method_arm7_check_irq_state,
        "execute_set_input": method_execute_set_input,
        "set_irq": method_set_irq,
        "set_fiq": method_set_fiq,
        "get_t_flag": method_get_t_flag,
        "arm7_rt_w_callback": method_arm7_rt_w_callback,
        "arm7_cpu_device::execute_min_cycles": method_arm7_cpu_device__execute_min_cycles,
        "arm7_cpu_device::execute_max_cycles": method_arm7_cpu_device__execute_max_cycles,
        "arm_E01FC088_r": method_arm_E01FC088_r,
        "flash_r": method_flash_r,
        "flash_w": method_flash_w,
        "pin_r": method_pin_r,
        "pin_w": method_pin_w,
        "mam_r": method_mam_r,
        "mam_w": method_mam_w,
        "fio_r": method_fio_r,
        "fio_w": method_fio_w,
        "apbdiv_r": method_apbdiv_r,
        "apbdiv_w": method_apbdiv_w,
        "scs_r": method_scs_r,
        "scs_w": method_scs_w,
        "pll_r": method_pll_r,
        "pll_w": method_pll_w,
        "timer0_r": method_timer0_r,
        "read_timer": method_read_timer,
        "timer0_w": method_timer0_w,
        "write_timer": method_write_timer,
        "timer1_r": method_timer1_r,
        "timer1_w": method_timer1_w,
        "lpc210x_device::timer0_r": method_lpc210x_device__timer0_r,
        "lpc210x_device::timer0_w": method_lpc210x_device__timer0_w,
        "lpc210x_device::timer1_r": method_lpc210x_device__timer1_r,
        "lpc210x_device::timer1_w": method_lpc210x_device__timer1_w,
        "__state_read_0": method___state_read_0,
        "__state_write_0": method___state_write_0,
        "__state_read_1": method___state_read_1,
        "__state_write_1": method___state_write_1,
        "__state_read_2": method___state_read_2,
        "__state_write_2": method___state_write_2,
        "__state_read_3": method___state_read_3,
        "__state_write_3": method___state_write_3,
        "__state_read_4": method___state_read_4,
        "__state_write_4": method___state_write_4,
        "__state_read_5": method___state_read_5,
        "__state_write_5": method___state_write_5,
        "__state_read_6": method___state_read_6,
        "__state_write_6": method___state_write_6,
        "__state_read_7": method___state_read_7,
        "__state_write_7": method___state_write_7,
        "__state_read_8": method___state_read_8,
        "__state_write_8": method___state_write_8,
        "__state_read_9": method___state_read_9,
        "__state_write_9": method___state_write_9,
        "__state_read_10": method___state_read_10,
        "__state_write_10": method___state_write_10,
        "__state_read_11": method___state_read_11,
        "__state_write_11": method___state_write_11,
        "__state_read_12": method___state_read_12,
        "__state_write_12": method___state_write_12,
        "__state_read_13": method___state_read_13,
        "__state_write_13": method___state_write_13,
        "__state_read_14": method___state_read_14,
        "__state_write_14": method___state_write_14,
        "__state_read_15": method___state_read_15,
        "__state_write_15": method___state_write_15,
        "__state_read_16": method___state_read_16,
        "__state_write_16": method___state_write_16,
        "__state_read_17": method___state_read_17,
        "__state_write_17": method___state_write_17,
        "__state_read_18": method___state_read_18,
        "__state_write_18": method___state_write_18,
        "__state_read_19": method___state_read_19,
        "__state_write_19": method___state_write_19,
        "__state_read_20": method___state_read_20,
        "__state_write_20": method___state_write_20,
        "__state_read_21": method___state_read_21,
        "__state_write_21": method___state_write_21,
        "__state_read_22": method___state_read_22,
        "__state_write_22": method___state_write_22,
        "__state_read_23": method___state_read_23,
        "__state_write_23": method___state_write_23,
        "__state_read_24": method___state_read_24,
        "__state_write_24": method___state_write_24,
        "__state_read_25": method___state_read_25,
        "__state_write_25": method___state_write_25,
        "__state_read_26": method___state_read_26,
        "__state_write_26": method___state_write_26,
        "__state_read_27": method___state_read_27,
        "__state_write_27": method___state_write_27,
        "__state_read_28": method___state_read_28,
        "__state_write_28": method___state_write_28,
        "__state_read_29": method___state_read_29,
        "__state_write_29": method___state_write_29,
        "__state_read_30": method___state_read_30,
        "__state_write_30": method___state_write_30,
        "__state_read_31": method___state_read_31,
        "__state_write_31": method___state_write_31,
        "__state_read_32": method___state_read_32,
        "__state_write_32": method___state_write_32,
        "__state_read_33": method___state_read_33,
        "__state_write_33": method___state_write_33,
        "__state_read_34": method___state_read_34,
        "__state_write_34": method___state_write_34,
        "__state_read_35": method___state_read_35,
        "__state_write_35": method___state_write_35,
        "__state_read_36": method___state_read_36,
        "__state_write_36": method___state_write_36,
        "__state_read_37": method___state_read_37,
        "__state_write_37": method___state_write_37,
        "__state_read_38": method___state_read_38,
        "__state_write_38": method___state_write_38,
        "__state_read_39": method___state_read_39,
        "__state_write_39": method___state_write_39,
        "__state_read_40": method___state_read_40,
        "__state_write_40": method___state_write_40,
        "__state_read_41": method___state_read_41,
        "__state_write_41": method___state_write_41,
        "arm7_cpu_device::device_start__lambda0": method_arm7_cpu_device__device_start__lambda0,
        "arm7_cpu_device::device_start__lambda1": method_arm7_cpu_device__device_start__lambda1,
        "arm7_cpu_device::device_start__lambda2": method_arm7_cpu_device__device_start__lambda2,
        "arm7_cpu_device::device_start__lambda3": method_arm7_cpu_device__device_start__lambda3,
        "execute_run__lambda0": method_execute_run__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_harmony"].children[0].definition.compiledMethodLinks = ["SwitchMode", "fatalerror", "m_pr32", "printf", "standard_irq_callback"];
definition.slot.options["a26_harmony"].children[0].definition.children[0].definition.compiledMethods = (() => {
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
    function method_irq_status_r(runtime) {
        const members = runtime.members;
        return (((((members.raw_intr ?? 0)) & ((~(members.intr_select ?? 0))))) >>> 0);
    }
    function method_fiq_status_r(runtime) {
        const members = runtime.members;
        return (((((members.raw_intr ?? 0)) & ((members.intr_select ?? 0)))) >>> 0);
    }
    function method_raw_intr_r(runtime) {
        const members = runtime.members;
        return (((members.raw_intr ?? 0)) >>> 0);
    }
    function method_int_select_r(runtime) {
        const members = runtime.members;
        return (((members.intr_select ?? 0)) >>> 0);
    }
    function method_int_select_w(runtime, data) {
        const members = runtime.members;
        members.intr_select = ((data) >>> 0);
        (__deref_int_select_w(runtime, members.m_irq_sync_timer).adjust?.(0) ?? 0);
    }
    function __deref_int_select_w(runtime, p) {
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
    function method_int_enable_r(runtime) {
        const members = runtime.members;
        return (((members.intr_en ?? 0)) >>> 0);
    }
    function method_int_enable_w(runtime, data) {
        const members = runtime.members;
        members.intr_en = ((((members.intr_en) | (data))) >>> 0);
        (__deref_int_enable_w(runtime, members.m_irq_sync_timer).adjust?.(0) ?? 0);
    }
    function __deref_int_enable_w(runtime, p) {
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
    function method_int_en_clear_w(runtime, data) {
        const members = runtime.members;
        members.intr_en = ((((members.intr_en) & ((~data)))) >>> 0);
        (__deref_int_en_clear_w(runtime, members.m_irq_sync_timer).adjust?.(0) ?? 0);
    }
    function __deref_int_en_clear_w(runtime, p) {
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
    function method_soft_int_r(runtime) {
        const members = runtime.members;
        return (((members.soft_intr ?? 0)) >>> 0);
    }
    function method_soft_int_w(runtime, data) {
        const members = runtime.members;
        members.soft_intr = ((((members.soft_intr) | (data))) >>> 0);
        (__deref_soft_int_w(runtime, members.m_irq_sync_timer).adjust?.(0) ?? 0);
    }
    function __deref_soft_int_w(runtime, p) {
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
    function method_soft_int_clear_w(runtime, data) {
        const members = runtime.members;
        members.soft_intr = ((((members.soft_intr) & ((~data)))) >>> 0);
        (__deref_soft_int_clear_w(runtime, members.m_irq_sync_timer).adjust?.(0) ?? 0);
    }
    function __deref_soft_int_clear_w(runtime, p) {
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
    function method_protection_r(runtime) {
        const members = runtime.members;
        return (((members.protection ?? 0)) & 0xff);
    }
    function method_protection_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.protection = (((((data) >>> (0)) & 1)) | 0);
    }
    function method_cur_vect_addr_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_update_vector(runtime);
        }
        return (((members.vicaddress ?? 0)) >>> 0);
    }
    function method_update_vector(runtime) {
        const members = runtime.members;
        const h_num_vectors = members.num_vectors ?? 0;
        const h_vectctl = members.vectctl ?? 0;
        const h_vectaddr = members.vectaddr ?? 0;
        let intrs = (((((((((members.raw_intr ?? 0)) | ((members.soft_intr ?? 0)))) & ((members.intr_en ?? 0)))) & ((~(members.intr_select ?? 0))))) >>> 0);
        let newmask = ((0) >>> 0);
        for (let i = ((0) & 0xff); ((Number(i) < Number(cppMin(+((members.priority ?? 0)), +(h_num_vectors)))) ? 1 : 0); i = ((((i) + (1))) & 0xff)) {
            let irq = ((((h_vectctl[i]) & (31))) & 0xff);
            if ((((((h_vectctl[i]) >>> (5)) & 1)) ? 0 : 1)) {
                continue;
            }
            else {
                if ((((intrs) >>> (irq)) & 1)) {
                    members.priority_mask = ((newmask) >>> 0);
                    members.priority = ((i) & 0xff);
                    members.vicaddress = ((h_vectaddr[i]) >>> 0);
                    return;
                }
                else {
                    newmask = ((((newmask) | (((1) << (irq))))) >>> 0);
                }
            }
        }
        members.priority_mask = ((-1) >>> 0);
        members.priority = ((-1) & 0xff);
        members.vicaddress = (((members.defaddress ?? 0)) >>> 0);
    }
    function method_cur_vect_addr_w(runtime, data) {
        const members = runtime.members;
        members.priority_mask = ((-1) >>> 0);
        members.priority = ((-1) & 0xff);
        (__deref_cur_vect_addr_w(runtime, members.m_irq_sync_timer).adjust?.(0) ?? 0);
    }
    function __deref_cur_vect_addr_w(runtime, p) {
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
    function method_def_vect_addr_r(runtime) {
        const members = runtime.members;
        return (((members.defaddress ?? 0)) >>> 0);
    }
    function method_def_vect_addr_w(runtime, data) {
        const members = runtime.members;
        members.defaddress = ((data) >>> 0);
    }
    function method_vect_addr_r(runtime, offset) {
        const members = runtime.members;
        const h_vectaddr = members.vectaddr ?? 0;
        return ((h_vectaddr[offset]) >>> 0);
    }
    function method_vect_addr_w(runtime, offset, data) {
        const members = runtime.members;
        const h_vectaddr = members.vectaddr ?? 0;
        h_vectaddr[offset] = data;
    }
    function method_vect_ctl_r(runtime, offset) {
        const members = runtime.members;
        const h_vectctl = members.vectctl ?? 0;
        return ((h_vectctl[offset]) >>> 0);
    }
    function method_vect_ctl_w(runtime, offset, data) {
        const members = runtime.members;
        const h_vectctl = members.vectctl ?? 0;
        h_vectctl[offset] = data;
    }
    function method_irq_sync_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_fiq_func"], __L1 = __l["m_out_irq_func"];
        let intrs = (((((((members.raw_intr ?? 0)) | ((members.soft_intr ?? 0)))) & ((members.intr_en ?? 0)))) >>> 0);
        if (((intrs) & ((members.intr_select ?? 0)))) {
            (__L0 ? __L0(Number(1)) : typeof members.m_out_fiq_func === 'function' ? members.m_out_fiq_func(1) : runtime.invoke("m_out_fiq_func", 1));
        }
        else {
            (__L0 ? __L0(Number(0)) : typeof members.m_out_fiq_func === 'function' ? members.m_out_fiq_func(0) : runtime.invoke("m_out_fiq_func", 0));
        }
        if (((((intrs) & ((~(members.intr_select ?? 0))))) & ((members.priority_mask ?? 0)))) {
            (__L1 ? __L1(Number(1)) : typeof members.m_out_irq_func === 'function' ? members.m_out_irq_func(1) : runtime.invoke("m_out_irq_func", 1));
        }
        else {
            (__L1 ? __L1(Number(0)) : typeof members.m_out_irq_func === 'function' ? members.m_out_irq_func(0) : runtime.invoke("m_out_irq_func", 0));
        }
    }
    function method_out_irq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_irq_cb(runtime, members.m_out_irq_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_irq_func, "bind"));
    }
    function __deref_out_irq_cb(runtime, p) {
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
    function method_out_fiq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_fiq_cb(runtime, members.m_out_fiq_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_fiq_func, "bind"));
    }
    function __deref_out_fiq_cb(runtime, p) {
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
    function method_set_irq_line(runtime, irq, state) {
        const members = runtime.members;
        let mask = ((((1) << (irq))) >>> 0);
        if (state) {
            members.raw_intr = ((((members.raw_intr) | (mask))) >>> 0);
        }
        else {
            members.raw_intr = ((((members.raw_intr) & ((~mask)))) >>> 0);
        }
        (__deref_set_irq_line(runtime, members.m_irq_sync_timer).adjust?.(0) ?? 0);
    }
    function __deref_set_irq_line(runtime, p) {
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
    function method_vic_pl190_device__out_irq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_vic_pl190_device__out_irq_cb(runtime, members.m_out_irq_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_irq_func, "bind"));
    }
    function __deref_vic_pl190_device__out_irq_cb(runtime, p) {
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
    function method_vic_pl190_device__out_fiq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_vic_pl190_device__out_fiq_cb(runtime, members.m_out_fiq_func), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_fiq_func, "bind"));
    }
    function __deref_vic_pl190_device__out_fiq_cb(runtime, p) {
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
    function method_map__lambda0(runtime, offset) {
        const members = runtime.members;
        const h_periph_id = members.periph_id ?? 0;
        return h_periph_id[0];
    }
    function method_map__lambda1(runtime, offset) {
        const members = runtime.members;
        const h_periph_id = members.periph_id ?? 0;
        return h_periph_id[1];
    }
    function method_map__lambda2(runtime, offset) {
        const members = runtime.members;
        const h_periph_id = members.periph_id ?? 0;
        return h_periph_id[2];
    }
    function method_map__lambda3(runtime, offset) {
        const members = runtime.members;
        const h_periph_id = members.periph_id ?? 0;
        return h_periph_id[3];
    }
    function method_map__lambda4(runtime, offset) {
        const members = runtime.members;
        const h_pcell_id = members.pcell_id ?? 0;
        return h_pcell_id[0];
    }
    function method_map__lambda5(runtime, offset) {
        const members = runtime.members;
        const h_pcell_id = members.pcell_id ?? 0;
        return h_pcell_id[1];
    }
    function method_map__lambda6(runtime, offset) {
        const members = runtime.members;
        const h_pcell_id = members.pcell_id ?? 0;
        return h_pcell_id[2];
    }
    function method_map__lambda7(runtime, offset) {
        const members = runtime.members;
        const h_pcell_id = members.pcell_id ?? 0;
        return h_pcell_id[3];
    }
    function method_vic_pl190_device__map__lambda0(runtime, offset) {
        const members = runtime.members;
        const h_periph_id = members.periph_id ?? 0;
        return h_periph_id[0];
    }
    function method_vic_pl190_device__map__lambda1(runtime, offset) {
        const members = runtime.members;
        const h_periph_id = members.periph_id ?? 0;
        return h_periph_id[1];
    }
    function method_vic_pl190_device__map__lambda2(runtime, offset) {
        const members = runtime.members;
        const h_periph_id = members.periph_id ?? 0;
        return h_periph_id[2];
    }
    function method_vic_pl190_device__map__lambda3(runtime, offset) {
        const members = runtime.members;
        const h_periph_id = members.periph_id ?? 0;
        return h_periph_id[3];
    }
    function method_vic_pl190_device__map__lambda4(runtime, offset) {
        const members = runtime.members;
        const h_pcell_id = members.pcell_id ?? 0;
        return h_pcell_id[0];
    }
    function method_vic_pl190_device__map__lambda5(runtime, offset) {
        const members = runtime.members;
        const h_pcell_id = members.pcell_id ?? 0;
        return h_pcell_id[1];
    }
    function method_vic_pl190_device__map__lambda6(runtime, offset) {
        const members = runtime.members;
        const h_pcell_id = members.pcell_id ?? 0;
        return h_pcell_id[2];
    }
    function method_vic_pl190_device__map__lambda7(runtime, offset) {
        const members = runtime.members;
        const h_pcell_id = members.pcell_id ?? 0;
        return h_pcell_id[3];
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "irq_status_r": method_irq_status_r,
        "fiq_status_r": method_fiq_status_r,
        "raw_intr_r": method_raw_intr_r,
        "int_select_r": method_int_select_r,
        "int_select_w": method_int_select_w,
        "int_enable_r": method_int_enable_r,
        "int_enable_w": method_int_enable_w,
        "int_en_clear_w": method_int_en_clear_w,
        "soft_int_r": method_soft_int_r,
        "soft_int_w": method_soft_int_w,
        "soft_int_clear_w": method_soft_int_clear_w,
        "protection_r": method_protection_r,
        "protection_w": method_protection_w,
        "cur_vect_addr_r": method_cur_vect_addr_r,
        "update_vector": method_update_vector,
        "cur_vect_addr_w": method_cur_vect_addr_w,
        "def_vect_addr_r": method_def_vect_addr_r,
        "def_vect_addr_w": method_def_vect_addr_w,
        "vect_addr_r": method_vect_addr_r,
        "vect_addr_w": method_vect_addr_w,
        "vect_ctl_r": method_vect_ctl_r,
        "vect_ctl_w": method_vect_ctl_w,
        "irq_sync_tick": method_irq_sync_tick,
        "out_irq_cb": method_out_irq_cb,
        "out_fiq_cb": method_out_fiq_cb,
        "set_irq_line": method_set_irq_line,
        "vic_pl190_device::out_irq_cb": method_vic_pl190_device__out_irq_cb,
        "vic_pl190_device::out_fiq_cb": method_vic_pl190_device__out_fiq_cb,
        "map__lambda0": method_map__lambda0,
        "map__lambda1": method_map__lambda1,
        "map__lambda2": method_map__lambda2,
        "map__lambda3": method_map__lambda3,
        "map__lambda4": method_map__lambda4,
        "map__lambda5": method_map__lambda5,
        "map__lambda6": method_map__lambda6,
        "map__lambda7": method_map__lambda7,
        "vic_pl190_device::map__lambda0": method_vic_pl190_device__map__lambda0,
        "vic_pl190_device::map__lambda1": method_vic_pl190_device__map__lambda1,
        "vic_pl190_device::map__lambda2": method_vic_pl190_device__map__lambda2,
        "vic_pl190_device::map__lambda3": method_vic_pl190_device__map__lambda3,
        "vic_pl190_device::map__lambda4": method_vic_pl190_device__map__lambda4,
        "vic_pl190_device::map__lambda5": method_vic_pl190_device__map__lambda5,
        "vic_pl190_device::map__lambda6": method_vic_pl190_device__map__lambda6,
        "vic_pl190_device::map__lambda7": method_vic_pl190_device__map__lambda7
    };
    return __methodTable;
})();
definition.slot.options["a26_harmony"].children[0].definition.children[0].definition.compiledMethodLinks = ["m_out_fiq_func", "m_out_irq_func", "machine", "machine().side_effects_disabled"];
definition.slot.options["a26_f0"].compiledMethods = (() => {
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
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return __addr_device_vcs_cart_interface__get_ram_base(runtime, (members.m_ram ?? 0), 0);
    }
    function __addr_device_vcs_cart_interface__get_ram_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (((members.m_rom_size ?? 0)) >>> 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (((members.m_ram).length) >>> 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_switch_bank(runtime, members.m_bank).set_entry?.(offset) ?? 0);
    }
    function __deref_switch_bank(runtime, p) {
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
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_install_memory_handlers__lambda0(runtime, offset, __unnamed1) {
        const members = runtime.members;
        method_switch_bank(runtime, __add_install_memory_handlers__lambda0(runtime, offset, 2), 0);
    }
    function __add_install_memory_handlers__lambda0(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_install_memory_handlers__lambda1(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8176), 0);
        }
    }
    function method_install_memory_handlers__lambda2(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, __add_install_memory_handlers__lambda2(runtime, runtime.subtract(address, 8184), 2), 0);
        }
    }
    function __add_install_memory_handlers__lambda2(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_a26_rom_f6_device__install_memory_handlers__lambda0(runtime, address, __unnamed1, __unnamed2) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            method_switch_bank(runtime, runtime.subtract(address, 8182), 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "get_rom_base": method_get_rom_base,
        "is_ram_present": method_is_ram_present,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "install_memory_handlers__lambda0": method_install_memory_handlers__lambda0,
        "install_memory_handlers__lambda1": method_install_memory_handlers__lambda1,
        "install_memory_handlers__lambda2": method_install_memory_handlers__lambda2,
        "a26_rom_f6_device::install_memory_handlers__lambda0": method_a26_rom_f6_device__install_memory_handlers__lambda0
    };
    return __methodTable;
})();
definition.slot.options["a26_f0"].compiledMethodLinks = ["machine", "machine().side_effects_disabled"];
export const device = definition;
export default device;
