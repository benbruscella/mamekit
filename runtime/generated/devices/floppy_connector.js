import deviceData from './floppy_connector.device.ir.json' with { type: 'json' };
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
    function method_device_start(runtime) {
        const members = runtime.members;
    }
    function method_device_config_complete(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_card_device"], __L1 = __l["DYNAMIC_CAST"];
        let dev = (__L1 ? __L1((__L0 ? __L0() : runtime.macro("get_card_device")), "floppy_image_device") : runtime.macro("DYNAMIC_CAST", (__L0 ? __L0() : runtime.macro("get_card_device")), "floppy_image_device"));
        let dev$s = undefined, dev$o = 0;
        if (ArrayBuffer.isView(dev) || Array.isArray(dev))
            dev$s = dev;
        else if (dev !== null && typeof dev === 'object' && dev.generatedPointer === true && dev.path === undefined && dev.target === undefined && (ArrayBuffer.isView(dev.source) || Array.isArray(dev.source))) {
            dev$s = dev.source;
            dev$o = dev.offset;
        }
        if (dev) {
            (__deref_device_config_complete(runtime, dev).set_formats?.((members.formats ?? 0)) ?? 0);
            (__deref_device_config_complete(runtime, dev).set_sectoring_type?.((members.m_sectoring_type ?? 0)) ?? 0);
        }
    }
    function __deref_device_config_complete(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_get_device(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_card_device"], __L1 = __l["DYNAMIC_CAST"];
        return (__L1 ? __L1((__L0 ? __L0() : runtime.macro("get_card_device")), "floppy_image_device") : runtime.macro("DYNAMIC_CAST", (__L0 ? __L0() : runtime.macro("get_card_device")), "floppy_image_device"));
    }
    function method_set_formats(runtime, _formats) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"];
        members.formats = (__L0 ? __L0(_formats) : runtime.macro("std::forward", _formats));
    }
    function method_set_sectoring_type(runtime, sectoring_type) {
        const members = runtime.members;
        members.m_sectoring_type = ((sectoring_type) >>> 0);
    }
    function method_use_sound(runtime) {
        const members = runtime.members;
        return (members.m_use_sound ?? 0);
    }
    function method_get_samples(runtime) {
        const members = runtime.members;
        return (members.m_samples ?? 0);
    }
    function method_floppy_connector__floppy_connector(runtime, mconfig, tag, owner, opts, dflt, formats, fixed = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, fixed) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, fixed));
        method_set_formats(runtime, (__L0 ? __L0(formats) : runtime.macro("std::forward", formats)));
    }
    function method_floppy_connector__set_formats(runtime, _formats) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"];
        members.formats = (__L0 ? __L0(_formats) : runtime.macro("std::forward", _formats));
    }
    function method_floppy_connector__set_sectoring_type(runtime, sectoring_type) {
        const members = runtime.members;
        members.m_sectoring_type = ((sectoring_type) >>> 0);
    }
    function method_floppy_connector__use_sound(runtime) {
        const members = runtime.members;
        return (members.m_use_sound ?? 0);
    }
    function method_floppy_connector__get_samples(runtime) {
        const members = runtime.members;
        return (members.m_samples ?? 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "device_config_complete": method_device_config_complete,
        "get_device": method_get_device,
        "set_formats": method_set_formats,
        "set_sectoring_type": method_set_sectoring_type,
        "use_sound": method_use_sound,
        "get_samples": method_get_samples,
        "floppy_connector::floppy_connector": method_floppy_connector__floppy_connector,
        "floppy_connector::set_formats": method_floppy_connector__set_formats,
        "floppy_connector::set_sectoring_type": method_floppy_connector__set_sectoring_type,
        "floppy_connector::use_sound": method_floppy_connector__use_sound,
        "floppy_connector::get_samples": method_floppy_connector__get_samples
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["DYNAMIC_CAST", "get_card_device", "set_options", "std::forward"];
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
        function method_get_device(runtime) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["get_card_device"], __L1 = __l["DYNAMIC_CAST"];
            return (__L1 ? __L1((__L0 ? __L0() : runtime.macro("get_card_device")), "floppy_image_device") : runtime.macro("DYNAMIC_CAST", (__L0 ? __L0() : runtime.macro("get_card_device")), "floppy_image_device"));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct_5": method___construct_5,
            "__construct_3": method___construct_3,
            "get_device": method_get_device
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
