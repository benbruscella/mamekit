import deviceData from './gb_cart_slot.device.ir.json' with { type: 'json' };
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
    function method_cart_space(runtime) {
        const members = runtime.members;
        const h_m_space = members.m_space ?? 0;
        return __deref_cart_space(runtime, h_m_space);
    }
    function __deref_cart_space(runtime, p) {
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
    function method_gb_cart_slot_device_base__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_gb_cart_slot_device_base__cart_space(runtime) {
        const members = runtime.members;
        const h_m_space = members.m_space ?? 0;
        return __deref_gb_cart_slot_device_base__cart_space(runtime, h_m_space);
    }
    function __deref_gb_cart_slot_device_base__cart_space(runtime, p) {
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
    function method_gb_cart_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return "gameboy_cart";
    }
    function method_gb_cart_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return "bin,gb,gbc,gbx";
    }
    function method_cart_cgb_support_description(runtime, flags) {
        const members = runtime.members;
        flags = ((flags) & 0xff);
        if ((((((flags) >>> (7)) & 1)) ? 0 : 1)) {
            return "unsupported";
        }
        else {
            if ((((flags) >>> (2)) & ((1 << (2)) - 1))) {
                return "PGB mode";
            }
            else {
                if ((((flags) >>> (6)) & 1)) {
                    return "required";
                }
                else {
                    return "enhanced";
                }
            }
        }
    }
    function method_cart_type_description(runtime, type) {
        const members = runtime.members;
        type = ((type) & 0xff);
        switch (type) {
            case (members["cartheader::TYPE_ROM"] ?? 0):
                {
                    return "flat ROM";
                }
            case (members["cartheader::TYPE_MBC1"] ?? 0):
                {
                    return "Nintendo MBC1";
                }
            case (members["cartheader::TYPE_MBC1_RAM"] ?? 0):
                {
                    return "Nintendo MBC1 with RAM";
                }
            case (members["cartheader::TYPE_MBC1_RAM_BATT"] ?? 0):
                {
                    return "Nintendo MBC1 with battery-backed RAM";
                }
            case (members["cartheader::TYPE_MBC2"] ?? 0):
                {
                    return "Nintendo MBC2";
                }
            case (members["cartheader::TYPE_MBC2_BATT"] ?? 0):
                {
                    return "Nintendo MBC2 with backup battery";
                }
            case (members["cartheader::TYPE_ROM_RAM"] ?? 0):
                {
                    return "flat ROM with RAM";
                }
            case (members["cartheader::TYPE_ROM_RAM_BATT"] ?? 0):
                {
                    return "flat ROM with battery-backed RAM";
                }
            case (members["cartheader::TYPE_MMM01"] ?? 0):
                {
                    return "Nintendo MMM01";
                }
            case (members["cartheader::TYPE_MMM01_RAM"] ?? 0):
                {
                    return "Nintendo MMM01 with RAM";
                }
            case (members["cartheader::TYPE_MMM01_RAM_BATT"] ?? 0):
                {
                    return "Nintendo MMM01 with battery-backed RAM";
                }
            case (members["cartheader::TYPE_MBC3_RTC_BATT"] ?? 0):
                {
                    return "Nintendo MBC3 with backup battery and real-time clock crystal";
                }
            case (members["cartheader::TYPE_MBC3_RTC_RAM_BATT"] ?? 0):
                {
                    return "Nintendo MBC3 with battery-backed RAM and real-time clock crystal";
                }
            case (members["cartheader::TYPE_MBC3"] ?? 0):
                {
                    return "Nintendo MBC3";
                }
            case (members["cartheader::TYPE_MBC3_RAM"] ?? 0):
                {
                    return "Nintendo MBC3 with RAM";
                }
            case (members["cartheader::TYPE_MBC3_RAM_BATT"] ?? 0):
                {
                    return "Nintendo MBC3 with battery-backed RAM";
                }
            case (members["cartheader::TYPE_MBC5"] ?? 0):
                {
                    return "Nintendo MBC5";
                }
            case (members["cartheader::TYPE_MBC5_RAM"] ?? 0):
                {
                    return "Nintendo MBC5 with RAM";
                }
            case (members["cartheader::TYPE_MBC5_RAM_BATT"] ?? 0):
                {
                    return "Nintendo MBC5 with battery-backed RAM";
                }
            case (members["cartheader::TYPE_MBC5_RUMBLE"] ?? 0):
                {
                    return "Nintendo MBC5 with vibration motor";
                }
            case (members["cartheader::TYPE_MBC5_RUMBLE_RAM"] ?? 0):
                {
                    return "Nintendo MBC5 with RAM and vibration motor";
                }
            case (members["cartheader::TYPE_MBC5_RUMBLE_RAM_BATT"] ?? 0):
                {
                    return "Nintendo MBC5 with battery-backed RAM and vibration motor";
                }
            case (members["cartheader::TYPE_MBC6"] ?? 0):
                {
                    return "Nintendo MBC6 with Flash memory and battery-backed RAM";
                }
            case (members["cartheader::TYPE_MBC7_ACCEL_EEPROM"] ?? 0):
                {
                    return "Nintendo MBC7 with EEPROM and two-axis accelerometer";
                }
            case (members["cartheader::TYPE_UNLICENSED_YONGYONG"] ?? 0):
                {
                    return "Yong Yong pirate";
                }
            case (members["cartheader::TYPE_CAMERA"] ?? 0):
                {
                    return "Nintendo Game Boy Camera with battery-backed RAM";
                }
            case (members["cartheader::TYPE_TAMA5"] ?? 0):
                {
                    return "Bandai TAMA5 with battery-backed TAMA6 and real-time clock";
                }
            case (members["cartheader::TYPE_HUC3"] ?? 0):
                {
                    return "Hudson Soft HuC-3 with battery-baked RAM";
                }
            case (members["cartheader::TYPE_HUC1_RAM_BATT"] ?? 0):
                {
                    return "Hudson Soft HuC-1 with battery-baked RAM";
                }
            default:
                {
                    return "unknown";
                }
        }
    }
    function method_cart_region_description(runtime, region) {
        const members = runtime.members;
        region = ((region) & 0xff);
        switch (region) {
            case 0:
                {
                    return "Japan";
                }
            case 1:
                {
                    return "export";
                }
            default:
                {
                    return "unknown";
                }
        }
    }
    function method_cart_title_text__lambda0(runtime, ch) {
        const members = runtime.members;
        return (((((Number(32) > Number(ch)) ? 1 : 0)) || (((Number(126) < Number(ch)) ? 1 : 0))) ? 1 : 0);
    }
    function method_cart_licensee_description__lambda0(runtime, x, y) {
        const members = runtime.members;
        return ((Number(x.first) < Number(y)) ? 1 : 0);
    }
    function method_cart_licensee_description__lambda1(runtime, x, y) {
        const members = runtime.members;
        return ((Number(x.first) < Number(y)) ? 1 : 0);
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
        "cart_space": method_cart_space,
        "gb_cart_slot_device_base::is_reset_on_load": method_gb_cart_slot_device_base__is_reset_on_load,
        "gb_cart_slot_device_base::cart_space": method_gb_cart_slot_device_base__cart_space,
        "gb_cart_slot_device::image_interface": method_gb_cart_slot_device__image_interface,
        "gb_cart_slot_device::file_extensions": method_gb_cart_slot_device__file_extensions,
        "cart_cgb_support_description": method_cart_cgb_support_description,
        "cart_type_description": method_cart_type_description,
        "cart_region_description": method_cart_region_description,
        "cart_title_text__lambda0": method_cart_title_text__lambda0,
        "cart_licensee_description__lambda0": method_cart_licensee_description__lambda0,
        "cart_licensee_description__lambda1": method_cart_licensee_description__lambda1
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["rom_software_list_loader::instance"];
definition.slot.options["rom"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_wisdom"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_banked_32k_device_base__set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_bank_rom_switch(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom(runtime, offset);
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom(runtime, members.m_bank_rom).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom(runtime, p) {
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
    function method_wisdom_device__bank_rom_switch(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom(runtime, offset);
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "set_bank_bits_rom": method_set_bank_bits_rom,
        "banked_32k_device_base::set_bank_bits_rom": method_banked_32k_device_base__set_bank_bits_rom,
        "bank_rom_switch": method_bank_rom_switch,
        "set_bank_rom": method_set_bank_rom,
        "wisdom_device::bank_rom_switch": method_wisdom_device__bank_rom_switch,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_wisdom"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_yong"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_mbc_device_base__set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_bank_rom_switch(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom(runtime, data);
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom(runtime, members.m_bank_rom).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom(runtime, p) {
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
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "set_bank_bits_rom": method_set_bank_bits_rom,
        "mbc_device_base::set_bank_bits_rom": method_mbc_device_base__set_bank_bits_rom,
        "bank_rom_switch": method_bank_rom_switch,
        "set_bank_rom": method_set_bank_rom,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_yong"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_rock8"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_mbc_device_base__set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_bank_rom_switch(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        data = ((((data) & (31))) & 0xff);
        method_set_bank_rom(runtime, ((((data) ? 0 : 1)) ? (1) : ((((((15) < (data)) ? 1 : 0)) ? (((data) - (8))) : (data)))));
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom(runtime, members.m_bank_rom).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom(runtime, p) {
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
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "set_bank_bits_rom": method_set_bank_bits_rom,
        "mbc_device_base::set_bank_bits_rom": method_mbc_device_base__set_bank_bits_rom,
        "bank_rom_switch": method_bank_rom_switch,
        "set_bank_rom": method_set_bank_rom,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_rock8"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_sachen1"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_bank_rom_low_base(runtime, p) {
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
    function method_bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_bank_rom_high_base(runtime, p) {
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
    function method_mbc_dual_uniform_device_base__set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_mbc_dual_uniform_device_base__bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_uniform_device_base__bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_mbc_dual_uniform_device_base__bank_rom_low_base(runtime, p) {
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
    function method_mbc_dual_uniform_device_base__bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_uniform_device_base__bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_mbc_dual_uniform_device_base__bank_rom_high_base(runtime, p) {
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
    function method_rom_read(runtime, offset, spoof) {
        const members = runtime.members;
        if (spoof) {
            offset = ((offset) | (128));
        }
        if (((Number(256) === Number(((offset) & (65280)))) ? 1 : 0)) {
            offset = ((((offset) & (65408))) | (((((offset) >>> (0)) & 1) << 6 | (((offset) >>> (5)) & 1) << 5 | (((offset) >>> (1)) & 1) << 4 | (((offset) >>> (3)) & 1) << 3 | (((offset) >>> (2)) & 1) << 2 | (((offset) >>> (4)) & 1) << 1 | (((offset) >>> (6)) & 1) << 0)));
        }
        return runtime.readIndex((((((offset) >>> (14)) & 1)) ? (method_bank_rom_high_base(runtime)) : (method_bank_rom_low_base(runtime))), ((offset) & (16383)));
    }
    function method_bank_rom_switch_outer(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        if (((Number(48) === Number(((h_m_bank_sel_rom[1]) & (48)))) ? 1 : 0)) {
            h_m_bank_sel_rom[0] = data;
            method_update_banks(runtime);
        }
    }
    function method_update_banks(runtime) {
        const members = runtime.members;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        method_set_bank_rom_low(runtime, lo);
        method_set_bank_rom_high(runtime, hi);
    }
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) & 0xff);
    }
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) | (((h_m_bank_sel_rom[1]) & ((~(members.m_bank_mux_rom ?? 0))))))) & 0xff);
    }
    function method_set_bank_rom_low(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom_low(runtime, h_m_bank_rom[0]).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom_low(runtime, p) {
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
    function method_set_bank_rom_high(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom_high(runtime, h_m_bank_rom[1]).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom_high(runtime, p) {
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
    function method_bank_rom_switch_inner(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        h_m_bank_sel_rom[1] = ((data) ? (data) : (1));
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        method_set_bank_rom_high(runtime, hi);
    }
    function method_bank_rom_mux(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        if (((Number(48) === Number(((h_m_bank_sel_rom[1]) & (48)))) ? 1 : 0)) {
            members.m_bank_mux_rom = ((data) & 0xff);
            method_update_banks(runtime);
        }
    }
    function method_sachen_mmc_device_base__rom_read(runtime, offset, spoof) {
        const members = runtime.members;
        if (spoof) {
            offset = ((offset) | (128));
        }
        if (((Number(256) === Number(((offset) & (65280)))) ? 1 : 0)) {
            offset = ((((offset) & (65408))) | (((((offset) >>> (0)) & 1) << 6 | (((offset) >>> (5)) & 1) << 5 | (((offset) >>> (1)) & 1) << 4 | (((offset) >>> (3)) & 1) << 3 | (((offset) >>> (2)) & 1) << 2 | (((offset) >>> (4)) & 1) << 1 | (((offset) >>> (6)) & 1) << 0)));
        }
        return runtime.readIndex((((((offset) >>> (14)) & 1)) ? (method_bank_rom_high_base(runtime)) : (method_bank_rom_low_base(runtime))), ((offset) & (16383)));
    }
    function method_sachen_mmc_device_base__bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) & 0xff);
    }
    function method_sachen_mmc_device_base__bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) | (((h_m_bank_sel_rom[1]) & ((~(members.m_bank_mux_rom ?? 0))))))) & 0xff);
    }
    function method_read_rom(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if ((((49) !== ((members.m_counter ?? 0))) ? 1 : 0)) {
                members.m_counter = ((((members.m_counter) + (1))) & 0xff);
            }
        }
        return ((method_rom_read(runtime, offset, (((49) !== ((members.m_counter ?? 0))) ? 1 : 0))) & 0xff);
    }
    function method_sachen_mmc1_device__read_rom(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if ((((49) !== ((members.m_counter ?? 0))) ? 1 : 0)) {
                members.m_counter = ((((members.m_counter) + (1))) & 0xff);
            }
        }
        return ((method_rom_read(runtime, offset, (((49) !== ((members.m_counter ?? 0))) ? 1 : 0))) & 0xff);
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "set_bank_bits_rom": method_set_bank_bits_rom,
        "bank_rom_low_base": method_bank_rom_low_base,
        "bank_rom_high_base": method_bank_rom_high_base,
        "mbc_dual_uniform_device_base::set_bank_bits_rom": method_mbc_dual_uniform_device_base__set_bank_bits_rom,
        "mbc_dual_uniform_device_base::bank_rom_low_base": method_mbc_dual_uniform_device_base__bank_rom_low_base,
        "mbc_dual_uniform_device_base::bank_rom_high_base": method_mbc_dual_uniform_device_base__bank_rom_high_base,
        "rom_read": method_rom_read,
        "bank_rom_switch_outer": method_bank_rom_switch_outer,
        "update_banks": method_update_banks,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "set_bank_rom_low": method_set_bank_rom_low,
        "set_bank_rom_high": method_set_bank_rom_high,
        "bank_rom_switch_inner": method_bank_rom_switch_inner,
        "bank_rom_mux": method_bank_rom_mux,
        "sachen_mmc_device_base::rom_read": method_sachen_mmc_device_base__rom_read,
        "sachen_mmc_device_base::bank_rom_entry_low": method_sachen_mmc_device_base__bank_rom_entry_low,
        "sachen_mmc_device_base::bank_rom_entry_high": method_sachen_mmc_device_base__bank_rom_entry_high,
        "read_rom": method_read_rom,
        "sachen_mmc1_device::read_rom": method_sachen_mmc1_device__read_rom,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_sachen1"].compiledMethodLinks = ["machine", "machine().side_effects_disabled", "std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_lasama"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_bank_rom_low_base(runtime, p) {
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
    function method_bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_bank_rom_high_base(runtime, p) {
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
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_low_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_high_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_ctrl_2080_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom_fine(runtime, ((data) & (3)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_fine(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_fine(runtime, p) {
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
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_ctrl_6000_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((((data) >>> (7)) & 1)) ? 0 : 1)) {
            method_set_bank_rom_coarse(runtime, (((data) >>> (1)) & 1));
        }
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[0]).set_entry?.(lo) ?? 0);
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_coarse(runtime, p) {
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
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "bank_rom_coarse": method_bank_rom_coarse,
        "bank_rom_fine": method_bank_rom_fine,
        "bank_rom_low_base": method_bank_rom_low_base,
        "bank_rom_high_base": method_bank_rom_high_base,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
        "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
        "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
        "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
        "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
        "ctrl_2080_w": method_ctrl_2080_w,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "ctrl_6000_w": method_ctrl_6000_w,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_lasama"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_mbc1"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_bank_rom_low_base(runtime, p) {
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
    function method_bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_bank_rom_high_base(runtime, p) {
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
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_low_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_high_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_bank_ram_base(runtime, p) {
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
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_mbc_ram_device_base__set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_mbc_ram_device_base__bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_mbc_ram_device_base__bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_mbc_ram_device_base__bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_mbc_ram_device_base__bank_ram_base(runtime, p) {
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
    function method_mbc_ram_device_base__bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank_lines = members.m_bank_lines ?? 0;
        method_set_bank_rom_coarse(runtime, ((data) & (h_m_bank_lines[1])));
        method_set_bank_ram(runtime, ((data) & (h_m_bank_lines[1])));
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[0]).set_entry?.(lo) ?? 0);
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_coarse(runtime, p) {
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
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xff);
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            (__deref_set_bank_ram(runtime, members.m_bank_ram).set_entry?.(entry) ?? 0);
        }
    }
    function __deref_set_bank_ram(runtime, p) {
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
    function method_enable_ram(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_ram_enable(runtime, ((Number(10) === Number(((data) & (15)))) ? 1 : 0));
    }
    function method_set_ram_enable(runtime, enable) {
        const members = runtime.members;
        let __t0;
        0;
        if (enable) {
            (__deref_set_ram_enable(runtime, members.m_view_ram).select?.(0) ?? 0);
        }
        else {
            (__t0 = __deref_set_ram_enable(runtime, members.m_view_ram), typeof __t0.disable === 'function' ? __t0.disable() : typeof __t0.disable === 'number' || typeof __t0.disable === 'boolean' ? __t0.disable : runtime.container(members.m_view_ram, "disable"));
        }
    }
    function __deref_set_ram_enable(runtime, p) {
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
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        data = ((((data) & (31))) & 0xff);
        method_set_bank_rom_fine(runtime, ((data) ? (data) : (1)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_lines = members.m_bank_lines ?? 0;
        method_mbc_dual_device_base__set_bank_rom_fine(runtime, ((entry) & (h_m_bank_lines[0])));
    }
    function method_mbc_dual_device_base__set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_mbc_dual_device_base__set_bank_rom_fine(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_mbc_dual_device_base__set_bank_rom_fine(runtime, p) {
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
    function method_bank_low_mask(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let mask = ((((((data) ? (3) : (0))) & 0xff)) & 0xff);
        0;
        method_set_bank_rom_low_coarse_mask(runtime, mask);
        method_set_bank_ram_mask(runtime, mask);
    }
    function method_set_bank_rom_low_coarse_mask(runtime, mask) {
        const members = runtime.members;
        mask = ((mask) & 0xffff);
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_rom_coarse_mask[0] = mask;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_low_coarse_mask(runtime, h_m_bank_rom[0]).set_entry?.(lo) ?? 0);
    }
    function __deref_set_bank_rom_low_coarse_mask(runtime, p) {
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
    function method_set_bank_ram_mask(runtime, mask) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        members.m_bank_ram_mask = ((mask) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            let entry = ((((method_bank_ram_entry(runtime)) & 0xff)) & 0xff);
            (__deref_set_bank_ram_mask(runtime, members.m_bank_ram).set_entry?.(entry) ?? 0);
        }
    }
    function __deref_set_bank_ram_mask(runtime, p) {
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
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "bank_rom_coarse": method_bank_rom_coarse,
        "bank_rom_fine": method_bank_rom_fine,
        "bank_rom_low_base": method_bank_rom_low_base,
        "bank_rom_high_base": method_bank_rom_high_base,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
        "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
        "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
        "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
        "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
        "set_bank_bits_ram": method_set_bank_bits_ram,
        "bank_ram": method_bank_ram,
        "bank_ram_base": method_bank_ram_base,
        "bank_ram_entry": method_bank_ram_entry,
        "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
        "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
        "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
        "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
        "bank_switch_coarse": method_bank_switch_coarse,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "set_bank_ram": method_set_bank_ram,
        "enable_ram": method_enable_ram,
        "set_ram_enable": method_set_ram_enable,
        "bank_switch_fine": method_bank_switch_fine,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "mbc_dual_device_base::set_bank_rom_fine": method_mbc_dual_device_base__set_bank_rom_fine,
        "bank_low_mask": method_bank_low_mask,
        "set_bank_rom_low_coarse_mask": method_set_bank_rom_low_coarse_mask,
        "set_bank_ram_mask": method_set_bank_ram_mask,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_mbc1"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_mbc1"].compiledStructMethods = {
    "leader_1_0": (() => {
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
        function method_swap(runtime) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["big_endianize_int32"];
            members.cart_type = (((__L0 ? __L0((members.cart_type ?? 0)) : runtime.macro("big_endianize_int32", (members.cart_type ?? 0)))) >>> 0);
            members.rom_bytes = (((__L0 ? __L0((members.rom_bytes ?? 0)) : runtime.macro("big_endianize_int32", (members.rom_bytes ?? 0)))) >>> 0);
            members.ram_bytes = (((__L0 ? __L0((members.ram_bytes ?? 0)) : runtime.macro("big_endianize_int32", (members.ram_bytes ?? 0)))) >>> 0);
        }
        function method_map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "swap": method_swap,
            "map_non_power_of_two": method_map_non_power_of_two,
            "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
            "install_non_power_of_two__5": method_install_non_power_of_two__5,
            "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
        };
        return __methodTable;
    })(),
    "trailer": (() => {
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
        function method_swap(runtime) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["big_endianize_int32"];
            members.size = (((__L0 ? __L0((members.size ?? 0)) : runtime.macro("big_endianize_int32", (members.size ?? 0)))) >>> 0);
            members.ver_maj = (((__L0 ? __L0((members.ver_maj ?? 0)) : runtime.macro("big_endianize_int32", (members.ver_maj ?? 0)))) >>> 0);
            members.ver_min = (((__L0 ? __L0((members.ver_min ?? 0)) : runtime.macro("big_endianize_int32", (members.ver_min ?? 0)))) >>> 0);
            members.magic = (((__L0 ? __L0((members.magic ?? 0)) : runtime.macro("big_endianize_int32", (members.magic ?? 0)))) >>> 0);
        }
        function method_map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "swap": method_swap,
            "map_non_power_of_two": method_map_non_power_of_two,
            "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
            "install_non_power_of_two__5": method_install_non_power_of_two__5,
            "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
        };
        return __methodTable;
    })(),
};
definition.slot.options["rom_mbc2"].compiledMethods = (() => {
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
    function method_ram_mbc_read(runtime, space, offset) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        if ((members.m_ram_mbc_enable ?? 0)) {
            return (((((((__t0 = (members.m_ram_mbc ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & (15))) | ((((__t1 = __deref_ram_mbc_read(runtime, space), typeof __t1.unmap === 'function' ? __t1.unmap() : typeof __t1.unmap === 'number' || typeof __t1.unmap === 'boolean' ? __t1.unmap : runtime.container(space, "unmap"))) & (240))))) & 0xff);
        }
        else {
            return (((__t2 = __deref_ram_mbc_read(runtime, space), typeof __t2.unmap === 'function' ? __t2.unmap() : typeof __t2.unmap === 'number' || typeof __t2.unmap === 'boolean' ? __t2.unmap : runtime.container(space, "unmap"))) & 0xff);
        }
    }
    function __deref_ram_mbc_read(runtime, p) {
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
    function method_ram_mbc_write(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        if ((members.m_ram_mbc_enable ?? 0)) {
            ((__t0 = members.m_ram_mbc) && ArrayBuffer.isView(__t0) ? (__t0[offset] = ((data) & (15))) : runtime.writeIndex(runtime.writableMember("m_ram_mbc"), offset, ((data) & (15))));
        }
    }
    function method_ram_mbc_enable(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_ram_mbc_enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
        0;
    }
    function method_bank_rom_switch(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["set_bank_rom"];
        data = ((data) & 0xff);
        data = ((((data) & (15))) & 0xff);
        (__L0 ? __L0(((data) ? (data) : (1))) : runtime.macro("set_bank_rom", ((data) ? (data) : (1))));
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "ram_mbc_read": method_ram_mbc_read,
        "ram_mbc_write": method_ram_mbc_write,
        "ram_mbc_enable": method_ram_mbc_enable,
        "bank_rom_switch": method_bank_rom_switch,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_mbc2"].compiledMethodLinks = ["set_bank_rom", "std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_mbc3"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_bank_rom_low_base(runtime, p) {
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
    function method_bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_bank_rom_high_base(runtime, p) {
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
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_low_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_high_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_bank_ram_base(runtime, p) {
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
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_mbc_ram_device_base__set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_mbc_ram_device_base__bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_mbc_ram_device_base__bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_mbc_ram_device_base__bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_mbc_ram_device_base__bank_ram_base(runtime, p) {
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
    function method_mbc_ram_device_base__bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
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
    function method_nvram_can_write(runtime) {
        const members = runtime.members;
        return (members.m_has_battery ?? 0);
    }
    function method_enable_ram_rtc(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        members.m_rtc_enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
        if ((((members.m_rtc_enable ?? 0)) ? 0 : 1)) {
            0;
            (__t0 = __deref_enable_ram_rtc(runtime, members.m_view_ram), typeof __t0.disable === 'function' ? __t0.disable() : typeof __t0.disable === 'number' || typeof __t0.disable === 'boolean' ? __t0.disable : runtime.container(members.m_view_ram, "disable"));
        }
        else {
            if (method_rtc_select(runtime)) {
                0;
                (__deref_enable_ram_rtc(runtime, members.m_view_ram).select?.(1) ?? 0);
            }
            else {
                0;
                (__deref_enable_ram_rtc(runtime, members.m_view_ram).select?.(0) ?? 0);
            }
        }
    }
    function __deref_enable_ram_rtc(runtime, p) {
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
    function method_rtc_select(runtime) {
        const members = runtime.members;
        return ((((members.m_rtc_select ?? 0)) >>> (3)) & 1);
    }
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        data = ((((data) & (127))) & 0xff);
        method_set_bank_rom_fine(runtime, ((data) ? (data) : (1)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_fine(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_fine(runtime, p) {
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
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_select_ram_rtc(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom_coarse(runtime, ((data) & (7)));
        method_set_bank_ram(runtime, ((data) & (7)));
        members.m_rtc_select = ((data) & 0xff);
        if ((members.m_rtc_enable ?? 0)) {
            if ((((data) >>> (3)) & 1)) {
                0;
                (__deref_select_ram_rtc(runtime, members.m_view_ram).select?.(1) ?? 0);
            }
            else {
                0;
                (__deref_select_ram_rtc(runtime, members.m_view_ram).select?.(0) ?? 0);
            }
        }
    }
    function __deref_select_ram_rtc(runtime, p) {
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
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[0]).set_entry?.(lo) ?? 0);
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_coarse(runtime, p) {
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
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xff);
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            (__deref_set_bank_ram(runtime, members.m_bank_ram).set_entry?.(entry) ?? 0);
        }
    }
    function __deref_set_bank_ram(runtime, p) {
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
    function method_latch_rtc(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::begin"], __L1 = __l["std::end"], __L2 = __l["std::copy"];
        data = ((data) & 0xff);
        const h_m_rtc_regs = members.m_rtc_regs ?? 0;
        0;
        if ((((((((((members.m_rtc_latch ?? 0)) >>> (0)) & 1)) ? 0 : 1)) && ((((data) >>> (0)) & 1))) ? 1 : 0)) {
            0;
            (__L2 ? __L2((__L0 ? __L0(h_m_rtc_regs[0]) : runtime.macro("std::begin", h_m_rtc_regs[0])), (__L1 ? __L1(h_m_rtc_regs[0]) : runtime.macro("std::end", h_m_rtc_regs[0])), (__L0 ? __L0(h_m_rtc_regs[1]) : runtime.macro("std::begin", h_m_rtc_regs[1]))) : runtime.macro("std::copy", (__L0 ? __L0(h_m_rtc_regs[0]) : runtime.macro("std::begin", h_m_rtc_regs[0])), (__L1 ? __L1(h_m_rtc_regs[0]) : runtime.macro("std::end", h_m_rtc_regs[0])), (__L0 ? __L0(h_m_rtc_regs[1]) : runtime.macro("std::begin", h_m_rtc_regs[1]))));
        }
        members.m_rtc_latch = ((data) & 0xff);
    }
    function method_read_rtc(runtime, space) {
        const members = runtime.members;
        let __t0;
        const h_m_rtc_regs = members.m_rtc_regs ?? 0;
        let reg = ((((method_rtc_register(runtime)) & 0xff)) & 0xff);
        if (((Number(((h_m_rtc_regs[1])?.length ?? 0)) > Number(reg)) ? 1 : 0)) {
            0;
            return ((runtime.readIndex(h_m_rtc_regs[1], reg)) & 0xff);
        }
        else {
            0;
            return (((__t0 = __deref_read_rtc(runtime, space), typeof __t0.unmap === 'function' ? __t0.unmap() : typeof __t0.unmap === 'number' || typeof __t0.unmap === 'boolean' ? __t0.unmap : runtime.container(space, "unmap"))) & 0xff);
        }
    }
    function __deref_read_rtc(runtime, p) {
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
    function method_rtc_register(runtime) {
        const members = runtime.members;
        return (((members.m_rtc_select ?? 0)) & (7));
    }
    function method_write_rtc(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_rtc_regs = members.m_rtc_regs ?? 0;
        let reg = ((((method_rtc_register(runtime)) & 0xff)) & 0xff);
        if (((Number(((h_m_rtc_regs[0])?.length ?? 0)) > Number(reg)) ? 1 : 0)) {
            0;
            if ((((4) === (reg)) ? 1 : 0)) {
                data = ((((data) & (193))) & 0xff);
                runtime.writeIndex(h_m_rtc_regs[0], reg, data);
            }
            else {
                runtime.writeIndex(h_m_rtc_regs[0], reg, data);
            }
        }
        else {
            0;
        }
    }
    function method_rtc_advance_seconds(runtime, param) {
        const members = runtime.members;
        const h_m_rtc_regs = members.m_rtc_regs ?? 0;
        if ((((runtime.readIndex(h_m_rtc_regs[0], 4)) >>> (6)) & 1)) {
            return;
        }
        if (runtime.invoke("rtc_increment", 0)) {
            return;
        }
        if (runtime.invoke("rtc_increment", 1)) {
            return;
        }
        if (runtime.invoke("rtc_increment", 2)) {
            return;
        }
        if ((runtime.writeIndex(h_m_rtc_regs[0], 3, ((runtime.readIndex(h_m_rtc_regs[0], 3)) + (1))))) {
            return;
        }
        if ((((runtime.readIndex(h_m_rtc_regs[0], 4)) >>> (0)) & 1)) {
            0;
            runtime.writeIndex(h_m_rtc_regs[0], 4, ((runtime.readIndex(h_m_rtc_regs[0], 4)) | (128)));
        }
        runtime.writeIndex(h_m_rtc_regs[0], 4, ((runtime.readIndex(h_m_rtc_regs[0], 4)) ^ (1)));
    }
    function method_mbc3_device_base__rtc_select(runtime) {
        const members = runtime.members;
        return ((((members.m_rtc_select ?? 0)) >>> (3)) & 1);
    }
    function method_mbc3_device_base__rtc_register(runtime) {
        const members = runtime.members;
        return (((members.m_rtc_select ?? 0)) & (7));
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "bank_rom_coarse": method_bank_rom_coarse,
        "bank_rom_fine": method_bank_rom_fine,
        "bank_rom_low_base": method_bank_rom_low_base,
        "bank_rom_high_base": method_bank_rom_high_base,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
        "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
        "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
        "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
        "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
        "set_bank_bits_ram": method_set_bank_bits_ram,
        "bank_ram": method_bank_ram,
        "bank_ram_base": method_bank_ram_base,
        "bank_ram_entry": method_bank_ram_entry,
        "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
        "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
        "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
        "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
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
        "nvram_can_write": method_nvram_can_write,
        "enable_ram_rtc": method_enable_ram_rtc,
        "rtc_select": method_rtc_select,
        "bank_switch_fine": method_bank_switch_fine,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "select_ram_rtc": method_select_ram_rtc,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "set_bank_ram": method_set_bank_ram,
        "latch_rtc": method_latch_rtc,
        "read_rtc": method_read_rtc,
        "rtc_register": method_rtc_register,
        "write_rtc": method_write_rtc,
        "rtc_advance_seconds": method_rtc_advance_seconds,
        "mbc3_device_base::rtc_select": method_mbc3_device_base__rtc_select,
        "mbc3_device_base::rtc_register": method_mbc3_device_base__rtc_register,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_mbc3"].compiledMethodLinks = ["std::begin", "std::bit_width", "std::copy", "std::end", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_mbc3"].compiledStructMethods = {
    "leader_1_0": (() => {
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
        function method_swap(runtime) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["big_endianize_int32"];
            members.cart_type = (((__L0 ? __L0((members.cart_type ?? 0)) : runtime.macro("big_endianize_int32", (members.cart_type ?? 0)))) >>> 0);
            members.rom_bytes = (((__L0 ? __L0((members.rom_bytes ?? 0)) : runtime.macro("big_endianize_int32", (members.rom_bytes ?? 0)))) >>> 0);
            members.ram_bytes = (((__L0 ? __L0((members.ram_bytes ?? 0)) : runtime.macro("big_endianize_int32", (members.ram_bytes ?? 0)))) >>> 0);
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
        function method_map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "swap": method_swap,
            "has_battery": method_has_battery,
            "rtc_battery_backed": method_rtc_battery_backed,
            "rtc_feature_y2k": method_rtc_feature_y2k,
            "rtc_feature_leap_year": method_rtc_feature_leap_year,
            "convert_to_bcd": method_convert_to_bcd,
            "bcd_to_integer": method_bcd_to_integer,
            "device_rtc_interface::has_battery": method_device_rtc_interface__has_battery,
            "device_rtc_interface::rtc_feature_y2k": method_device_rtc_interface__rtc_feature_y2k,
            "device_rtc_interface::rtc_feature_leap_year": method_device_rtc_interface__rtc_feature_leap_year,
            "device_rtc_interface::rtc_battery_backed": method_device_rtc_interface__rtc_battery_backed,
            "map_non_power_of_two": method_map_non_power_of_two,
            "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
            "install_non_power_of_two__5": method_install_non_power_of_two__5,
            "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
        };
        return __methodTable;
    })(),
    "trailer": (() => {
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
        function method_swap(runtime) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["big_endianize_int32"];
            members.size = (((__L0 ? __L0((members.size ?? 0)) : runtime.macro("big_endianize_int32", (members.size ?? 0)))) >>> 0);
            members.ver_maj = (((__L0 ? __L0((members.ver_maj ?? 0)) : runtime.macro("big_endianize_int32", (members.ver_maj ?? 0)))) >>> 0);
            members.ver_min = (((__L0 ? __L0((members.ver_min ?? 0)) : runtime.macro("big_endianize_int32", (members.ver_min ?? 0)))) >>> 0);
            members.magic = (((__L0 ? __L0((members.magic ?? 0)) : runtime.macro("big_endianize_int32", (members.magic ?? 0)))) >>> 0);
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
        function method_map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "swap": method_swap,
            "has_battery": method_has_battery,
            "rtc_battery_backed": method_rtc_battery_backed,
            "rtc_feature_y2k": method_rtc_feature_y2k,
            "rtc_feature_leap_year": method_rtc_feature_leap_year,
            "convert_to_bcd": method_convert_to_bcd,
            "bcd_to_integer": method_bcd_to_integer,
            "device_rtc_interface::has_battery": method_device_rtc_interface__has_battery,
            "device_rtc_interface::rtc_feature_y2k": method_device_rtc_interface__rtc_feature_y2k,
            "device_rtc_interface::rtc_feature_leap_year": method_device_rtc_interface__rtc_feature_leap_year,
            "device_rtc_interface::rtc_battery_backed": method_device_rtc_interface__rtc_battery_backed,
            "map_non_power_of_two": method_map_non_power_of_two,
            "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
            "install_non_power_of_two__5": method_install_non_power_of_two__5,
            "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
        };
        return __methodTable;
    })(),
};
definition.slot.options["rom_mbc5"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_bank_rom_low_base(runtime, p) {
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
    function method_bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_bank_rom_high_base(runtime, p) {
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
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_low_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_high_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_bank_ram_base(runtime, p) {
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
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_mbc_ram_device_base__set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_mbc_ram_device_base__bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_mbc_ram_device_base__bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_mbc_ram_device_base__bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_mbc_ram_device_base__bank_ram_base(runtime, p) {
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
    function method_mbc_ram_device_base__bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_rom_mbc_device_base__bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank_lines = members.m_bank_lines ?? 0;
        method_set_bank_rom_coarse(runtime, ((data) & (h_m_bank_lines[1])));
        method_set_bank_ram(runtime, ((data) & (h_m_bank_lines[1])));
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[0]).set_entry?.(lo) ?? 0);
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_coarse(runtime, p) {
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
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xff);
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            (__deref_set_bank_ram(runtime, members.m_bank_ram).set_entry?.(entry) ?? 0);
        }
    }
    function __deref_set_bank_ram(runtime, p) {
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
    function method_enable_ram(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_ram_enable(runtime, (((10) === (data)) ? 1 : 0));
    }
    function method_set_ram_enable(runtime, enable) {
        const members = runtime.members;
        let __t0;
        0;
        if (enable) {
            (__deref_set_ram_enable(runtime, members.m_view_ram).select?.(0) ?? 0);
        }
        else {
            (__t0 = __deref_set_ram_enable(runtime, members.m_view_ram), typeof __t0.disable === 'function' ? __t0.disable() : typeof __t0.disable === 'number' || typeof __t0.disable === 'boolean' ? __t0.disable : runtime.container(members.m_view_ram, "disable"));
        }
    }
    function __deref_set_ram_enable(runtime, p) {
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
    function method_bank_switch_fine_low(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom_fine(runtime, ((((method_bank_rom_fine(runtime)) & (256))) | (((data) & 0xffff))));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_lines = members.m_bank_lines ?? 0;
        method_mbc_dual_device_base__set_bank_rom_fine(runtime, ((entry) & (h_m_bank_lines[0])));
    }
    function method_mbc_dual_device_base__set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_mbc_dual_device_base__set_bank_rom_fine(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_mbc_dual_device_base__set_bank_rom_fine(runtime, p) {
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
    function method_bank_switch_fine_high(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom_fine(runtime, ((((method_bank_rom_fine(runtime)) & (255))) | (((((((data) & (1))) & 0xffff)) << (8)))));
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "bank_rom_coarse": method_bank_rom_coarse,
        "bank_rom_fine": method_bank_rom_fine,
        "bank_rom_low_base": method_bank_rom_low_base,
        "bank_rom_high_base": method_bank_rom_high_base,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
        "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
        "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
        "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
        "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
        "set_bank_bits_ram": method_set_bank_bits_ram,
        "bank_ram": method_bank_ram,
        "bank_ram_base": method_bank_ram_base,
        "bank_ram_entry": method_bank_ram_entry,
        "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
        "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
        "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
        "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
        "rom_mbc_device_base::bank_switch_coarse": method_rom_mbc_device_base__bank_switch_coarse,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "set_bank_ram": method_set_bank_ram,
        "enable_ram": method_enable_ram,
        "set_ram_enable": method_set_ram_enable,
        "bank_switch_fine_low": method_bank_switch_fine_low,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "mbc_dual_device_base::set_bank_rom_fine": method_mbc_dual_device_base__set_bank_rom_fine,
        "bank_switch_fine_high": method_bank_switch_fine_high,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_mbc5"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_mbc5"].compiledStructMethods = {
    "leader_1_0": (() => {
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
        function method_swap(runtime) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["big_endianize_int32"];
            members.cart_type = (((__L0 ? __L0((members.cart_type ?? 0)) : runtime.macro("big_endianize_int32", (members.cart_type ?? 0)))) >>> 0);
            members.rom_bytes = (((__L0 ? __L0((members.rom_bytes ?? 0)) : runtime.macro("big_endianize_int32", (members.rom_bytes ?? 0)))) >>> 0);
            members.ram_bytes = (((__L0 ? __L0((members.ram_bytes ?? 0)) : runtime.macro("big_endianize_int32", (members.ram_bytes ?? 0)))) >>> 0);
        }
        function method_map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "swap": method_swap,
            "map_non_power_of_two": method_map_non_power_of_two,
            "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
            "install_non_power_of_two__5": method_install_non_power_of_two__5,
            "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
        };
        return __methodTable;
    })(),
    "trailer": (() => {
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
        function method_swap(runtime) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["big_endianize_int32"];
            members.size = (((__L0 ? __L0((members.size ?? 0)) : runtime.macro("big_endianize_int32", (members.size ?? 0)))) >>> 0);
            members.ver_maj = (((__L0 ? __L0((members.ver_maj ?? 0)) : runtime.macro("big_endianize_int32", (members.ver_maj ?? 0)))) >>> 0);
            members.ver_min = (((__L0 ? __L0((members.ver_min ?? 0)) : runtime.macro("big_endianize_int32", (members.ver_min ?? 0)))) >>> 0);
            members.magic = (((__L0 ? __L0((members.magic ?? 0)) : runtime.macro("big_endianize_int32", (members.magic ?? 0)))) >>> 0);
        }
        function method_map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "swap": method_swap,
            "map_non_power_of_two": method_map_non_power_of_two,
            "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
            "install_non_power_of_two__5": method_install_non_power_of_two__5,
            "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
        };
        return __methodTable;
    })(),
};
definition.slot.options["rom_m161"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_banked_32k_device_base__set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_bank_rom_switch(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((members.m_bank_lock ?? 0)) ? 0 : 1)) {
            members.m_bank_lock = ((1) & 0xff);
            method_set_bank_rom(runtime, ((data) & (7)));
        }
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom(runtime, members.m_bank_rom).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom(runtime, p) {
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
    function method_m161_device__bank_rom_switch(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((members.m_bank_lock ?? 0)) ? 0 : 1)) {
            members.m_bank_lock = ((1) & 0xff);
            method_set_bank_rom(runtime, ((data) & (7)));
        }
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "set_bank_bits_rom": method_set_bank_bits_rom,
        "banked_32k_device_base::set_bank_bits_rom": method_banked_32k_device_base__set_bank_bits_rom,
        "bank_rom_switch": method_bank_rom_switch,
        "set_bank_rom": method_set_bank_rom,
        "m161_device::bank_rom_switch": method_m161_device__bank_rom_switch,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_m161"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_mmm01"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_bank_rom_low_base(runtime, p) {
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
    function method_bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_bank_rom_high_base(runtime, p) {
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
    function method_mbc_dual_uniform_device_base__set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_mbc_dual_uniform_device_base__bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_uniform_device_base__bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_mbc_dual_uniform_device_base__bank_rom_low_base(runtime, p) {
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
    function method_mbc_dual_uniform_device_base__bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_uniform_device_base__bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_mbc_dual_uniform_device_base__bank_rom_high_base(runtime, p) {
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
    function method_set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_bank_ram_base(runtime, p) {
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
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_mbc_ram_device_base__set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_mbc_ram_device_base__bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_mbc_ram_device_base__bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_mbc_ram_device_base__bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_mbc_ram_device_base__bank_ram_base(runtime, p) {
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
    function method_mbc_ram_device_base__bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_enable_ram(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        if (((Number(10) === Number(((data) & (15)))) ? 1 : 0)) {
            0;
            (__deref_enable_ram(runtime, members.m_view_ram).select?.(0) ?? 0);
        }
        else {
            0;
            (__t0 = __deref_enable_ram(runtime, members.m_view_ram), typeof __t0.disable === 'function' ? __t0.disable() : typeof __t0.disable === 'number' || typeof __t0.disable === 'boolean' ? __t0.disable : runtime.container(members.m_view_ram, "disable"));
        }
        if ((members.m_config ?? 0)) {
            h_m_bank_prot_sel[0] = (((data) >>> (4)) & ((1 << (2)) - 1));
            0;
            if ((((data) >>> (6)) & 1)) {
                0;
                members.m_config = ((0) & 0xff);
                method_update_bank_rom_low(runtime);
                method_update_bank_rom_high(runtime);
            }
        }
    }
    function __deref_enable_ram(runtime, p) {
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
    function method_update_bank_rom_low(runtime) {
        const members = runtime.members;
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        let entry = ((0) & 0xffff);
        if ((((members.m_config ?? 0)) ? 0 : 1)) {
            entry = (((((((((members.m_bank_sel_rom_coarse ?? 0)) & 0xffff)) << (7))) | ((((members.m_bank_sel_rom_fine ?? 0)) & (h_m_bank_prot_sel[1]))))) & 0xffff);
            if ((((members.m_mode_large_prg ?? 0)) ? 0 : 1)) {
                entry = ((((entry) | (((h_m_bank_sel_mid[1]) << (5))))) & 0xffff);
            }
            else {
                if ((members.m_bank_low_mid ?? 0)) {
                    entry = ((((entry) | (((h_m_bank_sel_mid[0]) << (5))))) & 0xffff);
                }
            }
        }
        else {
            entry = ((510) & 0xffff);
        }
        method_set_bank_rom_low(runtime, entry);
    }
    function method_set_bank_rom_low(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom_low(runtime, h_m_bank_rom[0]).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom_low(runtime, p) {
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
    function method_update_bank_rom_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        let entry = ((0) & 0xffff);
        if ((((members.m_config ?? 0)) ? 0 : 1)) {
            entry = (((((((((members.m_bank_sel_rom_coarse ?? 0)) & 0xffff)) << (7))) | ((members.m_bank_sel_rom_fine ?? 0)))) & 0xffff);
            if ((((members.m_mode_large_prg ?? 0)) ? 0 : 1)) {
                entry = ((((entry) | (((h_m_bank_sel_mid[1]) << (5))))) & 0xffff);
            }
            else {
                entry = ((((entry) | (((h_m_bank_sel_mid[0]) << (5))))) & 0xffff);
            }
        }
        else {
            entry = ((((510) | ((members.m_bank_sel_rom_fine ?? 0)))) & 0xffff);
        }
        if ((((((members.m_bank_sel_rom_fine ?? 0)) & ((~h_m_bank_prot_sel[1])))) ? 0 : 1)) {
            entry = ((((entry) | (1))) & 0xffff);
        }
        method_set_bank_rom_high(runtime, entry);
    }
    function method_set_bank_rom_high(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom_high(runtime, h_m_bank_rom[1]).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom_high(runtime, p) {
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
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        members.m_bank_sel_rom_fine = (((((((members.m_bank_sel_rom_fine ?? 0)) & (h_m_bank_prot_sel[1]))) | ((((((data) >>> (0)) & ((1 << (5)) - 1))) & ((~h_m_bank_prot_sel[1])))))) & 0xff);
        0;
        if ((members.m_config ?? 0)) {
            h_m_bank_sel_mid[1] = (((data) >>> (5)) & ((1 << (2)) - 1));
            0;
        }
        method_update_bank_rom_high(runtime);
        if (((((members.m_config ?? 0)) && ((members.m_mode_large_prg ?? 0))) ? 1 : 0)) {
            method_update_bank_ram(runtime);
        }
    }
    function method_update_bank_ram(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        let entry = (((((((members.m_bank_sel_ram_coarse ?? 0)) << (2))) & 0xff)) & 0xff);
        if ((members.m_mode_large_prg ?? 0)) {
            entry = ((((entry) | (h_m_bank_sel_mid[1]))) & 0xff);
        }
        else {
            if ((members.m_bank_low_mid ?? 0)) {
                entry = ((((entry) | (h_m_bank_sel_mid[0]))) & 0xff);
            }
        }
        method_set_bank_ram(runtime, entry);
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xff);
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            (__deref_set_bank_ram(runtime, members.m_bank_ram).set_entry?.(entry) ?? 0);
        }
    }
    function __deref_set_bank_ram(runtime, p) {
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
    function method_bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        h_m_bank_sel_mid[0] = ((((h_m_bank_sel_mid[0]) & (h_m_bank_prot_sel[0]))) | ((((((data) >>> (0)) & ((1 << (2)) - 1))) & ((~h_m_bank_prot_sel[0])))));
        0;
        if ((members.m_config ?? 0)) {
            members.m_bank_sel_ram_coarse = (((((data) >>> (2)) & ((1 << (2)) - 1))) & 0xff);
            members.m_bank_sel_rom_coarse = (((((data) >>> (4)) & ((1 << (2)) - 1))) & 0xff);
            members.m_bank_prot_low_mid = (((((data) >>> (6)) & 1)) & 0xff);
            0;
        }
        if (((((members.m_config ?? 0)) || (((((((members.m_mode_large_prg ?? 0)) ? 0 : 1)) && ((members.m_bank_low_mid ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            method_update_bank_ram(runtime);
        }
    }
    function method_enable_bank_low_mid(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        if ((((members.m_bank_prot_low_mid ?? 0)) ? 0 : 1)) {
            members.m_bank_low_mid = (((((data) >>> (0)) & 1)) & 0xff);
            0;
        }
        if ((members.m_config ?? 0)) {
            h_m_bank_prot_sel[1] = (((((data) >>> (2)) & ((1 << (4)) - 1))) << (1));
            members.m_mode_large_prg = (((((data) >>> (6)) & 1)) & 0xff);
            0;
        }
        if (((((((members.m_bank_prot_low_mid ?? 0)) ? 0 : 1)) && ((((members.m_config ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            method_update_bank_rom_low(runtime);
        }
        if ((members.m_config ?? 0)) {
            method_update_bank_rom_high(runtime);
        }
        if (((((((members.m_bank_prot_low_mid ?? 0)) ? 0 : 1)) || ((members.m_config ?? 0))) ? 1 : 0)) {
            method_update_bank_ram(runtime);
        }
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "set_bank_bits_rom": method_set_bank_bits_rom,
        "bank_rom_low_base": method_bank_rom_low_base,
        "bank_rom_high_base": method_bank_rom_high_base,
        "mbc_dual_uniform_device_base::set_bank_bits_rom": method_mbc_dual_uniform_device_base__set_bank_bits_rom,
        "mbc_dual_uniform_device_base::bank_rom_low_base": method_mbc_dual_uniform_device_base__bank_rom_low_base,
        "mbc_dual_uniform_device_base::bank_rom_high_base": method_mbc_dual_uniform_device_base__bank_rom_high_base,
        "set_bank_bits_ram": method_set_bank_bits_ram,
        "bank_ram": method_bank_ram,
        "bank_ram_base": method_bank_ram_base,
        "bank_ram_entry": method_bank_ram_entry,
        "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
        "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
        "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
        "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
        "enable_ram": method_enable_ram,
        "update_bank_rom_low": method_update_bank_rom_low,
        "set_bank_rom_low": method_set_bank_rom_low,
        "update_bank_rom_high": method_update_bank_rom_high,
        "set_bank_rom_high": method_set_bank_rom_high,
        "bank_switch_fine": method_bank_switch_fine,
        "update_bank_ram": method_update_bank_ram,
        "set_bank_ram": method_set_bank_ram,
        "bank_switch_coarse": method_bank_switch_coarse,
        "enable_bank_low_mid": method_enable_bank_low_mid,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_mmm01"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_camera"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::begin"], __L1 = __l["std::end"], __L2 = __l["std::fill"], __L3 = __l["NAME"], __L4 = __l["save_item"];
        const h_m_threshold = members.m_threshold ?? 0;
        const h_m_n = members.m_n ?? 0;
        const h_m_vh = members.m_vh ?? 0;
        const h_m_e = members.m_e ?? 0;
        const h_m_z = members.m_z ?? 0;
        const h_m_i = members.m_i ?? 0;
        const h_m_c = members.m_c ?? 0;
        const h_m_o = members.m_o ?? 0;
        const h_m_v = members.m_v ?? 0;
        const h_m_g = members.m_g ?? 0;
        method_mbc_ram_device_base__device_start(runtime);
        for (let __range0 = h_m_threshold, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            for (let __range1 = __range0_item, __range1_index = 0; ((Number(__range1_index) < Number(__range1.length)) ? 1 : 0); __range1_index = ((__range1_index) + (1))) {
                const __range1_item = runtime.readIndex(__range1, __range1_index);
                (__L2 ? __L2((__L0 ? __L0(__range1_item) : runtime.macro("std::begin", __range1_item)), (__L1 ? __L1(__range1_item) : runtime.macro("std::end", __range1_item)), 0) : runtime.macro("std::fill", (__L0 ? __L0(__range1_item) : runtime.macro("std::begin", __range1_item)), (__L1 ? __L1(__range1_item) : runtime.macro("std::end", __range1_item)), 0));
            }
        }
        h_m_n[0] = 0;
        h_m_vh[0] = 0;
        h_m_e[0] = 0;
        h_m_z[0] = 0;
        h_m_i[0] = 0;
        h_m_c[0] = 0;
        h_m_o[0] = 0;
        h_m_v[0] = 0;
        h_m_g[0] = 0;
        members.m_p = ((0) & 0xff);
        members.m_m = ((0) & 0xff);
        (__L4 ? __L4((__L3 ? __L3((members.m_busy ?? 0)) : runtime.macro("NAME", (members.m_busy ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_busy ?? 0)) : runtime.macro("NAME", (members.m_busy ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_ram_writable ?? 0)) : runtime.macro("NAME", (members.m_ram_writable ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_ram_writable ?? 0)) : runtime.macro("NAME", (members.m_ram_writable ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3(h_m_threshold) : runtime.macro("NAME", h_m_threshold))) : runtime.macro("save_item", (__L3 ? __L3(h_m_threshold) : runtime.macro("NAME", h_m_threshold))));
        (__L4 ? __L4((__L3 ? __L3((members.m_sel_pm ?? 0)) : runtime.macro("NAME", (members.m_sel_pm ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_sel_pm ?? 0)) : runtime.macro("NAME", (members.m_sel_pm ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3(h_m_n) : runtime.macro("NAME", h_m_n))) : runtime.macro("save_item", (__L3 ? __L3(h_m_n) : runtime.macro("NAME", h_m_n))));
        (__L4 ? __L4((__L3 ? __L3(h_m_vh) : runtime.macro("NAME", h_m_vh))) : runtime.macro("save_item", (__L3 ? __L3(h_m_vh) : runtime.macro("NAME", h_m_vh))));
        (__L4 ? __L4((__L3 ? __L3(h_m_e) : runtime.macro("NAME", h_m_e))) : runtime.macro("save_item", (__L3 ? __L3(h_m_e) : runtime.macro("NAME", h_m_e))));
        (__L4 ? __L4((__L3 ? __L3(h_m_z) : runtime.macro("NAME", h_m_z))) : runtime.macro("save_item", (__L3 ? __L3(h_m_z) : runtime.macro("NAME", h_m_z))));
        (__L4 ? __L4((__L3 ? __L3(h_m_i) : runtime.macro("NAME", h_m_i))) : runtime.macro("save_item", (__L3 ? __L3(h_m_i) : runtime.macro("NAME", h_m_i))));
        (__L4 ? __L4((__L3 ? __L3(h_m_c) : runtime.macro("NAME", h_m_c))) : runtime.macro("save_item", (__L3 ? __L3(h_m_c) : runtime.macro("NAME", h_m_c))));
        (__L4 ? __L4((__L3 ? __L3(h_m_o) : runtime.macro("NAME", h_m_o))) : runtime.macro("save_item", (__L3 ? __L3(h_m_o) : runtime.macro("NAME", h_m_o))));
        (__L4 ? __L4((__L3 ? __L3(h_m_v) : runtime.macro("NAME", h_m_v))) : runtime.macro("save_item", (__L3 ? __L3(h_m_v) : runtime.macro("NAME", h_m_v))));
        (__L4 ? __L4((__L3 ? __L3(h_m_g) : runtime.macro("NAME", h_m_g))) : runtime.macro("save_item", (__L3 ? __L3(h_m_g) : runtime.macro("NAME", h_m_g))));
        (__L4 ? __L4((__L3 ? __L3((members.m_p ?? 0)) : runtime.macro("NAME", (members.m_p ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_p ?? 0)) : runtime.macro("NAME", (members.m_p ?? 0)))));
        (__L4 ? __L4((__L3 ? __L3((members.m_m ?? 0)) : runtime.macro("NAME", (members.m_m ?? 0)))) : runtime.macro("save_item", (__L3 ? __L3((members.m_m ?? 0)) : runtime.macro("NAME", (members.m_m ?? 0)))));
    }
    function method_mbc_ram_device_base__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"];
        method_mbc_device_base__device_start(runtime);
        (__deref_mbc_ram_device_base__device_start(runtime, (members.this ?? 0)).save_item?.((__L0 ? __L0((members.m_bank_sel_ram ?? 0)) : runtime.macro("NAME", (members.m_bank_sel_ram ?? 0)))) ?? 0);
        (__deref_mbc_ram_device_base__device_start(runtime, (members.this ?? 0)).save_item?.((__L0 ? __L0((members.m_bank_mask_ram ?? 0)) : runtime.macro("NAME", (members.m_bank_mask_ram ?? 0)))) ?? 0);
    }
    function __deref_mbc_ram_device_base__device_start(runtime, p) {
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
    function method_mbc_device_base__device_start(runtime) {
        const members = runtime.members;
    }
    function method_mbc_device_base__set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_bank_ram_base(runtime, p) {
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
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_mbc_ram_device_base__set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_mbc_ram_device_base__bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_mbc_ram_device_base__bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_mbc_ram_device_base__bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_mbc_ram_device_base__bank_ram_base(runtime, p) {
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
    function method_mbc_ram_device_base__bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_enable_ram(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_ram_writable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
        0;
    }
    function method_bank_switch_rom(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom(runtime, ((data) & (63)));
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom(runtime, members.m_bank_rom).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom(runtime, p) {
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
    function method_bank_switch_ram(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        method_set_bank_ram(runtime, ((data) & (15)));
        0;
        if ((((data) >>> (4)) & 1)) {
            (__deref_bank_switch_ram(runtime, members.m_view_cam).select?.(0) ?? 0);
        }
        else {
            (__t0 = __deref_bank_switch_ram(runtime, members.m_view_cam), typeof __t0.disable === 'function' ? __t0.disable() : typeof __t0.disable === 'number' || typeof __t0.disable === 'boolean' ? __t0.disable : runtime.container(members.m_view_cam, "disable"));
        }
    }
    function __deref_bank_switch_ram(runtime, p) {
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
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xff);
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            (__deref_set_bank_ram(runtime, members.m_bank_ram).set_entry?.(entry) ?? 0);
        }
    }
    function __deref_set_bank_ram(runtime, p) {
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
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return (((((((members.m_busy ?? 0)) ? 0 : 1)) ? (runtime.readIndex(method_bank_ram_base(runtime), offset)) : (0))) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((((((members.m_busy ?? 0)) ? 0 : 1)) && ((members.m_ram_writable ?? 0))) ? 1 : 0)) {
            runtime.writeIndex(method_bank_ram_base(runtime), offset, data);
        }
    }
    function method_read_camera(runtime, offset) {
        const members = runtime.members;
        switch (offset) {
            case 0:
                {
                    return (((((((members.m_sel_pm ?? 0)) << (1))) | ((members.m_busy ?? 0)))) & 0xff);
                }
            default:
                {
                    return ((0) & 0xff);
                }
        }
    }
    function method_write_camera(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["start_capture"];
        data = ((data) & 0xff);
        const h_m_n = members.m_n ?? 0;
        const h_m_vh = members.m_vh ?? 0;
        const h_m_g = members.m_g ?? 0;
        const h_m_c = members.m_c ?? 0;
        const h_m_e = members.m_e ?? 0;
        const h_m_i = members.m_i ?? 0;
        const h_m_v = members.m_v ?? 0;
        const h_m_z = members.m_z ?? 0;
        const h_m_o = members.m_o ?? 0;
        switch (offset) {
            case 0:
                {
                    members.m_sel_pm = (((((data) >>> (1)) & ((1 << (2)) - 1))) & 0xff);
                    0;
                    if ((((data) >>> (0)) & 1)) {
                        if ((((members.m_busy ?? 0)) ? 0 : 1)) {
                            (__L0 ? __L0() : runtime.macro("start_capture"));
                        }
                        else {
                            0;
                        }
                    }
                    break;
                }
            case 1:
                {
                    h_m_n[0] = (((data) >>> (7)) & 1);
                    h_m_vh[0] = (((data) >>> (5)) & ((1 << (2)) - 1));
                    h_m_g[0] = (((data) >>> (0)) & ((1 << (5)) - 1));
                    0;
                    break;
                }
            case 2:
                {
                    h_m_c[0] = ((((h_m_c[0]) & (255))) | (((((data) & 0xffff)) << (8))));
                    0;
                    break;
                }
            case 3:
                {
                    h_m_c[0] = ((((h_m_c[0]) & (65280))) | (data));
                    0;
                    break;
                }
            case 4:
                {
                    h_m_e[0] = (((data) >>> (4)) & ((1 << (4)) - 1));
                    h_m_i[0] = (((data) >>> (3)) & 1);
                    h_m_v[0] = (((data) >>> (0)) & ((1 << (3)) - 1));
                    0;
                    break;
                }
            case 5:
                {
                    h_m_z[0] = (((data) >>> (6)) & ((1 << (2)) - 1));
                    h_m_o[0] = (((data) >>> (0)) & ((1 << (6)) - 1));
                    0;
                    break;
                }
        }
    }
    function method_output_ref_volts(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        return (((((value) >>> (0)) & ((1 << (5)) - 1))) / ((((((value) >>> (5)) & 1)) ? (31) : (-31))));
    }
    function method_output_node_bias_volts(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        return ((0.5) * (value));
    }
    function method_output_gain_db(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        return ((__add_output_gain_db(runtime, __add_output_gain_db(runtime, 28, (((((value) >>> (0)) & ((1 << (4)) - 1))) * (3))), (((((((value) >>> (4)) & 1)) * (6))) * (2)))) * (0.5));
    }
    function __add_output_gain_db(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_camera_device__output_ref_volts(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        return (((((value) >>> (0)) & ((1 << (5)) - 1))) / ((((((value) >>> (5)) & 1)) ? (31) : (-31))));
    }
    function method_camera_device__output_node_bias_volts(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        return ((0.5) * (value));
    }
    function method_camera_device__output_gain_db(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        return ((__add_camera_device__output_gain_db(runtime, __add_camera_device__output_gain_db(runtime, 28, (((((value) >>> (0)) & ((1 << (4)) - 1))) * (3))), (((((((value) >>> (4)) & 1)) * (6))) * (2)))) * (0.5));
    }
    function __add_camera_device__output_gain_db(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "set_bank_bits_rom": method_set_bank_bits_rom,
        "device_start": method_device_start,
        "mbc_ram_device_base::device_start": method_mbc_ram_device_base__device_start,
        "mbc_device_base::device_start": method_mbc_device_base__device_start,
        "mbc_device_base::set_bank_bits_rom": method_mbc_device_base__set_bank_bits_rom,
        "set_bank_bits_ram": method_set_bank_bits_ram,
        "bank_ram": method_bank_ram,
        "bank_ram_base": method_bank_ram_base,
        "bank_ram_entry": method_bank_ram_entry,
        "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
        "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
        "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
        "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
        "enable_ram": method_enable_ram,
        "bank_switch_rom": method_bank_switch_rom,
        "set_bank_rom": method_set_bank_rom,
        "bank_switch_ram": method_bank_switch_ram,
        "set_bank_ram": method_set_bank_ram,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read_camera": method_read_camera,
        "write_camera": method_write_camera,
        "output_ref_volts": method_output_ref_volts,
        "output_node_bias_volts": method_output_node_bias_volts,
        "output_gain_db": method_output_gain_db,
        "camera_device::output_ref_volts": method_camera_device__output_ref_volts,
        "camera_device::output_node_bias_volts": method_camera_device__output_node_bias_volts,
        "camera_device::output_gain_db": method_camera_device__output_gain_db,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_camera"].compiledMethodLinks = ["NAME", "save_item", "start_capture", "std::begin", "std::bit_width", "std::end", "std::fill", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_camera"].children[0].definition.compiledMethods = (() => {
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
    function method_is_reset_on_load(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_file_extensions(runtime) {
        const members = runtime.members;
        return "png,jpg,jpeg,jfif,bmp,dib";
    }
    function method_image_type_name(runtime) {
        const members = runtime.members;
        return "picture";
    }
    function method_image_brief_type_name(runtime) {
        const members = runtime.members;
        return "pic";
    }
    function method_get_bitmap(runtime) {
        const members = runtime.members;
        const h_m_picture = members.m_picture ?? 0;
        return h_m_picture;
    }
    function method_picture_image_device__is_readable(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_picture_image_device__is_writeable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_picture_image_device__is_creatable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_picture_image_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_picture_image_device__file_extensions(runtime) {
        const members = runtime.members;
        return "png,jpg,jpeg,jfif,bmp,dib";
    }
    function method_picture_image_device__image_type_name(runtime) {
        const members = runtime.members;
        return "picture";
    }
    function method_picture_image_device__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "pic";
    }
    function method_picture_image_device__get_bitmap(runtime) {
        const members = runtime.members;
        const h_m_picture = members.m_picture ?? 0;
        return h_m_picture;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "is_readable": method_is_readable,
        "is_writeable": method_is_writeable,
        "is_creatable": method_is_creatable,
        "is_reset_on_load": method_is_reset_on_load,
        "file_extensions": method_file_extensions,
        "image_type_name": method_image_type_name,
        "image_brief_type_name": method_image_brief_type_name,
        "get_bitmap": method_get_bitmap,
        "picture_image_device::is_readable": method_picture_image_device__is_readable,
        "picture_image_device::is_writeable": method_picture_image_device__is_writeable,
        "picture_image_device::is_creatable": method_picture_image_device__is_creatable,
        "picture_image_device::is_reset_on_load": method_picture_image_device__is_reset_on_load,
        "picture_image_device::file_extensions": method_picture_image_device__file_extensions,
        "picture_image_device::image_type_name": method_picture_image_device__image_type_name,
        "picture_image_device::image_brief_type_name": method_picture_image_device__image_brief_type_name,
        "picture_image_device::get_bitmap": method_picture_image_device__get_bitmap
    };
    return __methodTable;
})();
definition.slot.options["rom_huc1"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_bank_rom_low_base(runtime, p) {
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
    function method_bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_bank_rom_high_base(runtime, p) {
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
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_low_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_high_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_bank_ram_base(runtime, p) {
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
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_mbc_ram_device_base__set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_mbc_ram_device_base__bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_mbc_ram_device_base__bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_mbc_ram_device_base__bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_mbc_ram_device_base__bank_ram_base(runtime, p) {
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
    function method_mbc_ram_device_base__bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_infrared_select(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        if (((Number(14) === Number(((data) & (14)))) ? 1 : 0)) {
            0;
            (__deref_infrared_select(runtime, members.m_view_ir).select?.(0) ?? 0);
        }
        else {
            0;
            (__t0 = __deref_infrared_select(runtime, members.m_view_ir), typeof __t0.disable === 'function' ? __t0.disable() : typeof __t0.disable === 'number' || typeof __t0.disable === 'boolean' ? __t0.disable : runtime.container(members.m_view_ir, "disable"));
        }
    }
    function __deref_infrared_select(runtime, p) {
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
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom_fine(runtime, ((data) & (63)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_fine(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_fine(runtime, p) {
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
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom_coarse(runtime, ((data) & (3)));
        method_set_bank_ram(runtime, ((data) & (3)));
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[0]).set_entry?.(lo) ?? 0);
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_coarse(runtime, p) {
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
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xff);
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            (__deref_set_bank_ram(runtime, members.m_bank_ram).set_entry?.(entry) ?? 0);
        }
    }
    function __deref_set_bank_ram(runtime, p) {
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
    function method_read_ir(runtime, space) {
        const members = runtime.members;
        let __t0;
        0;
        return (((((((__t0 = __deref_read_ir(runtime, space), typeof __t0.unmap === 'function' ? __t0.unmap() : typeof __t0.unmap === 'number' || typeof __t0.unmap === 'boolean' ? __t0.unmap : runtime.container(space, "unmap"))) & (192))) | (0))) & 0xff);
    }
    function __deref_read_ir(runtime, p) {
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
    function method_write_ir(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        0;
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "bank_rom_coarse": method_bank_rom_coarse,
        "bank_rom_fine": method_bank_rom_fine,
        "bank_rom_low_base": method_bank_rom_low_base,
        "bank_rom_high_base": method_bank_rom_high_base,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
        "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
        "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
        "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
        "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
        "set_bank_bits_ram": method_set_bank_bits_ram,
        "bank_ram": method_bank_ram,
        "bank_ram_base": method_bank_ram_base,
        "bank_ram_entry": method_bank_ram_entry,
        "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
        "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
        "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
        "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
        "infrared_select": method_infrared_select,
        "bank_switch_fine": method_bank_switch_fine,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "bank_switch_coarse": method_bank_switch_coarse,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "set_bank_ram": method_set_bank_ram,
        "read_ir": method_read_ir,
        "write_ir": method_write_ir,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_huc1"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_huc3"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_bank_rom_low_base(runtime, p) {
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
    function method_bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_bank_rom_high_base(runtime, p) {
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
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_coarse(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[0]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_mbc_dual_device_base__bank_rom_low_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_low_base(runtime, h_m_bank_rom[0]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[0], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_low_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_high_base(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return runtime.byteView((__t0 = __deref_mbc_dual_device_base__bank_rom_high_base(runtime, h_m_bank_rom[1]), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(h_m_bank_rom[1], "base")));
    }
    function __deref_mbc_dual_device_base__bank_rom_high_base(runtime, p) {
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
    function method_mbc_dual_device_base__bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_bank_ram_base(runtime, p) {
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
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_mbc_ram_device_base__set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_mbc_ram_device_base__bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_mbc_ram_device_base__bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_mbc_ram_device_base__bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_mbc_ram_device_base__bank_ram_base(runtime, p) {
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
    function method_mbc_ram_device_base__bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
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
    function method_nvram_can_write(runtime) {
        const members = runtime.members;
        return (members.m_has_battery ?? 0);
    }
    function method_io_select(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        switch (((data) & (15))) {
            case 0:
                {
                    0;
                    (__deref_io_select(runtime, members.m_view_io).select?.(0) ?? 0);
                    break;
                }
            case 10:
                {
                    0;
                    (__deref_io_select(runtime, members.m_view_io).select?.(1) ?? 0);
                    break;
                }
            case 11:
                {
                    0;
                    (__deref_io_select(runtime, members.m_view_io).select?.(2) ?? 0);
                    break;
                }
            case 12:
                {
                    0;
                    (__deref_io_select(runtime, members.m_view_io).select?.(3) ?? 0);
                    break;
                }
            case 13:
                {
                    0;
                    (__deref_io_select(runtime, members.m_view_io).select?.(4) ?? 0);
                    break;
                }
            case 14:
                {
                    0;
                    (__deref_io_select(runtime, members.m_view_io).select?.(5) ?? 0);
                    break;
                }
            default:
                {
                    0;
                    (__t0 = __deref_io_select(runtime, members.m_view_io), typeof __t0.disable === 'function' ? __t0.disable() : typeof __t0.disable === 'number' || typeof __t0.disable === 'boolean' ? __t0.disable : runtime.container(members.m_view_io, "disable"));
                }
        }
    }
    function __deref_io_select(runtime, p) {
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
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom_fine(runtime, ((data) & (127)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_fine(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_fine(runtime, p) {
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
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom_coarse(runtime, ((data) & (3)));
        method_set_bank_ram(runtime, ((data) & (3)));
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[0]).set_entry?.(lo) ?? 0);
        (__deref_set_bank_rom_coarse(runtime, h_m_bank_rom[1]).set_entry?.(hi) ?? 0);
    }
    function __deref_set_bank_rom_coarse(runtime, p) {
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
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xff);
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            (__deref_set_bank_ram(runtime, members.m_bank_ram).set_entry?.(entry) ?? 0);
        }
    }
    function __deref_set_bank_ram(runtime, p) {
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
    function method_write_command(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_ctrl_cmd = (((((data) >>> (4)) & ((1 << (3)) - 1))) & 0xff);
        members.m_ctrl_data = (((((data) >>> (0)) & ((1 << (4)) - 1))) & 0xff);
        0;
    }
    function method_read_command(runtime, space) {
        const members = runtime.members;
        let __t0;
        0;
        return (((((((((__t0 = __deref_read_command(runtime, space), typeof __t0.unmap === 'function' ? __t0.unmap() : typeof __t0.unmap === 'number' || typeof __t0.unmap === 'boolean' ? __t0.unmap : runtime.container(space, "unmap"))) & (128))) | ((((members.m_ctrl_cmd ?? 0)) << (4))))) | ((members.m_ctrl_data ?? 0)))) & 0xff);
    }
    function __deref_read_command(runtime, p) {
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
    function method_read_status(runtime, space) {
        const members = runtime.members;
        let __t0;
        0;
        return (((((((__t0 = __deref_read_status(runtime, space), typeof __t0.unmap === 'function' ? __t0.unmap() : typeof __t0.unmap === 'number' || typeof __t0.unmap === 'boolean' ? __t0.unmap : runtime.container(space, "unmap"))) & (128))) | (127))) & 0xff);
    }
    function __deref_read_status(runtime, p) {
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
    function method_write_control(runtime, data) {
        const members = runtime.members;
        let __t0, __t1;
        data = ((data) & 0xff);
        const h_m_registers = members.m_registers ?? 0;
        0;
        if ((((((data) >>> (0)) & 1)) ? 0 : 1)) {
            switch ((members.m_ctrl_cmd ?? 0)) {
                case 1:
                    {
                        0;
                        members.m_ctrl_data = ((((h_m_registers[(__t0 = (members.m_ctrl_addr ?? 0), members.m_ctrl_addr = ((((members.m_ctrl_addr) + (1))) & 0xff), __t0)]) & (15))) & 0xff);
                        break;
                    }
                case 3:
                    {
                        0;
                        h_m_registers[(__t1 = (members.m_ctrl_addr ?? 0), members.m_ctrl_addr = ((((members.m_ctrl_addr) + (1))) & 0xff), __t1)] = (((members.m_ctrl_data ?? 0)) & (15));
                        break;
                    }
                case 4:
                    {
                        members.m_ctrl_addr = (((((((members.m_ctrl_addr ?? 0)) & (240))) | ((((members.m_ctrl_data ?? 0)) & (15))))) & 0xff);
                        0;
                        break;
                    }
                case 5:
                    {
                        members.m_ctrl_addr = (((((((members.m_ctrl_addr ?? 0)) & (15))) | ((((members.m_ctrl_data ?? 0)) << (4))))) & 0xff);
                        0;
                        break;
                    }
                case 6:
                    {
                        0;
                        method_execute_instruction(runtime);
                        break;
                    }
                default:
                    {
                        0;
                    }
            }
        }
    }
    function method_execute_instruction(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::copy_n"];
        const h_m_registers = members.m_registers ?? 0;
        switch ((((members.m_ctrl_data ?? 0)) & (15))) {
            case 0:
                {
                    0;
                    (__L0 ? __L0(__addr_execute_instruction(runtime, h_m_registers, 16), 7, __addr_execute_instruction(runtime, h_m_registers, 0)) : runtime.macro("std::copy_n", __addr_execute_instruction(runtime, h_m_registers, 16), 7, __addr_execute_instruction(runtime, h_m_registers, 0)));
                    break;
                }
            case 1:
                {
                    0;
                    let newminutes = ((((method_read_12bit(runtime, 0)) << 16 >> 16)) << 16 >> 16);
                    let newdays = ((((method_read_12bit(runtime, 3)) << 16 >> 16)) << 16 >> 16);
                    let oldminutes = ((((method_read_12bit(runtime, 16)) << 16 >> 16)) << 16 >> 16);
                    let olddays = ((((method_read_12bit(runtime, 19)) << 16 >> 16)) << 16 >> 16);
                    let eventminutes = ((((method_read_12bit(runtime, 88)) << 16 >> 16)) << 16 >> 16);
                    let eventdays = ((((method_read_12bit(runtime, 91)) << 16 >> 16)) << 16 >> 16);
                    let minutesdelta = ((((((newminutes) - (oldminutes))) << 16 >> 16)) << 16 >> 16);
                    let daysdelta = ((((((newdays) - (olddays))) << 16 >> 16)) << 16 >> 16);
                    while (((Number(1440) <= Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
                        minutesdelta = ((((minutesdelta) - (1440))) << 16 >> 16);
                        daysdelta = ((((daysdelta) + (1))) << 16 >> 16);
                    }
                    while (((Number(0) > Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
                        minutesdelta = ((((minutesdelta) + (1440))) << 16 >> 16);
                        daysdelta = ((((daysdelta) - (1))) << 16 >> 16);
                    }
                    (__L0 ? __L0(__addr_execute_instruction(runtime, h_m_registers, 0), 7, __addr_execute_instruction(runtime, h_m_registers, 16)) : runtime.macro("std::copy_n", __addr_execute_instruction(runtime, h_m_registers, 0), 7, __addr_execute_instruction(runtime, h_m_registers, 16)));
                    method_write_12bit(runtime, 88, ((((eventminutes) + (minutesdelta))) << 16 >> 16));
                    method_write_12bit(runtime, 91, ((((eventdays) + (daysdelta))) << 16 >> 16));
                    break;
                }
            case 2:
                {
                    0;
                    members.m_ctrl_data = ((1) & 0xff);
                    break;
                }
            case 14:
                {
                    0;
                    break;
                }
            default:
                {
                    0;
                }
        }
    }
    function __addr_execute_instruction(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_read_12bit(runtime, offset) {
        const members = runtime.members;
        offset = ((offset) & 0xff);
        const h_m_registers = members.m_registers ?? 0;
        return ((((((((((((h_m_registers[((((offset) + (0))) & (255))]) & (15))) & 0xffff)) << (0))) | (((((((h_m_registers[((((offset) + (1))) & (255))]) & (15))) & 0xffff)) << (4))))) | (((((((h_m_registers[((((offset) + (2))) & (255))]) & (15))) & 0xffff)) << (8))))) & 0xffff);
    }
    function method_write_12bit(runtime, offset, data) {
        const members = runtime.members;
        offset = ((offset) & 0xff);
        data = ((data) & 0xffff);
        const h_m_registers = members.m_registers ?? 0;
        h_m_registers[((((offset) + (0))) & (255))] = ((((data) >>> (0))) & (15));
        h_m_registers[((((offset) + (1))) & (255))] = ((((data) >>> (4))) & (15));
        h_m_registers[((((offset) + (2))) & (255))] = ((((data) >>> (8))) & (15));
    }
    function method_read_ir(runtime, space) {
        const members = runtime.members;
        let __t0;
        0;
        return (((((((__t0 = __deref_read_ir(runtime, space), typeof __t0.unmap === 'function' ? __t0.unmap() : typeof __t0.unmap === 'number' || typeof __t0.unmap === 'boolean' ? __t0.unmap : runtime.container(space, "unmap"))) & (192))) | (0))) & 0xff);
    }
    function __deref_read_ir(runtime, p) {
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
    function method_write_ir(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        0;
    }
    function method_rtc_advance_seconds(runtime, param) {
        const members = runtime.members;
        if (((Number(59) > Number((members.m_seconds ?? 0))) ? 1 : 0)) {
            members.m_seconds = ((((members.m_seconds) + (1))) & 0xff);
            return;
        }
        members.m_seconds = ((0) & 0xff);
        let minutes = ((((method_read_12bit(runtime, 16)) & 0xffff)) & 0xffff);
        if (((Number(1439) > Number(minutes)) ? 1 : 0)) {
            method_write_12bit(runtime, 16, ((minutes) + (1)));
            return;
        }
        method_write_12bit(runtime, 16, 0);
        method_write_12bit(runtime, 19, __add_rtc_advance_seconds(runtime, method_read_12bit(runtime, 19), 1));
    }
    function __add_rtc_advance_seconds(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_huc3_device__execute_instruction(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::copy_n"];
        const h_m_registers = members.m_registers ?? 0;
        switch ((((members.m_ctrl_data ?? 0)) & (15))) {
            case 0:
                {
                    0;
                    (__L0 ? __L0(__addr_huc3_device__execute_instruction(runtime, h_m_registers, 16), 7, __addr_huc3_device__execute_instruction(runtime, h_m_registers, 0)) : runtime.macro("std::copy_n", __addr_huc3_device__execute_instruction(runtime, h_m_registers, 16), 7, __addr_huc3_device__execute_instruction(runtime, h_m_registers, 0)));
                    break;
                }
            case 1:
                {
                    0;
                    let newminutes = ((((method_read_12bit(runtime, 0)) << 16 >> 16)) << 16 >> 16);
                    let newdays = ((((method_read_12bit(runtime, 3)) << 16 >> 16)) << 16 >> 16);
                    let oldminutes = ((((method_read_12bit(runtime, 16)) << 16 >> 16)) << 16 >> 16);
                    let olddays = ((((method_read_12bit(runtime, 19)) << 16 >> 16)) << 16 >> 16);
                    let eventminutes = ((((method_read_12bit(runtime, 88)) << 16 >> 16)) << 16 >> 16);
                    let eventdays = ((((method_read_12bit(runtime, 91)) << 16 >> 16)) << 16 >> 16);
                    let minutesdelta = ((((((newminutes) - (oldminutes))) << 16 >> 16)) << 16 >> 16);
                    let daysdelta = ((((((newdays) - (olddays))) << 16 >> 16)) << 16 >> 16);
                    while (((Number(1440) <= Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
                        minutesdelta = ((((minutesdelta) - (1440))) << 16 >> 16);
                        daysdelta = ((((daysdelta) + (1))) << 16 >> 16);
                    }
                    while (((Number(0) > Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
                        minutesdelta = ((((minutesdelta) + (1440))) << 16 >> 16);
                        daysdelta = ((((daysdelta) - (1))) << 16 >> 16);
                    }
                    (__L0 ? __L0(__addr_huc3_device__execute_instruction(runtime, h_m_registers, 0), 7, __addr_huc3_device__execute_instruction(runtime, h_m_registers, 16)) : runtime.macro("std::copy_n", __addr_huc3_device__execute_instruction(runtime, h_m_registers, 0), 7, __addr_huc3_device__execute_instruction(runtime, h_m_registers, 16)));
                    method_write_12bit(runtime, 88, ((((eventminutes) + (minutesdelta))) << 16 >> 16));
                    method_write_12bit(runtime, 91, ((((eventdays) + (daysdelta))) << 16 >> 16));
                    break;
                }
            case 2:
                {
                    0;
                    members.m_ctrl_data = ((1) & 0xff);
                    break;
                }
            case 14:
                {
                    0;
                    break;
                }
            default:
                {
                    0;
                }
        }
    }
    function __addr_huc3_device__execute_instruction(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_huc3_device__read_12bit(runtime, offset) {
        const members = runtime.members;
        offset = ((offset) & 0xff);
        const h_m_registers = members.m_registers ?? 0;
        return ((((((((((((h_m_registers[((((offset) + (0))) & (255))]) & (15))) & 0xffff)) << (0))) | (((((((h_m_registers[((((offset) + (1))) & (255))]) & (15))) & 0xffff)) << (4))))) | (((((((h_m_registers[((((offset) + (2))) & (255))]) & (15))) & 0xffff)) << (8))))) & 0xffff);
    }
    function method_huc3_device__write_12bit(runtime, offset, data) {
        const members = runtime.members;
        offset = ((offset) & 0xff);
        data = ((data) & 0xffff);
        const h_m_registers = members.m_registers ?? 0;
        h_m_registers[((((offset) + (0))) & (255))] = ((((data) >>> (0))) & (15));
        h_m_registers[((((offset) + (1))) & (255))] = ((((data) >>> (4))) & (15));
        h_m_registers[((((offset) + (2))) & (255))] = ((((data) >>> (8))) & (15));
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "bank_rom_coarse": method_bank_rom_coarse,
        "bank_rom_fine": method_bank_rom_fine,
        "bank_rom_low_base": method_bank_rom_low_base,
        "bank_rom_high_base": method_bank_rom_high_base,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
        "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
        "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
        "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
        "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
        "set_bank_bits_ram": method_set_bank_bits_ram,
        "bank_ram": method_bank_ram,
        "bank_ram_base": method_bank_ram_base,
        "bank_ram_entry": method_bank_ram_entry,
        "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
        "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
        "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
        "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
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
        "nvram_can_write": method_nvram_can_write,
        "io_select": method_io_select,
        "bank_switch_fine": method_bank_switch_fine,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "bank_switch_coarse": method_bank_switch_coarse,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "set_bank_ram": method_set_bank_ram,
        "write_command": method_write_command,
        "read_command": method_read_command,
        "read_status": method_read_status,
        "write_control": method_write_control,
        "execute_instruction": method_execute_instruction,
        "read_12bit": method_read_12bit,
        "write_12bit": method_write_12bit,
        "read_ir": method_read_ir,
        "write_ir": method_write_ir,
        "rtc_advance_seconds": method_rtc_advance_seconds,
        "huc3_device::execute_instruction": method_huc3_device__execute_instruction,
        "huc3_device::read_12bit": method_huc3_device__read_12bit,
        "huc3_device::write_12bit": method_huc3_device__write_12bit,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_huc3"].compiledMethodLinks = ["std::bit_width", "std::copy_n", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_huc3"].compiledStructMethods = {
    "leader_1_0": (() => {
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
        function method_swap(runtime) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["big_endianize_int32"];
            members.cart_type = (((__L0 ? __L0((members.cart_type ?? 0)) : runtime.macro("big_endianize_int32", (members.cart_type ?? 0)))) >>> 0);
            members.rom_bytes = (((__L0 ? __L0((members.rom_bytes ?? 0)) : runtime.macro("big_endianize_int32", (members.rom_bytes ?? 0)))) >>> 0);
            members.ram_bytes = (((__L0 ? __L0((members.ram_bytes ?? 0)) : runtime.macro("big_endianize_int32", (members.ram_bytes ?? 0)))) >>> 0);
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
        function method_map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "swap": method_swap,
            "has_battery": method_has_battery,
            "rtc_battery_backed": method_rtc_battery_backed,
            "rtc_feature_y2k": method_rtc_feature_y2k,
            "rtc_feature_leap_year": method_rtc_feature_leap_year,
            "convert_to_bcd": method_convert_to_bcd,
            "bcd_to_integer": method_bcd_to_integer,
            "device_rtc_interface::has_battery": method_device_rtc_interface__has_battery,
            "device_rtc_interface::rtc_feature_y2k": method_device_rtc_interface__rtc_feature_y2k,
            "device_rtc_interface::rtc_feature_leap_year": method_device_rtc_interface__rtc_feature_leap_year,
            "device_rtc_interface::rtc_battery_backed": method_device_rtc_interface__rtc_battery_backed,
            "map_non_power_of_two": method_map_non_power_of_two,
            "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
            "install_non_power_of_two__5": method_install_non_power_of_two__5,
            "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
        };
        return __methodTable;
    })(),
    "trailer": (() => {
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
        function method_swap(runtime) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["big_endianize_int32"];
            members.size = (((__L0 ? __L0((members.size ?? 0)) : runtime.macro("big_endianize_int32", (members.size ?? 0)))) >>> 0);
            members.ver_maj = (((__L0 ? __L0((members.ver_maj ?? 0)) : runtime.macro("big_endianize_int32", (members.ver_maj ?? 0)))) >>> 0);
            members.ver_min = (((__L0 ? __L0((members.ver_min ?? 0)) : runtime.macro("big_endianize_int32", (members.ver_min ?? 0)))) >>> 0);
            members.magic = (((__L0 ? __L0((members.magic ?? 0)) : runtime.macro("big_endianize_int32", (members.magic ?? 0)))) >>> 0);
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
        function method_map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::make_unsigned_t"];
            let __t0;
            if (((Number(0) >= Number(count)) ? 1 : 0)) {
                return 0;
            }
            let max = runtime.subtract(count, 1);
            let mask = max;
            for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
                mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
            }
            let bits = ((((0) | 0)) | 0);
            while ((((mask) >>> (bits)) & 1)) {
                bits = ((((bits) + (1))) | 0);
            }
            for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
                let mapped = entry;
                let b = ((((((bits) - (1))) | 0)) | 0);
                while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                    while ((((max) >>> (b)) & 1)) {
                        b = ((((b) - (1))) | 0);
                    }
                    mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
                }
                (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
            }
            return mask;
        }
        function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
            let decode_mask = ((length) - (1));
            for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
                if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                    decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                    break;
                }
            }
            runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "swap": method_swap,
            "has_battery": method_has_battery,
            "rtc_battery_backed": method_rtc_battery_backed,
            "rtc_feature_y2k": method_rtc_feature_y2k,
            "rtc_feature_leap_year": method_rtc_feature_leap_year,
            "convert_to_bcd": method_convert_to_bcd,
            "bcd_to_integer": method_bcd_to_integer,
            "device_rtc_interface::has_battery": method_device_rtc_interface__has_battery,
            "device_rtc_interface::rtc_feature_y2k": method_device_rtc_interface__rtc_feature_y2k,
            "device_rtc_interface::rtc_feature_leap_year": method_device_rtc_interface__rtc_feature_leap_year,
            "device_rtc_interface::rtc_battery_backed": method_device_rtc_interface__rtc_battery_backed,
            "map_non_power_of_two": method_map_non_power_of_two,
            "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
            "install_non_power_of_two__5": method_install_non_power_of_two__5,
            "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
        };
        return __methodTable;
    })(),
};
definition.slot.options["rom_tama5"].compiledMethods = (() => {
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
    function method_data_r(runtime, space) {
        const members = runtime.members;
        let __t0;
        return (((((((__t0 = __deref_data_r(runtime, space), typeof __t0.unmap === 'function' ? __t0.unmap() : typeof __t0.unmap === 'number' || typeof __t0.unmap === 'boolean' ? __t0.unmap : runtime.container(space, "unmap"))) & (240))) | ((((members.m_response ?? 0)) & (15))))) & 0xff);
    }
    function __deref_data_r(runtime, p) {
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
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["set_bank_rom"];
        data = ((data) & 0xff);
        const h_m_registers = members.m_registers ?? 0;
        switch ((members.m_command ?? 0)) {
            case 0:
                {
                    members.m_bank_sel_rom = (((((((members.m_bank_sel_rom ?? 0)) & (16))) | (((data) & (15))))) & 0xff);
                    (__L0 ? __L0((members.m_bank_sel_rom ?? 0)) : runtime.macro("set_bank_rom", (members.m_bank_sel_rom ?? 0)));
                    break;
                }
            case 1:
                {
                    members.m_bank_sel_rom = (((((((members.m_bank_sel_rom ?? 0)) & (15))) | (((((data) & (1))) << (4))))) & 0xff);
                    (__L0 ? __L0((members.m_bank_sel_rom ?? 0)) : runtime.macro("set_bank_rom", (members.m_bank_sel_rom ?? 0)));
                    break;
                }
            case 4:
                {
                    members.m_data = (((((((members.m_data ?? 0)) & (240))) | (((data) & (15))))) & 0xff);
                    break;
                }
            case 5:
                {
                    members.m_data = (((((((members.m_data ?? 0)) & (15))) | (((data) << (4))))) & 0xff);
                    break;
                }
            case 6:
                {
                    members.m_address = (((((((members.m_address ?? 0)) & (15))) | (((data) << (4))))) & 0xff);
                    break;
                }
            case 7:
                {
                    members.m_address = (((((((members.m_address ?? 0)) & (240))) | (((data) & (15))))) & 0xff);
                    switch ((((members.m_address ?? 0)) & (224))) {
                        case 0:
                            {
                                0;
                                h_m_registers[(((members.m_address ?? 0)) & (31))] = (members.m_data ?? 0);
                                break;
                            }
                        case 32:
                            {
                                0;
                                members.m_data = ((h_m_registers[(((members.m_address ?? 0)) & (31))]) & 0xff);
                                break;
                            }
                        case 64:
                            {
                                if (((Number((((members.m_address ?? 0)) & (31))) === Number(18)) ? 1 : 0)) {
                                    members.m_data = ((255) & 0xff);
                                }
                            }
                        default:
                            {
                                0;
                            }
                    }
                }
        }
    }
    function method_command_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        switch (data) {
            case 0:
            case 1:
            case 4:
            case 5:
            case 6:
            case 7:
                {
                    break;
                }
            case 10:
                {
                    members.m_response = ((1) & 0xff);
                    break;
                }
            case 12:
                {
                    members.m_response = (((((members.m_data ?? 0)) & (15))) & 0xff);
                    break;
                }
            case 13:
                {
                    members.m_response = (((((members.m_data ?? 0)) >>> (4))) & 0xff);
                    break;
                }
            default:
                {
                    0;
                }
        }
        members.m_command = ((data) & 0xff);
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "data_r": method_data_r,
        "data_w": method_data_w,
        "command_w": method_command_w,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_tama5"].compiledMethodLinks = ["set_bank_rom", "std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.slot.options["rom_liebao"].compiledMethods = (() => {
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
    function method_device_gb_cart_interface__has_slot(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? 1 : 0);
    }
    function method_device_gb_cart_interface__cart_space(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__t0 = __deref_device_gb_cart_interface__cart_space(runtime, h_m_slot.m_space), typeof __t0.target === 'function' ? __t0.target() : typeof __t0.target === 'number' || typeof __t0.target === 'boolean' ? __t0.target : runtime.container(h_m_slot.m_space, "target"))) : (0));
    }
    function __deref_device_gb_cart_interface__cart_space(runtime, p) {
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
    function method_device_gb_cart_interface__loaded_through_softlist(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_slot = members.m_slot ?? 0;
        return (((h_m_slot) && ((__t0 = __deref_device_gb_cart_interface__loaded_through_softlist(runtime, members.m_slot), typeof __t0.loaded_through_softlist === 'function' ? __t0.loaded_through_softlist() : typeof __t0.loaded_through_softlist === 'number' || typeof __t0.loaded_through_softlist === 'boolean' ? __t0.loaded_through_softlist : runtime.container(members.m_slot, "loaded_through_softlist")))) ? 1 : 0);
    }
    function __deref_device_gb_cart_interface__loaded_through_softlist(runtime, p) {
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
    function method_device_gb_cart_interface__get_feature(runtime, feature_name) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__get_feature(runtime, members.m_slot).get_feature?.(feature_name) ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__get_feature(runtime, p) {
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
    function method_device_gb_cart_interface__cart_rom_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_rom_region(runtime, members.m_slot).memregion?.("rom") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_rom_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_ram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_ram_region(runtime, members.m_slot).memregion?.("ram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_ram_region(runtime, p) {
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
    function method_device_gb_cart_interface__cart_nvram_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__cart_nvram_region(runtime, members.m_slot).memregion?.("nvram") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__cart_nvram_region(runtime, p) {
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
    function method_device_gb_cart_interface__gbx_footer_region(runtime) {
        const members = runtime.members;
        const h_m_slot = members.m_slot ?? 0;
        return ((h_m_slot) ? ((__deref_device_gb_cart_interface__gbx_footer_region(runtime, members.m_slot).memregion?.("gbx") ?? 0)) : (0));
    }
    function __deref_device_gb_cart_interface__gbx_footer_region(runtime, p) {
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
    function method_set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_mbc_8k_device_base__set_bank_bits_rom(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_rom = ((bits) >>> 0);
    }
    function method_set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_bank_ram_base(runtime, p) {
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
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_mbc_ram_device_base__set_bank_bits_ram(runtime, bits) {
        const members = runtime.members;
        members.m_bank_bits_ram = ((bits) >>> 0);
    }
    function method_mbc_ram_device_base__bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_mbc_ram_device_base__bank_ram_base(runtime) {
        const members = runtime.members;
        let __t0;
        return runtime.byteView((__t0 = __deref_mbc_ram_device_base__bank_ram_base(runtime, members.m_bank_ram), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_bank_ram, "base")));
    }
    function __deref_mbc_ram_device_base__bank_ram_base(runtime, p) {
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
    function method_mbc_ram_device_base__bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_enable_ram(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        let enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? 1 : 0)) ? 1 : 0);
        0;
        if (enable) {
            (__deref_enable_ram(runtime, members.m_view_ram).select?.(0) ?? 0);
        }
        else {
            (__t0 = __deref_enable_ram(runtime, members.m_view_ram), typeof __t0.disable === 'function' ? __t0.disable() : typeof __t0.disable === 'number' || typeof __t0.disable === 'boolean' ? __t0.disable : runtime.container(members.m_view_ram, "disable"));
        }
    }
    function __deref_enable_ram(runtime, p) {
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
    function method_bank_switch_rom(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_rom_low(runtime, ((((data) & 0xffff)) << (1)));
        if (((((members.m_bank_high_set ?? 0)) || (((Number(((offset) & (255))) === Number(210)) ? 1 : 0))) ? 1 : 0)) {
            members.m_bank_high_set = ((0) & 0xff);
        }
        else {
            method_set_bank_rom_high(runtime, ((((((data) & 0xffff)) << (1))) | (1)));
        }
    }
    function method_set_bank_rom_low(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom_low(runtime, h_m_bank_rom[0]).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom_low(runtime, p) {
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
    function method_set_bank_rom_high(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xffff);
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        (__deref_set_bank_rom_high(runtime, h_m_bank_rom[1]).set_entry?.(entry) ?? 0);
    }
    function __deref_set_bank_rom_high(runtime, p) {
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
    function method_bank_switch_ram(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_set_bank_ram(runtime, ((data) & (15)));
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        entry = ((entry) & 0xff);
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            (__deref_set_bank_ram(runtime, members.m_bank_ram).set_entry?.(entry) ?? 0);
        }
    }
    function __deref_set_bank_ram(runtime, p) {
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
    function method_bank_switch_rom_high(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((Number(((offset) & (255))) === Number(210)) ? 1 : 0)) {
            members.m_bank_high_set = ((1) & 0xff);
            method_set_bank_rom_high(runtime, ((((((data) & 0xffff)) << (1))) | (1)));
        }
    }
    function method_map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_device_generic_cart_interface__map_non_power_of_two(runtime, count, map) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::make_unsigned_t"];
        let __t0;
        if (((Number(0) >= Number(count)) ? 1 : 0)) {
            return 0;
        }
        let max = runtime.subtract(count, 1);
        let mask = max;
        for (let i = 1; ((Number(((1) * (8))) > Number(i)) ? 1 : 0); i = ((i) << (1))) {
            mask = (((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask))) | (runtime.shiftRight((__L0 ? __L0(mask) : runtime.macro("std::make_unsigned_t", mask)), i)));
        }
        let bits = ((((0) | 0)) | 0);
        while ((((mask) >>> (bits)) & 1)) {
            bits = ((((bits) + (1))) | 0);
        }
        for (let entry = 0; ((Number(mask) >= Number(entry)) ? 1 : 0); entry = ((entry) + (1))) {
            let mapped = entry;
            let b = ((((((bits) - (1))) | 0)) | 0);
            while (((Number(max) < Number(mapped)) ? 1 : 0)) {
                while ((((max) >>> (b)) & 1)) {
                    b = ((((b) - (1))) | 0);
                }
                mapped = (((__L0 ? __L0(mapped) : runtime.macro("std::make_unsigned_t", mapped))) & ((~(((__L0 ? __L0(1) : runtime.macro("std::make_unsigned_t", 1))) << ((__t0 = b, b = ((((b) - (1))) | 0), __t0))))));
            }
            (typeof map === 'function' ? map(entry, mapped) : runtime.macro("map", entry, mapped));
        }
        return mask;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::bit_width"], __L1 = __l["std::forward"];
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__L0 ? __L0(decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); (((0) < (i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__L1 ? __L1(install) : runtime.macro("std::forward", install)));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_gb_cart_interface::has_slot": method_device_gb_cart_interface__has_slot,
        "device_gb_cart_interface::cart_space": method_device_gb_cart_interface__cart_space,
        "device_gb_cart_interface::loaded_through_softlist": method_device_gb_cart_interface__loaded_through_softlist,
        "device_gb_cart_interface::get_feature": method_device_gb_cart_interface__get_feature,
        "device_gb_cart_interface::cart_rom_region": method_device_gb_cart_interface__cart_rom_region,
        "device_gb_cart_interface::cart_ram_region": method_device_gb_cart_interface__cart_ram_region,
        "device_gb_cart_interface::cart_nvram_region": method_device_gb_cart_interface__cart_nvram_region,
        "device_gb_cart_interface::gbx_footer_region": method_device_gb_cart_interface__gbx_footer_region,
        "set_bank_bits_rom": method_set_bank_bits_rom,
        "mbc_8k_device_base::set_bank_bits_rom": method_mbc_8k_device_base__set_bank_bits_rom,
        "set_bank_bits_ram": method_set_bank_bits_ram,
        "bank_ram": method_bank_ram,
        "bank_ram_base": method_bank_ram_base,
        "bank_ram_entry": method_bank_ram_entry,
        "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
        "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
        "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
        "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
        "enable_ram": method_enable_ram,
        "bank_switch_rom": method_bank_switch_rom,
        "set_bank_rom_low": method_set_bank_rom_low,
        "set_bank_rom_high": method_set_bank_rom_high,
        "bank_switch_ram": method_bank_switch_ram,
        "set_bank_ram": method_set_bank_ram,
        "bank_switch_rom_high": method_bank_switch_rom_high,
        "map_non_power_of_two": method_map_non_power_of_two,
        "device_generic_cart_interface::map_non_power_of_two": method_device_generic_cart_interface__map_non_power_of_two,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
    return __methodTable;
})();
definition.slot.options["rom_liebao"].compiledMethodLinks = ["std::bit_width", "std::forward", "std::make_unsigned_t"];
definition.allocations["dasm_helper"].compiledMethods = (() => {
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
    function method_dasm_helper(runtime, data, base_pc) {
        const members = runtime.members;
    }
    function method_r8(runtime, pc) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_data ?? 0), ((pc) - ((members.m_base_pc ?? 0))))) & 0xff);
    }
    function method_r16(runtime, pc) {
        const members = runtime.members;
        return ((((method_r8(runtime, pc)) | (((((method_r8(runtime, ((pc) + (1)))) & 0xffff)) << (8))))) & 0xffff);
    }
    function method_r32(runtime, pc) {
        const members = runtime.members;
        return ((((method_r16(runtime, pc)) | (((((method_r16(runtime, ((pc) + (2)))) >>> 0)) << (16))))) >>> 0);
    }
    function method_r64(runtime, pc) {
        const members = runtime.members;
        return runtime.wide("|", method_r32(runtime, pc), runtime.wide("<<", method_r32(runtime, ((pc) + (4))), 32));
    }
    function method_dasm_helper__dasm_helper(runtime, data, base_pc) {
        const members = runtime.members;
    }
    function method_dasm_helper__r8(runtime, pc) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_data ?? 0), ((pc) - ((members.m_base_pc ?? 0))))) & 0xff);
    }
    function method_dasm_helper__r16(runtime, pc) {
        const members = runtime.members;
        return ((((method_r8(runtime, pc)) | (((((method_r8(runtime, ((pc) + (1)))) & 0xffff)) << (8))))) & 0xffff);
    }
    function method_dasm_helper__r32(runtime, pc) {
        const members = runtime.members;
        return ((((method_r16(runtime, pc)) | (((((method_r16(runtime, ((pc) + (2)))) >>> 0)) << (16))))) >>> 0);
    }
    function method_dasm_helper__r64(runtime, pc) {
        const members = runtime.members;
        return runtime.wide("|", method_r32(runtime, pc), runtime.wide("<<", method_r32(runtime, ((pc) + (4))), 32));
    }
    function method___construct(runtime, data, base_pc) {
        const members = runtime.members;
        members.m_data = data;
        members.m_base_pc = base_pc;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "dasm_helper": method_dasm_helper,
        "r8": method_r8,
        "r16": method_r16,
        "r32": method_r32,
        "r64": method_r64,
        "dasm_helper::dasm_helper": method_dasm_helper__dasm_helper,
        "dasm_helper::r8": method_dasm_helper__r8,
        "dasm_helper::r16": method_dasm_helper__r16,
        "dasm_helper::r32": method_dasm_helper__r32,
        "dasm_helper::r64": method_dasm_helper__r64,
        "__construct": method___construct
    };
    return __methodTable;
})();
export const device = definition;
export default device;
