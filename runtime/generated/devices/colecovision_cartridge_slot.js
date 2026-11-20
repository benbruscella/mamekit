import deviceData from './colecovision_cartridge_slot.device.ir.json' with { type: 'json' };
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        let data = ((255) & 0xff);
        if ((members.m_card ?? 0)) {
            data = (((members.m_card.read?.(offset, _8000, _a000, _c000, _e000) ?? 0)) & 0xff);
        }
        return ((data) & 0xff);
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((members.m_card ?? 0)) {
            (members.m_card.write?.(offset, data, _8000, _a000, _c000, _e000) ?? 0);
        }
    }
    function method_colecovision_cartridge_slot_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_colecovision_cartridge_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return "coleco_cart";
    }
    function method_colecovision_cartridge_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return "rom,col,bin";
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
        "read": method_read,
        "write": method_write,
        "colecovision_cartridge_slot_device::is_reset_on_load": method_colecovision_cartridge_slot_device__is_reset_on_load,
        "colecovision_cartridge_slot_device::image_interface": method_colecovision_cartridge_slot_device__image_interface,
        "colecovision_cartridge_slot_device::file_extensions": method_colecovision_cartridge_slot_device__file_extensions
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["rom_software_list_loader::instance"];
definition.slot.options["activision"].compiledMethods = (() => {
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_eeprom.found"], __L1 = __l["m_eeprom.read_sda"];
        let data = ((255) & 0xff);
        if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
            if ((((offset) < (16384)) ? 1 : 0)) {
                data = (((members.m_rom ?? 0)[offset]) & 0xff);
            }
            else {
                if ((((offset) === (32640)) ? 1 : 0)) {
                    if ((__L0 ? __L0() : ((members.m_eeprom)?.found?.() ?? 0))) {
                        data = (((__L1 ? __L1() : ((members.m_eeprom)?.read_sda?.() ?? 0))) & 0xff);
                    }
                    else {
                        data = ((255) & 0xff);
                    }
                }
                else {
                    if ((((offset) > (32640)) ? 1 : 0)) {
                        data = ((255) & 0xff);
                    }
                    else {
                        data = (((members.m_rom ?? 0)[(((((members.m_active_bank ?? 0)) << (14))) | (((offset) & (16383))))]) & 0xff);
                    }
                }
            }
        }
        return ((data) & 0xff);
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_eeprom.found"], __L1 = __l["m_eeprom.write_scl"], __L2 = __l["m_eeprom.write_sda"];
        data = ((data) & 0xff);
        switch (offset) {
            case 32656:
            case 32672:
            case 32688:
                {
                    members.m_active_bank = ((((((offset) >>> (4))) & (3))) & 0xff);
                    break;
                }
            case 32704:
            case 32720:
                {
                    if ((__L0 ? __L0() : ((members.m_eeprom)?.found?.() ?? 0))) {
                        (__L1 ? __L1((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_scl?.((((offset) >>> (4)) & 1)) ?? 0));
                    }
                    break;
                }
            case 32736:
            case 32752:
                {
                    if ((__L0 ? __L0() : ((members.m_eeprom)?.found?.() ?? 0))) {
                        (__L2 ? __L2((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_sda?.((((offset) >>> (4)) & 1)) ?? 0));
                    }
                    break;
                }
        }
    }
    function method_device_colecovision_cartridge_interface__read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
        "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
    };
    return __methodTable;
})();
definition.slot.options["activision"].compiledMethodLinks = ["m_eeprom.found", "m_eeprom.read_sda", "m_eeprom.write_scl", "m_eeprom.write_sda"];
definition.slot.options["activision_256b"].compiledMethods = (() => {
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_eeprom.found"], __L1 = __l["m_eeprom.read_sda"];
        let data = ((255) & 0xff);
        if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
            if ((((offset) < (16384)) ? 1 : 0)) {
                data = (((members.m_rom ?? 0)[offset]) & 0xff);
            }
            else {
                if ((((offset) === (32640)) ? 1 : 0)) {
                    if ((__L0 ? __L0() : ((members.m_eeprom)?.found?.() ?? 0))) {
                        data = (((__L1 ? __L1() : ((members.m_eeprom)?.read_sda?.() ?? 0))) & 0xff);
                    }
                    else {
                        data = ((255) & 0xff);
                    }
                }
                else {
                    if ((((offset) > (32640)) ? 1 : 0)) {
                        data = ((255) & 0xff);
                    }
                    else {
                        data = (((members.m_rom ?? 0)[(((((members.m_active_bank ?? 0)) << (14))) | (((offset) & (16383))))]) & 0xff);
                    }
                }
            }
        }
        return ((data) & 0xff);
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_eeprom.found"], __L1 = __l["m_eeprom.write_scl"], __L2 = __l["m_eeprom.write_sda"];
        data = ((data) & 0xff);
        switch (offset) {
            case 32656:
            case 32672:
            case 32688:
                {
                    members.m_active_bank = ((((((offset) >>> (4))) & (3))) & 0xff);
                    break;
                }
            case 32704:
            case 32720:
                {
                    if ((__L0 ? __L0() : ((members.m_eeprom)?.found?.() ?? 0))) {
                        (__L1 ? __L1((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_scl?.((((offset) >>> (4)) & 1)) ?? 0));
                    }
                    break;
                }
            case 32736:
            case 32752:
                {
                    if ((__L0 ? __L0() : ((members.m_eeprom)?.found?.() ?? 0))) {
                        (__L2 ? __L2((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_sda?.((((offset) >>> (4)) & 1)) ?? 0));
                    }
                    break;
                }
        }
    }
    function method_device_colecovision_cartridge_interface__read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
        "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
    };
    return __methodTable;
})();
definition.slot.options["activision_256b"].compiledMethodLinks = ["m_eeprom.found", "m_eeprom.read_sda", "m_eeprom.write_scl", "m_eeprom.write_sda"];
definition.slot.options["activision_256b"].children[0].definition.compiledMethods = {};
definition.slot.options["activision_32k"].compiledMethods = (() => {
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_eeprom.found"], __L1 = __l["m_eeprom.read_sda"];
        let data = ((255) & 0xff);
        if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
            if ((((offset) < (16384)) ? 1 : 0)) {
                data = (((members.m_rom ?? 0)[offset]) & 0xff);
            }
            else {
                if ((((offset) === (32640)) ? 1 : 0)) {
                    if ((__L0 ? __L0() : ((members.m_eeprom)?.found?.() ?? 0))) {
                        data = (((__L1 ? __L1() : ((members.m_eeprom)?.read_sda?.() ?? 0))) & 0xff);
                    }
                    else {
                        data = ((255) & 0xff);
                    }
                }
                else {
                    if ((((offset) > (32640)) ? 1 : 0)) {
                        data = ((255) & 0xff);
                    }
                    else {
                        data = (((members.m_rom ?? 0)[(((((members.m_active_bank ?? 0)) << (14))) | (((offset) & (16383))))]) & 0xff);
                    }
                }
            }
        }
        return ((data) & 0xff);
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_eeprom.found"], __L1 = __l["m_eeprom.write_scl"], __L2 = __l["m_eeprom.write_sda"];
        data = ((data) & 0xff);
        switch (offset) {
            case 32656:
            case 32672:
            case 32688:
                {
                    members.m_active_bank = ((((((offset) >>> (4))) & (3))) & 0xff);
                    break;
                }
            case 32704:
            case 32720:
                {
                    if ((__L0 ? __L0() : ((members.m_eeprom)?.found?.() ?? 0))) {
                        (__L1 ? __L1((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_scl?.((((offset) >>> (4)) & 1)) ?? 0));
                    }
                    break;
                }
            case 32736:
            case 32752:
                {
                    if ((__L0 ? __L0() : ((members.m_eeprom)?.found?.() ?? 0))) {
                        (__L2 ? __L2((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_sda?.((((offset) >>> (4)) & 1)) ?? 0));
                    }
                    break;
                }
        }
    }
    function method_device_colecovision_cartridge_interface__read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
        "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
    };
    return __methodTable;
})();
definition.slot.options["activision_32k"].compiledMethodLinks = ["m_eeprom.found", "m_eeprom.read_sda", "m_eeprom.write_scl", "m_eeprom.write_sda"];
definition.slot.options["activision_32k"].children[0].definition.compiledMethods = {};
definition.slot.options["megacart"].compiledMethods = (() => {
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        let data = ((255) & 0xff);
        if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
            if (((((members.m_bankcount ?? 0)) > (2)) ? 1 : 0)) {
                if ((((offset) >= (32704)) ? 1 : 0)) {
                    members.m_activebank = ((((offset) & ((((members.m_bankcount ?? 0)) - (1))))) >>> 0);
                }
                if ((((offset) >= (16384)) ? 1 : 0)) {
                    offset = __add_read(runtime, (((members.m_activebank ?? 0)) << (14)), ((offset) - (16384)));
                }
                else {
                    offset = __add_read(runtime, (((members.m_bankcount ?? 0)) << (14)), ((offset) - (16384)));
                }
            }
            data = (((members.m_rom ?? 0)[offset]) & 0xff);
        }
        return ((data) & 0xff);
    }
    function __add_read(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
        "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
    };
    return __methodTable;
})();
definition.slot.options["sgc_1mbit"].compiledMethods = (() => {
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_flash.read"];
        return (((__L0 ? __L0(method_banked_address(runtime, ((32768) | (offset)))) : ((members.m_flash)?.read?.(method_banked_address(runtime, ((32768) | (offset)))) ?? 0))) & 0xff);
    }
    function method_banked_address(runtime, offset) {
        const members = runtime.members;
        if ((((offset) < (40960)) ? 1 : 0)) {
            return (((((((members.m_slot0_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
        }
        else {
            if ((((offset) < (49152)) ? 1 : 0)) {
                return (((((((members.m_slot1_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
            }
            else {
                if ((((offset) < (57344)) ? 1 : 0)) {
                    return (((((((members.m_slot2_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
                }
                else {
                    return (((((((members.m_slot3_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
                }
            }
        }
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_flash.write"];
        data = ((data) & 0xff);
        offset = ((offset) | (32768));
        let max_banks = ((runtime.divide((members.m_rom_size ?? 0), 8192)) & 0xff);
        0;
        switch (offset) {
            case 65532:
                {
                    if ((((data) < (max_banks)) ? 1 : 0)) {
                        members.m_slot1_bank = ((data) & 0xff);
                    }
                    break;
                }
            case 65533:
                {
                    if ((((data) < (max_banks)) ? 1 : 0)) {
                        members.m_slot2_bank = ((data) & 0xff);
                    }
                    break;
                }
            case 65534:
                {
                    if ((((data) < (max_banks)) ? 1 : 0)) {
                        members.m_slot3_bank = ((data) & 0xff);
                    }
                    break;
                }
            case 65535:
                {
                    members.m_flash_a16 = ((data) & 0xff);
                    break;
                }
            default:
                {
                    let addr = ((((((((members.m_flash_a16 ?? 0)) >>> (0)) & 1)) << (16))) | (method_banked_address(runtime, offset)));
                    0;
                    (__L0 ? __L0(addr, data) : ((members.m_flash)?.write?.(addr, data) ?? 0));
                    break;
                }
        }
    }
    function method_device_colecovision_cartridge_interface__read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "banked_address": method_banked_address,
        "write": method_write,
        "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
        "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
    };
    return __methodTable;
})();
definition.slot.options["sgc_1mbit"].compiledMethodLinks = ["m_flash.read", "m_flash.write"];
definition.slot.options["sgc_1mbit"].children[0].definition.compiledMethods = (() => {
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
    function method_is_ready(runtime) {
        const members = runtime.members;
        return (((((members.m_status ?? 0)) & (128))) ? (1) : (0));
    }
    function method_write_full(runtime, address, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_seconds"], __L1 = __l["attotime::from_msec"], __L2 = __l["memcpy"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16, __t17;
        const h_m_maker_id = members.m_maker_id ?? 0;
        const h_m_device_id = members.m_device_id ?? 0;
        const h_m_addrmask = members.m_addrmask ?? 0;
        const h_m_size = members.m_size ?? 0;
        const h_m_sector_is_4k = members.m_sector_is_4k ?? 0;
        const h_m_sector_is_16k = members.m_sector_is_16k ?? 0;
        const h_m_bits = members.m_bits ?? 0;
        const h_m_top_boot_sector = members.m_top_boot_sector ?? 0;
        const h_m_bot_boot_sector = members.m_bot_boot_sector ?? 0;
        const h_m_page_size = members.m_page_size ?? 0;
        const h_m_write_buffer = members.m_write_buffer ?? 0;
        address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
        switch ((members.m_flash_mode ?? 0)) {
            case 0:
            case 2:
            case 1:
            case 8:
                {
                    switch (((data) & (255))) {
                        case 240:
                        case 255:
                            {
                                members.m_flash_mode = ((0) | 0);
                                break;
                            }
                        case 144:
                            {
                                if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((((((h_m_device_id) === (8941)) ? 1 : 0)) || ((((h_m_device_id) === (8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((20) | 0);
                                }
                                else {
                                    members.m_flash_mode = ((1) | 0);
                                }
                                break;
                            }
                        case 64:
                        case 16:
                            {
                                members.m_flash_mode = ((3) | 0);
                                break;
                            }
                        case 80:
                            {
                                if ((((((((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (97)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && ((((h_m_device_id) === (32)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_flash_mode ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                                    0;
                                }
                                else {
                                    if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_flash_mode = ((14) | 0);
                                    }
                                    else {
                                        members.m_status = ((128) & 0xff);
                                        members.m_flash_mode = ((2) | 0);
                                    }
                                }
                                break;
                            }
                        case 32:
                            {
                                if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (97)) ? 1 : 0))) ? 1 : 0)) {
                                    0;
                                }
                                else {
                                    if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((((((h_m_device_id) === (8941)) ? 1 : 0)) || ((((h_m_device_id) === (8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_flash_mode = ((0) | 0);
                                        members.m_fast_mode = ((1) ? 1 : 0);
                                    }
                                    else {
                                        members.m_flash_mode = ((4) | 0);
                                    }
                                }
                                break;
                            }
                        case 96:
                            {
                                members.m_flash_mode = ((5) | 0);
                                break;
                            }
                        case 112:
                            {
                                members.m_flash_mode = ((2) | 0);
                                break;
                            }
                        case 160:
                            {
                                if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((((((h_m_device_id) === (8941)) ? 1 : 0)) || ((((h_m_device_id) === (8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((13) | 0);
                                }
                                else {
                                    0;
                                }
                                break;
                            }
                        case 170:
                            {
                                if (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) {
                                    members.m_flash_mode = ((6) | 0);
                                }
                                else {
                                    if (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) {
                                        members.m_flash_mode = ((6) | 0);
                                    }
                                }
                                break;
                            }
                        case 232:
                            {
                                if (((((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && ((((h_m_device_id) >= (20)) ? 1 : 0))) ? 1 : 0)) && ((((h_m_device_id) <= (22)) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((18) | 0);
                                }
                                else {
                                    0;
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
            case 6:
                {
                    if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((7) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((7) | 0);
                        }
                        else {
                            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((7) | 0);
                            }
                            else {
                                if (((((((((Number(((address) & (h_m_addrmask))) === Number(((43690) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                    members.m_flash_mode = ((7) | 0);
                                }
                                else {
                                    0;
                                    members.m_flash_mode = ((0) | 0);
                                }
                            }
                        }
                    }
                    break;
                }
            case 7:
                {
                    if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((8) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((8) | 0);
                        }
                        else {
                            if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((8) | 0);
                            }
                            else {
                                if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((9) | 0);
                                }
                                else {
                                    if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_flash_mode = ((9) | 0);
                                    }
                                    else {
                                        if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                                            members.m_flash_mode = ((9) | 0);
                                        }
                                        else {
                                            if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                                members.m_flash_mode = ((13) | 0);
                                            }
                                            else {
                                                if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                                    if ((((((Number(h_m_maker_id) === Number(31)) ? 1 : 0)) && (((((((h_m_device_id) === (213)) ? 1 : 0)) || ((((h_m_device_id) === (218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                                        members.m_sdp = ((1) ? 1 : 0);
                                                        members.m_flash_mode = ((17) | 0);
                                                        members.m_byte_count = ((0) & 0xffff);
                                                    }
                                                    else {
                                                        if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
                                                            0;
                                                            members.m_byte_count = ((0) & 0xffff);
                                                            members.m_flash_mode = ((21) | 0);
                                                        }
                                                        else {
                                                            members.m_flash_mode = ((13) | 0);
                                                        }
                                                    }
                                                }
                                                else {
                                                    if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                                        members.m_flash_mode = ((13) | 0);
                                                    }
                                                    else {
                                                        if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                                            members.m_flash_mode = ((0) | 0);
                                                        }
                                                        else {
                                                            if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                                                members.m_flash_mode = ((0) | 0);
                                                            }
                                                            else {
                                                                if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                                                    members.m_flash_mode = ((0) | 0);
                                                                }
                                                                else {
                                                                    if ((((((((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(176)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(98)) ? 1 : 0))) ? 1 : 0)) && ((((h_m_device_id) === (19)) ? 1 : 0))) ? 1 : 0)) {
                                                                        members.m_flash_mode = ((16) | 0);
                                                                    }
                                                                    else {
                                                                        if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                            members.m_flash_mode = ((9) | 0);
                                                                        }
                                                                        else {
                                                                            if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                                members.m_flash_mode = ((8) | 0);
                                                                            }
                                                                            else {
                                                                                if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                                    members.m_flash_mode = ((13) | 0);
                                                                                }
                                                                                else {
                                                                                    if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                                        members.m_flash_mode = ((0) | 0);
                                                                                    }
                                                                                    else {
                                                                                        if (((((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) || (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
                                                                                            members.m_flash_mode = ((0) | 0);
                                                                                            members.m_fast_mode = ((1) ? 1 : 0);
                                                                                        }
                                                                                        else {
                                                                                            0;
                                                                                            members.m_flash_mode = ((0) | 0);
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
                        }
                    }
                    break;
                }
            case 9:
                {
                    if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((10) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((10) | 0);
                        }
                        else {
                            0;
                        }
                    }
                    break;
                }
            case 10:
                {
                    if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((11) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((11) | 0);
                        }
                        else {
                            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((11) | 0);
                            }
                            else {
                                if (((((((((Number(((address) & (h_m_addrmask))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                    members.m_flash_mode = ((11) | 0);
                                }
                                else {
                                    0;
                                }
                            }
                        }
                    }
                    break;
                }
            case 11:
                {
                    if (((((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (64)) ? 1 : 0))) ? 1 : 0)) {
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), 0), 255, 237568);
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), 245760), 255, 16384);
                        }
                        else {
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), 0), 255, h_m_size);
                        }
                        members.m_status = ((8) & 0xff);
                        members.m_flash_mode = ((12) | 0);
                        if (h_m_sector_is_4k) {
                            (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                        }
                        else {
                            if (h_m_sector_is_16k) {
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(4) : runtime.macro("attotime::from_seconds", 4))) ?? 0);
                            }
                            else {
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(16) : runtime.macro("attotime::from_seconds", 16))) ?? 0);
                            }
                        }
                    }
                    else {
                        if (((Number(((data) & (255))) === Number(48)) ? 1 : 0)) {
                            let base = ((((address) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            if (h_m_sector_is_4k) {
                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-4096))), 255, 4096);
                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-2048) : (-4096))))) | 0);
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(125) : runtime.macro("attotime::from_msec", 125))) ?? 0);
                            }
                            else {
                                if (h_m_sector_is_16k) {
                                    cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-16384))), 255, 16384);
                                    members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                                    (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                }
                                else {
                                    if ((((h_m_top_boot_sector) && (((Number(address) >= Number(((h_m_size) - (65536)))) ? 1 : 0))) ? 1 : 0)) {
                                        if (((Number(address) >= Number(((h_m_size) - (16384)))) ? 1 : 0)) {
                                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-16384))), 255, 16384);
                                            members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                                            (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                        }
                                        else {
                                            if (((Number(address) >= Number(((h_m_size) - (32768)))) ? 1 : 0)) {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-8192))), 255, 8192);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                                            }
                                            else {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-32768))), 255, 32768);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                            }
                                        }
                                    }
                                    else {
                                        if ((((h_m_bot_boot_sector) && (((Number(address) < Number(65536)) ? 1 : 0))) ? 1 : 0)) {
                                            if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-8192))), 255, 8192);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                                            }
                                            else {
                                                if (((Number(address) < Number(16384)) ? 1 : 0)) {
                                                    cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-16384))), 255, 16384);
                                                    members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                                                    (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                                }
                                                else {
                                                    if (((Number(address) < Number(32768)) ? 1 : 0)) {
                                                        cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-8192))), 255, 8192);
                                                        members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                                                        (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                                                    }
                                                    else {
                                                        cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-32768))), 255, 32768);
                                                        members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                                                        (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (64)) ? 1 : 0))) ? 1 : 0)) {
                                                let sectors = [65536, 65536, 65536, 32768, 8192, 8192, 16384];
                                                let sec_num = ((0) >>> 0);
                                                let toffset = ((base) >>> 0);
                                                while (((Number(toffset) >= Number((sectors[sec_num] ?? 0))) ? 1 : 0)) {
                                                    toffset = ((((toffset) - ((sectors[(__t0 = sec_num, sec_num = ((((sec_num) + (1))) >>> 0), __t0)] ?? 0)))) >>> 0);
                                                }
                                                let sec_len = (((sectors[sec_num] ?? 0)) >>> 0);
                                                if ((((sec_num) !== (5)) ? 1 : 0)) {
                                                    cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & ((~((sec_len) - (1)))))), 255, sec_len);
                                                }
                                                members.m_erase_sector = ((((address) & ((~((sec_len) - (1)))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                                            }
                                            else {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-65536))), 255, 65536);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-32768) : (-65536))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                                            }
                                        }
                                    }
                                }
                            }
                            members.m_status = ((8) & 0xff);
                            members.m_flash_mode = ((12) | 0);
                        }
                        else {
                            if (((((((((Number(((data) & (255))) === Number(32)) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(31)) ? 1 : 0))) ? 1 : 0)) && (((((((h_m_device_id) === (213)) ? 1 : 0)) || ((((h_m_device_id) === (218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                members.m_sdp = ((0) ? 1 : 0);
                                members.m_flash_mode = ((17) | 0);
                                members.m_byte_count = ((0) & 0xffff);
                            }
                            else {
                                if (((((((((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(96)) ? 1 : 0))) ? 1 : 0)) && (((Number(((address) & (65535))) === Number(21845)) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((8) | 0);
                                    0;
                                }
                                else {
                                    0;
                                }
                            }
                        }
                    }
                    break;
                }
            case 13:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (64)) ? 1 : 0))) ? 1 : 0)) {
                                    if (((((((address) < (237568)) ? 1 : 0)) || ((((address) >= (245760)) ? 1 : 0))) ? 1 : 0)) {
                                        runtime.writeIndex(runtime.writableMember("m_data"), address, ((runtime.readIndex(runtime.writableMember("m_data"), address)) & (data)));
                                    }
                                }
                                else {
                                    ((__t1 = members.m_data) && ArrayBuffer.isView(__t1) ? (__t1[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                }
                                break;
                            }
                        case 16:
                            {
                                ((__t2 = members.m_data) && ArrayBuffer.isView(__t2) ? (__t2[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t3 = members.m_data) && ArrayBuffer.isView(__t3) ? (__t3[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((0) | 0);
                    break;
                }
            case 14:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                ((__t4 = members.m_data) && ArrayBuffer.isView(__t4) ? (__t4[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                break;
                            }
                        case 16:
                            {
                                0;
                                ((__t5 = members.m_data) && ArrayBuffer.isView(__t5) ? (__t5[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t6 = members.m_data) && ArrayBuffer.isView(__t6) ? (__t6[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((15) | 0);
                    break;
                }
            case 15:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                ((__t7 = members.m_data) && ArrayBuffer.isView(__t7) ? (__t7[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                break;
                            }
                        case 16:
                            {
                                0;
                                ((__t8 = members.m_data) && ArrayBuffer.isView(__t8) ? (__t8[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t9 = members.m_data) && ArrayBuffer.isView(__t9) ? (__t9[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((0) | 0);
                    break;
                }
            case 3:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                ((__t10 = members.m_data) && ArrayBuffer.isView(__t10) ? (__t10[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                break;
                            }
                        case 16:
                            {
                                ((__t11 = members.m_data) && ArrayBuffer.isView(__t11) ? (__t11[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t12 = members.m_data) && ArrayBuffer.isView(__t12) ? (__t12[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_status = ((128) & 0xff);
                    if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (4)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((0) | 0);
                    }
                    else {
                        members.m_flash_mode = ((2) | 0);
                    }
                    break;
                }
            case 17:
                {
                    if ((((((((((((((members.m_byte_count ?? 0)) === (0)) ? 1 : 0)) && ((((members.m_sdp ?? 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((6) | 0);
                    }
                    else {
                        switch (h_m_bits) {
                            case 8:
                                {
                                    ((__t13 = members.m_data) && ArrayBuffer.isView(__t13) ? (__t13[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                    break;
                                }
                            case 16:
                                {
                                    ((__t14 = members.m_data) && ArrayBuffer.isView(__t14) ? (__t14[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                    ((__t15 = members.m_data) && ArrayBuffer.isView(__t15) ? (__t15[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                    break;
                                }
                            default:
                                {
                                    0;
                                    break;
                                }
                        }
                        members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
                        if (((((members.m_byte_count ?? 0)) === (h_m_page_size)) ? 1 : 0)) {
                            if ((members.m_sdp ?? 0)) {
                                members.m_flash_mode = ((0) | 0);
                            }
                            members.m_byte_count = ((0) & 0xffff);
                        }
                    }
                    break;
                }
            case 21:
                {
                    if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((0) | 0);
                    }
                    else {
                        ((__t16 = members.m_data) && ArrayBuffer.isView(__t16) ? (__t16[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                        ((__t17 = members.m_data) && ArrayBuffer.isView(__t17) ? (__t17[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                        members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
                        if (((((members.m_byte_count ?? 0)) === (h_m_page_size)) ? 1 : 0)) {
                            members.m_flash_mode = ((0) | 0);
                            members.m_sdp = ((0) ? 1 : 0);
                            members.m_byte_count = ((0) & 0xffff);
                        }
                    }
                    break;
                }
            case 4:
                {
                    if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
                        if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (4)) ? 1 : 0))) ? 1 : 0)) {
                            let base = ((((address) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-256))), 255, 256);
                            (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(4) : runtime.macro("attotime::from_msec", 4))) ?? 0);
                        }
                        else {
                            if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && ((((h_m_device_id) === (17521)) ? 1 : 0))) ? 1 : 0)) {
                                let base = ((((((address) & (262143))) * (2))) >>> 0);
                                let size = ((0) | 0);
                                let duration = ((0) | 0);
                                if ((((base) < (16384)) ? 1 : 0)) {
                                    base = ((0) >>> 0);
                                    size = ((16384) | 0);
                                    duration = ((300) | 0);
                                }
                                else {
                                    if ((((base) < (32768)) ? 1 : 0)) {
                                        base = ((((base) & (24576))) >>> 0);
                                        size = ((8192) | 0);
                                        duration = ((300) | 0);
                                    }
                                    else {
                                        if ((((base) < (131072)) ? 1 : 0)) {
                                            base = ((32768) >>> 0);
                                            size = ((98304) | 0);
                                            duration = ((600) | 0);
                                        }
                                        else {
                                            base = ((((base) & (393216))) >>> 0);
                                            size = ((131072) | 0);
                                            duration = ((600) | 0);
                                        }
                                    }
                                }
                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), base), 255, size);
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(duration) : runtime.macro("attotime::from_msec", duration))) ?? 0);
                            }
                            else {
                                let base = ((((address) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-65536))), 255, 65536);
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                            }
                        }
                        members.m_status = ((0) & 0xff);
                        members.m_flash_mode = ((2) | 0);
                        break;
                    }
                    else {
                        0;
                    }
                    break;
                }
            case 5:
                {
                    switch (((data) & (255))) {
                        case 241:
                            {
                                members.m_flash_master_lock = ((1) ? 1 : 0);
                                break;
                            }
                        case 208:
                            {
                                members.m_flash_master_lock = ((0) ? 1 : 0);
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((2) | 0);
                    break;
                }
            case 18:
                {
                    if ((((h_m_bits) === (16)) ? 1 : 0)) {
                        members.m_write_buffer_count = ((__add_write_full(runtime, cppMin(+(data), +(15)), 1)) >>> 0);
                    }
                    else {
                        members.m_write_buffer_count = ((__add_write_full(runtime, cppMin(+(data), +(31)), 1)) >>> 0);
                    }
                    members.m_status = ((128) & 0xff);
                    members.m_flash_mode = ((19) | 0);
                    members.m_byte_count = ((0) & 0xffff);
                    break;
                }
            case 19:
                {
                    if (((((members.m_byte_count ?? 0)) < ((members.m_write_buffer_count ?? 0))) ? 1 : 0)) {
                        if (((((members.m_byte_count ?? 0)) === (0)) ? 1 : 0)) {
                            members.m_write_buffer_start_address = ((address) >>> 0);
                        }
                        if (((Number(address) >= Number((((members.m_write_buffer_start_address ?? 0)) + ((members.m_write_buffer_count ?? 0))))) ? 1 : 0)) {
                            members.m_status = ((48) & 0xff);
                            members.m_flash_mode = ((2) | 0);
                        }
                        else {
                            if ((((h_m_bits) === (8)) ? 1 : 0)) {
                                h_m_write_buffer[(members.m_byte_count ?? 0)] = data;
                            }
                            else {
                                h_m_write_buffer[(((members.m_byte_count ?? 0)) * (2))] = ((data) >>> (8));
                                h_m_write_buffer[__add_write_full(runtime, (((members.m_byte_count ?? 0)) * (2)), 1)] = data;
                            }
                            members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
                        }
                    }
                    else {
                        if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
                            let base = (((((members.m_write_buffer_start_address ?? 0)) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            let len = (((((members.m_write_buffer_count ?? 0)) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            (__L2 ? __L2(__addr_write_full(runtime, (members.m_data ?? 0), base), h_m_write_buffer, len) : runtime.macro("memcpy", __addr_write_full(runtime, (members.m_data ?? 0), base), h_m_write_buffer, len));
                            members.m_status = ((128) & 0xff);
                        }
                        else {
                            members.m_status = ((48) & 0xff);
                        }
                        members.m_flash_mode = ((2) | 0);
                    }
                    break;
                }
            case 16:
                {
                    members.m_bank = ((((data) & (255))) | 0);
                    members.m_flash_mode = ((0) | 0);
                    break;
                }
            case 20:
                {
                    if ((((((Number(((data) & (255))) === Number(240)) ? 1 : 0)) || (((Number(((data) & (255))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_fast_mode = ((0) ? 1 : 0);
                        members.m_flash_mode = ((0) | 0);
                    }
                    else {
                        0;
                    }
                    break;
                }
        }
    }
    function __add_write_full(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_write_full(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_write_full(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_delay_tick(runtime, param) {
        const members = runtime.members;
        switch ((members.m_flash_mode ?? 0)) {
            case 2:
                {
                    members.m_status = ((128) & 0xff);
                    break;
                }
            case 12:
                {
                    members.m_flash_mode = ((0) | 0);
                    members.m_status = ((128) & 0xff);
                    break;
                }
        }
    }
    function method_base(runtime) {
        const members = runtime.members;
        return __addr_base(runtime, (members.m_data ?? 0), 0);
    }
    function __addr_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_intelfsh_device__base(runtime) {
        const members = runtime.members;
        return __addr_intelfsh_device__base(runtime, (members.m_data ?? 0), 0);
    }
    function __addr_intelfsh_device__base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        return ((method_read_full(runtime, offset)) & 0xff);
    }
    function method_read_full(runtime, address) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0, __t1, __t2, __t3, __t4, __t5;
        const h_m_bits = members.m_bits ?? 0;
        const h_m_maker_id = members.m_maker_id ?? 0;
        const h_m_device_id = members.m_device_id ?? 0;
        const h_m_device_id2 = members.m_device_id2 ?? 0;
        const h_m_device_id3 = members.m_device_id3 ?? 0;
        let data = ((0) >>> 0);
        address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
        switch ((members.m_flash_mode ?? 0)) {
            default:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                data = (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[address] ?? 0) : runtime.readIndex(__t0, address))) >>> 0);
                                break;
                            }
                        case 16:
                            {
                                data = (((((((__t1 = (members.m_data ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((address) * (2))] ?? 0) : runtime.readIndex(__t1, ((address) * (2))))) << (8))) | ((__t2 = (members.m_data ?? 0), ArrayBuffer.isView(__t2) ? (__t2[__add_read_full(runtime, ((address) * (2)), 1)] ?? 0) : runtime.readIndex(__t2, __add_read_full(runtime, ((address) * (2)), 1)))))) >>> 0);
                                break;
                            }
                    }
                    break;
                }
            case 2:
            case 19:
                {
                    data = (((members.m_status ?? 0)) >>> 0);
                    break;
                }
            case 18:
                {
                    data = ((128) >>> 0);
                    break;
                }
            case 8:
                {
                    if (((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (53)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && ((((h_m_device_id) === (59)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        switch (((address) & (255))) {
                            case 0:
                                {
                                    data = ((h_m_maker_id) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    data = ((h_m_device_id) >>> 0);
                                    break;
                                }
                            case 4:
                                {
                                    data = ((0) >>> 0);
                                    break;
                                }
                        }
                    }
                    else {
                        if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
                            switch (((address) & (255))) {
                                case 0:
                                    {
                                        data = ((h_m_maker_id) >>> 0);
                                        break;
                                    }
                                case 2:
                                    {
                                        data = ((h_m_device_id) >>> 0);
                                        break;
                                    }
                                case 4:
                                    {
                                        0;
                                        break;
                                    }
                                case 6:
                                    {
                                        0;
                                        break;
                                    }
                                case 28:
                                    {
                                        data = ((h_m_device_id2) >>> 0);
                                        break;
                                    }
                                case 30:
                                    {
                                        data = ((h_m_device_id3) >>> 0);
                                        break;
                                    }
                            }
                        }
                        else {
                            if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
                                switch (address) {
                                    case 0:
                                        {
                                            data = ((((h_m_maker_id) << (8))) >>> 0);
                                            break;
                                        }
                                    case 1:
                                        {
                                            data = ((((h_m_device_id) << (8))) >>> 0);
                                            break;
                                        }
                                    case 2:
                                        {
                                            data = ((65024) >>> 0);
                                            break;
                                        }
                                    default:
                                        {
                                            if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                                0;
                                            }
                                            data = ((65024) >>> 0);
                                            break;
                                        }
                                }
                            }
                            else {
                                switch (((address) & (255))) {
                                    case 0:
                                        {
                                            data = ((h_m_maker_id) >>> 0);
                                            break;
                                        }
                                    case 1:
                                        {
                                            data = ((h_m_device_id) >>> 0);
                                            break;
                                        }
                                    case 2:
                                        {
                                            data = ((0) >>> 0);
                                            break;
                                        }
                                }
                            }
                        }
                    }
                    break;
                }
            case 1:
                {
                    if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && ((((h_m_device_id) === (22)) ? 1 : 0))) ? 1 : 0)) {
                        switch (((address) & (255))) {
                            case 0:
                                {
                                    data = ((h_m_maker_id) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    data = ((h_m_device_id) >>> 0);
                                    break;
                                }
                            case 4:
                                {
                                    data = ((0) >>> 0);
                                    break;
                                }
                        }
                    }
                    else {
                        switch (((address) & (255))) {
                            case 0:
                                {
                                    data = ((h_m_maker_id) >>> 0);
                                    break;
                                }
                            case 1:
                                {
                                    data = ((h_m_device_id) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    data = ((0) >>> 0);
                                    break;
                                }
                            case 3:
                                {
                                    if ((members.m_flash_master_lock ?? 0)) {
                                        data = ((1) >>> 0);
                                    }
                                    else {
                                        data = ((0) >>> 0);
                                    }
                                    break;
                                }
                        }
                    }
                    break;
                }
            case 12:
                {
                    if (((((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (173)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) && (((((((address) < ((members.m_erase_sector ?? 0))) ? 1 : 0)) || (((Number(address) >= Number((((members.m_erase_sector ?? 0)) + (65536)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        switch (h_m_bits) {
                            case 8:
                                {
                                    data = (((__t3 = (members.m_data ?? 0), ArrayBuffer.isView(__t3) ? (__t3[address] ?? 0) : runtime.readIndex(__t3, address))) >>> 0);
                                    break;
                                }
                            case 16:
                                {
                                    data = (((((((__t4 = (members.m_data ?? 0), ArrayBuffer.isView(__t4) ? (__t4[((address) * (2))] ?? 0) : runtime.readIndex(__t4, ((address) * (2))))) << (8))) | ((__t5 = (members.m_data ?? 0), ArrayBuffer.isView(__t5) ? (__t5[__add_read_full(runtime, ((address) * (2)), 1)] ?? 0) : runtime.readIndex(__t5, __add_read_full(runtime, ((address) * (2)), 1)))))) >>> 0);
                                    break;
                                }
                        }
                    }
                    else {
                        members.m_status = ((((members.m_status) ^ (68))) & 0xff);
                        data = (((members.m_status ?? 0)) >>> 0);
                    }
                    break;
                }
        }
        return data;
    }
    function __add_read_full(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_write_full(runtime, offset, data);
    }
    function method_read_raw(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xff);
    }
    function method_write_raw(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_data) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_data"), offset, data));
    }
    function method_intelfsh8_device__read(runtime, offset) {
        const members = runtime.members;
        return ((method_read_full(runtime, offset)) & 0xff);
    }
    function method_intelfsh8_device__write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_write_full(runtime, offset, data);
    }
    function method_intelfsh8_device__read_raw(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xff);
    }
    function method_intelfsh8_device__write_raw(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_data) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_data"), offset, data));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "is_ready": method_is_ready,
        "write_full": method_write_full,
        "delay_tick": method_delay_tick,
        "base": method_base,
        "intelfsh_device::base": method_intelfsh_device__base,
        "read": method_read,
        "read_full": method_read_full,
        "write": method_write,
        "read_raw": method_read_raw,
        "write_raw": method_write_raw,
        "intelfsh8_device::read": method_intelfsh8_device__read,
        "intelfsh8_device::write": method_intelfsh8_device__write,
        "intelfsh8_device::read_raw": method_intelfsh8_device__read_raw,
        "intelfsh8_device::write_raw": method_intelfsh8_device__write_raw
    };
    return __methodTable;
})();
definition.slot.options["sgc_1mbit"].children[0].definition.compiledMethodLinks = ["attotime::from_msec", "attotime::from_seconds", "machine", "machine().side_effects_disabled", "memcpy"];
definition.slot.options["sgc_2mbit"].compiledMethods = (() => {
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_flash.read"];
        return (((__L0 ? __L0(method_banked_address(runtime, ((32768) | (offset)))) : ((members.m_flash)?.read?.(method_banked_address(runtime, ((32768) | (offset)))) ?? 0))) & 0xff);
    }
    function method_banked_address(runtime, offset) {
        const members = runtime.members;
        if ((((offset) < (40960)) ? 1 : 0)) {
            return (((((((members.m_slot0_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
        }
        else {
            if ((((offset) < (49152)) ? 1 : 0)) {
                return (((((((members.m_slot1_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
            }
            else {
                if ((((offset) < (57344)) ? 1 : 0)) {
                    return (((((((members.m_slot2_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
                }
                else {
                    return (((((((members.m_slot3_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
                }
            }
        }
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_flash.write"];
        data = ((data) & 0xff);
        offset = ((offset) | (32768));
        let max_banks = ((runtime.divide((members.m_rom_size ?? 0), 8192)) & 0xff);
        0;
        switch (offset) {
            case 65532:
                {
                    if ((((data) < (max_banks)) ? 1 : 0)) {
                        members.m_slot1_bank = ((data) & 0xff);
                    }
                    break;
                }
            case 65533:
                {
                    if ((((data) < (max_banks)) ? 1 : 0)) {
                        members.m_slot2_bank = ((data) & 0xff);
                    }
                    break;
                }
            case 65534:
                {
                    if ((((data) < (max_banks)) ? 1 : 0)) {
                        members.m_slot3_bank = ((data) & 0xff);
                    }
                    break;
                }
            case 65535:
                {
                    members.m_flash_a16 = ((data) & 0xff);
                    break;
                }
            default:
                {
                    let addr = ((((((((members.m_flash_a16 ?? 0)) >>> (0)) & 1)) << (16))) | (method_banked_address(runtime, offset)));
                    0;
                    (__L0 ? __L0(addr, data) : ((members.m_flash)?.write?.(addr, data) ?? 0));
                    break;
                }
        }
    }
    function method_device_colecovision_cartridge_interface__read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "banked_address": method_banked_address,
        "write": method_write,
        "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
        "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
    };
    return __methodTable;
})();
definition.slot.options["sgc_2mbit"].compiledMethodLinks = ["m_flash.read", "m_flash.write"];
definition.slot.options["sgc_2mbit"].children[0].definition.compiledMethods = (() => {
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
    function method_is_ready(runtime) {
        const members = runtime.members;
        return (((((members.m_status ?? 0)) & (128))) ? (1) : (0));
    }
    function method_write_full(runtime, address, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_seconds"], __L1 = __l["attotime::from_msec"], __L2 = __l["memcpy"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16, __t17;
        const h_m_maker_id = members.m_maker_id ?? 0;
        const h_m_device_id = members.m_device_id ?? 0;
        const h_m_addrmask = members.m_addrmask ?? 0;
        const h_m_size = members.m_size ?? 0;
        const h_m_sector_is_4k = members.m_sector_is_4k ?? 0;
        const h_m_sector_is_16k = members.m_sector_is_16k ?? 0;
        const h_m_bits = members.m_bits ?? 0;
        const h_m_top_boot_sector = members.m_top_boot_sector ?? 0;
        const h_m_bot_boot_sector = members.m_bot_boot_sector ?? 0;
        const h_m_page_size = members.m_page_size ?? 0;
        const h_m_write_buffer = members.m_write_buffer ?? 0;
        address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
        switch ((members.m_flash_mode ?? 0)) {
            case 0:
            case 2:
            case 1:
            case 8:
                {
                    switch (((data) & (255))) {
                        case 240:
                        case 255:
                            {
                                members.m_flash_mode = ((0) | 0);
                                break;
                            }
                        case 144:
                            {
                                if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((((((h_m_device_id) === (8941)) ? 1 : 0)) || ((((h_m_device_id) === (8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((20) | 0);
                                }
                                else {
                                    members.m_flash_mode = ((1) | 0);
                                }
                                break;
                            }
                        case 64:
                        case 16:
                            {
                                members.m_flash_mode = ((3) | 0);
                                break;
                            }
                        case 80:
                            {
                                if ((((((((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (97)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && ((((h_m_device_id) === (32)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_flash_mode ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                                    0;
                                }
                                else {
                                    if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_flash_mode = ((14) | 0);
                                    }
                                    else {
                                        members.m_status = ((128) & 0xff);
                                        members.m_flash_mode = ((2) | 0);
                                    }
                                }
                                break;
                            }
                        case 32:
                            {
                                if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (97)) ? 1 : 0))) ? 1 : 0)) {
                                    0;
                                }
                                else {
                                    if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((((((h_m_device_id) === (8941)) ? 1 : 0)) || ((((h_m_device_id) === (8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_flash_mode = ((0) | 0);
                                        members.m_fast_mode = ((1) ? 1 : 0);
                                    }
                                    else {
                                        members.m_flash_mode = ((4) | 0);
                                    }
                                }
                                break;
                            }
                        case 96:
                            {
                                members.m_flash_mode = ((5) | 0);
                                break;
                            }
                        case 112:
                            {
                                members.m_flash_mode = ((2) | 0);
                                break;
                            }
                        case 160:
                            {
                                if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((((((h_m_device_id) === (8941)) ? 1 : 0)) || ((((h_m_device_id) === (8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((13) | 0);
                                }
                                else {
                                    0;
                                }
                                break;
                            }
                        case 170:
                            {
                                if (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) {
                                    members.m_flash_mode = ((6) | 0);
                                }
                                else {
                                    if (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) {
                                        members.m_flash_mode = ((6) | 0);
                                    }
                                }
                                break;
                            }
                        case 232:
                            {
                                if (((((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && ((((h_m_device_id) >= (20)) ? 1 : 0))) ? 1 : 0)) && ((((h_m_device_id) <= (22)) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((18) | 0);
                                }
                                else {
                                    0;
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
            case 6:
                {
                    if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((7) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((7) | 0);
                        }
                        else {
                            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((7) | 0);
                            }
                            else {
                                if (((((((((Number(((address) & (h_m_addrmask))) === Number(((43690) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                    members.m_flash_mode = ((7) | 0);
                                }
                                else {
                                    0;
                                    members.m_flash_mode = ((0) | 0);
                                }
                            }
                        }
                    }
                    break;
                }
            case 7:
                {
                    if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((8) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((8) | 0);
                        }
                        else {
                            if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((8) | 0);
                            }
                            else {
                                if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((9) | 0);
                                }
                                else {
                                    if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_flash_mode = ((9) | 0);
                                    }
                                    else {
                                        if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                                            members.m_flash_mode = ((9) | 0);
                                        }
                                        else {
                                            if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                                members.m_flash_mode = ((13) | 0);
                                            }
                                            else {
                                                if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                                    if ((((((Number(h_m_maker_id) === Number(31)) ? 1 : 0)) && (((((((h_m_device_id) === (213)) ? 1 : 0)) || ((((h_m_device_id) === (218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                                        members.m_sdp = ((1) ? 1 : 0);
                                                        members.m_flash_mode = ((17) | 0);
                                                        members.m_byte_count = ((0) & 0xffff);
                                                    }
                                                    else {
                                                        if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
                                                            0;
                                                            members.m_byte_count = ((0) & 0xffff);
                                                            members.m_flash_mode = ((21) | 0);
                                                        }
                                                        else {
                                                            members.m_flash_mode = ((13) | 0);
                                                        }
                                                    }
                                                }
                                                else {
                                                    if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                                        members.m_flash_mode = ((13) | 0);
                                                    }
                                                    else {
                                                        if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                                            members.m_flash_mode = ((0) | 0);
                                                        }
                                                        else {
                                                            if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                                                members.m_flash_mode = ((0) | 0);
                                                            }
                                                            else {
                                                                if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                                                    members.m_flash_mode = ((0) | 0);
                                                                }
                                                                else {
                                                                    if ((((((((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(176)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(98)) ? 1 : 0))) ? 1 : 0)) && ((((h_m_device_id) === (19)) ? 1 : 0))) ? 1 : 0)) {
                                                                        members.m_flash_mode = ((16) | 0);
                                                                    }
                                                                    else {
                                                                        if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                            members.m_flash_mode = ((9) | 0);
                                                                        }
                                                                        else {
                                                                            if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                                members.m_flash_mode = ((8) | 0);
                                                                            }
                                                                            else {
                                                                                if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                                    members.m_flash_mode = ((13) | 0);
                                                                                }
                                                                                else {
                                                                                    if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                                        members.m_flash_mode = ((0) | 0);
                                                                                    }
                                                                                    else {
                                                                                        if (((((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) || (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
                                                                                            members.m_flash_mode = ((0) | 0);
                                                                                            members.m_fast_mode = ((1) ? 1 : 0);
                                                                                        }
                                                                                        else {
                                                                                            0;
                                                                                            members.m_flash_mode = ((0) | 0);
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
                        }
                    }
                    break;
                }
            case 9:
                {
                    if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((10) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((10) | 0);
                        }
                        else {
                            0;
                        }
                    }
                    break;
                }
            case 10:
                {
                    if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((11) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((11) | 0);
                        }
                        else {
                            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((11) | 0);
                            }
                            else {
                                if (((((((((Number(((address) & (h_m_addrmask))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                    members.m_flash_mode = ((11) | 0);
                                }
                                else {
                                    0;
                                }
                            }
                        }
                    }
                    break;
                }
            case 11:
                {
                    if (((((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (64)) ? 1 : 0))) ? 1 : 0)) {
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), 0), 255, 237568);
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), 245760), 255, 16384);
                        }
                        else {
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), 0), 255, h_m_size);
                        }
                        members.m_status = ((8) & 0xff);
                        members.m_flash_mode = ((12) | 0);
                        if (h_m_sector_is_4k) {
                            (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                        }
                        else {
                            if (h_m_sector_is_16k) {
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(4) : runtime.macro("attotime::from_seconds", 4))) ?? 0);
                            }
                            else {
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(16) : runtime.macro("attotime::from_seconds", 16))) ?? 0);
                            }
                        }
                    }
                    else {
                        if (((Number(((data) & (255))) === Number(48)) ? 1 : 0)) {
                            let base = ((((address) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            if (h_m_sector_is_4k) {
                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-4096))), 255, 4096);
                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-2048) : (-4096))))) | 0);
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(125) : runtime.macro("attotime::from_msec", 125))) ?? 0);
                            }
                            else {
                                if (h_m_sector_is_16k) {
                                    cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-16384))), 255, 16384);
                                    members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                                    (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                }
                                else {
                                    if ((((h_m_top_boot_sector) && (((Number(address) >= Number(((h_m_size) - (65536)))) ? 1 : 0))) ? 1 : 0)) {
                                        if (((Number(address) >= Number(((h_m_size) - (16384)))) ? 1 : 0)) {
                                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-16384))), 255, 16384);
                                            members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                                            (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                        }
                                        else {
                                            if (((Number(address) >= Number(((h_m_size) - (32768)))) ? 1 : 0)) {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-8192))), 255, 8192);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                                            }
                                            else {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-32768))), 255, 32768);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                            }
                                        }
                                    }
                                    else {
                                        if ((((h_m_bot_boot_sector) && (((Number(address) < Number(65536)) ? 1 : 0))) ? 1 : 0)) {
                                            if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-8192))), 255, 8192);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                                            }
                                            else {
                                                if (((Number(address) < Number(16384)) ? 1 : 0)) {
                                                    cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-16384))), 255, 16384);
                                                    members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                                                    (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                                }
                                                else {
                                                    if (((Number(address) < Number(32768)) ? 1 : 0)) {
                                                        cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-8192))), 255, 8192);
                                                        members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                                                        (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                                                    }
                                                    else {
                                                        cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-32768))), 255, 32768);
                                                        members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                                                        (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (64)) ? 1 : 0))) ? 1 : 0)) {
                                                let sectors = [65536, 65536, 65536, 32768, 8192, 8192, 16384];
                                                let sec_num = ((0) >>> 0);
                                                let toffset = ((base) >>> 0);
                                                while (((Number(toffset) >= Number((sectors[sec_num] ?? 0))) ? 1 : 0)) {
                                                    toffset = ((((toffset) - ((sectors[(__t0 = sec_num, sec_num = ((((sec_num) + (1))) >>> 0), __t0)] ?? 0)))) >>> 0);
                                                }
                                                let sec_len = (((sectors[sec_num] ?? 0)) >>> 0);
                                                if ((((sec_num) !== (5)) ? 1 : 0)) {
                                                    cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & ((~((sec_len) - (1)))))), 255, sec_len);
                                                }
                                                members.m_erase_sector = ((((address) & ((~((sec_len) - (1)))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                                            }
                                            else {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-65536))), 255, 65536);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-32768) : (-65536))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                                            }
                                        }
                                    }
                                }
                            }
                            members.m_status = ((8) & 0xff);
                            members.m_flash_mode = ((12) | 0);
                        }
                        else {
                            if (((((((((Number(((data) & (255))) === Number(32)) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(31)) ? 1 : 0))) ? 1 : 0)) && (((((((h_m_device_id) === (213)) ? 1 : 0)) || ((((h_m_device_id) === (218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                members.m_sdp = ((0) ? 1 : 0);
                                members.m_flash_mode = ((17) | 0);
                                members.m_byte_count = ((0) & 0xffff);
                            }
                            else {
                                if (((((((((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(96)) ? 1 : 0))) ? 1 : 0)) && (((Number(((address) & (65535))) === Number(21845)) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((8) | 0);
                                    0;
                                }
                                else {
                                    0;
                                }
                            }
                        }
                    }
                    break;
                }
            case 13:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (64)) ? 1 : 0))) ? 1 : 0)) {
                                    if (((((((address) < (237568)) ? 1 : 0)) || ((((address) >= (245760)) ? 1 : 0))) ? 1 : 0)) {
                                        runtime.writeIndex(runtime.writableMember("m_data"), address, ((runtime.readIndex(runtime.writableMember("m_data"), address)) & (data)));
                                    }
                                }
                                else {
                                    ((__t1 = members.m_data) && ArrayBuffer.isView(__t1) ? (__t1[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                }
                                break;
                            }
                        case 16:
                            {
                                ((__t2 = members.m_data) && ArrayBuffer.isView(__t2) ? (__t2[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t3 = members.m_data) && ArrayBuffer.isView(__t3) ? (__t3[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((0) | 0);
                    break;
                }
            case 14:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                ((__t4 = members.m_data) && ArrayBuffer.isView(__t4) ? (__t4[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                break;
                            }
                        case 16:
                            {
                                0;
                                ((__t5 = members.m_data) && ArrayBuffer.isView(__t5) ? (__t5[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t6 = members.m_data) && ArrayBuffer.isView(__t6) ? (__t6[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((15) | 0);
                    break;
                }
            case 15:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                ((__t7 = members.m_data) && ArrayBuffer.isView(__t7) ? (__t7[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                break;
                            }
                        case 16:
                            {
                                0;
                                ((__t8 = members.m_data) && ArrayBuffer.isView(__t8) ? (__t8[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t9 = members.m_data) && ArrayBuffer.isView(__t9) ? (__t9[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((0) | 0);
                    break;
                }
            case 3:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                ((__t10 = members.m_data) && ArrayBuffer.isView(__t10) ? (__t10[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                break;
                            }
                        case 16:
                            {
                                ((__t11 = members.m_data) && ArrayBuffer.isView(__t11) ? (__t11[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t12 = members.m_data) && ArrayBuffer.isView(__t12) ? (__t12[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_status = ((128) & 0xff);
                    if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (4)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((0) | 0);
                    }
                    else {
                        members.m_flash_mode = ((2) | 0);
                    }
                    break;
                }
            case 17:
                {
                    if ((((((((((((((members.m_byte_count ?? 0)) === (0)) ? 1 : 0)) && ((((members.m_sdp ?? 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((6) | 0);
                    }
                    else {
                        switch (h_m_bits) {
                            case 8:
                                {
                                    ((__t13 = members.m_data) && ArrayBuffer.isView(__t13) ? (__t13[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                    break;
                                }
                            case 16:
                                {
                                    ((__t14 = members.m_data) && ArrayBuffer.isView(__t14) ? (__t14[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                    ((__t15 = members.m_data) && ArrayBuffer.isView(__t15) ? (__t15[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                    break;
                                }
                            default:
                                {
                                    0;
                                    break;
                                }
                        }
                        members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
                        if (((((members.m_byte_count ?? 0)) === (h_m_page_size)) ? 1 : 0)) {
                            if ((members.m_sdp ?? 0)) {
                                members.m_flash_mode = ((0) | 0);
                            }
                            members.m_byte_count = ((0) & 0xffff);
                        }
                    }
                    break;
                }
            case 21:
                {
                    if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((0) | 0);
                    }
                    else {
                        ((__t16 = members.m_data) && ArrayBuffer.isView(__t16) ? (__t16[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                        ((__t17 = members.m_data) && ArrayBuffer.isView(__t17) ? (__t17[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                        members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
                        if (((((members.m_byte_count ?? 0)) === (h_m_page_size)) ? 1 : 0)) {
                            members.m_flash_mode = ((0) | 0);
                            members.m_sdp = ((0) ? 1 : 0);
                            members.m_byte_count = ((0) & 0xffff);
                        }
                    }
                    break;
                }
            case 4:
                {
                    if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
                        if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (4)) ? 1 : 0))) ? 1 : 0)) {
                            let base = ((((address) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-256))), 255, 256);
                            (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(4) : runtime.macro("attotime::from_msec", 4))) ?? 0);
                        }
                        else {
                            if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && ((((h_m_device_id) === (17521)) ? 1 : 0))) ? 1 : 0)) {
                                let base = ((((((address) & (262143))) * (2))) >>> 0);
                                let size = ((0) | 0);
                                let duration = ((0) | 0);
                                if ((((base) < (16384)) ? 1 : 0)) {
                                    base = ((0) >>> 0);
                                    size = ((16384) | 0);
                                    duration = ((300) | 0);
                                }
                                else {
                                    if ((((base) < (32768)) ? 1 : 0)) {
                                        base = ((((base) & (24576))) >>> 0);
                                        size = ((8192) | 0);
                                        duration = ((300) | 0);
                                    }
                                    else {
                                        if ((((base) < (131072)) ? 1 : 0)) {
                                            base = ((32768) >>> 0);
                                            size = ((98304) | 0);
                                            duration = ((600) | 0);
                                        }
                                        else {
                                            base = ((((base) & (393216))) >>> 0);
                                            size = ((131072) | 0);
                                            duration = ((600) | 0);
                                        }
                                    }
                                }
                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), base), 255, size);
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(duration) : runtime.macro("attotime::from_msec", duration))) ?? 0);
                            }
                            else {
                                let base = ((((address) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-65536))), 255, 65536);
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                            }
                        }
                        members.m_status = ((0) & 0xff);
                        members.m_flash_mode = ((2) | 0);
                        break;
                    }
                    else {
                        0;
                    }
                    break;
                }
            case 5:
                {
                    switch (((data) & (255))) {
                        case 241:
                            {
                                members.m_flash_master_lock = ((1) ? 1 : 0);
                                break;
                            }
                        case 208:
                            {
                                members.m_flash_master_lock = ((0) ? 1 : 0);
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((2) | 0);
                    break;
                }
            case 18:
                {
                    if ((((h_m_bits) === (16)) ? 1 : 0)) {
                        members.m_write_buffer_count = ((__add_write_full(runtime, cppMin(+(data), +(15)), 1)) >>> 0);
                    }
                    else {
                        members.m_write_buffer_count = ((__add_write_full(runtime, cppMin(+(data), +(31)), 1)) >>> 0);
                    }
                    members.m_status = ((128) & 0xff);
                    members.m_flash_mode = ((19) | 0);
                    members.m_byte_count = ((0) & 0xffff);
                    break;
                }
            case 19:
                {
                    if (((((members.m_byte_count ?? 0)) < ((members.m_write_buffer_count ?? 0))) ? 1 : 0)) {
                        if (((((members.m_byte_count ?? 0)) === (0)) ? 1 : 0)) {
                            members.m_write_buffer_start_address = ((address) >>> 0);
                        }
                        if (((Number(address) >= Number((((members.m_write_buffer_start_address ?? 0)) + ((members.m_write_buffer_count ?? 0))))) ? 1 : 0)) {
                            members.m_status = ((48) & 0xff);
                            members.m_flash_mode = ((2) | 0);
                        }
                        else {
                            if ((((h_m_bits) === (8)) ? 1 : 0)) {
                                h_m_write_buffer[(members.m_byte_count ?? 0)] = data;
                            }
                            else {
                                h_m_write_buffer[(((members.m_byte_count ?? 0)) * (2))] = ((data) >>> (8));
                                h_m_write_buffer[__add_write_full(runtime, (((members.m_byte_count ?? 0)) * (2)), 1)] = data;
                            }
                            members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
                        }
                    }
                    else {
                        if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
                            let base = (((((members.m_write_buffer_start_address ?? 0)) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            let len = (((((members.m_write_buffer_count ?? 0)) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            (__L2 ? __L2(__addr_write_full(runtime, (members.m_data ?? 0), base), h_m_write_buffer, len) : runtime.macro("memcpy", __addr_write_full(runtime, (members.m_data ?? 0), base), h_m_write_buffer, len));
                            members.m_status = ((128) & 0xff);
                        }
                        else {
                            members.m_status = ((48) & 0xff);
                        }
                        members.m_flash_mode = ((2) | 0);
                    }
                    break;
                }
            case 16:
                {
                    members.m_bank = ((((data) & (255))) | 0);
                    members.m_flash_mode = ((0) | 0);
                    break;
                }
            case 20:
                {
                    if ((((((Number(((data) & (255))) === Number(240)) ? 1 : 0)) || (((Number(((data) & (255))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_fast_mode = ((0) ? 1 : 0);
                        members.m_flash_mode = ((0) | 0);
                    }
                    else {
                        0;
                    }
                    break;
                }
        }
    }
    function __add_write_full(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_write_full(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_write_full(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_delay_tick(runtime, param) {
        const members = runtime.members;
        switch ((members.m_flash_mode ?? 0)) {
            case 2:
                {
                    members.m_status = ((128) & 0xff);
                    break;
                }
            case 12:
                {
                    members.m_flash_mode = ((0) | 0);
                    members.m_status = ((128) & 0xff);
                    break;
                }
        }
    }
    function method_base(runtime) {
        const members = runtime.members;
        return __addr_base(runtime, (members.m_data ?? 0), 0);
    }
    function __addr_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_intelfsh_device__base(runtime) {
        const members = runtime.members;
        return __addr_intelfsh_device__base(runtime, (members.m_data ?? 0), 0);
    }
    function __addr_intelfsh_device__base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        return ((method_read_full(runtime, offset)) & 0xff);
    }
    function method_read_full(runtime, address) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0, __t1, __t2, __t3, __t4, __t5;
        const h_m_bits = members.m_bits ?? 0;
        const h_m_maker_id = members.m_maker_id ?? 0;
        const h_m_device_id = members.m_device_id ?? 0;
        const h_m_device_id2 = members.m_device_id2 ?? 0;
        const h_m_device_id3 = members.m_device_id3 ?? 0;
        let data = ((0) >>> 0);
        address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
        switch ((members.m_flash_mode ?? 0)) {
            default:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                data = (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[address] ?? 0) : runtime.readIndex(__t0, address))) >>> 0);
                                break;
                            }
                        case 16:
                            {
                                data = (((((((__t1 = (members.m_data ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((address) * (2))] ?? 0) : runtime.readIndex(__t1, ((address) * (2))))) << (8))) | ((__t2 = (members.m_data ?? 0), ArrayBuffer.isView(__t2) ? (__t2[__add_read_full(runtime, ((address) * (2)), 1)] ?? 0) : runtime.readIndex(__t2, __add_read_full(runtime, ((address) * (2)), 1)))))) >>> 0);
                                break;
                            }
                    }
                    break;
                }
            case 2:
            case 19:
                {
                    data = (((members.m_status ?? 0)) >>> 0);
                    break;
                }
            case 18:
                {
                    data = ((128) >>> 0);
                    break;
                }
            case 8:
                {
                    if (((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (53)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && ((((h_m_device_id) === (59)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        switch (((address) & (255))) {
                            case 0:
                                {
                                    data = ((h_m_maker_id) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    data = ((h_m_device_id) >>> 0);
                                    break;
                                }
                            case 4:
                                {
                                    data = ((0) >>> 0);
                                    break;
                                }
                        }
                    }
                    else {
                        if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
                            switch (((address) & (255))) {
                                case 0:
                                    {
                                        data = ((h_m_maker_id) >>> 0);
                                        break;
                                    }
                                case 2:
                                    {
                                        data = ((h_m_device_id) >>> 0);
                                        break;
                                    }
                                case 4:
                                    {
                                        0;
                                        break;
                                    }
                                case 6:
                                    {
                                        0;
                                        break;
                                    }
                                case 28:
                                    {
                                        data = ((h_m_device_id2) >>> 0);
                                        break;
                                    }
                                case 30:
                                    {
                                        data = ((h_m_device_id3) >>> 0);
                                        break;
                                    }
                            }
                        }
                        else {
                            if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
                                switch (address) {
                                    case 0:
                                        {
                                            data = ((((h_m_maker_id) << (8))) >>> 0);
                                            break;
                                        }
                                    case 1:
                                        {
                                            data = ((((h_m_device_id) << (8))) >>> 0);
                                            break;
                                        }
                                    case 2:
                                        {
                                            data = ((65024) >>> 0);
                                            break;
                                        }
                                    default:
                                        {
                                            if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                                0;
                                            }
                                            data = ((65024) >>> 0);
                                            break;
                                        }
                                }
                            }
                            else {
                                switch (((address) & (255))) {
                                    case 0:
                                        {
                                            data = ((h_m_maker_id) >>> 0);
                                            break;
                                        }
                                    case 1:
                                        {
                                            data = ((h_m_device_id) >>> 0);
                                            break;
                                        }
                                    case 2:
                                        {
                                            data = ((0) >>> 0);
                                            break;
                                        }
                                }
                            }
                        }
                    }
                    break;
                }
            case 1:
                {
                    if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && ((((h_m_device_id) === (22)) ? 1 : 0))) ? 1 : 0)) {
                        switch (((address) & (255))) {
                            case 0:
                                {
                                    data = ((h_m_maker_id) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    data = ((h_m_device_id) >>> 0);
                                    break;
                                }
                            case 4:
                                {
                                    data = ((0) >>> 0);
                                    break;
                                }
                        }
                    }
                    else {
                        switch (((address) & (255))) {
                            case 0:
                                {
                                    data = ((h_m_maker_id) >>> 0);
                                    break;
                                }
                            case 1:
                                {
                                    data = ((h_m_device_id) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    data = ((0) >>> 0);
                                    break;
                                }
                            case 3:
                                {
                                    if ((members.m_flash_master_lock ?? 0)) {
                                        data = ((1) >>> 0);
                                    }
                                    else {
                                        data = ((0) >>> 0);
                                    }
                                    break;
                                }
                        }
                    }
                    break;
                }
            case 12:
                {
                    if (((((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (173)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) && (((((((address) < ((members.m_erase_sector ?? 0))) ? 1 : 0)) || (((Number(address) >= Number((((members.m_erase_sector ?? 0)) + (65536)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        switch (h_m_bits) {
                            case 8:
                                {
                                    data = (((__t3 = (members.m_data ?? 0), ArrayBuffer.isView(__t3) ? (__t3[address] ?? 0) : runtime.readIndex(__t3, address))) >>> 0);
                                    break;
                                }
                            case 16:
                                {
                                    data = (((((((__t4 = (members.m_data ?? 0), ArrayBuffer.isView(__t4) ? (__t4[((address) * (2))] ?? 0) : runtime.readIndex(__t4, ((address) * (2))))) << (8))) | ((__t5 = (members.m_data ?? 0), ArrayBuffer.isView(__t5) ? (__t5[__add_read_full(runtime, ((address) * (2)), 1)] ?? 0) : runtime.readIndex(__t5, __add_read_full(runtime, ((address) * (2)), 1)))))) >>> 0);
                                    break;
                                }
                        }
                    }
                    else {
                        members.m_status = ((((members.m_status) ^ (68))) & 0xff);
                        data = (((members.m_status ?? 0)) >>> 0);
                    }
                    break;
                }
        }
        return data;
    }
    function __add_read_full(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_write_full(runtime, offset, data);
    }
    function method_read_raw(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xff);
    }
    function method_write_raw(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_data) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_data"), offset, data));
    }
    function method_intelfsh8_device__read(runtime, offset) {
        const members = runtime.members;
        return ((method_read_full(runtime, offset)) & 0xff);
    }
    function method_intelfsh8_device__write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_write_full(runtime, offset, data);
    }
    function method_intelfsh8_device__read_raw(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xff);
    }
    function method_intelfsh8_device__write_raw(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_data) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_data"), offset, data));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "is_ready": method_is_ready,
        "write_full": method_write_full,
        "delay_tick": method_delay_tick,
        "base": method_base,
        "intelfsh_device::base": method_intelfsh_device__base,
        "read": method_read,
        "read_full": method_read_full,
        "write": method_write,
        "read_raw": method_read_raw,
        "write_raw": method_write_raw,
        "intelfsh8_device::read": method_intelfsh8_device__read,
        "intelfsh8_device::write": method_intelfsh8_device__write,
        "intelfsh8_device::read_raw": method_intelfsh8_device__read_raw,
        "intelfsh8_device::write_raw": method_intelfsh8_device__write_raw
    };
    return __methodTable;
})();
definition.slot.options["sgc_2mbit"].children[0].definition.compiledMethodLinks = ["attotime::from_msec", "attotime::from_seconds", "machine", "machine().side_effects_disabled", "memcpy"];
definition.slot.options["sgc_4mbit"].compiledMethods = (() => {
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_flash.read"];
        return (((__L0 ? __L0(method_banked_address(runtime, ((32768) | (offset)))) : ((members.m_flash)?.read?.(method_banked_address(runtime, ((32768) | (offset)))) ?? 0))) & 0xff);
    }
    function method_banked_address(runtime, offset) {
        const members = runtime.members;
        if ((((offset) < (40960)) ? 1 : 0)) {
            return (((((((members.m_slot0_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
        }
        else {
            if ((((offset) < (49152)) ? 1 : 0)) {
                return (((((((members.m_slot1_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
            }
            else {
                if ((((offset) < (57344)) ? 1 : 0)) {
                    return (((((((members.m_slot2_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
                }
                else {
                    return (((((((members.m_slot3_bank ?? 0)) << (13))) | (((offset) & (8191))))) >>> 0);
                }
            }
        }
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_flash.write"];
        data = ((data) & 0xff);
        offset = ((offset) | (32768));
        let max_banks = ((runtime.divide((members.m_rom_size ?? 0), 8192)) & 0xff);
        0;
        switch (offset) {
            case 65532:
                {
                    if ((((data) < (max_banks)) ? 1 : 0)) {
                        members.m_slot1_bank = ((data) & 0xff);
                    }
                    break;
                }
            case 65533:
                {
                    if ((((data) < (max_banks)) ? 1 : 0)) {
                        members.m_slot2_bank = ((data) & 0xff);
                    }
                    break;
                }
            case 65534:
                {
                    if ((((data) < (max_banks)) ? 1 : 0)) {
                        members.m_slot3_bank = ((data) & 0xff);
                    }
                    break;
                }
            case 65535:
                {
                    members.m_flash_a16 = ((data) & 0xff);
                    break;
                }
            default:
                {
                    let addr = ((((((((members.m_flash_a16 ?? 0)) >>> (0)) & 1)) << (16))) | (method_banked_address(runtime, offset)));
                    0;
                    (__L0 ? __L0(addr, data) : ((members.m_flash)?.write?.(addr, data) ?? 0));
                    break;
                }
        }
    }
    function method_device_colecovision_cartridge_interface__read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "banked_address": method_banked_address,
        "write": method_write,
        "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
        "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
    };
    return __methodTable;
})();
definition.slot.options["sgc_4mbit"].compiledMethodLinks = ["m_flash.read", "m_flash.write"];
definition.slot.options["sgc_4mbit"].children[0].definition.compiledMethods = (() => {
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
    function method_is_ready(runtime) {
        const members = runtime.members;
        return (((((members.m_status ?? 0)) & (128))) ? (1) : (0));
    }
    function method_write_full(runtime, address, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime::from_seconds"], __L1 = __l["attotime::from_msec"], __L2 = __l["memcpy"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16, __t17;
        const h_m_maker_id = members.m_maker_id ?? 0;
        const h_m_device_id = members.m_device_id ?? 0;
        const h_m_addrmask = members.m_addrmask ?? 0;
        const h_m_size = members.m_size ?? 0;
        const h_m_sector_is_4k = members.m_sector_is_4k ?? 0;
        const h_m_sector_is_16k = members.m_sector_is_16k ?? 0;
        const h_m_bits = members.m_bits ?? 0;
        const h_m_top_boot_sector = members.m_top_boot_sector ?? 0;
        const h_m_bot_boot_sector = members.m_bot_boot_sector ?? 0;
        const h_m_page_size = members.m_page_size ?? 0;
        const h_m_write_buffer = members.m_write_buffer ?? 0;
        address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
        switch ((members.m_flash_mode ?? 0)) {
            case 0:
            case 2:
            case 1:
            case 8:
                {
                    switch (((data) & (255))) {
                        case 240:
                        case 255:
                            {
                                members.m_flash_mode = ((0) | 0);
                                break;
                            }
                        case 144:
                            {
                                if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((((((h_m_device_id) === (8941)) ? 1 : 0)) || ((((h_m_device_id) === (8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((20) | 0);
                                }
                                else {
                                    members.m_flash_mode = ((1) | 0);
                                }
                                break;
                            }
                        case 64:
                        case 16:
                            {
                                members.m_flash_mode = ((3) | 0);
                                break;
                            }
                        case 80:
                            {
                                if ((((((((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (97)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && ((((h_m_device_id) === (32)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_flash_mode ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                                    0;
                                }
                                else {
                                    if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_flash_mode = ((14) | 0);
                                    }
                                    else {
                                        members.m_status = ((128) & 0xff);
                                        members.m_flash_mode = ((2) | 0);
                                    }
                                }
                                break;
                            }
                        case 32:
                            {
                                if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (97)) ? 1 : 0))) ? 1 : 0)) {
                                    0;
                                }
                                else {
                                    if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((((((h_m_device_id) === (8941)) ? 1 : 0)) || ((((h_m_device_id) === (8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_flash_mode = ((0) | 0);
                                        members.m_fast_mode = ((1) ? 1 : 0);
                                    }
                                    else {
                                        members.m_flash_mode = ((4) | 0);
                                    }
                                }
                                break;
                            }
                        case 96:
                            {
                                members.m_flash_mode = ((5) | 0);
                                break;
                            }
                        case 112:
                            {
                                members.m_flash_mode = ((2) | 0);
                                break;
                            }
                        case 160:
                            {
                                if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((((((h_m_device_id) === (8941)) ? 1 : 0)) || ((((h_m_device_id) === (8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((13) | 0);
                                }
                                else {
                                    0;
                                }
                                break;
                            }
                        case 170:
                            {
                                if (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) {
                                    members.m_flash_mode = ((6) | 0);
                                }
                                else {
                                    if (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) {
                                        members.m_flash_mode = ((6) | 0);
                                    }
                                }
                                break;
                            }
                        case 232:
                            {
                                if (((((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && ((((h_m_device_id) >= (20)) ? 1 : 0))) ? 1 : 0)) && ((((h_m_device_id) <= (22)) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((18) | 0);
                                }
                                else {
                                    0;
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
            case 6:
                {
                    if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((7) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((7) | 0);
                        }
                        else {
                            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((7) | 0);
                            }
                            else {
                                if (((((((((Number(((address) & (h_m_addrmask))) === Number(((43690) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                    members.m_flash_mode = ((7) | 0);
                                }
                                else {
                                    0;
                                    members.m_flash_mode = ((0) | 0);
                                }
                            }
                        }
                    }
                    break;
                }
            case 7:
                {
                    if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((8) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((8) | 0);
                        }
                        else {
                            if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((8) | 0);
                            }
                            else {
                                if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((9) | 0);
                                }
                                else {
                                    if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                                        members.m_flash_mode = ((9) | 0);
                                    }
                                    else {
                                        if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                                            members.m_flash_mode = ((9) | 0);
                                        }
                                        else {
                                            if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                                members.m_flash_mode = ((13) | 0);
                                            }
                                            else {
                                                if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                                    if ((((((Number(h_m_maker_id) === Number(31)) ? 1 : 0)) && (((((((h_m_device_id) === (213)) ? 1 : 0)) || ((((h_m_device_id) === (218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                                        members.m_sdp = ((1) ? 1 : 0);
                                                        members.m_flash_mode = ((17) | 0);
                                                        members.m_byte_count = ((0) & 0xffff);
                                                    }
                                                    else {
                                                        if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
                                                            0;
                                                            members.m_byte_count = ((0) & 0xffff);
                                                            members.m_flash_mode = ((21) | 0);
                                                        }
                                                        else {
                                                            members.m_flash_mode = ((13) | 0);
                                                        }
                                                    }
                                                }
                                                else {
                                                    if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                                        members.m_flash_mode = ((13) | 0);
                                                    }
                                                    else {
                                                        if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                                            members.m_flash_mode = ((0) | 0);
                                                        }
                                                        else {
                                                            if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                                                members.m_flash_mode = ((0) | 0);
                                                            }
                                                            else {
                                                                if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                                                    members.m_flash_mode = ((0) | 0);
                                                                }
                                                                else {
                                                                    if ((((((((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(176)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(98)) ? 1 : 0))) ? 1 : 0)) && ((((h_m_device_id) === (19)) ? 1 : 0))) ? 1 : 0)) {
                                                                        members.m_flash_mode = ((16) | 0);
                                                                    }
                                                                    else {
                                                                        if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                            members.m_flash_mode = ((9) | 0);
                                                                        }
                                                                        else {
                                                                            if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                                members.m_flash_mode = ((8) | 0);
                                                                            }
                                                                            else {
                                                                                if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                                    members.m_flash_mode = ((13) | 0);
                                                                                }
                                                                                else {
                                                                                    if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                                                                        members.m_flash_mode = ((0) | 0);
                                                                                    }
                                                                                    else {
                                                                                        if (((((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) || (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
                                                                                            members.m_flash_mode = ((0) | 0);
                                                                                            members.m_fast_mode = ((1) ? 1 : 0);
                                                                                        }
                                                                                        else {
                                                                                            0;
                                                                                            members.m_flash_mode = ((0) | 0);
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
                        }
                    }
                    break;
                }
            case 9:
                {
                    if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((10) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((10) | 0);
                        }
                        else {
                            0;
                        }
                    }
                    break;
                }
            case 10:
                {
                    if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((11) | 0);
                    }
                    else {
                        if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((11) | 0);
                        }
                        else {
                            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((11) | 0);
                            }
                            else {
                                if (((((((((Number(((address) & (h_m_addrmask))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                    members.m_flash_mode = ((11) | 0);
                                }
                                else {
                                    0;
                                }
                            }
                        }
                    }
                    break;
                }
            case 11:
                {
                    if (((((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (64)) ? 1 : 0))) ? 1 : 0)) {
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), 0), 255, 237568);
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), 245760), 255, 16384);
                        }
                        else {
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), 0), 255, h_m_size);
                        }
                        members.m_status = ((8) & 0xff);
                        members.m_flash_mode = ((12) | 0);
                        if (h_m_sector_is_4k) {
                            (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                        }
                        else {
                            if (h_m_sector_is_16k) {
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(4) : runtime.macro("attotime::from_seconds", 4))) ?? 0);
                            }
                            else {
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(16) : runtime.macro("attotime::from_seconds", 16))) ?? 0);
                            }
                        }
                    }
                    else {
                        if (((Number(((data) & (255))) === Number(48)) ? 1 : 0)) {
                            let base = ((((address) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            if (h_m_sector_is_4k) {
                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-4096))), 255, 4096);
                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-2048) : (-4096))))) | 0);
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(125) : runtime.macro("attotime::from_msec", 125))) ?? 0);
                            }
                            else {
                                if (h_m_sector_is_16k) {
                                    cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-16384))), 255, 16384);
                                    members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                                    (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                }
                                else {
                                    if ((((h_m_top_boot_sector) && (((Number(address) >= Number(((h_m_size) - (65536)))) ? 1 : 0))) ? 1 : 0)) {
                                        if (((Number(address) >= Number(((h_m_size) - (16384)))) ? 1 : 0)) {
                                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-16384))), 255, 16384);
                                            members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                                            (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                        }
                                        else {
                                            if (((Number(address) >= Number(((h_m_size) - (32768)))) ? 1 : 0)) {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-8192))), 255, 8192);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                                            }
                                            else {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-32768))), 255, 32768);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                            }
                                        }
                                    }
                                    else {
                                        if ((((h_m_bot_boot_sector) && (((Number(address) < Number(65536)) ? 1 : 0))) ? 1 : 0)) {
                                            if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-8192))), 255, 8192);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                                            }
                                            else {
                                                if (((Number(address) < Number(16384)) ? 1 : 0)) {
                                                    cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-16384))), 255, 16384);
                                                    members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                                                    (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                                }
                                                else {
                                                    if (((Number(address) < Number(32768)) ? 1 : 0)) {
                                                        cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-8192))), 255, 8192);
                                                        members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                                                        (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                                                    }
                                                    else {
                                                        cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-32768))), 255, 32768);
                                                        members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                                                        (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (64)) ? 1 : 0))) ? 1 : 0)) {
                                                let sectors = [65536, 65536, 65536, 32768, 8192, 8192, 16384];
                                                let sec_num = ((0) >>> 0);
                                                let toffset = ((base) >>> 0);
                                                while (((Number(toffset) >= Number((sectors[sec_num] ?? 0))) ? 1 : 0)) {
                                                    toffset = ((((toffset) - ((sectors[(__t0 = sec_num, sec_num = ((((sec_num) + (1))) >>> 0), __t0)] ?? 0)))) >>> 0);
                                                }
                                                let sec_len = (((sectors[sec_num] ?? 0)) >>> 0);
                                                if ((((sec_num) !== (5)) ? 1 : 0)) {
                                                    cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & ((~((sec_len) - (1)))))), 255, sec_len);
                                                }
                                                members.m_erase_sector = ((((address) & ((~((sec_len) - (1)))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                                            }
                                            else {
                                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-65536))), 255, 65536);
                                                members.m_erase_sector = ((((address) & ((((((h_m_bits) === (16)) ? 1 : 0)) ? (-32768) : (-65536))))) | 0);
                                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                                            }
                                        }
                                    }
                                }
                            }
                            members.m_status = ((8) & 0xff);
                            members.m_flash_mode = ((12) | 0);
                        }
                        else {
                            if (((((((((Number(((data) & (255))) === Number(32)) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(31)) ? 1 : 0))) ? 1 : 0)) && (((((((h_m_device_id) === (213)) ? 1 : 0)) || ((((h_m_device_id) === (218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                members.m_sdp = ((0) ? 1 : 0);
                                members.m_flash_mode = ((17) | 0);
                                members.m_byte_count = ((0) & 0xffff);
                            }
                            else {
                                if (((((((((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(96)) ? 1 : 0))) ? 1 : 0)) && (((Number(((address) & (65535))) === Number(21845)) ? 1 : 0))) ? 1 : 0)) {
                                    members.m_flash_mode = ((8) | 0);
                                    0;
                                }
                                else {
                                    0;
                                }
                            }
                        }
                    }
                    break;
                }
            case 13:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (64)) ? 1 : 0))) ? 1 : 0)) {
                                    if (((((((address) < (237568)) ? 1 : 0)) || ((((address) >= (245760)) ? 1 : 0))) ? 1 : 0)) {
                                        runtime.writeIndex(runtime.writableMember("m_data"), address, ((runtime.readIndex(runtime.writableMember("m_data"), address)) & (data)));
                                    }
                                }
                                else {
                                    ((__t1 = members.m_data) && ArrayBuffer.isView(__t1) ? (__t1[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                }
                                break;
                            }
                        case 16:
                            {
                                ((__t2 = members.m_data) && ArrayBuffer.isView(__t2) ? (__t2[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t3 = members.m_data) && ArrayBuffer.isView(__t3) ? (__t3[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((0) | 0);
                    break;
                }
            case 14:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                ((__t4 = members.m_data) && ArrayBuffer.isView(__t4) ? (__t4[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                break;
                            }
                        case 16:
                            {
                                0;
                                ((__t5 = members.m_data) && ArrayBuffer.isView(__t5) ? (__t5[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t6 = members.m_data) && ArrayBuffer.isView(__t6) ? (__t6[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((15) | 0);
                    break;
                }
            case 15:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                ((__t7 = members.m_data) && ArrayBuffer.isView(__t7) ? (__t7[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                break;
                            }
                        case 16:
                            {
                                0;
                                ((__t8 = members.m_data) && ArrayBuffer.isView(__t8) ? (__t8[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t9 = members.m_data) && ArrayBuffer.isView(__t9) ? (__t9[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((0) | 0);
                    break;
                }
            case 3:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                ((__t10 = members.m_data) && ArrayBuffer.isView(__t10) ? (__t10[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                break;
                            }
                        case 16:
                            {
                                ((__t11 = members.m_data) && ArrayBuffer.isView(__t11) ? (__t11[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                ((__t12 = members.m_data) && ArrayBuffer.isView(__t12) ? (__t12[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_status = ((128) & 0xff);
                    if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (4)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((0) | 0);
                    }
                    else {
                        members.m_flash_mode = ((2) | 0);
                    }
                    break;
                }
            case 17:
                {
                    if ((((((((((((((members.m_byte_count ?? 0)) === (0)) ? 1 : 0)) && ((((members.m_sdp ?? 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((6) | 0);
                    }
                    else {
                        switch (h_m_bits) {
                            case 8:
                                {
                                    ((__t13 = members.m_data) && ArrayBuffer.isView(__t13) ? (__t13[address] = data) : runtime.writeIndex(runtime.writableMember("m_data"), address, data));
                                    break;
                                }
                            case 16:
                                {
                                    ((__t14 = members.m_data) && ArrayBuffer.isView(__t14) ? (__t14[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                                    ((__t15 = members.m_data) && ArrayBuffer.isView(__t15) ? (__t15[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                                    break;
                                }
                            default:
                                {
                                    0;
                                    break;
                                }
                        }
                        members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
                        if (((((members.m_byte_count ?? 0)) === (h_m_page_size)) ? 1 : 0)) {
                            if ((members.m_sdp ?? 0)) {
                                members.m_flash_mode = ((0) | 0);
                            }
                            members.m_byte_count = ((0) & 0xffff);
                        }
                    }
                    break;
                }
            case 21:
                {
                    if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_flash_mode = ((0) | 0);
                    }
                    else {
                        ((__t16 = members.m_data) && ArrayBuffer.isView(__t16) ? (__t16[((address) * (2))] = ((data) >>> (8))) : runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), ((data) >>> (8))));
                        ((__t17 = members.m_data) && ArrayBuffer.isView(__t17) ? (__t17[__add_write_full(runtime, ((address) * (2)), 1)] = data) : runtime.writeIndex(runtime.writableMember("m_data"), __add_write_full(runtime, ((address) * (2)), 1), data));
                        members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
                        if (((((members.m_byte_count ?? 0)) === (h_m_page_size)) ? 1 : 0)) {
                            members.m_flash_mode = ((0) | 0);
                            members.m_sdp = ((0) ? 1 : 0);
                            members.m_byte_count = ((0) & 0xffff);
                        }
                    }
                    break;
                }
            case 4:
                {
                    if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
                        if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && ((((h_m_device_id) === (4)) ? 1 : 0))) ? 1 : 0)) {
                            let base = ((((address) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-256))), 255, 256);
                            (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(4) : runtime.macro("attotime::from_msec", 4))) ?? 0);
                        }
                        else {
                            if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && ((((h_m_device_id) === (17521)) ? 1 : 0))) ? 1 : 0)) {
                                let base = ((((((address) & (262143))) * (2))) >>> 0);
                                let size = ((0) | 0);
                                let duration = ((0) | 0);
                                if ((((base) < (16384)) ? 1 : 0)) {
                                    base = ((0) >>> 0);
                                    size = ((16384) | 0);
                                    duration = ((300) | 0);
                                }
                                else {
                                    if ((((base) < (32768)) ? 1 : 0)) {
                                        base = ((((base) & (24576))) >>> 0);
                                        size = ((8192) | 0);
                                        duration = ((300) | 0);
                                    }
                                    else {
                                        if ((((base) < (131072)) ? 1 : 0)) {
                                            base = ((32768) >>> 0);
                                            size = ((98304) | 0);
                                            duration = ((600) | 0);
                                        }
                                        else {
                                            base = ((((base) & (393216))) >>> 0);
                                            size = ((131072) | 0);
                                            duration = ((600) | 0);
                                        }
                                    }
                                }
                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), base), 255, size);
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L1 ? __L1(duration) : runtime.macro("attotime::from_msec", duration))) ?? 0);
                            }
                            else {
                                let base = ((((address) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                                cppMemset(runtime, __addr_write_full(runtime, (members.m_data ?? 0), ((base) & (-65536))), 255, 65536);
                                (__deref_write_full(runtime, members.m_timer).adjust?.((__L0 ? __L0(1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                            }
                        }
                        members.m_status = ((0) & 0xff);
                        members.m_flash_mode = ((2) | 0);
                        break;
                    }
                    else {
                        0;
                    }
                    break;
                }
            case 5:
                {
                    switch (((data) & (255))) {
                        case 241:
                            {
                                members.m_flash_master_lock = ((1) ? 1 : 0);
                                break;
                            }
                        case 208:
                            {
                                members.m_flash_master_lock = ((0) ? 1 : 0);
                                break;
                            }
                        default:
                            {
                                0;
                                break;
                            }
                    }
                    members.m_flash_mode = ((2) | 0);
                    break;
                }
            case 18:
                {
                    if ((((h_m_bits) === (16)) ? 1 : 0)) {
                        members.m_write_buffer_count = ((__add_write_full(runtime, cppMin(+(data), +(15)), 1)) >>> 0);
                    }
                    else {
                        members.m_write_buffer_count = ((__add_write_full(runtime, cppMin(+(data), +(31)), 1)) >>> 0);
                    }
                    members.m_status = ((128) & 0xff);
                    members.m_flash_mode = ((19) | 0);
                    members.m_byte_count = ((0) & 0xffff);
                    break;
                }
            case 19:
                {
                    if (((((members.m_byte_count ?? 0)) < ((members.m_write_buffer_count ?? 0))) ? 1 : 0)) {
                        if (((((members.m_byte_count ?? 0)) === (0)) ? 1 : 0)) {
                            members.m_write_buffer_start_address = ((address) >>> 0);
                        }
                        if (((Number(address) >= Number((((members.m_write_buffer_start_address ?? 0)) + ((members.m_write_buffer_count ?? 0))))) ? 1 : 0)) {
                            members.m_status = ((48) & 0xff);
                            members.m_flash_mode = ((2) | 0);
                        }
                        else {
                            if ((((h_m_bits) === (8)) ? 1 : 0)) {
                                h_m_write_buffer[(members.m_byte_count ?? 0)] = data;
                            }
                            else {
                                h_m_write_buffer[(((members.m_byte_count ?? 0)) * (2))] = ((data) >>> (8));
                                h_m_write_buffer[__add_write_full(runtime, (((members.m_byte_count ?? 0)) * (2)), 1)] = data;
                            }
                            members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
                        }
                    }
                    else {
                        if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
                            let base = (((((members.m_write_buffer_start_address ?? 0)) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            let len = (((((members.m_write_buffer_count ?? 0)) * ((((((h_m_bits) === (16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
                            (__L2 ? __L2(__addr_write_full(runtime, (members.m_data ?? 0), base), h_m_write_buffer, len) : runtime.macro("memcpy", __addr_write_full(runtime, (members.m_data ?? 0), base), h_m_write_buffer, len));
                            members.m_status = ((128) & 0xff);
                        }
                        else {
                            members.m_status = ((48) & 0xff);
                        }
                        members.m_flash_mode = ((2) | 0);
                    }
                    break;
                }
            case 16:
                {
                    members.m_bank = ((((data) & (255))) | 0);
                    members.m_flash_mode = ((0) | 0);
                    break;
                }
            case 20:
                {
                    if ((((((Number(((data) & (255))) === Number(240)) ? 1 : 0)) || (((Number(((data) & (255))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_fast_mode = ((0) ? 1 : 0);
                        members.m_flash_mode = ((0) | 0);
                    }
                    else {
                        0;
                    }
                    break;
                }
        }
    }
    function __add_write_full(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_write_full(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function __deref_write_full(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_delay_tick(runtime, param) {
        const members = runtime.members;
        switch ((members.m_flash_mode ?? 0)) {
            case 2:
                {
                    members.m_status = ((128) & 0xff);
                    break;
                }
            case 12:
                {
                    members.m_flash_mode = ((0) | 0);
                    members.m_status = ((128) & 0xff);
                    break;
                }
        }
    }
    function method_base(runtime) {
        const members = runtime.members;
        return __addr_base(runtime, (members.m_data ?? 0), 0);
    }
    function __addr_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_intelfsh_device__base(runtime) {
        const members = runtime.members;
        return __addr_intelfsh_device__base(runtime, (members.m_data ?? 0), 0);
    }
    function __addr_intelfsh_device__base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        return ((method_read_full(runtime, offset)) & 0xff);
    }
    function method_read_full(runtime, address) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0, __t1, __t2, __t3, __t4, __t5;
        const h_m_bits = members.m_bits ?? 0;
        const h_m_maker_id = members.m_maker_id ?? 0;
        const h_m_device_id = members.m_device_id ?? 0;
        const h_m_device_id2 = members.m_device_id2 ?? 0;
        const h_m_device_id3 = members.m_device_id3 ?? 0;
        let data = ((0) >>> 0);
        address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
        switch ((members.m_flash_mode ?? 0)) {
            default:
                {
                    switch (h_m_bits) {
                        case 8:
                            {
                                data = (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[address] ?? 0) : runtime.readIndex(__t0, address))) >>> 0);
                                break;
                            }
                        case 16:
                            {
                                data = (((((((__t1 = (members.m_data ?? 0), ArrayBuffer.isView(__t1) ? (__t1[((address) * (2))] ?? 0) : runtime.readIndex(__t1, ((address) * (2))))) << (8))) | ((__t2 = (members.m_data ?? 0), ArrayBuffer.isView(__t2) ? (__t2[__add_read_full(runtime, ((address) * (2)), 1)] ?? 0) : runtime.readIndex(__t2, __add_read_full(runtime, ((address) * (2)), 1)))))) >>> 0);
                                break;
                            }
                    }
                    break;
                }
            case 2:
            case 19:
                {
                    data = (((members.m_status ?? 0)) >>> 0);
                    break;
                }
            case 18:
                {
                    data = ((128) >>> 0);
                    break;
                }
            case 8:
                {
                    if (((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (53)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && ((((h_m_device_id) === (59)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        switch (((address) & (255))) {
                            case 0:
                                {
                                    data = ((h_m_maker_id) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    data = ((h_m_device_id) >>> 0);
                                    break;
                                }
                            case 4:
                                {
                                    data = ((0) >>> 0);
                                    break;
                                }
                        }
                    }
                    else {
                        if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
                            switch (((address) & (255))) {
                                case 0:
                                    {
                                        data = ((h_m_maker_id) >>> 0);
                                        break;
                                    }
                                case 2:
                                    {
                                        data = ((h_m_device_id) >>> 0);
                                        break;
                                    }
                                case 4:
                                    {
                                        0;
                                        break;
                                    }
                                case 6:
                                    {
                                        0;
                                        break;
                                    }
                                case 28:
                                    {
                                        data = ((h_m_device_id2) >>> 0);
                                        break;
                                    }
                                case 30:
                                    {
                                        data = ((h_m_device_id3) >>> 0);
                                        break;
                                    }
                            }
                        }
                        else {
                            if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
                                switch (address) {
                                    case 0:
                                        {
                                            data = ((((h_m_maker_id) << (8))) >>> 0);
                                            break;
                                        }
                                    case 1:
                                        {
                                            data = ((((h_m_device_id) << (8))) >>> 0);
                                            break;
                                        }
                                    case 2:
                                        {
                                            data = ((65024) >>> 0);
                                            break;
                                        }
                                    default:
                                        {
                                            if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                                0;
                                            }
                                            data = ((65024) >>> 0);
                                            break;
                                        }
                                }
                            }
                            else {
                                switch (((address) & (255))) {
                                    case 0:
                                        {
                                            data = ((h_m_maker_id) >>> 0);
                                            break;
                                        }
                                    case 1:
                                        {
                                            data = ((h_m_device_id) >>> 0);
                                            break;
                                        }
                                    case 2:
                                        {
                                            data = ((0) >>> 0);
                                            break;
                                        }
                                }
                            }
                        }
                    }
                    break;
                }
            case 1:
                {
                    if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && ((((h_m_device_id) === (22)) ? 1 : 0))) ? 1 : 0)) {
                        switch (((address) & (255))) {
                            case 0:
                                {
                                    data = ((h_m_maker_id) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    data = ((h_m_device_id) >>> 0);
                                    break;
                                }
                            case 4:
                                {
                                    data = ((0) >>> 0);
                                    break;
                                }
                        }
                    }
                    else {
                        switch (((address) & (255))) {
                            case 0:
                                {
                                    data = ((h_m_maker_id) >>> 0);
                                    break;
                                }
                            case 1:
                                {
                                    data = ((h_m_device_id) >>> 0);
                                    break;
                                }
                            case 2:
                                {
                                    data = ((0) >>> 0);
                                    break;
                                }
                            case 3:
                                {
                                    if ((members.m_flash_master_lock ?? 0)) {
                                        data = ((1) >>> 0);
                                    }
                                    else {
                                        data = ((0) >>> 0);
                                    }
                                    break;
                                }
                        }
                    }
                    break;
                }
            case 12:
                {
                    if (((((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && ((((h_m_device_id) === (173)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) && (((((((address) < ((members.m_erase_sector ?? 0))) ? 1 : 0)) || (((Number(address) >= Number((((members.m_erase_sector ?? 0)) + (65536)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        switch (h_m_bits) {
                            case 8:
                                {
                                    data = (((__t3 = (members.m_data ?? 0), ArrayBuffer.isView(__t3) ? (__t3[address] ?? 0) : runtime.readIndex(__t3, address))) >>> 0);
                                    break;
                                }
                            case 16:
                                {
                                    data = (((((((__t4 = (members.m_data ?? 0), ArrayBuffer.isView(__t4) ? (__t4[((address) * (2))] ?? 0) : runtime.readIndex(__t4, ((address) * (2))))) << (8))) | ((__t5 = (members.m_data ?? 0), ArrayBuffer.isView(__t5) ? (__t5[__add_read_full(runtime, ((address) * (2)), 1)] ?? 0) : runtime.readIndex(__t5, __add_read_full(runtime, ((address) * (2)), 1)))))) >>> 0);
                                    break;
                                }
                        }
                    }
                    else {
                        members.m_status = ((((members.m_status) ^ (68))) & 0xff);
                        data = (((members.m_status ?? 0)) >>> 0);
                    }
                    break;
                }
        }
        return data;
    }
    function __add_read_full(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_write_full(runtime, offset, data);
    }
    function method_read_raw(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xff);
    }
    function method_write_raw(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_data) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_data"), offset, data));
    }
    function method_intelfsh8_device__read(runtime, offset) {
        const members = runtime.members;
        return ((method_read_full(runtime, offset)) & 0xff);
    }
    function method_intelfsh8_device__write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_write_full(runtime, offset, data);
    }
    function method_intelfsh8_device__read_raw(runtime, offset) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = (members.m_data ?? 0), ArrayBuffer.isView(__t0) ? (__t0[offset] ?? 0) : runtime.readIndex(__t0, offset))) & 0xff);
    }
    function method_intelfsh8_device__write_raw(runtime, offset, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        ((__t0 = members.m_data) && ArrayBuffer.isView(__t0) ? (__t0[offset] = data) : runtime.writeIndex(runtime.writableMember("m_data"), offset, data));
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "is_ready": method_is_ready,
        "write_full": method_write_full,
        "delay_tick": method_delay_tick,
        "base": method_base,
        "intelfsh_device::base": method_intelfsh_device__base,
        "read": method_read,
        "read_full": method_read_full,
        "write": method_write,
        "read_raw": method_read_raw,
        "write_raw": method_write_raw,
        "intelfsh8_device::read": method_intelfsh8_device__read,
        "intelfsh8_device::write": method_intelfsh8_device__write,
        "intelfsh8_device::read_raw": method_intelfsh8_device__read_raw,
        "intelfsh8_device::write_raw": method_intelfsh8_device__write_raw
    };
    return __methodTable;
})();
definition.slot.options["sgc_4mbit"].children[0].definition.compiledMethodLinks = ["attotime::from_msec", "attotime::from_seconds", "machine", "machine().side_effects_disabled", "memcpy"];
definition.slot.options["standard"].compiledMethods = (() => {
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        let data = ((255) & 0xff);
        if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
            if (((Number(offset) < Number((members.m_rom_size ?? 0))) ? 1 : 0)) {
                data = (((members.m_rom ?? 0)[offset]) & 0xff);
            }
        }
        return ((data) & 0xff);
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
        "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
    };
    return __methodTable;
})();
definition.slot.options["xin1"].compiledMethods = (() => {
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
    function method_read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        let data = ((255) & 0xff);
        if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
            data = (((members.m_rom ?? 0)[(((members.m_current_offset ?? 0)) + (offset))]) & 0xff);
            if ((((((_e000) ? 0 : 1)) && ((((offset) >= (32704)) ? 1 : 0))) ? 1 : 0)) {
                members.m_current_offset = ((((((32768) * (((offset) - (32704))))) % ((members.m_rom_size ?? 0)))) >>> 0);
            }
        }
        return ((data) & 0xff);
    }
    function method_write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__read(runtime, offset, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_colecovision_cartridge_interface__write(runtime, offset, data, _8000, _a000, _c000, _e000) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
        "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
    };
    return __methodTable;
})();
export const device = definition;
export default device;
