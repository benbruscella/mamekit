import deviceData from './cbm_iec_slot.device.ir.json' with { type: 'json' };
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
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["owner"], __L1 = __l["get_card_device"], __L2 = __l["DYNAMIC_CAST"];
        let __t0;
        let bus = 0;
        for (let device = (__L0 ? __L0() : runtime.macro("owner")); ((device) ? 1 : 0); device = (__t0 = __deref_device_start(runtime, device), typeof __t0.owner === 'function' ? __t0.owner() : typeof __t0.owner === 'number' || typeof __t0.owner === 'boolean' ? __t0.owner : runtime.container(device, "owner"))) {
            bus = (__deref_device_start(runtime, device).subdevice?.("iec_bus") ?? 0);
            if (((bus) ? 1 : 0)) {
                break;
            }
        }
        let dev = (__L2 ? __L2((__L1 ? __L1() : runtime.macro("get_card_device")), "device_cbm_iec_interface") : runtime.macro("DYNAMIC_CAST", (__L1 ? __L1() : runtime.macro("get_card_device")), "device_cbm_iec_interface"));
        let dev$s = undefined, dev$o = 0;
        if (ArrayBuffer.isView(dev) || Array.isArray(dev))
            dev$s = dev;
        else if (dev !== null && typeof dev === 'object' && dev.generatedPointer === true && dev.path === undefined && dev.target === undefined && (ArrayBuffer.isView(dev.source) || Array.isArray(dev.source))) {
            dev$s = dev.source;
            dev$o = dev.offset;
        }
        if (dev) {
            (__deref_device_start(runtime, bus).add_device?.((members.this ?? 0), (__L1 ? __L1() : runtime.macro("get_card_device"))) ?? 0);
        }
    }
    function __deref_device_start(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cbm_iec_slot_device(runtime, mconfig, tag, owner, address, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
        method_set_address(runtime, address);
    }
    function method_set_address(runtime, address) {
        const members = runtime.members;
        members.m_address = ((address) | 0);
    }
    function method_add(runtime, config, _bus_tag, _default_drive) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["CBM_IEC_SLOT"], __L1 = __l["std::forward"], __L2 = __l["CBM_IEC"];
        (__L0 ? __L0(config, "iec4", 4, (members.cbm_iec_devices ?? 0), 0) : runtime.macro("CBM_IEC_SLOT", config, "iec4", 4, (members.cbm_iec_devices ?? 0), 0));
        (__L0 ? __L0(config, "iec8", 8, (members.cbm_iec_devices ?? 0), _default_drive) : runtime.macro("CBM_IEC_SLOT", config, "iec8", 8, (members.cbm_iec_devices ?? 0), _default_drive));
        (__L0 ? __L0(config, "iec9", 9, (members.cbm_iec_devices ?? 0), 0) : runtime.macro("CBM_IEC_SLOT", config, "iec9", 9, (members.cbm_iec_devices ?? 0), 0));
        (__L0 ? __L0(config, "iec10", 10, (members.cbm_iec_devices ?? 0), 0) : runtime.macro("CBM_IEC_SLOT", config, "iec10", 10, (members.cbm_iec_devices ?? 0), 0));
        (__L0 ? __L0(config, "iec11", 11, (members.cbm_iec_devices ?? 0), 0) : runtime.macro("CBM_IEC_SLOT", config, "iec11", 11, (members.cbm_iec_devices ?? 0), 0));
        (__L2 ? __L2(config, (__L1 ? __L1(_bus_tag) : runtime.macro("std::forward", _bus_tag)), 0) : runtime.macro("CBM_IEC", config, (__L1 ? __L1(_bus_tag) : runtime.macro("std::forward", _bus_tag)), 0));
    }
    function method_get_address(runtime) {
        const members = runtime.members;
        return (((members.m_address ?? 0)) | 0);
    }
    function method_cbm_iec_slot_device__cbm_iec_slot_device(runtime, mconfig, tag, owner, address, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
        method_set_address(runtime, address);
    }
    function method_cbm_iec_slot_device__add(runtime, config, _bus_tag, _default_drive) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["CBM_IEC_SLOT"], __L1 = __l["std::forward"], __L2 = __l["CBM_IEC"];
        (__L0 ? __L0(config, "iec4", 4, (members.cbm_iec_devices ?? 0), 0) : runtime.macro("CBM_IEC_SLOT", config, "iec4", 4, (members.cbm_iec_devices ?? 0), 0));
        (__L0 ? __L0(config, "iec8", 8, (members.cbm_iec_devices ?? 0), _default_drive) : runtime.macro("CBM_IEC_SLOT", config, "iec8", 8, (members.cbm_iec_devices ?? 0), _default_drive));
        (__L0 ? __L0(config, "iec9", 9, (members.cbm_iec_devices ?? 0), 0) : runtime.macro("CBM_IEC_SLOT", config, "iec9", 9, (members.cbm_iec_devices ?? 0), 0));
        (__L0 ? __L0(config, "iec10", 10, (members.cbm_iec_devices ?? 0), 0) : runtime.macro("CBM_IEC_SLOT", config, "iec10", 10, (members.cbm_iec_devices ?? 0), 0));
        (__L0 ? __L0(config, "iec11", 11, (members.cbm_iec_devices ?? 0), 0) : runtime.macro("CBM_IEC_SLOT", config, "iec11", 11, (members.cbm_iec_devices ?? 0), 0));
        (__L2 ? __L2(config, (__L1 ? __L1(_bus_tag) : runtime.macro("std::forward", _bus_tag)), 0) : runtime.macro("CBM_IEC", config, (__L1 ? __L1(_bus_tag) : runtime.macro("std::forward", _bus_tag)), 0));
    }
    function method_cbm_iec_slot_device__set_address(runtime, address) {
        const members = runtime.members;
        members.m_address = ((address) | 0);
    }
    function method_cbm_iec_slot_device__get_address(runtime) {
        const members = runtime.members;
        return (((members.m_address ?? 0)) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "cbm_iec_slot_device": method_cbm_iec_slot_device,
        "set_address": method_set_address,
        "add": method_add,
        "get_address": method_get_address,
        "cbm_iec_slot_device::cbm_iec_slot_device": method_cbm_iec_slot_device__cbm_iec_slot_device,
        "cbm_iec_slot_device::add": method_cbm_iec_slot_device__add,
        "cbm_iec_slot_device::set_address": method_cbm_iec_slot_device__set_address,
        "cbm_iec_slot_device::get_address": method_cbm_iec_slot_device__get_address
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["CBM_IEC", "CBM_IEC_SLOT", "DYNAMIC_CAST", "get_card_device", "owner", "set_options", "std::forward"];
export const device = definition;
export default device;
